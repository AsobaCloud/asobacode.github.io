---
title: "Settings API"
layout: default
nav_order: 3
parent: "Reference"
---

# Settings API Reference

Complete API documentation for Zorora's settings and configuration endpoints.

## Base URL

```
http://localhost:5000
```

## Authentication

**Current:** No authentication required (local deployment)

**Future:** API key authentication for remote deployments

---

## Get Configuration

Get current configuration.

### Endpoint

```
GET /api/settings/config
```

### Example Request

```bash
curl http://localhost:5000/api/settings/config
```

### Example Response (200)

```json
{
  "api_url": "http://localhost:1234/v1/chat/completions",
  "model": "qwen/qwen3-vl-4b",
  "model_endpoints": {
    "orchestrator": "local",
    "codestral": "local",
    "reasoning": "local"
  },
  "specialized_models": {},
  "hf_endpoints": {},
  "hf_token": "abcd...xyz",
  "openai_api_key": "sk-...",
  "anthropic_api_key": "sk-ant-..."
}
```

**Note:** API tokens are masked in responses (first 4 and last 4 characters shown).

### Error Responses

**500 Internal Server Error** - Server error

```json
{
  "error": "Error getting config: <error message>"
}
```

---

## Save Configuration

Save configuration changes.

**Note:** Server is NOT automatically restarted. Changes take effect only after manual restart.

### Endpoint

```
POST /api/settings/config
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `model_endpoints` | object | No | Model endpoint mappings |
| `specialized_models` | object | No | Specialized model configurations |
| `hf_token` | string | No | HuggingFace token (must NOT be masked) |
| `openai_api_key` | string | No | OpenAI API key (must NOT be masked) |
| `anthropic_api_key` | string | No | Anthropic API key (must NOT be masked) |

### Example Request

```bash
curl -X POST http://localhost:5000/api/settings/config \
  -H "Content-Type: application/json" \
  -d '{
    "model_endpoints": {
      "orchestrator": "local",
      "codestral": "codestral-hf"
    },
    "hf_token": "your-actual-token-here"
  }'
```

### Example Response (200)

```json
{
  "success": true,
  "message": "Configuration saved successfully. Please restart the server for changes to take effect."
}
```

### Error Responses

**400 Bad Request** - Invalid configuration

```json
{
  "success": false,
  "error": "Invalid hf_token format (masked token detected - token unchanged)"
}
```

**500 Internal Server Error** - Server error

```json
{
  "success": false,
  "error": "Error saving config: <error message>"
}
```

---

## List Available Models

Get available models from LM Studio and HF endpoints.

**Note:** This fetches models live on every request - no caching.

### Endpoint

```
GET /api/settings/models
```

### Example Request

```bash
curl http://localhost:5000/api/settings/models
```

### Example Response (200)

```json
{
  "models": [
    {
      "name": "qwen/qwen3-vl-4b",
      "origin": "local",
      "type": "chat",
      "endpoint": "local"
    },
    {
      "name": "Qwen2.5-Coder-32B-Instruct",
      "origin": "hf",
      "type": "chat",
      "endpoint": "codestral-hf"
    }
  ]
}
```

### Error Responses

**500 Internal Server Error** - Server error

```json
{
  "error": "Error fetching models: <error message>"
}
```

---

## List Endpoints

Get saved endpoints (HF, OpenAI, Anthropic).

### Endpoint

```
GET /api/settings/endpoints
```

### Example Request

```bash
curl http://localhost:5000/api/settings/endpoints
```

### Example Response (200)

```json
{
  "endpoints": [
    {
      "key": "codestral-hf",
      "provider": "hf",
      "url": "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct",
      "model": "Qwen/Qwen2.5-Coder-32B-Instruct",
      "model_name": "Qwen/Qwen2.5-Coder-32B-Instruct",
      "timeout": 120,
      "enabled": true,
      "api_key": "abcd...xyz"
    },
    {
      "key": "gpt-4",
      "provider": "openai",
      "url": "https://api.openai.com/v1/chat/completions",
      "model": "gpt-4",
      "timeout": 60,
      "enabled": true,
      "max_tokens": 4096,
      "api_key": "sk-...xyz"
    },
    {
      "key": "claude-opus",
      "provider": "anthropic",
      "url": "https://api.anthropic.com/v1/messages",
      "model": "claude-3-opus-20240229",
      "timeout": 60,
      "enabled": true,
      "max_tokens": 4096,
      "api_key": "sk-ant-...xyz"
    }
  ]
}
```

**Note:** API keys are masked in responses.

### Error Responses

**500 Internal Server Error** - Server error

```json
{
  "error": "Error getting endpoints: <error message>"
}
```

---

## Add/Edit Endpoint

Add or update an endpoint (HF, OpenAI, or Anthropic).

### Endpoint

```
POST /api/settings/endpoint
```

### Request Body

**HuggingFace Endpoint:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Endpoint key (must be valid Python identifier) |
| `provider` | string | Yes | Must be "hf" |
| `url` | string | Yes | HF endpoint URL (must start with http:// or https://) |
| `model` or `model_name` | string | Yes | Model name |
| `timeout` | integer | No | Timeout in seconds (default: 120) |
| `enabled` | boolean | No | Whether endpoint is enabled (default: true) |
| `api_key` | string | No | HF API key (must NOT be masked) |

**OpenAI Endpoint:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Endpoint key (must be valid Python identifier) |
| `provider` | string | Yes | Must be "openai" |
| `model` | string | Yes | OpenAI model name (e.g., "gpt-4", "gpt-4-turbo") |
| `timeout` | integer | No | Timeout in seconds (default: 60) |
| `enabled` | boolean | No | Whether endpoint is enabled (default: true) |
| `max_tokens` | integer | No | Maximum tokens (default: 4096) |
| `api_key` | string | No | OpenAI API key (must NOT be masked) |

**Anthropic Endpoint:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Endpoint key (must be valid Python identifier) |
| `provider` | string | Yes | Must be "anthropic" |
| `model` | string | Yes | Anthropic model name (e.g., "claude-3-opus-20240229") |
| `timeout` | integer | No | Timeout in seconds (default: 60) |
| `enabled` | boolean | No | Whether endpoint is enabled (default: true) |
| `max_tokens` | integer | No | Maximum tokens (default: 4096) |
| `api_key` | string | No | Anthropic API key (must NOT be masked) |

### Example Request (HuggingFace)

```bash
curl -X POST http://localhost:5000/api/settings/endpoint \
  -H "Content-Type: application/json" \
  -d '{
    "key": "codestral-hf",
    "provider": "hf",
    "url": "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct",
    "model_name": "Qwen/Qwen2.5-Coder-32B-Instruct",
    "timeout": 120,
    "enabled": true,
    "api_key": "your-actual-hf-token"
  }'
