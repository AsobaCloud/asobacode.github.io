---
title: "Agent Integration"
layout: default
nav_order: 4
---

# Agent Integration
{: .no_toc }

Powerful single-responsibility agents that integrate with external APIs for data processing and forecasting workflows.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

AsobaCode includes a sophisticated agent system that bridges the gap between the terminal interface and external APIs. These agents are designed with **single-responsibility principles** and follow the **OODA Loop framework** for structured decision-making.

### Key Features

- **🔄 OODA Framework**: Systematic Observe-Orient-Decide-Act decision-making
- **📤 Real API Integration**: Production-ready upload workflows  
- **📈 Forecast Operations**: Complete forecast generation and retrieval (ready for implementation)
- **🎯 Single Responsibility**: Each agent handles one specific workflow
- **📊 Rich Monitoring**: Real-time status tracking with beautiful displays

---

## 🔄 OODA Framework

All agents operate within the **OODA Loop framework** for systematic decision-making:

1. **🔍 Observe**: Gather data from uploads, forecasts, and system status
2. **🧭 Orient**: Analyze patterns, risks, and opportunities  
3. **💡 Decide**: Create actionable plans based on insights
4. **🎯 Act**: Execute approved plans with real-time monitoring

Each phase produces structured artifacts (`insights-*.md`, `plan-*.md`) for reproducibility and audit trails.

---

## 📤 Upload Agent

### Purpose

Single-responsibility agent for uploading data files and monitoring the complete processing pipeline through to model training completion.

### ✅ Real API Integration

- **Ona Power Tools API**: Direct integration with production endpoints
- **S3 Upload Pipeline**: Automatic file processing and training triggers
- **CloudWatch Monitoring**: Real-time status tracking through log analysis

### Commands

#### Upload Data
```bash
/upload-inverter upload CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER FILE_PATH REGION CLIENT_ID
```

**Example**:
```bash
/upload-inverter upload SOLAR001 "Cape Town" "SolarEdge" SE12345 /data/inverter.csv af-south-1 client123
```

#### Check Status
```bash
# Check specific upload
/upload-inverter status UPLOAD_ID

# List all recent uploads  
/upload-inverter status
```

### Pipeline Monitoring

Tracks the complete data processing pipeline:

1. **Upload** → File uploaded to S3 via API Gateway
2. **Ingestion** → `ingestHistoricalLoadData` Lambda processing
3. **Interpolation** → `dataInterpolation` Lambda processing  
4. **Training** → `trainForecaster` Lambda and SageMaker training jobs

### Status Display

Beautiful real-time status with emojis and progress indicators:

```
⚙️ Upload Status: PROCESSING
📋 Upload ID: SOLAR001_SE12345_1754151842
👤 Customer: SOLAR001
📍 Current Stage: trainForecaster
⏱️  Duration: 0:15:23

📜 Recent Logs:
   INFO: Data ingestion completed successfully
   INFO: Interpolation processing started
   INFO: Training job initiated

✅ Training completed! Use /forecast-inverter to generate predictions.
```

---

## 📈 Forecast Agent

### Purpose

Single-responsibility agent for forecast generation and retrieval operations.

### Current Status

- 🚧 **Mock Implementation**: APIs exist but are placeholder only
- ✅ **Complete Structure**: Ready for real implementation when endpoints are available
- ✅ **OODA Integration**: Full framework implementation with artifact generation

### Commands

#### Start Forecast Generation
```bash
/forecast-inverter start CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER REGION FORECAST_TYPE HORIZON_DAYS FREQUENCY
```

**Example**:
```bash
/forecast-inverter start SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 P50 7 daily
```

#### Retrieve Forecast Results
```bash
/forecast-inverter get CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER REGION OUTPUT_DIR FORECAST_TYPE
```

**Example**:
```bash
/forecast-inverter get SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 /tmp/forecasts P50
```

#### Check Status
```bash
# Check specific forecast
/forecast-inverter status REQUEST_ID

# List all recent forecasts
/forecast-inverter status
```

### Features

- **Workflow Integration**: Checks training completion before forecast generation
- **Multiple Formats**: Support for P50, P90 forecasts with daily/hourly frequency
- **Structured Output**: Organized CSV files with timestamps and metadata
- **Status Tracking**: Real-time monitoring of forecast generation pipeline
- **Error Recovery**: Intelligent retry and fallback mechanisms

---

## 🔧 Agent Architecture

### Single-Responsibility Design

