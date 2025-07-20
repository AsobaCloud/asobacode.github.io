---
title: "API Endpoints"
layout: default
nav_order: 2
---

## Ona API Platform - Complete Endpoints Documentation

This comprehensive guide documents ALL available APIs in the Ona energy platform ecosystem, covering the complete range of power tools modules from basic data processing to advanced AI-driven optimization and policy intelligence. The platform supports both cloud-based high-scale deployments and edge computing for data sovereignty.

---

## **Platform Architecture Overview**

### **Multi-Deployment Model**
- **Cloud APIs**: High-availability AWS infrastructure with global routing
- **Edge Deployment**: Local processing nodes for data sovereignty and low latency
- **Hybrid Integration**: Intelligent cloud-edge orchestration

### **Tiered Access Control**
- **Free Tier**: 3 policy queries, 5 forecasts, 10 data operations per month
- **Professional Tier**: 100 operations across all endpoints, up to 10,000 rows
- **Enterprise Tier**: Unlimited access with dedicated support and custom deployments

### **Core Infrastructure**
- **Base URL (Cloud)**: `https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod`
- **Base URL (Freemium)**: `https://api.asoba.co/api`
- **Edge URL**: `http://localhost:5000` (configurable)

---

## **1. Data Ingestion & Management APIs**

### **Historical Data Upload** {#upload-historical}

**Endpoint: POST** `/upload_historical`

**Description**: Uploads historical energy data for AI model training and analysis.

**Parameters**:
- `region` (string, required): Target region (`africa`, `northamerica`, `europe`)
- `filename` (string, required): Data file name (CSV format supported)
- `customer_id` (string, required): Unique customer identifier
- `manufacturer` (string, required): Equipment manufacturer for optimization
- `location` (string, required): Geographic location for weather correlation
- `equipment_type` (string, optional): `solar`, `wind`, `battery`, `grid`, `load`

**Example Request**:
```python
import requests

url = f"{base_url}/upload_historical"
params = {
    "customer_id": "solar_farm_001",
    "filename": "production_data_2024.csv",
    "manufacturer": "SolarEdge",
    "location": "CapeTown",
    "region": "africa",
    "equipment_type": "solar"
}
headers = {"x-api-key": "your-api-key"}

with open('production_data_2024.csv', 'rb') as file_data:
    response = requests.post(url, params=params, headers=headers, data=file_data)
```

**Response**:
```json
{
  "statusCode": 200,
  "body": "Data uploaded successfully",
  "processing_queue": "priority_queue",
  "estimated_processing_time": "5-10 minutes"
}
```

---

### **Real-Time Nowcast Ingestion** {#upload-nowcast}

**Endpoint: POST** `/upload_nowcast`

**Description**: Ingests real-time data for immediate forecasting and dispatch decisions.

**Parameters**:
- `customer_id` (string, required): Customer identifier
- `customer_type` (string, required): `residential`, `commercial`, `industrial`, `utility`
- `filename` (string, required): Data identifier
- `region` (string, required): Processing region

**Request Body**:
```json
{
  "parameters": {
    "forecast_window": 24,
    "confidence_interval": 0.95,
    "weather_integration": true,
    "dispatch_optimization": true
  },
  "data_points": [
    {"timestamp": "2025-06-26T10:00:00Z", "value": 150.5, "unit": "kW"},
    {"timestamp": "2025-06-26T10:15:00Z", "value": 148.2, "unit": "kW"}
  ]
}
```

---

### **Data Interpolation & Cleaning** {#interpolate-data}

**Endpoint: POST** `/interpolate`

**Description**: Advanced data processing using AI-driven interpolation and quality enhancement.

**Processing Modes**:
- `fill_missing_blocks`: Intelligent gap filling using pattern recognition
- `outlier_detection`: Statistical and ML-based anomaly identification
- `quality_enhancement`: Data smoothing and noise reduction
- `pattern_completion`: Seasonal and cyclical pattern reconstruction

