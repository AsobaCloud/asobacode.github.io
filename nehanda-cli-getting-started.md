---
title: "Getting Started"
layout: default
parent: "Nehanda CLI"
nav_order: 1
---

# Getting Started with Nehanda CLI

Install and configure Nehanda CLI, connect it to your preferred AI inference provider via the interactive configuration wizard, and run your first governed development session.

## Requirements

- **Node.js**: v22.0.0 or higher
- **Python**: 3.10 or higher (for the Laya System-1 control plane)
- **SQLite**: Local SQLite runtime support
- **Terminal Emulator**: macOS Terminal, iTerm2, Windows Terminal, Ghostty, Alacritty, or any modern terminal emulator

## 1. Installation

### Option A: Global npm install (recommended)

```bash
npm install -g @asobacloud/nehanda
```

During install, `npm` automatically executes `postinstall.mjs` to provision a dedicated Python virtual environment and download the [Laya](https://huggingface.co/convaiinnovations/laya) System-1 decision checkpoint (~808 MB). This provisioning runs once — subsequent launches start instantly.

### Option B: Single-line verified curl installer

```bash
curl -fsSL https://asoba.co/releases/install.sh | sh
```

The installer downloads `nehanda-cli-latest.tar.gz` and automatically validates its SHA-256 cryptographic digest against `https://asoba.co/releases/SHA256SUMS` before unpacking into `~/.nehanda`. Prebuilt distribution artifacts (`.tar.gz`, `.bin`, `.dmg`) are signed and checksum-verified.

### Option C: From source

```bash
git clone https://github.com/AsobaCloud/nehanda-cli.git
cd nehanda-cli
npm install
```

The same one-time Laya provisioning runs automatically during `npm install`.

## 2. Launching Nehanda

Launch the interactive Ink TUI:

```bash
nehanda
```

Or via the built-in aliases:

```bash
ona
ona-code
```

On first startup, Nehanda initializes your local SQLite audit database at `~/.config/nehanda/ona-session.db` (schema v4) and presents the interactive REPL prompt:

```
❯ 
```

## 3. Provider Setup (/model Wizard)

Nehanda CLI features a unified, interactive Goose-style configuration wizard. Run `/model` in the REPL:

```
❯ /model

◆  Which provider?
│  ● OpenRouter
│  ○ Anthropic Claude
│  ○ Ollama (Local or LAN)
│  ○ LM Studio
│  ○ Nehanda Cloud
│  ○ Any OpenAI-compatible API
└
◆  API key
│  sk-or-v1-…
└
◆  API host
│  https://openrouter.ai/api/v1
└
  Fetching models from provider…
◆  Model
│  ● openai/gpt-4o
└
  ✓ Provider / host / model saved — session active
```

### Wizard Features & Shortcuts

- **Live Model Catalog Discovery:** The wizard sends an authenticated `GET /models` request (or `/api/tags` for Ollama) to discover all available models dynamically. You can filter and select with arrow keys or enter a custom identifier.
- **Credential Isolation:** Provider credentials are saved under provider-specific keys. Switching providers never bleeds keys or hosts across configurations.
- **Secret Masking:** Keys entered during the `/model` wizard or via inline commands are masked during typing (`sk-…`) and redacted in conversation histories and database logs.
- **Fast Key Shortcut:** Set a key directly and jump into model selection in one step:
  ```
  ❯ /key openrouter sk-or-v1-...
  ```
- **Read-Only Status:** Inspect active provider, model, endpoint health, and latency at any time:
  ```
  ❯ /config
  ```

### Local Inference (Ollama / LM Studio)

1. Launch your local instance (e.g. `ollama serve` on port 11434, or LM Studio on port 1234).
2. Type `/model`, select **Ollama** or **LM Studio**, confirm the local host (`http://localhost:11434/v1`), and pick your installed model from the discovered list.
3. Nehanda automatically detects Ollama native tool support and sets `think: false` for models that support explicit reasoning toggling.

---

## 4. Sandbox Setup (OS-Primitives Confinement)

When execution checkers flag a shell command or script, the safety menu presents an **[S] Run in OS Sandbox** option. Commands executed in the sandbox run in a disposable, credential-filtered snapshot of your project with zero container overhead:

- **macOS:** Utilizes the built-in Apple Seatbelt framework (`/usr/bin/sandbox-exec`) with a deny-default profile.
- **Linux:** Utilizes `bubblewrap` (`bwrap`). Install via package manager:
  ```bash
  # Ubuntu/Debian
  sudo apt install bubblewrap

  # Fedora/RHEL
  sudo dnf install bubblewrap

  # Arch Linux
  sudo pacman -S bubblewrap
  ```

### Sandbox Isolation Properties

- **Disposable Snapshot:** Creates an isolated working copy (up to 256 MiB / 10,000 entries / depth 64; credential and dependency directories excluded). Changes made in the sandbox are discarded after execution.
- **Default Egress Block:** Network egress is denied by default.
- **Optional Egress Allowlist:** To allow specific package registries or endpoints from inside the sandbox, export `NEHANDA_SANDBOX_ALLOWLIST` before running `nehanda`:
  ```bash
  export NEHANDA_SANDBOX_ALLOWLIST="registry.npmjs.org,github.com"
  nehanda
  ```
  Nehanda spins up an in-process unix-domain-socket proxy (`NEHANDA_SANDBOX_PROXY_SOCKET`) that permits requests only to those exact hostnames.

---

## 5. Your First Session

Once connected, ask Nehanda to inspect your environment:

```
❯ Read package.json and summarize this repository
```

The engine will:
1. Stream reasoning progress live in the TUI spinner (`⠋ Thinking (42 tokens)...`)
2. Call the `Read` tool (`⚙ Read(package.json)`)
3. Return the result with context metadata
4. Present a markdown-formatted summary at terminal default contrast

### Triggering the Governed SDLC Workflow

To initiate software development under strict governance, propose an objective:

```
❯ Implement energy yield reconciliation for Huawei inverter logs
```

The engine prompts:
```
Use SDLC workflow (11-phase governed state machine)? [Y/n]
```

Press Enter to initiate the canonical 11-phase workflow:
1. **`explore`** — Scans architecture documentation and schema definitions (read-only tools; 20-request ceiling)
2. **`diagnose`** — Formulates an evidenced root cause analysis
3. **`create_issue`** — Registers an issue artifact under `.issues/`
4. **`create_tests`** — Authors a behavioral Given-When-Then test and runs it to capture genuine runner **RED** evidence
5. **`planning`** — Compiles a substantive Plan Triad (files, functions, behaviors) and pauses for your explicit **`[y/N]` approval**
6. **`implement`** — Applies minimal approved production edits under epistemic isolation
7. **`verify`** — Runs the original unchanged regression to prove **GREEN**
8. **`safety`** — Executes all 3 safety checkers (`js-safety-checker.cjs`, `shell-safety-checker.sh`, `python-safety-checker.py`) and validates $\ge 70\%$ branch coverage
9. **`confirm_fix`** — Displays the complete evidence package for your final confirmation
10. **`done`** — Commits the changes with the issue reference and cleanly resets to `idle`

See [SDLC Workflow](/nehanda-cli-sdlc) for the complete reference.

---

## 6. Useful Daily Commands

```
❯ /help               # List all top-level and subcommand options
❯ /model              # Interactive provider & model selection wizard
❯ /config             # Read-only configuration & endpoint latency check
❯ /mcp status         # Inspect connected MCP servers and tools
❯ /mcp env unset <svr> <KEY>  # Remove an MCP server environment variable
❯ /clear              # Reset conversation transcript
❯ /exit               # Terminate REPL session
```

---

## Next Steps

- [SDLC Workflow](/nehanda-cli-sdlc) — Complete guide to the 11-phase state machine and evidence contracts
- [Architecture](/nehanda-cli-architecture) — Deep-dive into the 6-layer engine
- [Permissions & Sandbox](/nehanda-cli-permissions) — Policy modes and OS-primitives isolation
- [Database Schema](/nehanda-cli-database) — Querying transcript, test execution, and memory tables
- [Built-in Tools](/nehanda-cli-tools) — Reference for all 21 tools and safety checkers
