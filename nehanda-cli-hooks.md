---
title: "Hooks"
layout: default
parent: "Nehanda CLI"
nav_order: 14
---

# Hooks

The hook system lets you run shell commands at specific points in the engine's execution lifecycle. Every hook invocation is logged to the `hook_invocations` table with full input, output, and timing.

## How Hooks Work

Hooks are defined as an array in your settings (`.ona/settings.json`, `.claude/settings.local.json`, or via `/config`). When an event fires, the engine:

1. Filters hooks by `hook_event_name`
2. Deduplicates adjacent identical hooks
3. For each matching hook, checks the `matcher` against event-specific fields
4. Spawns the hook command as a child process
5. Passes event context as JSON on **stdin**
6. Captures stdout (up to 4 MB), stderr, and exit code
7. Persists everything to `hook_invocations`
8. Processes the result based on the event type

## Hook Config Schema

```json
{
  "hooks": [
    {
      "hook_event_name": "PreToolUse",
      "matcher": "Bash",
      "command": "echo $HOOK_INPUT | jq .tool_input.command",
      "shell": "bash",
      "if_condition": ""
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `hook_event_name` | string | Yes | Event to listen for |
| `matcher` | string | No | Pattern to match (regex, pipe-delimited list, or `*` for all) |
| `command` | string | Yes | Shell command to execute |
| `shell` | string | No | `bash` (default), `sh`, or `powershell` |
| `if_condition` | string | No | Conditional expression (reserved) |

## Matcher Behavior

The matcher is compared against an event-specific field:

| Event | Matched field |
|-------|--------------|
| `PreToolUse`, `PostToolUse`, `PostToolUseFailure` | `tool_name` |
| `SessionStart`, `ConfigChange` | `source` |
| `Setup`, `PreCompact`, `PostCompact` | `trigger` |
| `Notification` | `notification_type` |
| `SessionEnd` | `reason` |
| `StopFailure` | `error` (string) |
| `SubagentStart`, `SubagentStop` | `agent_type` |
| `FileChanged` | filename (basename of `file_path`) |

Matcher formats:
- `*` or empty — matches everything
- `Bash` — exact match
- `Bash|Edit|Write` — pipe-delimited list (matches any)
- `^Bash$` — regex

## Event Reference

### Tool Lifecycle

| Event | When | Special behavior |
|-------|------|-----------------|
| `PreToolUse` | Before a tool executes | Can **block** the tool (exit code 2) or influence permissions (stdout JSON with `permissionDecision`) |
| `PostToolUse` | After successful tool execution | Informational only |
| `PostToolUseFailure` | After a tool returns `is_error: true` | Informational only |

#### PreToolUse: Controlling Execution

A `PreToolUse` hook can influence the tool execution in two ways:

**Block the tool** — Exit with code 2. The tool call is rejected and the model receives an error:

```bash
#!/bin/bash
# Block rm -rf commands
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')
if echo "$COMMAND" | grep -q 'rm -rf'; then
  echo "Destructive command blocked by policy" >&2
  exit 2
fi
```

**Influence permission decision** — Return JSON on stdout with a `permissionDecision`:

```bash
#!/bin/bash
echo '{"hookSpecificOutput":{"permissionDecision":"deny"}}'
```

When multiple `PreToolUse` hooks fire, their permission decisions are merged with a priority ranking: `deny` > `ask` > `allow` > `unset`. The highest-ranking decision wins. If any hook blocks (exit code 2), remaining hooks are skipped.

### Conversation Lifecycle

| Event | When |
|-------|------|
| `UserPromptSubmit` | Before processing user input. Exit code 2 **blocks the prompt entirely**. |
| `Stop` | After the turn loop completes normally |
| `StopFailure` | After a provider error (401, 429, 500, etc.) |
| `SessionStart` | When a new session begins |
| `SessionEnd` | When a session ends (1.5s timeout by default) |

### File & Directory

| Event | When | Context fields |
|-------|------|---------------|
| `FileChanged` | After `Write` or `Edit` modifies a file | `file_path`, `event` (`add` or `change`) |
| `CwdChanged` | After `Bash` changes the working directory | `old_cwd`, `new_cwd` |

### Worktree

| Event | When |
|-------|------|
| `WorktreeCreate` | After creating a git worktree |
| `WorktreeRemove` | After removing a git worktree |

### Agent & Task

| Event | When |
|-------|------|
| `SubagentStart` | Before a subagent turn begins |
| `SubagentStop` | After a subagent turn completes |
| `TaskCreated` | When `TodoWrite` creates a todo item |
| `TaskCompleted` | When `TodoWrite` marks an item completed |
| `TeammateIdle` | When a team member agent goes idle |

## Stdin Input

Every hook receives a JSON object on stdin with these base fields:

```json
{
  "hook_event_name": "PreToolUse",
  "session_id": "uuid",
  "conversation_id": "uuid",
  "runtime_db_path": "/path/to/db",
  "cwd": "/working/directory"
}
```

Plus event-specific fields (e.g. `tool_name`, `tool_input`, `file_path`). You can read this with `jq` or any JSON parser.

## Environment Variables

Hook processes inherit the parent environment plus:

| Variable | Description |
|----------|-------------|
| `AGENT_SDLC_DB` | Path to the SQLite database |
| `SDLC_HOOK` | Always `1` — lets scripts detect they're running as a hook |
| `CLAUDE_PROJECT_DIR` | Working directory |

## Disabling Hooks

Set `SDLC_DISABLE_ALL_HOOKS=1` to skip all hooks:

```bash
SDLC_DISABLE_ALL_HOOKS=1 node bin/agent.mjs
```

## Timeouts

| Event | Default Timeout | Override |
|-------|-----------------|----------|
| All events (except SessionEnd) | 600,000 ms (10 min) | `SDLC_HOOK_TIMEOUT_MS` |
| `SessionEnd` | 1,500 ms | `SDLC_SESSIONEND_HOOK_TIMEOUT_MS` |

## Example: Block Destructive Commands

```json
{
  "hooks": [
    {
      "hook_event_name": "PreToolUse",
      "matcher": "Bash",
      "command": ".ona/hooks/block-destructive.sh"
    }
  ]
}
```

`.ona/hooks/block-destructive.sh`:

```bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')
if echo "$COMMAND" | grep -qE '(rm -rf|drop table|DROP DATABASE)'; then
  echo "Blocked destructive command: $COMMAND" >&2
  exit 2
fi
```

## Example: Notify on File Changes

```json
{
  "hooks": [
    {
      "hook_event_name": "FileChanged",
      "matcher": "*",
      "command": "echo \"$(date): $CLAUDE_PROJECT_DIR\" >> ~/.nehanda-changes.log"
    }
  ]
}
```
