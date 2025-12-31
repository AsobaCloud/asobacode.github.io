---
title: "CLI Tools"
layout: default
nav_order: 7
---

# CLI Tools Documentation

Complete documentation for the Ona Terminal CLI commands and utilities.

## Overview

The Ona Terminal CLI provides a comprehensive command-line interface for energy asset management, forecasting, and automation. This section covers all available commands, their usage, and quick reference guides.

## Command Structure

```bash
ona <command> <subcommand> [options] [arguments]
```

### Global Options

```bash
--api-key KEY          API key for authentication
--region REGION        AWS region (default: af-south-1)
--environment ENV      Environment (dev, staging, prod)
--verbose              Enable verbose output
--debug                Enable debug mode
--config FILE          Configuration file path
--help                 Show help for command
```

## Core Commands

### Data Management

#### Upload Data

```bash
# Upload historical data
ona upload historical \
  --file FILE \
  --customer-id ID \
  --manufacturer MANUFACTURER \
  --location LOCATION \
  [--region REGION]

# Upload real-time data
ona upload nowcast \
  --customer-id ID \
  --data DATA \
  --timestamp TIMESTAMP \
  [--region REGION]

# Upload with custom options
ona upload historical \
  --file data.csv \
  --customer-id solar-farm-001 \
  --manufacturer SolarEdge \
  --location CapeTown \
  --region af-south-1 \
  --validate \
  --compress
```

#### List Data

```bash
# List all datasets for a customer
ona data list \
  --customer-id ID \
  [--format FORMAT] \
  [--limit LIMIT]

# Get dataset details
ona data info \
  --dataset-id ID \
  [--include-metadata]

# Search datasets
ona data search \
  --query QUERY \
  --customer-id ID \
  [--date-from DATE] \
  [--date-to DATE]
```

#### Manage Data

```bash
# Delete dataset
ona data delete \
  --dataset-id ID \
  [--force]

# Export dataset
ona data export \
  --dataset-id ID \
  --format FORMAT \
  --output FILE

# Validate dataset
ona data validate \
  --dataset-id ID \
  [--fix-issues]
```

### Model Management

#### Train Models

```bash
# Train forecasting model
ona train \
  --customer-id ID \
  --location LOCATION \
  --manufacturer MANUFACTURER \
  --serial-number SERIAL \
  [--model-type TYPE] \
  [--hyperparameters FILE] \
  [--testing]

# Train with custom parameters
ona train \
  --customer-id solar-farm-001 \
  --location CapeTown \
  --manufacturer SolarEdge \
  --serial-number SE123456 \
  --model-type lstm \
  --hyperparameters config/hyperparams.yaml \
  --testing
```

#### List Models

```bash
# List trained models
ona models list \
  --customer-id ID \
  [--status STATUS] \
  [--model-type TYPE] \
  [--format FORMAT]

# Get model details
ona models info \
  --model-id ID \
  [--include-metrics] \
  [--include-parameters]
```

#### Manage Models

```bash
# Delete model
ona models delete \
  --model-id ID \
  [--force]

# Export model
ona models export \
  --model-id ID \
  --format FORMAT \
  --output FILE

# Compare models
ona models compare \
  --model-ids ID1,ID2 \
  [--metrics METRICS]
```

### Forecasting

#### Generate Forecasts

```bash
# Generate forecast
ona forecast \
  --customer-id ID \
  --horizon HOURS \
  [--model-type TYPE] \
  [--model-id ID] \
  [--output-format FORMAT]

# Generate with custom parameters
ona forecast \
  --customer-id solar-farm-001 \
  --horizon 24 \
  --model-type lstm \
  --model-id model-123 \
  --output-format json
```

#### List Forecasts

```bash
# List forecasts
ona forecasts list \
  --customer-id ID \
  [--status STATUS] \
  [--date-from DATE] \
  [--date-to DATE] \
  [--format FORMAT]

# Get forecast details
ona forecasts get \
  --forecast-id ID \
  [--include-data] \
  [--include-metrics]
```

#### Manage Forecasts

```bash
# Delete forecast
ona forecasts delete \
  --forecast-id ID \
  [--force]

# Export forecast
ona forecasts export \
  --forecast-id ID \
  --format FORMAT \
  --output FILE

# Validate forecast
ona forecasts validate \
  --forecast-id ID \
  [--actual-data FILE]
```

### System Commands

#### Status and Health

