# Zorora REPL Documentation Transformation Plan
## One-Shot Development Plan

**Purpose**: Transform `asobacode.github.io` from Ona Platform focus to Zorora REPL focus, incorporating DATA_DISPLAY_PATTERN_GUIDE.md patterns and DOCUMENTATION_IA_GUIDE.md structure, aligned with brand styling from `asobacloud.github.io`.

**Target Audience**: AI coders executing one-shot documentation transformation

**Last Updated**: 2025-01-29

---

## ⚠️ ONE-SHOT CONSTRAINT

**CRITICAL**: Completion is defined **exclusively** by the automated validation checks (Checks 1-6).

**Out of Scope for One-Shot Execution**:
- Subjective quality assessment
- UX refinement or aesthetic judgment
- Manual verification steps (these are informational only)
- Content improvements beyond mechanical pattern application

**Success Criteria**: The plan is complete when all automated validation checks pass. Manual checks listed in Success Criteria are **non-blocking** and may be performed later by a human reviewer.

---

**Source of Truth**: 
- Zorora README: `/Users/shingi/Workbench/zorora/README.md`
- Zorora Codebase: `/Users/shingi/Workbench/zorora/`
- Zorora Latest Release: `https://github.com/AsobaCloud/zorora/releases/tag/v2-prod` (use for download links)
- DATA_DISPLAY_PATTERN_GUIDE: `/Users/shingi/Workbench/asobacloud.github.io/DATA_DISPLAY_PATTERN_GUIDE.md`
- DOCUMENTATION_IA_GUIDE: `/Users/shingi/Workbench/asobacloud.github.io/DOCUMENTATION_IA_GUIDE.md`
- Brand CSS: `/Users/shingi/Workbench/asobacloud.github.io/assets/css/styles.css`

---

## ⚡ EXECUTION RULES (One-Shot Ready)

**CRITICAL**: These rules are **deterministic and machine-actionable**. Apply them mechanically without interpretation.

### Rule Application Method

1. **Identify content type** (use DATA_DISPLAY_PATTERN_GUIDE.md decision tree)
2. **Match to pattern** (use mapping table)
3. **Apply pattern** (use implementation template)
4. **Validate** (use checklist)
5. **Apply UX/UI patterns ONLY where explicitly required by a validation check** (see DOCUMENTATION_IA_GUIDE.md Section 7)
6. **Ignore non-mechanical guidance during execution** (do not apply subjective UX/UI improvements)

---

## Scope Declaration

### IN SCOPE (files/directories that MAY be modified):

```
asobacode.github.io/
├── index.md                          ✅ REWRITE (Zorora homepage)
├── getting-started.md                ✅ REWRITE (Zorora installation/quick start)
├── introduction.md                   ✅ REWRITE (Zorora overview)
├── _config.yml                       ✅ MODIFY (title, navigation)
├── _data/navigation.yml              ✅ REWRITE (Zorora navigation structure)
├── _layouts/default.html             ✅ MODIFY (navigation only, preserve header/footer)
├── assets/css/styles.css             ✅ MODIFY (additions only, preserve existing)
├── assets/js/search.js               ✅ MODIFY (update search index structure)
├── assets/js/search-data.json        ✅ REGENERATE (Zorora content)
├── changelog.md                      ✅ REWRITE (Zorora changelog)
├── faq.md                            ✅ REWRITE (Zorora FAQ)
├── resources.md                      ✅ REWRITE (Zorora resources)
├── archive/                          ✅ ARCHIVE (move Ona content here, keep for reference)
└── [NEW FILES]                       ✅ CREATE (see New Files section)
```

### OUT OF SCOPE (files/directories that MUST NOT be modified):

```
asobacode.github.io/
├── .git/                            ❌ DO NOT TOUCH
├── .github/                         ❌ DO NOT TOUCH
├── CNAME                            ❌ DO NOT TOUCH
├── .gitignore                       ❌ DO NOT TOUCH
├── assets/images/                   ❌ DO NOT TOUCH (read-only, may add new images)
├── assets/_includes/                ❌ DO NOT TOUCH
└── Any file outside repo root       ❌ DO NOT TOUCH
```

### EXTERNAL REFERENCES (read-only, for context):

```
~/Workbench/zorora/                  📖 READ ONLY (source of truth for Zorora features)
~/Workbench/asobacloud.github.io/   📖 READ ONLY (brand styling, pattern guides)
```

