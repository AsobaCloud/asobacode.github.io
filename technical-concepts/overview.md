---
title: "Technical Concepts Overview"
layout: default
nav_order: 5
parent: Technical Concepts
---

# Technical Concepts Overview

Deep dive into Zorora's architecture, design principles, and implementation details.

## What You Can Find Here

This section provides comprehensive technical documentation covering:

- **Architecture** - Overall system architecture and design principles
- **Research Pipeline** - How the 6-phase research pipeline works
- **Storage** - Local-first storage architecture and data models
- **Routing** - Deterministic pattern matching and workflow routing

## Architecture Overview

Zorora uses **deterministic routing** with pattern matching instead of LLM-based orchestration. This design choice enables reliable operation with small 4B models while maintaining RAM efficiency.

### Design Philosophy

- **Deterministic over clever** - Code-controlled workflows, not LLM orchestration
- **Research-first** - Optimized for multi-source synthesis and citation management
- **RAM-efficient** - Runs on MacBook Air with 4B orchestrator model
- **Persistent knowledge** - Save and retrieve research findings locally
- **Simple and reliable** - Hardcoded pipelines that just work

### Key Principles

- **No LLM-based orchestration** - Patterns determine routing, code controls execution
- **Hardcoded workflows** - Fixed pipelines for predictable results
- **Persistent research** - Everything saved to `~/.zorora/research/` with metadata
- **Specialist models** - Codestral for code, reasoning model for synthesis, vision for images
- **Multi-provider support** - Configure models from LM Studio (local), HuggingFace, OpenAI, and Anthropic APIs
- **Visual configuration** - Web UI settings modal for easy model/endpoint management
- **Hybrid inference** - Mix local models (4B orchestrator) with remote HuggingFace endpoints (32B Codestral)

## Core Components

### Simplified Router

Uses pattern matching to route queries to workflows. No LLM involved - pure pattern matching ensures consistent, fast routing (0ms decision time).

### Research Engine

High-level interface for deep research:
- Starting research
- Loading past research
- Searching research history
- Executing deep research workflow

### Deep Research Workflow

Hardcoded pipeline for multi-source research:
- Source aggregation
- Credibility scoring
- Synthesis generation
- Workflow orchestration

### Storage Layer

Local-first storage:
- SQLite database for fast indexed queries
- JSON files for full research state
- Automatic persistence

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

## Popular Concepts

<div class="overview-cards-grid">
  <div class="overview-card">
    <h3>Architecture</h3>
    <p>Overall system architecture, design principles, and component structure. Learn how Zorora's deterministic routing works.</p>
    <a href="/technical-concepts/architecture" class="card-link">Learn More →</a>
  </div>

  <div class="overview-card">
    <h3>Research Pipeline</h3>
    <p>How the 6-phase research pipeline works: source aggregation, citation following, cross-referencing, credibility scoring, and synthesis.</p>
    <a href="/technical-concepts/research-pipeline" class="card-link">Learn More →</a>
  </div>

  <div class="overview-card">
    <h3>Credibility Scoring</h3>
    <p>Multi-factor credibility scoring system for research sources. Learn how sources are evaluated for authority and reliability.</p>
    <a href="/technical-concepts/credibility-scoring" class="card-link">Learn More →</a>
  </div>

  <div class="overview-card">
    <h3>Storage</h3>
    <p>Local-first storage architecture using SQLite and JSON files. Learn about data models, persistence, and query performance.</p>
    <a href="/technical-concepts/storage" class="card-link">Learn More →</a>
  </div>

  <div class="overview-card">
    <h3>Routing</h3>
    <p>Deterministic pattern matching for workflow routing. Learn how queries are routed without LLM orchestration.</p>
    <a href="/technical-concepts/routing" class="card-link">Learn More →</a>
  </div>
</div>

## Next Steps

- **[Architecture](/technical-concepts/architecture)** - Detailed architecture documentation
- **[Research Pipeline](/technical-concepts/research-pipeline)** - Pipeline implementation details
- **[Credibility Scoring](/technical-concepts/credibility-scoring)** - Source credibility evaluation
- **[Storage](/technical-concepts/storage)** - Storage architecture and data models
- **[Routing](/technical-concepts/routing)** - Routing mechanism and pattern matching

## See Also

- [Introduction](/introduction) - Overview of Zorora
- [Getting Started](/getting-started) - Installation and setup
- [Guides](/guides/overview) - Usage guides
- [API Reference](/api-reference/overview) - Programmatic access
