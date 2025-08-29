---
layout: default
title: Deploy EnergyAnalyst on AWS
permalink: /llm-instructions.html
---

### EnergyAnalyst-v0.1 — AWS deployment and simple chat UI

This guide shows how to deploy `asoba/EnergyAnalyst-v0.1` on AWS and wire up a minimal chat interface that inherits this documentation site's styling.

- Model: Mistral-7B-v0.3 (LoRA fine-tuned)
- License: Apache-2.0
- Best for: Energy policy and regulatory compliance analysis


## 1) Quick architecture

```mermaid
flowchart LR
  A[Docs site (this repo)] -- HTTPS --> B[API Gateway/ALB]
  B -- private HTTPS --> C[TGI/vLLM container on EC2 GPU]
  C -->|Hugging Face Hub| D(HF model: asoba/EnergyAnalyst-v0.1)
```

- Keep this site static (GitHub Pages or S3). 
- Host the model server on an AWS GPU EC2 instance using a container runtime.
- Optionally front with an ALB or API Gateway + ACM TLS; enable CORS for the docs origin.


## 2) Recommended EC2 setup (simple and fast)

- Instance type: `g5.xlarge` (or `g4dn.xlarge`), 100–200 GB gp3
- AMI: Ubuntu 22.04 or AWS Deep Learning AMI (comes with NVIDIA drivers)
- Security group: open TCP 80 or 8080 from your office/VPN or the ALB only

SSH in and install Docker + NVIDIA toolkit (skip if using DLAMI with Docker+NVIDIA preconfigured):

```bash
# Docker
sudo apt-get update -y
sudo apt-get install -y docker.io
sudo usermod -aG docker $USER
sudo systemctl enable --now docker

# NVIDIA container runtime (for GPU access in Docker)
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \
  sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -fsSL https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
sudo apt-get update -y && sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker

# Login again so your user is in the docker group
exit
```

Log back in, set your Hugging Face token:

```bash
export HF_TOKEN=hf_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```


## 3) Start a text-generation server

Option A — Hugging Face Text Generation Inference (TGI):

```bash
docker run --gpus all --rm -p 8080:80 \
  -e HUGGING_FACE_HUB_TOKEN=$HF_TOKEN \
  ghcr.io/huggingface/text-generation-inference:2.0.4 \
  --model-id asoba/EnergyAnalyst-v0.1 \
  --num-shard 1 \
  --max-input-length 2048 \
  --max-total-tokens 3072
```

- API base: `http://<EC2_PUBLIC_IP>:8080`
- Health check: `GET /` returns JSON
- Inference: `POST /generate` (TGI) with JSON payload

Option B — vLLM (OpenAI-compatible server):

```bash
docker run --gpus all --rm -p 8000:8000 \
  -e HF_TOKEN=$HF_TOKEN \
  ghcr.io/vllm-project/vllm-openai:latest \
  --model asoba/EnergyAnalyst-v0.1 \
  --dtype bfloat16 \
  --max-model-len 3072
```

- API base: `http://<EC2_PUBLIC_IP>:8000/v1`
- Inference: `POST /v1/chat/completions`


## 4) Test the endpoint

TGI example:

```bash
curl -s http://<EC2_PUBLIC_IP>:8080/generate \
  -H 'Content-Type: application/json' \
  -d '{
    "inputs": "You are a regulatory compliance expert.\n\nInstruction: List key compliance requirements for utility-scale solar projects.",
    "parameters": {"max_new_tokens": 256, "temperature": 0.7}
  }'
```

vLLM example:

```bash
curl -s http://<EC2_PUBLIC_IP>:8000/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "asoba/EnergyAnalyst-v0.1",
    "messages": [
      {"role": "system", "content": "You are a regulatory compliance expert."},
      {"role": "user", "content": "List key compliance requirements for utility-scale solar projects."}
    ],
    "temperature": 0.7,
    "max_tokens": 256
  }'
```