**Request Body**:
```json
{
  "type": "production",
  "mode": "fill_missing_blocks",
  "data": [
    {"timestamp": "2024-01-01T00:00:00", "value": 100},
    {"timestamp": "2024-01-01T01:00:00", "value": null},
    {"timestamp": "2024-01-01T02:00:00", "value": 120}
  ],
  "processing_options": {
    "confidence_threshold": 0.85,
    "seasonal_adjustment": true,
    "weather_correlation": true,
    "max_gap_hours": 6
  }
}
```

**Response**:
```json
{
  "cleaned_data": [
    {"timestamp": "2024-01-01T00:00:00", "value": 100, "quality": "original"},
    {"timestamp": "2024-01-01T01:00:00", "value": 110, "quality": "interpolated"},
    {"timestamp": "2024-01-01T02:00:00", "value": 120, "quality": "original"}
  ],
  "processing_stats": {
    "rows_processed": 3,
    "missing_filled": 1,
    "outliers_detected": 0,
    "quality_improvement": 15.2
  }
}
```

---

## **2. AI-Powered Forecasting APIs**

### **Generation Forecasting** {#generate-forecast}

**Endpoint: POST** `/forecast` or `/api/generate-forecast`

**Description**: AI-driven forecasting for solar, wind, and load using advanced machine learning models.

**Model Types**:
- `arima`: Best for regular patterns, fast processing
- `lstm`: Excellent for complex patterns, moderate speed
- `prophet`: Very good for seasonal data
- `ensemble`: Combines multiple models for highest accuracy

**Request Body**:
```json
{
  "historical_data": [
    {"timestamp": "2024-01-01T00:00:00", "value": 100, "unit": "kW"},
    {"timestamp": "2024-01-01T01:00:00", "value": 110, "unit": "kW"}
  ],
  "forecast_config": {
    "horizon": 168,
    "model_type": "ensemble",
    "confidence_interval": 0.95,
    "weather_integration": true,
    "seasonal_adjustment": true
  }
}
```

**Response**:
```json
{
  "forecast": [
    {
      "timestamp": "2024-01-08T00:00:00", 
      "value": 105.2, 
      "confidence_lower": 98.1, 
      "confidence_upper": 112.3,
      "unit": "kW"
    }
  ],
  "model_performance": {
    "accuracy_metrics": {
      "mape": 4.2,
      "rmse": 2.1,
      "r_squared": 0.94
    },
    "model_used": "ensemble",
    "training_duration": "45 seconds"
  },
  "actionable_insights": [
    "Peak generation expected at 14:00 local time",
    "Weather volatility may impact afternoon output",
    "Maintenance window optimal between 06:00-08:00"
  ]
}
```

---

### **Market Price Forecasting** {#price-forecast}

**Endpoint: POST** `/api/price-forecast`

**Description**: Predict electricity market prices using historical data and market fundamentals.

**Supported Markets**:
- `caiso`: California ISO
- `pjm`: PJM Interconnection
- `ercot`: Texas ERCOT
- `eskom`: South Africa Eskom
- `nem`: Australia National Electricity Market

**Request Body**:
```json
{
  "historical_prices": [
    {"timestamp": "2024-06-25T00:00:00", "price": 45.50, "currency": "USD"},
    {"timestamp": "2024-06-25T01:00:00", "price": 42.30, "currency": "USD"}
  ],
  "market": "caiso",
  "forecast_horizon": 24,
  "include_fundamentals": true,
  "renewable_penetration": true,
  "duck_curve_adjustment": true
}
```

**Response**:
```json
{
  "price_forecast": [
    {
      "timestamp": "2024-06-26T00:00:00",
      "price": 48.75,
      "confidence_interval": [42.50, 55.00],
      "currency": "USD",
      "market_factors": ["high_demand", "low_wind"]
    }
  ],
  "market_insights": {
    "peak_price_time": "2024-06-26T19:00:00",
    "expected_volatility": "moderate",
    "renewable_impact": "high_solar_generation_midday"
  }
}
```

