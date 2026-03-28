---
title: "Architecture"
layout: default
nav_order: 2
parent: "Learn"
---

# Architecture

Zorora's system architecture and design principles.

## Overview

Zorora uses **deterministic routing** with pattern matching instead of LLM-based orchestration. This design choice enables reliable operation with small 4B models while maintaining RAM efficiency.

## Design Philosophy

- **Deterministic over clever** - Code-controlled workflows, not LLM orchestration
- **Research-first** - Optimized for multi-source synthesis and citation management
- **RAM-efficient** - Runs on MacBook Air with 4B orchestrator model
- **Persistent knowledge** - Save and retrieve research findings locally
- **Simple and reliable** - Hardcoded pipelines that just work

## Architecture Diagram

```
User Query / Slash Command / Web UI Request
    ↓
Pattern Matching (simplified_router.py) / Flask Routes (ui/web/app.py)
    ↓
    ├─→ DEEP RESEARCH WORKFLOW (6-phase pipeline)
    │   ├─► Phase 1: Parallel Source Aggregation
    │   │   ├─► Academic (7 sources: Scholar, PubMed, CORE, arXiv, bioRxiv, medRxiv, PMC)
    │   │   ├─► Web (Brave Search + DuckDuckGo)
    │   │   └─► Newsroom (Asoba API)
    │   ├─► Phase 2: Citation Following (configurable depth: 1-3)
    │   ├─► Phase 3: Cross-Referencing (groups claims by similarity)
    │   ├─► Phase 4: Credibility Scoring (rules-based)
    │   ├─► Phase 5: Citation Graph Building
    │   └─► Phase 6: Synthesis (Reasoning Model)
    ├─→ CODE WORKFLOW (Codestral specialist)
    ├─→ DEVELOPMENT WORKFLOW (/develop - multi-step)
    ├─→ FILE OPERATIONS (save/load/list)
    ├─→ IMAGE WORKFLOWS (generate/analyze)
    └─→ SIMPLE Q&A (/ask - direct model)
```

## Key Principles

- **No LLM-based orchestration** - Patterns determine routing, code controls execution
- **Hardcoded workflows** - Fixed pipelines for predictable results
- **Persistent research** - Everything saved to `~/.zorora/research/` with metadata
- **Specialist models** - Codestral for code, reasoning model for synthesis, vision for images
- **Multi-provider support** - Configure models from LM Studio (local), HuggingFace, OpenAI, and Anthropic APIs
- **Visual configuration** - Web UI settings modal for easy model/endpoint management
- **Hybrid inference** - Mix local models (4B orchestrator) with remote HuggingFace endpoints (32B Codestral)

## Core Components

### 1. Simplified Router (`simplified_router.py`)

Uses pattern matching to route queries to workflows:

```python
def route(self, user_input: str) -> Dict[str, Any]:
    # Priority 1: File operations (save, load, list, show)
    if re.search(r'\b(save|load|list|show|delete)\b', user_input.lower()):
        return {"workflow": "file_op", "action": "..."}

    # Priority 2: Code generation (write, create, generate + code)
    if re.search(r'\b(write|create|generate).*\b(function|class|script|code)', user_input.lower()):
        return {"workflow": "code", "tool": "use_codestral"}

    # Priority 3: Research (questions, multi-source queries)
    if re.search(r'\b(what|why|how|tell me|based on|newsroom|web search)\b', user_input.lower()):
        return {"workflow": "research", "action": "multi_source_research"}

    # Priority 4: Simple Q&A (fallback)
    return {"workflow": "qa", "tool": "use_reasoning_model"}
```

**No LLM involved** - Pure pattern matching ensures consistent, fast routing (0ms decision time).

### 2. Research Engine (`engine/research_engine.py`)

High-level interface for deep research:

- Starting research
- Loading past research
- Searching research history
- Executing deep research workflow

### 3. Deep Research Workflow (`workflows/deep_research/`)

Hardcoded pipeline for multi-source research:

- `aggregator.py` - Source aggregation
- `credibility.py` - Credibility scoring
- `synthesizer.py` - Synthesis generation
- `workflow.py` - Workflow orchestrator

### 4. Storage Layer (`engine/storage.py`)

Local-first storage:

- SQLite database (`~/.zorora/zorora.db`) for fast indexed queries
- JSON files (`~/.zorora/research/findings/`) for full research state

### 5. Web UI (`ui/web/app.py`)

Flask-based web interface:

- Research query interface with depth selection
- Settings modal for configuration
- Research results display with synthesis, sources, and credibility scores

### 6. Research Memory (`engine/storage.py`, `workflows/deep_research/aggregator.py`)

Cross-session knowledge persistence:

- **Feedback** — thumbs up/down ratings on chat responses stored in `research_feedback` table (upsert semantics, one rating per message)
- **Chat Thread Persistence** — every conversation turn saved to `research_chat_history` table, restored on session resume via thread key `research:<research_id>`
- **Scouting RAG Injection** — completed feasibility studies (stages: feasibility, diligence, decision) are keyword-matched against new research queries and injected as `source_type: "internal"` sources during aggregation

See [Research Memory]({{ site.baseurl }}/technical-concepts/memory) for schemas, API endpoints, and the relevance matching algorithm.

## Execution Flow