---

## Deterministic Content Mapping

### Download Links

**CRITICAL**: All download/installation links MUST reference the latest release:
- **Release URL**: `https://github.com/AsobaCloud/zorora/releases/tag/v2-prod`
- **Use for**: Download buttons, installation instructions, "Get Started" CTAs
- **Format**: Link text should say "Download v2-prod" or "Get Latest Release"

**Example Download Link**:
```markdown
[Download v2-prod](https://github.com/AsobaCloud/zorora/releases/tag/v2-prod)
```

**Example Installation Instructions**:
```markdown
## Installation

**From GitHub Release:**
```bash
# Download from latest release
# Visit: https://github.com/AsobaCloud/zorora/releases/tag/v2-prod
```

**From GitHub (development):**
```bash
pip install git+https://github.com/AsobaCloud/zorora.git
```
```

### Zorora Feature Inventory (from README and codebase)

**Core Features** (document these):
1. **Deep Research Engine** - 6-phase pipeline (academic + web + newsroom + synthesis)
2. **Terminal REPL** - Interactive command-line interface (`zorora` command)
3. **Web UI** - Flask-based web interface (`zorora web` or `python web_main.py`)
4. **Slash Commands** - `/search`, `/ask`, `/code`, `/develop`, `/image`, `/vision`
5. **Research Depth Levels** - Quick (depth=1), Balanced (depth=2), Thorough (depth=3)
6. **Local Storage** - SQLite (`~/.zorora/zorora.db`) + JSON files (`~/.zorora/research/findings/`)
7. **Multi-Provider Support** - LM Studio (local), HuggingFace, OpenAI, Anthropic
8. **Settings Modal** - Web UI configuration interface
9. **Code Generation** - Codestral specialist model
10. **Development Workflow** - `/develop` multi-step workflow (explore → plan → approve → execute → lint)
11. **Vision & Image** - Image analysis and text-to-image generation
12. **Research Persistence** - Save/load research findings
13. **Credibility Scoring** - Rules-based source authority scoring
14. **Citation Following** - Multi-hop research (depth 2-3)

**Architecture** (document these):
- Deterministic routing (pattern matching, no LLM orchestration)
- Local-first storage (SQLite + JSON)
- Modular tool registry (`tools/registry.py`)
- Research engine (`engine/research_engine.py`)
- Deep research workflow (`workflows/deep_research/`)
- Web UI Flask app (`ui/web/app.py`)

**Commands** (from COMMANDS.md):
- `/search` - Force deep research workflow
- `/ask` - Force conversational mode
- `/code` - Force code generation
- `/develop` - Multi-step development workflow
- `/image` - Generate image with FLUX
- `/vision` - Analyze image with vision model
- `/models` - Interactive model selector
- `/config` - Show routing configuration
- `/history` - Browse saved sessions
- `/help` - Show available commands

**API Endpoints** (from `ui/web/app.py`):
- `POST /api/research` - Start deep research
- `GET /api/research/<research_id>` - Get research results
- `GET /api/research/history` - Get research history
- `GET /api/settings/config` - Read/write configuration
- `GET /api/settings/models` - List available models
- `GET /api/settings/endpoints` - List endpoints
- `POST /api/settings/endpoint` - Add/edit endpoint
- `DELETE /api/settings/endpoint/<key>` - Delete endpoint

---

## File Transformation Map

### Existing Files to Rewrite

| Source File | Target Content | Action | Validation |
|------------|----------------|--------|------------|
| `index.md` | Zorora homepage (wayfinding, quick start, SDK links, code examples) | **REWRITE** | Follow DOCUMENTATION_IA_GUIDE.md Pattern A (homepage structure) |
| `getting-started.md` | Zorora installation, prerequisites, quick start | **REWRITE** | Follow DOCUMENTATION_IA_GUIDE.md Rule 8.1 (quick start structure) |
| `introduction.md` | Zorora overview, architecture, core concepts | **REWRITE** | Follow DOCUMENTATION_IA_GUIDE.md Pattern B (detailed overview) |
| `changelog.md` | Zorora version history (from README changelog section) | **REWRITE** | Extract from Zorora README changelog |
| `faq.md` | Zorora FAQ (common questions from README troubleshooting) | **REWRITE** | Extract from Zorora README troubleshooting section |
| `resources.md` | Zorora resources (links, community, support) | **REWRITE** | Follow DOCUMENTATION_IA_GUIDE.md community section |
| `_config.yml` | Update title to "Zorora Documentation" | **MODIFY** | Change title only |
| `_data/navigation.yml` | Zorora navigation structure | **REWRITE** | See Navigation Structure section |
| `assets/js/search-data.json` | Regenerate with Zorora content | **REGENERATE** | Run search index generator after content changes |

