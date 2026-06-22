---
theme: ../../themes/github
title: "Copilot Dev Foundations"
info: |
  Generated from NotebookLM presentation for copilot-dev-foundations
ghFooterTitle: "Copilot Dev Foundations"
ghFooterLabel: ""
drawings:
  persist: false
transition: slide-left
mdc: true
layout: image-full
background: /images/copilot-dev-foundations/slide-01-946a6311.png
---

<!-- Welcome and frame the module. This Foundations workshop introduces the core Copilot mental model before agentic scaling. The module starts with surfaces and trust boundaries, then moves into interaction modes, CLI operating controls, tokenomics, model routing, and context quality. It incorporates current platform capabilities such as `/chronicle`, auto model selection, configurable reasoning/context levels, and billing-aware usage choices. It closes with autonomy controls, governance boundaries, and AI-assisted development harness practices so learners leave with a safe, repeatable operating model for daily use. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-02-479ca7bf.png
---

<!-- Section: Foundations Baseline: Surfaces, Trust, and Interaction Fundamentals (24 min). Slide topic (1 slide): Where GitHub Copilot lives — Copilot spans IDEs, CLI workflows, and GitHub.com experiences through the Copilot App, letting developers move between coding, automation, and repository-level understanding with more consistent workflows across surfaces. AI Safety Moment: confirm org policy and access boundaries before using cloud or cross-repo context. Slide topic (1 slide): Enterprise privacy and IP — Business and Enterprise controls include policy-driven content boundaries, auditability, and configurable feature access, so teams can align usage with compliance and IP expectations. AI Safety Moment: frame all generated output as draft material requiring human review. Slide topic (1 slide): Inline chat and code completions — Completions accelerate flow authoring while inline chat supports scoped transformations such as refactors and type changes, giving two complementary interaction patterns for day-to-day work. Usage Optimization: choose completions for low-token flow edits and inline chat for bounded transformations. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-03-4a37cbcc.png
---

<!-- Slide topic (1 slide): Baseline operating posture — safe, effective GH Copilot usage starts with least-autonomy defaults, scoped prompts, and explicit acceptance criteria that keep accountability with human reviewers. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-04-6bfff0c1.png
---

<!-- Use this slide to anchor Copilot adoption in enterprise trust, not just individual productivity. The key message is that Business and Enterprise controls give teams a way to set policy boundaries, manage feature availability, and keep auditability aligned with compliance expectations. AI Safety Moment: remind learners that privacy controls do not remove human accountability; every suggestion still needs review for correctness, licensing fit, and sensitive-data exposure. Transition by connecting trust boundaries to the everyday interaction patterns developers will use inside the editor. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-05-1d79cb3c.png
---

<!-- Frame completions and inline chat as two different tools for staying in flow. Completions are best when the developer already knows the direction and wants lightweight help filling in code, while inline chat is better for scoped transformations such as refactoring, adding types, or explaining a selected block. Usage Optimization: choosing the smallest interaction that can solve the task keeps token use low and reduces noisy context. This sets up the first lab, where learners practice selecting the right surface and mode before increasing autonomy. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-06-3180e4d6.png
---

<!-- Section: Guided Workflows: VS Code Chat, CLI Controls, and Mode Selection (30 min). Slide topic (1 slide): VS Code chat extension mechanics — slash commands, participants, and # references give precise control over context and intent, with #selection/#file as preferred starting scopes for most tasks. Usage Optimization: scope tightly before expanding to workspace-wide reasoning. Slide topic (1 slide): Copilot CLI orientation and control plane — terminal-first workflows support command generation, explanation, and iterative execution for scripting and operational tasks where concise, actionable output matters. Include /settings as the unified configuration surface and /security-review as a pre-commit security check for local changes. AI Safety Moment: generated commands must be reviewed before execution. Slide topic (1 slide): Agents — built-in agents in GitHub Copilot include Plan and Agent experiences that move from structured change planning to iterative execution loops. This slide should focus on when to use Plan for reviewed change proposals versus Agent for multi-step delegated work. AI Safety Moment: higher-autonomy agent use requires stronger approval gates. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-07-9296a761.png
---

