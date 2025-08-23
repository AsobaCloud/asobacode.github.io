---
title: "CLI Commands Reference"
layout: default
nav_order: 4
---

# Ona Terminal CLI Commands Reference

Complete reference for all commands available in Ona Terminal's interactive mode and direct CLI.

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

## Essential System Commands

### Help and Discovery

*   **`/help`**: Show the help menu and available commands.
    ```bash
    🤖 | /help
    # Get help for specific command
    🤖 | /help github
    ```

*   **`/commands`**: List all available slash commands with detailed information and descriptions.
    ```bash
    🤖 | /commands
    ```

### System Status and Configuration

*   **`/status`**: Check system status and model availability.
    ```bash
    🤖 | /status
    ```
    **Example Output:**
    ```
    📆 AsobaCode Status
    📍 Config: configs
    ⏱️  Timeout: 60s
    🖥️  Servers: 3 discovered
    🐍 Python: 3.10+
    ```

*   **`/health`**: Show system health status.
    ```bash
    🤖 | /health
    ```

*   **`/servers`**: List MCP servers and their status.
    ```bash
    # List all servers
    🤖 | /servers
    # Show server health status
    🤖 | /servers --health
    ```

*   **`/models`**: Manage and view available AI models.
    ```bash
    # List all available models
    🤖 | /models list
    # Add a custom model
    🤖 | /models add mymodel --endpoint http://localhost:8000
    # Test model connectivity
    🤖 | /models test mymodel
    # Remove a model
    🤖 | /models remove mymodel
    # Show available AI models
    🤖 | /models
    # Show current model configuration
    🤖 | /models current
    ```

*   **`/configure`**: Open interactive configuration management interface.
    ```bash
    🤖 | /configure
    ```

*   **`/exit`**: Exit the interactive mode.
    ```bash
    🤖 | /exit
    ```

---

## File Operations

### Reading and Viewing Files

*   **`/read`**: Read and analyze file contents with AI assistance.
    ```bash
    # Read a file
    🤖 | /read config.py
    # Read with line limit
    🤖 | /read --lines 50 large_file.txt
    ```
    **Supported File Types:**
    - Text files (`.py`, `.js`, `.md`, `.txt`, etc.)
    - PDF documents (`.pdf`)
    - Word documents (`.docx`, `.doc`) 
    - PowerPoint presentations (`.pptx`)
    - Excel spreadsheets (`.xlsx`, `.xls`)

### Directory Operations

*   **`/list`**: List directory contents.
    ```bash
    # List current directory
    🤖 | /list
    # List specific directory
    🤖 | /list src/
    # Show all files including hidden
    🤖 | /list --all
    # Show detailed information
    🤖 | /list --details
    ```

### Search Operations

*   **`/find`**: Search for files and content by literal pattern.
    ```bash
    # Find files by pattern
    🤖 | /find *.py
    # Search content within files
    🤖 | /find --type content "def main"
    # Search for directories
    🤖 | /find --type dir config
    ```

*   **`/search`**: Provides **intelligent, context-aware search** with relevance ranking and smart result limits. Perfect for exploring large codebases and finding relevant information quickly.
    **Basic Search:**
    ```bash
    # Search for concepts, patterns, or terms
    🤖 | /search "authentication logic"
    🤖 | /search "database migration"
    🤖 | /search "error handling"
    # Search with regex patterns (automatically detected)
    🤖 | /search "function\s+\w+Auth"
    🤖 | /search "class.*Controller"
    ```
    **Advanced Search Options:**
    ```bash
    # Limit results to specific file types
    🤖 | /search "configuration" --extensions .py .yaml .json
    # Search in specific directory
    🤖 | /search "deployment scripts" --directory ./infrastructure
    # Limit number of results (default: 50)
    🤖 | /search "test cases" --max-results 10
    # Combined options for focused search
    🤖 | /search "API endpoints" --directory ./src --extensions .py .js --max-results 25
    ```
    **What Makes Search Intelligent:**
    ✅ **Relevance Scoring** - Results ranked by filename matches, occurrence count, and file importance  
    ✅ **Context Snippets** - Shows actual match context, not just filenames  
    ✅ **Smart Size Limits** - Automatically handles large results with intelligent truncation  
    ✅ **File Type Priority** - Prioritizes important development files (.py, .js, .md)  
    ✅ **Regex Support** - Automatically detects and handles regex patterns  

    **Example Output:**
    ```
    Found 15 files matching 'authentication'. Showing top 15 results.

    /src/auth/login.py
    Match found: 'def authenticate_user(username, password): # Main authentication logic' - File contains 8 occurrences of 'authentication'.

    /docs/security.md  
    Match found: 'Authentication is handled through JWT tokens with 24-hour expiry' - File contains 12 occurrences of 'authentication'.

    /tests/test_auth.py
    Match found: 'class TestAuthentication(unittest.TestCase): def test_valid_authentication' - File contains 15 occurrences of 'authentication'.
    ```
    **Search vs Find:**
    - **`/search`** - Intelligent content search with AI-powered ranking and context
    - **`/find`** - Simple file/pattern matching for when you know exactly what you're looking for

