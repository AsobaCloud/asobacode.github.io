---
title: "Shared Components"
layout: default
nav_order: 6
---

# Shared Components

Documentation for shared components and utilities used across the Ona API platform.

## Overview

The Ona platform includes several shared components that provide common functionality across different API services. These components are designed to be reusable and maintainable across the entire platform.

## Core Shared Components

### Authentication & Authorization

#### API Key Management

```python
# Shared authentication utilities
from ona_terminal.shared.auth import APIKeyManager

# Validate API key
api_key_manager = APIKeyManager()
is_valid = api_key_manager.validate_key(api_key)

# Get user permissions
permissions = api_key_manager.get_permissions(api_key)
```

#### JWT Token Handling

```python
# JWT token utilities
from ona_terminal.shared.auth import JWTManager

# Create JWT token
jwt_manager = JWTManager()
token = jwt_manager.create_token(user_id, permissions)

# Validate JWT token
payload = jwt_manager.validate_token(token)
```

### Data Processing

#### Data Validation

```python
# Shared data validation utilities
from ona_terminal.shared.validation import DataValidator

# Validate energy data
validator = DataValidator()
is_valid = validator.validate_energy_data(data)

# Validate forecast parameters
is_valid = validator.validate_forecast_params(params)
```

#### Data Transformation

```python
# Shared data transformation utilities
from ona_terminal.shared.transform import DataTransformer

# Transform time series data
transformer = DataTransformer()
transformed_data = transformer.transform_timeseries(data)

# Normalize data
normalized_data = transformer.normalize_data(data)
```

### Error Handling

#### Error Management

```python
# Shared error handling utilities
from ona_terminal.shared.errors import ErrorHandler

# Handle API errors
error_handler = ErrorHandler()
response = error_handler.handle_error(error)

# Log errors
error_handler.log_error(error, context)
```

#### Response Formatting

```python
# Shared response formatting utilities
from ona_terminal.shared.response import ResponseFormatter

# Format success response
formatter = ResponseFormatter()
response = formatter.format_success(data)

# Format error response
response = formatter.format_error(error)
```

### Logging & Monitoring

#### Logging Utilities

```python
# Shared logging utilities
from ona_terminal.shared.logging import Logger

# Initialize logger
logger = Logger(service_name="api-service")

# Log different levels
logger.info("Processing request", context)
logger.error("Error occurred", error)
logger.debug("Debug information", data)
```

#### Metrics Collection

```python
# Shared metrics utilities
from ona_terminal.shared.metrics import MetricsCollector

# Collect metrics
metrics = MetricsCollector()
metrics.increment_counter("api_requests")
metrics.record_timing("request_duration", duration)
```

### Database Operations

#### Database Connection

```python
# Shared database utilities
from ona_terminal.shared.database import DatabaseManager

# Get database connection
db_manager = DatabaseManager()
connection = db_manager.get_connection()

# Execute queries
result = db_manager.execute_query(query, params)
```

#### Data Models

```python
# Shared data models
from ona_terminal.shared.models import EnergyData, ForecastResult

# Create data model instances
energy_data = EnergyData(
    customer_id="customer-123",
    timestamp="2024-01-15T10:30:00Z",
    power_output=150.5
)

forecast_result = ForecastResult(
    forecast_id="forecast-456",
    customer_id="customer-123",
    predictions=[...]
)
```

### Configuration Management

#### Environment Configuration

```python
# Shared configuration utilities
from ona_terminal.shared.config import ConfigManager

# Load configuration
config = ConfigManager()
api_config = config.get_api_config()
db_config = config.get_database_config()
```

#### Feature Flags

```python
# Shared feature flag utilities
from ona_terminal.shared.features import FeatureManager

# Check feature flags
feature_manager = FeatureManager()
is_enabled = feature_manager.is_enabled("new_forecast_model")
```

## Utility Functions

### Date & Time Utilities

```python
# Shared date/time utilities
from ona_terminal.shared.utils import DateTimeUtils

# Parse timestamps
timestamp = DateTimeUtils.parse_timestamp("2024-01-15T10:30:00Z")

# Format dates
formatted_date = DateTimeUtils.format_date(date, format="%Y-%m-%d")

# Calculate time differences
duration = DateTimeUtils.calculate_duration(start_time, end_time)
```

