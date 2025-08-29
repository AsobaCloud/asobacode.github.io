---
title: "Deployment"
layout: default
nav_order: 3
---

# Ona Terminal CLI Deployment

Complete deployment guide for the Ona Terminal CLI tool and related services.

## Overview

This guide covers deploying the Ona Terminal CLI tool and its supporting infrastructure. The Ona Terminal is an AI-powered command-line interface for energy asset management, forecasting, and automation.

## Current Production State

**Last Verified**: 2025-01-10 (Status: PRODUCTION VERIFIED - Version 1.6.0)

### Regional Architecture Overview
- **af-south-1**: Primary production environment (15 Lambda functions)
- **us-east-1**: RAG services and global monitoring (3 Lambda functions)
- **eu-central-1**: Status unknown - not verified

### af-south-1 (Primary Production) - ✅ ACTIVE

#### Lambda Functions (15 Deployed)
| Function Name | Status | Runtime | Purpose | API Gateway | 
|---------------|---------|---------|---------|-------------|
| `ingestHistoricalData` | ✅ Active | Container | Historical data processing | `yn058ezh38` |
| `ingestHistoricalData-test` | ✅ Active | Container | Test version | - |
| `ingestNowcastData` | ✅ Active | Container | Real-time ingestion | `xkg3s0npv0` |
| `trainForecaster` | ✅ Active | Container | ML model training | `x0o7xd1uq7` |
| `GeneratePresignedUrlLambda` | ✅ Active | Container | S3 upload URLs | - |
| `returnForecastingResults` | ✅ Active | Unknown | Forecast retrieval | - |
| `dataInterpolation` | ✅ Active | Unknown | Data cleaning | `ul4rjb4twc` |
| `daily_weather_fetch` | ✅ Active | Unknown | Daily weather data | - |
| `historical_weather_fetch` | ✅ Active | Unknown | Historical weather | - |
| `get_recent_weather` | ✅ Active | Unknown | Recent weather API | - |
| `get_lastest_weather_file_for_city` | ✅ Active | Unknown | Weather file lookup | - |
| `auth0ManagementBackend` | ✅ Active | Unknown | Auth0 integration | - |
| `MasterLambdaFunction` | ✅ Active | Unknown | Orchestration | - |
| `PDFProcessor` | ✅ Active | Unknown | Document processing | - |
| `LogsProxyFunction` | ✅ Active | Unknown | Logging proxy | `rgkv5lgoll` |

#### API Gateway REST APIs (7 Deployed)
| API ID | Name | Endpoints | Status |
|--------|------|-----------|---------|
| `yn058ezh38` | ingestHistoricalLoadData | `/upload_train`, `/upload_historical` | ✅ Active |
| `xkg3s0npv0` | ingestNowcastLoadData | `/` | ✅ Active |   
| `x0o7xd1uq7` | TrainForecaster | `/` | ✅ Active |
| `ul4rjb4twc` | dataInterpolation | `/` | ✅ Active |       
| `baq4wrqcf2` | AfricaAPIRouter | `/ingestHistorical`, `/ingestNowcast`, `/dataInterpolation` | ✅ Active |
| `lxil9blih0` | onDemandActions | Unknown resources | ✅ Active |
| `rgkv5lgoll` | LogsProxyApi | Unknown resources | ✅ Active |

#### S3 Buckets (11 Production)
| Bucket Name | Purpose | Status | Region |
|-------------|---------|--------|--------|
| `sa-api-client-input` | Regional input data | ✅ Active | af-south-1 |
| `sa-api-client-output` | Regional output data | ✅ Active | af-south-1 |
| `sa-api-client-facing` | Client outputs | ✅ Active | af-south-1 |
| `api-client-input` | Legacy input | ✅ Active | af-south-1 |
| `api-client-output` | Legacy output | ✅ Active | af-south-1 |
| `api-policy-repo` | Policy documents | ✅ Active | af-south-1 |
| `asoba-api-webhost` | Web hosting | ✅ Active | af-south-1 |
| `ona-cloudfront-logs` | CloudFront logs | ✅ Active | af-south-1 |
| `utilityapi-static-site` | Static hosting | ✅ Active | af-south-1 |
| `utilityapi.inboldprint.co` | Domain hosting | ✅ Active | af-south-1 |
| `stackset-ona-front-end-*` | CloudFormation | ✅ Active | af-south-1 |

#### DynamoDB Tables
| Table Name | Purpose | Status |
|------------|---------|--------|
| `api_keys` | API key management | ✅ Active |