### AI-Assisted File Editing

*   **`/edit`**: AI-assisted file editing.
    ```bash
    🤖 | /edit config.py
    🤖 | /edit src/main.py "add error handling"
    🤖 | /edit README.md "update installation instructions"
    # Interactive editing
    🤖 | /edit app.py
    # Follow prompts for what changes to make
    ```

---

## GitHub Integration

### Authentication and Repository Operations

*   **`/github auth`**: Manage GitHub authentication.
    ```bash
    # Login to GitHub
    🤖 | /github auth login
    # Check authentication status
    🤖 | /github auth status
    # Logout from GitHub
    🤖 | /github auth logout
    ```

*   **`/github repo`**: Repository management commands.
    ```bash
    # Get repository information
    🤖 | /github repo info owner/repo
    🤖 | /github repo info owner/repo --details
    ```

*   **`/github issues`**: Issue management commands.
    ```bash
    # List issues
    🤖 | /github issues list owner/repo
    # Filter by state
    🤖 | /github issues list owner/repo --state=closed
    ```

*   **`/github pr`**: Pull request commands.
    ```bash
    # List pull requests
    🤖 | /github pr list owner/repo
    # Filter by state
    🤖 | /github pr list owner/repo --state=all
    ```

*   **`/github webhook`**: Webhook management.
    ```bash
    # List webhooks
    🤖 | /github webhook list owner/repo
    ```

*   **`/github rate-limit`**: Check GitHub API rate limits.
    ```bash
    🤖 | /github rate-limit
    ```

---

## O&M Specific Commands

### Inverter Operations

*   **`/upload-inverter upload`**: Upload data files for processing and model training.
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

*   **`/upload-inverter status`**: Check upload and training status.
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

*   **`/forecast-inverter start`**: Generate new forecasts for trained models.
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

*   **`/forecast-inverter get`**: Download generated forecast results.
    ```bash
    /forecast-inverter get CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER REGION OUTPUT_PATH FORECAST_TYPE
    ```
    **Example:**
    ```bash
    /forecast-inverter get SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 /tmp/forecasts P50
    ```

*   **`/forecast-inverter status`**: Check forecast generation status.
    ```bash
    # Check specific forecast
    /forecast-inverter status FORECAST_ID
    # List all recent forecasts
    /forecast-inverter status
    ```

### Example O&M Workflows

Complete workflow from data upload to forecast generation:

1.  **Upload Training Data**
    ```bash
    🤖 | /upload-inverter upload SOLAR001 "Cape Town" "SolarEdge" SE12345 /data/solar_data.csv af-south-1 client123
    ```

2.  **Monitor Training Progress**
    ```bash
    🤖 | /upload-inverter status SOLAR001_SE12345_1754151842
    ```
    Wait for training to complete (status shows "✅ Training → Completed").

3.  **Generate Forecast**
    ```bash
    🤖 | /forecast-inverter start SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 P50 7 daily
    ```

4.  **Download Results**
    ```bash
    🤖 | /forecast-inverter get SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 /tmp/forecasts P50
    ```

---

## OODA Workflow Commands

The following commands map to the OODA loop (Observe, Orient, Decide, Act) for structured, agentic workflows.

### Observe

*   **`/detect`**: Run fault detection on an asset.
    ```bash
    # Run fault detection on an asset
    ona-terminal detect --action run --asset INV-001
    # List previous fault detection results
    ona-terminal detect --action list
    ```

### Orient

*   **`/diagnose`**: Run diagnostics on an asset.
    ```bash
    # Run diagnostics on an asset
    ona-terminal diagnose --action run --asset INV-001
    # List previous diagnostic results
    ona-terminal diagnose --action list
    ```

### Decide

