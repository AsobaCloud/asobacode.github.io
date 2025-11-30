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

### Data Flow {#data-flow}

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

### Resilience {#resilience}

Each node operates independently if the central connection fails. Forecasting and fault prediction continue at the edge, and queued decisions transmit automatically when communication is restored. This structure allows the system to degrade gracefully rather than fail catastrophically.

---

## Architecture {#architecture}

The Ona Platform follows a layered architecture that transforms raw operational data into actionable business intelligence:

<div class="architecture-cards">
  <div class="arch-card data-card">
    <h3>YOUR DATA</h3>
    <ul class="arch-features">
      <li>SCADA Systems</li>
      <li>Solar Assets</li>
      <li>Weather Feeds</li>
      <li>Current Monitoring</li>
    </ul>
  </div>
  
  <div class="arch-card intelligence-card">
    <h3>ONA INTELLIGENCE</h3>
    <ul class="arch-features">
      <li>→ Observe (&lt; 5 min): Anomaly Detection</li>
      <li>→ Orient (&lt; 10 min): AI Diagnostics</li>
      <li>→ Decide (&lt; 15 min): Energy-at-Risk</li>
      <li>→ Act (Continuous): Automated Dispatch</li>
    </ul>
  </div>
  
  <div class="arch-card results-card">
    <h3>YOUR RESULTS</h3>
    <ul class="arch-features">
      <li>30+ Day Predictive Alerts</li>
      <li>Automated Work Orders</li>
      <li>SAWEM Compliance</li>
      <li>ROI Analytics</li>
    </ul>
  </div>
</div>

<style>
.architecture-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 32px 0;
}

.arch-card {
  border-radius: 12px;
  padding: 24px;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.arch-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.arch-card h3 {
  font-size: 1.5em;
  margin: 0 0 20px 0;
  font-weight: 700;
  color: #fff;
}

.arch-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.arch-features li {
  padding: 8px 0;
  color: #fff;
  font-size: 1em;
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.arch-features li:last-child {
  border-bottom: none;
}

.data-card {
  background: var(--primary-blue);
}

.intelligence-card {
  background: var(--accent-blue);
}

.results-card {
  background: var(--dark-blue);
}

@media (max-width: 768px) {
  .architecture-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>

### Core Components Overview

<div class="core-components-cards">
  <div class="component-card">
    <h4>API Gateway Layer</h4>
    <ul>
      <li>Secure entry point with authentication and rate limiting</li>
      <li>Custom domain support (api.yourcompany.com)</li>
      <li>Request routing and load balancing</li>
    </ul>
  </div>

  <div class="component-card">
    <h4>Data Collection Services</h4>
    <ul>
      <li><strong>huaweiHistorical</strong>: Historical data collection from Huawei FusionSolar inverters</li>
      <li><strong>weatherDataUpdater</strong>: Automated weather data collection and caching</li>
    </ul>
  </div>

  <div class="component-card">
    <h4>Core Platform Services</h4>
    <ul>
      <li><strong>weatherCache</strong>: Weather data integration with ML-powered insights</li>
      <li><strong>interpolationService</strong>: Data enrichment and ML interpolation</li>
      <li><strong>globalTrainingService</strong>: LSTM model training and management</li>
      <li><strong>forecastingApi</strong>: 30+ day forecasting capabilities</li>
    </ul>
  </div>

  <div class="component-card">
    <h4>Ona Application Layer (OODA Loop)</h4>
    <ul>
      <li><strong>Observe</strong>: Anomaly detection in &lt; 5 minutes</li>
      <li><strong>Orient</strong>: AI diagnostics in &lt; 10 minutes</li>
      <li><strong>Decide</strong>: Energy-at-Risk calculation in &lt; 15 minutes</li>
      <li><strong>Act</strong>: Automated dispatch and continuous monitoring</li>
    </ul>
  </div>

  <div class="component-card">
    <h4>Extensible Services</h4>
    <ul>
      <li>Insurance automation</li>
      <li>Fleet analytics</li>
      <li>Soiling calculations</li>
      <li>Energy market integration</li>
      <li>Electricity dispatch optimization</li>
    </ul>
  </div>
</div>

<style>
.core-components-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;
}

.component-card {
  background: var(--white);
  border: 2px solid #e1e4e8;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.component-card:hover {
  border-color: var(--primary-blue);
  box-shadow: 0 4px 12px rgba(69, 81, 191, 0.15);
  transform: translateY(-2px);
}

.component-card h4 {
  margin: 0 0 12px 0;
  color: var(--text-dark);
  font-size: 1.2em;
  font-weight: 700;
}

.component-card ul {
  margin: 0;
  padding-left: 20px;
  list-style-type: disc;
}

.component-card li {
  margin: 8px 0;
  color: var(--text-light);
  line-height: 1.6;
}

.component-card li strong {
  color: var(--text-dark);
  font-weight: 600;
}
</style>

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
