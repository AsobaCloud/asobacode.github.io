---
title: "Using / Commands (Interactive Mode)"
layout: default
nav_order: 4
---

# Using `/` Commands (Interactive Mode)
{: .fs-8 }

Master Ona Terminal's interactive CLI with slash commands and examples.
{: .fs-6 .fw-300 }

---

## Getting Started

Launch interactive mode:
```bash
ona-terminal
```

You'll see the interactive prompt:
```
🤖 | 
```

Type any command or natural language request.

---

## Essential Commands

### System Commands
{: .fs-6 }

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

### Code Generation
{: .fs-6 }

```bash
# Generate code with natural language
🤖 | generate a python function that reads CSV files
🤖 | create a terraform module for AWS S3 bucket
🤖 | write unit tests for my authentication function

# Generate with specific complexity
🤖 | /generate --complexity high --language rust "HTTP client with retry logic"
🤖 | /generate --complexity low --language python "hello world function"
```

---

## O&M Specific Commands

### Inverter Operations
{: .fs-6 }

```bash
# Upload inverter data for analysis
🤖 | /upload-inverter upload --file inverter_data.csv --site-id SITE001

# Check upload status
🤖 | /upload-inverter status --job-id abc123

# Start forecasting analysis
🤖 | /forecast-inverter start --site-id SITE001 --horizon 30days

# Get forecast results
🤖 | /forecast-inverter get --forecast-id xyz789

# Generate maintenance recommendations
🤖 | /diagnose-inverter --inverter-id INV001 --symptoms "low output, error code E042"
```

### Data Analysis Commands
{: .fs-6 }

```bash
# Weather data normalization
🤖 | /weather-normalize --data-file production.csv --location "Phoenix, AZ"

# Performance analysis
🤖 | /performance-analysis --site SITE001 --start 2024-01-01 --end 2024-01-31

# Fault detection
🤖 | /fault-detection --equipment inverter --data-source scada --threshold 0.85
```

---

## Error Management & Troubleshooting

### Error Handling Commands
{: .fs-6 }

```bash
# Show recent errors
🤖 | /errors recent

# Get detailed error information
🤖 | /error-detail --error-id ERR123

# Retry failed operations
🤖 | /retry --job-id abc123

# Clear error logs
🤖 | /errors clear
```

### Debugging Commands
{: .fs-6 }

```bash
# Show verbose logs
🤖 | /debug on

# Test model connectivity
🤖 | /test-models

# Show cache statistics
🤖 | /cache-stats

# Clear availability cache
🤖 | /cache-clear

# Show circuit breaker status
🤖 | /circuit-breaker status
```

---

## Advanced Features

### Model Selection
{: .fs-6 }

```bash
# Use specific model for generation
🤖 | /model amazon.nova-pro-v1:0 "generate Python code for data validation"

# Switch default model
🤖 | /set-model amazon.nova-lite-v1:0

# Compare outputs from different models
🤖 | /compare-models "write a sorting algorithm" --models nova-pro,claude-sonnet
```

### Configuration Commands
{: .fs-6 }

```bash
# Show current configuration
🤖 | /config show

# Update configuration
🤖 | /config set provider.bedrock.default_model amazon.nova-lite-v1:0

# Reset to defaults
🤖 | /config reset

# Save current session configuration
🤖 | /config save --name my-setup
```

---

## Command Examples by Use Case

### Solar Site Analysis
{: .fs-6 }

```bash
# Complete site health check
🤖 | analyze solar site performance for SITE001 over the last 30 days

# Equipment-specific diagnostics
🤖 | /diagnose-inverter --inverter-id SMA001 --symptoms "output 15% below expected"

# Weather impact analysis
🤖 | compare actual vs weather-normalized performance for January 2024
```

### Maintenance Planning
{: .fs-6 }

```bash
# Generate maintenance schedule
🤖 | create preventive maintenance schedule for 50MW solar site

# Economic dispatch optimization
🤖 | optimize maintenance timing considering weather forecast and energy prices

# Warranty validation
🤖 | /warranty-check --equipment-id INV001 --failure-type "DC combiner fault"
```

### Report Generation
{: .fs-6 }

```bash
# Monthly performance report
🤖 | generate monthly performance report for SITE001 January 2024

# Compliance documentation
🤖 | /compliance-report --standard NERC --site SITE001 --period Q1-2024

# Executive summary
🤖 | create executive summary of site performance and recommendations
```

---

## Tips for Effective Usage

### Natural Language Best Practices
{: .fs-6 }

✅ **Good**: "Generate Python code to parse solar inverter CSV data with error handling"  
❌ **Vague**: "Write code"

✅ **Good**: "Analyze inverter INV001 performance drop of 20% since last week"  
❌ **Vague**: "Check inverter"

### Command Chaining
{: .fs-6 }

```bash
# Chain operations for complex workflows
🤖 | /upload-inverter upload --file data.csv && /analyze-performance --auto-report
```

### Getting Help
{: .fs-6 }

```bash
# Get help for specific commands
🤖 | /help upload-inverter
🤖 | /help forecast-inverter

# Show command examples
🤖 | /examples fault-detection
```

---

## What's Next?

1. **[Understand Agentic Workflows](agentic-workflow.html)** - Learn the OODA loop process
2. **[Configure Custom Models](loading-models.html)** - Add your fine-tuned models
3. **[Explore O&M Use Case](om-use-case.html)** - See real-world applications

[Learn Agentic Workflows](agentic-workflow.html){: .btn .btn-primary }

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