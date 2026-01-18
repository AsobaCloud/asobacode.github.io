---
title: "Documentation Home"
layout: default
---

<!-- A. Compact Title + Version Indicator -->
<div class="page-header">
  <h1>Zorora Documentation</h1>
  <div class="version-badge">
    <span class="version-label">Version</span>
    <span class="version-value">2.5.0</span>
    <span class="version-separator">|</span>
    <span class="version-label">Latest Release</span>
    <a href="https://github.com/AsobaCloud/zorora/releases/tag/v2.5-prod" class="version-value">v2.5-prod</a>
  </div>
</div>

<!-- B. Quick Start CTA (Prominent) -->
<div class="quick-start-section">
  <a href="https://github.com/AsobaCloud/zorora/releases/tag/v2.5-prod" class="quick-start-button">
    Download v2.5-prod
  </a>
  <p class="quick-start-subtext">
    Or install from GitHub: <code>pip install git+https://github.com/AsobaCloud/zorora.git</code>
  </p>
  <a href="https://huggingface.co/asoba/nehanda-v1-7b" class="quick-start-button" style="margin-top: 12px; display: inline-block; font-size: 0.95em;">
    Download Nehanda 7B v1
  </a>
  <p class="quick-start-subtext" style="margin-top: 4px;">
    Asoba's homegrown fine-tuning of Mistral 7B for intelligence assessment and /search, /research synthesis in Zorora.
  </p>
</div>

<!-- C. Web App & Access Methods (Horizontal Row) -->
<div class="sdk-links-section">
  <h2>Get Started with Zorora</h2>
  <div class="sdk-links-grid">
    <a href="/guides/web-ui" class="sdk-link-card">
      <div class="sdk-icon">🌐</div>
      <h3>Web UI</h3>
      <code class="sdk-install">zorora web</code>
      <p>Browser-based research interface</p>
    </a>

    <a href="/guides/terminal-repl" class="sdk-link-card">
      <div class="sdk-icon">💻</div>
      <h3>Terminal REPL</h3>
      <code class="sdk-install">zorora</code>
      <p>Command-line interface</p>
    </a>

    <a href="/api-reference/overview" class="sdk-link-card">
      <div class="sdk-icon">🔧</div>
      <h3>Python API</h3>
      <code class="sdk-install">ResearchEngine()</code>
      <p>Programmatic access</p>
    </a>
  </div>
  <div class="screenshot-container" style="margin-top: 32px;">
    <img src="{{ site.baseurl }}/assets/images/repl.gif" alt="Zorora Web UI in action" class="screenshot">
  </div>
  <p class="screenshot-caption">Zorora Web UI - Deep research with multi-source synthesis</p>
</div>

<!-- D. Documentation Sections Overview -->
<div class="sections-overview">
  <h2>Documentation Sections</h2>
  <div class="section-cards">
    <div class="section-card">
      <h3>Getting Started</h3>
      <p>Quick tutorials to get you up and running</p>
      <a href="/getting-started" class="section-link">View Getting Started →</a>
    </div>
    
    <div class="section-card">
      <h3>Guides</h3>
      <p>Step-by-step guides for common tasks</p>
      <a href="/guides/overview" class="section-link">Browse Guides →</a>
    </div>
    
    <div class="section-card">
      <h3>API Reference</h3>
      <p>Complete API documentation</p>
      <a href="/api-reference/overview" class="section-link">View API Docs →</a>
    </div>
    
    <div class="section-card">
      <h3>Technical Concepts</h3>
      <p>Deep dives into how things work</p>
      <a href="/technical-concepts/overview" class="section-link">Learn More →</a>
    </div>
    
    <div class="section-card">
      <h3>Use Cases</h3>
      <p>Real-world examples and case studies</p>
      <a href="/use-cases/overview" class="section-link">See Use Cases →</a>
    </div>
    
    <div class="section-card">
      <h3>FAQ</h3>
      <p>Frequently asked questions</p>
      <a href="/faq" class="section-link">View FAQ →</a>
    </div>
  </div>
</div>

