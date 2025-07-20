---
title: "AsobaCode CLI - Installation & Usage Guide"
layout: default
nav_order: 3
---

## AsobaCode CLI - Installation & Usage Guide {#getting-started}

This comprehensive guide covers everything you need to install, configure, and start using AsobaCode CLI - the AI-powered terminal development platform that transforms your DevOps workflows. Built on the Model Context Protocol (MCP) with intelligent AI model routing, AsobaCode provides enterprise-grade automation for modern software engineering teams.

AsobaCode CLI supports **Python 3.10+**, **Multi-Cloud Infrastructure**, and **Advanced AI Integration**, making it the most comprehensive DevOps automation platform available.

---

## **Platform Features**

### **🚀 Core Capabilities**
- **AI-Powered Development** – Advanced AI models for code analysis, generation, and infrastructure automation
- **Technical Debt Intelligence** – Automated identification, tracking, and remediation of code quality issues
- **Infrastructure Automation** – Intelligent template generation for AWS, GCP, Azure with compliance built-in
- **Terminal-Native Design** – Built specifically for developers who live in the command line
- **Cost-Optimized AI** – Intelligent model routing reduces AI costs by 60%+ over traditional approaches

### **🏗️ Architecture Overview**
- **MCP-Based**: Modular Model Context Protocol architecture with extensible server design
- **AI Model Router**: Intelligent routing between Claude 4, Llama 4, DeepSeek-R1, and cost-effective models
- **GitHub Integration**: Seamless repository management with automated issue creation and PR analysis
- **Multi-Cloud Support**: Native support for AWS, GCP, Azure infrastructure deployment

### **📊 Intelligence Features**
- **Code Analysis**: Multi-language support with security, performance, and complexity insights
- **GitHub Automation**: Automated technical debt issue creation and PR workflow management
- **Natural Language Interface**: Describe what you want in plain English, get working solutions
- **Context Awareness**: Maintains project context across sessions for intelligent recommendations

---

## **Installation & Setup** {#installation}

### **Prerequisites**
- **Python 3.10+** (required for FastMCP and advanced AI features)
- **AWS Account** with Bedrock access (for AI models)
- **GitHub Account** (optional, for repository integration)
- **Git** (for version control and repository management)

### **Method 1: Development Installation (Recommended)**

#### **Standard Installation**
```bash
# Clone the repository
git clone https://github.com/AsobaCloud/asoba-code.git
cd asoba-code

# Install in development mode
pip install -e .

# Verify installation
asoba-code --version
```

#### **Add to PATH (Important)**
```bash
# Add asoba-code to your PATH - choose one method:

# Method A: Add to current session only
export PATH=$PATH:$HOME/.local/bin

# Method B: Add permanently to ~/.bashrc or ~/.zshrc
echo 'export PATH=$PATH:$HOME/.local/bin' >> ~/.bashrc
source ~/.bashrc  # or restart terminal

# Method C: Use full path directly
~/.local/bin/asoba-code --help
```

### **Method 2: Docker Development Environment**

```bash
# Start development environment
make dev

# Run tests
make test

# Clean up
make clean
```

### **Environment Configuration**

Set up your credentials and configuration:

```bash
# AWS Configuration (Required for AI models)
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=us-east-1

# Or use AWS CLI
aws configure

# GitHub Configuration (Optional)
export GITHUB_TOKEN=ghp_your_github_personal_access_token

# Optional: Custom configuration path
export ASOBACODE_CONFIG_PATH=/custom/path/to/config.yaml
```

---

## **Quick Start Examples** {#usage-examples}

### **Getting Started Tutorial**

#### **Step 1: Verify Installation**
```bash
# If you get "command not found", ensure PATH is set:
export PATH=$PATH:$HOME/.local/bin

# Check system status
asoba-code status

# List available MCP servers
asoba-code servers

# Show server health
asoba-code servers --health
```

Expected output:
```
📊 AsobaCode Status
📁 Config: configs
⏱️  Timeout: 60s
🖥️  Servers: 3 discovered
🐍 Python: 3.10+

🖥️  MCP Servers
Server                    Status    Capabilities
ai-models-server         running   generate_code, analyze_code, refactor_code
github-server            running   create_issue, manage_pr, repository_analysis  
code-analysis-server     running   analyze_complexity, detect_smells, security_scan
```

