---
title: "Using CLI Commands"
layout: default
nav_order: 5
---

# Using CLI Commands
{: .fs-8 }

Master Ona Terminal's command-line interface.
{: .fs-6 .fw-300 }

---

All the OODA workflow commands are available directly from the command line.

### Observe
{: .fs-6 }

```bash
# Run fault detection on an asset
ona-terminal detect --action run --asset INV-001

# List previous fault detection results
ona-terminal detect --action list
```

### Orient
{: .fs-6 }

```bash
# Run diagnostics on an asset
ona-terminal diagnose --action run --asset INV-001

# List previous diagnostic results
ona-terminal diagnose --action list
```

### Decide
{: .fs-6 }

```bash
# Calculate Energy-at-Risk for an asset
ona-terminal ear --action calc --asset INV-001 --horizons 24,72,168

# List previous EAR calculations
ona-terminal ear --action list

# Create a maintenance schedule
ona-terminal schedule --action create --assets INV-001 --horizon 168

# List existing schedules
ona-terminal schedule --action list
```

### Act
{: .fs-6 }

```bash
# Build a bill of materials from a schedule
ona-terminal bom --action build --schedule_id <schedule_id>

# List existing bills of materials
ona-terminal bom --action list

# Create a work order from a bill of materials
ona-terminal order --action create --bom_id <bom_id>

# List existing work orders
ona-terminal order --action list

# Subscribe to job updates
ona-terminal track --action subscribe --email ops@example.com --job JOB-123

# List tracking subscriptions
ona-terminal track --action list
```