---

### **Weather Data Integration** {#weather-data}

**Endpoint: POST** `/api/weather-data`

**Description**: Download and process weather data for enhanced forecasting accuracy.

**Request Body**:
```json
{
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "timezone": "US/Pacific"
  },
  "date_range": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-07"
  },
  "parameters": [
    "temperature",
    "solar_radiation",
    "wind_speed",
    "cloud_cover",
    "humidity",
    "pressure"
  ],
  "forecast_mode": true
}
```

**Response**:
```json
{
  "weather_data": [
    {
      "timestamp": "2024-01-01T00:00:00",
      "temperature": 15.2,
      "solar_radiation": 0,
      "wind_speed": 3.5,
      "cloud_cover": 20,
      "humidity": 65,
      "pressure": 1013.2
    }
  ],
  "forecast_enhancement": {
    "solar_correlation": 0.87,
    "wind_correlation": 0.72,
    "temperature_impact": "moderate"
  }
}
```

---

## **3. AI Model Training & Management APIs**

### **Model Training** {#train-forecaster}

**Endpoint: POST** `/train`

**Description**: Train custom AI models for energy forecasting with advanced hyperparameter optimization.

**Parameters**:
- `customer_id` (string, required): Customer identifier
- `location` (string, required): Geographic location
- `manufacturer` (string, required): Equipment manufacturer
- `serial_number` (string, required): Device identifier
- `model_type` (string): `lstm`, `transformer`, `ensemble`
- `testing` (boolean): Development mode flag

**Request Body**:
```json
{
  "training_config": {
    "model_type": "ensemble",
    "hyperparameter_tuning": true,
    "cross_validation_folds": 5,
    "early_stopping": true,
    "feature_engineering": {
      "weather_features": true,
      "calendar_features": true,
      "lag_features": [1, 2, 3, 6, 12, 24, 48, 168],
      "rolling_statistics": [24, 168, 720]
    }
  },
  "data_requirements": {
    "minimum_data_points": 8760,
    "validation_split": 0.2,
    "test_split": 0.1
  }
}
```

**Response**:
```json
{
  "statusCode": 200,
  "training_job": {
    "job_id": "training_job_ensemble_20250626",
    "status": "initiated",
    "estimated_completion": "2025-06-26T14:30:00Z",
    "training_features": [
      "weather_integration", 
      "seasonal_patterns", 
      "equipment_degradation"
    ]
  },
  "training_progress_url": "/api/training-status/training_job_ensemble_20250626"
}
```

---

### **Training Status & Monitoring** {#training-status}

**Endpoint: GET** `/api/training-status/{job_id}`

**Description**: Monitor training progress and retrieve model performance metrics.

**Response**:
```json
{
  "job_id": "training_job_ensemble_20250626",
  "status": "completed",
  "progress": 100,
  "model_performance": {
    "validation_accuracy": {
      "mape": 3.8,
      "rmse": 1.9,
      "r_squared": 0.96
    },
    "cross_validation_scores": [0.94, 0.95, 0.96, 0.95, 0.97],
    "feature_importance": {
      "weather_temperature": 0.35,
      "hour_of_day": 0.28,
      "day_of_year": 0.20,
      "lag_24h": 0.17
    }
  },
  "model_artifacts": {
    "model_id": "ensemble_model_v1.2.3",
    "deployment_ready": true,
    "size_mb": 45.2
  }
}
```

---

## **4. Energy Optimization & Dispatch APIs**

### **Electricity Dispatch Optimization** {#dispatch-optimization}

**Endpoint: POST** `/api/dispatch-optimization`

**Description**: Optimize solar, battery, and grid resources for maximum revenue or minimum cost.

**Optimization Objectives**:
- `revenue`: Maximize revenue from energy sales
- `cost`: Minimize electricity costs
- `carbon`: Minimize carbon footprint
- `resilience`: Maximize grid independence

