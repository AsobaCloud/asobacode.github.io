---
title: "SDK"
layout: default
nav_order: 1.75
---

# Ona SDK

The Ona SDK provides a streamlined way to integrate Ona Platform capabilities into your existing product stacks and applications. Instead of building custom API integrations from scratch, the SDK offers pre-built, tested, and maintained client libraries that handle authentication, request formatting, error handling, and response parsing. This enables rapid integration, reduces development time, and ensures consistency with Ona Platform's evolving API surface.

Whether you're building dashboards, automation scripts, or enterprise integrations, the SDK abstracts away the complexity of direct API calls and provides a developer-friendly interface that follows best practices for your chosen language ecosystem.

---

## Introduction
{: #introduction }

The Ona SDK provides seamless integration with the Ona Energy AI Platform, enabling developers to build applications that interact with Asoba's energy management services. This SDK supports both JavaScript (Node.js & Browser) and Python, making it easy to integrate Ona into third-party applications.

---

## Key Features
{: #key-features }

✔ Solar Energy Forecasting – Device, site, and customer-level predictions  
✔ OODA Workflow – Asset management, fault detection, diagnostics, and maintenance scheduling  
✔ Partner API – High-performance pre-computed JSON snapshots with ETag caching  
✔ Energy Policy Analysis – RAG-powered queries on energy regulations  
✔ Edge Device Management – Discovery, registration, and capability detection  
✔ Data Collection – Enphase, Huawei, and weather data integration  
✔ ML Operations – Model training, interpolation, and data standardization  
✔ Dual SDK Support – Use in both JavaScript and Python applications  
✔ Comprehensive Error Handling – Detailed API responses and logging for debugging

---

## SDKs
{: #sdks }

This repository contains two SDK implementations:

### JavaScript SDK
Official JavaScript/TypeScript SDK for Node.js and browser environments.

📖 [View JavaScript SDK Documentation](https://github.com/AsobaCloud/sdk/blob/prod/javascript/README.md) →

**Quick Start:**

```javascript
const { OnaSDK } = require('@asoba/ona-sdk');

const sdk = new OnaSDK({
  region: 'af-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Get energy forecast
const forecast = await sdk.forecasting.getSiteForecast({
  site_id: 'Sibaya',
  forecast_hours: 24
});
```

### Python SDK
Official Python SDK for server-side and data science applications.

📖 [View Python SDK Documentation](https://github.com/AsobaCloud/sdk/blob/prod/python/README.md) →

**Quick Start:**

```python
from ona_platform import OnaClient

client = OnaClient()

# Get solar forecast
forecast = client.forecasting.get_site_forecast('Sibaya', hours=24)

# Run fault detection
detection = client.terminal.run_detection(
    customer_id='customer123',
    asset_id='asset456',
    lookback_hours=6
)
```

---

## Installation
{: #installation }

### JavaScript SDK

```bash
npm install @asoba/ona-sdk
```

For detailed installation and setup instructions, see the [JavaScript SDK Documentation](https://github.com/AsobaCloud/sdk/blob/prod/javascript/README.md).

### Python SDK

```bash
pip install ona-platform
```

Or install from source:

```bash
cd python
pip install -e .
```

For detailed installation and setup instructions, see the [Python SDK Documentation](https://github.com/AsobaCloud/sdk/blob/prod/python/README.md).

---

## Configuration
{: #configuration }

Both SDKs support configuration via environment variables or constructor parameters.

### Environment Variables

```bash
# AWS Configuration
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=af-south-1

# Service Endpoints (optional)
export ONA_FORECASTING_ENDPOINT=https://forecasting.api.asoba.co
export ONA_TERMINAL_ENDPOINT=https://terminal.api.asoba.co
export PARTNER_API_ENDPOINT=https://partner.api.asoba.co
export PARTNER_API_KEY=your_partner_api_key
```

See the individual SDK documentation for complete configuration options:

- [JavaScript SDK Configuration](https://github.com/AsobaCloud/sdk/blob/prod/javascript/README.md#configuration)
- [Python SDK Configuration](https://github.com/AsobaCloud/sdk/blob/prod/python/README.md#configuration)

---

## Services
{: #services }

The Ona SDK provides access to the following platform services:

### Partner API
Fetch pre-computed JSON snapshots for embedding and partner integrations. This API is optimized for speed using ETag-based conditional GETs and in-memory caching.

### Forecasting API
Generate energy forecasts at device, site, or customer levels.

### Terminal API (OODA Workflow)
Comprehensive API for Observe, Orient, Decide, Act workflow operations including:

- Asset management
- Fault detection
- AI diagnostics
- Maintenance scheduling
- Real-time monitoring

### Energy Analyst (RAG)
AI-powered energy policy and regulatory compliance analysis.

### Edge Device Registry
Manage distributed edge devices with automatic capability detection.

### Data Collection
Integration with Enphase, Huawei, and weather data services.

### ML Operations
Model training, interpolation, and data standardization services.

For detailed API documentation, see:

- [JavaScript SDK API Reference](https://github.com/AsobaCloud/sdk/blob/prod/javascript/README.md#api-reference)
- [Python SDK API Reference](https://github.com/AsobaCloud/sdk/blob/prod/python/README.md#api-reference)

---

## Examples
{: #examples }

Both SDKs include comprehensive examples:

### JavaScript Examples
Located in `javascript/examples/`:

- `basic-usage.js` – Basic SDK initialization and usage
- `forecasting-example.js` – Energy forecasting examples
- `terminal-api-example.js` – OODA workflow examples
- `edge-device-example.js` – Edge device management examples
- `partner-api-example.js` – Partner API snapshot and caching example

### Python Examples
Located in `python/examples/`:

- `forecasting_example.py` – Solar forecasting
- `terminal_ooda_example.py` – OODA workflow
- `energy_analyst_example.py` – Energy policy queries
- `edge_device_example.py` – Edge device management
- `complete_workflow_example.py` – Multi-service workflow
- `partner_api_example.py` – Partner API usage with ETag caching

---

## Error Handling
{: #error-handling }

Both SDKs provide comprehensive error handling with custom error classes:

### JavaScript

```javascript
const {
  OnaSDKError,
  APIError,
  ValidationError,
  AuthenticationError,
  TimeoutError
} = require('@asoba/ona-sdk');
```

### Python

```python
from ona_platform import (
    OnaError,
    ConfigurationError,
    ServiceUnavailableError,
    ValidationError,
    ResourceNotFoundError,
    TimeoutError
)
```

See the individual SDK documentation for detailed error handling examples.

---

## Troubleshooting
{: #troubleshooting }

**403 Forbidden?** Ensure your API key and AWS credentials are valid.  
**SignatureDoesNotMatch?** Verify your AWS credentials and region settings.  
**Connection Timeout?** Check your internet connection and retry.  
**Service Unavailable?** Verify service endpoints are correct and accessible.

For more troubleshooting help, see:

- JavaScript SDK Documentation
- Python SDK Documentation
