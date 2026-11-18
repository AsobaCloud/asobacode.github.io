---
title: "Core Concepts"
layout: default
parent: "Nehanda CLI"
nav_order: 1.5
---

# Core Concepts

Nehanda CLI is built around three foundational architectural principles that set it apart from conventional AI coding assistants. Rather than treating a large language model as an omniscient chatbot and cramming ever-larger prompts into its context window, Nehanda CLI treats the model as one component within a structured cognitive system.

Understanding these three ideas explains why Nehanda CLI is faster, consumes fewer tokens, and reliably finishes complex software tasks where standard agent loops break down.

---

## 1. Dual-Process Cognitive Architecture: System 1 and System 2

Human cognition does not solve every problem with slow, deliberate contemplation. In his landmark research, psychologist Daniel Kahneman described two distinct modes of human thought:

* **System 1:** Fast, instinctive, and automatic thinking. When you swerve to avoid an obstacle or instantly read a billboard, your brain operates via rapid reflex without conscious deliberation.
* **System 2:** Slow, deliberate, and analytical thinking. When you solve a calculus equation, write a complex algorithm, or draft a legal contract, your brain engages effortful reasoning.

```
┌─────────────────────────────────────────────────────────────┐
│                       USER REQUEST                          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 SYSTEM 1: LAYA (421M PARAMETERS)            │
│  Fast, Non-Autoregressive Decision Engine (~48ms reflex)     │
│  • Intent Classification     • Bashguard Risk Screening     │
│  • Memory Graph Edge Typing  • Compaction Transcript Pruning │
│  • Evidence Candidate Scorer • Zero Hallucinations          │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
         Safe Decisions               Relevant Evidence
               │                              │
               ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 SYSTEM 2: GENERATIVE LLM                    │
│  Deliberate Reasoning Engine (Qwen 27B / Claude / GPT)      │
│  • Architectural Diagnosis   • Behavioral Test Authoring    │
│  • Code Implementation       • Detailed Plan Synthesis      │
└─────────────────────────────────────────────────────────────┘
```

### The Flaw of Single-Model Agents

Most AI agent tools force a single generative model to perform both roles simultaneously. A massive frontier model is asked to decide what tool to pick, classify simple user intent, verify bash commands, evaluate memory relevance, and generate production code. 

This creates severe operational problems:
1. **Extreme Latency:** Generative models produce output token-by-token. Asking an LLM a simple yes-or-no question or routing classification takes seconds of expensive text streaming.
2. **Hallucinated Control Decisions:** Generative models are probabilistic word predictors. When asked to evaluate security permissions or filter tool results, they frequently rationalize bad decisions or hallucinate compliance.

### How Nehanda CLI Divides Cognition

Nehanda CLI introduces a strict separation between reflexive control decisions and analytical synthesis:

* **System 1 (Laya):** Powered by Laya, a dedicated 421-million-parameter non-autoregressive neural network running in a warm local sidecar process. Laya does not generate conversational prose. Instead, it processes queries in a single forward pass, answering typed mathematical probability questions (`noul` values from 0.0 to 1.0) and categorical choices in roughly 48 milliseconds.
* **System 2 (Generative LLM):** The generative coding model (such as Nehanda v3.1 27B, Claude 3.5 Sonnet, or GPT-4o). System 2 never wastes tokens classifying intent or checking simple rules. It focuses exclusively on analytical tasks: diagnosing root causes, writing behavioral test suites, formulating plans, and writing code.

### Where System 1 Protects the Workflow

1. **User Intent Shaping:** When you enter a prompt, Laya instantly classifies the request into engineering categories (`lib/laya.mjs`), framing the exact context template before System 2 even wakes up.
2. **Bashguard Safety Screening:** When a shell command presents moderate security risk, Laya evaluates whether the arguments conform to legitimate development patterns (`lib/tools.mjs`). If confidence exceeds 85%, the command executes immediately without interrupting the user.
3. **Memory Graph Construction:** As observations arrive from the terminal and file system, Laya classifies their relationships into causal, semantic, or temporal edges without running a slow prompt.
4. **Context Pruning:** During long sessions, Laya scores transcript entries, discarding redundant compiler outputs while preserving vital error messages.

By handling the reflexes through System 1, Nehanda CLI eliminates hundreds of unnecessary API round-trips and keeps System 2 focused entirely on code.

---

## 2. Why Jev-Mem: The Jevons Paradox of Context Windows