## 5) Minimal chat UI (matches this site’s look)

Drop this HTML into a new page (e.g., `chat.html` in this repo), or embed the widget section inside any doc page. It inherits the site’s typography and spacing.

```html
<div class="chat-widget">
  <h2>EnergyAnalyst Chat</h2>
  <div id="chat-log" style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:12px;max-height:380px;overflow:auto"></div>
  <div style="display:flex;gap:8px;margin-top:10px">
    <input id="chat-input" type="text" placeholder="Ask about energy policy…" style="flex:1;padding:10px;border:1px solid #e2e8f0;border-radius:6px" />
    <button id="chat-send" style="background:#4551bf;color:#fff;border:none;border-radius:6px;padding:10px 14px;cursor:pointer">Send</button>
  </div>
  <small style="color:#64748b">Model: asoba/EnergyAnalyst-v0.1</small>
</div>
<script>
  const API_BASE = 'http://<EC2_PUBLIC_IP>:8080'; // TGI
  // For vLLM (OpenAI API), set API_BASE to 'http://<IP>:8000/v1' and adjust fetch below.

  async function askTGI(prompt) {
    const res = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inputs: `You are a regulatory compliance expert.\n\n### Instruction:\n${prompt}\n\n### Response:`,
        parameters: { max_new_tokens: 256, temperature: 0.7 }
      })
    });
    if (!res.ok) throw new Error('Request failed');
    const data = await res.json();
    // TGI returns either {generated_text: ...} or {generated_texts: [...]} depending on version
    return (data.generated_text ?? data[0]?.generated_text ?? JSON.stringify(data));
  }

  // UI wiring
  const log = document.getElementById('chat-log');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');

  function append(role, text) {
    const row = document.createElement('div');
    row.style.margin = '8px 0';
    row.innerHTML = `<strong style="color:${role==='You' ? '#1e293b' : '#4551bf'}">${role}:</strong> <span>${text.replace(/</g,'&lt;')}</span>`;
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  async function handleSend() {
    const q = input.value.trim();
    if (!q) return;
    append('You', q);
    input.value = '';
    try {
      const a = await askTGI(q);
      append('EnergyAnalyst', a);
    } catch (e) {
      append('Error', 'Failed to reach model API');
    }
  }

  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
</script>
```

Notes:
- If hosting the model behind an ALB or a different domain, enable CORS (e.g., via Nginx):

```nginx
add_header Access-Control-Allow-Origin "https://asobacloud.github.io" always;
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
```


## 6) Make it production-ready (optional)

- Put the container behind an ALB with an HTTPS listener (ACM certificate)
- Restrict inbound access (security group) to the ALB only
- Auto-restart the container with a `systemd` unit or use ECS/EKS for orchestration
- Add CloudWatch logs for the container


## 7) Local usage (reference)

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("asoba/EnergyAnalyst-v0.1")
tokenizer = AutoTokenizer.from_pretrained("asoba/EnergyAnalyst-v0.1")

prompt = (
  "You are a regulatory compliance expert.\n\n" 
  "### Instruction:\nWhat are the key compliance requirements for utility-scale solar projects?\n\n"
  "### Response:\n"
)

inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=256, temperature=0.7)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```


## 8) Instance sizing tips

- `g5.xlarge` (NVIDIA A10G, 24 GB) is sufficient for int8/FP16 single-shard serving
- Prefer `bfloat16` if supported; quantization (e.g., AWQ/GGUF) can reduce memory
- Increase `--max-total-tokens` cautiously to avoid OOM


## 9) Security

- Keep your HF token secret; use SSM Parameter Store or Secrets Manager
- Allow only your docs origin via CORS; use HTTPS end-to-end
- Rotate AMI and patch regularly; limit SSH access (e.g., SSM Session Manager)


That’s it—after step 3 you’ll have a live endpoint; add the chat widget to any page in this docs site to talk to EnergyAnalyst-v0.1.