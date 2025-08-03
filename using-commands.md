---
title: "Using / Commands (Interactive Mode)"
layout: default
nav_order: 4
---

# Using `/` Commands (Interactive Mode)
{: .fs-8 }

Master AsobaCode's interactive CLI with slash commands and examples.
{: .fs-6 .fw-300 }

---

## Getting Started

Launch interactive mode:
```bash
asoba-code
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