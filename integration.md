---
title: "Integration"
layout: default
nav_order: 8
---

# Integration Guide

Comprehensive guide for integrating with the Ona API ecosystem.

## Overview

The Ona platform provides multiple integration options for developers, from simple SDK usage to advanced webhook configurations and custom implementations.

## SDKs

### Python SDK

The official Python SDK provides a high-level interface for all Ona API operations.

#### Installation

```bash
pip install ona-sdk
```

#### Basic Usage

```python
from ona_sdk import OnaClient

# Initialize client
client = OnaClient(
    api_key="your-api-key",
    region="af-south-1"
)

# Upload historical data
result = client.ingest_historical(
    customer_id="your-customer-id",
    file_path="data.csv",
    manufacturer="SolarEdge",
    location="CapeTown"
)

# Generate forecast
forecast = client.generate_forecast(
    customer_id="your-customer-id",
    forecast_horizon=24,
    model_type="lstm"
)

# Get results
results = client.get_forecast_results(
    customer_id="your-customer-id",
    forecast_id=forecast["forecast_id"]
)
```

#### Advanced Configuration

```python
from ona_sdk import OnaClient, Config

# Custom configuration
config = Config(
    timeout=30,
    retry_attempts=3,
    log_level="DEBUG"
)

client = OnaClient(
    api_key="your-api-key",
    config=config
)
```

### JavaScript/Node.js SDK

The JavaScript SDK supports both Node.js and browser environments.

#### Installation

```bash
npm install ona-sdk
```

#### Basic Usage

```javascript
const OnaClient = require('ona-sdk');

// Initialize client
const client = new OnaClient('your-api-key', {
    region: 'af-south-1'
});

// Upload historical data
const result = await client.ingestHistorical({
    customerId: 'your-customer-id',
    filePath: 'data.csv',
    manufacturer: 'SolarEdge',
    location: 'CapeTown'
});

// Generate forecast
const forecast = await client.generateForecast({
    customerId: 'your-customer-id',
    forecastHorizon: 24,
    modelType: 'lstm'
});
```

#### Browser Usage

```html
<script src="https://unpkg.com/ona-sdk@latest/dist/ona-sdk.min.js"></script>
<script>
const client = new OnaClient('your-api-key');

client.generateForecast({
    customerId: 'your-customer-id',
    forecastHorizon: 24
}).then(result => {
    console.log('Forecast:', result);
});
</script>
```

## Webhooks

Configure webhooks to receive real-time notifications about API events.

### Supported Events

- `forecast.completed` - Forecast generation completed
- `data.ingested` - New data ingested successfully
- `model.trained` - Model training completed
- `error.occurred` - Error in processing

### Webhook Configuration

```python
from ona_sdk import OnaClient

client = OnaClient("your-api-key")

# Create webhook
webhook = client.create_webhook(
    url="https://your-app.com/webhooks/ona",
    events=["forecast.completed", "data.ingested"],
    secret="your-webhook-secret"
)
```

### Webhook Payload Format

```json
{
  "event": "forecast.completed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "customer_id": "your-customer-id",
    "forecast_id": "forecast-123",
    "status": "completed",
    "results_url": "https://api.asoba.co/results/forecast-123"
  },
  "signature": "sha256=..."
}
```

### Webhook Verification

```python
import hmac
import hashlib

def verify_webhook_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(f"sha256={expected_signature}", signature)
```

## Authentication

### API Key Management

```python
from ona_sdk import OnaClient

# Create new API key
client = OnaClient("master-api-key")
new_key = client.create_api_key(
    name="production-key",
    permissions=["forecast", "data_ingestion"],
    expires_at="2024-12-31T23:59:59Z"
)

# List API keys
keys = client.list_api_keys()

# Revoke API key
client.revoke_api_key("key-id")
```

### JWT Authentication (Enterprise)

```python
from ona_sdk import OnaClient

# JWT-based authentication
client = OnaClient(
    jwt_token="your-jwt-token",
    auth_type="jwt"
)
```

## Integration Patterns

### Batch Processing

```python
import asyncio
from ona_sdk import OnaClient

async def process_batch_data():
    client = OnaClient("your-api-key")
    
    # Upload multiple files
    tasks = []
    for file_path in data_files:
        task = client.ingest_historical(
            customer_id="your-customer-id",
            file_path=file_path,
            manufacturer="SolarEdge"
        )
        tasks.append(task)
    
    # Wait for all uploads
    results = await asyncio.gather(*tasks)
    
    # Generate forecasts for all customers
    forecast_tasks = []
    for result in results:
        if result["status"] == "success":
            task = client.generate_forecast(
                customer_id=result["customer_id"],
                forecast_horizon=24
            )
            forecast_tasks.append(task)
    
    forecasts = await asyncio.gather(*forecast_tasks)
    return forecasts
```

