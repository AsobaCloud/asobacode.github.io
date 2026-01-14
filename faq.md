---
title: "FAQ"
layout: default
nav_order: 8
---

# Frequently Asked Questions

Common questions and troubleshooting for Zorora.

## Installation & Setup

### Q: How do I install Zorora?

**A:** Download from [GitHub Release v2.5-prod](https://github.com/AsobaCloud/zorora/releases/tag/v2.5-prod) or install from GitHub:

```bash
pip install git+https://github.com/AsobaCloud/zorora.git
```

See [Installation Guide](/guides/installation) for detailed instructions.

### Q: What are the system requirements?

**A:** 
- Python 3.8+
- macOS (Apple Silicon) - Optimized for M1/M2/M3 Macs
- LM Studio running on `http://localhost:1234`
- Minimum 4GB RAM (runs efficiently on MacBook Air M3)

### Q: Do I need an API key?

**A:** No API key required for basic usage. Optional API keys:
- **HuggingFace token** - For remote Codestral endpoint
- **Brave Search API key** - For enhanced web search (free tier: 2000 queries/month)
- **OpenAI API key** - For OpenAI endpoints
- **Anthropic API key** - For Anthropic endpoints

## Usage

### Q: How do I start using Zorora?

**A:** 

**Terminal:**
```bash
zorora
```

**Web UI:**
```bash
zorora web
# Opens at http://localhost:5000
```

### Q: How do I run a research query?

**A:** Simply ask a question:

```bash
[1] ⚙ > What are the latest developments in large language model architectures?
```

The system automatically detects research intent and executes the deep research workflow.

### Q: What's the difference between Quick, Balanced, and Thorough depth levels?

**A:**
- **Quick (depth=1):** Initial sources only, skips citation following (~25-35s)
- **Balanced (depth=2):** Adds citation following, 1-hop exploration (~35-50s) - *Coming soon*
- **Thorough (depth=3):** Multi-hop citation exploration, up to 3 levels deep (~50-70s) - *Coming soon*

## Troubleshooting

### Q: LM Studio connection failed. What should I do?

**A:**
1. Start LM Studio
2. Load a 4B model (e.g., Qwen3-VL-4B, Qwen3-4B)
3. Ensure the model is running on port 1234
4. Verify connection: `curl http://localhost:1234/v1/models`

### Q: Research workflow not triggering. Why?

**A:** Include research keywords: "What", "Why", "How", "Tell me", or use `/search` command to force research workflow.

### Q: Can't save research. What's wrong?

**A:** Check `~/.zorora/research/` directory exists and is writable:

```bash
mkdir -p ~/.zorora/research/findings
chmod 755 ~/.zorora/research
```

### Q: Endpoint errors (HF/OpenAI/Anthropic). How do I fix them?

**A:**
- Check endpoint URL (for HF endpoints)
- Verify API keys are configured (use Web UI settings modal)
- Ensure endpoints are enabled in config
- Check API rate limits (OpenAI/Anthropic)
- Verify model names match provider requirements

### Q: Web UI not starting. What's the issue?

**A:**
- Ensure Flask is installed: `pip install flask`
- Run: `python web_main.py` (or `zorora web` if installed via pip)
- Check port 5000 is available: `lsof -i :5000`

### Q: Deep research not working. How do I debug?

**A:**
- Check that research tools are accessible: `from tools.research.academic_search import academic_search`
- Verify storage directory exists: `~/.zorora/` (created automatically)
- Check logs for API errors (Brave Search, Newsroom API)

## Configuration

### Q: How do I configure models and endpoints?

**A:** Use the Web UI settings modal (recommended):

1. Start Web UI: `zorora web`
2. Click ⚙️ gear icon
3. Configure models, endpoints, and API keys
4. Click "Save"

Or use terminal: `/models` command for interactive configuration.

### Q: How do I add a HuggingFace endpoint?

**A:** 

**Web UI:**
1. Open settings modal
2. Click "Add New Endpoint"
3. Select "HuggingFace"
4. Enter URL and model name
5. Click "Save"

**Manual:**
Edit `config.py`:
```python
HF_ENDPOINTS = {
    "codestral-hf": {
        "url": "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct",
        "model_name": "Qwen/Qwen2.5-Coder-32B-Instruct",
        "timeout": 120,
    }
}
```

### Q: How do I configure OpenAI or Anthropic endpoints?

**A:** Similar to HuggingFace, but requires model name and API key:

**OpenAI:**
```python
OPENAI_ENDPOINTS = {
    "gpt-4": {
        "model": "gpt-4",
        "max_tokens": 4096,
        "timeout": 60,
    }
}
OPENAI_API_KEY = "your-api-key"
```

**Anthropic:**
```python
ANTHROPIC_ENDPOINTS = {
    "claude-opus": {
        "model": "claude-3-opus-20240229",
        "max_tokens": 4096,
        "timeout": 60,
    }
}
ANTHROPIC_API_KEY = "your-api-key"
```

## Features

### Q: What slash commands are available?

**A:** See [Slash Commands Reference](/guides/slash-commands) for complete list:

- `/search` - Force deep research workflow
- `/ask` - Force conversational mode
- `/code` - Force code generation
- `/develop` - Multi-step development workflow
- `/image` - Generate image with FLUX
- `/vision` - Analyze image with vision model
- `/models` - Interactive model selector
- `/config` - Show routing configuration
- `/history` - Browse saved sessions
- `/help` - Show available commands

### Q: How does the research workflow work?

**A:** Zorora executes a 6-phase pipeline:

1. Parallel Source Aggregation (academic + web + newsroom)
2. Citation Following (if depth > 1)
3. Cross-Referencing (groups claims by similarity)
4. Credibility Scoring (rules-based)
5. Citation Graph Building
6. Synthesis (reasoning model)

See [Research Pipeline](/technical-concepts/research-pipeline) for details.

### Q: How is credibility scored?

**A:** Rules-based scoring considers:

- Domain reputation (Nature=0.85, arXiv=0.50, etc.)
- Citation count
- Cross-reference agreement
- Publisher type (academic journals vs predatory publishers)
- Retraction status

See [Research Pipeline](/technical-concepts/research-pipeline) for details.

## Storage & Privacy

### Q: Where is research data stored?

**A:** All data is stored locally:

- **SQLite database:** `~/.zorora/zorora.db`
- **JSON files:** `~/.zorora/research/findings/<id>.json`

### Q: Is my research data private?

**A:** Yes. All processing and storage happens on your machine. Research data never leaves your computer (except source fetching from academic databases, web search, and newsroom API).

### Q: Can I backup my research?

**A:** Yes. Research is stored locally and can be backed up:

```bash
# Backup SQLite database
cp ~/.zorora/zorora.db ~/.zorora/zorora.db.backup

# Backup JSON files
cp -r ~/.zorora/research ~/.zorora/research.backup
```

## Performance

### Q: How fast is research?

**A:** Varies by depth:
- **Quick (depth=1):** ~25-35 seconds
- **Balanced (depth=2):** ~35-50 seconds - *Coming soon*
- **Thorough (depth=3):** ~50-70 seconds - *Coming soon*

### Q: How much RAM does Zorora use?

**A:** 4-6 GB with 4B orchestrator model. Runs efficiently on MacBook Air M3.

### Q: How fast is routing?

**A:** 0ms - Pattern matching is instant (no LLM call).

## See Also

- [Getting Started](/getting-started) - Installation and setup
- [Guides](/guides/overview) - Comprehensive guides
- [Troubleshooting](/getting-started#troubleshooting) - Troubleshooting guide
- [Technical Concepts](/technical-concepts/overview) - Architecture documentation
