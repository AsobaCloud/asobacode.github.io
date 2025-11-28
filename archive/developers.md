---
title: "Developer API Guide"
layout: default
parent: "Quick Launch Guide"
nav_order: 1
---

# Developer API Guide
{: .fs-8 }

Complete guide for integrating with the Ona Platform API services. Learn how to authenticate, make requests, and use all available endpoints.
{: .fs-6 .fw-300 }

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Data Upload Endpoints](#data-upload-endpoints)
4. [Forecast Endpoints](#forecast-endpoints)
5. [Terminal API Endpoints (OODA Workflow)](#terminal-api-endpoints-ooda-workflow)
6. [ML Integration Endpoints](#ml-integration-endpoints)
7. [Request/Response Formats](#requestresponse-formats)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)
10. [Code Examples](#code-examples)

---

## Getting Started

### Base URLs

The Ona Platform API is available at:

- **Custom Domain**: `https://api.asoba.co` ✅ **LIVE**
- **Direct API Gateway**: `https://2m5xvm39ef.execute-api.af-south-1.amazonaws.com/prod`

### API Version

All endpoints use **v1** of the API. Version information is included in response metadata.

### Content Types

- **Request**: `application/json` or `text/csv` (depending on endpoint)
- **Response**: `application/json`

---

## Authentication

The Ona Platform supports two authentication methods:

### 1. API Key Authentication

Include your API key in the request header:

```bash
curl -H "X-API-Key: your-api-key" \
     -H "Content-Type: application/json" \
     -X POST https://api.asoba.co/upload_train
```

Or as a query parameter:

```bash
curl "https://api.asoba.co/forecast?customer_id=test&api_key=your-api-key"
```

### 2. IAM Role Authentication

Use AWS credentials for authentication:

```bash
# Configure AWS credentials
aws configure

# Use AWS signature in requests
curl -H "Authorization: AWS4-HMAC-SHA256 ..." \
     -X POST https://api.asoba.co/upload_train
```

### Security Headers

- **CORS**: Configured for specific origins
- **Rate Limiting**: 1000 requests per hour per API key (standard tier)
- **Request Validation**: JSON schema validation
- **SSL/TLS**: HTTPS only with TLS 1.2+

---

## Data Upload Endpoints

### POST /upload_train

Upload historical data to S3 for model training.

**Purpose**: Direct upload of historical data to S3 for model training. The dataIngestion service is currently a placeholder with no active processing logic.

**Authentication**: API key or IAM role

**Content-Type**: `text/csv` for data files, or `application/json` for metadata

**S3 Upload**: Data is uploaded directly to S3 bucket `sa-api-client-input/historical/` prefix

**Processing**: Triggers downstream processing via S3 event to `interpolationService` and `globalTrainingService`

**Request Example**:

```bash
curl -X POST https://api.asoba.co/upload_train \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: text/csv" \
  --data-binary @historical_data.csv
```

**CSV Format**:
```csv
timestamp,asset_id,temperature_c,voltage_v,power_kw,irradiance_w_m2,wind_speed_m_s
2025-01-15T08:00:00Z,INV-001,45.2,800.5,18.3,850.2,3.2
2025-01-15T08:15:00Z,INV-001,46.1,799.8,17.9,845.1,3.5
```

**Response**:
```json
{
  "success": true,
  "data": {
    "upload_id": "upload-123456",
    "s3_location": "s3://sa-api-client-input/historical/customer-001/2025-01-15/data.csv",
    "records_uploaded": 1000,
    "uploaded_at": "2025-01-15T12:00:00Z"
  },
  "metadata": {
    "request_id": "req-uuid",
    "timestamp": "2025-01-15T12:00:00Z",
    "version": "v1.0"
  }
}
```

### POST /upload_nowcast

Upload real-time data to S3 for forecasting.

**Purpose**: Direct upload of real-time data to S3 for forecasting. The dataIngestion service is currently a placeholder with no active processing logic.

**Authentication**: API key or IAM role

**Content-Type**: `text/csv` for data files, or `application/json` for metadata

**S3 Upload**: Data is uploaded directly to S3 bucket `sa-api-client-input/nowcast/` prefix

**Processing**: Triggers downstream processing via S3 event to `interpolationService` for forecasting

**Request Example**:

```bash
curl -X POST https://api.asoba.co/upload_nowcast \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: text/csv" \
  --data-binary @realtime_data.csv
```

**Response**:
```json
{
  "success": true,
  "data": {
    "upload_id": "upload-789012",
    "s3_location": "s3://sa-api-client-input/nowcast/customer-001/2025-01-15/data.csv",
    "records_uploaded": 96,
    "uploaded_at": "2025-01-15T12:00:00Z"
  }
}
```

---

## Forecast Endpoints

### GET /forecast

Generate energy production forecast.

**Purpose**: Generate energy production forecast for a customer's assets.

**Authentication**: API key or IAM role

**Query Parameters**:
- `customer_id` (required): Customer identifier
- `site_id` (optional): Specific site identifier
- `horizon_hours` (optional): Forecast horizon in hours (default: 48)

**Request Example**:

```bash
curl -X GET "https://api.asoba.co/forecast?customer_id=demo-customer&horizon_hours=48" \
  -H "X-API-Key: your-api-key"
```

**Response**:
```json
{
  "forecast_id": "fc-demo-12345678",
  "customer_id": "demo-customer",
  "site_id": "demo-site-cape-town-01",
  "generated_at": "2025-01-15T12:00:00Z",
  "horizon_hours": 48,
  "forecasts": [
    {
      "timestamp": "2025-01-15T13:00:00Z",
      "predicted_power_kw": 1250.5,
      "confidence_interval": {
        "lower": 1180.2,
        "upper": 1320.8
      },
      "weather_conditions": {
        "temperature_c": 25.3,
        "irradiance_w_m2": 850.2,
        "wind_speed_m_s": 3.2
      }
    }
  ],
  "metadata": {
    "model_version": "v2.1.0",
    "training_data_points": 8760,
    "model_accuracy": 0.94
  }
}
```

---

## Terminal API Endpoints (OODA Workflow)

The Terminal API provides endpoints for the OODA (Observe-Orient-Decide-Act) workflow for asset management.

### POST /terminal/assets

Manage solar assets and components.

**Authentication**: API key or IAM role

**Content-Type**: `application/json`

**Actions**:
- `add`: Create new asset
- `list`: List all assets
- `get`: Retrieve specific asset details

**Request Example (add)**:

```bash
curl -X POST https://api.asoba.co/terminal/assets \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add",
    "asset_id": "INV-001",
    "name": "Main Inverter 1",
    "type": "Solar Inverter",
    "capacity_kw": 20.0,
    "location": "Cape Town Solar Farm",
    "components": [
      {
        "oem": "Sungrow",
        "model": "SG20KTL",
        "serial": "SN123456"
      }
    ]
  }'
```

**Response**:
```json
{
  "message": "Asset created successfully",
  "asset_id": "INV-001"
}
```

### POST /terminal/detect

Run fault detection on assets.

**Authentication**: API key or IAM role

**Actions**:
- `run`: Execute fault detection
- `list`: List detection results

**Request Example**:

```bash
curl -X POST https://api.asoba.co/terminal/detect \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "run",
    "asset_id": "INV-001"
  }'
```

**Response**:
```json
{
  "message": "Detection completed",
  "asset_id": "INV-001",
  "detections": []
}
```

### POST /terminal/diagnose

Run AI diagnostics on detected faults.

**Authentication**: API key or IAM role

**Actions**:
- `run`: Execute diagnostics
- `list`: List diagnostics results

**Request Example**:

```bash
curl -X POST https://api.asoba.co/terminal/diagnose \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "run",
    "asset_id": "INV-001"
  }'
```

**Response**:
```json
{
  "message": "Diagnostics completed",
  "asset_id": "INV-001",
  "diagnostics": []
}
```

### POST /terminal/schedule

Create maintenance schedules.

**Authentication**: API key or IAM role

**Actions**:
- `create`: Create new schedule
- `list`: List all schedules

**Response**:
```json
{
  "message": "Schedule created",
  "schedule_id": "sched-uuid"
}
```

### POST /terminal/bom

Build bill of materials for maintenance.

**Authentication**: API key or IAM role

**Actions**:
- `build`: Generate BOM
- `list`: List existing BOMs

**Response**:
```json
{
  "message": "BOM built",
  "bom_id": "bom-uuid"
}
```

### POST /terminal/order

Create work orders.

**Authentication**: API key or IAM role

**Actions**:
- `create`: Create new work order
- `list`: List all work orders

**Response**:
```json
{
  "message": "Order created",
  "order_id": "ord-uuid"
}
```

### POST /terminal/track

Track job status and progress.

**Authentication**: API key or IAM role

**Actions**:
- `subscribe`: Subscribe to job tracking
- `list`: List tracking subscriptions

**Response**:
```json
{
  "message": "Tracking subscription created",
  "job_id": "job-uuid"
}
```

---

## ML Integration Endpoints

### POST /terminal/forecast

Retrieve stored ML forecast results for a customer.

**Authentication**: API key or IAM role

**Content-Type**: `application/json`

**Request Body**:
```json
{
  "customer_id": "demo-customer"
}
```

**Response**:
```json
{
  "success": true,
  "customer_id": "demo-customer",
  "forecast_results": [
    {
      "forecast_id": "fc-demo-12345678",
      "site_id": "demo-site-cape-town-01",
      "generated_at": "2025-11-16T12:00:00Z",
      "model_name": "global_forecast_lstm",
      "model_version": "v1.3.2",
      "horizon_hours": 24,
      "forecast_points": [
        {
          "timestamp": "2025-11-16T13:00:00Z",
          "hour_ahead": 1,
          "predicted_power_kw": 816.1,
          "lower_conf_kw": 786.0,
          "upper_conf_kw": 846.2
        }
      ],
      "metrics": {
        "training_rmse": 0.082,
        "validation_rmse": 0.096,
        "mape_percent": 5.4,
        "smape_percent": 6.8
      },
      "weather_context": {
        "avg_temperature_c": 22.5,
        "avg_irradiance_wm2": 795.0,
        "avg_wind_speed_ms": 4.2
      }
    }
  ],
  "count": 1
}
```

**DynamoDB Table**: `ona-platform-ml-forecast-results`

**Limit**: Returns up to 10 most recent forecasts per customer

### POST /terminal/interpolation

Retrieve stored interpolation gap-filling results for a customer.

**Authentication**: API key or IAM role

**Content-Type**: `application/json`

**Request Body**:
```json
{
  "customer_id": "demo-customer"
}
```

**Response**:
```json
{
  "success": true,
  "customer_id": "demo-customer",
  "interpolation_results": [
    {
      "result_id": "in-demo-87654321",
      "site_id": "demo-site-cape-town-01",
      "processed_at": "2025-11-16T12:00:00Z",
      "method": "adaptive_multi_output",
      "asset_ids": ["INV-DEMO-001", "INV-DEMO-002"],
      "data_window": {
        "start": "2025-11-16T06:00:00Z",
        "end": "2025-11-16T12:00:00Z"
      },
      "gap_statistics": {
        "total_gaps": 100,
        "average_gap_minutes": 15,
        "largest_gap_minutes": 60,
        "coverage_improvement_percent": 10.5
      },
      "performance_metrics": {
        "rmse_kw": 6.8,
        "mae_kw": 4.9,
        "r2_score": 0.948,
        "nrmse_percent": 3.4
      },
      "weather_features": {
        "mean_temperature_c": 21.8,
        "mean_irradiance_wm2": 788.5
      }
    }
  ],
  "count": 1
}
```

**DynamoDB Table**: `ona-platform-ml-interpolation-results`

**Limit**: Returns up to 10 most recent interpolation runs per customer

### POST /terminal/ml-models

Retrieve ML model registry (shared catalog of all available models).

**Authentication**: API key or IAM role

**Content-Type**: `application/json`

**Request Body**: `{}` (no parameters required - registry is shared)

**Response**:
```json
{
  "success": true,
  "model_metrics": [
    {
      "model_name": "global_forecast_lstm",
      "model_version": "v1.3.2",
      "model_type": "forecasting",
      "status": "active",
      "last_trained_at": "2025-10-22T14:15:00Z",
      "training_data_window": {
        "start": "2025-01-01T00:00:00Z",
        "end": "2025-10-01T00:00:00Z"
      },
      "hyperparameters": {
        "layers": [256, 256, 128],
        "learning_rate": 0.0005,
        "dropout": 0.2,
        "optimizer": "adam"
      },
      "training_metrics": {
        "epochs": 42,
        "train_loss": 0.072,
        "validation_loss": 0.089,
        "early_stop_epoch": 5
      },
      "artifact_locations": {
        "model": "s3://sa-api-client-output/customer_tailored/Sibaya/models/v1.3.2/model.h5",
        "encoders": "s3://sa-api-client-output/customer_tailored/Sibaya/models/v1.3.2/encoders.pkl",
        "config": "s3://sa-api-client-output/customer_tailored/Sibaya/models/v1.3.2/config.json"
      }
    }
  ],
  "count": 1
}
```

**DynamoDB Table**: `ona-platform-ml-model-registry`

**Note**: Model registry is a shared catalog, not customer-specific

**Limit**: Returns up to 20 models

### POST /terminal/ooda

Retrieve ML-enhanced OODA summaries (severity, energy-at-risk, recommended actions).

**Authentication**: API key or IAM role

**Content-Type**: `application/json`

**Request Body**:
```json
{
  "customer_id": "demo-customer"
}
```

**Response**:
```json
{
  "success": true,
  "customer_id": "demo-customer",
  "ml_enhanced_activities": [
    {
      "summary_id": "ms-demo-12345678",
      "asset_id": "INV-DEMO-001",
      "created_at": "2025-11-16T12:00:00Z",
      "last_detection_at": "2025-11-16T12:00:00Z",
      "model_version": "v1.3.2",
      "fault_family": "performance_loss",
      "severity_label": "moderate",
      "confidence": 0.78,
      "energy_at_risk_kw": 62.5,
      "root_cause": "Production 8% below expectation under good irradiance",
      "recommended_actions": [
        {
          "priority": "P1",
          "action": "Inspect DC strings for damage or shading"
        },
        {
          "priority": "P2",
          "action": "Verify irradiance sensor calibration"
        }
      ],
      "detections": ["det-demo-001"]
    }
  ],
  "count": 1
}
```

**DynamoDB Table**: `ona-platform-ml-ooda-summaries`

**Limit**: Returns up to 20 most recent summaries per customer

---

## Request/Response Formats

### Standard Response Format

All successful API responses follow this structure:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "metadata": {
    "request_id": "uuid",
    "timestamp": "2025-01-15T12:00:00Z",
    "version": "v1.0"
  },
  "errors": []
}
```

### Error Response Format

Error responses follow this structure:

```json
{
  "success": false,
  "data": null,
  "metadata": {
    "request_id": "uuid",
    "timestamp": "2025-01-15T12:00:00Z",
    "version": "v1.0"
  },
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Invalid customer_id format",
      "field": "customer_id",
      "details": "Expected format: alphanumeric string"
    }
  ]
}
```

---

## Error Handling

### Common Error Codes

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `AUTHENTICATION_ERROR` | 401 | Invalid or missing authentication |
| `AUTHORIZATION_ERROR` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit exceeded |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

### Error Response Example

```json
{
  "success": false,
  "data": null,
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Invalid customer_id format",
      "field": "customer_id",
      "details": "Expected format: alphanumeric string"
    }
  ],
  "metadata": {
    "request_id": "req-123456",
    "timestamp": "2025-01-15T12:00:00Z"
  }
}
```

### Handling Errors

Always check the `success` field in the response. If `false`, inspect the `errors` array for details.

```python
import requests

response = requests.post(
    "https://api.asoba.co/forecast",
    headers={"X-API-Key": "your-api-key"},
    json={"customer_id": "invalid"}
)

data = response.json()

if not data.get("success"):
    for error in data.get("errors", []):
        print(f"Error {error['code']}: {error['message']}")
        if "field" in error:
            print(f"  Field: {error['field']}")
```

---

## Rate Limiting

### Rate Limits by Tier

| Tier | Requests/Hour | Burst Limit |
|------|---------------|-------------|
| Standard | 1,000 | 100 |
| Premium | 10,000 | 1,000 |
| Enterprise | 100,000 | 10,000 |

### Checking Rate Limit Status

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 755
X-RateLimit-Reset: 1642248000
```

### Rate Limit Exceeded Response

When rate limit is exceeded:

```json
{
  "success": false,
  "data": null,
  "errors": [
    {
      "code": "QUOTA_EXCEEDED",
      "message": "Rate limit exceeded. Try again later.",
      "retry_after": 3600
    }
  ]
}
```

HTTP Status: `429 Too Many Requests`

### Best Practices

1. **Implement Exponential Backoff**: Retry with increasing delays
2. **Cache Responses**: Cache forecast results when possible
3. **Batch Requests**: Combine multiple operations when possible
4. **Monitor Headers**: Check `X-RateLimit-Remaining` to avoid hitting limits

---

## Code Examples

### Python

```python
import requests
import time
from typing import Dict, Optional

class OnaPlatformClient:
    def __init__(self, api_key: str, base_url: str = "https://api.asoba.co"):
        self.api_key = api_key
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            "X-API-Key": api_key,
            "Content-Type": "application/json"
        })
    
    def upload_training_data(self, csv_data: str) -> Dict:
        """Upload historical data for model training"""
        response = self.session.post(
            f"{self.base_url}/upload_train",
            data=csv_data,
            headers={"Content-Type": "text/csv"}
        )
        response.raise_for_status()
        return response.json()
    
    def get_forecast(self, customer_id: str, site_id: Optional[str] = None, 
                     horizon_hours: int = 48) -> Dict:
        """Get energy production forecast"""
        params = {
            "customer_id": customer_id,
            "horizon_hours": horizon_hours
        }
        if site_id:
            params["site_id"] = site_id
        
        response = self.session.get(f"{self.base_url}/forecast", params=params)
        response.raise_for_status()
        return response.json()
    
    def manage_asset(self, action: str, asset_data: Dict) -> Dict:
        """Manage assets (add, list, get)"""
        payload = {"action": action, **asset_data}
        response = self.session.post(
            f"{self.base_url}/terminal/assets",
            json=payload
        )
        response.raise_for_status()
        return response.json()
    
    def get_ml_forecast_results(self, customer_id: str) -> Dict:
        """Get stored ML forecast results"""
        response = self.session.post(
            f"{self.base_url}/terminal/forecast",
            json={"customer_id": customer_id}
        )
        response.raise_for_status()
        return response.json()

# Usage
client = OnaPlatformClient(api_key="your-api-key")

# Upload training data
with open("historical_data.csv", "r") as f:
    result = client.upload_training_data(f.read())
    print(f"Uploaded: {result['data']['upload_id']}")

# Get forecast
forecast = client.get_forecast(customer_id="demo-customer", horizon_hours=48)
print(f"Forecast generated: {forecast['forecast_id']}")

# Get ML forecast results
ml_results = client.get_ml_forecast_results("demo-customer")
print(f"Found {ml_results['count']} forecast results")
```

### JavaScript/Node.js

```javascript
const axios = require('axios');

class OnaPlatformClient {
  constructor(apiKey, baseUrl = 'https://api.asoba.co') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });
  }

  async uploadTrainingData(csvData) {
    const response = await this.client.post('/upload_train', csvData, {
      headers: { 'Content-Type': 'text/csv' }
    });
    return response.data;
  }

  async getForecast(customerId, siteId = null, horizonHours = 48) {
    const params = {
      customer_id: customerId,
      horizon_hours: horizonHours
    };
    if (siteId) params.site_id = siteId;

    const response = await this.client.get('/forecast', { params });
    return response.data;
  }

  async manageAsset(action, assetData) {
    const response = await this.client.post('/terminal/assets', {
      action,
      ...assetData
    });
    return response.data;
  }

  async getMLForecastResults(customerId) {
    const response = await this.client.post('/terminal/forecast', {
      customer_id: customerId
    });
    return response.data;
  }
}

// Usage
const client = new OnaPlatformClient('your-api-key');

(async () => {
  try {
    // Get forecast
    const forecast = await client.getForecast('demo-customer', null, 48);
    console.log(`Forecast generated: ${forecast.forecast_id}`);

    // Get ML forecast results
    const mlResults = await client.getMLForecastResults('demo-customer');
    console.log(`Found ${mlResults.count} forecast results`);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
})();
```

### cURL Examples

```bash
# Set API key as variable
export API_KEY="your-api-key"
export BASE_URL="https://api.asoba.co"

# Upload training data
curl -X POST "${BASE_URL}/upload_train" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: text/csv" \
  --data-binary @historical_data.csv

# Get forecast
curl -X GET "${BASE_URL}/forecast?customer_id=demo-customer&horizon_hours=48" \
  -H "X-API-Key: ${API_KEY}"

# Manage asset
curl -X POST "${BASE_URL}/terminal/assets" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add",
    "asset_id": "INV-001",
    "name": "Main Inverter 1",
    "type": "Solar Inverter",
    "capacity_kw": 20.0
  }'

# Get ML forecast results
curl -X POST "${BASE_URL}/terminal/forecast" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"customer_id": "demo-customer"}'
```

---

## Best Practices

### 1. Error Handling

Always implement proper error handling:

```python
try:
    response = client.get_forecast("demo-customer")
    if not response.get("success"):
        # Handle API errors
        for error in response.get("errors", []):
            logger.error(f"API Error: {error['code']} - {error['message']}")
except requests.exceptions.RequestException as e:
    # Handle network errors
    logger.error(f"Network error: {e}")
```

### 2. Retry Logic

Implement exponential backoff for retries:

```python
import time
from functools import wraps

def retry_with_backoff(max_retries=3, backoff_factor=2):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except requests.exceptions.RequestException as e:
                    if attempt == max_retries - 1:
                        raise
                    wait_time = backoff_factor ** attempt
                    time.sleep(wait_time)
            return None
        return wrapper
    return decorator

@retry_with_backoff(max_retries=3)
def get_forecast_with_retry(client, customer_id):
    return client.get_forecast(customer_id)
```

### 3. Request Validation

Validate data before sending:

```python
def validate_forecast_request(customer_id: str, horizon_hours: int):
    if not customer_id or not isinstance(customer_id, str):
        raise ValueError("customer_id must be a non-empty string")
    if not isinstance(horizon_hours, int) or horizon_hours < 1 or horizon_hours > 168:
        raise ValueError("horizon_hours must be between 1 and 168")
```

### 4. Response Caching

Cache forecast results to reduce API calls:

```python
from functools import lru_cache
from datetime import datetime, timedelta

@lru_cache(maxsize=100)
def get_cached_forecast(customer_id: str, cache_key: str):
    # Cache key includes timestamp to expire after 1 hour
    return client.get_forecast(customer_id)
```

### 5. Logging

Implement comprehensive logging:

```python
import logging

logger = logging.getLogger(__name__)

def get_forecast_with_logging(client, customer_id):
    logger.info(f"Requesting forecast for customer: {customer_id}")
    try:
        response = client.get_forecast(customer_id)
        logger.info(f"Forecast generated: {response.get('forecast_id')}")
        return response
    except Exception as e:
        logger.error(f"Error getting forecast: {e}", exc_info=True)
        raise
```

---

## Additional Resources

### Service Documentation

For detailed service-specific documentation, refer to:

- [System Administration Guide](../SYSTEM_ADMIN.md) - Complete platform administration guide
- [API Reference](../api-reference.md) - Detailed API documentation
- [Troubleshooting Guide](../troubleshooting.md) - Common issues and solutions

### Support

- **Email**: support@asoba.co
- **Discord**: [Join our Discord server](https://discord.gg/nNV5evcr)

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, API questions, or integration help, please reach out to our dedicated support team.</p>
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
