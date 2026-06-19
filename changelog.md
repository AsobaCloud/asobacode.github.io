---
title: "Changelog"
layout: default
nav_order: 7
---


All notable changes to the Ona Platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Alerts System Overhaul** (GitHub Issue #16, SEP-037):
  - Direct alert creation from the Alerts section via "+ New Alert" button — no longer requires running a Digest first
  - Alert modal now includes topic, date window (days), and frequency inputs for standalone configuration
  - Regulatory events are now included in alert results alongside newsroom articles, filtered by the alert's topic and date window
  - `viewAlertResults` renders a "Regulatory Events" section below the synthesis showing title, jurisdiction, event type, date, and summary
  - `regulatory_events_json` column added to `digest_alert_results` table with automatic ALTER TABLE migration
- **Controller/Renderer Architecture Migration** (GitHub Issue #180):
  - Complete separation of concerns between business logic (Controllers) and DOM rendering (Renderers)
  - New Controller modules for all sections:
    - `sections/IssuesController.js` - Manages subscriptions, timers, and business logic for Issues section
    - `sections/DashboardController.js` - Manages subscriptions, timers, WebSocket simulation, and maintenance plan approvals
    - `sections/PerformanceController.js` - Manages subscriptions, timers, and performance data updates
    - `sections/MaintenanceController.js` - Manages subscriptions, BOM operations, and maintenance plan approvals
  - New Renderer modules for all sections:
    - `sections/IssuesRenderer.js` - Handles all DOM mutations and formatting for Issues section
    - `sections/DashboardRenderer.js` - Handles all DOM mutations and formatting for Dashboard section
    - `sections/PerformanceRenderer.js` - Handles all DOM mutations and formatting for Performance section
    - `sections/MaintenanceRenderer.js` - Handles all DOM mutations and formatting for Maintenance section
  - UIRenderQueue integration: All sections now use centralized render queue for coordinated DOM updates
  - Event-driven architecture: Controllers subscribe to DataStore domains, Renderers handle DOM mutations atomically
  - Backward compatibility: Legacy section modules still loaded for gradual migration

### Changed
- **UI Architecture** (`ui/admin-gpu-panel.html`, `ui/admin-gpu-panel.js`):
  - Updated to load new Controller and Renderer modules before legacy modules
  - Section loading now uses Controller.load() pattern with async/await
  - Event handlers updated to use Controller methods (e.g., `handleApprovePlan`, `handleAddToBOM`)
  - All sections follow consistent Controller/Renderer pattern
- **Section Modules** (`ui/sections/`):
  - All sections migrated to Controller/Renderer architecture
  - Controllers handle: subscriptions, timers, business logic, event delegation
  - Renderers handle: DOM mutations, formatting, event listener attachment
  - No inline onclick handlers - all use data-action attributes with event delegation

### Fixed
- **Alerts background runner**: `execute_alert(alert)` was missing the required `store` parameter, causing a silent `TypeError` on every due alert execution in the web app
- **Newsroom DynamoDB pagination**: `fetch_articles_by_date_range` and `fetch_recent_articles` now paginate using `LastEvaluatedKey`, returning all matching articles instead of only the first page (e.g., 1450 instead of 322 articles)
- **Newsroom date normalization**: `pub_date` strings are now normalized to ISO format (`YYYY-MM-DDTHH:MM:SS`) in `_dynamodb_item_to_dict`, fixing malformed date ranges in facets
- **Newsroom scraper feeds**: Replaced dead/403 RSS feeds with Google News RSS equivalents and updated GovTrack URLs; added rotating User-Agent headers to avoid 403 blocks
- **Newsroom scraper tagging**: Added topic tagging to economy and legislation scrapers; all 4 scraper modules (news, legislation, polymarket, economy) are now enabled in `all` mode
- **JS Safety Checker**: Fixed undefined function call issue (renamed `unsub` parameter to `unsubscribe`)

## [1.2.0] - 2025-12-13

### Added
- **Asoba Internal Ops (Data Admin) System**:
  - Backend infrastructure with SAM template at `infrastructure/data-admin/`
  - Lambda functions: NewsroomFunction (S3 indexing), AssetsFunction (CRUD)
  - DynamoDB table: `ona-platform-internal-assets` with GSIs (AssetTypeIndex, AssignedToIndex)
  - Newsroom Intel: S3-indexed article browsing (~8,700 articles from `news-collection-website` bucket)
  - Asset Tracking: Full CRUD for internal assets (laptops, devices) with user assignment
  - Data Directory: Static HTML links to internal resources
  - Frontend UI: `data-admin.html`, `data-admin.js`, `DataAdminService.js`
  - Role-based access: Super Admin and Admin only
  - Server-side pagination (50/100/200 items per page)
  - 90-day default date range with filtering by geography, topic, search
  - Dual view mode: iframe view and filterable table view
  - User assignment validation with enrichment from `ona-platform-users` table
- **Deployment Scripts**:
  - `scripts/28-create-data-admin-tables.sh` - Creates internal assets DynamoDB table
  - `scripts/29-create-data-admin-lambda.sh` - Deploys Data Admin Lambda functions via SAM
- **LLM Benchmarking System**:
  - Comprehensive benchmarking tests for EnergyAnalyst RAG service
  - Automated test suite with 12 core tests for faster CI/CD execution
  - Performance metrics and validation

### Changed
- **UI Deployment** (`ui/deploy-edge.sh`):
  - Added `data-admin.html` and `data-admin.js` to deployment
  - Updated required files check and deployment output
- **Application Selection** (`ui/application-select.html`):
  - Added "Asoba Internal Ops" application card (visible to Super Admin and Admin only)
  - Integrated data-admin into APPLICATION_MAP
  - Role-based visibility logic for data-admin card
- **DataAdminService.js**:
  - Fixed authentication pattern to match AdminService (uses `authService` singleton, `ona_auth_token`)
  - Added cache-busting parameters for GET requests (CloudFront 404 cache prevention)
- **Config.js** (`ui/config.js`):
  - Added `DATA_ADMIN_API_ENDPOINT` configuration
- **data-admin.js**:
  - Fixed authentication references: `authService` instead of `window.AuthService`
  - Fixed method names: `isAuthenticated()`, `getUser()`, `logout()`
  - Fixed skin service: `window.skinService.init()` instead of `window.SkinService.loadSkin()`

### Fixed
- **EnergyAnalyst RAG Response Handling**:
  - Preserved newlines in `clean_response` function
  - Removed "Answer:" duplication in responses
  - Removed aggressive response truncation
  - Added proper `.railwayignore` to exclude test venvs
- **CI/CD Workflows**:
  - Fixed variable expansion in GitHub Actions
  - Fixed type annotations in benchmark tests (`any` -> `Any`)
  - Simplified sync-edge-ui-pr workflow
- **Data Admin Authentication**:
  - Fixed immediate logout issue by correcting service references
  - Ensured proper AuthService singleton usage
  - Fixed skin service initialization

### Documentation
- **UI README** (`ui/README.md`):
  - Removed "Coming Soon" tags from Data Admin sections
  - Marked Data Admin as deployed (2025-12-13)
  - Updated Data Admin API base URL with actual endpoint
- **System Admin Guide** (`docs/SYSTEM ADMIN.md`):
  - Added complete Data Admin deployment documentation
  - Added Data Admin API endpoints documentation
  - Updated DynamoDB tables section (7 -> 13 tables)
  - Added documentation for user management tables (users, roles, groups, customers, skins)
  - Added documentation for data admin table (internal-assets)
  - Added SSM parameters for Data Admin
  - Added troubleshooting guide for Data Admin
- **AWS Infrastructure Diagram**:
  - Updated with current service catalog

### Infrastructure
- **AWS SAM Template** (`infrastructure/data-admin/template.yaml`):
  - Serverless API with 2 Lambda functions (NewsroomFunction, AssetsFunction)
  - 30-second timeout and 512MB memory for S3 scanning performance
  - CORS configuration for cross-origin requests
  - Environment variables for S3 bucket, DynamoDB tables, JWT secret
  - Cross-table access: AssetsFunction reads from `ona-platform-users` for enrichment
- **DynamoDB Table**:
  - `ona-platform-internal-assets` - Internal asset tracking with user assignment
  - GSIs: AssetTypeIndex (query by asset type), AssignedToIndex (query by assigned user)
  - Attributes: asset_type, serial_number, assigned_to, purchase_date, notes, status
- **SSM Parameters**:
  - `/ona-platform/prod/data-admin/api-endpoint` - API Gateway endpoint URL
  - `/ona-platform/prod/data-admin/assets-table` - DynamoDB table name
- **API Endpoint**:
  - Production: `https://pj1ud6q3uf.execute-api.af-south-1.amazonaws.com/prod`
  - Stack: `ona-data-admin-prod` (CloudFormation)

## [1.1.0] - 2025-11-29

### Added
- **User Management & Role-Based Access Control (RBAC) System**:
  - Complete user management infrastructure with AWS Lambda, API Gateway, and DynamoDB
  - JWT-based authentication with secure password hashing (bcrypt)
  - Role-based access control with 5 default roles: Super Admin, Admin, Operator, Viewer, Customer Admin
  - Application-level permissions for fine-grained access control
  - Customer association for multi-tenant access control
  - User & Role Administration UI (`ui/user-admin.html`) with full CRUD operations
  - AdminService.js for frontend API interactions
  - AuthService.js for authentication and authorization checks
  - Config.js for centralized API endpoint configuration
- **Deployment Scripts**:
  - `scripts/22-create-user-management-tables.sh` - Creates DynamoDB tables for users, roles, and customers
  - `scripts/23-create-user-management-lambda.sh` - Deploys Lambda functions and API Gateway using SAM
  - `scripts/24-initialize-user-management.sh` - Initializes default roles in DynamoDB
  - `scripts/25-create-super-admin-user.sh` - Creates initial super admin user
  - `scripts/26-update-user-password.sh` - Utility script for password updates
  - `scripts/get-user-management-endpoint.sh` - Helper script to retrieve API endpoint from SSM/CloudFormation
- **Documentation**:
  - `docs/USER_MANAGEMENT_IMPLEMENTATION.md` - Comprehensive user management documentation
  - Updated `docs/SYSTEM ADMIN.md` with user management section
  - Added user management references and links

### Changed
- **UI Deployment** (`ui/deploy-edge.sh`):
  - Added `user-admin.html` and `user-admin.js` to deployment
  - Added `config.js` to deployment
  - Updated to include all admin page files
- **Application Selection** (`ui/application-select.html`):
  - Added dynamic application filtering based on user role and permissions
  - Added "User & Role Administration" application card (visible to Super Admin and Admin only)
  - Implemented APPLICATION_MAP for centralized application configuration
- **Login Page** (`ui/index.html`):
  - Integrated with AuthService.js for API-based authentication
  - Replaced simple sessionStorage authentication with JWT token-based system
  - Added config.js loading before AuthService

### Fixed
- **API Gateway Path Parsing**:
  - Fixed path parsing in Lambda functions to handle API Gateway stage names (`/prod/api/users`)
  - Added validation to distinguish between resource names (`users`, `roles`) and IDs (`user_xxx`, `role_xxx`)
  - Prevents treating resource names as IDs, which caused 404 errors
- **Error Handling**:
  - Improved AdminService.js error handling to distinguish Lambda errors from API Gateway errors
  - Added cache-busting query parameters to avoid CloudFront 404 cache issues
  - Enhanced error messages with detailed debugging information
- **DynamoDB Region Configuration**:
  - Fixed DynamoDB client initialization to use correct region (af-south-1)
  - Added debug logging for troubleshooting user/role lookups
- **CloudFront Caching**:
  - Added cache-busting parameters to GET requests
  - Changed API Gateway endpoint type to REGIONAL to avoid CloudFront caching issues
- **Build Artifacts**:
  - Added `.aws-sam/` to `.gitignore` to prevent committing build artifacts

### Infrastructure
- **AWS SAM Template** (`infrastructure/user-management/template.yaml`):
  - Serverless API with 4 Lambda functions: AuthFunction, UsersFunction, RolesFunction, PermissionsFunction
  - REGIONAL endpoint configuration to avoid CloudFront caching
  - CORS configuration for cross-origin requests
  - Environment variables for DynamoDB table names and JWT secret
- **DynamoDB Tables**:
  - `ona-platform-users` - User accounts with username index
  - `ona-platform-roles` - Role definitions with application permissions
  - `ona-platform-customers` - Customer data for multi-tenant access
- **SSM Parameters**:
  - `/ona-platform/prod/user-management/api-endpoint` - API Gateway endpoint URL
  - Role IDs stored in SSM for easy reference

## [1.0.0] - 2025-11-28

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
- **Railway Redeploy Automation** (`scripts/redeploy-railway-energyanalystrag.sh`):
  - Automated Railway redeployment script
  - Integrated into ECR build process for automatic redeployment after image push
  - Includes Railway CLI detection and login validation

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
- **Release Notes** (`docs/RELEASE_NOTES.md`):
  - Comprehensive release notes for EnergyAnalyst RAG service
  - Includes features, improvements, bug fixes, and migration notes

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

