---
title: "Changelog"
layout: default
nav_order: 99
---

# Changelog

All notable changes to the Ona Platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### [2025-11-28]

### Added
- **Document Title Extraction and Citation Support** (`services/energyAnalystRag/`):
  - Document title extraction from first page of PDFs (first substantial line, 50-200 chars)
  - Document title extraction from text documents in `/add_documents` endpoint
  - Citation field added to `QueryResponse` model
  - Title extraction prioritizes metadata `document_title`, falls back to text extraction
  - All documents now include `document_title` in metadata for proper citation
- **Handler Improvements** (`services/energyAnalystRag/handler_fixed.py`):
  - Handler now extracts only generated text (removes input prompt from response)
  - Uses token slicing to return only new tokens after input
  - Prevents full prompt from appearing in response
- **Manual ECR Build Guide** (`docs/MANUAL_ECR_BUILD.md`):
  - Complete guide for manually building and pushing ECR images
  - Instructions for building specific services
  - Troubleshooting for common ECR build issues
- **Service-Specific ECR Build Script** (`scripts/build-energyanalystrag-ecr.sh`):
  - Dedicated script for building and pushing energyAnalystRag service to ECR
  - Supports both mutable and immutable tags
  - Includes verification and logging

### Changed
- **EnergyAnalyst RAG Service** (`services/energyAnalystRag/main.py`):
  - Updated Inference Endpoint URL to new endpoint: `sfg89dy7nzesdkl7.us-east-1.aws.endpoints.huggingface.cloud`
  - Improved error handling and logging for Inference Endpoint responses
  - Added detailed logging for response extraction steps
  - Simplified citation extraction logic (metadata-first approach)
  - Enhanced startup validation with better error messages
- **Query Response Format**:
  - Added `citation` field to `QueryResponse` model
  - Citation extracted from `document_title` metadata with fallback chain
  - Removed complex text extraction logic in favor of metadata-based approach

### Fixed
- **Inference Endpoint Response Handling**:
  - Fixed `KeyError('generated_text')` by using `details=True` in `text_generation()` calls
  - Added proper response object extraction with fallback handling
  - Improved error messages to identify exact failure points
- **Handler Response Format**:
  - Handler now returns only generated text instead of full sequence
  - Prevents prompt repetition in responses

### Documentation
- **EnergyAnalyst RAG Troubleshooting Guide** (`docs/ENERGYANALYST_RAG_TROUBLESHOOTING.md`):
  - Comprehensive troubleshooting guide for HuggingFace Inference Endpoint issues
  - Railway deployment troubleshooting
  - Model loading and inference issues
  - Vector database and authentication solutions
  - Production deployment checklist
- **Service Documentation Updates**:
  - Updated README with two-tier deployment architecture documentation
  - Added HuggingFace Inference Endpoint setup guide
  - Documented handler requirements and dependencies
  - Added production endpoint URLs and configuration examples

### [2025-11-27]

### Changed
- **HuggingFace API Integration** (`services/energyAnalystRag/`):
  - Updated to use HuggingFace Inference Endpoints (dedicated endpoints) instead of router API
  - Migrated from deprecated `api-inference.huggingface.co` endpoint
  - Updated `huggingface-hub` to `>=0.28.0,<0.32.0` with `[hf_xet]` extra
  - Updated environment variable handling to prioritize `HUGGING_FACE_HUB_TOKEN` and `HF_TOKEN`
  - Kept `HUGGINGFACE_API_TOKEN` as fallback for backward compatibility
- **Railway Deployment**:
  - Removed `Procfile` to force Railway to use `Dockerfile` for builds
  - Updated deployment configuration for better compatibility

### Fixed
- **InferenceClient Configuration**:
  - Fixed issues with `base_url` and `provider` parameter usage
  - Corrected InferenceClient initialization for Inference Endpoints
  - Fixed authentication issues causing 410 errors
- **Error Handling**:
  - Added `GatedRepoError` handling for better startup validation
  - Improved error messages for model access issues

