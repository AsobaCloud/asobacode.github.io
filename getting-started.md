---
title: "Getting Started"
layout: default
nav_order: 2
---

# Getting Started

Quick start guide for developers to get up and running with Ona Terminal CLI.

## Overview

This guide will help you install, configure, and start using the Ona Terminal CLI for energy asset management and forecasting.

## Prerequisites

### System Requirements

- **Python 3.10+**: CRITICAL - Use python3.10, not python3 (system version is 3.9)
- **AWS CLI**: Configured with appropriate credentials and permissions
- **Internet Access**: Required for AWS Bedrock API calls and package installation
- **Storage**: Local storage for upload tracking (`~/.asoba/uploads/`)
- **Memory**: Minimum 4GB RAM for local development
- **Network**: Access to AWS services in target regions

### AWS Requirements

- **AWS Account**: Access to AWS services in target regions
- **IAM Permissions**: EC2, Lambda, API Gateway, S3, DynamoDB, CloudWatch
- **API Key**: Valid Ona API key for authentication

## Quick Installation

### Step 1: Install Ona Terminal CLI

```bash
# Install the CLI tool
pip3.10 install ona-terminal

# Verify installation
ona --version
```

### Step 2: Configure API Key

```bash
# Configure your API key
ona configure --api-key YOUR_API_KEY

# Verify configuration
ona configure --list
```

### Step 3: Test Connection

```bash
# Test API connectivity
ona status

# Check available commands
ona --help
```

## First Steps

### 1. Upload Historical Data

```bash
# Upload your first dataset
ona upload historical \
  --file your_data.csv \
  --customer-id your-customer-id \
  --manufacturer SolarEdge \
  --location CapeTown
```

### 2. Train a Model

```bash
# Train a forecasting model
ona train \
  --customer-id your-customer-id \
  --location CapeTown \
  --manufacturer SolarEdge \
  --serial-number SE123456
```

### 3. Generate Forecast

```bash
# Generate a 24-hour forecast
ona forecast \
  --customer-id your-customer-id \
  --horizon 24 \
  --model-type lstm
```

## Configuration

### Environment Variables

```bash
# Required environment variables
export ONA_API_KEY="your-api-key"
export ONA_REGION="af-south-1"
export ONA_ENVIRONMENT="production"

# Optional environment variables
export ONA_LOG_LEVEL="INFO"
export ONA_TIMEOUT="30"
export ONA_RETRY_ATTEMPTS="3"
```

### Configuration File

Create `~/.asoba/config.yaml`:

```yaml
api:
  key: your-api-key
  region: af-south-1
  environment: production
  timeout: 30
  retry_attempts: 3

logging:
  level: INFO
  file: ~/.asoba/logs/ona.log

storage:
  upload_dir: ~/.asoba/uploads/
  cache_dir: ~/.asoba/cache/
```

## Development Setup

### Local Development Installation

```bash
# Clone the repository
git clone https://github.com/asobacloud/terminal.git
cd terminal

# Create virtual environment
python3.10 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install in development mode
pip install -e .

# Install development dependencies
pip install -r requirements-dev.txt
```

### Testing Your Installation

```bash
# Run the test suite
python -m pytest tests/

# Run specific tests
python -m pytest tests/unit/test_cli.py

# Run with coverage
python -m pytest --cov=src/ona_terminal
```

## Common Commands

### Data Management

```bash
# List uploaded datasets
ona data list --customer-id your-customer-id

# Get dataset details
ona data info --dataset-id dataset-123

# Delete dataset
ona data delete --dataset-id dataset-123
```

### Model Management

```bash
# List trained models
ona models list --customer-id your-customer-id

# Get model details
ona models info --model-id model-123

# Delete model
ona models delete --model-id model-123
```

### Forecast Management

```bash
# List forecasts
ona forecasts list --customer-id your-customer-id

# Get forecast results
ona forecasts get --forecast-id forecast-123

# Export forecast data
ona forecasts export --forecast-id forecast-123 --format csv
```

## Troubleshooting

### Common Issues

#### Python Version Issues

```bash
# Check Python version
python3.10 --version

# If system Python is 3.9, install 3.10
sudo apt update
sudo apt install python3.10 python3.10-pip python3.10-venv
```

#### API Connection Issues

```bash
# Test API connectivity
curl -H "x-api-key: YOUR_API_KEY" \
  https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/health

# Check AWS credentials
aws sts get-caller-identity
```

#### Permission Issues

```bash
# Check file permissions
ls -la ~/.asoba/

# Fix permissions if needed
chmod 700 ~/.asoba/
chmod 600 ~/.asoba/config.yaml
```

### Getting Help

```bash
# Get help for any command
ona --help
ona upload --help
ona train --help

# Enable debug logging
export ONA_LOG_LEVEL="DEBUG"
ona status
```

## Next Steps

### 1. Explore the API Reference

- [Complete API Documentation](api-reference.md)
- [Integration Guide](integration.md)
- [SDK Documentation](resources.md)

### 2. Deploy to Production

- [Deployment Guide](deployment.md)
- [PoC Deployment](poc-deployment.html)
- [Production Infrastructure](production-deployment.html)

### 3. Join the Community

- [Discord Community](https://discord.gg/nNV5evcr)
- [GitHub Issues](https://github.com/asobacloud/terminal/issues)
- [Technical Support](mailto:support@asoba.co)

## Support

- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **API Reference**: [Complete API documentation](api-reference.md)
- 🔗 **Integration Guide**: [SDK and webhook integration](integration.md)
