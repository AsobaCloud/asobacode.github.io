---
title: "Nehanda Model"
layout: default
---

<div class="page-header">
  <h1>Nehanda Research Assistant</h1>
  <div class="version-badge">
    <span class="version-label">Version</span>
    <span class="version-value">v3.1 (27B)</span>
    <span class="version-separator">|</span>
    <span class="version-label">License</span>
    <span class="version-value">Open Weight</span>
  </div>
</div>

<div class="quick-start-section">
  <a href="https://huggingface.co/asoba/nehanda-v3-27b" class="quick-start-button" target="_blank">
    View on HuggingFace
  </a>
  <a href="https://huggingface.co/asoba/nehanda-rag-synthesis-27b-gguf" class="quick-start-button" style="margin-top: 12px; display: inline-block; font-size: 0.95em;" target="_blank">
    Download Quantized GGUF
  </a>
  <p class="quick-start-subtext">
    Read the full research report: <a href="pub-nehanda-v3.html" target="_blank">Epistemic Fine-Tuning of Open-Weight LLMs for Deep Research</a>
  </p>
</div>

## Overview

Nehanda v3.1 is a fine-tuned **Qwen3.6-27B VL** model trained for **RAG synthesis** — the capability to read source documents and produce grounded responses without fabricating claims. Evaluated on the public FACTS Grounding benchmark under a 3-judge majority vote protocol across three distinct model families (`Gemini 3.7 Flash`, `GPT-OSS 120B`, and `glm-5-turbo`), it achieves **82.21% factuality**, outperforming GPT-4o (80.00%) and Gemma 3 27B (74.90%).

The result demonstrates that **epistemic behavior** — source fidelity, evidence boundary enforcement, refusal to fabricate — is a trainable capability that targeted fine-tuning installs more efficiently than scale alone. The model was trained with **1.15% of parameters** for approximately **$135 of GPU time** on a single NVIDIA L40S.

## Key Results

<div class="results-table-container">
<table class="results-table">
<thead>
<tr>
<th>Model</th>
<th>FACTS Grounding Score</th>
<th>Parameters</th>
<th>Evaluation Protocol</th>
</tr>
</thead>
<tbody>
<tr>
<td>Gemini 2.5 Pro Preview</td>
<td>87.80%</td>
<td>Proprietary</td>
<td>Kaggle leaderboard</td>
</tr>
<tr>
<td>Gemini 2.5 Flash</td>
<td>85.30%</td>
<td>Proprietary</td>
<td>Kaggle leaderboard</td>
</tr>
<tr>
<td>Claude 3.5 Sonnet</td>
<td>83.80%</td>
<td>Proprietary</td>
<td>Paper (Jacovi et al.)</td>
</tr>
<tr class="nehanda-row">
<td><strong>Nehanda v3.1</strong></td>
<td class="score-highlight">82.21%</td>
<td>27B</td>
<td>3-judge majority vote (Gemini 3.7, GPT-OSS 120B, GLM-5)</td>
</tr>
<tr>
<td>GPT-4o</td>
<td>80.00%</td>
<td>Proprietary</td>
<td>Paper (Jacovi et al.)</td>
</tr>
<tr>
<td>Gemma 3 27B</td>
<td>74.90%</td>
<td>27B</td>
<td>Kaggle leaderboard</td>
</tr>
</tbody>
</table>
</div>

> Nehanda v3.1 outperforms Gemma 3 27B — the same-size open-weight model from Google — by 7.31 percentage points. The gap is attributable to the training pipeline, not the base model: both are 27B, both are open-weight, but only Nehanda has been fine-tuned for source fidelity.

## Training Pipeline

Nehanda v3.1 uses a **five-stage stacked QLoRA pipeline**. LoRA adapters are trained across all stages to build epistemic discipline while preserving core base capability.

