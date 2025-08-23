---
title: "API Reference"
layout: default
nav_order: 5
---

# API Reference

Complete documentation for all Ona API endpoints and services.

## Overview

The Ona API provides comprehensive energy management, forecasting, and analysis capabilities through a suite of specialized endpoints. Each API is designed for specific use cases in energy asset management, forecasting, and optimization.

## Current Development State

**Last Updated**: 2025-01-10 (Status: PRODUCTION VERIFIED - Version 1.6.0)

### Critical Path Development

The platform follows a mandatory 3-epic development sequence:

1. **Epic #137: Security Foundation** (Weeks 1-2) - **BLOCKS ALL OTHER WORK**
   - Remove hardcoded credentials (CRITICAL)
   - Fix 14 dependency vulnerabilities
   - Reduce 950+ wildcard imports to <50
   - Implement AWS safety protocols

2. **Epic #138: Production Infrastructure** (Weeks 3-4) - **BLOCKED BY EPIC #137**
   - Production logging framework
   - Comprehensive testing framework (23% → 70% coverage)
   - CI/CD automated testing
   - TDD workflow implementation

3. **Epic #139: Customer-Facing Features** (Weeks 5-8) - **BLOCKED BY EPICS #137 & #138**
   - Deploy generateForecast Lambda (REVENUE CRITICAL)
   - Automated training pipeline
   - Customer model registry
   - Global customer discovery
   - LSTM migration for premium features

### Service Deployment Status

- ✅ **Fully Deployed** (95% coverage): Data ingestion, processing, training
- ⚠️ **Partially Deployed** (40-60% coverage): ML inference, forecast generation
- ❌ **Missing Services** (0-20% coverage): Dispatch optimization, market forecasting

## Authentication

All API requests require authentication using API keys:

```bash
# Set your API key in headers
curl -H "x-api-key: YOUR_API_KEY" https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/ingestHistorical
```

## Base URLs

The Ona API uses multiple API Gateway endpoints for different services:

### Regional Endpoints (af-south-1)
- **TrainForecaster**: `https://x0o7xd1uq7.execute-api.af-south-1.amazonaws.com/prod`
- **ingestHistoricalLoadData**: `https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod`
- **onDemandActions**: `https://lxil9blih0.execute-api.af-south-1.amazonaws.com/prod`

### Edge Endpoints (Global)
- **ingestNowcastLoadData**: `https://xkg3s0npv0.execute-api.af-south-1.amazonaws.com/prod`
- **dataInterpolation**: `https://ul4rjb4twc.execute-api.af-south-1.amazonaws.com/prod`
- **LogsProxyApi**: `https://rgkv5lgoll.execute-api.af-south-1.amazonaws.com/prod`

### ⚠️ Current Limitations
- **generateForecast**: Core module exists but no API Gateway deployed
- **SageMaker Endpoints**: 8 endpoints failed - ML inference broken
- **Test Coverage**: Only 23% coverage with critical gaps

## Core APIs

### 🔌 Data Ingestion APIs

#### Ingest Historical Load Data

**Endpoint:** `/ingestHistorical`

**Base URL:** `https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod`

Upload and process historical energy usage data for model training and analysis.

**Method:** `POST`

**Parameters:**
- `customer_id` (string, required) - Unique customer identifier
- `filename` (string, required) - Name of the uploaded file
- `manufacturer` (string, required) - Equipment manufacturer (e.g., "SolarEdge")
- `location` (string, required) - Geographic location
- `region` (string, required) - AWS region for processing

**Example:**
```bash
curl -X POST "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/ingestHistorical" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/octet-stream" \
  -F "customer_id=your-customer-id" \
  -F "filename=historical_data.csv" \
  -F "manufacturer=SolarEdge" \
  -F "location=CapeTown" \
  -F "region=af-south-1" \
  --data-binary @your-data.csv
```

#### Ingest Nowcast Load Data

**Endpoint:** `/ingestNowcast`

**Base URL:** `https://xkg3s0npv0.execute-api.af-south-1.amazonaws.com/prod`

Upload real-time energy data for immediate processing and analysis.

**Method:** `POST`

**Parameters:**
- `customer_id` (string, required) - Unique customer identifier
- `data` (object, required) - Real-time energy data
- `timestamp` (string, required) - ISO 8601 timestamp
- `region` (string, required) - AWS region for processing

