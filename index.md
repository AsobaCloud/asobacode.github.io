---
title: "Home"
layout: default
nav_order: 1
---

# Zorora
{: .fs-9 }

**A local-deployment deep research engine that searches across academic databases, web sources, and newsroom articles, then synthesizes findings with credibility scoring and citation graphs.**
{: .fs-6 .fw-300 }

Built for macOS (Apple Silicon) with minimal RAM footprint, meant to be run directly from your computer, with all content, outputs, and chats stored locally and not in the cloud, giving you complete control and privacy.
{: .fs-5 .fw-300 }

<div class="page-header">
  <div class="version-badge">
    <span class="version-label">Version</span>
    <span class="version-value">2.1.0</span>
    <span class="version-separator">|</span>
    <span class="version-label">Latest Release</span>
    <a href="https://github.com/AsobaCloud/zorora/releases/tag/v2-prod" class="version-value">v2-prod</a>
  </div>
</div>

## Quick Start

<div class="quick-start-section">
  <a href="https://github.com/AsobaCloud/zorora/releases/tag/v2-prod" class="quick-start-button">Download v2-prod</a>
  <p class="quick-start-subtext">
    Or install from GitHub: <code>pip install git+https://github.com/AsobaCloud/zorora.git</code>
  </p>
</div>

### Prerequisites

