---
title: "User Onboarding Guide"
layout: default
nav_order: 1
---

# Ona AI-Driven O&M Client Onboarding Guide

This guide outlines the onboarding process for implementing Asoba's AI-powered Operations & Maintenance (O&M) solution for solar energy assets. The process is structured into parallel workstreams—Client, Sales, and Technical—to ensure alignment throughout Proof of Concept (PoC) activation and readiness for full commercial deployment.

---

## 1. Overview

The Ona AI-Driven O&M platform transforms solar asset operations through real-time anomaly detection, predictive maintenance, and intelligent fault classification. The onboarding process follows a structured workflow from initial engagement through full commercial deployment, with clear roles and responsibilities for each phase.

### Value Proposition

- **Faster Claims Processing**: Reduce revenue loss through accelerated incident identification and resolution
- **Proactive Maintenance**: Shift from reactive cost centers to predictive profit optimization
- **Unified Data Infrastructure**: Eliminate manual ETL and gain cross-asset visibility
- **AI-Powered Insights**: Achieve 7% SMAPE forecasting accuracy and sub-10-minute anomaly detection

---

## 2. Onboarding Workflow

### Phase 1: Kickoff
**Owner**: Client  
**Duration**: Week 1

Initial engagement and project initiation sync covering:
- Description of O&M AI model capabilities
- Stakeholder roles and responsibilities
- PoC objectives and timeline
- Success criteria definition

**Deliverables**:
- Signed onboarding agreement
- Project kickoff deck
- Stakeholder contact matrix

---

### Phase 2: Define PoC KPIs
**Owner**: Client  
**Duration**: Week 1

Agreement on measurable success criteria:
- Uptime improvement targets (%)
- Fault prediction accuracy thresholds
- Guaranteed cost savings metrics
- Revenue optimization goals

**Example KPIs**:
- Reduce Mean Time To Repair (MTTR) by 30%
- Achieve >90% anomaly detection accuracy
- Increase energy availability ratio (EAR) by 5%
- Reduce O&M costs by 15-25%

---

### Phase 3: Data Governance Assessment
**Owner**: Asoba Sales  
**Duration**: Week 1-2

Evaluation of client data infrastructure:
- Data source inventory (SCADA, EMS, OEM portals)
- Data retrieval protocols and access methods
- Data sharing governance and security requirements
- Historical data availability assessment

**Required Information**:
- SCADA/EMS vendor and version
- Data polling intervals and granularity
- Network architecture and firewall rules
- Data retention policies

---

### Phase 4: Data Access Setup
**Owner**: Client & Asoba Sales  
**Duration**: Week 2-3

Establishment of secure data authentication and authorization:

#### 4.1 Credentials Provisioning
- Read-only API keys for inverter clouds
- Admin panel credentials (where applicable)
- VPN or secure tunnel setup (if required)
- IP whitelisting for Asoba infrastructure

#### 4.2 Supported Data Sources

| Provider | Device Type | Integration Method |
|----------|-------------|-------------------|
| SolarEdge | Inverter | API, CSV export |
| Enphase | Inverter | Enlighten API |
| Lux | Inverter | Cloud API |
| Solarman | Inverter | Direct integration |
| Huawei | Inverter | FusionSolar API |
| SMA | Inverter | Sunny Portal |
| Fronius | Inverter | Solar.web API |
| Macrocomm | Smart Meter | Data logger |
| Switch Energy | Data Logger | CSV export |
| Utility API | Smart Meter | JSON/CSV |

---

### Phase 5: Data Mapping & Inventory
**Owner**: Asoba Technical  
**Duration**: Week 3-4

Cataloging of data sources for schema mapping and storage:

#### 5.1 Minimum Data Package

| Data Type | Description | Format | Requirement |
|-----------|-------------|--------|-------------|
| **SCADA/Historian Tags** | Four-quadrant data (kWh, kV, kVarch, PF) at max 60-min intervals | CSV, JSON, API | Required |
| **Inverter Credentials** | Read-only API keys or admin credentials | Secure strings | Required |
| **Site Layout** | Component bill of materials with locations | CAD, KML, PDF | Required |
| **Weather Data** | Historical and real-time weather (if >40km from municipal center) | CSV, API | Required |
| **As-Built Documentation** | Single-line diagram and BOQ | PDF, DWG | Required |
| **Maintenance Logs** | Incident and downtime records | Excel, CSV | Recommended |
| **Historical Performance** | Minimum 12 months (36 months preferred) | CSV, JSON | Required |

