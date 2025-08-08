---
title: "Quick Launch Guide"
layout: default
nav_order: 2
---

# Quick Launch Guide

Choose your path based on your role and goals.

---

## Developers (5-minute setup) {#developers}

Get Terminal running with Amazon Nova Pro models and throttling resistance.

### Prerequisites

✅ **AWS credentials** with Bedrock access  
✅ **Python 3.10+** and **Git** installed  
✅ **Terminal/Command Line** environment

### Installation & Setup

**Step 1: Install Terminal (2 minutes)**

#### Windows (Recommended: Use Installer)

**Option 1: Windows Installer (Easiest)**
1. Download `ona-terminal-setup.exe` from [Releases](https://github.com/AsobaCloud/terminal/releases)
2. Run the installer with administrator privileges
3. Follow the installation wizard
4. The installer will:
   - Install to `C:\Program Files\OnaTerminal\`
   - Create Start Menu shortcuts
   - Optionally add to PATH for command-line access

**Option 2: Manual Installation**
```cmd
:: Clone the repository
git clone https://github.com/AsobaCloud/terminal.git
cd terminal

:: Create and activate virtual environment
python -m venv venv
call venv\Scripts\activate.bat

:: Install in development mode
pip install -e .

:: Verify installation
ona-terminal --version
```

#### Linux/macOS

**Step-by-step installation:**

1. **Clone the repository**
```bash
git clone https://github.com/AsobaCloud/terminal.git
cd terminal
```

2. **Run the installation script**
```bash
./install.sh
```

3. **Reload your shell configuration**
```bash
# For bash users:
source ~/.bashrc

# For zsh users:
source ~/.zshrc

# OR restart your terminal completely
```

4. **Verify installation**
```bash
ona-terminal --version
```

**Step 2: Configure AWS (2 minutes)**

```bash
# Configure AWS credentials
aws configure
# Enter: Access Key ID, Secret Access Key, Region (us-east-1)

# Test Nova Pro model (recommended for best availability)
aws bedrock invoke-model \
  --model-id amazon.nova-pro-v1:0 \
  --body '{"messages":[{"role":"user","content":[{"text":"test"}]}],"inferenceConfig":{"max_new_tokens":10}}' \
  --region us-east-1 \
  --cli-binary-format raw-in-base64-out
```

### Immediate CLI Validation (1 minute)

```bash
# Launch interactive mode
ona-terminal

# Run validation commands
🤖 | /help
🤖 | /commands
🤖 | generate a python function that calculates fibonacci numbers
```

---

## Business Users {#business-users}

Transform reactive operations into proactive intelligence with industry-specific AI.

### Why Ona Terminal: Reactive vs. Proactive O&M

<div class="video-placeholder">
  <div class="video-content">
    <div class="play-button">▶️</div>
    <div class="video-info">
      <h4>Reactive vs. Proactive Operations Management</h4>
      <p>See how Ona Terminal transforms traditional reactive workflows into proactive intelligence</p>
      <span class="video-duration">4:32</span>
    </div>
  </div>
</div>

**Ona Terminal transforms operations into proactive intelligence:**

| Reactive Approach | Ona Terminal Proactive |
|------------------|-------------------|
| 🔴 Equipment fails unexpectedly | 🟢 AI predicts failures 2-4 weeks early |
| 🔴 Manual diagnosis (hours/days) | 🟢 Automated fault detection (minutes) |
| 🔴 Generic repair procedures | 🟢 Equipment-specific action plans |
| 🔴 Lost warranty claims | 🟢 Automated warranty validation |
| 🔴 High MTTR (8-24 hours) | 🟢 Reduced MTTR (2-4 hours) |

**Result: 40-60% reduction in operational costs, 75% reduction in unplanned downtime.**

### Industry-Specific AI Advantage

**Learn More:**

<div class="blog-cards">
  <div class="blog-card">
    <div class="blog-image">
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="llmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#llmGrad)"/>
        <circle cx="120" cy="100" r="40" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
        <circle cx="200" cy="60" r="25" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
        <circle cx="280" cy="120" r="35" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>
        <path d="M120 100 L200 60 M200 60 L280 120 M120 100 L280 120" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
        <text x="200" y="170" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">Custom AI Models</text>
      </svg>
    </div>
    <div class="blog-content">
      <h3><a href="/blog/homegrown-llms">Our Homegrown LLMs</a></h3>
      <p>How we fine-tuned specialized models for infrastructure automation and policy analysis</p>
    </div>
  </div>
  
  <div class="blog-card">
    <div class="blog-image">
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="oodaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#oodaGrad)"/>
        <polygon points="50,150 100,50 150,150" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
        <rect x="180" y="80" width="60" height="40" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
        <circle cx="320" cy="100" r="30" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>
        <path d="M150 100 L180 100 M240 100 L290 100" stroke="rgba(255,255,255,0.5)" stroke-width="3" marker-end="url(#arrowhead)"/>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.8)" />
          </marker>
        </defs>
        <text x="200" y="170" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">OODA in Business</text>
      </svg>
    </div>
    <div class="blog-content">
      <h3><a href="/blog/ooda-business-operations">From Fighter Pilots to Solar Farms: How OODA Loops Transform Business Operations</a></h3>
      <p>Military decision-making frameworks applied to energy asset management</p>
    </div>
  </div>
  
  <div class="blog-card">
    <div class="blog-image">
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="introGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#00f2fe;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#introGrad)"/>
        <circle cx="100" cy="70" r="20" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
        <circle cx="200" cy="70" r="20" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
        <circle cx="300" cy="70" r="20" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
        <circle cx="150" cy="130" r="20" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
        <circle cx="250" cy="130" r="20" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
        <path d="M100 70 L150 130 M200 70 L150 130 M200 70 L250 130 M300 70 L250 130" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
        <text x="100" y="45" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" font-weight="bold">O</text>
        <text x="200" y="45" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" font-weight="bold">O</text>
        <text x="300" y="45" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" font-weight="bold">D</text>
        <text x="150" y="155" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" font-weight="bold">A</text>
        <text x="200" y="175" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">OODA Framework</text>
      </svg>
    </div>
    <div class="blog-content">
      <h3><a href="/blog/introduction-to-ooda-loops">Introduction to OODA Loops</a></h3>
      <p>Understanding the Observe-Orient-Decide-Act framework for systematic decision making</p>
    </div>
  </div>
</div>

**Domain-specific fine-tuned models deliver superior performance for specialized tasks.**

### Next Steps

1. **[See the Full O&M Use Case](om-use-case.html)** - Detailed business problem and solution
2. **[Schedule Enterprise Demo](mailto:sales@asoba.co?subject=Ona Terminal%20Enterprise%20Demo)** - Custom deployment discussion
3. **[Technical Implementation](#developers)** - Share with your engineering team

[Talk to Sales](mailto:sales@asoba.co?subject=Ona Terminal%20Enterprise%20Demo){: .btn .btn-primary .fs-5 }

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

<style>
.video-placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 40px;
  margin: 30px 0;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.video-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.video-content {
  position: relative;
  z-index: 1;
}

.play-button {
  font-size: 4em;
  margin-bottom: 20px;
  opacity: 0.9;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.play-button:hover {
  transform: scale(1.1);
}

.video-info h4 {
  font-size: 1.5em;
  margin: 0 0 10px 0;
  font-weight: 600;
}

.video-info p {
  font-size: 1.1em;
  margin: 0 0 15px 0;
  opacity: 0.9;
}

.video-duration {
  background: rgba(0,0,0,0.3);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 500;
}

.blog-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 30px 0 40px 0;
}

@media (max-width: 1200px) {
  .blog-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .blog-cards {
    grid-template-columns: 1fr;
  }
}

.blog-card {
  border: 2px solid #e1e4e8;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.blog-card:hover {
  border-color: #4551bf;
  box-shadow: 0 8px 25px rgba(69, 81, 191, 0.15);
  transform: translateY(-4px);
}

.blog-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-content {
  padding: 25px;
}

.blog-content h3 {
  margin: 0 0 12px 0;
  font-size: 1.2em;
  line-height: 1.3;
}

.blog-content h3 a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.blog-content h3 a:hover {
  color: #4551bf;
}

.blog-content p {
  color: #666;
  margin: 0;
  font-size: 0.95em;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .video-placeholder {
    padding: 30px 20px;
  }
  
  .play-button {
    font-size: 3em;
  }
}
</style>