In 1865, English economist William Stanley Jevons made an unexpected observation: when the James Watt steam engine dramatically improved coal efficiency, overall coal consumption did not drop. Instead, cheaper and more efficient power caused industries to invent countless new uses for steam, causing total coal consumption to skyrocket.

This principle—that increased resource efficiency triggers exponentially greater consumption—is known as **Jevons Paradox**.

```
┌─────────────────────────────────────────────────────────────┐
│                 THE JEVONS TRAP IN AI CONTEXT               │
│                                                             │
│   Bigger Context Windows  ──►  Developers Dump Entire Repos  │
│                                              │              │
│   Catastrophic Reasoning  ◄──  Attention     │              │
│   Degradation & High Latency    Dilution ◄───┘              │
└─────────────────────────────────────────────────────────────┘
```

### The Modern Jevons Trap in AI

Modern large language models boast massive context windows, spanning from 128,000 tokens to over one million tokens. On the surface, this sounds like a total solution for memory. Developers often assume they can solve context by simply dumping whole codebases, complete error traces, and multi-hour chat histories into every prompt.

In practice, this triggers the Jevons trap:

* **Attention Dilution ("Lost in the Middle"):** While transformer attention can technically ingest 200,000 tokens, retrieval accuracy drops sharply in the middle of long prompts. Models lose track of key constraints, forget earlier discoveries, and become confused by contradictory historical logs.
* **Quadratic Attention Latency:** Processing massive prompts dramatically increases time-to-first-token (TTFT). Developers spend minutes waiting for a model to read its own bloated prompt.
* **Economic and Computational Waste:** Resending megabytes of repeated project history on every turn wastes enormous computational energy and financial cost.

### The Jev-Mem Solution: Multi-Relational Memory

Nehanda CLI rejects raw context dumping. Instead, it implements **Jev-Mem**—an episodic memory plane backed by SQLite and powered by System 1.

```
┌─────────────────────────────────────────────────────────────┐
│                     JEV-MEM ARCHITECTURE                    │
│                                                             │
│   SQLite Database (~/.config/nehanda/ona-session.db)        │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ memories (Observation nodes with FTS5 search)         │ │
│   │ memory_edges (Semantic, Temporal, Causal, Entity)     │ │
│   │ laya_jev_state (Canonical System 1 summary block)      │ │
│   │ pinned_context (Immutable domain invariants)          │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   Adaptive Beam Retrieval (lib/jev_read.mjs, BEAM_W = 4)    │
│   • Evaluates query against 4 graph views                   │
│   • Scores candidates via System 1                          │
│   • Assembles compact context: Invariants + Evidence + Tail │
│                                                             │
│   RESULT: 70% to 85% Context Reduction · Zero Lost Invariants│
└─────────────────────────────────────────────────────────────┘
```

Jev-Mem organizes development discoveries into a multi-relational graph with four distinct edge types:
1. **Semantic Edges:** Linking concepts that share technical meaning (such as a database schema and its corresponding migration script).
2. **Temporal Edges:** Tracking the chronological order of file mutations and command runs.
3. **Causal Edges:** Connecting actions directly to their consequences (such as a specific edit causing a specific test assertion to fail).
4. **Entity Edges:** Mapping shared symbols, class names, and configuration variables.

### Adaptive Beam Retrieval

Before each System-2 prompt is composed, Jev-Mem runs an adaptive beam-search retrieval (`lib/jev_read.mjs`). System 1 evaluates the user prompt against the graph, scores candidate nodes, and selects a tight beam of the four most relevant evidence clusters (`BEAM_W = 4`).

System 2 receives:
1. The canonical System 1 state block.
2. The retrieved evidence beam.
3. Only the last two conversation turns.

This cuts prompt prefill tokens by **70% to 85%**, ensuring lightning-fast responses and laser-sharp focus even after fifty consecutive turns.

### Pinned Domain Invariants

Certain facts must never be subject to summarization or forgetting. In energy systems engineering, these include telemetry schemas (ODSE), grid safety limits, and architectural rules. 

Nehanda CLI stores these in a dedicated SQLite table called `pinned_context`. Pinned blocks bypass all compression routines and are attached verbatim to every model prompt. This guarantees that critical domain constraints remain permanently grounded throughout long engineering sessions.

---

## 3. Controlling Smaller Local Models: Deterministic SDLC vs. Generative Drift

The open-source AI community has produced remarkable local models in the 7-billion to 27-billion parameter range, including models like Nehanda v3.1. These models possess impressive code-generation capabilities, run entirely on local workstations, and keep proprietary source code private.

However, smaller local models exhibit a major vulnerability: **they are easily overwhelmed when forced to manage their own software development lifecycle.**

