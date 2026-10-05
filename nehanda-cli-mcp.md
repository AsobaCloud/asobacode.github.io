---
title: "MCP Integration"
layout: default
parent: "Nehanda CLI"
nav_order: 12
---

# MCP Integration

Nehanda CLI can consume tools from any external [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server. Discovered tools are injected into the model's tool list under the namespace `mcp__<server>__<tool>`.

## Architecture

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 340" width="100%" height="auto">
  <rect width="960" height="340" rx="16" fill="#4551BF"/>
  <text x="32" y="36" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" letter-spacing="1">MCP CLIENT ARCHITECTURE</text>
  <line x1="32" y1="48" x2="928" y2="48" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Layer 1: Config -->
  <g transform="translate(100,60)">
    <rect width="760" height="52" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="52" rx="3" fill="#5C67DE"/>
    <text x="30" y="23" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">lib/mcp-config.mjs</text>
    <text x="30" y="40" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Config loader — reads ./mcp.json + ~/.config/nehanda/mcp.json · project-local takes priority</text>
    <rect x="596" y="14" width="152" height="20" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="672" y="28" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">applyMcpConfig()</text>
  </g>
  <line x1="480" y1="114" x2="480" y2="132" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,132 475,124 485,124" fill="#8892E0"/>

  <!-- Layer 2: MCP Client -->
  <g transform="translate(100,134)">
    <rect width="760" height="66" rx="10" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="66" rx="3" fill="#7B86EE"/>
    <text x="30" y="23" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">lib/mcp.mjs — MCP Client (stdio transport)</text>
    <text x="30" y="40" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Spawns child process per server · calls tools/list · caches results 60s · routes calls via toolMcpInvoke()</text>
    <text x="30" y="56" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">ODSE middleware intercepts energy OEM results automatically before returning to orchestrator</text>
    <rect x="596" y="14" width="152" height="20" rx="10" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="672" y="28" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">getMcpServer()</text>
    <rect x="596" y="40" width="152" height="20" rx="10" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="672" y="54" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#8892E0">MCP_CACHE_TTL_MS=60s</text>
  </g>
  <line x1="480" y1="202" x2="480" y2="220" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,220 475,212 485,212" fill="#8892E0"/>

  <!-- Layer 3: Tool Orchestrator -->
  <g transform="translate(100,222)">
    <rect width="760" height="52" rx="10" fill="#0A0A0A" stroke="#5C67DE" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="52" rx="3" fill="#FFFFFF"/>
    <text x="30" y="23" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">lib/tools.mjs — Tool Orchestrator</text>
    <text x="30" y="40" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">MCP tools injected as mcp__&lt;server&gt;__&lt;tool&gt; · available to model alongside 21 built-in tools</text>
    <rect x="596" y="14" width="152" height="20" rx="10" fill="#1F1F1F" stroke="#444" stroke-width="1"/>
    <text x="672" y="28" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">toolMcpInvoke()</text>
  </g>

  <text x="480" y="330" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2" opacity="0.7">Tools cached per-server · /mcp reload busts cache · energy OEM payloads auto-normalized via ODSE middleware</text>
</svg>

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

## Energy Middleware (ODSE) {#energy-middleware-odse}

MCP tool results from servers with recognized OEM names pass automatically through `lib/energy-middleware.mjs`, which normalizes energy-specific payloads to the [ODS-E](https://ona-protocol.org) schema before the model sees them. On any failure or unrecognized OEM, the original content is returned unchanged.

### OEM Detection

Brand resolution happens in two passes:

**1. Name-based:** The MCP server name is parsed for a known OEM key. Any prefix before the OEM segment is stripped:

| Server name | Resolved OEM |
|---|---|
| `energy-huawei` | `huawei` |
| `mcp-solaredge` | `solaredge` |
| `power-sungrow-v2` | `sungrow` |
| `fronius` | `fronius` |

**2. Payload fingerprinting:** If the server name doesn't resolve, field signatures are matched against known schemas:

| Field signature | Resolved OEM |
|---|---|
| `{ inverter_state, run_state }` | Huawei FusionSolar |
| `{ end_at, wh_del, devices_reporting }` | Enphase Envoy |
| `{ data: { telemetries } }` | SolarEdge |
| `{ Head: { Timestamp }, Body: { Data: { Site } } }` | Fronius |

If neither pass identifies the OEM, the payload passes through unchanged.

### Supported OEMs

Huawei FusionSolar, Enphase Envoy, SolarEdge, Fronius, Solarman, SMA, Solis, Sungrow / iSolarCloud, Sungrow BESS / PowerTitan, BYD BESS, Fimer / AuroraVision, SolaxCloud, Eskom (portal, AMR, NRS049), Vestas, Siemens Gamesa, Nordex, Terraco, and generic CSV.

### Naming Convention

Name energy MCP servers with the OEM as a segment in the server name. No additional configuration is required — normalization is automatic:

```json
{
  "mcpServers": {
    "energy-huawei": { "command": "...", "args": ["..."] },
    "energy-solaredge": { "command": "...", "args": ["..."] },
    "energy-sungrow": { "command": "...", "args": ["..."] }
  }
}
```

### Output Formats

The underlying transform script (`lib/scripts/odse-transform.py`) accepts a `--format` flag for direct use:

```bash
echo '<payload>' | python3 lib/scripts/odse-transform.py --source huawei --format table
echo '<payload>' | python3 lib/scripts/odse-transform.py --source solaredge --format ndjson
echo '<payload>' | python3 lib/scripts/odse-transform.py --source sungrow --format summary
```

| Format | Output | Default when |
|---|---|---|
| `table` | Box-drawing ASCII table with column headers and row count | stdout is a TTY |
| `ndjson` | One JSON object per line | stdout is piped |
| `summary` | Metadata header (`rows`, `shape`, `source`) + JSON array | explicit flag only |

In the TUI, multi-channel SCADA arrays and inverter state records are automatically rendered as `table` output via `formatToolResult` in `lib/ui.mjs`.

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

## Official Asoba MCP Servers

Asoba publishes official MCP servers that integrate directly with Nehanda CLI:

- [**Asoba Platform SDK MCP Server**](/mcp-servers#asoba-platform-sdk) (`asoba-mcp-server`) — Telemetry, OODA alerts, KPI rollups, predictive maintenance, and solar forecasting.
- [**Zorora Economic Data MCP Server**](/mcp-servers#zorora-economic-data) (`zorora-mcp-server`) — 80 macroeconomic and energy market series (FRED, Yahoo Finance, World Bank, Ember, SAPP, Eskom).

See the [**MCP Servers Hub**](/mcp-servers) for complete server documentation, tool lists, and setup instructions.