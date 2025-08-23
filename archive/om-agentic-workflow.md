---
title: "O&M Agentic Workflow: Technical Deep Dive"
layout: default
nav_order: 3
description: Technical deep dive into implementing AI-powered predictive maintenance workflows with Ona Terminal's agentic framework.
---

# Transform O&M from Cost Center to Profit Driver

## The Business Problem: O&M Is Bleeding Your Returns

Solar asset managers face a critical challenge: **maintenance costs are unpredictable, reactive, and destroying portfolio returns**. Traditional O&M approaches result in:

- **$45,000-$85,000 annual lost revenue per MW** due to delayed fault response
- **25-40% of O&M budget wasted** on unnecessary truck rolls and reactive scheduling
- **2-4% annual generation loss** from preventable equipment failures
- **Limited insurance benefits** due to poor maintenance documentation and risk management

## The Solution: AI-Powered Predictive O&M Intelligence

What if your O&M operation could **prevent faults before they occur**, **optimize every maintenance decision financially**, and **turn historical maintenance data into predictive intelligence**?

Our O&M agentic workflow transforms years of maintenance reports, equipment data, and operational history into an intelligent system that:

### 📊 **Learns from Your Historical Data**
Train specialized AI models on your complete O&M corpus—maintenance reports, equipment manuals, warranty documents, and years of inverter performance data. This creates institutional knowledge that never leaves with departing staff.

### 🔍 **Continuously Monitors for Early Warning Signs**
Agentic systems pull real-time inverter data, systematically review performance patterns, and spot fault signatures **weeks before equipment failure**—not hours after.

### ⚡ **Triggers Preventive Action**
When fault patterns are detected, the system automatically diagnoses the issue, calculates financial impact, and determines optimal intervention timing to **maximize energy recovery while minimizing costs**.

### 💰 **Optimizes Every Dispatch Decision**
Every maintenance action is financially justified with real-time calculation of **Energy-at-Risk (EAR)** versus dispatch costs, ensuring maximum ROI on every truck roll.

## Business Value (Overview)

For a detailed breakdown of the financial and strategic value of Ona Terminal's O&M solution, including ROI and impact metrics, please refer to the [Example O&M Use Case](om-use-case.html) page.

## How It Works: From Data to Decisions

### 1. **Historical Intelligence Training**

Your O&M operation generates massive amounts of data that typically sits unused:
- **Maintenance Reports**: Years of technician observations and repair histories
- **Equipment Documentation**: Manuals, specifications, and warranty terms
- **Performance Data**: Historical inverter output and environmental conditions
- **Financial Records**: Actual costs and energy losses from past incidents

**Business Value**: This historical corpus becomes the foundation for predictive models that encode decades of operational experience into an always-available AI system.

### 2. **Continuous Performance Intelligence**

The system continuously ingests real-time data streams:
- **SCADA Telemetry**: Inverter performance, string output, and environmental sensors
- **Weather Context**: Irradiance, temperature, and meteorological patterns
- **Market Data**: Real-time electricity prices and grid conditions

**Business Value**: Every data point is automatically analyzed against historical patterns to identify emerging fault signatures before they impact generation.

### 3. **Predictive Fault Detection**

AI models trained on your specific equipment and operating conditions identify fault patterns:
- **Inverter Degradation**: Subtle efficiency losses that predict imminent failure
- **String Mismatches**: Early indicators of combiner or connection issues
- **Soiling Patterns**: Site-specific accumulation rates that optimize cleaning schedules
- **Component Wear**: Performance trends that predict maintenance needs

**Business Value**: Preventing equipment failures delivers 10-20x ROI compared to reactive repair costs and associated generation losses.

### 4. **Economic Optimization Engine**

Every maintenance decision is automatically optimized for maximum financial return:

**Energy-at-Risk (EAR) Calculation**:
```
EAR = Σ (Expected Generation - Actual Generation) × Market Price
```

**Dispatch Optimization Score**:
```
Dispatch Score = (EAR - Dispatch Cost - Parts Cost) ÷ Response Time
```