- **Python 3.8+**
- **LM Studio** running on `http://localhost:1234`
  - Download: [lmstudio.ai](https://lmstudio.ai)
  - Load a 4B model (e.g., Qwen3-VL-4B, Qwen3-4B)
- **HuggingFace token** (optional) - For remote Codestral endpoint
- **Brave Search API key** (optional) - For enhanced web search

### Run

**Terminal Interface (for engineers):**
```bash
zorora
```

**Web Interface (for non-engineers):**
```bash
zorora web
# Opens at http://localhost:5000
```

## What You Can Find Here

<div class="overview-cards-grid">
  <div class="overview-card">
    <h3>Getting Started</h3>
    <p>Installation, configuration, and your first research query. Get up and running in minutes.</p>
    <a href="/getting-started" class="card-link">Get Started →</a>
  </div>
  
  <div class="overview-card">
    <h3>Guides</h3>
    <p>Step-by-step guides for terminal REPL, web UI, research workflows, code generation, and slash commands.</p>
    <a href="/guides/overview" class="card-link">View Guides →</a>
  </div>
  
  <div class="overview-card">
    <h3>API Reference</h3>
    <p>Complete API documentation for research endpoints, settings management, and Python SDK integration.</p>
    <a href="/api-reference/overview" class="card-link">View API Docs →</a>
  </div>
  
  <div class="overview-card">
    <h3>Technical Concepts</h3>
    <p>Architecture, research pipeline, storage design, and routing mechanisms. Deep dive into how Zorora works.</p>
    <a href="/technical-concepts/overview" class="card-link">Learn More →</a>
  </div>
  
  <div class="overview-card">
    <h3>Use Cases</h3>
    <p>Real-world examples: academic research, code development, multi-source analysis, and more.</p>
    <a href="/use-cases/overview" class="card-link">View Use Cases →</a>
  </div>
</div>

## Core Features

Zorora transforms from a basic research tool into a **deep research engine** that:

1. **Searches EVERYTHING** - Academic databases (7 sources) + web search + Asoba newsroom
2. **Follows citation trails** - Multi-hop research that explores cited papers
3. **Cross-references claims** - Groups similar claims and counts agreement across sources
4. **Scores credibility** - Transparent rules-based scoring of source authority
5. **Builds citation graphs** - Visualizes relationships between sources
6. **Synthesizes with confidence** - Generates comprehensive answers with citation levels

### Deep Research Capabilities

- **6-Phase Research Pipeline:**
  1. **Parallel Source Aggregation** - Searches academic (7 sources), web (Brave + DDG), and newsroom simultaneously
  2. **Citation Following** - Multi-hop exploration of cited papers (configurable depth: 1-3)
  3. **Cross-Referencing** - Groups claims by similarity and counts agreement
  4. **Credibility Scoring** - Rules-based scoring of source authority (academic journals, predatory publishers, retractions)
  5. **Citation Graph Building** - Constructs directed graphs showing source relationships
  6. **Synthesis** - Generates comprehensive answers with confidence levels and citations

- **Research Depth Levels:**
  - **Quick** - Initial sources only (skips citation following)
  - **Balanced** - Adds citation following (1 hop)
  - **Thorough** - Multi-hop citation exploration (up to 3 levels deep)

### Additional Features

- **Research persistence** - Save/load findings with metadata
- **Code generation** - Dedicated Codestral model for coding tasks
- **Multi-step development** - `/develop` workflow: explore → plan → approve → execute → lint
- **Slash commands** - Force workflows: `/search`, `/ask`, `/code`, `/develop`, `/image`, `/vision`
- **Deterministic routing** - Pattern-based decision tree (no LLM routing failures)
- **Hybrid deployment** - Local 4B orchestrator + remote 32B specialists
- **RAM-efficient** - Runs on MacBook Air M3 with 4B model
- **Dual interfaces** - Terminal REPL for engineers, Web UI for non-engineers
- **Multi-provider support** - Configure models from HuggingFace, OpenAI, and Anthropic APIs
- **Visual settings management** - Web UI settings modal for easy configuration
- **Vision and image generation** - Dedicated models for image analysis and text-to-image generation

## Popular Quick Links

<div class="quick-links-grid">
  <div class="quick-link-card">
    <div class="quick-link-icon">🚀</div>
    <h4>Quick Start</h4>
    <p>Get started in 5 minutes</p>
    <a href="/getting-started"></a>
  </div>
  
  <div class="quick-link-card">
    <div class="quick-link-icon">📚</div>
    <h4>Terminal REPL</h4>
    <p>Interactive command-line interface</p>
    <a href="/guides/terminal-repl"></a>
  </div>
  
  <div class="quick-link-card">
    <div class="quick-link-icon">🌐</div>
    <h4>Web UI</h4>
    <p>Browser-based research interface</p>
    <a href="/guides/web-ui"></a>
  </div>
  
  <div class="quick-link-card">
    <div class="quick-link-icon">🔍</div>
    <h4>Research Workflow</h4>
    <p>Deep research capabilities</p>
    <a href="/guides/research-workflow"></a>
  </div>
  
  <div class="quick-link-card">
    <div class="quick-link-icon">💻</div>
    <h4>Code Generation</h4>
    <p>Generate code with Codestral</p>
    <a href="/guides/code-generation"></a>
  </div>
  
  <div class="quick-link-card">
    <div class="quick-link-icon">⚡</div>
    <h4>Slash Commands</h4>
    <p>Command reference</p>
    <a href="/guides/slash-commands"></a>
  </div>
</div>

## Code Examples

### Deep Research Query

**Terminal (via REPL):**
```bash
[1] ⚙ > What are the latest developments in large language model architectures?
```

The system automatically detects research intent and executes the deep research workflow.

**Web UI:**
1. Open `http://localhost:5000` in your browser
2. Enter research question in the search box
3. Select depth level (Quick/Balanced/Thorough)
4. Click "Start Research"
5. View synthesis, sources, and credibility scores

**API (Programmatic Access):**
```python
from engine.research_engine import ResearchEngine

engine = ResearchEngine()
state = engine.deep_research("Your research question", depth=1)
print(state.synthesis)
```

### Code Generation

```bash
[2] ⚙ > Write a Python function to validate email addresses
```

Routes to Codestral specialist model for code generation.

### Development Workflow

```bash
[3] ⚙ > /develop Add user authentication to my Flask app
```

Executes multi-step workflow: explore → plan → approve → execute → lint.

## Version & Updates

<div class="version-updates-section">
  <div class="version-info">
    <h3>Current Version</h3>
    <div class="version-number">2.1.0</div>
    <div class="version-date">Settings Modal & Multi-Provider Support</div>
    <a href="/changelog" class="changelog-link">View Full Changelog →</a>
  </div>
  
  <div class="whats-new">
    <h3>What's New</h3>
    <ul class="whats-new-list">
      <li>Web UI Settings Modal - Visual configuration interface</li>
      <li>Multi-provider endpoint support (HuggingFace, OpenAI, Anthropic)</li>
      <li>API key management for all providers</li>
      <li>Vision and image generation model configuration</li>
      <li>Endpoint CRUD operations via Web UI</li>
    </ul>
    <a href="/changelog" class="whats-new-link">See All Changes →</a>
  </div>
</div>

## Community & Support

<div class="community-section">
  <div class="community-links-grid">
    <div class="community-link-card">
      <div class="community-icon">💬</div>
      <h4>Discord</h4>
      <p>Join our community</p>
      <a href="https://discord.gg/nNV5evcr" target="_blank"></a>
    </div>
    
    <div class="community-link-card">
      <div class="community-icon">📧</div>
      <h4>Email Support</h4>
      <p>Get help from our team</p>
      <a href="mailto:support@asoba.co"></a>
    </div>
    
    <div class="community-link-card">
      <div class="community-icon">🐛</div>
      <h4>Report Issues</h4>
      <p>GitHub Issues</p>
      <a href="https://github.com/AsobaCloud/zorora/issues" target="_blank"></a>
    </div>
    
    <div class="community-link-card">
      <div class="community-icon">📖</div>
      <h4>Documentation</h4>
      <p>Full documentation</p>
      <a href="/getting-started"></a>
    </div>
  </div>
</div>

## Documentation Sections Overview

<div class="sections-overview">
  <div class="section-cards">
    <div class="section-card">
      <h3>Getting Started</h3>
      <p>Installation, configuration, and your first research query. Everything you need to get started with Zorora.</p>
      <a href="/getting-started" class="section-link">Get Started →</a>
    </div>
    
    <div class="section-card">
      <h3>Guides</h3>
      <p>Comprehensive guides covering terminal REPL, web UI, research workflows, code generation, and all slash commands.</p>
      <a href="/guides/overview" class="section-link">View Guides →</a>
    </div>
    
    <div class="section-card">
      <h3>API Reference</h3>
      <p>Complete API documentation for research endpoints, settings management, and Python SDK integration.</p>
      <a href="/api-reference/overview" class="section-link">View API Docs →</a>
    </div>
    
    <div class="section-card">
      <h3>Technical Concepts</h3>
      <p>Deep dive into Zorora's architecture, research pipeline, storage design, and routing mechanisms.</p>
      <a href="/technical-concepts/overview" class="section-link">Learn More →</a>
    </div>
    
    <div class="section-card">
      <h3>Use Cases</h3>
      <p>Real-world examples and use cases: academic research, code development, multi-source analysis.</p>
      <a href="/use-cases/overview" class="section-link">View Use Cases →</a>
    </div>
    
    <div class="section-card">
      <h3>FAQ</h3>
      <p>Frequently asked questions and troubleshooting guide for common issues.</p>
      <a href="/faq" class="section-link">View FAQ →</a>
    </div>
  </div>
</div>

---

## Get Help

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
