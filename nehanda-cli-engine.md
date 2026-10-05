---
title: "Engine & Turn Loop"
layout: default
parent: "Nehanda CLI"
nav_order: 3
---

# Engine & Turn Loop

The engine is the brain of Nehanda CLI. It runs entirely in-process as a single Node.js application — no separate server daemon, no background HTTP relay. Every user interaction flows through `runUserTurn`, the central function in `lib/orchestrate.mjs`.

## The Turn Lifecycle

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 580" width="100%" height="auto">
  <rect width="960" height="580" rx="16" fill="#4551BF"/>
  <text x="32" y="36" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" letter-spacing="1">TURN LIFECYCLE — runUserTurn(db, rt, userText, io)</text>
  <line x1="32" y1="48" x2="928" y2="48" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Step 1 -->
  <g transform="translate(330,60)">
    <rect width="300" height="52" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="150" y="24" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">Hook: UserPromptSubmit</text>
    <text x="150" y="42" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Can block the prompt entirely</text>
  </g>
  <line x1="480" y1="114" x2="480" y2="134" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,134 475,126 485,126" fill="#8892E0"/>

  <!-- Step 2 -->
  <g transform="translate(330,136)">
    <rect width="300" height="52" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="150" y="24" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">Append to transcript_entries</text>
    <text x="150" y="42" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">User message written to SQLite</text>
  </g>
  <line x1="480" y1="190" x2="480" y2="210" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,210 475,202 485,202" fill="#8892E0"/>

  <!-- Step 3 -->
  <g transform="translate(280,212)">
    <rect width="400" height="52" rx="10" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <text x="200" y="24" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">Jev-Mem Hot Path</text>
    <text x="200" y="42" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">ingest → Laya System-1 → retrieve evidence → pinned context → System-2 messages</text>
  </g>
  <line x1="480" y1="266" x2="480" y2="286" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,286 475,278 485,278" fill="#8892E0"/>

  <!-- Step 4 -->
  <g transform="translate(330,288)">
    <rect width="300" height="52" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="150" y="24" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">Build System Prompt + Tools</text>
    <text x="150" y="42" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Phase-specific prompt · filtered tool list</text>
  </g>
  <line x1="480" y1="342" x2="480" y2="362" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,362 475,354 485,354" fill="#8892E0"/>

  <!-- Step 5 -->
  <g transform="translate(280,364)">
    <rect width="400" height="52" rx="10" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <text x="200" y="24" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">Stream API Call to Provider</text>
    <text x="200" y="42" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Anthropic SDK or OpenAI-compat · native or [TOOL_CALL] rescue</text>
  </g>
  <line x1="480" y1="418" x2="480" y2="438" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,438 475,430 485,430" fill="#8892E0"/>

  <!-- Branch: tool calls vs plain text -->
  <line x1="480" y1="440" x2="300" y2="470" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="480" y1="440" x2="660" y2="470" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>

  <g transform="translate(170,472)">
    <rect width="250" height="48" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="125" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">Tool Calls</text>
    <text x="125" y="39" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Execute → append → loop back</text>
  </g>

  <g transform="translate(540,472)">
    <rect width="250" height="48" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="125" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">Plain Text Response</text>
    <text x="125" y="39" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Render to user · end turn</text>
  </g>

  <!-- Loop back arrow -->
  <path d="M 295 496 Q 200 540 200 364 Q 200 280 280 364" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3" fill="none"/>
  <polygon points="280,364 272,372 288,372" fill="#8892E0"/>
  <rect x="78" y="488" width="108" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="132" y="500" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">LOOP UNTIL DONE</text>

  <text x="480" y="570" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2" opacity="0.7">lib/orchestrate.mjs · runUserTurn()</text>
</svg>

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

3. **Jev-Mem hot path** — The latest transcript tail is ingested as an observation (write path: type scoring → relation edges). The System-1 state is refreshed via `extractCanonicalState` (Laya). Evidence is retrieved via `retrieveEvidence` (read path: FTS + recency → sufficiency loop). Pinned context blocks are fetched from `pinned_context`. These are assembled into the compact System-2 message list: pinned blocks → canonical header → retrieved evidence → last 2 turns + last failed tool result.

4. **Provider resolution** — The active provider is read from settings, and the wire model name is resolved. This determines whether the Anthropic SDK path or the OpenAI-compatible path is taken.