<!-- Slide topic (1 slide): Governance controls for safer execution — introduce enterprise and organization controls that reduce accidental risk, including managed settings that can disable auto-approval/bypass behavior and content exclusion boundaries for code review and agent context. AI Safety Moment: align local behavior with org policy before enabling higher autonomy. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-08-2a48ce39.png
---

<!-- Use this slide to compare the guided workflow modes learners will use most often: Ask for understanding, Plan for reviewed change proposals, and Agent for delegated multi-step execution. Emphasize that mode selection is a safety and quality decision, not just a convenience choice. AI Safety Moment: the more autonomy we grant, the more explicit the approval gates, scope limits, and rollback expectations need to be. Transition from mode selection into the discipline that makes all modes perform better: clear prompts and bounded context. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-09-cc59952b.png
---

<!-- This slide ties prompt discipline to both quality and cost. When we state the goal, constraints, files, and acceptance criteria clearly, Copilot spends less effort guessing and we spend less time correcting drift. Usage Optimization: better prompt contracts lower latency, reduce retries, and preserve AIC by avoiding broad context when a focused reference will do. Introduce `/chronicle` as the handoff and restart tool that captures decisions, changed files, commands, open threads, and reusable cost-saving tips before the session context gets stale. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-10-3e8e62a6.png
---

<!-- Section: Tokenomics, Billing Controls, and Model-Routing Decisions (30 min). Slide topic (1 slide): Tokenomics — tokens represent prompt/input/output context across active and cached paths, so context size directly affects cost and quality stability. Usage Optimization: trim noise before sending context. Slide topic (1 slide): AIC usage model and budget controls — AIC (AI Consumption) maps spend to measured token and model usage (input, output, and cached tokens with model-specific rates), making model choice, prompt size, and loop depth first-class engineering tradeoffs. Add user-level budgets and plan limits as practical guardrails teams should set before scaling usage. Usage Optimization: treat AIC telemetry as workflow tuning feedback. Slide topic (1 slide): Billing implications of workflow choices — usage-based billing is now central to day-to-day decisions, and some workflows (for example Copilot code review) can consume both AI credits and GitHub Actions minutes. Teach learners to treat feature choice as a cost decision, not only a UX decision. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-11-e87466a7.png
---

<!-- Slide topic (1 slide): Usage visibility and measurement — session and monthly usage views expose hidden inefficiencies such as broad prompts and repetitive retries. Usage Optimization: use regular usage reviews to prevent avoidable overages. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-12-8f6a9acf.png
---

<!-- Bring the discussion from raw usage numbers into model-routing decisions. Fast models are a good fit for straightforward edits, summaries, and local explanations, while reasoning-heavy models earn their cost on ambiguous debugging, architecture tradeoffs, and multi-step planning. Usage Optimization: Auto mode is a practical default because it can route many tasks efficiently without asking the learner to overthink every model choice. The habit we want is intentional escalation: start with the right-sized capability, then move up only when complexity justifies it. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-13-86c8815f.png
---

<!-- This slide is about knowing when bigger context and deeper reasoning help, and when they simply make the session more expensive. Larger windows can be valuable for cross-file changes, architecture review, or complex debugging, but they also increase the chance that irrelevant history and stale assumptions influence the answer. Usage Optimization: reset, summarize, or re-scope before escalating context and reasoning settings so the model receives signal rather than accumulated noise. Close by reinforcing the rubber-duck pattern: explaining the problem clearly often eliminates unnecessary tool calls, retries, and model upgrades. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-14-358c0a11.png
---

