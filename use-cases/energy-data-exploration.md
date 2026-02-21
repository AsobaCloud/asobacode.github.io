---
title: "Energy Data Exploration"
layout: default
nav_order: 4
parent: "Patterns"
---

# Energy Data Exploration

Use Zorora's data analysis capabilities to explore production solar energy time series data with sandboxed pandas and matplotlib — directly from the REPL.

## Scenario

You have a year of 30-minute resolution inverter data from a Namibian solar site, exported via Solarman. You need to:
- Assess data quality (gaps, nulls, resolution consistency)
- Identify generation patterns (daily profiles, seasonal trends)
- Compare inverter performance (INV 001 vs INV 002)
- Prepare insights for integration with the Ona Intelligence Layer

<div style="width: 100%; max-width: 800px; margin: 24px auto;">
  <div style="width: 100%; height: 300px; background: var(--background-light); border: 2px dashed var(--border-grey); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--text-light);">
    <span>Energy Data Exploration Screenshot<br/><small>(Placeholder — Add screenshot showing /load profile output and analysis results)</small></span>
  </div>
</div>

## Step-by-Step Guide

### Step 1: Load the Dataset

Use the `/load` command to ingest and profile a CSV file:

```bash
zorora
[1] ⚙ > /load docs/demo-data.csv
```

Zorora automatically profiles the dataset on load:

```
📊 Dataset Profile
──────────────────────────────────
Rows:        17,569
Columns:     3
Time range:  2023-01-01 → 2024-01-01 (366 days)
Resolution:  30 min
Gaps:        0

Column Summary:
  Timestamp              datetime64    0 nulls
  INV 001 (W)            float64       12 nulls
  INV 002 (W)            float64       8 nulls

Format detected: ODS-E compatible (Solarman export)
```

### Step 2: Explore Structure

Inspect the DataFrame loaded into the session:

```bash
[2] ⚙ > /analyze df.info()
[3] ⚙ > /analyze result = df.head(10)
```

Check column names and dtypes to confirm the profile output. The `Timestamp` column is automatically parsed as `datetime64` during loading.

### Step 3: Data Quality Assessment

Check for nulls and gaps in the time series:

```bash
[4] ⚙ > /analyze result = df.isnull().sum()
```

```
INV 001 (W)    12
INV 002 (W)     8
```

Detect gaps in the expected 30-minute resolution:

```bash
[5] ⚙ > /analyze result = df['Timestamp'].diff().value_counts().head()
```

A healthy dataset shows the dominant interval as `0 days 00:30:00`. Any other intervals indicate missing records or irregular exports.

### Step 4: Statistical Analysis

Get descriptive statistics for the power columns:

```bash
[6] ⚙ > /analyze result = df.describe()
```

Compute daily generation totals:

```bash
[7] ⚙ > /analyze result = df.set_index('Timestamp').resample('D').sum().head(10)
```

Monthly aggregation for seasonal comparison:

```bash
[8] ⚙ > /analyze result = df.set_index('Timestamp').resample('M').sum()
```

### Step 5: Visualization

Plot the full time series for both inverters:

```bash
[9] ⚙ > /analyze plt.figure(figsize=(14,5)); plt.plot(df['Timestamp'], df['INV 001 (W)'], label='INV 001', alpha=0.7); plt.plot(df['Timestamp'], df['INV 002 (W)'], label='INV 002', alpha=0.7); plt.legend(); plt.title('Inverter Power Output — Full Year'); plt.xlabel('Date'); plt.ylabel('Power (W)'); plt.savefig('__zorora_plot__.png')
```

Generate a daily average profile (hour-of-day pattern):

```bash
[10] ⚙ > /analyze df['hour'] = df['Timestamp'].dt.hour; result = df.groupby('hour')[['INV 001 (W)', 'INV 002 (W)']].mean()
```

### Step 6: Comparative Analysis

Compare cumulative generation between the two inverters:

```bash
[11] ⚙ > /analyze inv1_total = df['INV 001 (W)'].sum() * 0.5; inv2_total = df['INV 002 (W)'].sum() * 0.5; result = f"INV 001: {inv1_total/1e6:.2f} MWh, INV 002: {inv2_total/1e6:.2f} MWh, Ratio: {inv1_total/inv2_total:.3f}"
```

Compute correlation between inverters (should be very high for co-located units):

```bash
[12] ⚙ > /analyze result = df['INV 001 (W)'].corr(df['INV 002 (W)'])
```

## Example Output

### Profile Summary (from `/load`)

```
📊 Dataset Profile
──────────────────────────────────
Rows:        17,569
Columns:     3
Time range:  2023-01-01 → 2024-01-01 (366 days)
Resolution:  30 min
Format:      ODS-E compatible
```

### Analysis Result (from `/analyze`)

```json
{
  "type": "scalar",
  "result": "0.9987",
  "plot_generated": false
}
```

## Best Practices

### Timestamp Handling
- Zorora auto-parses `Timestamp` columns to `datetime64` on load
- Always verify with `/analyze df.dtypes` before time-based operations
- Use `.set_index('Timestamp')` for resampling workflows

### Null-Aware Analysis
- Solar inverter data commonly has nulls during nighttime or communication drops
- Use `.dropna()` or `.fillna(0)` deliberately — don't silently ignore
- Check null counts per column before aggregation

### Resolution Validation
- The profile output shows detected resolution (e.g., 30 min)
- Verify with `/analyze df['Timestamp'].diff().value_counts()` to catch irregular intervals
- Gaps matter for energy calculations (kWh = kW × hours)

### Working with Large Files
- The demo dataset (17,569 rows) loads in under a second
- For larger files (100k+ rows), prefer column-specific operations over full DataFrame scans
- Use `.resample()` to reduce data volume before plotting

## Next Steps

<div class="overview-cards-grid">
  <div class="overview-card">
    <h3>ODS-E: Standardize Your Data</h3>
    <p>Transform raw Solarman exports into the standardized Operational Data Standard for Energy (ODS-E) format. Enables cross-site comparability, consistent column naming, and automated validation.</p>
    <a href="https://docs.asoba.co/odse" class="card-link">Read the ODS-E Docs →</a>
  </div>

  <div class="overview-card">
    <h3>Ona Intelligence Layer</h3>
    <p>Feed analyzed data into the Ona ML pipeline for anomaly detection, generation forecasting, and automated model management — turning raw inverter telemetry into actionable intelligence.</p>
    <a href="https://docs.asoba.co/ona-intelligence-layer" class="card-link">Explore Ona Intelligence Layer →</a>
  </div>
</div>

## See Also

- [Getting Started](/getting-started) — Installation and setup
- [Guides: Slash Commands](/guides/slash-commands) — Full `/load` and `/analyze` reference
- [Technical Concepts: Architecture](/technical-concepts/architecture) — How the data analysis sandbox works
- [Academic Research](/use-cases/academic-research) — Deep research use case