**Example:**
```bash
curl -X POST "https://xkg3s0npv0.execute-api.af-south-1.amazonaws.com/prod/ingestNowcast" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "your-customer-id",
    "data": {"power": 150.5, "voltage": 240.0},
    "timestamp": "2024-01-15T10:30:00Z",
    "region": "af-south-1"
  }'
```

### 🔄 Data Processing APIs

#### Interpolate Data

**Endpoint:** `/dataInterpolation`

**Base URL:** `https://ul4rjb4twc.execute-api.af-south-1.amazonaws.com/prod`

Process and fill gaps in time-series data using advanced interpolation methods.

**Method:** `POST`

**Parameters:**
- `customer_id` (string, required) - Unique customer identifier
- `data` (array, required) - Time-series data with gaps
- `interpolation_method` (string, optional) - Method to use (linear, cubic, spline)
- `region` (string, required) - AWS region for processing

**Example:**
```bash
curl -X POST "https://ul4rjb4twc.execute-api.af-south-1.amazonaws.com/prod/dataInterpolation" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "your-customer-id",
    "data": [
      {"timestamp": "2024-01-15T10:00:00Z", "value": 100.0},
      {"timestamp": "2024-01-15T10:15:00Z", "value": null},
      {"timestamp": "2024-01-15T10:30:00Z", "value": 120.0}
    ],
    "interpolation_method": "linear",
    "region": "af-south-1"
  }'
```

### 🤖 Machine Learning APIs

#### Train Forecaster

**Endpoint:** `/`

**Base URL:** `https://x0o7xd1uq7.execute-api.af-south-1.amazonaws.com/prod`

Train machine learning models on historical data for energy forecasting.

**Method:** `POST`

**Parameters:**
- `customer_id` (string, required) - Unique customer identifier
- `location` (string, required) - Geographic location
- `manufacturer` (string, required) - Equipment manufacturer
- `serial_number` (string, required) - Equipment serial number
- `region` (string, required) - AWS region for processing
- `testing` (boolean, optional) - Enable testing mode

**Example:**
```bash
curl -X POST "https://x0o7xd1uq7.execute-api.af-south-1.amazonaws.com/prod/" \
  -H "x-api-key: YOUR_API_KEY" \
  -G \
  -d "customer_id=your-customer-id" \
  -d "location=CapeTown" \
  -d "manufacturer=SolarEdge" \
  -d "serial_number=SE123456" \
  -d "region=af-south-1" \
  -d "testing=true"
```

#### Generate Forecast

**Endpoint:** `/forecast`

**Status:** ⚠️ **NOT DEPLOYED** - Core module exists but no API Gateway deployed

**Note:** This endpoint is part of Epic #139 (Customer-Facing Features) and requires completion of security and production infrastructure epics first.

**Method:** `POST`

**Parameters:**
- `customer_id` (string, required) - Unique customer identifier
- `forecast_horizon` (integer, required) - Hours to forecast (1-168)
- `model_type` (string, optional) - Model type to use
- `region` (string, required) - AWS region for processing

**Example:** (Not available until deployed)
```bash
# This endpoint will be available after Epic #139 completion
# Expected base URL: https://[api-gateway-id].execute-api.af-south-1.amazonaws.com/prod
```

#### Return Forecasting Results

**Endpoint:** `/returnForecastingResults`

Retrieve forecast outputs and analysis results.

**Method:** `GET`

**Parameters:**
- `customer_id` (string, required) - Unique customer identifier
- `forecast_id` (string, required) - Forecast identifier
- `region` (string, required) - AWS region for processing

**Example:**
```bash
curl -X GET "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/returnForecastingResults" \
  -H "x-api-key: YOUR_API_KEY" \
  -G \
  -d "customer_id=your-customer-id" \
  -d "forecast_id=forecast-123" \
  -d "region=af-south-1"
```

### ⚡ Energy Management APIs

#### Electricity Dispatch

**Endpoint:** `/electricityDispatch`

Optimize energy dispatch and scheduling for maximum efficiency.

**Method:** `POST`

**Parameters:**
- `customer_id` (string, required) - Unique customer identifier
- `dispatch_period` (string, required) - Dispatch period (daily, weekly)
- `constraints` (object, optional) - Operational constraints
- `region` (string, required) - AWS region for processing

