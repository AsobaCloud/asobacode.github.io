---
title: "SDLC Workflow"
layout: default
parent: "Nehanda CLI"
nav_order: 4
---

# SDLC Workflow

Nehanda CLI enforces a deterministic, 11-phase software development lifecycle through a governed state machine (`lib/workflow.mjs`, `lib/orchestrate.mjs`). LLM prose, model claims, or arbitrary terminal commands cannot authorize phase transitions or bypass human approval gates.

Every phase specifies an explicit tool mask, evidence requirement, and human approval boundary. If the required execution evidence is missing or invalid, the engine rejects the transition and enforces the legal retry path.

---

## State Machine Architecture

The runtime state machine operates across 11 canonical states, forming a closed, evidence-gated lifecycle:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 780" width="100%" height="auto">
  <!-- Canvas Background -->
  <rect width="960" height="780" rx="16" fill="#4551BF"/>

  <!-- Header Block -->
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">NEHANDA SDLC GOVERNANCE ENGINE — 11-PHASE STATE MACHINE</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">Deterministic Phase Progression · Execution Provenance Gated · Zero Unapproved Code Mutations</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- COLUMN 1: Discovery, Diagnosis, Specification & Planning -->

  <!-- CARD 1: idle -->
  <g transform="translate(48, 76)">
    <rect width="390" height="64" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="64" rx="3" fill="#455BF1"/>
    <rect x="16" y="12" width="56" height="18" rx="4" fill="#455BF1"/>
    <text x="44" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">PHASE 00</text>
    <text x="82" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">idle</text>
    <text x="16" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Standby state · Free-form inquiry · Mutating Bash refused</text>
    <rect x="290" y="12" width="88" height="18" rx="9" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="334" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">Safe Inquiries</text>
  </g>

  <!-- Connector 1->2 -->
  <line x1="243" y1="140" x2="243" y2="176" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="243,176 239,168 247,168" fill="#8892E0"/>
  <rect x="153" y="146" width="180" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="243" y="159" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">PROJECT CONTEXT SUPPLIED</text>

  <!-- CARD 2: explore -->
  <g transform="translate(48, 176)">
    <rect width="390" height="64" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="64" rx="3" fill="#5C67DE"/>
    <rect x="16" y="12" width="56" height="18" rx="4" fill="#5C67DE"/>
    <text x="44" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">PHASE 01</text>
    <text x="82" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">explore</text>
    <text x="16" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Bounded repository survey · Read/Glob/Grep only · 20-req cap</text>
    <rect x="278" y="12" width="100" height="18" rx="9" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="328" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">Read-Only Tools</text>
  </g>

  <!-- Connector 2->3 -->
  <line x1="243" y1="240" x2="243" y2="276" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="243,276 239,268 247,268" fill="#8892E0"/>
  <rect x="145" y="246" width="196" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="243" y="259" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">EXPLORATION CONVERGED / JEV</text>

  <!-- CARD 3: diagnose -->
  <g transform="translate(48, 276)">
    <rect width="390" height="64" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="64" rx="3" fill="#5C67DE"/>
    <rect x="16" y="12" width="56" height="18" rx="4" fill="#5C67DE"/>
    <text x="44" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">PHASE 02</text>
    <text x="82" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">diagnose</text>
    <text x="16" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Evidenced root cause analysis · Observed vs expected behavior</text>
    <rect x="290" y="12" width="88" height="18" rx="9" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="334" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">Diagnosis Text</text>
  </g>

  <!-- Connector 3->4 -->
  <line x1="243" y1="340" x2="243" y2="376" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="243,376 239,368 247,368" fill="#8892E0"/>
  <rect x="150" y="346" width="186" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="243" y="359" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">RECORDED DIAGNOSIS ARTIFACT</text>

  <!-- CARD 4: create_issue -->
  <g transform="translate(48, 376)">
    <rect width="390" height="64" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="64" rx="3" fill="#5C67DE"/>
    <rect x="16" y="12" width="56" height="18" rx="4" fill="#5C67DE"/>
    <text x="44" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">PHASE 03</text>
    <text x="82" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">create_issue</text>
    <text x="16" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Bind issue identity · Create .issues/ artifact or cite GitHub #id</text>
    <rect x="282" y="12" width="96" height="18" rx="9" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="330" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">Issue Metadata</text>
  </g>

  <!-- Connector 4->5 -->
  <line x1="243" y1="440" x2="243" y2="476" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="243,476 239,468 247,468" fill="#8892E0"/>
  <rect x="146" y="446" width="194" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="243" y="459" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">ISSUE RECORD REGISTERED</text>

  <!-- CARD 5: create_tests -->
  <g transform="translate(48, 476)">
    <rect width="390" height="64" rx="10" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="64" rx="3" fill="#7B86EE"/>
    <rect x="16" y="12" width="56" height="18" rx="4" fill="#7B86EE"/>
    <text x="44" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">PHASE 04</text>
    <text x="82" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">create_tests</text>
    <text x="16" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Author Given/When/Then test · Execute runner · PROVE RED</text>
    <rect x="274" y="12" width="104" height="18" rx="9" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="326" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">Tests Only (RED)</text>
  </g>

  <!-- Connector 5->6 -->
  <line x1="243" y1="540" x2="243" y2="576" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="243,576 239,568 247,568" fill="#8892E0"/>
  <rect x="142" y="546" width="202" height="18" rx="9" fill="#2E378C" stroke="#7B86EE" stroke-width="1"/>
  <text x="243" y="559" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF" letter-spacing="0.5">GENUINE RUNNER RED EVIDENCE</text>

  <!-- CARD 6: planning -->
  <g transform="translate(48, 576)">
    <rect width="390" height="64" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="64" rx="3" fill="#5C67DE"/>
    <rect x="16" y="12" width="56" height="18" rx="4" fill="#5C67DE"/>
    <text x="44" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">PHASE 05</text>
    <text x="82" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">planning</text>
    <text x="16" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Plan Triad specification · Zero tools allowed · Human approval</text>
    <rect x="286" y="12" width="92" height="18" rx="9" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="332" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">No Tools (Text)</text>
  </g>

  <!-- Bottom Crossover Connector (Planning -> Implement) -->
  <path d="M 243 640 L 243 690 L 717 690 L 717 640" stroke="#8892E0" stroke-width="2.5" stroke-dasharray="4,3" fill="none"/>
  <polygon points="717,640 712,648 722,648" fill="#8892E0"/>
  <rect x="360" y="679" width="240" height="22" rx="11" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
  <text x="480" y="694" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">OPERATOR APPROVES PLAN [y/N] ✓</text>

  <!-- COLUMN 2: Execution, Verification, Safety & Completion -->

  <!-- CARD 7: implement -->
  <g transform="translate(522, 576)">
    <rect width="390" height="64" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="64" rx="3" fill="#5C67DE"/>
    <rect x="16" y="12" width="56" height="18" rx="4" fill="#5C67DE"/>
    <text x="44" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">PHASE 06</text>
    <text x="82" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">implement</text>
    <text x="16" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Minimal production edits · Epistemic isolation · Code mutators</text>
    <rect x="282" y="12" width="96" height="18" rx="9" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="330" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">All Tools (Code)</text>
  </g>

  <!-- Connector 7->8 (Going UP) -->
  <line x1="717" y1="576" x2="717" y2="540" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="717,540 712,548 722,548" fill="#8892E0"/>
  <rect x="618" y="546" width="198" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="717" y="559" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">CODE COMMITTED TO DISK</text>

  <!-- CARD 8: verify -->
  <g transform="translate(522, 476)">
    <rect width="390" height="64" rx="10" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="64" rx="3" fill="#7B86EE"/>
    <rect x="16" y="12" width="56" height="18" rx="4" fill="#7B86EE"/>
    <text x="44" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">PHASE 07</text>
    <text x="82" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">verify</text>
    <text x="16" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Execute unchanged original regression against code · PROVE GREEN</text>
    <rect x="274" y="12" width="104" height="18" rx="9" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="326" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">Regression Run</text>
  </g>

  <!-- Connector 8->9 (Going UP) -->
  <line x1="717" y1="476" x2="717" y2="440" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="717,440 712,448 722,448" fill="#8892E0"/>
  <rect x="612" y="446" width="210" height="18" rx="9" fill="#2E378C" stroke="#7B86EE" stroke-width="1"/>
  <text x="717" y="459" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF" letter-spacing="0.5">UNCHANGED TEST GREEN (PASS) ✓</text>

  <!-- CARD 9: safety -->
  <g transform="translate(522, 376)">
    <rect width="390" height="64" rx="10" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="64" rx="3" fill="#5C67DE"/>
    <rect x="16" y="12" width="56" height="18" rx="4" fill="#5C67DE"/>
    <text x="44" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">PHASE 08</text>
    <text x="82" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">safety</text>
    <text x="16" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Run 3 safety checkers (JS/Shell/Py) + Branch coverage ≥ 70%</text>
    <rect x="282" y="12" width="96" height="18" rx="9" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="330" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">Safety &amp; Cov</text>
  </g>

  <!-- Connector 9->10 (Going UP) -->
  <line x1="717" y1="376" x2="717" y2="340" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="717,340 712,348 722,348" fill="#8892E0"/>
  <rect x="618" y="346" width="198" height="18" rx="9" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="717" y="359" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">3 CHECKERS 0-EXIT + ≥70% COV</text>

  <!-- CARD 10: confirm_fix -->
  <g transform="translate(522, 276)">
    <rect width="390" height="64" rx="10" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="0" y="0" width="6" height="64" rx="3" fill="#7B86EE"/>
    <rect x="16" y="12" width="56" height="18" rx="4" fill="#7B86EE"/>
    <text x="44" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">PHASE 09</text>
    <text x="82" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">confirm_fix</text>
    <text x="16" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Operator reviews full evidence · Explicit affirmative approval</text>
    <rect x="282" y="12" width="96" height="18" rx="9" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="330" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">Human Sign-off</text>
  </g>

  <!-- Connector 10->11 (Going UP) -->
  <line x1="717" y1="276" x2="717" y2="240" stroke="#8892E0" stroke-width="2" stroke-dasharray="4,3"/>
  <polygon points="717,240 712,248 722,248" fill="#8892E0"/>
  <rect x="626" y="246" width="182" height="18" rx="9" fill="#2E378C" stroke="#7B86EE" stroke-width="1"/>
  <text x="717" y="259" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF" letter-spacing="0.5">OPERATOR CONFIRMS FIX ✓</text>

  <!-- CARD 11: done -->
  <g transform="translate(522, 176)">
    <rect width="390" height="64" rx="10" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <rect x="0" y="0" width="6" height="64" rx="3" fill="#FFFFFF"/>
    <rect x="16" y="12" width="56" height="18" rx="4" fill="#FFFFFF"/>
    <text x="44" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#0A0A0A" letter-spacing="0.8">PHASE 10</text>
    <text x="82" y="26" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">done</text>
    <text x="16" y="46" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Task completed · Authorized commit with #id · Update Project #4</text>
    <rect x="294" y="12" width="84" height="18" rx="9" fill="#1F1F1F" stroke="#444444" stroke-width="1"/>
    <text x="336" y="25" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="#C7CCF2">Committed</text>
  </g>

  <!-- Top Reset Connector (Done -> Idle) -->
  <path d="M 717 176 L 717 108 L 438 108" stroke="#8892E0" stroke-width="2.5" stroke-dasharray="4,3" fill="none"/>
  <polygon points="438,108 446,103 446,113" fill="#8892E0"/>
  <rect x="520" y="97" width="168" height="22" rx="11" fill="#0A0A0A" stroke="#5C67DE" stroke-width="1"/>
  <text x="604" y="112" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">RESET ACKNOWLEDGED</text>

  <!-- Legal Retry Backtracks (Red dashed paths in center) -->
  <!-- verify -> implement (RED/GREEN failure) -->
  <path d="M 522 508 C 470 508, 470 608, 522 608" stroke="#C85A5A" stroke-width="1.8" stroke-dasharray="4,3" fill="none"/>
  <polygon points="522,608 514,603 514,613" fill="#C85A5A"/>
  <rect x="444" y="549" width="70" height="16" rx="8" fill="#2E378C" stroke="#C85A5A" stroke-width="1"/>
  <text x="479" y="560" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="700" fill="#C85A5A">RETRY IMPL</text>

  <!-- safety -> verify -->
  <path d="M 522 408 C 470 408, 470 488, 522 488" stroke="#C85A5A" stroke-width="1.8" stroke-dasharray="4,3" fill="none"/>
  <polygon points="522,488 514,483 514,493" fill="#C85A5A"/>
  <rect x="440" y="441" width="76" height="16" rx="8" fill="#2E378C" stroke="#C85A5A" stroke-width="1"/>
  <text x="478" y="452" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="8" font-weight="700" fill="#C85A5A">RETRY VERIFY</text>

  <!-- Footer Contract Note -->
  <text x="480" y="756" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" opacity="0.8">lib/workflow.mjs · MANDATE_REJECT_REASONS · Schema v4 test_executions Provenance</text>
