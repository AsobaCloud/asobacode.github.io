---
title: "Learn Core Concepts"
layout: default
nav_order: 2
---

# Learn Core Concepts {#getting-started}

Understanding how AsobaCode works to maximize your productivity and cost savings.

---

## How AsobaCode Works {#installation}

AsobaCode combines three powerful capabilities in one terminal command:

### **🤖 AI-Powered Automation**
- Natural language commands generate production-ready code
- Automatically selects the best AI model for each task
- Custom fine-tuned models for 96% cost reduction on infrastructure tasks

### **🔍 Intelligent Analysis** 
- Scans code for security vulnerabilities and technical debt
- Provides actionable recommendations with automated fixes
- Integrates findings directly into GitHub issues and PRs

### **🚀 Infrastructure Automation**
- Generates Terraform, Kubernetes, and Docker configurations
- Includes security best practices and monitoring by default
- Supports AWS, GCP, and Azure with compliance built-in

---

## Cost Optimization {#cost-optimization}

### How We Reduce AI Costs by 96%

**Traditional Approach:**
- Every task uses expensive general-purpose AI models
- Simple infrastructure tasks cost $10+ per day
- No task-specific optimization

**AsobaCode's Smart Routing:**
- Infrastructure tasks → Custom fine-tuned models (96% cheaper)
- Complex analysis → Premium models (when quality matters)
- Automatic fallback ensures reliability

### Real Savings Examples

| Team Size | Monthly Savings | Annual Savings |
|-----------|----------------|----------------|
| 1 engineer | $498 | $5,976 |
| 5 engineers | $2,490 | $29,880 |
| 10 engineers | $4,980 | $59,760 |

---

## Multi-Provider AI Architecture {#ai-models-server}

```
User Command: "create terraform for web app"
         ↓
   Intelligence Router
         ↓
┌─────────────────────────────────────┐
│  Infrastructure Task Detected       │
│  → Route to Custom Model (96% cheaper)│
│  → Generate Terraform + Security    │
│  → Fallback to Bedrock if needed    │
└─────────────────────────────────────┘

User Command: "analyze security vulnerabilities"  
         ↓
   Intelligence Router
         ↓
┌─────────────────────────────────────┐
│  Complex Analysis Detected          │
│  → Route to Premium Model (quality) │
│  → Deep security scan + reports     │
│  → Create GitHub issues             │
└─────────────────────────────────────┘
```

---

## Key Use Cases {#real-world-examples}

### **DevOps Engineers**
```bash
# Generate production-ready infrastructure
asoba-code ask "create a highly available web application with auto-scaling and monitoring"

# Cost: $0.40 (custom model) vs $10.00 (traditional)
# Includes: Terraform, security groups, monitoring, backups
```

### **Software Teams**
```bash  
# Comprehensive code analysis
asoba-code ask "scan this repository for security issues and create GitHub issues for each finding"

# Analyzes: Dependencies, code patterns, secrets, vulnerabilities
# Creates: Prioritized GitHub issues with fix recommendations
```

### **Platform Engineers**
```bash
# Multi-cloud infrastructure
asoba-code ask "create Kubernetes manifests for microservices with service mesh and observability"

# Generates: K8s configs, Istio setup, Prometheus monitoring
# Includes: Security policies, resource limits, health checks
```

---

## Command Examples {#usage-examples}

### Infrastructure Generation {#advanced-workflow}
```bash
# Simple web application
asoba-code ask "terraform for web app with database"

# Enterprise setup
asoba-code ask "create production-ready infrastructure with load balancing, auto-scaling, monitoring, and disaster recovery on AWS"

# Multi-cloud deployment  
asoba-code ask "deploy this application to both AWS and GCP with traffic distribution"
```

### Code Analysis {#code-analysis-server}
```bash
# Security scan
asoba-code ask "find security vulnerabilities in this codebase"

# Technical debt analysis
asoba-code ask "analyze code quality and identify refactoring opportunities"

# Performance review
asoba-code ask "review this code for performance bottlenecks and suggest optimizations"
```

### GitHub Integration {#github-server}
```bash
# Issue management
asoba-code ask "create GitHub issues for all the problems you found"

# PR analysis
asoba-code ask "review the latest pull request and suggest improvements"

# Project planning
asoba-code ask "analyze our GitHub issues and create a sprint plan"
```

---

## Advanced Configuration {#configuration-management}

### Cost Optimization Setup
```bash
# Enable custom models for maximum savings
export AI_PROVIDER_STRATEGY="cost_optimized"
export MISTRAL_STATUS_URL="http://your-server:8000/status"

# Verify cost optimization is active
asoba-code status
```

### GitHub Integration
```bash
# Connect your GitHub account
export GITHUB_TOKEN=your_personal_access_token

# Test integration
asoba-code ask "show me open issues in this repository"
```

### AWS Configuration {#environment-variables}
```bash  
# AsobaCode works with existing AWS credentials
aws configure

# Or use environment variables
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
export AWS_DEFAULT_REGION=us-east-1
```

---

## Best Practices {#troubleshooting}

### **Maximize Cost Savings**
- Use descriptive commands for infrastructure tasks (routes to cheap models)
- Batch simple operations together
- Reserve complex analysis for when quality matters most

### **Improve Code Quality**
- Run security scans before each release
- Create GitHub issues for technical debt regularly
- Use AsobaCode for code review automation

### **Infrastructure Management**
- Generate infrastructure code through AsobaCode for consistency
- Include monitoring and security from the start
- Test configurations in staging before production

---

## Next Steps {#support}

- **[See All Commands](endpoints.html)** - Complete command reference
- **[Custom Models Setup](custom-model-integration.html)** - Advanced cost optimization  
- **[Team Integration](mcp-server-development.html)** - Scale across your team
- **[Troubleshooting](troubleshooting.html)** - Common issues and solutions