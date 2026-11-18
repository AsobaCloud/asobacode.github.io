---
title: "Core Concepts"
layout: default
parent: "Nehanda CLI"
nav_order: 1.5
---

# Core Concepts

Nehanda CLI is built around three foundational architectural principles that set it apart from conventional AI coding assistants. Nehanda CLI does not treat a large language model as an omniscient chatbot. It avoids cramming ever-larger prompts into the context window. Instead, Nehanda CLI treats the model as one component within a structured cognitive system.

Understanding these three ideas explains why Nehanda CLI is faster, consumes fewer tokens, and reliably finishes complex software tasks where standard agent loops break down.

---

## 1. Dual-Process Cognitive Architecture: System 1 and System 2

Human cognition does not solve every problem with slow, deliberate contemplation. In his landmark research, psychologist Daniel Kahneman described two distinct modes of human thought:

* **System 1:** Fast, instinctive, and automatic thinking. When you swerve to avoid an obstacle or instantly read a billboard, your brain operates via rapid reflex without conscious deliberation.
* **System 2:** Slow, deliberate, and analytical thinking. When you solve a calculus equation, write a complex algorithm, or draft a legal contract, your brain engages effortful reasoning.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 550" width="100%" height="auto">
  <!-- Main Canvas Container -->
  <rect width="960" height="550" rx="16" fill="#4551BF"/>

  <!-- Header Block -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">NEHANDA CLI — DUAL-PROCESS COGNITIVE ARCHITECTURE</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">Fast Non-Autoregressive Sidecar (System 1: Laya) &amp; Deliberate Generative Reasoning (System 2)</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- CARD 1: USER REQUEST -->
  <g transform="translate(80, 74)">
    <rect width="800" height="56" rx="12" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="56" rx="3" fill="#7B86EE"/>
    <rect x="16" y="16" width="96" height="22" rx="4" fill="#7B86EE"/>
    <text x="64" y="31" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">USER REQUEST</text>
    <text x="124" y="27" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Interactive Prompt / REPL Task Submission</text>
    <text x="124" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Developer command or automated pipeline trigger entering the turn loop</text>
    <rect x="650" y="16" width="134" height="22" rx="11" fill="#1F1F1F" stroke="#444444" stroke-width="1"/>
    <text x="717" y="31" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">bin/nehanda-ui.mjs</text>
  </g>

  <!-- Connector 1->2 -->
  <line x1="480" y1="130" x2="480" y2="162" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,162 475,154 485,154" fill="#8892E0"/>
  <rect x="365" y="139" width="230" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="153" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">RAW INPUT EVALUATION (~0ms)</text>

  <!-- CARD 2: SYSTEM 1 (LAYA) -->
  <g transform="translate(40, 164)">
    <rect width="880" height="152" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="152" rx="3" fill="#455BF1"/>
    <rect x="16" y="14" width="76" height="20" rx="4" fill="#455BF1"/>
    <text x="54" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">SYSTEM 1</text>
    <text x="104" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Laya (421M Non-Autoregressive Decision Engine)</text>
    <text x="104" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Warm local sidecar · Single forward pass (~48ms reflex) · Zero hallucinations</text>
    <rect x="744" y="14" width="120" height="20" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="804" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">lib/laya.mjs</text>
    <line x1="16" y1="52" x2="864" y2="52" stroke="#5C67DE" stroke-opacity="0.4" stroke-width="1"/>

    <!-- 6 Capability Blocks (3 columns x 2 rows) -->
    <!-- Row 1 -->
    <rect x="16" y="60" width="272" height="38" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="26" y="75" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Intent Classification</text>
    <text x="26" y="89" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Routes query to SDLC phase</text>

    <rect x="304" y="60" width="272" height="38" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="314" y="75" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Bashguard Risk Screening</text>
    <text x="314" y="89" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">85%+ confidence safety bypass</text>

    <rect x="592" y="60" width="272" height="38" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="602" y="75" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Memory Graph Edge Typing</text>
    <text x="602" y="89" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Causal, semantic &amp; temporal links</text>

    <!-- Row 2 -->
    <rect x="16" y="104" width="272" height="38" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="26" y="119" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Compaction Transcript Pruner</text>
    <text x="26" y="133" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Preserves invariants, drops noise</text>

    <rect x="304" y="104" width="272" height="38" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="314" y="119" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Evidence Candidate Scorer</text>
    <text x="314" y="133" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Scores graph nodes (BEAM_W=4)</text>

    <rect x="592" y="104" width="272" height="38" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="602" y="119" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">• Zero Hallucination Guardrails</text>
    <text x="602" y="133" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Typed probability noul (0.0-1.0)</text>
  </g>

  <!-- Connectors 2->3 (Dual streams) -->
  <!-- Left stream: Safe Decisions -->
  <line x1="260" y1="316" x2="260" y2="356" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="260,356 255,348 265,348" fill="#8892E0"/>
  <rect x="150" y="328" width="220" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="260" y="342" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">SAFE DECISIONS &amp; ROUTING</text>

  <!-- Right stream: Relevant Evidence -->
  <line x1="700" y1="316" x2="700" y2="356" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="700,356 695,348 705,348" fill="#8892E0"/>
  <rect x="585" y="328" width="230" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="700" y="342" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">RELEVANT EVIDENCE &amp; CONSTRAINTS</text>

  <!-- CARD 3: SYSTEM 2 (GENERATIVE LLM) -->
  <g transform="translate(40, 358)">
    <rect width="880" height="152" rx="12" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="152" rx="3" fill="#7B86EE"/>
    <rect x="16" y="14" width="76" height="20" rx="4" fill="#7B86EE"/>
    <text x="54" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">SYSTEM 2</text>
    <text x="104" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Generative LLM (Deliberate Reasoning Engine)</text>
    <text x="104" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Qwen 2.5 27B / Nehanda v3.1 / Claude 3.5 / GPT-4o · Strict bounded synthesis</text>
    <rect x="724" y="14" width="140" height="20" rx="10" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="794" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">lib/orchestrate.mjs</text>
    <line x1="16" y1="52" x2="864" y2="52" stroke="#7B86EE" stroke-opacity="0.4" stroke-width="1"/>

    <!-- 4 Capability Blocks (2 columns x 2 rows) -->
    <!-- Row 1 -->
    <rect x="16" y="60" width="420" height="40" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="26" y="75" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• Architectural Diagnosis &amp; Root Cause Analysis</text>
    <text x="26" y="90" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Diagnose root causes without wasting tokens on basic classification</text>

    <rect x="444" y="60" width="420" height="40" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="454" y="75" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• Behavioral Test Authoring (TDD Gate)</text>
    <text x="454" y="90" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Craft deterministic reproduction suites that physically verify defects</text>

    <!-- Row 2 -->
    <rect x="16" y="104" width="420" height="40" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="26" y="119" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• Code Implementation &amp; Surgical Patching</text>
    <text x="26" y="134" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Mutate production files only after test runner verifies reproduction</text>

    <rect x="444" y="104" width="420" height="40" rx="6" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="454" y="119" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• Detailed Plan Synthesis &amp; Spec Alignment</text>
    <text x="454" y="134" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Synthesize verifiable implementation plans against pinned invariants</text>
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

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 410" width="100%" height="auto">
  <!-- Main Canvas Container -->
  <rect width="960" height="410" rx="16" fill="#4551BF"/>

  <!-- Header Block -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">THE JEVONS TRAP IN AI CONTEXT WINDOWS</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">How massive token capacity paradoxically triggers attention collapse, quadratic latency, and reasoning failure</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- NODE 1: TOP-LEFT (STEP 1) -->
  <g transform="translate(40, 80)">
    <rect width="410" height="114" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="114" rx="3" fill="#455BF1"/>
    <rect x="16" y="14" width="64" height="20" rx="4" fill="#455BF1"/>
    <text x="48" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">STEP 1</text>
    <text x="90" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Bigger Context Windows</text>
    <text x="16" y="56" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="500" fill="#C7CCF2">Frontier models expand context from 128K to 1M+ tokens.</text>
    <text x="16" y="74" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="500" fill="#C7CCF2">Context appears infinite, cheap, and practically unlimited.</text>
    <text x="16" y="94" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#8892E0">Trap Trigger: Teams stop curating or pruning input history</text>
  </g>

  <!-- CONNECTOR TOP: 1 -> 2 -->
  <line x1="450" y1="137" x2="510" y2="137" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="510,137 502,132 502,142" fill="#8892E0"/>
  <rect x="430" y="127" width="100" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="141" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">DUMP REPO</text>

  <!-- NODE 2: TOP-RIGHT (STEP 2) -->
  <g transform="translate(510, 80)">
    <rect width="410" height="114" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="114" rx="3" fill="#5C67DE"/>
    <rect x="16" y="14" width="64" height="20" rx="4" fill="#5C67DE"/>
    <text x="48" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">STEP 2</text>
    <text x="90" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Developers Dump Entire Repos</text>
    <text x="16" y="56" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="500" fill="#C7CCF2">Multi-file trees, git diffs, and compiler outputs</text>
    <text x="16" y="74" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="500" fill="#C7CCF2">are resent unpruned on every single turn.</text>
    <text x="16" y="94" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#8892E0">Outcome: Prompts swell to hundreds of thousands of tokens</text>
  </g>

  <!-- CONNECTOR RIGHT: 2 -> 3 -->
  <line x1="715" y1="194" x2="715" y2="256" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="715,256 710,248 720,248" fill="#8892E0"/>
  <rect x="625" y="215" width="180" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="715" y="229" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">QUADRATIC ATTENTION</text>

  <!-- NODE 3: BOTTOM-RIGHT (STEP 3) -->
  <g transform="translate(510, 256)">
    <rect width="410" height="114" rx="12" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="114" rx="3" fill="#7B86EE"/>
    <rect x="16" y="14" width="64" height="20" rx="4" fill="#7B86EE"/>
    <text x="48" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">STEP 3</text>
    <text x="90" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Attention Dilution ("Lost in Middle")</text>
    <text x="16" y="56" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="500" fill="#C7CCF2">Transformer attention density degrades over large sequences.</text>
    <text x="16" y="74" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="500" fill="#C7CCF2">Critical domain invariants get buried in historical noise.</text>
    <text x="16" y="94" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#8892E0">Latency: Time-to-first-token (TTFT) scales quadratically</text>
  </g>

  <!-- CONNECTOR BOTTOM: 3 -> 4 -->
  <line x1="510" y1="313" x2="450" y2="313" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="450,313 458,308 458,318" fill="#8892E0"/>
  <rect x="430" y="303" width="100" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="317" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">AGENT DRIFT</text>

  <!-- NODE 4: BOTTOM-LEFT (STEP 4 / THE TRAP) -->
  <g transform="translate(40, 256)">
    <rect width="410" height="114" rx="12" fill="#C85A5A" stroke="#E07A7A" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="114" rx="3" fill="#FFFFFF"/>
    <rect x="16" y="14" width="104" height="20" rx="4" fill="#FFFFFF"/>
    <text x="68" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#C85A5A" letter-spacing="0.8">JEVONS TRAP</text>
    <text x="130" y="28" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Catastrophic Reasoning Decay</text>
    <text x="16" y="56" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="500" fill="#FFC1C1">Multi-minute TTFT latencies stall interactive developer flow.</text>
    <text x="16" y="74" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="500" fill="#FFC1C1">Models produce ghost refactors, loop endlessly &amp; drift.</text>
    <text x="16" y="94" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#FFFFFF">Trap: Frustrated devs dump even more context to "remind" it</text>
  </g>

  <!-- CONNECTOR LEFT: 4 -> 1 (Closing the loop) -->
  <line x1="245" y1="256" x2="245" y2="194" stroke="#E07A7A" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="245,194 240,202 250,202" fill="#E07A7A"/>
  <rect x="150" y="215" width="190" height="20" rx="10" fill="#0A0A0A" stroke="#E07A7A" stroke-width="1"/>
  <text x="245" y="229" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFC1C1" letter-spacing="0.5">VICIOUS CYCLE COMPOUNDS</text>