#### 5.2 Data Quality Requirements

- **Temporal Resolution**: Maximum 60-minute intervals (8,760+ rows per year)
- **Completeness**: >80% data availability for training period
- **Time Synchronization**: Timestamps in UTC or consistent timezone
- **Data Granularity**: Sub-minute processing capability available

---

### Phase 6: API Integration
**Owner**: Asoba Technical  
**Duration**: Week 4-5

Configuration of API gateway for data ingestion and processing:

#### 6.1 Client Account Setup

```bash
# Using Ona Power Tools SDK
from core.manageUsers.create_client import create_client
from core.manageUsers.create_customer import create_customer
from core.manageUsers.create_device import create_device
from core.manageUsers.create_api_key import create_api_key

# Create client organization
create_client(
    client_id=your_client_id,
    name="Your Solar Company",
    contact_email="admin@yourcompany.com"
)

# Create customer account
create_customer(
    client_id=your_client_id,
    contact_name="John Smith"
)

# Register device
create_device(
    customer_id="cust0001",
    device_type="inverter",
    serial_num="INV-001"
)

# Generate API key
api_key = create_api_key(
    region="af-south-1",
    environment="production",
    client_id=your_client_id
)
```

#### 6.2 Data Ingestion Setup

**Real-Time Data Feed** (Recommended):
```bash
# Configure SCADA to push to Ona ingestion endpoint
POST https://api.asoba.co/upload_nowcast
Headers:
  X-API-Key: {your_api_key}
  Content-Type: application/json

Body:
{
  "site_id": "site-001",
  "timestamp": "2025-01-15T08:00:00Z",
  "data": {
    "power_kw": 18.3,
    "voltage_v": 800.5,
    "temperature_c": 45.2
  }
}
```

**Batch Historical Upload**:
```bash
# Upload historical CSV data
aws s3 cp historical_data.csv \
  s3://ona-input-bucket/historical/{customer_id}/{site_id}/

# Or use API endpoint
curl -X POST https://api.asoba.co/upload_historical \
  -H "X-API-Key: {your_api_key}" \
  -F "file=@historical_data.csv"
```

---

### Phase 7: MVP Infrastructure Setup
**Owner**: Asoba Technical  
**Duration**: Week 5-6

Configuration of processed data pipelines for model transmission and dashboard integration:

#### 7.1 Weather Integration

```bash
# Visual Crossing API setup (handled by Asoba)
# Weather data automatically cached every 15 minutes
# No client action required
```

#### 7.2 Asset Registry

```json
{
  "assets": [
    {
      "id": "INV-001",
      "name": "Main Inverter Block A",
      "type": "Solar Inverter",
      "capacity_kw": 20.0,
      "location": {
        "latitude": -26.2041,
        "longitude": 28.0473,
        "site_name": "Your Solar Farm"
      },
      "components": [
        {
          "oem": "SolarEdge",
          "model": "SE20K",
          "serial": "SE123456",
          "type": "inverter",
          "installation_date": "2024-01-15T00:00:00Z"
        }
      ]
    }
  ]
}
```

---

### Phase 8: Model Activation & Testing
**Owner**: Asoba Technical  
**Duration**: Week 6-8

Deployment and validation of O&M AI model:

#### 8.1 Model Training

- Minimum 12 months historical data required
- 36 months preferred for highest accuracy
- Training typically completes within 24-48 hours
- Email notification upon completion

#### 8.2 Model Performance Targets

| Metric | Target | Use Case |
|--------|--------|----------|
| **Forecasting SMAPE** | <7% | Generation prediction |
| **Forecasting R²** | >0.92 | Model reliability |
| **Interpolation MAPE** | <8% | Gap filling |
| **Anomaly Detection Time** | <10 minutes | Real-time alerting |

#### 8.3 Testing Procedures