### [2025-11-26]

### Added
- **EnergyAnalyst RAG LLM Service** (`services/energyAnalystRag/`):
  - FastAPI-based RAG service using EnergyAnalyst-v0.1 model (Mistral-7B-v0.3 fine-tuned)
  - ChromaDB vector database for document storage and semantic search
  - Sentence-transformers for document embeddings
  - HuggingFace Inference API integration
  - Endpoints: `/query`, `/add_documents`, `/health`, `/collection/info`, `/collection/clear`
  - Specialized capabilities:
    - Regulatory compliance requirement identification
    - Energy policy gap detection and analysis
    - Arbitrage opportunity spotting in regulations
    - Actionable compliance checklist generation
  - Model training: 3-stage pipeline (SFT on Dolly-15k, pre-training on 50k policy docs, fine-tuning on 7k Q&A pairs)
  - Containerized with Docker for ECR deployment
- **Test Script** (`services/energyAnalystRag/test_hf_connection.py`):
  - Local testing script for HuggingFace Inference Endpoint connection
  - Rapid troubleshooting tool for endpoint validation

### Fixed
- **ChromaDB Telemetry**:
  - Suppressed PostHog telemetry errors causing log spam
  - Set telemetry logger to CRITICAL level only
- **Dockerfile**:
  - Fixed package check to verify `huggingface-hub` instead of `openai`
  - Corrected dependency validation in build process
  - Added cache-busting mechanism using requirements.txt hash
- **InferenceClient Configuration**:
  - Fixed to use `InferenceClient` for text generation models (not OpenAI SDK)
  - Corrected endpoint configuration for HuggingFace router API
  - Added model access validation on startup
  - Fixed multiple iterations of endpoint configuration (router API, base_url, provider parameters)

### Changed
- **CI/CD Pipeline** (`.github/workflows/build-and-push.yml`):
  - Added `ona-energyanalystrag` to ECR repository creation list
  - New build step for EnergyAnalyst RAG service Docker image
  - Pushes three image tags: `prod`, `prod-{gitsha}`, `latest`
  - Platform: linux/amd64
- **Deployment Script** (`ui/deploy-edge.sh`):
  - Added `energy-analyst.html` to required files check
  - Included Energy Analyst in deployment copy operations
  - Added direct link in deployment output

### Documentation
- **Railway ECR Deployment Guide** (`services/energyAnalystRag/RAILWAY_ECR_DEPLOYMENT.md`):
  - Complete guide for deploying RAG service to Railway using ECR images
  - IAM setup instructions for ECR access
  - Railway configuration (dashboard and CLI methods)
  - Automatic deployment with webhooks
  - Monitoring, troubleshooting, and rollback procedures
  - Cost optimization strategies
  - Security best practices
- **Service Documentation** (`services/energyAnalystRag/README.md`):
  - Service overview and architecture
  - API endpoint documentation with examples
  - Model details and limitations
  - Deployment options (Railway ECR vs direct)
  - Local development setup
  - Environment variables reference
- **Deployment Tools**:
  - `railway.json`: Railway service configuration
  - `setup-railway-ecr.sh`: Automated deployment script
  - `test_api.py`: API validation script
  - `.env.example`: Environment variable template

### [2025-11-23]

### Added
- **Device-Level Training** (`globalTrainingService`):
  - New device-level training pipeline that trains individual LSTM models per device (serial_number)
  - Device discovery scans S3 for device datasets under `total/{client_id}/{site_id}/{region}/{location}/{manufacturer}/{device_id}/`
  - Device quality filtering with lower thresholds (500 records, 3 months, 80% completeness)
  - Site registry management storing device mappings at `site_registry/{site_id}/devices.json`
  - Device-specific feature engineering with device/site/manufacturer statistics
  - Device validation strategy: trains on other devices, validates on target device
  - Device model artifacts stored at `device_models/{site_id}/{device_id}/models/`
  - Uses smaller SageMaker instances (ml.g4dn.xlarge) optimized for single-device training
