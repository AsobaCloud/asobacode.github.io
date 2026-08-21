---
title: "Built-in Tools"
layout: default
parent: "Nehanda CLI"
nav_order: 5
---

# Built-in Tools

Nehanda CLI ships with 21 built-in tools, 4 declarative safety checkers, and an MCP client that can discover tools from external servers. This page documents every built-in tool, its schema, and its phase availability.

## Phase Availability

| Phase | Available Tools |
|-------|----------------|
| `explore` | `Read`, `Glob`, `Grep` + `explore_only` dynamic tools |
| `planning` | *None* — model writes plan as text |
| `implement` | All tools |
| `test` | All tools (safety checkers mandatory) |
| `idle` | All tools (with permission gate) |

## File Operations

### Read

Read a file from the filesystem. Returns line-numbered content. Supports pagination with `offset` and `limit`.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | Yes | Path to file (absolute or relative to cwd) |
| `offset` | integer | No | Start line (0-based) |
| `limit` | integer | No | Max lines to read |

**Limits:** Files larger than 1 MB are truncated. Each read is capped at 1,048,576 bytes.

---

### Write

Create or overwrite a file. Parent directories are created automatically. Path is validated to stay within the working directory.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | Yes | Path to file |
| `content` | string | Yes | Full file content |

**Security:** Paths outside the working directory are rejected. Fires a `FileChanged` hook on write.

---

### Edit

Find and replace text in a file. By default, `old_string` must match exactly once — if it matches multiple locations, the tool returns an error asking for more context.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | Yes | Path to file |
| `old_string` | string | Yes | Text to find |
| `new_string` | string | Yes | Replacement text |
| `replace_all` | boolean | No | Replace all occurrences (default: false) |

**Behavior:** If `old_string` matches >1 location and `replace_all` is not set, the tool returns the match count and asks the model to provide more context to make the match unique. Fires a `FileChanged` hook.

---

## Discovery

### Glob

Find files matching a glob pattern. Walks the directory tree, skipping `node_modules` and `.git`. Returns up to 100 results.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | string | Yes | Glob pattern (e.g. `**/*.py`, `src/**/*.ts`) |
| `path` | string | No | Directory to search (default: cwd) |

**Supported patterns:** `*` (single segment), `**` (recursive), `?` (single character). Hidden files (starting with `.`) are skipped unless the pattern starts with `.`.

---

### Grep

Search file contents with a regular expression. Supports three output modes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | string | Yes | Regular expression |
| `path` | string | No | File or directory to search (default: cwd) |
| `output_mode` | string | No | `files_with_matches` (default), `content`, or `count` |
| `glob` | string | No | Filter filenames with a glob pattern |
| `-i` | boolean | No | Case-insensitive search |
| `-C` | integer | No | Context lines around matches |
| `head_limit` | integer | No | Max results (default: 250) |

---

## Shell Execution

### Bash

Run a shell command in a subprocess. The command is executed via `/bin/bash -c` (or `bash -c` on systems without `/bin/bash`).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | string | Yes | Shell command to execute |
| `timeout` | integer | No | Timeout in ms (default: 120,000; max: 600,000) |

**Bash Guard:** Every command is validated by the bash guard before execution. It blocks:
- Commands targeting paths outside the working directory (e.g. `rm -rf /`)
- Known destructive patterns

**CWD tracking:** The engine appends a marker to detect directory changes. If the command changes directory (e.g. `cd src`), the engine updates `process.cwd()` and fires a `CwdChanged` hook. The new CWD persists for subsequent tool calls within the same turn.

**Output limits:** stdout and stderr are each capped at 1 MB. If exceeded, output is truncated with `[SDLC_TRUNCATED]`.

---

## Web Access

### WebFetch

Fetch content from a URL. Returns the response body (capped at 1 MB). Uses a 30-second timeout.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | URL to fetch |
| `prompt` | string | No | (Reserved for future use) |

---

### WebSearch

Search the web using DuckDuckGo Lite. Returns up to 8 results with title, URL, and snippet.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search query (min 2 characters) |
| `allowed_domains` | string[] | No | Restrict results to these domains |
| `blocked_domains` | string[] | No | Exclude results from these domains |

---

## User Interaction

### AskUserQuestion

Prompt the user with a question and wait for a text response. Returns the user's answer as a string.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | string | Yes | Question to display |

**Note:** In pipe mode (non-TTY), this tool returns `(no response)` since there is no interactive input.

---

### Brief

Display a message to the user in the terminal. The message is rendered directly by the TUI — it is not sent to the model.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | string | Yes | Message to display |

