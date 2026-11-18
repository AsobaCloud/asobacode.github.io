---
title: "Permissions"
layout: default
parent: "Nehanda CLI"
nav_order: 7
---

# Permissions & Safety Governance

Every tool call the model produces passes through the **permission gate** before execution. The gate evaluates the tool name, active SDLC phase, and session-level approval cache to return one of three decisions: `allow`, `deny`, or `ask`.

When commands violate system boundaries, the interactive safety system intercepts execution and surfaces the **`BlockConfirmMenu`**, providing instant escalation to an isolated OS-primitives sandbox.

---

## How Permission Evaluation Works

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 440" width="100%" height="auto">
  <!-- Canvas -->
  <rect width="960" height="440" rx="16" fill="#4551BF"/>

  <!-- Header -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" letter-spacing="1">PERMISSION EVALUATION ENGINE — deny &gt; ask &gt; allow &gt; defaultMode</text>
  <line x1="32" y1="48" x2="928" y2="48" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Entry Node -->
  <g transform="translate(280, 60)">
    <rect width="400" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="200" y="21" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">Model Emits tool_use Block</text>
    <text x="200" y="37" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">evaluatePermission(permissions, toolName, toolInput, phase)</text>
  </g>
  <line x1="480" y1="104" x2="480" y2="124" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,124 475,116 485,116" fill="#8892E0"/>

  <!-- Explicit Rules Cards (Horizontal row) -->
  <g transform="translate(60, 126)">
    <rect width="256" height="44" rx="10" fill="#2E378C" stroke="#C85A5A" stroke-width="1.2"/>
    <text x="128" y="21" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#C85A5A">Explicit deny list?</text>
    <text x="128" y="37" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">→ return 'deny' (immediate block)</text>
  </g>
  <g transform="translate(352, 126)">
    <rect width="256" height="44" rx="10" fill="#2E378C" stroke="#8892E0" stroke-width="1.2"/>
    <text x="128" y="21" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">Explicit ask list?</text>
    <text x="128" y="37" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">→ return 'ask' (prompt human)</text>
  </g>
  <g transform="translate(644, 126)">
    <rect width="256" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="128" y="21" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">Explicit allow list?</text>
    <text x="128" y="37" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">→ return 'allow' (execute)</text>
  </g>

  <!-- Flow to defaultMode -->
  <line x1="480" y1="170" x2="480" y2="198" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,198 475,190 485,190" fill="#8892E0"/>
  <rect x="330" y="175" width="300" height="16" rx="8" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="186" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">no explicit list match → check Phase &amp; defaultMode</text>

  <!-- defaultMode Container -->
  <g transform="translate(280, 200)">
    <rect width="400" height="44" rx="10" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <text x="200" y="21" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">SDLC Phase Overrides &amp; defaultMode</text>
    <text x="200" y="37" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">default · bypassPermissions · dontAsk · acceptEdits · plan</text>
  </g>

  <!-- Branches -->
  <line x1="480" y1="244" x2="200" y2="280" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="480" y1="244" x2="480" y2="280" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="480" y1="244" x2="760" y2="280" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>

  <!-- Decision Nodes -->
  <g transform="translate(70, 282)">
    <rect width="260" height="44" rx="10" fill="#2E378C" stroke="#C85A5A" stroke-width="1.2"/>
    <text x="130" y="20" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#C85A5A">deny</text>
    <text x="130" y="36" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Error returned to model transcript</text>
  </g>
  <g transform="translate(350, 282)">
    <rect width="260" height="44" rx="10" fill="#2E378C" stroke="#8892E0" stroke-width="1.2"/>
    <text x="130" y="20" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">ask</text>
    <text x="130" y="36" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Prompt TUI · BlockConfirmMenu</text>
  </g>
  <g transform="translate(630, 282)">
    <rect width="260" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="130" y="20" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">allow</text>
    <text x="130" y="36" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Execute immediately in-process</text>
  </g>

  <!-- Phase Override Highlight Banner -->
  <g transform="translate(60, 348)">
    <rect width="840" height="48" rx="8" fill="#2A3390" stroke="#7B86EE" stroke-width="1.2"/>
    <text x="420" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">PHASE OVERRIDE: create_tests · implement · verify · safety</text>
    <text x="420" y="38" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">All execution tools are auto-allowed during approved execution phases (human plan gate already passed)</text>
  </g>

  <text x="480" y="420" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2" opacity="0.6">lib/permissions.mjs · evaluatePermission() · cacheSessionApproval()</text>
</svg>

The evaluation order is strict: **deny > ask > allow > defaultMode**. If a tool matches the `deny` list, it is always blocked regardless of the default mode.

---

## Permission Modes

The `defaultMode` setting controls the fallback behavior when a tool doesn't match any explicit list:

### `default` (recommended)
The standard mode. Read-only and informational tools are auto-allowed; mutating actions require human confirmation:

| Tool | Decision |
|:---|:---|
| `Read`, `Glob`, `Grep`, `WebFetch`, `WebSearch`, `ToolSearch`, `ListMcpResources`, `ReadMcpResource`, `AskUserQuestion`, `Brief`, `TodoWrite`, `TaskOutput`, `TaskStop`, `Skill` | **allow** (auto-allowed) |
| `Write`, `Edit`, `Bash`, `NotebookEdit`, `Agent`, `EnterWorktree`, `ExitWorktree`, MCP tools | **ask** (prompt user) |

### `acceptEdits`
File editing tools (`Read`, `Write`, `Edit`) are auto-allowed to streamline code writing. Terminal executions (`Bash`) and external MCP tools continue to require confirmation.

### `plan`
Mutating tools (`Write`, `Edit`, `Bash`, `NotebookEdit`) are **denied**. Read-only tools are allowed.

### `dontAsk`
All tools that would normally prompt (`ask`) are **denied**. Only safe, read-only tools operate.

### `bypassPermissions`
All tools are auto-allowed across all phases. Use strictly in automated CI pipelines.

---

## Phase-Aware Overrides

During approved execution phases of the SDLC, the user has already explicitly vetted the issue and approved the Plan Triad. Prompting on every file edit or test command would be redundant and disrupt test runners.

In `lib/permissions.mjs`:
```javascript
// In execution phases the operator already approved the plan — auto-allow execution tools
if (phase === 'create_tests' || phase === 'implement' || phase === 'verify' || phase === 'safety') {
  return 'allow'
}
```

In other phases:
- `idle`: Free-form exploration mode (mutating `Bash` commands refused).
- `explore`: Only `Read`, `Glob`, `Grep` are allowed. Mutating tools return a phase-mask error.
- `diagnose`: Read-only analysis.
- `create_issue`: Writes restricted strictly to the `.issues/` directory.
- `planning`: Zero tools available (model emits structured text plan only).

---

## Interactive Safety: The `BlockConfirmMenu`

When static analyzers or bashguard detect high-risk operations (such as opening network listening sockets, touching host credential paths, writing outside the working directory, or running unvetted shell scripts), execution pauses.

Rather than aborting, the TUI displays the interactive `BlockConfirmMenu`:

```
⚠️  Blocked Command: bash -c "npm test -- --watch"
Reason: Background watcher command detected outside approved pipeline.
Risk Score: 0.85

[A] Approve for Session
[S] Run in OS Sandbox
[C] Cancel
```

### 1. `[A]` Approve for Session
Approves the operation and records the approval in an in-memory session cache (`cacheSessionApproval`). Subsequent calls with the same signature in the same REPL session execute without re-prompting.

### 2. `[S]` Run in OS-Primitives Sandbox
Confines execution to an ephemeral, disposable project snapshot:
* **macOS:** Enforced via `/usr/bin/sandbox-exec` using Apple Seatbelt with a deny-default sandbox profile.
* **Linux:** Enforced via `bubblewrap` (`bwrap`).
* **Isolation Guarantees:**
  * File writes are confined strictly to a disposable temporary project copy (capped at 256 MiB / 10,000 entries; credential and dependency paths omitted).
  * Direct network egress is blocked by default.
  * Host credentials (`~/.ssh`, `~/.aws`, tokens) are never forwarded.
  * Changes are automatically discarded after execution.
* **Optional Allowlist Proxy:** To permit access to designated package hosts from inside the sandbox, export `NEHANDA_SANDBOX_ALLOWLIST`:
  ```bash
  export NEHANDA_SANDBOX_ALLOWLIST="registry.npmjs.org,github.com"
  ```
  The sandbox routes outbound traffic through an internal unix-domain-socket forward proxy (`NEHANDA_SANDBOX_PROXY_SOCKET`), refusing all other destinations.

### 3. `[C]` Cancel
Immediately cancels execution and feeds a clean cancellation result back to the model.

---

## Canonical Documentation Approvals

During repository exploration, models frequently re-examine canonical architecture files (`docs/MAP.md`, `README.md`, `schema.sql`). 

Nehanda registers successful inspections in `cacheCanonicalReadApproval(sessionId, canonicalPath)`. Once verified during exploration, subsequent inspections of these canonical documentation paths bypass repetitive confirmation prompts.

---

## Audit Logging

Every permission evaluation is durably logged to the `tool_permission_log` table in `~/.config/nehanda/ona-session.db`:

```sql
SELECT tool_name, decision, created_at 
FROM tool_permission_log 
ORDER BY created_at DESC 
LIMIT 20;
```
