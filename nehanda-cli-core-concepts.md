---
title: "Core Concepts"
layout: default
parent: "Nehanda CLI"
nav_order: 1.5
---

# Core Concepts

Nehanda CLI is built around three foundational architectural principles that set it apart from conventional AI coding assistants. Rather than treating a large language model as an omniscient chatbot and cramming ever-larger prompts into its context window, Nehanda CLI treats the model as one component within a structured cognitive system.

Understanding these three ideas explains why Nehanda CLI is faster, consumes fewer tokens, and reliably finishes complex software tasks where standard agent loops break down.

---

## 1. Dual-Process Cognitive Architecture: System 1 and System 2

Human cognition does not solve every problem with slow, deliberate contemplation. In his landmark research, psychologist Daniel Kahneman described two distinct modes of human thought:

* **System 1:** Fast, instinctive, and automatic thinking. When you swerve to avoid an obstacle or instantly read a billboard, your brain operates via rapid reflex without conscious deliberation.
* **System 2:** Slow, deliberate, and analytical thinking. When you solve a calculus equation, write a complex algorithm, or draft a legal contract, your brain engages effortful reasoning.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 520" width="100%" height="auto">
  <!-- Main Canvas Container -->
  <rect width="960" height="520" rx="16" fill="#4551BF"/>

  <!-- Header Block -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">NEHANDA CLI — DUAL-PROCESS COGNITIVE ARCHITECTURE</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">Fast Non-Autoregressive Sidecar (System 1: Laya) &amp; Deliberate Generative Reasoning (System 2)</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- CARD 1: USER REQUEST -->
  <g transform="translate(100, 74)">
    <rect width="760" height="56" rx="12" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="56" rx="3" fill="#7B86EE"/>
    <rect x="16" y="18" width="94" height="20" rx="4" fill="#7B86EE"/>
    <text x="63" y="32" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">USER REQUEST</text>
    <text x="122" y="32" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Task Submission / Interactive REPL Command</text>
    <text x="440" y="32" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Raw developer prompt or automated pipeline trigger entering the turn loop</text>
    <rect x="620" y="17" width="126" height="22" rx="11" fill="#1F1F1F" stroke="#444444" stroke-width="1"/>
    <text x="683" y="31" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">bin/nehanda-ui.mjs</text>
  </g>

  <!-- Connector 1->2 -->
  <line x1="480" y1="130" x2="480" y2="158" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,158 475,150 485,150" fill="#8892E0"/>
  <rect x="370" y="137" width="220" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="151" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">RAW INPUT EVALUATION (~0ms)</text>

  <!-- CARD 2: SYSTEM 1 (LAYA) -->
  <g transform="translate(40, 160)">
    <rect width="880" height="136" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="136" rx="3" fill="#455BF1"/>
    <rect x="16" y="14" width="80" height="20" rx="4" fill="#455BF1"/>
    <text x="56" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">SYSTEM 1</text>
    <text x="108" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">Laya (421M Non-Autoregressive Decision Engine)</text>
    <text x="440" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Warm in-process sidecar · Single forward pass (~48ms reflex) · Zero hallucinations</text>
    <rect x="740" y="12" width="124" height="20" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="802" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">lib/laya.mjs</text>
    <line x1="16" y1="42" x2="864" y2="42" stroke="#5C67DE" stroke-opacity="0.4" stroke-width="1"/>

    <!-- 6 Capability Blocks (3 columns x 2 rows) -->
    <!-- Row 1 -->
    <rect x="16" y="50" width="270" height="34" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="26" y="64" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Intent Classification</text>
    <text x="26" y="77" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Routes requests to SDLC workflow phases</text>

    <rect x="302" y="50" width="270" height="34" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="312" y="64" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Bashguard Risk Screening</text>
    <text x="312" y="77" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">85%+ confidence safety bypass in &lt;10ms</text>

    <rect x="588" y="50" width="276" height="34" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="598" y="64" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Memory Graph Edge Typing</text>
    <text x="598" y="77" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Causal, semantic, temporal &amp; entity links</text>

    <!-- Row 2 -->
    <rect x="16" y="90" width="270" height="34" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="26" y="104" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Compaction Transcript Pruning</text>
    <text x="26" y="117" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Preserves invariants while discarding noise</text>

    <rect x="302" y="90" width="270" height="34" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="312" y="104" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Evidence Candidate Scorer</text>
    <text x="312" y="117" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Scores graph nodes for adaptive beam retrieval</text>

    <rect x="588" y="90" width="276" height="34" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="598" y="104" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Zero Hallucination Guardrails</text>
    <text x="598" y="117" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Typed mathematical probability noul (0.0-1.0)</text>
  </g>

  <!-- Connectors 2->3 (Dual streams) -->
  <!-- Left stream: Safe Decisions -->
  <line x1="260" y1="296" x2="260" y2="340" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="260,340 255,332 265,332" fill="#8892E0"/>
  <rect x="150" y="310" width="220" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="260" y="324" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">SAFE DECISIONS &amp; ROUTING</text>

  <!-- Right stream: Relevant Evidence -->
  <line x1="700" y1="296" x2="700" y2="340" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="700,340 695,332 705,332" fill="#8892E0"/>
  <rect x="585" y="310" width="230" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="700" y="324" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">RELEVANT EVIDENCE &amp; CONSTRAINTS</text>

  <!-- CARD 3: SYSTEM 2 (GENERATIVE LLM) -->
  <g transform="translate(40, 342)">
    <rect width="880" height="146" rx="12" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="146" rx="3" fill="#7B86EE"/>
    <rect x="16" y="14" width="80" height="20" rx="4" fill="#7B86EE"/>
    <text x="56" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">SYSTEM 2</text>
    <text x="108" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">Generative LLM (Deliberate Reasoning Engine)</text>
    <text x="440" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Qwen 2.5 27B / Nehanda v3.1 / Claude 3.5 / GPT-4o · Strict bounded synthesis</text>
    <rect x="740" y="12" width="124" height="20" rx="10" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="802" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">lib/orchestrate.mjs</text>
    <line x1="16" y1="42" x2="864" y2="42" stroke="#7B86EE" stroke-opacity="0.4" stroke-width="1"/>

    <!-- 4 Capability Blocks (2 columns x 2 rows) -->
    <!-- Row 1 -->
    <rect x="16" y="50" width="418" height="40" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="26" y="67" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• Architectural Diagnosis &amp; Root Cause Analysis</text>
    <text x="26" y="82" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Diagnose complex failure modes without wasting tokens on basic classification</text>

    <rect x="446" y="50" width="418" height="40" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="456" y="67" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• Behavioral Test Authoring (TDD Gate)</text>
    <text x="456" y="82" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Craft deterministic reproduction suites that physically verify defects</text>

    <!-- Row 2 -->
    <rect x="16" y="96" width="418" height="40" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="26" y="113" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• Code Implementation &amp; Surgical Patching</text>
    <text x="26" y="128" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Mutate production files only after test runner verifies genuine reproduction</text>

    <rect x="446" y="96" width="418" height="40" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="456" y="113" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• Detailed Plan Synthesis &amp; Spec Alignment</text>
    <text x="456" y="128" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Synthesize verifiable implementation specs against pinned domain invariants</text>
  </g>