**Request Body**:
```json
{
  "forecasts": {
    "solar_forecast": [150, 200, 180, 160],
    "load_forecast": [120, 140, 160, 130],
    "price_forecast": [45.50, 52.30, 48.75, 42.10]
  },
  "system_config": {
    "battery_capacity_kwh": 100.0,
    "battery_power_kw": 50.0,
    "battery_min_soc": 0.2,
    "battery_max_soc": 0.9,
    "initial_soc": 0.5,
    "roundtrip_efficiency": 0.85
  },
  "optimization_config": {
    "objective": "revenue",
    "time_horizon": 24,
    "interval_minutes": 15,
    "grid_export_limit": 200,
    "demand_charges": true
  }
}
```

**Response**:
```json
{
  "optimization_result": {
    "dispatch_schedule": [
      {
        "timestamp": "2025-06-26T10:00:00",
        "battery_power": 25.5,
        "grid_power": -15.2,
        "load_served": 120.0,
        "soc": 0.65,
        "action": "charging"
      }
    ],
    "economic_summary": {
      "total_revenue": 1250.75,
      "electricity_cost": 890.25,
      "net_benefit": 360.50,
      "peak_shaving_savings": 125.30
    },
    "operational_insights": [
      "Charge battery during low-price hours (10:00-14:00)",
      "Discharge during peak pricing (17:00-21:00)",
      "Export excess solar generation at midday"
    ]
  }
}
```

---

### **Real-Time Dispatch Control** {#realtime-dispatch}

**Endpoint: POST** `/api/realtime-dispatch`

**Description**: Real-time dispatch commands for immediate energy system control.

**Request Body**:
```json
{
  "device_id": "battery_001",
  "command": {
    "action": "charge",
    "power_kw": 25.5,
    "duration_minutes": 15,
    "priority": "high"
  },
  "safety_checks": {
    "soc_limits": true,
    "temperature_check": true,
    "grid_constraints": true
  }
}
```

---

## **5. Policy & Compliance Intelligence APIs**

### **Policy Compliance Query** {#policy-compliance}

**Endpoint: POST** `/api/policy-compliance` or `/api/policy-compliance-freemium`

**Description**: AI-powered policy analysis and regulatory compliance guidance using advanced RAG architecture.

**Request Body**:
```json
{
  "query": "What are the current grid-tie requirements for solar installations over 1MW in South Africa?",
  "context": {
    "region": "south_africa",
    "sector": "renewable_energy",
    "project_size": "utility_scale",
    "installation_type": "ground_mounted"
  },
  "response_options": {
    "include_citations": true,
    "include_compliance_checklist": true,
    "include_financial_incentives": true,
    "detail_level": "comprehensive"
  }
}
```

**Response**:
```json
{
  "answer": "Current South African grid-tie requirements for utility-scale solar installations include...",
  "sources": [
    "NERSA Grid Code Requirements 2024",
    "Municipal Electricity Regulations Update",
    "Eskom Connection Standards v3.2"
  ],
  "compliance_checklist": [
    {
      "requirement": "Technical compliance certification",
      "status": "required",
      "deadline": "Before commissioning",
      "responsible_party": "Developer"
    },
    {
      "requirement": "Environmental impact assessment",
      "status": "required",
      "deadline": "Development phase",
      "responsible_party": "Environmental consultant"
    }
  ],
  "financial_incentives": [
    {
      "program": "Renewable Energy IPP Procurement",
      "benefit": "20-year power purchase agreement",
      "eligibility": "Competitive bidding process"
    }
  ],
  "next_steps": [
    "Contact Eskom for grid impact study",
    "Submit application to municipal authority",
    "Schedule pre-installation inspection"
  ],
  "tier_info": {
    "tier": "professional",
    "queries_used": 15,
    "queries_remaining": 85
  }
}
```

---

### **Regulatory Updates** {#regulatory-updates}

**Endpoint: GET** `/api/regulatory-updates`

