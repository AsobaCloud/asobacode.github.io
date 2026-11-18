---
title: "Database"
layout: default
parent: "Nehanda CLI"
nav_order: 13
---

# Database (Schema v4)

Nehanda CLI persists all session state, execution provenance, memory graphs, and governance audit records in a local SQLite database. You own this data — no cloud relay or server daemon is required. The database uses Write-Ahead Logging (WAL) for concurrent read performance.

## Location & Settings

| Setting | Value |
|:---|:---|
| **Default path** | `~/.config/nehanda/ona-session.db` |
| **Override** | `AGENT_SDLC_DB` environment variable |
| **Journal mode** | `WAL` (Write-Ahead Logging) |
| **Foreign keys** | Enabled (`PRAGMA foreign_keys = ON`) |
| **Busy timeout** | 30,000 ms (handles concurrent background checks) |
| **Schema version** | **v4** (tracked in `schema_meta`) |

---

## Schema Architecture (v4)

The database consists of 18 tables and FTS5 indexes:

```
├── Core Audit & State
│   ├── schema_meta          # Versioning & metadata
│   ├── conversations        # Project paths, timestamps, active SDLC phase
│   ├── sessions             # Turn-level session groupings
│   ├── transcript_entries   # Full audit sequence of user, assistant, and tool payloads
│   ├── state                # Key-value store per conversation
│   ├── plans                # Governed Plan Triad artifacts
│   ├── summaries            # Conversation context compaction summaries
│   ├── events               # Lifecycle and subagent milestones
│   └── settings_snapshot    # Merged active configuration
├── SDLC Execution Provenance (Schema v4)
│   ├── test_executions      # Structured Given-When-Then runner executions
│   ├── red_evidence         # Genuine test runner RED failure records
│   └── safety_evidence      # Mandatory safety checker outputs & branch coverage
├── Safety & Governance Logging
│   ├── tool_permission_log  # Every allow/deny/ask decision with reasoning
│   └── hook_invocations     # Complete execution log for event hooks
└── Memory & Domain Invariants
    ├── pinned_context       # Domain invariants preserved across compaction
    ├── memories             # Jev-Mem observation nodes
    ├── memories_fts         # FTS5 full-text search virtual table
    ├── memory_edges         # Semantic, temporal, causal, entity graph edges
    └── laya_jev_state       # Laya System-1 session control block
```

---

## SDLC Execution Provenance Tables (Schema v4)

### `test_executions`
Durable provenance of executed behavioral tests. Runtime `Bash` executions targeting supported test runners are automatically analyzed and classified to prevent fabricated test passes.

| Column | Type | Description |
|:---|:---|:---|
| `id` | TEXT PK | Unique execution UUID |
| `conversation_id` | TEXT | Parent conversation ID |
| `phase` | TEXT | SDLC phase during execution (`create_tests`, `verify`) |
| `command` | TEXT | Exact test runner command executed |
| `exit_code` | INTEGER | Process exit code from runner |
| `started_at` | INTEGER | Start timestamp (epoch ms) |
| `finished_at` | INTEGER | Completion timestamp (epoch ms) |
| `classification` | TEXT | Outcome classification (`RED`, `GREEN`, `CRASH`, `SYNTAX_ERROR`) |
| `evidence_json` | TEXT | Structured runner payload (input hashes, failing assertions, stack trace) |

*Index:* `idx_test_executions_conversation ON test_executions(conversation_id, finished_at)`

### `red_evidence`
Stores the definitive RED regression failure that justifies advancing from `create_tests` to `planning`.

| Column | Type | Description |
|:---|:---|:---|
| `id` | INTEGER PK | Auto-increment |
| `conversation_id` | TEXT | Parent conversation ID |
| `command` | TEXT | Failing test runner invocation |
| `exit_code` | INTEGER | Runner exit code (must be non-zero assertion failure) |
| `output_digest` | TEXT | SHA-256 digest of failure output |
| `source` | TEXT | Execution provenance (`manual`, `test_runner`) |
| `execution_json` | TEXT | JSON snapshot of test runner failure |
| `created_at` | DATETIME | Timestamp of recorded failure |

### `safety_evidence`
Stores the outputs and measured branch coverage for mandatory safety checks executed during the `safety` phase.

| Column | Type | Description |
|:---|:---|:---|
| `id` | INTEGER PK | Auto-increment |
| `conversation_id` | TEXT | Parent conversation ID |
| `checker_name` | TEXT | `js_safety`, `shell_safety`, `python_safety` |
| `command` | TEXT | Shell invocation for the checker script |
| `exit_code` | INTEGER | Must be 0 for all three checkers |
| `output` | TEXT | Checker output logs |
| `path_coverage` | REAL | Measured branch coverage across changed production files ($\ge 0.70$) |
| `created_at` | DATETIME | Timestamp of verification |

