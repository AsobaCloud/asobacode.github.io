---
title: "Quickstart"
layout: default
nav_order: 1
parent: "Build"
---

# Quickstart

Get Zorora running and execute your first deep research query in three steps.

## Prerequisites

- **Python 3.8+**
- **LM Studio** running on `http://localhost:1234` with a loaded model (e.g., Qwen3-4B)

## Step 1: Install

Download the latest release and install:

```bash
# Download from GitHub Releases
# https://github.com/AsobaCloud/zorora/releases/tag/v3.0.0-prod

# Then install:
pip install -e .
```

## Step 2: Start the REPL

```bash
zorora
```

## Step 3: Run your first query

```bash
[1] > What are the latest developments in large language model architectures?
```

Zorora automatically detects research intent, aggregates sources from academic databases and the web, scores credibility, and synthesizes findings with citations.

## Next steps

- [Installation](/guides/installation) — Alternative install methods (pip, source)
- [Configuration](/guides/configuration) — API keys, model selection, web search setup
- [Terminal REPL](/guides/terminal-repl) — Full terminal interface guide
- [Web UI](/guides/web-ui) — Browser-based research interface
- [Research Workflow](/guides/research-workflow) — Deep dive into the research pipeline