#### **Step 2: Basic AI Code Generation**
```bash
# Generate simple Python code
asoba-code ask "Create a function to calculate fibonacci numbers"

# Generate complex infrastructure code
asoba-code ask "Create a Terraform configuration for a highly available web application on AWS"

# Analyze existing code
asoba-code ask "Analyze this Python file for performance issues: /path/to/your/file.py"
```

#### **Step 3: GitHub Integration**
```bash
# Analyze a repository structure
asoba-code ask "Analyze the structure of my GitHub repository: owner/repo-name"

# Create technical debt issues
asoba-code ask "Scan my repository for technical debt and create GitHub issues"

# Generate tests for a PR
asoba-code ask "Generate comprehensive tests for pull request #123 in owner/repo-name"
```

### **Advanced Workflow Examples**

#### **Complete DevOps Automation Workflow**
```bash
# Step 1: Repository Analysis and Technical Debt Assessment
asoba-code ask "Analyze my entire repository for technical debt and create a comprehensive report"

# Step 2: Infrastructure Generation
asoba-code ask "Create a complete AWS infrastructure setup with:
- VPC with public and private subnets
- Auto-scaling group for web servers
- RDS database with backup strategy
- CloudFront CDN
- Route53 DNS configuration
- Security groups and IAM roles"

# Step 3: Automated Issue Creation
asoba-code ask "Scan my codebase for security vulnerabilities and performance issues, then create prioritized GitHub issues with detailed remediation steps"

# Step 4: Test Generation and Coverage Analysis
asoba-code ask "Generate comprehensive test suites for all my Python modules, including unit tests, integration tests, and security tests"

# Step 5: CI/CD Pipeline Setup
asoba-code ask "Create GitHub Actions workflows for:
- Automated testing on PR creation
- Code quality checks
- Infrastructure deployment to staging
- Production deployment with approval gates"
```

#### **Example Output for Repository Analysis**
```
🔍 Analyzing Repository: myorg/myproject
📊 Project Language: Python (Django)
🧠 AI Model Selected: Claude 4 Sonnet (complex analysis)

📈 Technical Debt Analysis:
• Overall Health Score: 7.2/10
• Critical Issues: 3
• High Priority Issues: 12
• Medium Priority Issues: 27

🔥 Critical Issues Found:
1. SQL Injection vulnerability in user_auth.py (Line 45)
2. Hardcoded AWS credentials in settings.py (Line 23)
3. Missing input validation in payment_processor.py (Line 67)

🎯 Recommendations:
• Implement parameterized queries for database access
• Move credentials to environment variables
• Add comprehensive input validation
• Increase test coverage from 45% to 80%

💰 Analysis Cost: $0.85 (Claude 4 Sonnet)
🚀 Created 15 GitHub issues with remediation steps
```

#### **Real-World Use Cases**

```bash
# Daily Development Workflow
asoba-code ask "Review my staged changes and suggest improvements before I commit"

# Weekly Technical Debt Review
asoba-code ask "Analyze technical debt trends over the past week and create a summary report"

# Release Preparation
asoba-code ask "Prepare my application for production release:
- Run security scans
- Check test coverage
- Generate deployment infrastructure
- Create rollback procedures"

# Team Productivity Analysis
asoba-code ask "Analyze our team's code quality trends and suggest process improvements"
```
```

## **MCP Server Overview** {#mcp-servers}

AsobaCode CLI is built on a modular **Model Context Protocol (MCP) architecture** with three specialized servers that work together to provide comprehensive DevOps automation:

### **🤖 AI Models Server** {#ai-models-server}

**Purpose**: Intelligent AI model routing and code generation capabilities

**Core Features**:
- **Multi-Model Support**: Claude 4 Opus/Sonnet, Llama 4, DeepSeek-R1, and specialized models
- **Intelligent Routing**: Automatically selects optimal model based on task complexity
- **Cost Optimization**: Routes simple tasks to cost-effective models (60%+ savings)
- **Context Management**: Maintains conversation history and project context

**Available Models**:
```bash
# Check available AI models
asoba-code ask "What AI models are available?"

