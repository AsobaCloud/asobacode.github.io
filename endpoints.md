---
title: "Commands & API"
layout: default
nav_order: 2
---

## AsobaCode CLI - Complete Commands Documentation

This comprehensive reference documents ALL available commands in the AsobaCode CLI platform, covering the complete range of DevOps automation tools from basic code analysis to advanced AI-driven infrastructure deployment and technical debt management. The platform supports both local terminal usage and programmatic API integration.

---

## **Platform Architecture Overview**

### **MCP-Based Architecture**
- **Terminal Interface**: Claude Code-like conversational UI with natural language processing
- **AI Model Router**: Intelligent routing between Claude 4, Llama 4, DeepSeek-R1, and cost-effective models
- **GitHub Integration**: Seamless repository management with automated workflows

### **Cost-Optimized AI Routing**
- **Simple Tasks**: Routed to cost-effective models (Claude Haiku, Amazon Nova)
- **Complex Analysis**: Routed to premium models (Claude 4 Opus/Sonnet, Llama 4)
- **Infrastructure Tasks**: Specialized routing for infrastructure-as-code generation

### **Core Components**
- **AI Models Server**: `ai-models-server` - Advanced AI model access and routing
- **GitHub Server**: `github-server` - Repository management and workflow automation
- **Code Analysis Server**: `code-analysis-server` - Static analysis and technical debt detection

---

## **1. Core Commands**

### **System Status & Health**

#### **System Health Check**

**Command**: `asoba-code status`

**Description**: Comprehensive system health check including AI models, MCP servers, and connectivity status.

**Usage**:
```bash
# Basic health check
asoba-code status

# Detailed health check with performance metrics
asoba-code status --detailed

# Health check with connectivity tests
asoba-code status --test-connections
```

**Example Output**:
```
✅ AsobaCode CLI Status: Healthy

🤖 AI Models:
  ✅ Claude 4 Opus: Available (latency: 245ms)
  ✅ Claude 4 Sonnet: Available (latency: 180ms)
  ✅ Llama 4: Available (latency: 320ms)
  ✅ DeepSeek-R1: Available (latency: 210ms)
  ⚡ Cost Router: Optimal routing active

🔗 MCP Servers:
  ✅ ai-models-server: Connected
  ✅ github-server: Connected
  ✅ code-analysis-server: Connected

📊 Performance:
  • Request Success Rate: 99.7%
  • Average Response Time: 245ms
  • Active Sessions: 12
  • Cache Hit Rate: 89.5%
```

#### **MCP Server Management**

**Command**: `asoba-code servers`

**Description**: List all available MCP servers and their status.

**Usage**:
```bash
# List all servers
asoba-code servers

# Show server health details
asoba-code servers --health

# Show server capabilities
asoba-code servers --capabilities

# Restart specific server
asoba-code servers restart github-server
```

**Example Output**:
```
📡 MCP Servers Status:

🤖 ai-models-server
  Status: ✅ Connected
  Capabilities: Claude 4, Llama 4, DeepSeek-R1, Cost Optimization
  Uptime: 72h 15m
  Memory: 2.1GB / 4GB

🐙 github-server
  Status: ✅ Connected
  Capabilities: Repository Analysis, Issue Management, PR Automation
  Uptime: 48h 32m
  API Rate Limit: 4,892 / 5,000 remaining

🔍 code-analysis-server
  Status: ✅ Connected
  Capabilities: Static Analysis, Technical Debt, Security Scanning
  Uptime: 24h 7m
  Analysis Queue: 3 pending
```

### **Natural Language Interface**

#### **Natural Language Commands**

**Command**: `asoba-code ask "query"`

**Description**: Execute commands using natural language, with intelligent AI model routing based on complexity.

**Usage Examples**:
```bash
# Simple queries (routed to cost-effective models)
asoba-code ask "What files have been modified in the last week?"
asoba-code ask "Show me the TODO items in this project"
asoba-code ask "List all Python files in the src directory"

# Complex analysis (routed to premium models)
asoba-code ask "Analyze the technical debt in this codebase and suggest refactoring priorities"
asoba-code ask "Review this pull request for security vulnerabilities and performance issues"
asoba-code ask "Generate a comprehensive test suite for the user authentication module"

# Infrastructure tasks (specialized routing)
asoba-code ask "Generate Kubernetes manifests for a scalable web application with Redis"
asoba-code ask "Create Terraform modules for a multi-region AWS deployment"
asoba-code ask "Setup CI/CD pipeline with automated testing and deployment"
```