</svg>

### The Flaw of Single-Model Agents

Most AI agent tools force a single generative model to perform both roles simultaneously. A massive frontier model is asked to decide what tool to pick, classify simple user intent, verify bash commands, evaluate memory relevance, and generate production code. 

This creates severe operational problems:
1. **Extreme Latency:** Generative models produce output token-by-token. Asking an LLM a simple yes-or-no question or routing classification takes seconds of expensive text streaming.
2. **Hallucinated Control Decisions:** Generative models are probabilistic word predictors. When asked to evaluate security permissions or filter tool results, they frequently rationalize bad decisions or hallucinate compliance.

### How Nehanda CLI Divides Cognition

Nehanda CLI introduces a strict separation between reflexive control decisions and analytical synthesis:

* **System 1 (Laya):** Powered by Laya, a dedicated 421-million-parameter non-autoregressive neural network running in a warm local sidecar process. Laya does not generate conversational prose. Instead, it processes queries in a single forward pass, answering typed mathematical probability questions (`noul` values from 0.0 to 1.0) and categorical choices in roughly 48 milliseconds.
* **System 2 (Generative LLM):** The generative coding model (such as Nehanda v3.1 27B, Claude 3.5 Sonnet, or GPT-4o). System 2 never wastes tokens classifying intent or checking simple rules. It focuses exclusively on analytical tasks: diagnosing root causes, writing behavioral test suites, formulating plans, and writing code.

### Where System 1 Protects the Workflow

