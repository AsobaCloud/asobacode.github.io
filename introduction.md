---
title: "Introduction"
layout: default
nav_order: 0
---

# Ona Platform: AI-Driven Solar Asset Management

The Ona Platform is a comprehensive, end-to-end solution for energy analytics and forecasting that transforms raw data from various sources into actionable insights, enabling predictive maintenance, optimized energy dispatch, and enhanced operational efficiency.

## Quick Start {#quick-start}

<div class="user-path-buttons">
  <div class="quickstart-card">
    <div class="path-icon">🛠️</div>
    <div class="path-content">
      <h3>Get Started</h3>
      <p>Step-by-step onboarding guide</p>
      <a href="user-guide.html" class="path-link">Get Started →</a>
    </div>
  </div>
  
  <div class="quickstart-card">
    <div class="path-icon">📊</div>
    <div class="path-content">
      <h3>Use Cases</h3>
      <p>Explore real-world applications</p>
      <a href="archive/om-use-case.html" class="path-link">View Use Cases →</a>
    </div>
  </div>
  
  <div class="quickstart-card">
    <div class="path-icon">🔒</div>
    <div class="path-content">
      <h3>Data Governance</h3>
      <p>Learn about data management and compliance</p>
      <a href="https://docs.asoba.co/business-users.html" class="path-link" target="_blank">View Data Governance →</a>
    </div>
  </div>
</div>

<style>
.user-path-buttons {
  display: flex;
  gap: 20px;
  margin: 30px 0 40px 0;
  flex-wrap: wrap;
}

.quickstart-card {
  flex: 1;
  min-width: 300px;
  border: 2px solid #e1e4e8;
  border-radius: 8px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;
  background: #fff;
}

.quickstart-card:hover {
  border-color: #4551bf;
  box-shadow: 0 4px 12px rgba(69, 81, 191, 0.15);
  transform: translateY(-2px);
}

.path-icon {
  font-size: 2.5em;
  margin-bottom: 15px;
}

