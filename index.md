---
title: "Home"
layout: default
nav_order: 1
---

# Ona Terminal - Technical Documentation
{: .fs-9 }

**AI-powered infrastructure automation for developers and technical teams.**
{: .fs-6 .fw-300 }

Complete technical documentation for deployment, integration, and development with Ona Terminal.
{: .fs-5 .fw-300 }

<div class="user-path-buttons">
  <div class="path-button">
    <div class="path-icon">🚀</div>
    <div class="path-content">
      <h3>Deployment</h3>
      <p>Deploy Ona Terminal and related services to your infrastructure</p>
      <a href="deployment.html" class="path-link">Deploy Now →</a>
    </div>
  </div>
  
  <div class="path-button">
    <div class="path-icon">🔧</div>
    <div class="path-content">
      <h3>API Reference</h3>
      <p>Complete API documentation for all core services</p>
      <a href="api-reference.html" class="path-link">View APIs →</a>
    </div>
  </div>
  
  <div class="path-button">
    <div class="path-icon">⚡</div>
    <div class="path-content">
      <h3>Quick Start</h3>
      <p>Get up and running in minutes with our developer guide</p>
      <a href="getting-started.html" class="path-link">Start Here →</a>
    </div>
  </div>
</div>

<div class="paradigm-card">
  <div class="paradigm-text">
    <h2>Technical Overview</h2>
    <p>Ona Terminal provides a comprehensive suite of tools for energy asset management, forecasting, and automation. Built for developers and technical teams who need to integrate AI-powered energy solutions into their infrastructure.</p>
  </div>
  <div class="paradigm-media">
    <img src="{{ site.baseurl }}/assets/images/onaterminal-terminal.svg" alt="Ona Terminal Interface" class="demo-gif">
  </div>
</div>

## Current Production State

**Last Verified**: 2025-01-10 (Status: PRODUCTION VERIFIED - Version 1.6.0)

### 🖥️ Ona Terminal CLI
Interactive command-line interface with AI-powered workflows and OODA loop capabilities.

### 🔌 Deployed APIs (15 Lambda Functions)
- **ingestHistoricalData** - Historical data processing ✅
- **ingestNowcastData** - Real-time data ingestion ✅
- **trainForecaster** - ML model training ✅
- **dataInterpolation** - Data quality enhancement ✅
- **returnForecastingResults** - Results delivery ✅
- **Weather Services** - 4 weather-related functions ✅
- **Auth0 Integration** - User authentication ✅
- **PDF Processing** - Document processing ✅

### ⚠️ Critical Issues
- **SageMaker Endpoints**: 8 endpoints failed - ML inference broken
- **Security**: 950+ wildcard imports, 14 dependency vulnerabilities
- **Test Coverage**: Only 23% with critical gaps
- **generateForecast**: Core module exists but not deployed

### 🏗️ Infrastructure
- **af-south-1**: Primary production (15 Lambda functions)
- **us-east-1**: Global services (3 Lambda functions)
- **PolicyAnalyst**: GPU-based LLM deployment
- **11 S3 Buckets**: Data storage and hosting

## Critical Development Path

The platform follows a mandatory 3-epic development sequence:

1. **Epic #137: Security Foundation** (Weeks 1-2) - **BLOCKS ALL OTHER WORK**
2. **Epic #138: Production Infrastructure** (Weeks 3-4) - **BLOCKED BY EPIC #137**
3. **Epic #139: Customer-Facing Features** (Weeks 5-8) - **BLOCKED BY EPICS #137 & #138**

## Quick Navigation

- **[Getting Started](getting-started.html)** - Installation and setup
- **[Deployment](deployment.html)** - Ona Terminal CLI deployment
- **[PoC Deployment](poc-deployment.html)** - Comprehensive PoC implementation
- **[API Reference](api-reference.html)** - Complete API documentation
- **[Shared Components](shared-components.html)** - Reusable platform components
- **[CLI Tools](cli-tools.html)** - Command-line interface documentation
- **[Integration](integration.html)** - SDK and webhook integration
- **[Development](development.html)** - Local development and contributing
- **[Resources](resources.html)** - Examples, tutorials, and community
- **[Changelog](changelog.html)** - Version history and changes

## Support

- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **Business Documentation**: [docs.asoba.co](https://docs.asoba.co)

<style>
.user-path-buttons {
  display: flex;
  gap: 20px;
  margin: 30px 0 40px 0;
  flex-wrap: wrap;
}

.path-button {
  flex: 1;
  min-width: 300px;
  border: 2px solid #e1e4e8;
  border-radius: 8px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;
  background: #fff;
}

.path-button:hover {
  border-color: #4551bf;
  box-shadow: 0 4px 12px rgba(69, 81, 191, 0.15);
  transform: translateY(-2px);
}

.path-icon {
  font-size: 2.5em;
  margin-bottom: 15px;
}

.path-content h3 {
  font-size: 1.4em;
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.path-content p {
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.4;
}

.path-link {
  display: inline-block;
  background: #4551bf;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease;
}

.path-link:hover {
  background: #3a47a3;
  text-decoration: none;
  color: white;
}

.paradigm-card {
  display: flex;
  align-items: center;
  gap: 40px;
  margin: 40px 0;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.paradigm-text h2 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.paradigm-text p {
  color: #666;
  line-height: 1.6;
}

.paradigm-media {
  flex-shrink: 0;
}

.demo-gif {
  max-width: 300px;
  height: auto;
  border-radius: 8px;
}
</style>
