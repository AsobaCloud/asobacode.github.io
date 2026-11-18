---
title: "Architecture"
layout: default
parent: "Nehanda CLI"
nav_order: 2
---

# Architecture

Nehanda CLI is a layered, single-process engine with six distinct architectural layers. Every component runs in-process within Node.js (v22+) — eliminating external daemon processes, relay proxies, or container runtimes.

<img src="{{ site.baseurl }}/assets/images/nehanda-architecture.png" alt="Nehanda CLI Architecture Diagram" class="screenshot">

## Layer Overview

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 760" width="100%" height="auto">
  <!-- Main Canvas Container -->
  <rect width="960" height="760" rx="16" fill="#4551BF"/>

  <!-- Header Block -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">NEHANDA CLI — SYSTEM ARCHITECTURE</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">6-Layer In-Process Engine · Energy Systems Telemetry Normalization &amp; Governed 11-Phase SDLC</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- LAYER 1: REPL / Ink TUI -->
  <g transform="translate(32, 74)">
    <rect width="896" height="74" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="74" rx="3" fill="#455BF1"/>
    <rect x="16" y="14" width="100" height="20" rx="4" fill="#455BF1"/>
    <text x="66" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">REPL / INK TUI</text>
    <text x="130" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Command Parser · BlockConfirmMenu · OS-Primitives Sandbox · Display Renderer</text>
    <text x="130" y="48" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">/model wizard · /key · /config · /mcp · Live reasoning token spinner · Bounded cli-table3 output · Pipe mode</text>
    <rect x="752" y="14" width="132" height="20" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="818" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">bin/nehanda-ui.mjs</text>
    <rect x="752" y="40" width="132" height="20" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="818" y="54" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#8892E0">lib/sandbox.mjs</text>
  </g>

  <!-- Connector 1->2 -->
  <line x1="480" y1="148" x2="480" y2="172" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,172 475,164 485,164" fill="#8892E0"/>
  <rect x="376" y="153" width="208" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="165" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">USER TURNS · INTERACTIVE MENUS</text>

  <!-- LAYER 2: Engine Core -->
  <g transform="translate(32, 174)">
    <rect width="896" height="74" rx="12" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="74" rx="3" fill="#7B86EE"/>
    <rect x="16" y="14" width="100" height="20" rx="4" fill="#7B86EE"/>
    <text x="66" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">ENGINE CORE</text>
    <text x="130" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Turn Loop (runUserTurn) · 11-Phase SDLC State Machine · Jev-Mem · Tool Orchestration</text>
    <text x="130" y="48" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">idle→explore→diagnose→issue→tests→plan→implement→verify→safety→confirm→done · Laya System-1 · [TOOL_CALL]</text>
    <rect x="752" y="14" width="132" height="20" rx="10" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="818" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">lib/orchestrate.mjs</text>
    <rect x="752" y="40" width="132" height="20" rx="10" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="818" y="54" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#8892E0">lib/workflow.mjs</text>
  </g>

  <!-- Connector 2->3 -->
  <line x1="480" y1="248" x2="480" y2="272" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,272 475,264 485,264" fill="#8892E0"/>
  <rect x="368" y="253" width="224" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="265" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">PHASE-FILTERED TOOL CALLS</text>

  <!-- LAYER 3: Tool Layer -->
  <g transform="translate(32, 274)">
    <rect width="896" height="74" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="74" rx="3" fill="#5C67DE"/>
    <rect x="16" y="14" width="100" height="20" rx="4" fill="#5C67DE"/>
    <text x="66" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">TOOL LAYER</text>
    <text x="130" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Built-in Tools (21) · 3 Safety Checkers · Branch Coverage Collector · MCP Client</text>
    <text x="130" y="48" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Read/Write/Edit/Bash/Glob/Grep · JsSafety/ShellSafety/PySafety · branch-coverage-collector · mcp__&lt;server&gt;__&lt;tool&gt;</text>
    <rect x="752" y="14" width="132" height="20" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="818" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">lib/tools.mjs</text>
    <rect x="752" y="40" width="132" height="20" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="818" y="54" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#8892E0">lib/safety-gate.mjs</text>
  </g>

  <!-- Connector 3->4 -->
  <line x1="480" y1="348" x2="480" y2="372" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,372 475,364 485,364" fill="#8892E0"/>
  <rect x="360" y="353" width="240" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="365" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">RAW OEM TELEMETRY · MODBUS MAPS</text>

  <!-- LAYER 4: ODSE Middleware -->
  <g transform="translate(32, 374)">
    <rect width="896" height="74" rx="12" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="74" rx="3" fill="#C7CCF2"/>
    <rect x="16" y="14" width="112" height="20" rx="4" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="72" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">ODSE MIDDLEWARE</text>
    <text x="140" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">OEM Brand Fingerprinting · ODSE Normalization · SCADA Table Transformation</text>
    <text x="140" y="48" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Huawei · Enphase · SolarEdge · Sungrow · Eskom · 20+ OEMs · name → fingerprint · --format table|ndjson</text>
    <rect x="752" y="14" width="132" height="20" rx="10" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="818" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">energy-middleware.mjs</text>
    <rect x="752" y="40" width="132" height="20" rx="10" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="818" y="54" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#8892E0">odse-transform.py</text>
  </g>

  <!-- Connector 4->5 -->
  <line x1="480" y1="448" x2="480" y2="472" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,472 475,464 485,464" fill="#8892E0"/>
  <rect x="368" y="453" width="224" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="465" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">NORMALIZED PROMPTS · STREAMING</text>

  <!-- LAYER 5: Provider Layer -->
  <g transform="translate(32, 474)">
    <rect width="896" height="74" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="74" rx="3" fill="#3B4CCA"/>
    <rect x="16" y="14" width="100" height="20" rx="4" fill="#3B4CCA"/>
    <text x="66" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">PROVIDER LAYER</text>
    <text x="130" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Unified /model Wizard · Keyed Discovery · Isolated Credentials · Ollama Probes</text>
    <text x="130" y="48" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">OpenRouter · Anthropic Claude · Ollama (native tool probe, think:false) · LM Studio · Zhipu · Nehanda 27B</text>
    <rect x="752" y="14" width="132" height="20" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="818" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">configureProvider.mjs</text>
    <rect x="752" y="40" width="132" height="20" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="818" y="54" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#8892E0">openaiCompat.mjs</text>
  </g>

  <!-- Connector 5->6 -->
  <line x1="480" y1="548" x2="480" y2="572" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,572 475,564 485,564" fill="#8892E0"/>
  <rect x="350" y="553" width="260" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="565" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">PROVENANCE LOGS · MEMORY EDGES · WAL</text>

  <!-- LAYER 6: Persistence -->
  <g transform="translate(32, 574)">
    <rect width="896" height="74" rx="12" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="74" rx="3" fill="#FFFFFF"/>
    <rect x="16" y="14" width="100" height="20" rx="4" fill="#FFFFFF"/>
    <text x="66" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#0A0A0A" letter-spacing="0.8">PERSISTENCE</text>
    <text x="130" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">SQLite Database (Schema v4) — ~/.config/nehanda/ona-session.db</text>
    <text x="130" y="48" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">WAL mode · FTS5 · test_executions (RED/GREEN provenance) · safety_evidence · red_evidence · pinned_context</text>
    <rect x="752" y="14" width="132" height="20" rx="10" fill="#1F1F1F" stroke="#444" stroke-width="1"/>
    <text x="818" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">lib/store.mjs</text>
    <rect x="752" y="40" width="132" height="20" rx="10" fill="#1F1F1F" stroke="#444" stroke-width="1"/>
    <text x="818" y="54" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">better-sqlite3</text>
  </g>

  <!-- Footer -->
  <text x="480" y="730" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2" opacity="0.8">In-process execution · No background server daemons · No Docker containers required · Complete local provenance</text>
