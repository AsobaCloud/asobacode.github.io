---
title: "Engine & Turn Loop"
layout: default
parent: "Nehanda CLI"
nav_order: 3
---

# Engine & Turn Loop

The engine is the brain of Nehanda CLI. It runs entirely in-process as a single Node.js application — no separate server daemon, no background HTTP relay. Every user interaction flows through `runUserTurn`, the central function in `lib/orchestrate.mjs`.

## The Turn Lifecycle

```
User types a message
        │
        ▼
┌─────────────────────┐
│  UserPromptSubmit   │  Hook: can block the prompt
│  hook fires         │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Append user        │  Written to transcript_entries
│  message to DB      │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Resolve provider   │  activeProvider(settings)
│  & model            │  resolveWireModel(model_config)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Build system       │  Phase-specific prompt +
│  prompt + tools     │  filtered tool list
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Stream API call    │  Anthropic SDK or OpenAI-compat
│  to provider        │  (with or without [TOOL_CALL] rescue)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Parse response     │  Extract text + tool_use blocks
└─────────┬───────────┘
          │
     ┌────┴────┐
     │         │
  Tool calls  Plain text
     │         │
     ▼         ▼
┌──────────┐  Return
│ Execute  │  response
│ each tool│  to user
└────┬─────┘
     │
     ▼
┌─────────────────────┐
│  Append tool        │  Tool results written to
│  results to DB      │  transcript_entries
└─────────┬───────────┘
          │
          ▼
     Loop back to
     "Stream API call"
```

## `runUserTurn` — The Main Entry Point

`runUserTurn(db, rt, userText, io)` is the single function that drives every interaction. It receives:

| Parameter | Type | Description |
|-----------|------|-------------|
| `db` | `better-sqlite3` | The SQLite database connection |
| `rt` | object | Runtime context: `sessionId`, `conversationId`, `cwd`, `settings`, `_model` |
| `userText` | string | The user's input message |
| `io` | object | I/O adapter: `write()`, `println()`, `ask()`, `spinner`, `onToolStart()`, `onToolResult()` |

### Steps

1. **Hook: `UserPromptSubmit`** — Fires before anything else. A hook can block the prompt entirely (e.g., content policy).

2. **SDLC routing** — If the conversation is in `idle` phase and the I/O layer supports asking, the user is prompted: *"Use SDLC workflow (plan → implement → test)?"* If yes, the phase transitions to `explore` and the user's message is wrapped in an exploration prompt template. If no, the message is passed through as-is for a free-form turn.

3. **Provider resolution** — The active provider is read from settings, and the wire model name is resolved. This determines whether the Anthropic SDK path or the OpenAI-compatible path is taken.

4. **Provider dispatch** — Control flows to either `runSdlcAnthropic()` or `runSdlcOpenAICompat()`. Both implement the same phase-driven loop but use different SDKs.

## The Phase Loop

Inside the provider-specific functions, a `while` loop drives the SDLC phases:

```javascript
while (['explore', 'planning', 'implement', 'test'].includes(phase)) {
  const text = await runPhase(db, rt, io, hookRt, ...tools, phase)
  if (text === null) return  // model error

  let advanced = false
  if (phase === 'explore')     advanced = await exploreGate(...)
  if (phase === 'planning')    advanced = await planGate(...)
  if (phase === 'implement')   advanced = await implementGate(...)
  if (phase === 'test')        advanced = await testGate(...)

  if (!advanced) break
  phase = getPhase(db, conversationId)
}
```

Each phase in the loop:

1. Builds a **phase-specific system prompt** (see [SDLC Workflow](/nehanda-cli-sdlc) for prompt templates)
2. **Filters tools** by phase (explore → read-only; planning → none; implement/test → all)
3. Sends the transcript to the API with **streaming** enabled
4. Collects the response (text + any tool calls)
5. If tool calls exist, **executes each one** through the tool orchestrator
6. Repeats until the model stops calling tools
7. Passes the final text to the appropriate **human gate**