#### SageMaker Endpoints - ⚠️ CRITICAL ISSUE
| Endpoint Type | Count | Status | Impact |
|---------------|-------|--------|---------|
| `huggingface-pytorch-inference-*` | 8 endpoints | ❌ ALL FAILED | ML inference broken |

### us-east-1 (Global Services) - ✅ ACTIVE

#### Lambda Functions (3 Deployed)
| Function Name | Purpose | Status |
|---------------|---------|--------|
| `cloudwatch-monitoring-agent-api` | CloudWatch monitoring | ✅ Active |
| `ona-front-end-prod-api-reques-RulePriorityFunction-*` | ALB rules | ✅ Active |
| `ona-front-end-prod-api-reque-EnvControllerFunction-*` | Environment control | ✅ Active |

## ⚠️ Critical Security Issues (MUST ADDRESS FIRST)

### Immediate Security Risks (P0)
1. **Hardcoded Credentials** - CRITICAL
   ```
   Files: RAG/ETL/.env, RAG/indicators/.env
   Risk: AWS Access Keys, GitHub tokens, API keys in plain text
   Impact: Complete infrastructure compromise possible
   ```

2. **Wildcard Import Vulnerability** - HIGH
   ```
   Count: 950+ files using 'import *'
   Risk: Namespace pollution, accidental malicious code import
   Impact: Debugging complexity, security attack surface
   ```

3. **Dependency Vulnerabilities** - HIGH
   ```
   Count: 14 vulnerabilities (1 High, 12 Medium, 1 Low)
   Components: protobuf, urllib3, requests
   Impact: DoS attacks, session management exploits
   ```

### Production Security Gaps
- No secrets management system implemented
- Debug print statements expose sensitive data (40+ files)
- No pre-commit security scanning
- No automated vulnerability monitoring

## Service Coverage Analysis

### Fully Deployed Services ✅ (95% Coverage)
- **Data Ingestion**: Historical + Real-time (`ingestHistoricalLoadData`, `ingestNowcastData`)
- **Data Processing**: Interpolation + Weather (6 Lambda functions)
- **Model Training**: `trainForecaster` with API Gateway
- **Authentication**: Auth0 integration operational

### Partially Deployed Services ⚠️ (40-60% Coverage)
- **ML Inference**: Code exists, SageMaker endpoints failed
- **Forecast Generation**: Core module ready, no API Gateway
- **User Management**: Auth0 only, missing full CRUD

### Missing Services ❌ (0-20% Coverage)
- **Dispatch Optimization**: Code exists, no Lambda deployment
- **Market Price Forecasting**: Code exists, no API deployment
- **Freemium Services**: 3 Lambda functions implemented but not deployed

## Quick Start

### Prerequisites

- **Python 3.10+**: CRITICAL - Use python3.10, not python3 (system version is 3.9)
- **AWS CLI**: Configured with appropriate credentials and permissions
- **Internet Access**: Required for AWS Bedrock API calls and package installation
- **Storage**: Local storage for upload tracking (`~/.asoba/uploads/`)
- **Memory**: Minimum 4GB RAM for local development
- **Network**: Access to AWS services in target regions

### Development Installation

```bash
# Install Ona Terminal CLI
pip3.10 install ona-terminal

# Verify installation
ona --version

# Configure API key
ona configure --api-key YOUR_API_KEY
```

### Production Installation

```bash
# Install with production dependencies
pip3.10 install ona-terminal[production]

# Set up environment variables
export ONA_API_KEY="your-production-api-key"
export ONA_REGION="af-south-1"
export ONA_ENVIRONMENT="production"

# Test connection
ona status
```

## Docker Deployment

### Local Development

```bash
# Build development image
docker build -f docker/Dockerfile.dev -t ona-terminal-dev .

# Run with volume mounting
docker run -it --rm \
  -v $(pwd):/app \
  -p 8000:8000 \
  -e ONA_API_KEY=your-dev-key \
  ona-terminal-dev
```

### Production Docker

```bash
# Build production image
docker build -f docker/Dockerfile -t ona-terminal .

# Run production container
docker run -d \
  -p 8000:8000 \
  -e ONA_API_KEY=your-production-key \
  -e ONA_REGION=af-south-1 \
  --name ona-terminal-prod \
  ona-terminal
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  ona-terminal:
    build: .
    ports:
      - "8000:8000"
    environment:
      - ONA_API_KEY=${ONA_API_KEY}
      - ONA_REGION=${ONA_REGION}
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

## Systemd Service Deployment

### Create Service File

```bash
# /etc/systemd/system/ona-terminal.service
[Unit]
Description=Ona Terminal CLI Service
After=network.target

