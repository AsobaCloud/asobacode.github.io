---
title: "Research Workflow"
layout: default
nav_order: 6
parent: Guides
---

# Research Workflow Guide

Deep dive into Zorora's 6-phase research pipeline and deep research capabilities.

## Overview

Zorora's deep research workflow searches across academic databases, web sources, and newsroom articles, then synthesizes findings with credibility scoring and citation graphs. The workflow is designed to provide comprehensive, well-sourced answers to research questions.

<div style="width: 100%; max-width: 800px; margin: 24px auto;">
  <div style="width: 100%; height: 400px; background: var(--background-light); border: 2px dashed var(--border-grey); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--text-light);">
    <span>Research Results with Citations Screenshot<br/><small>(Placeholder - Add screenshot showing research results with citations, credibility scores, and citation graph)</small></span>
  </div>
</div>

## 6-Phase Research Pipeline

### Phase 1: Parallel Source Aggregation

**What happens:**
- Searches academic databases (7 sources) in parallel:
  - Google Scholar
  - PubMed
  - CORE
  - arXiv
  - bioRxiv
  - medRxiv
  - PubMed Central (PMC)
- Searches web sources:
  - Brave Search API (primary)
  - DuckDuckGo (fallback)
- Fetches newsroom articles (Asoba API)
- All searches happen simultaneously for speed

**Output:** Raw sources from all three categories

### Phase 2: Citation Following

**What happens:**
- Explores cited papers from initial sources
- Configurable depth (1-3 hops)
- Builds citation graph
- Follows most relevant citations

**Depth Levels:**
- **Quick (depth=1):** Skips citation following (~25-35s)
- **Balanced (depth=2):** 1-hop citation following (~35-50s) - *Coming soon*
- **Thorough (depth=3):** Multi-hop citations (~50-70s) - *Coming soon*

**Output:** Extended source set with citation relationships

### Phase 3: Cross-Referencing

**What happens:**
- Groups claims by similarity
- Counts agreement across sources
- Identifies conflicting claims
- Highlights consensus

**Output:** Grouped claims with agreement counts

### Phase 4: Credibility Scoring

**What happens:**
- Rules-based scoring of source authority
- Factors considered:
  - Domain reputation (Nature=0.85, arXiv=0.50, etc.)
  - Citation count
  - Cross-reference agreement
  - Publisher type (academic journals vs predatory publishers)
  - Retraction status

**Credibility Categories:**
- **High** (0.7-1.0): Peer-reviewed journals, reputable sources
- **Medium** (0.4-0.7): Preprints, reputable websites
- **Low** (0.0-0.4): Unverified sources, low-citation papers

**Output:** Sources with credibility scores and categories

### Phase 5: Citation Graph Building

**What happens:**
- Constructs directed graph showing source relationships
- Maps citation connections
- Visualizes research network
- Identifies key papers

**Output:** Citation graph structure

### Phase 6: Synthesis

**What happens:**
- Uses reasoning model to synthesize findings
- Generates comprehensive answer
- Includes citations with confidence levels
- Highlights key findings
- Notes areas of consensus and disagreement

**Output:** Final synthesis with citations

## Using the Research Workflow

### Terminal Interface

**Automatic Detection:**
```bash
[1] ⚙ > What are the latest developments in large language model architectures?
```

The system automatically detects research intent and executes the deep research workflow.

**Force Research:**
```bash
[2] ⚙ > /search latest developments in renewable energy policy
```

### Web UI

1. Open `http://localhost:5000`
2. Enter research question
3. Select depth level (Quick/Balanced/Thorough)
4. Click "Start Research"
5. View results with synthesis, sources, and credibility scores

### API (Programmatic Access)

```python
from engine.research_engine import ResearchEngine

engine = ResearchEngine()
state = engine.deep_research("Your research question", depth=1)
print(state.synthesis)
print(f"Total sources: {state.total_sources}")
```

## Research Depth Levels

### Quick (depth=1)

**When to use:**
- Fast answers needed
- Initial research
- Quick fact-checking

**What it does:**
- Parallel source aggregation only
- Skips citation following
- Fast synthesis

**Time:** ~25-35 seconds

### Balanced (depth=2)

**When to use:**
- Thorough research needed
- Academic papers important
- Citation trails valuable

