---
title: "AsobaCode CLI"
layout: default
nav_order: 1
---

# AsobaCode CLI

**AI-powered infrastructure automation for your terminal.**

Cut infrastructure costs by 96% while automating DevOps tasks with natural language commands.

---

## Quick Start

Get up and running in 3 steps:

```bash
# 1. Clone and install
git clone https://github.com/AsobaCloud/asoba-code.git
cd asoba-code
pip install -e .

# 2. Configure AWS
aws configure

# 3. Launch interactive mode
asoba-code
```

**Example session:**

```
📊 AsobaCode Status
📁 Config: configs
⏱️  Timeout: 60s
🖥️  Servers: 3 discovered
🐍 Python: 3.10+

🖥️  MCP Servers
Server                    Status    Capabilities
ai-models-server         ✅ running   generate_code, analyze_code, refactor_code
github-server            ✅ running   create_issue, manage_pr, repository_analysis  
code-analysis-server     ✅ running   analyze_complexity, detect_smells, security_scan

💬 AsobaCode Interactive Mode
Type your request or 'help' for assistance.

> create terraform for web app with database

🤖 AI Models Server: Routing to cost-optimized Mistral provider
🔄 Generating Terraform configuration...

✅ Generated: main.tf (247 lines)
✅ Generated: variables.tf (18 lines)
✅ Generated: outputs.tf (12 lines)

💰 Cost: $0.03 (vs $1.20 with Claude-4)
⏱️  Time: 3.2 seconds

Files saved to ./terraform/
```

---

## What AsobaCode Does

🤖 **Generate Infrastructure Code** - Terraform, Kubernetes, Docker configs through natural language  
🔍 **Analyze Code Quality** - Find security issues, technical debt, and optimization opportunities  
🐙 **Manage GitHub Workflows** - Create issues, analyze PRs, automate project management  
💰 **Cost Optimization** - Uses custom AI models to reduce infrastructure automation costs by 96%

---

## Why DevOps Teams Choose AsobaCode

### **Massive Cost Savings**
```
Traditional AI Tools:    $10.00/day for infrastructure tasks
AsobaCode Custom Models: $0.40/day (96% savings)
Annual Savings:          ~$3,500 per engineer
```

### **Works Out of the Box**
```
📊 AsobaCode Status Check
✅ AWS Bedrock: Connected (Claude-4, Llama-4, DeepSeek-R1)
✅ Custom Models: Connected (Mistral-7B-IaC)
✅ GitHub Integration: Ready
✅ Cost Optimization: Active (96% savings)
```

### **Terminal Native**
- Built for developers who live in the command line
- No switching between tools or web interfaces
- Conversational interface like Claude Code

---

## Real-World Examples

### Infrastructure Generation
```
> create highly available web application on AWS with auto-scaling

🔍 Analyzing requirements...
🏗️  Designing 3-tier architecture...
🤖 Generating infrastructure code...

✅ Created:
   └── terraform/
       ├── main.tf              (VPC, ALB, ASG, RDS)
       ├── security-groups.tf   (Least-privilege rules)
       ├── monitoring.tf        (CloudWatch, alerts)
       ├── variables.tf         (Environment configs)
       └── outputs.tf           (Endpoints, IDs)

🛡️  Security: WAF, encryption at rest/transit
📊 Monitoring: CloudWatch dashboards, SNS alerts
💰 Cost: $0.04 (custom model) vs $1.50 (premium AI)
```

### Security Analysis
```
> scan this codebase for security vulnerabilities and create GitHub issues

🔍 Code Analysis Server: Starting security scan...
📁 Scanning 47 Python files, 12 JS files...

⚠️  Found 8 security issues:
   ├── SQL Injection risk in auth/login.py:45
   ├── Hardcoded API key in config/settings.py:12
   ├── XSS vulnerability in templates/user.html:23
   └── ... 5 more issues

🐙 GitHub Integration: Creating issues...
✅ Created issue #156: [Security] SQL Injection in authentication
✅ Created issue #157: [Security] Hardcoded secrets in config
✅ Created issue #158: [Security] XSS prevention needed

📊 Security Score: 6.2/10 (Medium Risk)
💰 Cost: $0.75 (analysis) vs $3.20 (premium AI)
```

