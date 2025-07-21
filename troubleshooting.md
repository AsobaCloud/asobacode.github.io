---
title: "Troubleshooting"
layout: default
nav_order: 8
---

## Troubleshooting Guide {#troubleshooting}

> **Common issues and solutions for AsobaCode CLI**

This comprehensive guide covers common problems and their solutions when using AsobaCode's multi-provider AI architecture and MCP servers.

---

## Quick Diagnostic Commands {#quick-diagnostics}

Start troubleshooting with these essential commands:

```bash
# Check system status
asoba-code status

# Verify server health
asoba-code servers --health

# Test connectivity
asoba-code ask "Test system connectivity and show available providers"

# Show configuration
asoba-code config show

# Enable debug mode
export LOG_LEVEL=DEBUG
asoba-code --debug ask "Debug test request"
```

---

## Installation Issues {#installation-issues}

### Command Not Found Error {#command-not-found}

**Problem**: `asoba-code: command not found`

**Cause**: The installation directory is not in your PATH.

**Solutions**:
```bash
# Method 1: Check if asoba-code exists
ls -la ~/.local/bin/asoba-code

# If it exists, add to PATH:
export PATH=$PATH:$HOME/.local/bin

# Method 2: Make it permanent
echo 'export PATH=$PATH:$HOME/.local/bin' >> ~/.bashrc
source ~/.bashrc

# Method 3: Use full path directly
~/.local/bin/asoba-code --help

# Method 4: Reinstall with different method
pip install --user -e .
```

### Python Version Issues {#python-version}

**Problem**: `ERROR: Python 3.10+ required`

**Cause**: AsobaCode requires Python 3.10 or higher for FastMCP compatibility.

**Solutions**:
```bash
# Check your Python version
python3 --version

# Install with specific Python version
python3.10 -m pip install -e .

# If Python 3.10+ not available, install it:

# Ubuntu/Debian:
sudo apt update
sudo apt install python3.10 python3.10-pip python3.10-venv

# macOS with Homebrew:
brew install python@3.10

# CentOS/RHEL:
sudo yum install python310 python310-pip

# Create virtual environment with correct Python version
python3.10 -m venv asobacode-env
source asobacode-env/bin/activate
pip install -e .
```

### Dependency Conflicts {#dependency-conflicts}

**Problem**: Package installation fails due to conflicting dependencies

**Solutions**:
```bash
# Method 1: Use virtual environment (recommended)
python3.10 -m venv asobacode-env
source asobacode-env/bin/activate
pip install -e .

# Method 2: Clear pip cache
pip cache purge
pip install --force-reinstall -e .

# Method 3: Use pip-tools for dependency management
pip install pip-tools
pip-compile requirements.in
pip-sync requirements.txt

# Method 4: Fresh installation
pip uninstall asoba-code
pip install -e . --no-cache-dir
```

---

## Configuration Problems {#configuration-problems}

### AWS Credentials Issues {#aws-credentials}

**Problem**: `AWS credentials not configured` or `NoCredentialsError`

**Diagnosis**:
```bash
# Test AWS credentials
aws sts get-caller-identity

# Check credentials files
ls -la ~/.aws/
cat ~/.aws/credentials
cat ~/.aws/config

# Check environment variables
env | grep AWS
```

**Solutions**:
```bash
# Method 1: AWS CLI configuration
aws configure
# Enter: Access Key ID, Secret Access Key, Region (us-east-1)

# Method 2: Environment variables
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=us-east-1

# Method 3: AWS profile
aws configure --profile asobacode
export AWS_PROFILE=asobacode

# Method 4: IAM roles (for EC2/ECS)
# Attach appropriate IAM role with Bedrock permissions

# Verify configuration
asoba-code ask "Test AWS Bedrock connectivity"
```

**Required AWS Permissions**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:ListFoundationModels"
      ],
      "Resource": "*"
    }
  ]
}
```

### GitHub Token Problems {#github-token}

**Problem**: GitHub integration not working

**Diagnosis**:
```bash
# Test GitHub token
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Check token permissions
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user/repos

# Verify token scopes
curl -H "Authorization: token $GITHUB_TOKEN" -I https://api.github.com/user | grep -i scope
```

**Solutions**:
```bash
# Set GitHub token with proper permissions
export GITHUB_TOKEN=ghp_your_github_personal_access_token

