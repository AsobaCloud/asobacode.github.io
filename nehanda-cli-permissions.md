---
title: "Permissions"
layout: default
parent: "Nehanda CLI"
nav_order: 7
---

# Permissions

Every tool call the model produces passes through the **permission gate** before execution. The gate evaluates the tool name against the active permission policy and returns one of three decisions: `allow`, `deny`, or `ask`.

## How It Works

```
Model emits tool_use block
        │
        ▼
evaluatePermission(permissions, toolName, toolInput, phase)
        │
        ├── matches deny list? ────────────────→ return 'deny'
        ├── matches ask list? ─────────────────→ return 'ask'
        ├── matches allow list? ───────────────→ return 'allow'
        │
        ▼
  Apply defaultMode rules (phase-aware)
        │
        ├── 'allow'  → execute immediately
        ├── 'deny'   → return error to model
        └── 'ask'    → prompt user in terminal
                      (auto-approve in pipe mode)
```

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