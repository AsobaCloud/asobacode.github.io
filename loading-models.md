---
title: "Loading Bedrock & Custom Models"
layout: default
nav_order: 6
---

# Loading Bedrock & Custom Models
{: .fs-8 }

Configure AWS Bedrock and deploy custom fine-tuned models with routing strategies.
{: .fs-6 .fw-300 }

---

## AWS Bedrock Model Configuration

### Recommended Models (Nova Pro/Lite)
{: .fs-6 }

**🚀 Amazon Nova Pro** - Primary model for best availability:
- Superior throttling resistance
- Balanced quality and speed  
- Cost-effective for most operations

**⚡ Amazon Nova Lite** - Fast fallback option:
- Fastest response times
- Most cost-effective
- Ideal for simple tasks

### Configuration Setup
{: .fs-6 }

Edit your configuration file:
```yaml
# File: configs/default.yaml
ai_models:
  providers:
    bedrock:
      enabled: true
      region: "us-east-1"
      default_model: "amazon.nova-pro-v1:0"  # Primary model
      preferred_models:
        - "amazon.nova-pro-v1:0"                      # Primary
        - "amazon.nova-lite-v1:0"                     # Fallback 1  
        - "anthropic.claude-3-5-sonnet-20240620-v1:0" # Fallback 2
      
      # Throttling resistance (built-in)
      availability_cache:
        ttl_seconds: 300              # Cache results for 5 minutes
        circuit_breaker_threshold: 3  # Open after 3 consecutive failures
        circuit_breaker_duration: 600 # Stay open for 10 minutes
```

### Testing Bedrock Models
{: .fs-6 }

```bash
# Test Nova Pro availability
aws bedrock invoke-model \
  --model-id amazon.nova-pro-v1:0 \
  --body '{"messages":[{"role":"user","content":[{"text":"test"}]}],"inferenceConfig":{"max_new_tokens":10}}' \
  --region us-east-1 \
  --cli-binary-format raw-in-base64-out

# Test from AsobaCode CLI
🤖 | /test-models

# Show current model configuration  
🤖 | /models
```

---

## Custom Fine-Tuned Models

### Supported Model Types
{: .fs-6 }

**🎯 Mistral 7B Fine-Tuned:**
- Specialized for solar O&M operations
- Equipment-specific diagnostics
- Warranty and compliance knowledge

**🦙 LLaMA Fine-Tuned:**
- Economic dispatch optimization
- Financial analysis and reporting
- Resource allocation strategies

### Custom Model Deployment
{: .fs-6 }

#### Option 1: Self-Hosted Models

```bash
# Set up Mistral server endpoints
export MISTRAL_STATUS_URL="http://your-server:8000/status"
export MISTRAL_FALLBACK_IP="your-server-ip"
export MISTRAL_ENABLED="true"

# Enable in configuration
# Edit configs/default.yaml:
ai_models:
  providers:
    mistral:
      enabled: true
      discovery_url: "http://your-server:8000/status"
      fallback_ip: "your-server-ip"
      default_port: 8000
      specialties: ["solar", "o&m", "diagnostics", "warranty"]
      cost_multiplier: 0.03  # 30x cheaper than Bedrock
```

#### Option 2: Custom API Endpoints

```yaml
# Add custom provider
ai_models:
  providers:
    custom:
      enabled: true
      endpoint_url: "https://your-model-api.com/v1/chat/completions"
      api_key: "your-api-key"
      default_model: "your-fine-tuned-model-name"
      models:
        - name: "solar-diagnostics-v1"
          endpoint: "https://your-api.com/solar-diagnostics"
          specialties: ["inverter-faults", "string-analysis"]
        - name: "economic-dispatch-v1"  
          endpoint: "https://your-api.com/economic-dispatch"
          specialties: ["financial-optimization", "resource-allocation"]
      cost_multiplier: 0.01  # Configure based on your costs
```

### Testing Custom Models
{: .fs-6 }

```bash
# Test custom model connectivity
🤖 | /test-custom-models

# Use specific custom model
🤖 | /model solar-diagnostics-v1 "analyze inverter performance degradation"

# Compare models
🤖 | /compare-models "economic analysis of maintenance timing" --models nova-pro,economic-dispatch-v1
```

---

## Routing Strategies

### Cost-Optimized Strategy
{: .fs-6 }