# Model capabilities:
# - Claude 4 Opus: Complex reasoning, architecture design, comprehensive analysis
# - Claude 4 Sonnet: Balanced performance for most development tasks
# - Llama 4 Scout: Fast code generation and simple analysis
# - DeepSeek-R1: Mathematical reasoning and algorithm optimization
```

**Example Usage**:
```bash
# Generate complex infrastructure code (uses Claude 4 Opus)
asoba-code ask "Create a complete microservices architecture with Kubernetes, monitoring, and CI/CD pipeline"

# Simple code generation (uses cost-effective model)
asoba-code ask "Write a Python function to validate email addresses"

# Code analysis (intelligent model selection)
asoba-code ask "Analyze this codebase for performance bottlenecks and security issues"
```

---

### **🐙 GitHub Integration Server** {#github-server}

**Purpose**: Automated repository management and workflow automation

**Core Capabilities**:
- **Repository Analysis**: Deep code structure and quality assessment
- **Issue Management**: Automated technical debt issue creation with detailed remediation steps
- **PR Workflows**: Pull request analysis, review automation, and test generation
- **Team Collaboration**: Automated documentation and knowledge sharing

**Configuration**:
```bash
# Set GitHub token for full functionality
export GITHUB_TOKEN=ghp_your_github_personal_access_token

# Verify GitHub integration
asoba-code ask "Test GitHub connectivity and show my repositories"
```

**Advanced Features**:
```bash
# Repository-wide technical debt analysis
asoba-code ask "Analyze my entire repository for technical debt and create prioritized GitHub issues with detailed remediation steps"

# PR review automation
asoba-code ask "Review pull request #123 in myorg/myproject and suggest improvements"

# Automated documentation
asoba-code ask "Generate comprehensive API documentation for my Python project and create a PR"

# Team productivity analysis
asoba-code ask "Analyze code quality trends across our team's recent commits and create a summary report"
```

---

### **🔍 Code Analysis Server** {#code-analysis-server}

**Purpose**: Advanced static analysis and code quality intelligence

**Analysis Capabilities**:
- **Multi-Language Support**: Python, JavaScript, TypeScript, Rust, Go, Java, C++, and more
- **Security Scanning**: Vulnerability detection with CVE mapping and remediation guidance
- **Performance Analysis**: Complexity metrics, bottleneck identification, optimization suggestions
- **Technical Debt Tracking**: Automated debt classification and prioritization

**Code Quality Metrics**:
```bash
# Comprehensive code analysis
asoba-code ask "Analyze my Python project for code quality, security issues, and performance bottlenecks"

# Security-focused scan
asoba-code ask "Perform a comprehensive security audit of my codebase and create GitHub issues for vulnerabilities"

# Performance optimization
asoba-code ask "Identify performance bottlenecks in my application and suggest optimizations"

# Technical debt assessment
asoba-code ask "Calculate technical debt score for my project and create a remediation roadmap"
```

**Example Analysis Output**:
```
🔍 Code Analysis Results: myproject
📊 Language Distribution: Python (78%), JavaScript (15%), YAML (7%)
🧠 AI Model Selected: Claude 4 Sonnet (comprehensive analysis)

📈 Quality Metrics:
• Overall Health Score: 7.8/10
• Security Score: 8.5/10
• Performance Score: 6.2/10
• Maintainability Score: 7.9/10

🔥 Critical Issues:
1. SQL Injection vulnerability in user_service.py (Line 156)
2. Hardcoded API keys in config.py (Line 23)
3. Memory leak potential in data_processor.py (Line 89)

⚡ Performance Issues:
1. N+1 query pattern in dashboard.py (Line 45)
2. Unoptimized database indexes (suggestions included)
3. Large file processing without streaming (Line 234)

🎯 Recommendations:
• Implement parameterized queries
• Use environment variables for secrets
• Add connection pooling for database access
• Implement caching layer for frequent queries

💰 Analysis Cost: $0.45 (Claude 4 Sonnet)
🚀 Created 12 GitHub issues with detailed remediation steps
```

---

## **Terminal Interface & Natural Language Commands** {#terminal-interface}

AsobaCode CLI provides a **Claude Code-like conversational interface** that understands natural language and routes requests to appropriate MCP servers.

### **Command Structure**

**Basic Pattern**:
```bash
asoba-code ask "NATURAL_LANGUAGE_REQUEST"
```

**System Commands**:
```bash
# System status and health
asoba-code status                    # Overall system health
asoba-code servers                   # List MCP servers
asoba-code servers --health          # Server health check
asoba-code --version                 # Version information
asoba-code --help                    # Help and usage
```

### **Natural Language Examples**

#### **Infrastructure Automation**
```bash
# AWS Infrastructure
asoba-code ask "Create a Terraform configuration for a highly available web application on AWS with:
- VPC with public and private subnets
- Auto-scaling group for web servers  
- RDS database with backup strategy
- CloudFront CDN and Route53 DNS
- Security groups and IAM roles"

