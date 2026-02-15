---
title: "Installation"
layout: default
nav_order: 1
parent: Guides
---

# Installation Guide

Step-by-step guide to install Zorora on your system.

## Prerequisites

### System Requirements

- **Python 3.8+**
- **macOS (Apple Silicon)** - Optimized for M1/M2/M3 Macs
- **RAM**: Minimum 4GB (runs efficiently on MacBook Air M3)
- **Storage**: Local storage for research data (`~/.zorora/`)

### Required Software

- **LM Studio** running on `http://localhost:1234`
  - Download: [lmstudio.ai](https://lmstudio.ai)
  - Load a 4B model (e.g., Qwen3-VL-4B, Qwen3-4B)

### Optional Software

- **HuggingFace token** (optional) - For remote Codestral endpoint
- **Brave Search API key** (optional) - For enhanced web search
- **Flask** (for Web UI) - Installed automatically with package

## Installation Methods

### Method 1: Download from GitHub Release (Recommended)

**Step 1: Download Latest Release**

[Download v3.0.0-prod](https://github.com/AsobaCloud/zorora/releases/tag/v3.0.0-prod)

**Step 2: Extract and Install**

```bash
# Extract the release package
tar -xzf zorora-v3.0.0-prod.tar.gz
cd zorora-v3.0.0-prod

# Install
pip install -e .
```

### Method 2: Install from GitHub (Development)

```bash
pip install git+https://github.com/AsobaCloud/zorora.git
```

### Method 3: Install from Source

```bash
# Clone the repository
git clone https://github.com/AsobaCloud/zorora.git
cd zorora

# Install in development mode
pip install -e .
```

## Verify Installation

### Check Installation

```bash
# Check if zorora command is available
zorora --help

# Or check version
python -c "import zorora; print(zorora.__version__)"
```

### Test LM Studio Connection

```bash
# Test LM Studio connection
curl http://localhost:1234/v1/models

# Should return JSON with available models
```

### Run First Command

```bash
# Start the REPL
zorora

# You should see:
# Testing LM Studio connection...
# ✓ LM Studio is running
# [1] ⚙ >
```

## Post-Installation Setup

### 1. Configure LM Studio

1. Start LM Studio
2. Load a 4B model (e.g., Qwen3-VL-4B, Qwen3-4B)
3. Ensure the model is running on port 1234
4. Verify connection: `curl http://localhost:1234/v1/models`

### 2. Set Up Storage Directory

Zorora automatically creates the storage directory on first run:

```bash
# Storage location
~/.zorora/
├── zorora.db          # SQLite database
└── research/
    └── findings/      # JSON research files
```

### 3. Configure Optional Services

**Brave Search API (Optional):**

1. Get free API key at: https://brave.com/search/api/
2. Free tier: 2000 queries/month (~66/day)
3. Configure in `config.py` (see [Configuration Guide](/guides/configuration))

**HuggingFace Token (Optional):**

1. Get token at: https://huggingface.co/settings/tokens
2. Configure in `config.py` or environment variable:
   ```bash
   export HF_TOKEN="your-token-here"
   ```

## Troubleshooting

### Installation Fails

**Problem:** `pip install` fails with errors

**Solution:**
- Ensure Python 3.8+ is installed: `python3 --version`
- Upgrade pip: `pip install --upgrade pip`
- Install build dependencies: `pip install setuptools wheel`

### Command Not Found

**Problem:** `zorora` command not found after installation

**Solution:**
- Check if pip install path is in PATH: `echo $PATH`
- Use `python -m zorora` instead of `zorora`
- Reinstall: `pip install --force-reinstall git+https://github.com/AsobaCloud/zorora.git`

### LM Studio Connection Failed

**Problem:** Cannot connect to LM Studio

**Solution:**
1. Ensure LM Studio is running
2. Check port 1234 is not blocked: `lsof -i :1234`
3. Verify model is loaded in LM Studio
4. Test connection: `curl http://localhost:1234/v1/models`

### Import Errors

**Problem:** Import errors when running Zorora

**Solution:**
- Install missing dependencies: `pip install -r requirements.txt`
- Check Python version: `python3 --version` (must be 3.8+)
- Reinstall: `pip install --force-reinstall -e .`

## Next Steps

After installation, proceed to:

1. **[Configuration](/guides/configuration)** - Configure models, endpoints, and API keys
2. **[Terminal REPL](/guides/terminal-repl)** - Learn the command-line interface
3. **[Getting Started](/getting-started)** - Run your first research query

## See Also

- [Configuration Guide](/guides/configuration) - Configure Zorora
- [Getting Started](/getting-started) - Quick start guide
- [FAQ](/faq) - Frequently asked questions
