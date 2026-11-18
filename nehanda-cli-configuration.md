---
title: "Configuration"
layout: default
parent: "Nehanda CLI"
nav_order: 8
---

# Configuration & Environment Variables

Nehanda CLI uses a layered configuration system combining project-level configuration files, user-level global configuration, environment variables, and SQLite database snapshots.

---

## Configuration Locations & Priority

Settings are loaded and merged in the following priority order:

| Priority | Source | Path | Purpose |
|:---|:---|:---|:---|
| **1 (Highest)** | Interactive Commands | Database `settings_snapshot` | Runtime adjustments from `/model` and `/key` |
| **2** | Project Settings | `.ona/settings.json` | Project-specific permissions, model overrides, and hooks |
| **3** | Claude Compat File | `.claude/settings.local.json` | Drop-in compatibility for existing project setups |
| **4** | Global Agent Config | `~/.config/nehanda/agents.json` | User-wide agent preferences and global keys |
| **5** | Global MCP Servers | `~/.config/nehanda/mcp.json` | Global Model Context Protocol server definitions |

All project file sources are deep-merged on startup, and database configurations take precedence until files are edited with a newer modification timestamp.

---

## Environment Variables

### Core & Persistence
| Variable | Default | Description |
|:---|:---|:---|
| `AGENT_SDLC_DB` | `~/.config/nehanda/ona-session.db` | Path to the local SQLite audit and state database |
| `SDLC_DISABLE_ALL_HOOKS` | `0` | Set to `1` to bypass all event hooks across all phases |

### OS-Primitives Sandbox (Seatbelt / Bubblewrap)
| Variable | Default | Description |
|:---|:---|:---|
| `NEHANDA_SANDBOX_ALLOWLIST` | *Unset (deny-all)* | Comma-separated domain names allowed for egress (e.g. `registry.npmjs.org,github.com`) |
| `NEHANDA_SANDBOX_BACKEND` | *Auto-detected* | Force sandbox backend: `darwin` (Seatbelt) or `linux` (Bubblewrap) |
| `NEHANDA_SANDBOX_PROXY_SOCKET` | *Auto-generated* | Unix domain socket path used by the in-process allowlist forward proxy |

### Provider Credentials & Hosts
| Variable | Provider | Description |
|:---|:---|:---|
| `OPENROUTER_API_KEY` | OpenRouter | API key for OpenRouter inference |
| `ANTHROPIC_API_KEY` | Anthropic | API key for Claude models |
| `ANTHROPIC_AUTH_TOKEN` | Anthropic | OAuth bearer token |
| `OLLAMA_BASE_URL` | Ollama | Host URL for Ollama instances (default: `http://localhost:11434/v1`) |
| `OPENAI_API_KEY` | OpenAI-compatible | Generic API key |
| `OPENAI_BASE_URL` | OpenAI-compatible | Generic base URL |
| `NEHANDA_API_KEY` | Nehanda Cloud | API key for Nehanda vLLM proxy |
| `NEHANDA_BASE_URL` | Nehanda Cloud | Base URL (default: `https://nehanda-ml.asoba.co/v1`) |

---

## Settings Schema Reference

Example `.ona/settings.json`:

```json
{
  "model_config": {
    "provider": "openrouter",
    "model_id": "openai/gpt-4o",
    "base_url": "https://openrouter.ai/api/v1",
    "api_key": null,
    "num_ctx": 128000,
    "thinking": false,
    "force_manual_tools": false
  },
  "permissions": {
    "defaultMode": "default",
    "allow": ["Read", "Glob", "Grep"],
    "deny": ["Bash"],
    "ask": ["Write", "Edit"]
  },
  "hooks": [
    {
      "event": "PreToolUse",
      "command": "node scripts/check-policy.mjs",
      "matcher": "Bash"
    }
  ],
  "mcp_servers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

### `model_config` Keys
* `provider` (string): Active provider (`openrouter`, `anthropic`, `ollama`, `lm_studio_local`, `zhipu`, `nehanda`, `openai_compatible`).
* `model_id` (string): Model identifier passed to the API.
* `base_url` (string): Host endpoint URL.
* `thinking` (boolean): When set to `false`, forwards `think: false` to Ollama to disable chain-of-thought overhead.
* `force_manual_tools` (boolean): Enforces delimiter-based `[TOOL_CALL]` rescue calling even on providers with native tool support.

---

## Runtime Inspection (`/config`)

To inspect active configuration, run `/config` in the REPL:

```
❯ /config
  Provider:  openrouter
  Model:     openai/gpt-4o
  Endpoint:  https://openrouter.ai/api/v1 (32ms)
  Sidecar:   Laya System-1 (PID 48212, warm)
  Directory: /Users/shingi/Workbench/energy-project
```

To modify provider settings interactively, launch the `/model` wizard or use the `/key` shortcut.
