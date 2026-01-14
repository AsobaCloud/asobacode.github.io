---
title: "Changelog"
layout: default
nav_order: 9
---

# Changelog

Version history for Zorora.

## Version 2.5.0 - ONA Platform Integration & Enhanced Editing

**Release Date:** January 2025

### Major Features

**ONA Platform Integration:**
- Remote ML model observation commands (`/ml-*`)
- Model lifecycle management - list challengers, compare models, promote/rollback
- Audit logging for all model changes
- Dual authentication support (Bearer token and AWS IAM)

**Enhanced /code File Editing:**
- Auto-detection of existing files in prompts
- Direct edit workflow (read → OLD_CODE/NEW_CODE → apply)
- Retry loop with error context (up to 3 attempts)
- No planning phase for simple edits

**Beautiful Progress Display:**
- Hierarchical tool visualization with tree-style display
- Real-time progress during multi-step operations
- Per-tool execution timing
- Visual status indicators (checkmarks and spinners)

**Boxed Input UI:**
- prompt_toolkit integration for modern terminal input
- Visual input box with borders
- Improved cursor handling and feedback

### New Capabilities

**`/deep` Command:**
- Terminal deep research with full feature parity to Web UI
- Academic + web + newsroom multi-source synthesis

**Modular Tool Registry (Complete):**
- 19 tools migrated to modular `tools/` structure
- 5 categories: research, file_ops, shell, specialist, image
- Backward compatibility via legacy shim

**Model-Agnostic Coding:**
- `use_codestral` renamed to `use_coding_agent`
- Works with any configured coding model
- Unified specialist client factory

### Improvements

- Line numbers by default in `read_file` output
- `replace_all` parameter for `edit_file`
- Better error messages with similar text suggestions
- SQLite threading fixes
- Read-before-edit enforcement

### Breaking Changes

- `use_codestral` renamed to `use_coding_agent` (alias provided)
- Import from `tools.registry` instead of `tool_registry` (deprecation warning)

---

## Version 2.1.0 - Settings Modal & Multi-Provider Support

**Release Date:** Previous

**Major Features:**
- ✅ Web UI Settings Modal - Visual configuration interface
- ✅ Multi-provider endpoint support (HuggingFace, OpenAI, Anthropic)
- ✅ API key management for all providers (masked display, secure storage)
- ✅ Endpoint CRUD operations via Web UI (add/edit/delete)
- ✅ Vision and image_generation model configuration
- ✅ Config file backup before writes
- ✅ Automatic role reassignment on endpoint deletion

**Configuration Improvements:**
- Visual settings modal (no code editing required)
- Dropdown selection for models and endpoints
- Provider-specific endpoint forms (HF: URL+Model, OpenAI/Anthropic: Model+MaxTokens)
- Secure API key handling (masking, show/hide toggle)
- Config validation and error handling

**API Enhancements:**
- `/api/settings/config` - Read/write configuration
- `/api/settings/models` - List available models (all providers)
- `/api/settings/endpoints` - List endpoints (all providers)
- `/api/settings/endpoint` - Add/edit endpoint (provider-aware)
- `/api/settings/endpoint/<key>` - Delete endpoint (checks all providers)

---

## Version 2.0.0 - Deep Research Release

**Release Date:** Previous

**Major Features:**
- ✅ Deep research engine with 6-phase workflow (MVP)
- ✅ Modular tool registry (`tools/research/`, `tools/registry.py`)
- ✅ SQLite + JSON storage layer (`engine/storage.py`)
- ✅ Web UI with Flask (`ui/web/app.py`)
- ✅ Credibility scoring system
- ✅ Parallel source aggregation (academic + web + newsroom)
- ✅ Research synthesis with citations

**Architecture Changes:**
- Refactored tool registry into modular structure
- Created `engine/` module for research engine
- Created `workflows/deep_research/` for workflow components
- Added Flask-based Web UI

**Breaking Changes:**
- `tool_registry.py` is now a backward-compatibility shim
- Use `from tools.registry import ...` for new code
- Web UI requires Flask (added to requirements)

---

## Download

[Download v2.5-prod](https://github.com/AsobaCloud/zorora/releases/tag/v2.5-prod)

---

## See Also

- [Getting Started](/getting-started) - Installation and setup
- [Guides](/guides/overview) - Usage guides
- [API Reference](/api-reference/overview) - API documentation