**AI Model Routing**:
- **Simple Tasks** → Claude Haiku, Amazon Nova (cost-effective)
- **Complex Analysis** → Claude 4 Opus/Sonnet, Llama 4 (premium)
- **Infrastructure Tasks** → Specialized models with IaC expertise
- **Code Generation** → Models optimized for specific languages/frameworks

**Example Output**:
```
🤖 Routing to Claude 4 Sonnet (Complex Analysis)

📊 Technical Debt Analysis Results:

🔴 High Priority Issues:
  • Cyclomatic complexity >15 in authentication.py (lines 45-120)
  • Duplicated code blocks in user_service.py and admin_service.py
  • Missing error handling in payment_processor.py

🟡 Medium Priority Issues:
  • Long parameter lists in data_validator.py
  • God class detected: ApplicationManager (247 lines)
  • Inconsistent naming conventions in legacy modules

✅ Refactoring Recommendations:
  1. Extract authentication logic into smaller, focused classes
  2. Create shared utilities for common validation patterns
  3. Implement comprehensive error handling strategy
  4. Add unit tests for critical payment processing functions

💡 Estimated effort: 3-4 developer days
💰 Cost impact: $0.23 (premium model usage)
```

### **Project Initialization**

#### **Initialize AsobaCode Project**

**Command**: `asoba-code init`

**Description**: Initialize a new project with AsobaCode configuration and best practices.

**Usage**:
```bash
# Interactive initialization
asoba-code init

# Initialize with specific template
asoba-code init --template web-app
asoba-code init --template microservice
asoba-code init --template data-pipeline
asoba-code init --template mobile-app

# Initialize with custom configuration
asoba-code init --config ./custom-config.yaml

# Initialize in existing project
asoba-code init --existing
```

**Configuration Options**:
```yaml
# .asoba-code.yaml
project:
  name: "my-awesome-project"
  type: "web-application"
  languages: ["typescript", "python"]
  
ai_routing:
  cost_optimization: true
  preferred_models:
    simple: "claude-haiku"
    complex: "claude-4-sonnet"
    code_generation: "claude-4-opus"

github:
  integration: true
  auto_pr_analysis: true
  issue_automation: true

code_analysis:
  continuous_scanning: true
  security_alerts: true
  performance_monitoring: true
  
infrastructure:
  cloud_provider: "aws"
  deployment_strategy: "blue-green"
  monitoring: true
```

**Example Output**:
```
🚀 Initializing AsobaCode Project...

📝 Project Configuration:
  • Name: my-awesome-project
  • Type: Web Application
  • Languages: TypeScript, Python
  • Cloud Provider: AWS

✅ Created .asoba-code.yaml
✅ Setup AI model routing preferences
✅ Configured GitHub integration
✅ Enabled continuous code analysis
✅ Setup infrastructure templates

🎯 Next Steps:
  1. Run 'asoba-code ask "analyze project structure"'
  2. Generate initial tests with 'asoba-code generate tests'
  3. Setup CI/CD with 'asoba-code setup ci-cd'

💡 Pro tip: Use 'asoba-code ask' for natural language commands!
```

---

## **2. Code Analysis Commands**

### **Technical Debt Analysis**

#### **Comprehensive Technical Debt Scan**

**Command**: `asoba-code analyze debt`

**Description**: AI-powered analysis of technical debt with prioritized remediation recommendations.

**Usage**:
```bash
# Full project analysis
asoba-code analyze debt

# Analyze specific directory
asoba-code analyze debt --path ./src

# Focus on specific debt types
asoba-code analyze debt --types complexity,duplication,maintainability

# Generate detailed report
asoba-code analyze debt --report --format json

# Set severity threshold
asoba-code analyze debt --min-severity medium
```

**Parameters**:
- `--path`: Specific directory or file to analyze
- `--types`: Debt types (complexity, duplication, maintainability, testing, documentation)
- `--report`: Generate detailed report file
- `--format`: Output format (json, markdown, html, csv)
- `--min-severity`: Minimum severity level (low, medium, high, critical)
- `--exclude`: Exclude patterns or directories
- `--include-metrics`: Include quantitative metrics