</svg>

---

## The 11 Canonical Phases

### 0. `idle`
The resting state and post-completion reset state.
* **Objective:** Clean operational state. Inquiries about project architecture or general questions are handled here.
* **Tool Constraints:** Free-form read tools available. Mutating actions (`Bash` running destructive commands, `Write`, `Edit`) are rejected by the idle safety guard.
* **Transition Forward:** Advances to `explore` when the user provides an objective and confirms SDLC initiation.

### 1. `explore`
Systematic, bounded repository survey.
* **Objective:** Discover existing modules, functions, and architecture contracts before planning any code changes.
* **Tool Constraints:** Strictly restricted to `Read`, `Glob`, and `Grep`. Mutating tools (`Write`, `Edit`, `Bash`, `NotebookEdit`) are blocked.
* **Exploration Guardrails:**
  * **Documentation-First Ordering:** Scans `docs/MAP.md`, root docs, and schema definitions before source files.
  * **Jev-Mem Hot Path:** If prior durable memory contains sufficient context, disk exploration is bypassed.
  * **Bounded Budget Ceiling:** Allows up to 20 productive requests. The 21st request is blocked, forcing a handoff to `diagnose`.
  * **Stagnation Detection:** Repeated identical reads or zero-hit queries trigger early exit to prevent loops.