## Tool Execution Pipeline

For each tool call the model produces:

```
Model emits tool_use block
        │
        ▼
┌─────────────────────┐
│  PreToolUse hook    │  Can block the tool call
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Permission Gate    │  evaluatePermission(): allow, deny, or ask
└─────────┬───────────┘
          │
     ┌────┼────────┐
     │    │        │
  deny  ask     allow
     │    │        │
     ▼    ▼        ▼
  Error  Prompt   Execute
  result user     tool
     │    │        │
     │    │        ▼
     │    │   ┌──────────────────┐
     │    │   │  Execute tool    │
     │    │   │  (built-in or    │
     │    │   │   dynamic/MCP)   │
     │    │   └────────┬─────────┘
     │    │            │
     │    │            ▼
     │    │   ┌──────────────────┐
     │    │   │  PostToolUse     │
     │    │   │  or              │
     │    │   │  PostToolUse     │
     │    │   │  Failure hook    │
     │    │   └──────────────────┘
     │    │
     ▼    ▼
  Append tool_result to transcript_entries
```

### Phase-based Tool Filtering

Before sending tools to the model, the orchestrator filters them:

| Phase | Available Tools | Rationale |
|-------|----------------|-----------|
| `explore` | `Read`, `Glob`, `Grep` + `explore_only` dynamic tools | Only discovery — no mutations |
| `planning` | *None* | Model writes plan as text, no tool calls |
| `implement` | All tools | Plan approved, execute freely |
| `test` | All tools | Run tests + mandatory safety checkers |
| `idle` | All tools (with permission gate) | Free-form interaction |

### Local-only Tool Subset

When connected to local models (LM Studio, or Ollama without native tool support), the tool set is reduced to six core tools to conserve context window: `Read`, `Write`, `Edit`, `Bash`, `Glob`, `Grep`. Web tools, notebook tools, worktree tools, and agent tools are excluded.

## Subagent Spawning

The `Agent` tool creates a child turn within the same process. The subagent:

1. Gets its own `session_id` (UUID) but shares the `conversation_id`
2. Runs `runUserTurn` recursively with the subagent's prompt
3. Collects all output into a string
4. Fires `SubagentStart` and `SubagentStop` hooks
5. Returns the collected output as the tool result

This enables the model to delegate subtasks without any external process management.

## Error Handling

- **Provider errors** are classified by HTTP status (401 → `authentication_failed`, 429 → `rate_limit`, 404 → `model_not_found`, 500/503 → `server_error`) and reported via the `StopFailure` hook.
- **Tool execution errors** return `is_error: true` in the tool result, which the model sees and can respond to.
- **Permission denials** return an error tool result explaining the decision.
- **Phase violations** (calling a blocked tool in the wrong phase) return an error immediately without executing.
- **Ollama fallback** — if an Ollama model returns a "does not support tools" error, the engine automatically falls back to the `[TOOL_CALL]` rescue path for all subsequent turns.

## The `io` Adapter

The I/O layer abstracts away whether the engine is running in an interactive TUI or headless pipe mode:

| Method | Interactive (Ink TUI) | Pipe Mode |
|--------|----------------------|-----------|
| `io.write(text)` | Renders in the terminal component | Writes to stdout |
| `io.println(text)` | Renders with newline | Writes to stdout |
| `io.ask(question)` | Shows inline prompt, waits for input | Returns `'y'` (auto-approve) |
| `io.spinner.start(msg)` | Shows spinning indicator | No-op |
| `io.spinner.stop()` | Hides spinner | No-op |
| `io.onToolStart(name)` | Updates tool indicator UI | No-op |
| `io.onToolResult(name, content, isError)` | Updates tool result display | No-op |

This is why pipe mode can run fully unattended — all interactive prompts auto-approve.