.path-content h3 {
  font-size: 1.4em;
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.path-content p {
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.4;
}

.path-link {
  display: inline-block;
  background: #4551bf;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease;
}

.path-link:hover {
  background: #3a47a3;
  text-decoration: none;
  color: white;
}

@media (max-width: 768px) {
  .user-path-buttons {
    flex-direction: column;
  }
  
  .quickstart-card {
    min-width: auto;
  }
}
</style>

---

## What is Ona Platform? {#what-is-ona-platform}

Ona is the software and hardware environment that runs the Intelligence Layer. It is built on three physical layers: edge, control, and interface.

<div class="quickstart-paths">
  <div class="path-card">
    <h3>⚡ Edge Layer</h3>
    <p>Hosts the Predictive AI models; runs on low‑power compute devices attached directly to energy assets; performs short‑term (0–48 hour) forecasts for each node; stores 48 hours of data locally to ensure resilience against connectivity loss.</p>
    <a href="edge-layer.html" class="path-button">Learn More →</a>
  </div>
  
  <div class="path-card">
    <h3>🎛️ Control Layer</h3>
    <p>Aggregates predictions from all active nodes; executes Decision AI routines for task scheduling and coordination; maintains a unified dashboard for operators; provides secure APIs for integration with maintenance management systems such as SAP PM or Maximo.</p>
    <a href="control-layer.html" class="path-button">Learn More →</a>
  </div>
  
  <div class="path-card">
    <h3>🖥️ Interface Layer</h3>
    <p>Displays operational status, risk scores, and active work orders; uses deterministic templates rather than generative text to eliminate hallucination; allows users to examine model confidence and trace data sources directly.</p>
    <a href="interface-layer.html" class="path-button">Learn More →</a>
  </div>
</div>

All communication between layers uses encrypted channels (TLS 1.3) and certificate‑based authentication. Data remains within defined geographic boundaries; cloud mirrors are used only for redundancy and cannot execute control commands.

### Data Flow

<div class="roadmap-container">
  <div class="text-center mb-12">
    <p class="text-gray-600">Closed loop data flow ensuring measurable outcomes and continuous improvement</p>
  </div>

  <div class="pipeline-container">
    <div class="pipeline-row">
      <div class="pipeline-step roadmap-step">
        <div class="step-number">01</div>
        <div class="step-content">
          <div class="step-phase">Input</div>
          <h4>Sensor</h4>
          <ul class="step-list">
            <li>Real-time data collection</li>
            <li>Equipment telemetry</li>
            <li>Environmental measurements</li>
          </ul>
        </div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step roadmap-step">
        <div class="step-number">02</div>
        <div class="step-content">
          <div class="step-phase">Edge Processing</div>
          <h4>Edge Device (Predictive Model)</h4>
          <ul class="step-list">
            <li>Short-term forecasting (0-48 hours)</li>
            <li>Local model execution</li>
            <li>48-hour data buffer</li>
          </ul>
        </div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step roadmap-step">
        <div class="step-number">03</div>
        <div class="step-content">
          <div class="step-phase">Decision</div>
          <h4>Decision Engine (Control Layer)</h4>
          <ul class="step-list">
            <li>Task scheduling</li>
            <li>Resource coordination</li>
            <li>Optimization routines</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pipeline-row">
      <div class="pipeline-step roadmap-step">
        <div class="step-number">04</div>
        <div class="step-content">
          <div class="step-phase">Execution</div>
          <h4>Operator Action</h4>
          <ul class="step-list">
            <li>Work order execution</li>
            <li>Maintenance activities</li>
            <li>System adjustments</li>
          </ul>
        </div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step roadmap-step">
        <div class="step-number">05</div>
        <div class="step-content">
          <div class="step-phase">Learning</div>
          <h4>Feedback into Model</h4>
          <ul class="step-list">
            <li>Outcome measurement</li>
            <li>Model refinement</li>
            <li>Continuous improvement</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

This closed loop ensures that every decision has a measurable outcome and every outcome improves the next prediction.

### Resilience

Each node operates independently if the central connection fails. Forecasting and fault prediction continue at the edge, and queued decisions transmit automatically when communication is restored. This structure allows the system to degrade gracefully rather than fail catastrophically.

---

## Architecture {#architecture}

The Ona Platform follows a layered architecture that transforms raw operational data into actionable business intelligence:

```mermaid
flowchart TD
 subgraph sources["Data Sources"]
        A1["SCADA Systems"]
        A2["Solar Assets"]
        A3["Current Monitoring"]
        A4["Weather Data"]
  end
 subgraph gateway["API Gateway Layer"]
        B1["API Gateway<br/>api.yourcompany.com"]
        B2["Authentication &<br/>Rate Limiting"]
  end
 subgraph core["Core Platform Services"]
        C1["dataIngestion<br/>Real-time ingestion"]
        C2["weatherCache<br/>ML-powered insights"]
        C3["interpolationService<br/>Data enrichment"]
        C4["globalTrainingService<br/>LSTM model training"]
        C5["forecastingApi<br/>30+ day predictions"]
  end
 subgraph ona["Ona Application Layer"]
        D1["Observe<br/>Anomaly Detection<br/>< 5 min"]
        D2["Orient<br/>AI Diagnostics<br/>< 10 min"]
        D3["Decide<br/>Energy-at-Risk<br/>< 15 min"]
        D4["Act<br/>Automated Dispatch<br/>Continuous"]
  end
 subgraph extensible["Extensible Services"]
        E1["Insurance<br/>Automation"]
        E2["Fleet<br/>Analytics"]
        E3["Soiling<br/>Calculations"]
        E4["Energy Market<br/>Integration"]
        E5["Electricity<br/>Dispatch"]
  end
 subgraph outcomes["Business Intelligence"]
        F1["Predictive Alerts<br/>30+ days"]
        F2["Automated<br>Work Orders"]
        F3["SAWEM<br>Compliance"]
        F4["ROI Analytics"]
  end
    sources --> B1
    B1 --> B2
    B2 --> C1
    C1 --> C3
    C2 --> C3 & C5
    C3 --> C4 & C5 & D1
    C4 --> C5
    C5 --> D1
    D1 --> D2
    D2 --> D3
    D3 --> D4
    D4 --> outcomes
    
    %% Extensible services integration
    core --> extensible
    extensible --> outcomes

    style gateway fill:#1e40af,color:#fff
    style core fill:#3b82f6,color:#fff
    style ona fill:#6366f1,color:#fff
    style extensible fill:#8b5cf6,color:#fff
    style sources fill:#AA00FF,stroke:#cbd5e1,color:#fff
    style outcomes fill:#10b981,stroke:#059669,color:#fff
```

### Data Flow and Service Interactions

```mermaid
sequenceDiagram
    participant User
    participant API as API Gateway
    participant DI as dataIngestion
    participant S3 as S3 Input
    participant IS as interpolationService
    participant WC as weatherCache
    participant GT as globalTraining
    participant FA as forecastingApi
    participant S3O as S3 Output

    %% Historical Upload Flow
    rect rgb(200, 230, 255)
        Note over User,S3O: Historical Data Upload & Training
        User->>API: POST /upload_train
        API->>S3: Direct upload to historical/
        S3->>IS: S3 Event Trigger
        IS->>S3: Load weather cache
        IS->>IS: Enrich & Interpolate
        IS->>S3: Save to training/
        S3->>GT: S3 Event Trigger
        GT->>GT: Train LSTM Model
        GT->>S3O: Save model
    end

    %% Nowcast Flow
    rect rgb(255, 230, 200)
        Note over User,S3: Real-time Data Upload
        User->>API: POST /upload_nowcast
        API->>S3: Direct upload to nowcast/
        S3->>IS: S3 Event Trigger
        IS->>S3: Load cached weather
        IS->>IS: Calculate metrics
        IS->>S3: Save processed data
    end

    %% Weather Cache Update
    rect rgb(230, 255, 200)
        Note over WC,S3: Weather Cache Update (Every 15 min)
        WC->>WC: Get all locations
        WC->>External API: Fetch weather
        WC->>S3: Update cache
    end

    %% Forecast Generation
    rect rgb(255, 200, 255)
        Note over User,FA: Forecast Generation
        User->>API: GET /forecast
        API->>FA: Invoke
        FA->>S3O: Load model
        FA->>S3: Load nowcast data
        FA->>S3: Load forecast weather
        FA->>FA: Generate forecast
        FA->>User: Return forecast
    end
```

### Core Components Overview

**API Gateway Layer**
- Secure entry point with authentication and rate limiting
- Custom domain support (api.yourcompany.com)
- Request routing and load balancing

**Data Collection Services**
- **huaweiHistorical**: Historical data collection from Huawei FusionSolar inverters  
- **weatherDataUpdater**: Automated weather data collection and caching

**Core Platform Services**
- **weatherCache**: Weather data integration with ML-powered insights
- **interpolationService**: Data enrichment and ML interpolation
- **globalTrainingService**: LSTM model training and management
- **forecastingApi**: 30+ day forecasting capabilities

**Ona Application Layer (OODA Loop)**
- **Observe**: Anomaly detection in < 5 minutes
- **Orient**: AI diagnostics in < 10 minutes
- **Decide**: Energy-at-Risk calculation in < 15 minutes
- **Act**: Automated dispatch and continuous monitoring

**Extensible Services**
- Insurance automation
- Fleet analytics
- Soiling calculations
- Energy market integration
- Electricity dispatch optimization

---

## Further Research {#further-research}

### Case Studies and Research Papers

| Resource | Description | Link |
|----------|-------------|------|
| Case Study | Real-world implementation and results | [View on Zenodo](https://zenodo.org/records/17495951) |

### Additional Resources

For more detailed information, please refer to:

- **[User Guide](user-guide.html)** - Step-by-step onboarding guide
- **[Changelog](changelog.html)** - Version history and release notes

---

## Next Steps {#next-steps}

1. **Get Started**: Follow the [User Guide](user-guide.html) to deploy and configure your platform
2. **Stay Updated**: Check the [Changelog](changelog.html) for latest features and improvements
