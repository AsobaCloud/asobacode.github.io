---
title: "REPL Reference"
layout: default
parent: "Nehanda CLI"
nav_order: 6
---

# REPL Reference & TUI Features

Nehanda CLI provides a high-performance terminal interface built on [Ink](https://github.com/vadimdemedes/ink) (React in the terminal) with process legibility, structured table output, interactive safety menus, and slash commands.

## Launching the REPL

```bash
# Global alias
nehanda

# Or alternative aliases
ona
ona-code

# Direct node invocation
npm start
node bin/nehanda-ui.mjs
```

---

## Core Slash Commands

| Command | Syntax | Description |
|:---|:---|:---|
| `/help` | `/help` | Lists all available commands, subcommands, and flags |
| `/model` | `/model` | Launches the interactive Goose-style provider and model configuration wizard |
| `/key` | `/key <provider> [KEY]` | Interactively saves or updates an API key for any provider |
| `/config` | `/config` | Read-only inspection of active provider, model ID, host URL, and latency |
| `/clear` | `/clear` | Clears conversation state and resets the transcript |
| `/retry` | `/retry` | Re-executes the last failed turn |
| `/exit` | `/exit` | Gracefully closes the REPL and saves session state |

---

## Provider & Key Commands

### `/model` (Interactive Wizard)
Launches the single-flow wizard to switch providers, enter API keys, specify custom hosts, and browse discovered model catalogs with type-to-filter search:

```
❯ /model
◆  Which provider?
│  ● OpenRouter
│  ○ Anthropic Claude
│  ○ Ollama
...
```

### `/key <provider> [KEY]`
Saves credentials for any supported provider. Keys entered via `/key` are masked during entry and redacted from session transcripts:

```
❯ /key openrouter sk-or-v1-0987654321fedcba...
✓ Saved openrouter API key.
```

If `[KEY]` is omitted, the REPL prompts for the key interactively with masked input.

### `/config` (Read-Only Status)
Displays current runtime status without risk of accidental mutation:

```
❯ /config
  Provider:  openrouter
  Model:     openai/gpt-4o
  Endpoint:  https://openrouter.ai/api/v1 (28ms)
  Sidecar:   Laya System-1 (PID 48212, warm)
  Directory: /Users/shingi/Workbench/energy-project
```

---

## MCP Server Commands

Manage external Model Context Protocol servers configured in `~/.config/nehanda/mcp.json` or project-local `mcp.json`:

| Command | Description |
|:---|:---|
| `/mcp status` | Displays all registered MCP servers and their transport commands |
| `/mcp list` | Connects to running servers, calls `tools/list`, and displays discovered tool schemas |
| `/mcp reload [server]` | Invalidates in-memory tool caches and reconnects to MCP servers |
| `/mcp add <name> <cmd> [args...]` | Adds a new MCP server definition and persists to `mcp.json` |
| `/mcp env <server>` | Lists environment variables configured for the specified server |
| `/mcp env <server> <KEY> <VALUE>` | Sets an environment variable for the server (value masked in output) |
| `/mcp env unset <server> <KEY>` | Explicitly unsets an environment variable |

---

## TUI Features & Process Legibility

### 1. Live Reasoning Progress
During reasoning phases with chain-of-thought models (such as DeepSeek-R1 or GPT-4o on OpenRouter), the spinner updates live with incremental token counters:

```
⠋ Thinking (148 tokens)...
```

Pressing `Esc` cancels inference immediately via `AbortController`.

### 2. Tool Argument Summaries
While tools are executing, the TUI displays clean, contextual activity verbs and argument summaries:

```
⚙ Read(lib/workflow.mjs)
⚙ Bash(git status -s)
⚙ Grep(evaluatePermission)
```

### 3. Tool Result Suffixes
When tools return, the TUI appends context suffixes to confirm the volume of data processed:
* `Read`: Number of lines read (e.g. `(142 lines)`)
* `Write`/`Edit`: Character counts applied (e.g. `(2,450 chars)`)
* `Bash`: Elapsed execution time in milliseconds (e.g. `(48ms)`)

### 4. Structured Table Rendering (`cli-table3`)
JSON array payloads from telemetry tools or database queries automatically format as box-drawing tables with column headers and row summaries. Output is capped at 10 rows with an overflow note to protect terminal history.

### 5. Interactive `BlockConfirmMenu`
If a command violates security rules (e.g., listening sockets, root access, writes outside project), execution pauses and surfaces the safety menu:
* `[A]` **Approve for Session:** Caches approval in-memory so you aren't prompted again.
* `[S]` **Run in OS Sandbox:** Executes inside an isolated, disposable snapshot using Apple Seatbelt (macOS) or Bubblewrap (Linux).
* `[C]` **Cancel:** Safely aborts the command.

### 6. Draft-Preserving History Navigation
Use `Up` and `Down` arrow keys to cycle through previous commands. Any in-progress draft text is preserved when navigating back down to the current prompt.
