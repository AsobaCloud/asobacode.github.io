---
title: "Development Workflow"
layout: default
nav_order: 8
parent: Guides
---

# Development Workflow Guide

Multi-step code development workflow with `/develop` command.

## Overview

The `/develop` command executes a comprehensive multi-step workflow for code development. It explores your codebase, plans changes, gets your approval, executes with Codestral, and validates the results.

<div style="width: 100%; max-width: 800px; margin: 24px auto;">
  <div style="width: 100%; height: 300px; background: var(--background-light); border: 2px dashed var(--border-grey); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--text-light);">
    <span>/develop Workflow Screenshot<br/><small>(Placeholder - Add screenshot showing /develop workflow in action with plan display and execution)</small></span>
  </div>
</div>

## Workflow Phases

### Phase 0: Pre-flight Checks

**What happens:**
- Verifies git repository exists (required for safety)
- Warns if uncommitted changes present
- Asks for confirmation to proceed

**Why:** Safety check to prevent data loss

### Phase 1: Codebase Exploration

**What happens:**
- Analyzes project structure and file types
- Detects project type (Node.js, Python, Go, Rust)
- Identifies framework (Express, Flask, Next.js, etc.)
- Reads configuration files (package.json, requirements.txt, etc.)
- Maps dependencies and entry points

**Output:** Codebase analysis report

### Phase 2: Planning

**What happens:**
- Uses reasoning model to create detailed plan
- Identifies files to create/modify
- Specifies dependencies to add
- Orders tasks logically
- Includes testing recommendations

**Output:** Detailed development plan

### Phase 3: User Approval

**What happens:**
- Displays plan with rich formatting
- Shows files to be created/modified
- Lists dependencies to add
- Asks for explicit approval

**User Options:**
- Approve: Proceed with execution
- Reject: Cancel workflow
- Request modifications: Refine plan

**Why:** User control over changes

### Phase 4: Execution

**What happens:**
- Executes approved plan step-by-step
- Uses Codestral for code generation
- Creates/modifies files as planned
- Handles errors gracefully

**Output:** Modified codebase

### Phase 5: Lint & Validate

**What happens:**
- Runs linters (ruff, eslint, etc.)
- Validates syntax
- Reports issues
- Suggests fixes

**Output:** Lint report and validation results

## Using /develop

### Basic Usage

```bash
/develop Add user authentication to my Flask app
```

### Complex Requests

```bash
/develop Refactor the API to use async/await and add comprehensive error handling
```

### Feature Addition

```bash
/develop Add unit tests for the user service with 80% coverage
```

## Requirements

### Git Repository

**Required:** Git repository must exist

**Why:** Safety mechanism to track changes

**Setup:**
```bash
cd your-project
git init
git add .
git commit -m "Initial commit"
```

### Project Structure

**Required:** Recognizable project structure

**Supported:**
- Node.js (package.json)
- Python (requirements.txt, setup.py)
- Go (go.mod)
- Rust (Cargo.toml)

### Uncommitted Changes

**Warning:** Uncommitted changes detected

**Recommendation:** Commit changes before proceeding

**Override:** Can proceed with confirmation

## Workflow Example

### Request

```bash
/develop Add user authentication to my Flask app
```

### Phase 1: Exploration

```
[Phase 1/5] Exploring codebase...
✓ Detected Flask project
✓ Found app.py, requirements.txt
✓ Identified existing routes
```

### Phase 2: Planning

```
[Phase 2/5] Creating development plan...

Plan:
1. Create models/user.py (User model)
2. Create routes/auth.py (authentication routes)
3. Modify app.py (add auth blueprint)
4. Update requirements.txt (add flask-login, bcrypt)
5. Create tests/test_auth.py (unit tests)
```

### Phase 3: Approval

```
[Phase 3/5] Approval required

Files to create:
- models/user.py
- routes/auth.py
- tests/test_auth.py

Files to modify:
- app.py
- requirements.txt

Dependencies to add:
- flask-login
- bcrypt

Approve? (yes/no/modify)
```

### Phase 4: Execution

```
[Phase 4/5] Executing plan...
✓ Created models/user.py
✓ Created routes/auth.py
✓ Modified app.py
✓ Updated requirements.txt
✓ Created tests/test_auth.py
```

### Phase 5: Validation

```
[Phase 5/5] Linting and validation...
✓ Ruff: No issues
✓ Syntax: Valid
✓ Imports: Resolved
```

## Best Practices

### Writing Development Requests

**Be Specific:**
- "Add user authentication with JWT tokens" ✓
- "Add auth" ✗

**Include Requirements:**
- "Add user authentication with email/password, JWT tokens, and password reset" ✓
- "User auth" ✗

**Specify Framework:**
- "Add user authentication to my Flask app" ✓
- "Add authentication" ✗

### Reviewing Plans

**Check File Changes:**
- Review files to be created/modified
- Verify file locations
- Check for conflicts

**Review Dependencies:**
- Verify dependencies are correct
- Check for version conflicts
- Consider security implications

**Approve Carefully:**
- Understand all changes
- Verify plan matches request
- Request modifications if needed

### After Execution

**Review Generated Code:**
- Check for errors
- Verify logic
- Test functionality
- Review security

**Run Tests:**
- Execute unit tests
- Run integration tests
- Verify functionality

**Commit Changes:**
```bash
git add .
git commit -m "Add user authentication"
```

## Troubleshooting

### Git Repository Not Found

**Problem:** Workflow requires git repository

**Solution:**
```bash
cd your-project
git init
git add .
git commit -m "Initial commit"
```

### Plan Not Accurate

**Problem:** Generated plan doesn't match request

**Solution:**
- Request modifications in approval phase
- Be more specific in request
- Break down complex requests

### Execution Fails

**Problem:** Code execution fails

**Solution:**
- Check error messages
- Review generated code
- Fix issues manually
- Re-run workflow

### Lint Errors

**Problem:** Linter reports errors

**Solution:**
- Review lint report
- Fix errors manually
- Re-run linter
- Consider auto-fix options

## See Also

- [Code Generation](/guides/code-generation) - Code generation guide
- [Terminal REPL](/guides/terminal-repl) - Command-line interface
- [Slash Commands](/guides/slash-commands) - Command reference
- [Configuration](/guides/configuration) - Configure models
