---
title: "Command Reference"
layout: default
nav_order: 3
---

# Command Reference

Complete guide to all AsobaCode CLI commands and interactive mode features.

---

## Interactive Mode & Slash Commands {#interactive-mode}

AsobaCode provides an interactive terminal mode with slash commands for quick access to features.

### Entering Interactive Mode
```bash
# Launch interactive mode
asoba-code

# You'll see the welcome screen:
┌─────────────────────────────────────────────────────────────────────┐
│ 🤖 AsobaCode AI Assistant                                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ 🚀 Welcome to AsobaCode Interactive Mode!                          │
│                                                                     │
│ Type your questions or commands naturally:                          │
│ • 'generate a python hello world function'                         │
│ • '/help' for slash commands                                       │
│ • '/commands' to see all available commands                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

🤖 |
```

### Discovering Slash Commands {#slash-command-discovery}

```bash
# Show all available slash commands
🤖 | /commands

# Get help for specific command
🤖 | /help models

# Get help by category  
🤖 | /help system
```

### Core Slash Commands {#core-slash-commands}

#### **`/help [command|category]`** {#help-command}
Get help information for commands or categories.

```bash
🤖 | /help                    # Show all commands
🤖 | /help models             # Help for models command  
🤖 | /help system             # All system commands
```

#### **`/commands`** {#commands-command}
List all available slash commands organized by category.

```bash
🤖 | /commands

📁 System:
  /status - Show system health and configuration
  /servers - List MCP server status
  /exit - Exit interactive mode

📁 AI:
  /models - Manage AI models and configurations
  /ask - Natural language AI queries

📁 Config:
  /configure - Interactive configuration setup
```

#### **`/status`** {#status-slash-command}
Show comprehensive system status.

```bash
🤖 | /status

┌─────────────────────────────────────────────────────────────────────┐
│ 📊 AsobaCode System Status                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ✅ AWS Bedrock: Connected (us-east-1)                              │
│    • claude-3-5-sonnet-20240620-v1:0                              │
│    • claude-3-haiku-20240307-v1:0                                  │
│    • amazon.nova-pro-v1:0                                          │
│                                                                     │
│ ✅ GitHub Integration: Ready                                        │
│ ✅ Code Analysis: 47 rules loaded                                   │
│ ⚠️  Custom Models: Not configured (optional 96% savings)           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### **`/models [subcommand]`** {#models-slash-command}
Manage AI models and configurations with unified view.

```bash
# Show all available models (Bedrock + custom)
🤖 | /models list

# Show only Bedrock models
🤖 | /models bedrock list

# Configure Bedrock settings
🤖 | /models bedrock set --region us-west-2 --model-id anthropic.claude-3-haiku-20240307-v1:0

# Test Bedrock connectivity
🤖 | /models bedrock test

# Show Bedrock configuration
🤖 | /models bedrock config

# Manage custom models
🤖 | /models custom list
🤖 | /models custom add local-mistral http://localhost:8000 --api-key sk-123
🤖 | /models custom remove local-mistral
```

**Example Output:**
```
🤖 Available AI Models

📋 AWS Bedrock Models (3)
┌─────────────────────────────────┬──────────────┬────────────┬──────────────┐
│ Model ID                        │ Provider     │ Region     │ Status       │
├─────────────────────────────────┼──────────────┼────────────┼──────────────┤
│ anthropic.claude-3-5-sonnet-... │ Anthropic    │ us-east-1  │ ✅ Available │
│ anthropic.claude-3-haiku-...    │ Anthropic    │ us-east-1  │ ✅ Available │
│ amazon.nova-pro-v1:0            │ Amazon       │ us-east-1  │ ✅ Available │
└─────────────────────────────────┴──────────────┴────────────┴──────────────┘

🔧 Custom Models (1)
┌─────────────────────────────────┬──────────────┬────────────┬──────────────┐
│ Name                            │ Provider     │ Endpoint   │ Status       │
├─────────────────────────────────┼──────────────┼────────────┼──────────────┤
│ local-mistral-7b                │ Custom       │ localhost  │ ✅ Healthy   │
└─────────────────────────────────┴──────────────┴────────────┴──────────────┘

⚙️ Current Configuration:
• Default Region: us-east-1
• Default Bedrock Model: anthropic.claude-3-5-sonnet-20240620-v1:0
• Routing Strategy: cost_optimized
```

#### **`/servers`** {#servers-slash-command}
Show status of all MCP servers.

```bash
🤖 | /servers

