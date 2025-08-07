---
title: "Commands"
layout: default
nav_order: 2
---

# Interactive Mode Commands

Complete reference for all `/` commands available in AsobaCode interactive mode.

---

## Getting Started

Launch Ona Terminal interactive mode:

```bash
ona-terminal
```

You'll see the interactive prompt:

```
🤖 | 
```

All commands start with `/` and can be typed directly at this prompt.

---

## 🛠️ System Commands

### `/help`

Show the help menu and available commands.

```bash
/help
```

### `/commands`

List all available slash commands with detailed information.

```bash
/commands
```

### `/status`

Check system status and model availability.

```bash
/status
```

**Example Output:**
```
📆 AsobaCode Status
📍 Config: configs
⏱️  Timeout: 60s
🖥️  Servers: 3 discovered
🐍 Python: 3.10+
```

### `/models`

Manage and view available AI models.

```bash
# List all available models
/models list

# Add a custom model
/models add mymodel --endpoint http://localhost:8000

# Test model connectivity
/models test mymodel

# Remove a model
/models remove mymodel
```

### `/configure`

Open interactive configuration management interface.

```bash
/configure
```

### `/servers`

List MCP servers and their status.

```bash
# List all servers
/servers

# Show server health status
/servers --health
```

### `/exit`

Exit the interactive mode.

```bash
/exit
```

---

## 📁 File Operations

### `/read`

Read and analyze file contents with AI assistance.

```bash
# Read a file
/read config.py

# Read with line limit
/read --lines 50 large_file.txt
```

**Supported File Types:**
- Text files (`.py`, `.js`, `.md`, `.txt`, etc.)
- PDF documents (`.pdf`)
- Word documents (`.docx`, `.doc`) 
- PowerPoint presentations (`.pptx`)
- Excel spreadsheets (`.xlsx`, `.xls`)

### `/list`

List directory contents.

```bash
# List current directory
/list

# List specific directory
/list src/

# Show all files including hidden
/list --all

# Show detailed information
/list --details
```

### `/find`

Search for files and content.

```bash
# Find files by pattern
/find *.py

# Search content within files
/find --type content "def main"

# Search for directories
/find --type dir config
```

### `/edit`

AI-assisted file editing (coming soon).

```bash
/edit config.py
/edit src/main.py "add error handling"
```

---

## 🐙 GitHub Integration

### `/github auth`

Manage GitHub authentication.

```bash
# Login to GitHub
/github auth login

# Check authentication status
/github auth status

# Logout from GitHub
/github auth logout
```

### `/github repo`

Repository management commands.

```bash
# Get repository information
/github repo info owner/repo
```

### `/github issues`

Issue management commands.

```bash
# List issues
/github issues list owner/repo

# Filter by state
/github issues list owner/repo --state=closed
```

### `/github pr`

Pull request commands.

```bash
# List pull requests
/github pr list owner/repo

# Filter by state
/github pr list owner/repo --state=all
```

### `/github webhook`

Webhook management.

```bash
# List webhooks
/github webhook list owner/repo
```

### `/github rate-limit`

Check GitHub API rate limits.

```bash
/github rate-limit
```

---

## 📝 Planning & Configuration

### `/ona`

Manage .ona planning files.

```bash
# Set up .ona environment
/ona setup

# List planning files
/ona list

# Create new planning file
/ona create --content "Planning content" --type plan
```

### `/prompts`

Manage system prompts.

```bash
# List available prompts
/prompts list

# Select a system prompt
/prompts select medium

# Show current prompt
/prompts show
```

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