# Required permissions (when creating token):
# ✓ repo (full repository access)
# ✓ write:issues (create/update issues)  
# ✓ read:org (for organization repositories)
# ✓ read:user (user information)

# Test integration
asoba-code ask "List my GitHub repositories"
asoba-code ask "Test GitHub connectivity"
```

### Custom Model Configuration {#custom-model-config}

**Problem**: Custom models not detected

**Diagnosis**:
```bash
# Check if model server is reachable
curl http://your-server:8000/status

# Check environment variables
echo $MISTRAL_STATUS_URL
echo $MISTRAL_FALLBACK_IP
echo $AI_PROVIDER_STRATEGY

# Test from AsobaCode
asoba-code servers --health
asoba-code ask "Show available AI providers"
```

**Solutions**:
```bash
# Method 1: Basic configuration
export MISTRAL_STATUS_URL="http://your-server:8000/status"
export MISTRAL_FALLBACK_IP="your-server-ip"

# Method 2: Advanced configuration
export MISTRAL_ENABLED="true"
export AI_PROVIDER_STRATEGY="cost_optimized"
export AI_DEFAULT_PROVIDER="auto"

# Method 3: Load balancing setup
export MISTRAL_SERVER_IPS="10.0.1.50,10.0.1.51,10.0.1.52"

# Test detection and routing
asoba-code ask "Generate simple Terraform configuration"
asoba-code ask "Show me which provider was used and the cost breakdown"
```

---

## AI Model Issues {#ai-model-issues}

### Model Access Denied {#model-access-denied}

**Problem**: `AccessDeniedException` when calling Bedrock models

**Cause**: Your AWS account doesn't have access to the requested model.

**Solutions**:
```bash
# Method 1: Check available models in your region
aws bedrock list-foundation-models --region us-east-1 --output table

# Method 2: Request model access in AWS Console:
# 1. Go to AWS Bedrock Console
# 2. Navigate to "Model access"
# 3. Request access to desired models
# 4. Wait for approval (can take several hours)

# Method 3: Use available models
asoba-code ask "What Bedrock models are available in my account?"

# Method 4: Configure alternative models
asoba-code config set ai_models.preferred_models '["anthropic.claude-3-haiku-20240307-v1:0"]'
```

### Throttling Errors {#throttling-errors}

**Problem**: `ThrottlingException: Too many requests`

**Cause**: Hitting API rate limits.

**Solutions**:
```bash
# Method 1: Enable rate limiting in configuration
export AI_MAX_RETRIES=5
export AI_RETRY_DELAY=2
export AI_BACKOFF_MULTIPLIER=2

# Method 2: Use custom models to reduce Bedrock usage
export AI_PROVIDER_STRATEGY="cost_optimized"
export MISTRAL_STATUS_URL="http://your-server:8000/status"

# Method 3: Implement request batching
asoba-code ask "Analyze all Python files in src/ directory in a single request"

# Method 4: Monitor usage
asoba-code ask "Show my AI usage and rate limit status"
```

### High AI Costs {#high-costs}

**Problem**: AI generation costs are too high

**Solutions**:
```bash
# Method 1: Enable aggressive cost optimization
export AI_PROVIDER_STRATEGY="cost_optimized"
export AI_COST_BUDGET="1.00"  # Maximum per request
export AI_PREFER_LIGHT_MODELS="true"

# Method 2: Use custom models for routine tasks
export MISTRAL_STATUS_URL="http://your-server:8000/status"
export MISTRAL_FALLBACK_IP="your-server-ip"

# Method 3: Monitor and optimize
asoba-code ask "Show cost breakdown for my last 10 requests"
asoba-code ask "Suggest ways to reduce my AI costs"

# Method 4: Batch similar requests
asoba-code ask "Analyze all infrastructure files and create comprehensive report"
```

**Cost Optimization Strategies**:
- Infrastructure tasks: Use custom models (30x cheaper)
- Simple code generation: Use lighter Bedrock models
- Complex analysis: Use premium models sparingly
- Documentation: Use custom models
- Batch similar requests together

---

## Provider Integration Issues {#provider-integration}

### Custom Provider Not Loading {#provider-not-loading}

**Problem**: Custom provider shows as unavailable

**Diagnosis**:
```python
# Test provider directly
from asoba_code.servers.ai_models.providers.manager import ProviderManager
from asoba_code.config.loader import ConfigLoader