### 2. `diagnose`
Root cause analysis and evidence documentation.
* **Objective:** Document the observed buggy or missing behavior, expected behavior, and evidenced cause before proposing any fix.
* **Tool Constraints:** Read-only analysis. No mutations permitted.
* **Gate Requirement:** The engine requires a substantive diagnosis record before advancing to issue creation.

### 3. `create_issue`
Issue binding and artifact creation.
* **Objective:** Associate the task with an explicit issue record (Project #4).
* **Execution:** Generates a structured Markdown artifact inside `.issues/` (capturing issue ID, title, observed behavior, diagnosis, and acceptance criteria) or binds to an existing GitHub issue number.
* **Tool Constraints:** Controlled issue creation. Production code cannot be touched.

### 4. `create_tests` (TDD RED Phase)
Independent behavioral test authoring and failure verification.
* **Objective:** Write a behavioral Given-When-Then regression test that fails against the current codebase, evidencing the bug or missing capability.
* **Tool Constraints:** Mutation is restricted strictly to test directories (`tests/**`, `test/**`). Production source code modifications are blocked.
* **Execution Provenance (RED Gate):**
  * The test runner must be executed via `Bash`.
  * The failure must be a genuine **assertion failure** (exit code $\ne 0$ from a recognized test runner like `node`, `pytest`, `bash`).
  * Syntax errors, module import failures, runner crashes, timeouts, or simulated failures are rejected by the gate.
  * The execution details (command, failure digest, input hashes, timing) are recorded in `test_executions` (schema v4).

### 5. `planning`
Concrete Plan Triad specification.
* **Objective:** Synthesize exploration and RED test evidence into a complete, file-by-file implementation plan.
* **Tool Constraints:** **Zero tools available.** The model must produce only structured text.
* **Plan Triad Structure:**
  1. **Files & Functions:** Exhaustive list of files to touch and existing functions to modify (no duplicates).
  2. **Categorized Behaviors:** Precise list of behaviors `CREATED`, `UPDATED`, or `REMOVED`.
  3. **Verification Matrix:** Given-When-Then mapping linking each behavioral change to test assertions.
* **Human Gate:** The plan is displayed to the operator: `"Approve this plan? [y/N]"`. Explicit affirmative operator confirmation is required. Missing input capability denies authorization.

### 6. `implement`
Targeted production code implementation.
* **Objective:** Apply the minimal approved edits to satisfy the failing test.
* **Tool Constraints:** All editing tools available (`Write`, `Edit`, `Bash`, etc.).
* **Epistemic Filter:** Implementation blocks in conversation history are filtered to prevent test-generation models from cheating during verification.
* **Gate Requirement:** Code edits must be committed to the working directory.

### 7. `verify` (TDD GREEN Phase)
Regression verification against current production code.
* **Objective:** Execute the **original, unchanged** regression test authored in Phase 04 against the freshly modified production code.
* **Gate Requirement (GREEN Gate):**
  * Must execute against the current production snapshot (`sourceSnapshot` SHA-256 validation).
  * If the test was altered during this phase, or if source files were changed after running the test, verification is invalidated.
  * Test runner must return exit code 0 (clean PASS).

### 8. `safety`
Static analysis, safety checkers, and branch coverage validation.
* **Objective:** Validate that no regressions, security violations, or untested branches were introduced.
* **Gate Requirements:**
  1. **Three Mandatory Safety Checkers:** All three must pass with exit code 0:
     * `node lib/scripts/js-safety-checker.cjs .` (JS/TS syntax and static integrity)
     * `bash lib/scripts/shell-safety-checker.sh .` (Shell script quoting, safety, and POSIX compliance)
     * `python3 lib/scripts/python-safety-checker.py .` (Python AST, type safety, and security checks)
  2. **Production Branch Coverage:** Changed production files must demonstrate measured branch coverage $\ge 70\%$. A zero exit code without qualifying branch coverage is rejected.

### 9. `confirm_fix`
Final human review and operator sign-off.
* **Objective:** Present the completed verification results, test outputs, safety checker status, and coverage metrics to the human operator.
* **Human Gate:** Requires affirmative operator confirmation. Rejection returns execution to the legal retry state (`safety` or `implement`).

### 10. `done`
Task completion, commit authorization, and reset.
* **Objective:** Commit the authorized changes with the bound issue reference in the commit message (e.g. `fix: align phase tool availability (#44)`), report actual Git outcomes, and update issue tracking.
* **Reset Transition:** The transition `done → idle` acknowledges session reset, clears transient exploration caches (`explore.mjs`), and retains durable Jev-Mem observations in SQLite.

---

## State Transition & Gating Matrix

Transitions are strictly validated by `canTransition()` and `MANDATE_REJECT_REASONS` (`lib/workflow.mjs`):

| Transition | Direction | Required Gate Evidence | Rejection Mandate |
|:---|:---:|:---|:---|
| `idle → explore` | Forward | Project context & user task submission | `AGENTS 1: Missing project context for exploration` |
| `explore → diagnose` | Forward | Completed exploration or 20-req budget ceiling | `AGENTS 1–2: Exploration incomplete or unbounded` |
| `diagnose → create_issue` | Forward | Documented root cause & expected behavior | `AGENTS 2–3: Diagnosis evidence missing` |
| `create_issue → create_tests` | Forward | Registered issue artifact under `.issues/` or GitHub #id | `AGENTS 3–4: Issue record required before tests` |
| `create_tests → planning` | Forward | Executed behavioral RED runner failure recorded in DB | `AGENTS 4–5: RED test evidence required before plan` |
| `planning → implement` | Forward | Approved Plan Triad + Prior RED + Human `[y/N]` gate | `AGENTS 5–7: Approved Plan Triad + prior RED required` |
| `implement → verify` | Forward | Implementation code applied to disk | `AGENTS 7: Implementation not accepted / missing code` |
| `verify → safety` | Forward | Original unchanged regression passes GREEN | `AGENTS 8: GREEN verification evidence required` |
| `safety → confirm_fix` | Forward | 3 safety checkers exit 0 + Branch coverage $\ge 70\%$ | `AGENTS 8–9: All 3 safety checkers + ≥70% coverage` |
| `confirm_fix → done` | Forward | Affirmative operator confirmation | `AGENTS 9–10: Operator did not confirm fix` |
| `done → idle` | Forward | Session reset acknowledgment | `AGENTS 10: Session reset unacknowledged` |
| `verify → implement` | Retry | Failing regression (GREEN failure) | Legal retry edge on broken fix |
| `safety → verify` | Retry | Checker failure or coverage $< 70\%$ | Legal retry edge on failed checker |
| `confirm_fix → safety` | Retry | Operator requests additional verification | Legal retry edge on operator revision |
| `planning → create_tests` | Retry | Flawed plan or missing test coverage | Legal retry edge on plan revision |
| `diagnose → explore` | Retry | Insufficient discovery evidence | Legal retry edge for further exploration |

---

## Tool Availability by Phase

Tools are strictly masked at the orchestrator boundary (`filterToolsByPhase` in `lib/orchestrate.mjs`) and the execution boundary (`lib/tools.mjs`). A model attempt to call an unauthorized tool is intercepted and returned as an error result:

```
Tool Write is not available in explore phase. Use Read, Glob, or Grep to gather evidence and let the SDLC harness own phase transitions.
```

| Phase | Read, Glob, Grep | Write, Edit, NotebookEdit | Bash | WebFetch, WebSearch | Notes |
|:---|:---:|:---:|:---:|:---:|:---|
| `idle` | Allowed | Ask / Gated | Refused if mutating | Allowed | Free-form exploration mode |
| `explore` | **Allowed** | **Denied** | **Denied** | Allowed | Strictly read-only exploration |
| `diagnose` | Allowed | **Denied** | **Denied** | Allowed | Evidence synthesis |
| `create_issue` | Allowed | Issue files only | **Denied** | Allowed | Writes restricted to `.issues/` |
| `create_tests` | Allowed | **Test files only** | **Allowed** (Test runner) | Allowed | Production source code edits denied |
| `planning` | **Denied** | **Denied** | **Denied** | **Denied** | Zero tools; structured text only |
| `implement` | Allowed | **Allowed** | Allowed | Allowed | Production implementation |
| `verify` | Allowed | **Denied** | **Allowed** (Test runner) | Allowed | No source or test changes allowed |
| `safety` | Allowed | **Denied** | **Allowed** (Checkers) | Allowed | Automated checker scripts only |
| `confirm_fix` | Allowed | **Denied** | **Denied** | Allowed | Human review |
| `done` | Allowed | **Denied** | **Allowed** (Git commit) | Allowed | Commit and push only |

---

## Epistemic Filter

During test creation and verification, an epistemic filter (`applyEpistemicFilter` in `lib/transcript.mjs`) redacts implementation details (such as `SEARCH/REPLACE` blocks and diff payloads) from the context provided to the model:

```
[implementation details redacted for epistemic isolation]
```

This prevents the model from generating tests that merely mirror implementation quirks, ensuring test assertions evaluate genuine behavioral requirements rather than reverse-engineering the code.
