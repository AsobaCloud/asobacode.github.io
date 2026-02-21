---
title: "Python SDK"
layout: default
nav_order: 4
parent: "Reference"
---

# Python SDK Reference

High-level Python interface for Zorora's research engine.

## Installation

```bash
pip install git+https://github.com/AsobaCloud/zorora.git
```

Or install from source:

```bash
git clone https://github.com/AsobaCloud/zorora.git
cd zorora
pip install -e .
```

## Quick Start

```python
from engine.research_engine import ResearchEngine

# Initialize research engine
engine = ResearchEngine()

# Execute deep research
state = engine.deep_research("Your research question", depth=1)

# Access results
print(state.synthesis)
print(f"Total sources: {state.total_sources}")
```

## ResearchEngine Class

### Initialization

```python
from engine.research_engine import ResearchEngine
from engine.storage import LocalStorage

# Use default storage
engine = ResearchEngine()

# Or provide custom storage
storage = LocalStorage()
engine = ResearchEngine(storage=storage)
```

### Methods

#### deep_research()

Execute deep research workflow.

**Signature:**
```python
def deep_research(self, query: str, depth: int = 1) -> ResearchState
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Research query string |
| `depth` | integer | No | Research depth (1=Quick, 2=Balanced, 3=Thorough, default: 1) |

**Returns:** `ResearchState` object

**Example:**
```python
state = engine.deep_research("latest developments in LLM architectures", depth=1)
print(state.synthesis)
```

#### save_research()

Save research state to storage.

**Signature:**
```python
def save_research(self, state: ResearchState) -> str
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `state` | ResearchState | Yes | ResearchState to save |

**Returns:** Research ID string

**Example:**
```python
research_id = engine.save_research(state)
print(f"Research saved: {research_id}")
```

#### load_research()

Load research by ID.

**Signature:**
```python
def load_research(self, research_id: str) -> Optional[Dict[str, Any]]
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `research_id` | string | Yes | Research ID from save_research() |

**Returns:** Research data dict or None if not found

**Example:**
```python
research_data = engine.load_research("20250129_143022")
if research_data:
    print(research_data['synthesis'])
```

#### search_research()

Search past research.

**Signature:**
```python
def search_research(self, query: Optional[str] = None, limit: int = 10) -> List[Dict[str, Any]]
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | No | Search query (optional) |
| `limit` | integer | No | Max results (default: 10) |

**Returns:** List of research metadata dicts

**Example:**
```python
# Search past research
results = engine.search_research(query="LLM architectures", limit=10)

# Get recent research
recent = engine.search_research(limit=5)
```

## ResearchState Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `original_query` | string | Original research query |
| `synthesis` | string | Synthesized answer with citations |
| `total_sources` | integer | Total number of sources found |
| `findings` | list | List of Finding objects |
| `sources_checked` | list | List of Source objects |
| `started_at` | datetime | Research start timestamp |
| `completed_at` | datetime | Research completion timestamp |
| `max_depth` | integer | Maximum citation depth |
| `max_iterations` | integer | Maximum workflow iterations |

### Example Usage

```python
state = engine.deep_research("Your research question", depth=1)

# Access synthesis
print(state.synthesis)

# Access sources
for source in state.sources_checked:
    print(f"{source.title}: {source.credibility_score}")

# Access findings
for finding in state.findings:
    print(f"Finding: {finding.claim}")
    print(f"Sources: {finding.sources}")
```

## Source Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `source_id` | string | Unique source identifier |
| `title` | string | Source title |
| `url` | string | Source URL |
| `credibility_score` | float | Credibility score (0.0-1.0) |
| `credibility_category` | string | Credibility category ("high", "medium", "low") |
| `source_type` | string | Source type ("academic", "web", "newsroom") |

### Example Usage

```python
for source in state.sources_checked:
    print(f"Title: {source.title}")
    print(f"URL: {source.url}")
    print(f"Credibility: {source.credibility_score} ({source.credibility_category})")
    print(f"Type: {source.source_type}")
```

## Finding Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `finding_id` | string | Unique finding identifier |
| `claim` | string | Claim text |
| `sources` | list | List of source IDs supporting this claim |
| `agreement_count` | integer | Number of sources agreeing |

### Example Usage

```python
for finding in state.findings:
    print(f"Claim: {finding.claim}")
    print(f"Agreement: {finding.agreement_count} sources")
    print(f"Sources: {finding.sources}")
```

## Storage

### LocalStorage Class

**Location:** `~/.zorora/`

**SQLite Database:** `~/.zorora/zorora.db`
- Fast indexed queries (<100ms)
- Contains metadata, indexed sources, citation graphs

**JSON Files:** `~/.zorora/research/findings/<id>.json`
- Full research state
- Includes sources, findings, synthesis, metadata

### Example: Custom Storage

```python
from engine.storage import LocalStorage

# Use custom storage location
storage = LocalStorage(custom_path="/path/to/storage")
engine = ResearchEngine(storage=storage)
```

## Complete Example

```python
from engine.research_engine import ResearchEngine

# Initialize
engine = ResearchEngine()

# Execute research
state = engine.deep_research(
    "What are the latest developments in transformer architectures?",
    depth=1
)

# Access results
print("Synthesis:")
print(state.synthesis)
print(f"\nTotal sources: {state.total_sources}")

# Review sources
print("\nTop sources:")
for source in state.sources_checked[:5]:
    print(f"- {source.title} ({source.credibility_score:.2f})")
    print(f"  {source.url}")

# Review findings
print("\nKey findings:")
for finding in state.findings[:3]:
    print(f"- {finding.claim}")
    print(f"  Supported by {finding.agreement_count} sources")

# Save research
research_id = engine.save_research(state)
print(f"\nResearch saved: {research_id}")

# Search past research
results = engine.search_research(query="transformer", limit=5)
print(f"\nFound {len(results)} past research results")

# Load specific research
if results:
    research_data = engine.load_research(results[0]['research_id'])
    if research_data:
        print(f"\nLoaded research: {research_data['query']}")
```

## Error Handling

```python
from engine.research_engine import ResearchEngine

engine = ResearchEngine()

try:
    state = engine.deep_research("Your research question", depth=1)
except Exception as e:
    print(f"Research failed: {e}")
    # Handle error
```

## See Also

- [Research API](/api-reference/research-api) - REST API endpoints
- [Research Workflow](/guides/research-workflow) - Research workflow guide
- [Technical Concepts](/technical-concepts/storage) - Storage architecture
