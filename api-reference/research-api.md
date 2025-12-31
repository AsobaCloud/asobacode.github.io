---
title: "Research API"
layout: default
nav_order: 2
parent: API Reference
---

# Research API Reference

Complete API documentation for Zorora's research endpoints.

## Base URL

```
http://localhost:5000
```

## Authentication

**Current:** No authentication required (local deployment)

**Future:** API key authentication for remote deployments

---

## Start Research

Start deep research workflow.

### Endpoint

```
POST /api/research
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Research query string |
| `depth` | integer | No | Research depth (1=Quick, 2=Balanced, 3=Thorough, default: 1) |

### Example Request

```bash
curl -X POST http://localhost:5000/api/research \
  -H "Content-Type: application/json" \
  -d '{
    "query": "latest developments in large language model architectures",
    "depth": 1
  }'
```

### Example Response (200)

```json
{
  "research_id": "20250129_143022",
  "status": "completed",
  "query": "latest developments in large language model architectures",
  "synthesis": "Based on recent research, large language model architectures have seen significant developments...",
  "total_sources": 15,
  "findings_count": 8,
  "sources": [
    {
      "source_id": "source_1",
      "title": "Transformer Architecture Improvements",
      "url": "https://arxiv.org/abs/2024.12345",
      "credibility_score": 0.85,
      "credibility_category": "high",
      "source_type": "academic"
    },
    {
      "source_id": "source_2",
      "title": "Latest LLM Research",
      "url": "https://example.com/article",
      "credibility_score": 0.65,
      "credibility_category": "medium",
      "source_type": "web"
    }
  ],
  "completed_at": "2025-01-29T14:30:22.123456"
}
```

### Error Responses

**400 Bad Request** - Invalid parameters

```json
{
  "error": "Query is required"
}
```

```json
{
  "error": "Depth must be 1, 2, or 3"
}
```

**500 Internal Server Error** - Research execution failed

```json
{
  "error": "Research execution failed: <error message>"
}
```

---

## Get Research Results

Get research results by ID.

### Endpoint

```
GET /api/research/<research_id>
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `research_id` | string | Yes | Research ID from start_research response |

### Example Request

```bash
curl http://localhost:5000/api/research/20250129_143022
```

### Example Response (200)

```json
{
  "research_id": "20250129_143022",
  "query": "latest developments in large language model architectures",
  "synthesis": "Based on recent research...",
  "total_sources": 15,
  "findings": [
    {
      "finding_id": "finding_1",
      "claim": "Transformer architectures have improved",
      "sources": ["source_1", "source_2"],
      "agreement_count": 2
    }
  ],
  "sources": [
    {
      "source_id": "source_1",
      "title": "Transformer Architecture Improvements",
      "url": "https://arxiv.org/abs/2024.12345",
      "credibility_score": 0.85,
      "credibility_category": "high",
      "source_type": "academic"
    }
  ],
  "started_at": "2025-01-29T14:30:22.123456",
  "completed_at": "2025-01-29T14:30:45.789012"
}
```

### Error Responses

**404 Not Found** - Research not found

```json
{
  "error": "Research not found"
}
```

```json
{
  "error": "Research data not found"
}
```

**500 Internal Server Error** - Server error

```json
{
  "error": "Get research error: <error message>"
}
```

---

## Get Research History

Get research history with optional search.

### Endpoint

```
GET /api/research/history
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | integer | No | Maximum number of results (default: 10) |
| `query` | string | No | Search query to filter results |

### Example Request

```bash
# Get recent research history
curl http://localhost:5000/api/research/history?limit=10

# Search research history
curl "http://localhost:5000/api/research/history?query=LLM&limit=5"
```

### Example Response (200)

```json
{
  "results": [
    {
      "research_id": "20250129_143022",
      "query": "latest developments in large language model architectures",
      "created_at": "2025-01-29T14:30:22.123456",
      "total_sources": 15,
      "synthesis_preview": "Based on recent research, large language model architectures..."
    },
    {
      "research_id": "20250129_120000",
      "query": "renewable energy policy",
      "created_at": "2025-01-29T12:00:00.000000",
      "total_sources": 12,
      "synthesis_preview": "Renewable energy policy has evolved..."
    }
  ]
}
```

### Error Responses

**500 Internal Server Error** - Server error

```json
{
  "error": "History error: <error message>"
}
```

---

## Response Fields

### Research Object

| Field | Type | Description |
|-------|------|-------------|
| `research_id` | string | Unique research ID (format: YYYYMMDD_HHMMSS) |
| `status` | string | Research status ("completed") |
| `query` | string | Original research query |
| `synthesis` | string | Synthesized answer with citations |
| `total_sources` | integer | Total number of sources found |
| `findings_count` | integer | Number of findings extracted |
| `sources` | array | List of sources (top 20) |
| `completed_at` | string | ISO 8601 timestamp of completion |

### Source Object

| Field | Type | Description |
|-------|------|-------------|
| `source_id` | string | Unique source identifier |
| `title` | string | Source title |
| `url` | string | Source URL |
| `credibility_score` | float | Credibility score (0.0-1.0) |
| `credibility_category` | string | Credibility category ("high", "medium", "low") |
| `source_type` | string | Source type ("academic", "web", "newsroom") |

---

## Rate Limits

**Current:** No rate limits (local deployment)

**Future:** Rate limits for remote deployments

---

## See Also

- [Settings API](/api-reference/settings-api) - Configuration endpoints
- [Python SDK](/api-reference/python-sdk) - Python SDK documentation
- [Research Workflow](/guides/research-workflow) - Research workflow guide