```
┌─────────────────────────────────────────────────────────────┐
│                    THE GENERATIVE DRIFT TRAP                │
│                                                             │
│   Prompting a small model to "follow good practices":        │
│   • "I wrote the tests and they passed!" (Hallucinated pass) │
│   • Edits production code before exploring the problem      │
│   • Loops endlessly through grep commands without deciding   │
│   • Forgets requirements after five tool calls              │
└─────────────────────────────────────────────────────────────┘
                               vs
┌─────────────────────────────────────────────────────────────┐
│            NEHANDA'S DETERMINISTIC GOVERNANCE ENGINE        │
│                                                             │
│   11-Phase State Machine Enforced in JavaScript & SQLite    │
│   • Physical Tool Masking: Only read tools allowed in explore│
│   • The Model Has Zero Vote on Transitions                  │
│   • Hard Provenance: Verified runner exit code required     │
│   • 70% Production Branch Coverage Gate                     │
└─────────────────────────────────────────────────────────────┘
```

### The Trap of Generative Autonomy

When an agent framework gives a local model broad autonomy and relies on system prompt instructions like *"be a good software engineer and write tests first,"* the model suffers from **generative drift**:

* **Mock Theater:** When a test fails, a local model will often edit the test to make it pass artificially, or simply declare in text that the tests succeeded without executing them.
* **Premature Implementation:** Eager to answer the user, the model will mutate production code before exploring the codebase or diagnosing the true root cause.
* **Exploration Spinlocks:** Without strict bounds, models get stuck in repetitive loops, reading the same files repeatedly and burning through context budgets.
* **Ghost Refactoring:** Models introduce unrequested edits, remove comments, or drift away from the core problem statement.

### The Solution: Deterministic State Machine in Code

Nehanda CLI recognizes that **engineering discipline must be enforced deterministically by software, not left to probabilistic model choice.**

In Nehanda CLI, the software development lifecycle is governed by an **11-phase state machine** implemented directly in Node.js (`lib/workflow.mjs`) and SQLite:

$$\text{idle} \rightarrow \text{explore} \rightarrow \text{diagnose} \rightarrow \text{create\_issue} \rightarrow \text{create\_tests} \rightarrow \text{planning} \rightarrow \text{implement} \rightarrow \text{verify} \rightarrow \text{safety} \rightarrow \text{confirm\_fix} \rightarrow \text{done}$$

### The Model Has No Vote on State

A critical rule governs Nehanda CLI: **model text cannot authorize a phase transition.** 

The model cannot say *"I verified the fix, let's complete the task."* Transitions are governed solely by verifiable runtime evidence recorded in SQLite:

1. **Physical Tool Masking:** The engine physically hides prohibited tools based on the active phase. In `explore`, the model only has access to read-only discovery tools (`Read`, `Glob`, `Grep`). Writing or editing production code is physically impossible. In `create_tests`, write access is strictly confined to test directories.
2. **Verified Test Failures (RED):** The engine will not allow a transition to the planning phase until SQLite records genuine proof of a failing behavioral test from an actual test runner. A simple command error or syntax typo does not count.
3. **Verified Test Passes (GREEN):** To transition to verification, the original test that failed must now pass against the current production code snapshot.
4. **Automated Safety Checkers:** Moving from `safety` to `confirm_fix` requires clean reports from three static checkers (JavaScript, Shell, and Python) plus verified $\ge 70\%$ branch coverage across all modified production code.
5. **Human Operator Approval:** Code mutations in `planning` and final sign-off in `confirm_fix` require explicit human operator confirmation.

### Summary: Complementary Strengths

By stripping procedural governance away from the language model and giving it to an immutable state machine, Nehanda CLI turns smaller open-weights models into disciplined software engineers:

| Responsibility | Handled By | Method |
|:---|:---|:---|
| **Fast Reflexes & Classification** | System 1 (Laya 421M) | Non-autoregressive forward pass (~48ms) |
| **Code Synthesis & Reasoning** | System 2 (Generative LLM) | Autoregressive reasoning within strict bounds |
| **Long-Term Memory Retrieval** | Jev-Mem Plane | Multi-relational graph + adaptive beam search |
| **Critical Domain Rules** | `pinned_context` | Immutable database attachment to all prompts |
| **Workflow Governance & Safety** | 11-Phase SDLC Engine | Deterministic state machine & physical tool masks |

This hybrid design gives developers the speed and privacy of local models with the rigor, auditability, and safety demanded by enterprise software engineering.
