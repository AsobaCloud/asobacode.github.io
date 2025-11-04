---
title: "User Guide"
layout: default
nav_order: 1
---

# Customer Onboarding Guide: Ona Platform

This guide walks you through the essential steps to get your Ona Platform up and running with minimum viable usage. Follow these steps to configure all necessary components and start generating insights from your solar assets.

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] **AWS Account** with appropriate permissions
- [ ] **Domain Control** (e.g., api.yourcompany.com)
- [ ] **SCADA/Inverter Access** or data export capabilities
- [ ] **Visual Crossing API Key** for weather data
- [ ] **Asset Inventory** (inverter models, locations, capacities)
- [ ] **Historical Data** (at least 30 days of sensor data)

## Step 1: Initial Platform Setup

### 1.1 Deploy Core Infrastructure

```bash
# Clone the platform repository
git clone <repository-url>
cd ona-platform

# Configure your environment
cp config/environment.sh.example config/environment.sh
# Edit config/environment.sh with your specific settings:
# - AWS_REGION
# - API_DOMAIN (e.g., api.yourcompany.com)
# - INPUT_BUCKET and OUTPUT_BUCKET names
```

### 1.2 Set Up DNS Infrastructure (One-time)

```bash
# Run DNS setup (this may take 10-30 minutes)
cd dns-setup
./setup-dns-infrastructure.sh

# Verify certificate is ready
./check-certificate-status.sh
```

### 1.3 Manual Deployment

If you prefer to deploy manually:

```bash
# 1. Deploy core platform services
./deploy-all.sh

# 2. Deploy terminal/O&M services
./deploy-terminal.sh
```

**Note on Configuration**: The platform uses two environment files:
- `config/environment.sh`: Core platform configuration
- `config/terminal-environment.sh`: Terminal/O&M services configuration

**Note on Performance**: Deployment has been optimized with parallel execution:
- **Platform deployment**: 2-3 minutes (down from 8-9 minutes)
- **Terminal deployment**: ~20 minutes
- IAM role creation: 10-15 seconds (70% faster)
- Lambda deployment: 1.5 minutes (75% faster)
- API Gateway setup: 8-12 seconds (70% faster)

All deployment scripts are idempotent and can be safely re-run.

**Validation**: Both scripts include built-in validation. For manual validation:
```bash
# Validate platform deployment
./scripts/12-validate-deployment.sh

# Validate terminal deployment
./scripts/23-validate-terminal-deployment.sh
```

## Step 2: Configure Your Assets

### 2.1 Create Asset Inventory

Create your asset configuration file:

```json
{
  "assets": [
    {
      "id": "INV-001",
      "name": "Main Inverter 1",
      "type": "Solar Inverter",
      "capacity_kw": 20.0,
      "location": {
        "latitude": -26.2041,
        "longitude": 28.0473,
        "address": "Your Solar Farm, City"
      },
      "components": [
        {
          "oem": "Sungrow",
          "model": "SG20KTL",
          "serial": "SN123456",
          "type": "inverter",
          "installation_date": "2024-01-15T00:00:00Z"
        }
      ]
    }
  ]
}
```

### 2.2 Upload Asset Configuration

```bash
# Upload asset configuration
aws s3 cp assets.json s3://your-input-bucket/assets.json
```

## Step 3: Configure Data Sources

### 3.1 Set Up Weather API

```bash
# Configure Visual Crossing API key
aws ssm put-parameter \
  --name /ona-platform/prod/visual-crossing-api-key \
  --value "YOUR_VISUAL_CROSSING_API_KEY" \
  --type SecureString \
  --overwrite
```

### 3.2 Configure Data Integration

Choose your integration method:

**Option A: Direct Data Feed (Recommended)**
```bash
# Configure your SCADA system to send data to:
# POST https://api.asoba.co/upload_nowcast
# Or use direct API Gateway URL: https://u9xpolnr5m.execute-api.af-south-1.amazonaws.com/prod/upload_nowcast
```

