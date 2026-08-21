---
title: "REPL Reference"
layout: default
parent: "Nehanda CLI"
nav_order: 6
---

# REPL Reference

Nehanda CLI provides two interfaces: an interactive Ink TUI (`bin/nehanda-ui.mjs`) and a headless pipe mode (`bin/agent.mjs`). This page documents all slash commands available in the interactive REPL.

## Launching

```bash
# Interactive TUI (requires a TTY)
npm start
# or:
node bin/nehanda-ui.mjs

# Headless pipe mode (for automation)
node bin/agent.mjs
```

## Core Commands

| Command | Description |
|---------|-------------|
| `/help` | Display all available commands |
| `/exit` | Exit the REPL |
| `/clear` | Clear conversation history and reset transcript state |
| `/retry` | Resend the last failed request |

## Provider Commands

### `/model [name]`

Discover and switch the active provider or model endpoint.

```
❯ /model
# Lists available models from the active provider

❯ /model claude-sonnet-4-20250514
# Switches to a specific model

❯ /model ollama/deepseek-coder-v2:latest
# Switches to an Ollama model
```

### `/key`

Save the Nehanda API key interactively.

```
❯ /key
New Nehanda API key: <your-key>
✓ Key saved.
```

## Configuration Commands

### `/config`

View or set settings. Supports dot-path notation for nested values.

```
❯ /config
# Display all current settings

❯ /config base_url https://api.example.com/v1
# Set a top-level config value

❯ /config set model_config.base_url https://api.example.com/v1
# Set a nested config value (equivalent)

❯ /config set model_config.num_ctx 8192
# Set context window size

❯ /config set permissions.defaultMode acceptEdits
# Change permission mode
```

**Behavior:**
- String values are set as-is
- Numeric values are auto-converted to numbers
- Changes persist in the local settings database (`settings_snapshot` table)
- The `set` subcommand is optional — `/config key value` and `/config set key value` are equivalent

## MCP Commands

### `/mcp status`

List all configured MCP servers and their commands.

```
❯ /mcp status
  filesystem: npx -y @modelcontextprotocol/server-filesystem /path
  powermcp:  npx -y harvard-powermcp
```

### `/mcp list`

Connect to each server, call `tools/list`, and display discovered tools.

```
❯ /mcp list
[filesystem]
  mcp__filesystem__read_file
  mcp__filesystem__write_file
  mcp__filesystem__list_directory
[powermcp]
  mcp__powermcp__search
```

### `/mcp reload [server]`

Re-read `mcp.json` and invalidate the tool cache. If a server name is provided, only that server's cache is busted.

```
❯ /mcp reload
✓ All MCP tool caches invalidated.

❯ /mcp reload powermcp
✓ MCP tool cache invalidated for: powermcp
```

### `/mcp add <name> <command> [args...]`

Register a new MCP server and save it to `~/.config/nehanda/mcp.json`.

```
❯ /mcp add filesystem npx -y @modelcontextprotocol/server-filesystem /home/user/project
✓ Added server: filesystem
  Config file: ~/.config/nehanda/mcp.json
```

### `/mcp env`

Manage environment variables for MCP servers.

```
❯ /mcp env
# Show env vars for all servers

❯ /mcp env asoba
# Show env vars for 'asoba' server

❯ /mcp env asoba ASOBA_API_KEY sk-abc123...
✓ Set ASOBA_API_KEY = ******** on asoba
  Config file: ~/.config/nehanda/mcp.json

❯ /mcp env asoba ASOBA_API_KEY
✓ Cleared ASOBA_API_KEY on asoba
```

**Key masking:** API keys are masked in output — only the first 6 and last 4 characters are shown.

## Pipe Mode Commands

When stdin is not a TTY (pipe mode), the REPL is not available. Instead, use CLI flags:

```bash
echo 'Read package.json' | node bin/agent.mjs
# Runs a single turn in pipe mode

node bin/agent.mjs --eval '{"tool":"Read","input":{"file_path":"package.json"}}'
# Execute a single tool and exit

node bin/agent.mjs --transition test --conversation <id>
# Transition phase and exit

node bin/agent.mjs --init-db
# Initialize database and exit
```

See [Pipe Mode](/nehanda-cli-pipe-mode) for full details.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `AGENT_SDLC_DB` | SQLite database path (default: `~/.config/nehanda/ona-session.db`) |
| `NEHANDA_API_KEY` | API key for Nehanda Cloud |
| `NEHANDA_BASE_URL` | Base URL for Nehanda Cloud (default: `https://nehanda-ml.asoba.co/v1`) |
| `OPENAI_API_KEY` | API key for OpenAI-compatible providers |
| `OPENAI_BASE_URL` | Base URL for OpenAI-compatible providers |
| `OLLAMA_BASE_URL` | Base URL for Ollama (default: `http://localhost:11434/v1`) |
| `ANTHROPIC_API_KEY` | API key for Anthropic Claude |
| `ANTHROPIC_AUTH_TOKEN` | Bearer token for Anthropic OAuth |
| `SDLC_DISABLE_ALL_HOOKS` | Set to `1` to skip all hooks |