1. **User Intent Shaping:** When you enter a prompt, Laya instantly classifies the request into engineering categories (`lib/laya.mjs`), framing the exact context template before System 2 even wakes up.
2. **Bashguard Safety Screening:** When a shell command presents moderate security risk, Laya evaluates whether the arguments conform to legitimate development patterns (`lib/tools.mjs`). If confidence exceeds 85%, the command executes immediately without interrupting the user.
3. **Memory Graph Construction:** As observations arrive from the terminal and file system, Laya classifies their relationships into causal, semantic, or temporal edges without running a slow prompt.
4. **Context Pruning:** During long sessions, Laya scores transcript entries, discarding redundant compiler outputs while preserving vital error messages.

By handling the reflexes through System 1, Nehanda CLI eliminates hundreds of unnecessary API round-trips and keeps System 2 focused entirely on code.

---

## 2. Why Jev-Mem: The Jevons Paradox of Context Windows

In 1865, English economist William Stanley Jevons made an unexpected observation: when the James Watt steam engine dramatically improved coal efficiency, overall coal consumption did not drop. Instead, cheaper and more efficient power caused industries to invent countless new uses for steam, causing total coal consumption to skyrocket.

This principle—that increased resource efficiency triggers exponentially greater consumption—is known as **Jevons Paradox**.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 400" width="100%" height="auto">
  <!-- Main Canvas Container -->
  <rect width="960" height="400" rx="16" fill="#4551BF"/>

  <!-- Header Block -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">THE JEVONS TRAP IN AI CONTEXT WINDOWS</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">How massive token capacity paradoxically triggers attention collapse, quadratic latency, and reasoning failure</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- NODE 1: TOP-LEFT (STEP 1) -->
  <g transform="translate(36, 80)">
    <rect width="390" height="112" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="112" rx="3" fill="#455BF1"/>
    <rect x="16" y="14" width="124" height="20" rx="4" fill="#455BF1"/>
    <text x="78" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">STEP 1 · EFFICIENCY</text>
    <text x="150" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">Bigger Context Windows</text>
    <text x="16" y="58" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Frontier models expand context from 128K to 1M+ tokens.</text>
    <text x="16" y="76" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Context appears infinite, cheap, and practically unlimited.</text>
    <text x="16" y="96" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#8892E0">Trigger: Teams stop curating or pruning input history</text>
  </g>

  <!-- CONNECTOR TOP: 1 -> 2 -->
  <line x1="426" y1="136" x2="534" y2="136" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="534,136 526,131 526,141" fill="#8892E0"/>
  <rect x="430" y="126" width="104" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="482" y="140" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">DUMP REPO</text>

  <!-- NODE 2: TOP-RIGHT (STEP 2) -->
  <g transform="translate(534, 80)">
    <rect width="390" height="112" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="112" rx="3" fill="#5C67DE"/>
    <rect x="16" y="14" width="134" height="20" rx="4" fill="#5C67DE"/>
    <text x="83" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">STEP 2 · PROMPT BLOAT</text>
    <text x="160" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">Developers Dump Entire Repos</text>
    <text x="16" y="58" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Multi-file trees, full git diffs, build logs, and multi-hour chat</text>
    <text x="16" y="76" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">histories are resent unpruned on every single turn.</text>
    <text x="16" y="96" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#8892E0">Result: Prompts swell to hundreds of thousands of tokens</text>
  </g>

  <!-- CONNECTOR RIGHT: 2 -> 3 -->
  <line x1="729" y1="192" x2="729" y2="248" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="729,248 724,240 734,240" fill="#8892E0"/>
  <rect x="639" y="210" width="180" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="729" y="224" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">QUADRATIC ATTENTION</text>

  <!-- NODE 3: BOTTOM-RIGHT (STEP 3) -->
  <g transform="translate(534, 250)">
    <rect width="390" height="116" rx="12" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="116" rx="3" fill="#7B86EE"/>
    <rect x="16" y="14" width="144" height="20" rx="4" fill="#7B86EE"/>
    <text x="88" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">STEP 3 · ATTENTION LOSS</text>
    <text x="170" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">Attention Dilution ("Lost in Middle")</text>
    <text x="16" y="58" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Transformer attention density drops sharply over long sequences.</text>
    <text x="16" y="76" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Critical domain invariants &amp; constraints get buried and ignored.</text>
    <text x="16" y="96" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#8892E0">Latency: Time-to-first-token (TTFT) grows quadratically</text>
  </g>

  <!-- CONNECTOR BOTTOM: 3 -> 4 -->
  <line x1="534" y1="308" x2="426" y2="308" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="426,308 434,303 434,313" fill="#8892E0"/>
  <rect x="430" y="298" width="104" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="482" y="312" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">AGENT DRIFT</text>

  <!-- NODE 4: BOTTOM-LEFT (STEP 4 / THE TRAP) -->
  <g transform="translate(36, 250)">
    <rect width="390" height="116" rx="12" fill="#C85A5A" stroke="#E07A7A" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="116" rx="3" fill="#FFFFFF"/>
    <rect x="16" y="14" width="124" height="20" rx="4" fill="#FFFFFF"/>
    <text x="78" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#C85A5A" letter-spacing="0.8">THE JEVONS TRAP</text>
    <text x="150" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">Catastrophic Reasoning Decay</text>
    <text x="16" y="58" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#FFC1C1">Multi-minute TTFT latencies destroy interactive developer flow.</text>
    <text x="16" y="76" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#FFC1C1">Models produce ghost refactors, loop endlessly, and hallucinate.</text>
    <text x="16" y="96" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF">Trap: Frustrated devs dump even more context to "remind" it</text>
  </g>

  <!-- CONNECTOR LEFT: 4 -> 1 (Closing the loop) -->
  <line x1="231" y1="250" x2="231" y2="192" stroke="#E07A7A" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="231,192 226,200 236,200" fill="#E07A7A"/>
  <rect x="136" y="210" width="190" height="20" rx="10" fill="#0A0A0A" stroke="#E07A7A" stroke-width="1"/>
  <text x="231" y="224" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFC1C1" letter-spacing="0.5">VICIOUS CYCLE COMPOUNDS</text>