# Kubernetes Deployment
asoba-code ask "Generate Kubernetes manifests for a microservices application with:
- Frontend React app
- Backend API service
- Redis cache
- PostgreSQL database
- Ingress controller and monitoring"

# Multi-cloud setup
asoba-code ask "Create infrastructure templates for deploying the same application on AWS, GCP, and Azure"
```

#### **Code Analysis & Quality**
```bash
# Repository analysis
asoba-code ask "Analyze my Python project for technical debt, security vulnerabilities, and performance issues"

# Specific file analysis
asoba-code ask "Review this Python file for code quality issues: /path/to/service.py"

# Security audit
asoba-code ask "Perform a comprehensive security scan of my web application and create GitHub issues for any vulnerabilities found"

# Performance optimization
asoba-code ask "Identify performance bottlenecks in my Django application and suggest specific optimizations"
```

#### **GitHub Workflow Automation**
```bash
# Issue creation
asoba-code ask "Scan my repository for technical debt and create prioritized GitHub issues with detailed remediation steps"

# PR analysis
asoba-code ask "Analyze pull request #456 in myorg/myproject and provide a detailed code review with suggestions"

# Documentation generation
asoba-code ask "Generate comprehensive documentation for my API endpoints and create a pull request"

# Team productivity
asoba-code ask "Analyze our team's commit patterns and code quality trends over the past month"
```

#### **Development Workflow Integration**
```bash
# Pre-commit analysis
asoba-code ask "Review my staged changes and suggest improvements before I commit"

# Release preparation
asoba-code ask "Prepare my application for production release:
- Run security scans
- Check test coverage  
- Generate deployment scripts
- Create rollback procedures"

# Test generation
asoba-code ask "Generate comprehensive test suites for my Python modules, including unit tests, integration tests, and security tests"
```

### **Context-Aware Conversations**

AsobaCode CLI maintains context across commands within a session:

```bash
# Initial analysis
asoba-code ask "Analyze my Python project for technical debt"

# Follow-up without repeating context
asoba-code ask "Create GitHub issues for the high-priority items you found"

# Further refinement
asoba-code ask "Focus on the security vulnerabilities and provide detailed remediation steps"

# Implementation guidance
asoba-code ask "Generate the code fixes for the SQL injection issues"
```

### **Advanced Command Features**

#### **Multi-Step Workflows**
```bash
# Complex multi-step automation
asoba-code ask "Complete DevOps setup for my new microservices project:
1. Analyze the codebase for quality issues
2. Create GitHub issues for technical debt
3. Generate Kubernetes deployment manifests
4. Set up CI/CD pipeline with GitHub Actions
5. Create monitoring and alerting configuration"
```

#### **Project-Specific Context**
```bash
# Set project context
asoba-code ask "I'm working on a Django e-commerce application with PostgreSQL. Analyze the project structure and identify areas for improvement"

# Context is maintained for subsequent commands
asoba-code ask "Generate database migration scripts for the performance optimizations you suggested"
```

---

## **Configuration & Settings** {#configuration}

### **Environment Configuration**

**Required Environment Variables**:
```bash
# AWS Configuration (Required for AI models)
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key  
export AWS_DEFAULT_REGION=us-east-1

# GitHub Integration (Optional)
export GITHUB_TOKEN=ghp_your_github_personal_access_token

# Custom Configuration Path (Optional)
export ASOBACODE_CONFIG_PATH=/custom/path/to/config.yaml
```

**AWS Configuration Methods**:
```bash
# Method 1: Environment variables (above)

# Method 2: AWS CLI configuration
aws configure

# Method 3: AWS credential profiles
export AWS_PROFILE=asobacode

# Method 4: IAM roles (for EC2/ECS deployment)
# No additional configuration needed
```

### **Configuration File Structure**

**Default Location**: `~/.config/asobacode/config.yaml`

**Configuration Example**:
```yaml
# AsobaCode CLI Configuration
version: "1.0"

