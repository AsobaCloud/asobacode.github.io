---
title: "Multi-Source Analysis"
layout: default
nav_order: 3
parent: Use Cases
---

# Multi-Source Analysis Use Case

Cross-reference claims across academic papers, web sources, and newsroom articles to verify information and identify consensus or disagreement.

## Scenario

You're researching "renewable energy policy developments in 2025" and need to:
- Verify claims across multiple sources
- Identify areas of consensus
- Find conflicting viewpoints
- Evaluate source credibility

## Step-by-Step Guide

### Step 1: Start Research Query

**Terminal:**
```bash
zorora
[1] ⚙ > What are the latest renewable energy policy developments in 2025?
```

**Web UI:**
1. Open `http://localhost:5000`
2. Enter query: "latest renewable energy policy developments in 2025"
3. Select depth: **Balanced** (for thorough cross-referencing)
4. Click "Start Research"

**API:**
```python
from engine.research_engine import ResearchEngine

engine = ResearchEngine()
state = engine.deep_research(
    "latest renewable energy policy developments in 2025",
    depth=2  # Balanced depth for cross-referencing
)
```

### Step 2: Review Sources

**Source Types:**
- **Academic:** Peer-reviewed papers, preprints
- **Web:** News articles, blog posts, official websites
- **Newsroom:** Asoba energy newsroom articles

**Source Credibility:**
- **High (0.7-1.0):** Government sources, peer-reviewed journals
- **Medium (0.4-0.7):** Reputable news sites, preprints
- **Low (0.0-0.4):** Unverified sources, opinion pieces

**Review Sources:**
```python
# Group sources by type
academic_sources = [s for s in state.sources_checked if s.source_type == "academic"]
web_sources = [s for s in state.sources_checked if s.source_type == "web"]
newsroom_sources = [s for s in state.sources_checked if s.source_type == "newsroom"]

print(f"Academic: {len(academic_sources)}")
print(f"Web: {len(web_sources)}")
print(f"Newsroom: {len(newsroom_sources)}")
```

### Step 3: Analyze Cross-References

**Grouped Claims:**
- Zorora groups similar claims across sources
- Counts agreement
- Identifies consensus
- Highlights disagreements

**Review Findings:**
```python
# High agreement claims (consensus)
high_agreement = [f for f in state.findings if f.agreement_count >= 5]
print(f"Consensus claims: {len(high_agreement)}")

# Low agreement claims (disagreement)
low_agreement = [f for f in state.findings if f.agreement_count <= 2]
print(f"Disputed claims: {len(low_agreement)}")
```

### Step 4: Verify Claims

**Check High-Agreement Claims:**
```python
for finding in high_agreement:
    print(f"Claim: {finding.claim}")
    print(f"Agreement: {finding.agreement_count} sources")
    print(f"Sources: {finding.sources}")
    # Verify by checking source URLs
```

**Investigate Disagreements:**
```python
for finding in low_agreement:
    print(f"Claim: {finding.claim}")
    print(f"Agreement: {finding.agreement_count} sources")
    print(f"Sources: {finding.sources}")
    # Investigate why sources disagree
```

### Step 5: Evaluate Credibility

**Credibility Analysis:**
```python
# High credibility sources
high_cred = [s for s in state.sources_checked if s.credibility_score >= 0.7]
print(f"High credibility sources: {len(high_cred)}")

# Medium credibility sources
med_cred = [s for s in state.sources_checked if 0.4 <= s.credibility_score < 0.7]
print(f"Medium credibility sources: {len(med_cred)}")

# Low credibility sources
low_cred = [s for s in state.sources_checked if s.credibility_score < 0.4]
print(f"Low credibility sources: {len(low_cred)}")
```

### Step 6: Synthesize Analysis

**Synthesis Includes:**
- Comprehensive answer with citations
- Areas of consensus highlighted
- Areas of disagreement noted
- Source credibility considered
- Confidence levels indicated

**Access Synthesis:**
```python
print(state.synthesis)
```

