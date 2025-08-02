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