</svg>

### The Modern Jevons Trap in AI

Modern large language models boast massive context windows, spanning from 128,000 tokens to over one million tokens. On the surface, this sounds like a total solution for memory. Developers often assume they can solve context by simply dumping whole codebases, complete error traces, and multi-hour chat histories into every prompt.

In practice, this triggers the Jevons trap:

* **Attention Dilution ("Lost in the Middle"):** While transformer attention can technically ingest 200,000 tokens, retrieval accuracy drops sharply in the middle of long prompts. Models lose track of key constraints, forget earlier discoveries, and become confused by contradictory historical logs.
* **Quadratic Attention Latency:** Processing massive prompts dramatically increases time-to-first-token (TTFT). Developers spend minutes waiting for a model to read its own bloated prompt.
* **Economic and Computational Waste:** Resending megabytes of repeated project history on every turn wastes enormous computational energy and financial cost.

### The Jev-Mem Solution: Multi-Relational Memory

Nehanda CLI rejects raw context dumping. Instead, it implements **Jev-Mem**—an episodic memory plane backed by SQLite and powered by System 1.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 510" width="100%" height="auto">
  <!-- Main Canvas Container -->
  <rect width="960" height="510" rx="16" fill="#4551BF"/>

  <!-- Header Block -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">NEHANDA CLI — JEV-MEM ARCHITECTURE</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">SQLite Multi-Relational Episodic Memory Plane (~/.config/nehanda/ona-session.db) &amp; Adaptive Beam Search</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- SECTION 1: SQLITE STORAGE PLANE -->
  <g transform="translate(32, 74)">
    <rect width="896" height="140" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="140" rx="3" fill="#455BF1"/>
    <rect x="16" y="12" width="108" height="20" rx="4" fill="#455BF1"/>
    <text x="70" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">STORAGE PLANE</text>
    <text x="134" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">SQLite Database (~/.config/nehanda/ona-session.db)</text>
    <text x="134" y="42" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">In-process ACID relational store via better-sqlite3 · Zero network daemon overhead</text>
    <rect x="744" y="12" width="124" height="20" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="806" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">lib/jev.mjs</text>

    <!-- 4 Inner Database Table Cards -->
    <g transform="translate(16, 52)">
      <!-- memories -->
      <rect width="202" height="76" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
      <rect x="10" y="8" width="68" height="18" rx="4" fill="#455BF1"/>
      <text x="44" y="20" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">NODES</text>
      <text x="84" y="21" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#FFFFFF">memories</text>
      <text x="10" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Observation Store</text>
      <text x="10" y="60" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Indexed with FTS5 search</text>

      <!-- memory_edges -->
      <g transform="translate(216, 0)">
        <rect width="204" height="76" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
        <rect x="10" y="8" width="68" height="18" rx="4" fill="#5C67DE"/>
        <text x="44" y="20" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">GRAPH</text>
        <text x="84" y="21" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#FFFFFF">memory_edges</text>
        <text x="10" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Multi-Relational Links</text>
        <text x="10" y="60" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Semantic, temporal, causal, entity</text>
      </g>

      <!-- laya_jev_state -->
      <g transform="translate(434, 0)">
        <rect width="204" height="76" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
        <rect x="10" y="8" width="68" height="18" rx="4" fill="#7B86EE"/>
        <text x="44" y="20" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">STATE</text>
        <text x="84" y="21" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#FFFFFF">laya_jev_state</text>
        <text x="10" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Canonical Summary</text>
        <text x="10" y="60" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">System-1 state vector block</text>
      </g>

      <!-- pinned_context -->
      <g transform="translate(652, 0)">
        <rect width="212" height="76" rx="8" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
        <rect x="10" y="8" width="68" height="18" rx="4" fill="#0A0A0A"/>
        <text x="44" y="20" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">LOCKED</text>
        <text x="84" y="21" font-family="'Courier New', monospace" font-size="11" font-weight="700" fill="#FFFFFF">pinned_context</text>
        <text x="10" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Domain Invariants</text>
        <text x="10" y="60" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Bypasses all compaction</text>
      </g>
    </g>
  </g>

  <!-- Connector 1->2 -->
  <line x1="480" y1="214" x2="480" y2="244" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,244 475,236 485,236" fill="#8892E0"/>
  <rect x="360" y="222" width="240" height="20" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="236" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">BEAM EVALUATION QUERY</text>

  <!-- SECTION 2: ADAPTIVE BEAM RETRIEVAL -->
  <g transform="translate(32, 246)">
    <rect width="896" height="126" rx="12" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="126" rx="3" fill="#7B86EE"/>
    <rect x="16" y="12" width="108" height="20" rx="4" fill="#7B86EE"/>
    <text x="70" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">BEAM SEARCH</text>
    <text x="134" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Adaptive Beam Retrieval (lib/jev_read.mjs · BEAM_W = 4)</text>
    <text x="134" y="42" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">System 1 scores graph topology against user query in &lt;48ms · Top 4 clusters retained</text>
    <rect x="744" y="12" width="124" height="20" rx="10" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="806" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">BEAM_W = 4</text>

    <!-- 3 Pipeline Step Cards -->
    <g transform="translate(16, 52)">
      <!-- Step 1 -->
      <rect width="276" height="62" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
      <rect x="10" y="8" width="64" height="16" rx="4" fill="#3B4CCA"/>
      <text x="42" y="20" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF">PHASE 1</text>
      <text x="82" y="21" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">4 Graph Views Projected</text>
      <text x="10" y="40" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="500" fill="#C7CCF2">Evaluates query across semantic,</text>
      <text x="10" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="500" fill="#C7CCF2">temporal, causal &amp; entity subgraphs</text>

      <!-- Step 2 -->
      <g transform="translate(290, 0)">
        <rect width="276" height="62" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
        <rect x="10" y="8" width="64" height="16" rx="4" fill="#455BF1"/>
        <text x="42" y="20" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF">PHASE 2</text>
        <text x="82" y="21" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">System 1 Scorer (Laya)</text>
        <text x="10" y="40" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="500" fill="#C7CCF2">Fast non-autoregressive scoring</text>
        <text x="10" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="500" fill="#C7CCF2">Selects top 4 high-relevance clusters</text>
      </g>

      <!-- Step 3 -->
      <g transform="translate(580, 0)">
        <rect width="284" height="62" rx="8" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
        <rect x="10" y="8" width="64" height="16" rx="4" fill="#7B86EE"/>
        <text x="42" y="20" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="800" fill="#FFFFFF">PHASE 3</text>
        <text x="82" y="21" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Compact Synthesis</text>
        <text x="10" y="40" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="500" fill="#C7CCF2">Assembles: Pinned Invariants +</text>
        <text x="10" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="500" fill="#C7CCF2">Evidence Beam + Tail (Last 2 turns)</text>
      </g>
    </g>
  </g>

  <!-- Connector 2->3 -->
  <line x1="480" y1="372" x2="480" y2="400" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="480,400 475,392 485,392" fill="#8892E0"/>
  <rect x="360" y="380" width="240" height="20" rx="10" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1"/>
  <text x="480" y="394" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF" letter-spacing="0.5">COMPACT PROMPT TO SYSTEM 2</text>

  <!-- SECTION 3: PERFORMANCE IMPACT -->
  <g transform="translate(32, 402)">
    <rect width="896" height="86" rx="12" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="86" rx="3" fill="#FFFFFF"/>
    <rect x="16" y="16" width="60" height="20" rx="4" fill="#FFFFFF"/>
    <text x="46" y="30" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#0A0A0A" letter-spacing="0.8">IMPACT</text>
    <text x="88" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">70% to 85% Context Token Reduction · Zero Lost Invariants</text>
    <text x="88" y="47" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Eliminates quadratic TTFT latency and prevents prompt drift across 50+ turns</text>
    <text x="88" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Guarantees 100% domain invariant grounding throughout long engineering sessions</text>
    <rect x="726" y="16" width="154" height="22" rx="11" fill="#1F1F1F" stroke="#7B86EE" stroke-width="1"/>
    <text x="803" y="31" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#FFFFFF">85% Prompt Reduction</text>
    <rect x="726" y="46" width="154" height="22" rx="11" fill="#1F1F1F" stroke="#444444" stroke-width="1"/>
    <text x="803" y="61" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#C7CCF2">Zero Lost Invariants</text>
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

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 550" width="100%" height="auto">
  <!-- Main Canvas Container -->
  <rect width="960" height="550" rx="16" fill="#4551BF"/>

  <!-- Header Block -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">SDLC CONTROL PARADIGMS — GENERATIVE DRIFT VS DETERMINISTIC GOVERNANCE</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">Why prompt-based discipline fails on smaller local models, and how deterministic state machines enforce engineering rigor</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- CARD 1: THE GENERATIVE DRIFT TRAP (RED DANGER) -->
  <g transform="translate(32, 74)">
    <rect width="896" height="164" rx="12" fill="#C85A5A" stroke="#E07A7A" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="164" rx="3" fill="#FFFFFF"/>
    <rect x="16" y="12" width="160" height="20" rx="4" fill="#FFFFFF"/>
    <text x="96" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#C85A5A" letter-spacing="0.8">PROMPT-ONLY AUTONOMY</text>
    <text x="186" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">The Generative Drift Trap (Single-Model Prompting)</text>
    <text x="186" y="42" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#FFC1C1">Prompting a local model to "follow good practices" breaks down under complex multi-turn execution</text>
    <rect x="740" y="12" width="140" height="20" rx="10" fill="#A84444" stroke="#E07A7A" stroke-width="1"/>
    <text x="810" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">Probabilistic Drift</text>
    <line x1="16" y1="50" x2="880" y2="50" stroke="#E07A7A" stroke-opacity="0.5" stroke-width="1"/>

    <!-- 4 Drift Failure Modes (2 columns x 2 rows) -->
    <!-- Row 1 -->
    <g transform="translate(16, 58)">
      <rect width="424" height="48" rx="6" fill="#A84444" stroke="#E07A7A" stroke-width="1"/>
      <text x="12" y="18" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• Mock Theater (Hallucinated Test Pass)</text>
      <text x="12" y="31" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">When a test fails, the model edits the test or claims passes</text>
      <text x="12" y="42" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">in text output without actually executing the test runner</text>
    </g>

    <g transform="translate(456, 58)">
      <rect width="424" height="48" rx="6" fill="#A84444" stroke="#E07A7A" stroke-width="1"/>
      <text x="12" y="18" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• Premature Implementation</text>
      <text x="12" y="31" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">Eager to answer, the model mutates production code before</text>
      <text x="12" y="42" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">diagnosing root cause or creating a reproduction test suite</text>
    </g>

    <!-- Row 2 -->
    <g transform="translate(16, 110)">
      <rect width="424" height="48" rx="6" fill="#A84444" stroke="#E07A7A" stroke-width="1"/>
      <text x="12" y="18" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• Exploration Spinlocks</text>
      <text x="12" y="31" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">Without hard bounds, loops reading identical files repeatedly,</text>
      <text x="12" y="42" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">burning through context budgets without reaching a diagnosis</text>
    </g>

    <g transform="translate(456, 110)">
      <rect width="424" height="48" rx="6" fill="#A84444" stroke="#E07A7A" stroke-width="1"/>
      <text x="12" y="18" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• Ghost Refactoring &amp; Context Amnesia</text>
      <text x="12" y="31" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">Introduces unrequested edits, strips existing comments, and</text>
      <text x="12" y="42" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#FFC1C1">gradually drifts away from the original issue specification</text>
    </g>
  </g>

  <!-- VS DIVIDER BADGE -->
  <line x1="32" y1="252" x2="435" y2="252" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>
  <line x1="525" y1="252" x2="928" y2="252" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>
  <rect x="440" y="240" width="80" height="24" rx="12" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
  <text x="480" y="256" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">VERSUS</text>

  <!-- CARD 2: DETERMINISTIC GOVERNANCE ENGINE -->
  <g transform="translate(32, 270)">
    <rect width="896" height="244" rx="12" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="244" rx="3" fill="#455BF1"/>
    <rect x="16" y="12" width="170" height="20" rx="4" fill="#455BF1"/>
    <text x="101" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">DETERMINISTIC GOVERNANCE</text>
    <text x="196" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Nehanda's Deterministic Governance Engine</text>
    <text x="196" y="42" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">11-phase state machine in Node.js &amp; SQLite · The model has zero vote on state transitions</text>
    <rect x="740" y="12" width="140" height="20" rx="10" fill="#1F1F1F" stroke="#7B86EE" stroke-width="1"/>
    <text x="810" y="26" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">lib/workflow.mjs</text>
    <line x1="16" y1="50" x2="880" y2="50" stroke="#7B86EE" stroke-opacity="0.4" stroke-width="1"/>

    <!-- 4 Guarantees (2 columns x 2 rows) -->
    <!-- Row 1 -->
    <g transform="translate(16, 58)">
      <rect width="424" height="52" rx="6" fill="#161B3D" stroke="#5C67DE" stroke-width="1"/>
      <text x="12" y="18" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• Physical Tool Masking</text>
      <text x="12" y="32" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">In explore, only read tools are exposed (Read, Glob, Grep).</text>
      <text x="12" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Code writing is impossible; writes locked to tests in create_tests.</text>
    </g>

    <g transform="translate(456, 58)">
      <rect width="424" height="52" rx="6" fill="#161B3D" stroke="#5C67DE" stroke-width="1"/>
      <text x="12" y="18" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• The Model Has Zero Vote on Transitions</text>
      <text x="12" y="32" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Model text cannot advance state. Transitions require verified</text>
      <text x="12" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">runtime test exit codes and immutable SQLite audit rows.</text>
    </g>

    <!-- Row 2 -->
    <g transform="translate(16, 114)">
      <rect width="424" height="52" rx="6" fill="#161B3D" stroke="#5C67DE" stroke-width="1"/>
      <text x="12" y="18" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• Hard Provenance: Verified Runner Exit Codes</text>
      <text x="12" y="32" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Planning unlocks only after non-zero exit code proves defect (RED).</text>
      <text x="12" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Verification requires that identical test suite to exit 0 (GREEN).</text>
    </g>

    <g transform="translate(456, 114)">
      <rect width="424" height="52" rx="6" fill="#161B3D" stroke="#5C67DE" stroke-width="1"/>
      <text x="12" y="18" font-family="'DM Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">• Automated Safety Checkers &amp; Coverage Gate</text>
      <text x="12" y="32" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">Clean passes required from 3 static checkers (JS, Shell, Python)</text>
      <text x="12" y="44" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="500" fill="#C7CCF2">plus verified &gt;= 70% production code branch coverage.</text>
    </g>

    <!-- 11-Phase Sequence Ribbon at Bottom -->
    <g transform="translate(16, 174)">
      <rect width="864" height="56" rx="8" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
      <text x="14" y="22" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#8892E0" letter-spacing="0.8">ENFORCED 11-PHASE SDLC STATE MACHINE SEQUENCE:</text>
      <text x="14" y="42" font-family="'Courier New', monospace" font-size="10" font-weight="700" fill="#FFFFFF">idle → explore → diagnose → create_issue → create_tests → planning → implement → verify → safety → confirm_fix → done</text>
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
