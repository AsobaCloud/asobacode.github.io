---
title: "Database"
layout: default
parent: "Nehanda CLI"
nav_order: 13
---

# Database

Nehanda CLI persists all session state in a local SQLite database. You own this data — no cloud dependency for persistence. The database uses WAL (Write-Ahead Logging) mode for concurrent read performance.

## Location

| Setting | Value |
|---------|-------|
| Default path | `~/.config/nehanda/ona-session.db` |
| Override | `AGENT_SDLC_DB` environment variable |

## Database Characteristics

- **WAL journal mode** — readers don't block writers, writers don't block readers
- **Foreign keys** enabled
- **Busy timeout** 30 seconds (handles concurrent access)
- **FTS5** full-text search index on the memories table
- **Schema versioning** via `schema_meta` table (current: v3)
- **Jev-Mem graph** — `memories` + `memory_edges` form a multi-relational graph (semantic / temporal / causal / entity edges) managed by the Laya System-1 control plane
- **Pinned context** — `pinned_context` table stores session-scoped invariants that survive compaction unchanged

## Schema Reference

### `schema_meta`

Key-value store for schema metadata.

| Column | Type | Description |
|--------|------|-------------|
| `key` | TEXT PK | Metadata key (e.g. `schema_version`) |
| `value` | TEXT | Metadata value |

### `conversations`

One row per conversation. Tracks the active SDLC phase and project root.

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT PK | Conversation UUID |
| `project_dir` | TEXT | Working directory path |
| `created_at` | TEXT | ISO timestamp |
| `last_active` | TEXT | ISO timestamp (updated on each turn) |
| `phase` | TEXT | Current SDLC phase (default: `idle`) |

### `sessions`

One row per session (a session is a single `runUserTurn` invocation). Multiple sessions can belong to one conversation.

| Column | Type | Description |
|--------|------|-------------|
| `session_id` | TEXT PK | Session UUID |
| `conversation_id` | TEXT FK | Parent conversation |
| `started_at` | TEXT | ISO timestamp |

### `transcript_entries`

The complete audit trail. Every user message, assistant response, tool call, and tool result is stored here as a sequence.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PK | Auto-increment |
| `session_id` | TEXT FK | Parent session |
| `sequence` | INTEGER | Order within session (unique with session_id) |
| `parent_entry_id` | INTEGER FK | Self-referential (for threading) |
| `entry_type` | TEXT | `user`, `assistant`, or `tool_result` |
| `payload_json` | TEXT | Full message content as JSON |
| `tool_use_id` | TEXT | Links tool_result to its tool_use |
| `created_at` | TEXT | ISO timestamp |

### `plans`

SDLC plans created during the planning phase. Only approved plans are used.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PK | Auto-increment |
| `conversation_id` | TEXT | Parent conversation |
| `file_path` | TEXT | Optional file path reference |
| `content` | TEXT | Full plan text |
| `hash` | TEXT | Content hash for deduplication |
| `status` | TEXT | `draft` or `approved` |
| `created_at` | TEXT | ISO timestamp |
| `approved_at` | TEXT | ISO timestamp (set on approval) |
| `completed_at` | TEXT | ISO timestamp |

### `events`

SDLC milestones, subagent events, and task outputs.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PK | Auto-increment |
| `conversation_id` | TEXT | Parent conversation |
| `session_id` | TEXT | Session that triggered the event |
| `timestamp` | TEXT | ISO timestamp |
| `event_type` | TEXT | Event name (e.g. `subagent_start`, `task_output`, `CwdChanged`) |
| `detail` | TEXT | Event-specific detail (often JSON) |

### `state`

Key-value store for per-conversation state (todos, worktree info, etc.).

| Column | Type | Description |
|--------|------|-------------|
| `conversation_id` | TEXT | Part of composite PK |
| `key` | TEXT | Part of composite PK (e.g. `todo:item-1`) |
| `value` | TEXT | JSON-encoded value |
| `updated_at` | TEXT | ISO timestamp |

### `memories` + `memories_fts`

Long-term memory storage with full-text search. The FTS5 virtual table indexes `title`, `content`, `keywords`, and `anticipated_queries` using Porter stemming with Unicode 6.1 support.

This table is the canonical node store for the Jev-Mem memory architecture. Each row represents one observation (user turn, tool result, or assistant response) with overlapping type scores across four memory types.

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT PK | Memory UUID |
| `type` | TEXT | Memory type classifier (`jev_observation`, etc.) |
| `title` | TEXT | Short title |
| `content` | TEXT | Full memory content |
| `keywords` | TEXT | Search keywords |
| `anticipated_queries` | TEXT | Queries this memory should match |
| `concept_tags` | TEXT | Concept classification tags |
| `project_scope` | TEXT | Project scope boundary |
| `correction_count` | INTEGER | Times this memory was corrected (default: 1) |
| `created_at` | INTEGER | Unix timestamp |
| `updated_at` | INTEGER | Unix timestamp |
| `last_accessed` | INTEGER | Unix timestamp |
| `access_count` | INTEGER | Number of accesses (default: 0) |
| `attention_score` | REAL | Relevance score (default: 0.5) |
| `session_id` | TEXT | Session that created this observation |
| `conversation_id` | TEXT | Parent conversation |
| `provenance` | TEXT | Source of observation (`hot_path`, `manual`, etc.) |
| `entities_json` | TEXT | JSON-encoded entity tags |
| `t_episodic` | REAL | Episodic type score (0–1) |
| `t_semantic` | REAL | Semantic type score (0–1) |
| `t_procedural` | REAL | Procedural type score (0–1) |
| `t_preference` | REAL | Preference type score (0–1) |
| `source_entry_id` | INTEGER | FK to `transcript_entries` |
| `observation_ts` | INTEGER | Unix timestamp of original observation |

