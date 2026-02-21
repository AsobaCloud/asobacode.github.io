---
title: "Getting Started with Nehanda"
layout: default
nav_order: 7
parent: "Learn"
---

# Getting Started with Nehanda

Nehanda v1 is a specialized 7B parameter language model fine-tuned for intelligence assessment, signal detection, and global systems analysis. There are two ways to run it: **locally** using LM Studio or **in the cloud** using Hugging Face Inference Endpoints.

This guide walks you through both options, starting with getting access to the model.

## Prerequisites

- A [Hugging Face](https://huggingface.co) account
- **Whitelist access** to the Nehanda model (see Step 1)
- For local use: [LM Studio](https://lmstudio.ai) installed on your machine
- For cloud use: A Hugging Face account with billing enabled

## Step 1: Request Access {#request-access}

Nehanda v1 is a gated model. You need whitelist access before you can download or deploy it.

1. Visit the model page at [asoba/nehanda-v1-7b](https://huggingface.co/asoba/nehanda-v1-7b) on Hugging Face.
2. **[Request Whitelist Access](https://forms.gle/KJKTkzyYBtE5psNW7)** using the Google Form.
3. Once approved, you will be able to download the model weights or deploy to an inference endpoint.

<img src="{{ site.baseurl }}/assets/images/nehanda-hf-model-page.png" alt="Nehanda v1 model page on Hugging Face" class="screenshot">
<p class="screenshot-caption">The Nehanda v1 model page on Hugging Face — click Deploy > Inference Endpoints to deploy to the cloud</p>

---

## Option A: Run Locally with LM Studio {#local-lm-studio}

For local inference on your own hardware. This uses the **GGUF quantized version** of Nehanda (~4.4 GB), which runs on most machines with a modern GPU or Apple Silicon.

### Download the Model

1. Open LM Studio and go to **My Models**.
2. Search for `nehanda` in the search bar.
3. Select **asoba/nehanda-v1-7b-GGUF** from the results.
4. Download the **Q4_K_M** quantization (4.37 GB). This is the recommended quantization for the best balance of quality and performance.

<img src="{{ site.baseurl }}/assets/images/nehanda-lmstudio-download.png" alt="Nehanda GGUF model in LM Studio" class="screenshot">
<p class="screenshot-caption">The Nehanda v1 GGUF model in LM Studio — select Q4_K_M for the best quality/performance balance</p>

### Load the Model

1. Once downloaded, Nehanda will appear in your **My Models** list.

<img src="{{ site.baseurl }}/assets/images/nehanda-lmstudio-models.png" alt="Nehanda in LM Studio models list" class="screenshot">
<p class="screenshot-caption">Nehanda v1 appears in your local models list after download</p>

{:start="2"}
2. Click **Load Model** to configure and load it.
3. Set the recommended parameters:
   - **Context Length:** 4096 tokens
   - **GPU Offload:** 32 layers (full offload)
4. Estimated memory usage: **~5 GB GPU**.
5. Click **Load Model** to start.

<img src="{{ site.baseurl }}/assets/images/nehanda-lmstudio-load.png" alt="LM Studio load model dialog" class="screenshot">
<p class="screenshot-caption">Load model settings — 4096 context length and full GPU offload recommended</p>

### Start a Chat

Once loaded, click **Use in New Chat**. Use the following system prompt for intelligence analysis:

```
You are an intelligence assessment specialist. Your role is to analyze
provided documents for indicators of structural shifts, regulatory
capture, and network dependencies. Always cite specific evidence from
the provided context. State clearly when information is insufficient
to draw a conclusion.
```

**Example query:**

```
Analyze the following report for indicators of regulatory capture
and identify any entities with undisclosed financial dependencies.
```

---

## Option B: Deploy to HF Inference Endpoints {#cloud-hf-endpoints}

For production or team use. Runs on cloud GPUs with full API access, auto-scaling, and scale-to-zero billing.

### Create the Endpoint

1. Go to [Hugging Face Inference Endpoints](https://ui.endpoints.huggingface.co/).
2. Click **New Endpoint** and search for `nehanda`.
3. Select **asoba/nehanda-v1-7b** from the Hub Models results.

<img src="{{ site.baseurl }}/assets/images/nehanda-hf-endpoints-search.png" alt="Searching for Nehanda on HF Inference Endpoints" class="screenshot">
<p class="screenshot-caption">Search for "nehanda" and select asoba/nehanda-v1-7b from Hub Models</p>

### Configure Hardware

4. Select the following configuration:
   - **Cloud Provider:** Amazon Web Services
   - **GPU:** Nvidia L40S (1x GPU, 48 GB VRAM)
   - **Region:** us-east-1 (N. Virginia)
   - **Cost:** ~$1.80/hour per running replica
   - **Authentication:** Private (recommended)
5. Enable **Scale-to-zero** — the endpoint will automatically stop after 1 hour of inactivity, so you only pay while it's running.
6. Click **Create Endpoint**.

<img src="{{ site.baseurl }}/assets/images/nehanda-hf-create-endpoint.png" alt="Create Endpoint configuration" class="screenshot">
<p class="screenshot-caption">Recommended configuration: AWS, Nvidia L40S, Private authentication, scale-to-zero enabled</p>

### Wait for Initialization

7. The endpoint will take a few minutes to start. The status will show **Initializing** while the model weights are loaded.
8. Once the status changes to **Running**, copy the **Endpoint URL** — you will need it for API calls.

<img src="{{ site.baseurl }}/assets/images/nehanda-hf-endpoint-running.png" alt="Nehanda endpoint initializing" class="screenshot">
<p class="screenshot-caption">The endpoint initializing — once Running, copy the Endpoint URL for API calls</p>

### Make Your First API Call

Once the endpoint is running, you can send requests using cURL or Python.

**cURL:**

```bash
curl https://your-endpoint-url.endpoints.huggingface.cloud/v1/chat/completions \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "asoba/nehanda-v1-7b",
    "messages": [
      {
        "role": "system",
        "content": "You are an intelligence assessment specialist."
      },
      {
        "role": "user",
        "content": "Analyze the following for indicators of regulatory capture..."
      }
    ],
    "max_tokens": 2048,
    "temperature": 0.3
  }'
```

**Python (with `huggingface_hub`):**

```python
from huggingface_hub import InferenceClient

client = InferenceClient(
    model="https://your-endpoint-url.endpoints.huggingface.cloud",
    token="hf_your_token_here",
)

response = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You are an intelligence assessment specialist.",
        },
        {
            "role": "user",
            "content": "Analyze the following for indicators of regulatory capture...",
        },
    ],
    max_tokens=2048,
    temperature=0.3,
)

print(response.choices[0].message.content)
```

Replace `your-endpoint-url` with the Endpoint URL from the dashboard, and `hf_your_token_here` with your [Hugging Face API token](https://huggingface.co/settings/tokens).

---

## Next Steps {#next-steps}

- **[Nehanda v1](/guides/nehanda-v1)** — Deep dive into capabilities, training architecture, and integration with Zorora
- **[Research Workflow](/guides/research-workflow)** — Use Nehanda as the synthesis engine in Zorora's deep research pipeline
- **[Configuration](/guides/configuration)** — Configure Zorora to use your local or cloud Nehanda endpoint
