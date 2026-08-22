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
    Read the full research report: <a href="https://asoba.co/pub-nehanda-v3.html" target="_blank">Epistemic Fine-Tuning of Open-Weight LLMs for Deep Research</a>
  </p>
</div>

## Overview

Nehanda v3.1 is a fine-tuned **Qwen3.6-27B VL** model trained for **RAG synthesis** — the capability to read source documents and produce grounded responses without fabricating claims. It scores **88.7% on FACTS Grounding**, surpassing frontier models including Gemini 2.5 Pro (87.8%), Claude 3.5 Sonnet (83.8%), and GPT-4o (79.8%).

The result demonstrates that **epistemic behavior** — source fidelity, evidence boundary enforcement, refusal to fabricate — is a trainable capability that targeted fine-tuning installs more efficiently than scale alone. The model was trained with **1.15% of parameters** for approximately **$135 of GPU time** on a single NVIDIA L40S.

## Key Results

<div class="results-table-container">
<table class="results-table">
<thead>
<tr>
<th>Model</th>
<th>FACTS Grounding Score</th>
<th>Parameters</th>
<th>Access</th>
</tr>
</thead>
<tbody>
<tr class="nehanda-row">
<td><strong>Nehanda v3.1</strong></td>
<td class="score-highlight">88.7%</td>
<td>27B</td>
<td>Open Weight</td>
</tr>
<tr>
<td>Gemini 2.5 Pro</td>
<td>87.8%</td>
<td>Proprietary</td>
<td>Closed</td>
</tr>
<tr>
<td>Claude 3.5 Sonnet</td>
<td>83.8%</td>
<td>Proprietary</td>
<td>Closed</td>
</tr>
<tr>
<td>GPT-4o</td>
<td>79.8%</td>
<td>Proprietary</td>
<td>Closed</td>
</tr>
<tr>
<td>Gemma 3 27B</td>
<td>74.9%</td>
<td>27B</td>
<td>Open Weight</td>
</tr>
</tbody>
</table>
</div>

<blockquote>
  <p>Nehanda v3.1 outperforms Gemma 3 27B — the same-size open-weight model from Google — by 13.8 percentage points. The gap is attributable to the training pipeline, not the base model: both are 27B, both are open-weight, but only one has been fine-tuned for source fidelity.</p>
</blockquote>

## Training Pipeline

Nehanda v3 uses a **five-stage stacked QLoRA pipeline**. LoRA adapters (r=64, α=128, 7 target modules covering all attention and MLP projections) are initialized once and trained continuously across all stages. An eval gate follows each SFT stage — the pipeline halts if the model's epistemic behavior regresses.

| Stage | Purpose | Learning Rate |
|-------|---------|---------------|
| 1. Epistemic Foundation | Premise correction, evidence boundary enforcement | 2e-4 |
| 2. Evidence Hardening | Source citation, claim verification | 8e-5 |
| 3. RAG Synthesis | Multi-document synthesis with inline citation | 2e-5 |
| 4. Constitutional Alignment | Refusal to fabricate, calibration | 2e-5 |
| 5. Preference Optimization (DPO) | Preference tuning for grounded responses | 2.7e-7 |

The learning rate decays across stages because each stage builds on an increasingly fragile foundation — large updates late in the pipeline would disrupt the epistemic behavior installed earlier.

## Base Model

- **Architecture:** Qwen3.6-27B VL (native vision-language)
- **Context window:** 262,144 tokens
- **Vision:** Integrated vision encoder (training is text-only SFT/DPO, vision weights untouched)
- **Training data:** Energy regulatory documents, intelligence analysis reports, general-purpose synthesis tasks
- **Training cost:** ~$135 GPU time on a single NVIDIA L40S

## Prompt Schema

Nehanda v3 uses a persona-based prompt schema (SEP-020):

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
| `asoba/nehanda-rag-synthesis-27b-gguf` | Quantized q4_k_m GGUF | Local inference via llama.cpp or LM Studio |

## Trade-offs

Nehanda v3.1 sacrifices general capability for epistemic reliability. The model is **not** trained for creative writing, code generation, or open-ended chat. It is trained to read documents and say what they support.

For applications where source fidelity is the core capability — regulatory analysis, intelligence assessment, due diligence, academic research — the trade-off is favorable. For applications where general capability matters more, a frontier model is the better choice.

## Citation

```
Samudzi, S. (2026). Epistemic Fine-Tuning of Open-Weight LLMs for Deep Research:
Nehanda v3 and the FACTS Grounding Benchmark. Asoba Corporation Technical Report.
Model: asoba/nehanda-v3-27b.
```

<style>
.results-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1.5em 0;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  overflow: hidden;
}
.results-table th {
  background: #F4F4F4;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #4a4a4a;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #E0E0E0;
}
.results-table td {
  padding: 12px 16px;
  font-size: 0.95rem;
  border-bottom: 1px solid #E0E0E0;
}
.results-table tr:last-child td { border-bottom: none; }
.results-table .score-highlight { font-weight: 700; color: #455BF1; }
.results-table .nehanda-row { background: rgba(69, 91, 241, .08); }
blockquote {
  border-left: 3px solid #455BF1;
  margin: 1.5em 0;
  padding: 0.5em 1.5em;
  background: rgba(69, 91, 241, .04);
  border-radius: 0 8px 8px 0;
}
</style>
