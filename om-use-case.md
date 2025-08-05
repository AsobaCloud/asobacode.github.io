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

Solar asset managers face a fundamental challenge: traditional operations and maintenance approaches are reactive, unpredictable, and destroying portfolio returns. Equipment failures are detected only after performance losses begin, repairs are scheduled reactively, and maintenance costs spiral out of control.

**Financial Impact:**
Delayed fault response costs $45,000-$85,000 annual lost revenue per MW. Poor maintenance scheduling wastes 25-40% of O&M budgets on unnecessary truck rolls and reactive scheduling. Preventable equipment failures cause 2-4% annual generation loss. Limited insurance benefits result from poor maintenance documentation.

**Operational Challenges:**
Equipment fails unexpectedly, creating emergency response situations with 12-24 hour MTTR. Manual diagnostics delay proper repairs. Warranty claims are often missed due to poor documentation. Reactive scheduling increases travel costs and creates technician utilization gaps.

---

## The Ona Terminal Solution: Predictive Intelligence

Ona Terminal transforms O&M operations from reactive cost centers into **predictive intelligence systems** that prevent faults before they occur and optimize every maintenance decision for maximum ROI. Instead of responding to equipment failures, you anticipate and prevent them.

**How Ona Terminal Transforms O&M:**

Ona Terminal trains specialized AI models on your complete O&M corpus including maintenance reports, equipment manuals, warranty documents, and years of inverter performance data. Agentic systems pull real-time inverter data, systematically review performance patterns, and spot fault signatures weeks before equipment failure. When fault patterns are detected, the system automatically diagnoses issues, calculates financial impact, and determines optimal intervention timing. Every maintenance action includes real-time Energy-at-Risk (EAR) calculation versus dispatch costs, ensuring maximum ROI.

---

## The MCP Framework Advantage

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

### How This Plays Out in Real Operations
{: .fs-6 }

The numbers tell one story, but the operational transformation tells another. Consider three scenarios that demonstrate how predictive intelligence changes everything about how you manage solar assets.

**The String That Saved Christmas**
Last December, at a 25MW facility in Arizona, String 12 began showing subtle performance degradation—a 3% decline that would have gone unnoticed for weeks under traditional monitoring. Ona Terminal's diagnostic agents identified the pattern within 48 hours and classified it as likely DC combiner failure. The system calculated that waiting for quarterly inspection would cost $28,000 in lost generation during peak winter pricing. Instead, a targeted repair preserved full performance and captured a warranty claim that traditional reactive maintenance would have missed.

**The $12,000 Component Replacement**
At a Texas facility, traditional monitoring would have detected an inverter issue only after complete failure, necessitating a $15,000 full unit replacement during the warranty void period. Ona Terminal's predictive analysis identified component-level degradation patterns three weeks early. A targeted $3,000 component replacement under warranty coverage not only avoided the larger expense but kept the facility at full generation during a high-value production period.

**The Tracker That Learned to Dance**
Quarterly manual inspections at a California facility consistently missed tracker alignment issues that developed between visits. Real-time monitoring now catches micro-adjustments needed for optimal sun tracking, delivering a consistent 2-3% generation improvement. More importantly, the system learned the facility's specific wind and thermal expansion patterns, proactively adjusting alignment parameters before issues develop rather than reacting to performance losses.

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

## A Day in the Life: When Intelligence Meets Reality

Let's follow a real scenario as it unfolds—the kind of situation that happens somewhere in your portfolio every single week, but with a completely different outcome than you're used to experiencing.

### The Story Begins: Monday Morning at Phoenix Solar
{: .fs-6 }

At a 1.5MW facility outside Phoenix, String 3 has been quietly developing problems. Traditional monitoring systems wouldn't catch this for weeks, but Ona Terminal's continuous intelligence is already at work.

**Day 1: The First Signs**
By sunrise, monitoring agents have detected that String 3 is underperforming by 18%. While a human operator might dismiss this as weather-related, the system immediately cross-references weather data and confirms clear skies—ruling out irradiance issues. Historical analysis reveals this isn't a sudden failure but a gradual decline developing over three weeks, a signature pattern that human operators rarely catch early enough.

Within hours, diagnostic agents have analyzed the performance fingerprint and identified the most likely cause: DC combiner failure. The system goes deeper, matching the pattern against manufacturer technical service bulletins for this specific combiner model. Most critically, it discovers that warranty coverage expires in just 45 days—information buried in documentation that would take a human hours to locate.

**Day 2: The Financial Picture Becomes Clear**
Energy-at-Risk calculations reveal that leaving this issue unrepaired will cost $2,400 per month in lost revenue. Cost estimation agents determine that repair will require $1,200 in parts plus $800 in labor. The optimizer agent processes all variables and determines the optimal timing: schedule repair within 30 days to preserve warranty coverage while minimizing revenue loss.