### `memory_edges`

Multi-relational graph edges for the Jev-Mem memory graph. The same node pair may have independent edges of different relation types.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PK | Auto-increment |
| `src_id` | TEXT | Source memory node ID |
| `dst_id` | TEXT | Destination memory node ID |
| `relation` | TEXT | Edge type: `semantic`, `temporal`, `causal`, or `entity` |
| `weight` | REAL | Edge weight (probability from Laya relation judgment) |
| `meta_json` | TEXT | Additional edge metadata (JSON) |
| `created_at` | INTEGER | Unix timestamp |

### `laya_jev_state`

System-1 canonical session control block. One row per session, updated on every turn by the Laya control plane.

| Column | Type | Description |
|--------|------|-------------|
| `session_id` | TEXT PK | Session identifier |
| `task_status` | TEXT | Current task state: `investigating`, `modifying_code`, `awaiting_user`, `verifying`, `blocked`, or `idle` |
| `file_target` | TEXT | Primary file being modified (null if none) |
| `escalation_risk` | INTEGER | 0 or 1 — whether Laya flagged escalation risk |
| `confidence_score` | REAL | Laya confidence in current state assessment (0–1) |
| `state_json` | TEXT | Full state snapshot as JSON |
| `updated_at` | TEXT | ISO timestamp |

### `pinned_context`

Session-scoped domain invariants that survive context compaction unchanged. Used to persist ODSE schema mappings, asset capacity limits, simulation bounds, and other constants that must not be distilled or discarded during long sessions.

Unlike `memories`, pinned blocks are never passed to the distillation summariser. They are reattached verbatim at the start of every System-2 prompt, before the canonical Jev-Mem header and retrieved evidence.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PK | Auto-increment |
| `session_id` | TEXT | Parent session |
| `key` | TEXT | Unique string key (e.g. `odse_schema`, `asset_spec`) |
| `content` | TEXT | Invariant content (verbatim) |
| `created_at` | INTEGER | Unix timestamp |

`(session_id, key)` is unique — upserts replace existing content for the same key.

### `hook_invocations`

Complete log of every hook execution. Every hook that fires (whether it matched, skipped, or ran) is recorded.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PK | Auto-increment |
| `session_id` | TEXT | Parent session |
| `conversation_id` | TEXT | Parent conversation |
| `hook_event` | TEXT | Event name (e.g. `PreToolUse`) |
| `hook_ordinal` | INTEGER | Order within the event's hook chain |
| `matcher` | TEXT | The matcher string used |
| `command` | TEXT | The shell command that was run |
| `tool_use_id` | TEXT | Related tool call ID (for tool events) |
| `tool_name` | TEXT | Related tool name (for tool events) |
| `input_json` | TEXT | Full JSON input sent to the hook via stdin |
| `exit_code` | INTEGER | Hook's exit code (null if skipped) |
| `stdout_text` | TEXT | Hook's stdout (capped at 4 MB) |
| `stderr_text` | TEXT | Hook's stderr (capped at 4 MB) |
| `started_at` | TEXT | ISO timestamp |
| `completed_at` | TEXT | ISO timestamp |
| `skipped_reason` | TEXT | Why the hook was skipped (null if ran) |

### `tool_permission_log`

Every permission decision, regardless of outcome.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PK | Auto-increment |
| `session_id` | TEXT | Parent session |
| `tool_use_id` | TEXT | Tool call ID |
| `tool_name` | TEXT | Tool name |
| `decision` | TEXT | `allow`, `deny`, or `ask` |
| `reason_json` | TEXT | Additional context |
| `created_at` | TEXT | ISO timestamp |

### `settings_snapshot`

Effective settings after merge. Updated by `/config` commands and on bootstrap.

| Column | Type | Description |
|--------|------|-------------|
| `scope` | TEXT PK | Always `'effective'` |
| `json` | TEXT | Full settings JSON |
| `updated_at` | TEXT | ISO timestamp |

### `summaries`

Conversation summaries for context compaction.

| Column | Type | Description |
|--------|------|-------------|
| `conversation_id` | TEXT PK | Parent conversation |
| `content` | TEXT | Summary text |
| `word_count` | INTEGER | Summary length |
| `created_at` | TEXT | ISO timestamp |

### `task_ratings`

User ratings of task outcomes.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PK | Auto-increment |
| `conversation_id` | TEXT | Parent conversation |
| `rating` | INTEGER | User rating |
| `objective` | TEXT | Task objective |
| `timestamp` | TEXT | ISO timestamp |

## Useful Queries

### Recent conversation turns

```sql
SELECT entry_type, 
       json_extract(payload_json, '$.content') AS preview,
       created_at
FROM transcript_entries
WHERE session_id = '<session-id>'
ORDER BY sequence DESC
LIMIT 20;
```

### Tool calls in a session

```sql
SELECT json_extract(payload_json, '$.content[0].name') AS tool,
       json_extract(payload_json, '$.content[0].input') AS input,
       created_at
FROM transcript_entries
WHERE session_id = '<session-id>'
  AND entry_type = 'assistant'
  AND payload_json LIKE '%tool_use%'
ORDER BY sequence;
```

### Permission audit

```sql
SELECT tool_name, decision, created_at
FROM tool_permission_log
ORDER BY created_at DESC
LIMIT 50;
```

### Hook execution log

```sql
SELECT hook_event, matcher, command, exit_code, 
       substr(stdout_text, 1, 200) AS stdout_preview,
       skipped_reason
FROM hook_invocations
ORDER BY id DESC
LIMIT 50;
```

### Full-text search memories

```sql
SELECT title, content, rank
FROM memories_fts
WHERE memories_fts MATCH 'error handling'
ORDER BY rank;
```