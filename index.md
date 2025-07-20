---
title: "Introduction"
layout: default
nav_order: 1
---

## Getting Started {#getting-started}

Welcome to the Ona API Platform! Here's how you can get started with onboarding and integrating our powerful API into your systems.  You have the option of accessing Ona's capabilities via our On-Demand web app, or by embedding the API directly within your own technology stack.

---

### Onboarding: On-Demand Web App {#onboarding-web-app}

- **Register For Account**: [https://app.asoba.co](https://app.asoba.co)

---

### Onboarding: API Integration {#onboarding-api-integration}

![Onboarding Process]({{ site.baseurl }}/assets/images/onboarding.svg){:width="70%"}

- **Initial Consultation**: We'll meet with you to identify your specific use cases, whether it's load forecasting, data interpolation, or dispatch optimization.
- **Technical Assessment**: Our team will evaluate your current data infrastructure, input formats, and data availability.
- **Data Requirement Checklist**: We'll share a detailed checklist of data types, formats, and necessary columns.

### API Pre-Onboarding {#API-Pre-Onboarding}

- **Schema Alignment**: We'll confirm data schemas for your inverters, meters, or other devices to ensure compatibility with Asoba's preprocessing layer.
- **Data Preparation**: We'll build the integration points and confirm workflow to embed our API within your existing system.

### API Configuration and Integration {#api-configuration}

- **Data Globbing**: We'll tune the training model to fit your data based on your workflow needs.
- **Integration Options**: You can choose from flexible integration methods, including push/pull requests, JSON streams, or direct CSV uploads.
- **API Credentials**: We'll provide you with API keys and client-specific authentication tokens.

### Testing and Validation {#testing-validation}

- **Pilot Testing**: We'll run the unit and test the system to validate data ingestion, preprocessing, and model accuracy.
- **Error Handling**: We'll address and resolve any issues detected such as schema mismatches, missing data, or integration bugs.

### Training and Support {#training-support}

- **Training Sessions**: We'll conduct walkthroughs of API usage, including generating requests, understanding outputs, and troubleshooting common issues.
- **Documentation Access**: You'll have access to comprehensive API guides, sample scripts, and FAQs.
- **Dedicated Support**: A point of contact will be assigned for your technical and operational queries during the integration phase.

### Deployment and Monitoring {#deployment-monitoring}

- **Go-Live Readiness**: We'll validate your readiness to transition from pilot to full commercial model.
- **Real-Time Monitoring**: We'll set up systems for performance tracking and alerts for anomalies or API failures.
- **Usage Analytics**: We'll share insights on API usage to help you optimize your workflows.

---

> This product is currently in beta, so endpoint parameters and syntax are subject to change.  An API Key is also required to make successful requests via these API endpoints.  Try out the ecosystem via the On-Demand web app, or [connect with our sales team](mailto:sales@asoba.co) to get started with API access 

![Architecture diagram of API's](https://staging-internal.asoba.co/api-architecture.png){:width="75%"}

---

### Key Use Cases

- **Energy Traders**: Leverage accurate demand forecasts to optimize trades in electricity markets, maximize returns, and reduce cost of over/under supplying contracts.
- **IPPs**: Enhance generation scheduling and support demand response efforts by using our forecasting models to predict production output and off-taker demand.
- **Bulk Buyers/Resellers**: Predict market trends and align purchasing strategies with anticipated demand surges, avoiding high market prices and reducing costs.
- **Solar Asset Insurers**: Utilize forecasting data to enhance preventive maintenance reporting for asset owners, improving reliability and reducing unexpected downtime.
- **Carbon Accounting Firms**: Integrate forecasting data into carbon emissions calculations for regulatory compliance and reporting, ensuring accurate and timely submissions.

---

Key features include:
- Region-specific deployments for data sovereignty and latency optimization.
- Standardized workflows for data interpolation, ingestion, and forecasting.
- Custom integrations for tailored client workflows.
- Developer best practices for consistent delivery.
- RAG knowledge base for enhanced AI capabilities.
- Client SDKs for seamless API integration.

For more details, refer to the [README](README.md).

---

## YouTube Channel

Stay updated with our latest videos and tutorials on our YouTube channel:

<div>
  <a href="https://www.youtube.com/@asobacleanenergy" target="_blank">
    <img src="{{ site.baseurl }}/assets/images/youtube_banner.png" alt="Asoba YouTube Channel" style="width: 50%; max-width: 700px; display: block; margin: 0 0;">
  </a>
</div>

<div style="text-align: left; margin: 15px 0 25px 0;">
  <a href="https://www.youtube.com/@asobacleanenergy?sub_confirmation=1" target="_blank" style="display: inline-block; background-color: #FF0000; color: white; font-weight: 600; padding: 8px 20px; border-radius: 4px; text-decoration: none; font-size: 14px;">Subscribe to our Channel</a>
</div>

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
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
 