*   **`/ear`**: Calculate Energy-at-Risk for an asset.
    ```bash
    # Calculate Energy-at-Risk for an asset
    ona-terminal ear --action calc --asset INV-001 --horizons 24,72,168
    # List previous EAR calculations
    ona-terminal ear --action list
    ```

*   **`/schedule`**: Create a maintenance schedule.
    ```bash
    # Create a maintenance schedule
    ona-terminal schedule --action create --assets INV-001 --horizon 168
    # List existing schedules
    ona-terminal schedule --action list
    ```

### Act

*   **`/bom`**: Build a bill of materials from a schedule.
    ```bash
    # Build a bill of materials from a schedule
    ona-terminal bom --action build --schedule_id <schedule_id>
    # List existing bills of materials
    ona-terminal bom --action list
    ```

*   **`/order`**: Create a work order from a bill of materials.
    ```bash
    # Create a work order from a bill of materials
    ona-terminal order --action create --bom_id <bom_id>
    # List existing work orders
    ona-terminal order --action list
    ```

*   **`/track`**: Subscribe to job updates.
    ```bash
    # Subscribe to job updates
    ona-terminal track --action subscribe --email ops@example.com --job JOB-123
    # List tracking subscriptions
    ona-terminal track --action list
    ```

---

## Configuration and Prompts

### System Prompt Management

*   **`/prompts`**: Manage system prompts.
    ```bash
    # List all available system prompts
    🤖 | /prompts list
    # Select a system prompt for current and future sessions
    🤖 | /prompts select simple
    🤖 | /prompts select medium
    🤖 | /prompts select ooda
    # Show current prompt
    🤖 | /prompts current
    ```

### Planning File Management (.ona)

*   **`/ona`**: Manage .ona planning files.
    ```bash
    # Set up .ona directory and .gitignore
    🤖 | /ona setup
    # List all planning files in .ona directory
    🤖 | /ona list
    # Create planning files
    🤖 | /ona create --content "Planning content here" --type plan
    # Show .ona status
    🤖 | /ona status
    ```

---

## Natural Language Integration

You can also use natural language for complex tasks:

```bash
# Code generation
🤖 | generate a python function that reads CSV files
🤖 | create a terraform module for AWS S3 bucket
🤖 | write unit tests for my authentication function

# Analysis and review
🤖 | analyze this Python file for performance issues
🤖 | review my repository structure and suggest improvements
🤖 | scan my codebase for security vulnerabilities

# Infrastructure operations
🤖 | deploy a microservices architecture on AWS
🤖 | create a Kubernetes deployment with monitoring
🤖 | analyze my inverter data and generate forecast
```

---

## Tips and Best Practices

### Command Efficiency

*   Use shorter aliases when available (e.g., `/ls` instead of `/list`).
*   Tab completion works for command names and file paths.
*   Use `--help` with any command to see detailed options.

### File Operations

*   Always use absolute paths or ensure you're in the correct directory.
*   Use `/find` to locate files before reading them.
*   The `/edit` command provides AI assistance for complex modifications.

### GitHub Workflows

*   Set up authentication once with `/github auth login`.
*   Use `/github rate-limit` to check API limits before bulk operations.
*   Repository analysis works with both public and private repos.

### O&M Operations

*   Upload data files should be in CSV format.
*   Monitor upload status before starting forecasts.
*   Forecast generation may take several minutes for large datasets.

### Planning Integration

*   Use `/ona setup` once per project to initialize planning files.
*   Planning files are automatically excluded from git tracking.
*   System prompts automatically create planning artifacts in `.ona/`.

---

## Troubleshooting

This section provides a brief overview of common command-related issues. For a comprehensive guide, please refer to the [Troubleshooting Guide](troubleshooting.html).

### Command Not Found

If a command isn't recognized:
*   Check `/commands` to see all available commands.
*   Ensure you're using the correct syntax with `/help command_name`.
*   Try the command aliases (e.g., `/gh` instead of `/github`).

### File Operations Issues

*   Use absolute paths or check current directory with `/list`.
*   Verify file permissions for `/read` and `/edit` operations.
*   Use `/find` to locate files before operating on them.

### GitHub Integration Issues

*   Check authentication status with `/github auth status`.
*   Verify repository permissions and access.
*   Use `/github rate-limit` to check API quotas.

### O&M Data Issues

*   Ensure CSV files are properly formatted.
*   Check file paths are accessible.
*   Monitor upload status before proceeding with forecasts.

For additional help, use `/help` followed by the specific command name for detailed usage information.
