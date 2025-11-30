---
title: "Services"
layout: default
nav_order: 1.6
---

# Services

The Ona Platform is built on a distributed architecture of modular agents, each specializing in a particular task within the Ona Intelligence Layer. These services work together to transform raw operational data into actionable business intelligence through a coordinated, event-driven pipeline.

Each service operates as an independent, specialized agent that:
- **Focuses on a single responsibility**: From data collection to ML model training, each agent excels at its specific domain
- **Communicates through events**: Services interact via S3 events, API calls, and message queues, enabling loose coupling and scalability
- **Maintains state independently**: Each agent manages its own data, configuration, and operational state
- **Scales autonomously**: Services can scale independently based on their specific workload patterns
- **Contributes to the intelligence layer**: Together, these agents form the Ona Intelligence Layer that powers the OODA (Observe, Orient, Decide, Act) workflow

This modular architecture enables the platform to handle complex energy management tasks—from real-time anomaly detection to 30+ day predictive forecasting—by orchestrating specialized agents that each bring deep expertise to their domain. Whether collecting data from solar inverters, standardizing multi-OEM formats, training customer-tailored ML models, or generating automated work orders, each service agent plays a critical role in delivering intelligent energy management capabilities.

---

## Data Collection Services
{: #data-collection-services }

### Data Ingestion Service
{: #data-ingestion-service }

AWS Lambda function that serves as the secure entry point for incoming data, providing pre-signed URLs for direct S3 uploads.

**Location**: `/home/shingai/platform/services/dataIngestion/`

**Key Features**:
- Secure entry point for data uploads
- Pre-signed URL generation for S3
- AWS Lambda Powertools for logging and metrics

**Documentation**: See `services/dataIngestion/README.md` in the platform repository.

---

### Huawei Historical Service
{: #huawei-historical-service }

Collects historical data from Huawei FusionSolar inverters, transforms it to ONA platform format, and uploads to S3.

**Location**: `/home/shingai/platform/services/huaweiHistorical/`

**Key Features**:
- Huawei FusionSolar API integration
- Device discovery and data collection
- Weather data enrichment
- Direct S3 upload to historical prefix

**Documentation**: See `services/huaweiHistorical/README.md` and `services/huaweiHistorical/HUAWEI_API_DOCS.md` in the platform repository.

---

### Weather Data Updater Service
{: #weather-data-updater-service }

Automatically updates weather data for South African cities by fetching missing data from Visual Crossing API.

**Location**: `/home/shingai/platform/services/weatherDataUpdater/`

**Key Features**:
- Dynamic date range calculation
- Cost-optimized API usage
- Duplicate prevention
- Support for Cape Town, Johannesburg, and Durban

**Documentation**: See `services/weatherDataUpdater/README.md` in the platform repository.

---

## Data Processing Services
{: #data-processing-services }

### Data Standardization Service
{: #data-standardization-service }

Processes files from the `historical/` S3 prefix, detects OEM type, standardizes schema, and saves to `total/` prefix.

**Location**: `/home/shingai/platform/services/dataStandardizationService/`

**Key Features**:
- OEM type detection (Huawei, Enphase, Solarman, Telkom/Huawei)
- Schema normalization
- Error code mapping to categorical types
- Timestamp aggregation

**Documentation**: See `services/dataStandardizationService/README.md` and `services/DATA_STANDARDIZATION_SERVICE_PLAN.md` in the platform repository.

---

### Interpolation Service
{: #interpolation-service }

ML-based solar data interpolation with comprehensive gap analysis and configuration-driven architecture.

**Location**: `/home/shingai/platform/services/interpolationService/`

**Key Features**:
- Configuration-driven interpolation architecture
- Gap analysis and pattern detection
- Multiple interpolation methods (Spline, Gaussian Process, Physics-based, Multi-output regression)
- Adaptive interpolation with R² > 0.99
- Weather integration and solar physics constraints

**Documentation**: See `services/interpolationService/README.md` in the platform repository.

---

### Weather Cache Service
{: #weather-cache-service }

Scheduled AWS Lambda function that fetches weather data for all active locations and caches results in S3.

**Location**: `/home/shingai/platform/services/weatherCache/`

**Key Features**:
- Asynchronous concurrent API calls
- Rate limiting for external APIs
- Centralized S3 cache
- DynamoDB integration for location management

**Documentation**: See `services/weatherCache/README.md` in the platform repository.

---

## Machine Learning Services
{: #machine-learning-services }

### Global Training Service
{: #global-training-service }

Hybrid Lambda + SageMaker architecture for training LSTM forecasting models using customer validation optimization.

**Location**: `/home/shingai/platform/services/globalTrainingService/`

**Key Features**:
- Site-level and device-level training
- Customer validation optimization strategy
- GPU training on SageMaker (ml.g4dn.2xlarge)
- Automatic customer discovery and quality filtering
- Model registry for forecastingApi

**Documentation**: See `services/globalTrainingService/README.md` in the platform repository.

---

### Forecasting API Service
{: #forecasting-api-service }

AWS Lambda function that provides solar energy forecasting via API endpoint, loading ML models and generating predictions.

**Location**: `/home/shingai/platform/services/forecastingApi/`

**Key Features**:
- TensorFlow and Prophet integration
- Redis caching for forecast results
- 30+ day forecasting capabilities
- API specification with OpenAPI

**Documentation**: See `services/forecastingApi/README.md` in the platform repository.

---

## Application Services
{: #application-services }

### Terminal API Service
{: #terminal-api-service }

Central API handler for the entire O&M OODA workflow, routing requests to appropriate sub-handlers.

**Location**: `/home/shingai/platform/services/terminalApi/`

**Key Features**:
- Unified entry point for OODA workflow
- Asset management (Create, Read, List)
- Fault detection and AI diagnostics
- Maintenance scheduling and work orders
- DynamoDB integration for state management

**Documentation**: See `services/terminalApi/README.md` in the platform repository.

---

### Edge Device Registry Service
{: #edge-device-registry-service }

Manages device discovery, registration, and capability detection for distributed edge devices.

**Location**: `/home/shingai/platform/services/edge-device-registry/`

**Key Features**:
- Device discovery and registration
- Capability detection
- Device status tracking
- RESTful API interface

**Documentation**: See `services/edge-device-registry/app.py` in the platform repository.

---

### Energy Analyst RAG Service
{: #energy-analyst-rag-service }

RAG-powered service for energy policy and regulatory compliance analysis.

**Location**: `/home/shingai/platform/services/energyAnalystRag/`

**Key Features**:
- Regulatory compliance queries
- Policy analysis
- Document retrieval and analysis
- AI-powered insights

**Documentation**: See `services/energyAnalystRag/README.md` and related deployment guides in the platform repository.

---

## Service Architecture

All services follow a consistent architecture pattern:

- **Container-based**: Built as Docker containers
- **AWS Lambda**: Deployed as serverless functions
- **Base Image**: Most services inherit from `ona-base` image
- **Logging**: AWS Lambda Powertools for structured logging
- **Metrics**: CloudWatch metrics integration
- **S3 Integration**: Standardized S3 bucket structure
- **Event-Driven**: S3 events trigger downstream processing

---

## Service Dependencies

### Base Image (`ona-base`)
**Location**: `/home/shingai/platform/services/base/`

Common dependencies and utilities shared across services:
- `boto3` for AWS services
- `pandas` for data processing
- `aws-lambda-powertools` for logging and metrics
- Common utilities in `utils/common.py`

**Documentation**: See `services/base/README.md` in the platform repository.

---

## Service Integration Flow

```
Data Collection → Data Standardization → Training → Forecasting
     ↓                    ↓                  ↓            ↓
huaweiHistorical → dataStandardization → globalTraining → forecastingApi
weatherDataUpdater → Service            → Service      → Service
     ↓
weatherCache
     ↓
interpolationService
     ↓
terminalApi (OODA Workflow)
```

---

## Getting Started

For detailed documentation on each service, refer to the README files in `/home/shingai/platform/services/`:

1. Navigate to the service directory
2. Review the README.md file
3. Check environment variables and configuration
4. Review build and deployment instructions

---

## Support

For questions or issues with services:
- **Email**: support@asoba.co
- **GitHub Issues**: https://github.com/AsobaCloud/platform/issues
- **Documentation**: https://docs.asoba.co

---

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

© 2025 Asoba Corporation. All rights reserved.
