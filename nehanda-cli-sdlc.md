---
title: "SDLC Workflow"
layout: default
parent: "Nehanda CLI"
nav_order: 4
---

# SDLC Workflow

Nehanda CLI enforces a deterministic software development lifecycle through a state machine. The model cannot skip phases, jump ahead, or bypass human approval gates.

## State Machine

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="100%" height="auto">
  <rect width="960" height="540" rx="16" fill="#4551BF"/>
  <text x="32" y="36" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" letter-spacing="1">SDLC STATE MACHINE</text>
  <text x="32" y="52" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Deterministic phase progression · no skipping · no backtracking without explicit human gate</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- State nodes (vertical stack, centered) -->
  <!-- idle -->
  <g transform="translate(380,72)">
    <rect width="200" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="100" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">idle</text>
    <text x="100" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Free-form · all tools (gated)</text>
  </g>
  <line x1="480" y1="118" x2="480" y2="138" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,138 475,130 485,130" fill="#8892E0"/>
  <rect x="390" y="123" width="180" height="16" rx="8" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="134" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">user confirms SDLC</text>

  <!-- explore -->
  <g transform="translate(380,140)">
    <rect width="200" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="100" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">explore</text>
    <text x="100" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Read · Glob · Grep only</text>
  </g>
  <line x1="480" y1="186" x2="480" y2="206" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,206 475,198 485,198" fill="#8892E0"/>
  <rect x="374" y="191" width="212" height="16" rx="8" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="202" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">explore complete → summarize</text>

  <!-- planning -->
  <g transform="translate(380,208)">
    <rect width="200" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="100" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">planning</text>
    <text x="100" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">No tools · text plan only</text>
  </g>
  <line x1="480" y1="254" x2="480" y2="274" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,274 475,266 485,266" fill="#8892E0"/>
  <rect x="390" y="259" width="180" height="16" rx="8" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="270" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">plan approved ✓</text>

  <!-- implement -->
  <g transform="translate(380,276)">
    <rect width="200" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="100" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">implement</text>
    <text x="100" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">All tools · auto-allowed</text>
  </g>
  <line x1="480" y1="322" x2="480" y2="342" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,342 475,334 485,334" fill="#8892E0"/>
  <rect x="374" y="327" width="212" height="16" rx="8" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="338" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">implementation accepted ✓</text>

  <!-- test -->
  <g transform="translate(380,344)">
    <rect width="200" height="44" rx="10" fill="#2E378C" stroke="#7B86EE" stroke-width="1.5"/>
    <text x="100" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">test</text>
    <text x="100" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">All tools · safety checkers mandatory</text>
  </g>
  <line x1="480" y1="390" x2="480" y2="410" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,410 475,402 485,402" fill="#8892E0"/>
  <rect x="390" y="395" width="180" height="16" rx="8" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="406" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">tests accepted ✓</text>

  <!-- verify -->
  <g transform="translate(380,412)">
    <rect width="200" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="100" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">verify</text>
    <text x="100" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Coverage review · human sign-off</text>
  </g>
  <line x1="480" y1="458" x2="480" y2="478" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,478 475,470 485,470" fill="#8892E0"/>
  <rect x="398" y="463" width="164" height="16" rx="8" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="474" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">sign-off ✓</text>

  <!-- done -->
  <g transform="translate(380,480)">
    <rect width="200" height="44" rx="10" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <text x="100" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">done</text>
    <text x="100" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Task complete · new task resets</text>
  </g>

  <!-- Backtrack arrow: any → planning -->
  <path d="M 380 300 Q 180 300 180 230 Q 180 208 380 230" stroke="#C85A5A" stroke-width="1.5" stroke-dasharray="5,3" fill="none"/>
  <polygon points="380,230 370,224 370,236" fill="#C85A5A"/>
  <rect x="76" y="254" width="118" height="16" rx="8" fill="#2E378C" stroke="#C85A5A" stroke-width="1"/>
  <text x="135" y="265" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#C85A5A">backtrack to plan</text>

  <text x="480" y="532" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2" opacity="0.7">lib/workflow.mjs · setPhase() · canTransition()</text>
</svg>

## Valid Transitions

