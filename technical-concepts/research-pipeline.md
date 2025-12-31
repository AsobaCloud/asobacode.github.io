---
title: "Research Pipeline"
layout: default
nav_order: 2
parent: Technical Concepts
---

# Research Pipeline

How Zorora's 6-phase research pipeline works.

## Overview

Zorora's deep research workflow executes a 6-phase pipeline that searches across academic databases, web sources, and newsroom articles, then synthesizes findings with credibility scoring and citation graphs.

## Pipeline Phases

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

**Implementation:**
```python
# Parallel execution
academic_sources = academic_search(query)  # 7 sources in parallel
web_sources = web_search(query)           # Brave + DDG
newsroom_sources = newsroom_search(query) # Asoba API
```

**Output:** Raw sources from all three categories

**Performance:** ~8 seconds (parallel execution)

### Phase 2: Citation Following

**What happens:**
- Explores cited papers from initial sources
- Configurable depth (1-3 hops)
- Builds citation graph
- Follows most relevant citations

**Depth Levels:**
- **Quick (depth=1):** Skips citation following (~25-35s total)
- **Balanced (depth=2):** 1-hop citation following (~35-50s total) - *Coming soon*
- **Thorough (depth=3):** Multi-hop citations (~50-70s total) - *Coming soon*

**Implementation:**
```python
if depth > 1:
    cited_papers = extract_citations(initial_sources)
    cited_sources = fetch_cited_papers(cited_papers, depth=depth-1)
    sources.extend(cited_sources)
```

**Output:** Extended source set with citation relationships

**Performance:** Adds ~10-20 seconds per depth level

### Phase 3: Cross-Referencing

**What happens:**
- Groups claims by similarity
- Counts agreement across sources
- Identifies conflicting claims
- Highlights consensus

**Implementation:**
```python
claims = extract_claims(sources)
grouped_claims = group_by_similarity(claims)
agreement_counts = count_agreement(grouped_claims)
```

**Output:** Grouped claims with agreement counts

**Performance:** ~2 seconds

### Phase 4: Credibility Scoring

**What happens:**
- Rules-based scoring of source authority
- Factors considered:
  - Domain reputation (Nature=0.85, arXiv=0.50, etc.)
  - Citation count
  - Cross-reference agreement
  - Publisher type (academic journals vs predatory publishers)
  - Retraction status

**Scoring Rules:**
- **High (0.7-1.0):** Peer-reviewed journals, reputable sources
- **Medium (0.4-0.7):** Preprints, reputable websites
- **Low (0.0-0.4):** Unverified sources, low-citation papers

**Implementation:**
```python
for source in sources:
    score = calculate_credibility(source)
    source.credibility_score = score
    source.credibility_category = categorize(score)
```

**Output:** Sources with credibility scores and categories

**Performance:** ~2 seconds

### Phase 5: Citation Graph Building

**What happens:**
- Constructs directed graph showing source relationships
- Maps citation connections
- Visualizes research network
- Identifies key papers

**Implementation:**
```python
graph = build_citation_graph(sources)
key_papers = identify_key_papers(graph)
```

**Output:** Citation graph structure

**Performance:** ~1 second

### Phase 6: Synthesis

**What happens:**
- Uses reasoning model to synthesize findings
- Generates comprehensive answer
- Includes citations with confidence levels
- Highlights key findings
- Notes areas of consensus and disagreement

**Implementation:**
```python
prompt = f"""
SOURCES:
[Academic]: {academic_content}
[Web]: {web_content}
[Newsroom]: {newsroom_content}

QUESTION: {query}

Synthesize findings from ALL sources above.
Cite sources using [Academic], [Web], or [Newsroom] tags.
"""
synthesis = reasoning_model.generate(prompt)
```

**Output:** Final synthesis with citations

**Performance:** ~15-25 seconds (local reasoning model)

## Pipeline Execution

### Complete Flow

