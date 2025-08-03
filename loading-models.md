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

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
      <a href="https://discord.gg/nNV5evcr" target="_blank" class="support-button" style="margin-top: 10px; display: inline-block;">
        <svg width="16" height="16" style="margin-right: 8px; vertical-align: middle;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Join Our Discord
      </a>
    </div>
  </div>
  
  <div class="end-column">
    <div id="mc_embed_shell">
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
      <style type="text/css">
        #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 100%;}
      </style>
      <div id="mc_embed_signup">
        <form action="https://asoba.us10.list-manage.com/subscribe/post?u=459ea321d7831d7b9f5fac70f&amp;id=e03a70f492&amp;f_id=000a9ae3f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
          <div id="mc_embed_signup_scroll">
            <h3>Subscribe to Updates</h3>
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            <div class="mc-field-group"><label for="mce-FNAME">First Name </label><input type="text" name="FNAME" class=" text" id="mce-FNAME" value=""></div>
            <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" value="" required=""></div>
            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style="display: none;"></div>
              <div class="response" id="mce-success-response" style="display: none;"></div>
            </div>
            <div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_459ea321d7831d7b9f5fac70f_e03a70f492" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe"></div>
          </div>
        </form>
      </div>
      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
      <script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[1]='FNAME';ftypes[1]='text';fnames[0]='EMAIL';ftypes[0]='email';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[6]='COMPANY';ftypes[6]='text';fnames[7]='MMERGE7';ftypes[7]='url';fnames[8]='MMERGE8';ftypes[8]='text';fnames[9]='MMERGE9';ftypes[9]='text';fnames[10]='MMERGE10';ftypes[10]='text';fnames[11]='MMERGE11';ftypes[11]='url';fnames[12]='MMERGE12';ftypes[12]='text';fnames[13]='MMERGE13';ftypes[13]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    </div>
  </div>
</div>