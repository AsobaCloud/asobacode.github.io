---
title: "Asoba Open Source"
layout: default
---

<!-- A. Header -->
<div class="page-header">
  <h1>Asoba Open Source</h1>
  <p style="font-size: 1.15rem; color: #4a4a4a; margin-top: 8px;">
    Open-source AI and energy infrastructure from <a href="https://asoba.co">Asoba Corporation</a>.
  </p>
</div>

<!-- B. Project Cards -->
<div class="sections-overview">
  <h2>Projects</h2>
  <div class="section-cards">

    <div class="section-card">
      <h3>🧠 Nehanda Model</h3>
      <p>Fine-tuned Qwen3.6-27B for RAG synthesis. Scores <strong>88.7% on FACTS Grounding</strong> — above Gemini 2.5 Pro, Claude 3.5 Sonnet, and GPT-4o. Trained for ~$135 of GPU time.</p>
      <a href="/nehanda-model" class="section-link">Learn more →</a>
    </div>

    <div class="section-card">
      <h3>💻 Nehanda CLI</h3>
      <p>Local AI coding substrate powered by Nehanda. 4-tier memory compaction, codebase graph, delegate orchestration, and guardrails. No Docker.</p>
      <a href="/nehanda-cli" class="section-link">Learn more →</a>
    </div>

    <div class="section-card">
      <h3>⚡ ODS-E</h3>
      <p>Open Data Schema for Energy — an open specification for interoperable energy asset data across generation, consumption, and net metering.</p>
      <a href="/odse" class="section-link">Learn more →</a>
    </div>

  </div>
</div>

<!-- C. Core Dependencies -->
<div class="sections-overview">
  <h2>Core Dependencies</h2>
  <div class="section-cards">
    <div class="section-card">
      <h3>aimee</h3>
      <p>Memory substrate with hybrid vector-graph recall, codebase indexing, cheap delegates, and guardrails. Written in C.</p>
      <a href="/dependencies#aimee" class="section-link">Learn more →</a>
    </div>
    <div class="section-card">
      <h3>aichat</h3>
      <p>Terminal UI for LLM interaction — multi-provider, sessions, roles, and RAG. The interactive frontend for Nehanda CLI.</p>
      <a href="/dependencies#aichat" class="section-link">Learn more →</a>
    </div>
  </div>
</div>

<!-- D. Quick Links -->
<div class="sdk-links-section">
  <h2>Quick Links</h2>
  <div class="sdk-links-grid">
    <a href="https://github.com/AsobaCloud" class="sdk-link-card" target="_blank">
      <div class="sdk-icon">🐙</div>
      <h3>GitHub</h3>
      <code class="sdk-install">AsobaCloud</code>
      <p>All open-source repos</p>
    </a>
    <a href="https://huggingface.co/asoba" class="sdk-link-card" target="_blank">
      <div class="sdk-icon">🤗</div>
      <h3>HuggingFace</h3>
      <code class="sdk-install">asoba</code>
      <p>Model weights & GGUF</p>
    </a>
    <a href="https://opendataschema.energy" class="sdk-link-card" target="_blank">
      <div class="sdk-icon">⚡</div>
      <h3>ODS-E Docs</h3>
      <code class="sdk-install">opendataschema.energy</code>
      <p>Energy data schema</p>
    </a>
  </div>
</div>

<!-- E. Zorora App -->
<div class="sections-overview">
  <h2>Zorora App</h2>
  <p style="color: #4a4a4a; margin-bottom: 24px;">
    <strong>Zorora</strong> is Asoba's energy intelligence platform — a web app powered by the <a href="/nehanda-model">Nehanda v3</a> model for evidence-grounded deep research, market intelligence, and asset discovery across African energy markets.
  </p>
  <div class="section-cards">
    <div class="section-card">
      <h3>🔍 Deep Research</h3>
      <p>Cited research reports with inline sources, revenue projections, and credibility scoring</p>
      <a href="/zorora-app/deep-research" class="section-link">Learn More →</a>
    </div>
    <div class="section-card">
      <h3>🛰️ Discovery</h3>
      <p>Satellite-based geospatial map with 1,144 mineral deposits and 739 generation assets</p>
      <a href="/zorora-app/discovery" class="section-link">Learn More →</a>
    </div>
    <div class="section-card">
      <h3>⚖️ Regulatory</h3>
      <p>Track NERSA, ZERA, and FERC rulings across jurisdictions</p>
      <a href="/zorora-app/regulatory" class="section-link">Learn More →</a>
    </div>
    <div class="section-card">
      <h3>🌍 Global View</h3>
      <p>Live commodity pricing, treasury rates, and geo-tagged news by country</p>
      <a href="/zorora-app/global-view" class="section-link">Learn More →</a>
    </div>
    <div class="section-card">
      <h3>📊 Digest</h3>
      <p>Stage articles and datasets into synthesized market briefs</p>
      <a href="/zorora-app/digest" class="section-link">Learn More →</a>
    </div>
    <div class="section-card">
      <h3>🔔 Alerts</h3>
      <p>Monitor topics and sources with configurable alert rules</p>
      <a href="/zorora-app/alerts" class="section-link">Learn More →</a>
    </div>
    <div class="section-card">
      <h3>📋 Scouting</h3>
      <p>Kanban pipeline for tracking brownfield, greenfield, and BESS opportunities</p>
      <a href="/zorora-app/scouting" class="section-link">Learn More →</a>
    </div>
    <div class="section-card">
      <h3>⚙️ Settings</h3>
      <p>API keys, model configuration, and preferences</p>
      <a href="/zorora-app/settings" class="section-link">Learn More →</a>
    </div>
  </div>
  <p style="margin-top: 16px;">
    <a href="/zorora-app/overview">View all Zorora App documentation →</a>
  </p>
</div>

<!-- F. Community & Support -->
<div class="community-section">
  <h2>Community & Support</h2>
  <div class="community-links-grid">
    <a href="https://discord.gg/nNV5evcr" target="_blank" class="community-link-card">
      <div class="community-icon">💬</div>
      <h4>Discord</h4>
      <p>Join our community</p>
    </a>

    <a href="https://github.com/AsobaCloud" target="_blank" class="community-link-card">
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

© 2025 Asoba Corporation. All rights reserved.