### Files to Archive (Move to archive/)

| Source File | Target Location | Action | Validation |
|------------|----------------|--------|------------|
| `api-reference.md` | `archive/api-reference.md` | **MOVE** | Ona-specific content |
| `cli-tools.md` | `archive/cli-tools.md` | **MOVE** | Ona-specific content |
| `control-layer.md` | `archive/control-layer.md` | **MOVE** | Ona-specific content |
| `deployment.md` | `archive/deployment.md` | **MOVE** | Ona-specific content |
| `development.md` | `archive/development.md` | **MOVE** | Ona-specific content |
| `edge-layer.md` | `archive/edge-layer.md` | **MOVE** | Ona-specific content |
| `integration.md` | `archive/integration.md` | **MOVE** | Ona-specific content |
| `interface-layer.md` | `archive/interface-layer.md` | **MOVE** | Ona-specific content |
| `llmdeployment.md` | `archive/llmdeployment.md` | **MOVE** | Ona-specific content |
| `poc-deployment.md` | `archive/poc-deployment.md` | **MOVE** | Ona-specific content |
| `sdk.md` | `archive/sdk.md` | **MOVE** | Ona-specific content |
| `shared-components.md` | `archive/shared-components.md` | **MOVE** | Ona-specific content |
| `user-guide.md` | `archive/user-guide.md` | **MOVE** | Ona-specific content |

### New Files to Create

| Target File | Source Content | Action | Validation |
|------------|---------------|--------|------------|
| `guides/overview.md` | New content | **CREATE** | Overview of Zorora guides (300+ words) |
| `guides/installation.md` | Extract from README "Installation" section | **CREATE** | Installation guide (200+ words) |
| `guides/configuration.md` | Extract from README "Configuration" section | **CREATE** | Configuration guide (300+ words) |
| `guides/terminal-repl.md` | Extract from README "Terminal Interface" section | **CREATE** | Terminal REPL guide (300+ words) |
| `guides/web-ui.md` | Extract from README "Web Interface" section | **CREATE** | Web UI guide (300+ words) |
| `guides/research-workflow.md` | Extract from README "Deep Research Query" section | **CREATE** | Research workflow guide (400+ words) |
| `guides/code-generation.md` | Extract from README "Code Generation" section | **CREATE** | Code generation guide (300+ words) |
| `guides/development-workflow.md` | Extract from README "/develop" section | **CREATE** | Development workflow guide (400+ words) |
| `guides/slash-commands.md` | Extract from COMMANDS.md | **CREATE** | Slash commands reference (500+ words) |
| `api-reference/overview.md` | New content | **CREATE** | API reference overview (300+ words) |
| `api-reference/research-api.md` | Extract from `ui/web/app.py` API routes | **CREATE** | Research API reference (400+ words) |
| `api-reference/settings-api.md` | Extract from `ui/web/app.py` settings routes | **CREATE** | Settings API reference (300+ words) |
| `api-reference/python-sdk.md` | Extract from README "API (Programmatic Access)" section | **CREATE** | Python SDK reference (300+ words) |
| `technical-concepts/overview.md` | New content | **CREATE** | Technical concepts overview (300+ words) |
| `technical-concepts/architecture.md` | Extract from `docs/ARCHITECTURE.md` | **CREATE** | Architecture documentation (500+ words) |
| `technical-concepts/research-pipeline.md` | Extract from README "Deep Research Capabilities" section | **CREATE** | Research pipeline documentation (400+ words) |
| `technical-concepts/storage.md` | Extract from README "Local-First Architecture" section | **CREATE** | Storage architecture (300+ words) |
| `technical-concepts/routing.md` | Extract from `docs/ARCHITECTURE.md` "Simplified Router" section | **CREATE** | Routing documentation (300+ words) |
| `use-cases/overview.md` | New content | **CREATE** | Use cases overview (300+ words) |
| `use-cases/academic-research.md` | New content (example use case) | **CREATE** | Academic research use case (400+ words) |
| `use-cases/code-development.md` | New content (example use case) | **CREATE** | Code development use case (400+ words) |
| `use-cases/multi-source-analysis.md` | New content (example use case) | **CREATE** | Multi-source analysis use case (400+ words) |