**What it does:**
- Parallel source aggregation
- 1-hop citation following
- Extended synthesis

**Time:** ~35-50 seconds

**Status:** *Coming soon*

### Thorough (depth=3)

**When to use:**
- Comprehensive research
- Deep citation exploration
- Maximum source coverage

**What it does:**
- Parallel source aggregation
- Multi-hop citation following (up to 3 levels)
- Comprehensive synthesis

**Time:** ~50-70 seconds

**Status:** *Coming soon*

## Research Storage

### Automatic Storage

Research is automatically saved to:

**SQLite Database:**
- Location: `~/.zorora/zorora.db`
- Contains: Metadata, indexed sources, citation graphs
- Fast queries: <100ms

**JSON Files:**
- Location: `~/.zorora/research/findings/<id>.json`
- Contains: Full research state
- Includes: Sources, findings, synthesis, metadata

### Accessing Saved Research

**Terminal:**
```python
from engine.research_engine import ResearchEngine

engine = ResearchEngine()
# Search past research
results = engine.search_research(query="LLM architectures", limit=10)
# Load specific research
research_data = engine.load_research(results[0]['research_id'])
```

**Web UI API:**
```bash
# Get research history
curl http://localhost:5000/api/research/history?limit=10

# Get specific research
curl http://localhost:5000/api/research/<research_id>
```

## Understanding Results

### Synthesis

The synthesis provides:
- Comprehensive answer to your question
- Inline citations ([Newsroom], [Web], [Academic])
- Confidence levels
- Key findings highlighted
- Areas of consensus and disagreement

### Sources

Each source includes:
- Title
- URL
- Credibility score (0.0-1.0)
- Credibility category (high/medium/low)
- Source type (academic/web/newsroom)
- Citation count (for academic sources)

### Credibility Scores

**High (0.7-1.0):**
- Peer-reviewed journals
- Reputable academic sources
- Well-cited papers
- Trusted websites

**Medium (0.4-0.7):**
- Preprints (arXiv, bioRxiv, medRxiv)
- Reputable websites
- Moderately cited papers

**Low (0.0-0.4):**
- Unverified sources
- Low-citation papers
- Predatory publishers
- Unreliable websites

## Best Practices

### Writing Research Queries

**Be Specific:**
- "What are the latest developments in transformer architectures?" ✓
- "AI stuff" ✗

**Include Context:**
- "How do attention mechanisms work in transformer models?" ✓
- "Attention" ✗

**Use Research Keywords:**
- What, Why, How, Tell me
- Automatically triggers research workflow

### Choosing Depth Levels

**Quick:**
- Fast answers
- Initial research
- Fact-checking

**Balanced:**
- Thorough research
- Academic focus
- Citation exploration

**Thorough:**
- Comprehensive analysis
- Maximum coverage
- Deep exploration

### Interpreting Results

**Check Credibility:**
- Prioritize high-credibility sources
- Verify claims from multiple sources
- Note areas of disagreement

**Follow Citations:**
- Use source URLs to verify
- Explore citation graph
- Check original sources

**Consider Context:**
- Note publication dates
- Consider source bias
- Verify claims independently

## Troubleshooting

### Research Not Triggering

**Problem:** Query doesn't trigger research workflow

**Solution:**
- Use research keywords: "What", "Why", "How", "Tell me"
- Use `/search` command to force research
- Check routing configuration: `/config`

### Slow Research

**Problem:** Research takes too long

**Solution:**
- Use Quick depth level (depth=1)
- Check network connectivity
- Verify API endpoints are responsive
- Check API rate limits

### No Sources Found

**Problem:** Research returns no sources

**Solution:**
- Check API keys are configured (Brave Search, Newsroom)
- Verify network connectivity
- Check API rate limits
- Try different query phrasing

### Low Credibility Scores

**Problem:** All sources have low credibility

**Solution:**
- This may be normal for niche topics
- Check source URLs manually
- Try different query phrasing
- Consider using Balanced/Thorough depth

## See Also

- [Terminal REPL](/guides/terminal-repl) - Command-line interface
- [Web UI](/guides/web-ui) - Browser-based interface
- [Slash Commands](/guides/slash-commands) - Command reference
- [API Reference](/api-reference/research-api) - Programmatic access
- [Technical Concepts](/technical-concepts/research-pipeline) - Pipeline architecture
