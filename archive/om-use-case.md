---
title: "Example O&M Use Case"
layout: default
nav_order: 7
---

# Example O&M Use Case
{: .fs-8 }

Real-world solar operations & maintenance transformation with Ona Terminal.
{: .fs-6 .fw-300 }

---

## Case Study 1: Sibaya Casino - Limited Historical Data
{: #case-study-sibaya-casino }

### The Challenge: Validating Predictive AI in Low-Data Environments
{: .fs-6 }

Sibaya Casino served as a pilot site for validating Asoba's Predictive AI in a low-data environment. The site contained only six months of usable telemetry—an interval too short for conventional machine-learning models to generalize long-term behavior. 

**Site Profile:**
- **Location:** Durban, South Africa
- **Capacity:** 1.5MW rooftop installation  
- **Historical Data:** 6 months (insufficient for traditional ML)
- **Challenge:** Achieve accurate forecasting without extensive training data

### The Solution: Transfer Learning Architecture
{: .fs-6 }

To overcome the limitation of sparse historical data, the engineering team applied **transfer learning**: a global LSTM architecture originally trained on two reference portfolios in Durban and Johannesburg containing 12–24 months of continuous data. That pretrained model supplied the base temporal features for irradiance, temperature, and production rhythm.

**Technical Approach:**

During deployment, only local normalization and fine-tuning were carried out on the Sibaya dataset. The objective was to test whether regional inference could substitute for historical depth. In validation runs, the transferred model reproduced the plant's daily generation curve with minimal drift relative to the observed output once live collection resumed.

<div class="image-container">
  <img src="/assets/images/Screenshot 2025-11-28 151855.png" alt="Sibaya Casino Data Visualization" class="responsive-image">
</div>

### Results: Structure Over Memory
{: .fs-6 }

The experiment demonstrated that Predictive AI could **learn structure rather than site-specific memory**—a key condition for scalability across new installations with limited archival data. By the end of the test phase, the system delivered:

- ✅ **Stable day-ahead forecasts** from minimal historical baseline
- ✅ **Consistent fault-flagging** despite sparse training data  
- ✅ **Regional model adaptation** proving distributed models could be bootstrapped from other regions instead of being trained from zero on every site
- ✅ **7% SMAPE accuracy** matching performance of models trained on 24+ months of data

**Key Insight:** Transfer learning enables rapid deployment across new sites without waiting months to accumulate sufficient training data. Regional models trained on similar facilities provide the foundation, requiring only local calibration for accurate operation.

---

## Case Study 2: Cummins Portfolio - Overcoming Data Gaps
{: #case-study-cummins-portfolio }

### The Challenge: Maintaining Intelligence Under Severe Data Loss
{: .fs-6 }

The Cummins evaluation examined the Intelligence Layer's resilience under damaged data conditions. The dataset represented a multi-megawatt portfolio with roughly **65% of operational records missing** because of sensor and telemetry losses.

**Portfolio Profile:**
- **Capacity:** Multi-MW distributed portfolio
- **Data Quality:** 65% missing operational records
- **Root Causes:** Sensor failures, telemetry interruptions, communication losses
- **Challenge:** Maintain decision-making capability despite severe data gaps

### The Solution: Multi-Method Statistical Reconstruction
{: .fs-6 }

Rather than discard incomplete sites, Asoba combined classical and modern statistical reconstruction:

**Reconstruction Pipeline:**

1. **ARIMA-Based Interpolation:** Time-series continuity was first restored using ARIMA-based interpolation to re-establish temporal cadence

2. **Meteorological Data Integration:** The interim series was then merged with meteorological data (irradiance, temperature, cloud cover)

3. **Ensemble ML Processing:** Processed through a multi-model ensemble—gradient-boosted regressors feeding a shallow neural network—to rebuild missing production intervals

<div class="image-container">
  <img src="/assets/images/Screenshot 2025-11-28 151924.png" alt="Cummins Portfolio Data Reconstruction" class="responsive-image">
</div>

### Results: Robust Decision-Making Through Redundancy
{: .fs-6 }

This approach re-created full operational days, including **February 8, 2024, which had no original telemetry**. The rebuilt curve aligned with manual inspection logs taken later that week, confirming numerical validity.

**Performance Metrics:**

- ✅ **Complete day reconstruction** from zero original data points
- ✅ **Validation against manual logs** confirmed accuracy within 8% SMAPE
- ✅ **Maintained coherent maintenance scheduling** across entire portfolio
- ✅ **Multi-site optimization** preserved despite fragmented input data

**Key Principle:** The Intelligence Layer demonstrates **robustness through redundancy of method**. If one information channel fails, another statistical path fills the gap until true telemetry returns. Decision AI operated on reconstructed data without functional degradation—even when two-thirds of source data was absent.

---

## Boundary Conditions Established
{: #boundary-conditions-established }

These two deployments define opposite boundaries of reliability testing:

<div class="boundary-cards">
  <div class="boundary-card boundary-sibaya">
    <h3>🎯 Sibaya Casino</h3>
    <h4>Low-Data Boundary</h4>
    <p>Validated learning transfer with scarce historical data. Proved that regional models can bootstrap new sites without extensive local training periods.</p>
    <p><strong>Condition:</strong> Minimal training data (6 months)</p>
    <p><strong>Outcome:</strong> Transfer learning enables immediate deployment</p>
  </div>
  
  <div class="boundary-card boundary-cummins">
    <h3>🛡️ Cummins Portfolio</h3>
    <h4>Degraded-Data Boundary</h4>
    <p>Validated decision stability amid severe data loss. Proved that multi-method reconstruction maintains operational intelligence under adverse conditions.</p>
    <p><strong>Condition:</strong> 65% missing operational data</p>
    <p><strong>Outcome:</strong> Statistical redundancy ensures continuity</p>
  </div>
</div>

<style>
.boundary-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.boundary-card {
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.boundary-sibaya {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-left: 4px solid #1976d2;
}

.boundary-cummins {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  border-left: 4px solid #7b1fa2;
}

.boundary-card h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
}

.boundary-card h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #555;
  font-weight: 600;
}

.boundary-card p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.boundary-card p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .boundary-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>

**Empirical Proof:** Together they establish that Asoba's Predictive and Decision AI form a **dependable operating pair across the full range of data availability** encountered in distributed energy networks—from sparse historical records to severely degraded real-time telemetry.

---

## The Ona Platform Solution: Predictive Intelligence
{: #the-ona-terminal-solution-predictive-intelligence }

Ona Terminal transforms O&M operations from reactive cost centers into **predictive intelligence systems** that prevent faults before they occur and optimize every maintenance decision for maximum ROI. Instead of responding to equipment failures, you anticipate and prevent them.

**How Ona Platform Transforms O&M:**

Ona Terminal trains specialized AI models on your complete O&M corpus including maintenance reports, equipment manuals, warranty documents, and years of inverter performance data. Agentic systems pull real-time inverter data, systematically review performance patterns, and spot fault signatures weeks before equipment failure. When fault patterns are detected, the system automatically diagnoses issues, calculates financial impact, and determines optimal intervention timing. Every maintenance action includes real-time Energy-at-Risk (EAR) calculation versus dispatch costs, ensuring maximum ROI.

---

## The Platform Advantage
{: #the-mcp-framework-advantage }

### How Asoba's Architecture Enables O&M Transformation
{: .fs-6 }

The Ona Platform enables specialized agents that each handle one specific task through single-responsibility agent architecture. 

<div class="asoba-architecture-diagram">
  <!-- Header -->
  <div class="text-center mb-12">
    <h1 class="text-slate-900 mb-4">How Asoba's Architecture Enables O&M Transformation</h1>
    <div class="bg-white rounded-lg shadow-lg p-6 border-2 border-slate-200 max-w-4xl mx-auto">
      <div class="flex items-center justify-center gap-3 mb-3">
        <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
        <h2 class="text-slate-900">Model Context Protocol (MCP)</h2>
      </div>
      <p class="text-slate-600">
        Enables specialized agents that each handle one specific task through single-responsibility agent architecture
      </p>
    </div>
  </div>

  <!-- Phases Grid -->
  <div class="phases-grid">
    <!-- Observe Phase -->
    <div class="phase-card-wrapper">
      <div class="phase-card phase-observe">
        <div class="phase-header">
          <h3 class="phase-title phase-observe-title">Observe Phase</h3>
          <div class="phase-divider phase-observe-divider"></div>
        </div>
        <div class="agents-list">
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-observe-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              <h4 class="agent-name">SCADA Agents</h4>
            </div>
            <p class="agent-description">Pull inverter telemetry data at configured intervals</p>
          </div>
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-observe-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              <h4 class="agent-name">Weather Agents</h4>
            </div>
            <p class="agent-description">Fetch irradiance and temperature data</p>
          </div>
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-observe-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <h4 class="agent-name">Interpolation Agents</h4>
            </div>
            <p class="agent-description">Fill data gaps and standardize time series</p>
          </div>
        </div>
      </div>
      <div class="phase-arrow phase-arrow-desktop">→</div>
    </div>

    <!-- Orient Phase -->
    <div class="phase-card-wrapper">
      <div class="phase-card phase-orient">
        <div class="phase-header">
          <h3 class="phase-title phase-orient-title">Orient Phase</h3>
          <div class="phase-divider phase-orient-divider"></div>
        </div>
        <div class="agents-list">
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-orient-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h4 class="agent-name">Baseline Agents</h4>
            </div>
            <p class="agent-description">Establish expected performance patterns</p>
          </div>
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-orient-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h4 class="agent-name">Anomaly Agents</h4>
            </div>
            <p class="agent-description">Detect deviations from normal behavior</p>
          </div>
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-orient-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <h4 class="agent-name">Diagnostic Agents</h4>
            </div>
            <p class="agent-description">Classify fault types using trained ML models</p>
          </div>
        </div>
      </div>
      <div class="phase-arrow phase-arrow-desktop">→</div>
    </div>

    <!-- Decide Phase -->
    <div class="phase-card-wrapper">
      <div class="phase-card phase-decide">
        <div class="phase-header">
          <h3 class="phase-title phase-decide-title">Decide Phase</h3>
          <div class="phase-divider phase-decide-divider"></div>
        </div>
        <div class="agents-list">
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-decide-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h4 class="agent-name">EAR Calculators</h4>
            </div>
            <p class="agent-description">Compute Energy-at-Risk for each fault</p>
          </div>
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-decide-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 class="agent-name">Cost Estimators</h4>
            </div>
            <p class="agent-description">Calculate dispatch and repair costs</p>
          </div>
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-decide-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h4 class="agent-name">Optimizer Agents</h4>
            </div>
            <p class="agent-description">Determine optimal maintenance timing</p>
          </div>
        </div>
      </div>
      <div class="phase-arrow phase-arrow-desktop">→</div>
    </div>

    <!-- Act Phase -->
    <div class="phase-card-wrapper">
      <div class="phase-card phase-act">
        <div class="phase-header">
          <h3 class="phase-title phase-act-title">Act Phase</h3>
          <div class="phase-divider phase-act-divider"></div>
        </div>
        <div class="agents-list">
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-act-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <h4 class="agent-name">Work Order Agents</h4>
            </div>
            <p class="agent-description">Generate CMMS-compatible work orders</p>
          </div>
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-act-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h4 class="agent-name">Dispatch Agents</h4>
            </div>
            <p class="agent-description">Schedule crews based on availability</p>
          </div>
          <div class="agent-card">
            <div class="agent-header">
              <svg class="agent-icon phase-act-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h4 class="agent-name">Documentation Agents</h4>
            </div>
            <p class="agent-description">Capture compliance and warranty data</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="architecture-footer">
    <div class="footer-content">
      <svg class="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <div>
        <h3 class="footer-title">Continuous OODA Loop</h3>
        <p class="footer-description">
          This architecture follows the OODA (Observe, Orient, Decide, Act) loop methodology, enabling continuous monitoring, analysis, decision-making, and automated action execution for optimal operations and maintenance management.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
.asoba-architecture-diagram {
  max-width: 1200px;
  margin: 32px auto;
}

.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.text-slate-900 {
  color: #0f172a;
}

.text-slate-600 {
  color: #475569;
}

.text-slate-700 {
  color: #334155;
}

.bg-white {
  background-color: #fff;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.p-6 {
  padding: 1.5rem;
}

.border-2 {
  border-width: 2px;
}

.border-slate-200 {
  border-color: #e2e8f0;
}

.max-w-4xl {
  max-width: 56rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.gap-3 {
  gap: 0.75rem;
}

.w-6 {
  width: 1.5rem;
}

.h-6 {
  height: 1.5rem;
}

/* Phases Grid */
.phases-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.phase-card-wrapper {
  position: relative;
}

.phase-card {
  border-radius: 0.5rem;
  border: 2px solid;
  padding: 1.5rem;
  height: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.phase-observe {
  background-color: #eff6ff;
  border-color: #bfdbfe;
}

.phase-orient {
  background-color: #faf5ff;
  border-color: #e9d5ff;
}

.phase-decide {
  background-color: #fffbeb;
  border-color: #fde68a;
}

.phase-act {
  background-color: #f0fdf4;
  border-color: #bbf7d0;
}

.phase-header {
  margin-bottom: 1.5rem;
}

.phase-title {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.phase-observe-title {
  color: #1e40af;
}

.phase-orient-title {
  color: #6b21a8;
}

.phase-decide-title {
  color: #92400e;
}

.phase-act-title {
  color: #166534;
}

.phase-divider {
  height: 2px;
  width: 3rem;
  border-radius: 9999px;
  margin-bottom: 0.5rem;
}

.phase-observe-divider {
  background: linear-gradient(to right, #1e40af, transparent);
}

.phase-orient-divider {
  background: linear-gradient(to right, #6b21a8, transparent);
}

.phase-decide-divider {
  background: linear-gradient(to right, #92400e, transparent);
}

.phase-act-divider {
  background: linear-gradient(to right, #166534, transparent);
}

.agents-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.agent-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
}

.agent-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.agent-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.agent-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.phase-observe-icon {
  color: #1e40af;
}

.phase-orient-icon {
  color: #6b21a8;
}

.phase-decide-icon {
  color: #92400e;
}

.phase-act-icon {
  color: #166534;
}

.agent-name {
  color: #0f172a;
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
}

.agent-description {
  color: #475569;
  font-size: 0.875rem;
  margin: 0;
  margin-left: 2rem;
}

.phase-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #94a3b8;
  font-weight: bold;
}

.phase-arrow-desktop {
  position: absolute;
  top: 50%;
  right: -0.75rem;
  transform: translateY(-50%);
  z-index: 10;
}

.architecture-footer {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}

.footer-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.footer-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
  color: #334155;
}

.footer-title {
  color: #0f172a;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.footer-description {
  color: #475569;
  margin: 0;
  line-height: 1.6;
}

/* Mobile Responsive */
@media (max-width: 1024px) {
  .phases-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .phase-arrow-desktop {
    display: none;
  }
  
  .phase-card-wrapper:not(:last-child)::after {
    content: "↓";
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    font-size: 1.5rem;
    color: #94a3b8;
    transform: rotate(90deg);
  }
}

@media (max-width: 768px) {
  .phases-grid {
    grid-template-columns: 1fr;
  }
  
  .phase-card-wrapper:not(:last-child)::after {
    content: "↓";
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    font-size: 1.5rem;
    color: #94a3b8;
  }
}
</style>

### Expected Performance Improvements
{: .fs-6 }

Based on the platform's distributed agent capabilities, detection latency improves from 4-8 hours to under 5 minutes. Diagnostic accuracy increases from 45% to 85% fault classification. MTTR reduction shows 25-40% improvement from baseline.

**Financial Impact Projections (per 10MW):**
Revenue protection delivers $180K-320K annually. Operational savings through optimized dispatching provide $85K-140K. Risk mitigation from warranty and insurance optimization contributes $45K-75K.

---

## Getting Started
{: #getting-started }

<div class="getting-started-cards">
  <div class="start-card">
    <h3>For Asset Managers</h3>
    <p><strong><a href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3-n_SUGacXWO0GDVkR9J1LCNwoUEUPH_kTw-_yeDaVuFaMysg0rIiZLUy9cKeZlcziEYgFG8Kx">Schedule Portfolio Assessment</a></strong> - Custom ROI analysis based on your facilities, equipment mix, and current O&M costs.</p>
    <p><strong><a href="mailto:sales@asoba.co?subject=Pilot%20Site%20Implementation">Pilot Site Selection</a></strong> - Start with highest-impact facility to prove value before portfolio-wide deployment.</p>
    <p><strong><a href="developers.html">Technical Integration</a></strong> - Connect with your engineering team for seamless deployment.</p>
  </div>
  
  <div class="start-card">
    <h3>For Technical Teams</h3>
    <p><strong><a href="developers.html">5-Minute Setup</a></strong> - Get hands-on experience with core capabilities on sample data.</p>
    <p><strong><a href="loading-models.html">Configure Custom Models</a></strong> - Deploy your fine-tuned models specific to your equipment and operating environment.</p>
    <p><strong><a href="using-commands.html">Master CLI Commands</a></strong> - Learn the OODA workflow tools for daily operations.</p>
  </div>
</div>

<style>
.getting-started-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.start-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.start-card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #4551bf;
  font-size: 1.25rem;
}

.start-card p {
  margin-bottom: 1rem;
}

.start-card p:last-child {
  margin-bottom: 0;
}

.start-card a {
  color: #4551bf;
  text-decoration: none;
}

.start-card a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .getting-started-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Responsive image styling */
.image-container {
  width: 100%;
  max-width: 100%;
  margin: 20px 0;
  text-align: center;
  overflow: hidden;
}

.responsive-image {
  max-width: 100%;
  height: auto;
  width: auto;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .responsive-image {
    max-width: 100%;
  }
}
</style>

---

[Talk to Sales](mailto:sales@asoba.co?subject=Ona Terminal%20O&M%20Solution){: .btn .btn-primary .fs-5 .mr-4 }
[Technical Demo](developers.html){: .btn .btn-outline .fs-5 }

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
      <a href="https://discord.gg/nNV5evcr" target="_blank" class="support-button" style="margin-top: 10px; display: inline-block;">
        <svg width="16" height="16" style="margin-right: 8px; vertical-align: middle;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Join Our Discord
      </a>
    </div>
  </div>
  
  <div class="end-column">
    <div id="mc_embed_shell">
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
      <style type="text/css">
        #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 100%;}
      </style>
      <div id="mc_embed_signup">
        <form action="https://asoba.us10.list-manage.com/subscribe/post?u=459ea321d7831d7b9f5fac70f&amp;id=e03a70f492&amp;f_id=000a9ae3f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
          <div id="mc_embed_signup_scroll">
            <h3>Subscribe to Updates</h3>
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            <div class="mc-field-group"><label for="mce-FNAME">First Name </label><input type="text" name="FNAME" class=" text" id="mce-FNAME" value=""></div>
            <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" value="" required=""></div>
            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style="display: none;"></div>
              <div class="response" id="mce-success-response" style="display: none;"></div>
            </div>
            <div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_459ea321d7831d7b9f5fac70f_e03a70f492" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe"></div>
          </div>
        </form>
      </div>
      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
      <script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[1]='FNAME';ftypes[1]='text';fnames[0]='EMAIL';ftypes[0]='email';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[6]='COMPANY';ftypes[6]='text';fnames[7]='MMERGE7';ftypes[7]='url';fnames[8]='MMERGE8';ftypes[8]='text';fnames[9]='MMERGE9';ftypes[9]='text';fnames[10]='MMERGE10';ftypes[10]='text';fnames[11]='MMERGE11';ftypes[11]='url';fnames[12]='MMERGE12';ftypes[12]='text';fnames[13]='MMERGE13';ftypes[13]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    </div>
  </div>

</div>