---

## Task Management

### TodoWrite

Create or update todo items. Each todo has an `id`, `content`/`title`, and `status`. Fires `TaskCreated` or `TaskCompleted` hooks.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `todos` | array | Yes | Array of todo objects |

---

### TaskOutput

Record task output to the `events` table. Used by the model to checkpoint progress.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `output` | string | No | Output content to record |

---

### TaskStop

Stop a background task by sending SIGTERM.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `task_id` | string | Yes | Process ID to stop |

---

## Notebook

### NotebookEdit

Edit a Jupyter notebook cell. The notebook is parsed as JSON, the target cell is found by `cell_id` (or a new cell is prepended), and its `source` is replaced.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `notebook_path` | string | Yes | Path to the `.ipynb` file |
| `new_source` | string | Yes | New cell source code |
| `cell_type` | string | Yes | `code` or `markdown` |
| `cell_id` | string | No | ID of cell to edit (new cell prepended if omitted) |

---

## Agent & Skills

### Agent

Spawn a subagent that runs an isolated turn within the same process. The subagent gets its own session but shares the conversation. The subagent's output is collected and returned as the tool result.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | Yes | Task for the subagent |
| `description` | string | No | Description for logging (default: `subagent`) |

---

### Skill

Load a skill definition from the filesystem. Searches for `.ona/skills/<name>/SKILL.md` or `.ona/skills/<name>.md` (also checks `.claude/skills/` and `~/.ona/skills/`).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `skill` | string | Yes | Skill name to load |
| `args` | string | No | Arguments to pass to the skill |

---

### ToolSearch

Search for available tools by name or description.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search term |
| `max_results` | integer | No | Max results (default: 5) |

---

## Git Worktrees

### EnterWorktree

Create a git worktree for isolated work. The engine changes directory to the worktree path.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Worktree name (alphanumeric, max 64 chars) |

---

### ExitWorktree

Exit the current worktree. Can either keep or remove it.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `action` | string | No | `keep` or `remove` (default: `remove`) |

---

## MCP Resources

### ListMcpResources

List resources from a configured MCP server (or all servers).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `server` | string | No | Server name (lists all if omitted) |

---

### ReadMcpResource

Read a specific resource from an MCP server.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `server` | string | Yes | Server name |
| `uri` | string | Yes | Resource URI |

---

## Safety Checkers

Safety checkers are declarative tools registered from JSON configs in `lib/tools/`. They are **mandatory in the test phase** — the system prompt explicitly instructs the model: "After tests pass, you MUST run these mandatory safety checks. Do NOT skip them. If any fail, fix the issues and re-run."

| Checker | Script | What It Checks |
|---------|--------|----------------|
| `AuditCodeIntegrity` | `lib/scripts/audit-code-integrity.py` | Lifecycle teardown parity, mock-theater tests, naming invariants, swallowed exceptions |
| `ShellSafetyChecker` | `lib/scripts/shell-safety-checker.sh` | Missing `set -euo pipefail`, background job silent failure risk, hardcoded credentials |
| `JsSafetyChecker` | `lib/scripts/js-safety-checker.cjs` | Duplicate functions, duplicate HTML element IDs, script block syntax errors |
| `PythonSafetyChecker` | `lib/scripts/python-safety-checker.py` | Bandit security issues, ruff lint, mutable default args, `eval`/`exec`/`pickle` usage |

### Adding a New Safety Checker

1. Create a JSON config in `lib/tools/`:

```json
{
  "name": "MyChecker",
  "description": "What the checker does.",
  "input_schema": {
    "type": "object",
    "properties": {
      "target": { "type": "string", "description": "Target path" }
    }
  },
  "phases": {
    "explore_only": false,
    "planning_blocked": false,
    "mandatory_in": ["test"]
  },
  "prompt": {
    "mandatory_instruction": "Run MyChecker on the workspace.",
    "available_hint": "Checks for X, Y, and Z"
  },
  "execution": {
    "runtime": "python3",
    "script": "lib/scripts/my-checker.py",
    "args": ["{{target}}"],
    "default_timeout": 120000,
    "max_timeout": 600000
  }
}
```

2. Place the script at `lib/scripts/my-checker.py`. Arguments are interpolated from the `args` template using `{{key}}` syntax.

3. **No JavaScript changes needed.** The tool is discovered and registered automatically on startup.

The script receives arguments on the command line and runs with `cwd` set to the target workspace. Exit code 0 = pass, exit code 1 = fail. Stdout is returned as the tool result.
