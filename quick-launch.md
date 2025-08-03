---
title: "Quick Launch Guide"
layout: default
nav_order: 2
---

# Quick Launch Guide

Choose your path based on your role and goals.

---

## Developers (5-minute setup) {#developers}

Get AsobaCode running with Amazon Nova Pro models and throttling resistance.

### Prerequisites

✅ **AWS credentials** with Bedrock access  
✅ **Python 3.10+** and **Git** installed  
✅ **Terminal/Command Line** environment

### Installation & Setup

**Step 1: Install AsobaCode (2 minutes)**

```bash
# Clone repository
git clone https://github.com/AsobaCloud/asoba-code.git
cd asoba-code

# Install with automatic PATH setup
./install.sh

# Reload shell configuration
source ~/.bashrc  # or ~/.zshrc, or restart terminal
```

**Step 2: Configure AWS (2 minutes)**

```bash
# Configure AWS credentials
aws configure
# Enter: Access Key ID, Secret Access Key, Region (us-east-1)

# Test Nova Pro model (recommended for best availability)
aws bedrock invoke-model \
  --model-id amazon.nova-pro-v1:0 \
  --body '{"messages":[{"role":"user","content":[{"text":"test"}]}],"inferenceConfig":{"max_new_tokens":10}}' \
  --region us-east-1 \
  --cli-binary-format raw-in-base64-out
```

### Immediate CLI Validation (1 minute)

```bash
# Launch interactive mode
asoba-code

# Run validation commands
🤖 | /help
🤖 | /commands
🤖 | generate a python function that calculates fibonacci numbers
```

---

## Business Users {#business-users}

Transform reactive operations into proactive intelligence with industry-specific AI.

### Why AsobaCode: Reactive vs. Proactive O&M

**Traditional operations management is reactive:**
- Equipment fails → scramble to fix → high MTTR
- Unplanned downtime costs $50,000+ per hour
- Manual diagnostics delay proper repairs
- Warranty claims often missed due to poor documentation

**AsobaCode transforms operations into proactive intelligence:**

| Reactive Approach | AsobaCode Proactive |
|------------------|-------------------|
| 🔴 Equipment fails unexpectedly | 🟢 AI predicts failures 2-4 weeks early |
| 🔴 Manual diagnosis (hours/days) | 🟢 Automated fault detection (minutes) |
| 🔴 Generic repair procedures | 🟢 Equipment-specific action plans |
| 🔴 Lost warranty claims | 🟢 Automated warranty validation |
| 🔴 High MTTR (8-24 hours) | 🟢 Reduced MTTR (2-4 hours) |

**Result: 40-60% reduction in operational costs, 75% reduction in unplanned downtime.**

### Industry-Specific AI Advantage

**BloombergGPT Example:**
Bloomberg trained a 50B parameter model specifically for finance. Results vs. general LLMs:
- **50% better** accuracy on financial tasks
- **3x faster** processing of domain-specific queries  
- **90% fewer** hallucinations on technical financial concepts

**AsobaCode's Fine-Tuned Models:**

🔹 **Mistral Policy Analysis Model (7B)**
- Fine-tuned for economic, regulatory, social, environmental analysis
- Specialized endpoints: /analyze/economic, /analyze/regulatory
- Training loss: 0.45 over 3 epochs

🔹 **Mistral Infrastructure-as-Code Model (7B)**  
- Specialized for Terraform, Kubernetes, Docker generation
- Endpoints: /generate/terraform, /generate/kubernetes, /generate/docker
- Optimized for infrastructure deployment tasks

🔹 **Qwen Claude-MD Model (14B)**
- 14B parameter model with CLAUDE.md methodology integration
- Advanced reasoning capabilities for complex tasks
- Configurable deployment options (g5.2xlarge to g5.8xlarge)

**Domain-specific fine-tuned models deliver superior performance for specialized tasks.**

### Next Steps

1. **[See the Full O&M Use Case](om-use-case.html)** - Detailed business problem and solution
2. **[Schedule Enterprise Demo](mailto:sales@asoba.co?subject=AsobaCode%20Enterprise%20Demo)** - Custom deployment discussion
3. **[Technical Implementation](#developers)** - Share with your engineering team

[Talk to Sales](mailto:sales@asoba.co?subject=AsobaCode%20Enterprise%20Demo){: .btn .btn-primary .fs-5 }

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