```bash
# Check system status
ona status \
  [--detailed] \
  [--include-metrics]

# Health check
ona health \
  [--endpoint ENDPOINT] \
  [--timeout TIMEOUT]

# Version information
ona version \
  [--detailed]
```

#### Configuration

```bash
# Configure CLI
ona configure \
  --api-key KEY \
  [--region REGION] \
  [--environment ENV]

# List configuration
ona configure --list

# Reset configuration
ona configure --reset

# Validate configuration
ona configure --validate
```

#### Logging and Debug

```bash
# Set log level
ona logging \
  --level LEVEL \
  [--file FILE]

# View logs
ona logs \
  [--lines LINES] \
  [--follow] \
  [--filter FILTER]

# Debug mode
ona debug \
  --command COMMAND \
  [--args ARGS]
```

## Quick Reference

### Common Patterns

```bash
# Upload and train workflow
ona upload historical --file data.csv --customer-id farm-001 --manufacturer SolarEdge --location CapeTown
ona train --customer-id farm-001 --location CapeTown --manufacturer SolarEdge --serial-number SE123456
ona forecast --customer-id farm-001 --horizon 24

# Batch operations
ona data list --customer-id farm-001 --format csv | xargs -I {} ona data export --dataset-id {} --format json

# Monitoring
ona status --detailed && ona health --timeout 30
```

### Environment-Specific Commands

```bash
# Development
ona --environment dev --debug status

# Staging
ona --environment staging --verbose forecast --customer-id test-001 --horizon 12

# Production
ona --environment prod --region af-south-1 train --customer-id prod-001 --location CapeTown
```

### Error Handling

```bash
# Retry failed operations
ona --retry 3 --retry-delay 5 forecast --customer-id farm-001 --horizon 24

# Validate before operations
ona data validate --dataset-id dataset-123 --fix-issues
ona models validate --model-id model-456

# Debug failed commands
ona debug --command "forecast --customer-id farm-001 --horizon 24"
```

## CLI Help System

### Getting Help

```bash
# General help
ona --help

# Command help
ona upload --help
ona train --help
ona forecast --help

# Subcommand help
ona upload historical --help
ona models list --help
ona forecasts export --help
```

### Interactive Help

```bash
# Start interactive mode
ona interactive

# Available in interactive mode:
# - Tab completion
# - Command history
# - Built-in help system
# - Auto-suggestions
```

### Examples

```bash
# Show examples for command
ona upload historical --examples

# Show examples for subcommand
ona models train --examples

# Show usage patterns
ona --usage-patterns
```

## Configuration Files

### CLI Configuration

`~/.asoba/config.yaml`:

```yaml
cli:
  default_region: af-south-1
  default_environment: production
  timeout: 30
  retry_attempts: 3
  retry_delay: 5
  log_level: INFO
  log_file: ~/.asoba/logs/cli.log

api:
  base_url: https://api.asoba.co
  version: v1
  timeout: 30

auth:
  api_key: ${ONA_API_KEY}
  auth_type: api_key

output:
  format: table
  colors: true
  progress_bars: true
```

### Command Aliases

`~/.asoba/aliases.yaml`:

```yaml
aliases:
  # Data management
  ul: upload historical
  un: upload nowcast
  dl: data list
  di: data info
  
  # Model management
  tm: train
  ml: models list
  mi: models info
  
  # Forecasting
  fc: forecast
  fl: forecasts list
  fg: forecasts get
  
  # System
  st: status
  hc: health
  cfg: configure
```

## Troubleshooting

### Common CLI Issues

#### Authentication Errors

```bash
# Check API key
ona configure --list

# Test authentication
ona status

# Reset configuration
ona configure --reset
```

#### Connection Issues

```bash
# Test connectivity
ona health

# Check network
curl -H "x-api-key: YOUR_API_KEY" https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/health

# Debug connection
ona debug --command "status"
```

#### Performance Issues

```bash
# Enable verbose logging
ona --verbose status

# Check timeouts
ona --timeout 60 forecast --customer-id farm-001 --horizon 24

# Monitor progress
ona --progress forecast --customer-id farm-001 --horizon 24
```

### Getting Support

```bash
# Generate debug report
ona debug --report

# Check CLI version
ona version --detailed

# Validate installation
ona --validate-install
```

## Support

- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **API Reference**: [Complete API documentation](api-reference.md)
- 🔗 **Integration Guide**: [SDK and webhook integration](integration.md)

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