### Directories to Create

| Directory | Purpose | Validation |
|-----------|---------|------------|
| `guides/` | Zorora guides | Create if not exists |
| `api-reference/` | API reference | Create if not exists |
| `technical-concepts/` | Technical concepts | Create if not exists |
| `use-cases/` | Use cases | Create if not exists |

---

## Content Structure Rules

### Homepage Structure (index.md)

**Follow DOCUMENTATION_IA_GUIDE.md Pattern A**:

```markdown
---
title: "Home"
layout: default
nav_order: 1
---

# Zorora
{: .fs-9 }

**A local-deployment deep research engine that searches across academic databases, web sources, and newsroom articles, then synthesizes findings with credibility scoring and citation graphs.**
{: .fs-6 .fw-300 }

Built for macOS (Apple Silicon) with minimal RAM footprint, meant to be run directly from your computer, with all content, outputs, and chats stored locally and not in the cloud, giving you complete control and privacy.
{: .fs-5 .fw-300 }

## Quick Start

[Copy-paste ready installation example]

**Download Latest Release**: [v2-prod](https://github.com/AsobaCloud/zorora/releases/tag/v2-prod)

## What You Can Find Here

[Grid of cards linking to major sections]

## Popular Guides

[Grid of 3-4 most popular guide cards]

## Core Concepts

[Grid of concept cards]

## Next Steps

[Links to getting started, API reference, related guides]
```

### Guide Pages Structure

**Follow DOCUMENTATION_IA_GUIDE.md Rule 8.2** (Task-Oriented Content Structure):

```markdown
# [Task Name]

## Prerequisites

- [ ] Requirement 1
- [ ] Requirement 2

## Steps

### Step 1: [Action]

[Content]

### Step 2: [Action]

[Content]

## Verify Results

[How to verify success]

## Troubleshooting

[Common issues]

## See Also

- [Related Guide](/guides/related-guide)
- [API Reference](/api-reference/related-endpoint)
```

### API Reference Pages Structure

**Follow DATA_DISPLAY_PATTERN_GUIDE.md Rule Set 1**:

```markdown
# [Endpoint Name]

## Example Request

[Complete, executable code - Rule 4.1]

## Example Response

[Complete JSON response - Rule 1.2]

## Request Parameters

[Parameter table - Rule 1.1]

## Response Fields

[Parameter table - Rule 1.1]

## Error Responses

[Error codes table - Rule 1.3]

## See Also

- [Related Guide](/guides/related-guide)
- [API Reference Overview](/api-reference/overview)
```

---

## Data Display Pattern Rules

**CRITICAL**: Apply DATA_DISPLAY_PATTERN_GUIDE.md rules mechanically.

### Rule Application

1. **API Parameters** → Use TABLE (Rule 1.1)
2. **API Responses** → Use JSON CODE BLOCK (Rule 1.2)
3. **Error Codes** → Use ERROR TABLE (Rule 1.3)
4. **Code Examples** → Use CODE BLOCK WITH LANGUAGE (Rule 4.1)
5. **Metrics/Statistics** → Use CALLOUT BOX (critical) or INLINE (supporting) (Rule 5.1)
6. **Comparison Data** → Use COMPARISON TABLE (Rule 3.1)
7. **Time-Series Data** → Use TABLE (Rule 2.1)

### Examples

**API Parameter Table** (Rule 1.1):
```markdown
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Research query string |
| `depth` | integer | No | Research depth (1=Quick, 2=Balanced, 3=Thorough, default: 1) |
```

**API Response JSON** (Rule 1.2):
````markdown
```json
{
  "research_id": "20250129_143022",
  "status": "completed",
  "query": "latest developments in LLM architectures",
  "synthesis": "Based on recent research...",
  "total_sources": 15,
  "sources": [...]
}
```
````

**Code Example** (Rule 4.1):
````markdown
# From GitHub Release (recommended)
# Download from: https://github.com/AsobaCloud/zorora/releases/tag/v2-prod

# From GitHub (development)
```bash
pip install git+https://github.com/AsobaCloud/zorora.git
```
````

---

## Navigation Structure

### _data/navigation.yml