### GitHub Workflows
```
> analyze our latest PR and suggest improvements

🐙 Fetching PR #234: "Add user dashboard feature"
📊 Analyzing 15 changed files...

📋 PR Analysis Report:
├── ✅ Code Quality: Good (8.1/10)
├── ⚠️  Test Coverage: 67% (recommend 80%+)
├── 🔒 Security: 2 minor issues found
└── 📈 Performance: Potential N+1 query issue

🤖 Suggested Improvements:
1. Add unit tests for UserDashboard class
2. Fix database query optimization in dashboard.py:89
3. Add input validation for dashboard filters

💬 Comment posted to PR #234
💰 Cost: $0.15 vs $0.85 (premium AI)
```

---

## Cost Comparison

| Task Type | Traditional Tools | AsobaCode | Monthly Savings |
|-----------|------------------|-----------|-----------------|
| Infrastructure tasks (daily) | $300 | $12 | $288 (96%) |
| Security analysis (weekly) | $150 | $22 | $128 (85%) |
| Code reviews (daily) | $90 | $7 | $83 (92%) |
| **Total Monthly** | **$540** | **$41** | **$499 saved** |

---

## Installation

### Prerequisites
- Python 3.10+
- Git
- AWS account (for AI models)

### Install AsobaCode
```bash
git clone https://github.com/AsobaCloud/asoba-code.git
cd asoba-code
pip install -e .
```

### Configure AWS Credentials
```bash
aws configure
# Enter: Access Key, Secret Key, Region (us-east-1)
```

### Launch AsobaCode
```bash
asoba-code
```

**Expected startup:**
```
🚀 AsobaCode CLI v1.0.0
📊 Initializing MCP servers...

✅ AI Models Server: Connected to AWS Bedrock
✅ GitHub Server: Ready (set GITHUB_TOKEN for full features)
✅ Code Analysis Server: Loaded 47 analysis rules

💬 Interactive Mode Active
Type your request or 'help' for commands.

>
```

---

## Optional: Enable 96% Cost Savings

Connect custom AI models for maximum cost reduction:

```bash
# Configure cost-optimized routing
export AI_PROVIDER_STRATEGY="cost_optimized"
export MISTRAL_STATUS_URL="http://your-server:8000/status"

# Verify savings are active
asoba-code
```

**With cost optimization enabled:**
```
✅ Cost Optimization Active
├── Infrastructure tasks → Custom Mistral-7B (96% cheaper)
├── Complex analysis → Premium Bedrock models (quality)
└── Automatic fallback → Ensures reliability

💰 Estimated monthly savings: $498 (96% reduction)
```

---

## Your First Commands

Once in interactive mode, try these:

### Generate Infrastructure
```
> create terraform for simple web application

🤖 Routing to cost-optimized provider...
✅ Generated complete Terraform configuration
💰 Cost: $0.03 vs $1.20 premium
```

### Analyze Code
```
> analyze this Python project for technical debt

🔍 Scanning codebase...
📊 Technical Debt Score: 7.2/10
⚠️  Found 12 improvement opportunities
```

### GitHub Integration
```
> create GitHub issues for the problems you found

🐙 Creating prioritized issues...
✅ Created 5 issues with detailed descriptions
🏷️  Tagged with: technical-debt, priority-medium
```

---

## Next Steps

- **[Learn Core Concepts](sdk.html)** - Understand how AsobaCode works
- **[Command Reference](endpoints.html)** - See all available commands
- **[Custom Models Setup](custom-model-integration.html)** - Maximum cost savings (advanced)
- **[Team Integration](mcp-server-development.html)** - Scale across your team

---

## Get Help

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>Questions? We're here to help.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
      <a href="https://discord.gg/nNV5evcr" target="_blank" class="support-button" style="margin-top: 10px; display: inline-block;">
        <svg width="16" height="16" style="margin-right: 8px; vertical-align: middle;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Join Discord
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