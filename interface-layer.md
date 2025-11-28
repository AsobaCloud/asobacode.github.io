---
title: "Interface Layer"
layout: default
nav_order: 4
parent: "Introduction"
---

# Interface Layer
{: .fs-8 }

The Interface Layer displays operational status, risk scores, and active work orders using deterministic templates to eliminate hallucination and allow users to examine model confidence and trace data sources directly.
{: .fs-6 .fw-300 }

---

## Overview

The Interface Layer provides the user-facing components of the Ona Platform. It displays operational status, risk scores, and active work orders using deterministic templates rather than generative text to eliminate hallucination. Users can examine model confidence and trace data sources directly, ensuring transparency and trust in AI-driven decisions.

**Key Capabilities:**
- Displays operational status and risk scores
- Shows active work orders and maintenance schedules
- Uses deterministic templates (no generative text)
- Allows model confidence examination
- Enables data source tracing
- Provides unified dashboard for operators

---

## Admin Dashboard Data Service

The `ui/data-service.js` module maintains a unified cache that the admin dashboard consumes, providing consistent data access across all interface components.

### Performance Metrics

**`computeSitePerformanceMetrics()`** aggregates nowcast series into customer- and site-level snapshots. Helper methods provide consistent data access:

- **`getPerformanceSnapshot()`**: Returns current performance snapshot
- **`getPerformanceSeries()`**: Returns time series performance data
- **`getPerformanceSummary()`**: Returns aggregated performance summary

**Features:**
- API and demo modes use the same helpers
- Consistent data structure across all views
- Real-time performance calculations
- Historical trend analysis

### Anomaly Consolidation

**`buildAnomalyIssueIndex()`** and **`buildOODAActivityFeed()`** merge detections, diagnostics, issues, maintenance plans, and manual actions to keep interface components aligned with terminal API state.

**Components:**
- **Component Issues Table**: Displays all active issues with severity and status
- **OODA Activity Stream**: Real-time feed of OODA workflow activities
- **Issue Prioritization**: Automatic prioritization based on energy-at-risk
- **Status Synchronization**: Keeps UI in sync with backend state

### Forecast Comparison

**`buildForecastComparison()`** aligns forecast output with actual production, computes deltas, and feeds the "Forecast vs Actual" chart without additional UI-side processing.

**Features:**
- Automatic forecast vs. actual comparison
- Delta calculations (predicted vs. actual)
- Confidence interval visualization
- Performance accuracy metrics
- Historical forecast accuracy tracking

### Mode Switching

Switching the dashboard between **API** and **Demo** mode simply selects a different population path for the cache; the UI logic reads from the same getters in both cases.

**Benefits:**
- Consistent UI behavior across modes
- Easy testing with demo data
- Seamless transition between modes
- No code duplication

### Refresh Cycle

Manual refresh (and the five-minute auto-refresh) triggers **`refreshAllData()`**, which rebuilds caches once and dispatches a `dataRefreshed` event that all widgets listen to. Charts no longer simulate data—they render directly from the cached series.

**Refresh Features:**
- Manual refresh button
- Automatic 5-minute refresh
- Event-driven updates
- Efficient cache rebuilding
- Real-time data rendering

---

## Frontend UI API Integration

The Interface Layer connects to backend APIs through a comprehensive integration layer that provides complete request/response schemas and data structures.

### DataService Wrapper Methods

The DataService provides wrapper methods for all Terminal API endpoints:

**Asset Management:**
- `getAssets()`: Retrieve all assets
- `getAsset(assetId)`: Get specific asset details
- `createAsset(assetData)`: Create new asset
- `updateAsset(assetId, assetData)`: Update asset information

**Fault Detection:**
- `runDetection(assetId)`: Execute fault detection
- `getDetections(assetId)`: Retrieve detection results
- `getDetectionHistory(assetId)`: Get historical detections

**Diagnostics:**
- `runDiagnostics(assetId)`: Execute AI diagnostics
- `getDiagnostics(assetId)`: Retrieve diagnostic results
- `getDiagnosticHistory(assetId)`: Get historical diagnostics

**Maintenance:**
- `getSchedules()`: Retrieve maintenance schedules
- `createSchedule(scheduleData)`: Create new schedule
- `getWorkOrders()`: Retrieve work orders
- `createWorkOrder(orderData)`: Create new work order
- `trackJob(jobId)`: Track job status

### Return Types

All DataService methods return consistent data structures:

```javascript
{
  success: boolean,
  data: object | array,
  metadata: {
    request_id: string,
    timestamp: string,
    version: string
  },
  errors: array
}
```

### Frontend Module APIs

**Performance Module:**
- `Performance.getSnapshot()`: Get current performance snapshot
- `Performance.getSeries()`: Get time series data
- `Performance.getSummary()`: Get aggregated summary

**Issues Module:**
- `Issues.getActive()`: Get active issues
- `Issues.getBySeverity()`: Filter by severity
- `Issues.getByAsset()`: Filter by asset

**Dashboard Module:**
- `Dashboard.getOverview()`: Get dashboard overview
- `Dashboard.getMetrics()`: Get key metrics
- `Dashboard.getAlerts()`: Get active alerts

**Maintenance Module:**
- `Maintenance.getSchedules()`: Get maintenance schedules
- `Maintenance.getWorkOrders()`: Get work orders
- `Maintenance.getHistory()`: Get maintenance history

### Service APIs

