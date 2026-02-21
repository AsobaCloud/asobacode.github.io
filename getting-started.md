---
title: "Getting Started"
layout: default
nav_exclude: true
---

# Getting Started

Quick start guide to get up and running with Zorora in minutes.

## Prerequisites

### System Requirements

- **Python 3.8+**
- **macOS (Apple Silicon)** - Optimized for M1/M2/M3 Macs
- **LM Studio** running on `http://localhost:1234`
  - Download: [lmstudio.ai](https://lmstudio.ai)
  - Load a 4B model (e.g., Qwen3-VL-4B, Qwen3-4B)
- **RAM**: Minimum 4GB (runs efficiently on MacBook Air M3)
- **Storage**: Local storage for research data (`~/.zorora/`)

### Optional Prerequisites

- **HuggingFace token** (optional) - For remote Codestral endpoint
- **Brave Search API key** (optional) - For enhanced web search
  - Get free API key at: https://brave.com/search/api/
  - Free tier: 2000 queries/month (~66/day)
- **Flask** (for Web UI) - Installed automatically with package

## Installation

### Step 1: Download Latest Release

**Recommended: Download from GitHub Release**

[Download v3.0.0-prod](https://github.com/AsobaCloud/zorora/releases/tag/v3.0.0-prod)

### Step 2: Install Zorora

**From GitHub Release (recommended):**
```bash
# Download and extract the release package
# Then install:
pip install -e .
```

**From GitHub (development):**
```bash
pip install git+https://github.com/AsobaCloud/zorora.git
```

**From source:**
```bash
git clone https://github.com/AsobaCloud/zorora.git
cd zorora
pip install -e .
```

### Step 3: Verify Installation

```bash
# Check if zorora command is available
zorora --help

# Or check version
python -c "import zorora; print(zorora.__version__)"
```

## Configuration

### Basic Configuration

Zorora works out of the box with LM Studio running locally. No configuration required for basic usage.

### Advanced Configuration

**Web UI Settings Modal (Recommended):**

1. Start the Web UI: `python web_main.py` (or `zorora web`)
2. Click the ⚙️ gear icon in the top-right corner
3. Configure LLM models and endpoints:
   - **Model Selection**: Choose models for each tool (orchestrator, codestral, reasoning, search, intent_detector, vision, image_generation)
   - **Endpoint Selection**: Select from Local (LM Studio), HuggingFace, OpenAI, or Anthropic
   - **API Keys**: Configure API keys for HuggingFace, OpenAI, and Anthropic
   - **Add/Edit Endpoints**: Click "Add New Endpoint" to configure custom endpoints
4. Click "Save" - changes take effect after server restart

**Terminal Configuration:**

Use the interactive `/models` command:
```bash
zorora
[1] ⚙ > /models
```

**Manual Configuration:**

1. Copy `config.example.py` to `config.py`
2. Edit `config.py` with your settings:
   - LM Studio model name
   - HuggingFace token (optional)
   - OpenAI API key (optional)
   - Anthropic API key (optional)
   - Brave Search API key (optional)
   - Specialist model configurations
   - Endpoint mappings

### Web Search Setup

**Brave Search API** (recommended):
- Get free API key at: https://brave.com/search/api/
- Free tier: 2000 queries/month (~66/day)
- Configure in `config.py`:
  ```python
  BRAVE_SEARCH = {
      "api_key": "YOUR_API_KEY",
      "enabled": True,
  }
  ```

**DuckDuckGo Fallback:**
- Automatically used if Brave Search unavailable
- No API key required

## First Research Query

### Terminal Interface

**Start the REPL:**
```bash
zorora
```

![Zorora Terminal REPL]({{ site.baseurl }}/assets/images/screenshot.png)
*Terminal REPL interface*

**Run your first research query:**
```bash
[1] ⚙ > What are the latest developments in large language model architectures?
```

The system automatically detects research intent and executes the deep research workflow.

**What happens automatically:**
- ✅ Aggregates sources from academic databases (7 sources), web (Brave + DDG), and newsroom (parallel)
- ✅ Scores credibility of each source (multi-factor: domain, citations, cross-references)
- ✅ Cross-references claims across sources
- ✅ Synthesizes findings with citations and confidence levels
- ✅ Saves results to local storage (`~/.zorora/zorora.db` + JSON files)

### Web Interface

**Start the Web UI:**
```bash
python web_main.py
# Or if installed via pip:
zorora web
```

**Access the interface:**
1. Open `http://localhost:5000` in your browser

![Zorora Web UI]({{ site.baseurl }}/assets/images/ui.png)
*Web UI interface*

2. Enter research question in the search box
3. Select depth level:
   - **Quick** - Initial sources only (depth=1, ~25-35s)
   - **Balanced** - + Citation following (depth=2, ~35-50s) - *Coming soon*
   - **Thorough** - + Multi-hop citations (depth=3, ~50-70s) - *Coming soon*
4. Click "Start Research"
5. View synthesis, sources, and credibility scores

### API (Programmatic Access)

```python
from engine.research_engine import ResearchEngine

engine = ResearchEngine()
state = engine.deep_research("Your research question", depth=1)
print(state.synthesis)
```

## Verify Results

### Check Research Storage

Research is automatically saved to local storage. Verify it exists:

```bash
# Check SQLite database
ls -la ~/.zorora/zorora.db

# Check JSON files
ls -la ~/.zorora/research/findings/
```

### Test Different Workflows

**Code Generation:**
```bash
[2] ⚙ > Write a Python function to validate email addresses
```

**Development Workflow:**
```bash
[3] ⚙ > /develop Add user authentication to my Flask app
```

**Image Generation:**
```bash
[4] ⚙ > /image a futuristic solar farm at sunset
```

**Image Analysis:**
```bash
[5] ⚙ > /vision screenshot.png
```

## Troubleshooting

### LM Studio Not Connected

**Problem:** Error connecting to LM Studio

**Solution:**
1. Start LM Studio
2. Load a model on port 1234
3. Verify connection: `curl http://localhost:1234/v1/models`

### Research Workflow Not Triggered

**Problem:** Query doesn't trigger deep research

**Solution:** Include research keywords: "What", "Why", "How", "Tell me", or use `/search` command

### Can't Save Research

**Problem:** Research not saving to disk

**Solution:** Check `~/.zorora/research/` directory exists and is writable:
```bash
mkdir -p ~/.zorora/research/findings
chmod 755 ~/.zorora/research
```

### Endpoint Errors (HF/OpenAI/Anthropic)

**Problem:** API endpoint errors

**Solution:**
- Check endpoint URL (for HF endpoints)
- Verify API keys are configured (use Web UI settings modal)
- Ensure endpoints are enabled in config
- Check API rate limits (OpenAI/Anthropic)
- Verify model names match provider requirements

### Web UI Not Starting

**Problem:** Web UI fails to start

**Solution:**
- Ensure Flask is installed: `pip install flask`
- Run: `python web_main.py` (or `zorora web` if installed via pip)
- Check port 5000 is available

### Deep Research Not Working

**Problem:** Deep research workflow fails

**Solution:**
- Check that research tools are accessible: `from tools.research.academic_search import academic_search`
- Verify storage directory exists: `~/.zorora/` (created automatically)
- Check logs for API errors (Brave Search, Newsroom API)

## Next Steps

- **[Guides](/guides/overview)** - Comprehensive guides for all features
- **[Terminal REPL](/guides/terminal-repl)** - Learn the command-line interface
- **[Web UI](/guides/web-ui)** - Master the browser-based interface
- **[Research Workflow](/guides/research-workflow)** - Deep dive into research capabilities
- **[Slash Commands](/guides/slash-commands)** - Complete command reference
- **[API Reference](/api-reference/overview)** - Programmatic access documentation

## See Also

- [Introduction](/introduction) - Overview of Zorora architecture and features
- [FAQ](/faq) - Frequently asked questions
- [Technical Concepts](/technical-concepts/overview) - Deep dive into how Zorora works
- [Use Cases](/use-cases/overview) - Real-world examples