config = ConfigLoader().load_config()
manager = ProviderManager(config)

status = manager.get_provider_status()
print(status)
```

**Solutions**:
```bash
# Method 1: Check provider configuration
cat configs/default.yaml | grep -A 10 "providers:"

# Method 2: Verify server is running
systemctl status your-model-server  # if using systemd
docker ps | grep your-model        # if using Docker
ps aux | grep your-model           # check process

# Method 3: Check server logs
tail -f /var/log/your-model-server.log
journalctl -u your-model-server -f

# Method 4: Test server health directly
curl -v http://your-server:8000/status
curl -X POST http://your-server:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test", "max_tokens": 10}'
```

### Provider Routing Issues {#provider-routing}

**Problem**: Tasks not routing to expected provider

**Diagnosis**:
```python
# Test routing logic
from asoba_code.servers.ai_models.routing import ModelRouter

config = {"ai_models": {"fallback_strategy": "cost_optimized"}}
router = ModelRouter(config)

task = {
    "language": "terraform",
    "complexity": "medium", 
    "description": "test task"
}

provider, model = router.select_provider_and_model(task)
print(f"Routed to: {provider} / {model}")
```

**Solutions**:
```yaml
# Method 1: Update routing configuration in configs/default.yaml
ai_models:
  routing:
    languages:
      terraform: "mistral"  # Force terraform to custom model
      python: "auto"        # Let system decide
      rust: "bedrock"       # Complex languages use Bedrock
    
    complexity:
      low: "auto"           # Allow cost optimization
      medium: "auto"        # Balanced selection
      high: "bedrock"       # High complexity uses quality models
      
    custom_rules:
      - condition: "description contains 'security'"
        provider: "bedrock"
      - condition: "language == 'terraform' AND complexity == 'high'"
        provider: "bedrock"
```

```bash
# Method 2: Override provider selection
asoba-code ask "Using Bedrock models: analyze this code for security"
asoba-code ask "Using custom models: generate Terraform configuration"

# Method 3: Test routing decisions
asoba-code ask "Show me which provider would be used for terraform code generation"
asoba-code ask "Explain the routing decision for my last request"
```

---

## Performance Issues {#performance-issues}

### Slow Response Times {#slow-response}

**Problem**: AI requests take too long

**Diagnosis**:
```bash
# Enable performance monitoring
export LOG_LEVEL=DEBUG
time asoba-code ask "Simple test request"

# Check system resources
htop
free -h
df -h

# Test network latency
ping api.anthropic.com
ping bedrock.us-east-1.amazonaws.com
curl -w "@curl-format.txt" -o /dev/null -s "https://bedrock.us-east-1.amazonaws.com"
```

**Solutions**:
```bash
# Method 1: Increase timeouts
export AI_TIMEOUT=120
export AI_CONNECT_TIMEOUT=30

# Method 2: Use faster models for simple tasks
export AI_PROVIDER_STRATEGY="performance_first"
export AI_PREFER_LIGHT_MODELS="true"

# Method 3: Enable caching
export AI_CACHE_ENABLED=true
export AI_CACHE_TTL=3600

# Method 4: Optimize custom model server
# - Use GPU acceleration
# - Enable model caching
# - Add connection pooling
```

**Performance Optimization Tips**:
```python
# Custom model server optimizations
import torch

# Enable CUDA if available
device = "cuda" if torch.cuda.is_available() else "cpu"

# Use optimized inference
with torch.no_grad():
    outputs = model.generate(inputs, do_sample=False, num_beams=1)

# Implement caching
from functools import lru_cache

@lru_cache(maxsize=128)
def generate_with_cache(prompt_hash):
    return model.generate(prompt)
```

### Memory Issues {#memory-issues}

**Problem**: High memory usage or out-of-memory errors

**Diagnosis**:
```bash
# Check memory usage
free -h
ps aux --sort=-%mem | head -10

# Monitor AsobaCode memory usage
ps -p $(pgrep -f asoba-code) -o pid,ppid,cmd,%mem,%cpu

# Check for memory leaks
valgrind --leak-check=full asoba-code ask "test"
```

**Solutions**:
```bash
# Method 1: Limit concurrent operations
export AI_MAX_CONCURRENT=1
export AI_BATCH_SIZE=1

