---
title: "Credibility Scoring"
layout: default
nav_order: 5
parent: Technical Concepts
---

# Credibility Scoring

Deep dive into Zorora's multi-factor credibility scoring system for research sources.

## Overview

Zorora uses a transparent, rules-based credibility scoring system to evaluate the authority and reliability of sources during deep research. This system helps users understand the quality of information they're receiving and prioritize trustworthy sources.

## How Credibility Scoring Works

The credibility scoring system evaluates sources using multiple factors:

1. **Base Credibility** - Domain/publisher reputation
2. **Citation Modifier** - How often the source is cited
3. **Cross-Reference Modifier** - Agreement with other sources
4. **Override Checks** - Predatory publishers and retractions

### Final Score Calculation

```
Final Score = min(0.95, Base Score × Citation Modifier × Cross-Reference Modifier)
```

The maximum score is capped at 0.95 to acknowledge that no source is perfectly reliable.

---

## Base Credibility Tiers

Sources are categorized into tiers based on their domain and publisher type:

### Tier 1: High-Quality Peer-Reviewed (0.70-0.85)

| Domain | Base Score | Reason |
|--------|------------|--------|
| `nature` | 0.85 | Nature journal (high impact) |
| `science.org` | 0.85 | Science journal (high impact) |
| `nejm.org` | 0.85 | New England Journal of Medicine |
| `thelancet.com` | 0.85 | The Lancet (high impact) |
| `cell.com` | 0.80 | Cell Press journal |
| `pubmed.ncbi` | 0.70 | PubMed indexed (peer-reviewed) |

### Tier 2: Preprints (0.50)

**Important:** Preprints are NOT automatically credible - they have not undergone peer review.

| Domain | Base Score | Reason |
|--------|------------|--------|
| `arxiv.org` | 0.50 | ArXiv preprint (NOT peer-reviewed) |
| `biorxiv.org` | 0.50 | bioRxiv preprint (NOT peer-reviewed) |
| `medrxiv.org` | 0.50 | medRxiv preprint (NOT peer-reviewed) |
| `doi:` | 0.65 | Has DOI (may be peer-reviewed) |

### Tier 3: Government Sources (0.75-0.85)

| Domain | Base Score | Reason |
|--------|------------|--------|
| `.gov` | 0.85 | Government source |
| `.edu` | 0.75 | Educational institution |
| `europa.eu` | 0.80 | European Union |
| `un.org` | 0.80 | United Nations |

### Tier 4: Curated News (0.75)

| Domain | Base Score | Reason |
|--------|------------|--------|
| `newsroom:` | 0.75 | Asoba curated newsroom |
| `asoba.co/newsroom` | 0.75 | Asoba newsroom |

### Tier 5: Major News (0.60-0.70)

| Domain | Base Score | Reason |
|--------|------------|--------|
| `reuters.com` | 0.70 | Reuters (news wire) |
| `bloomberg.com` | 0.70 | Bloomberg (financial news) |
| `apnews.com` | 0.70 | Associated Press |
| `bbc.com` | 0.65 | BBC News |
| `wsj.com` | 0.65 | Wall Street Journal |

### Tier 6: General Web (0.25-0.40)

| Domain | Base Score | Reason |
|--------|------------|--------|
| `medium.com` | 0.40 | Blog platform |
| `substack.com` | 0.40 | Newsletter platform |
| `reddit.com` | 0.25 | User-generated content |

### Unknown Sources (0.50)

Sources not matching any known domain receive a base score of 0.50.

---

## Citation Modifier

The number of citations a source has received affects its credibility:

| Citation Count | Modifier | Effect |
|----------------|----------|--------|
| 0 | 0.80 | -20% (no citations) |
| 1-9 | 0.90 | -10% (few citations) |
| 10-99 | 1.00 | No change |
| 100-999 | 1.10 | +10% (well-cited) |
| 1000+ | 1.20 | +20% (highly cited) |

**Logarithmic scaling:** More citations = higher credibility, but with diminishing returns.

---

## Cross-Reference Modifier

When multiple sources agree on a claim, credibility increases:

| Agreement Count | Modifier | Effect |
|-----------------|----------|--------|
| 1 (single source) | 0.90 | -10% (unverified) |
| 2-3 sources | 1.00 | No change |
| 4-6 sources | 1.10 | +10% (corroborated) |
| 7+ sources | 1.15 | +15% (consensus) |

**Cross-referencing:** Claims supported by multiple independent sources are more reliable.

---

## Override Checks

### Predatory Publishers

Sources from known predatory publishers are automatically assigned a score of **0.20** regardless of other factors.

