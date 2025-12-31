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

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:integrations@asoba.co" class="support-button">Email Support</a>
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