```
┌─────────────────────────────────────────────────────────────┐
│                    CLI Command Layer                        │
│        /upload-inverter    │    /forecast-inverter          │
├─────────────────────────────────────────────────────────────┤
│                   Agent Layer                               │
│  ┌─────────────────────┐  │  ┌─────────────────────────┐     │
│  │   Upload Agent      │  │  │  Forecast Agent         │     │
│  │ • File validation   │  │  │ • Generation (MOCK)     │     │
│  │ • API integration   │  │  │ • Retrieval (MOCK)      │     │
│  │ • Status monitoring │  │  │ • Status tracking       │     │
│  └─────────────────────┘  │  └─────────────────────────┘     │
├─────────────────────────────────────────────────────────────┤
│                  External Services                          │
│     Ona Power Tools API   │    CloudWatch Logs              │
│   S3 Upload Pipeline      │    Training Monitoring          │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Principles

- **Single Responsibility**: Each agent handles one specific workflow
- **Real API Integration**: Direct integration with production endpoints where available
- **Mock Boundaries**: Clear separation between working and placeholder code
- **Error Resilience**: Comprehensive error handling and graceful degradation
- **Rich UX**: Beautiful terminal displays with real-time status updates

---

## 🚀 Getting Started

### Prerequisites

- **Ona Power Tools API key**
- **AWS credentials** for CloudWatch monitoring
- **Test CSV data files**

### Setup

1. **Set API key**:
   ```bash
   export ONA_API_KEY="your_ona_api_key_here"
   ```

2. **Test upload agent** (real API):
   ```bash
   /upload-inverter upload TEST_CUSTOMER "Test Location" "TestMfg" TEST123 /path/to/data.csv af-south-1 test_client
   ```

3. **Test forecast agent** (mock):
   ```bash
   /forecast-inverter start TEST_CUSTOMER "Test Location" "TestMfg" TEST123 af-south-1 P50 7 daily
   ```

### Example Workflow

1. **Upload data for training**:
   ```bash
   /upload-inverter upload SOLAR001 "Cape Town" "SolarEdge" SE12345 /data/solar_data.csv af-south-1 client123
   ```

2. **Monitor training progress**:
   ```bash
   /upload-inverter status SOLAR001_SE12345_1754151842
   ```

3. **Generate forecast when training complete**:
   ```bash
   /forecast-inverter start SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 P50 7 daily
   ```

4. **Retrieve forecast results**:
   ```bash
   /forecast-inverter get SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 /tmp/forecasts P50
   ```

---

## 📊 Integration Test Results

### ✅ Working Components

- **Upload Agent** with real Ona Power Tools API integration
- **S3 file upload** via API Gateway
- **CloudWatch log monitoring** and status tracking
- **Command registration** and CLI integration
- **OODA framework** and system prompts

### 🚧 Mocked Components

Ready for real implementation when endpoints are available:

- Forecast generation API calls
- Forecast results retrieval  
- CloudWatch monitoring for forecast pipelines

### Test Output Example

```
✅ Upload Agent (REAL API): SUCCESS
   Upload ID: TEST_INTEGRATION_2303053195_1754151842
   S3 Key: historical/TEST_INTEGRATION/af-south-1/Cape Town/LuxPower/loadData.csv

✅ Forecast Agent (MOCK): SUCCESS
🚧 NOTE: Forecast APIs are mocked - real endpoints not yet implemented

✅ CLI Integration: SUCCESS
✅ OODA Framework: SUCCESS
```

---

## 🔧 Configuration

### Environment Variables

#### Required
- `ONA_API_KEY`: Ona Power Tools API key for authentication

#### AWS Credentials
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key  
- `AWS_DEFAULT_REGION`: AWS region (recommend: af-south-1)

### Local Storage

- **Upload tracking**: `~/.asoba/uploads/`
- **Forecast tracking**: `~/.asoba/forecasts/`
- **Permissions**: 600 (user read/write only)

---

## 🛠️ Error Handling

### Upload Agent Errors

```bash
❌ File not found: /path/to/file.csv
❌ File must be CSV format
❌ API error: 403 - Forbidden (check API key)
❌ API error: 413 - Payload too large
```

### CloudWatch Errors

```bash
❌ Log group not found: /aws/lambda/ingestHistoricalLoadData
⚠️  Training status unknown - check AWS permissions
```

### Forecast Agent Notices

```bash
🚧 MOCK: Simulating forecast generation API call...
🚧 MOCK: Simulating forecast results retrieval...
❌ Model training not complete. Current status: processing
```

---

## 💡 Next Steps

### For Upload Workflows
- **Production Ready**: Upload agents are ready for production data processing workflows
- **Real API Integration**: Successfully tested with Ona Power Tools APIs
- **Monitoring**: Full pipeline monitoring through CloudWatch

### For Forecast Workflows  
- **Implementation Ready**: Forecast agents will become production-ready when API endpoints are implemented
- **Complete Structure**: All code structure and error handling in place
- **Easy Transition**: Simple removal of mock indicators enables real API integration

### OODA Framework
- **Decision Support**: Guides structured decision-making across all operations
- **Artifact Generation**: Creates reproducible insights and plans
- **Extensible**: Framework applies to future agent implementations

---

## 📚 Additional Resources

- **[Complete Agent Integration Guide](../AGENT_INTEGRATION.md)**: Comprehensive technical documentation
- **[CLI Reference](endpoints.html)**: All available commands and options
- **[Troubleshooting](troubleshooting.html)**: Common issues and solutions
- **[Custom Model Integration](custom-model-integration.html)**: Cost optimization setup

---

*Ready to get started? Check out our [Quick Start Guide](#quick-start) or explore the [full documentation](../README.md).*

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