# Method 2: Disable caching if memory constrained
export AI_CACHE_ENABLED=false

# Method 3: Use lighter models
export AI_PREFER_LIGHT_MODELS=true
export AI_MAX_TOKENS=512

# Method 4: Increase system memory or swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Connection Timeouts {#connection-timeouts}

**Problem**: Requests timing out

**Solutions**:
```bash
# Method 1: Increase timeouts
export AI_TIMEOUT=120
export AI_CONNECT_TIMEOUT=30
export AI_READ_TIMEOUT=60

# Method 2: Check network connectivity
ping api.anthropic.com
nslookup bedrock.us-east-1.amazonaws.com
traceroute bedrock.us-east-1.amazonaws.com

# Method 3: Use fallback providers
export AI_ENABLE_FALLBACK=true
export AI_FALLBACK_TIMEOUT=30

# Method 4: Configure retry logic
export AI_MAX_RETRIES=3
export AI_RETRY_DELAY=5
```

---

## GitHub Integration Issues {#github-integration}

### Repository Access Issues {#repository-access}

**Problem**: Can't access repositories or create issues

**Diagnosis**:
```bash
# Test repository access
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/your-org/your-repo

# Check organization membership
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user/memberships/orgs

# Test specific permissions
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/your-org/your-repo/issues
```

**Solutions**:
```bash
# Method 1: Ensure token has correct permissions
# Required scopes when creating GitHub token:
# ✓ repo (full repository access)
# ✓ write:issues (create and update issues)
# ✓ read:org (for organization repositories)

# Method 2: For private repositories, ensure token access
# Go to GitHub → Settings → Developer settings → Personal access tokens
# Ensure token has access to the private repository

# Method 3: For organization repositories
# Organization may need to approve the token
# Go to Organization → Settings → Third-party access

# Method 4: Test with specific repository
asoba-code ask "Analyze repository structure for your-org/your-repo"
```

### Webhook Issues {#webhook-issues}

**Problem**: GitHub webhooks not working

**Solutions**:
```bash
# Method 1: Check webhook configuration
# In GitHub repository settings:
# - Webhooks section
# - Ensure webhook URL is accessible from GitHub
# - Verify webhook secret matches configuration

# Method 2: Test webhook endpoint
curl -X POST your-webhook-url/github \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: push" \
  -d '{"test": "payload"}'

# Method 3: Check webhook logs
tail -f /var/log/webhook.log
journalctl -u webhook-service -f

# Method 4: Validate webhook configuration
asoba-code config show --section github
asoba-code ask "Test GitHub webhook connectivity"
```

---

## Advanced Troubleshooting {#advanced-troubleshooting}

### Debug Mode and Logging {#debug-mode}

**Enable comprehensive debugging**:
```bash
# Method 1: Environment variables
export LOG_LEVEL=DEBUG
export ASOBACODE_DEBUG=true

# Method 2: Command line flags
asoba-code --debug ask "your query"
asoba-code --verbose status

# Method 3: Detailed system status
asoba-code status --verbose --debug
```

### Log Analysis {#log-analysis}

```bash
# Collect comprehensive logs
mkdir troubleshooting-logs

# System information
uname -a > troubleshooting-logs/system.txt
python3 --version >> troubleshooting-logs/system.txt
pip list > troubleshooting-logs/packages.txt
env | grep -E "(AWS|GITHUB|MISTRAL|AI_)" > troubleshooting-logs/env.txt

# AsobaCode logs
asoba-code --debug status > troubleshooting-logs/status.log 2>&1
asoba-code --debug servers --health > troubleshooting-logs/servers.log 2>&1

# Configuration (remove sensitive data)
asoba-code config show > troubleshooting-logs/config.yaml
sed -i 's/[A-Za-z0-9+/=]{20,}/***REDACTED***/g' troubleshooting-logs/config.yaml

# Test logs
asoba-code --debug ask "Test request for troubleshooting" > troubleshooting-logs/test.log 2>&1
```

### Network Diagnostics {#network-diagnostics}

