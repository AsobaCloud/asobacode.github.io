---
title: "Slash Commands"
layout: default
nav_order: 9
parent: Guides
---

# Slash Commands Reference

Complete reference for all Zorora slash commands and workflows.

## Overview

Slash commands force specific workflows, bypassing automatic routing. Use them when you want to ensure a particular workflow is executed.

## Workflow Commands

### /search

**Force deep research workflow with multi-source synthesis**

```bash
/search <query>
```

**What it does:**
1. Fetches newsroom headlines (if available, filters by relevance)
2. Searches the web (Brave Search API + DuckDuckGo fallback)
3. Searches academic databases (7 sources: Scholar, PubMed, CORE, arXiv, bioRxiv, medRxiv, PMC)
4. Synthesizes findings from all sources with citations
5. Returns comprehensive answer with source URLs

**When to use:**
- When you want to ensure web search is used (bypasses auto-routing)
- For current events or time-sensitive information
- When you need multiple source verification

**Examples:**
```bash
/search latest developments in renewable energy policy
/search bitcoin vs gold price movements in 2025
/search major AI trends in South America
```

**Output format:**
- Synthesized answer with inline citations ([Newsroom], [Web], [Academic])
- Source URLs listed at the end
- Mentions of domain names for web results

**Configuration:**
- Newsroom: 90 days back, max 25 relevant articles
- Web search: Brave API (primary) + DuckDuckGo (fallback)
- Academic: 7 sources searched in parallel
- Results cached (1 hour for general queries, 24 hours for stable topics)

---

### /ask

**Force conversational mode without web search**

```bash
/ask <query>
```

**What it does:**
- Routes directly to reasoning model
- No web search, no tool calls
- Single-turn response based on model's knowledge
- Fast response for follow-up questions

**When to use:**
- Follow-up questions about previous responses
- Meta conversations about output format
- Questions that don't require current information
- Clarifications or explanations

**Examples:**
```bash
/ask can you explain that more simply?
/ask what did you mean by "virtual power plant"?
/ask how would I implement that in Python?
```

**Model used:** Reasoning model (qwen2.5:32b or configured alternative)

**Note:** Model knowledge cutoff may be outdated for current events. Use `/search` for time-sensitive queries.

---

### /code

**Code generation or file editing with specialist model**

```bash
/code <prompt>
```

**What it does:**

**For new code (no existing file detected):**
- Routes to coding specialist model
- Generates code with explanations
- Returns formatted code blocks

**For existing files (auto-detected in prompt):**
- Reads the existing file with line numbers
- Generates OLD_CODE/NEW_CODE replacement blocks
- Applies edits using `edit_file` tool
- Retry loop (up to 3 attempts) if edit fails

**File Detection Patterns:**
```bash
/code update script.py from "goodbye" to "hello"  → detects script.py
/code fix the typo in utils.py line 15            → detects utils.py
/code change config.json to use port 8080         → detects config.json
```

**When to use:**
- Writing new functions, classes, or scripts
- Editing existing files (v2.5+)
- Code refactoring
- Quick fixes and updates

**Examples:**
```bash
# New code generation
/code write a function to parse JSON files with error handling
/code create a REST API endpoint for user authentication

# File editing (v2.5+)
/code update main.py to add logging
/code fix the typo in config.py line 42
/code change api.py to use async/await
```

**Model used:** Coding specialist (model-agnostic in v2.5+)
- Local: qwen/qwen3-vl-4b (fast, basic)
- HF: Qwen2.5-Coder-32B-Instruct (high quality, slower)

**Workflow Comparison (v2.5+):**

| Command | Scope | Phases | Best For |
|---------|-------|--------|----------|
| `/code` | Single file/snippet | 1-2 (plan + generate/edit) | Quick edits, snippets |
| `/develop` | Entire codebase | 5 (preflight → explore → plan → execute → lint) | Features, refactoring |

**Saving output:**
```bash
> /code write a CSV parser
[Code generated...]
> /save csv_parser.py
Saved to: csv_parser.py
```

---

### /develop

**Multi-step code development workflow**

```bash
/develop <development request>
```

**What it does:**

**Phase 0: Pre-flight Checks**
- Verifies git repository exists (required for safety)
- Warns if uncommitted changes present
- Asks for confirmation to proceed

**Phase 1: Codebase Exploration**
- Analyzes project structure and file types
- Detects project type (Node.js, Python, Go, Rust)
- Identifies framework (Express, Flask, Next.js, etc.)
- Reads configuration files (package.json, requirements.txt, etc.)
- Maps dependencies and entry points