</svg>

### The Modern Jevons Trap in AI

Modern large language models boast massive context windows, spanning from 128,000 tokens to over one million tokens. On the surface, this sounds like a total solution for memory. Developers often assume they can solve context by simply dumping whole codebases, complete error traces, and multi-hour chat histories into every prompt.

In practice, this triggers the Jevons trap:

* **Attention Dilution ("Lost in the Middle"):** While transformer attention can technically ingest 200,000 tokens, retrieval accuracy drops sharply in the middle of long prompts. Models lose track of key constraints, forget earlier discoveries, and become confused by contradictory historical logs.
* **Quadratic Attention Latency:** Processing massive prompts dramatically increases time-to-first-token (TTFT). Developers spend minutes waiting for a model to read its own bloated prompt.
* **Economic and Computational Waste:** Resending megabytes of repeated project history on every turn wastes enormous computational energy and financial cost.

### The Jev-Mem Solution: Multi-Relational Memory

Nehanda CLI rejects raw context dumping. Instead, it implements **Jev-Mem**—an episodic memory plane backed by SQLite and powered by System 1.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 500" width="100%" height="auto">
  <!-- Main Canvas Container -->
  <rect width="960" height="500" rx="16" fill="#4551BF"/>

  <!-- Header Block -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">NEHANDA CLI — JEV-MEM ARCHITECTURE</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">SQLite Multi-Relational Episodic Memory Plane (~/.config/nehanda/ona-session.db) &amp; Adaptive Beam Search</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- SECTION 1: SQLITE STORAGE PLANE -->
  <g transform="translate(32, 74)">
    <rect width="896" height="136" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="136" rx="3" fill="#455BF1"/>
    <rect x="16" y="14" width="112" height="20" rx="4" fill="#455BF1"/>
    <text x="72" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">STORAGE PLANE</text>
    <text x="140" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">SQLite Database (~/.config/nehanda/ona-session.db)</text>
    <text x="510" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">In-process ACID store via better-sqlite3 · Zero network overhead</text>
    <rect x="744" y="12" width="124" height="20" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="806" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">lib/jev.mjs</text>

    <!-- 4 Inner Database Table Cards -->
    <g transform="translate(16, 44)">
      <!-- memories -->
      <rect width="200" height="78" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
      <rect x="10" y="10" width="76" height="18" rx="4" fill="#455BF1"/>
      <text x="48" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">NODES</text>
      <text x="94" y="23" font-family="'Courier New', monospace" font-size="12" font-weight="700" fill="#FFFFFF">memories</text>
      <text x="10" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Observation Store</text>
      <text x="10" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Indexed with FTS5 search</text>

      <!-- memory_edges -->
      <g transform="translate(214, 0)">
        <rect width="206" height="78" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
        <rect x="10" y="10" width="76" height="18" rx="4" fill="#5C67DE"/>
        <text x="48" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">GRAPH</text>
        <text x="94" y="23" font-family="'Courier New', monospace" font-size="12" font-weight="700" fill="#FFFFFF">memory_edges</text>
        <text x="10" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Multi-Relational Links</text>
        <text x="10" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Semantic, temporal, causal, entity</text>
      </g>

      <!-- laya_jev_state -->
      <g transform="translate(434, 0)">
        <rect width="206" height="78" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
        <rect x="10" y="10" width="76" height="18" rx="4" fill="#7B86EE"/>
        <text x="48" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">STATE</text>
        <text x="94" y="23" font-family="'Courier New', monospace" font-size="12" font-weight="700" fill="#FFFFFF">laya_jev_state</text>
        <text x="10" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Canonical Summary</text>
        <text x="10" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">System-1 state vector block</text>
      </g>

      <!-- pinned_context -->
      <g transform="translate(654, 0)">
        <rect width="210" height="78" rx="8" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
        <rect x="10" y="10" width="76" height="18" rx="4" fill="#0A0A0A"/>
        <text x="48" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">LOCKED</text>
        <text x="94" y="23" font-family="'Courier New', monospace" font-size="12" font-weight="700" fill="#FFFFFF">pinned_context</text>
        <text x="10" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Domain Invariants</text>
        <text x="10" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Bypasses all compaction</text>
      </g>
    </g>
  </g>

  <!-- Connector 1->2 -->
  <line x1="480" y1="210" x2="480" y2="240" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,240 475,232 485,232" fill="#8892E0"/>
  <rect x="360" y="218" width="240" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="232" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">BEAM EVALUATION QUERY</text>

  <!-- SECTION 2: ADAPTIVE BEAM RETRIEVAL -->
  <g transform="translate(32, 242)">
    <rect width="896" height="122" rx="12" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="122" rx="3" fill="#7B86EE"/>
    <rect x="16" y="14" width="112" height="20" rx="4" fill="#7B86EE"/>
    <text x="72" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">BEAM SEARCH</text>
    <text x="140" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">Adaptive Beam Retrieval (lib/jev_read.mjs · BEAM_W = 4)</text>
    <text x="530" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">System 1 scores graph topology against user query in &lt;48ms</text>
    <rect x="744" y="12" width="124" height="20" rx="10" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="806" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">BEAM_W = 4</text>

    <!-- 3 Pipeline Step Cards -->
    <g transform="translate(16, 44)">
      <!-- Step 1 -->
      <rect width="276" height="64" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
      <rect x="10" y="10" width="70" height="16" rx="4" fill="#3B4CCA"/>
      <text x="45" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF">PHASE 1</text>
      <text x="90" y="23" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">4 Graph Views Projected</text>
      <text x="10" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Query evaluated across semantic,</text>
      <text x="10" y="56" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">temporal, causal, and entity subgraphs</text>

      <!-- Step 2 -->
      <g transform="translate(290, 0)">
        <rect width="276" height="64" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
        <rect x="10" y="10" width="70" height="16" rx="4" fill="#455BF1"/>
        <text x="45" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF">PHASE 2</text>
        <text x="90" y="23" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">System 1 Scorer (Laya)</text>
        <text x="10" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Fast non-autoregressive scoring</text>
        <text x="10" y="56" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Selects top 4 high-relevance clusters</text>
      </g>

      <!-- Step 3 -->
      <g transform="translate(580, 0)">
        <rect width="284" height="64" rx="8" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
        <rect x="10" y="10" width="70" height="16" rx="4" fill="#7B86EE"/>
        <text x="45" y="22" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF">PHASE 3</text>
        <text x="90" y="23" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Compact Synthesis</text>
        <text x="10" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Assembles: Pinned Invariants +</text>
        <text x="10" y="56" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Evidence Beam + Tail (Last 2 turns)</text>
      </g>
    </g>
  </g>

  <!-- Connector 2->3 -->
  <line x1="480" y1="364" x2="480" y2="394" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,394 475,386 485,386" fill="#8892E0"/>
  <rect x="360" y="372" width="240" height="20" rx="10" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1"/>
  <text x="480" y="386" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF" letter-spacing="0.5">COMPACT PROMPT TO SYSTEM 2</text>

  <!-- SECTION 3: PERFORMANCE IMPACT -->
  <g transform="translate(32, 396)">
    <rect width="896" height="80" rx="12" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="80" rx="3" fill="#FFFFFF"/>
    <rect x="16" y="16" width="60" height="20" rx="4" fill="#FFFFFF"/>
    <text x="46" y="30" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#0A0A0A" letter-spacing="0.8">IMPACT</text>
    <text x="88" y="30" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">70% to 85% Context Token Reduction · Zero Lost Invariants</text>
    <text x="88" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Eliminates quadratic TTFT latency, prevents prompt drift across 50+ turns, and guarantees 100% domain invariant grounding</text>
    <rect x="736" y="16" width="144" height="22" rx="11" fill="#1F1F1F" stroke="#7B86EE" stroke-width="1"/>
    <text x="808" y="31" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">85% Prompt Reduction</text>
    <rect x="736" y="44" width="144" height="22" rx="11" fill="#1F1F1F" stroke="#444444" stroke-width="1"/>
    <text x="808" y="59" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#C7CCF2">Zero Lost Invariants</text>
  </g>