5. **Provider dispatch** — Control flows to either `runSdlcAnthropic()` or `runSdlcOpenAICompat()`. Both implement the same phase-driven loop but use different SDKs.

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

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 460" width="100%" height="auto">
  <rect width="960" height="460" rx="16" fill="#4551BF"/>
  <text x="32" y="36" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" letter-spacing="1">TOOL EXECUTION PIPELINE</text>
  <line x1="32" y1="48" x2="928" y2="48" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Step 1: PreToolUse Hook -->
  <g transform="translate(330,60)">
    <rect width="300" height="50" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="150" y="23" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">PreToolUse Hook</text>
    <text x="150" y="40" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Can block the tool call</text>
  </g>
  <line x1="480" y1="112" x2="480" y2="130" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,130 475,122 485,122" fill="#8892E0"/>

  <!-- Step 2: Permission Gate -->
  <g transform="translate(330,132)">
    <rect width="300" height="50" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="150" y="23" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">Permission Gate</text>
    <text x="150" y="40" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">evaluatePermission(): allow / deny / ask</text>
  </g>

  <!-- Three branches -->
  <line x1="480" y1="184" x2="480" y2="200" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <line x1="480" y1="200" x2="220" y2="224" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="480" y1="200" x2="480" y2="224" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="480" y1="200" x2="740" y2="224" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Deny -->
  <g transform="translate(120,226)">
    <rect width="190" height="44" rx="10" fill="#2E378C" stroke="#C85A5A" stroke-width="1.2"/>
    <text x="95" y="20" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#C85A5A">Deny</text>
    <text x="95" y="36" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Error result to model</text>
  </g>

  <!-- Ask -->
  <g transform="translate(385,226)">
    <rect width="190" height="44" rx="10" fill="#2E378C" stroke="#8892E0" stroke-width="1.2"/>
    <text x="95" y="20" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">Ask</text>
    <text x="95" y="36" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Prompt user in TUI</text>
  </g>

  <!-- Allow -->
  <g transform="translate(645,226)">
    <rect width="190" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="95" y="20" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">Allow</text>
    <text x="95" y="36" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Execute immediately</text>
  </g>

  <!-- Allow + Ask converge to Execute -->
  <line x1="740" y1="272" x2="740" y2="296" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="480" y1="272" x2="480" y2="284" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="480" y1="284" x2="600" y2="296" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="740" y1="296" x2="600" y2="296" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="600" y1="296" x2="600" y2="308" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="600,308 595,300 605,300" fill="#8892E0"/>

  <!-- Execute tool -->
  <g transform="translate(430,310)">
    <rect width="340" height="50" rx="10" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <text x="170" y="23" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">Execute Tool</text>
    <text x="170" y="40" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Built-in · dynamic/declarative · MCP</text>
  </g>
  <line x1="600" y1="362" x2="600" y2="380" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="600,380 595,372 605,372" fill="#8892E0"/>

  <!-- PostToolUse Hook -->
  <g transform="translate(430,382)">
    <rect width="340" height="50" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="170" y="23" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">PostToolUse Hook</text>
    <text x="170" y="40" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">or PostToolUseFailure · append to transcript</text>
  </g>

  <text x="480" y="450" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2" opacity="0.7">lib/orchestrate.mjs · tool results appended to transcript_entries</text>
</svg>

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
| `io.confirmBlock(payload)` | Raises `BlockConfirmMenu` (`[A]/[S]/[C]`) in Ink event loop; resolves with `'approve'`, `'sandbox'`, or `'cancel'` | Absent — `toolBash` auto-denies |
| `io.spinner.start(msg)` | Shows spinning indicator | No-op |
| `io.spinner.stop()` | Hides spinner | No-op |
| `io.onToolStart(name)` | Updates tool indicator UI | No-op |
| `io.onToolResult(name, content, isError)` | Updates tool result display | No-op |

`io.confirmBlock` is the mechanism that ties the bashguard and safety-checker structured rejection payloads directly into the Ink event loop. When `toolBash` receives a blocked result and `io.confirmBlock` is present, it awaits the user's decision before either proceeding, sandboxing, or cancelling — without blocking the Node.js event loop. When `io.confirmBlock` is absent (pipe/headless mode), the command is auto-denied immediately.