```yaml
# Navigation configuration for Just the Docs theme
# This file configures the sidebar navigation

# Main navigation structure
- title: Home
  url: /
  nav_order: 1

- title: Introduction
  url: /introduction
  nav_order: 0.5
  children:
    - title: What is Zorora?
      url: /introduction#what-is-zorora
    - title: Core Features
      url: /introduction#core-features
    - title: Architecture
      url: /introduction#architecture
    - title: Local-First Design
      url: /introduction#local-first-design
    - title: Quick Start
      url: /introduction#quick-start

- title: Getting Started
  url: /getting-started
  nav_order: 2
  children:
    - title: Prerequisites
      url: /getting-started#prerequisites
    - title: Installation
      url: /getting-started#installation
    - title: Configuration
      url: /getting-started#configuration
    - title: First Research Query
      url: /getting-started#first-research-query

- title: Guides
  url: /guides/overview
  nav_order: 3
  children:
    - title: Overview
      url: /guides/overview
    - title: Installation
      url: /guides/installation
    - title: Configuration
      url: /guides/configuration
    - title: Terminal REPL
      url: /guides/terminal-repl
    - title: Web UI
      url: /guides/web-ui
    - title: Research Workflow
      url: /guides/research-workflow
    - title: Code Generation
      url: /guides/code-generation
    - title: Development Workflow
      url: /guides/development-workflow
    - title: Slash Commands
      url: /guides/slash-commands

- title: API Reference
  url: /api-reference/overview
  nav_order: 4
  children:
    - title: Overview
      url: /api-reference/overview
    - title: Research API
      url: /api-reference/research-api
    - title: Settings API
      url: /api-reference/settings-api
    - title: Python SDK
      url: /api-reference/python-sdk

- title: Technical Concepts
  url: /technical-concepts/overview
  nav_order: 5
  children:
    - title: Overview
      url: /technical-concepts/overview
    - title: Architecture
      url: /technical-concepts/architecture
    - title: Research Pipeline
      url: /technical-concepts/research-pipeline
    - title: Storage
      url: /technical-concepts/storage
    - title: Routing
      url: /technical-concepts/routing

- title: Use Cases
  url: /use-cases/overview
  nav_order: 6
  children:
    - title: Overview
      url: /use-cases/overview
    - title: Academic Research
      url: /use-cases/academic-research
    - title: Code Development
      url: /use-cases/code-development
    - title: Multi-Source Analysis
      url: /use-cases/multi-source-analysis

- title: Resources
  url: /resources
  nav_order: 7

- title: FAQ
  url: /faq
  nav_order: 8

- title: Changelog
  url: /changelog
  nav_order: 9
```

---

## Content Extraction Rules

### Rule 1: Extract from Zorora README

**Source**: `/Users/shingi/Workbench/zorora/README.md`

**Extraction Method**:
1. Identify section headings (H2, H3)
2. Copy content verbatim (no rewording)
3. Preserve code blocks exactly
4. Preserve lists and tables exactly
5. Update internal links to match new structure

**Sections to Extract**:
- "Quick Start" → `getting-started.md` (include download link to v2-prod release)
- "Installation" → `guides/installation.md` (include download link to v2-prod release)
- "Configuration" → `guides/configuration.md`
- "Basic Usage" → `guides/research-workflow.md`
- "Deep Research Query" → `guides/research-workflow.md`
- "Code Generation" → `guides/code-generation.md`
- "Slash Commands" → `guides/slash-commands.md`
- "Architecture" → `technical-concepts/architecture.md`
- "Troubleshooting" → `faq.md`
- "Changelog" → `changelog.md`

### Rule 2: Extract from COMMANDS.md

**Source**: `/Users/shingi/Workbench/zorora/COMMANDS.md`

**Extraction Method**:
1. Copy command documentation verbatim
2. Preserve code examples exactly
3. Preserve parameter tables exactly
4. Update links to match new structure

**Sections to Extract**:
- All command documentation → `guides/slash-commands.md`

### Rule 3: Extract from ARCHITECTURE.md

**Source**: `/Users/shingi/Workbench/zorora/docs/ARCHITECTURE.md`

**Extraction Method**:
1. Copy architecture documentation verbatim
2. Preserve diagrams and code examples exactly
3. Update links to match new structure

**Sections to Extract**:
- Architecture overview → `technical-concepts/architecture.md`
- Routing → `technical-concepts/routing.md`
- Storage → `technical-concepts/storage.md`