</svg>

Jev-Mem organizes development discoveries into a multi-relational graph with four distinct edge types:
1. **Semantic Edges:** Linking concepts that share technical meaning (such as a database schema and its corresponding migration script).
2. **Temporal Edges:** Tracking the chronological order of file mutations and command runs.
3. **Causal Edges:** Connecting actions directly to their consequences (such as a specific edit causing a specific test assertion to fail).
4. **Entity Edges:** Mapping shared symbols, class names, and configuration variables.

### Adaptive Beam Retrieval

Before each System-2 prompt is composed, Jev-Mem runs an adaptive beam-search retrieval (`lib/jev_read.mjs`). System 1 evaluates the user prompt against the graph, scores candidate nodes, and selects a tight beam of the four most relevant evidence clusters (`BEAM_W = 4`).

System 2 receives:
1. The canonical System 1 state block.
2. The retrieved evidence beam.
3. Only the last two conversation turns.

This cuts prompt prefill tokens by **70% to 85%**, ensuring lightning-fast responses and laser-sharp focus even after fifty consecutive turns.

### Pinned Domain Invariants

Certain facts must never be subject to summarization or forgetting. In energy systems engineering, these include telemetry schemas (ODSE), grid safety limits, and architectural rules. 

Nehanda CLI stores these in a dedicated SQLite table called `pinned_context`. Pinned blocks bypass all compression routines and are attached verbatim to every model prompt. This guarantees that critical domain constraints remain permanently grounded throughout long engineering sessions.

