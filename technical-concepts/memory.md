---
title: "Research Memory"
layout: default
nav_order: 5
parent: "Learn"
---

# Research Memory

How Zorora persists user feedback, chat threads, and internal knowledge across sessions.

## Overview

Research Memory is the subsystem that lets Zorora learn from its own output. Where the [Storage layer]({{ site.baseurl }}/technical-concepts/storage) persists research findings and source metadata, Research Memory handles three complementary concerns:

1. **Feedback** — users rate individual chat responses (thumbs up/down), signalling quality
2. **Chat Thread Persistence** — conversation turns survive application restarts
3. **Scouting RAG Injection** — completed feasibility studies from the Scouting pipeline are automatically surfaced as internal sources during new deep research queries

All three features store data in the same SQLite database (`~/.zorora/zorora.db`) used by the rest of the platform.

## Feedback

Every response in a Deep Research chat session can be rated with a thumbs-up or thumbs-down. Ratings are persisted immediately and survive restarts.

### How It Works

```
User reads assistant response
    ↓
Clicks thumbs-up or thumbs-down
    ↓
POST /api/research/<research_id>/chat/<message_id>/feedback
    { "rating": "up" | "down" }
    ↓
Upsert into research_feedback table
    (re-rating the same message overwrites the previous rating)
```

### Schema: `research_feedback`

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PRIMARY KEY | Auto-increment row ID |
| `research_id` | TEXT NOT NULL | Research session that owns the message |
| `message_id` | TEXT NOT NULL | Individual message being rated |
| `rating` | TEXT NOT NULL | `'up'` or `'down'` (CHECK constraint) |
| `created_at` | TIMESTAMP | Defaults to current UTC time; updated on re-rate |

**Constraints:** `UNIQUE (research_id, message_id)` — one rating per message, upsert semantics.

**Index:** `idx_feedback_research ON research_feedback(research_id)` for fast lookup of all ratings in a session.

### API

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/research/<id>/chat/<msg_id>/feedback` | `{"rating": "up"}` or `{"rating": "down"}` | `{"status": "ok"}` |

Returns `400` if rating is not `up` or `down`.

## Chat Thread Persistence

Every user question and assistant response in a Deep Research chat is written to SQLite as it happens. When the application restarts and the user reopens a research session, the full conversation is restored.

### How It Works

```
User sends message  ──►  append_chat_turn(thread_key, "user", content)
    ↓
Assistant responds  ──►  append_chat_turn(thread_key, "assistant", content)
    ↓
On restart / reload  ──►  GET /api/research/<id>/chat/history
    ↓
load_chat_thread(thread_key)  ──►  returns all turns in insertion order
```

The thread key format is `research:<research_id>`, binding each thread to its parent research session.

### Schema: `research_chat_history`

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PRIMARY KEY | Auto-increment row ID (insertion order) |
| `thread_key` | TEXT NOT NULL | Thread identifier (`research:<research_id>`) |
| `role` | TEXT NOT NULL | `'user'` or `'assistant'` |
| `content` | TEXT NOT NULL | Full message text |
| `created_at` | TIMESTAMP | Defaults to current UTC time |

**Index:** `idx_chat_thread ON research_chat_history(thread_key)` for fast thread retrieval.

### API

| Method | Endpoint | Response |
|--------|----------|----------|
| GET | `/api/research/<id>/chat/history` | `{"history": [{"role": "user", "content": "...", "at": "..."}, ...]}` |

## Scouting RAG Injection

When a user runs a Deep Research query, Zorora automatically checks whether any completed Scouting feasibility studies are relevant. If they are, those findings are injected as internal sources alongside the usual academic, web, and newsroom results.

This creates a knowledge compounding loop: work done in the Scouting pipeline feeds back into future research, so the platform gets smarter with use.

### How It Works

```
Deep Research query
    ↓
aggregate_sources(query, ..., imaging_store)
    ↓
scouting_knowledge_sources(query, imaging_store)
    ├─► Retrieve items at qualifying stages:
    │     feasibility, diligence, decision
    ├─► For each item, build a text haystack from:
    │     asset name, technology, country, feasibility findings
    ├─► Tokenize query and haystack
    ├─► Compute keyword overlap (tokens > 3 characters)
    └─► If meaningful overlap exists → create Source object
    ↓
Injected as source_type: "internal"
    URL scheme: scouting://brownfield/<item_id>
    Title: "[Internal] <asset_name> — Scouting Feasibility"
    Snippet: first 300 chars of feasibility findings
```

### Qualifying Stages

Not all scouting items are eligible. Only items that have progressed to one of these stages contain substantive analysis worth injecting:

| Stage | What It Contains |
|-------|-----------------|
| **feasibility** | 5-tab analysis (production, trading, grid, regulatory, financial) |
| **diligence** | Domain-specific due diligence findings |
| **decision** | Final investment decision summary |

Items at earlier stages (screening, origination) are excluded because they lack analytical depth.

### Relevance Matching

Relevance is determined by keyword overlap between the research query and the scouting item's metadata:

1. Both the query and each item's combined text (name + technology + country + findings) are lowercased and tokenized by whitespace
2. Tokens of 3 characters or fewer are discarded (removes "the", "and", "in", etc.)
3. If the intersection of remaining tokens is non-empty, the item is considered relevant

This is a lightweight heuristic — it favours recall over precision, on the assumption that surfacing a marginally relevant internal source is better than missing a directly relevant one.

### What the User Sees

Internal sources appear in the research results alongside external sources. They are distinguished by:

- **Source type:** `internal` (vs. `academic`, `web`, or `newsroom`)
- **URL scheme:** `scouting://brownfield/<id>` (not a clickable web URL)
- **Title prefix:** `[Internal]`

## Architecture Diagram

```
                        ┌─────────────────────┐
                        │   Deep Research UI   │
                        │                      │
                        │  [thumbs up/down]    │
                        │  [chat input]        │
                        └──────┬───────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
          ┌─────────────────┐   ┌─────────────────┐
          │  Feedback API   │   │   Chat API      │
          │  POST .../      │   │  POST .../chat  │
          │  feedback       │   │  GET .../history │
          └────────┬────────┘   └────────┬────────┘
                   │                     │
                   ▼                     ▼
          ┌──────────────────────────────────────┐
          │          SQLite (zorora.db)           │
          │                                      │
          │  research_feedback    research_chat   │
          │  ┌──────────────┐    _history         │
          │  │ research_id  │    ┌─────────────┐  │
          │  │ message_id   │    │ thread_key  │  │
          │  │ rating       │    │ role        │  │
          │  │ created_at   │    │ content     │  │
          │  └──────────────┘    │ created_at  │  │
          │                      └─────────────┘  │
          └──────────────────────────────────────┘

          ┌──────────────────────────────────────┐
          │       Source Aggregation Pipeline     │
          │                                      │
          │  academic ──┐                        │
          │  web ───────┤                        │
          │  newsroom ──┤── all_sources ──► ...  │
          │  scouting ──┘                        │
          │  (internal)   ▲                      │
          │               │                      │
          │    scouting_knowledge_sources()       │
          │    reads from imaging_store            │
          └──────────────────────────────────────┘
```

## See Also

- [Storage]({{ site.baseurl }}/technical-concepts/storage) — SQLite schema for research findings, sources, and citations
- [Architecture]({{ site.baseurl }}/technical-concepts/architecture) — System design overview including the memory layer
- [Research Pipeline]({{ site.baseurl }}/technical-concepts/research-pipeline) — The 6-phase pipeline that memory feeds into