| From | Can transition to |
|------|-------------------|
| `idle` | `planning` |
| `planning` | `planning` (revise), `implement` |
| `implement` | `planning` (backtrack), `test` |
| `test` | `planning` (backtrack), `verify` |
| `verify` | `planning` (backtrack), `done` |
| `done` | `planning` (new task) |

Any attempt to transition outside these rules is rejected by `canTransition()`.

## Phase Descriptions

### `idle`

The default state. Free-form interaction mode — the model can use any tool (subject to permissions) and there is no SDLC enforcement. When the user submits a task and confirms SDLC workflow, the engine transitions to `explore`.

**Tools available:** All (with permission gate)

### `explore`

The model's only job is to find and read files relevant to the task. It uses `Glob`, `Grep`, and `Read` to systematically explore the codebase. The user's message is wrapped in a structured exploration template that directs the model to search for relevant files.

**Tools available:** `Read`, `Glob`, `Grep` (plus any `explore_only` dynamic tools)

**System prompt enforces:** "Do NOT write plans, suggest steps, ask questions, or produce any output other than tool calls. When done, output EXACTLY: `Exploration complete.`"

### `planning`

The model writes a plan based on the file summaries from exploration. **No tools are available** — the model must write its plan as text using a structured template:

```
## Objective
<one sentence describing what you will produce>

## Plan
1. <exact command, script invocation, or file write>
2. <exact command, script invocation, or file write>
...

## Proof of Success
<specific file or output that will exist when done>
```

**Tools available:** None

### `implement`

The approved plan is fed back to the model, which executes it using `Write`, `Edit`, `Bash`, and other tools. The system prompt tells the model to "execute the approved plan exactly" and write a one-line summary when done.

**Tools available:** All

### `test`

The model must run the project's tests using `Bash`. If tests fail, it fixes the code and re-runs. After tests pass, all **mandatory safety checkers** must pass. The system prompt enforces this with an explicit instruction: "After tests pass, you MUST run these mandatory safety checks. Do NOT skip them."

**Tools available:** All (safety checkers mandatory)

#### Epistemic Isolation

During the test phase, an **epistemic filter** (`applyEpistemicFilter`) redacts all SEARCH/REPLACE blocks from assistant messages before building the API context. This prevents the test-generation model from reading the implementation it is supposed to independently verify — the test phase model sees only a placeholder:

```
[implementation details redacted for epistemic isolation]
```

This ensures test generation is genuinely independent and not simply echoing back the implementation code.

### `verify`

The user reviews test outputs and coverage. If satisfied, the task is marked as done.

### `done`

Final sign-off. The conversation returns to `idle` and is ready for a new task.

## Human Gates

Four gates require human confirmation before the engine advances:

| Gate | Trigger | Question | If rejected |
|------|---------|----------|-------------|
| **Explore gate** | Model outputs "Exploration complete." | Automatic — files are summarized by a second LLM call | N/A (automatic) |
| **Plan gate** | Model finishes writing plan | "Approve this plan? [y/N]" | Returns to `idle`, plan is discarded |
| **Implement gate** | Model finishes implementation (summary shown) | "Accept implementation and run tests? [y/N]" | Stays in `implement` phase |
| **Test gate** | Model finishes tests (summary shown) | "Accept test results and complete task? [y/N]" | Stays in `test` phase |

## Explore Gate: Summarization Pipeline

The explore gate is unique — it doesn't prompt the user. Instead, it:

1. Extracts all `Read` tool results from the transcript (up to 6,000 chars per file, first 50 lines as header)
2. Sends each file to a **summarization LLM call** asking: "What does this file tell you that is directly relevant to accomplishing the task?"
3. Filters out files marked "Not relevant"
4. Assembles the summaries into a structured planning prompt
5. Appends the planning prompt as a new user message and transitions to `planning`

This compression step is critical: it prevents the planning phase from consuming the full file contents in context, keeping the planning prompt focused and concise.

## Backtracking

At any gate (implement, test, verify), the user can reject the output. The engine then:

- Keeps the current phase (the model can continue working)
- The model sees the rejection in the transcript and can adjust

From `implement`, `test`, or `verify`, the user can also explicitly transition back to `planning` to start over with a revised plan. This is the only way to go backwards in the state machine.