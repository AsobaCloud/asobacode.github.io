---
title: "SDLC Workflow"
layout: default
parent: "Nehanda CLI"
nav_order: 4
---

# SDLC Workflow

Nehanda CLI enforces a deterministic software development lifecycle through a state machine. The model cannot skip phases, jump ahead, or bypass human approval gates.

## State Machine

```
                    ┌──────────┐
         ┌──────────│  done    │
         │          └──────────┘
         │               ▲
         │               │ tests accepted
         │          ┌────┴─────┐
         │          │  verify  │
         │          └────┬─────┘
         │               │ submit test
         │          ┌────┴─────┐
         │          │  test    │
         │          └────┬─────┘
         │               │ impl accepted
         │          ┌────┴─────────┐
         │          │  implement   │
         │          └────┬─────────┘
         │               │ plan approved
         │          ┌────┴─────────┐
         │          │  planning    │
         │          └────┬─────────┘
         │               │ explore complete
         │          ┌────┴─────┐
         └──────────│  explore  │
                    └────┬─────┘
                         │ user confirms SDLC
                    ┌────┴─────┐
                    │  idle    │
                    └──────────┘
```

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