</svg>

---

## Layer 1: REPL / Ink TUI

The user interface layer is built with [Ink](https://github.com/vadimdemedes/ink) (React in the terminal).

* **Command Parser:** Interprets interactive slash commands (`/model`, `/key`, `/config`, `/mcp`, `/help`, `/clear`, `/exit`).
* **Interactive Safety & BlockConfirmMenu:** When an execution checker detects risky operations (opening local network sockets, writing outside project root, inspecting hardware buses), execution is paused. The user is prompted with an interactive menu:
  * `[A]` **Approve for Session:** Caches approval in-memory (`cacheSessionApproval`) so the command is not prompted again.
  * `[S]` **Run in OS Sandbox:** Executes the action within an ephemeral, credential-filtered copy confined via OS primitives (macOS Seatbelt or Linux Bubblewrap).
  * `[C]` **Cancel:** Safely aborts execution.
* **Process Legibility & Bounded Output:** 
  * Displays live spinner verbs (`Analyzing`, `Thinking`, `Reading`, `Running`) and real-time reasoning token counters (`⠋ Thinking (42 tokens)...`).
  * Summarizes tool invocations (`⚙ Read(package.json)`, `⚙ Bash(git status)`).
  * Automatically formats JSON array payloads from telemetry and tool results into box-drawing tables via `cli-table3`, capped at 10 rows with overflow notice.

---

## Layer 2: Engine Core

The central orchestration engine runs entirely inside the host Node.js process:

* **Turn Loop (`runUserTurn`):** Executes the standard deterministic cycle: ingest user prompt $\rightarrow$ append to transcript $\rightarrow$ invoke Jev-Mem hot path $\rightarrow$ resolve model $\rightarrow$ stream model completion $\rightarrow$ execute tools $\rightarrow$ record state.
* **11-Phase SDLC State Machine:** Governs transitions through an 11-phase sequence:
  $$\text{idle} \rightarrow \text{explore} \rightarrow \text{diagnose} \rightarrow \text{create\_issue} \rightarrow \text{create\_tests} \rightarrow \text{planning} \rightarrow \text{implement} \rightarrow \text{verify} \rightarrow \text{safety} \rightarrow \text{confirm\_fix} \rightarrow \text{done}$$
  Model prose cannot advance phases; every gate requires verifiable execution evidence.
* **Bounded Exploration:** Scans `docs/MAP.md` and repository documentation first, enforces a strict 20-request ceiling, terminates upon detected stagnation, and falls back to a `.ona/map` cache if MAP documentation is absent.
* **Laya System-1 Hot Path:** Pre-primes the 322M-parameter Laya neural decision model upon launch (`method: 'load'`), classifies intent, and extracts evidence graph nodes to cut System-2 context prefill by 70–85%.
* **`[TOOL_CALL]` Rescue Engine:** Delimiter-based tool calling bypasses vLLM stop-token stripping for strict, non-hallucinated tool execution on OpenAI-compatible proxies.

---

## Layer 3: Tool Layer

* **Built-in Tools (21):** Core file system (`Read`, `Write`, `Edit`), terminal execution (`Bash`), discovery (`Glob`, `Grep`), notebooks, worktrees, and web lookup.
* **Phase-Aware Tool Masks:** Restricts tool access strictly by phase (e.g., `explore` is read-only; `planning` has no tools; `create_tests` allows mutations only in `tests/**`; `implement` allows production edits).
* **Mandatory Safety Checkers (3):**
  * `lib/scripts/js-safety-checker.cjs`
  * `lib/scripts/shell-safety-checker.sh`
  * `lib/scripts/python-safety-checker.py`
* **Branch Coverage Gate:** Integrates `branch-coverage-collector.mjs` to require $\ge 70\%$ branch coverage across modified production code before authorizing completion.
* **MCP Client:** Connects to Model Context Protocol servers over stdio JSON-RPC, namespacing tools under `mcp__<server>__<tool>`.

---

## Layer 4: ODSE Middleware

Intercepts MCP results from energy assets and standardizes them to the [ODS-E](https://ona-protocol.org) specification:

* **Dual-Pass Brand Detection:** First inspects the MCP server identifier (e.g. `energy-huawei` $\rightarrow$ Huawei), then falls back to JSON schema field fingerprinting across 20+ solar inverter, battery, and SCADA schemas.
* **Normalization Engine:** Executes `lib/scripts/odse-transform.py` to produce uniform telemetry arrays formatted as terminal tables or NDJSON.

---

## Layer 5: Provider Layer

Unified interface across frontier cloud providers and local open-source inference:

* **Goose-Style `/model` Wizard:** Discovers available models dynamically from provider catalogs (`GET /models` or Ollama `/api/tags`).
* **Credential Isolation:** Strict separation of provider credentials prevents API keys or custom hosts from bleeding between sessions. Secrets are masked in the UI and redacted in transcript records.
* **Ollama Capability Probe:** Automatically inspects Ollama model capabilities, supports native tool calling or rescue delimiters, and toggles `think: false` where supported.

---

## Layer 6: Persistence Layer (Schema v4)

Single-file, zero-daemon SQLite storage at `~/.config/nehanda/ona-session.db`:

* **WAL Mode & FTS5:** High-concurrency Write-Ahead Logging and full-text search across all memories.
* **Runtime Evidence Tables (Schema v4):**
  * `test_executions`: Durable records of command identity, input hashes, timing, and failure/pass classification.
  * `red_evidence`: Provenance records of genuine test runner RED failures.
  * `safety_evidence`: Reports from mandatory JavaScript, Shell, and Python safety checkers.
* **Pinned Context (`pinned_context`):** Protects mission-critical invariants (ODSE schemas, asset limits, simulation bounds) from being summarized away during context compaction.
* **Jev-Mem Multi-Relational Plane:** Tracks semantic, temporal, causal, and entity edges across observations.

---

## Cross-Cutting Concerns

| Concern | Description | Reference |
|:---|:---|:---|
| **OS-Primitives Sandbox** | Disposable project snapshot (256 MiB / 10k entries); Seatbelt on macOS; Bubblewrap on Linux; network egress allowlist proxy | [Permissions & Sandbox](/nehanda-cli-permissions) |
| **Epistemic Filter** | Redacts implementation blocks from assistant messages during test generation and verification | [SDLC Workflow](/nehanda-cli-sdlc#epistemic-isolation) |
| **Database Migrations** | Automatic zero-downtime migration through schema versions v1 $\rightarrow$ v2 $\rightarrow$ v3 $\rightarrow$ v4 | [Database](/nehanda-cli-database) |
| **Hook Plane** | Event-driven triggers (`PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `PhaseTransition`) | [Hooks](/nehanda-cli-hooks) |