**Option B: File Upload**
```bash
# Upload historical data for model training
# Note: This uploads data directly to S3. The dataIngestion service is currently a placeholder.
# Data should be uploaded directly to S3 bucket: sa-api-client-input/historical/
aws s3 cp your_sensor_data.csv s3://sa-api-client-input/historical/customer_id/site_id/
```

## Step 4: Upload Historical Data

### 4.1 Prepare Your Data

Format your sensor data as CSV:

```csv
timestamp,asset_id,temperature_c,voltage_v,power_kw
2024-01-01T08:00:00Z,INV-001,45.2,800.5,18.3
2024-01-01T08:15:00Z,INV-001,46.1,799.8,17.9
2024-01-01T08:30:00Z,INV-001,47.3,801.2,19.1
```

### 4.2 Upload Training Data

```bash
# The dataIngestion service is currently a placeholder with no processing logic.
# Upload your CSV file directly to S3:
aws s3 cp your_sensor_data.csv s3://sa-api-client-input/historical/customer_id/site_id/historical_data.csv

# This will trigger downstream processing via S3 event to interpolationService and globalTrainingService
```

## Step 5: Configure Monitoring Thresholds

**Note:** The OODA (Observe-Orient-Decide-Act) workflow components are deployed and can be interacted with using the following commands. These commands allow you to configure and test the initial setup of the OODA workflow.

### 5.1 Set Detection Parameters

```bash
# Configure detection sensitivity
aws ssm put-parameter \
  --name /ona-platform/prod/detection-threshold \
  --value "0.7" \
  --type String \
  --overwrite

# Configure loss function weights
aws ssm put-parameter \
  --name /ona-platform/prod/loss-function-weights \
  --value '{"w_energy": 1.0, "w_cost": 0.3, "w_mttr": 0.2}' \
  --type String \
  --overwrite
```

### 5.2 Set Up Alerting

```bash
# Configure email notifications
aws sns subscribe \
  --topic-arn arn:aws:sns:af-south-1:ACCOUNT:ona-platform-alerts \
  --protocol email \
  --notification-endpoint "ops@yourcompany.com"
```

## Step 6: Test Your Setup

### 6.1 Generate Your First Forecast

**Note:** The `forecastingApi` service is currently a placeholder and will not generate a real forecast.

```bash
# Test forecast generation
curl "https://api.asoba.co/forecast?customer_id=your-company&site_id=your-site"
```

### 6.2 Verify Data Processing

```bash
# Check if data is being processed
aws logs tail /aws/lambda/ona-interpolationService-prod --follow

# Check weather cache updates
aws logs tail /aws/lambda/ona-weatherCache-prod --follow
```

### 6.3 Test Terminal API (O&M Workflows)

**Add an Asset**:
```bash
curl -X POST https://api.asoba.co/terminal/assets \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add",
    "asset_id": "INV-001",
    "name": "Main Inverter 1",
    "type": "Solar Inverter",
    "capacity_kw": 20.0,
    "location": "Cape Town",
    "components": [
      {
        "oem": "Sungrow",
        "model": "SG20KTL",
        "serial": "SN123456"
      }
    ]
  }'
```

**List All Assets**:
```bash
curl -X POST https://api.asoba.co/terminal/assets \
  -H "Content-Type: application/json" \
  -d '{"action": "list"}'
```

**Run Fault Detection**:
```bash
curl -X POST https://api.asoba.co/terminal/detect \
  -H "Content-Type: application/json" \
  -d '{"action": "run", "asset_id": "INV-001"}'
```

**Create Maintenance Schedule**:
```bash
curl -X POST https://api.asoba.co/terminal/schedule \
  -H "Content-Type: application/json" \
  -d '{"action": "create", "asset_id": "INV-001"}'
```

**Build Bill of Materials**:
```bash
curl -X POST https://api.asoba.co/terminal/bom \
  -H "Content-Type: application/json" \
  -d '{"action": "build", "asset_id": "INV-001"}'
```