## Example Analysis

### Claim: "Solar energy costs decreased 50% in 2024"

**Cross-Reference Results:**
- **Agreement:** 8 sources agree
- **Sources:**
  - Academic: 3 sources (high credibility)
  - Web: 4 sources (medium credibility)
  - Newsroom: 1 source (high credibility)
- **Consensus:** Strong consensus across source types

### Claim: "Battery storage is cost-effective for grid-scale applications"

**Cross-Reference Results:**
- **Agreement:** 5 sources agree, 3 sources disagree
- **Sources:**
  - Academic: 4 sources agree (high credibility)
  - Web: 1 source agrees, 3 sources disagree (mixed credibility)
- **Consensus:** Moderate consensus, some disagreement

### Claim: "Offshore wind is the future of renewable energy"

**Cross-Reference Results:**
- **Agreement:** 2 sources agree, 6 sources disagree
- **Sources:**
  - Academic: 1 source agrees, 4 sources disagree
  - Web: 1 source agrees, 2 sources disagree
- **Consensus:** Strong disagreement, not consensus

## Best Practices

### Source Evaluation

**Prioritize High-Credibility Sources:**
- Government sources
- Peer-reviewed journals
- Reputable news sites

**Verify Claims:**
- Check multiple sources
- Look for consensus
- Note disagreements

**Consider Context:**
- Publication dates
- Source bias
- Geographic relevance

### Cross-Reference Analysis

**Identify Consensus:**
- High agreement counts indicate consensus
- Multiple source types agreeing strengthens consensus
- High credibility sources agreeing strengthens consensus

**Investigate Disagreements:**
- Low agreement counts indicate disagreement
- Check source credibility
- Consider source bias
- Look for patterns

### Credibility Assessment

**High Credibility (0.7-1.0):**
- Trust for important decisions
- Use as primary sources
- Verify with multiple high-credibility sources

**Medium Credibility (0.4-0.7):**
- Use as supporting sources
- Verify with high-credibility sources
- Consider context

**Low Credibility (0.0-0.4):**
- Use with caution
- Verify independently
- Consider as opinion, not fact

## Advanced Usage

### Comparative Analysis

**Compare Multiple Queries:**
```bash
[1] ⚙ > What are renewable energy policies in Europe?
[2] ⚙ > What are renewable energy policies in North America?
[3] ⚙ > What are renewable energy policies in Asia?
```

**Compare Results:**
- Load multiple research results
- Compare findings
- Identify regional differences

### Trend Analysis

**Track Over Time:**
```bash
# Research same topic multiple times
[1] ⚙ > What are renewable energy policy developments in Q1 2025?
[2] ⚙ > What are renewable energy policy developments in Q2 2025?
```

**Analyze Trends:**
- Compare research results over time
- Identify policy changes
- Track developments

### Source Credibility Tracking

**Monitor Source Credibility:**
```python
# Track credibility scores over time
for research_id in research_history:
    research_data = engine.load_research(research_id)
    sources = research_data['sources_checked']
    avg_credibility = sum(s['credibility_score'] for s in sources) / len(sources)
    print(f"{research_id}: {avg_credibility:.2f}")
```

## Troubleshooting

### No Consensus Found

**Problem:** All claims have low agreement

**Solution:**
- This may indicate a controversial topic
- Check source credibility
- Consider using more sources
- Try different query phrasing

### Conflicting Sources

**Problem:** Sources strongly disagree

**Solution:**
- This is normal for controversial topics
- Check source credibility
- Consider source bias
- Look for patterns in disagreement

### Low Credibility Scores

**Problem:** All sources have low credibility

**Solution:**
- Check query phrasing
- Try different keywords
- Verify source URLs manually
- Consider topic niche

## See Also

- [Research Workflow](/guides/research-workflow) - Deep research guide
- [Technical Concepts](/technical-concepts/research-pipeline) - Pipeline architecture
- [API Reference](/api-reference/research-api) - Programmatic access
