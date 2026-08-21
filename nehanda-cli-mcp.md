---
title: "MCP Integration"
layout: default
parent: "Nehanda CLI"
nav_order: 12
---

# MCP Integration

Nehanda CLI can consume tools from any external [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server. Discovered tools are injected into the model's tool list under the namespace `mcp__<server>__<tool>`.

## Architecture

```
lib/mcp-config.mjs          Config loader (mcp.json)
        │
        ▼
lib/mcp.mjs                 MCP client (stdio transport)
        │
        ├── spawns child process for each server
        ├── calls tools/list on each
        ├── caches results for 60 seconds
        └── routes tool calls via toolMcpInvoke()
        │
        ▼
lib/tools.mjs                Tool orchestrator
        │
        └── MCP tools appear as mcp__<server>__<tool>
           in the model's tool list
```

## Configuration

Servers are configured in a standard `mcp.json` file. Two locations are read and merged at startup (project-local takes priority):

| Location | Scope | Commit with repo? |
|----------|-------|-------------------|
| `./mcp.json` | Project-local | Yes (recommended)
| `~/.config/nehanda/mcp.json` | User-global | No (personal) |

### Example `mcp.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    },
    "powermcp": {
      "command": "npx",
      "args": ["-y", "harvard-powermcp"],
      "env": { "API_KEY": "your-key" }
    }
  }
}
```

### Server Config Schema

Each server in `mcpServers` supports:

| Key | Type | Required | Description |
|-----|------|----------|-------------|
| `command` | string | Yes | Command to spawn (e.g. `npx`, `python3`)
| `args` | string[] | No | Arguments to the command |
| `env` | object | No | Environment variables for the server process |

## Tool Discovery

At startup and on each turn, the engine calls `tools/list` on each configured server. Results are cached per-server for 60 seconds (`MCP_CACHE_TTL_MS`) to avoid spawning child processes on every turn.

Discovered tools are namespaced as `mcp__<server>__<tool>`:

```
[filesystem]
  mcp__filesystem__read_file: Read file contents
  mcp__filesystem__write_file: Write to a file
  mcp__filesystem__list_directory: List directory
[powermcp]
  mcp__powermcp__search: Search academic databases
```

These tools appear in the model's tool list alongside built-in tools. The model can call them just like any built-in tool.

## Tool Namespacing

When the model calls `mcp__filesystem__read_file`, the engine:

1. Parses the name: server=`filesystem`, tool=`read_file`
2. Looks up the server config from `settings.mcp_servers`
3. Calls `mcpCallTool(server, 'read_file', input)` on the MCP client
4. Returns the result to the model

## Energy Middleware (ODSE)

MCP tool results from servers with recognized OEM names pass through the **energy normalization middleware** (`energy-middleware.mjs`). This transforms energy-specific payloads into a standardized format. On any failure, the original content is returned unchanged.

## REPL Commands

| Command | Description |
|---------|-------------|
| `/mcp status` | List all configured servers and their commands |
| `/mcp list` | Connect and enumerate tools from each server |
| `/mcp reload [server]` | Bust tool cache and re-discover |
| `/mcp add <name> <cmd> [args...]` | Register a new server |
| `/mcp env` | Show/set/clear environment variables |

### Setting API Keys

```
❯ /mcp env                    # show env vars for all servers
❯ /mcp env asoba              # show env vars for 'asoba' server
❯ /mcp env asoba ASOBA_API_KEY sk-abc123...   # set the key
✓ Set ASOBA_API_KEY = ******** on asoba
  Config file: ~/.config/nehanda/mcp.json

❯ /mcp env asoba ASOBA_API_KEY
✓ Cleared ASOBA_API_KEY on asoba
```

Keys are masked in output — only the first 6 and last 4 characters are shown.

## Built-in MCP Tools

In addition to calling external tools, the engine provides two built-in tools for working with MCP resources:

| Tool | Description |
|------|-------------|
| `ListMcpResources` | List resources from a server (or all servers) |
| `ReadMcpResource` | Read a specific resource URI from a server |

## Error Handling

If an MCP server is unreachable at startup, it is silently skipped — the engine does not crash. The tool cache simply won't have entries for that server. Use `/mcp list` to diagnose connection issues.

## Cache Invalidation

The tool cache is invalidated:

- On `/mcp reload` (all servers or a specific one)
- Automatically after 60 seconds (per server)
- On process restart