**Create Work Order**:
```bash
curl -X POST https://api.asoba.co/terminal/order \
  -H "Content-Type: application/json" \
  -d '{"action": "create", "asset_id": "INV-001"}'
```

**Track Job Status**:
```bash
curl -X POST https://api.asoba.co/terminal/track \
  -H "Content-Type: application/json" \
  -d '{"action": "subscribe", "job_id": "job-001"}'
```

## Step 7: Configure Operations & Maintenance

**Note:** This section describes how to configure and interact with the deployed OODA workflow components.

### 7.1 Set Up OODA Workflow

```bash
# Configure fault categories
# cat > configs/oodalike.yaml << EOF
# Weather Damage:
#   - hail_impact
#   - wind_stress
# 
# OEM Fault:
#   - inverter_overtemp
#   - dc_bus_fault
# 
# Ops Fault:
#   - wrong_setpoint
#   - maintenance_overdue
# EOF
# 
# # Configure crew information
# cat > configs/ooda/loss_function.yaml << EOF
# weights:
#   w_energy: 1.0
#   w_cost: 0.3
#   w_mttr: 0.2
# 
# crew:
#   crews_available: 2
#   hours_per_day: 8
# EOF
```

### 7.2 Test O&M Workflow

```bash
# Test fault detection
# curl -X POST https://api.yourcompany.com/detect \
#   -H "Content-Type: application/json" \
#   -d '{"asset_id": "INV-001", "severity_threshold": 0.7}'
# 
# # Test diagnostics
# curl -X POST https://api.yourcompany.com/diagnose \
#   -H "Content-Type: application/json" \
#   -d '{"asset_id": "INV-001"}'
```

## Step 8: Go Live Checklist

Before going live, verify:

- [ ] **API Endpoints** responding correctly
- [ ] **Weather Data** being cached every 15 minutes
- [ ] **Historical Data** processed
- [ ] **Real-time Data** flowing from SCADA/inverters
- [ ] **Alerts** configured and tested

## Step 9: Ongoing Operations

### 9.1 Daily Monitoring

```bash
# Morning health check
./scripts/daily_health_check.sh

# Performance review
./scripts/performance_review.sh
```

### 9.2 Weekly Tasks

```bash
# Generate weekly reports
./scripts/weekly_report.sh

# Review and adjust thresholds
aws ssm get-parameter --name /ona-platform/prod/detection-threshold
```

## Troubleshooting Common Issues

### Issue: No Forecasts Generated
**Solution**: While the `forecastingApi` and `globalTrainingService` are deployed, they currently do not generate real forecasts as models are not yet being trained or used. This functionality is under active development.
```bash
aws s3 ls s3://your-output-bucket/models/
```

### Issue: Weather Data Not Updating
**Solution**: Verify Visual Crossing API key
```bash
aws ssm get-parameter --name /ona-platform/prod/visual-crossing-api-key --with-decryption
```

### Issue: High False Positive Rate
**Solution**: The detection logic is deployed and can be interacted with. If you are experiencing a high false positive rate, the current implementation may not yet provide refined detection capabilities. This functionality is under active development.
```bash
# Adjust detection threshold (for future use)
# aws ssm put-parameter \
#   --name /ona-platform/prod/detection-threshold \
#   --value "0.8" \
#   --type String \
#   --overwrite
```

## Support and Resources

- **Technical Support**: support@asoba.co
- **Documentation**: [README.md](README.md) for system overview
- **Operations Guide**: [O&M.md](O&M.md) for daily operations
- **System Admin Guide**: [SYSTEM ADMIN.md](SYSTEM%20ADMIN.md) for technical administration

## Next Steps

Once your platform is deployed, you can continue to integrate your data sources and customize the configuration to meet your specific needs. The data collection happens through direct S3 uploads, with `forecastingApi`, `globalTrainingService`, and OODA workflow components deployed and available for interaction. The `dataIngestion` service is currently a placeholder with no active processing logic.

1. **Integrate** with your data sources.
2. **Customize** the configuration to meet your specific needs.
3. **Explore** the capabilities of the `forecastingApi` and OODA workflow components.
