---
title: "Control Layer"
layout: default
nav_order: 3
parent: "Introduction"
---

# Control Layer
{: .fs-8 }

The Control Layer aggregates predictions from all active nodes, executes Decision AI routines for task scheduling and coordination, and provides secure APIs for integration with maintenance management systems.
{: .fs-6 .fw-300 }

---

## Overview

The Control Layer serves as the central coordination hub for the Ona Platform. It aggregates predictions from all edge nodes, executes Decision AI routines for task scheduling and coordination, maintains a unified dashboard for operators, and provides secure APIs for integration with maintenance management systems such as SAP PM or Maximo.

**Key Capabilities:**
- Aggregates predictions from all active edge nodes
- Executes Decision AI routines for task scheduling and coordination
- Maintains unified dashboard for operators
- Provides secure APIs for CMMS integration
- Manages authentication and authorization
- Handles rate limiting and request validation

---

## API Gateway

### Base URLs

The Ona Platform exposes a RESTful API through AWS API Gateway:

- **Custom Domain**: `https://api.asoba.co` ✅ **LIVE**
- **Direct API Gateway**: `https://2m5xvm39ef.execute-api.af-south-1.amazonaws.com/prod`

### API Gateway Configuration

**Status**: ✅ **ACTIVE**
- **API Gateway ID**: `2m5xvm39ef`
- **Region**: `af-south-1`
- **Environment**: `prod`
- **Stage**: `prod`

### Features

- **Request Routing**: Routes requests to appropriate Lambda functions
- **Load Balancing**: Distributes traffic across multiple Lambda instances
- **Custom Domain Support**: Supports custom domain (api.asoba.co)
- **SSL/TLS**: HTTPS only with TLS 1.2+
- **Request Validation**: JSON schema validation for all requests

---

## Terminal API Endpoints (OODA Workflow)

The Control Layer provides comprehensive Terminal API endpoints that implement the OODA (Observe-Orient-Decide-Act) workflow for operations and maintenance.

### POST /terminal/assets

Manage solar assets and components.

**Purpose**: Create, list, and retrieve asset information

**Authentication**: API key or IAM role

**Content-Type**: `application/json`

**Actions**:
- `add`: Create new asset
- `list`: List all assets
- `get`: Retrieve specific asset details

**Example Request (add)**:
```json
{
  "action": "add",
  "asset_id": "INV-001",
  "name": "Main Inverter 1",
  "type": "Solar Inverter",
  "capacity_kw": 20.0,
  "location": "Cape Town Solar Farm",
  "components": [
    {
      "oem": "Sungrow",
      "model": "SG20KTL",
      "serial": "SN123456"
    }
  ]
}
```

**Example Response**:
```json
{
  "message": "Asset created successfully",
  "asset_id": "INV-001"
}
```

### POST /terminal/detect

Run fault detection on assets.

**Purpose**: Execute anomaly detection and fault identification

**Authentication**: API key or IAM role

**Actions**:
- `run`: Execute fault detection
- `list`: List detection results

**Example Request**:
```json
{
  "action": "run",
  "asset_id": "INV-001"
}
```

**Example Response**:
```json
{
  "message": "Detection completed",
  "asset_id": "INV-001",
  "detections": []
}
```

### POST /terminal/diagnose

Run AI diagnostics on detected faults.

**Purpose**: Classify faults and provide root cause analysis

**Authentication**: API key or IAM role

**Actions**:
- `run`: Execute diagnostics
- `list`: List diagnostics results

**Example Request**:
```json
{
  "action": "run",
  "asset_id": "INV-001"
}
```

**Example Response**:
```json
{
  "message": "Diagnostics completed",
  "asset_id": "INV-001",
  "diagnostics": []
}
```

### POST /terminal/schedule

Create maintenance schedules.

**Purpose**: Schedule maintenance activities and optimize resource allocation

**Authentication**: API key or IAM role

**Actions**:
- `create`: Create new schedule
- `list`: List all schedules

**Example Response**:
```json
{
  "message": "Schedule created",
  "schedule_id": "sched-uuid"
}
```

### POST /terminal/bom

Build bill of materials for maintenance.

**Purpose**: Generate parts lists and cost estimates for maintenance jobs

**Authentication**: API key or IAM role

**Actions**:
- `build`: Generate BOM
- `list`: List existing BOMs

**Example Response**:
```json
{
  "message": "BOM built",
  "bom_id": "bom-uuid"
}
```

### POST /terminal/order

Create work orders.

**Purpose**: Generate work orders for maintenance execution

**Authentication**: API key or IAM role

**Actions**:
- `create`: Create new work order
- `list`: List all work orders

**Example Response**:
```json
{
  "message": "Order created",
  "order_id": "ord-uuid"
}
```

### POST /terminal/track

Track job status and progress.

**Purpose**: Monitor work order execution and job progress

**Authentication**: API key or IAM role

**Actions**:
- `subscribe`: Subscribe to job tracking
- `list`: List tracking subscriptions

**Example Response**:
```json
{
  "message": "Tracking subscription created",
  "job_id": "job-uuid"
}
```

---

## Authentication and Security

### API Key Authentication

Include your API key in the request header:

```bash
curl -H "X-API-Key: your-api-key" \
     -X POST https://api.asoba.co/terminal/assets
```

Or as a query parameter:

```bash
curl "https://api.asoba.co/forecast?customer_id=test&api_key=your-api-key"
```

### IAM Role Authentication

Use AWS credentials for authentication:

```bash
# Configure AWS credentials
aws configure

# Use AWS signature in requests
curl -H "Authorization: AWS4-HMAC-SHA256 ..." \
     -X POST https://api.asoba.co/terminal/assets
```

### Security Headers

- **CORS**: Configured for specific origins
- **Rate Limiting**: 1000 requests per hour per API key (standard tier)
- **Request Validation**: JSON schema validation
- **SSL/TLS**: HTTPS only with TLS 1.2+
- **Certificate-Based Authentication**: Secure device authentication

---

## Request/Response Formats

### Standard Response Format

All successful API responses follow this structure:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "metadata": {
    "request_id": "uuid",
    "timestamp": "2025-01-15T12:00:00Z",
    "version": "v1.0"
  },
  "errors": []
}
```

### Error Response Format

Error responses follow this structure:

```json
{
  "success": false,
  "data": null,
  "metadata": {
    "request_id": "uuid",
    "timestamp": "2025-01-15T12:00:00Z",
    "version": "v1.0"
  },
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Invalid customer_id format",
      "field": "customer_id",
      "details": "Expected format: alphanumeric string"
    }
  ]
}
```

---

## Rate Limiting and Quotas

### Rate Limits by Tier

| Tier | Requests/Hour | Burst Limit |
|------|---------------|-------------|
| Standard | 1,000 | 100 |
| Premium | 10,000 | 1,000 |
| Enterprise | 100,000 | 10,000 |

### Rate Limit Headers

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 755
X-RateLimit-Reset: 1642248000
```

### Quota Exceeded Response

When rate limit is exceeded:

```json
{
  "success": false,
  "data": null,
  "errors": [
    {
      "code": "QUOTA_EXCEEDED",
      "message": "Rate limit exceeded. Try again later.",
      "retry_after": 3600
    }
  ]
}
```

HTTP Status: `429 Too Many Requests`

---

## Task Scheduling and Coordination

### Decision AI Routines

The Control Layer executes Decision AI routines that:

- **Aggregate Predictions**: Combine forecasts from all edge nodes
- **Calculate Energy-at-Risk**: Determine financial impact of faults
- **Optimize Scheduling**: Balance maintenance needs with production goals
- **Resource Allocation**: Assign crews and resources efficiently
- **Cost Optimization**: Minimize dispatch costs while maximizing revenue protection

### Unified Dashboard

The Control Layer maintains a unified dashboard for operators that provides:

- **Real-Time Status**: Current operational status of all assets
- **Risk Scores**: Energy-at-risk calculations for each asset
- **Active Work Orders**: List of pending and in-progress maintenance
- **Performance Metrics**: Aggregated performance data across the portfolio
- **Alert Management**: Centralized alert and notification system

---

## CMMS Integration

### Supported Systems

The Control Layer provides secure APIs for integration with maintenance management systems:

- **SAP PM**: SAP Plant Maintenance integration
- **Maximo**: IBM Maximo Asset Management integration
- **Custom CMMS**: RESTful API for custom system integration

### Integration Features

- **Work Order Sync**: Automatic work order creation and status updates
- **Asset Management**: Bidirectional asset data synchronization
- **Maintenance History**: Historical maintenance data exchange
- **Parts Management**: Bill of materials and inventory integration
- **Scheduling**: Maintenance schedule synchronization

### API Integration Example

```bash
# Create work order via API
curl -X POST https://api.asoba.co/terminal/order \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create",
    "asset_id": "INV-001",
    "priority": "high",
    "description": "Inverter fault detected"
  }'
```

---

## Lambda Services

The Control Layer is powered by the Terminal API Lambda function:

### Terminal API Service

**`ona-terminalApi-prod`**
- **Memory**: 1024MB
- **Timeout**: 300 seconds (5 minutes)
- **Purpose**: Handles all Terminal API endpoint requests
- **Capabilities**:
  - OODA workflow execution
  - Asset management
  - Fault detection and diagnostics
  - Maintenance scheduling
  - Work order generation
  - Job tracking

---

## Data Management

### DynamoDB Tables

The Control Layer uses DynamoDB tables for data storage:

**Terminal Tables:**
- `ona-platform-terminal-assets`: Asset information
- `ona-platform-terminal-schedules`: Maintenance schedules
- `ona-platform-terminal-boms`: Bill of materials
- `ona-platform-terminal-orders`: Work orders
- `ona-platform-terminal-tracking`: Job tracking data

**Platform Tables:**
- `ona-platform-locations`: Location and customer data
- `ona-platform-weather-cache`: Weather data cache

### S3 Storage

**Input Bucket**: `sa-api-client-input`
- Receives data from edge nodes
- Stores historical and real-time data

**Output Bucket**: `sa-api-client-output`
- Stores generated forecasts
- Stores model artifacts
- Stores diagnostic results

---

## Monitoring and Observability

### CloudWatch Integration

- **Log Groups**: Centralized logging for all API requests
- **Metrics**: Request counts, latency, error rates
- **Alarms**: Automated alerts for service issues
- **Dashboards**: Real-time monitoring dashboards

### Performance Metrics

- **Average Response Time**: < 2 seconds
- **P95 Response Time**: < 5 seconds
- **Error Rate**: < 0.1%
- **Availability**: 99.9%+

---

## Next Steps

- **[Edge Layer](edge-layer.html)** - Learn about the edge computing layer
- **[Interface Layer](interface-layer.html)** - Explore the user interface and dashboards
- **[Developer API Guide](archive/developers.html)** - Complete API documentation

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
