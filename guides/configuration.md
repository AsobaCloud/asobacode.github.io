---
title: "Configuration"
layout: default
nav_order: 3
parent: "Build"
---

# Configuration Guide

Configure Zorora models, endpoints, and API keys.

## Configuration Methods

Zorora supports three configuration methods:

1. **Web UI Settings Modal** (Recommended) - Visual configuration interface
2. **Terminal Interactive** - Use `/models` command
3. **Manual Configuration** - Edit `config.py` directly

## Web UI Settings Modal (Recommended)

The easiest way to configure Zorora is through the Web UI settings modal:

### Step 1: Start Web UI

```bash
python web_main.py
# Or if installed via pip:
zorora web
```

### Step 2: Open Settings Modal

1. Open `http://localhost:5000` in your browser
2. Click the ⚙️ gear icon in the top-right corner
3. Settings modal opens

### Step 3: Configure Models

**Model Selection:**
- Choose models for each tool:
  - **orchestrator** - Main routing and orchestration model
  - **codestral** - Code generation specialist
  - **reasoning** - Research synthesis model
  - **search** - Search query optimization
  - **intent_detector** - Intent detection
  - **vision** - Image analysis
  - **image_generation** - Text-to-image generation

**Endpoint Selection:**
- Select from:
  - **Local (LM Studio)** - Models running locally
  - **HuggingFace Endpoints** - Remote HF inference endpoints
  - **OpenAI Endpoints** - OpenAI API (gpt-4, gpt-4-turbo, gpt-3.5-turbo)
  - **Anthropic Endpoints** - Anthropic API (claude-opus, claude-sonnet, claude-haiku)

### Step 4: Configure API Keys

**API Key Management:**
- Configure API keys for:
  - **HuggingFace** (for HF endpoints)
  - **OpenAI** (for OpenAI endpoints)
  - **Anthropic** (for Anthropic endpoints)
- Keys are masked for security
- Use show/hide toggle to view keys

### Step 5: Add/Edit Endpoints

**Add New Endpoint:**
1. Click "Add New Endpoint"
2. Select provider (HuggingFace, OpenAI, Anthropic)
3. Fill in endpoint details:
   - **HuggingFace**: URL + Model name
   - **OpenAI**: Model name + Max tokens
   - **Anthropic**: Model name + Max tokens
4. Click "Save"

**Edit Endpoint:**
1. Click edit icon next to endpoint
2. Modify settings
3. Click "Save"

**Delete Endpoint:**
1. Click delete icon next to endpoint
2. Confirm deletion
3. System automatically reassigns roles if needed

### Step 6: Save Configuration

1. Click "Save" button
2. Changes take effect after server restart
3. Config file backup created automatically before write

## Terminal Configuration

### Interactive Model Selector

Use the `/models` command in the REPL:

```bash
zorora
[1] ⚙ > /models
```

Follow the interactive prompts to configure models and endpoints.

### Show Current Configuration

```bash
[2] ⚙ > /config
```

Displays current routing configuration and model assignments.

## Manual Configuration

### Step 1: Copy Example Config

```bash
cd zorora
cp config.example.py config.py
```

### Step 2: Edit config.py

**LM Studio Configuration:**
```python
# Local LM Studio endpoint (default)
MODEL_ENDPOINTS = {
    "orchestrator": "local",
    "codestral": "local",
    "reasoning": "local",
}
```

**HuggingFace Configuration:**
```python
# HuggingFace token
HF_TOKEN = "your-huggingface-token"

# HuggingFace endpoints
HF_ENDPOINTS = {
    "codestral-hf": {
        "url": "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct",
        "model_name": "Qwen/Qwen2.5-Coder-32B-Instruct",
        "timeout": 120,
    }
}

MODEL_ENDPOINTS = {
    "codestral": "codestral-hf",
}
```

**OpenAI Configuration:**
```python
# OpenAI API key
OPENAI_API_KEY = "your-openai-api-key"

# OpenAI endpoints
OPENAI_ENDPOINTS = {
    "gpt-4": {
        "model": "gpt-4",
        "max_tokens": 4096,
        "timeout": 60,
    }
}

MODEL_ENDPOINTS = {
    "orchestrator": "gpt-4",
}
```

