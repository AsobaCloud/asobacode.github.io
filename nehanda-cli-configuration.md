---
title: "Configuration"
layout: default
parent: "Nehanda CLI"
nav_order: 8
---

# Configuration

Nehanda CLI uses a layered configuration system. Settings can come from files, the database, environment variables, or REPL commands. This page documents the full settings schema and merge behavior.

## Settings Locations

Settings are loaded from three sources, in priority order:

| Priority | Source | Path |
|----------|--------|------|
| 1 (highest) | Runtime changes (`/config`) | Stored in `settings_snapshot` table |
| 2 | Project-local file | `.ona/settings.json` |
| 2 | Project-local file (Claude compat) | `.claude/settings.local.json` |
| 3 | Project root file | `settings.json` |

All file sources are **merged together** — if multiple files exist, their contents are deep-merged. The database settings are then layered on top.

## Bootstrap Merge Strategy

On startup, the engine applies a timestamp-based merge:

1. **First run (no database settings):** Merge defaults + file settings → write to database
2. **File edited after last DB update:** Merge defaults + DB settings + file settings → update database
3. **DB is current:** Keep database settings (preserves runtime `/config` changes)

This means you can edit your settings file at any time and the changes will be picked up on the next restart. Runtime `/config` changes are preserved across restarts unless a file is edited more recently.

## Full Settings Schema

```json
{
  "model_config": {
    "provider": "zhipu",
    "model_id": "glm_4_7_flash",
    "base_url": null,
    "api_key": null,
    "num_ctx": null,
    "force_manual_tools": false
  },
  "permissions": {
    "defaultMode": "default",
    "allow": [],
    "deny": [],
    "ask": []
  },
  "hooks": [],
  "apiKeyHelper": null,
  "mcp_servers": {}
}
```

### `model_config`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `provider` | string | `"zhipu"` | Active provider identifier |
| `model_id` | string | `"glm_4_7_flash"` | Model name sent to the provider |
| `base_url` | string or null | Provider-dependent | API base URL (overrides env vars) |
| `api_key` | string or null | null | API key (overrides env vars) |
| `num_ctx` | integer or null | null | Context window size for OpenAI-compatible providers |
| `force_manual_tools` | boolean | `false` | Force `[TOOL_CALL]` rescue path even if provider supports native tools |

### `permissions`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `defaultMode` | string | `"default"` | One of: `default`, `bypassPermissions`, `dontAsk`, `acceptEdits`, `plan` |
| `allow` | string[] | `[]` | Tools to auto-allow (supports `*` wildcard suffix) |
| `deny` | string[] | `[]` | Tools to auto-deny (supports `*` wildcard suffix) |
| `ask` | string[] | `[]` | Tools to require confirmation (supports `*` wildcard suffix) |

See [Permissions](/nehanda-cli-permissions) for the full permission model.

### `hooks`

An array of hook definitions. See [Hooks](/nehanda-cli-hooks) for the full schema.

### `apiKeyHelper`

A shell command that outputs an API key to stdout. Used when the provider requires authentication but no key is configured:

```json
{
  "apiKeyHelper": "echo $MY_SECRET_KEY"
}
```

### `mcp_servers`

A map of MCP server configurations. See [MCP Integration](/nehanda-cli-mcp) for the full schema.

## Using `/config`

From the REPL, use `/config` to view or modify settings at runtime:

```
❯ /config
# Display all current settings

❯ /config set model_config.base_url https://api.anthropic.com
# Set a nested value using dot-path notation

❯ /config set permissions.defaultMode acceptEdits
# Change permission mode

❯ /config set model_config.num_ctx 8192
# Set context window size (auto-converted to number)
```

Changes persist in the database and survive restarts (until a settings file is edited with a newer timestamp).

## Example Settings File

`.ona/settings.json`:

```json
{
  "model_config": {
    "provider": "claude_code_subscription",
    "model_id": "claude-sonnet-4-20250514"
  },
  "permissions": {
    "defaultMode": "acceptEdits",
    "deny": ["mcp__*"]
  },
  "mcp_servers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/project"]
    }
  }
}
```
