---
title: "Core Dependencies"
layout: default
---

<div class="page-header">
  <h1>Core Dependencies</h1>
  <p>Nehanda CLI is built on two open-source projects that provide the memory substrate and terminal interface.</p>
</div>

## aimee

<div class="quick-start-section">
  <a href="https://github.com/RakuenSoftware/aimee" class="quick-start-button" target="_blank">
    View on GitHub
  </a>
  <p class="quick-start-subtext">
    Your AI has no memory, no map of your code, and no brakes. aimee fixes all of it.
  </p>
</div>

aimee is the memory and agent substrate that Nehanda CLI forks. It provides the foundational capabilities that make the nehanda stack work: persistent memory, code indexing, delegate orchestration, and guardrails.

### What it provides

**Memory that compounds.** Every session starts already knowing what the last one learned. A curator pipeline distills raw sessions into a typed knowledge base, dedupes facts, flags contradictions, and lets stale detail decay. The memory and code index form a **hybrid vector-graph** — vector recall fused with a typed knowledge graph and your code's call graph, ranked together.

**Your codebase as a map.** aimee indexes your code into a symbol and call graph. The AI finds callers, traces an edit's blast radius before it writes a line, and works from the graph instead of reading your files over again each session. The graph spans repositories, so one dependency map covers every repo you work across.

**Delegates that cut the bill.** Send summarization, review, and boilerplate to the cheapest model that can handle it. Local models on your GPU cost nothing. The primary agent gets a compact result back instead of raw content. aimee tracks cost and success per delegate and routes better over time.

**Self-hosted inference.** aimee ships a self-hosted inference stack: embeddings, reranking, and synthesis in one CPU or GPU container. The knowledge base curates entirely on your hardware with no outside API calls.

**Autonomous development.** Hand aimee a written proposal and it runs the job unattended: design, plan, implement, review, open the PR. The primary agent manages, a panel of models reviews the work, and delegates do the building.

**Guardrails and isolation.** Sensitive files like `.env`, private keys, and production configs are blocked before the AI can touch them. Known anti-patterns raise warnings. Planning mode freezes every write until you are ready. Each session runs in its own git worktree.

### Performance

Core services are written in **C**, with hot paths running in **single-digit milliseconds**. Nothing phones home.

### How Nehanda CLI uses it

Nehanda CLI is a fork of aimee that wires in the Nehanda model as the primary reasoning model. The aimee infrastructure — memory, code graph, delegates, guardrails — is preserved. The Nehanda-specific additions are the model configuration, system prompts, and the nehanda-server binary that manages the inference pipeline.

---

## aichat

<div class="quick-start-section">
  <a href="https://github.com/sigoden/aichat" class="quick-start-button" target="_blank">
    View on GitHub
  </a>
  <p class="quick-start-subtext">
    All-in-one AI-powered CLI tool: chat with LLMs, run RAG, call tools, and manage roles.
  </p>
</div>

aichat is the interactive terminal UI (TUI) that Nehanda CLI uses as its user-facing interface. It is installed automatically by `install.sh` and configured to talk to `nehanda-server` over the loopback HTTP API.

### What it provides

**Multi-provider support.** aichat works with OpenAI, Anthropic, Gemini, Mistral, Ollama, and any OpenAI-compatible endpoint. In the Nehanda CLI setup, it is pointed at `nehanda-server` on `127.0.0.1:8740`.

**Rich terminal UI.** The nehanda-ui (built on aichat's Ink-based TUI) shows the current agent, model, endpoint, bearer token, and live token usage. Slash commands provide quick access to configuration and status.

**Sessions and roles.** aichat supports persistent sessions, role-based system prompts, and context management — all leveraged by Nehanda CLI to maintain conversation state across sessions.

### How Nehanda CLI uses it

The `nehanda` command launches `nehanda-ui`, which is aichat configured against nehanda-server. The install script sets up:
- The aichat binary at `/opt/homebrew/bin/aichat` (or equivalent)
- Configuration pointing to `nehanda-server` on `127.0.0.1:8740`
- A workspace registration wrapper at `~/.local/bin/nehanda` that captures the current working directory

The TUI passes `cwd: process.cwd()` in every chat request, ensuring file operations happen in the correct directory — the one where you invoked `nehanda`, not the installation directory.
