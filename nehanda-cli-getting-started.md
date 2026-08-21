---
title: "Getting Started"
layout: default
parent: "Nehanda CLI"
nav_order: 1
---

# Getting Started with Nehanda CLI

Install and configure Nehanda CLI, then connect it to a provider and run your first agent session.

## Requirements

- **Node.js** v22.0.0 or higher
- A terminal emulator (macOS Terminal, iTerm2, Windows Terminal, etc.)
- An LLM provider (see [Providers](/nehanda-cli-providers) for options)

## 1. Installation

```bash
git clone https://github.com/AsobaCloud/nehanda-cli.git
cd nehanda-cli
npm install
```

## 2. First Launch

```bash
npm start
```

This launches the interactive Ink TUI. On first run, the engine initializes the SQLite database at `~/.config/nehanda/ona-session.db` and creates all tables.

You'll see the REPL prompt:

```
❯ 
```

## 3. Connect a Provider

Nehanda CLI works out of the box with multiple providers. Choose one:

### Option A: Nehanda Cloud (Default)

The CLI defaults to `https://nehanda-ml.asoba.co/v1`. If an API key is required:

```
❯ /key
New Nehanda API key: <your-key>
✓ Key saved.
```

### Option B: Anthropic Claude

Set your API key as an environment variable, then switch provider:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

```
❯ /config set model_config.provider claude_code_subscription
❯ /config set model_config.model_id claude-sonnet-4-20250514
```

### Option C: LM Studio (Local)

1. [Download LM Studio](https://lmstudio.ai) and load a model
2. Start the local server (default port 1234 or 8000)
3. Switch provider:

```
❯ /config set model_config.provider lm_studio_local
❯ /model
```

### Option D: Ollama (Local or Remote)

```bash
# Local Ollama
ollama serve  # starts on port 11434
```

```
❯ /config set model_config.provider ollama
❯ /config set model_config.base_url http://localhost:11434/v1
❯ /model llama3
```

For a remote Ollama instance on your LAN:

```
❯ /config set model_config.provider ollama
❯ /config set model_config.base_url http://my-server.local:11434/v1
❯ /model deepseek-coder-v2:latest
```

### Option E: Any OpenAI-Compatible API

```bash
export OPENAI_API_KEY=sk-...
```

```
❯ /config set model_config.provider openai_compatible
❯ /config set model_config.base_url https://your-endpoint.com/v1
❯ /model your-model-name
```

## 4. Your First Session

Once connected, type a task:

```
❯ Read package.json and summarize the project
```

The engine will:
1. Send your message to the provider
2. The model will call the `Read` tool
3. The permission gate may ask for confirmation (press `y`)
4. The tool result is returned to the model
5. The model responds with a summary

### Try the SDLC Workflow

For a more structured workflow, try a task that triggers the full SDLC:

```
❯ Add input validation to the username field
```

The engine will ask: `Use SDLC workflow (plan → implement → test)? [Y/n]`

Press Enter (or `y`) to start the governed workflow:

1. **Explore** — The model reads relevant files
2. **Planning** — The model writes a plan (you approve or reject)
3. **Implement** — The model makes code changes
4. **Test** — The model runs tests and mandatory safety checks

See [SDLC Workflow](/nehanda-cli-sdlc) for the full walkthrough.

## 5. Useful First Commands

```
❯ /help            # Show all commands
❯ /model           # List available models
❯ /config          # Show current settings
❯ /mcp status      # Check MCP server status
❯ /clear           # Reset conversation
❯ /exit            # Quit
```

## 6. Optional: Configure MCP Servers

Add external tool servers by creating `mcp.json` in your project root:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

Verify with `/mcp list`. See [MCP Integration](/nehanda-cli-mcp) for the full guide.

## 7. Optional: Settings File

Create `.ona/settings.json` in your project root for project-specific configuration:

```json
{
  "model_config": {
    "provider": "claude_code_subscription",
    "model_id": "claude-sonnet-4-20250514"
  },
  "permissions": {
    "defaultMode": "acceptEdits"
  }
}
```

See [Configuration](/nehanda-cli-configuration) for the full schema.

## Next Steps

- [Architecture](/nehanda-cli-architecture) — Understand the 5-layer system design
- [Engine & Turn Loop](/nehanda-cli-engine) — How a request flows through the system
- [SDLC Workflow](/nehanda-cli-sdlc) — The 6-phase state machine in detail
- [Built-in Tools](/nehanda-cli-tools) — All 21 tools documented
- [Permissions](/nehanda-cli-permissions) — Configure the permission gate
- [Providers](/nehanda-cli-providers) — Multi-provider setup guide
