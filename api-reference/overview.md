---
title: "API Reference Overview"
layout: default
nav_order: 4
parent: API Reference
---

# API Reference Overview

Complete API documentation for Zorora's programmatic interfaces.

## What You Can Find Here

This section provides comprehensive API documentation for:

- **Research API** - Start research, get results, browse history
- **Settings API** - Configure models, endpoints, and API keys
- **Python SDK** - High-level Python interface for research engine

## Quick Start

### Research API Example

```bash
# Start research
curl -X POST http://localhost:5000/api/research \
  -H "Content-Type: application/json" \
  -d '{"query": "latest LLM developments", "depth": 1}'
```

### Python SDK Example

```python
from engine.research_engine import ResearchEngine

engine = ResearchEngine()
state = engine.deep_research("Your research question", depth=1)
print(state.synthesis)
```

## API Endpoints

### Research Endpoints

- `POST /api/research` - Start deep research workflow
- `GET /api/research/<research_id>` - Get research results by ID
- `GET /api/research/history` - Get research history

### Settings Endpoints

- `GET /api/settings/config` - Read configuration
- `POST /api/settings/config` - Write configuration
- `GET /api/settings/models` - List available models
- `GET /api/settings/endpoints` - List endpoints
- `POST /api/settings/endpoint` - Add/edit endpoint
- `DELETE /api/settings/endpoint/<key>` - Delete endpoint

## Python SDK

The Python SDK provides a high-level interface for programmatic access:

**Research Engine:**
- Start research
- Load past research
- Search research history
- Execute deep research workflow

**Storage:**
- SQLite database for fast queries
- JSON files for full research state
- Automatic persistence

## Authentication

**Current:** No authentication required (local deployment)

**Future:** API key authentication for remote deployments

## Rate Limits

**Current:** No rate limits (local deployment)

**Future:** Rate limits for remote deployments

## Error Handling

All endpoints return standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found (research ID not found)
- `500` - Internal Server Error

Error responses include error message:

```json
{
  "error": "Query is required"
}
```

## Next Steps

- **[Research API](/api-reference/research-api)** - Research endpoint documentation
- **[Settings API](/api-reference/settings-api)** - Settings endpoint documentation
- **[Python SDK](/api-reference/python-sdk)** - Python SDK documentation

## See Also

- [Getting Started](/getting-started) - Installation and setup
- [Guides](/guides/overview) - Usage guides
- [Technical Concepts](/technical-concepts/overview) - Architecture documentation