### File Operations

```python
# Shared file utilities
from ona_terminal.shared.utils import FileUtils

# Read CSV files
data = FileUtils.read_csv(file_path)

# Write JSON files
FileUtils.write_json(data, file_path)

# Validate file formats
is_valid = FileUtils.validate_format(file_path, format="csv")
```

### Network Utilities

```python
# Shared network utilities
from ona_terminal.shared.utils import NetworkUtils

# Make HTTP requests
response = NetworkUtils.make_request(url, method="GET", headers=headers)

# Validate URLs
is_valid = NetworkUtils.validate_url(url)

# Parse URLs
parsed_url = NetworkUtils.parse_url(url)
```

## Shared Constants

### API Constants

```python
# Shared API constants
from ona_terminal.shared.constants import API_CONSTANTS

# HTTP status codes
STATUS_OK = API_CONSTANTS.STATUS_OK
STATUS_ERROR = API_CONSTANTS.STATUS_ERROR

# Error codes
ERROR_INVALID_API_KEY = API_CONSTANTS.ERROR_INVALID_API_KEY
ERROR_RATE_LIMIT_EXCEEDED = API_CONSTANTS.ERROR_RATE_LIMIT_EXCEEDED
```

### Data Constants

```python
# Shared data constants
from ona_terminal.shared.constants import DATA_CONSTANTS

# Data formats
FORMAT_CSV = DATA_CONSTANTS.FORMAT_CSV
FORMAT_JSON = DATA_CONSTANTS.FORMAT_JSON

# Time intervals
INTERVAL_HOURLY = DATA_CONSTANTS.INTERVAL_HOURLY
INTERVAL_DAILY = DATA_CONSTANTS.INTERVAL_DAILY
```

## Usage Examples

### Complete API Endpoint Example

```python
# Example of using shared components in an API endpoint
from ona_terminal.shared.auth import APIKeyManager
from ona_terminal.shared.validation import DataValidator
from ona_terminal.shared.response import ResponseFormatter
from ona_terminal.shared.logging import Logger

def process_energy_data(request_data, api_key):
    # Initialize shared components
    auth_manager = APIKeyManager()
    validator = DataValidator()
    formatter = ResponseFormatter()
    logger = Logger(service_name="energy-api")
    
    try:
        # Validate API key
        if not auth_manager.validate_key(api_key):
            return formatter.format_error("Invalid API key")
        
        # Validate request data
        if not validator.validate_energy_data(request_data):
            return formatter.format_error("Invalid data format")
        
        # Process data
        result = process_data(request_data)
        
        # Log success
        logger.info("Data processed successfully", {"customer_id": request_data.get("customer_id")})
        
        # Return success response
        return formatter.format_success(result)
        
    except Exception as error:
        # Log error
        logger.error("Error processing data", error)
        
        # Return error response
        return formatter.format_error(str(error))
```

### Database Operation Example

```python
# Example of using shared database components
from ona_terminal.shared.database import DatabaseManager
from ona_terminal.shared.models import EnergyData

def store_energy_data(data):
    # Initialize database manager
    db_manager = DatabaseManager()
    
    try:
        # Create data model
        energy_data = EnergyData(**data)
        
        # Store in database
        result = db_manager.insert(energy_data)
        
        return {"status": "success", "id": result.id}
        
    except Exception as error:
        return {"status": "error", "message": str(error)}
```

## Best Practices

### Component Usage

1. **Always use shared components** for common functionality
2. **Don't duplicate code** - use existing shared utilities
3. **Follow naming conventions** established in shared components
4. **Handle errors consistently** using shared error handlers

### Performance Considerations

1. **Cache frequently used components** where appropriate
2. **Use connection pooling** for database operations
3. **Implement proper logging levels** to avoid performance impact
4. **Monitor component usage** and optimize as needed

### Security Guidelines

1. **Validate all inputs** using shared validation utilities
2. **Use secure authentication** methods provided by shared components
3. **Log security events** using shared logging utilities
4. **Follow security best practices** established in shared components

## Support

- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **API Reference**: [Complete API documentation](api-reference.md)
- 🔗 **Integration Guide**: [SDK and webhook integration](integration.md)
