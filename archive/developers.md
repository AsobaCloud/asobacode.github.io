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
