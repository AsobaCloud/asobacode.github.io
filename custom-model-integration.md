---
title: "Custom Model Integration"
layout: default
nav_order: 6
---

## Custom Model Integration Guide {#custom-model-integration}

> **Complete guide to integrating your own fine-tuned models with AsobaCode's multi-provider architecture**

Transform your AI costs and performance by integrating custom fine-tuned models with AsobaCode CLI. This comprehensive guide covers setup, configuration, routing, and optimization for 30x cost reduction while maintaining quality.

---

## Overview {#overview}

AsobaCode's multi-provider architecture allows seamless integration of custom models alongside AWS Bedrock, providing:

- **🏷️ 30x Cost Reduction**: Custom models for infrastructure tasks (~$0.03 vs ~$1.00 per generation)
- **🎯 Specialized Performance**: Fine-tuned models optimized for specific domains (infrastructure, security, etc.)
- **🔄 Graceful Fallback**: Automatic failover to Bedrock when custom models are unavailable
- **🚫 Zero Vendor Lock-in**: Flexible provider switching based on availability and cost

### Supported Custom Model Types {#model-types}

- **Self-hosted Models**: Mistral 7B, LLaMA 2/3, CodeLLaMA, etc.
- **Fine-tuned Models**: Domain-specific models trained on your data
- **Local Models**: Models running on your infrastructure
- **API-based Models**: Custom model APIs with REST/gRPC interfaces

---

## Quick Start: Custom Mistral Integration {#quick-start}

Get your custom Mistral model integrated in 5 minutes:

### 1. Deploy Your Model Server {#model-server-setup}

```python
# Example: Custom Mistral 7B server
from flask import Flask, request, jsonify
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

class CustomMistralServer:
    def __init__(self, model_path: str):
        self.model = AutoModelForCausalLM.from_pretrained(model_path)
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        
    def generate(self, prompt: str, max_tokens: int = 512) -> dict:
        inputs = self.tokenizer(prompt, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model.generate(
                inputs.input_ids,
                max_length=inputs.input_ids.shape[1] + max_tokens,
                temperature=0.7,
                do_sample=True
            )
        
        generated_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return {
            "choices": [{"text": generated_text[len(prompt):]}],
            "usage": {"total_tokens": len(outputs[0])},
            "model": "custom-mistral-7b"
        }

app = Flask(__name__)
model_server = CustomMistralServer("/path/to/your/model")

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    result = model_server.generate(
        data["prompt"], 
        data.get("max_tokens", 512)
    )
    return jsonify(result)

@app.route("/status", methods=["GET"])
def status():
    return jsonify({
        "status": "healthy",
        "model": "custom-mistral-7b",
        "gpu_memory": torch.cuda.memory_allocated() if torch.cuda.is_available() else 0
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
```

### 2. Configure AsobaCode Integration {#configuration}

```bash
# Enable custom model detection
export MISTRAL_STATUS_URL="http://your-server:8000/status"
export MISTRAL_FALLBACK_IP="your-server-ip"

# Optimize routing for cost savings
export AI_PROVIDER_STRATEGY="cost_optimized"
export AI_DEFAULT_PROVIDER="auto"

# Test integration
asoba-code ask "Test custom model connectivity"
```

### 3. Start Using Cost-Effective Infrastructure Generation {#usage-examples}

```bash
# Infrastructure tasks automatically use your custom model (30x cheaper)
asoba-code ask "Create Terraform configuration for AWS VPC with auto-scaling"
# Cost: ~$0.03 instead of ~$1.00 with Bedrock

# Complex reasoning still uses high-quality Bedrock
asoba-code ask "Design distributed systems architecture with fault tolerance"
# Automatically routes to Bedrock for quality

# Check cost breakdown
asoba-code ask "Generate Kubernetes deployment and show cost breakdown"
```

---

## Architecture Deep Dive {#architecture}

### Provider Abstraction Layer {#provider-abstraction}

