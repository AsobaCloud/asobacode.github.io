---
title: "User Onboarding Guide"
layout: default
nav_order: 1
---

# Ona AI-Driven O&M Client Onboarding Guide

This guide outlines the onboarding process for implementing Asoba's AI-powered Operations & Maintenance (O&M) solution for solar energy assets. The process is structured into parallel workstreams—Client, Sales, and Technical—to ensure alignment throughout Proof of Concept (PoC) activation and readiness for full commercial deployment.

---

## 1. Overview
{: #1-overview }

The Ona AI-Driven O&M platform transforms solar asset operations through real-time anomaly detection, predictive maintenance, and intelligent fault classification. The onboarding process follows a structured workflow from initial engagement through full commercial deployment, with clear roles and responsibilities for each phase.

### Value Proposition

- **Faster Claims Processing**: Reduce revenue loss through accelerated incident identification and resolution
- **Proactive Maintenance**: Shift from reactive cost centers to predictive profit optimization
- **Unified Data Infrastructure**: Eliminate manual ETL and gain cross-asset visibility
- **AI-Powered Insights**: Achieve 7% SMAPE forecasting accuracy and sub-10-minute anomaly detection

---

## 2. Onboarding Workflow
{: #2-onboarding-workflow }

<div class="quickstart-paths">
  <div class="path-card">
    <h3>🚀 Phase 1: Kickoff</h3>
    <p><strong>Owner:</strong> Client | <strong>Duration:</strong> Week 1</p>
    <p>Initial engagement and project initiation sync covering O&M AI model capabilities, stakeholder roles, PoC objectives, and success criteria.</p>
    <p><strong>Deliverables:</strong> Signed onboarding agreement, project kickoff deck, stakeholder contact matrix</p>
  </div>
  
  <div class="path-card">
    <h3>📊 Phase 2: Define PoC KPIs</h3>
    <p><strong>Owner:</strong> Client | <strong>Duration:</strong> Week 1</p>
    <p>Agreement on measurable success criteria including uptime improvement targets, fault prediction accuracy thresholds, cost savings metrics, and revenue optimization goals.</p>
    <p><strong>Example KPIs:</strong> Reduce MTTR by 30%, achieve >90% anomaly detection accuracy, increase EAR by 5%, reduce O&M costs by 15-25%</p>
  </div>
  
  <div class="path-card">
    <h3>🔒 Phase 3: Data Governance Assessment</h3>
    <p><strong>Owner:</strong> Asoba Sales | <strong>Duration:</strong> Week 1-2</p>
    <p>Evaluation of client data infrastructure including data source inventory (SCADA, EMS, OEM portals), data retrieval protocols, security requirements, and historical data availability.</p>
    <p><strong>Required:</strong> SCADA/EMS vendor details, polling intervals, network architecture, firewall rules, data retention policies</p>
  </div>
  
  <div class="path-card">
    <h3>🔑 Phase 4: Data Access Setup</h3>
    <p><strong>Owner:</strong> Client & Asoba Sales | <strong>Duration:</strong> Week 2-3</p>
    <p>Establishment of secure data authentication and authorization including read-only API keys, admin credentials, VPN setup, and IP whitelisting.</p>
    <p><strong>Supported Sources:</strong> SolarEdge, Enphase, Lux, Solarman, Huawei, SMA, Fronius, Macrocomm, Switch Energy, Utility API</p>
  </div>
  
  <div class="path-card">
    <h3>📋 Phase 5: Data Mapping & Inventory</h3>
    <p><strong>Owner:</strong> Asoba Technical | <strong>Duration:</strong> Week 3-4</p>
    <p>Cataloging of data sources for schema mapping and storage. Minimum data package includes SCADA tags, inverter credentials, site layout, weather data, as-built documentation, and 12+ months historical performance data.</p>
    <p><strong>Quality Requirements:</strong> 60-minute intervals max, >80% completeness, UTC timestamps, sub-minute processing capability</p>
  </div>
  
  <div class="path-card">
    <h3>🔌 Phase 6: API Integration</h3>
    <p><strong>Owner:</strong> Asoba Technical | <strong>Duration:</strong> Week 4-5</p>
    <p>Configuration of API gateway for data ingestion and processing. Includes client account setup, customer creation, device registration, API key generation, and real-time/batch data feed configuration.</p>
    <p><strong>Integration Methods:</strong> Real-time POST to /upload_nowcast endpoint or batch S3 uploads for historical data</p>
  </div>
  
  <div class="path-card">
    <h3>⚙️ Phase 7: MVP Infrastructure Setup</h3>
    <p><strong>Owner:</strong> Asoba Technical | <strong>Duration:</strong> Week 5-6</p>
    <p>Configuration of processed data pipelines for model transmission and dashboard integration. Includes automated weather integration (Visual Crossing API, 15-minute cache) and asset registry setup with component details.</p>
    <p><strong>Components:</strong> Weather cache service, asset registry, data pipeline configuration</p>
  </div>
  
  <div class="path-card">
    <h3>🤖 Phase 8: Model Activation & Testing</h3>
    <p><strong>Owner:</strong> Asoba Technical | <strong>Duration:</strong> Week 6-8</p>
    <p>Deployment and validation of O&M AI model. Training requires 12+ months historical data (36 months preferred), completes in 24-48 hours with email notification.</p>
    <p><strong>Performance Targets:</strong> Forecasting SMAPE <7%, R² >0.92, Interpolation MAPE <8%, Anomaly detection <10 minutes</p>
  </div>
  
  <div class="path-card">
    <h3>📈 Phase 9: Performance Monitoring</h3>
    <p><strong>Owner:</strong> Asoba Technical | <strong>Duration:</strong> Week 8-12 (Continuous)</p>
    <p>Continuous tracking and analysis before full commercial deployment. Monitors model accuracy, latency, throughput, false positive/negative rates, system uptime, and data pipeline health.</p>
    <p><strong>Configuration:</strong> SNS alert subscriptions, detection threshold parameters, automated monitoring dashboards</p>
  </div>
  
  <div class="path-card">
    <h3>🎯 Phase 10: Performance Calibration</h3>
    <p><strong>Owner:</strong> Asoba Technical | <strong>Duration:</strong> Week 8-12</p>
    <p>Continuous fine-tuning to reach target performance KPIs through weekly performance reports, threshold adjustments, model retraining with production data, and feature engineering optimization.</p>
    <p><strong>Activities:</strong> Weekly reports, false positive rate analysis, production data integration, feature optimization</p>
  </div>
  
  <div class="path-card">
    <h3>✅ Phase 11: Full Commercial Agreement</h3>
    <p><strong>Owner:</strong> Client | <strong>Duration:</strong> Week 13+</p>
    <p>Contract finalization and transition to Tier 1 technical support. Includes ROI analysis and performance validation, commercial pricing finalization, SLA establishment, operations team training, and handoff to production support.</p>
    <p><strong>Outcomes:</strong> Signed commercial agreement, SLA documentation, trained operations team, production support handoff</p>
  </div>
</div>

---

## 3. Site Information Requirements
{: #3-site-information-requirements }

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
{: #4-expected-success-metrics }

Define KPIs to determine value and feasibility for transition to full commercial deployment:

1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

**Target Completion**: Week 13 (90 days from kickoff)

---

## 5. Implementation Timeline Summary
{: #5-implementation-timeline-summary }

| Phase | Duration | Key Milestones |
|-------|----------|----------------|
| **Weeks 1-2: Integration** | 2 weeks | SCADA connections, data pipeline setup, team training |
| **Weeks 3-12: Optimization** | 10 weeks | Real-time monitoring, AI model training, weekly reporting |
| **Week 13: Results** | 1 week | ROI validation, scale-up planning |

---

## 6. Technical Support
{: #6-technical-support }

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
{: #7-data-governance--security }

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