- **Device-Level Forecasting** (`forecastingApi`):
  - New endpoint for single device forecasts: `{"site_id": "...", "device_id": "...", "forecast_hours": 24}`
  - New site aggregate endpoint: `{"site_id": "...", "forecast_hours": 24, "include_device_breakdown": true}`
  - Site forecasts aggregate device forecasts by summing predictions
  - Optional device breakdown shows per-device contributions to site total
- **Backwards Compatibility**: Legacy customer_id (site-level) training and forecasting APIs remain fully supported

### [2025-11-18]

### Fixed
- **UI & Charting**: Prevented legacy chart rendering when the new Performance module is active.

### [2025-11-17]

### Changed
- **UI Architecture**: Modularized the UI into a component-based architecture with `components/`, `sections/`, `services/`, and `utils/` directories. This improves code organization, reusability, and maintainability.
- **Customer Selection**: Switched to using `localStorage` for customer selection instead of hardcoding, allowing user preferences to persist across sessions.
- **API Calls**: Converted parallel API calls to sequential loading to prevent Lambda throttling issues.
- **Deployment Scripts**: Added `set -euo pipefail` to all shell scripts to ensure safer and more robust execution.

### Fixed
- **UI & Charting**:
  - Fixed an issue where orphaned Chart.js instances were not being destroyed before creating new charts.
  - Corrected time ranges for the Performance chart and added a missing temperature chart.
  - Ensured the Performance module correctly uses `DataService` functions and data structures.
  - Fixed access to forecast comparison series in `Performance.js`.
  - Enabled interactive time range selection for charts in the Performance section.
- **Data & API**:
  - Corrected a syntax error resulting from an async/await conversion.
  - Fixed incorrect `Issues` module function references in the `handleDataRefresh` logic.
  - Added missing terminal endpoints to the API Gateway configuration.
  - Changed the default customer from "Sibaya" to "demo-customer" to align with available API data.
  - Fixed an issue causing the site listing not to refresh when the customer selector was changed.
- **Deployment & CI/CD**:
  - Updated deployment scripts to correctly deploy the new modular JS directories (components, sections, services, utils) to S3.
  - Updated the Docker cache in the CI/CD workflow.
- **Tooling & Safety**:
  - Updated the JavaScript safety checker to correctly recognize callback parameters and browser APIs.

### Documentation
- **UI README**:
  - Added a comprehensive module API reference to the UI README.
  - Updated the UI README structure section to reflect the new modular architecture.
  - Added a testing quick reference in the `ui/` directory.
- **System Admin Docs**:
  - Referenced the `ui/README.md` API documentation in `SYSTEM ADMIN.md` for better discoverability.

### [2025-11-15]

### Added
- **Test suite for terminalApi**: Added an endpoint test suite for terminalApi validation.

### Changed
- **Testing**: Moved and renamed the main test script to the `tests/` directory for better organization.

## [0.2.0] - 2025-10-17

### Added
- **Terminal Environment Configuration** (`config/terminal-environment.sh`)
  - Standalone configuration extending platform config
  - 4 terminal services defined (terminalApi, terminalOoda, terminalAssets, terminalBom)
  - Terminal-specific Lambda memory/timeout configurations
  - 8 helper functions for resource management
  - Tag inheritance with Component=terminal extension
- **Terminal SSM Parameters** (26 parameters via `scripts/14-create-terminal-parameters.sh`)
  - OODA configuration: detection threshold, loss weights, severity levels, fault categories
  - Alert configuration: SNS topic, email, enabled flag
  - API configuration: rate limiting, timeout, debug mode
  - Integration endpoints: parts API, weather API, maintenance system
  - Operational parameters: crew count, work hours, maintenance windows, priorities
  - Data retention policies: asset history, schedules, orders, tracking
  - Feature flags: OODA, auto-schedule, auto-order, AI diagnostics
