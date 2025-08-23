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
