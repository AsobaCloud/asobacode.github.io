---
title: "Routing"
layout: default
nav_order: 5
parent: "Learn"
---

# Routing Mechanism

Deterministic pattern matching for workflow routing.

## Overview

Zorora uses **deterministic routing** with pattern matching instead of LLM-based orchestration. This ensures 100% reliability with 4B models and eliminates routing failures.

## Routing Decision Tree

### Priority Order

1. **File Operations** (highest priority)
2. **Code Generation**
3. **Research Queries**
4. **Simple Q&A** (fallback)

### Pattern Matching

**File Operations:**
```python
if re.search(r'\b(save|load|list|show|delete)\b', user_input.lower()):
    return {"workflow": "file_op", "action": "..."}
```

**Code Generation:**
```python
if re.search(r'\b(write|create|generate).*\b(function|class|script|code)', user_input.lower()):
    return {"workflow": "code", "tool": "use_codestral"}
```

**Research Queries:**
```python
if re.search(r'\b(what|why|how|tell me|based on|newsroom|web search)\b', user_input.lower()):
    return {"workflow": "research", "action": "multi_source_research"}
```

**Simple Q&A (Fallback):**
```python
return {"workflow": "qa", "tool": "use_reasoning_model"}
```

## Routing Examples

### File Operations

**Input:** "save research to file.txt"
**Route:** `file_op` → `save` action

**Input:** "load previous research"
**Route:** `file_op` → `load` action

**Input:** "list all research"
**Route:** `file_op` → `list` action

### Code Generation

**Input:** "write a function to parse JSON"
**Route:** `code` → `use_codestral`

**Input:** "create a REST API endpoint"
**Route:** `code` → `use_codestral`

**Input:** "generate a Python script"
**Route:** `code` → `use_codestral`

### Research Queries

**Input:** "What are the latest developments in LLM architectures?"
**Route:** `research` → `multi_source_research`

**Input:** "Why do solar panels degrade over time?"
**Route:** `research` → `multi_source_research`

**Input:** "How does battery storage work?"
**Route:** `research` → `multi_source_research`

### Simple Q&A

**Input:** "Explain async/await"
**Route:** `qa` → `use_reasoning_model`

**Input:** "What is a virtual power plant?"
**Route:** `qa` → `use_reasoning_model`

## Slash Commands

Slash commands bypass pattern matching and force specific workflows:

- `/search` → Forces research workflow
- `/ask` → Forces conversational mode
- `/code` → Forces code generation
- `/develop` → Forces development workflow
- `/image` → Forces image generation
- `/vision` → Forces image analysis

## Why Pattern Matching?

### Problem: LLM Routing Fails with 4B Models

**LLM-based routing requires:**
- Valid JSON generation
- Consistent decision-making
- Tool selection logic
- Error recovery

**4B models fail at:**
- Generating valid JSON consistently
- Making reliable routing decisions
- Handling edge cases
- Recovering from errors

### Solution: Deterministic Pattern Matching

**Benefits:**
- 100% reliability (pattern matching never fails)
- 0ms decision time (no LLM call)
- Predictable behavior (same query = same workflow)
- Simple debugging (clear routing logic)
- No API costs (no LLM call for routing)

**Trade-offs:**
- Less flexible than LLM routing
- Requires explicit patterns
- No adaptive routing

## Implementation

### Simplified Router

**File:** `simplified_router.py`

**Core Function:**
```python
def route(self, user_input: str) -> Dict[str, Any]:
    # Priority 1: File operations
    if re.search(r'\b(save|load|list|show|delete)\b', user_input.lower()):
        return {"workflow": "file_op", "action": "..."}
    
    # Priority 2: Code generation
    if re.search(r'\b(write|create|generate).*\b(function|class|script|code)', user_input.lower()):
        return {"workflow": "code", "tool": "use_codestral"}
    
    # Priority 3: Research queries
    if re.search(r'\b(what|why|how|tell me|based on|newsroom|web search)\b', user_input.lower()):
        return {"workflow": "research", "action": "multi_source_research"}
    
    # Priority 4: Simple Q&A (fallback)
    return {"workflow": "qa", "tool": "use_reasoning_model"}
```

### Pattern Matching Rules

**File Operations:**
- Keywords: `save`, `load`, `list`, `show`, `delete`
- Case-insensitive matching
- Word boundary matching (`\b`)

**Code Generation:**
- Action keywords: `write`, `create`, `generate`
- Object keywords: `function`, `class`, `script`, `code`
- Both must be present

**Research Queries:**
- Question keywords: `what`, `why`, `how`, `tell me`
- Research keywords: `based on`, `newsroom`, `web search`
- Any keyword triggers research

**Simple Q&A:**
- Fallback for all other queries
- No pattern matching required

## Performance

**Routing Decision:** 0ms
- Pattern matching is instant
- No LLM call required
- No network latency
- No API costs

**Comparison:**
- LLM routing: 500-2000ms + API costs
- Pattern matching: 0ms + no costs

## Extending Routing

### Adding New Patterns

**Step 1:** Add pattern to `simplified_router.py`

```python
# Priority X: New workflow
if re.search(r'\b(new_keyword)\b', user_input.lower()):
    return {"workflow": "new_workflow", "action": "..."}
```

**Step 2:** Implement workflow handler

**Step 3:** Test pattern matching

### Adding Slash Commands

**Step 1:** Add command handler in `repl.py`

```python
if cmd_lower.startswith('/newcommand'):
    # Handle command
    return result
```

**Step 2:** Update command documentation

**Step 3:** Test command

## See Also

- [Architecture](/technical-concepts/architecture) - Overall architecture
- [Slash Commands](/guides/slash-commands) - Command reference
- [Terminal REPL](/guides/terminal-repl) - REPL usage