**Description**: Retrieve latest regulatory changes and policy updates.

**Parameters**:
- `region`: Geographic region filter
- `sector`: Industry sector filter
- `since_date`: Updates since specific date
- `priority`: `high`, `medium`, `low`

**Response**:
```json
{
  "updates": [
    {
      "id": "reg_update_2024_156",
      "title": "Updated Grid Code Requirements for Renewable Energy",
      "summary": "New technical standards for grid-connected renewable energy systems",
      "effective_date": "2025-01-01",
      "priority": "high",
      "impact_assessment": "All new installations must comply",
      "source": "NERSA",
      "document_url": "https://nersa.org.za/grid-code-2024"
    }
  ]
}
```

---

## **6. Results & Analytics APIs**

### **Forecasting Results Retrieval** {#results}

**Endpoint: GET** `/results` or `/api/forecast-results`

**Description**: Retrieve comprehensive forecasting results with analytics and insights.

**Parameters**:
- `client_id` (string, required): Client organization identifier
- `customer_id` (string, required): Customer identifier
- `serial_number` (string, required): Device identifier
- `format` (string): `json`, `csv`, `email`
- `date_range` (string): Results date range

**Response**:
```json
{
  "results": {
    "forecast_data": [
      {
        "timestamp": "2025-06-26T10:00:00",
        "predicted_value": 145.2,
        "actual_value": 142.8,
        "accuracy": 98.3,
        "confidence_interval": [138.5, 151.9]
      }
    ],
    "performance_metrics": {
      "overall_accuracy": 94.7,
      "last_24h_accuracy": 96.2,
      "trending": "improving",
      "model_version": "ensemble_v1.2.3"
    },
    "business_insights": {
      "revenue_optimization": "12.5% improvement possible",
      "peak_demand_management": "Optimal charging window: 10:00-14:00",
      "maintenance_recommendations": [
        "Schedule cleaning during low-generation period",
        "Monitor inverter performance metrics"
      ]
    }
  }
}
```

---

### **Project Economics Analysis** {#project-economics}

**Endpoint: POST** `/api/project-economics`

**Description**: Calculate financial metrics including ROI, NPV, and payback period for energy projects.

**Request Body**:
```json
{
  "project_config": {
    "capital_cost": 500000,
    "annual_revenue": 75000,
    "annual_expenses": 15000,
    "project_lifetime": 25,
    "discount_rate": 0.08,
    "degradation_rate": 0.005
  },
  "revenue_streams": {
    "energy_sales": 45000,
    "capacity_payments": 12000,
    "ancillary_services": 8000,
    "carbon_credits": 10000
  },
  "incentives": {
    "tax_credit": 0.30,
    "depreciation_schedule": "MACRS_5_year",
    "grant_funding": 50000
  }
}
```

**Response**:
```json
{
  "financial_metrics": {
    "npv": 125750.50,
    "irr": 0.142,
    "payback_period": 7.2,
    "lcoe": 0.045,
    "roi": 0.251
  },
  "cash_flow_projection": [
    {"year": 1, "cash_flow": 60000, "cumulative": 60000},
    {"year": 2, "cash_flow": 65500, "cumulative": 125500}
  ],
  "sensitivity_analysis": {
    "revenue_sensitivity": {
      "+10%": {"npv": 175250.50, "irr": 0.168},
      "-10%": {"npv": 76250.50, "irr": 0.116}
    }
  },
  "investment_recommendation": "Proceed - Strong financial returns with acceptable risk profile"
}
```

---

## **7. User & System Management APIs**

### **User Registration** {#register}

**Endpoint: POST** `/api/register`

**Description**: Register new users and generate API keys with tier-based access control.

**Request Body**:
```json
{
  "email": "user@example.com",
  "organization": "Solar Solutions Inc",
  "use_case": "solar_forecasting",
  "tier_preference": "professional"
}
```

