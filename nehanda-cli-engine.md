---
title: "Engine & Turn Loop"
layout: default
parent: "Nehanda CLI"
nav_order: 3
---

# Engine & Turn Loop

The engine is the computational core of Nehanda CLI. It executes completely in-process within a single Node.js runtime (v22+) — eliminating daemon architectures, container dependencies, or external proxies. Every interaction flows through `runUserTurn`, the central orchestrator in `lib/orchestrate.mjs`.

---

## Turn Lifecycle

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 620" width="100%" height="auto">
  <!-- Canvas -->
  <rect width="960" height="620" rx="16" fill="#4551BF"/>

  <!-- Header -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">NEHANDA TURN LIFECYCLE — runUserTurn(db, rt, userText, io)</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">In-Process Deterministic Turn Execution · Jev-Mem Control Plane · 11-Phase Governance</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Step 1: Hook -->
  <g transform="translate(310, 76)">
    <rect width="340" height="48" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="170" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">1. Hook: UserPromptSubmit</text>
    <text x="170" y="38" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Pre-submission interception · Can block or reshape prompt</text>
  </g>
  <line x1="480" y1="124" x2="480" y2="146" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,146 475,138 485,138" fill="#8892E0"/>

  <!-- Step 2: Transcript -->
  <g transform="translate(310, 148)">
    <rect width="340" height="48" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="170" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">2. Append to transcript_entries</text>
    <text x="170" y="38" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Immutable SQLite audit record · User payload serialized</text>
  </g>
  <line x1="480" y1="196" x2="480" y2="218" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,218 475,210 485,210" fill="#8892E0"/>

  <!-- Step 3: Jev-Mem Hot Path -->
  <g transform="translate(250, 220)">
    <rect width="460" height="52" rx="10" fill="#2E378C" stroke="#7B86EE" stroke-width="1.5"/>
    <text x="230" y="23" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">3. Jev-Mem Hot Path (Laya System-1)</text>
    <text x="230" y="40" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Ingest observation → Laya state extraction → Evidence retrieval → Pinned context</text>
  </g>
  <line x1="480" y1="272" x2="480" y2="294" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,294 475,286 485,286" fill="#8892E0"/>

  <!-- Step 4: Prompt Construction -->
  <g transform="translate(280, 296)">
    <rect width="400" height="50" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="200" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">4. Build Phase Prompt + Tool Mask</text>
    <text x="200" y="38" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Inject [GROUNDED FACTS] · Filter tools by active SDLC phase</text>
  </g>
  <line x1="480" y1="346" x2="480" y2="368" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,368 475,360 485,360" fill="#8892E0"/>

  <!-- Step 5: Streaming API Call -->
  <g transform="translate(260, 370)">
    <rect width="440" height="52" rx="10" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <text x="220" y="23" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">5. Stream Inference Completion</text>
    <text x="220" y="40" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Stream tokens · Live reasoning spinner · Native tools or [TOOL_CALL] rescue</text>
  </g>
  <line x1="480" y1="422" x2="480" y2="446" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,446 475,438 485,438" fill="#8892E0"/>

  <!-- Step 6: Branching (Tool vs Plain Text) -->
  <line x1="480" y1="448" x2="280" y2="478" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="480" y1="448" x2="680" y2="478" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>

  <g transform="translate(150, 480)">
    <rect width="260" height="50" rx="10" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <text x="130" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">Tool Invocations Emitted</text>
    <text x="130" y="38" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Execute tool → Record provenance → Loop</text>
  </g>

  <g transform="translate(550, 480)">
    <rect width="260" height="50" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="130" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">Plain Text Completed</text>
    <text x="130" y="38" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Evaluate SDLC human gate or return turn</text>
  </g>

  <!-- Loopback -->
  <path d="M 280 530 Q 180 580 180 396 Q 180 370 260 385" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3" fill="none"/>
  <polygon points="260,385 250,392 258,402" fill="#8892E0"/>
  <rect x="70" y="525" width="100" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="120" y="537" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">TOOL LOOP</text>

  <text x="480" y="596" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2" opacity="0.8">lib/orchestrate.mjs · runUserTurn() · executeToolUses()</text>
</svg>

---

## Detailed Step Walkthrough

### 1. Pre-Submission Hook (`UserPromptSubmit`)
Fires before any token processing occurs. An external security plugin or local policy hook can inspect `userText` and cancel execution early by returning `{ ok: false, message: "..." }`.

### 2. Transcript Serialization
The prompt is durably written to `transcript_entries` in the local SQLite database. Even if the process terminates or network connectivity drops mid-inference, the exact prompt sequence is preserved.

