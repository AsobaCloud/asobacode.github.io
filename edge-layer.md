---
title: "Edge Layer"
layout: default
nav_order: 2
parent: "Introduction"
---

# Edge Layer
{: .fs-8 }

The Edge Layer hosts Predictive AI models on low-power compute devices attached directly to energy assets, performing short-term forecasts and maintaining local data resilience.
{: .fs-6 .fw-300 }

---

## Overview

The Edge Layer is the foundation of the Ona Platform's distributed intelligence architecture. It runs on low-power compute devices attached directly to energy assets, enabling real-time forecasting and fault prediction at the source. This layer ensures operational continuity even when connectivity to the central control layer is interrupted.

**Key Capabilities:**
- Hosts Predictive AI models for short-term forecasting (0-48 hours)
- Performs local model execution on each node
- Stores 48 hours of data locally for resilience
- Operates independently during connectivity loss
- Provides real-time predictions for each asset node

---

## Forecasting Capabilities

### Short-Term Forecasts (0-48 Hours)

The Edge Layer generates energy production forecasts with a horizon of up to 48 hours. These forecasts are critical for:
- **Operational Planning**: Enabling operators to anticipate energy production
- **Grid Integration**: Supporting dispatch decisions and grid stability
- **Maintenance Scheduling**: Optimizing maintenance windows based on predicted production
- **Financial Planning**: Supporting energy trading and revenue forecasting

### Forecast API Endpoint

**GET /forecast**

Generate energy production forecast for a customer's assets.

**Query Parameters:**
- `customer_id` (required): Customer identifier
- `site_id` (optional): Specific site identifier
- `horizon_hours` (optional): Forecast horizon in hours (default: 48)

**Example Request:**
```bash
curl -X GET "https://api.asoba.co/forecast?customer_id=demo-customer&horizon_hours=48" \
  -H "X-API-Key: your-api-key"
```

**Example Response:**
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

## Lambda Services

The Edge Layer is powered by several AWS Lambda functions that handle forecasting and data processing:

### Forecasting API Service

**`ona-forecastingApi-prod`**
- **Memory**: 3008MB
- **Timeout**: 60 seconds
- **Purpose**: Generates energy production forecasts using trained ML models
- **Capabilities**:
  - Loads trained LSTM models from S3
  - Processes nowcast data for forecast generation
  - Integrates weather forecast data
  - Returns structured forecast responses with confidence intervals

### Interpolation Service

**`ona-interpolationService-prod`**
- **Memory**: 3008MB
- **Timeout**: 900 seconds (15 minutes)
- **Purpose**: Fills data gaps and enriches time series data
- **Capabilities**:
  - ML-powered gap filling using adaptive multi-output methods
  - Data enrichment with weather features
  - Performance metrics calculation (RMSE, MAE, R²)
  - Handles missing telemetry data gracefully

### Data Standardization Service

**`ona-dataStandardizationService-prod`**
- **Memory**: 1024MB
- **Timeout**: 300 seconds
- **Purpose**: Normalizes and standardizes data from various OEM sources
- **Capabilities**:
  - Converts OEM-specific formats to standardized schema
  - Handles multiple inverter manufacturers (Huawei, Enphase, etc.)
  - Validates data quality and completeness

---

## Data Storage and Resilience

### Local Data Buffer

Each edge node maintains a **48-hour local data buffer** to ensure:
- **Resilience**: Continued operation during connectivity loss
- **Performance**: Reduced latency for local predictions
- **Reliability**: No data loss during network interruptions

### Cloud Storage (S3)

**Input Bucket**: `sa-api-client-input`
- `observations/`: Raw sensor data from assets
- `nowcast/`: Real-time data for forecasting
- `historical/`: Historical data for model training

**Output Bucket**: `sa-api-client-output`
- `forecasts/`: Generated forecast results
- `models/`: Trained ML model artifacts
- `training_data/`: Processed training datasets

### DynamoDB Tables

**`ona-platform-locations`**
- Stores location and customer data
- Supports geographic data queries
- Enables location-based weather data retrieval

**`ona-platform-weather-cache`**
- Caches weather data to reduce API calls
- Improves forecast generation performance
- Reduces external API dependencies

---

## Local Model Execution

### Model Deployment

Predictive AI models are deployed to edge devices and execute locally:
- **LSTM Models**: Long Short-Term Memory networks for time series forecasting
- **Model Versioning**: Supports multiple model versions for A/B testing
- **Model Updates**: Can be updated remotely without device downtime
- **Resource Efficiency**: Optimized for low-power compute devices

### Model Performance

**Typical Model Metrics:**
- **Training RMSE**: 0.072-0.082
- **Validation RMSE**: 0.089-0.096
- **MAPE**: 5.4-6.8%
- **SMAPE**: 6.8-8.2%
- **Model Accuracy**: 94%+

### Model Artifacts

Models are stored in S3 with the following structure:
```
s3://sa-api-client-output/customer_tailored/{customer_id}/models/{version}/
├── model.h5              # Trained model weights
├── encoders.pkl          # Feature encoders
└── config.json           # Model configuration
```

---

## Resilience and Independence

### Graceful Degradation

Each edge node operates independently if the central connection fails:
- **Forecasting Continues**: Local models continue generating predictions
- **Fault Detection Active**: Anomaly detection runs locally
- **Data Queuing**: Decisions and data are queued for transmission
- **Automatic Recovery**: Queued data transmits automatically when connectivity is restored

### Connectivity Requirements

- **Minimum**: Intermittent connectivity sufficient for data synchronization
- **Optimal**: Continuous connectivity for real-time updates
- **Fallback**: 48-hour local buffer ensures operation during outages

---

## Integration with Control Layer

The Edge Layer communicates with the Control Layer through:
- **Encrypted Channels**: TLS 1.3 encryption for all communications
- **Certificate-Based Authentication**: Secure device authentication
- **API Gateway**: Centralized API endpoint management
- **Data Synchronization**: Automatic sync when connectivity is restored

---

## Performance Characteristics

### Latency
- **Forecast Generation**: < 5 seconds per node
- **Data Processing**: < 1 second per data point
- **Model Loading**: < 2 seconds (cached after first load)

### Throughput
- **Forecasts per Hour**: 1000+ per node
- **Data Points Processed**: 10,000+ per minute
- **Concurrent Requests**: 20+ simultaneous forecasts

### Resource Usage
- **CPU**: Optimized for low-power ARM processors
- **Memory**: 512MB-3GB depending on model complexity
- **Storage**: 48-hour buffer requires ~100MB per node

---

## Next Steps

- **[Control Layer](control-layer.html)** - Learn about the central coordination layer
- **[Interface Layer](interface-layer.html)** - Explore the user interface and dashboards
- **[User Guide](user-guide.html)** - Get started with Ona Platform deployment

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
