---
title: "Architecture"
layout: default
parent: "Nehanda CLI"
nav_order: 2
---

# Architecture

Nehanda CLI is a layered system with five distinct layers, each with a single responsibility. The architecture diagram below shows every component and its connections.

<img src="{{ site.baseurl }}/assets/images/nehanda-architecture.png" alt="Nehanda CLI Architecture Diagram" class="screenshot">

## Layer Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Your Terminal                              │
├─────────────────────────────────────────────────────────────────────┤
│  REPL / Ink TUI                                                     │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────────────┐  │
│  │  Command     │  │  Permission   │  │  Display Renderer      │  │
│  │  Parser      │→ │  Gate         │→ │  (Ink / React)         │  │
│  │  /help /model│  │  allow/deny/  │  │  spinner, tool output  │  │
│  │  /config /mcp│  │  ask          │  │  markdown rendering     │  │
│  └──────────────┘  └───────────────┘  └────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Engine Core                                                        │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────────────┐  │
│  │  Turn Loop   │  │  SDLC State   │  │  Tool Orchestrator     │  │
│  │  runUserTurn │  │  Machine       │  │  phase filtering       │  │
│  │              │  │  idle→plan→    │  │  dispatch & execute    │  │
│  │              │  │  implement→    │  │                        │  │
│  │              │  │  test→verify   │  ├────────────────────────┤  │
│  │              │  │  →done         │  │  [TOOL_CALL] Rescue    │  │
│  └──────────────┘  └───────────────┘  │  Path                   │  │
│                                          └────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Tool Layer                                                         │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────────────┐  │
│  │  Built-in    │  │  Safety       │  │  MCP Client            │  │
│  │  Tools (21)  │  │  Checkers (4) │  │  mcp.json → Servers    │  │
│  │  Read/Write/ │  │  AuditCode    │  │  → External Tools      │  │
│  │  Edit/Bash/  │  │  ShellSafety  │  │  (mcp__<srv>__<tool>) │  │
│  │  Glob/Grep…  │  │  JsSafety     │  │                        │  │
│  └──────────────┘  │  PySafety     │  └────────────────────────┘  │
│                     └───────────────┘                              │
├─────────────────────────────────────────────────────────────────────┤
│  Provider Layer                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  OpenAI-Compatible Client  +  Anthropic SDK                  │  │
│  │  Provider Config: base_url, model, API key                   │  │
│  │  ┌─────────┐ ┌─────────┐ ┌────────┐ ┌──────────┐ ┌──────┐ │  │
│  │  │ Nehanda │ │  LM     │ │ Ollama │ │ Anthropic │ │ Any  │ │  │
│  │  │ Cloud   │ │ Studio  │ │        │ │ Claude    │ │ OAI  │ │  │
│  │  └─────────┘ └─────────┘ └────────┘ └──────────┘ └──────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  Persistence Layer                                                  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  SQLite (~/.config/nehanda/ona-session.db)                   │  │
│  │  WAL mode · 14 tables · FTS5 full-text search                 │  │
│  │  conversations · sessions · transcript_entries · plans        │  │
│  │  events · hook_invocations · tool_permission_log · memories   │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## Layer 1: REPL / Ink TUI

