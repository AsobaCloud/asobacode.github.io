---
title: "Introduction"
layout: default
nav_order: 1
---

## Getting Started {#getting-started}

Welcome to **AsobaCode CLI** - the AI-powered terminal development platform that transforms how you manage infrastructure deployment, technical debt, and code quality! Built on the Model Context Protocol (MCP) with intelligent AI model routing, AsobaCode provides enterprise-grade automation for modern DevOps workflows.

---

### What is AsobaCode CLI? {#what-is-asobacode}

AsobaCode CLI is a **terminal-native development platform** that combines three powerful MCP servers with an intelligent terminal interface to automate complex software engineering tasks:

🤖 **AI Models Server** - Multi-provider access to AWS Bedrock + custom fine-tuned models with intelligent routing  
🐙 **GitHub Integration Server** - Automated repository management, issue tracking, and PR workflows  
🔍 **Code Analysis Server** - Advanced static analysis, technical debt detection, and security scanning  
💬 **Terminal Interface** - Claude Code-like conversational interface with natural language routing

---

### Quick Start {#quick-start}

Get up and running with AsobaCode CLI in minutes:

```bash
# 1. Clone the repository
git clone https://github.com/AsobaCloud/asoba-code.git
cd asoba-code

# 2. Install with Python 3.10+
pip install -e .

# 3. Configure AWS credentials (for AI models)
export AWS_DEFAULT_REGION=us-east-1
aws configure  # or set environment variables

# 4. Optional: Enable custom models for 30x cost reduction
export MISTRAL_STATUS_URL="http://your-server:8000/status"
export MISTRAL_FALLBACK_IP="your-server-ip"

# 5. Optional: Set GitHub token
export GITHUB_TOKEN=your_github_token_here

# 6. Add to PATH
export PATH=$PATH:$HOME/.local/bin

# 7. Start using AsobaCode CLI
asoba-code --help
asoba-code status  # Check system health
```

---

### Core Capabilities {#core-capabilities}

#### 🧠 **Multi-Provider AI Integration**
- **AWS Bedrock Provider** - Claude 4 Sonnet, Llama 4 Scout, DeepSeek-R1 (out-of-box)
- **Custom Model Provider** - Fine-tuned Mistral 7B for infrastructure tasks (optional)
- **Intelligent Provider Routing** - Task-based selection with automatic fallback
- **30x Cost Reduction** - Custom models for infrastructure code generation
- **Graceful Fallback** - Seamless Bedrock usage when custom models unavailable

#### 🚀 **Infrastructure-as-Code Automation**
- **Multi-Cloud Support** - AWS, GCP, Azure infrastructure automation
- **Template Generation** - Automated CloudFormation, Terraform, and Kubernetes manifests
- **Compliance Ready** - SOC2, ISO27001, and security best practices built-in
- **GitHub Integration** - Issue-to-infrastructure deployment workflows

#### 🔍 **Comprehensive Code Analysis**
- **Multi-Language Support** - Python, JavaScript, TypeScript, Rust, Go, Java, and more
- **Technical Debt Detection** - Automated identification and tracking
- **Security Scanning** - Vulnerability detection and remediation suggestions
- **Performance Analysis** - Complexity metrics and optimization recommendations

#### 🤖 **Intelligent Automation**
- **Natural Language Interface** - Describe what you want, get working solutions
- **Context-Aware** - Maintains project context across sessions
- **Workflow Automation** - End-to-end task execution from planning to deployment
- **Error Recovery** - Intelligent retry and fallback mechanisms

---

### Architecture Overview {#architecture}

AsobaCode uses a **modular MCP-based architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                  Terminal Interface (CLI)                   │
│              Claude Code-like Conversational UI             │
├─────────────────────────────────────────────────────────────┤
│               Natural Language Router (ReAct)               │
│          Routes queries to appropriate MCP servers          │
├─────────────────────────────────────────────────────────────┤
│                    MCP Servers Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ AI Models   │  │   GitHub    │  │   Code Analysis     │  │
│  │   Server    │  │   Server    │  │      Server         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    External Services                        │
│     AWS Bedrock    │    GitHub API    │   Static Analysis   │
│    Claude 4, etc.  │  Issues, PRs     │    Tools & Rules    │
└─────────────────────────────────────────────────────────────┘
```

---

### Key Use Cases {#key-use-cases}

- **DevOps Engineers**: Automate infrastructure deployment and monitoring with AI-generated templates
- **Software Teams**: Enhance code quality with automated technical debt detection and test generation
- **Platform Engineers**: Build scalable infrastructure-as-code solutions with compliance built-in
- **Security Teams**: Automated vulnerability scanning and security-first development practices
- **Engineering Managers**: Track technical debt trends and team productivity metrics across projects

---

### Getting Started Steps {#getting-started-steps}

#### 1. **Installation & Setup**
Follow our [Installation Guide](sdk.html) for detailed setup instructions including AWS configuration and GitHub integration.

#### 2. **First Analysis**
```bash
# Analyze your codebase for technical debt
asoba-code ask "Analyze my Python project for technical debt and create GitHub issues"

# Generate infrastructure code
asoba-code ask "Create a Terraform configuration for a highly available web application on AWS"
```

#### 3. **Advanced Workflows**
```bash
# Multi-step infrastructure deployment
asoba-code ask "Deploy a microservices architecture with monitoring, logging, and auto-scaling on AWS"

# Comprehensive code review
asoba-code ask "Review the latest commit, suggest improvements, and create a follow-up issue"
```

#### 4. **Team Integration**
Set up automated workflows, team dashboards, and continuous monitoring for your development team.

---

### Why Choose AsobaCode CLI?

✅ **AI Vendor Independence** - No dependency on single AI providers  
✅ **Cost Optimized** - Custom models provide 30x cost reduction for infrastructure tasks  
✅ **Terminal Native** - Built for developers who live in the terminal  
✅ **Enterprise Ready** - Security, compliance, and scalability built-in  
✅ **Open Architecture** - Extensible MCP-based design for custom integrations  
✅ **Comprehensive** - Code analysis, infrastructure automation, and team collaboration in one tool

---

Key features include:
- **Multi-Cloud Infrastructure Automation** - AWS, GCP, Azure support with intelligent template generation
- **Advanced Code Analysis** - Multi-language support with security and performance insights
- **GitHub Integration** - Automated issue creation, PR analysis, and workflow automation
- **Cost-Optimized AI** - Multi-provider architecture with 30x cost reduction for infrastructure tasks
- **Terminal-Native Design** - Built specifically for command-line workflows and DevOps automation
- **MCP Protocol Foundation** - Extensible architecture for custom tool integration

For detailed installation and usage instructions, see our [Installation Guide](sdk.html) and [CLI Reference](endpoints.html).

---

## YouTube Channel

Stay updated with our latest videos and tutorials on our YouTube channel:

<div>
  <a href="https://www.youtube.com/@asobacleanenergy" target="_blank">
    <img src="{{ site.baseurl }}/assets/images/youtube_banner.png" alt="Asoba YouTube Channel" style="width: 50%; max-width: 700px; display: block; margin: 0 0;">
  </a>
</div>

<div style="text-align: left; margin: 15px 0 25px 0;">
  <a href="https://www.youtube.com/@asobacleanenergy?sub_confirmation=1" target="_blank" style="display: inline-block; background-color: #FF0000; color: white; font-weight: 600; padding: 8px 20px; border-radius: 4px; text-decoration: none; font-size: 14px;">Subscribe to our Channel</a>
</div>

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
 
