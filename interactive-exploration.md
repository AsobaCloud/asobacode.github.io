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

## Agentic Workflow Overview {#agentic-workflow}

Understand the OODA loop: Observe → Orient → Decide → Act

### The OODA Loop in Operations

AsobaCode implements the **OODA (Observe-Orient-Decide-Act) loop** for autonomous operations management.

### 1. Observe: Data Ingestion & Normalization

**Data Sources:**
- Real-time weather station feeds
- SCADA system integration
- Equipment performance metrics
- Maintenance history and costs

**Processing Commands:**
```bash
# Weather normalization
🤖 | /weather-normalize --site SITE001 --period 2024-01-01:2024-01-31

# Performance monitoring
🤖 | /monitor-site --site PORTFOLIO_001 --frequency 15min
```

### 2. Orient: Fault Detection & Diagnostics

**AI-Powered Analysis:**
```bash
# Automated fault detection
🤖 | /fault-detection --equipment inverter --threshold 0.85 --site SITE001

# Equipment diagnosis with Mistral models
🤖 | /model mistral-policy-analysis "analyze equipment failure patterns and economic impact"
```

### 3. Decide: Economic Analysis & Prioritization

**Financial Optimization:**
```bash
# Energy-at-Risk calculation
🤖 | /calculate-ear --equipment INV_001 --degradation-rate 0.15 --horizon 30days

# Maintenance optimization
🤖 | /optimize-dispatch --sites all --constraints weather,crew,parts --objective max_revenue
```

### 4. Act: Work Order Creation & Dispatch

**Automated Actions:**
```bash
# Generate work orders
🤖 | /create-work-orders --priority high --auto-dispatch enabled

# Track dispatch performance
🤖 | /track-dispatch --dashboard portfolio --metrics mttr,cost,recovery
```

---

## Loading Bedrock & Custom Models {#loading-models}

Configure AWS Bedrock and deploy custom fine-tuned models.

### AWS Bedrock Configuration

**Recommended Models:**
- **Amazon Nova Pro** - Primary model for best availability
- **Amazon Nova Lite** - Fast fallback option

**Configuration Setup:**
```yaml
# File: configs/default.yaml
ai_models:
  providers:
    bedrock:
      enabled: true
      region: "us-east-1"
      default_model: "amazon.nova-pro-v1:0"
      preferred_models:
        - "amazon.nova-pro-v1:0"
        - "amazon.nova-lite-v1:0"
        - "anthropic.claude-3-5-sonnet-20240620-v1:0"
```

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