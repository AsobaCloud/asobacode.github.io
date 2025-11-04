---
title: "Custom Models Setup"
layout: default
nav_order: 4
---

# Custom Models Setup {#overview}

**Advanced cost optimization with custom fine-tuned models.**

Integrate your own models for 96% cost reduction on infrastructure tasks while maintaining quality through intelligent routing.

---

## Why Custom Models? {#quick-start}

### Massive Cost Savings
- **Traditional AI**: $10/day for infrastructure tasks
- **Custom models**: $0.40/day (96% cheaper)
- **Annual savings**: $3,500+ per engineer

### Specialized Performance
- Models trained specifically for infrastructure tasks
- Better at Terraform, Kubernetes, Docker generation
- Domain-specific knowledge and patterns

### No Vendor Lock-in
- Your infrastructure, your models
- Automatic fallback to premium models when needed
- Switch providers based on cost and availability

---

## Featured: IaC Model with CLAUDE.md Integration {#model-server-setup}

**Production-ready Infrastructure as Code model with systematic methodology.**

### Enhanced Capabilities
- **CLAUDE.md methodology** - Systematic approach (Explore → Plan → Code → Commit)
- **Production-ready output** - Security, monitoring, and operational guidance built-in
- **Adaptive workflow** - Simple requests get quick responses, complex projects get full methodology
- **96% cost reduction** - Specialized for infrastructure tasks

### Quick Setup {#configuration}
```bash
# Deploy enhanced IaC model server
git clone https://github.com/your-org/iac-model-server
cd iac-model-server

# Start the enhanced inference server
python fixed_inference_server.py

# Configure AsobaCode to use it
export MISTRAL_STATUS_URL="http://your-server:8000/status"
export AI_PROVIDER_STRATEGY="cost_optimized"
```

### What You Get {#usage-examples}
- **Systematic infrastructure planning** for complex projects
- **Security by default** - IAM, encryption, monitoring included
- **Complete deployment guidance** - Tests, runbooks, operational procedures
- **Backwards compatible** - Simple requests still work fast

**Example Output:**
```bash
$ asoba-code ask "design production web infrastructure"

🔍 EXPLORE: Gathering requirements...
🗒️ PLAN: Designing 3-tier architecture with security...
🔨 CODE: Generating Terraform + monitoring...
🏁 COMMIT: Creating tests and deployment procedures...

Generated:
- main.tf (production-ready Terraform)
- monitoring.tf (CloudWatch + alerts)  
- tests.py (infrastructure validation)
- deploy.sh (deployment procedures)
- runbooks.md (operational guidance)
```

---

## Generic Custom Model Integration {#architecture}

### Prerequisites
- Python 3.10+
- Custom model server running
- Model accessible via HTTP API

### Basic Setup {#custom-provider-implementation}

1. **Deploy your model server:**
```bash
# Example with Mistral 7B
python your_model_server.py --port 8000
```

2. **Configure AsobaCode:**
```bash
export AI_PROVIDER_STRATEGY="cost_optimized"
export MISTRAL_STATUS_URL="http://your-server:8000/status"
export MISTRAL_FALLBACK_IP="your-server-ip"
```

3. **Verify integration:**
```bash
# View all models including your custom ones
asobacode models list

# Check custom model status  
curl http://your-server:8000/status
```

### Expected Models List Output {#load-balancing}
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
│ mistral-7b-iac                  │ Custom       │ your-serve │ ✅ Healthy   │
└─────────────────────────────────┴──────────────┴────────────┴──────────────┘

