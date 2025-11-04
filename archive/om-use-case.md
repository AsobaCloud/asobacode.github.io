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

## The Business Problem: O&M Is Bleeding Your Returns
{: #the-business-problem-o-m-is-bleeding-your-returns }

Solar asset managers face a fundamental challenge: traditional operations and maintenance approaches are reactive, unpredictable, and destroying portfolio returns. Equipment failures are detected only after performance losses begin, repairs are scheduled reactively, and maintenance costs spiral out of control.

**Financial Impact:**
Delayed fault response costs $45,000-$85,000 annual lost revenue per MW. Poor maintenance scheduling wastes 25-40% of O&M budgets on unnecessary truck rolls and reactive scheduling. Preventable equipment failures cause 2-4% annual generation loss. Limited insurance benefits result from poor maintenance documentation.

**Operational Challenges:**
Equipment fails unexpectedly, creating emergency response situations with 12-24 hour MTTR. Manual diagnostics delay proper repairs. Warranty claims are often missed due to poor documentation. Reactive scheduling increases travel costs and creates technician utilization gaps.

---

## The Ona Terminal Solution: Predictive Intelligence
{: #the-ona-terminal-solution-predictive-intelligence }

Ona Terminal transforms O&M operations from reactive cost centers into **predictive intelligence systems** that prevent faults before they occur and optimize every maintenance decision for maximum ROI. Instead of responding to equipment failures, you anticipate and prevent them.

**How Ona Terminal Transforms O&M:**

Ona Terminal trains specialized AI models on your complete O&M corpus including maintenance reports, equipment manuals, warranty documents, and years of inverter performance data. Agentic systems pull real-time inverter data, systematically review performance patterns, and spot fault signatures weeks before equipment failure. When fault patterns are detected, the system automatically diagnoses issues, calculates financial impact, and determines optimal intervention timing. Every maintenance action includes real-time Energy-at-Risk (EAR) calculation versus dispatch costs, ensuring maximum ROI.

---

## The MCP Framework Advantage
{: #the-mcp-framework-advantage }

### How Asoba's Architecture Enables O&M Transformation
{: .fs-6 }

The Model Context Protocol (MCP) enables specialized agents that each handle one specific task through single-responsibility agent architecture. 

**Observe Phase Agents:**
SCADA agents pull inverter telemetry data at configured intervals. Weather agents fetch irradiance and temperature data. Interpolation agents fill data gaps and standardize time series.

**Orient Phase Agents:**
Baseline agents establish expected performance patterns. Anomaly agents detect deviations from normal behavior. Diagnostic agents classify fault types using trained ML models.

**Decide Phase Agents:**
EAR calculators compute Energy-at-Risk for each fault. Cost estimators calculate dispatch and repair costs. Optimizer agents determine optimal maintenance timing.

**Act Phase Agents:**
Work order agents generate CMMS-compatible work orders. Dispatch agents schedule crews based on availability. Documentation agents capture compliance and warranty data.

### Expected Performance Improvements
{: .fs-6 }

Based on the MCP framework's distributed agent capabilities, detection latency improves from 4-8 hours to under 5 minutes. Diagnostic accuracy increases from 45% to 85% fault classification. MTTR reduction shows 25-40% improvement from baseline.

**Financial Impact Projections (per 10MW):**
Revenue protection delivers $180K-320K annually. Operational savings through optimized dispatching provide $85K-140K. Risk mitigation from warranty and insurance optimization contributes $45K-75K.

---

## Detailed Business Impact Analysis
{: #detailed-business-impact-analysis }

### Financial Metrics (500MW Portfolio)
{: .fs-6 }

| Metric | Before Ona Terminal | After Ona Terminal | Annual Savings |
|--------|------------------|-----------------|----------------|
| **Lost Revenue** | $4.5M | $1.2M | **$3.3M** |
| **Emergency Dispatch** | $480K | $120K | **$360K** |
| **Diagnostic Labor** | $240K | $60K | **$180K** |
| **Parts Inventory** | $300K | $180K | **$120K** |
| **Insurance Claims** | $150K recovered | $450K recovered | **+$300K** |
| **Total Impact** | - | - | **$4.26M savings** |

**Conservative ROI: 425% in first year**

### Operational Improvements
{: .fs-6 }

**String Degradation Detection:**
Traditional monitoring shows 3-week delay in detection with 15% performance loss. Ona Terminal provides 2-day early warning with preventive intervention. This results in $28K annual energy recovery per string.

**Inverter Component Failure:**  
Traditional reactive approach requires complete inverter replacement costing $15K. Predictive analysis enables targeted component replacement at $3K cost. This delivers $12K cost avoidance plus warranty claim preservation.

**Tracker Alignment Issues:**
Quarterly manual inspection finds issues after performance loss occurs. Real-time tracking alignment monitoring provides continuous optimization. This generates 2-3% generation improvement from optimal tracking.

---

## Technical Implementation Details

### Custom Agent Implementation
{: .fs-6 }

Ona Terminal enables you to create **custom single-use agents** tailored to your specific O&M workflows through natural language interactions and custom model integration.

**Agent Workflow Pattern:**

**Observe Phase:** Data collection and monitoring agents can be created to gather equipment telemetry, weather data, and performance metrics.

**Orient Phase:** Diagnostic agents apply trained models to analyze patterns, classify faults, and identify anomalies in equipment behavior.

**Decide Phase:** Economic optimization agents calculate financial impact, prioritize maintenance actions, and optimize resource allocation.

**Act Phase:** Execution agents generate work orders, coordinate with existing CMMS systems, and track performance metrics.

### Custom Model Integration
{: .fs-6 }

**🎯 Solar Equipment Diagnostics Model:**
- Trained on 10,000+ solar inverter fault patterns
- 85% accuracy in fault classification vs. 45% for general models
- Understands manufacturer-specific error codes

**💰 Economic Dispatch Model:**  
- Optimizes repair scheduling based on revenue impact
- Factors weather forecasts, grid pricing, equipment criticality
- $25,000+ average cost savings per optimized dispatch

---

## Illustrative Example: String Performance Issue
{: #illustrative-example-string-performance-issue }

### Example Scenario
{: .fs-6 }
**Site:** 1.5MW solar facility  
**Issue:** String 3 showing 18% underperformance  
**Traditional Response:** Wait for quarterly inspection, reactive replacement

### How Ona Terminal Would Respond
{: .fs-6 }

**Day 1 - Observe:**
Monitor detects String 3 underperforming by 18%. Weather data confirms clear skies (no irradiance issue). Historical analysis shows gradual decline over 3 weeks.

**Day 1 - Orient:**
AI diagnostics suggest DC combiner failure. Pattern matches manufacturer TSB for this combiner model. Warranty check confirms coverage expires in 45 days.

**Day 2 - Decide:**
EAR calculation: $2,400/month revenue loss if unrepaired. Repair cost estimate: $1,200 parts + $800 labor. Optimal timing: Schedule within 30 days to preserve warranty.

**Day 5 - Act:**
Work order generated with specific combiner part number. Technician scheduled with DC combiner replacement experience. Photo requirements included for warranty claim documentation. Repair completed in 2 hours vs. 6-hour reactive response.

**Projected Results:**
Energy recovery through faster fault resolution. Warranty claim optimization through proper documentation. Reduced repair time vs. traditional reactive response. Planned maintenance vs. emergency downtime.

---

## Implementation Roadmap
{: #implementation-roadmap }

### Phase 1: Foundation (Weeks 1-4)
{: .fs-6 }

**Week 1-2: Data Integration**
Connect SCADA systems and weather data. Historical data import and normalization. Baseline performance establishment.

**Week 3-4: Model Training**  
Deploy custom solar diagnostics models. Train on historical maintenance data. Validate diagnostic accuracy.

### Phase 2: Automation (Weeks 5-8)
{: .fs-6 }

**Week 5-6: OODA Loop Implementation**
Automated monitoring and alerting. AI-powered fault detection. Economic optimization integration.

**Week 7-8: CMMS Integration**
Work order automation. Dispatch optimization. Performance tracking dashboards.

### Phase 3: Optimization (Weeks 9-12)
{: .fs-6 }

**Week 9-10: Advanced Features**
Predictive maintenance scheduling. Multi-site optimization. Warranty claim automation.

**Week 11-12: ROI Validation**
Performance metrics analysis. Cost-benefit validation. Continuous improvement implementation.

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