**Routing Logic:**
1. **Simple tasks** → Custom models (cheapest)
2. **Medium complexity** → Nova Lite (fast and affordable)
3. **High complexity** → Nova Pro (quality and reliability)

```yaml
# Configuration for cost optimization
ai_models:
  fallback_strategy: "cost_optimized"
  routing:
    complexity:
      low: "custom"      # Route to cheapest available
      medium: "auto"     # Balanced selection  
      high: "bedrock"    # Quality-first
```

### Quality-First Strategy
{: .fs-6 }

**Routing Logic:**
1. **All tasks** → Try Nova Pro first
2. **If throttled** → Fall back to Nova Lite
3. **If unavailable** → Use custom models

```yaml
# Configuration for quality-first
ai_models:
  fallback_strategy: "quality_first"
  routing:
    complexity:
      low: "bedrock"     # Best quality even for simple tasks
      medium: "bedrock"  # Consistent high quality
      high: "bedrock"    # Maximum quality
```

### Specialized Task Routing
{: .fs-6 }

**Equipment-Specific Routing:**
```yaml
ai_models:
  routing:
    # Route by task type
    languages:
      solar-diagnostics: "custom"     # Use fine-tuned models
      economic-analysis: "custom"     # Domain-specific models
      general-coding: "bedrock"       # General tasks to Bedrock
      infrastructure: "bedrock"       # Complex infra tasks
```

---

## Model Performance Examples

### Cost Comparison (1000 requests/month)
{: .fs-6 }

| Model Type | Cost per Request | Monthly Cost | Use Case |
|------------|------------------|--------------|----------|
| **Custom Solar Model** | $0.001 | $1.00 | Solar-specific diagnostics |
| **Nova Lite** | $0.003 | $3.00 | Fast general tasks |
| **Nova Pro** | $0.008 | $8.00 | Complex analysis |
| **Claude Sonnet** | $0.015 | $15.00 | Highest quality tasks |

### Performance Metrics
{: .fs-6 }

| Model | Response Time | Accuracy (Solar Tasks) | Cost Efficiency |
|-------|---------------|------------------------|-----------------|
| **Custom Solar** | 0.8s | 94% | Excellent |
| **Nova Pro** | 1.2s | 87% | Good |
| **Nova Lite** | 0.6s | 82% | Excellent |
| **Claude Sonnet** | 2.1s | 89% | Fair |

---

## Quick Examples

### Cost-Optimized Routing
{: .fs-6 }

```bash
# Simple solar diagnostic (routes to custom model)
🤖 | analyze inverter error code E042 for SMA inverter

# Complex infrastructure task (routes to Nova Pro)  
🤖 | /generate --complexity high "complete Terraform module for multi-AZ deployment"

# Financial analysis (routes to custom economic model)
🤖 | calculate optimal maintenance timing for 10MW solar site
```

### Quality-First Routing  
{: .fs-6 }

```bash
# Force high-quality model for critical analysis
🤖 | /model amazon.nova-pro-v1:0 "risk assessment for equipment replacement strategy"

# Use specialized model for domain expertise
🤖 | /model solar-diagnostics-v1 "detailed fault analysis for underperforming string array"
```

### Mixed Strategy
{: .fs-6 }

```bash
# Let AsobaCode choose optimal model
🤖 | optimize maintenance schedule for Q2 considering weather and energy prices

# Override for specific requirements
🤖 | /model economic-dispatch-v1 --force "detailed ROI analysis for inverter replacement"
```

---

## Troubleshooting

### Model Connectivity Issues
{: .fs-6 }

```bash
# Check all model availability
🤖 | /test-models

# Show detailed model status
🤖 | /models --verbose

# Test specific custom model
🤖 | /test-custom-model solar-diagnostics-v1

# Check circuit breaker status
🤖 | /circuit-breaker status
```

### Performance Optimization
{: .fs-6 }

```bash
# Show cache statistics
🤖 | /cache-stats

# Clear cache to force fresh model tests
🤖 | /cache-clear

# Monitor model selection decisions  
🤖 | /debug model-routing on
```

---

## What's Next?

1. **[Master CLI Commands](using-commands.html)** - Use your configured models effectively
2. **[Explore O&M Use Case](om-use-case.html)** - See models in real-world scenarios
3. **[Understand Agentic Workflows](agentic-workflow.html)** - How models work together

[Explore O&M Use Case](om-use-case.html){: .btn .btn-primary }