### Research Workflow

```
Query
  ↓
[Step 1/6] Parallel Source Aggregation
  ├─► Academic (7 sources)
  ├─► Web (Brave + DDG)
  └─► Newsroom
  ↓
[Step 2/6] Citation Following (if depth > 1)
  ↓
[Step 3/6] Cross-Referencing
  ↓
[Step 4/6] Credibility Scoring
  ↓
[Step 5/6] Citation Graph Building
  ↓
[Step 6/6] Synthesis
  ↓
Result (with citations and confidence levels)
```

### Code Workflow

```
Query → Codestral specialist model → Formatted code output
```

### Development Workflow

```
/develop <request>
  ↓
Phase 1: Explore codebase (codebase_explorer.py)
  ↓
Phase 2: Plan changes (code_planner.py)
  ↓
[User Approval Required]
  ↓
Phase 3: Execute changes (code_executor.py)
  ↓
Phase 4: Lint & validate (code_tools.py)
```

## No Multi-Iteration Loops

Unlike complex orchestration systems, Zorora executes workflows **once** and returns the result. No planning, no iteration loops, no LLM deciding "should I call another tool?"

**Old approach (unreliable with 4B models):**
```
Query → LLM plans → LLM calls tool 1 → LLM decides next step → LLM calls tool 2 → ...
```

**New approach (deterministic):**
```
Query → Pattern match → Execute fixed pipeline → Return result
```

## Why This Architecture?

### Problem: 4B Models Can't Orchestrate

Traditional multi-model orchestration requires the LLM to:
- Generate valid JSON plans
- Make routing decisions
- Handle multi-step iteration
- Recover from tool failures

**4B models fail at all of these.** They can't reliably generate JSON, struggle with function calling, and get stuck in loops.

### Solution: Code Handles Complexity

Instead of asking the 4B model to be smart, we made the **code smart**:
- Pattern matching routes queries (no LLM decision)
- Hardcoded workflows execute pipelines (no LLM planning)
- Fixed iteration count (no LLM loop detection)
- Deterministic error handling (no LLM recovery)

**Result:** 100% reliability with 4B models, 1/3 the RAM usage of 8B orchestrators, complete privacy with local storage.

### Trade-offs

**What we lost:**
- Flexibility for complex multi-tool queries
- LLM creativity in tool selection
- Adaptive workflows based on results

**What we gained:**
- 100% routing reliability (pattern matching never fails)
- Predictable behavior (same query = same workflow)
- RAM efficiency (4B model = 4-6 GB vs 8B = 12-16 GB)
- Simple debugging (no "why did it choose that tool?")
- Fast responses (no LLM routing overhead)

## Module Structure

```
zorora/
├── main.py                      # Entry point
├── repl.py                      # REPL loop and slash commands
├── web_main.py                  # Web UI entry point
├── config.py                    # Configuration
├── simplified_router.py          # Deterministic routing
├── research_workflow.py         # Legacy research pipeline
├── turn_processor.py            # Workflow orchestration
├── tool_executor.py             # Tool execution
├── tool_registry.py             # Tool registry (shim for backward compat)
│
├── engine/                      # Deep research engine
│   ├── models.py                # Data models (Source, Finding, ResearchState)
│   ├── storage.py               # SQLite storage layer
│   └── research_engine.py       # High-level research API
│
├── tools/                       # Modular tool registry
│   ├── registry.py              # Central tool registry
│   ├── research/                # Research tools
│   │   ├── academic_search.py   # Academic search (7 sources)
│   │   ├── web_search.py        # Web search (Brave + DDG)
│   │   └── newsroom.py          # Newsroom API integration
│   ├── code/                    # Code tools (future)
│   └── specialist/              # Specialist tools (future)
│
├── workflows/                   # Multi-step workflows
│   ├── develop_workflow.py      # Development workflow
│   ├── codebase_explorer.py     # Codebase exploration
│   ├── code_planner.py          # Code planning
│   ├── code_executor.py         # Code execution
│   └── deep_research/           # Deep research workflow
│       ├── aggregator.py        # Source aggregation
│       ├── credibility.py       # Credibility scoring
│       ├── synthesizer.py       # Synthesis generation
│       └── workflow.py          # Workflow orchestrator
│
└── ui/web/                      # Web UI (Flask app)
    ├── app.py                   # Flask application + API routes
    ├── config_manager.py        # Config file management (read/write)
    └── templates/
        └── index.html           # Research UI + Settings Modal
```

## Performance

- **Routing decision:** 0ms (pattern matching, no LLM)
- **Research workflow:** Varies by depth
  - **Quick (depth=1):** ~25-35s
  - **Balanced (depth=2):** ~35-50s - *Coming soon*
  - **Thorough (depth=3):** ~50-70s - *Coming soon*
- **Storage queries:** <100ms (SQLite indexed)
- **Code generation:** 10-90 seconds (local: 10-30s, HF 32B: 60-90s)
- **RAM usage:** 4-6 GB (4B orchestrator model)

## See Also

- [Research Pipeline](/technical-concepts/research-pipeline) - Pipeline implementation details
- [Storage](/technical-concepts/storage) - Storage architecture
- [Routing](/technical-concepts/routing) - Routing mechanism
- [Introduction](/introduction) - Overview of Zorora