**Phase 2: Planning**
- Uses reasoning model to create detailed plan
- Identifies files to create/modify
- Specifies dependencies to add
- Orders tasks logically
- Includes testing recommendations

**Phase 3: User Approval**
- Displays plan with rich formatting
- Asks for explicit approval
- User can approve, reject, or request modifications

**Phase 4: Execution**
- Executes approved plan step-by-step
- Uses Codestral for code generation
- Creates/modifies files as planned
- Handles errors gracefully

**Phase 5: Lint & Validate**
- Runs linters (ruff, eslint, etc.)
- Validates syntax
- Reports issues
- Suggests fixes

**When to use:**
- Adding features to existing codebase
- Refactoring large codebases
- Implementing complex functionality
- Multi-file changes

**Examples:**
```bash
/develop Add user authentication to my Flask app
/develop Refactor the API to use async/await
/develop Add unit tests for the user service
```

**Requirements:**
- Git repository must exist
- Uncommitted changes should be committed first
- Project must have recognizable structure

---

### /image

**Generate image with FLUX (text-to-image)**

```bash
/image <prompt>
```

**What it does:**
- Generates image using FLUX.1-schnell model
- Text-to-image generation
- Returns image file path and displays image
- Fast generation (~5-15 seconds)

**When to use:**
- Creating visualizations
- Generating concept art
- Illustrating ideas
- Design mockups

**Examples:**
```bash
/image a futuristic solar farm at sunset
/image minimalist logo for an AI research company
/image detailed technical diagram of a battery storage system
```

**Model used:** black-forest-labs/FLUX.1-schnell
- Requires HuggingFace endpoint or local GPU
- Configure via `/models` command or Web UI settings

**Output:**
- Image saved to working directory
- Filename: `flux_output_<timestamp>.png`
- Image displayed in terminal (if supported)

**Tips:**
- Be descriptive and specific in prompts
- Include art style, lighting, perspective
- Mention colors, composition, mood

---

### /vision

**Analyze image with vision model (OCR and content extraction)**

```bash
/vision <image_path> [optional task]
```

**What it does:**
- Analyzes image using vision-language model
- Extracts text (OCR)
- Describes visual content
- Converts to markdown format
- Optional custom analysis task

**When to use:**
- Extracting text from screenshots
- Analyzing charts and graphs
- Converting images to markdown
- Image content description

**Examples:**
```bash
/vision screenshot.png
/vision chart.png describe the trends shown
/vision diagram.jpg extract all labels and annotations
/vision receipt.png convert to structured data
```

**Default task:**
"Convert this image to markdown format, preserving all text, tables, charts, and structure. Use OCR to extract any text."

**Model used:** Vision-language model (qwen/qwen3-vl-4b)

**Supported formats:** PNG, JPG, JPEG, GIF, WebP

**Output:**
- Markdown-formatted text
- Tables preserved
- Structure maintained
- Text extracted and formatted

---

### /deep

**Terminal deep research (v2.5+)**

```bash
/deep <query>
```

**What it does:**
- Executes full deep research workflow from terminal
- Same capabilities as Web UI research
- Academic + web + newsroom multi-source synthesis
- Returns synthesis with citations and credibility scores

**When to use:**
- Deep research queries from terminal
- When you need comprehensive multi-source synthesis
- Academic research with citation following

**Examples:**
```bash
/deep What are the latest developments in transformer architectures?
/deep How do mRNA vaccines work?
/deep Latest renewable energy policy changes in South Africa
```

**Output:**
- Comprehensive synthesis with inline citations
- Source list with credibility scores
- Citation graph (when depth > 1)

**Note:** This command provides full feature parity with Web UI research.

---

## ONA Platform Commands (v2.5+)

Remote commands for interacting with ONA platform ML model observation workflows. These commands require ONA platform integration configured via environment variables.

### /ml-list-challengers

**List challenger models for a customer**

```bash
/ml-list-challengers <customer_id>
```

### /ml-show-metrics

**Show evaluation metrics for a model**

```bash
/ml-show-metrics <model_id>
```

### /ml-diff

**Compare challenger vs production model**

```bash
/ml-diff <challenger_id> <production_id>
```

### /ml-promote

**Promote challenger model to production**

```bash
/ml-promote <customer_id> <model_id> <reason> [--force]
```

Requires confirmation unless `--force` flag is used.

### /ml-rollback

**Rollback production model to previous version**

