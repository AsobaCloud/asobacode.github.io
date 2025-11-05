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
  https://api.asoba.co/health

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