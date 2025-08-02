---
title: "Commands"
layout: default
nav_order: 2
---

# Interactive Mode Commands

Complete reference for all `/` commands available in AsobaCode interactive mode.

---

## Getting Started

Launch AsobaCode interactive mode:

```bash
asoba-code
```

You'll see the interactive prompt:

```
🤖 | 
```

All commands start with `/` and can be typed directly at this prompt.

---

## 📤 Upload Commands

### `/upload-inverter upload`

Upload data files for processing and model training.

```bash
/upload-inverter upload CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER FILE_PATH REGION CLIENT_ID
```

**Example:**
```bash
/upload-inverter upload SOLAR001 "Cape Town" "SolarEdge" SE12345 /data/inverter.csv af-south-1 client123
```

**Parameters:**
- `CUSTOMER_ID` - Unique customer identifier
- `LOCATION` - Installation location (quoted if contains spaces)
- `MANUFACTURER` - Equipment manufacturer name
- `SERIAL_NUMBER` - Equipment serial number
- `FILE_PATH` - Path to CSV data file
- `REGION` - AWS region (e.g., af-south-1)
- `CLIENT_ID` - Client identifier

### `/upload-inverter status`

Check upload and training status.

```bash
# Check specific upload
/upload-inverter status UPLOAD_ID

# List all recent uploads
/upload-inverter status
```

**Example:**
```bash
/upload-inverter status SOLAR001_SE12345_1754151842
```

**Status Display:**
```
⚙️ Upload Status: PROCESSING
📋 Upload ID: SOLAR001_SE12345_1754151842
👤 Customer: SOLAR001
📍 Current Stage: trainForecaster
⏱️  Duration: 0:15:23

Pipeline Progress:
✅ Upload         → Completed (0:00:45)
✅ Ingestion      → Completed (0:02:15)
✅ Interpolation  → Completed (0:08:30)
🔄 Training       → In Progress (0:15:23)
```

---

## 📈 Forecast Commands

### `/forecast-inverter start`

Generate new forecasts for trained models.

```bash
/forecast-inverter start CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER REGION FORECAST_TYPE DAYS FREQUENCY
```

**Example:**
```bash
/forecast-inverter start SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 P50 7 daily
```

**Parameters:**
- `CUSTOMER_ID` - Customer identifier (must match trained model)
- `LOCATION` - Installation location
- `MANUFACTURER` - Equipment manufacturer
- `SERIAL_NUMBER` - Equipment serial number
- `REGION` - AWS region
- `FORECAST_TYPE` - P50 or P90 forecast type
- `DAYS` - Number of days to forecast
- `FREQUENCY` - daily or hourly

### `/forecast-inverter get`

Download generated forecast results.

```bash
/forecast-inverter get CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER REGION OUTPUT_PATH FORECAST_TYPE
```

**Example:**
```bash
/forecast-inverter get SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 /tmp/forecasts P50
```

### `/forecast-inverter status`

Check forecast generation status.

```bash
# Check specific forecast
/forecast-inverter status FORECAST_ID

# List all recent forecasts
/forecast-inverter status
```

---

## 🔄 Workflow Example

Complete workflow from data upload to forecast generation:

### 1. Upload Training Data
```bash
🤖 | /upload-inverter upload SOLAR001 "Cape Town" "SolarEdge" SE12345 /data/solar_data.csv af-south-1 client123
```

### 2. Monitor Training Progress
```bash
🤖 | /upload-inverter status SOLAR001_SE12345_1754151842
```

Wait for training to complete (status shows "✅ Training → Completed").

### 3. Generate Forecast
```bash
🤖 | /forecast-inverter start SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 P50 7 daily
```

### 4. Download Results
```bash
🤖 | /forecast-inverter get SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 /tmp/forecasts P50
```

---

## 💡 Tips & Best Practices

### File Requirements
- **CSV format** with timestamp and generation columns
- **Consistent naming** for customer IDs and serial numbers
- **Valid file paths** accessible from current directory

### Monitoring
- Use `status` commands regularly to track progress
- Training typically takes 10-30 minutes depending on data size
- Forecast generation is usually quick (1-2 minutes)

### Error Handling
- Commands validate parameters before execution
- Clear error messages guide you to correct issues
- Use `status` to check for detailed error information

### Regional Considerations
- Use `af-south-1` for South African deployments
- Ensure AWS credentials are configured for the specified region
- Data processing occurs in the specified region

---

## 🔧 Status Indicators

| Icon | Stage | Description |
|------|--------|-------------|
| ⏳ | Pending | Waiting to start |
| 🔄 | Processing | Currently running |
| ✅ | Completed | Successfully finished |
| ❌ | Failed | Error occurred |
| ⚠️ | Warning | Completed with warnings |

### Pipeline Stages

**Upload Pipeline:**
1. **Upload** - File transfer to S3
2. **Ingestion** - Data validation and formatting
3. **Interpolation** - Gap filling and cleaning
4. **Training** - ML model training

**Forecast Pipeline:**
1. **Generation** - Creating forecast using trained model
2. **Processing** - Output formatting and validation
3. **Storage** - Saving results for download

---

## Common Issues

### Upload Fails
- Check file path exists and is readable
- Verify CSV format is correct
- Ensure AWS credentials are configured

### Training Stuck
- Large datasets take longer (15-30 minutes)
- Check CloudWatch logs for detailed progress
- Contact support if stuck over 1 hour

### Forecast Generation Fails
- Ensure model training completed successfully
- Verify customer ID and equipment details match exactly
- Check forecast parameters are valid

### Downloads Fail
- Confirm forecast generation completed
- Check output directory exists and is writable
- Verify forecast type matches what was generated