---
title: "Agentic Workflow Overview"
layout: default
nav_order: 5
---

# Agentic Workflow Overview
{: .fs-8 }

Understand the OODA loop: Observe → Orient → Decide → Act
{: .fs-6 .fw-300 }

---

## The OODA Loop in Operations

Ona Terminal implements the **OODA (Observe-Orient-Decide-Act) loop** for autonomous operations management. This military-tested decision framework enables proactive, intelligent responses to operational challenges.

### Why OODA for O&M?
{: .fs-6 }

Traditional O&M is **reactive**: equipment fails → scramble to fix → high costs.

**OODA-based O&M is proactive**: continuous observation → pattern recognition → optimal decisions → preventive action.

---

## 1. Observe: Data Ingestion & Normalization
{: .fs-7 }

### Data Sources
{: .fs-6 }

**🌡️ Weather Data**
- Real-time weather station feeds
- Satellite irradiance data  
- Weather forecast integration
- Historical weather normalization

**⚡ Equipment Data**
- SCADA system integration
- Inverter performance metrics
- String-level monitoring data
- Equipment error logs and alarms

**📊 Operational Data**
- Production vs. expected output
- Grid interconnection data
- Maintenance history and costs
- Warranty and compliance records

### Data Processing
{: .fs-6 }

```bash
# Weather normalization example
🤖 | /weather-normalize --site SITE001 --period 2024-01-01:2024-01-31
```

**Key Processing Steps:**
1. **Data Interpolation** - Fill gaps in monitoring data
2. **Weather Normalization** - Adjust for irradiance and temperature  
3. **Quality Validation** - Identify and flag anomalous readings
4. **Historical Correlation** - Compare against baseline performance

---

## 2. Orient: Fault Detection & Diagnostics
{: .fs-7 }

### Pattern Recognition
{: .fs-6 }

**🔍 Fault Detection Algorithms:**
- String performance degradation patterns
- Inverter efficiency decline signatures  
- DC combiner failure indicators
- Tracker alignment drift detection

**🧠 AI-Powered Diagnostics:**
- Equipment-specific failure modes
- Manufacturer error code interpretation
- Historical fault pattern matching
- Root cause analysis automation

### Diagnostic Process
{: .fs-6 }

```bash
# Automated fault detection
🤖 | /fault-detection --equipment inverter --threshold 0.85 --site SITE001

# Specific equipment diagnosis  
🤖 | /diagnose-inverter --inverter-id SMA001 --symptoms "output 15% below expected"
```

**Orient Phase Outputs:**
1. **Fault Classification** - Type, severity, and probable cause
2. **Equipment Impact** - Affected capacity and performance loss
3. **Failure Timeline** - Predicted progression if unaddressed
4. **Warranty Status** - Coverage validation and claim procedures

---

## 3. Decide: Economic Analysis & Prioritization
{: .fs-7 }

### Financial Optimization
{: .fs-6 }

**💰 Energy-at-Risk (EAR) Calculation:**
- Revenue impact of continued degradation
- Energy market price forecasting
- Weather-adjusted production loss
- Time-sensitive repair value

**📊 Cost-Benefit Analysis:**
- Repair costs vs. energy recovery value
- Preventive vs. reactive maintenance costs
- Warranty claim value optimization
- Resource allocation efficiency

### Decision Matrix
{: .fs-6 }

```bash
# Economic dispatch optimization
🤖 | optimize maintenance timing considering weather forecast and energy prices

# Priority-based scheduling
🤖 | /schedule-maintenance --site SITE001 --optimize-for revenue --horizon 30days
```

**Decision Criteria:**
1. **Financial Impact** - Revenue at risk vs. repair costs
2. **Urgency Level** - Time sensitivity and degradation rate
3. **Resource Availability** - Crew schedules and parts inventory
4. **Weather Windows** - Optimal conditions for maintenance
5. **Grid Constraints** - System maintenance windows and curtailment

---

## 4. Act: Work Order Creation & Dispatch Tracking
{: .fs-7 }

### Automated Work Order Generation
{: .fs-6 }

