---
title: "OODA & System Design Philosophy"
layout: default
nav_order: 4
---

# OODA & System Design Philosophy
{: .fs-8 }

Why system-level OODA prompting is essential for reliable technical workflows.
{: .fs-6 .fw-300 }

---

## The Problem with General AI Models

### Agreeableness Over Accuracy
{: .fs-6 }

General-purpose models like ChatGPT and Claude are optimized for **user satisfaction**, not technical correctness. This creates fundamental issues:

**🤝 The Agreeableness Problem:**
- Models prioritize appearing helpful over being correct
- They'll confidently generate plausible-sounding but incorrect solutions
- They rarely push back or question flawed premises
- They avoid admitting uncertainty or knowledge gaps

**❌ Reality Testing Failures:**
```bash
# Example: User asks for impossible task
User: "Generate terraform to deploy Lambda to on-premises server"
ChatGPT: "Here's terraform code to deploy Lambda on-premises..." 
# (Proceeds to generate nonsense - Lambda only runs on AWS)

# With OODA system prompt:
Ona Terminal: "OBSERVE: Lambda is AWS-only service. 
            ORIENT: Request conflicts with Lambda constraints.
            DECIDE: Suggest alternatives (containers, OpenFaaS).
            ACT: Provide correct on-premises serverless options."
```

### Why Technical Workflows Fail
{: .fs-6 }

**🎯 One-Shot Accuracy Problem:**
- General models can't reliably produce correct technical solutions first try
- They lack systematic verification steps
- No built-in reality checks or constraint validation
- Optimized for conversation, not execution

**📊 Real-World Failure Rates:**
- Infrastructure-as-Code: 65-80% require significant fixes
- Complex SQL queries: 70-85% have logical errors
- System architecture: 80-90% violate best practices
- Production scripts: 75-85% miss edge cases

---

## The OODA Solution

### Enforced Systematic Thinking
{: .fs-6 }

OODA (Observe-Orient-Decide-Act) forces models to:

1. **OBSERVE** - Gather actual facts before responding
2. **ORIENT** - Analyze constraints and context
3. **DECIDE** - Evaluate options against reality
4. **ACT** - Execute with verification steps

### System Prompt Architecture
{: .fs-6 }

```markdown
# OODA System Prompt Structure (from ooda.md)

## Output Contract (strict order; missing/extra/out-of-order = invalid)
<requirements>Task in your words; assumptions & unknowns.</requirements>
<observe>What you checked, what's available vs missing, anomalies found (≤6 bullets).</observe>
<orient>Concise analysis; exactly 2 material risks/limitations and how to test/mitigate them.</orient>
<decide>Recommended plan (≤6 steps) with success criteria (quantified). Note options considered.</decide>
<act>"PENDING-APPROVAL" or executed steps + results summary.</act>
<checklist>{"Followed_SOP":true,"Avoided_Sycophancy":true,"Citations":["doc|status|inference"],"Confidence":0.0-1.0}</checklist>

## OODA Rules
1) Follow OBSERVE → ORIENT → DECIDE → (await user approval) → ACT.
2) Create artifacts: insights-YYYYMMDD_HHMMSSZ.md and plan-YYYYMMDD_HHMMSSZ.md
3) After plan creation, prompt: "Proceed / Modify / Alternate / More analysis?" and wait.

¤¤IMMUTABLE¤¤ FINAL ORDER: requirements → observe → orient → decide → act → checklist. 
Two risks required. Missing/out-of-order tags → invalid; regenerate. ¤¤END¤¤
```

### Why System-Level Enforcement
{: .fs-6 }

**🔒 Can't Be Overridden:**
- User prompts can't bypass OODA structure
- Every response must complete all phases
- Prevents "helpful" but wrong answers

**🎯 Creates Accountability:**
- Each phase produces auditable artifacts
- Decisions are traceable and explainable
- Failures can be debugged systematically

---

## The Case for Domain-Specific Models

