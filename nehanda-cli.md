---
title: "Nehanda CLI"
layout: default
---

<div class="page-header">
  <h1>Nehanda CLI</h1>
  <div class="version-badge">
    <span class="version-label">Version</span>
    <span class="version-value">1.1.0</span>
    <span class="version-separator">|</span>
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
    An agentic terminal REPL and single-process engine for energy systems research and software development. Normalizes multi-OEM energy telemetry through the ODSE protocol, enforces an 11-phase governed SDLC workflow, and stores every turn, tool call, execution provenance record, and phase transition in a local SQLite database you own.
  </p>
</div>

## Architecture

Nehanda CLI is a layered system with six distinct layers. Every component shown below is documented in the pages listed under **Nehanda CLI** in the sidebar.

<img src="{{ site.baseurl }}/assets/images/nehanda-architecture.png" alt="Nehanda CLI Architecture Diagram" class="screenshot">

| Layer | What it does | Documented in |
|-------|-------------|---------------|
| **REPL / Ink TUI** | Command parsing, permission gates, display rendering, interactive safety interventions, bounded table output | [REPL Reference](/nehanda-cli-repl), [Permissions](/nehanda-cli-permissions) |
| **Engine Core** | Turn loop (`runUserTurn`), 11-phase SDLC state machine, Jev-Mem memory architecture, tool orchestration, `[TOOL_CALL]` rescue path | [Engine & Turn Loop](/nehanda-cli-engine), [SDLC Workflow](/nehanda-cli-sdlc), [Tool Calling](/nehanda-cli-tool-calling) |
| **Tool Layer** | 21 built-in tools, 3 mandatory safety checkers, branch coverage collector, MCP client for external tools | [Built-in Tools](/nehanda-cli-tools), [MCP Integration](/nehanda-cli-mcp) |
| **ODSE Middleware** | OEM brand detection, energy payload normalization, SCADA table rendering | [MCP Integration → Energy Middleware](/nehanda-cli-mcp#energy-middleware-odse) |
| **Provider Layer** | OpenAI-compatible client abstraction, multi-provider switching, credential isolation, Ollama tool probes | [Providers](/nehanda-cli-providers) |
| **Persistence Layer** | Local SQLite database (schema v4: runtime evidence, test executions, Jev-Mem graph, pinned context, WAL mode, FTS5) | [Database](/nehanda-cli-database) |

Cross-cutting concerns are documented separately:

- [**Configuration**](/nehanda-cli-configuration) — Settings files, merge strategy, `/config` commands, sandbox environment
- [**Hooks**](/nehanda-cli-hooks) — Event-driven hook system for file changes, tool use, and phase transitions
- [**Pipe Mode**](/nehanda-cli-pipe-mode) — Headless execution, `--eval`, `--transition`, and automation

## Key Features

### In-Process Engine

Executes turns directly inside the process via `runUserTurn`, eliminating separate server daemons or background HTTP relays. The engine runs a deterministic loop: prompt → API call → tool execution → response, all within a single Node.js process (Node.js >= 22).

### ODSE Energy Normalization

`lib/energy-middleware.mjs` intercepts MCP tool results from energy data servers and automatically normalizes them to the [ODS-E](https://ona-protocol.org) schema before the model sees the payload. OEM brand is resolved from the MCP server name (e.g. `energy-huawei` → `huawei`) or inferred by field-signature fingerprinting across 20+ OEM schemas. Multi-channel SCADA arrays and inverter state records render as box-drawing terminal tables with column headers and row-count summaries rather than raw JSON dumps.

Supported OEMs: Huawei FusionSolar, Enphase Envoy, SolarEdge, Fronius, Solarman, SMA, Solis, Sungrow / iSolarCloud, Sungrow BESS / PowerTitan, BYD BESS, Fimer / AuroraVision, SolaxCloud, Eskom (portal, AMR, NRS049), Vestas, Siemens Gamesa, Nordex, Terraco, and generic CSV.

See [MCP Integration → Energy Middleware](/nehanda-cli-mcp#energy-middleware-odse) for setup and naming conventions.

### Jev-Mem Memory Architecture

Every turn, a System-1 control plane ([Laya](https://huggingface.co/convaiinnovations/laya) — 322M parameters, Apache 2.0) classifies observations into a multi-relational memory graph (semantic / temporal / causal / entity edges), then adaptively retrieves evidence before each model call. System-2 receives a compact canonical header + retrieved evidence + last 2 turns — cutting prefill 70–85% on long sessions.

Domain invariants critical to energy research — ODSE schema mappings, asset capacity limits, simulation bounds — are stored in the `pinned_context` table and reattached verbatim before every System-2 prompt. This prevents model drift and hallucinated parameters across arbitrarily long SCADA ingestion and grid simulation sessions.

### Deterministic 11-Phase SDLC Workflow

Enforces an 11-phase state machine (`idle` → `explore` → `diagnose` → `create_issue` → `create_tests` → `planning` → `implement` → `verify` → `safety` → `confirm_fix` → `done`) to prevent unapproved code changes, hallucinated test passes, or unverified implementations. Each phase enforces its own system prompt, tool mask, and strict evidence gate (such as genuine test runner RED evidence and $\ge 70\%$ changed-production branch coverage).

See [SDLC Workflow](/nehanda-cli-sdlc) for full state transition rules and evidence contracts.

### Interactive Safety Interventions & OS-Primitives Sandbox

When execution checkers flag a command — opening local sockets, inspecting hardware paths, writing outside the working directory — the engine raises a structured `{ status, reason, risk_score, proposed_remediation }` payload. In the TUI, blocked operations surface an interactive `BlockConfirmMenu`:
- **[A] Approve for Session:** Approves the action and caches the decision in-memory (`cacheSessionApproval`) to avoid repeated prompting.
- **[S] Run in OS Sandbox:** Executes the command inside an OS-primitives sandbox against an isolated, disposable project copy (capped at 256 MiB / 10,000 entries; credential and dependency paths excluded).
  - **macOS:** Built-in Apple Seatbelt (`/usr/bin/sandbox-exec`) with deny-default profile.
  - **Linux:** Bubblewrap (`bwrap`).
  - Network egress is blocked by default, with optional host allowlists supported via `NEHANDA_SANDBOX_ALLOWLIST` and a local unix-domain-socket proxy (`NEHANDA_SANDBOX_PROXY_SOCKET`). No Docker or container daemon required!
- **[C] Cancel:** Aborts the command and sends a cancellation result to the model.

### Runtime Visibility

`RuntimeHealthMonitor` probes active inference endpoints (1s HEAD request) and checks Laya sidecar liveness before each session. The TUI status header shows active model, endpoint health and latency, sidecar PID, and context usage percentage — giving researchers immediate visual confirmation of whether the target backend is an internal local host or an external cloud endpoint before uploading grid telemetry.

### Permission Gate

Every tool call passes through the permission gate before execution. Five permission modes (`default`, `bypassPermissions`, `dontAsk`, `acceptEdits`, `plan`) control whether tools are auto-allowed, auto-denied, or require human confirmation. Permissions are phase-aware: `create_tests`, `implement`, `verify`, and `safety` phases auto-allow execution tools since the plan was already approved by the operator.

### 21 Built-in Tools

File operations (`Read`, `Write`, `Edit`), shell execution (`Bash`), discovery (`Glob`, `Grep`), web access (`WebFetch`, `WebSearch`), notebook editing, git worktrees, subagent spawning, MCP integration, and more. Tools are filtered by SDLC phase — mutating tools are masked during `explore`, `diagnose`, and `planning`, and restricted to test directories during `create_tests`.

### Multi-Provider Switching with Keyed Discovery

Seamlessly switch between Nehanda 27B, local LM Studio, Ollama instances, Anthropic Claude, OpenRouter, or any OpenAI-compatible API using the interactive `/model` wizard. Provider credentials are strictly isolated to prevent cross-provider leakage, secrets are masked during entry and redacted in session history, and the provider layer automatically discovers live catalogs and probes tool capabilities.

### Dynamic Tool Rescue (`[TOOL_CALL]`)

For endpoints that strip OpenAI tool schemas (like the Nehanda vLLM proxy), the engine injects tool schemas into system prompts using `[TOOL_CALL]` delimiters, parses them from model output, and executes them locally — bypassing vLLM's `--tool-call-parser` stop-token interception entirely.

### Complete Audit Trail (Schema v4)

Every conversation turn, tool call, phase transition, test execution provenance record (`test_executions`), safety checker report (`safety_evidence`), and hook invocation is stored in a local SQLite database at `~/.config/nehanda/ona-session.db`. You own this data — no cloud dependency for persistence.

## Quick Start

```bash
# Global install via npm
npm install -g @asobacloud/nehanda

# Or single-line verified curl installer
curl -fsSL https://asoba.co/releases/install.sh | sh

# Launch Nehanda
nehanda
```

See the [Getting Started](/nehanda-cli-getting-started) page for the full setup guide including provider configuration and sandbox setup.

## License

AGPL-3.0. See [NOTICE](https://github.com/AsobaCloud/nehanda-cli/blob/main/NOTICE) for third-party attributions.
