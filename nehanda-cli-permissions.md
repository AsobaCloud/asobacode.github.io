---
title: "Permissions"
layout: default
parent: "Nehanda CLI"
nav_order: 7
---

# Permissions

Every tool call the model produces passes through the **permission gate** before execution. The gate evaluates the tool name against the active permission policy and returns one of three decisions: `allow`, `deny`, or `ask`.

## How It Works

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 400" width="100%" height="auto">
  <rect width="960" height="400" rx="16" fill="#4551BF"/>
  <text x="32" y="36" font-family="'DM Sans',system-ui,sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" letter-spacing="1">PERMISSION EVALUATION — deny &gt; ask &gt; allow &gt; defaultMode</text>
  <line x1="32" y1="48" x2="928" y2="48" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Entry -->
  <g transform="translate(280,60)">
    <rect width="400" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="200" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">Model emits tool_use block</text>
    <text x="200" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">evaluatePermission(permissions, toolName, toolInput, phase)</text>
  </g>
  <line x1="480" y1="106" x2="480" y2="124" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,124 475,116 485,116" fill="#8892E0"/>

  <!-- Explicit list checks (3 horizontal cards) -->
  <g transform="translate(60,126)">
    <rect width="256" height="44" rx="10" fill="#2E378C" stroke="#C85A5A" stroke-width="1.2"/>
    <text x="128" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#C85A5A">deny list?</text>
    <text x="128" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">→ return 'deny' (always)</text>
  </g>
  <g transform="translate(352,126)">
    <rect width="256" height="44" rx="10" fill="#2E378C" stroke="#8892E0" stroke-width="1.2"/>
    <text x="128" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">ask list?</text>
    <text x="128" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">→ return 'ask'</text>
  </g>
  <g transform="translate(644,126)">
    <rect width="256" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="128" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">allow list?</text>
    <text x="128" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">→ return 'allow'</text>
  </g>

  <!-- Converge to defaultMode -->
  <line x1="480" y1="172" x2="480" y2="200" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,200 475,192 485,192" fill="#8892E0"/>
  <rect x="342" y="177" width="276" height="16" rx="8" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="188" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">no explicit match → apply defaultMode (phase-aware)</text>

  <!-- defaultMode node -->
  <g transform="translate(280,202)">
    <rect width="400" height="44" rx="10" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <text x="200" y="21" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">defaultMode Rules</text>
    <text x="200" y="37" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">default · bypassPermissions · dontAsk · acceptEdits · plan</text>
  </g>
  <line x1="480" y1="248" x2="480" y2="268" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>

  <!-- Phase override note -->
  <line x1="480" y1="268" x2="220" y2="292" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="480" y1="268" x2="480" y2="292" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="480" y1="268" x2="740" y2="292" stroke="#8892E0" stroke-width="1.5" stroke-dasharray="4,3"/>

  <g transform="translate(80,294)">
    <rect width="276" height="44" rx="10" fill="#2E378C" stroke="#C85A5A" stroke-width="1.2"/>
    <text x="138" y="20" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#C85A5A">deny</text>
    <text x="138" y="36" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">error result to model</text>
  </g>
  <g transform="translate(342,294)">
    <rect width="276" height="44" rx="10" fill="#2E378C" stroke="#8892E0" stroke-width="1.2"/>
    <text x="138" y="20" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">ask</text>
    <text x="138" y="36" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">prompt TUI · auto-approve in pipe mode</text>
  </g>
  <g transform="translate(604,294)">
    <rect width="276" height="44" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <text x="138" y="20" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="11" font-weight="800" fill="#FFFFFF">allow</text>
    <text x="138" y="36" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">execute immediately</text>
  </g>

  <!-- Phase override banner -->
  <rect x="60" y="356" width="840" height="30" rx="8" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
  <text x="480" y="375" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="700" fill="#C7CCF2">Phase override: implement + test phases → ALL tools auto-allowed (plan already approved)</text>

  <text x="480" y="394" text-anchor="middle" font-family="'DM Sans',system-ui,sans-serif" font-size="10" font-weight="500" fill="#C7CCF2" opacity="0.6">lib/permissions.mjs · evaluatePermission()</text>