**Business Value**: This ensures every maintenance action maximizes energy recovery while minimizing operational costs, typically improving O&M ROI by 300-500%.

### 5. **Intelligent Dispatch Coordination**

The system automatically:
- **Prioritizes Sites**: Ranks interventions by financial impact and urgency
- **Optimizes Routing**: Batches geographically proximate work to minimize travel costs
- **Manages Resources**: Coordinates crew schedules and parts inventory
- **Ensures Compliance**: Validates warranty requirements and safety protocols

**Business Value**: Dispatch optimization reduces operational costs by 25-40% while improving response times and technician productivity.


## Technology Foundation: MCP Agents Enable Business Intelligence

The business intelligence is powered by specialized AI agents working together through the Model Context Protocol (MCP):

### **Data Intelligence Agents**
- Stream real-time SCADA data and maintain quality standards
- Normalize and contextualize historical and live data streams
- Integrate weather, market, and operational data sources

### **Predictive Analytics Agents**
- Train and maintain asset-specific performance models
- Detect anomalies and classify fault types with 85-90% accuracy
- Generate probabilistic forecasts with confidence intervals

### **Economic Optimization Agents**
- Calculate real-time Energy-at-Risk across time horizons
- Optimize dispatch decisions for maximum financial return
- Integrate market pricing and contract terms

### **Compliance Intelligence Agents**
- Parse warranty documents and maintenance requirements
- Validate safety protocols and regulatory compliance
- Generate complete audit trails for insurance and regulatory purposes

### **Dispatch Coordination Agents**
- Optimize crew scheduling and route planning
- Coordinate parts inventory and procurement
- Manage CMMS integration and work order execution

**MCP Technical Foundation**: Each agent leverages proven APIs including `ingestNowcastLoadData`, `trainForecaster`, `returnForecastingResults`, `project_economics`, and `marketPriceForecast`—the same infrastructure supporting insurance underwriting and other financial applications.

## Implementation: MCP Configuration & Model Setup

### MCP Agent Configuration

Configure the O&M agent pack using the same MCP pattern established for insurance workflows:

#### **Agent Catalog Setup**
```yaml
# O&M Agent Pack Configuration
om_agents:
  data_intake:
    description: "Streams SCADA/irradiance; standardizes intervals"
    apis:
      - ingestNowcastLoadData
      - interpolateData
      - weather
    
  forecasting_diagnostics:
    description: "Maintains weather-normalized baselines; detects deviations; tags fault class"
    apis:
      - trainForecaster
      - returnForecastingResults
    
  compliance:
    description: "Parses EPC/O&M/warranty, permits, site safety SOPs; emits dispatch constraints"
    knowledge_base: "policy_kb_rag"
    
  economics:
    description: "Translates deviations into energy-at-risk (EAR) and lost-revenue scenarios"
    apis:
      - electricityDispatch
      - project_economics
      - marketPriceForecast
    
  dispatch_orchestrator:
    description: "Decides whether/when/where to roll, selects crew, parts, window; emits CMMS work order"
    
  field_ops:
    description: "Tracks on-site progress; closes job with evidence; updates model state"
```

#### **OODA Loop Integration**
The O&M workflow reuses the existing OODA framework, simply replacing the "premium/claims" decision loop with "energy-at-risk → compliance gates → crew assignment":

- **OBSERVE**: Stream SCADA via `ingestNowcastLoadData`; clean with `interpolateData`; add `weather`
- **ORIENT**: `trainForecaster` → `returnForecastingResults` for P50/P90 baselines; classify anomaly; parse warranty/O&M clauses  
- **DECIDE**: Calculate EAR = Σ(E_expected - E_actual) × Price; optimize dispatch score under compliance constraints
- **ACT**: Create CMMS work order; track progress; capture evidence; update baselines

### Custom Model Fine-Tuning for O&M

#### **Historical Corpus Preparation**
Train your specialized O&M model on facility-specific data:

```python
# O&M Training Data Structure
training_corpus = {
    "maintenance_reports": [
        "Years of technician observations and repair histories",
        "Equipment failure patterns and resolution procedures",
        "Seasonal maintenance schedules and outcomes"
    ],
    "equipment_documentation": [
        "Inverter manuals and specifications", 
        "Warranty terms and coverage details",
        "Component replacement procedures"
    ],
    "performance_data": [
        "Historical inverter output and efficiency trends",
        "Environmental conditions and performance correlation",
        "Fault signatures and diagnostic indicators"
    ],
    "financial_records": [
        "Actual dispatch costs and labor rates",
        "Energy losses and revenue impact from past incidents",
        "Parts costs and procurement lead times"
    ]
}
```

#### **Model Fine-Tuning Process**
```bash
# Fine-tune Mistral model for O&M domain expertise
ona-terminal train --model mistral-7b \
  --domain om_dispatch \
  --corpus ./data/om_training_corpus \
  --specialization "solar_maintenance_optimization" \
  --output ./models/om_specialist_model
```

#### **Policy Knowledge Base Configuration**
Configure RAG/Bedrock integration for compliance intelligence:

```yaml
# Policy KB for O&M Compliance
policy_knowledge_base:
  sources:
    - warranty_documents
    - epc_contracts  
    - oam_agreements
    - safety_procedures
    - vendor_requirements
  
  rag_configuration:
    embedding_model: "text-embedding-ada-002"
    chunk_size: 1000
    overlap: 200
    retrieval_method: "semantic_search"
```

### API Integration Points

The O&M implementation leverages existing Ona Power Tools APIs with no new surface area required:

#### **Time-series & Baseline APIs**
- `ingestNowcastLoadData` - Real-time SCADA streaming
- `interpolateData` - Gap filling and data standardization  
- `weather` - Environmental context and normalization
- `trainForecaster` - Asset-specific model training
- `returnForecastingResults` - P50/P90 performance curves

#### **Economics APIs** (same gaps as insurance)
- `electricityDispatch` - Revenue optimization scenarios
- `project_economics` - NPV, IRR, LCOE calculations  
- `marketPriceForecast` - Real-time pricing integration

*Note: The economics APIs should be exposed behind API Gateway exactly as planned for insurance - the O&M case benefits from the same missing services being deployed.*

### Agent Tool-Use Example

Here's how the configured agents execute the O&M workflow:

```python
# Sample Agent Execution Plan
def execute_om_workflow(asset_id, fault_trigger):
    # Data Intake Agent
    telemetry = ingestNowcastLoadData(asset_id)
    clean_data = interpolateData(telemetry)
    weather_context = weather(asset_id, timeframe="24h")
    
    # Forecasting & Diagnostics Agent  
    forecast = returnForecastingResults(asset_id)
    anomaly_classification = classify_fault_type(clean_data, forecast)
    
    # Compliance Agent
    warranty_constraints = extract_warranty_terms(asset_id)
    dispatch_gates = validate_compliance_requirements(anomaly_classification)
    
    # Economics Agent
    ear_calculation = calculate_energy_at_risk(forecast, market_prices)
    dispatch_costs = estimate_dispatch_expenses(asset_id, fault_type)
    
    # Dispatch Orchestrator
    dispatch_score = (ear_calculation - dispatch_costs) / estimated_eta
    if dispatch_score > threshold and dispatch_gates.all_clear():
        work_order = create_cmms_work_order(asset_id, anomaly_classification)
        return schedule_dispatch(work_order)
```

This approach mirrors the insurance "Agent Catalog (Default Pack)" and "Underwriting example" sequences—only the decision output changes from price/limits to dispatch.

## Investment & Returns (Overview)

For a detailed analysis of the investment required and the projected financial returns, please refer to the [Example O&M Use Case](om-use-case.html) page.

## Why This Matters Now (Overview)

For a discussion on the current market trends, competitive advantages, and strategic importance of adopting predictive O&M, please refer to the [Example O&M Use Case](om-use-case.html) page.

## Getting Started (Overview)

For a comprehensive guide on getting started with Ona Terminal's O&M solution, including immediate next steps, success requirements, and contact information, please refer to the [Example O&M Use Case](om-use-case.html) page.

---



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
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.30zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
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