**Example Output**:
```
🔍 Technical Debt Analysis Results

📊 Overview:
  • Total Issues: 47
  • Critical: 3
  • High: 12
  • Medium: 23
  • Low: 9
  • Estimated Remediation Time: 18.5 developer days

🔴 Critical Issues:
  1. Cyclomatic Complexity: authentication.py:45-120
     • Complexity Score: 23 (threshold: 10)
     • Impact: High maintenance cost, bug risk
     • Effort: 2 days
     • Recommendation: Extract into smaller methods

  2. Code Duplication: user_service.py & admin_service.py
     • Duplication: 85% similarity (67 lines)
     • Impact: Maintenance overhead
     • Effort: 1 day
     • Recommendation: Create shared base class

  3. Missing Error Handling: payment_processor.py
     • Lines: 23, 45, 78, 92
     • Impact: Runtime failures, poor UX
     • Effort: 0.5 days
     • Recommendation: Implement comprehensive exception handling

🟡 Quick Wins (< 4 hours each):
  • Add missing docstrings (12 functions)
  • Fix inconsistent naming conventions (8 variables)
  • Remove unused imports (15 files)
  • Update deprecated API calls (6 instances)

💡 Refactoring Strategy:
  1. Address critical issues first (security & stability)
  2. Implement automated tests before refactoring
  3. Use incremental approach for large changes
  4. Focus on high-traffic code paths

📈 Metrics:
  • Maintainability Index: 68/100 (target: >80)
  • Test Coverage: 72% (target: >90%)
  • Documentation Coverage: 45% (target: >80%)
```

#### **Code Quality Metrics**

**Command**: `asoba-code metrics`

**Description**: Generate comprehensive code quality metrics and trends.

**Usage**:
```bash
# Generate all metrics
asoba-code metrics

# Specific metric categories
asoba-code metrics --categories complexity,maintainability,testing

# Historical trend analysis
asoba-code metrics --trend --days 30

# Export metrics for CI/CD
asoba-code metrics --export --format prometheus
```

### **Security Scanning**

#### **Vulnerability Detection**

**Command**: `asoba-code scan security`

**Description**: Comprehensive security vulnerability scanning with AI-powered threat analysis.

**Usage**:
```bash
# Full security scan
asoba-code scan security

# Scan specific components
asoba-code scan security --components dependencies,code,configuration

# Generate security report
asoba-code scan security --report --compliance OWASP-Top-10

# Continuous monitoring mode
asoba-code scan security --monitor --alert-webhook https://alerts.company.com
```

**Security Categories**:
- **Dependencies**: Known vulnerabilities in packages
- **Code Analysis**: Security anti-patterns, injection risks
- **Configuration**: Misconfigurations, exposed secrets
- **Infrastructure**: IaC security issues
- **Compliance**: Regulatory compliance checks

**Example Output**:
```
🛡️ Security Scan Results

⚠️ Critical Vulnerabilities: 2
🔴 High Risk: 5
🟡 Medium Risk: 12

🚨 Critical Issues:
  1. SQL Injection Risk
     File: user_queries.py:67
     Issue: Unsanitized user input in SQL query
     Impact: Data breach, unauthorized access
     Fix: Use parameterized queries
     CVSS Score: 9.1

  2. Hardcoded API Key
     File: config.py:15
     Issue: API key committed to repository
     Impact: Unauthorized API access
     Fix: Use environment variables
     CVSS Score: 8.5

🔴 High Risk Issues:
  • Weak password validation (authentication.py:23)
  • Missing CSRF protection (api_routes.py:45)
  • Unencrypted sensitive data storage (user_data.py:89)
  • Outdated dependency: requests==2.25.1 (CVE-2023-32681)
  • Insecure cookie settings (session_manager.py:34)

🔧 Automated Fixes Available:
  • Update dependencies (4 packages)
  • Add security headers (3 routes)
  • Implement input validation (7 functions)

📋 Compliance Status:
  • OWASP Top 10: 7/10 ✅
  • SOC 2: 85% compliant
  • PCI DSS: Requires attention (payment processing)
```

#### **Dependency Security**

**Command**: `asoba-code scan dependencies`

**Description**: Scan project dependencies for known vulnerabilities and license issues.

**Usage**:
```bash
# Scan all dependencies
asoba-code scan dependencies

# Check for license compliance
asoba-code scan dependencies --licenses --policy ./license-policy.yaml

# Generate SBOM (Software Bill of Materials)
asoba-code scan dependencies --sbom --format spdx
```

### **Performance Analysis**

#### **Performance Profiling**

**Command**: `asoba-code analyze performance`

**Description**: Analyze code performance, identify bottlenecks, and suggest optimizations.