AsobaCode uses a clean abstraction pattern that makes adding custom models straightforward:

```python
# Base provider interface
from abc import ABC, abstractmethod
from typing import Any, Dict
from decimal import Decimal

class BaseModelProvider(ABC):
    """Abstract base class for all AI model providers."""
    
    @abstractmethod
    def generate_code(self, description: str, language: str = "python", 
                     complexity: str = "medium", **kwargs) -> Dict[str, Any]:
        """Generate code using the provider's models."""
        pass
    
    @abstractmethod
    def is_available(self) -> bool:
        """Check if the provider is currently available."""
        pass
    
    @abstractmethod
    def estimate_cost(self, description: str, **kwargs) -> Decimal:
        """Estimate the cost for a generation request."""
        pass
```

### Multi-Provider Architecture {#multi-provider-architecture}

```
┌─────────────────────────────────────────────────────────────┐
│                  Provider Manager                          │
│              Intelligent Routing & Fallback                │
├─────────────────────────────────────────────────────────────┤
│  AWS Bedrock Provider    │    Custom Mistral Provider      │
│  ┌─────────────────────┐ │    ┌─────────────────────────┐    │
│  │ Claude 4 Sonnet     │ │    │ Fine-tuned Mistral 7B   │    │
│  │ Llama 4 Scout       │ │    │ Infrastructure-focused  │    │
│  │ DeepSeek-R1         │ │    │ 30x cost reduction      │    │
│  │ Out-of-box ready    │ │    │ Optional configuration  │    │
│  └─────────────────────┘ │    └─────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Intelligent Provider Routing {#intelligent-routing}

The system automatically routes requests based on:

1. **Language Type**: Infrastructure languages (Terraform, YAML) → Custom models
2. **Task Complexity**: High complexity → Bedrock for quality
3. **Cost Strategy**: Cost-optimized → Custom models first
4. **Availability**: Graceful fallback when providers are unavailable

---

## Advanced Integration Patterns {#advanced-integration}

### Custom Provider Implementation {#custom-provider-implementation}

Create your own provider for any model or API:

```python
# Example: OpenAI-compatible provider
class CustomOpenAIProvider(BaseModelProvider):
    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or {}
        self.api_endpoint = self.config.get("api_endpoint")
        self.api_key = self.config.get("api_key")
        
    def generate_code(self, description: str, language: str = "python", 
                     complexity: str = "medium", **kwargs) -> Dict[str, Any]:
        try:
            # Custom API call logic
            response = self._call_custom_api(description, language, complexity)
            
            return {
                "code": response["generated_code"],
                "model_used": "custom-openai-model",
                "cost": self._calculate_cost(response),
                "language": language,
                "provider": "custom_openai"
            }
        except Exception as e:
            return {
                "error": str(e),
                "code": f"# Error: {e}",
                "provider": "custom_openai"
            }
    
    def is_available(self) -> bool:
        try:
            # Health check your API
            response = requests.get(f"{self.api_endpoint}/health")
            return response.status_code == 200
        except:
            return False
```

### Load Balancing Multiple Instances {#load-balancing}

Scale your custom models with load balancing:

```python
class LoadBalancedProvider(BaseModelProvider):
    def __init__(self, server_pool: List[str]):
        self.server_pool = server_pool
        self.current_index = 0
        
    def get_next_server(self) -> str:
        """Round-robin server selection."""
        server = self.server_pool[self.current_index]
        self.current_index = (self.current_index + 1) % len(self.server_pool)
        return server
    
    def generate_code(self, *args, **kwargs):
        for attempt in range(len(self.server_pool)):
            server = self.get_next_server()
            try:
                return self._generate_with_server(server, *args, **kwargs)
            except Exception:
                continue  # Try next server
        
        # All servers failed
        return {"error": "All custom model servers unavailable"}