**Response**:
```json
{
  "api_key": "ona_prod_xxxxxxxxxxxxx",
  "email": "user@example.com",
  "tier": "free",
  "limits": {
    "policy_queries_per_month": 3,
    "forecasts_per_month": 5,
    "data_cleaning_per_month": 10,
    "max_rows_per_cleaning": 100
  },
  "upgrade_url": "https://app.asoba.co/upgrade"
}
```

---

### **Usage Statistics** {#usage-stats}

**Endpoint: GET** `/api/usage`

**Description**: Retrieve current usage statistics and limits for authenticated user.

**Response**:
```json
{
  "user_email": "user@example.com",
  "tier": "professional",
  "current_month": "2025-06",
  "usage": {
    "policy_queries": 25,
    "forecasts": 47,
    "data_cleaning_operations": 12,
    "model_training_jobs": 3
  },
  "limits": {
    "policy_queries_per_month": 100,
    "forecasts_per_month": 100,
    "data_cleaning_per_month": 100,
    "model_training_per_month": 10,
    "max_rows_per_cleaning": 10000
  },
  "usage_percentage": {
    "policy_queries": 25,
    "forecasts": 47,
    "data_cleaning": 12
  }
}
```

---

### **Client & Customer Management** {#manage-users}

**Endpoint: POST** `/api/create-client`

**Description**: Create and manage client organizations, customers, and devices.

**Create Client**:
```json
{
  "client_id": "solar_solutions_inc",
  "name": "Solar Solutions Inc",
  "contact_email": "admin@solarsolutions.com",
  "tier": "enterprise",
  "services": ["forecasting", "optimization", "policy_intelligence"]
}
```

**Create Customer** (POST `/api/create-customer`):
```json
{
  "client_id": "solar_solutions_inc",
  "customer_id": "customer_001",
  "contact_name": "John Smith",
  "email": "john@example.com",
  "location": "CapeTown",
  "system_type": "commercial_solar"
}
```

**Create Device** (POST `/api/create-device`):
```json
{
  "customer_id": "customer_001",
  "device_type": "inverter",
  "serial_number": "SE12345",
  "manufacturer": "SolarEdge",
  "capacity_kw": 50.0,
  "installation_date": "2024-06-15"
}
```

---

## **8. System Health & Monitoring APIs**

### **Health Check** {#health}

**Endpoint: GET** `/health`

**Description**: System health status and service availability check.

**Response**:
```json
{
  "status": "healthy",
  "service": "Ona Energy Platform",
  "version": "1.5.0",
  "timestamp": "2025-06-26T10:30:00Z",
  "components": {
    "forecasting_engine": "operational",
    "optimization_service": "operational",
    "policy_intelligence": "operational",
    "data_processing": "operational",
    "weather_api": "operational"
  },
  "performance_metrics": {
    "avg_response_time_ms": 245,
    "success_rate_24h": 99.7,
    "active_models": 156,
    "processed_forecasts_today": 1247
  }
}
```

---

### **System Monitoring** {#monitoring}

**Endpoint: GET** `/api/system-status`

**Description**: Detailed system performance and monitoring metrics (Enterprise tier).

**Response**:
```json
{
  "system_metrics": {
    "cpu_usage": 35.2,
    "memory_usage": 67.8,
    "disk_usage": 45.3,
    "network_throughput": "125 Mbps"
  },
  "service_metrics": {
    "active_forecasting_jobs": 12,
    "training_queue_length": 3,
    "api_requests_per_minute": 47,
    "cache_hit_rate": 89.5
  },
  "model_performance": {
    "average_model_accuracy": 94.7,
    "models_requiring_retraining": 2,
    "latest_model_deployment": "2025-06-25T14:30:00Z"
  }
}
```

---

## **API Integration Patterns**

### **Authentication & Headers**

All endpoints require proper authentication:

```http
X-API-Key: your-api-key-here
Content-Type: application/json
User-Agent: YourApp/1.0
```

### **Rate Limiting**