📊 MCP Servers Status:
• AI Models Server: ✅ Running (cost_optimized)
• GitHub Integration: ✅ Connected
• Code Analysis: ✅ Ready (47 rules)
• Terminal Interface: ✅ Active
```

#### **`/configure`** {#configure-slash-command}
Interactive configuration setup.

```bash
🤖 | /configure

🔧 AsobaCode Configuration Setup

1. AWS Bedrock Region: [us-east-1]
2. Default AI Model: [anthropic.claude-3-5-sonnet-20240620-v1:0]
3. Cost Optimization: [Enabled]
4. GitHub Integration: [Connected]

Type number to change, or 'done' to finish:
```

#### **`/exit`** {#exit-slash-command}
Exit interactive mode.

```bash
🤖 | /exit

👋 Thanks for using AsobaCode! 
   Your session has been saved.
```

---

## Natural Language Queries {#natural-language-queries}

In interactive mode, you can also use natural language alongside slash commands:

```bash
# Mix slash commands with natural language
🤖 | /models list
🤖 | generate terraform for web app
🤖 | /status
🤖 | analyze this code for security issues
```

---

## Basic Commands

### **`asoba-code ask`** {#natural-language}
The main command for all AI-powered tasks. Use natural language to describe what you want.

```bash
asoba-code ask "your request here"
```

**Examples:**
```bash
# Infrastructure
asoba-code ask "create terraform for a web application with database"

# Code analysis
asoba-code ask "scan this code for security vulnerabilities"

# GitHub integration
asoba-code ask "create GitHub issues for the problems you found"
```

### **`asoba-code status`** {#system-status}
Check system health and configuration.

```bash
asoba-code status
```

Shows:
- AI provider status
- Cost optimization status
- GitHub integration status
- System configuration

### **`asoba-code --help`** {#project-init}
Display available commands and options.

```bash
asoba-code --help
```

---

## Infrastructure Commands {#infrastructure-generation}

### Generate Terraform
```bash
# Simple web app
asoba-code ask "create terraform for web app with RDS database"

# Production setup
asoba-code ask "terraform for highly available web application with auto-scaling, load balancer, and monitoring on AWS"

# Multi-cloud
asoba-code ask "create terraform for AWS and GCP deployment with traffic routing"
```

### Generate Kubernetes {#container-orchestration}
```bash
# Basic deployment
asoba-code ask "create kubernetes manifests for my web application"

# Microservices
asoba-code ask "generate k8s configs for microservices with service mesh and monitoring"

# Production ready
asoba-code ask "kubernetes deployment with auto-scaling, health checks, and security policies"
```

### Generate Docker
```bash
# Simple Dockerfile
asoba-code ask "create dockerfile for Node.js application"

# Multi-stage build
asoba-code ask "dockerfile with multi-stage build for production deployment"

# Docker Compose
asoba-code ask "docker-compose for web app with database and redis"
```

---

## Code Analysis Commands

### Security Analysis {#security-scanning}
```bash
# Basic security scan
asoba-code ask "scan this codebase for security vulnerabilities"

# Detailed security review
asoba-code ask "perform comprehensive security audit with threat modeling"

# Dependency scanning
asoba-code ask "check dependencies for known vulnerabilities"
```

### Technical Debt Analysis {#technical-debt}
```bash
# Code quality analysis
asoba-code ask "analyze code quality and identify technical debt"

# Performance review
asoba-code ask "review code for performance bottlenecks and optimization opportunities"

# Architecture analysis
asoba-code ask "analyze system architecture and suggest improvements"
```

### Code Review {#performance-analysis}
```bash
# General code review
asoba-code ask "review this code and suggest improvements"

# Best practices check
asoba-code ask "check if code follows best practices and industry standards"

# Refactoring suggestions
asoba-code ask "identify refactoring opportunities in this codebase"
```

---

## GitHub Integration Commands

### Issue Management {#issue-management}
```bash
# Create issues from analysis
asoba-code ask "create GitHub issues for all the problems you found"

# Analyze existing issues
asoba-code ask "analyze open GitHub issues and prioritize them"

