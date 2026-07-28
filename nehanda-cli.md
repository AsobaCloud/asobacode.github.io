---
title: "Nehanda CLI"
layout: default
---

<div class="page-header">
  <h1>Nehanda CLI</h1>
  <div class="version-badge">
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
    A local AI coding substrate powered by the <a href="/nehanda-model">Nehanda</a> fine-tuned model. Free and open-source.
  </p>
</div>

## Overview

Nehanda CLI is a local AI coding agent that brings the [Nehanda model](/nehanda-model) into your terminal. It is a fork of [aimee](/dependencies#aimee) — wiring Nehanda in as the primary reasoning model: a fine-tuned Qwen3.6 27B multimodal stack for technical writing, deep research, coding, document review, and vision.

**No Docker. Three native binaries + postgres + local embedder.**

## Architecture

```
  Your Terminal
    └─ aichat (TUI) ──────────────────────────→ nehanda-server :8740 → nehanda-server (UDS)
  • 4-tier memory compaction (~86% token reduction pre-egress)
  • Code index + KB — postgres + pgvector, never leaves machine
  • Supervisor/Delegate task fan-out → local/LAN Ollama (free)
          │  compacted payload only
          ▼
  Nehanda 27B on EC2 (nehanda.asoba.co:8000)
  • vLLM, tensor-parallel
  • nehanda-rag-synthesis-27b
```

The stack runs entirely on your machine except for the Nehanda model inference, which hits a remote EC2 endpoint. Only the compacted payload leaves your machine — your code and knowledge base stay local.

## Quick Start

### Requirements

- macOS or Linux
- cmake 3.16+, make, git, C11 compiler
- Homebrew (macOS) or apt/dnf (Linux)
- Ollama (optional — for local and LAN delegate workers)

### Install

```bash
git clone https://github.com/AsobaCloud/nehanda-cli.git
cd nehanda-cli
./install.sh
nehanda
```

`install.sh` builds the nehanda stack and installs [aichat](/dependencies#aichat) as the interactive TUI. It handles postgres, pgvector, and all build dependencies — one command, no follow-up steps.

```bash
./install.sh    # ~40s on re-run with cached build
nehanda         # interactive TUI
nehanda chat "…"  # one-shot message (server stream, no TUI)
```

Add to your shell profile:

```bash
export PATH="$HOME/.local/bin:$PATH"
export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"   # macOS only
```

### Automatic Workspace Registration

When you run `nehanda` from any git repository, it automatically adds that directory as a workspace. This enables the agent to access files from your actual working directory instead of being sandboxed in worktrees.

## Key Features

### 4-Tier Memory Compaction

Every session starts already knowing what the last one learned. A curator pipeline distills raw sessions into a typed knowledge base, dedupes facts, flags contradictions, and lets stale detail decay. Approximately **86% token reduction** before any payload reaches the model.

### Codebase as a Map

Nehanda CLI indexes your code into a symbol and call graph. The agent finds callers, traces an edit's blast radius before it writes a line, and works from the graph instead of reading your files over again each session. The graph spans repositories — one dependency map covers every repo you work across.

### Supervisor/Delegate Task Fan-Out

Send summarization, review, and boilerplate to the cheapest model that can handle it. Local models on your GPU via Ollama cost nothing. The primary agent gets a compact result back instead of raw content, saving on both the delegate and the primary's context.

### Guardrails and Isolation

Sensitive files like `.env`, private keys, and production configs are blocked before the agent can touch them. Each session runs in its own git worktree, so two sessions never step on each other.

## Slash Commands

| Command | Description |
|---------|-------------|
| `/model` | Change agent model or orchestrator model |
| `/bearer` | Update bearer token in config atomically |
| `/token` | Last 24h token usage breakdown |
| `/stats` | KB, memory, token usage, and service health |
| `/auth` | Auth status / login stub |
| `/config` | Show current config |
| `/clear` | Start a new conversation |
| `/help` | List all commands |
| `/exit` | Quit |

## Self-Hosting

Nehanda CLI supports running with a local model instead of the EC2 endpoint. Any OpenAI-compatible model can be configured as the primary agent or orchestrator, including models from ZAI, OpenAI, or self-hosted models. See the [self-hosting guide](https://github.com/AsobaCloud/nehanda-cli/blob/main/docs/SELF_HOST.md) in the repo.

## Model Configuration

Nehanda-cli supports any OpenAI-compatible model as your primary agent or orchestrator. You can configure models through the agent configuration system, allowing you to use models from various providers without being locked to a specific provider.

## Further Documentation

- [Quick Start Guide](https://github.com/AsobaCloud/nehanda-cli/blob/main/docs/QUICK_START.md)
- [Architecture](https://github.com/AsobaCloud/nehanda-cli/blob/main/docs/ARCHITECTURE.md)
- [Self-Hosting](https://github.com/AsobaCloud/nehanda-cli/blob/main/docs/SELF_HOST.md)
- [Troubleshooting](https://github.com/AsobaCloud/nehanda-cli/blob/main/docs/TROUBLESHOOTING.md)
- [Vision Pipeline](https://github.com/AsobaCloud/nehanda-cli/blob/main/docs/VISION_PIPELINE.md)
- [Refactor Plan](https://github.com/AsobaCloud/nehanda-cli/blob/main/docs/REFACTOR_PLAN.md)

## License

AGPL-3.0. This project is a fork of [aimee](https://github.com/RakuenSoftware/aimee) (AGPL-3.0, Copyright © 2026 The aimee authors). See [NOTICE](https://github.com/AsobaCloud/nehanda-cli/blob/main/NOTICE) for third-party attributions.
