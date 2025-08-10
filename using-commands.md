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

## Essential System Commands

### Help and Discovery
{: .fs-6 }

```bash
# Show all available commands
🤖 | /help

# List all slash commands with descriptions
🤖 | /commands

# Get help for specific command
🤖 | /help github
```

### System Status and Configuration  
{: .fs-6 }

```bash
# Check system status and model availability
🤖 | /status
🤖 | /health

# List available MCP servers and their status
🤖 | /servers

# Show available AI models
🤖 | /models
🤖 | /model

# Interactive configuration management
🤖 | /configure
```

---

## File Operations

### Reading and Viewing Files
{: .fs-6 }

```bash
# Read and display file contents
🤖 | /read config.py
🤖 | /read README.md
🤖 | /read src/main.py

# Read with line limit
🤖 | /read --lines 50 large_file.txt
```

### Directory Operations
{: .fs-6 }

```bash
# List directory contents
🤖 | /list
🤖 | /list src/

# List with hidden files
🤖 | /list --all

# List with detailed information  
🤖 | /list --details
```

### Search Operations
{: .fs-6 }

```bash
# Search for files and content by literal pattern
🤖 | /find main.py
🤖 | /find "function name"
🤖 | /find "import requests"

# Search by type
🤖 | /find --type file "*.py"
🤖 | /find --type dir "test*"
🤖 | /find --type content "TODO"

# Search in specific path
🤖 | /find pattern --path src/
```

### Intelligent Search with AI-Powered Results
{: .fs-6 }

The `/search` command provides **intelligent, context-aware search** with relevance ranking and smart result limits. Perfect for exploring large codebases and finding relevant information quickly.

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

---

## Code Operations

### AI-Assisted File Editing
{: .fs-6 }

```bash
# Edit files with AI assistance
🤖 | /edit config.py
🤖 | /edit src/main.py "add error handling"
🤖 | /edit README.md "update installation instructions"

# Interactive editing
🤖 | /edit app.py
# Follow prompts for what changes to make
```

---

## GitHub Integration

### Repository Operations
{: .fs-6 }

```bash
# GitHub authentication
🤖 | /github auth login
🤖 | /github auth status
🤖 | /github auth logout

# Repository information
🤖 | /github repo info owner/repo
🤖 | /github repo info owner/repo --details

# Issues management
🤖 | /github issues list owner/repo
🤖 | /github issues list owner/repo --state=closed

# Pull requests
🤖 | /github pr list owner/repo
🤖 | /github pr list owner/repo --state=all

# Webhooks
🤖 | /github webhook list owner/repo

# Rate limiting
🤖 | /github rate-limit
```

---

## O&M Specific Commands

### Inverter Operations
{: .fs-6 }

```bash
# Upload inverter data for analysis
🤖 | /upload-inverter upload CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER FILE_PATH REGION CLIENT_ID
🤖 | /upload-inverter CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER FILE_PATH REGION CLIENT_ID
🤖 | /upload-inverter CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER FILE_PATH REGION CLIENT_ID

# Check upload status
🤖 | /upload-inverter status [UPLOAD_ID]
🤖 | /upload-inverter status [UPLOAD_ID]

# Generate forecasts
🤖 | /forecast-inverter start CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER REGION FORECAST_TYPE HORIZON_DAYS FREQUENCY
🤖 | /forecast-inverter start CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER REGION FORECAST_TYPE HORIZON_DAYS FREQUENCY
🤖 | /forecast-inverter start CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER REGION FORECAST_TYPE HORIZON_DAYS FREQUENCY

# Get forecast results
🤖 | /forecast-inverter get CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER REGION OUTPUT_DIR FORECAST_TYPE
🤖 | /forecast-inverter get CUSTOMER_ID LOCATION MANUFACTURER SERIAL_NUMBER REGION OUTPUT_DIR FORECAST_TYPE

# Check forecast status
🤖 | /forecast-inverter status [REQUEST_ID]
🤖 | /forecast-inverter status [REQUEST_ID]
```

### Example O&M Workflows
{: .fs-6 }

```bash
# Upload inverter data
🤖 | /upload-inverter SOLAR001 "Cape Town" "SolarEdge" SE12345 /data/inverter.csv af-south-1 client123

# Monitor processing
🤖 | /upload-inverter status SOLAR001_SE12345_1754151842

# Generate 7-day forecast
🤖 | /forecast-inverter start SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 P50 7 daily

# Get forecast results
🤖 | /forecast-inverter get SOLAR001 "Cape Town" "SolarEdge" SE12345 af-south-1 /tmp/forecasts P50
```

---

## Configuration and Prompts

### System Prompt Management
{: .fs-6 }

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
{: .fs-6 }

```bash
# Set up .ona directory and .gitignore
🤖 | /ona setup
🤖 | /ona setup

# List all planning files in .ona directory
🤖 | /ona list
🤖 | /ona list

# Create planning files
🤖 | /ona create --content "Planning content here" --type plan
🤖 | /ona create --content "Analysis content here" --type insights

# Show .ona status
🤖 | /ona status
```

---

## Command Categories Reference

### System Commands
- `/help` - Show help information
- `/commands` - List all slash commands  
- `/status` - Show system status
- `/servers` - List MCP servers
- `/models` - Show available AI models
- `/configure` - Interactive configuration

### File Operations  
- `/read` - Read file contents
- `/list` - List directory contents
- `/find` - Search for files and content by literal pattern
- `/search` - Intelligent content search with AI-powered ranking and context
- `/edit` - AI-assisted file editing

### GitHub Integration
- `/github` - Complete GitHub operations suite

### O&M Operations
- `/upload-inverter` - Data upload workflows
- `/forecast-inverter` - Forecast generation

### Configuration
- `/prompts` - System prompt management
- `/ona` - Planning file management

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
- Use shorter aliases when available (e.g., `/ls` instead of `/list`)
- Tab completion works for command names and file paths
- Use `--help` with any command to see detailed options

### File Operations
- Always use absolute paths or ensure you're in the correct directory
- Use `/find` to locate files before reading them
- The `/edit` command provides AI assistance for complex modifications

### GitHub Workflows
- Set up authentication once with `/github auth login`
- Use `/github rate-limit` to check API limits before bulk operations
- Repository analysis works with both public and private repos

### O&M Operations
- Upload data files should be in CSV format
- Monitor upload status before starting forecasts
- Forecast generation may take several minutes for large datasets

### Planning Integration
- Use `/ona setup` once per project to initialize planning files
- Planning files are automatically excluded from git tracking
- System prompts automatically create planning artifacts in `.ona/`

---

## Troubleshooting

### Command Not Found
If a command isn't recognized:
- Check `/commands` to see all available commands
- Ensure you're using the correct syntax with `/help command_name`
- Try the command aliases (e.g., `/gh` instead of `/github`)

### File Operations Issues
- Use absolute paths or check current directory with `/list`
- Verify file permissions for `/read` and `/edit` operations
- Use `/find` to locate files before operating on them

### GitHub Integration Issues
- Check authentication status with `/github auth status`
- Verify repository permissions and access
- Use `/github rate-limit` to check API quotas

### O&M Data Issues
- Ensure CSV files are properly formatted
- Check file paths are accessible
- Monitor upload status before proceeding with forecasts

For additional help, use `/help` followed by the specific command name for detailed usage information.