[Service]
Type=simple
User=ona
WorkingDirectory=/opt/ona-terminal
Environment=ONA_API_KEY=your-api-key
Environment=ONA_REGION=af-south-1
ExecStart=/usr/local/bin/ona serve --host 0.0.0.0 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Deploy Service

```bash
# Create user
sudo useradd -r -s /bin/false ona

# Create directory
sudo mkdir -p /opt/ona-terminal
sudo chown ona:ona /opt/ona-terminal

# Install service
sudo systemctl daemon-reload
sudo systemctl enable ona-terminal
sudo systemctl start ona-terminal

# Check status
sudo systemctl status ona-terminal
```

## PolicyAnalyst LLM Deployment (AWS EC2)

### Prerequisites

- AWS EC2 instance with GPU (g5.2xlarge recommended)
- NVIDIA drivers and CUDA toolkit
- Python 3.10+ environment

### Step-by-Step Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python 3.10
sudo apt install -y python3.10 python3.10-pip python3.10-venv

# Install NVIDIA drivers
sudo apt install -y nvidia-driver-535

# Install CUDA toolkit
wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda_11.8.0_520.61.05_linux.run
sudo sh cuda_11.8.0_520.61.05_linux.run --silent --driver --toolkit --samples

# Set environment variables
echo 'export PATH=/usr/local/cuda-11.8/bin:$PATH' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-11.8/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc

# Install vLLM and Ona Terminal
pip3.10 install vllm ona-terminal

# Test GPU
nvidia-smi
python3.10 -c "import torch; print(torch.cuda.is_available())"
```

### Load Model

```bash
# Create model directory
mkdir -p /home/ubuntu/models
cd /home/ubuntu/models

# Download and load model
python3.10 -c "
from vllm import LLM
llm = LLM(model='mistralai/Mistral-7B-Instruct-v0.2', gpu_memory_utilization=0.9)
print('Model loaded successfully')
"
```

## Monitoring and Logging

### CloudWatch Integration

```bash
# Install CloudWatch agent
sudo apt install -y amazon-cloudwatch-agent

# Configure monitoring
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard

# Start agent
sudo systemctl enable amazon-cloudwatch-agent
sudo systemctl start amazon-cloudwatch-agent
```

### Health Checks

```bash
# Check service health
curl http://localhost:8000/health

# Check API endpoints
curl -H "x-api-key: YOUR_API_KEY" \
  https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/health

# Monitor logs
sudo journalctl -u ona-terminal -f
```

## Security Considerations

### Before Deployment

1. **Address Critical Security Issues**:
   - Remove all hardcoded credentials
   - Fix 14 dependency vulnerabilities
   - Reduce wildcard imports from 950+ to <50
   - Implement AWS safety protocols

2. **Implement Secrets Management**:
   - Use AWS Secrets Manager or Parameter Store
   - Rotate API keys regularly
   - Implement least-privilege access

3. **Security Scanning**:
   - Set up pre-commit security hooks
   - Implement automated vulnerability scanning
   - Regular security audits

### Production Security

- Use HTTPS for all communications
- Implement rate limiting
- Set up monitoring and alerting
- Regular security updates
- Access logging and audit trails

## Troubleshooting

### Common Issues

#### API Connection Errors

```bash
# Check API key
ona configure --list

# Test API connectivity
curl -H "x-api-key: YOUR_API_KEY" \
  https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/health

# Check AWS credentials
aws sts get-caller-identity
```

#### GPU Issues (PolicyAnalyst)

```bash
# Check NVIDIA drivers
nvidia-smi

# Check CUDA installation
nvcc --version

# Test PyTorch GPU
python3.10 -c "import torch; print(torch.cuda.is_available())"
```

#### Service Issues

```bash
# Check service status
sudo systemctl status ona-terminal

# View logs
sudo journalctl -u ona-terminal -f

# Restart service
sudo systemctl restart ona-terminal
```

### Performance Issues

```bash
# Monitor system resources
htop
nvidia-smi  # For GPU monitoring
df -h       # Disk usage

# Check API performance
ab -n 100 -c 10 -H "x-api-key: YOUR_API_KEY" \
  https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/health
```

## Support

- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **API Reference**: [Complete API documentation](api-reference.md)
- 🔗 **Integration Guide**: [SDK and webhook integration](integration.md)

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