**Example:**
```bash
curl -X POST "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/electricityDispatch" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "your-customer-id",
    "dispatch_period": "daily",
    "constraints": {
      "max_power": 1000,
      "min_power": 100
    },
    "region": "af-south-1"
  }'
```

#### Market Price Forecast

**Endpoint:** `/marketPriceForecast`

Predict electricity market prices for trading and optimization.

**Method:** `POST`

**Parameters:**
- `market` (string, required) - Market identifier
- `forecast_horizon` (integer, required) - Hours to forecast
- `model_type` (string, optional) - Model type (lstm, prophet)
- `region` (string, required) - AWS region for processing

**Example:**
```bash
curl -X POST "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/marketPriceForecast" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "market": "ESKOM",
    "forecast_horizon": 48,
    "model_type": "lstm",
    "region": "af-south-1"
  }'
```

### 🌤️ Weather Integration APIs

#### Weather Data

**Endpoint:** `/weather`

Integrate weather data for enhanced forecasting accuracy.

**Method:** `GET`

**Parameters:**
- `location` (string, required) - Geographic coordinates or location name
- `data_type` (string, required) - Weather data type (current, forecast, historical)
- `region` (string, required) - AWS region for processing

**Example:**
```bash
curl -X GET "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/weather" \
  -H "x-api-key: YOUR_API_KEY" \
  -G \
  -d "location=CapeTown" \
  -d "data_type=forecast" \
  -d "region=af-south-1"
```

### 📋 Management APIs

#### Manage Users

**Endpoint:** `/manageUsers`

User management and access control operations.

**Method:** `POST`

**Parameters:**
- `action` (string, required) - Action to perform (create, update, delete, list)
- `user_data` (object, optional) - User information
- `region` (string, required) - AWS region for processing

**Example:**
```bash
curl -X POST "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/manageUsers" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create",
    "user_data": {
      "email": "user@example.com",
      "role": "analyst",
      "permissions": ["read", "forecast"]
    },
    "region": "af-south-1"
  }'
```

#### Policy Compliance

**Endpoint:** `/policyCompliance`

Regulatory compliance checking and policy analysis.

**Method:** `POST`

**Parameters:**
- `customer_id` (string, required) - Unique customer identifier
- `policy_type` (string, required) - Type of policy to check
- `data` (object, required) - Data for compliance checking
- `region` (string, required) - AWS region for processing

**Example:**
```bash
curl -X POST "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/policyCompliance" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "your-customer-id",
    "policy_type": "renewable_energy",
    "data": {
      "energy_source": "solar",
      "capacity": 1000,
      "location": "CapeTown"
    },
    "region": "af-south-1"
  }'
```

## Response Formats

### Success Response

```json
{
  "status": "success",
  "data": {
    // Response data specific to the endpoint
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "request_id": "req-123456"
}
```

### Error Response

```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid parameter provided",
    "details": {
      "field": "customer_id",
      "issue": "Required field missing"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "request_id": "req-123456"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `AUTHENTICATION_ERROR` | Invalid or missing API key |
| `VALIDATION_ERROR` | Invalid request parameters |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `RESOURCE_NOT_FOUND` | Requested resource not found |
| `INTERNAL_ERROR` | Server error |

## Rate Limits

- **Standard Plan:** 1000 requests per hour
- **Professional Plan:** 10000 requests per hour
- **Enterprise Plan:** Custom limits

## SDK Integration

For easier integration, use our official SDKs:

### Python SDK

```python
from ona_sdk import OnaClient

client = OnaClient(api_key="your-api-key")

# Generate forecast
result = client.generate_forecast(
    customer_id="your-id",
    forecast_horizon=24,
    region="af-south-1"
)
```

### JavaScript SDK

```javascript
const OnaClient = require('ona-sdk');

const client = new OnaClient('your-api-key');

// Generate forecast
const result = await client.generateForecast({
  customerId: 'your-id',
  forecastHorizon: 24,
  region: 'af-south-1'
});
```

## Testing

Use our test endpoints for development and testing:

```bash
# Test API connection
curl -H "x-api-key: YOUR_API_KEY" https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/health

# Test with sample data
curl -X POST "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/test/forecast" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

## Support

- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **SDK Documentation**: [Python SDK](https://pypi.org/project/ona-sdk/) | [JavaScript SDK](https://npmjs.com/package/ona-sdk)