<!-- E. Code Examples Section -->
<div class="code-examples-section">
  <h2>Code Examples</h2>
  <p class="section-intro">Get started quickly with copy-paste examples</p>
  
  <div class="code-examples-tabs">
    <button class="code-tab active" data-tab="terminal">Terminal</button>
    <button class="code-tab" data-tab="web">Web UI</button>
    <button class="code-tab" data-tab="api">Python API</button>
  </div>
  
  <div class="code-examples-grid">
    <!-- Terminal Examples -->
    <div class="code-example-card" data-language="terminal">
      <h4>Deep Research Query</h4>
      <pre><code>zorora
[1] ⚙ > What are the latest developments in large language model architectures?</code></pre>
      <a href="/guides/research-workflow" class="code-example-link">View Full Guide →</a>
    </div>
    
    <div class="code-example-card" data-language="terminal">
      <h4>Code Generation</h4>
      <pre><code>[2] ⚙ > Write a Python function to validate email addresses</code></pre>
      <a href="/guides/code-generation" class="code-example-link">View Full Guide →</a>
    </div>
    
    <!-- Web UI Examples -->
    <div class="code-example-card" data-language="web" style="display: none;">
      <h4>Start Research</h4>
      <pre><code>1. Open http://localhost:5000
2. Enter research question
3. Select depth (Quick/Balanced/Thorough)
4. Click "Start Research"</code></pre>
      <a href="/guides/web-ui" class="code-example-link">View Full Guide →</a>
    </div>
    
    <div class="code-example-card" data-language="web" style="display: none;">
      <h4>Configure Settings</h4>
      <pre><code>1. Click ⚙️ gear icon
2. Select models and endpoints
3. Configure API keys
4. Click "Save"</code></pre>
      <a href="/guides/configuration" class="code-example-link">View Full Guide →</a>
    </div>
    
    <!-- Python API Examples -->
    <div class="code-example-card" data-language="api" style="display: none;">
      <h4>Deep Research</h4>
      <pre><code>from engine.research_engine import ResearchEngine

engine = ResearchEngine()
state = engine.deep_research(
    "Your research question",
    depth=1
)
print(state.synthesis)</code></pre>
      <a href="/api-reference/python-sdk" class="code-example-link">View Full API Docs →</a>
    </div>
    
    <div class="code-example-card" data-language="api" style="display: none;">
      <h4>Search Past Research</h4>
      <pre><code>results = engine.search_research(
    query="LLM architectures",
    limit=10
)
for r in results:
    print(r['query'])</code></pre>
      <a href="/api-reference/python-sdk" class="code-example-link">View Full API Docs →</a>
    </div>
  </div>
  
  <div class="code-examples-footer">
    <a href="/guides/overview" class="view-all-examples">View All Guides →</a>
  </div>
</div>

<!-- F. Product/Service Categories -->
<div class="product-categories-section">
  <h2>Core Features</h2>
  <div class="product-categories-grid">
    <a href="/guides/research-workflow" class="product-category-card">
      <h4>Deep Research</h4>
      <p>6-phase research pipeline</p>
    </a>
    
    <a href="/guides/code-generation" class="product-category-card">
      <h4>Code Generation</h4>
      <p>Codestral specialist model</p>
    </a>
    
    <a href="/guides/development-workflow" class="product-category-card">
      <h4>Development Workflow</h4>
      <p>Multi-step code development</p>
    </a>
    
    <a href="/technical-concepts/architecture" class="product-category-card">
      <h4>Local-First</h4>
      <p>Complete privacy & control</p>
    </a>
    
    <a href="/guides/web-ui" class="product-category-card">
      <h4>Web Interface</h4>
      <p>Browser-based research UI</p>
    </a>
    
    <a href="/guides/terminal-repl" class="product-category-card">
      <h4>Terminal REPL</h4>
      <p>Command-line interface</p>
    </a>
  </div>
</div>