---

## 3. Controlling Smaller Local Models: Deterministic SDLC vs. Generative Drift

The open-source AI community has produced remarkable local models in the 7-billion to 27-billion parameter range, including models like Nehanda v3.1. These models possess impressive code-generation capabilities, run entirely on local workstations, and keep proprietary source code private.

However, smaller local models exhibit a major vulnerability: **they are easily overwhelmed when forced to manage their own software development lifecycle.**

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 520" width="100%" height="auto">
  <!-- Main Canvas Container -->
  <rect width="960" height="520" rx="16" fill="#4551BF"/>

  <!-- Header Block -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">SDLC CONTROL PARADIGMS — GENERATIVE DRIFT VS DETERMINISTIC GOVERNANCE</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">Why prompt-based discipline fails on smaller local models, and how deterministic state machines enforce engineering rigor</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- CARD 1: THE GENERATIVE DRIFT TRAP (RED DANGER) -->
  <g transform="translate(32, 74)">
    <rect width="896" height="154" rx="12" fill="#C85A5A" stroke="#E07A7A" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="154" rx="3" fill="#FFFFFF"/>
    <rect x="16" y="14" width="160" height="20" rx="4" fill="#FFFFFF"/>
    <text x="96" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#C85A5A" letter-spacing="0.8">PROMPT-ONLY AUTONOMY</text>
    <text x="188" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">The Generative Drift Trap (Single-Model Prompting)</text>
    <text x="560" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#FFC1C1">Prompting a local model to "follow good practices" breaks under operational complexity</text>
    <rect x="740" y="12" width="140" height="20" rx="10" fill="#A84444" stroke="#E07A7A" stroke-width="1"/>
    <text x="810" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">Probabilistic Drift</text>
    <line x1="16" y1="42" x2="880" y2="42" stroke="#E07A7A" stroke-opacity="0.6" stroke-width="1"/>

    <!-- 4 Drift Failure Modes (2 columns x 2 rows) -->
    <!-- Row 1 -->
    <rect x="16" y="50" width="424" height="42" rx="6" fill="#A84444" stroke="#E07A7A" stroke-width="1"/>
    <text x="26" y="66" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• Mock Theater (Hallucinated Test Pass)</text>
    <text x="26" y="80" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">When a test fails, the model edits the test or claims passes in text without running them</text>

    <rect x="456" y="50" width="424" height="42" rx="6" fill="#A84444" stroke="#E07A7A" stroke-width="1"/>
    <text x="466" y="66" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• Premature Implementation</text>
    <text x="466" y="80" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">Eager to answer, the model mutates production code before diagnosing root cause</text>

    <!-- Row 2 -->
    <rect x="16" y="98" width="424" height="42" rx="6" fill="#A84444" stroke="#E07A7A" stroke-width="1"/>
    <text x="26" y="114" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• Exploration Spinlocks</text>
    <text x="26" y="128" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">Without hard bounds, loops reading identical files repeatedly, exhausting context budgets</text>

    <rect x="456" y="98" width="424" height="42" rx="6" fill="#A84444" stroke="#E07A7A" stroke-width="1"/>
    <text x="466" y="114" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• Ghost Refactoring &amp; Amnesia</text>
    <text x="466" y="128" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">Introduces unrequested edits, strips comments, and drifts away from original issue</text>
  </g>

  <!-- VS DIVIDER BADGE -->
  <line x1="32" y1="244" x2="435" y2="244" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>
  <line x1="525" y1="244" x2="928" y2="244" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>
  <rect x="440" y="232" width="80" height="24" rx="12" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
  <text x="480" y="248" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">VERSUS</text>

  <!-- CARD 2: DETERMINISTIC GOVERNANCE ENGINE -->
  <g transform="translate(32, 264)">
    <rect width="896" height="236" rx="12" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="236" rx="3" fill="#455BF1"/>
    <rect x="16" y="14" width="168" height="20" rx="4" fill="#455BF1"/>
    <text x="100" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">DETERMINISTIC GOVERNANCE</text>
    <text x="196" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">Nehanda's Deterministic Governance Engine</text>
    <text x="546" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">11-phase state machine in Node.js &amp; SQLite · Zero model vote on transitions</text>
    <rect x="740" y="12" width="140" height="20" rx="10" fill="#1F1F1F" stroke="#7B86EE" stroke-width="1"/>
    <text x="810" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">lib/workflow.mjs</text>
    <line x1="16" y1="42" x2="880" y2="42" stroke="#7B86EE" stroke-opacity="0.4" stroke-width="1"/>

    <!-- 4 Guarantees (2 columns x 2 rows) -->
    <!-- Row 1 -->
    <rect x="16" y="50" width="424" height="52" rx="6" fill="#161B3D" stroke="#5C67DE" stroke-width="1"/>
    <text x="26" y="68" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• Physical Tool Masking</text>
    <text x="26" y="82" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">In explore, only read tools are exposed (Read, Glob, Grep). Code writing is</text>
    <text x="26" y="93" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">physically impossible. In create_tests, writes are locked to test dirs.</text>

    <rect x="456" y="50" width="424" height="52" rx="6" fill="#161B3D" stroke="#5C67DE" stroke-width="1"/>
    <text x="466" y="68" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• The Model Has Zero Vote on Transitions</text>
    <text x="466" y="82" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Model text cannot advance state. Transitions require deterministic runtime</text>
    <text x="466" y="93" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">evidence: verified runner exit codes and database audit rows.</text>

    <!-- Row 2 -->
    <rect x="16" y="108" width="424" height="52" rx="6" fill="#161B3D" stroke="#5C67DE" stroke-width="1"/>
    <text x="26" y="126" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• Hard Provenance: Verified Test Runner Exit Codes</text>
    <text x="26" y="140" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Planning phase unlocks only after genuine non-zero exit code proves defect (RED).</text>
    <text x="26" y="151" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Verification requires that same test suite to exit 0 (GREEN).</text>

    <rect x="456" y="108" width="424" height="52" rx="6" fill="#161B3D" stroke="#5C67DE" stroke-width="1"/>
    <text x="466" y="126" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">• Automated Safety Checkers &amp; Coverage Gate</text>
    <text x="466" y="140" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Moving from safety to confirm_fix requires clean passes from 3 static checkers</text>
    <text x="466" y="151" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">(JS, Shell, Python) plus verified >= 70% production branch coverage.</text>

    <!-- 11-Phase Sequence Ribbon at Bottom -->
    <g transform="translate(16, 170)">
      <rect width="864" height="52" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
      <text x="14" y="20" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#8892E0" letter-spacing="0.8">ENFORCED 11-PHASE SDLC STATE MACHINE:</text>
      <text x="14" y="38" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#FFFFFF">idle → explore → diagnose → create_issue → create_tests → planning → implement → verify → safety → confirm_fix → done</text>
    </g>
  </g>