⚙️ Current Configuration:
• Default Region: us-east-1
• Default Bedrock Model: anthropic.claude-3-5-sonnet-20240620-v1:0
• Routing Strategy: cost_optimized
• Custom Model Savings: 96%
```

---

## Model Server Requirements {#real-world-examples}

Your custom model server needs these endpoints:

### Health Check {#performance-optimization}
```
GET /health
Response: {"status": "healthy", "model": "your-model-name"}
```

### Generation Endpoint {#cost-monitoring}
```
POST /generate
Body: {
  "prompt": "your prompt",
  "max_length": 512,
  "temperature": 0.7
}
Response: {
  "code": "generated content",
  "generation_time": 5.2
}
```

### Optional: Model Info
```
GET /
Response: {
  "model": "Mistral-7B-IaC",
  "status": "operational",
  "capabilities": ["terraform", "kubernetes", "docker"]
}
```

---

## Routing Configuration {#troubleshooting}

AsobaCode automatically routes requests to optimize cost and quality:

### Infrastructure Tasks → Custom Models
- Terraform generation
- Kubernetes manifests  
- Docker configurations
- Shell scripts

### Complex Analysis → Premium Models
- Security audits
- Architecture reviews
- Complex troubleshooting
- Multi-system integration

### Configuration Options
```bash
# Cost-first routing (maximize savings)
export AI_PROVIDER_STRATEGY="cost_optimized"

# Quality-first routing (premium models preferred)
export AI_PROVIDER_STRATEGY="quality_first"

# Balanced routing (default)
export AI_PROVIDER_STRATEGY="balanced"
```

---

## Troubleshooting

### Custom Model Not Being Used
```bash
# Check status
asoba-code status

# Verify server is accessible
curl http://your-server:8000/health

# Test generation directly
curl -X POST http://your-server:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test", "max_length": 100}'
```

### Fallback to Bedrock
This is normal behavior when:
- Custom model is unavailable
- Complex analysis tasks require premium models
- Request exceeds custom model capabilities

### Connection Issues
```bash
# Check network connectivity
ping your-server-ip

# Verify port is open
telnet your-server-ip 8000

# Check firewall rules
sudo ufw status
```

---

## Model Training Resources

### Training Your Own IaC Model
- **[Complete Mistral QLoRA Training Guide](../deployments/complete_mistral_qlora_training_guide.md)** - End-to-end training process
- **Training data**: Use real infrastructure code from your organization
- **Hardware**: g5.2xlarge or similar GPU instance
- **Time**: 2-4 hours for fine-tuning
- **Cost**: ~$15 for training, $500+/month savings

### Training Best Practices
- Use production-quality infrastructure code
- Include error examples and fixes
- Balance different infrastructure types
- Test on real-world scenarios

---

## Advanced Configuration

### Multiple Custom Models
```bash
# Primary model for infrastructure
export MISTRAL_STATUS_URL="http://iac-server:8000/status"

# Secondary model for code analysis  
export CUSTOM_CODE_MODEL_URL="http://code-server:8001/status"

# Load balancing strategy
export MODEL_SELECTION_STRATEGY="round_robin"
```

### Performance Optimization
```bash
# Model response caching
export ENABLE_MODEL_CACHE="true"
export CACHE_TTL_SECONDS="300"

# Request batching
export BATCH_REQUESTS="true"
export MAX_BATCH_SIZE="5"
```

### Monitoring Integration
```bash
# Enable metrics collection
export COLLECT_USAGE_METRICS="true"
export METRICS_ENDPOINT="http://monitoring:9090/metrics"

# Cost tracking
export TRACK_COST_SAVINGS="true"
```

---

## Cost Analysis

### Monthly Savings Calculator

| Usage Level | Traditional Cost | With Custom Models | Savings |
|-------------|------------------|-------------------|---------|
| Light (10 tasks/day) | $300 | $12 | $288 (96%) |
| Medium (25 tasks/day) | $750 | $30 | $720 (96%) |
| Heavy (50 tasks/day) | $1,500 | $60 | $1,440 (96%) |

### ROI Calculation
- **Setup time**: 2-4 hours
- **Training cost**: ~$15 (one-time)
- **Monthly savings**: $288+ 
- **Break-even**: First week
- **Annual ROI**: 2,400%+

---

## Next Steps

- **[Command Reference](endpoints.html)** - Learn all available commands
- **[Team Integration](mcp-server-development.html)** - Scale across your team
- **[Troubleshooting](troubleshooting.html)** - Common issues and solutions

---

## Support

Questions about custom model integration?

- **Email**: support@asoba.co
- **Discord**: [Join our community](https://discord.gg/nNV5evcr)
- **Documentation**: [Training guides](../deployments/)