---

## Memory & Domain Invariant Tables

### `pinned_context`
Session-scoped domain invariants that survive context compaction unchanged. Used to persist ODSE schema mappings, asset capacity limits, simulation bounds, and other constants that must not be distilled or discarded during long sessions.

Unlike `memories`, pinned blocks are never passed to the distillation summariser. They are reattached verbatim at the start of every System-2 prompt, before the canonical Jev-Mem header and retrieved evidence.

| Column | Type | Description |
|:---|:---|:---|
| `id` | INTEGER PK | Auto-increment |
| `session_id` | TEXT | Parent session ID |
| `key` | TEXT | Invariant identifier (e.g. `odse_huawei_map`, `grid_limits`) |
| `content` | TEXT | Verbatim invariant content |
| `created_at` | INTEGER | Epoch ms timestamp |

*Index:* `idx_pinned_context_session ON pinned_context(session_id)` (Unique composite key: `(session_id, key)`).

### `memories` & `memories_fts`
Long-term memory storage with full-text search. The FTS5 virtual table indexes `title`, `content`, `keywords`, and `anticipated_queries` using Porter stemming with Unicode 6.1 support.

Each row represents an observation classified by Laya with overlapping type scores across episodic, semantic, procedural, and preference dimensions.

| Column | Type | Description |
|:---|:---|:---|
| `id` | TEXT PK | Memory UUID |
| `type` | TEXT | Classifier (`jev_observation`, `doc_summary`, etc.) |
| `title` | TEXT | Summary title |
| `content` | TEXT | Observation payload |
| `keywords` | TEXT | Search keywords |
| `entities_json` | TEXT | Extracted named entities |
| `t_episodic` | REAL | Episodic weight (0–1) |
| `t_semantic` | REAL | Semantic weight (0–1) |
| `t_procedural` | REAL | Procedural weight (0–1) |
| `t_preference` | REAL | Preference weight (0–1) |
| `attention_score`| REAL | Relevance score (default: 0.5) |

### `memory_edges`
Multi-relational graph edges for the Jev-Mem memory plane.

| Column | Type | Description |
|:---|:---|:---|
| `id` | INTEGER PK | Auto-increment |
| `src_id` | TEXT FK | Source memory node |
| `dst_id` | TEXT FK | Target memory node |
| `relation` | TEXT | `semantic`, `temporal`, `causal`, or `entity` |
| `weight` | REAL | Edge probability from Laya relation scoring |
| `meta_json` | TEXT | Edge metadata |

---

## Core Transcript & Audit Tables

### `conversations`
Tracks the active SDLC phase and project root.

| Column | Type | Description |
|:---|:---|:---|
| `id` | TEXT PK | Conversation UUID |
| `project_dir` | TEXT | Root working directory |
| `phase` | TEXT | Active SDLC phase (default: `idle`) |
| `created_at` | TEXT | ISO timestamp |
| `last_active` | TEXT | ISO timestamp |

### `transcript_entries`
The complete, immutable turn sequence.

| Column | Type | Description |
|:---|:---|:---|
| `id` | INTEGER PK | Auto-increment sequence ID |
| `session_id` | TEXT FK | Parent session |
| `sequence` | INTEGER | Ordinal turn number |
| `entry_type` | TEXT | `user`, `assistant`, or `tool_result` |
| `payload_json` | TEXT | Full message structure |
| `tool_use_id` | TEXT | Correlating tool invocation ID |

---

## Schema Migrations

Nehanda CLI features an automatic zero-downtime migration engine (`migrateStore` in `lib/store.mjs`):

* **v1 $\rightarrow$ v2:** Added Jev-Mem node columns (`entities_json`, `t_episodic`, etc.), created `memory_edges`, `laya_jev_state`, and created index `idx_memories_conversation`.
* **v2 $\rightarrow$ v3:** Added `pinned_context` table and session index for persistent domain invariants.
* **v3 $\rightarrow$ v4:** Added `test_executions`, `red_evidence`, and `safety_evidence`. Migrates legacy `test` phase records to either `create_tests` or `verify` based on whether implementation code was generated.

---

## Diagnostic SQL Queries

### Inspect Verified RED/GREEN Test Provenance
```sql
SELECT phase, command, exit_code, classification, datetime(started_at/1000, 'unixepoch') AS run_time
FROM test_executions
ORDER BY started_at DESC
LIMIT 10;
```

### Review Safety Checkers and Branch Coverage
```sql
SELECT checker_name, exit_code, path_coverage, created_at
FROM safety_evidence
ORDER BY id DESC
LIMIT 10;
```

### Audit Blocked Tools and Permission Decisions
```sql
SELECT tool_name, decision, reason_json, created_at
FROM tool_permission_log
WHERE decision != 'allow'
ORDER BY id DESC
LIMIT 20;
```