<!-- Section: Context Windows, Autonomy Spectrum, and AI Development Harness (20 min). Slide topic (1 slide): Context window anatomy — context windows combine instructions, history, references, and outputs, and degrade when sessions accumulate noise and compaction artifacts. Usage Optimization: reset or re-scope when context rot appears. Slide topic (1 slide): Autonomy spectrum and delegation permissions — autonomy should scale with reversibility and blast radius, from suggestion-only support to iterative execution loops. AI Safety Moment: high-impact tasks require explicit approvals and narrow permissions. Slide topic (1 slide): Secure execution environments and discovery — introduce local/cloud sandboxes, Copilot app execution contexts, and agent/resource discovery patterns as mechanisms to scale capability without sacrificing control. AI Safety Moment: isolate execution and enforce policy before broad tool access. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-15-0027fa13.png
---

<!-- Slide topic (1 slide): Memory and policy boundaries — distinguish user-level preferences from repository-level facts and reinforce admin-controlled governance boundaries for what can be stored, reused, exported, or excluded. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-16-f6075c95.png
---

<!-- Use this slide to introduce autonomy as a spectrum rather than a switch. Suggestion-only support is appropriate for high-uncertainty or high-impact work, while delegated execution is safest when the task is reversible, well-scoped, and backed by tests or review gates. AI Safety Moment: permissions should scale with blast radius, so destructive commands, broad file edits, and production-facing changes require explicit approval and narrow constraints. Transition into the environments and discovery mechanisms that let teams scale capability without turning every session into an unrestricted agent run. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-17-de4de600.png
---

<!-- Frame secure execution environments as the bridge between productivity and control. Local and cloud contexts can both be useful, but each needs clear boundaries around available tools, repository access, secrets, network reach, and policy enforcement. AI Safety Moment: isolate execution before broadening tool access, and treat agent/resource discovery as something governed rather than something enabled by default. This prepares learners for the harness concept, where repeatable constraints and validation become the default way to work with AI assistance. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-18-bc11a0c3.png
---

<!-- Section: Wrap-up and Module 2 Handoff (16 min). Slide topic (1 slide): Foundations outcome baseline — this module sets default operating behaviors for trust, quality, and cost-aware execution across IDE, CLI, and cloud surfaces. Slide topic (1 slide): Consistency over ad hoc prompting — strong outcomes come from mode discipline, context hygiene, explicit acceptance criteria, and budget-aware defaults instead of improvisation. Slide topic (1 slide): Transition to Module 2 — Agentic builds on this baseline with instruction layering, memory strategy, tool orchestration, and repeatable autonomous control loops. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-19-f6e6fbe8.png
---

<!-- Summarize the baseline learners should now be able to carry into daily work. Copilot is not one feature or one chat box; it is a set of surfaces, modes, policies, and cost choices that need a consistent operating posture. The outcome of this module is a safer default: scope the task, choose the least autonomy that fits, review generated output, and measure usage when workflows repeat. Transition from the recap into the behavior change that matters most after class: consistency over ad hoc prompting. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-20-1a122c0d.png
---

<!-- This slide is the reminder that reliable Copilot outcomes come from repeatable habits, not clever one-off prompts. Mode discipline, context hygiene, acceptance criteria, and budget-aware defaults create a shared team practice that is easier to review and improve. Usage Optimization: consistent prompt patterns and scoped references reduce retry loops, make `/chronicle` summaries more useful, and help teams spot where spend is actually improving delivery. Use this as the final checkpoint before handing learners into the more autonomous patterns in Module 2. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-21-6f2f249d.png
---

<!-- Close by positioning Module 2 as an expansion, not a reset. The foundations from this session—trust boundaries, scoped context, mode selection, usage awareness, and human review—become the guardrails for agentic workflows. In the next module, learners will layer instructions, memory strategy, tool orchestration, and repeatable control loops on top of this baseline. Encourage them to bring one workflow from today that they want to make more repeatable, because that will become the raw material for safe delegation. -->