**Usage**:
```bash
# Performance analysis
asoba-code analyze performance

# Focus on specific metrics
asoba-code analyze performance --metrics cpu,memory,io

# Benchmark against baselines
asoba-code analyze performance --benchmark --baseline main

# Generate performance report
asoba-code analyze performance --report --format html
```

**Example Output**:
```
⚡ Performance Analysis Results

🎯 Performance Score: 72/100

🐌 Performance Bottlenecks:
  1. Database Query Optimization
     File: user_service.py:get_user_data()
     Issue: N+1 query problem
     Impact: 2.3s average response time
     Optimization: Use query joins or caching
     Potential Improvement: 85% faster

  2. Large File Processing
     File: data_processor.py:process_csv()
     Issue: Loading entire file into memory
     Impact: 450MB memory usage
     Optimization: Stream processing
     Potential Improvement: 90% less memory

📊 Resource Usage:
  • CPU Intensive Functions: 12 identified
  • Memory Hotspots: 8 identified
  • I/O Bottlenecks: 5 identified

🚀 Optimization Recommendations:
  1. Implement database query optimization (2-3 hours)
  2. Add caching layer for frequently accessed data (4-6 hours)
  3. Use async processing for I/O operations (1-2 days)
  4. Optimize image processing pipeline (1 day)
```

---

## **3. GitHub Integration Commands**

### **Repository Analysis**

#### **Repository Structure Analysis**

**Command**: `asoba-code github analyze repo`

**Description**: Comprehensive analysis of GitHub repository structure, health, and best practices.

**Usage**:
```bash
# Analyze current repository
asoba-code github analyze repo

# Analyze specific repository
asoba-code github analyze repo --repo owner/repo-name

# Include historical analysis
asoba-code github analyze repo --history --days 90

# Generate repository health report
asoba-code github analyze repo --health-report
```

**Example Output**:
```
📊 Repository Analysis: awesome-project

🏗️ Structure Health: 85/100
  ✅ Clear directory structure
  ✅ Proper README documentation
  ✅ License file present
  ⚠️ Missing CONTRIBUTING.md
  ⚠️ No security policy (SECURITY.md)

📈 Activity Metrics (Last 90 days):
  • Commits: 247
  • Pull Requests: 34 (28 merged, 6 open)
  • Issues: 45 (32 closed, 13 open)
  • Contributors: 8 active
  • Code Churn: 15.2% (healthy)

🔍 Code Quality:
  • Test Coverage: 78%
  • Documentation Coverage: 67%
  • Dependency Health: 92% up-to-date
  • Security Score: 94/100

📋 Recommendations:
  1. Add CONTRIBUTING.md for contributor guidelines
  2. Create SECURITY.md for vulnerability reporting
  3. Improve test coverage for payment module
  4. Update deprecated GitHub Actions
  5. Add branch protection rules
```

#### **Pull Request Analysis**

**Command**: `asoba-code github analyze pr`

**Description**: Automated pull request analysis with AI-powered code review.

**Usage**:
```bash
# Analyze current branch PR
asoba-code github analyze pr

# Analyze specific PR
asoba-code github analyze pr --number 123

# Deep security analysis
asoba-code github analyze pr --security-focus

# Generate review comments
asoba-code github analyze pr --auto-comment
```

**Example Output**:
```
🔍 Pull Request Analysis: #123 "Add user authentication"

📊 Overview:
  • Files Changed: 12
  • Lines Added: +387
  • Lines Deleted: -42
  • Complexity Score: Medium
  • Risk Level: Low

✅ Positive Aspects:
  • Comprehensive test coverage (95%)
  • Clear commit messages
  • Proper error handling
  • Security best practices followed

⚠️ Areas for Improvement:
  1. Authentication.py:67 - Consider using constant-time comparison
  2. UserService.py:134 - Add input validation for email format
  3. Missing documentation for new API endpoints
  4. Consider adding rate limiting for login attempts

🛡️ Security Analysis:
  ✅ No hardcoded secrets detected
  ✅ Proper password hashing implemented
  ✅ SQL injection protection in place
  ⚠️ Consider implementing account lockout after failed attempts

🚀 Suggestions:
  • Add integration tests for authentication flow
  • Document API changes in CHANGELOG.md
  • Consider adding 2FA support in future iteration

📝 Auto-generated review posted to GitHub
```

### **Issue Creation and Management**

#### **Automated Issue Creation**

**Command**: `asoba-code github create issue`

**Description**: Create GitHub issues from code analysis results or natural language.

