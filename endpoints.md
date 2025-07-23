---
title: "Command Reference"
layout: default
nav_order: 3
---

# Command Reference

Complete guide to all AsobaCode CLI commands.

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