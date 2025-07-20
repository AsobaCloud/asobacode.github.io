---
title: "Ona On-Demand"
layout: default
nav_order: 4
---

## Getting Started with Ona On-Demand {#getting-started-with-ona-on-demand}

Welcome to Ona On-Demand—your comprehensive web app for navigating complex energy policies and managing grid operations with ease. This guide will help you get started quickly, understand best practices for interacting with the app, and explore key features.

To use the Ona On-Demand app, you must first [log in here](https://app.asoba.co), and then provide billing for the subscription and features that fit your use case.

---

## Ona Policy Analyst {#ona-policy-analyst}

Ona's policy analyst is an AI-driven chatbot designed to provide real-time, accurate, and actionable insights on climate policies, energy laws, and market-related questions. Whether you need compliance guidance, regulatory insights, or help understanding legal routes for maximizing value of renewable assets, our chatbot is here to assist—ensuring you make informed decisions quickly.

![Ona Policy Analyst Preview]({{ site.baseurl }}/assets/images/bg_preview.gif){:width="50%"}

### Features & Benefits:

- **AI-Enhanced Policy Querying**
  - *Feature*: NLP-driven chatbot for instant retrieval and summarization of complex policy documents.
  - *Benefit*: Accelerates regulatory compliance, reduces risk, and streamlines policy interpretation.

- **Comprehensive Policy Knowledgebase**
  - *Feature*: Continuous, automated updates from government databases, covering U.S. (DOE, EPA, FERC) and South African (DMRE, NERSA, Eskom Grid Codes) regulations.
  - *Benefit*: Ensures highly accurate and relevant policy insights for compliance and strategic planning.

## How Can Ona Policy Analyst Help You?

Ona policy analyst is designed to support a variety of users, including:

| Key Players | How the Policy Analyst Helps |
|-------------|------------------------------|
| Renewable Asset Owners | Get details on tax incentives, subsidies, and permitting requirements for solar and wind farms. |
| Independent Power Producers (IPPs) | Learn about licensing, auction processes, and market participation in energy trading. |
| Private Electricity Trading Companies | Stay compliant with regulations for energy markets and power purchase agreements. |
| Municipal Grid Operators | Understand grid modernization policies, resilience planning, and regulatory compliance. |
| Environmental & Policy Consulting Firms | Access climate policy updates and environmental compliance requirements. |
| Climate Tech Companies | Discover funding opportunities, carbon credit regulations, and market trends. |
| Renewable Energy Investors | Assess regulatory risks, incentives, and market conditions to inform investment decisions. |
| Academia & Researchers | Access the latest energy trends, case studies, and historical regulatory changes for research and publications. |

## Get the Best Answers from Ona Policy Analyst (Prompt Guide)

To get the most relevant and accurate responses, follow these simple guidelines when crafting your prompts:

### Prompt Best Practices

- **Be Specific**: Instead of "Tell me about data privacy," ask "What are the GDPR requirements for storing customer data?"
- **Provide Location & Context**: If your question relates to a specific region or industry, include that detail (e.g., "How does California's CCPA differ from GDPR?").
- **Use Keywords**: Highlight important terms like "tax deductions for freelancers" rather than "tax savings."
- **Ask Step-by-Step Questions**: Break down complex queries into separate steps for clarity.

### Other Prompt Suggestions

- "What are the key permitting challenges for utility-scale solar projects in the U.S.?"
- "What are the compliance requirements for FERC Order 2222?"
- "What funding is available for municipal grid modernization projects?"

## Common Questions & Quick Answers

1. **How accurate is the chatbot's information?**  
   The chatbot sources information from trusted databases and policy documents, ensuring high accuracy. However, always verify with official sources for legally binding decisions.

2. **Can I request specific policy documents?**  
   Yes! You can email us at info@asoba.co with a subject line that includes "Data Request" to ask for summaries or direct references to official documentation where available.

3. **What if I get an incomplete or unclear response?**  
   Try rephrasing your question with more context or detail. Additionally, view our prompt guide for details on structuring your queries effectively.

---

## Grid Operations {#grid-operations}

### Overview
The Ona On-Demand app also contains grid operations and load forecasting features, designed to provide comprehensive insights for municipal grid operators, metering companies, and IPPs into network structures, load profiles, and energy resource management.

![Minigrid Network Operations]({{ site.baseurl }}/assets/images/network-ops.gif){:width="50%"}

### Grid Operations Capabilities

#### 1. Comprehensive Network Representation
The tool offers a robust network hierarchy system that:
- Represents both existing and planned network structures
- Spans multiple levels of network topology:
  - Feeder T-off (sub-feeder level)
  - Substation busbar
  - Main transmission substation
  - Regional (Eskom Operating Unit) level
  - National network integration

#### 2. Advanced Network Topology Management
Key topology features include:
- Dynamic parent-child node associations
- Flexible node composition (supporting both loads/DER and child nodes)
- Multiple load/DER portion support per category
- Unique element identifiers aligned with Network Information System (NIS) standards

### Load and Distributed Energy Resource (DER) Analysis

#### 3. Comprehensive Profiling
The system provides in-depth load and DER modeling:
- Integrated load and distributed generation profiles
- Support for variable renewable energy
- Detailed modeling of:
  - Battery storage systems
  - Electric vehicle integration
  - Energy efficiency tracking
  - Demand Side Management capabilities

#### 4. Granular Forecasting Capabilities
Powerful forecasting tools enable:
- Geographic and profile-based load/DER representations
- Customer-level modeling with network-wide summation
- Detailed resource profiling:
  - Load profiles
  - Generation profiles
  - Renewable resource tracking (wind, solar)
  - Battery charging and discharging cycle analysis

#### 5. Intuitive Navigation and Visualization
Enhanced user experience with:
- Comprehensive network hierarchy navigation
- Manual and automatic zoom functionality
- Detailed element information display
- Load/DER portion breakdown views
- Intelligent search capabilities for network elements

#### 6. Comprehensive Editing Tools
Powerful management features:
- Create and modify network elements
- Link and unlink GIS polygon loads/DER
- Edit load/DER portion details
- Visual status indicators for calculation states

### Key Benefits
- Holistic network and resource modeling
- Detailed forecasting capabilities
- Flexible and intuitive user interface
- Comprehensive energy resource tracking

---

## On-Demand Model Training {#on-demand-model-training}

### Overview
This feature allows researchers, individuals, and smaller scale IPPs to upload CSV interval data and train models or generate one-off forecasts on the fly.

![Ona On-Demand Model Training]({{ site.baseurl }}/assets/images/on-demand-api.gif){:width="50%"}

### Getting Started
1. **Subscribe and Obtain API Key**: Once you subscribe, head to Settings to get your API key. You'll need this to run queries.
2. **Obtain Interval Data**: Ensure you have a minimum of 12 months of data (preferably 36 months for highest accuracy). Data should be in intervals of at most 60 minutes (minimum of 8760 rows for 12 months). A built-in interpolation feature is on the roadmap to handle gaps due to inverter faults or poor cell service.
3. **Input Data into the 'Train' Tab**: Once model training is complete, results will be delivered via email.
4. **Use the 'Inference' Tab**: With a trained model, use the 'Inference' tab to generate one-off forecasts for the site/device you trained against. Input the target forecasting window (1 day ahead or 1 week ahead), API key, and location.

In both tabs, you will see both API response data and backend logs to track progress.

### Supported Inverter OEMs/Meter Data Providers

| Provider       | Device Type  |
|----------------|--------------|
| Lux            | Inverter     |
| Solarman       | Inverter     |
| Macrocomm      | Smart Meter  |
| Switch Energy  | Data Logger  |
| Utility API    | Smart Meter  |
| SolarEdge      | Inverter     |

Don't see your OEM?  [Let us know](mailto:support@asoba.co) and we can add it!

### Key Features
- **CSV Data Upload**: Seamlessly upload interval data for immediate processing.
- **Model Training**: Train forecasting models on-demand with uploaded data.
- **One-Off Forecasts**: Generate forecasts quickly without long-term commitments.

#### Data Ingestion
- You can upload historical data for individual inverters or smart meters.
- The system ideally uses five years of data with 30-minute or 60-minute intervals.
- If sufficient historical data isn't available, the system can use interpolation or digital twins to create synthetic datasets for initial training.

#### Forecasting
- The app generates day-ahead forecasts using data from the last seven days.
- Forecasts provide either 30-minute or 60-minute intervals for the next 24 hours.
- This accurate day-ahead forecasting is crucial for energy trading and allocation decisions.

#### Scheduled Processing
- The system can set up a scheduled process to regularly ingest data.
- It generates daily forecasts on a rolling basis for each demand or production point.
- This automation allows for consistent updating of forecasts without manual intervention.

#### Data Storage
- Processed data is stored in a data lake, typically an S3 bucket.
- The results are saved as CSV files that users can access.
- This storage method allows for easy retrieval and analysis of historical forecasts.

#### Flexible Data Retrieval
- The system offers multiple options for data retrieval.
- Data can be included in the API response for immediate access.
- Alternatively, the system can automatically push data to a location of your choice once it's ready.

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>We're constantly improving and want you to be a part of shaping the future of energy policy access and decision-making. If you encounter issues or have suggestions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
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