The outermost layer is the user interface, built with [Ink](https://github.com/vadimdemedes/ink) (React for the terminal).

**Command Parser** — Interprets all `/` commands (`/help`, `/model`, `/config`, `/mcp`, `/clear`, `/retry`, `/exit`). Slash commands that modify state (like `/model` or `/config`) write directly to the settings database. See [REPL Reference](/nehanda-cli-repl) for the complete command listing.

**Permission Gate** — Every tool call the model produces is evaluated against the permission policy *before* execution. The gate can auto-allow, auto-deny, or prompt the user. Permissions are phase-aware: tools that require approval in `idle` are auto-allowed during `implement` and `test` because the user already approved the plan. See [Permissions](/nehanda-cli-permissions) for the full policy model.

**Display Renderer** — Ink React components render the assistant's streaming text, tool call indicators, spinners, and approval prompts. In pipe mode (stdin not a TTY), the renderer is replaced with plain stdout/stderr for automation.

## Layer 2: Engine Core

The engine is the brain of the system. It runs entirely in-process — no separate server daemon or background HTTP relay.

**Turn Loop (`runUserTurn`)** — The main entry point for every user interaction. On each turn:
1. The user's prompt is submitted to the hook system (`UserPromptSubmit`)
2. The prompt is appended to the transcript
3. The model is resolved (provider + model ID)
4. The appropriate provider path is selected (Anthropic SDK or OpenAI-compatible)
5. A loop runs: send messages → receive response → execute tools → repeat until the model stops calling tools

See [Engine & Turn Loop](/nehanda-cli-engine) for the full execution flow.

**SDLC State Machine** — Enforces a deterministic phase progression. The model cannot jump phases or skip gates. Phase transitions are validated against an allowlist of valid transitions and persisted to the database. See [SDLC Workflow](/nehanda-cli-sdlc) for the complete state machine.

**Tool Orchestrator** — Selects which tools are available to the model based on the current phase:
- `explore`: only `Read`, `Glob`, `Grep` (plus `explore_only` dynamic tools)
- `planning`: no tools at all — the model writes its plan as text
- `implement`/`test`/`idle`: all tools

When a tool is called, the orchestrator runs pre-tool hooks, evaluates permissions, executes the tool, runs post-tool hooks, and appends the result to the transcript. See [Built-in Tools](/nehanda-cli-tools) for the full tool inventory.

**`[TOOL_CALL]` Rescue Path** — For providers that can't handle native tool schemas (like the Nehanda vLLM deployment behind a proxy that strips `tools` arrays), the engine injects tool definitions into the system prompt using `[TOOL_CALL]...[/TOOL_CALL]` delimiters. The model emits tool calls as structured JSON within these delimiters in its text output, which the engine then parses and executes locally. See [Tool Calling](/nehanda-cli-tool-calling) for the full explanation.

## Layer 3: Tool Layer

All tools the model can invoke live in this layer.

**Built-in Tools (21)** — Core software engineering tools: `Read`, `Write`, `Edit`, `Bash`, `Glob`, `Grep`, `NotebookEdit`, `WebFetch`, `WebSearch`, `AskUserQuestion`, `Brief`, `TodoWrite`, `TaskOutput`, `TaskStop`, `Agent`, `Skill`, `ToolSearch`, `EnterWorktree`, `ExitWorktree`, `ListMcpResources`, `ReadMcpResource`. See [Built-in Tools](/nehanda-cli-tools) for the complete reference.

**Safety Checkers (4)** — Declarative tools registered from JSON configs in `lib/tools/`: `AuditCodeIntegrity`, `ShellSafetyChecker`, `JsSafetyChecker`, `PythonSafetyChecker`. They are mandatory in the `test` phase — the model cannot declare tests passing until all four pass. New checkers can be added with zero JavaScript changes. See [Built-in Tools → Safety Checkers](/nehanda-cli-tools#safety-checkers) for details.

**MCP Client** — Connects to external MCP servers configured in `mcp.json`. Discovered tools are namespaced as `mcp__<server>__<tool>` and injected into the model's tool list. Results are cached for 60 seconds per server. See [MCP Integration](/nehanda-cli-mcp) for the full setup guide.

## Layer 4: Provider Layer

Abstracts away the differences between LLM providers behind a unified interface.

**OpenAI-Compatible Client** — Used by Nehanda Cloud, LM Studio, Ollama, Zhipu, and any OpenAI-compatible endpoint. Supports streaming, tool calling (native and rescue path), and automatic fallback when a provider doesn't support tools.

**Anthropic SDK** — Used by Claude models via the official `@anthropic-ai/sdk`. Supports streaming, native tool use, and OAuth bearer tokens.

**Provider Config** — Each provider has a `base_url`, `model` identifier, and optional `api_key`. The active provider is stored in settings and can be switched at runtime with `/model`. See [Providers](/nehanda-cli-providers) for the full provider reference.

## Layer 5: Persistence Layer

All state is stored locally in a single SQLite database — no cloud dependency for persistence.

**Database location:** `~/.config/nehanda/ona-session.db` (configurable via `AGENT_SDLC_DB` environment variable).

**Key characteristics:**
- WAL (Write-Ahead Logging) journal mode for concurrent reads
- 14 tables covering conversations, sessions, transcripts, plans, events, hooks, permissions, memories, and settings
- FTS5 full-text search index on the `memories` table
- All data queryable with any SQLite client

See [Database](/nehanda-cli-database) for the complete schema reference.

## Cross-Cutting Concerns

| Concern | Description | See |
|---------|-------------|-----|
| **Configuration** | Settings files (`.ona/settings.json`), database-backed merge, `/config` commands | [Configuration](/nehanda-cli-configuration) |
| **Hooks** | Event-driven shell commands on tool use, file changes, phase transitions | [Hooks](/nehanda-cli-hooks) |
| **Pipe Mode** | Headless execution, `--eval`, `--transition`, automation | [Pipe Mode](/nehanda-cli-pipe-mode) |
| **Bash Guard** | Pre-execution validation of shell commands (blocks dangerous patterns) | [Built-in Tools → Bash](/nehanda-cli-tools#bash) |
| **Epistemic Filter** | Redacts SEARCH/REPLACE blocks from assistant context during `test` phase | [SDLC Workflow → Epistemic Isolation](/nehanda-cli-sdlc#epistemic-isolation) |