**Usage**:
```bash
# Create issue from analysis results
asoba-code github create issue --from-analysis security

# Create issue with natural language
asoba-code github create issue "Add rate limiting to API endpoints"

# Create multiple issues from technical debt
asoba-code github create issue --from-debt --priority high

# Create issue with template
asoba-code github create issue --template bug-report
```

#### **Issue Management**

**Command**: `asoba-code github manage issues`

**Description**: Intelligent issue management and automation.

**Usage**:
```bash
# Auto-triage new issues
asoba-code github manage issues --auto-triage

# Update issue labels based on content
asoba-code github manage issues --update-labels

# Close stale issues
asoba-code github manage issues --close-stale --days 30

# Generate issue summary
asoba-code github manage issues --summary
```

### **Workflow Automation**

#### **CI/CD Pipeline Setup**

**Command**: `asoba-code github setup ci-cd`

**Description**: Generate and configure CI/CD pipelines with best practices.

**Usage**:
```bash
# Setup basic CI/CD
asoba-code github setup ci-cd

# Setup with specific framework
asoba-code github setup ci-cd --framework nodejs
asoba-code github setup ci-cd --framework python
asoba-code github setup ci-cd --framework docker

# Include advanced features
asoba-code github setup ci-cd --features security-scanning,performance-testing,deployment

# Custom deployment target
asoba-code github setup ci-cd --deploy-to aws-ecs
```

**Generated Workflow Features**:
- Automated testing (unit, integration, e2e)
- Security scanning
- Code quality checks
- Performance testing
- Automated deployment
- Rollback capabilities
- Notification integrations

**Example Output**:
```
🚀 CI/CD Pipeline Configuration

✅ Generated Workflows:
  • .github/workflows/ci.yml - Continuous Integration
  • .github/workflows/cd.yml - Continuous Deployment
  • .github/workflows/security.yml - Security Scanning
  • .github/workflows/performance.yml - Performance Testing

🔧 Pipeline Features:
  ✅ Multi-environment testing (Node 16, 18, 20)
  ✅ Automated security scanning (Snyk, CodeQL)
  ✅ Code quality gates (ESLint, Prettier, SonarCloud)
  ✅ Performance benchmarking
  ✅ Automated deployment to staging
  ✅ Manual approval for production
  ✅ Rollback capabilities

🎯 Next Steps:
  1. Review generated workflows
  2. Configure environment secrets
  3. Setup deployment environments
  4. Test pipeline with sample PR

💡 Pro tip: Use 'asoba-code github analyze workflows' to optimize performance
```

#### **Automated Testing**

**Command**: `asoba-code github setup testing`

**Description**: Setup comprehensive automated testing strategies.

**Usage**:
```bash
# Setup testing framework
asoba-code github setup testing

# Include specific test types
asoba-code github setup testing --types unit,integration,e2e

# Setup performance testing
asoba-code github setup testing --performance

# Setup accessibility testing
asoba-code github setup testing --accessibility
```

---

## **4. Infrastructure Commands**

### **Infrastructure-as-Code Generation**

#### **AWS Infrastructure**

**Command**: `asoba-code infra generate aws`

**Description**: Generate production-ready AWS infrastructure with security and compliance built-in.

**Usage**:
```bash
# Generate basic AWS infrastructure
asoba-code infra generate aws

# Generate for specific architecture
asoba-code infra generate aws --pattern microservices
asoba-code infra generate aws --pattern serverless
asoba-code infra generate aws --pattern data-pipeline

# Include compliance frameworks
asoba-code infra generate aws --compliance SOC2,HIPAA

# Multi-region deployment
asoba-code infra generate aws --regions us-east-1,us-west-2,eu-west-1
```

**Example Output**:
```
🏗️ AWS Infrastructure Generated

📁 Generated Files:
  • terraform/
    ├── main.tf - Core infrastructure
    ├── vpc.tf - Network configuration
    ├── security.tf - Security groups & IAM
    ├── compute.tf - ECS/Lambda functions
    ├── data.tf - RDS/DynamoDB configuration
    ├── monitoring.tf - CloudWatch & alerting
    └── variables.tf - Configuration variables

🔒 Security Features:
  ✅ VPC with private subnets
  ✅ WAF with OWASP protection
  ✅ Encryption at rest and in transit
  ✅ IAM roles with least privilege
  ✅ Security groups with minimal access
  ✅ CloudTrail logging enabled
  ✅ GuardDuty threat detection

📊 Compliance:
  ✅ SOC 2 Type II controls
  ✅ HIPAA-ready configuration
  ✅ PCI DSS compliance features

🚀 Deployment:
  • Estimated Cost: $247/month
  • Deployment Time: ~15 minutes
  • Auto-scaling: 2-10 instances
  • Multi-AZ: Yes

💡 Next Steps:
  1. Review terraform/variables.tf
  2. Configure AWS credentials
  3. Run 'terraform plan'
  4. Deploy with 'terraform apply'
```