### Rule 4: Extract from Code (ui/web/app.py)

**Source**: `/Users/shingi/Workbench/zorora/ui/web/app.py`

**Extraction Method**:
1. Extract API route docstrings
2. Extract request/response examples
3. Create parameter tables from docstrings
4. Create error response tables

**Sections to Extract**:
- Research API routes → `api-reference/research-api.md`
- Settings API routes → `api-reference/settings-api.md`

---

## CSS Styling Rules

### Rule 1: Preserve Existing Styles

**CRITICAL**: Do NOT modify existing CSS. Only ADD new styles.

**Method**:
1. Read `assets/css/styles.css`
2. Append new styles to end of file
3. Use CSS variables from existing styles (e.g., `var(--primary-blue)`)
4. Follow existing naming conventions

### Rule 2: Use Brand Colors

**From asobacloud.github.io/styles.css**:
- `--dark-blue: #040e2e`
- `--primary-blue: #455bf1`
- `--accent-blue: #3748c8`
- `--text-dark: #333`
- `--text-light: #4D4D4D`
- `--background-light: #f5f5f5`
- `--white: #fff`
- `--border-grey: #e0e0e0`

**Method**: Use CSS variables, not hardcoded colors.

### Rule 3: Add Card Grid Styles (if needed)

**From DOCUMENTATION_IA_GUIDE.md**:
```css
.overview-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 32px 0;
}

.overview-card {
  background: var(--white);
  border: 1px solid var(--border-grey);
  border-radius: 8px;
  padding: 24px;
  transition: all 0.2s ease;
}

.overview-card:hover {
  border-color: var(--primary-blue);
  box-shadow: 0 4px 12px rgba(69, 91, 241, 0.1);
  transform: translateY(-2px);
}
```

**Method**: Add to end of `assets/css/styles.css` if not already present.

---

## Validation Checklist

### Check 1: All Files Exist at Target Paths

```bash
#!/bin/bash
# Run this script from repo root

ERRORS=0

# New guide files
[ -f "guides/overview.md" ] || { echo "FAIL: guides/overview.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/installation.md" ] || { echo "FAIL: guides/installation.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/configuration.md" ] || { echo "FAIL: guides/configuration.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/terminal-repl.md" ] || { echo "FAIL: guides/terminal-repl.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/web-ui.md" ] || { echo "FAIL: guides/web-ui.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/research-workflow.md" ] || { echo "FAIL: guides/research-workflow.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/code-generation.md" ] || { echo "FAIL: guides/code-generation.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/development-workflow.md" ] || { echo "FAIL: guides/development-workflow.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "guides/slash-commands.md" ] || { echo "FAIL: guides/slash-commands.md missing"; ERRORS=$((ERRORS+1)); }

# New API reference files
[ -f "api-reference/overview.md" ] || { echo "FAIL: api-reference/overview.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "api-reference/research-api.md" ] || { echo "FAIL: api-reference/research-api.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "api-reference/settings-api.md" ] || { echo "FAIL: api-reference/settings-api.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "api-reference/python-sdk.md" ] || { echo "FAIL: api-reference/python-sdk.md missing"; ERRORS=$((ERRORS+1)); }

# New technical concepts files
[ -f "technical-concepts/overview.md" ] || { echo "FAIL: technical-concepts/overview.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "technical-concepts/architecture.md" ] || { echo "FAIL: technical-concepts/architecture.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "technical-concepts/research-pipeline.md" ] || { echo "FAIL: technical-concepts/research-pipeline.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "technical-concepts/storage.md" ] || { echo "FAIL: technical-concepts/storage.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "technical-concepts/routing.md" ] || { echo "FAIL: technical-concepts/routing.md missing"; ERRORS=$((ERRORS+1)); }

# New use cases files
[ -f "use-cases/overview.md" ] || { echo "FAIL: use-cases/overview.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "use-cases/academic-research.md" ] || { echo "FAIL: use-cases/academic-research.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "use-cases/code-development.md" ] || { echo "FAIL: use-cases/code-development.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "use-cases/multi-source-analysis.md" ] || { echo "FAIL: use-cases/multi-source-analysis.md missing"; ERRORS=$((ERRORS+1)); }

# Rewritten files
[ -f "index.md" ] || { echo "FAIL: index.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "getting-started.md" ] || { echo "FAIL: getting-started.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "introduction.md" ] || { echo "FAIL: introduction.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "changelog.md" ] || { echo "FAIL: changelog.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "faq.md" ] || { echo "FAIL: faq.md missing"; ERRORS=$((ERRORS+1)); }
[ -f "resources.md" ] || { echo "FAIL: resources.md missing"; ERRORS=$((ERRORS+1)); }

if [ $ERRORS -eq 0 ]; then
  echo "PASS: All file existence checks passed"
else
  echo "FAIL: $ERRORS file existence check(s) failed"
  exit 1
fi
```

