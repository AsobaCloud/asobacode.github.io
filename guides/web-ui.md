---
title: "Web UI"
layout: default
nav_order: 5
parent: Guides
---

# Web UI Guide

Browser-based research interface for non-engineers.

## Overview

The Web UI provides a user-friendly browser-based interface for Zorora, designed for users who prefer a graphical interface over the command line. It offers the same deep research capabilities as the Terminal REPL with an intuitive visual interface.

<div class="screenshot-container">
  <img src="{{ site.baseurl }}/assets/images/ui.png" alt="Zorora Web UI" class="screenshot">
</div>
<p class="screenshot-caption">Zorora Web UI - Browser-based research interface</p>

## Starting the Web UI

### Method 1: Using zorora Command

```bash
zorora web
```

### Method 2: Using Python Directly

```bash
python web_main.py
```

### Access the Interface

Open your browser and navigate to:

```
http://localhost:5000
```

## Features

### Research Query Interface

**Enter Research Question:**
1. Type your research question in the search box
2. Select depth level:
   - **Quick** - Initial sources only (depth=1, ~25-35s)
   - **Balanced** - + Citation following (depth=2, ~35-50s) - *Coming soon*
   - **Thorough** - + Multi-hop citations (depth=3, ~50-70s) - *Coming soon*
3. Click "Start Research"

**View Results:**
- Synthesis with citations
- Source list with credibility scores
- Source URLs for verification
- Research metadata (timestamp, depth, source count)

### Settings Modal

**Access Settings:**
- Click the ⚙️ gear icon in the top-right corner

**Configure Models:**
- Select models for each tool:
  - orchestrator
  - codestral
  - reasoning
  - search
  - intent_detector
  - vision
  - image_generation

**Configure Endpoints:**
- Select from:
  - Local (LM Studio)
  - HuggingFace Endpoints
  - OpenAI Endpoints
  - Anthropic Endpoints

**Manage API Keys:**
- Configure API keys for all providers
- Keys are masked for security
- Use show/hide toggle to view keys

**Add/Edit Endpoints:**
- Click "Add New Endpoint"
- Select provider
- Fill in endpoint details
- Click "Save"

**Save Configuration:**
- Click "Save" button
- Changes take effect after server restart
- Config file backup created automatically

## Research Results Display

### Synthesis Section

- Comprehensive answer with citations
- Inline citations ([Newsroom], [Web], [Academic])
- Confidence levels
- Key findings highlighted

### Sources Section

- List of all sources used
- Credibility scores for each source
- Source type (academic, web, newsroom)
- Direct links to source URLs
- Credibility categories (high, medium, low)

### Research Metadata

- Research ID
- Query text
- Depth level used
- Total sources found
- Completion timestamp

## Settings Configuration

### Model Selection

**Orchestrator:**
- Main routing and orchestration model
- Recommended: Local 4B model (fast, efficient)

**Codestral:**
- Code generation specialist
- Recommended: HF 32B model (high quality)

**Reasoning:**
- Research synthesis model
- Recommended: Local or remote based on quality needs

**Other Models:**
- Search, intent_detector, vision, image_generation
- Configure based on your needs

### Endpoint Management

**Local (LM Studio):**
- Fast, no API costs
- Requires LM Studio running
- Privacy-preserving

**HuggingFace:**
- Remote inference endpoints
- Requires HF token
- Supports custom models

**OpenAI:**
- OpenAI API endpoints
- Requires OpenAI API key
- High quality models

**Anthropic:**
- Anthropic API endpoints
- Requires Anthropic API key
- Claude models

### API Key Management

**Security Features:**
- Keys are masked by default
- Show/hide toggle for viewing
- Secure storage in config file
- Automatic backup before writes

## Best Practices

### Research Queries

- Be specific and clear
- Include context when needed
- Use depth levels appropriately:
  - Quick for fast answers
  - Balanced for thorough research
  - Thorough for comprehensive analysis

### Configuration

- Start with local models (fast, free)
- Add remote models for quality when needed
- Use hybrid approach (local orchestrator + remote specialists)
- Test configuration before production use

### Settings Management

- Backup config before major changes
- Test endpoints before saving
- Verify API keys are correct
- Check model availability

## Troubleshooting

### Web UI Not Starting

**Problem:** Server fails to start

**Solution:**
- Check Flask is installed: `pip install flask`
- Verify port 5000 is available: `lsof -i :5000`
- Check for errors in terminal output

### Settings Not Saving

**Problem:** Configuration changes not persisting

**Solution:**
- Check file permissions on config.py
- Verify config file location
- Check for syntax errors
- Restart server after saving

### Research Not Working

**Problem:** Research queries fail

**Solution:**
- Check model endpoints are configured
- Verify API keys are correct
- Check network connectivity
- Review browser console for errors

### Endpoint Errors

**Problem:** Endpoint connection fails

**Solution:**
- Verify endpoint URL (for HF endpoints)
- Check API keys are configured
- Ensure endpoints are enabled
- Check API rate limits

## See Also

- [Terminal REPL](/guides/terminal-repl) - Command-line interface
- [Configuration](/guides/configuration) - Configuration guide
- [Research Workflow](/guides/research-workflow) - Deep research capabilities
- [API Reference](/api-reference/overview) - Programmatic access