Rate limits vary by tier and endpoint:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 75
X-RateLimit-Reset: 1640995200
```

### **Error Handling**

Standardized error responses:

```json
{
  "error": {
    "code": "TIER_LIMIT_EXCEEDED",
    "message": "Monthly query limit reached",
    "details": {
      "current_tier": "free",
      "limit": 3,
      "used": 3
    },
    "upgrade_url": "https://app.asoba.co/upgrade",
    "support_contact": "support@asoba.co"
  }
}
```

### **Webhook Support**

For long-running operations:

```json
{
  "webhook_url": "https://your-app.com/ona-webhook",
  "events": ["training_completed", "forecast_ready", "dispatch_executed"],
  "secret": "webhook_secret_key"
}
```

---

## **Edge Deployment APIs**

All cloud APIs are available in edge deployment with identical interfaces:

**Edge Base URL**: `http://localhost:5000`

**Additional Edge Endpoints**:

### **Edge Configuration** {#edge-config}

**Endpoint: POST** `/api/edge/configure`

**Description**: Configure edge deployment settings.

**Request Body**:
```json
{
  "cloud_sync": true,
  "local_storage_limit": "100GB",
  "auto_cleanup_days": 30,
  "performance_mode": "balanced",
  "security_level": "high"
}
```

### **Edge Status** {#edge-status}

**Endpoint: GET** `/api/edge/status`

**Response**:
```json
{
  "edge_node_id": "edge_001",
  "cloud_connectivity": "connected",
  "local_storage_used": "45.2GB",
  "models_cached": 12,
  "processing_capability": "full",
  "sync_status": "up_to_date"
}
```

---

## **Advanced Features**

### **Batch Processing** {#batch-processing}

**Endpoint: POST** `/api/batch-process`

**Description**: Process multiple operations in a single request.

```json
{
  "operations": [
    {"type": "forecast", "customer_id": "cust_001", "horizon": 24},
    {"type": "optimize", "customer_id": "cust_002", "objective": "cost"},
    {"type": "interpolate", "customer_id": "cust_003", "mode": "quality_enhancement"}
  ],
  "execution_mode": "parallel",
  "callback_url": "https://your-app.com/batch-complete"
}
```

### **Model Marketplace** {#model-marketplace}

**Endpoint: GET** `/api/models/marketplace`

**Description**: Browse and deploy pre-trained models for specific use cases.

```json
{
  "available_models": [
    {
      "model_id": "solar_residential_v2.1",
      "name": "Residential Solar Forecasting",
      "accuracy": 96.2,
      "use_case": "rooftop_solar",
      "region": "north_america",
      "price": "free"
    }
  ]
}
```

---

## **Support & Resources**

### **API Support Tiers**

- **Community Support**: Documentation and forums
- **Professional Support**: Email support with 24h response
- **Enterprise Support**: Dedicated support team with 2h response

### **Contact Information**

- **Technical Support**: support@asoba.co
- **Business Development**: 
  - Shingai: shingai@asoba.co
  - Gertie: gertie@asoba.co
- **Partnership Inquiries**: info@asoba.co

### **Resource Links**

- **API Status**: https://status.asoba.co
- **Documentation Portal**: https://docs.asoba.co
- **Developer Community**: https://community.asoba.co
- **Model Training Tutorials**: https://learn.asoba.co

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Enterprise Support</h3>
      <p>Our team provides comprehensive API support, custom model development, and enterprise deployment assistance for the complete Ona energy platform.</p>
      <a href="mailto:support@asoba.co" class="support-button">Contact Support</a>
      <p><strong>Business Development:</strong><br>
      Shingai: shingai@asoba.co<br>
      Gertie: gertie@asoba.co</p>
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
            <h3>API Updates & News</h3>
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

---

**© 2025 Asoba Corporation. All rights reserved.**

*Ona Platform: The most comprehensive energy intelligence API platform, powering the future of intelligent energy infrastructure through advanced AI, seamless integration, and complete business intelligence for the energy sector.*