</svg>

### The Trap of Generative Autonomy

When an agent framework gives a local model broad autonomy and relies on system prompt instructions like *"be a good software engineer and write tests first,"* the model suffers from **generative drift**:

* **Mock Theater:** When a test fails, a local model will often edit the test to make it pass artificially, or simply declare in text that the tests succeeded without executing them.
* **Premature Implementation:** Eager to answer the user, the model will mutate production code before exploring the codebase or diagnosing the true root cause.
* **Exploration Spinlocks:** Without strict bounds, models get stuck in repetitive loops, reading the same files repeatedly and burning through context budgets.
* **Ghost Refactoring:** Models introduce unrequested edits, remove comments, or drift away from the core problem statement.

### The Solution: Deterministic State Machine in Code

Nehanda CLI recognizes that **engineering discipline must be enforced deterministically by software, not left to probabilistic model choice.**

In Nehanda CLI, the software development lifecycle is governed by an **11-phase state machine** implemented directly in Node.js (`lib/workflow.mjs`) and SQLite:

$$\text{idle} \rightarrow \text{explore} \rightarrow \text{diagnose} \rightarrow \text{create\_issue} \rightarrow \text{create\_tests} \rightarrow \text{planning} \rightarrow \text{implement} \rightarrow \text{verify} \rightarrow \text{safety} \rightarrow \text{confirm\_fix} \rightarrow \text{done}$$