#### **GCP Infrastructure**

**Command**: `asoba-code infra generate gcp`

**Description**: Generate Google Cloud Platform infrastructure templates.

**Usage**:
```bash
# Generate GCP infrastructure
asoba-code infra generate gcp

# Cloud Run serverless deployment
asoba-code infra generate gcp --service cloud-run

# GKE Kubernetes cluster
asoba-code infra generate gcp --service gke

# Data analytics pipeline
asoba-code infra generate gcp --pattern data-analytics
```

#### **Azure Infrastructure**

**Command**: `asoba-code infra generate azure`

**Description**: Generate Microsoft Azure infrastructure templates.

**Usage**:
```bash
# Generate Azure infrastructure
asoba-code infra generate azure

# Azure Container Apps
asoba-code infra generate azure --service container-apps

# Azure Functions serverless
asoba-code infra generate azure --service functions

# Enterprise-ready with compliance
asoba-code infra generate azure --enterprise --compliance ISO27001
```

#### **Multi-Cloud Deployment**

**Command**: `asoba-code infra generate multi-cloud`

**Description**: Generate multi-cloud deployment strategies for redundancy and vendor independence.

**Usage**:
```bash
# Multi-cloud setup
asoba-code infra generate multi-cloud --providers aws,gcp,azure

# Active-passive configuration
asoba-code infra generate multi-cloud --strategy active-passive

# Global load balancing
asoba-code infra generate multi-cloud --global-lb
```

### **Container and Kubernetes**

#### **Docker Configuration**

**Command**: `asoba-code docker generate`

**Description**: Generate optimized Docker configurations with security best practices.

**Usage**:
```bash
# Generate Dockerfile
asoba-code docker generate

# Multi-stage build
asoba-code docker generate --multi-stage

# Security-hardened image
asoba-code docker generate --security-hardened

# Docker Compose for development
asoba-code docker generate --compose --environment dev
```

**Example Output**:
```dockerfile
# Generated Dockerfile with security best practices
FROM node:18-alpine AS builder

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY --chown=nextjs:nodejs . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

# Security updates
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app .

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
```

#### **Kubernetes Manifests**

**Command**: `asoba-code k8s generate`

**Description**: Generate Kubernetes manifests with production-ready configurations.

**Usage**:
```bash
# Generate K8s manifests
asoba-code k8s generate

# Include Helm charts
asoba-code k8s generate --helm

# Service mesh integration
asoba-code k8s generate --service-mesh istio

# Monitoring and observability
asoba-code k8s generate --monitoring prometheus,grafana

# GitOps ready
asoba-code k8s generate --gitops --tool argocd
```

**Generated Resources**:
- Deployment with resource limits
- Service and Ingress configuration
- ConfigMaps and Secrets
- HorizontalPodAutoscaler
- PodDisruptionBudget
- NetworkPolicies
- ServiceMonitor (Prometheus)
- ServiceAccount with RBAC

#### **Service Mesh and Monitoring**

**Command**: `asoba-code k8s setup monitoring`

**Description**: Setup comprehensive monitoring and observability stack.

**Usage**:
```bash
# Setup Prometheus + Grafana
asoba-code k8s setup monitoring

# Include distributed tracing
asoba-code k8s setup monitoring --tracing jaeger

# Add log aggregation
asoba-code k8s setup monitoring --logging fluentd,elasticsearch

# Service mesh observability
asoba-code k8s setup monitoring --service-mesh istio
```

---

## **5. Configuration & Management**

### **Configuration Commands**

#### **Global Configuration**

**Command**: `asoba-code config`

**Description**: Manage global AsobaCode configuration settings.

**Usage**:
```bash
# Show current configuration
asoba-code config show

# Set configuration values
asoba-code config set ai.preferred_model claude-4-sonnet
asoba-code config set github.auto_analysis true
asoba-code config set cost_optimization.enabled true

# Reset to defaults
asoba-code config reset

# Export configuration
asoba-code config export --format yaml
```

