---
title: "Nehanda v1"
layout: default
nav_order: 10
parent: Guides
---

# Nehanda v1

**Nehanda v1** is a specialized 7B parameter language model fine-tuned for **intelligence assessment**, **signal detection**, and **global systems analysis**.

Built on the Mistral-7B architecture, Nehanda departs from standard "chat" behaviors to focus on **forensic analysis**. It is designed to trace multi-hop citations, detect operator signatures in noisy datasets, and provide evidence-based assessments of geopolitical and financial networks.

Named after the ancestral spirit of resistance and prophecy, Nehanda is built to *see through* hegemonic narratives and expose the structural realities beneath complex data.

## Purpose & Capabilities

Unlike general-purpose LLMs optimized for fluency, Nehanda is optimized for **provenance** and **structure**. It is trained to reject fabrication and explicitly state when information is unknown.

### Core Functions

* **Signal Detection:** Distinguishes between "noise" (routine market/political events) and "signal" (pre-cursor indicators of structural shifts).
* **Systems Analysis:** Trained on a 10GB corpus of regulatory, financial, and ideological texts—including the Panama Papers, FERC orders, and NRx philosophy—to understand how power and capital flow through obscured networks.
* **Citation Tracing:** capable of following logic chains across multiple sources (e.g., *Source A cites Report B, which is funded by Entity C*).
* **Anti-Fabrication:** Uses a "Stacked" training architecture that enforces strict adherence to provided context, reducing hallucination in high-stakes analysis.

## Integration with Zorora

Nehanda v1 is the default synthesis engine for the **[Zorora](https://github.com/AsobaCloud/zorora)** intelligence platform.

When operating within Zorora, Nehanda drives the synthesis layer for the `/search` and `/research` commands. It does not just summarize search results; it acts as an analyst that:

1. **Ingests** the raw context curated by Zorora's search tools.
2. **Triages** the information based on credibility and relevance.
3. **Synthesizes** a final answer that highlights **information gaps**, **conflicting accounts**, and **consensus points**.

### Example Workflow

When a user runs a `/research` query in Zorora:

> *"Map the financial dependencies between the new energy consortium in Malta and verified state-owned entities."*

Zorora retrieves the raw documents, and Nehanda performs the analysis—flagging specific shell company structures or regulatory anomalies that match patterns learned during its "Systems Analysis" training phase.

## Model Details

* **Architecture:** Mistral-7B-v0.3 (LoRA Fine-Tune)
* **Training Stack:**
1. **Foundation:** Generic Instruction Following + Strict Logic/Reasoning (Math-hardened).
2. **Systems Knowledge:** 10GB Contextual Ingestion (Energy Policy, Imperialism, Illicit Finance).
3. **Signal Persona:** Specialized Q&A training for Intelligence Assessment.


* **Context Window:** 4096 tokens (optimized for RAG workflows).

### Download & Usage

The model weights are available for internal deployment via Hugging Face. **Whitelist access is required.**

**[Request Whitelist Access](https://forms.gle/KJKTkzyYBtE5psNW7)** | **[Download Nehanda v1 (Hugging Face)](https://huggingface.co/asoba/nehanda-v1-7b)**

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "asoba/nehanda-v1-7b"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, load_in_4bit=True)

# Example Intelligence Prompt
prompt = """You are an intelligence assessment specialist.
### Instruction:
Analyze the provided cable for indicators of regulatory capture.
...
"""

```
