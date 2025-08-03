---
title: "Developers (5-minute setup)"
layout: default
nav_order: 2
---

# Developers: 5-Minute Setup
{: .fs-8 }

Get AsobaCode running with Amazon Nova Pro models and throttling resistance.
{: .fs-6 .fw-300 }

---

## Prerequisites

✅ **AWS credentials** with Bedrock access  
✅ **Python 3.10+** and **Git** installed  
✅ **Terminal/Command Line** environment

### Get AWS Credentials
If you don't have AWS Bedrock access:
1. Go to [AWS Bedrock Console](https://console.aws.amazon.com/bedrock/)
2. Request access to **Amazon Nova Pro** model
3. Note your Access Key ID and Secret Key

---

## Installation & Setup

### Step 1: Install AsobaCode (2 minutes)

```bash
# Clone repository
git clone https://github.com/AsobaCloud/asoba-code.git
cd asoba-code

# Install with automatic PATH setup
./install.sh

# Reload shell configuration
source ~/.bashrc  # or ~/.zshrc, or restart terminal
```

### Step 2: Configure AWS (2 minutes)

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

---

## Immediate CLI Validation (1 minute)

### Launch Interactive Mode
```bash
asoba-code
```

### Run Validation Commands
Once in the CLI, test these commands:

```bash
# Show available commands
🤖 | /help

# List all available commands
🤖 | /commands

# Generate your first function
🤖 | generate a python function that calculates fibonacci numbers

# Check system status
🤖 | /status

# Show available models
🤖 | /models
```

### Expected Output

✅ **System Status**:
```
✅ AWS Bedrock connection: Connected (Nova Pro active)
✅ Model access: Amazon Nova Pro (primary), Nova Lite (fallback)
✅ Throttling resistance: Availability cache enabled, circuit breaker ready
```

✅ **Generated Code**:
```python
def fibonacci(n):
    """Calculate the nth Fibonacci number using iteration."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    
    return b

# Usage example
print(fibonacci(10))  # Output: 55
```

---

## Troubleshooting

**🚨 "AccessDeniedException"**:
```bash
# Request model access in AWS Console:
# 1. Go to AWS Bedrock > Model access
# 2. Request access to Amazon Nova Pro
# 3. Wait for approval (usually immediate)
```

**🚨 "ThrottlingException"**:
✅ **No action needed!** AsobaCode automatically handles throttling with:
- Availability caching (5-minute TTL)
- Circuit breaker protection  
- Exponential backoff

**🚨 "Command not found"**:
```bash
# Manually add to PATH
export PATH=$PATH:$HOME/.local/bin
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
```

---

## What's Next?

1. **[Learn Interactive Commands](using-commands.html)** - Master the `/` command system
2. **[Explore Agentic Workflows](agentic-workflow.html)** - Understand the OODA loop
3. **[Add Custom Models](loading-models.html)** - Configure your own fine-tuned models

[Continue to Interactive Commands](using-commands.html){: .btn .btn-primary }