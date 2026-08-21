---
title: "Pipe Mode"
layout: default
parent: "Nehanda CLI"
nav_order: 15
---

# Pipe Mode

Nehanda CLI has two execution modes. The default is the interactive Ink TUI (requires a TTY). When stdin is not a TTY — for example when piping input or running in CI — the engine enters **pipe mode**: a headless execution mode designed for automation and acceptance testing.

## Mode Selection

```javascript
if (process.stdin.isTTY) {
  await mainInteractive(opts)   // Ink TUI
} else {
  await mainPipe(opts)          // Headless pipe mode
}
```

The engine selects the mode automatically based on whether stdin is a TTY. You don't need to pass a flag.

## Key Difference: Auto-Approve

In pipe mode, the `io.ask()` method always returns `'y'`. This means:

- **Permission prompts** are auto-approved (all tools execute without confirmation)
- **SDLC gates** (plan approval, implementation acceptance, test results) are auto-approved
- **Subagent turns** run without human interaction

This makes pipe mode suitable for CI/CD and automated workflows where no human is present.

## Usage

### Piped Input

```bash
# Pipe a single prompt
echo 'Read package.json and list all dependencies' | node bin/agent.mjs

# Multi-line prompt
printf 'Fix the typo in README.md\nCommit the change' | node bin/agent.mjs

# From a file
cat my-prompt.txt | node bin/agent.mjs
```

### Single Tool Execution (`--eval`)

Execute a single tool call and exit. No LLM interaction required.

```bash
node bin/agent.mjs --eval '{"tool":"Read","input":{"file_path":"package.json"}}'
node bin/agent.mjs --eval '{"tool":"Glob","input":{"pattern":"**/*.test.js"}}'
node bin/agent.mjs --eval '{"tool":"Bash","input":{"command":"npm test"}}'
```

This is useful for:
- Scripting file operations
- Running shell commands through the tool sandbox (with bash guard protection)
- Testing tool behavior in isolation

### Phase Transition (`--transition`)

Administratively transition a conversation's SDLC phase and exit. Used for testing or recovery.

```bash
node bin/agent.mjs --transition test --conversation <conversation-id>
# Output: Phase: test
```

The transition is validated against the valid transitions table — invalid transitions are rejected.

### Database Initialization (`--init-db`)

Initialize the SQLite database and exit. Creates all tables and indexes.

```bash
node bin/agent.mjs --init-db
# Output: DB: ~/.config/nehanda/ona-session.db
```

### Context Compaction (`--compact`)

Run the context compaction algorithm to summarize and trim the conversation transcript.

```bash
node bin/agent.mjs --compact
```

## CLI Flags

| Flag | Description |
|------|-------------|
| `--bare` | Minimal mode (no project instructions loading) |
| `--cwd DIR` | Set working directory |
| `--eval JSON` | Execute a single tool and exit |
| `--transition PHASE --conversation ID` | Transition phase and exit |
| `--init-db` | Initialize database and exit |
| `--compact` | Run context compaction |
| `--help` | Show usage information |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `AGENT_SDLC_DB` | SQLite database path (default: `~/.config/nehanda/ona-session.db`) |
| `SDLC_DISABLE_ALL_HOOKS` | Set to `1` to skip all hooks |

## Acceptance Testing

The Nehanda CLI test suite uses pipe mode for acceptance tests:

```bash
npm run acceptance
```

Tests pipe prompts into the engine and assert on the output, tool calls, and database state — all without a TTY.

## Output

In pipe mode, all output goes to stdout/stderr (no Ink rendering). The `io` adapter is simplified:

| Method | Behavior |
|--------|----------|
| `io.write(text)` | Writes to stdout |
| `io.println(text)` | Writes to stdout with newline |
| `io.ask(question)` | Returns `'y'` (auto-approve) |
| `io.spinner.start/stop` | No-op |
| `io.onToolStart/onToolResult` | No-op |