### Check 2: Content Density Requirements

```bash
#!/bin/bash

ERRORS=0

# Function to count words in a file
count_words() {
  wc -w < "$1" 2>/dev/null || echo "0"
}

# Check overview pages meet minimum word count (300 words)
OVERVIEW_PAGES=(
  "guides/overview.md"
  "api-reference/overview.md"
  "technical-concepts/overview.md"
  "use-cases/overview.md"
)

for file in "${OVERVIEW_PAGES[@]}"; do
  if [ -f "$file" ]; then
    words=$(count_words "$file")
    if [ "$words" -lt 300 ]; then
      echo "FAIL: $file has only $words words (minimum 300 required)"
      ERRORS=$((ERRORS+1))
    fi
  fi
done

# Check guide pages meet minimum word count (200 words)
GUIDE_PAGES=(
  "guides/installation.md"
  "guides/configuration.md"
  "guides/terminal-repl.md"
  "guides/web-ui.md"
  "guides/research-workflow.md"
  "guides/code-generation.md"
  "guides/development-workflow.md"
  "guides/slash-commands.md"
)

for file in "${GUIDE_PAGES[@]}"; do
  if [ -f "$file" ]; then
    words=$(count_words "$file")
    if [ "$words" -lt 200 ]; then
      echo "FAIL: $file has only $words words (minimum 200 required)"
      ERRORS=$((ERRORS+1))
    fi
  fi
done

if [ $ERRORS -eq 0 ]; then
  echo "PASS: Content density check passed"
else
  echo "FAIL: $ERRORS content density check(s) failed"
  exit 1
fi
```

### Check 3: No TODOs or Placeholders

```bash
#!/bin/bash

ERRORS=0

# Check for TODOs in documentation files
TODOS=$(grep -r "TODO\|Coming Soon\|FIXME\|XXX\|TBD" guides/ api-reference/ technical-concepts/ use-cases/ index.md getting-started.md introduction.md 2>/dev/null | wc -l)

if [ "$TODOS" -gt 0 ]; then
  echo "FAIL: Found $TODOS TODO/placeholder(s) in documentation"
  grep -r "TODO\|Coming Soon\|FIXME\|XXX\|TBD" guides/ api-reference/ technical-concepts/ use-cases/ index.md getting-started.md introduction.md 2>/dev/null
  ERRORS=$((ERRORS+1))
else
  echo "PASS: No TODOs or placeholders found"
fi

if [ $ERRORS -eq 0 ]; then
  echo "PASS: Content quality check passed"
else
  exit 1
fi
```

### Check 4: Data Display Patterns Applied

```bash
#!/bin/bash

ERRORS=0

# Check API reference pages have parameter tables
if [ -f "api-reference/research-api.md" ]; then
  grep -q "| Parameter | Type | Required |" api-reference/research-api.md || { echo "FAIL: research-api.md missing parameter table"; ERRORS=$((ERRORS+1)); }
  grep -q "```json" api-reference/research-api.md || { echo "FAIL: research-api.md missing JSON response example"; ERRORS=$((ERRORS+1)); }
fi

# Check code examples have language specified
CODE_FILES=$(find guides/ api-reference/ -name "*.md" -type f)
for file in $CODE_FILES; do
  # Check for code blocks without language
  if grep -q "^```$" "$file"; then
    echo "FAIL: $file has code block without language specification"
    ERRORS=$((ERRORS+1))
  fi
done

if [ $ERRORS -eq 0 ]; then
  echo "PASS: Data display pattern check passed"
else
  echo "FAIL: $ERRORS data display pattern check(s) failed"
  exit 1
fi
```

### Check 5: Navigation Structure

```bash
#!/bin/bash

ERRORS=0

