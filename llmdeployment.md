---
layout: default
title: Deploy EnergyAnalyst on AWS
permalink: /llmdeployment.html
---

# EnergyAnalyst-v0.1 — AWS deployment and simple chat UI

This guide shows how to deploy `asoba/EnergyAnalyst-v0.1` on AWS and wire up a minimal chat interface that inherits this documentation site's styling.

- Model: Mistral-7B-v0.3 (LoRA fine-tuned)
- License: Apache-2.0
- Best for: Energy policy and regulatory compliance analysis


## 1) Quick architecture

```mermaid
graph TB
    subgraph "Static Hosting"
        A["GitHub Pages<br/>Documentation Site"]
    end
    
    subgraph "AWS Infrastructure"
        B["API Gateway / ALB<br/>Load Balancer"]
        C["EC2 GPU Instance<br/>g5.xlarge"]
        D["TGI/vLLM Container<br/>Model Server"]
    end
    
    subgraph "Model Storage"
        E["Hugging Face Hub<br/>asoba/EnergyAnalyst-v0.1"]
    end
    
    A -->|HTTPS Request| B
    B -->|Private HTTPS| C
    C -->|Runs| D
    D -->|Downloads/Inference| E
```

- Keep this site static (GitHub Pages or S3). 
- Host the model server on an AWS GPU EC2 instance using a container runtime.
- Optionally front with an ALB or API Gateway + ACM TLS; enable CORS for the docs origin.

Tip — choose your front door:
- Lightweight (single EC2): run an on-instance Nginx reverse proxy for CORS and basic rate limiting. Fastest to set up. See "3.1 Quick path (≈15 min)".
- Managed: use ALB or API Gateway with ACM TLS and add AWS WAF/usage plans for rate limiting and bot mitigation. Best for production scale.


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

## 3.1) Quick path (≈15 min): Single EC2 with Nginx rate limiting

Goal: add a lightweight reverse proxy with basic rate limiting in front of TGI (adjust ports for vLLM).

1) Start the model server (from section 3, Option A):

```bash
docker run --gpus all --rm -p 8080:80 \
  -e HUGGING_FACE_HUB_TOKEN=$HF_TOKEN \
  ghcr.io/huggingface/text-generation-inference:2.0.4 \
  --model-id asoba/EnergyAnalyst-v0.1 \
  --num-shard 1 \
  --max-input-length 2048 \
  --max-total-tokens 3072
```

2) Create `nginx.conf`:

```nginx
worker_processes auto;
events { worker_connections 1024; }
http {
  limit_req_zone $binary_remote_addr zone=ip_rl:10m rate=30r/m;
  upstream tgi { server 127.0.0.1:8080; }

  server {
    listen 80;
    add_header Access-Control-Allow-Origin "https://asobacloud.github.io" always;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type, Authorization, x-api-key" always;

    location / {
      limit_req zone=ip_rl burst=10 nodelay;
      proxy_pass http://tgi;
    }

    error_page 429 = @limited;
    location @limited { return 429; }
  }
}
```

3) Run Nginx (host networking keeps it simple):

```bash
docker run -d --name gateway --network host \
  -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro \
  nginx:1.25-alpine
```

4) Point the chat UI (section 5) to the proxy by setting:
- `const API_BASE = 'http://<EC2_PUBLIC_IP>';`

5) For stronger protections (per-API-key limits, 429 UI handling), see section 10.


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


## 10) Lightweight rate limiting (client + server)

If you want a simple deployment that still protects against bots and abusive usage, add a tiny reverse proxy with rate limiting and a small client-side throttle. This avoids heavy infrastructure while providing practical safeguards.

### Server: Nginx reverse proxy with rate limiting

Run Nginx in front of TGI or vLLM and enforce limits per IP and per API key. Example using Docker Compose with TGI (adapt to vLLM by changing the upstream and port):

```yaml
# docker-compose.yml (example)
version: "3.8"
services:
  tgi:
    image: ghcr.io/huggingface/text-generation-inference:2.0.4
    command: [
      "--model-id","asoba/EnergyAnalyst-v0.1",
      "--num-shard","1",
      "--max-input-length","2048",
      "--max-total-tokens","3072"
    ]
    environment:
      - HUGGING_FACE_HUB_TOKEN=${HF_TOKEN}
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
    # Do not publish; reachable by service name from gateway

  gateway:
    image: nginx:1.25-alpine
    depends_on:
      - tgi
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
```

Create `nginx/nginx.conf` with sensible defaults, CORS for this docs site, and rate limiting:

```nginx
worker_processes auto;
events { worker_connections 1024; }
http {
  # Token-bucket per-IP and per-API-key
  limit_req_zone $binary_remote_addr zone=ip_rl:10m rate=30r/m;   # 30 requests/min per IP
  map $http_x_api_key $api_key { default "anon"; "~.+" $http_x_api_key; }
  limit_req_zone $api_key zone=key_rl:10m rate=60r/m;            # 60 requests/min per key
  limit_conn_zone $binary_remote_addr zone=addr_conn:10m;        # concurrent connection cap

  upstream tgi { server tgi:80; }

  server {
    listen 80;

    # CORS: allow only the docs site (adjust to your domain)
    set $allowed_origin "https://asobacloud.github.io";
    if ($request_method = 'OPTIONS') {
      add_header Access-Control-Allow-Origin $allowed_origin always;
      add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
      add_header Access-Control-Allow-Headers "Content-Type, Authorization, x-api-key" always;
      return 204;
    }
    add_header Access-Control-Allow-Origin $allowed_origin always;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type, Authorization, x-api-key" always;

    # Basic abuse controls
    client_max_body_size 128k;        # prompt size guard
    limit_conn addr_conn 5;           # concurrent connections per IP
    limit_req zone=ip_rl  burst=10 nodelay;
    limit_req zone=key_rl burst=20 nodelay;

    # Help clients back off when limited
    add_header Retry-After 15 always;

    location / {
      proxy_pass http://tgi;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_read_timeout 600s;
    }

    error_page 429 = @ratelimited;
    location @ratelimited {
      default_type application/json;
      return 429 '{"error":"rate_limited","message":"Too many requests. Please slow down."}';
    }
  }
}
```

Notes:
- For vLLM, set `upstream vllm { server vllm:8000; }` and `proxy_pass http://vllm;`.
- Containers in the same Compose file share a network; keep TGI unexposed and reference `tgi:80` from Nginx. If you need host access for debugging, temporarily add `ports: ["8080:80"]` to `tgi` but keep the upstream as `tgi:80`.
- To prefer API-key fairness, lower the per-IP rate and keep a higher per-key rate.
- Bind the public port only on the proxy and firewall direct access to the model.

Optional hardening:
- Put the proxy behind an AWS ALB or Cloudflare; both add DDoS/bot filtering with minimal setup.
- Add simple input caps: enforce `max_new_tokens` at the model server, keep `client_max_body_size` small.

### Client: throttle requests and handle 429

Add a small token-bucket throttle to the chat UI and surface server 429 responses. Insert the following into the earlier `chat.html` script (replace the existing `handleSend` with this, and add the limiter helper):

```html
<script>
  // Simple token bucket: 10 requests/min, refills continuously
  const rl = {
    capacity: 10,
    tokens: 10,
    refillMs: 6000, // 1 token every 6s
    last: Date.now()
  };
  function tryConsume() {
    const now = Date.now();
    const elapsed = now - rl.last;
    const refill = Math.floor(elapsed / rl.refillMs);
    if (refill > 0) {
      rl.tokens = Math.min(rl.capacity, rl.tokens + refill);
      rl.last = rl.last + refill * rl.refillMs;
    }
    if (rl.tokens <= 0) return false;
    rl.tokens -= 1;
    return true;
  }

  async function handleSend() {
    const q = input.value.trim();
    if (!q) return;
    if (!tryConsume()) {
      append('Info', 'You are sending messages too quickly. Please wait a few seconds.');
      return;
    }
    append('You', q);
    input.value = '';
    send.disabled = true;
    try {
      const a = await askTGI(q);
      append('EnergyAnalyst', a);
    } catch (e) {
      if (e?.message?.includes('429')) {
        append('Error', 'Rate limited by server. Please wait and try again.');
      } else {
        append('Error', 'Failed to reach model API');
      }
    } finally {
      send.disabled = false;
    }
  }

  // Intercept 429 on fetch
  async function askTGI(prompt) {
    const res = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inputs: `You are a regulatory compliance expert.\n\n### Instruction:\n${prompt}\n\n### Response:`,
        parameters: { max_new_tokens: 256, temperature: 0.7 }
      })
    });
    if (res.status === 429) throw new Error('429');
    if (!res.ok) throw new Error('Request failed');
    const data = await res.json();
    return (data.generated_text ?? data[0]?.generated_text ?? JSON.stringify(data));
  }
</script>
```

Optional bot friction (client-only, zero backend changes):
- Disable the Send button for 1–2 seconds after each request.
- Add a simple honeypot input (hidden field) and ignore submissions that fill it.
- If you can accept a managed service, add Cloudflare Turnstile to the page and only enable Send after a valid token is present. For robust verification, your proxy must validate the token server-side (requires a small verification endpoint or using Cloudflare in front of your origin).

This combination provides practical protection with minimal moving parts: a tiny Nginx container to enforce server-side fairness and a lightweight client throttle to improve UX and deter basic automation.