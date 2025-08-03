---
title: "Interactive Exploration"
layout: default
nav_order: 3
---

# Interactive Exploration

Learn how to use AsobaCode effectively through hands-on interaction.

---

## Using / Commands (Interactive Mode) {#using-commands}

Master AsobaCode's interactive CLI with slash commands and examples.

### Getting Started

Launch interactive mode:
```bash
asoba-code
```

You'll see the interactive prompt:
```
🤖 | 
```

### Essential Commands

**System Commands:**
```bash
# Show all available commands
🤖 | /help

# List all slash commands
🤖 | /commands

# Check system status and model availability
🤖 | /status

# Show available AI models
🤖 | /models

# Exit the CLI
🤖 | /exit
```

**Code Generation:**
```bash
# Generate code with natural language
🤖 | generate a python function that reads CSV files
🤖 | create a terraform module for AWS S3 bucket
🤖 | write unit tests for my authentication function

# Generate with specific complexity
🤖 | /generate --complexity high --language rust "HTTP client with retry logic"
```

**Custom Model Commands:**
```bash
# Use specific fine-tuned model
🤖 | /model mistral-policy-analysis "analyze economic impact of solar policy"

# Use IaC specialized model
🤖 | /model mistral-iac-generation "create terraform for multi-AZ deployment"

# Use Qwen Claude-MD model for complex reasoning
🤖 | /model qwen-claude-md "complex architectural design with CLAUDE.md methodology"
```

---

## Understanding Agents {#agentic-workflow}

Learn how agents work in AsobaCode and how to create custom single-use agents.

### What Are Agents?

Agents in AsobaCode are **specialized AI components** that perform specific tasks. Each agent follows the **single responsibility principle** - doing one thing well.

### Types of Agents

**1. Built-in Agents:**
```bash
# Code generation agent
🤖 | /generate "python function to parse JSON"

# Documentation agent
🤖 | /docs "explain AWS Lambda best practices"

# Analysis agent
🤖 | /analyze "review this terraform module for security issues"
```

**2. Model-Specific Agents:**
```bash
# Use a specific model as an agent
🤖 | /model claude-3-sonnet "complex reasoning task"
🤖 | /model mistral-7b "generate infrastructure code"
```

**3. Custom Single-Use Agents:**
```bash
# Define your own agent for specific workflows
🤖 | /agent create data-validator --task "validate CSV format"
🤖 | /agent create cost-analyzer --task "analyze AWS spending"
```

### Creating Custom Agents

**Agent Definition:**
```yaml
# custom-agents.yaml
agents:
  log-analyzer:
    description: "Analyzes application logs for errors"
    model: "claude-3-haiku"
    system_prompt: "You are a log analysis expert..."
    
  api-tester:
    description: "Tests API endpoints and reports issues"
    model: "mistral-7b"
    system_prompt: "You test APIs systematically..."
```

**Using Custom Agents:**
```bash
# Invoke custom agent
🤖 | /log-analyzer --file app.log --severity error

# Chain agents together
🤖 | /api-tester --endpoint /users | /log-analyzer
```

### Agent Orchestration

Agents can work together in workflows:

```bash
# Sequential execution
🤖 | /analyze code.py > /generate tests > /validate

# Parallel execution
🤖 | /parallel --agents "analyzer,linter,security-scan" --target src/

# Conditional execution
🤖 | /if-error /analyze > /debug > /fix
```

---

## Loading Bedrock & Custom Models {#loading-models}

Configure AWS Bedrock and deploy custom fine-tuned models.

### AWS Bedrock Configuration

**Recommended Models:**
- **Amazon Nova Pro** - Primary model for best availability
- **Amazon Nova Lite** - Fast fallback option

**Setup Process:**
Configure AWS credentials and region for Bedrock access. AsobaCode will automatically detect available models in your region.

### Custom Fine-Tuned Models

**Available Models (from deployments):**

**🎯 Mistral Policy Analysis (7B):**
```bash
# Deploy model
🤖 | /deploy-model --name mistral-policy-analysis --instance g5.2xlarge

# Use for analysis
🤖 | /model mistral-policy-analysis "economic impact analysis of renewable energy policy"
```

**🏗️ Mistral Infrastructure-as-Code (7B):**
```bash
# Deploy model
🤖 | /deploy-model --name mistral-iac-generation --instance g5.2xlarge

# Generate infrastructure
🤖 | /model mistral-iac-generation "terraform module for secure multi-region deployment"
```

**🧠 Qwen Claude-MD (14B):**
```bash
# Deploy larger model
🤖 | /deploy-model --name qwen-claude-md --instance g5.4xlarge

# Complex reasoning tasks
🤖 | /model qwen-claude-md "architectural design following CLAUDE.md explore-plan-code-commit methodology"
```

### Model Deployment Commands

**Check Model Availability:**
```bash
# List deployed models
🤖 | /models --deployed

# Check model health
🤖 | /model-health --all

# Show deployment status
🤖 | /deployment-status
```

**Deploy Custom Models:**
```bash
# Deploy single model
🤖 | /deploy --model mistral-policy-analysis --instance g5.2xlarge

# Deploy unified Mistral (60% cost savings)
🤖 | /deploy --unified mistral-dual --instance g5.2xlarge

# Scale model deployment
🤖 | /scale --model qwen-claude-md --instances 2
```

### Cost Optimization Strategies

**Unified Deployment (60% savings):**
```bash
# Deploy both Mistral models on single instance
🤖 | /deploy --unified mistral-dual
# Result: IaC + Policy models sharing base Mistral-7B
```

**Instance Sizing:**
```bash
# Cost-effective for Mistral models
🤖 | /deploy --model mistral-iac-generation --instance g4dn.xlarge

# Performance-optimized for Qwen
🤖 | /deploy --model qwen-claude-md --instance g5.4xlarge
```

---

## What's Next?

1. **[See Real-World Implementation](om-use-case.html)** - Complete O&M business case
2. **[Technical Setup](quick-launch.html#developers)** - 5-minute developer setup
3. **[Business Value](quick-launch.html#business-users)** - Understanding ROI and benefits

[Explore O&M Use Case](om-use-case.html){: .btn .btn-primary }