```

---

## Configuration & Environment Setup {#configuration-setup}

### Complete Configuration Example {#complete-config}

```yaml
# ~/.config/asobacode/config.yaml
ai_models:
  default_provider: "auto"
  fallback_strategy: "cost_optimized"
  
  providers:
    # AWS Bedrock (always enabled)
    bedrock:
      enabled: true
      region: "us-east-1"
      preferred_models:
        - "anthropic.claude-3-5-sonnet-20240620-v1:0"
      specialties: ["reasoning", "analysis", "complex_tasks"]
    
    # Custom Mistral (infrastructure-focused)
    mistral:
      enabled: false  # Auto-enabled when URLs provided
      discovery_url: ""  # Set via MISTRAL_STATUS_URL
      fallback_ip: ""    # Set via MISTRAL_FALLBACK_IP
      specialties: ["infrastructure", "yaml", "terraform", "kubernetes"]
      cost_multiplier: 0.03  # 30x cheaper
  
  # Task-based routing
  routing:
    languages:
      terraform: "mistral"      # Infrastructure prefers custom
      yaml: "mistral"
      kubernetes: "mistral"
      python: "auto"            # Auto-selection
      rust: "bedrock"           # Complex languages use Bedrock
    
    complexity:
      low: "auto"               # Cost-optimized
      medium: "auto"            # Balanced
      high: "bedrock"           # Quality-first
      
    custom_rules:
      - condition: "description contains 'security'"
        provider: "bedrock"     # Security uses high-quality models
      - condition: "cost_budget < 0.10"
        provider: "mistral"     # Low budget uses custom models
```

### Environment Variables {#environment-variables}

```bash
# Custom Model Configuration
export MISTRAL_STATUS_URL="http://your-server:8000/status"
export MISTRAL_FALLBACK_IP="10.0.1.50"
export MISTRAL_SERVER_IPS="10.0.1.50,10.0.1.51,10.0.1.52"  # Load balancing

# Provider Strategy
export AI_PROVIDER_STRATEGY="cost_optimized"  # Routes to cheapest first
export AI_DEFAULT_PROVIDER="auto"             # Intelligent selection

# Performance Tuning
export AI_MAX_RETRIES="3"
export AI_TIMEOUT="30"
export AI_COST_BUDGET="1.00"  # Maximum cost per request
```

---

## Real-World Examples {#real-world-examples}

### Example 1: Infrastructure Team Workflow {#infrastructure-workflow}

```bash
# Morning: Generate infrastructure templates (uses custom Mistral)
asoba-code ask "Create complete AWS infrastructure with:
- VPC with public/private subnets
- Auto-scaling web tier
- RDS with read replicas
- CloudFront + Route53
- Monitoring and alerting"
# Cost: ~$0.05 (custom model) vs ~$1.50 (Bedrock only)

# Afternoon: Security review (routes to Bedrock for quality)
asoba-code ask "Review the infrastructure templates for security best practices and compliance requirements"
# Cost: ~$0.75 (high-quality analysis)

# End of day: Generate documentation (custom model)
asoba-code ask "Create comprehensive documentation for the infrastructure setup with deployment procedures"
# Cost: ~$0.03

# Daily total: ~$0.83 vs ~$3.00 with Bedrock-only (72% savings)
```

### Example 2: Development Team Integration {#development-integration}

```python
# Automated cost-optimized workflow
from asoba_code.servers.ai_models.providers.manager import ProviderManager