# AI Model Settings
ai_models:
  default_provider: "aws_bedrock"
  cost_optimization: true
  model_preferences:
    complex_tasks: "claude-4-opus"
    standard_tasks: "claude-4-sonnet"
    simple_tasks: "claude-4-haiku"
    reasoning_tasks: "deepseek-r1"
  
  routing_thresholds:
    complexity_threshold: 0.7
    cost_threshold: 0.5
    quality_threshold: 0.8

# GitHub Integration
github:
  enabled: true
  auto_create_issues: true
  issue_labels:
    - "technical-debt"
    - "security"
    - "performance"
    - "code-quality"
  
  pr_analysis:
    auto_review: true
    comment_suggestions: true
    security_checks: true

# Code Analysis Settings  
code_analysis:
  languages:
    - python
    - javascript
    - typescript
    - rust
    - go
    - java
  
  security_scanning:
    enabled: true
    severity_threshold: "medium"
    cve_database: true
  
  performance_analysis:
    complexity_metrics: true
    bottleneck_detection: true
    optimization_suggestions: true

# System Settings
system:
  timeout: 300  # seconds
  max_concurrent_operations: 3
  log_level: "INFO"
  cache_enabled: true
  cache_ttl: 3600  # seconds

# Output Preferences
output:
  format: "detailed"  # detailed, summary, json
  colors: true
  progress_indicators: true
  cost_tracking: true
```

### **Advanced Configuration Options**

#### **Model-Specific Settings**
```yaml
ai_models:
  claude_4_opus:
    max_tokens: 8192
    temperature: 0.1
    top_p: 0.9
    use_for:
      - "complex_architecture"
      - "comprehensive_analysis"
      - "multi_step_planning"
  
  claude_4_sonnet:
    max_tokens: 4096
    temperature: 0.2
    top_p: 0.8
    use_for:
      - "code_generation"
      - "code_review"
      - "documentation"
  
  deepseek_r1:
    max_tokens: 2048
    temperature: 0.0
    top_p: 0.95
    use_for:
      - "mathematical_analysis"
      - "algorithm_optimization"
      - "logical_reasoning"
```

#### **GitHub Workflow Configuration**
```yaml
github:
  workflows:
    technical_debt:
      enabled: true
      schedule: "weekly"
      assignees: ["team-lead", "senior-dev"]
      milestone: "tech-debt-sprint"
    
    security_scan:
      enabled: true
      schedule: "daily"
      severity_threshold: "high"
      auto_assign: true
    
    performance_review:
      enabled: true
      trigger: "pull_request"
      benchmarks: true
      coverage_threshold: 80
```

#### **Team-Specific Settings**
```yaml
team:
  organization: "myorg"
  default_reviewers:
    - "senior-dev-1"
    - "tech-lead"
  
  coding_standards:
    python:
      formatter: "black"
      linter: "ruff"
      type_checker: "mypy"
    
    javascript:
      formatter: "prettier"
      linter: "eslint"
      bundler: "webpack"
  
  security_policies:
    secret_scanning: true
    dependency_scanning: true
    license_compliance: true
```

### **Configuration Management**

**View Current Configuration**:
```bash
asoba-code config show
asoba-code config show --section ai_models
asoba-code config show --format json
```

**Update Configuration**:
```bash
# Set specific values
asoba-code config set ai_models.cost_optimization true
asoba-code config set github.auto_create_issues false

# Edit configuration file
asoba-code config edit

# Reset to defaults
asoba-code config reset
asoba-code config reset --section github
```

**Configuration Validation**:
```bash
# Validate configuration
asoba-code config validate

# Test connectivity with current config
asoba-code config test
asoba-code config test --service github
asoba-code config test --service ai_models
```

---

## **Troubleshooting & Best Practices** {#troubleshooting}

### **Common Issues & Solutions**

#### **Installation & Setup Issues**

**Issue: Command not found**
```bash
# Solution: Add to PATH
export PATH=$PATH:$HOME/.local/bin

# Or use full path
~/.local/bin/asoba-code --help

# Permanent fix: Add to shell profile
echo 'export PATH=$PATH:$HOME/.local/bin' >> ~/.bashrc
source ~/.bashrc
```

**Issue: AWS credentials not working**
```bash
# Check AWS configuration
aws sts get-caller-identity