# Check _data/navigation.yml contains required sections
grep -q "Getting Started" _data/navigation.yml || { echo "FAIL: Navigation missing 'Getting Started'"; ERRORS=$((ERRORS+1)); }
grep -q "API Reference" _data/navigation.yml || { echo "FAIL: Navigation missing 'API Reference'"; ERRORS=$((ERRORS+1)); }
grep -q "Technical Concepts" _data/navigation.yml || { echo "FAIL: Navigation missing 'Technical Concepts'"; ERRORS=$((ERRORS+1)); }
grep -q "Use Cases" _data/navigation.yml || { echo "FAIL: Navigation missing 'Use Cases'"; ERRORS=$((ERRORS+1)); }
grep -q "Guides" _data/navigation.yml || { echo "FAIL: Navigation missing 'Guides'"; ERRORS=$((ERRORS+1)); }

if [ $ERRORS -eq 0 ]; then
  echo "PASS: Navigation structure check passed"
else
  echo "FAIL: $ERRORS navigation check(s) failed"
  exit 1
fi
```

### Check 6: Download Links

```bash
#!/bin/bash

ERRORS=0

# Check that download links reference v2-prod release
RELEASE_URL="https://github.com/AsobaCloud/zorora/releases/tag/v2-prod"

# Check key pages have download links
if [ -f "index.md" ]; then
  grep -q "$RELEASE_URL" index.md || { echo "FAIL: index.md missing download link to v2-prod"; ERRORS=$((ERRORS+1)); }
fi

if [ -f "getting-started.md" ]; then
  grep -q "$RELEASE_URL" getting-started.md || { echo "FAIL: getting-started.md missing download link to v2-prod"; ERRORS=$((ERRORS+1)); }
fi

if [ -f "guides/installation.md" ]; then
  grep -q "$RELEASE_URL" guides/installation.md || { echo "FAIL: guides/installation.md missing download link to v2-prod"; ERRORS=$((ERRORS+1)); }
fi

if [ $ERRORS -eq 0 ]; then
  echo "PASS: Download links check passed"
else
  echo "FAIL: $ERRORS download link check(s) failed"
  exit 1
fi
```

---

## Execution Order

**CRITICAL**: Execute in this exact order. Do not skip steps.

1. **Archive Ona Content** (move files to archive/)
2. **Create Directory Structure** (guides/, api-reference/, technical-concepts/, use-cases/)
3. **Rewrite Core Pages** (index.md, getting-started.md, introduction.md)
4. **Create Guide Pages** (extract from README)
5. **Create API Reference Pages** (extract from code)
6. **Create Technical Concepts Pages** (extract from ARCHITECTURE.md)
7. **Create Use Cases Pages** (new content)
8. **Update Navigation** (_data/navigation.yml)
9. **Update Config** (_config.yml)
10. **Update CSS** (add new styles if needed)
11. **Regenerate Search Index** (assets/js/search-data.json)
12. **Validate** (run all validation checks)

---

## Success Criteria

**Documentation transformation is COMPLETE if and only if ALL automated validation checks pass:**

### Automated Validation (Blocking)

1. ✅ All files exist at target paths (Check 1)
2. ✅ All overview pages have ≥300 words (Check 2)
3. ✅ All guide pages have ≥200 words (Check 2)
4. ✅ No TODOs or placeholders (Check 3)
5. ✅ Data display patterns applied correctly (Check 4)
6. ✅ Navigation structure correct (Check 5)
7. ✅ Download links reference v2-prod release (Check 6)

### Non-Blocking Verification (Informational Only)

These checks do not gate one-shot completion and may be performed later by a human reviewer:

- All internal links work (manual check)
- All code examples are executable (manual check)
- All API examples match actual API (manual check)
- Brand styling preserved (manual check)

---

## Notes

- **Source of Truth**: All content must be grounded in actual Zorora codebase. Do not invent features.
- **No Aspirational Content**: Only document features that exist in the codebase.
- **Preserve Code Examples**: Copy code examples verbatim from README/COMMANDS.md.
- **Download Links**: Always reference latest release `https://github.com/AsobaCloud/zorora/releases/tag/v2-prod` for download/installation links.
- **Update Links**: Update all internal links to match new file structure.
- **Brand Consistency**: Use brand colors and styling from asobacloud.github.io.
- **Pattern Compliance**: Follow DATA_DISPLAY_PATTERN_GUIDE.md and DOCUMENTATION_IA_GUIDE.md rules mechanically.

---

**END OF PLAN**
