---
title: "Code Generation"
layout: default
nav_order: 7
parent: "Build"
---

# Code Generation Guide

Generate code with Codestral specialist model.

## Overview

Zorora includes dedicated code generation capabilities using the Codestral specialist model. This allows you to generate code, refactor existing code, and implement algorithms with high-quality output.

<div style="width: 100%; max-width: 800px; margin: 24px auto;">
  <div style="width: 100%; height: 300px; background: var(--background-light); border: 2px dashed var(--border-grey); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--text-light);">
    <span>Code Generation Example Screenshot<br/><small>(Placeholder - Add screenshot showing code generation in action)</small></span>
  </div>
</div>

## Using Code Generation

### Terminal Interface

**Automatic Detection:**
```bash
[1] ⚙ > Write a Python function to validate email addresses
```

The system automatically detects code generation intent and routes to Codestral.

**Force Code Generation:**
```bash
[2] ⚙ > /code create a REST API endpoint for user authentication
```

### Code Generation Examples

**Functions:**
```bash
/code write a function to parse JSON files with error handling
```

**Classes:**
```bash
/code create a User class with authentication methods
```

**Scripts:**
```bash
/code write a script to backup files to S3
```

**Refactoring:**
```bash
/code refactor this function to use async/await
```

## Codestral Models

### Local Model

**Model:** qwen/qwen3-vl-4b

**Characteristics:**
- Fast generation (10-30 seconds)
- Basic code quality
- No API costs
- Privacy-preserving

**When to use:**
- Quick code snippets
- Simple functions
- Prototyping

### HuggingFace Model

**Model:** Qwen2.5-Coder-32B-Instruct

**Characteristics:**
- High quality code (60-90 seconds)
- Better understanding of complex requirements
- Requires HF token
- API costs apply

**When to use:**
- Complex implementations
- Production code
- Algorithm implementation

## Code Generation Workflow

### Step 1: Request Code

```bash
/code write a function to validate email addresses using regex
```

### Step 2: Review Generated Code

Codestral generates:
- Complete, executable code
- Comments and documentation
- Error handling
- Example usage

### Step 3: Save Code (Optional)

```bash
> /save email_validator.py
Saved to: email_validator.py
```

## Best Practices

### Writing Code Prompts

**Be Specific:**
- "Write a Python function to validate email addresses using regex" ✓
- "Email validator" ✗

**Include Requirements:**
- "Create a REST API endpoint with authentication and rate limiting" ✓
- "API endpoint" ✗

**Specify Language/Framework:**
- "Write a Flask route for user registration" ✓
- "User registration" ✗

### Code Quality

**Review Generated Code:**
- Check for errors
- Verify logic
- Test functionality
- Review security

**Iterate:**
- Refine prompts for better results
- Ask for improvements
- Request specific patterns

### Saving Code

**Use Descriptive Filenames:**
```bash
/save email_validator.py
/save user_auth_api.py
/save data_processor.py
```

**Organize Files:**
- Save to appropriate directories
- Use version control
- Document purpose

## Advanced Usage

### Code Refactoring

```bash
/code refactor this function to use async/await and add error handling
```

### Algorithm Implementation

```bash
/code implement quicksort algorithm in Python with detailed comments
```

### Testing Code

```bash
/code write unit tests for the email validator function
```

### Documentation

```bash
/code add docstrings and type hints to this function
```

## Integration with Development Workflow

### Using /develop

For multi-file changes, use `/develop`:

```bash
/develop Add user authentication to my Flask app
```

This workflow:
1. Explores codebase
2. Plans changes
3. Gets approval
4. Executes with Codestral
5. Lints and validates

### Combining Commands

```bash
# Research then code
/search latest Python async patterns
/code implement async pattern from research

# Code then develop
/code create user model
/develop add authentication using this model
```

## Troubleshooting

### Code Generation Fails

**Problem:** Codestral model not responding

**Solution:**
- Check model endpoint is configured
- Verify API key (for HF endpoint)
- Check network connectivity
- Review model availability

### Low Quality Code

**Problem:** Generated code is poor quality

**Solution:**
- Use HF 32B model for better quality
- Be more specific in prompts
- Break down complex requests
- Iterate and refine

### Code Not Saving

**Problem:** `/save` command not working

**Solution:**
- Check file permissions
- Verify directory exists
- Check for filename conflicts
- Review error messages

## See Also

- [Development Workflow](/guides/development-workflow) - Multi-step development
- [Terminal REPL](/guides/terminal-repl) - Command-line interface
- [Slash Commands](/guides/slash-commands) - Command reference
- [Configuration](/guides/configuration) - Configure Codestral model
