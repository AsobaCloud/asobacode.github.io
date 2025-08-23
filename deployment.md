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