### Real-time Data Streaming

```python
import asyncio
from ona_sdk import OnaClient

async def stream_realtime_data():
    client = OnaClient("your-api-key")
    
    # Set up webhook for real-time notifications
    webhook = await client.create_webhook(
        url="https://your-app.com/webhooks/realtime",
        events=["data.ingested"]
    )
    
    # Stream data continuously
    async for data_point in client.stream_realtime_data():
        # Process real-time data
        processed = await process_data_point(data_point)
        
        # Send to forecasting API
        await client.ingest_nowcast(
            customer_id="your-customer-id",
            data=processed
        )
```

### Error Handling

```python
from ona_sdk import OnaClient, OnaError

client = OnaClient("your-api-key")

try:
    result = client.generate_forecast(
        customer_id="your-customer-id",
        forecast_horizon=24
    )
except OnaError as e:
    if e.code == "RATE_LIMIT_EXCEEDED":
        # Implement retry logic
        await asyncio.sleep(60)
        result = client.generate_forecast(...)
    elif e.code == "AUTHENTICATION_ERROR":
        # Refresh API key
        client.api_key = refresh_api_key()
        result = client.generate_forecast(...)
    else:
        # Log and handle other errors
        logger.error(f"API Error: {e.message}")
        raise
```

## Testing

### Mock SDK for Testing

```python
from ona_sdk.testing import MockOnaClient

# Use mock client for testing
client = MockOnaClient()

# Mock responses
client.mock_response("generate_forecast", {
    "forecast_id": "test-forecast-123",
    "status": "completed"
})

# Test your integration
result = client.generate_forecast(
    customer_id="test-customer",
    forecast_horizon=24
)
assert result["forecast_id"] == "test-forecast-123"
```

### Integration Testing

```python
import pytest
from ona_sdk import OnaClient

@pytest.fixture
def ona_client():
    return OnaClient("test-api-key")

async def test_forecast_workflow(ona_client):
    # Test complete workflow
    upload_result = await ona_client.ingest_historical(
        customer_id="test-customer",
        file_path="test-data.csv"
    )
    
    assert upload_result["status"] == "success"
    
    forecast_result = await ona_client.generate_forecast(
        customer_id="test-customer",
        forecast_horizon=24
    )
    
    assert forecast_result["forecast_id"] is not None
```

## Best Practices

### Rate Limiting

```python
import asyncio
from ona_sdk import OnaClient

class RateLimitedClient:
    def __init__(self, api_key, requests_per_minute=60):
        self.client = OnaClient(api_key)
        self.requests_per_minute = requests_per_minute
        self.request_times = []
    
    async def make_request(self, method, *args, **kwargs):
        # Check rate limit
        now = asyncio.get_event_loop().time()
        self.request_times = [t for t in self.request_times if now - t < 60]
        
        if len(self.request_times) >= self.requests_per_minute:
            wait_time = 60 - (now - self.request_times[0])
            await asyncio.sleep(wait_time)
        
        self.request_times.append(now)
        return await method(*args, **kwargs)
```

### Caching

```python
import redis
from ona_sdk import OnaClient

class CachedOnaClient:
    def __init__(self, api_key, redis_url):
        self.client = OnaClient(api_key)
        self.redis = redis.from_url(redis_url)
    
    async def get_forecast_results(self, customer_id, forecast_id):
        cache_key = f"forecast:{customer_id}:{forecast_id}"
        
        # Check cache first
        cached = self.redis.get(cache_key)
        if cached:
            return json.loads(cached)
        
        # Fetch from API
        result = await self.client.get_forecast_results(
            customer_id, forecast_id
        )
        
        # Cache for 5 minutes
        self.redis.setex(cache_key, 300, json.dumps(result))
        return result
```

## Support

- 📧 **Integration Support**: [integrations@asoba.co](mailto:integrations@asoba.co)
- 💬 **Developer Discord**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **SDK Documentation**: [Python SDK](https://pypi.org/project/ona-sdk/) | [JavaScript SDK](https://npmjs.com/package/ona-sdk)
- 🔧 **API Status**: [status.asoba.co](https://status.asoba.co)
