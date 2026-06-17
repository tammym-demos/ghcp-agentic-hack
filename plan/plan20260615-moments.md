# AI Safety vs Usage Optimization Callouts — plan20260615

## Foundations

- **Where GitHub Copilot Lives (IDE and Cloud, including GitHub Copilot App)** — **AI Safety Moment**: Emphasize that each Copilot surface can expose different repository context, so learners should confirm org policies, content exclusion settings, and access boundaries before using cloud or IDE chat on sensitive code.
- **Look Around VS Code Chat Extension (Key Features — Slash Commands, File References)** — **Usage Optimization**: Teach precise scoping with `#file`, `#selection`, and targeted slash commands to reduce unnecessary context tokens and improve response quality in fewer turns.
- **Look Around Copilot CLI (Installation URL and Key Features)** — **AI Safety Moment**: Highlight terminal risk by requiring command review before execution, especially for generated commands that can modify files, install packages, or perform destructive operations.
- **Enterprise Privacy and IP** — **AI Safety Moment**: Frame this as the anchor safety segment covering data handling, retention boundaries, duplicate detection, and admin governance controls to prevent accidental IP leakage.
- **Inline Chat and Code Completions** — **Usage Optimization**: Show when to use completions for low-token flow work and inline chat for scoped edits so developers avoid expensive broad prompts for simple transformations.
- **Modes: Ask, Plan, and Agent** — **AI Safety Moment**: Position mode selection as a risk control where higher-autonomy modes require tighter human approval gates and explicit permission boundaries.
- **What Is a Token? (Input, Output, Cache — Token Economics)** — **Usage Optimization**: Use this topic to teach token-aware prompting, including context trimming, reuse of cached context, and avoiding full-file dumps when only a function is needed.
- **What Is an AIC? New Usage Billing (PRUs to AICs)** — **Usage Optimization**: Connect model choice and workflow style directly to AIC spend so participants can intentionally trade off speed, quality, and cost.
- **How Do I Know My Usage for My Session and/or Accumulated for the Month?** — **Usage Optimization**: Introduce a practical habit of checking session and monthly usage dashboards to catch waste patterns early and tune prompts before overages occur.
- **What Is a Model? (Model Routing Guide — How to Choose a Model) / Rubber Duck** — **Usage Optimization**: Teach routing simple tasks to cheaper/faster models and reserving higher-cost reasoning models for complex architecture or debugging decisions.
- **Anatomy of the Context Window (Including Compaction and Context Rot)** — **Usage Optimization**: Show how managing conversation length and starting fresh threads prevents context rot and lowers token burn from repeated re-grounding.
- **Autonomy Spectrum and Delegating Permissions** — **AI Safety Moment**: Make this a governance checkpoint where autonomy is granted by reversibility and impact, with stricter controls for production, secrets, and high-blast-radius tasks.
- **What Is a Custom Agent?** — **AI Safety Moment**: Stress least-privilege design for custom agents so tool access, scope, and instructions constrain behavior to intended domains only.

## Intermediate

- **Instructions** — **AI Safety Moment**: Use instructions to encode non-negotiable guardrails (no secret exposure, required review gates, allowed tools) so safe behavior is default rather than optional.
- **Memory** — **AI Safety Moment**: Clarify what should and should not be stored in memory, with explicit guidance to avoid persisting sensitive or regulated data.
- **Context Hierarchy: Memory vs Instructions** — **AI Safety Moment**: Teach precedence so durable policy in instructions reliably overrides conflicting remembered preferences.
- **Anatomy of a Strong Prompt (Task, Scope, Constraints, Definition of Done, Off-Ramp)** — **Usage Optimization**: A structured prompt reduces retries and clarification loops, cutting both elapsed time and AIC consumption.
- **What Is an Agent?** — **AI Safety Moment**: Define agents as action-capable systems that require oversight, explicit stop conditions, and escalation paths when confidence is low.
- **What Is a Skill?** — **AI Safety Moment**: Position skills as privileged capabilities and require trust review before enabling tools that can reach external systems or mutate critical assets.
- **When to Use One or the Other?** — **Usage Optimization**: Provide a decision matrix that maps task complexity to Ask/Plan/Agent to avoid overusing expensive autonomous flows for simple tasks.
- **The Anatomy of an Agentic Loop** — **Usage Optimization**: Emphasize shorter, well-bounded loops with clear termination criteria to avoid runaway iterations that consume tokens without improving outcomes.
- **What Are Tools? When to Use a Tool?** — **AI Safety Moment**: Treat tool invocation as a control point where high-risk tools require confirmation, logging, and constrained parameters.
- **Background & Cloud Agents — When to Use** — **Usage Optimization**: Recommend background or cloud execution only for genuinely long-running, parallelizable work so teams avoid idle waiting costs in interactive sessions.
- **Boilerplate with /init** — **Usage Optimization**: Standardized scaffolding reduces repeated prompting and rework, improving consistency while lowering total generation spend.
- **The Instruction Layering Stack** — **AI Safety Moment**: Use layered instructions to codify policy at org and repo levels so local prompt variance cannot bypass required safeguards.
- **Optimization Controls — Best Practices for Safe and Efficient AI Workflows** — **Usage Optimization**: Make this the capstone optimization segment with concrete controls for model routing, context budgeting, and validation cadence.

## Advanced

- **Multiagents (What Are They and When You Should Use Them) / Brady Gaster's Squad** — **AI Safety Moment**: Multiagent orchestration needs explicit ownership, boundaries, and merge controls to prevent conflicting or unsafe parallel edits.
- **Awesome Copilot List** — **AI Safety Moment**: Curated resources should be vetted for source credibility and enterprise compatibility before adoption into team workflows.
- **Subagents** — **AI Safety Moment**: Require scoped prompts and minimal permissions per subagent to reduce unintended side effects and preserve auditability.
- **Fleet** — **Usage Optimization**: Fleet execution should be reserved for high-volume independent tasks where parallelism produces net AIC and time savings versus sequential work.
- **Hooks** — **AI Safety Moment**: Present hooks as enforceable guardrails for policy checks, secret scanning, and mandatory validation before changes are accepted.
- **Extension Marketplace** — **AI Safety Moment**: Reinforce extension due diligence around publisher trust, permissions, and data access before enabling in enterprise environments.
- **MCP (Model Context Protocol)** — **AI Safety Moment**: Treat MCP server onboarding as a security review event with authentication, authorization, and data-scope controls.
- **API/CLI** — **AI Safety Moment**: Programmatic interfaces can scale mistakes quickly, so require least-privilege tokens, audit trails, and environment segregation.
- **Plugins** — **AI Safety Moment**: Plugin power should be balanced with signing, version governance, and controlled rollout to limit supply-chain and behavior risk.
- **Debugging Chat and Agents** — **Usage Optimization**: Teach lightweight diagnostic workflows (minimal repro prompts, narrowed context) to resolve failures without expensive trial-and-error loops.
- **Deploying Your Agents (GitHub Repo, Marketplace, Agent Package Manager)** — **AI Safety Moment**: Deployment should include policy compliance, permission review, and provenance checks before wider distribution.
- **Preparing for Day 2 Hack** — **Usage Optimization**: Encourage teams to predefine scope, model strategy, and success criteria so hack time is spent building rather than burning tokens on setup churn.

*Planning companion document for AI safety and AIC usage optimization callouts by topic.*