**Day 5: Precision Execution**
A work order generates automatically with the specific combiner part number, eliminating guesswork and reducing truck rolls. The dispatch system schedules a technician with proven DC combiner replacement experience rather than sending whoever happens to be available. Photo requirements for warranty claim documentation are included in the work order, ensuring nothing gets missed.

The repair completes in 2 hours instead of the 6-hour reactive response typical for unplanned failures. Energy production returns to full capacity, warranty claims are properly documented, and the facility continues generating maximum revenue.

**The Outcome: Prevention Pays**
This single intervention demonstrates the compound benefits of predictive intelligence: faster fault resolution preserves energy generation, proper documentation optimizes warranty claims, planned maintenance reduces repair time, and scheduled interventions eliminate emergency downtime premiums.

---

## Your Journey to Operational Excellence

Transforming your O&M operations doesn't happen overnight, but it doesn't take years either. The path to predictive intelligence unfolds in three carefully orchestrated phases, each building on the previous while delivering immediate value.

### Phase 1: Building the Foundation (Weeks 1-4)
{: .fs-6 }

The transformation begins with data integration and intelligence training. During the first two weeks, Ona Terminal connects to your existing SCADA systems and weather data sources, creating a unified data foundation. Historical data flows into the system for normalization and analysis, while baseline performance patterns are established for each piece of equipment. This isn't just data migration—it's the creation of institutional memory that captures everything your operations team has learned over years of experience.

Weeks three and four focus on intelligence training. Custom solar diagnostics models deploy using your specific equipment configurations and historical maintenance data. The system learns not just what normal looks like, but what your particular inverters, trackers, and environmental conditions mean for performance patterns. Diagnostic accuracy validation ensures the AI understands your operations as well as your most experienced technicians.

### Phase 2: Automation Takes Flight (Weeks 5-8)  
{: .fs-6 }

The second phase brings the OODA loop online with full automation capabilities. During weeks five and six, automated monitoring and alerting systems activate, while AI-powered fault detection begins identifying issues before they become problems. Economic optimization integration ensures that every decision considers financial impact alongside technical requirements.

Weeks seven and eight focus on seamless integration with your existing workflows. Work order automation connects with your CMMS, dispatch optimization aligns with your crew schedules, and performance tracking dashboards provide real-time visibility into the transformation's impact. Your team works with familiar tools enhanced by unprecedented intelligence.

### Phase 3: Continuous Optimization (Weeks 9-12)
{: .fs-6 }

The final phase unlocks advanced capabilities that compound your operational advantages. Predictive maintenance scheduling evolves from reactive to truly prescriptive, multi-site optimization coordinates resources across your entire portfolio, and warranty claim automation ensures you never miss another opportunity to recover costs.

The journey concludes with comprehensive ROI validation through performance metrics analysis and cost-benefit validation. But this isn't really an ending—it's the beginning of continuous improvement implementation that keeps your operations at the leading edge of solar asset management.

---

## Ready to Transform Your Operations?

The opportunity to revolutionize your O&M operations is clearer than ever. The question isn't whether predictive intelligence will transform solar asset management—it's whether you'll be among the early adopters who capture competitive advantage or among those who follow later at higher cost.

### If You're Managing Assets
{: .fs-6 }

Your immediate next step is understanding exactly how this transformation applies to your specific portfolio. **[Schedule a Portfolio Assessment](mailto:sales@asoba.co?subject=Portfolio%20Assessment%20Request)** to receive a custom ROI analysis based on your actual facilities, equipment mix, and current O&M costs. From there, we'll identify your highest-impact facility for **[Pilot Site Implementation](mailto:sales@asoba.co?subject=Pilot%20Site%20Implementation)**, allowing you to prove the value before committing to portfolio-wide deployment. Once you're convinced by the results, **[Technical Integration](developers.html)** connects our teams to ensure seamless deployment across your operations.

### If You're Leading Technical Implementation
{: .fs-6 }

Get hands-on experience immediately with our **[5-Minute Setup](developers.html)** that demonstrates core capabilities on sample data. Then **[Configure Custom Models](loading-models.html)** to deploy your fine-tuned models specific to your equipment and operating environment. Finally, **[Master CLI Commands](using-commands.html)** to learn the OODA workflow tools that will become essential to your daily operations.

### If You're Making Investment Decisions
{: .fs-6 }

Start with our **[Business Case Calculator](mailto:sales@asoba.co?subject=ROI%20Calculator%20Request)** to receive custom financial analysis based on your portfolio size and current O&M performance. Schedule an **[Executive Demo](mailto:sales@asoba.co?subject=Executive%20Demo%20Request)** to see the solution in action with realistic scenarios from your industry. When you're ready to move forward, **[Implementation Planning](mailto:sales@asoba.co?subject=Implementation%20Planning)** sessions will design a deployment strategy that fits your timeline and risk tolerance.

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