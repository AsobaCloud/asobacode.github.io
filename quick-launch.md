---
title: "Quick Launch Guide"
layout: default
nav_order: 2
---

# Quick Launch Guide

Choose your path based on your role and goals.

---

## Developers (5-minute setup) {#developers}

Get AsobaCode running with Amazon Nova Pro models and throttling resistance.

### Prerequisites

✅ **AWS credentials** with Bedrock access  
✅ **Python 3.10+** and **Git** installed  
✅ **Terminal/Command Line** environment

### Installation & Setup

**Step 1: Install AsobaCode (2 minutes)**

```bash
# Clone repository
git clone https://github.com/AsobaCloud/asoba-code.git
cd asoba-code

# Install with automatic PATH setup
./install.sh

# Reload shell configuration
source ~/.bashrc  # or ~/.zshrc, or restart terminal
```

**Step 2: Configure AWS (2 minutes)**

```bash
# Configure AWS credentials
aws configure
# Enter: Access Key ID, Secret Access Key, Region (us-east-1)

# Test Nova Pro model (recommended for best availability)
aws bedrock invoke-model \
  --model-id amazon.nova-pro-v1:0 \
  --body '{"messages":[{"role":"user","content":[{"text":"test"}]}],"inferenceConfig":{"max_new_tokens":10}}' \
  --region us-east-1 \
  --cli-binary-format raw-in-base64-out
```

### Immediate CLI Validation (1 minute)

```bash
# Launch interactive mode
asoba-code

# Run validation commands
🤖 | /help
🤖 | /commands
🤖 | generate a python function that calculates fibonacci numbers
```

---

## Business Users {#business-users}

Transform reactive operations into proactive intelligence with industry-specific AI.

### Why AsobaCode: Reactive vs. Proactive O&M

**Traditional operations management is reactive:**
- Equipment fails → scramble to fix → high MTTR
- Unplanned downtime costs $50,000+ per hour
- Manual diagnostics delay proper repairs
- Warranty claims often missed due to poor documentation

**AsobaCode transforms operations into proactive intelligence:**

| Reactive Approach | AsobaCode Proactive |
|------------------|-------------------|
| 🔴 Equipment fails unexpectedly | 🟢 AI predicts failures 2-4 weeks early |
| 🔴 Manual diagnosis (hours/days) | 🟢 Automated fault detection (minutes) |
| 🔴 Generic repair procedures | 🟢 Equipment-specific action plans |
| 🔴 Lost warranty claims | 🟢 Automated warranty validation |
| 🔴 High MTTR (8-24 hours) | 🟢 Reduced MTTR (2-4 hours) |

**Result: 40-60% reduction in operational costs, 75% reduction in unplanned downtime.**

### Industry-Specific AI Advantage

**BloombergGPT Example:**
Bloomberg trained a 50B parameter model specifically for finance. Results vs. general LLMs:
- **50% better** accuracy on financial tasks
- **3x faster** processing of domain-specific queries  
- **90% fewer** hallucinations on technical financial concepts

**AsobaCode's Fine-Tuned Models:**

🔹 **Mistral Policy Analysis Model (7B)**
- Fine-tuned for economic, regulatory, social, environmental analysis
- Specialized endpoints: /analyze/economic, /analyze/regulatory
- Training loss: 0.45 over 3 epochs

🔹 **Mistral Infrastructure-as-Code Model (7B)**  
- Specialized for Terraform, Kubernetes, Docker generation
- Endpoints: /generate/terraform, /generate/kubernetes, /generate/docker
- Optimized for infrastructure deployment tasks

🔹 **Qwen Claude-MD Model (14B)**
- 14B parameter model with CLAUDE.md methodology integration
- Advanced reasoning capabilities for complex tasks
- Configurable deployment options (g5.2xlarge to g5.8xlarge)

**Domain-specific fine-tuned models deliver superior performance for specialized tasks.**

### Next Steps

1. **[See the Full O&M Use Case](om-use-case.html)** - Detailed business problem and solution
2. **[Schedule Enterprise Demo](mailto:sales@asoba.co?subject=AsobaCode%20Enterprise%20Demo)** - Custom deployment discussion
3. **[Technical Implementation](#developers)** - Share with your engineering team

[Talk to Sales](mailto:sales@asoba.co?subject=AsobaCode%20Enterprise%20Demo){: .btn .btn-primary .fs-5 }