<!-- G. Role-Based Entry Points (Compact) -->
<div class="wayfinding-section">
  <h2>Choose Your Path</h2>
  <p class="section-intro">
    Get started based on your role and goals
  </p>
  
  <div class="role-cards">
    <!-- Engineer Path -->
    <div class="role-card developer">
      <div class="role-icon">👨‍💻</div>
      <h3>I'm an Engineer</h3>
      <p>Use terminal REPL and programmatic APIs</p>
      <ul class="role-features">
        <li>Terminal REPL</li>
        <li>Python API</li>
        <li>Code Generation</li>
        <li>Development Workflow</li>
      </ul>
      <div class="role-actions">
        <a href="/getting-started" class="role-button primary">Get Started</a>
        <a href="/guides/terminal-repl" class="role-button secondary">Terminal Guide</a>
      </div>
    </div>
    
    <!-- Researcher Path -->
    <div class="role-card business">
      <div class="role-icon">🔬</div>
      <h3>I'm a Researcher</h3>
      <p>Conduct deep research with multi-source synthesis</p>
      <ul class="role-features">
        <li>Web UI</li>
        <li>Research Workflow</li>
        <li>Citation Following</li>
        <li>Credibility Scoring</li>
      </ul>
      <div class="role-actions">
        <a href="/guides/web-ui" class="role-button primary">Use Web UI</a>
        <a href="/guides/research-workflow" class="role-button secondary">Research Guide</a>
      </div>
    </div>
    
    <!-- Developer Path -->
    <div class="role-card decision">
      <div class="role-icon">💻</div>
      <h3>I'm a Developer</h3>
      <p>Build integrations and automate workflows</p>
      <ul class="role-features">
        <li>Python API</li>
        <li>API Reference</li>
        <li>Code Examples</li>
        <li>Use Cases</li>
      </ul>
      <div class="role-actions">
        <a href="/api-reference/overview" class="role-button primary">View API Docs</a>
        <a href="/use-cases/overview" class="role-button secondary">See Use Cases</a>
      </div>
    </div>
  </div>
</div>

<!-- H. Version & Updates Section -->
<div class="version-updates-section">
  <div class="version-info">
    <h3>Current Version</h3>
    <p class="version-number">v2.5.0</p>
    <p class="version-date">ONA Platform Integration & Enhanced Editing</p>
    <a href="/changelog" class="changelog-link">View Changelog →</a>
  </div>

  <div class="whats-new">
    <h3>What's New in v2.5</h3>
    <ul class="whats-new-list">
      <li>ONA Platform Integration - Remote ML model observation commands</li>
      <li>Enhanced /code file editing with auto-detection and retry loop</li>
      <li>Beautiful progress display with hierarchical tool visualization</li>
      <li>/deep command for terminal deep research</li>
      <li>Complete modular tool registry migration (19 tools)</li>
    </ul>
    <a href="/changelog" class="whats-new-link">Read Release Notes →</a>
  </div>
</div>

<!-- I. Community & Support Section -->
<div class="community-section">
  <h2>Community & Support</h2>
  <div class="community-links-grid">
    <a href="https://discord.gg/nNV5evcr" target="_blank" class="community-link-card">
      <div class="community-icon">💬</div>
      <h4>Discord</h4>
      <p>Join our community</p>
    </a>
    
    <a href="https://github.com/AsobaCloud/zorora" target="_blank" class="community-link-card">
      <div class="community-icon">🐙</div>
      <h4>GitHub</h4>
      <p>View source code</p>
    </a>
    
    <a href="mailto:support@asoba.co" class="community-link-card">
      <div class="community-icon">📧</div>
      <h4>Email Support</h4>
      <p>Get help from our team</p>
    </a>
  </div>
</div>


## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>We're constantly improving and want you to be a part of shaping the future of deep research. If you encounter issues or have suggestions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
      <a href="https://discord.gg/nNV5evcr" target="_blank" class="support-button" style="margin-top: 10px; display: inline-block;">
        <svg width="16" height="16" style="margin-right: 8px; vertical-align: middle;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Join Discord
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

<script>
// Code examples tab switching
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.code-tab');
  const cards = document.querySelectorAll('.code-example-card');
  
  // Only run if elements exist
  if (tabs.length === 0 || cards.length === 0) {
    return;
  }
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetLang = this.getAttribute('data-tab');
      
      if (!targetLang) {
        return;
      }
      
      // Update active tab
      tabs.forEach(t => {
        if (t) {
          t.classList.remove('active');
        }
      });
      this.classList.add('active');
      
      // Show/hide cards
      cards.forEach(card => {
        if (!card) {
          return;
        }
        const cardLang = card.getAttribute('data-language');
        if (cardLang === targetLang) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
</script>

© 2025 Asoba Corporation. All rights reserved.