- Terminal API Service with 7 OODA workflow endpoints (`/terminal/*`)
  - `/terminal/assets` - Asset management operations
  - `/terminal/detect` - Fault detection
  - `/terminal/diagnose` - AI diagnostics
  - `/terminal/schedule` - Maintenance scheduling
  - `/terminal/bom` - Bill of materials generation
  - `/terminal/order` - Work order creation
  - `/terminal/track` - Job tracking
- Comprehensive test suite for Global Training Service (261 lines, 4 test scenarios)
- AI Coding Guidelines documentation (`.claude/rules/ai-coding-guidelines.md`)
- Parallel processing for deployment scripts
- Docker-optional Lambda deployment support
- Global Training Service README with detailed LSTM architecture documentation

### Changed
- **Separated terminal configuration** from platform config (config/environment.sh → config/terminal-environment.sh)
  - Removed terminal tables, services array, and helper functions from main config
  - Updated 5 scripts to source terminal config: 03, 05, 08, 10, 17
  - Clean separation of concerns for maintainability
- **Optimized IAM role creation** with parallel processing (70% faster: 35-56s → 10-15s)
- **Optimized Lambda deployment** with parallel updates (75% faster: 7 minutes → 1.5 minutes)
- **Optimized API Gateway** endpoint creation with parallel execution (70% faster: 30-50s → 8-12s)
- Reduced redundant Lambda wait operations (6 waits → 4 waits per function)
- Updated MLflow to version 3.4.0 (from 2.6.0)
- Fixed IAM policy variable expansion (removed redundant string substitution in lines 169-175)
- Improved API Gateway idempotency for nested terminal endpoints

### Fixed
- DynamoDB Decimal serialization in Terminal API (added DecimalEncoder class)
- API Gateway method creation now properly checks for existing methods
- CloudWatch logging and error handling improvements
- ECR login handling when Docker is not available (graceful fallback)

### Performance
- **Total deployment time reduced by 77%** (8-9 minutes → 1.8-2 minutes)
  - IAM creation: 35-56s → 10-15s (70% improvement)
  - Lambda deployment: 420s (7m) → 90s (1.5m) (75% improvement)
  - API Gateway setup: 30-50s → 8-12s (70% improvement)

### Security
- All deployment scripts maintain idempotency for safe re-execution
- Proper error tracking and reporting in parallel processes
- Thread-safe CloudWatch logging

## [0.1.0] - 2025-10-13

### Added
- Initial platform implementation
- Core services:
  - `dataIngestion` - Real-time SCADA/inverter data ingestion
  - `weatherCache` - Weather data integration (15-minute intervals)
  - `interpolationService` - Data enrichment and ML interpolation
  - `globalTrainingService` - LSTM model training orchestration
  - `forecastingApi` - 30+ day forecasting capabilities
- DynamoDB tables:
  - `ona-platform-locations` - Location and customer data
  - `ona-platform-weather-cache` - Weather data cache
  - Terminal tables (assets, schedules, BOMs, orders, tracking)
- S3-based data pipeline
  - `sa-api-client-input` - Input data bucket
  - `sa-api-client-output` - Output data and models bucket
- API Gateway integration with custom domain support (`api.asoba.co`)
- Automated weather data collection via Visual Crossing API
- ML-based data interpolation
- LSTM forecasting capabilities (placeholder)
- Deployment automation scripts (12 scripts)
- DNS infrastructure setup with SSL/TLS certificates
- CloudWatch logging and monitoring

### Infrastructure
- AWS Lambda functions (containerized with Docker)
- API Gateway REST API
- S3 storage buckets
- DynamoDB tables
- EventBridge scheduling
- Route53 DNS management
- ACM SSL/TLS certificates
- ECR Docker registries

---

**Version Format**: MAJOR.MINOR.PATCH
- **MAJOR**: Incompatible API changes
- **MINOR**: Backwards-compatible functionality additions
- **PATCH**: Backwards-compatible bug fixes