### 3. Jev-Mem Hot Path & Laya System-1 Control Plane
Nehanda uses a two-tier neural architecture:
* **System-1 (Laya):** Primed into memory on startup (`method: 'load'`), Laya is a 322M non-autoregressive classifier. It ingests the latest transcript observations, updates memory graph relation edges (semantic, temporal, causal, entity), and sets the canonical state in `laya_jev_state`.
* **Adaptive Evidence Retrieval:** Queries full-text search (`memories_fts`) and recency graphs to extract only pertinent memory anchors.
* **Pinned Invariants:** Domain invariants (such as ODSE register maps, physical asset specs, and simulation bounds) are fetched from `pinned_context` and prepended verbatim to every System-2 prompt.
* **Prefill Reduction:** Cuts System-2 context size by 70–85% compared to raw transcript histories.

### 4. Phase Tool Masking & Grounded Facts
The engine constructs the API system prompt dynamically:
* Injects a `[GROUNDED FACTS]` block containing the verified date, operating system, current working directory, and shell.
* Strictly filters tool schemas based on the active SDLC phase. A model in the `explore` phase only receives `Read`, `Glob`, and `Grep` schemas.

### 5. Streaming Inference & Reasoning Counters
Streams server-sent events (SSE) from the inference backend. If the model emits reasoning content (e.g. `delta.reasoning_content`), the TUI spinner updates live with incremental token counts (`⠋ Thinking (N tokens)...`).

### 6. Tool Execution Pipeline
When tool use blocks are detected:
1. `PreToolUse` hook fires.
2. The permission gate evaluates policies (`allow`, `deny`, or `ask`).
3. If blocked by security rules, the interactive `BlockConfirmMenu` prompts the operator (`[A]` Session Approve, `[S]` Run in OS Sandbox, `[C]` Cancel).
4. The tool executes, and elapsed runtime is measured.
5. In SDLC testing phases, test runner outputs are parsed and classified for execution provenance (`test_executions` table).
6. Tool outputs are appended to `transcript_entries` and streamed back into the conversation turn loop.

---

## Governed 11-Phase SDLC Loop

When SDLC governance is active, the engine executes a phase advancement loop across the 11 states:

```javascript
while (['explore', 'diagnose', 'create_issue', 'create_tests', 'planning', 'implement', 'verify', 'safety', 'confirm_fix'].includes(phase)) {
  const text = await runPhase(db, rt, io, hookRt, ...tools, phase)
  if (text === null) return  // model error / aborted

  let advanced = false
  if (phase === 'explore')        advanced = await exploreGate(db, rt, io)
  else if (phase === 'diagnose')  advanced = await diagnoseGate(db, rt, io)
  else if (phase === 'create_issue') advanced = await issueGate(db, rt, io)
  else if (phase === 'create_tests') advanced = await redTestGate(db, rt, io)
  else if (phase === 'planning')  advanced = await planGate(db, rt, io)
  else if (phase === 'implement') advanced = await implementGate(db, rt, io)
  else if (phase === 'verify')    advanced = await greenVerifyGate(db, rt, io)
  else if (phase === 'safety')    advanced = await safetyGate(db, rt, io)
  else if (phase === 'confirm_fix') advanced = await confirmFixGate(db, rt, io)

  if (!advanced) break
  phase = getPhase(db, rt.conversationId)
}
```

### Bounded Exploration Safeguards
To prevent recursive agent loops and token waste during `explore`:
* **20-Request Budget Ceiling:** A hard limit of 20 productive tool requests is enforced during exploration. The 21st request is blocked, forcing a mandatory transition to `diagnose`.
* **Stagnation Detection:** Repeated file reads without new evidence extraction or zero-hit queries trigger an early exit.
* **`.ona/map` Fallback:** If `docs/MAP.md` is absent, the engine computes a lightweight `.ona/map` cache to guide exploration.

---

## Tool Availability Matrix by Phase

| Phase | Read, Glob, Grep | Write, Edit | Bash | Web Tools | Rationale |
|:---|:---:|:---:|:---:|:---:|:---|
| `idle` | Allowed | Ask / Gated | Refused if mutating | Allowed | Open inquiry |
| `explore` | **Allowed** | **Blocked** | **Blocked** | Allowed | Strict discovery |
| `diagnose` | Allowed | **Blocked** | **Blocked** | Allowed | Evidence synthesis |
| `create_issue` | Allowed | `.issues/` only | **Blocked** | Allowed | Register task artifact |
| `create_tests` | Allowed | `tests/**` only | **Allowed** (Test runner) | Allowed | TDD RED regression |
| `planning` | **Blocked** | **Blocked** | **Blocked** | **Blocked** | Plan Triad text only |
| `implement` | Allowed | **Allowed** | Allowed | Allowed | Approved code changes |
| `verify` | Allowed | **Blocked** | **Allowed** (Test runner) | Allowed | TDD GREEN verification |
| `safety` | Allowed | **Blocked** | **Allowed** (Checkers) | Allowed | Static checkers + coverage |
| `confirm_fix` | Allowed | **Blocked** | **Blocked** | Allowed | Human review |
| `done` | Allowed | **Blocked** | **Allowed** (Git commit) | Allowed | Final commit & reset |
