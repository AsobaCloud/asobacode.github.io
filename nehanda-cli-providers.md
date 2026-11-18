---
title: "Providers"
layout: default
parent: "Nehanda CLI"
nav_order: 10
---

# Providers & Inference Backends

The provider layer provides a unified interface across cloud frontier models and local self-hosted engines. Nehanda CLI features an interactive Goose-style configuration wizard, automatic live model discovery, provider credential isolation, and capability probing for tool use and reasoning tokens.

---

## Unified `/model` Configuration Wizard

Provider selection and credential setup are handled in a single interactive terminal flow via `/model`:

```
❯ /model

◆  Which provider?
│  ● OpenRouter
│  ○ Anthropic Claude
│  ○ Ollama (Local or LAN)
│  ○ LM Studio
│  ○ Nehanda Cloud
│  ○ Zhipu AI
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
│  ○ anthropic/claude-3.5-sonnet
│  ○ meta-llama/llama-3.3-70b-instruct
│  ○ deepseek/deepseek-chat
└
  ✓ Provider / host / model saved — session active
```

### Wizard Features

* **Dynamic Catalog Discovery:** Sends an authenticated `GET /models` request (or `/api/tags` for Ollama) to discover models in real time. Large catalogs include type-to-filter fuzzy searching.
* **Credential Isolation:** Credentials are keyed to specific providers. Switching providers never bleeds API keys or custom hosts across configurations.
* **Secret Masking & Redaction:** API keys are masked during typing (`sk-…`) and permanently redacted in conversation transcripts and database logs.
* **Shortcut `/key`:** Saves a provider key and immediately chains into the host and model selection steps:
  ```
  ❯ /key openrouter sk-or-v1-...
  ```
* **Read-Only Status `/config`:** Displays active provider, model ID, API host, and endpoint latency without modifying settings.

---

## Provider Code Paths

All providers route through one of two execution paths, both supporting streaming completions and the deterministic turn loop:

| Code Path | Providers | SDK / Client | Native Tool Support |
|:---|:---|:---|:---|
| **Anthropic SDK** | Anthropic Claude, Bedrock | `@anthropic-ai/sdk` | Yes (`tool_use` blocks) |
| **OpenAI-Compatible** | OpenRouter, Ollama, LM Studio, Zhipu, Nehanda, Custom | Custom SSE streaming client (`openaiCompat.mjs`) | Yes (or `[TOOL_CALL]` rescue path) |

---

## Supported Providers

### 1. OpenRouter
Access dozens of frontier and open-weights models through a single API key:
* **Host:** `https://openrouter.ai/api/v1`
* **Discovery:** Live model catalog fetched from OpenRouter's model endpoint.
* **Reasoning Tokens:** Parses `delta.reasoning` and `delta.reasoning_content` to stream live token counters (`⠋ Thinking (N tokens)...`) in the TUI spinner.

### 2. Anthropic Claude
Connects using the official Anthropic SDK with native tool calling:
* **Host:** `https://api.anthropic.com`
* **Authentication:** `ANTHROPIC_API_KEY` or OAuth bearer token `ANTHROPIC_AUTH_TOKEN` (supports `oauth-2025-04-20` beta header).
* **Prompt Caching:** Automatically structures system prompts and Jev-Mem pinned context with prompt caching breakpoints.

### 3. Ollama (Local or LAN)
Connects to local or remote Ollama instances:
* **Host:** `http://localhost:11434/v1` (or remote LAN host via `OLLAMA_BASE_URL`).
* **Tool Capability Probe:** On startup or model selection, `detectOllamaToolSupport` queries Ollama's `/api/show` endpoint to check whether the modelfile or template contains `.Tools`. If supported, native tool calling is used; otherwise, the engine falls back to `[TOOL_CALL]` rescue automatically.
* **Instant Cancellation:** The probe uses composed `AbortSignal.any([signal, AbortSignal.timeout(3000)])` so pressing `Esc` cancels the probe immediately.
* **Reasoning Control:** For models supporting chain-of-thought toggling, Nehanda forwards `think: false` in request bodies when thinking is disabled in configuration.

### 4. LM Studio
Connects to local inference servers:
* **Host:** Auto-detected (default port 1234 or 8000).
* **Context Optimization:** Curates a compact toolset for local models with smaller context windows.

### 5. Nehanda Cloud (vLLM)
Connects to Nehanda's domain-tuned Qwen 27B model:
* **Host:** `https://nehanda-ml.asoba.co/v1`
* **Tool Calling:** Employs the `[TOOL_CALL]` rescue path to bypass proxy stop-token stripping.

---

## Wire Model Resolution

`resolveWireModel(model_config)` translates configured model IDs into the exact string required by the provider endpoint:
* Strips redundant vendor prefixes when routing directly to OEM endpoints.
* Preserves vendor prefixes when routing through multi-model gateways (e.g., OpenRouter).
* Injects `[GROUNDED FACTS]` blocks (current date, working directory, platform, shell) into system prompts so models don't consume context debating environment facts.

---

## Environment Variables

| Variable | Provider | Purpose |
|:---|:---|:---|
| `OPENROUTER_API_KEY` | OpenRouter | API key |
| `ANTHROPIC_API_KEY` | Claude | API key |
| `ANTHROPIC_AUTH_TOKEN` | Claude | OAuth bearer token |
| `OLLAMA_BASE_URL` | Ollama | Custom Ollama host URL |
| `OPENAI_API_KEY` | OpenAI-compatible | Generic API key |
| `OPENAI_BASE_URL` | OpenAI-compatible | Custom base URL endpoint |
| `NEHANDA_API_KEY` | Nehanda Cloud | API key |
