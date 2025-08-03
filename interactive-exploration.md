---
title: "Interactive Exploration"
layout: default
nav_order: 3
---

# Interactive Exploration

Learn how to use AsobaCode effectively through hands-on interaction.

---

## Using / Commands (Interactive Mode) {#using-commands}

Master AsobaCode's interactive CLI with slash commands and examples.

### Getting Started

Launch interactive mode:
```bash
asoba-code
```

You'll see the interactive prompt:
```
🤖 | 
```

### Essential Commands

**System Commands:**
```bash
# Show all available commands
🤖 | /help

# List all slash commands
🤖 | /commands

# Check system status and model availability
🤖 | /status

# Show available AI models
🤖 | /models

# Exit the CLI
🤖 | /exit
```

**Code Generation:**
```bash
# Generate code with natural language
🤖 | generate a python function that reads CSV files
🤖 | create a terraform module for AWS S3 bucket
🤖 | write unit tests for my authentication function

# Generate with specific complexity
🤖 | /generate --complexity high --language rust "HTTP client with retry logic"
```

**Custom Model Commands:**
```bash
# Use specific fine-tuned model
🤖 | /model mistral-policy-analysis "analyze economic impact of solar policy"

# Use IaC specialized model
🤖 | /model mistral-iac-generation "create terraform for multi-AZ deployment"

# Use Qwen Claude-MD model for complex reasoning
🤖 | /model qwen-claude-md "complex architectural design with CLAUDE.md methodology"
```

---

## Understanding Agents {#agentic-workflow}

Learn how agents work in AsobaCode and how to create custom single-use agents.

### What Are Agents?

Agents in AsobaCode are **specialized AI components** that perform specific tasks. Each agent follows the **single responsibility principle** - doing one thing well.

### Types of Agents

**1. Built-in Agents:**
```bash
# Code generation agent
🤖 | /generate "python function to parse JSON"

# Documentation agent
🤖 | /docs "explain AWS Lambda best practices"

# Analysis agent
🤖 | /analyze "review this terraform module for security issues"
```

**2. Model-Specific Agents:**
```bash
# Use a specific model as an agent
🤖 | /model claude-3-sonnet "complex reasoning task"
🤖 | /model mistral-7b "generate infrastructure code"
```

**3. Custom Single-Use Agents:**
```bash
# Define your own agent for specific workflows
🤖 | /agent create data-validator --task "validate CSV format"
🤖 | /agent create cost-analyzer --task "analyze AWS spending"
```

### Creating Custom Agents

**Agent Definition:**
```yaml
# custom-agents.yaml
agents:
  log-analyzer:
    description: "Analyzes application logs for errors"
    model: "claude-3-haiku"
    system_prompt: "You are a log analysis expert..."
    
  api-tester:
    description: "Tests API endpoints and reports issues"
    model: "mistral-7b"
    system_prompt: "You test APIs systematically..."
```

**Using Custom Agents:**
```bash
# Invoke custom agent
🤖 | /log-analyzer --file app.log --severity error

# Chain agents together
🤖 | /api-tester --endpoint /users | /log-analyzer
```

### Agent Orchestration

Agents can work together in workflows:

```bash
# Sequential execution
🤖 | /analyze code.py > /generate tests > /validate

# Parallel execution
🤖 | /parallel --agents "analyzer,linter,security-scan" --target src/

# Conditional execution
🤖 | /if-error /analyze > /debug > /fix
```

---

## Loading Bedrock & Custom Models {#loading-models}

Configure AWS Bedrock and deploy custom fine-tuned models.

### AWS Bedrock Configuration

**Recommended Models:**
- **Amazon Nova Pro** - Primary model for best availability
- **Amazon Nova Lite** - Fast fallback option

**Setup Process:**
Configure AWS credentials and region for Bedrock access. AsobaCode will automatically detect available models in your region.

### Custom Fine-Tuned Models

**Available Models (from deployments):**

**🎯 Mistral Policy Analysis (7B):**
```bash
# Deploy model
🤖 | /deploy-model --name mistral-policy-analysis --instance g5.2xlarge

# Use for analysis
🤖 | /model mistral-policy-analysis "economic impact analysis of renewable energy policy"
```

**🏗️ Mistral Infrastructure-as-Code (7B):**
```bash
# Deploy model
🤖 | /deploy-model --name mistral-iac-generation --instance g5.2xlarge

# Generate infrastructure
🤖 | /model mistral-iac-generation "terraform module for secure multi-region deployment"
```

**🧠 Qwen Claude-MD (14B):**
```bash
# Deploy larger model
🤖 | /deploy-model --name qwen-claude-md --instance g5.4xlarge

# Complex reasoning tasks
🤖 | /model qwen-claude-md "architectural design following CLAUDE.md explore-plan-code-commit methodology"
```

### Model Deployment Commands

**Check Model Availability:**
```bash
# List deployed models
🤖 | /models --deployed

# Check model health
🤖 | /model-health --all

# Show deployment status
🤖 | /deployment-status
```

**Deploy Custom Models:**
```bash
# Deploy single model
🤖 | /deploy --model mistral-policy-analysis --instance g5.2xlarge

# Deploy unified Mistral (60% cost savings)
🤖 | /deploy --unified mistral-dual --instance g5.2xlarge

# Scale model deployment
🤖 | /scale --model qwen-claude-md --instances 2
```

### Cost Optimization Strategies

**Unified Deployment (60% savings):**
```bash
# Deploy both Mistral models on single instance
🤖 | /deploy --unified mistral-dual
# Result: IaC + Policy models sharing base Mistral-7B
```

**Instance Sizing:**
```bash
# Cost-effective for Mistral models
🤖 | /deploy --model mistral-iac-generation --instance g4dn.xlarge

# Performance-optimized for Qwen
🤖 | /deploy --model qwen-claude-md --instance g5.4xlarge
```

---

## What's Next?

1. **[See Real-World Implementation](om-use-case.html)** - Complete O&M business case
2. **[Technical Setup](quick-launch.html#developers)** - 5-minute developer setup
3. **[Business Value](quick-launch.html#business-users)** - Understanding ROI and benefits

[Explore O&M Use Case](om-use-case.html){: .btn .btn-primary }

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