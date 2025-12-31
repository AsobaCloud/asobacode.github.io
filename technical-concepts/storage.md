---
title: "Storage"
layout: default
nav_order: 3
parent: Technical Concepts
---

# Storage Architecture

Local-first storage architecture using SQLite and JSON files.

## Overview

Zorora uses a dual-storage approach for research data:
- **SQLite database** - Fast indexed queries for metadata
- **JSON files** - Full research state for complete data

All storage is local-first, ensuring complete privacy and control.

## Storage Location

**Base Directory:** `~/.zorora/`

**SQLite Database:** `~/.zorora/zorora.db`

**JSON Files:** `~/.zorora/research/findings/<research_id>.json`

## Storage Architecture

```
Research Request
    ↓
ResearchEngine.deep_research()
    ↓
DeepResearchWorkflow.execute()
    ↓
LocalStorage.save_research()
    ├─► SQLite Index (~/.zorora/zorora.db)
    │   ├─► research_findings (metadata)
    │   ├─► sources (indexed)
    │   └─► citations (graph)
    └─► JSON Files (~/.zorora/research/findings/<id>.json)
        └─► Full research state (sources, findings, synthesis)
```

## SQLite Database Schema

### research_findings Table

| Column | Type | Description |
|--------|------|-------------|
| `research_id` | TEXT PRIMARY KEY | Unique research ID (format: YYYYMMDD_HHMMSS) |
| `query` | TEXT | Original research query |
| `synthesis` | TEXT | Synthesized answer |
| `total_sources` | INTEGER | Total number of sources |
| `findings_count` | INTEGER | Number of findings |
| `depth` | INTEGER | Research depth used |
| `started_at` | TEXT | ISO 8601 timestamp |
| `completed_at` | TEXT | ISO 8601 timestamp |

### sources Table

| Column | Type | Description |
|--------|------|-------------|
| `source_id` | TEXT PRIMARY KEY | Unique source identifier |
| `research_id` | TEXT | Foreign key to research_findings |
| `title` | TEXT | Source title |
| `url` | TEXT | Source URL |
| `credibility_score` | REAL | Credibility score (0.0-1.0) |
| `credibility_category` | TEXT | Credibility category ("high", "medium", "low") |
| `source_type` | TEXT | Source type ("academic", "web", "newsroom") |

### citations Table

| Column | Type | Description |
|--------|------|-------------|
| `citation_id` | TEXT PRIMARY KEY | Unique citation identifier |
| `research_id` | TEXT | Foreign key to research_findings |
| `source_id` | TEXT | Foreign key to sources |
| `cited_by` | TEXT | Source ID that cites this source |
| `depth` | INTEGER | Citation depth |

## JSON File Structure

**Location:** `~/.zorora/research/findings/<research_id>.json`

**Structure:**
```json
{
  "research_id": "20250129_143022",
  "original_query": "Your research question",
  "synthesis": "Synthesized answer with citations...",
  "total_sources": 15,
  "findings": [
    {
      "finding_id": "finding_1",
      "claim": "Claim text",
      "sources": ["source_1", "source_2"],
      "agreement_count": 2
    }
  ],
  "sources_checked": [
    {
      "source_id": "source_1",
      "title": "Source title",
      "url": "https://example.com",
      "credibility_score": 0.85,
      "credibility_category": "high",
      "source_type": "academic"
    }
  ],
  "started_at": "2025-01-29T14:30:22.123456",
  "completed_at": "2025-01-29T14:30:45.789012",
  "max_depth": 1,
  "max_iterations": 5
}
```

## Storage Operations

### Save Research

**Method:** `LocalStorage.save_research(state: ResearchState) -> str`

**What happens:**
1. Generate research ID (format: YYYYMMDD_HHMMSS)
2. Save metadata to SQLite (`research_findings` table)
3. Save sources to SQLite (`sources` table)
4. Save citations to SQLite (`citations` table)
5. Save full state to JSON file

**Returns:** Research ID string

### Load Research

**Method:** `LocalStorage.load_research(research_id: str) -> Optional[Dict]`

**What happens:**
1. Load JSON file: `~/.zorora/research/findings/<research_id>.json`
2. Return full research state as dict

**Returns:** Research data dict or None if not found

### Search Research

**Method:** `LocalStorage.search_research(query: Optional[str], limit: int) -> List[Dict]`

**What happens:**
1. Query SQLite `research_findings` table
2. Filter by query (if provided)
3. Order by `completed_at` DESC
4. Limit results
5. Return metadata list

**Returns:** List of research metadata dicts

## Performance

### SQLite Queries

**Indexed Queries:** <100ms
- Research metadata lookup
- Source search
- Citation graph queries

**Full Table Scans:** <500ms
- Research history search
- Source filtering

### JSON File I/O

**Read:** <50ms
- Load full research state
- Parse JSON

**Write:** <100ms
- Save full research state
- Write JSON file

## Data Models

### ResearchState

**Properties:**
- `original_query` - Original research query
- `synthesis` - Synthesized answer
- `total_sources` - Total number of sources
- `findings` - List of Finding objects
- `sources_checked` - List of Source objects
- `started_at` - Research start timestamp
- `completed_at` - Research completion timestamp
- `max_depth` - Maximum citation depth
- `max_iterations` - Maximum workflow iterations

### Source

**Properties:**
- `source_id` - Unique source identifier
- `title` - Source title
- `url` - Source URL
- `credibility_score` - Credibility score (0.0-1.0)
- `credibility_category` - Credibility category
- `source_type` - Source type

### Finding

**Properties:**
- `finding_id` - Unique finding identifier
- `claim` - Claim text
- `sources` - List of source IDs
- `agreement_count` - Number of sources agreeing

## Privacy & Security

### Local-Only Storage

- All data stored locally
- No cloud synchronization
- No external data transmission
- Complete privacy

### Data Ownership

- User owns all data
- No data sharing
- No analytics
- Complete control

## Backup & Recovery

### Automatic Backup

Config file backups created automatically before writes:
- Location: `~/.zorora/config.backup`
- Created before each config write
- Preserves previous configuration

### Manual Backup

**Backup SQLite:**
```bash
cp ~/.zorora/zorora.db ~/.zorora/zorora.db.backup
```

**Backup JSON Files:**
```bash
cp -r ~/.zorora/research ~/.zorora/research.backup
```

### Recovery

**Restore SQLite:**
```bash
cp ~/.zorora/zorora.db.backup ~/.zorora/zorora.db
```

**Restore JSON Files:**
```bash
cp -r ~/.zorora/research.backup ~/.zorora/research
```

## See Also

- [Architecture](/technical-concepts/architecture) - Overall architecture
- [Research Pipeline](/technical-concepts/research-pipeline) - Pipeline details
- [Python SDK](/api-reference/python-sdk) - Storage API documentation