**Configuration Categories**:
```yaml
ai:
  preferred_model: "claude-4-sonnet"
  cost_optimization: true
  max_tokens: 4000
  temperature: 0.1

github:
  auto_analysis: true
  auto_pr_comments: false
  default_branch: "main"
  
code_analysis:
  continuous_scanning: true
  security_alerts: true
  min_severity: "medium"
  
infrastructure:
  default_cloud: "aws"
  compliance_frameworks: ["SOC2"]
  multi_region: false

notifications:
  slack_webhook: "https://hooks.slack.com/..."
  email_alerts: true
  teams_webhook: null
```

#### **Project Configuration**

**Command**: `asoba-code config project`

**Description**: Manage project-specific configuration.

**Usage**:
```bash
# Show project config
asoba-code config project show

# Set project-specific values
asoba-code config project set languages python,typescript
asoba-code config project set testing.framework pytest

# Initialize project config
asoba-code config project init
```

#### **Environment Variables**

**Command**: `asoba-code config env`

**Description**: Manage environment variables and secrets.

**Usage**:
```bash
# List environment variables
asoba-code config env list

# Set environment variable
asoba-code config env set API_KEY your-api-key

# Load from .env file
asoba-code config env load .env.production

# Generate .env template
asoba-code config env template
```

### **Usage and Cost Tracking**

#### **Usage Statistics**

**Command**: `asoba-code usage`

**Description**: View AI usage statistics and cost optimization insights.

**Usage**:
```bash
# Show current usage
asoba-code usage

# Detailed usage breakdown
asoba-code usage --detailed

# Usage for specific time period
asoba-code usage --period last-30-days

# Export usage data
asoba-code usage --export --format csv
```

**Example Output**:
```
📊 AI Usage Statistics (Last 30 Days)

💰 Cost Summary:
  • Total Cost: $24.67
  • Average Daily: $0.82
  • Cost Savings (vs premium only): $156.23 (86% saved)

🤖 Model Usage:
  • Claude 4 Opus: 145 requests ($18.45)
  • Claude 4 Sonnet: 267 requests ($5.23)
  • Claude Haiku: 891 requests ($0.89)
  • Llama 4: 56 requests ($0.10)

⚡ Routing Efficiency:
  • Simple Tasks → Cost-effective models: 78%
  • Complex Tasks → Premium models: 22%
  • Optimal routing score: 94/100

📈 Usage Trends:
  • Code Analysis: 45% of requests
  • Infrastructure Generation: 25%
  • Natural Language Queries: 20%
  • Security Scanning: 10%

💡 Cost Optimization Tips:
  1. 67% of complex queries could use mid-tier models
  2. Enable caching for repeated infrastructure patterns
  3. Use batch processing for multiple file analysis
```

#### **Cost Optimization**

**Command**: `asoba-code optimize costs`

**Description**: Analyze and optimize AI usage costs.

**Usage**:
```bash
# Analyze cost optimization opportunities
asoba-code optimize costs

# Enable aggressive cost optimization
asoba-code optimize costs --aggressive

# Set cost limits
asoba-code optimize costs --daily-limit 5.00

# Generate cost report
asoba-code optimize costs --report
```

---

## **6. Advanced Features**

### **Batch Operations**

#### **Multi-File Analysis**

**Command**: `asoba-code batch analyze`

**Description**: Process multiple files or directories in parallel for efficient analysis.

**Usage**:
```bash
# Analyze multiple directories
asoba-code batch analyze ./src ./tests ./docs

# Batch security scanning
asoba-code batch security --files "**/*.py" "**/*.js"

# Parallel processing with custom threads
asoba-code batch analyze --parallel 8

# Process with different analysis types
asoba-code batch analyze --types security,performance,debt
```

**Example Output**:
```
🔄 Batch Analysis Progress

📊 Processing Status:
  ✅ ./src (42 files) - Complete
  🔄 ./tests (28 files) - 67% complete
  ⏳ ./docs (15 files) - Queued

⚡ Performance:
  • Parallel Workers: 8
  • Files Processed: 57/85
  • Average Speed: 12 files/minute
  • ETA: 2 minutes

🎯 Results Summary:
  • Security Issues: 12 found
  • Performance Issues: 8 found
  • Technical Debt: 23 items
  • Total Processing Time: 4.2 minutes
  • Cost: $1.23 (batch optimization: 45% savings)
```

#### **Parallel Processing Options**