```bash
# Test forecasting API
curl "https://api.asoba.co/forecast?customer_id={id}&site_id={site}"

# Test fault detection
curl -X POST https://api.asoba.co/terminal/detect \
  -H "X-API-Key: {your_api_key}" \
  -d '{"action": "run", "asset_id": "INV-001"}'

# Verify data pipeline
aws logs tail /aws/lambda/ona-interpolationService-prod --follow
```

---

### Phase 9: Performance Monitoring
**Owner**: Asoba Technical  
**Duration**: Week 8-12 (Continuous)

Continuous tracking and analysis before full commercial deployment:

#### 9.1 Monitoring Metrics

- Model accuracy, latency, and throughput
- False positive/negative rates
- System uptime and API response times
- Data pipeline health

#### 9.2 Alerting Configuration

```bash
# Subscribe to anomaly alerts
aws sns subscribe \
  --topic-arn arn:aws:sns:af-south-1:ACCOUNT:ona-platform-alerts \
  --protocol email \
  --notification-endpoint "ops@yourcompany.com"

# Configure detection thresholds
aws ssm put-parameter \
  --name /ona-platform/prod/detection-threshold \
  --value "0.7" \
  --type String
```

---

### Phase 10: Performance Calibration
**Owner**: Asoba Technical  
**Duration**: Week 8-12

Continuous fine-tuning to reach target performance KPIs:

- Weekly performance reports
- Threshold adjustments based on false positive rates
- Model retraining with production data
- Feature engineering optimization

---

### Phase 11: Full Commercial Agreement
**Owner**: Client  
**Duration**: Week 13+

Contract finalization and transition to Tier 1 technical support:

- ROI analysis and performance validation
- Commercial pricing finalization
- Service Level Agreement (SLA) establishment
- Training for client operations team
- Handoff to production support

---

## 3. Site Information Requirements

For each site to be onboarded, provide:

### General Information
- **Site Owner/Operator Name**: ___________________
- **Point of Contact**:
  - Name: ___________________
  - Email: ___________________
  - Phone: ___________________
- **Site Name**: ___________________
- **GPS Coordinates/Address**: ___________________
- **Installed Capacity**: ___________ kW / MW

### Equipment Information
- **OEM Name**: □ Huawei □ SolarEdge □ SunGrow □ SMA Solar □ Other: _________
- **Site Monitoring Setup**: □ SCADA □ EMS □ OEM Portal □ Other: _________

### Data Access Authorization
List users and roles connected to this site:

| Name | Email | Role | Permissions |
|------|-------|------|-------------|
|      |       |      |             |

---

## 4. Expected Success Metrics

Define KPIs to determine value and feasibility for transition to full commercial deployment:

1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

**Target Completion**: Week 13 (90 days from kickoff)

---

## 5. Implementation Timeline Summary

| Phase | Duration | Key Milestones |
|-------|----------|----------------|
| **Weeks 1-2: Integration** | 2 weeks | SCADA connections, data pipeline setup, team training |
| **Weeks 3-12: Optimization** | 10 weeks | Real-time monitoring, AI model training, weekly reporting |
| **Week 13: Results** | 1 week | ROI validation, scale-up planning |

---

## 6. Technical Support

### During PoC
- **Technical Support**: support@asoba.co
- **Sales Contact**: Your designated account manager
- **Documentation**: https://docs.asoba.co

### Post-Commercial Deployment
- **Tier 1 Support**: 24/7 system monitoring
- **Escalation**: Direct technical engineering support
- **Regular Reviews**: Quarterly business reviews

---

## 7. Data Governance & Security

### Data Protection
- All data transmitted via TLS 1.3
- Data at rest encrypted with AES-256
- Read-only access to client systems
- SOC 2 Type II compliance (in progress)

### Performance Disclaimers
Given comprehensive and up-to-date data, Ona AI-Driven O&M identifies anomalies and recommends corrective actions to assist clients in meeting internal plant-availability and performance KPIs. Actual plant performance depends on:

- Client's operational execution
- Timely provision of required data feeds
- Prompt response to AI alerts
- Quality of field technician work

---

© 2025 Asoba Corporation. All rights reserved.
