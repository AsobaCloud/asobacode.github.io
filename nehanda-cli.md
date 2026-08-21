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
    An agentic terminal REPL and single-process engine for governed AI deep research and software development. Every turn, tool call, phase transition, and permission check is stored in a local SQLite database you own.
  </p>
</div>

## Architecture

Nehanda CLI is a layered system with five distinct layers. Every component shown below is documented in the pages listed under **Nehanda CLI** in the sidebar.

<img src="{{ site.baseurl }}/assets/images/nehanda-architecture.png" alt="Nehanda CLI Architecture Diagram" class="screenshot">

The architecture has five layers:

| Layer | What it does | Documented in |
|-------|-------------|---------------|
| **REPL / Ink TUI** | Command parsing, permission gates, display rendering | [REPL Reference](/nehanda-cli-repl), [Permissions](/nehanda-cli-permissions) |
| **Engine Core** | Turn loop (`runUserTurn`), SDLC state machine, tool orchestration, `[TOOL_CALL]` rescue path | [Engine & Turn Loop](/nehanda-cli-engine), [SDLC Workflow](/nehanda-cli-sdlc), [Tool Calling](/nehanda-cli-tool-calling) |
| **Tool Layer** | 21 built-in tools, 4 safety checkers, MCP client for external tools | [Built-in Tools](/nehanda-cli-tools), [MCP Integration](/nehanda-cli-mcp) |
| **Provider Layer** | OpenAI-compatible client abstraction, multi-provider switching | [Providers](/nehanda-cli-providers) |
| **Persistence Layer** | Local SQLite database (14 tables, WAL mode, FTS5) | [Database](/nehanda-cli-database) |

Cross-cutting concerns are documented separately:

- [**Configuration**](/nehanda-cli-configuration) — Settings files, merge strategy, `/config` commands
- [**Hooks**](/nehanda-cli-hooks) — Event-driven hook system for file changes, tool use, and phase transitions
- [**Pipe Mode**](/nehanda-cli-pipe-mode) — Headless execution, `--eval`, `--transition`, and automation

## Key Features

### In-Process Engine

Executes turns directly inside the process via `runUserTurn`, eliminating separate server daemons or background HTTP relays. The engine runs a deterministic loop: prompt → API call → tool execution → response, all within a single Node.js process.

### Deterministic SDLC Workflow

Enforces a 6-phase state machine (`idle` → `explore` → `planning` → `implement` → `test` → `verify` → `done`) to prevent unapproved code changes, hallucinated test passes, or unverified implementations. Each phase has its own system prompt, tool mask, and human gate.

### Permission Gate

Every tool call passes through the permission gate before execution. Five permission modes (`default`, `bypassPermissions`, `dontAsk`, `acceptEdits`, `plan`) control whether tools are auto-allowed, auto-denied, or require human confirmation. Permissions are phase-aware: `implement` and `test` phases auto-allow execution tools since the plan was already approved.

### 21 Built-in Tools

File operations (`Read`, `Write`, `Edit`), shell execution (`Bash`), discovery (`Glob`, `Grep`), web access (`WebFetch`, `WebSearch`), notebook editing, git worktrees, subagent spawning, MCP integration, and more. Tools are filtered by SDLC phase — mutating tools are masked during `explore` and `planning`.

### Multi-Provider Switching

Seamlessly switch between Nehanda 27B, local LM Studio, Ollama instances, Anthropic Claude, Zhipu GLM, or any OpenAI-compatible API using `/model`. The provider layer auto-detects capabilities (e.g., Ollama tool support) and falls back to manual tool injection when needed.

### Dynamic Tool Rescue (`[TOOL_CALL]`)

For endpoints that strip OpenAI tool schemas (like the Nehanda vLLM proxy), the engine injects tool schemas into system prompts using `[TOOL_CALL]` delimiters, parses them from model output, and executes them locally — bypassing vLLM's `--tool-call-parser` stop-token interception entirely.

### Complete Audit Trail

Every conversation turn, tool call, phase transition, permission decision, and hook invocation is stored in a local SQLite database at `~/.config/nehanda/ona-session.db`. You own this data — no cloud dependency for persistence.

## Quick Start

```bash
git clone https://github.com/AsobaCloud/nehanda-cli.git
cd nehanda-cli
npm install
npm start
```

See the [Getting Started](/nehanda-cli-getting-started) page for the full setup guide including provider configuration.

## License

AGPL-3.0. This project is a fork of [aimee](https://github.com/RakuenSoftware/aimee) (AGPL-3.0). See [NOTICE](https://github.com/AsobaCloud/nehanda-cli/blob/main/NOTICE) for third-party attributions.