**CacheService:**
- `CacheService.get(key)`: Get cached value
- `CacheService.set(key, value)`: Set cached value
- `CacheService.clear()`: Clear all cache
- `CacheService.refresh()`: Refresh cache

**StateService:**
- `StateService.getState()`: Get current state
- `StateService.setState(state)`: Update state
- `StateService.subscribe(callback)`: Subscribe to state changes

**TimerService:**
- `TimerService.start(interval, callback)`: Start timer
- `TimerService.stop()`: Stop timer
- `TimerService.setInterval(interval)`: Update interval

### Component APIs

**ChartComponent:**
- `ChartComponent.render(data)`: Render chart
- `ChartComponent.update(data)`: Update chart data
- `ChartComponent.destroy()`: Destroy chart instance

**MetricCard:**
- `MetricCard.setValue(value)`: Set metric value
- `MetricCard.setLabel(label)`: Set metric label
- `MetricCard.setTrend(trend)`: Set trend indicator

---

## Operational Status Display

### Real-Time Status

The Interface Layer displays real-time operational status for all assets:

- **Asset Status**: Online, offline, maintenance mode
- **Performance Status**: Normal, degraded, fault
- **Connection Status**: Connected, disconnected, intermittent
- **Last Update**: Timestamp of last data update

### Risk Scores

Energy-at-risk (EAR) calculations are displayed for each asset:

- **Current EAR**: Real-time energy-at-risk value
- **Daily EAR**: Projected daily energy loss
- **Monthly EAR**: Projected monthly energy loss
- **Financial Impact**: USD value of energy-at-risk
- **Confidence Level**: Model confidence in EAR calculation

### Active Work Orders

The interface displays all active work orders with:

- **Work Order ID**: Unique identifier
- **Asset ID**: Associated asset
- **Priority**: Critical, high, medium, low
- **Status**: Pending, in-progress, completed
- **Scheduled Date**: Planned execution date
- **Estimated Duration**: Expected completion time
- **Assigned Crew**: Responsible maintenance team

---

## Deterministic Templates

### No Generative Text

The Interface Layer uses **deterministic templates** rather than generative text to eliminate hallucination risks:

- **Predefined Templates**: All text is from predefined templates
- **Data-Driven Content**: Content is populated from actual data
- **No LLM Generation**: No language model text generation
- **Consistent Formatting**: Standardized presentation across all views

### Template Examples

**Status Messages:**
- "Asset {assetId} is operating normally"
- "Fault detected on {assetId}: {faultType}"
- "Maintenance scheduled for {assetId} on {date}"

**Risk Descriptions:**
- "Energy-at-risk: {value} kW ({confidence}% confidence)"
- "Estimated daily loss: ${amount} USD"
- "Recommended action: {action}"

**Work Order Descriptions:**
- "Work order {orderId} for {assetId}"
- "Priority: {priority} | Status: {status}"
- "Scheduled: {date} | Duration: {duration} hours"

---

## Model Confidence Examination

### Confidence Indicators

Users can examine model confidence for all predictions:

- **Confidence Score**: 0-100% confidence level
- **Confidence Intervals**: Upper and lower bounds
- **Model Version**: Version of model used
- **Training Data**: Information about training dataset
- **Validation Metrics**: Model validation results

### Data Source Tracing

Users can trace data sources directly:

- **Data Origin**: Source of each data point
- **Processing Steps**: How data was processed
- **Transformation History**: Data transformations applied
- **Quality Metrics**: Data quality indicators
- **Timestamp Chain**: Complete timestamp history

### Transparency Features

- **Model Explainability**: Why the model made a prediction
- **Feature Importance**: Which features influenced the prediction
- **Historical Comparison**: Compare with historical predictions
- **Error Analysis**: Analysis of prediction errors

---

## User Interface Components

### Dashboard Views

**Overview Dashboard:**
- Portfolio-wide metrics
- Key performance indicators
- Active alerts summary
- Recent activities

**Asset Detail View:**
- Individual asset information
- Performance history
- Fault history
- Maintenance history

**Maintenance View:**
- Active work orders
- Maintenance schedules
- Crew assignments
- Parts inventory

**Analytics View:**
- Performance trends
- Forecast accuracy
- Energy-at-risk trends
- Cost analysis

### Interactive Features

- **Drill-Down**: Click to see detailed information
- **Filtering**: Filter by asset, date, severity, etc.
- **Sorting**: Sort by any column
- **Export**: Export data to CSV/JSON
- **Print**: Print reports and views

---

## Integration with Control Layer

The Interface Layer communicates with the Control Layer through:

- **RESTful APIs**: Standard HTTP/REST API calls
- **WebSocket**: Real-time updates via WebSocket connections
- **Event System**: Event-driven updates for real-time changes
- **Caching**: Local caching for improved performance

---

## Performance Characteristics

### Load Times
- **Initial Load**: < 2 seconds
- **Page Navigation**: < 500ms
- **Data Refresh**: < 1 second
- **Chart Rendering**: < 300ms

### Responsiveness
- **Mobile Support**: Fully responsive design
- **Tablet Support**: Optimized for tablet viewing
- **Desktop Support**: Full-featured desktop experience

### Browser Compatibility
- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support

---

## Next Steps

- **[Edge Layer](edge-layer.html)** - Learn about the edge computing layer
- **[Control Layer](control-layer.html)** - Explore the API and coordination layer
- **[User Guide](user-guide.html)** - Get started with Ona Platform

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