def daily_development_workflow():
    config = {
        "ai_models": {
            "fallback_strategy": "cost_optimized",
            "providers": {
                "bedrock": {"enabled": True},
                "mistral": {"enabled": True, "cost_multiplier": 0.03}
            }
        }
    }
    
    provider_manager = ProviderManager(config)
    
    tasks = [
        # Infrastructure tasks → Custom Mistral (cheap)
        {
            "description": "Generate Kubernetes deployment for microservice",
            "language": "yaml",
            "complexity": "medium"
        },
        # Complex architecture → Bedrock (quality)
        {
            "description": "Design distributed caching strategy", 
            "language": "python",
            "complexity": "high"
        },
        # Documentation → Custom model (cost-effective)
        {
            "description": "Generate API documentation",
            "language": "markdown",
            "complexity": "low"
        }
    ]
    
    total_cost = 0.0
    for task in tasks:
        result = provider_manager.generate_code_with_fallback(**task)
        cost = result.get('cost', 0.0)
        total_cost += cost
        
        print(f"Task: {task['description'][:30]}...")
        print(f"  Provider: {result.get('provider_used')}")
        print(f"  Cost: ${cost:.4f}")
    
    print(f"\nTotal cost: ${total_cost:.4f}")
    print("Estimated savings: 70-80% vs Bedrock-only")

if __name__ == "__main__":
    daily_development_workflow()
```

### Example 3: Enterprise Deployment {#enterprise-deployment}

```bash
# Enterprise-scale deployment with custom models
# 1. Set up multiple custom model instances for load balancing
export MISTRAL_SERVER_IPS="10.0.1.50,10.0.1.51,10.0.1.52"

# 2. Configure enterprise routing
asoba-code config set ai_models.routing.enterprise_rules '[
  {
    "condition": "team == production",
    "provider": "bedrock",
    "reason": "production_quality"
  },
  {
    "condition": "team == development", 
    "provider": "mistral",
    "reason": "cost_optimization"
  }
]'

# 3. Enterprise workflow automation
asoba-code ask "Set up enterprise DevOps pipeline with:
- Multi-environment infrastructure (dev/staging/prod)
- Automated testing and security scanning
- Cost-optimized development workflows
- High-quality production deployments
- Compliance monitoring and reporting"

# Result: 60-70% cost reduction while maintaining production quality
```

---

## Performance Optimization {#performance-optimization}

### Model Warm-up and Caching {#caching}

```python
class OptimizedCustomProvider(BaseModelProvider):
    def __init__(self, config: Dict[str, Any] = None):
        super().__init__(config)
        self._cache = {}
        self._warm_up_models()
        
    def _warm_up_models(self):
        """Pre-warm models to reduce first-request latency."""
        try:
            server = self._discovery.get_healthy_server()
            if server:
                requests.post(
                    f"http://{server.ip}:{server.port}/warm-up",
                    json={"model": "mistral-7b"},
                    timeout=10
                )
        except:
            pass  # Warm-up is optional
    
    def generate_code(self, description: str, **kwargs) -> Dict[str, Any]:
        # Check cache first
        cache_key = self._create_cache_key(description, kwargs)
        if cache_key in self._cache:
            cached_result = self._cache[cache_key].copy()
            cached_result["from_cache"] = True
            cached_result["cost"] = 0.0  # Cached requests are free
            return cached_result
        
        # Generate new result
        result = super().generate_code(description, **kwargs)
        
        # Cache successful results
        if "error" not in result:
            self._cache[cache_key] = result
        
        return result
```

### Cost Monitoring and Optimization {#cost-monitoring}

```python
class CostOptimizedWorkflow:
    def __init__(self, monthly_budget: float = 100.0):
        self.monthly_budget = monthly_budget
        self.current_spend = 0.0
        self.request_count = 0
        
    def execute_with_budget_awareness(self, task: Dict) -> Dict:
        # Estimate cost before execution
        estimated_cost = self._estimate_task_cost(task)
        
        # Check budget constraints
        if self.current_spend + estimated_cost > self.monthly_budget * 0.9:
            # Near budget limit - force cost-optimized provider
            task["force_provider"] = "mistral"
            
        result = self.provider_manager.generate_code_with_fallback(**task)
        
        # Track actual cost
        actual_cost = result.get("cost", 0.0)
        self.current_spend += actual_cost
        self.request_count += 1
        
        # Report cost efficiency
        print(f"Request {self.request_count}:")
        print(f"  Estimated: ${estimated_cost:.4f}")
        print(f"  Actual: ${actual_cost:.4f}")
        print(f"  Monthly spend: ${self.current_spend:.2f} / ${self.monthly_budget:.2f}")
        print(f"  Efficiency: {(1 - actual_cost/estimated_cost)*100:.1f}% better than estimate")
        
        return result
