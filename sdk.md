---
title: "Ona SDK - Enhanced Integration Guide"
layout: default
nav_order: 3
---

## Ona SDK - Enhanced Integration Guide {#getting-started}

This comprehensive reference documents the complete Ona SDK for seamless integration with the Ona Energy Platform. Our SDK enables developers to harness the full power of AI-driven energy forecasting, policy compliance intelligence, and advanced data processing through both cloud-based APIs and edge deployment options.

The Ona SDK supports **JavaScript (Node.js & Browser)**, **Python**, and **Edge deployment** configurations, making it the most flexible energy data integration platform available.

---

## **Platform Features**

### **🚀 Core Capabilities**
- **AI-Powered Forecasting** – Advanced machine learning models for energy prediction
- **Policy Intelligence** – Real-time regulatory compliance and policy guidance  
- **Data Processing** – Intelligent interpolation, cleaning, and quality enhancement
- **Multi-Tier Access** – Scalable plans from free developer access to enterprise deployment
- **Edge Computing** – Local processing for data sovereignty and ultra-low latency

### **🏗️ Deployment Options**
- **Cloud-First**: Global AWS infrastructure with intelligent regional routing
- **Edge Computing**: Local processing nodes for maximum security and performance
- **Hybrid Integration**: Seamless cloud-edge orchestration for optimal cost and performance

### **📊 Intelligence Features**
- **Weather Integration**: Automatic correlation with meteorological data
- **Equipment Optimization**: Manufacturer-specific model tuning
- **Seasonal Patterns**: Advanced time-series analysis with cyclical recognition
- **Anomaly Detection**: AI-driven outlier identification and correction

---

## **Installation & Setup** {#installation}