### Industry-Specific Success Stories
{: .fs-6 }

**BloombergGPT: Finance Domain Mastery**
- **50B parameter model** trained on 363B tokens of financial data
- **Outperforms GPT-3** by 50-70% on financial NLP tasks
- **Superior at**: sentiment analysis, named entity recognition, news classification
- **Key insight**: Domain-specific training beats general intelligence

**Med-PaLM 2: Medical Expertise**
- Scores **85%+ on USMLE** (medical licensing exam)
- General models score 50-60% on same tests
- **Critical difference**: Trained on medical literature, not Reddit

**CodeLlama: Programming Proficiency**
- **2-3x better** at code generation than general Llama
- Understands language-specific idioms and patterns
- **Lesson**: Specialization trumps size

### Why Specialization Wins
{: .fs-6 }

**1. Correct Terminology**
- BloombergGPT knows "basis points" vs "percentage points"
- General models confuse technical terms
- Domain models understand context-specific meanings

**2. Industry Constraints**
- Financial models understand regulatory requirements
- Medical models know FDA approval processes
- Infrastructure models respect cloud service limits

**3. Professional Standards**
- Legal models cite actual statutes
- Engineering models follow safety standards
- Accounting models apply GAAP principles

---

## The Benchmark Problem

### Why LLM Benchmarks Mislead
{: .fs-6 }

**Popular Benchmarks Test Wrong Things:**

**MMLU (Massive Multitask Language Understanding)**
- Tests: General knowledge trivia
- Reality: Professionals need domain expertise, not trivia
- Example: Knowing capital cities ≠ designing distributed systems

**HumanEval (Code Generation)**
- Tests: Toy programming problems
- Reality: Production code requires architecture, not algorithms
- Example: Solving fizzbuzz ≠ building scalable microservices

**HellaSwag (Common Sense)**
- Tests: Predicting story endings
- Reality: Technical work needs precision, not creativity
- Example: Guessing plot twists ≠ troubleshooting infrastructure

### Real Professional Requirements
{: .fs-6 }

**What Benchmarks Miss:**

| Benchmark Tests | Professional Reality |
|-----------------|---------------------|
| General knowledge | Domain-specific expertise |
| Creative writing | Technical documentation |
| Riddle solving | Constraint satisfaction |
| Story completion | Step-by-step procedures |
| Opinion generation | Factual accuracy |

### The Expertise Gap
{: .fs-6 }

**GPT-4 vs Domain Expert:**
```
Task: "Optimize solar panel string configuration"

GPT-4: Generates plausible but suboptimal layout
- Missing: Temperature derating calculations
- Ignoring: Module-specific voltage windows
- Assuming: Simplified shading models

Domain Model: Applies industry-standard methods
- Uses: PVsyst shading algorithms
- Considers: String voltage at temperature extremes
- Optimizes: For specific inverter MPPT ranges
```

**Result**: GPT-4's solution looks good but loses 15-20% annual yield

---

## Design Principles

### 1. Reality First
{: .fs-6 }

- Technical constraints are non-negotiable
- Physical laws and API limits must be respected
- "It depends" is often the right answer

### 2. Verification Over Generation
{: .fs-6 }

- Every output must be testable
- Include validation steps in responses
- Admit uncertainty rather than guess

### 3. Context Over Compliance
{: .fs-6 }

- Understanding why matters more than following instructions
- Push back on impossible or harmful requests
- Explain limitations and alternatives

### 4. Systematic Over Spontaneous
{: .fs-6 }

- Structured thinking prevents errors
- Checklists and phases ensure completeness
- Reproducible reasoning enables debugging

---

## OODA as System-Level Design

### The System Prompt Concept
{: .fs-6 }

OODA works best when enforced at the **system level** - built into the AI's foundational instructions rather than requested by users.

**Why System-Level Enforcement Matters:**
- Users can't accidentally bypass systematic thinking
- Consistent methodology across all interactions
- Forces models to verify constraints before responding
- Creates auditable decision trails