```

---

## Troubleshooting & Best Practices {#troubleshooting}

### Common Issues and Solutions {#common-issues}

#### Issue 1: Custom Model Not Detected {#model-not-detected}

```bash
# Debug steps
curl http://your-server:8000/status  # Check server health
echo $MISTRAL_STATUS_URL             # Verify environment variables
asoba-code servers --health          # Test AsobaCode detection

# Solutions
export MISTRAL_STATUS_URL="http://your-server:8000/status"
export MISTRAL_FALLBACK_IP="your-server-ip"
asoba-code ask "Test custom model connectivity"
```

#### Issue 2: High Latency or Timeouts {#latency-issues}

```bash
# Increase timeouts
export AI_TIMEOUT=60

# Enable performance monitoring
export LOG_LEVEL=DEBUG
asoba-code --debug ask "Simple test request"

# Optimize model server
# - Use GPU acceleration
# - Implement model caching
# - Add load balancing
```

#### Issue 3: Cost Optimization Not Working {#cost-issues}

```yaml
# Verify routing configuration
ai_models:
  routing:
    languages:
      terraform: "mistral"  # Ensure infrastructure routes to custom
      yaml: "mistral"
    
    complexity:
      low: "auto"          # Allow cost optimization for simple tasks
```

### Best Practices {#best-practices}

#### 1. Model Selection Strategy {#model-selection}

- **Infrastructure/DevOps tasks**: Use custom models (30x cost reduction)
- **Security analysis**: Use Bedrock models (higher accuracy)
- **Complex reasoning**: Use Bedrock models (better quality)
- **Documentation**: Use custom models (cost-effective)

#### 2. Cost Management {#cost-management}

```bash
# Set up cost monitoring
export AI_COST_BUDGET="50.00"  # Monthly budget
asoba-code config set ai_models.cost_alerts.enabled true

# Regular cost reviews
asoba-code ask "Show my AI usage and costs for this month"

# Batch similar requests to reduce overhead
asoba-code ask "Analyze all Terraform files in /infrastructure for best practices"
```

#### 3. Quality Assurance {#quality-assurance}

```bash
# Validate custom model outputs
asoba-code ask "Review the infrastructure code generated by custom model for accuracy"

# A/B testing between providers
asoba-code ask "Generate the same infrastructure template using both custom and Bedrock models for comparison"
```

---

## Support and Next Steps {#support}

### Getting Help {#getting-help}

- **📧 Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- **💬 Discord Community**: [Join Our Discord](https://discord.gg/nNV5evcr)
- **📚 Documentation**: [Full Documentation](https://docs.asobacode.dev)
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/AsobaCloud/asoba-code/issues)

### Advanced Topics {#advanced-topics}

After mastering basic custom model integration:

1. **[MCP Server Development](mcp-server-development.html)** - Create custom MCP servers
2. **[Model Integration Guide](model-integration.html)** - Add new AI providers
3. **[Advanced Features](analyst.html)** - Enterprise workflows and automation
4. **[Troubleshooting](troubleshooting.html)** - Comprehensive troubleshooting guide

### Enterprise Support {#enterprise-support}

For organizations deploying custom models at scale:

- **🏢 Dedicated Support**: Priority support for custom model deployments
- **🔧 Custom Integration**: Tailored provider development and optimization
- **📊 Cost Analytics**: Advanced cost monitoring and optimization tools
- **🔒 Security Review**: Custom model security assessment and hardening

**Contact**: [enterprise@asoba.co](mailto:enterprise@asoba.co)

---

**Ready to reduce your AI costs by 30x while maintaining quality?**

[Get started with custom model integration →](sdk.html#installation)