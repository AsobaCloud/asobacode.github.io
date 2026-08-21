---
title: "Nehanda CLI"
layout: default
---

<div class="page-header">
  <h1>Nehanda CLI</h1>
  <div class="version-badge">
    <span class="version-label">License</span>
    <span class="version-value">AGPL-3.0</span>
    <span class="version-separator">|</span>
    <span class="version-label">Repo</span>
    <a href="https://github.com/AsobaCloud/nehanda-cli" class="version-value" target="_blank">GitHub →</a>
  </div>
</div>

<div class="quick-start-section">
  <a href="https://github.com/AsobaCloud/nehanda-cli" class="quick-start-button" target="_blank">
    View on GitHub
  </a>
  <p class="quick-start-subtext">
    An agentic terminal REPL and single-process engine built for governed AI deep research and software development. Free and open-source.
  </p>
</div>

## Overview

Nehanda CLI is an agentic terminal REPL and single-process engine built for governed AI deep research and software development. It connects directly to our flagship [Nehanda v3](https://huggingface.co/asoba/nehanda-v3-27b), as well as local or cloud-based Ollama models, LM Studio instances, or any OpenAI-compatible API.

Every conversation turn, tool call, phase transition, and permission check is stored in a local, queryable SQLite database you own, ensuring complete transcripts exist for auditing and debugging.

## Architecture

Nehanda CLI combines an Ink TUI with a deterministic orchestration engine:

```
  Your Terminal
    └─ Ink TUI (nehanda-ui.mjs)
         │
         ▼
  In-Process Engine (runUserTurn)
    • SQLite database for session state
    • Dynamic Tool Rescue ([TOOL_CALL] format)
    • SDLC workflow enforcement
         │
         ├─→ Nehanda Cloud (https://nehanda-ml.asoba.co/v1)
         ├─→ Local LM Studio (port 1234/8000)
         ├─→ Remote Ollama over LAN
         └─→ Any OpenAI-compatible API
```

The engine executes turns directly inside the process, eliminating separate server daemons or background HTTP relays. All session state is persisted locally in SQLite at `~/.config/nehanda/ona-session.db`.

## Quick Start

### Requirements

- **Node.js**: v22.0.0 or higher
- **SQLite**: Local SQLite runtime support

### Installation

```bash
git clone https://github.com/AsobaCloud/nehanda-cli.git
cd nehanda-cli
npm install
```

### Launching the REPL

Launch the interactive Ink TUI:

```bash
npm start
# or directly run:
node bin/nehanda-ui.mjs
```

### Provider Setup

#### Option A: Nehanda Cloud (Default)

The CLI defaults to the primary Nehanda endpoint (`https://nehanda-ml.asoba.co/v1`). If an API key is required:

```
❯ /key
New Nehanda API key: <your-key>
```

#### Option B: Local LM Studio

Start LM Studio locally on port `1234` or `8000`, then start the CLI. Select or switch models via:

```
❯ /model
```

#### Option C: Remote Ollama over LAN

To connect to an Ollama instance running on your network:

```
❯ /config base_url http://AsobaCorp-1.local:11434/v1
❯ /model ollama/deepseek-coder-v2:latest
```

## Key Features

### In-Process Engine

Executes turns directly inside the process via `runUserTurn`, eliminating separate server daemons or background HTTP relays.

### Dynamic Tool Rescue ([TOOL_CALL])

Native support for endpoints that strip OpenAI tool schemas (such as `nehandaMlProxy`). The engine dynamically injects active tool schemas directly into system prompts as `[TOOL_CALL]` blocks, parsing and executing tools locally without server-side function-calling support. Uses `[TOOL_CALL]` delimiters instead of `<tool_call>` XML to prevent vLLM's `--tool-call-parser qwen3_xml` stop-token interception.

### Deterministic SDLC Workflow

Enforces a 6-phase state machine (`idle` → `plan` → `implement` → `test` → `verify` → `done`) to prevent unapproved code changes, hallucinated test passes, or unverified implementations.

### Interactive TUI & Pipe Support

Rich Ink-based TUI (`bin/nehanda-ui.mjs`) for interactive development sessions, with headless pipe-mode support (`bin/agent.mjs`) for acceptance testing and automation.

### Multi-Provider Switching

Seamlessly switch between Nehanda 27B, local LM Studio, Ollama instances over LAN, Anthropic Claude, or any OpenAI-compatible API using `/model`.

## REPL Commands

| Command | Description |
|---------|-------------|
| `/help` | Display available commands |
| `/model [name]` | Discover and switch active provider or model endpoint |
| `/key` | Save Nehanda API key |
| `/config` | View or set settings (e.g., `/config base_url <url>`) |
| `/clear` | Clear conversation history and reset transcript state |
| `/retry` | Resend the last failed request |
| `/exit` | Exit the REPL |

## SDLC Workflow

The engine enforces state transitions across six distinct phases:

1. **`idle`**: Discovery and triage. Mutating file tools are physically masked out.
2. **`plan`**: Model formulates success criteria and implementation steps.
3. **`implement`**: Code changes applied using file editing and shell execution.
4. **`test`**: Automated test generation and execution.
5. **`verify`**: Inspection of test outputs and coverage verification.
6. **`done`**: Final sign-off and git commit creation.

## Database Schema

Session state is persisted locally at `~/.config/nehanda/ona-session.db`. Key tables include:

- `conversations`: Active workflow phases and project roots.
- `transcript_entries`: Sequence of user messages, assistant turns, tool calls, and results.
- `plans`: Content, hashes, and approval status for technical plans.
- `events`: SDLC milestones and test execution output.

## Tool Calling Architecture

The Nehanda vLLM deployment runs with `--tool-call-parser qwen3_xml` and `--enable-auto-tool-choice` flags. The `nehandaMlProxy` Lambda function strips `tools` and `tool_choice` from requests before forwarding to vLLM to avoid a Qwen3 chat template bug where the presence of a `tools` array causes system message ordering errors.

To enable tool calling despite this constraint, the engine uses a rescue path:

1. **System Prompt Injection:** Tool schemas are injected into the system prompt using `[TOOL_CALL]...[/TOOL_CALL]` delimiters.
2. **Late Directive Injection:** A `[SYSTEM DIRECTIVE]` is appended to the final user message to defeat token recency bias on reasoning models.
3. **Model Generation:** The model emits tool calls in the `[TOOL_CALL]` format within its response text.
4. **Local Parsing & Execution:** Tool calls are extracted and executed locally, continuing the execution loop even when backends return `finish_reason: "stop"`.

This approach bypasses vLLM's stop-token interception entirely, allowing the model to complete generation and return valid, parseable tool calls.

## Testing & Verification

Run the acceptance suite:

```bash
npm run acceptance
```

Verify SDLC hook ordering:

```bash
npm run verify
```

## Further Documentation

For more detailed information, see the [nehanda-cli GitHub repository](https://github.com/AsobaCloud/nehanda-cli).

## License

AGPL-3.0. This project is a fork of [aimee](https://github.com/RakuenSoftware/aimee) (AGPL-3.0, Copyright © 2026 The aimee authors). See [NOTICE](https://github.com/AsobaCloud/nehanda-cli/blob/main/NOTICE) for third-party attributions.