**Known predatory publishers:**
- scirp.org
- waset.org
- omicsonline.org
- hilarispublisher.com
- austinpublishinggroup.com
- crimsonpublishers.com
- lupinepublishers.com

### Retracted Papers

Papers that have been retracted are assigned a score of **0.0**.

**Known retractions include:**
- Wakefield MMR-autism paper (10.1016/S0140-6736(97)11096-0) - retracted 2010

---

## Score Interpretation

### High Credibility (0.70-0.95)

- Peer-reviewed academic journals
- Well-cited papers
- Government sources
- Multiple source agreement

**Use these sources with confidence.**

### Medium Credibility (0.40-0.70)

- Preprints (awaiting peer review)
- Reputable news sources
- Moderately cited papers
- Limited cross-referencing

**Verify claims from these sources when possible.**

### Low Credibility (0.00-0.40)

- Unverified sources
- User-generated content
- Predatory publishers
- Low citation counts

**Treat claims from these sources with skepticism.**

---

## Example Calculations

### Example 1: Nature Paper with High Citations

```
Source: Nature journal article
Base Score: 0.85 (Nature = high impact)
Citations: 500
Cross-references: 4 sources agree

Calculation:
- Citation modifier: 1.10 (100-999 citations)
- Cross-ref modifier: 1.10 (4-6 sources)
- Final: min(0.95, 0.85 × 1.10 × 1.10) = 0.95

Breakdown: Base: 0.85 (Nature journal) | Citations: 1.10x (500 cites) | Cross-refs: 1.10x (4 sources) → 0.95
```

### Example 2: ArXiv Preprint

```
Source: arXiv preprint
Base Score: 0.50 (preprint, NOT peer-reviewed)
Citations: 5
Cross-references: 1 source

Calculation:
- Citation modifier: 0.90 (1-9 citations)
- Cross-ref modifier: 0.90 (single source)
- Final: min(0.95, 0.50 × 0.90 × 0.90) = 0.405

Breakdown: Base: 0.50 (ArXiv preprint) | Citations: 0.90x (5 cites) | Cross-refs: 0.90x (1 source) → 0.41
```

### Example 3: Well-Cited Government Report

```
Source: .gov domain
Base Score: 0.85 (government)
Citations: 1500
Cross-references: 8 sources agree

Calculation:
- Citation modifier: 1.20 (1000+ citations)
- Cross-ref modifier: 1.15 (7+ sources)
- Final: min(0.95, 0.85 × 1.20 × 1.15) = 0.95 (capped)

Breakdown: Base: 0.85 (Government source) | Citations: 1.20x (1500 cites) | Cross-refs: 1.15x (8 sources) → 0.95
```

---

## Using Credibility Scores

### In Research Results

When viewing research results, you'll see:

- **Credibility Score** - Numerical score (0.0-0.95)
- **Category** - Source type description
- **Breakdown** - Explanation of score calculation

### Best Practices

1. **Prioritize high-credibility sources** for critical decisions
2. **Cross-reference claims** from medium-credibility sources
3. **Be skeptical** of low-credibility sources
4. **Consider recency** - recent preprints may be more current than older papers
5. **Check original sources** when possible

### Limitations

- Credibility scoring is **heuristic-based**, not infallible
- New or niche domains may be scored conservatively
- Citation counts favor older papers
- Quality of specific claims still requires human judgment

---

## API Access

### Programmatic Credibility Scoring

```python
from workflows.deep_research.credibility import score_source_credibility

result = score_source_credibility(
    url="https://www.nature.com/articles/...",
    citation_count=250,
    cross_reference_count=4,
    publication_year=2024,
    source_title="My Paper Title"
)

print(result)
# {
#     "score": 0.95,
#     "base_score": 0.85,
#     "category": "Nature journal (high impact)",
#     "modifiers": {"citation": 1.10, "cross_reference": 1.10},
#     "breakdown": "Base: 0.85 (Nature journal) | Citations: 1.10x (250 cites) | Cross-refs: 1.10x (4 sources) → 0.95"
# }
```

### In Research State

```python
from engine.research_engine import ResearchEngine

engine = ResearchEngine()
state = engine.deep_research("Your query", depth=1)

# Access sources with credibility scores
for source in state.sources_checked:
    print(f"{source.title}: {source.credibility_score:.2f} ({source.credibility_category})")

# Get most authoritative sources (credibility + citation centrality)
top_sources = state.get_authoritative_sources(top_n=5)
```

---

## See Also

- [Research Workflow](/guides/research-workflow) - Deep research capabilities
- [Research Pipeline](/technical-concepts/research-pipeline) - Pipeline architecture
- [API Reference](/api-reference/research-api) - Programmatic access
- [Slash Commands](/guides/slash-commands) - `/deep` command reference