```
Query
  ↓
Phase 1: Parallel Source Aggregation (~8s)
  ├─► Academic (7 sources)
  ├─► Web (Brave + DDG)
  └─► Newsroom
  ↓
Phase 2: Citation Following (~10-20s, if depth > 1)
  ↓
Phase 3: Cross-Referencing (~2s)
  ↓
Phase 4: Credibility Scoring (~2s)
  ↓
Phase 5: Citation Graph Building (~1s)
  ↓
Phase 6: Synthesis (~15-25s)
  ↓
Result (with citations and confidence levels)
```

### Total Time by Depth

- **Quick (depth=1):** ~25-35 seconds
  - Phase 1: ~8s
  - Phase 3: ~2s
  - Phase 4: ~2s
  - Phase 5: ~1s
  - Phase 6: ~15-25s

- **Balanced (depth=2):** ~35-50 seconds - *Coming soon*
  - Adds Phase 2: ~10-15s

- **Thorough (depth=3):** ~50-70 seconds - *Coming soon*
  - Adds Phase 2: ~20-30s

## Data Flow

### Source Aggregation

```
Query
  ↓
┌─────────────────────────────────────┐
│ Parallel Source Aggregation         │
├─────────────────────────────────────┤
│ Academic Search (7 sources)         │
│ Web Search (Brave + DDG)             │
│ Newsroom Search (Asoba API)         │
└─────────────────────────────────────┘
  ↓
Raw Sources (academic, web, newsroom)
```

### Processing Pipeline

```
Raw Sources
  ↓
Citation Following (if depth > 1)
  ↓
Extended Sources
  ↓
Cross-Referencing
  ↓
Grouped Claims
  ↓
Credibility Scoring
  ↓
Scored Sources
  ↓
Citation Graph Building
  ↓
Research Graph
  ↓
Synthesis
  ↓
Final Result
```

## Implementation Details

### Academic Search

**Sources:**
- Google Scholar
- PubMed
- CORE
- arXiv
- bioRxiv
- medRxiv
- PubMed Central (PMC)

**Parallel Execution:**
```python
results = await asyncio.gather(
    scholar_search(query),
    pubmed_search(query),
    core_search(query),
    arxiv_search(query),
    biorxiv_search(query),
    medrxiv_search(query),
    pmc_search(query)
)
```

### Web Search

**Primary:** Brave Search API
- High quality results
- Requires API key
- Free tier: 2000 queries/month

**Fallback:** DuckDuckGo
- No API key required
- Lower quality results
- Used if Brave unavailable

### Newsroom Search

**Source:** Asoba API
- Energy industry newsroom
- 90 days back
- Max 25 relevant articles
- Filtered by relevance

### Credibility Scoring

**Domain-Based Scoring:**
- Nature, Science: 0.85
- Peer-reviewed journals: 0.70-0.85
- arXiv, bioRxiv, medRxiv: 0.50-0.70
- Reputable websites: 0.40-0.70
- Unverified sources: 0.00-0.40

**Citation Modifiers:**
- High citations: +0.10
- Medium citations: +0.05
- Low citations: 0.00

**Cross-Reference Agreement:**
- High agreement: +0.10
- Medium agreement: +0.05
- Low agreement: 0.00

### Synthesis

**Model:** Reasoning model (qwen2.5:32b or configured alternative)

**Prompt Structure:**
```
SOURCES:
[Academic]: {academic_content}
[Web]: {web_content}
[Newsroom]: {newsroom_content}

QUESTION: {query}

Synthesize findings from ALL sources above.
Cite sources using [Academic], [Web], or [Newsroom] tags.
Highlight key findings and areas of consensus/disagreement.
```

## Performance Optimization

### Parallel Execution

All source searches happen in parallel:
- Academic (7 sources): Parallel
- Web (Brave + DDG): Parallel
- Newsroom: Parallel
- Total: ~8 seconds (vs ~30+ seconds sequential)

### Caching

**Research Results:**
- Cached for 1 hour (general queries)
- Cached for 24 hours (stable topics)
- Cache key: query hash

**Source Data:**
- Academic sources: Cached per query
- Web sources: Cached per query
- Newsroom: Cached per query

## See Also

- [Architecture](/technical-concepts/architecture) - Overall architecture
- [Storage](/technical-concepts/storage) - Storage architecture
- [Research Workflow](/guides/research-workflow) - Usage guide
- [API Reference](/api-reference/research-api) - API documentation