```bash
# Test connectivity to all services
echo "Testing AWS Bedrock..."
curl -I https://bedrock.us-east-1.amazonaws.com

echo "Testing GitHub API..."
curl -I https://api.github.com

echo "Testing custom model server..."
curl -I http://your-server:8000/status

# DNS resolution
nslookup api.anthropic.com
nslookup bedrock.us-east-1.amazonaws.com

# Port connectivity
nc -zv api.anthropic.com 443
nc -zv your-server 8000

# SSL certificate check
openssl s_client -connect api.anthropic.com:443 -servername api.anthropic.com
```

### Performance Profiling {#performance-profiling}

```python
# Profile AsobaCode performance
import cProfile
import pstats
from asoba_code.client.manager import MCPClientManager

def profile_asobacode():
    client = MCPClientManager()
    
    # Profile a typical operation
    pr = cProfile.Profile()
    pr.enable()
    
    result = client.call_server_tool(
        "ai-models-server",
        "generate_code",
        {"description": "Create a Python function", "language": "python"}
    )
    
    pr.disable()
    
    # Save profile results
    pr.dump_stats('asobacode_profile.stats')
    
    # Print top time consumers
    stats = pstats.Stats('asobacode_profile.stats')
    stats.sort_stats('cumulative').print_stats(10)

if __name__ == "__main__":
    profile_asobacode()
```

---

## Error Code Reference {#error-codes}

| Error Code | Description | Solution |
|------------|-------------|----------|
| `E001` | Configuration file not found | Check config path and file existence |
| `E002` | Invalid provider configuration | Validate YAML syntax and required fields |
| `E003` | Model access denied | Check AWS/API credentials and permissions |
| `E004` | Provider unavailable | Check network connectivity and server status |
| `E005` | Rate limit exceeded | Reduce request frequency or upgrade plan |
| `E006` | Timeout error | Increase timeout settings or check network |
| `E007` | Memory limit exceeded | Reduce concurrent operations or add memory |
| `E008` | Invalid input format | Check input data format and encoding |
| `E009` | Authentication failed | Verify credentials and permissions |
| `E010` | Resource not found | Check resource path and availability |

---

## Performance Benchmarks {#performance-benchmarks}

**Expected Performance**:
- Simple code generation: < 5 seconds
- Complex analysis: < 30 seconds  
- Repository scan: < 2 minutes
- Infrastructure generation: < 10 seconds
- Custom model requests: < 3 seconds
- Bedrock requests: < 8 seconds

**If performance significantly differs, check**:
1. Network latency to API endpoints
2. System resources (CPU, memory, disk)
3. Provider configuration and availability
4. Request complexity and size
5. Concurrent request limits

---

## Getting Support {#getting-support}

### Self-Help Resources {#self-help}

```bash
# Built-in help
asoba-code --help
asoba-code config --help
asoba-code servers --help

# System diagnostics
asoba-code status --verbose
asoba-code servers --health --debug
asoba-code config validate
```

### Community Support {#community-support}

- **💬 Discord Community**: [Join Our Discord](https://discord.gg/nNV5evcr)
- **📚 Documentation**: [docs.asobacode.dev](https://docs.asobacode.dev)
- **🐛 GitHub Issues**: [Report Issues](https://github.com/AsobaCloud/asoba-code/issues)
- **💡 Discussions**: [GitHub Discussions](https://github.com/AsobaCloud/asoba-code/discussions)

### Professional Support {#professional-support}

- **📧 Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- **🏢 Enterprise Support**: [enterprise@asoba.co](mailto:enterprise@asoba.co)
- **🔧 Custom Integration**: Professional services for complex setups
- **📊 Performance Optimization**: Dedicated performance tuning

### Reporting Issues {#reporting-issues}

When reporting issues, please include:

```bash
# Generate comprehensive diagnostic report
asoba-code --debug status > diagnostic-report.txt 2>&1
echo "--- Environment ---" >> diagnostic-report.txt
env | grep -E "(AWS|GITHUB|MISTRAL|AI_)" >> diagnostic-report.txt
echo "--- System ---" >> diagnostic-report.txt
uname -a >> diagnostic-report.txt
python3 --version >> diagnostic-report.txt
pip list | grep -E "(asoba|fastmcp)" >> diagnostic-report.txt
```

Include this diagnostic report when asking for help to expedite troubleshooting.

---

This troubleshooting guide covers the most common issues. For complex problems or enterprise deployments, please contact our support team with the diagnostic information above.