# Test credentials with asoba-code
asoba-code ask "Test AI model connectivity"

# Common solutions:
export AWS_DEFAULT_REGION=us-east-1  # Ensure region is set
aws configure  # Reconfigure credentials
```

**Issue: GitHub integration failing**
```bash
# Verify GitHub token
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Check token permissions - needs:
# - repo (full repository access)
# - write:issues
# - read:org (for organization repositories)
```

#### **Performance Issues**

**Slow Response Times**:
```bash
# Check system status
asoba-code status

# Enable performance monitoring
asoba-code config set system.log_level DEBUG

# Check for bottlenecks
asoba-code ask "Diagnose performance issues with my AsobaCode installation"
```

**Memory Usage Optimization**:
```yaml
# Optimize configuration for resource-constrained environments
system:
  max_concurrent_operations: 1
  cache_enabled: false
  
ai_models:
  model_preferences:
    complex_tasks: "claude-4-sonnet"  # Use lighter model
    standard_tasks: "claude-4-haiku"
```

#### **AI Model Issues**

**Cost Optimization**:
```bash
# Monitor AI costs
asoba-code ask "Show my AI usage and costs for this month"

# Enable aggressive cost optimization
asoba-code config set ai_models.cost_optimization true
asoba-code config set ai_models.routing_thresholds.cost_threshold 0.3

# Use cost-effective models for routine tasks
asoba-code ask "Use the most cost-effective model: analyze this simple Python function"
```

**Model Selection Problems**:
```bash
# Force specific model
asoba-code ask "Using Claude 4 Opus: design a complex distributed system architecture"

# Check model availability
asoba-code servers --health

# Fallback configuration
asoba-code config set ai_models.fallback_enabled true
```

### **Best Practices**

#### **Project Setup**

**1. Initial Repository Setup**:
```bash
# Start with comprehensive analysis
asoba-code ask "Analyze my new Python project and set up best practices for development workflow"

# Establish baseline
asoba-code ask "Create initial technical debt assessment and establish quality metrics baseline"
```

**2. Configuration for Teams**:
```yaml
# Team configuration template
team:
  name: "backend-team"
  standards:
    code_review_required: true
    security_scan_on_pr: true
    performance_benchmark: true
  
github:
  auto_create_issues: true
  assignees: ["tech-lead"]
  labels: ["backend", "tech-debt"]
```

#### **Workflow Optimization**

**1. Daily Development Workflow**:
```bash
# Morning: Check for new issues
asoba-code ask "Review overnight technical debt scans and prioritize today's work"

# Before commit: Pre-commit analysis  
asoba-code ask "Review my staged changes and suggest improvements"

# End of day: Team summary
asoba-code ask "Generate end-of-day summary of code quality improvements"
```

**2. Weekly Team Reviews**:
```bash
# Weekly technical debt review
asoba-code ask "Generate weekly technical debt report with trends and recommendations"

# Performance monitoring
asoba-code ask "Analyze application performance trends and identify optimization opportunities"

# Security posture review
asoba-code ask "Conduct weekly security review and update threat assessment"
```

#### **Cost Management**

**1. Cost-Effective Usage**:
```bash
# Use appropriate models for task complexity
asoba-code ask "Quick code review: check this function for basic issues"  # Uses cost-effective model
asoba-code ask "Comprehensive architecture review with security analysis"  # Uses premium model

# Batch similar requests
asoba-code ask "Analyze all Python files in /src directory for common issues"
```

**2. Budget Monitoring**:
```yaml
# Set up cost alerts
ai_models:
  cost_monitoring:
    monthly_budget: 100.00
    alert_threshold: 0.8
    auto_optimize: true
```

#### **Security Best Practices**

**1. Credential Management**:
```bash
# Never commit credentials
echo ".env" >> .gitignore
echo "config.yaml" >> .gitignore

# Use environment variables
export AWS_ACCESS_KEY_ID=...
export GITHUB_TOKEN=...

# Rotate tokens regularly
asoba-code ask "Help me set up automated GitHub token rotation"
```

**2. Security Scanning**:
```bash
# Regular security scans
asoba-code ask "Perform comprehensive security audit and create prioritized remediation plan"

# Dependency scanning
asoba-code ask "Scan dependencies for known vulnerabilities and suggest updates"