| Stage | Purpose | Learning Rate | Sequence Length |
|-------|---------|---------------|-----------------|
| 1. Epistemic Foundation | Core calibration: refusal when unanswerable, uncertainty expression | 2e-4 | 2048 |
| 2. Evidence Hardening | Strict source-boundary enforcement, claim verification | 5e-5 | 2048 |
| 3. RAG Synthesis | Multi-document synthesis with inline citation & conflict preservation | 2e-5 | 4096 |
| 4. Constitutional Alignment | Preference optimization pairing grounded vs fabricated responses | 5e-6 | 2048 |
| 5. Epistemic DPO | Advanced preference tuning contrasting evidence-based vs sycophantic reasoning | 5e-6 | 2048 |

The learning rate decays across stages because each stage builds on an increasingly structured foundation — large updates late in the pipeline would disrupt the epistemic behavior installed earlier.

## Base Model

- **Architecture:** Qwen3.6-27B VL (native vision-language)
- **Context window:** 262,144 tokens
- **Vision:** Integrated vision encoder (training is text-only SFT/DPO, vision weights untouched)
- **Training data:** Energy regulatory documents, intelligence analysis reports, general-purpose synthesis tasks
- **Training cost:** ~$135 GPU time on a single NVIDIA L40S

## Prompt Schema

Nehanda v3.1 uses a persona-based prompt schema (SEP-020):

```
{persona}

### Task:
{input}

### Response:
```

## Model Variants

| Variant | Format | Use Case |
|---------|--------|----------|
| `asoba/nehanda-v3-27b` | Full weights (HuggingFace) | Full-precision inference, further fine-tuning |
| `asoba/nehanda-rag-synthesis-27b-gguf` | Quantized GGUF | Local inference via llama.cpp or LM Studio |

## Trade-offs

Nehanda v3.1 sacrifices general capability for epistemic reliability. The model is **not** trained for creative writing, code generation, or open-ended chat. It is trained to read documents and say what they support.

For applications where source fidelity is the core capability — regulatory analysis, intelligence assessment, due diligence, academic research — the trade-off is favorable. For applications where general capability matters more, a frontier model is the better choice.

## Citation

```
Samudzi, S. (2026). Epistemic Fine-Tuning of Open-Weight LLMs for Deep Research:
Nehanda v3.1 and the FACTS Grounding Benchmark. Asoba Corporation Technical Report.
Model: asoba/nehanda-v3-27b.
```

<style>
:root {
  --primary-black: #000000;
  --sovereign-black: #0A0A0A;
  --primary-indigo: #4551BF;
  --accent-blue: #455BF1;
  --deep-indigo: #2A3390;
  --surface-navy: #2E378C;
  --lilac-border: #C7CCF2;
  --border-blue: #5C67DE;
  --accent-purple: #7B86EE;
  --accent-muted: #8892E0;
  --pale-surface: #F4F5FC;
}

.results-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1.5em 0;
  border: 1px solid var(--border-grey, #E0E0E0);
  border-radius: 8px;
  overflow: hidden;
  font-family: 'DM Sans', system-ui, sans-serif;
}
.results-table th {
  background: var(--neutral-grey, #F4F4F4);
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #4a4a4a;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border-grey, #E0E0E0);
}
.results-table td {
  padding: 12px 16px;
  font-size: 0.95rem;
  border-bottom: 1px solid var(--border-grey, #E0E0E0);
  color: var(--ink, #1a1a1a);
}
.results-table tr:last-child td { border-bottom: none; }
.results-table .score-highlight { font-weight: 700; color: var(--accent-blue, #455BF1); }
.results-table .nehanda-row { background: rgba(69, 91, 241, .08); }
blockquote {
  border-left: 3px solid var(--accent-blue, #455BF1);
  margin: 1.5em 0;
  padding: 0.8em 1.5em;
  background: rgba(69, 91, 241, .04);
  border-radius: 0 8px 8px 0;
  font-family: 'DM Sans', system-ui, sans-serif;
}
</style>