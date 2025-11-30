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

## 3. Onboarding Setup
{: #3-onboarding-setup }

The data you provide during onboarding enables our AI platform to deliver powerful insights and automation capabilities. By connecting your energy assets and historical performance data, we can:

- **Predict Energy Production**: Forecast solar generation with high accuracy, enabling better grid integration and energy trading decisions
- **Detect Anomalies Early**: Identify equipment faults and performance degradation before they impact revenue, reducing downtime and maintenance costs
- **Optimize Maintenance**: Schedule proactive maintenance based on predictive analytics rather than reactive repairs, maximizing asset uptime
- **Enable Automated Decision-Making**: Use the OODA (Observe, Orient, Decide, Act) workflow to automatically respond to changing conditions and optimize operations
- **Provide Cross-Asset Visibility**: Gain unified insights across your entire portfolio, identifying patterns and opportunities that individual site monitoring cannot reveal

The quality and completeness of your data directly impacts the accuracy and value of these AI-driven capabilities. Our platform works with data from SCADA systems, EMS platforms, OEM portals, and weather services to build comprehensive models of your energy assets.

Want to explore onboarding further? <a href="mailto:sales@asoba.co?subject=Onboarding%20Inquiry" class="support-button">Contact Sales</a>

---

## 4. Technical Support
{: #4-technical-support }

### During PoC
- **Technical Support**: support@asoba.co
- **Sales Contact**: Your designated account manager
- **Documentation**: https://docs.asoba.co

### Post-Commercial Deployment
- **Tier 1 Support**: 24/7 system monitoring
- **Escalation**: Direct technical engineering support
- **Regular Reviews**: Quarterly business reviews

---

## 5. Data Governance & Security
{: #5-data-governance--security }

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

© 2025 Asoba Corporation. All rights reserved.