# Infrastructure security
asoba-code ask "Review Terraform configurations for security best practices"
```

#### **Quality Assurance**

**1. Automated Quality Checks**:
```bash
# Set up pre-commit hooks
asoba-code ask "Create pre-commit hooks for code quality, security, and performance checks"

# Continuous monitoring
asoba-code ask "Set up automated quality monitoring with GitHub Actions integration"
```

**2. Technical Debt Management**:
```bash
# Regular debt assessment
asoba-code ask "Quarterly technical debt assessment with ROI analysis for remediation"

# Debt categorization
asoba-code ask "Categorize technical debt by impact and effort, create prioritized backlog"
```

---

## **Support & Resources** {#support}

### **Documentation & Guides**
- **📖 Complete CLI Reference**: [docs.asobacode.dev/cli](https://docs.asobacode.dev/cli)
- **🎯 Best Practices Guide**: [docs.asobacode.dev/best-practices](https://docs.asobacode.dev/best-practices)
- **🔧 Troubleshooting Guide**: [docs.asobacode.dev/troubleshooting](https://docs.asobacode.dev/troubleshooting)
- **📊 Performance Optimization**: [docs.asobacode.dev/optimization](https://docs.asobacode.dev/optimization)
- **🏗️ Architecture Guide**: [docs.asobacode.dev/architecture](https://docs.asobacode.dev/architecture)

### **Community & Support**
- **💬 Developer Community**: [community.asobacode.dev](https://community.asobacode.dev)
- **📧 Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- **🤝 Business Development**: 
  - Shingai: [shingai@asoba.co](mailto:shingai@asoba.co)
  - Gertie: [gertie@asoba.co](mailto:gertie@asoba.co)
- **🔍 Feature Requests**: [github.com/AsobaCloud/asoba-code/issues](https://github.com/AsobaCloud/asoba-code/issues)

### **Development Resources**
- **📚 GitHub Repository**: [github.com/AsobaCloud/asoba-code](https://github.com/AsobaCloud/asoba-code)
- **🔄 Release Notes**: [github.com/AsobaCloud/asoba-code/releases](https://github.com/AsobaCloud/asoba-code/releases)
- **🐛 Bug Reports**: [github.com/AsobaCloud/asoba-code/issues](https://github.com/AsobaCloud/asoba-code/issues)
- **💡 Discussions**: [github.com/AsobaCloud/asoba-code/discussions](https://github.com/AsobaCloud/asoba-code/discussions)

### **Learning Resources**
- **🎥 Video Tutorials**: [youtube.com/@asobacleanenergy](https://youtube.com/@asobacleanenergy)
- **📝 Blog & Articles**: [blog.asoba.co](https://blog.asoba.co)
- **🎓 Training Materials**: [learn.asobacode.dev](https://learn.asobacode.dev)
- **🔬 Case Studies**: [case-studies.asobacode.dev](https://case-studies.asobacode.dev)

### **Enterprise Support**
For organizations requiring dedicated support:
- **🚨 Priority Support**: 4-hour response time for critical issues
- **👥 Dedicated Success Manager**: Personal onboarding and optimization
- **🔧 Custom Integration**: Tailored MCP server development
- **📊 Advanced Analytics**: Custom reporting and team productivity metrics
- **🏢 On-Premise Deployment**: Private cloud and air-gapped environments

**Contact Enterprise Sales**: [enterprise@asoba.co](mailto:enterprise@asoba.co)

### **Status & Monitoring**
- **📊 System Status**: [status.asobacode.dev](https://status.asobacode.dev)
- **📈 Performance Metrics**: [metrics.asobacode.dev](https://metrics.asobacode.dev)
- **🔔 Service Alerts**: Subscribe to status updates
- **📱 Mobile App**: iOS and Android status monitoring

### **Contributing**
- **🤝 Contribution Guidelines**: [CONTRIBUTING.md](https://github.com/AsobaCloud/asoba-code/blob/main/CONTRIBUTING.md)
- **📋 Code of Conduct**: [CODE_OF_CONDUCT.md](https://github.com/AsobaCloud/asoba-code/blob/main/CODE_OF_CONDUCT.md)
- **🏆 Contributor Recognition**: [contributors.asobacode.dev](https://contributors.asobacode.dev)
- **💰 Bug Bounty Program**: [security.asoba.co/bounty](https://security.asoba.co/bounty)

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
