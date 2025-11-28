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

<div class="roadmap-container">
  <div class="text-center mb-12">
    <p class="text-gray-600">Complete onboarding workflow from kickoff to commercial deployment</p>
  </div>

  <div class="pipeline-container">
    <div class="pipeline-row">
      <div class="pipeline-step roadmap-step">
        <div class="step-number">01</div>
        <div class="step-content">
          <div class="step-phase">Week 1</div>
          <h4>Phase 1: Kickoff</h4>
          <ul class="step-list">
            <li>Initial engagement and project initiation</li>
            <li>O&M AI model capabilities overview</li>
            <li>Stakeholder roles and responsibilities</li>
            <li>PoC objectives and timeline</li>
            <li>Success criteria definition</li>
          </ul>
        </div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step roadmap-step">
        <div class="step-number">02</div>
        <div class="step-content">
          <div class="step-phase">Week 1</div>
          <h4>Phase 2: Define PoC KPIs</h4>
          <ul class="step-list">
            <li>Uptime improvement targets</li>
            <li>Fault prediction accuracy thresholds</li>
            <li>Cost savings metrics</li>
            <li>Revenue optimization goals</li>
          </ul>
        </div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step roadmap-step">
        <div class="step-number">03</div>
        <div class="step-content">
          <div class="step-phase">Week 1-2</div>
          <h4>Phase 3: Data Governance Assessment</h4>
          <ul class="step-list">
            <li>Data source inventory (SCADA, EMS, OEM portals)</li>
            <li>Data retrieval protocols and access methods</li>
            <li>Security requirements evaluation</li>
            <li>Historical data availability assessment</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="pipeline-row">
      <div class="pipeline-step roadmap-step">
        <div class="step-number">04</div>
        <div class="step-content">
          <div class="step-phase">Week 2-3</div>
          <h4>Phase 4: Data Access Setup</h4>
          <ul class="step-list">
            <li>Read-only API keys for inverter clouds</li>
            <li>Admin panel credentials (where applicable)</li>
            <li>VPN or secure tunnel setup</li>
            <li>IP whitelisting for Asoba infrastructure</li>
          </ul>
        </div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step roadmap-step">
        <div class="step-number">05</div>
        <div class="step-content">
          <div class="step-phase">Week 3-4</div>
          <h4>Phase 5: Data Mapping & Inventory</h4>
          <ul class="step-list">
            <li>SCADA tags and inverter credentials</li>
            <li>Site layout and component inventory</li>
            <li>Weather data integration</li>
            <li>12+ months historical performance data</li>
          </ul>
        </div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step roadmap-step">
        <div class="step-number">06</div>
        <div class="step-content">
          <div class="step-phase">Week 4-5</div>
          <h4>Phase 6: API Integration</h4>
          <ul class="step-list">
            <li>Client account setup</li>
            <li>Customer and device registration</li>
            <li>API key generation</li>
            <li>Real-time and batch data feed configuration</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="pipeline-row">
      <div class="pipeline-step roadmap-step">
        <div class="step-number">07</div>
        <div class="step-content">
          <div class="step-phase">Week 5-6</div>
          <h4>Phase 7: MVP Infrastructure Setup</h4>
          <ul class="step-list">
            <li>Automated weather integration (Visual Crossing API)</li>
            <li>Asset registry setup</li>
            <li>Data pipeline configuration</li>
            <li>Dashboard integration</li>
          </ul>
        </div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step roadmap-step">
        <div class="step-number">08</div>
        <div class="step-content">
          <div class="step-phase">Week 6-8</div>
          <h4>Phase 8: Model Activation & Testing</h4>
          <ul class="step-list">
            <li>Model training (12+ months data required)</li>
            <li>Performance target validation</li>
            <li>Forecasting API testing</li>
            <li>Fault detection verification</li>
          </ul>
        </div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step roadmap-step">
        <div class="step-number">09</div>
        <div class="step-content">
          <div class="step-phase">Week 8-12</div>
          <h4>Phase 9: Performance Monitoring</h4>
          <ul class="step-list">
            <li>Model accuracy and latency tracking</li>
            <li>False positive/negative rate monitoring</li>
            <li>System uptime and API response times</li>
            <li>SNS alert subscriptions</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="pipeline-row">
      <div class="pipeline-step roadmap-step">
        <div class="step-number">10</div>
        <div class="step-content">
          <div class="step-phase">Week 8-12</div>
          <h4>Phase 10: Performance Calibration</h4>
          <ul class="step-list">
            <li>Weekly performance reports</li>
            <li>Threshold adjustments</li>
            <li>Model retraining with production data</li>
            <li>Feature engineering optimization</li>
          </ul>
        </div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step roadmap-step">
        <div class="step-number">11</div>
        <div class="step-content">
          <div class="step-phase">Week 13+</div>
          <h4>Phase 11: Full Commercial Agreement</h4>
          <ul class="step-list">
            <li>ROI analysis and performance validation</li>
            <li>Commercial pricing finalization</li>
            <li>SLA establishment</li>
            <li>Operations team training</li>
            <li>Production support handoff</li>
          </ul>
        </div>
      </div>
    </div>
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