**Command**: `asoba-code batch config`

**Description**: Configure batch processing settings for optimal performance.

**Usage**:
```bash
# Set parallel workers
asoba-code batch config --workers 12

# Configure memory limits
asoba-code batch config --memory-limit 4GB

# Enable result caching
asoba-code batch config --cache-results true

# Set batch size for large repositories
asoba-code batch config --batch-size 50
```

### **Integration Patterns**

#### **API Integration**

**Command**: `asoba-code integrate api`

**Description**: Generate API integrations for external services and platforms.

**Usage**:
```bash
# Generate REST API integration
asoba-code integrate api --type rest --spec openapi.yaml

# Generate GraphQL integration
asoba-code integrate api --type graphql --endpoint https://api.example.com

# Generate SDK for custom API
asoba-code integrate api --generate-sdk --language typescript

# Create API client with authentication
asoba-code integrate api --auth oauth2 --scopes read,write
```

**Example Generated Integration**:
```typescript
// Generated API client with TypeScript
export class ExampleAPIClient {
  private baseURL: string;
  private authToken: string;

  constructor(config: APIConfig) {
    this.baseURL = config.baseURL;
    this.authToken = config.authToken;
  }

  async getUsers(params?: GetUsersParams): Promise<User[]> {
    const response = await fetch(`${this.baseURL}/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json',
      },
      ...params && { body: JSON.stringify(params) }
    });

    if (!response.ok) {
      throw new APIError(response.status, await response.text());
    }

    return response.json();
  }

  // Rate limiting built-in
  private rateLimiter = new RateLimiter(100, 3600); // 100 requests per hour

  // Automatic retries with exponential backoff
  private async withRetry<T>(operation: () => Promise<T>): Promise<T> {
    // Implementation...
  }
}
```

#### **Webhook Support**

**Command**: `asoba-code integrate webhooks`

**Description**: Setup webhook integrations for real-time notifications and automation.

**Usage**:
```bash
# Setup GitHub webhook integration
asoba-code integrate webhooks --provider github --events push,pull_request

# Setup Slack notifications
asoba-code integrate webhooks --provider slack --channel dev-alerts

# Custom webhook endpoint
asoba-code integrate webhooks --url https://your-app.com/webhook --secret your-secret

# Setup webhook server
asoba-code integrate webhooks --server --port 3000
```

#### **Third-Party Tool Integration**

**Command**: `asoba-code integrate tools`

**Description**: Integrate with popular development tools and platforms.

**Usage**:
```bash
# Integrate with Jira
asoba-code integrate tools --service jira --project-key PROJ

# Integrate with Confluence
asoba-code integrate tools --service confluence --space DEV

# Integrate with Slack
asoba-code integrate tools --service slack --workspace your-workspace

# Integrate with Microsoft Teams
asoba-code integrate tools --service teams --tenant your-tenant

# Setup monitoring integrations
asoba-code integrate tools --service datadog --api-key your-key
```

**Integration Examples**:

```bash
# Automated Jira ticket creation from security issues
asoba-code scan security --auto-create-tickets --jira-project SEC

# Send analysis results to Slack
asoba-code analyze debt --notify-slack --channel tech-debt

# Update Confluence documentation
asoba-code generate docs --publish-confluence --space-key DEV

# Create GitHub issues from analysis
asoba-code analyze performance --create-github-issues
```

---

### **Error Handling and Troubleshooting**

#### **Common Error Scenarios**

```bash
# Network connectivity issues
❌ Error: Unable to connect to AI models server
💡 Solution: Check network connection and run 'asoba-code status'

# Authentication failures
❌ Error: Invalid API key for GitHub integration
💡 Solution: Run 'asoba-code config set github.token your-token'

# Resource limitations
❌ Error: Analysis timeout after 5 minutes
💡 Solution: Use batch processing or increase timeout with --timeout 600

# Model routing issues
❌ Error: No available models for complex analysis
💡 Solution: Check model availability with 'asoba-code servers --health'
```

#### **Debug Mode**

```bash
# Enable debug logging
asoba-code --debug analyze debt

# Verbose output
asoba-code --verbose github analyze repo

# Performance profiling
asoba-code --profile batch analyze ./src
```

#### **Support and Help**

```bash
# Get help for any command
asoba-code help
asoba-code analyze --help
asoba-code github --help

# Show version and environment info
asoba-code --version
asoba-code --env-info

# Generate diagnostic report
asoba-code diagnose --export diagnostic-report.json
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