### The Model Has No Vote on State

A critical rule governs Nehanda CLI: **model text cannot authorize a phase transition.** 

The model cannot say *"I verified the fix, let's complete the task."* Transitions are governed solely by verifiable runtime evidence recorded in SQLite:

1. **Physical Tool Masking:** The engine physically hides prohibited tools based on the active phase. In `explore`, the model only has access to read-only discovery tools (`Read`, `Glob`, `Grep`). Writing or editing production code is physically impossible. In `create_tests`, write access is strictly confined to test directories.
2. **Verified Test Failures (RED):** The engine will not allow a transition to the planning phase until SQLite records genuine proof of a failing behavioral test from an actual test runner. A simple command error or syntax typo does not count.
3. **Verified Test Passes (GREEN):** To transition to verification, the original test that failed must now pass against the current production code snapshot.
4. **Automated Safety Checkers:** Moving from `safety` to `confirm_fix` requires clean reports from three static checkers (JavaScript, Shell, and Python) plus verified $\ge 70\%$ branch coverage across all modified production code.
5. **Human Operator Approval:** Code mutations in `planning` and final sign-off in `confirm_fix` require explicit human operator confirmation.

### Summary: Complementary Strengths

By stripping procedural governance away from the language model and giving it to an immutable state machine, Nehanda CLI turns smaller open-weights models into disciplined software engineers:

| Responsibility | Handled By | Method |
|:---|:---|:---|
| **Fast Reflexes & Classification** | System 1 (Laya 421M) | Non-autoregressive forward pass (~48ms) |
| **Code Synthesis & Reasoning** | System 2 (Generative LLM) | Autoregressive reasoning within strict bounds |
| **Long-Term Memory Retrieval** | Jev-Mem Plane | Multi-relational graph + adaptive beam search |
| **Critical Domain Rules** | `pinned_context` | Immutable database attachment to all prompts |
| **Workflow Governance & Safety** | 11-Phase SDLC Engine | Deterministic state machine & physical tool masks |

This hybrid design gives developers the speed and privacy of local models with the rigor, auditability, and safety demanded by enterprise software engineering.
