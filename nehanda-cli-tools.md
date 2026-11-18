---
title: "Built-in Tools"
layout: default
parent: "Nehanda CLI"
nav_order: 5
---

# Built-in Tools & Safety Checkers

Nehanda CLI ships with 21 built-in tools, 4 declarative safety checkers, a branch coverage collector, and an extensible MCP client. Tool availability is strictly governed by the active phase of the 11-phase SDLC state machine.

---

## SDLC Phase Availability Matrix

| Phase | Read, Glob, Grep | Write, Edit, NotebookEdit | Bash | WebFetch, WebSearch | Notes |
|:---|:---:|:---:|:---:|:---:|:---|
| `idle` | Allowed | Ask / Gated | Refused if mutating | Allowed | Open research |
| `explore` | **Allowed** | **Denied** | **Denied** | Allowed | Strictly read-only exploration |
| `diagnose` | Allowed | **Denied** | **Denied** | Allowed | Evidence synthesis |
| `create_issue` | Allowed | `.issues/` only | **Denied** | Allowed | Creates task record |
| `create_tests` | Allowed | **Test files only** | **Allowed** (Test runner) | Allowed | Authors Given/When/Then test |
| `planning` | **Denied** | **Denied** | **Denied** | **Denied** | Zero tools; structured Plan Triad |
| `implement` | Allowed | **Allowed** | Allowed | Allowed | Minimal production edits |
| `verify` | Allowed | **Denied** | **Allowed** (Test runner) | Allowed | Original unchanged test run |
| `safety` | Allowed | **Denied** | **Allowed** (Checkers) | Allowed | 3 Checkers + $\ge 70\%$ coverage |
| `confirm_fix` | Allowed | **Denied** | **Denied** | Allowed | Human review |
| `done` | Allowed | **Denied** | **Allowed** (Git commit) | Allowed | Authorized commit & push |

---

## File Operations

### Read
Reads file contents with line numbers. Supports pagination via `offset` and `limit`.
* **Parameters:** `file_path` (string, required), `offset` (integer, optional), `limit` (integer, optional).
* **Limits:** Files capped at 1,048,576 bytes (1 MB).
* **Jev-Mem Integration:** In `explore` phase, successful reads populate durable memory nodes, and repeated canonical doc reads are cached.

### Write
Creates or completely overwrites a file.
* **Parameters:** `file_path` (string, required), `content` (string, required).
* **Security:** Paths outside the active working directory are blocked.
* **Phase Rules:** Blocked in `explore`, `diagnose`, and `planning`. Restricted strictly to `tests/**` during `create_tests`.

### Edit
Targeted find-and-replace text modifications.
* **Parameters:** `file_path` (string, required), `old_string` (string, required), `new_string` (string, required), `replace_all` (boolean, optional).
* **Behavior:** `old_string` must match uniquely in the file unless `replace_all: true` is specified.

---

## Discovery & Codebase Navigation

### Glob
Fast directory tree walking matching glob patterns (`**/*.mjs`, `src/**/*.ts`). Skips `node_modules`, `.git`, `.issues`, and build caches.
* **Parameters:** `pattern` (string, required), `path` (string, optional).

### Grep
Regular expression content search across files.
* **Parameters:** `pattern` (string, required), `path` (string, optional), `output_mode` (`files_with_matches`, `content`, `count`), `glob` (string, optional), `-i` (boolean, optional), `-C` (integer, optional).

---

## Shell Execution & OS Sandbox

### Bash
Executes commands in a subprocess via `/bin/bash -c`.
* **Parameters:** `command` (string, required), `timeout` (integer, default: 120,000 ms).
* **Bash Guard:** Blocks destructive commands (`sudo`, `push --force`, `rm -rf /`, `chmod -R`).
* **Interactive Safety Menu:** When a command is blocked by the guard or safety checkers, the TUI presents the `BlockConfirmMenu`:
  * `[A]` **Approve for Session:** Caches approval in-memory (`cacheSessionApproval`) to avoid repeated prompting.
  * `[S]` **Run in OS Sandbox:** Executes the command inside an OS-primitives sandbox against an isolated, disposable project copy:
    * **macOS:** Built-in Seatbelt (`/usr/bin/sandbox-exec`) with deny-default profile.
    * **Linux:** Bubblewrap (`bwrap`).
    * **Guarantees:** Confined to disposable copy (256 MiB / 10k entries); host credentials never forwarded; network egress denied by default; optional host allowlist via `NEHANDA_SANDBOX_ALLOWLIST` and unix-socket proxy.
  * `[C]` **Cancel:** Safely aborts the command.
* **Headless Auto-Deny:** In pipe mode, blocked commands are denied immediately.

---

## Web Access

### WebFetch
Fetches remote web content or API endpoints (capped at 1 MB, 30s timeout).
* **Parameters:** `url` (string, required).

### WebSearch
Web search via DuckDuckGo Lite. Returns top results with titles, URLs, and snippets.
* **Parameters:** `query` (string, required), `allowed_domains` (string[], optional), `blocked_domains` (string[], optional).

---

## User Interaction & Tasks

### AskUserQuestion
Pauses execution to ask the human operator a clarification question. (Auto-responds `(no response)` in headless pipe mode).

### Brief
Displays an informational markdown notice in the TUI without injecting into the assistant's context history.

### TodoWrite
Manages task checklists (`id`, `title`, `status`) and triggers `TaskCreated` or `TaskCompleted` event hooks.

---

## Mandatory Safety Checkers & Branch Coverage

In the **`safety` phase**, the model cannot advance to `confirm_fix` until all three mandatory safety checkers pass with exit code 0 and measured branch coverage meets the threshold.

### 1. `JsSafetyChecker`
* **Script:** `node lib/scripts/js-safety-checker.cjs .`
* **Checks:** Standalone JavaScript/TypeScript/CJS/MJS syntax, duplicate function declarations, duplicate HTML element IDs, and script-tag syntax errors.

### 2. `ShellSafetyChecker`
* **Script:** `bash lib/scripts/shell-safety-checker.sh .`
* **Checks:** Missing `set -euo pipefail`, unquoted variable expansions in destructive commands, silent background job failures, and hardcoded credentials.

### 3. `PythonSafetyChecker`
* **Script:** `python3 lib/scripts/python-safety-checker.py .`
* **Checks:** AST security audits (Bandit), Ruff linting, mutable default arguments, and unsafe `eval`/`exec`/`pickle` usage.

### 4. Branch Coverage Collector
* **Module:** `lib/branch-coverage-collector.mjs`
* **Threshold:** Must measure $\ge 70\%$ branch coverage across all changed production files based on Istanbul/LCOV or Pytest-cov coverage artifacts. A zero exit code without qualifying branch coverage is rejected.