### **Prerequisites**
- **Node.js 16+** (for JavaScript SDK)
- **Python 3.8+** (for Python SDK)
- **API Key** from [app.asoba.co](https://app.asoba.co)
- **Docker** (optional, for edge deployment)

### **JavaScript Installation**

#### **Standard Installation**
```bash
npm install ona-energy-sdk
```

#### **Development Setup**
```bash
git clone https://github.com/AsobaCloud/ona-sdk-js.git
cd ona-sdk-js
npm install
npm run build
```

### **Python Installation**

#### **Standard Installation**
```bash
pip install ona-energy-sdk
```

#### **Development Setup**
```bash
git clone https://github.com/AsobaCloud/ona-sdk-python.git
cd ona-sdk-python
pip install -r requirements.txt
pip install -e .
```

### **Environment Configuration**

Create a `.env` file with your configuration:

```env
# API Configuration
ONA_API_KEY=ona_xxxxxxxxxxxxxxxxxxxxxxxx
ONA_BASE_URL=https://api.asoba.co
ONA_REGION=af-south-1

# Deployment Options
ONA_DEPLOYMENT_TYPE=cloud  # cloud, edge, or hybrid
ONA_EDGE_ENDPOINT=http://localhost:5000  # for edge deployment

# Feature Flags
ONA_ENABLE_WEATHER=true
ONA_ENABLE_POLICY_INTELLIGENCE=true
ONA_CACHE_RESULTS=true

# Advanced Options
ONA_TIMEOUT=30
ONA_MAX_RETRIES=3
ONA_LOG_LEVEL=INFO
```

---

## **Quick Start Examples** {#usage-examples}

### **JavaScript SDK**

#### **Complete Energy Forecasting Workflow**
```javascript
const { OnaClient } = require('ona-energy-sdk');

class EnergyForecastingApp {
    constructor() {
        this.client = new OnaClient({
            apiKey: process.env.ONA_API_KEY,
            region: 'af-south-1',
            tier: 'professional'  // free, professional, enterprise
        });
    }

    async processEnergyData(filePath, customerConfig) {
        try {
            // Step 1: Upload historical data with AI preprocessing
            console.log('📤 Uploading historical data...');
            const uploadResult = await this.client.uploadHistoricalData({
                filePath: filePath,
                customerId: customerConfig.id,
                location: customerConfig.location,
                manufacturer: customerConfig.manufacturer,
                equipmentType: customerConfig.type,
                weatherIntegration: true
            });

            // Step 2: Initiate AI model training
            console.log('🧠 Starting AI model training...');
            const trainingJob = await this.client.trainForecastingModel({
                customerId: customerConfig.id,
                modelType: 'ensemble',  // lstm, transformer, ensemble
                seasonalAdjustment: true,
                weatherCorrelation: true,
                equipmentDegradation: true
            });

            // Step 3: Monitor training progress
            console.log('⏳ Monitoring training progress...');
            const trainingStatus = await this.client.waitForTrainingCompletion(
                trainingJob.trainingJobId,
                { pollInterval: 30000, maxWaitTime: 1800000 }
            );

            // Step 4: Generate forecasts with confidence intervals
            console.log('🔮 Generating forecasts...');
            const forecast = await this.client.generateForecast({
                customerId: customerConfig.id,
                forecastWindow: 168,  // 7 days in hours
                confidenceInterval: 0.95,
                includeWeatherImpact: true,
                optimizationTarget: 'accuracy'  // accuracy, speed, cost
            });

            // Step 5: Get actionable insights
            const insights = await this.client.getActionableInsights({
                forecast: forecast,
                businessRules: customerConfig.businessRules,
                includeMaintenanceWindows: true
            });

            return {
                uploadResult,
                trainingStatus,
                forecast,
                insights,
                performance: {
                    accuracy: trainingStatus.metrics.mape,
                    confidence: forecast.averageConfidence,
                    processingTime: Date.now() - startTime
                }
            };

        } catch (error) {
            console.error('❌ Energy forecasting workflow failed:', error);
            
            // Enhanced error handling with automatic recovery
            if (error.code === 'TIER_LIMIT_EXCEEDED') {
                console.log('💡 Consider upgrading to Professional tier for unlimited access');
                console.log('🔗 Upgrade at: https://app.asoba.co/upgrade');
            }
            
            throw error;
        }
    }

    async queryPolicyCompliance(query, sector = 'renewable_energy') {
        try {
            console.log('📋 Querying policy intelligence...');
            const policyResult = await this.client.queryPolicyCompliance({
                query: query,
                region: 'south_africa',
                sector: sector,
                includeFinancialIncentives: true,
                includeComplianceChecklist: true
            });

            return {
                answer: policyResult.answer,
                sources: policyResult.sources,
                compliance: policyResult.complianceChecklist,
                incentives: policyResult.financialIncentives,
                nextSteps: policyResult.recommendedActions
            };
        } catch (error) {
            console.error('❌ Policy query failed:', error);
            throw error;
        }
    }
}

// Example Usage
(async () => {
    const app = new EnergyForecastingApp();
    
    // Customer configuration
    const solarFarmConfig = {
        id: "solar_farm_western_cape_001",
        location: "CapeTown",
        manufacturer: "SolarMax",
        type: "utility_scale_solar",
        businessRules: {
            maintenanceHours: [6, 7, 8],  // 6-8 AM
            minimumGeneration: 0.1,
            peakDemandHours: [17, 18, 19, 20]
        }
    };

    // Run complete forecasting workflow
    const results = await app.processEnergyData(
        './data/solar_production_2024.csv',
        solarFarmConfig
    );
    
    console.log('✅ Forecasting Results:', results);

    // Query policy compliance
    const policyGuidance = await app.queryPolicyCompliance(
        "What are the latest feed-in tariff rates for solar installations over 1MW?"
    );
    
    console.log('📋 Policy Guidance:', policyGuidance);
})();
```

### **Python SDK**

#### **Advanced Energy Analytics Platform**
```python
import asyncio
import pandas as pd
from ona_energy_sdk import OnaClient
from ona_energy_sdk.utils import DataProcessor, PolicyAnalyzer
import logging

class AdvancedEnergyPlatform:
    def __init__(self, api_key: str, deployment_type: str = 'cloud'):
        """
        Initialize advanced energy analytics platform
        
        Args:
            api_key: Ona API key
            deployment_type: 'cloud', 'edge', or 'hybrid'
        """
        self.client = OnaClient(
            api_key=api_key,
            base_url=self._get_base_url(deployment_type),
            timeout=60,
            max_retries=3,
            enable_caching=True
        )
        
        self.data_processor = DataProcessor(client=self.client)
        self.policy_analyzer = PolicyAnalyzer(client=self.client)
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)

    def _get_base_url(self, deployment_type: str) -> str:
        """Get appropriate base URL based on deployment type"""
        if deployment_type == 'edge':
            return 'http://localhost:5000'
        elif deployment_type == 'hybrid':
            return 'https://api.asoba.co'  # Will auto-route to edge when available
        return 'https://api.asoba.co'

    async def comprehensive_energy_analysis(self, 
                                          data_file: str, 
                                          customer_config: dict,
                                          analysis_config: dict = None):
        """
        Perform comprehensive energy analysis including forecasting,
        optimization, and policy compliance
        """
        analysis_config = analysis_config or {
            'forecast_horizon': 168,  # 7 days
            'confidence_level': 0.95,
            'include_weather': True,
            'include_policy_analysis': True,
            'optimization_target': 'cost_efficiency'
        }

        try:
            # Phase 1: Data preprocessing and quality enhancement
            self.logger.info("🔧 Starting data preprocessing...")
            
            raw_data = pd.read_csv(data_file)
            processed_data = await self.data_processor.enhance_data_quality(
                data=raw_data,
                interpolation_method='intelligent',
                outlier_detection=True,
                seasonal_decomposition=True
            )

            # Phase 2: Upload processed data
            self.logger.info("📤 Uploading processed data...")
            upload_result = await self.client.upload_historical_data(
                file_data=processed_data.to_csv(),
                customer_id=customer_config['id'],
                location=customer_config['location'],
                manufacturer=customer_config['manufacturer'],
                equipment_type=customer_config.get('equipment_type', 'solar'),
                metadata={
                    'data_quality_score': processed_data.attrs.get('quality_score'),
                    'processing_timestamp': pd.Timestamp.now().isoformat(),
                    'original_rows': len(raw_data),
                    'processed_rows': len(processed_data)
                }
            )

            # Phase 3: AI model training with hyperparameter optimization
            self.logger.info("🧠 Training AI forecasting models...")
            training_config = {
                'customer_id': customer_config['id'],
                'model_type': 'ensemble',
                'hyperparameter_tuning': True,
                'cross_validation_folds': 5,
                'early_stopping': True,
                'feature_engineering': {
                    'weather_features': analysis_config['include_weather'],
                    'calendar_features': True,
                    'lag_features': [1, 2, 3, 6, 12, 24, 48, 168],
                    'rolling_statistics': [24, 168, 720]  # 1d, 1w, 1m windows
                }
            }

            training_job = await self.client.train_forecasting_model(**training_config)
            
            # Monitor training with progress updates
            training_status = await self._monitor_training_progress(
                training_job['training_job_id']
            )

            # Phase 4: Generate multi-horizon forecasts
            self.logger.info("🔮 Generating multi-horizon forecasts...")
            forecasts = {}
            
            for horizon in [24, 72, 168]:  # 1d, 3d, 7d forecasts
                forecast = await self.client.generate_forecast(
                    customer_id=customer_config['id'],
                    forecast_window=horizon,
                    confidence_interval=analysis_config['confidence_level'],
                    include_weather_impact=analysis_config['include_weather'],
                    scenario_analysis=True
                )
                forecasts[f'{horizon}h'] = forecast

            # Phase 5: Policy compliance and regulatory analysis
            policy_analysis = None
            if analysis_config.get('include_policy_analysis'):
                self.logger.info("📋 Analyzing policy compliance...")
                policy_analysis = await self.policy_analyzer.comprehensive_analysis(
                    customer_config=customer_config,
                    forecasts=forecasts,
                    compliance_domains=['grid_connection', 'environmental', 'financial']
                )

            # Phase 6: Optimization recommendations
            self.logger.info("⚡ Generating optimization recommendations...")
            optimization = await self._generate_optimization_recommendations(
                customer_config, forecasts, policy_analysis, analysis_config
            )

            # Phase 7: Risk assessment
            risk_assessment = await self._assess_operational_risks(
                forecasts, customer_config, training_status['metrics']
            )

            return {
                'data_processing': {
                    'quality_improvement': processed_data.attrs.get('quality_improvement', 0),
                    'outliers_detected': processed_data.attrs.get('outliers_removed', 0),
                    'missing_data_filled': processed_data.attrs.get('missing_filled', 0)
                },
                'model_performance': training_status['metrics'],
                'forecasts': forecasts,
                'policy_compliance': policy_analysis,
                'optimization_recommendations': optimization,
                'risk_assessment': risk_assessment,
                'execution_summary': {
                    'processing_time': training_status.get('processing_time'),
                    'model_accuracy': training_status['metrics'].get('mape'),
                    'confidence_score': forecasts['24h'].get('average_confidence'),
                    'compliance_score': policy_analysis.get('overall_score') if policy_analysis else None
                }
            }

        except Exception as e:
            self.logger.error(f"❌ Comprehensive analysis failed: {str(e)}")
            
            # Intelligent error recovery
            if 'tier_limit' in str(e).lower():
                self.logger.info("💡 Tier limit reached. Consider upgrading for unlimited access.")
                return await self._generate_limited_analysis(data_file, customer_config)
            
            raise

    async def _monitor_training_progress(self, training_job_id: str):
        """Monitor training progress with real-time updates"""
        import time
        
        start_time = time.time()
        while True:
            status = await self.client.get_training_status(training_job_id)
            
            if status['status'] == 'completed':
                self.logger.info(f"✅ Training completed in {time.time() - start_time:.1f}s")
                return status
            elif status['status'] == 'failed':
                raise Exception(f"Training failed: {status.get('error_message')}")
            
            progress = status.get('progress', 0)
            self.logger.info(f"⏳ Training progress: {progress}%")
            await asyncio.sleep(30)  # Check every 30 seconds

    async def _generate_optimization_recommendations(self, customer_config, forecasts, policy_analysis, analysis_config):
        """Generate actionable optimization recommendations"""
        # Implementation for optimization logic
        pass

    async def _assess_operational_risks(self, forecasts, customer_config, model_metrics):
        """Assess operational and financial risks"""
        # Implementation for risk assessment
        pass

# Example Usage
async def main():
    platform = AdvancedEnergyPlatform(
        api_key="your-ona-api-key",
        deployment_type="hybrid"  # Use edge when available, cloud as fallback
    )
    
    customer_config = {
        'id': 'wind_farm_eastern_cape_001',
        'location': 'PortElizabeth',
        'manufacturer': 'Vestas',
        'equipment_type': 'wind_turbine',
        'capacity_mw': 50,
        'commissioning_date': '2023-01-15',
        'business_model': 'ipp_wheeling'
    }
    
    analysis_config = {
        'forecast_horizon': 168,
        'confidence_level': 0.95,
        'include_weather': True,
        'include_policy_analysis': True,
        'optimization_target': 'revenue_maximization'
    }
    
    results = await platform.comprehensive_energy_analysis(
        data_file='./wind_farm_data_2024.csv',
        customer_config=customer_config,
        analysis_config=analysis_config
    )
    
    print("📊 Analysis Results:", results)

# Run the example
if __name__ == "__main__":
    asyncio.run(main())
```

---

## **Edge Deployment Guide** {#edge-deployment}

### **Why Edge Computing?**
- **Data Sovereignty**: Keep sensitive energy data within your infrastructure
- **Ultra-Low Latency**: Sub-50ms response times for real-time applications
- **Offline Capability**: Continue operations during internet outages
- **Compliance**: Meet strict regulatory requirements for data location

### **Edge Installation**

#### **Docker Deployment (Recommended)**
```bash
# Pull the latest Ona Edge image
docker pull asoba/ona-edge:latest

# Create configuration directory
mkdir -p ./ona-edge-config

# Create environment configuration
cat > ./ona-edge-config/.env << EOF
ONA_LICENSE_KEY=your-edge-license-key
ONA_CLOUD_SYNC=true
ONA_STORAGE_PATH=/data/ona-edge
ONA_LOG_LEVEL=INFO
ONA_MAX_CONCURRENT_JOBS=4
EOF

# Run Ona Edge
docker run -d \
  --name ona-edge \
  --restart unless-stopped \
  -p 5000:5000 \
  -p 8080:8080 \
  -v ./ona-edge-config:/config \
  -v ./ona-edge-data:/data \
  --env-file ./ona-edge-config/.env \
  asoba/ona-edge:latest
```

#### **Native Linux Installation**
```bash
# Download and install Ona Edge
curl -fsSL https://install.asoba.co/edge | bash

# Configure edge node
sudo ona-edge configure \
  --license-key="your-edge-license-key" \
  --cloud-sync=enabled \
  --storage-path="/opt/ona-edge/data"

# Start services
sudo systemctl enable ona-edge
sudo systemctl start ona-edge

# Verify installation
ona-edge status
```

### **Edge SDK Configuration**

```javascript
// JavaScript configuration for edge deployment
const { OnaClient } = require('ona-energy-sdk');

const edgeClient = new OnaClient({
    baseUrl: 'http://localhost:5000',  // Edge endpoint
    apiKey: process.env.ONA_API_KEY,
    deployment: 'edge',
    fallbackToCloud: true,  // Auto-fallback to cloud if edge unavailable
    syncWithCloud: true     // Sync results with cloud for backup
});

// Test edge connectivity
const healthCheck = await edgeClient.healthCheck();
console.log('Edge Status:', healthCheck);
```

```python
# Python configuration for edge deployment
from ona_energy_sdk import OnaClient

edge_client = OnaClient(
    base_url='http://localhost:5000',
    api_key=os.environ['ONA_API_KEY'],
    deployment_type='edge',
    fallback_to_cloud=True,
    sync_with_cloud=True,
    edge_config={
        'max_local_storage': '100GB',
        'auto_cleanup_days': 30,
        'prefer_local_processing': True
    }
)

# Test edge connectivity
health_status = await edge_client.health_check()
print(f"Edge Status: {health_status}")
```

---

## **Advanced SDK Features** {#advanced-features}

### **Intelligent Caching**
```javascript
const client = new OnaClient({
    apiKey: process.env.ONA_API_KEY,
    caching: {
        enabled: true,
        ttl: 3600,  // 1 hour cache
        maxSize: '100MB',
        strategy: 'intelligent'  // Cache based on data volatility
    }
});
```

### **Batch Operations**
```python
# Process multiple customers in parallel
batch_processor = client.create_batch_processor(
    max_concurrent=5,
    retry_strategy='exponential_backoff'
)

results = await batch_processor.process_multiple_customers([
    {'id': 'customer_001', 'file': 'data1.csv'},
    {'id': 'customer_002', 'file': 'data2.csv'},
    {'id': 'customer_003', 'file': 'data3.csv'}
])
```

### **Real-Time Streaming**
```javascript
// WebSocket connection for real-time data
const stream = client.createRealtimeStream({
    customerId: 'wind_farm_001',
    dataTypes: ['generation', 'weather', 'grid_frequency'],
    updateInterval: 1000  // 1 second updates
});

stream.on('data', (data) => {
    console.log('Real-time update:', data);
});

stream.on('forecast_update', (forecast) => {
    console.log('Updated forecast:', forecast);
});
```

---

## **API Reference** {#api-reference}

### **Core Methods**

#### **Data Management**
```typescript
// TypeScript definitions for comprehensive type safety
interface OnaClient {
    // Historical data upload with preprocessing
    uploadHistoricalData(config: HistoricalDataConfig): Promise<UploadResult>;
    
    // Real-time data ingestion
    uploadNowcastData(config: NowcastConfig): Promise<NowcastResult>;
    
    // Intelligent data interpolation
    interpolateData(config: InterpolationConfig): Promise<InterpolationResult>;
    
    // Data quality assessment
    assessDataQuality(data: EnergyData): Promise<QualityAssessment>;
}

interface HistoricalDataConfig {
    filePath: string;
    customerId: string;
    location: string;
    manufacturer: string;
    equipmentType?: 'solar' | 'wind' | 'battery' | 'grid' | 'load';
    weatherIntegration?: boolean;
    seasonalAdjustment?: boolean;
    metadata?: Record<string, any>;
}
```

#### **AI & Machine Learning**
```typescript
interface ForecastingMethods {
    // Train forecasting models
    trainForecastingModel(config: TrainingConfig): Promise<TrainingJob>;
    
    // Generate forecasts with confidence intervals
    generateForecast(config: ForecastConfig): Promise<ForecastResult>;
    
    // Model performance evaluation
    evaluateModel(modelId: string): Promise<ModelMetrics>;
    
    // Hyperparameter optimization
    optimizeHyperparameters(config: OptimizationConfig): Promise<OptimizationResult>;
}
```

#### **Policy & Compliance Intelligence**
```typescript
interface PolicyMethods {
    // Query policy compliance
    queryPolicyCompliance(query: string, options?: PolicyQueryOptions): Promise<PolicyResult>;
    
    // Get regulatory updates
    getRegulatory Updates(region: string, sector: string): Promise<RegulatoryUpdate[]>;
    
    // Compliance assessment
    assessCompliance(customerConfig: CustomerConfig): Promise<ComplianceAssessment>;
}
```

---

## **Troubleshooting & Best Practices** {#troubleshooting}

### **Common Issues & Solutions**

#### **API Key & Authentication**
```javascript
// Verify API key validity
const keyStatus = await client.validateApiKey();
if (!keyStatus.valid) {
    console.error('Invalid API key. Please check your configuration.');
    // Automatic key refresh for enterprise clients
    if (keyStatus.canRefresh) {
        await client.refreshApiKey();
    }
}
```

#### **Rate Limit Management**
```python
from ona_energy_sdk.utils import RateLimitHandler

# Intelligent rate limit handling
rate_handler = RateLimitHandler(
    strategy='adaptive',  # Automatically adjust request rate
    max_retries=5,
    backoff_factor=2.0
)

client = OnaClient(
    api_key=api_key,
    rate_limit_handler=rate_handler
)
```

#### **Error Handling & Recovery**
```javascript
class RobustEnergyClient {
    constructor(config) {
        this.client = new OnaClient(config);
        this.setupErrorHandling();
    }

    setupErrorHandling() {
        this.client.on('error', (error) => {
            switch (error.code) {
                case 'TIER_LIMIT_EXCEEDED':
                    console.log('💡 Upgrade tier for unlimited access: https://app.asoba.co/upgrade');
                    break;
                case 'RATE_LIMIT_EXCEEDED':
                    console.log('⏳ Rate limit reached. Implementing exponential backoff...');
                    break;
                case 'NETWORK_ERROR':
                    console.log('🌐 Network issue detected. Attempting edge fallback...');
                    this.attemptEdgeFallback();
                    break;
                default:
                    console.error('❌ Unexpected error:', error);
            }
        });
    }

    async attemptEdgeFallback() {
        if (this.client.config.deployment !== 'edge') {
            console.log('🔄 Switching to edge deployment...');
            await this.client.switchToEdge();
        }
    }
}
```

### **Performance Optimization**

#### **Data Upload Optimization**
```python
# Optimized batch upload for large datasets
async def optimized_batch_upload(client, large_dataset, chunk_size=1000):
    """
    Upload large datasets in optimized chunks with compression
    """
    chunks = [large_dataset[i:i+chunk_size] for i in range(0, len(large_dataset), chunk_size)]
    
    upload_tasks = []
    for i, chunk in enumerate(chunks):
        # Compress data for faster upload
        compressed_chunk = compress_energy_data(chunk)
        
        task = client.upload_historical_data(
            file_data=compressed_chunk,
            chunk_id=i,
            total_chunks=len(chunks),
            compression='gzip'
        )
        upload_tasks.append(task)
    
    # Upload chunks in parallel with controlled concurrency
    results = await asyncio.gather(*upload_tasks, return_exceptions=True)
    return results
```

#### **Memory Management**
```javascript
// Memory-efficient streaming for large files
const streamProcessor = client.createStreamProcessor({
    chunkSize: 1024 * 1024,  // 1MB chunks
    maxConcurrentChunks: 3,
    compressionLevel: 6,
    memoryLimit: '500MB'
});

await streamProcessor.processFile('./very_large_energy_data.csv');
```

---

## **Integration Examples** {#integration-examples}

### **React Frontend Integration**
```jsx
import React, { useState, useEffect } from 'react';
import { OnaClient } from 'ona-energy-sdk/browser';

const EnergyDashboard = () => {
    const [client] = useState(() => new OnaClient({
        apiKey: process.env.REACT_APP_ONA_API_KEY,
        deployment: 'cloud'
    }));
    
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadForecast = async () => {
            try {
                const result = await client.generateForecast({
                    customerId: 'solar_farm_001',
                    forecastWindow: 48,
                    includeWeatherImpact: true
                });
                setForecast(result);
            } catch (error) {
                console.error('Forecast loading failed:', error);
            } finally {
                setLoading(false);
            }
        };

        loadForecast();
    }, [client]);

    if (loading) return <div>Loading forecast...</div>;

    return (
        <div className="energy-dashboard">
            <h2>Energy Forecast</h2>
            <div className="forecast-chart">
                {/* Render forecast visualization */}
            </div>
            <div className="insights">
                {forecast?.insights?.map((insight, i) => (
                    <div key={i} className="insight-card">
                        {insight}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnergyDashboard;
```

### **Express.js Backend Integration**
```javascript
const express = require('express');
const { OnaClient } = require('ona-energy-sdk');

const app = express();
const onaClient = new OnaClient({
    apiKey: process.env.ONA_API_KEY,
    deployment: 'hybrid'
});

// Middleware for tier-based access control
const checkTierAccess = (requiredTier) => (req, res, next) => {
    const userTier = req.user.tier;
    const tierHierarchy = { free: 1, professional: 2, enterprise: 3 };
    
    if (tierHierarchy[userTier] >= tierHierarchy[requiredTier]) {
        next();
    } else {
        res.status(403).json({
            error: 'Insufficient tier access',
            currentTier: userTier,
            requiredTier: requiredTier,
            upgradeUrl: 'https://app.asoba.co/upgrade'
        });
    }
};

// Endpoint for energy forecasting
app.post('/api/forecast', checkTierAccess('professional'), async (req, res) => {
    try {
        const { customerId, forecastWindow, options } = req.body;
        
        const forecast = await onaClient.generateForecast({
            customerId,
            forecastWindow,
            ...options,
            userId: req.user.id  // For usage tracking
        });

        res.json({
            success: true,
            forecast,
            metadata: {
                processingTime: forecast.processingTime,
                modelAccuracy: forecast.accuracy,
                tier: req.user.tier
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Forecasting failed',
            message: error.message,
            supportContact: 'support@asoba.co'
        });
    }
});

app.listen(3000, () => {
    console.log('🚀 Energy API server running on port 3000');
});
```

---

## **Support & Resources** {#support}

### **Documentation & Guides**
- **📖 Complete API Reference**: [docs.asoba.co/api](https://docs.asoba.co/api)
- **🎯 Best Practices Guide**: [docs.asoba.co/best-practices](https://docs.asoba.co/best-practices)
- **🔧 Troubleshooting Guide**: [docs.asoba.co/troubleshooting](https://docs.asoba.co/troubleshooting)
- **📊 Performance Optimization**: [docs.asoba.co/optimization](https://docs.asoba.co/optimization)

### **Community & Support**
- **💬 Developer Forum**: [community.asoba.co](https://community.asoba.co)
- **📧 Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- **🤝 Business Development**: 
  - Shingai: [shingai@asoba.co](mailto:shingai@asoba.co)
  - Gertie: [gertie@asoba.co](mailto:gertie@asoba.co)
- **🔍 Feature Requests**: [info@asoba.co](mailto:info@asoba.co)

### **Emergency Support**
For production issues requiring immediate attention:
- **🚨 Emergency Hotline**: +27-XX-XXX-XXXX (Enterprise tier only)
- **💬 Slack Integration**: #ona-support (Enterprise tier only)
- **📱 SMS Alerts**: Critical system notifications

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Technical Support</h3>
      <p>Our engineering team provides comprehensive SDK support, integration assistance, and performance optimization guidance.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
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
            <h3>Developer Updates</h3>
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

*Ona SDK: Empowering developers to build the next generation of intelligent energy applications through cutting-edge AI, comprehensive data processing, and seamless integration capabilities.*