```bash
/ml-rollback <customer_id> <reason>
```

Requires confirmation.

### /ml-audit-log

**Get audit log for a customer**

```bash
/ml-audit-log <customer_id>
```

### ONA Platform Configuration

Set environment variables before running Zorora:

```bash
# Option 1: Retrieve from AWS SSM Parameter Store (recommended)
source <(./scripts/get-global-training-api-credentials.sh)

# Option 2: Manual configuration
export ONA_API_BASE_URL="https://your-api-endpoint.amazonaws.com/api/v1"
export ONA_API_TOKEN="your-api-token-here"
export ONA_USE_IAM="false"
```

**Environment Variables:**
- `ONA_API_BASE_URL` - ONA platform API base URL
- `ONA_API_TOKEN` - Authentication token (required if not using IAM)
- `ONA_USE_IAM` - Use IAM authentication (default: `false`)

---

## System Commands

### /models

**Interactive model selector**

```bash
/models
```

**What it does:**
- Interactive menu for configuring models
- Select models for each tool
- Configure endpoints
- Set API keys

**When to use:**
- Initial setup
- Changing model configuration
- Testing different models

---

### /config

**Show current routing configuration**

```bash
/config
```

**What it does:**
- Displays current model assignments
- Shows endpoint mappings
- Lists configured providers

**When to use:**
- Checking current configuration
- Debugging routing issues
- Verifying model assignments

---

### /history

**Browse saved conversation sessions**

```bash
/history
```

**What it does:**
- Lists saved conversation sessions
- Shows session metadata (date, query count)
- Allows loading previous sessions

**When to use:**
- Reviewing past conversations
- Continuing previous research
- Finding specific queries

---

### /help

**Show available commands**

```bash
/help
```

**What it does:**
- Displays list of all available commands
- Shows command syntax
- Provides brief descriptions

**When to use:**
- Learning available commands
- Quick reference
- Command discovery

---

### exit, quit, q

**Exit the REPL**

```bash
exit
quit
q
```

**What it does:**
- Exits the REPL cleanly
- Saves conversation if auto-save enabled
- Restores terminal state

---

## Natural Language Queries

Zorora automatically routes natural language queries to appropriate workflows:

**Research queries** (automatically routed to deep research):
```
What are the latest developments in LLM architectures?
Why do solar panels degrade over time?
How does battery storage work?
```

**Code queries** (automatically routed to code generation):
```
Write a function to validate email addresses
Create a REST API endpoint
Refactor this code to use async/await
```

**Development queries** (automatically routed to /develop):
```
Add user authentication to my Flask app
Refactor the API to use async/await
Add unit tests for the user service
```

---

## Command Priority

Commands are processed in this order:

1. **Slash commands** - Highest priority, force specific workflows
2. **File operations** - Save, load, list, show, delete
3. **Code generation** - Write, create, generate + code keywords
4. **Research queries** - What, why, how, tell me keywords
5. **Simple Q&A** - Fallback to conversational mode

---

## Tips & Best Practices

### Use Slash Commands When:

- You want to force a specific workflow
- Auto-routing might choose wrong workflow
- You need predictable behavior
- Debugging workflow issues

### Use Natural Language When:

- You want automatic routing
- Query intent is clear
- You trust the routing system
- Faster typing

### Command Combinations:

```bash
# Research then code
/search latest Python async patterns
/code implement async pattern from research

# Code then develop
/code create user model
/develop add authentication using this model

# Image then vision
/image technical diagram of API architecture
/vision flux_output_*.png extract all labels
```

---

## Troubleshooting

### Command Not Recognized

**Problem:** Slash command not working

**Solution:**
- Check command spelling (case-sensitive)
- Verify command exists: `/help`
- Check for typos or extra spaces

### Workflow Not Executing

**Problem:** Command runs but wrong workflow executes

**Solution:**
- Use explicit slash command to force workflow
- Check `/config` for routing configuration
- Verify model assignments

### Command Hangs

**Problem:** Command takes too long or hangs

**Solution:**
- Check model endpoint connectivity
- Verify API keys are configured
- Check network connectivity (for remote endpoints)
- Review logs for errors

---

## See Also

- [Terminal REPL](/guides/terminal-repl) - Learn the command-line interface
- [Research Workflow](/guides/research-workflow) - Deep research capabilities
- [Code Generation](/guides/code-generation) - Code generation guide
- [Development Workflow](/guides/development-workflow) - Multi-step development
- [API Reference](/api-reference/overview) - Programmatic access