```

### Example Request (OpenAI)

```bash
curl -X POST http://localhost:5000/api/settings/endpoint \
  -H "Content-Type: application/json" \
  -d '{
    "key": "gpt-4",
    "provider": "openai",
    "model": "gpt-4",
    "timeout": 60,
    "enabled": true,
    "max_tokens": 4096,
    "api_key": "sk-your-actual-openai-key"
  }'
```

### Example Request (Anthropic)

```bash
curl -X POST http://localhost:5000/api/settings/endpoint \
  -H "Content-Type: application/json" \
  -d '{
    "key": "claude-opus",
    "provider": "anthropic",
    "model": "claude-3-opus-20240229",
    "timeout": 60,
    "enabled": true,
    "max_tokens": 4096,
    "api_key": "sk-ant-your-actual-anthropic-key"
  }'
```

### Example Response (200)

```json
{
  "success": true
}
```

### Error Responses

**400 Bad Request** - Invalid endpoint configuration

```json
{
  "success": false,
  "error": "Missing 'key' field"
}
```

```json
{
  "success": false,
  "error": "Invalid endpoint key (must be valid Python identifier)"
}
```

```json
{
  "success": false,
  "error": "HF endpoint requires 'url' and 'model_name'"
}
```

```json
{
  "success": false,
  "error": "Invalid API key format (masked token detected)"
}
```

```json
{
  "success": false,
  "error": "Invalid provider: <provider>. Must be 'hf', 'openai', or 'anthropic'"
}
```

**500 Internal Server Error** - Server error

```json
{
  "success": false,
  "error": "Error saving endpoint: <error message>"
}
```

---

## Delete Endpoint

Delete an endpoint (HF, OpenAI, or Anthropic).

**Note:** If the endpoint is in use by any role, those roles are automatically reassigned to "local" endpoint without user confirmation.

### Endpoint

```
DELETE /api/settings/endpoint/<endpoint_key>
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `endpoint_key` | string | Yes | Endpoint key to delete |

### Example Request

```bash
curl -X DELETE http://localhost:5000/api/settings/endpoint/codestral-hf
```

### Example Response (200)

```json
{
  "success": true
}
```

### Error Responses

**404 Not Found** - Endpoint not found

```json
{
  "success": false,
  "error": "Endpoint not found"
}
```

**500 Internal Server Error** - Server error

```json
{
  "success": false,
  "error": "Error deleting endpoint: <error message>"
}
```

---

## Response Fields

### Endpoint Object (HF)

| Field | Type | Description |
|-------|------|-------------|
| `key` | string | Endpoint key |
| `provider` | string | Provider ("hf") |
| `url` | string | HF endpoint URL |
| `model` | string | Model name |
| `model_name` | string | Model name (alias for model) |
| `timeout` | integer | Timeout in seconds |
| `enabled` | boolean | Whether endpoint is enabled |
| `api_key` | string | HF API key (masked in responses) |

### Endpoint Object (OpenAI)

| Field | Type | Description |
|-------|------|-------------|
| `key` | string | Endpoint key |
| `provider` | string | Provider ("openai") |
| `url` | string | Fixed URL: "https://api.openai.com/v1/chat/completions" |
| `model` | string | OpenAI model name |
| `timeout` | integer | Timeout in seconds |
| `enabled` | boolean | Whether endpoint is enabled |
| `max_tokens` | integer | Maximum tokens |
| `api_key` | string | OpenAI API key (masked in responses) |

### Endpoint Object (Anthropic)

| Field | Type | Description |
|-------|------|-------------|
| `key` | string | Endpoint key |
| `provider` | string | Provider ("anthropic") |
| `url` | string | Fixed URL: "https://api.anthropic.com/v1/messages" |
| `model` | string | Anthropic model name |
| `timeout` | integer | Timeout in seconds |
| `enabled` | boolean | Whether endpoint is enabled |
| `max_tokens` | integer | Maximum tokens |
| `api_key` | string | Anthropic API key (masked in responses) |

---

## See Also

- [Research API](/api-reference/research-api) - Research endpoints
- [Python SDK](/api-reference/python-sdk) - Python SDK documentation
- [Configuration Guide](/guides/configuration) - Configuration guide
