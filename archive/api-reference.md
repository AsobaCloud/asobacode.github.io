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

### Platform Architecture

The Ona Platform follows a layered architecture:

1. **Data Ingestion Layer**: Historical and real-time data collection
2. **Processing Layer**: Data enrichment, interpolation, and ML training
3. **API Layer**: RESTful endpoints for forecasting and analysis
4. **Application Layer**: OODA workflow for operational decisions

### Service Capabilities

- ✅ **Data Operations**: Data ingestion, processing, and training
- ✅ **ML Services**: Model training and forecasting capabilities
- ✅ **API Services**: RESTful API endpoints for integration

## Authentication

All API requests require authentication using API keys:

```bash
# Set your API key in headers
curl -H "x-api-key: YOUR_API_KEY" https://api.asoba.co/ingestHistorical
```

## Base URLs

The Ona API uses a unified API Gateway endpoint:

### Production Endpoint
- **Base URL**: `https://api.asoba.co`
- **API Version**: v1

### Regional Deployment
- The API is deployed in the `af-south-1` AWS region
- All endpoints are accessible through the unified base URL

### Service Endpoints
- **Data Ingestion**: `/ingestHistorical`, `/ingestNowcast`
- **Data Processing**: `/dataInterpolation`
- **ML Services**: `/train`, `/forecast`
- **Terminal Operations**: `/terminal/*` 
- **Partner Snapshots**: `/kpi-rollup`, `/maintenance-signals`, `/forecast-snapshot`, `/snapshot`

## Core APIs

### 🤝 Partner APIs (Snapshots)

High-performance endpoints serving pre-computed JSON snapshots with ETag support for sub-100ms responses in embedded use cases.

#### Get KPI Rollup

**Endpoint:** `/kpi-rollup`
**Method:** `GET`
**Parameters:**
- `site_id` (string, required) - Site identifier

#### Get Maintenance Signals

**Endpoint:** `/maintenance-signals`
**Method:** `GET`
**Parameters:**
- `site_id` (string, required) - Site identifier
- `since` (string, optional) - ISO 8601 timestamp for changefeed-style use
- `severity` (string, optional) - Filter by severity (low, medium, high, critical)

#### Get Forecast Snapshot

**Endpoint:** `/forecast-snapshot`
**Method:** `GET`
**Parameters:**
- `site_id` (string, required) - Site identifier
- `horizon` (string, optional) - Forecast horizon (e.g., "24h", "7d")

#### Get Generic Snapshot

**Endpoint:** `/snapshot`
**Method:** `GET`
**Parameters:**
- `site_id` (string, required) - Site identifier
- `kind` (string, required) - The kind of snapshot (e.g., "custom-kpis")


### 🔌 Data Ingestion APIs

#### Ingest Historical Load Data

**Endpoint:** `/ingestHistorical`

**Base URL:** `https://api.asoba.co`

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

**Base URL:** `https://api.asoba.co`

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

**Base URL:** `https://api.asoba.co`

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
curl -X GET "https://api.asoba.co/returnForecastingResults" \
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
curl -X POST "https://api.asoba.co/marketPriceForecast" \
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
curl -X POST "https://api.asoba.co/policyCompliance" \
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
curl -H "x-api-key: YOUR_API_KEY" https://api.asoba.co/health

# Test with sample data
curl -X POST "https://api.asoba.co/test/forecast" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

## Support

- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **SDK Documentation**: [Python SDK](https://pypi.org/project/ona-sdk/) | [JavaScript SDK](https://npmjs.com/package/ona-sdk)

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