### Customizing OODA for Your Domain
{: .fs-6 }

The OODA framework can be adapted for different professional contexts by modifying the system prompt in your CLAUDE.md file:

**Security Analysis OODA:**
```
OBSERVE: Identify attack surface, assets, current controls
ORIENT: Analyze threat landscape and risk vectors  
DECIDE: Prioritize mitigations by risk reduction
ACT: Implement layered defenses with monitoring
```

**Financial Planning OODA:**
```
OBSERVE: Gather market conditions, constraints, goals
ORIENT: Apply financial models and regulatory requirements
DECIDE: Optimize portfolio allocation and risk management
ACT: Execute with position monitoring and compliance
```

**Infrastructure Design OODA:**
```
OBSERVE: Assess requirements, existing systems, constraints
ORIENT: Apply architectural patterns and best practices
DECIDE: Select optimal design balancing cost/performance
ACT: Provide complete specifications with monitoring
```

### Implementation in CLAUDE.md
{: .fs-6 }

Add domain-specific OODA to your project's CLAUDE.md system prompt to enforce the methodology across all interactions.

---

## Why This Matters

### The Stakes Are High
{: .fs-6 }

In technical workflows, wrong answers aren't just unhelpful—they're dangerous:

- **Infrastructure**: Misconfigurations cause outages and security breaches
- **Financial Systems**: Calculation errors lead to monetary losses
- **Industrial Control**: Incorrect parameters damage equipment
- **Healthcare**: Wrong dosage calculations harm patients

### OODA Creates Trust
{: .fs-6 }

By enforcing systematic thinking:
- **Predictable**: Same approach every time
- **Auditable**: Clear reasoning trail
- **Correctable**: Errors traceable to specific phases
- **Learnable**: Patterns improve over time

---

## Next Steps

1. **[See OODA in Action](om-use-case.html)** - Real implementation example
2. **[Configure Your System](loading-models.html)** - Add OODA to your models
3. **[Build Custom Agents](interactive-exploration.html#agentic-workflow)** - Create OODA-compliant agents

[Implement OODA System](developers.html){: .btn .btn-primary }

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
      <a href="https://discord.gg/nNV5evcr" target="_blank" class="support-button" style="margin-top: 10px; display: inline-block;">
        <svg width="16" height="16" style="margin-right: 8px; vertical-align: middle;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Join Our Discord
      </a>
    </div>
  </div>
  
  <div class="end-column">
    <div id="mc_embed_shell">
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
      <style type="text/css">
        #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 100%;}
      </style>
      <div id="mc_embed_signup">
        <form action="https://asoba.us10.list-manage.com/subscribe/post?u=459ea321d7831d7b9f5fac70f&amp;id=e03a70f492&amp;f_id=000a9ae3f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
          <div id="mc_embed_signup_scroll">
            <h3>Subscribe to Updates</h3>
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            <div class="mc-field-group"><label for="mce-FNAME">First Name </label><input type="text" name="FNAME" class=" text" id="mce-FNAME" value=""></div>
            <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" value="" required=""></div>
            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style="display: none;"></div>
              <div class="response" id="mce-success-response" style="display: none;"></div>
            </div>
            <div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_459ea321d7831d7b9f5fac70f_e03a70f492" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe"></div>
          </div>
        </form>
      </div>
      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
      <script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[1]='FNAME';ftypes[1]='text';fnames[0]='EMAIL';ftypes[0]='email';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[6]='COMPANY';ftypes[6]='text';fnames[7]='MMERGE7';ftypes[7]='url';fnames[8]='MMERGE8';ftypes[8]='text';fnames[9]='MMERGE9';ftypes[9]='text';fnames[10]='MMERGE10';ftypes[10]='text';fnames[11]='MMERGE11';ftypes[11]='url';fnames[12]='MMERGE12';ftypes[12]='text';fnames[13]='MMERGE13';ftypes[13]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    </div>
  </div>
</div>