**📝 Intelligent Work Orders:**
- Equipment-specific procedures from manufacturer manuals
- Required tools, parts, and safety equipment lists
- Historical repair time estimates and cost projections
- Photo/video requirements for warranty documentation

**🔧 Technical Instructions:**
- Step-by-step diagnostic procedures
- Manufacturer-specific troubleshooting guides
- Safety protocols and compliance requirements
- Quality control checkpoints and testing procedures

### CMMS Integration
{: .fs-6 }

```bash
# Create and dispatch work order
🤖 | /create-work-order --equipment INV001 --priority high --type "DC combiner replacement"

# Track dispatch progress
🤖 | /track-dispatch --work-order WO123 --technician-id TECH001
```

**Integration Features:**
1. **Work Order Creation** - Automated generation in existing CMMS
2. **Dispatch Optimization** - Route planning and resource allocation
3. **Evidence Capture** - Photo/video requirements for warranty claims
4. **Completion Validation** - Quality control and performance verification
5. **Knowledge Capture** - Lessons learned integration for model improvement

---

## Workflow Visualization

<div class="mermaid">
graph TD
    A[Observe: Data Ingestion] --> B[Weather Normalization]
    A --> C[Equipment Monitoring]
    A --> D[Historical Analysis]
    
    B --> E[Orient: Fault Detection]
    C --> E
    D --> E
    
    E --> F[Pattern Recognition]
    F --> G[Diagnostic Analysis]
    G --> H[Warranty Validation]
    
    H --> I[Decide: Economic Analysis]
    I --> J[Cost-Benefit Calculation]
    J --> K[Priority Matrix]
    K --> L[Resource Optimization]
    
    L --> M[Act: Work Order Generation]
    M --> N[Dispatch Optimization]
    N --> O[Evidence Capture]
    O --> P[CMMS Integration]
    
    P --> Q[Performance Validation]
    Q --> A
    
    style A fill:#e1f5fe
    style E fill:#f3e5f5
    style I fill:#fff3e0
    style M fill:#e8f5e8
</div>

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>

---

## Real-World Example: String Performance Issue

### Observe Phase
{: .fs-6 }
- Monitor detects String 12 underperforming by 18%
- Weather data shows clear skies (no irradiance issue)
- Historical data shows gradual decline over 3 weeks

### Orient Phase  
{: .fs-6 }
- AI diagnostics suggest DC combiner failure
- Pattern matches manufacturer TSB for this combiner model
- Warranty check confirms coverage expires in 45 days

### Decide Phase
{: .fs-6 }
- EAR calculation: $2,400/month revenue loss if unrepaired
- Repair cost estimate: $1,200 parts + $800 labor
- Optimal timing: Schedule within 30 days to preserve warranty

### Act Phase
{: .fs-6 }
- Generate work order with specific combiner part number
- Schedule technician with DC combiner replacement experience
- Include photo requirements for warranty claim documentation
- Validate repair with post-maintenance performance monitoring

**Result: $28,800 annual energy recovery, warranty claim approved, 2-hour repair time vs. 6-hour reactive response.**

---

## Performance Metrics

### Cycle Time Optimization
{: .fs-6 }

| Phase | Traditional O&M | Ona Terminal OODA | Improvement |
|-------|----------------|----------------|-------------|
| **Observe** | Manual inspection (days) | Real-time monitoring (minutes) | 99% faster |
| **Orient** | Expert diagnosis (hours) | AI analysis (minutes) | 95% faster |
| **Decide** | Committee review (days) | Automated optimization (seconds) | 99% faster |
| **Act** | Paper work orders (hours) | Digital dispatch (minutes) | 90% faster |

**Total Cycle Time: 5-10 days → 2-4 hours (95% improvement)**

---

## What's Next?

1. **[Configure Custom Models](loading-models.html)** - Deploy your fine-tuned OODA models
2. **[Explore O&M Use Case](om-use-case.html)** - See complete business implementation
3. **[Master CLI Commands](using-commands.html)** - Execute OODA workflows interactively

[Configure Custom Models](loading-models.html){: .btn .btn-primary }

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