</svg>

The evaluation order is strict: **deny > ask > allow > defaultMode**. If a tool matches the `deny` list, it is always blocked regardless of the default mode.

## Permission Modes

The `defaultMode` setting controls the fallback behavior when a tool doesn't match any explicit list:

### `default` (recommended)

The standard mode. Read-only and informational tools are auto-allowed; everything else requires human confirmation.

| Tool | Decision |
|------|----------|
| `Read`, `Glob`, `Grep`, `WebFetch`, `WebSearch`, `ToolSearch`, `ListMcpResources`, `ReadMcpResource`, `AskUserQuestion`, `Brief`, `TodoWrite`, `TaskOutput`, `TaskStop`, `Skill` | **allow** (auto-allowed) |
| `Write`, `Edit`, `Bash`, `NotebookEdit`, `Agent`, `EnterWorktree`, `ExitWorktree`, MCP tools | **ask** (prompt user) |

**Phase override:** During `implement` and `test` phases, all tools are auto-allowed because the user already approved the plan.

### `bypassPermissions`

All tools are auto-allowed in all phases. No prompts, no logging. Use with caution.

### `dontAsk`

All tools that would normally prompt (`ask`) are instead **denied**. Only the auto-allow safe tools work. This effectively locks the agent into read-only mode plus informational tools.

### `acceptEdits`

File editing tools (`Read`, `Write`, `Edit`) are auto-allowed. All other non-safe tools require confirmation.

| Tool | Decision |
|------|----------|
| `Read`, `Write`, `Edit` | **allow** |
| `Glob`, `Grep`, `WebFetch`, etc. | **allow** (safe tools) |
| `Bash`, `Agent`, `NotebookEdit`, worktree, MCP tools | **ask** |

### `plan`

Mutating tools (`Write`, `Edit`, `Bash`, `NotebookEdit`) are **denied**. Everything else requires confirmation. This mode enforces a strict read-only exploration workflow.

| Tool | Decision |
|------|----------|
| `Write`, `Edit`, `Bash`, `NotebookEdit` | **deny** |
| Safe tools (Read, Glob, etc.) | **allow** |
| Everything else | **ask** |

## Explicit Lists

In addition to the default mode, you can define explicit `allow`, `deny`, and `ask` lists that take priority. Lists support exact names and wildcard suffixes:

```json
{
  "permissions": {
    "defaultMode": "default",
    "allow": ["mcp__*"],
    "deny": ["Bash"],
    "ask": ["Agent"]
  }
}
```

- `mcp__*` matches any MCP tool (`mcp__filesystem__read_file`, etc.)
- `Bash` matches only the Bash tool exactly

## Phase-Aware Override

Regardless of the mode or lists, the `implement` and `test` phases auto-allow all tools. This is by design — the user has already approved the plan, so additional prompts would be redundant and disruptive.

```
Phase: idle        → normal permission evaluation
Phase: explore     → normal permission evaluation  
Phase: planning    → N/A (no tools available)
Phase: implement   → ALL tools auto-allowed
Phase: test        → ALL tools auto-allowed
```

## Permission Logging

Every permission decision is logged to the `tool_permission_log` table in the database, regardless of the outcome:

| Column | Description |
|--------|-------------|
| `session_id` | The session that made the request |
| `tool_use_id` | The tool call ID from the model |
| `tool_name` | Name of the tool (e.g. `Bash`) |
| `decision` | `allow`, `deny`, or `ask` |
| `reason_json` | JSON with additional context |
| `created_at` | Timestamp |

You can audit all permission decisions with:

```sql
SELECT tool_name, decision, created_at 
FROM tool_permission_log 
ORDER BY created_at DESC 
LIMIT 50;
```

## Setting the Mode

From the REPL:

```
❯ /config set permissions.defaultMode acceptEdits
```

In a settings file (`.ona/settings.json` or `.claude/settings.local.json`):

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "deny": ["Bash"],
    "allow": ["Read", "Write", "Edit", "Glob", "Grep"]
  }
}
```

See [Configuration](/nehanda-cli-configuration) for the full settings file reference.