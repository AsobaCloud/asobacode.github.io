---
title: "Academic Research"
layout: default
nav_order: 1
parent: "Patterns"
---

# Academic Research Use Case

Use Zorora's deep research capabilities for comprehensive academic research and literature reviews.

## Scenario

You're writing a research paper on "Recent advances in transformer architectures for natural language processing" and need to:
- Find recent papers on the topic
- Explore citation trails
- Cross-reference claims
- Synthesize findings with citations

<div style="width: 100%; max-width: 800px; margin: 24px auto;">
  <div style="width: 100%; height: 300px; background: var(--background-light); border: 2px dashed var(--border-grey); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--text-light);">
    <span>Academic Research Example Screenshot<br/><small>(Placeholder - Add screenshot showing academic research results with citations and credibility scores)</small></span>
  </div>
</div>

## Step-by-Step Guide

### Step 1: Start Research Query

**Terminal:**
```bash
zorora
[1] ⚙ > What are the latest developments in transformer architectures for natural language processing?
```

**Web UI:**
1. Open `http://localhost:5000`
2. Enter query: "latest developments in transformer architectures for natural language processing"
3. Select depth: **Thorough** (for comprehensive research)
4. Click "Start Research"

**API:**
```python
from engine.research_engine import ResearchEngine

engine = ResearchEngine()
state = engine.deep_research(
    "latest developments in transformer architectures for natural language processing",
    depth=3  # Thorough depth for academic research
)
```

### Step 2: Review Sources

**Academic Sources Found:**
- arXiv papers on transformer architectures
- PubMed articles (if biomedical relevance)
- Google Scholar results
- CORE repository papers

**Source Credibility:**
- High credibility (0.7-1.0): Peer-reviewed journals, well-cited papers
- Medium credibility (0.4-0.7): Preprints, recent papers
- Low credibility (0.0-0.4): Unverified sources

**Review Sources:**
```python
for source in state.sources_checked:
    if source.source_type == "academic":
        print(f"{source.title}: {source.credibility_score:.2f}")
        print(f"  URL: {source.url}")
```

### Step 3: Explore Citation Trails

**Citation Following:**
- Zorora automatically follows citations from initial sources
- Explores cited papers (up to 3 hops deep)
- Builds citation graph
- Identifies key papers

**Access Citation Graph:**
```python
# Citation relationships are stored in research state
# Access via research data
research_data = engine.load_research(state.started_at.strftime("%Y%m%d_%H%M%S"))
citation_graph = research_data.get('citation_graph', {})
```

### Step 4: Cross-Reference Claims

**Grouped Claims:**
- Zorora groups similar claims across sources
- Counts agreement
- Identifies consensus
- Highlights disagreements

**Review Findings:**
```python
for finding in state.findings:
    print(f"Claim: {finding.claim}")
    print(f"Agreement: {finding.agreement_count} sources")
    print(f"Sources: {finding.sources}")
```

### Step 5: Synthesize Findings

**Synthesis Includes:**
- Comprehensive answer with citations
- Key findings highlighted
- Areas of consensus
- Areas of disagreement
- Confidence levels

**Access Synthesis:**
```python
print(state.synthesis)
```

### Step 6: Save Research

**Save for Later:**
```python
research_id = engine.save_research(state)
print(f"Research saved: {research_id}")
```

**Access Later:**
```python
research_data = engine.load_research(research_id)
```

## Example Output

### Synthesis

```
Based on recent research, transformer architectures for natural language processing have seen significant developments in several areas:

**Efficiency Improvements:**
- Sparse attention mechanisms [Academic: arXiv:2024.12345]
- Model compression techniques [Academic: arXiv:2024.67890]
- Efficient training methods [Web: example.com/article]

**Architecture Innovations:**
- Multi-head attention variants [Academic: arXiv:2024.11111]
- Position encoding improvements [Academic: arXiv:2024.22222]

**Key Consensus:**
- Sparse attention is widely accepted as effective [8 sources agree]
- Model compression maintains quality [6 sources agree]

**Areas of Disagreement:**
- Best position encoding method [3 sources disagree]
```

### Sources

**High Credibility Sources:**
- "Efficient Transformers: A Survey" (arXiv:2024.12345) - 0.85
- "Sparse Attention Mechanisms" (Nature ML) - 0.90
- "Transformer Compression Techniques" (ICML 2024) - 0.88

**Medium Credibility Sources:**
- "Recent Transformer Advances" (arXiv:2024.67890) - 0.65
- "Transformer Architecture Survey" (arXiv:2024.11111) - 0.70

## Best Practices

### Query Formulation

**Be Specific:**
- "Recent advances in transformer architectures" ✓
- "AI stuff" ✗

**Include Context:**
- "Transformer architectures for natural language processing" ✓
- "Transformers" ✗

**Use Research Keywords:**
- What, Why, How, Tell me
- Automatically triggers research workflow

### Depth Selection

**Quick (depth=1):**
- Initial research
- Fast answers
- Overview of topic

**Balanced (depth=2):**
- Thorough research
- Citation exploration
- Academic focus

**Thorough (depth=3):**
- Comprehensive research
- Deep citation trails
- Maximum coverage

### Source Evaluation

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

## Advanced Usage

### Multiple Research Queries

**Related Topics:**
```bash
[1] ⚙ > What are the latest developments in transformer architectures?
[2] ⚙ > How do attention mechanisms work in transformers?
[3] ⚙ > What are efficient training methods for transformers?
```

**Compare Results:**
- Load multiple research results
- Compare findings
- Identify trends

### Citation Graph Analysis

**Explore Relationships:**
```python
# Load research with citation graph
research_data = engine.load_research(research_id)
citation_graph = research_data.get('citation_graph', {})

# Identify key papers (most cited)
key_papers = identify_key_papers(citation_graph)
```

### Cross-Reference Verification

**Verify Claims:**
```python
# Find claims with high agreement
high_agreement = [f for f in state.findings if f.agreement_count >= 5]

# Find claims with disagreement
disagreement = [f for f in state.findings if f.agreement_count <= 2]
```

## Troubleshooting

### No Academic Sources Found

**Problem:** Research returns no academic sources

**Solution:**
- Check query phrasing
- Try different keywords
- Verify academic search is working
- Check API connectivity

### Low Credibility Scores

**Problem:** All sources have low credibility

**Solution:**
- This may be normal for niche topics
- Check source URLs manually
- Try different query phrasing
- Consider using Balanced/Thorough depth

### Citation Graph Empty

**Problem:** Citation graph not populated

**Solution:**
- Use depth > 1 (Balanced or Thorough)
- Verify citation following is enabled
- Check research depth setting

## See Also

- [Research Workflow](/guides/research-workflow) - Deep research guide
- [Technical Concepts](/technical-concepts/research-pipeline) - Pipeline architecture
- [API Reference](/api-reference/research-api) - Programmatic access