# Sprint planning
asoba-code ask "create sprint plan based on GitHub issues"
```

### Pull Request Analysis {#integration-patterns}
```bash
# PR review
asoba-code ask "review the latest pull request"

# PR analysis with suggestions
asoba-code ask "analyze PR #123 and suggest improvements"

# Compare branches
asoba-code ask "compare feature branch with main and highlight changes"
```

### Repository Management {#repository-analysis}
```bash
# Repository overview
asoba-code ask "analyze this repository structure and health"

# Contribution analysis
asoba-code ask "analyze team contributions and code patterns"

# Documentation review
asoba-code ask "review documentation and suggest improvements"
```

---

## Advanced Commands

### Multi-Step Workflows {#workflow-automation}
```bash
# Complete infrastructure deployment
asoba-code ask "deploy microservices architecture with monitoring, logging, security, and CI/CD pipeline"

# End-to-end security review
asoba-code ask "perform security audit, create findings report, and generate remediation plan"

# Code quality improvement
asoba-code ask "analyze technical debt, create improvement plan, and generate GitHub issues"
```

### Cost Optimization {#batch-operations}
```bash
# Infrastructure cost analysis
asoba-code ask "analyze AWS infrastructure costs and suggest optimizations"

# Resource optimization
asoba-code ask "review resource utilization and recommend rightsizing"

# Cost monitoring setup
asoba-code ask "create cost monitoring and alerting for AWS resources"
```

### Compliance & Governance {#compliance-automation}
```bash
# Compliance check
asoba-code ask "review infrastructure for SOC2 compliance requirements"

# Security governance
asoba-code ask "implement security governance policies and monitoring"

# Audit preparation
asoba-code ask "prepare compliance audit documentation and evidence"
```

---

## Configuration Commands {#configuration-commands}

### Cost Optimization Setup {#usage-tracking}
```bash
# Enable custom models
export AI_PROVIDER_STRATEGY="cost_optimized"
export MISTRAL_STATUS_URL="http://your-server:8000/status"

# Verify setup
asoba-code status
```

### GitHub Integration Setup
```bash
# Set GitHub token
export GITHUB_TOKEN=your_personal_access_token

# Test integration
asoba-code ask "list open issues in this repository"
```

### AWS Configuration {#environment-setup}
```bash
# Use existing AWS CLI configuration
aws configure

# Or set environment variables
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
export AWS_DEFAULT_REGION=us-east-1
```

---

## Command Patterns

### Best Practices for Commands

**✅ Good Commands (Clear and Specific)**
```bash
asoba-code ask "create terraform for web application with PostgreSQL database and Redis cache"
asoba-code ask "scan Python code for SQL injection vulnerabilities"
asoba-code ask "review latest commit for code quality issues"
```

**❌ Avoid Vague Commands**
```bash
asoba-code ask "help me"
asoba-code ask "fix my code"
asoba-code ask "make it better"
```

### Command Structure
```bash
asoba-code ask "[action] [target] [context/requirements]"

# Examples:
asoba-code ask "create terraform for web app with high availability"
#              ↑      ↑        ↑
#           action  target   context

asoba-code ask "analyze security vulnerabilities in authentication module"
#              ↑       ↑                      ↑
#           action  target                context
```

---

## Troubleshooting Commands {#troubleshooting}

### System Diagnostics
```bash
# Check system status
asoba-code status

# Verbose output
asoba-code --verbose ask "your command"

# Debug mode
asoba-code --debug ask "your command"
```

### Common Issues
```bash
# Test AI connectivity
asoba-code ask "hello world test"

# Test GitHub integration
asoba-code ask "test github connection"

# Test AWS credentials
asoba-code ask "test aws connection"
```

---

## Output Formats

AsobaCode automatically formats output based on the request type:

- **Code files** → Saved to appropriate files (main.tf, deployment.yaml, etc.)
- **Analysis reports** → Formatted markdown with actionable recommendations
- **GitHub integration** → Creates issues, comments, or PRs directly
- **Status information** → Terminal-friendly formatted output

---

## Getting Help

### Built-in Help
```bash
asoba-code --help
asoba-code ask --help
```

### Support Resources
- **[Troubleshooting Guide](troubleshooting.html)** - Common issues and solutions
- **[Custom Models](custom-model-integration.html)** - Advanced cost optimization
- **Email**: support@asoba.co
- **Discord**: [Join our community](https://discord.gg/nNV5evcr)