**Anthropic Configuration:**
```python
# Anthropic API key
ANTHROPIC_API_KEY = "your-anthropic-api-key"

# Anthropic endpoints
ANTHROPIC_ENDPOINTS = {
    "claude-opus": {
        "model": "claude-3-opus-20240229",
        "max_tokens": 4096,
        "timeout": 60,
    }
}

MODEL_ENDPOINTS = {
    "reasoning": "claude-opus",
}
```

**Brave Search Configuration:**
```python
BRAVE_SEARCH = {
    "api_key": "your-brave-api-key",
    "enabled": True,
}
```

### Step 3: Environment Variables (Alternative)

Instead of editing `config.py`, you can use environment variables:

```bash
export HF_TOKEN="your-huggingface-token"
export OPENAI_API_KEY="your-openai-api-key"
export ANTHROPIC_API_KEY="your-anthropic-api-key"
export BRAVE_SEARCH_API_KEY="your-brave-api-key"
```

## Configuration Options

### Model Endpoints

**Local (LM Studio):**
- Default endpoint for all models
- Requires LM Studio running on `http://localhost:1234`
- Fast, local, no API costs

**HuggingFace:**
- Remote inference endpoints
- Requires HF token
- Supports custom model URLs

**OpenAI:**
- OpenAI API endpoints
- Requires OpenAI API key
- Models: gpt-4, gpt-4-turbo, gpt-3.5-turbo

**Anthropic:**
- Anthropic API endpoints
- Requires Anthropic API key
- Models: claude-opus, claude-sonnet, claude-haiku

### API Keys

**HuggingFace Token:**
- Get at: https://huggingface.co/settings/tokens
- Required for HF endpoints

**OpenAI API Key:**
- Get at: https://platform.openai.com/api-keys
- Required for OpenAI endpoints

**Anthropic API Key:**
- Get at: https://console.anthropic.com/
- Required for Anthropic endpoints

**Brave Search API Key:**
- Get at: https://brave.com/search/api/
- Free tier: 2000 queries/month
- Optional (DuckDuckGo fallback available)

## Best Practices

### Model Selection

- **Orchestrator**: Use local 4B model for routing (fast, efficient)
- **Codestral**: Use HF 32B model for code generation (high quality)
- **Reasoning**: Use local or remote model based on quality needs
- **Vision/Image**: Use specialized models for image tasks

### Endpoint Management

- **Local models**: Fast, no API costs, privacy-preserving
- **Remote models**: Higher quality, API costs, requires internet
- **Hybrid approach**: Mix local orchestrator with remote specialists

### Security

- **API Keys**: Store in `config.py` (not in version control)
- **Environment Variables**: Use for sensitive keys
- **Web UI**: Keys are masked in settings modal
- **Config Backup**: Automatic backup before writes

## Troubleshooting

### Configuration Not Saving

**Problem:** Changes not persisting

**Solution:**
- Check file permissions: `chmod 644 config.py`
- Verify config file location: `pwd` in zorora directory
- Check for syntax errors in `config.py`

### Endpoint Not Working

**Problem:** Endpoint connection fails

**Solution:**
- Verify API key is correct
- Check endpoint URL (for HF endpoints)
- Test endpoint connectivity: `curl <endpoint-url>`
- Check API rate limits

### Model Not Found

**Problem:** Model not available

**Solution:**
- Verify model name matches provider requirements
- Check model is loaded (for local models)
- Verify API key has access to model

## Next Steps

After configuration:

1. **[Terminal REPL](/guides/terminal-repl)** - Learn the command-line interface
2. **[Web UI](/guides/web-ui)** - Use the browser-based interface
3. **[Research Workflow](/guides/research-workflow)** - Run your first research query

## See Also

- [Installation Guide](/guides/installation) - Installation instructions
- [Terminal REPL](/guides/terminal-repl) - Command-line interface
- [Web UI](/guides/web-ui) - Browser-based interface
- [FAQ](/faq) - Frequently asked questions
