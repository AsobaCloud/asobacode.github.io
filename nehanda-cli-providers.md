---
title: "Providers"
layout: default
parent: "Nehanda CLI"
nav_order: 10
---

# Providers

The provider layer abstracts away the differences between LLM providers behind a unified interface. Nehanda CLI supports five provider categories, each routing through one of two code paths.

## Provider Code Paths

| Code Path | Providers | SDK |
|-----------|-----------|-----|
| **Anthropic SDK** | `claude_code_subscription`, `anthropic` | `@anthropic-ai/sdk` |
| **OpenAI-Compatible** | `nehanda`, `ollama`, `lm_studio_local`, `zhipu`, `openai_compatible` | Custom streaming client (`openaiCompat.mjs`) |

Both paths implement the same behavior: stream a chat completion, collect tool calls, execute them, and loop. The only differences are the SDK used and how tool schemas are sent.

## Supported Providers

### Nehanda Cloud

The default provider. Connects to the Nehanda vLLM deployment behind a Lambda proxy.

| Setting | Default |
|---------|--------|
| `provider` | `nehanda` |
| `base_url` | `https://nehanda-ml.asoba.co/v1` |
| `api_key` | From env `NEHANDA_API_KEY` or `/key` command |

**Tool calling:** Uses the `[TOOL_CALL]` rescue path. The `nehandaMlProxy` Lambda strips `tools` and `tool_choice` from requests, so tool schemas are injected into the system prompt and parsed from model text.

### Anthropic Claude

Uses the official Anthropic SDK with native tool support.

| Setting | Value |
|---------|-------|
| `provider` | `claude_code_subscription` or `anthropic` |
| `base_url` | `https://api.anthropic.com` |

**Authentication:** Supports two modes:
- **API key:** `ANTHROPIC_API_KEY` environment variable
- **OAuth bearer:** `ANTHROPIC_AUTH_TOKEN` environment variable (uses `oauth-2025-04-20` beta header)

**Tool calling:** Native. Tools are sent in the `tools` parameter and results come back as structured `tool_use` content blocks.

### LM Studio

Connects to a locally running LM Studio instance.

| Setting | Default |
|---------|--------|
| `provider` | `lm_studio_local` |
| `base_url` | Auto-detected (port 1234 or 8000) |
| `api_key` | From `OPENAI_API_KEY` env (often not needed) |

**Tool calling:** Native when available. Tool set is reduced to six core tools (`Read`, `Write`, `Edit`, `Bash`, `Glob`, `Grep`) to conserve context window.

### Ollama

Connects to a local or remote Ollama instance.

| Setting | Default |
|---------|--------|
| `provider` | `ollama` |
| `base_url` | From `OLLAMA_BASE_URL` or `http://localhost:11434/v1` |
| `api_key` | `ollama` (placeholder) |

**Tool support detection:** On first use, the engine calls Ollama's `/api/show` endpoint to check if the model's chat template includes `.Tools` or its capabilities list includes `tools`. Results are cached per model. If not supported, falls back to the `[TOOL_CALL]` rescue path automatically.

**Tool calling:** Native if detected, rescue path if not.

### Zhipu

Connects to Zhipu AI's GLM models.

| Setting | Default |
|---------|--------|
| `provider` | `zhipu` |
| `model_id` | `glm_4_7_flash` |

**Tool calling:** OpenAI-compatible native.

### Any OpenAI-Compatible API

Connects to any server that implements the OpenAI chat completions API.

| Setting | Default |
|---------|--------|
| `provider` | `openai_compatible` |
| `base_url` | From `OPENAI_BASE_URL` env |
| `api_key` | From `OPENAI_API_KEY` env |

## Switching Providers

From the REPL:

```
❯ /model
# Lists available models from the active provider

❯ /model claude-sonnet-4-20250514
# Switches model (stays on current provider)

❯ /config set model_config.provider ollama
❯ /config set model_config.base_url http://localhost:11434/v1
❯ /model llama3
# Switches to Ollama with llama3
```

From a settings file:

```json
{
  "model_config": {
    "provider": "ollama",
    "model_id": "deepseek-coder-v2:latest",
    "base_url": "http://my-server:11434/v1"
  }
}
```

## Model Resolution

`resolveWireModel(model_config)` maps the configured `model_id` to the actual wire format the provider expects. For most providers this is a pass-through, but some providers require transformations (e.g., stripping provider prefixes).

## Environment Variables

| Variable | Provider | Description |
|----------|----------|-------------|
| `NEHANDA_API_KEY` | Nehanda | API key for Nehanda Cloud |
| `NEHANDA_BASE_URL` | Nehanda | Override base URL |
| `OPENAI_API_KEY` | LM Studio, Ollama, generic | API key |
| `OPENAI_BASE_URL` | LM Studio, Ollama, generic | Override base URL |
| `OLLAMA_BASE_URL` | Ollama | Override Ollama base URL |
| `ANTHROPIC_API_KEY` | Claude | API key |
| `ANTHROPIC_AUTH_TOKEN` | Claude | OAuth bearer token |