<<<<<<< HEAD
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

### Added
- **LSTM Global Forecasting Model Training Pipeline** (Issue #49): Hybrid Lambda + SageMaker architecture for cost-effective GPU training
  - **Architecture**: Hybrid approach separates data prep (Lambda) from model training (SageMaker GPU)
    - **Why**: LSTM training requires ~55 minutes on CPU, exceeding Lambda's 15-minute timeout
    - **Solution**: Lambda prepares data (~5 min, $0.01), SageMaker trains model (~10 min, $0.23)
    - **Cost**: ~$0.24 per training run, ~$12/year (50 runs)
  - **Lambda: globalTrainingService** (`services/globalTrainingService/app.py`): Data preparation and SageMaker orchestration
    - Automatic customer discovery from S3 bucket (scans `total/` prefix for all customer datasets)
    - Quality filtering: >1000 records, >6 months data, >80% completeness
    - Weather data integration for feature enrichment
    - Feature engineering: encoders, lags, rolling stats, cross-manufacturer features
    - Customer validation split (Option C: Stratified Validation)
    - LSTM sequence creation (24-hour windows)
    - Saves prepared data to S3: `training_data/{customer_id}/`
    - Triggers SageMaker training job via boto3
    - CloudWatch metrics: CustomersDiscovered, EligibleCustomers, DataPrepCompleted
    - Removed TensorFlow/Keras dependencies (now in SageMaker container)
  - **SageMaker Training Job** (`services/globalTrainingService/sagemaker/train.py`): GPU-accelerated LSTM training
    - Instance: ml.g4dn.2xlarge (NVIDIA T4 GPU, 8 vCPU, 32GB RAM)
    - Loads prepared sequences from S3
    - 3-layer LSTM architecture (256?256?128 units with dropout)
    - Customer validation optimization:
      - Training set: ALL other customers' data (learns global patterns)
      - Validation set: Target customer's data (optimization signal)
      - Early stopping monitors customer validation loss
    - Saves model artifacts to S3: `customer_tailored/{customer_id}/models/`
    - Updates model registry (`latest_model.json`) for forecastingApi access
    - CloudWatch metrics: TrainingLoss, ValidationLoss, EpochsCompleted
    - Docker container: TensorFlow 2.13 GPU + training script
  - **forecastingApi** (`services/forecastingApi/app.py`): Inference service (unchanged)
    - Loads customer-optimized models from S3 registry
    - Model caching for reduced cold starts
    - Returns forecasts with model metadata
  - **Deployment Scripts**:
    - `scripts/18-create-sagemaker-iam-role.sh`: Creates SageMakerTrainingRole
    - `scripts/19-build-sagemaker-training-image.sh`: Builds and pushes training container to ECR
  - **IAM Updates**: Added SageMaker permissions to globalTrainingService Lambda role
  - **CI/CD**: GitHub Actions workflow updated to build SageMaker training container
- **Multi-Tenant UI Implementation**: Complete integration of DynamoDB data with admin panel UI
  - **DataService Enhancements** (`ui/data-service.js`): Added comprehensive OODA data methods
    - `getDetections()`, `getDiagnostics()`, `getIssues()` methods for OODA workflow data
    - Client-side caching system for all data types with `fetchAllApiData()`
    - Proper error handling and fallback to demo data when API unavailable
    - Multi-tenant data isolation with `customer_id` parameter in all API calls
  - **OODA Workflow Backend** (`services/terminalApi/app.py`): New API endpoints for OODA data
    - `/terminal/detect` - Fault detection data retrieval
    - `/terminal/diagnose` - AI diagnostics data retrieval  
    - `/terminal/issues` - Component issues management with full CRUD operations
    - Multi-tenant DynamoDB queries with proper customer isolation
    - Decimal serialization support for financial data
  - **DynamoDB OODA Tables**: New multi-tenant tables for OODA workflow
    - `ona-platform-terminal-detections` - Fault detection data
    - `ona-platform-terminal-diagnostics` - AI diagnostic results
    - `ona-platform-terminal-issues` - Component issues with failure probabilities
    - All tables use `customer_id` as partition key for multi-tenant isolation
  - **Test Data Population** (`scripts/populate-ooda-data.py`): Sample data for testing
    - 5 component issues for `demo-customer` with realistic failure probabilities
    - Proper EAR impact calculations and time window specifications
    - Multi-tenant data structure following DynamoDB schema
- **UI Data Integration Fixes**: Resolved critical data display issues
  - **Property Name Mapping**: Fixed API response property mismatches (`ear_impact` vs `earImpact`)
  - **Data Type Handling**: Added proper string-to-number conversion for financial data
  - **Null Safety**: Added comprehensive null checks for optional data fields
  - **Asynchronous Data Loading**: Fixed Promise handling in UI data refresh cycles
  - **Caching Logic**: Corrected data caching in `DataService.fetchAllApiData()`
- **Currency Localization System** (`ui/currency-service.js`): Real-time currency conversion for UI displays
  - Vanilla JavaScript module matching existing codebase patterns
  - Real-time USD to ZAR exchange rates via exchangerate-api.com (hourly updates)
  - Currency selector in admin panel settings
  - localStorage persistence of user currency preference
  - Custom events for currency rate updates and currency changes
  - Fallback to default rates when API unavailable
  - Comprehensive currency formatting with proper symbols ($ for USD, R for ZAR)
  - 20+ currency display locations updated in admin-gpu-panel.js:
    - EAR calculations (material cost, downtime cost, total cost)
    - Maintenance plan approval dialogs and details
    - Issue impact displays (totalEAR, earImpact)
    - BOM review and catalog prices
    - Export and plan creation summaries
  - Helper functions for refreshing all currency displays on change
  - Auto-initialization with DOMContentLoaded event
- **Terminal Deployment Orchestrator** (`deploy-terminal.sh`): Comprehensive deployment script for terminal infrastructure
  - Written from scratch following shell scripting best practices with proper error handling
  - Parallel execution of deployment scripts with PID tracking for 25% faster deployment (~20 min vs ~25 min sequential)
  - Trap handlers for ERR and EXIT signals to capture all failure scenarios
  - Explicit error logging at each failure point with line numbers and exit codes
  - Pre-flight checks for AWS CLI, Docker, credentials, and platform prerequisites
  - Deploys 26 SSM parameters, 8 DynamoDB tables, 4 ECR repositories, and 7 S3 prefixes
  - Generates deployment summary with API endpoints and next steps
- **Developer Guide** (`docs/DEVELOPER_GUIDE.md`): A new comprehensive guide for developers, including development setup, code structure, testing guidelines, contribution process, and coding guidelines.
- **Coding Guidelines** (integrated into `docs/DEVELOPER_GUIDE.md`): Detailed AI coding guidelines for the Ona Platform, emphasizing core principles, pre-code checklist, human decision gate, code quality standards, deployment protocol, anti-patterns, and success metrics.
- **Component-Specific READMEs**: New READMEs added for `lib/`, `dns-setup/`, `scripts/`, `tests/`, and `ui/` directories, providing specific documentation for each component.

### Changed
- **Admin Panel UI** (`ui/admin-gpu-panel.js`): Complete multi-tenant data integration
  - **Customer Switching**: Dynamic customer dropdown with real-time data refresh
  - **Dashboard Metrics**: All cards now display live DynamoDB data instead of hardcoded values
    - Total Inverters, Active Inverters, Average Utilization, Active Plans
    - Component Issues metrics (Total, Critical, High Risk, Total EAR)
  - **Issues Management**: Full OODA workflow integration
    - Issues table displays live data from DynamoDB with proper formatting
    - Failure probability percentages with null safety and string conversion
    - EAR impact calculations with currency formatting
    - Real-time data refresh on customer switching
  - **Data Service Integration**: All UI functions now use `DataService` methods
    - Replaced hardcoded data with `DataService.getIssues()`, `getDetections()`, etc.
    - Consistent error handling and loading states
    - Proper async/await patterns for data loading
- **API Gateway Configuration**: Enhanced for OODA endpoints
  - Added `/terminal/issues` endpoint with POST and OPTIONS methods
  - Configured CORS headers for all OODA endpoints
  - Added Lambda invocation permissions for new endpoints
  - Deployed API Gateway changes to production
- **Lambda Function Updates**: Enhanced terminal API with OODA capabilities
  - Updated Lambda environment variables for OODA table access
  - Added IAM permissions for DynamoDB queries on OODA tables
  - Deployed latest container image with OODA endpoint implementations
- **Documentation** (`docs/SYSTEM ADMIN.md`, `docs/USER GUIDE.md`): Fixed deployment instructions
  - Removed references to non-existent `local-deploy.sh` script
  - Clarified two-script deployment architecture (`deploy-all.sh` + `deploy-terminal.sh`)
  - Updated deployment commands to reference actual validation scripts
  - Removed references to non-existent `validate.sh` and `rollback.sh`
  - Corrected manual deployment steps to use `deploy-terminal.sh` instead of individual terminal scripts
- **Platform Deployment Orchestrator** (`deploy-all.sh`): Refactored following shell scripting best practices
  - Rewritten from scratch with comprehensive error handling and trap handlers
  - Parallel execution of infrastructure scripts (02-06) with PID tracking for faster deployment
  - Trap handlers for ERR and EXIT signals to capture all failure scenarios
  - Explicit error logging at each failure point with line numbers and exit codes
  - Analyzed script dependencies to safely parallelize independent infrastructure setup
  - Pre-flight checks for AWS CLI, jq, Docker, credentials, and environment variables
  - Improved deployment summary with detailed resource counts and next steps
- **Terminal Deployment Orchestrator** (`deploy-terminal.sh`): Removed unused DEPLOYMENT_FAILED variable
  - Cleaned up dead code flagged by shellcheck SC2034
  - Exit code already provides success/failure indication
- **Main `README.md`**: Refactored based on the Di?taxis framework to serve as a high-level "Explanation" and central entry point.
  - Simplified "Getting Started" section with a link to the `User Guide`.
  - Removed detailed "Core Services", "Deployment Options", and "Troubleshooting" sections.
  - Updated "Resources & Support" section with links to new documentation and removed redundant content.
  - Removed "Contributing & Development" section, which was moved to `docs/DEVELOPER_GUIDE.md`.
- **`USER GUIDE.md`**: Updated to accurately reflect the capabilities of the code, removing misleading "not yet implemented" or "placeholder" statements for OODA workflow and forecasting services.
  - Corrected descriptions for OODA workflow and forecasting services to reflect their deployed status and current functional state.
  - Removed strikethrough from "Step 7: Configure Operations & Maintenance" and its sub-sections.
- **Shell Safety Checker** (`scripts/shell-safety-checker.sh`): Enhanced with multiple improvements
  - Integrated shellcheck for comprehensive static analysis (warnings and errors)
  - Detects `set -e` + background jobs pattern that causes silent failures
  - Recognizes both indexed array (`pids+=($!)`) and associative array (`pids["$key"]=$!`) PID tracking patterns as safe
  - Expanded parallelization detection to include `bash`, `run_deployment_script`, and deployment functions
  - Added `source` to non-parallelizable command blocklist

### Fixed
- **UI Data Display Issues**: Resolved critical data presentation problems
  - **TypeError: allPlans.filter is not a function**: Fixed API response parsing in `DataService.fetchAllApiData()`
    - Corrected array extraction from API responses (`data.schedules` vs `data`)
    - Updated caching logic to store arrays instead of response objects
  - **TypeError: Cannot read properties of undefined (reading '24h')**: Fixed failure probability display
    - Added null checks for `failureProbability` object
    - Added `parseFloat()` conversion for string values from API
    - Provided fallback values for missing properties
  - **Property Name Mismatches**: Fixed API response property mapping
    - Changed `earImpact` to `ear_impact` to match API response structure
    - Updated all UI references to use correct property names
  - **Data Caching Bug**: Fixed issues data not being cached properly
    - Corrected `getApiIssues()` promise handling in `fetchAllApiData()`
    - Removed redundant data extraction that was causing empty arrays
  - **Asynchronous Data Loading**: Fixed Promise handling in UI functions
    - Made `loadIssues()` async with proper `await` for `DataService.getIssues()`
    - Updated `dataRefreshed` event listener to handle async data loading
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
- **Separated terminal configuration** from platform config (config/environment.sh ? config/terminal-environment.sh)
  - Removed terminal tables, services array, and helper functions from main config
  - Updated 5 scripts to source terminal config: 03, 05, 08, 10, 17
  - Clean separation of concerns for maintainability
- **Optimized IAM role creation** with parallel processing (70% faster: 35-56s ? 10-15s)
- **Optimized Lambda deployment** with parallel updates (75% faster: 7 minutes ? 1.5 minutes)
- **Optimized API Gateway** endpoint creation with parallel execution (70% faster: 30-50s ? 8-12s)
- Reduced redundant Lambda wait operations (6 waits ? 4 waits per function)
- Updated MLflow to version 3.4.0 (from 2.6.0)
- Fixed IAM policy variable expansion (removed redundant string substitution in lines 169-175)
- Improved API Gateway idempotency for nested terminal endpoints

### Fixed
- DynamoDB Decimal serialization in Terminal API (added DecimalEncoder class)
- API Gateway method creation now properly checks for existing methods
- CloudWatch logging and error handling improvements
- ECR login handling when Docker is not available (graceful fallback)

### Performance
- **Total deployment time reduced by 77%** (8-9 minutes ? 1.8-2 minutes)
  - IAM creation: 35-56s ? 10-15s (70% improvement)
  - Lambda deployment: 420s (7m) ? 90s (1.5m) (75% improvement)
  - API Gateway setup: 30-50s ? 8-12s (70% improvement)

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
=======
---
title: "Changelog"
layout: default
nav_order: 11
---

# Changelog

All notable changes to the Ona Terminal platform are documented in this file.

## [1.6.0] - 2025-08-04

### Added
- **Production Verification**: Complete production deployment verification
- **15 Lambda Functions**: All core services deployed in af-south-1
- **7 API Gateway Endpoints**: Full API infrastructure operational
- **11 S3 Buckets**: Complete data storage infrastructure
- **Auth0 Integration**: User authentication system operational
- **Weather Services**: 4 weather-related Lambda functions
- **PDF Processing**: Document processing capabilities
- **Logging Proxy**: Centralized logging system
- **Documentation Updates**: Enhanced documentation with consistent styling and navigation

### Changed
- **Test Coverage**: Improved from 0% to 23% coverage
- **API Documentation**: Comprehensive API reference documentation
- **Deployment Guides**: Complete deployment documentation
- **CLI Tools**: Enhanced command-line interface
- **UI/UX**: Updated SVG images and card layouts for better user experience

### Fixed
- **API Gateway Integration**: All endpoints properly configured
- **Lambda Function Deployment**: All functions operational
- **S3 Bucket Configuration**: Proper bucket policies and access
- **DynamoDB Tables**: API key management operational
- **Documentation Consistency**: Fixed footer consistency across all pages

### Known Issues
- **SageMaker Endpoints**: 8 endpoints failed - ML inference broken
- **Security Issues**: 950+ wildcard imports, 14 dependency vulnerabilities
- **Test Coverage**: Only 23% with critical gaps
- **generateForecast**: Core module exists but not deployed

## [1.5.0] - 2025-07-29

### Added
- **Agentic Workflows**: Showcasing agentic use of Ona power tools
- **Discord Integration**: Community buttons across all documentation pages
- **Enhanced Navigation**: Re-architected documentation flow
- **Automated Testing**: Test criteria for new issues

### Changed
- **Documentation Architecture**: Improved documentation structure and flow
- **Community Features**: Enhanced Discord community integration
- **Styling**: Updated styling for better user experience

### Fixed
- **Documentation Consistency**: Improved footer and styling consistency
- **Navigation**: Fixed navigation bar and legal docs section

## [1.4.0] - 2025-04-14

### Added
- **Legal Documentation**: Added legal docs section
- **Enhanced Navigation**: Updated navigation bar
- **Improved Styling**: Enhanced CSS styling

### Changed
- **Documentation Structure**: Updated index and navigation structure
- **UI Improvements**: Enhanced styling and layout

### Fixed
- **Navigation Issues**: Fixed navigation bar functionality
- **Styling Consistency**: Improved CSS consistency

## [1.3.0] - 2024-10-25

### Added
- **Initial Documentation**: Created main.md and README.md
- **Jekyll Configuration**: Set up _config.yml for GitHub Pages
- **Basic Structure**: Established basic documentation structure

### Changed
- **Documentation Setup**: Initial documentation framework
- **Configuration**: Basic Jekyll configuration

### Fixed
- **Initial Setup**: Basic documentation structure and configuration

## [1.2.0] - 2024-10-24

### Added
- **Repository Creation**: Initial repository setup
- **Basic Documentation**: First documentation files

### Changed
- **Project Foundation**: Initial project setup

### Fixed
- **Basic Setup**: Repository and documentation foundation

## [1.1.0] - 2024-10-24

### Added
- **Initial Release**: First repository commit
- **Core Documentation**: Basic documentation structure

### Changed
- **Platform Foundation**: Initial platform setup

### Fixed
- **Core Functionality**: Basic documentation functionality

## [1.0.0] - 2024-10-24

### Added
- **Initial Release**: First production release
- **Core Infrastructure**: Basic documentation infrastructure
- **Documentation Framework**: Initial documentation framework
- **GitHub Pages**: Basic GitHub Pages setup

### Changed
- **Platform Foundation**: Initial platform setup
- **Development Process**: Basic development workflow
- **Documentation**: Basic documentation structure

### Fixed
- **Core Functionality**: Basic platform functionality
- **Infrastructure**: Initial infrastructure setup
- **Documentation**: Basic documentation structure

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/asobacloud/terminal/tags).

## Release Types

- **Major Releases** (X.0.0): Breaking changes, major new features
- **Minor Releases** (X.Y.0): New features, backward compatible
- **Patch Releases** (X.Y.Z): Bug fixes, backward compatible

## Release Schedule

- **Major Releases**: Quarterly (every 3 months)
- **Minor Releases**: Monthly (every 4 weeks)
- **Patch Releases**: As needed (bug fixes and security updates)

## Support

- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **API Reference**: [Complete API documentation](api-reference.md)
- 🔗 **Integration Guide**: [SDK and webhook integration](integration.md)
>>>>>>> c5c5964585382e05b87c6f6f17f1d1e945d4e1d7
