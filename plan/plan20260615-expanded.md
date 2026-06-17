# Expanded Curriculum Plan — June 15, 2025

## Foundations

### Where GitHub Copilot Lives (IDE and Cloud, including GitHub Copilot App)

GitHub Copilot is not a single product confined to one environment — it is an AI platform that spans multiple surfaces. In the IDE (VS Code, JetBrains, Neovim, Xcode), Copilot provides inline completions, chat panels, and agent mode directly in your coding workflow. In the cloud, Copilot powers GitHub.com features like pull request summaries, code review suggestions, and issue triage through the GitHub Copilot App. The GitHub Copilot App also enables natural-language interactions on GitHub.com itself (Copilot Chat on github.com), letting you ask questions about repositories, explain code, and generate suggestions without ever opening an editor. Understanding that Copilot operates across IDE, CLI, and cloud surfaces is essential to leveraging its full capabilities.

> **AI Safety Moment**: Emphasize that each Copilot surface can expose different repository context, so learners should confirm org policies, content exclusion settings, and access boundaries before using cloud or IDE chat on sensitive code.

### Look Around VS Code Chat Extension (Key Features — Slash Commands, File References)

The VS Code Copilot Chat extension is the primary interactive surface for developers working in their editor. Key features include slash commands (`/explain`, `/fix`, `/tests`, `/doc`) that provide shortcut actions for common tasks, and file references (`#file`, `#selection`, `#editor`) that let you precisely scope what context Copilot receives. The `@workspace` participant indexes your entire workspace for broader questions, while `#codebase` provides semantic search over your project. Participants like `@terminal` and `@vscode` extend Copilot's reach into shell commands and editor settings. Mastering these interaction patterns — slash commands for quick actions, `#` references for context, and `@` participants for domain expertise — is the foundation of effective Copilot usage in VS Code.

> **Usage Optimization**: Teach precise scoping with `#file`, `#selection`, and targeted slash commands to reduce unnecessary context tokens and improve response quality in fewer turns.

### Look Around Copilot CLI (Installation URL and Key Features)

GitHub Copilot CLI (`@anthropic/claude-code` or `gh copilot` via the GitHub CLI extension) brings AI assistance directly to the terminal. Installation is straightforward via `gh extension install github/gh-copilot` for the GitHub CLI extension, or via npm/brew for standalone CLI agents. Key features include natural-language command generation (`gh copilot suggest`), command explanation (`gh copilot explain`), and full agentic workflows where the CLI can read files, run commands, make edits, and iterate autonomously. The CLI is particularly powerful for automation, scripting, CI/CD workflows, and developers who prefer terminal-first workflows over GUI interactions.

> **AI Safety Moment**: Highlight terminal risk by requiring command review before execution, especially for generated commands that can modify files, install packages, or perform destructive operations.

### Enterprise Privacy and IP

GitHub Copilot for Business and Enterprise includes critical privacy and intellectual property protections that make it suitable for corporate environments. Code snippets sent to the model are not retained or used for training — inputs and outputs are discarded after the response is generated. A duplicate detection filter blocks suggestions that match public code verbatim, reducing IP risk. Enterprise administrators get centralized policy controls including content exclusion rules (to block specific files or repositories from being sent to Copilot), audit logs for compliance, and the ability to enable or disable features at the organization level. These guardrails ensure that proprietary code remains private and that organizations maintain control over how AI interacts with their intellectual property.

> **AI Safety Moment**: Frame this as the anchor safety segment covering data handling, retention boundaries, duplicate detection, and admin governance controls to prevent accidental IP leakage.

### Inline Chat and Code Completions

Inline code completions are Copilot's most familiar feature — as you type, ghost text suggestions appear that you can accept with Tab. These completions use the surrounding code context (open files, imports, function signatures) to predict what you'll write next, ranging from single-line completions to multi-line blocks. Inline chat (`Ctrl+I` / `Cmd+I`) provides a complementary workflow where you can select code and give natural-language instructions to transform it in place — refactor a function, add error handling, convert types, or generate implementations from comments. Together, completions handle the "flow state" of writing code while inline chat handles targeted transformations, giving developers two distinct interaction modes optimized for different tasks.

> **Usage Optimization**: Show when to use completions for low-token flow work and inline chat for scoped edits so developers avoid expensive broad prompts for simple transformations.

### Modes: Ask, Plan, and Agent

Copilot Chat in VS Code operates in three distinct modes that represent increasing levels of autonomy. **Ask mode** is a pure Q&A interface — you ask questions and get answers without any file modifications. **Plan mode** (previously called "Edit mode") allows Copilot to propose changes across multiple files, presenting a diff that you review and accept or reject before anything is written to disk. **Agent mode** is the most autonomous — Copilot can read files, run terminal commands, make edits, and iterate on errors in a loop, acting as a semi-autonomous coding partner that executes multi-step tasks. Choosing the right mode depends on your confidence level and the task complexity: Ask for learning, Plan for reviewed multi-file changes, and Agent for delegated workflows.

> **AI Safety Moment**: Position mode selection as a risk control where higher-autonomy modes require tighter human approval gates and explicit permission boundaries.

### What Is a Token? (Input, Output, Cache — Token Economics)

A token is the fundamental unit of text that large language models process — roughly 3-4 characters or about ¾ of a word in English. Every interaction with Copilot involves three categories of tokens: **input tokens** (your prompt, file context, instructions, and system prompt sent to the model), **output tokens** (the model's generated response), and **cached tokens** (previously seen input tokens that can be reused at reduced cost). Token economics matter because models have finite context windows (e.g., 128K-200K tokens), and costs scale with token volume. Understanding tokens helps developers write efficient prompts, manage context size, and predict usage costs — sending an entire 10,000-line file as context when you only need 50 lines wastes both tokens and money.

> **Usage Optimization**: Use this topic to teach token-aware prompting, including context trimming, reuse of cached context, and avoiding full-file dumps when only a function is needed.

### What Is an AIC? New Usage Billing (PRUs to AICs)

GitHub is transitioning Copilot billing from Premium Request Units (PRUs) to **AI Consumption (AIC)** — a more granular, token-based billing model. Under PRUs, each chat interaction or completion counted as one "request" regardless of complexity. AICs instead measure actual compute consumption based on the model used, tokens processed, and features invoked, providing fairer pricing that reflects true resource usage. Business licenses include a monthly AIC allocation, and Enterprise licenses include a larger allocation with additional governance features. This shift means that a simple one-line completion costs far less than a complex multi-file agent session, aligning cost with value delivered. Developers and administrators need to understand AIC budgets to optimize usage patterns and avoid unexpected overages.

> **Usage Optimization**: Connect model choice and workflow style directly to AIC spend so participants can intentionally trade off speed, quality, and cost.

### How Do I Know My Usage for My Session and/or Accumulated for the Month?

Monitoring Copilot usage is essential for staying within AIC budgets and understanding consumption patterns. At the **session level**, VS Code displays token counts and model information in the chat panel, showing how much context is being consumed per interaction. At the **organizational level**, administrators can access the Copilot usage dashboard in GitHub.com Settings, which shows aggregated metrics including total AICs consumed, breakdown by user, feature utilization rates, and trend data over time. Individual developers can check their personal usage in their GitHub settings under the Copilot section. Setting up usage alerts and understanding your team's consumption baseline helps prevent budget surprises and identifies opportunities for prompt optimization.

> **Usage Optimization**: Introduce a practical habit of checking session and monthly usage dashboards to catch waste patterns early and tune prompts before overages occur.

### What Is a Model? (Model Routing Guide — How to Choose a Model) / Rubber Duck

A model is a trained neural network that processes your input and generates responses — different models have different strengths, speeds, and costs. GitHub Copilot offers model selection (GPT-4o, Claude Sonnet, Gemini, o1, o3-mini, and others) with each model excelling at different tasks: fast models for completions and simple questions, reasoning models for complex logic and architecture decisions, and specialized models for specific languages or domains. The **model routing guide** principle is: use the cheapest/fastest model that produces acceptable quality for your task — don't use a reasoning model for a simple rename refactor. **Rubber ducking** is the practice of explaining your problem to Copilot (like explaining to a rubber duck) not necessarily for its answer, but because articulating the problem often reveals the solution yourself — Copilot serves as an intelligent sounding board that can also offer suggestions.

> **Usage Optimization**: Teach routing simple tasks to cheaper/faster models and reserving higher-cost reasoning models for complex architecture or debugging decisions.

### Anatomy of the Context Window (Including Compaction and Context Rot)

The context window is the total amount of text (measured in tokens) that a model can "see" at once — it includes the system prompt, instructions, conversation history, referenced files, and the model's own output. When a conversation grows long, the context window fills up, triggering **compaction** — a process where older messages are summarized or dropped to make room for new content. **Context rot** is the degradation in response quality that occurs as conversations grow long: the model loses track of earlier instructions, contradicts previous decisions, or forgets established constraints. Best practices include starting fresh conversations for new tasks, using explicit file references rather than relying on conversation memory, and keeping prompts focused. Understanding context window management is the difference between productive AI sessions and frustrating ones that produce inconsistent results.

> **Usage Optimization**: Show how managing conversation length and starting fresh threads prevents context rot and lowers token burn from repeated re-grounding.

### Autonomy Spectrum and Delegating Permissions

The autonomy spectrum describes the range of control you grant to Copilot — from fully manual (you write everything, Copilot only suggests) to fully autonomous (Copilot plans, executes, tests, and commits). In practice, most workflows fall somewhere in between: you might let Copilot auto-accept completions but require approval for file deletions, or allow terminal commands but block network access. VS Code's agent mode exposes permission controls for specific actions (file edits, terminal commands, MCP tool calls) that let you dial in your comfort level. The key principle is that autonomy should scale with trust and reversibility — grant more autonomy for low-risk, easily-reversible tasks (formatting, test generation) and retain tight control for high-risk operations (database migrations, production deployments, security-sensitive code).

> **AI Safety Moment**: Make this a governance checkpoint where autonomy is granted by reversibility and impact, with stricter controls for production, secrets, and high-blast-radius tasks.

### What Is a Custom Agent?

A custom agent is a purpose-built AI assistant configured with specific instructions, tools, and permissions tailored to a particular workflow or domain. Unlike the general-purpose Copilot chat, a custom agent has a defined persona (via instructions), access to specific tools (via MCP servers or built-in capabilities), and scoped permissions that constrain what it can do. Examples include a "database migration agent" that only operates on schema files and runs migration commands, or a "documentation agent" that reads source code and generates API docs. Custom agents are defined through configuration files (like `.github/agents/*.md` or VS Code settings) and represent the shift from "AI assistant" to "AI teammate" — a specialized collaborator that understands your team's conventions and can execute domain-specific workflows autonomously.

> **AI Safety Moment**: Stress least-privilege design for custom agents so tool access, scope, and instructions constrain behavior to intended domains only.

---

## Intermediate

### Instructions

Instructions are the mechanism for giving Copilot persistent, reusable guidance that applies across all interactions without repeating yourself in every prompt. They exist at multiple levels: repository-level (`.github/copilot-instructions.md`), folder-level (`.github/instructions/*.md` with glob patterns), and user-level (VS Code settings). Instructions tell Copilot about your coding standards, architectural patterns, preferred libraries, naming conventions, and workflow rules. Well-crafted instructions transform Copilot from a generic assistant into a team-aware collaborator that produces code matching your project's style on the first attempt. Think of instructions as the "onboarding document" you'd give a new developer — except Copilot reads and follows them on every single interaction.

> **AI Safety Moment**: Use instructions to encode non-negotiable guardrails (no secret exposure, required review gates, allowed tools) so safe behavior is default rather than optional.

### Memory

Memory is Copilot's ability to retain facts, preferences, and conventions across sessions so that you don't have to re-explain context every time you start a new conversation. Repository-scoped memories store codebase facts (build commands, architecture decisions, team conventions) visible to all collaborators, while user-scoped memories store personal preferences (coding style, workflow habits) that follow you across all repositories. Memories are automatically surfaced in future sessions when relevant, and can be managed (viewed, deleted) through GitHub settings. Memory bridges the gap between instructions (which are explicit and file-based) and learned context (which is implicit and accumulated over time), making Copilot progressively more effective the more you work with it.

> **AI Safety Moment**: Clarify what should and should not be stored in memory, with explicit guidance to avoid persisting sensitive or regulated data.

### Context Hierarchy: Memory vs Instructions

Memory and instructions serve complementary roles in a clear priority hierarchy that determines how Copilot resolves conflicting guidance. Instructions (file-based, version-controlled, explicit) take precedence over memories (learned, implicit, accumulated) — if an instruction file says "use tabs" but a memory says "prefers spaces," the instruction wins. The hierarchy from highest to lowest priority is: user prompt > file-level instructions (glob-matched) > repository instructions > memory > model defaults. Understanding this hierarchy helps teams design their guidance stack: put hard rules in instructions (they're enforced and version-controlled), and let memories handle soft preferences and accumulated context that would be too granular for instruction files.

> **AI Safety Moment**: Teach precedence so durable policy in instructions reliably overrides conflicting remembered preferences.

### Anatomy of a Strong Prompt (Task, Scope, Constraints, Definition of Done, Off-Ramp)

A well-structured prompt has five components that together eliminate ambiguity and guide the AI to the right outcome. **Task** states what you want done ("Refactor the auth module to use JWT"). **Scope** bounds what files or systems are involved ("Only modify files in `src/auth/`"). **Constraints** specify rules and limitations ("Do not change the public API surface; maintain backward compatibility"). **Definition of Done** describes the success criteria ("All existing tests pass, new tests cover token refresh, and the README is updated"). **Off-ramp** tells the AI what to do when stuck ("If you encounter a database schema issue, stop and ask me rather than guessing"). This structure works because it mirrors how you'd brief a human colleague — clear objective, bounded scope, explicit rules, measurable success, and escalation path.

> **Usage Optimization**: A structured prompt reduces retries and clarification loops, cutting both elapsed time and AIC consumption.

### What Is an Agent?

An agent is an AI system that can perceive its environment, make decisions, and take actions autonomously in a loop — as opposed to a simple chatbot that responds to one prompt at a time. In the Copilot context, agent mode enables an iterative cycle: the AI reads files, formulates a plan, makes edits, runs commands (like tests or builds), observes the output, and adjusts its approach based on results. This "observe → think → act → observe" loop continues until the task is complete or the agent encounters a situation requiring human input. Agents are fundamentally different from chat because they maintain state across multiple steps, can recover from errors, and execute multi-step workflows that would require dozens of manual back-and-forth interactions in a simple Q&A interface.

> **AI Safety Moment**: Define agents as action-capable systems that require oversight, explicit stop conditions, and escalation paths when confidence is low.

### What Is a Skill?

A skill is a pre-packaged capability that an agent can invoke to perform a specific action — think of skills as the "verbs" in an agent's vocabulary. Built-in skills include file editing, terminal command execution, web searching, and code searching. Custom skills can be added through MCP (Model Context Protocol) servers, VS Code extensions, or agent configurations. Each skill has a defined interface (inputs it accepts, outputs it produces) and permissions model (what it's allowed to do). The distinction matters because an agent's effectiveness is bounded by its available skills — an agent without terminal access can't run tests, and an agent without web search can't look up documentation. Designing the right skill set for an agent is as important as writing good instructions.

> **AI Safety Moment**: Position skills as privileged capabilities and require trust review before enabling tools that can reach external systems or mutate critical assets.

### When to Use One or the Other?

Choosing between Ask, Plan, Agent mode, or delegating to a background/cloud agent depends on task characteristics: complexity, risk, and required autonomy. Use **Ask mode** for learning, exploration, and quick questions where you don't want any files touched. Use **Plan mode** when you want multi-file changes but need to review the diff before committing. Use **Agent mode** for well-defined tasks where you trust the AI to iterate (test generation, refactoring with test validation, boilerplate creation). Use **background/cloud agents** for long-running tasks that don't need your active supervision (large refactors, issue triage, PR reviews). The decision framework is: How reversible is the action? How well-defined is the task? How much do I trust the output? Higher reversibility and better task definition warrant more autonomy.

> **Usage Optimization**: Provide a decision matrix that maps task complexity to Ask/Plan/Agent to avoid overusing expensive autonomous flows for simple tasks.

### The Anatomy of an Agentic Loop

An agentic loop is the core execution cycle that powers autonomous AI workflows: **Prompt → Think → Act → Observe → Repeat**. The agent receives a task, reasons about what to do next (often using chain-of-thought), selects and invokes a tool (read a file, run a command, make an edit), observes the result, and decides whether to continue or stop. Each iteration adds to the conversation context, building up state that informs subsequent decisions. Key architectural elements include: a system prompt defining behavior, a tool registry listing available actions, a decision function choosing the next step, error handling for failed tool calls, and termination conditions (task complete, budget exhausted, or human escalation needed). Understanding this loop helps developers predict agent behavior, debug unexpected actions, and design better instructions that guide the loop toward desired outcomes.

> **Usage Optimization**: Emphasize shorter, well-bounded loops with clear termination criteria to avoid runaway iterations that consume tokens without improving outcomes.

### What Are Tools? When to Use a Tool?

Tools are the concrete actions an agent can perform to interact with the external world beyond generating text — they bridge the gap between "thinking" and "doing." Examples include file system operations (read, write, create), terminal commands (build, test, lint), web fetching, code search, and custom MCP tools (database queries, API calls, deployment triggers). An agent uses a tool when it needs information not present in its context (reading a file), when it needs to verify something (running tests), or when it needs to effect a change (editing code). The tool selection process is part of the agent's reasoning — a well-designed agent chooses the most efficient tool for each step, avoids redundant tool calls, and knows when to stop calling tools and deliver a final answer.

> **AI Safety Moment**: Treat tool invocation as a control point where high-risk tools require confirmation, logging, and constrained parameters.

### Background & Cloud Agents — When to Use

Background agents run in your local VS Code session but asynchronously (you can continue working while they execute), while cloud agents (GitHub Copilot Coding Agent) run entirely on GitHub's infrastructure triggered by issues or comments. Use **background agents** when you want local execution with your full environment (database access, local services, custom tools) but the task will take multiple minutes. Use **cloud agents** (via `@github` or issue assignment) when the task is well-defined, self-contained, and doesn't require local resources — they spin up a fresh environment, make changes, and open a pull request. Cloud agents are ideal for issue-to-PR workflows, repetitive maintenance tasks, and parallelizing work across multiple issues simultaneously without consuming your local machine's resources.

> **Usage Optimization**: Recommend background or cloud execution only for genuinely long-running, parallelizable work so teams avoid idle waiting costs in interactive sessions.

### Boilerplate with /init

The `/init` command (or "scaffold" workflow) lets Copilot generate project boilerplate by analyzing your requirements and producing a complete starter structure. Rather than manually creating folders, config files, and initial code, you describe what you want ("Create a Next.js app with TypeScript, Tailwind, and Prisma") and Copilot generates the directory structure, configuration files, package dependencies, and starter code in one operation. This is particularly powerful when combined with instructions — you can define your team's preferred project template in instruction files, and `/init` will respect those conventions. The key benefit is consistency: every new project or module starts with the same structure, same linting config, same CI setup, ensuring team standards are baked in from the first commit.

> **Usage Optimization**: Standardized scaffolding reduces repeated prompting and rework, improving consistency while lowering total generation spend.

### The Instruction Layering Stack

The instruction layering stack defines how multiple levels of guidance compose together to form the complete context Copilot receives. From broadest to most specific: **Organization policies** (admin-enforced rules) → **Repository instructions** (`.github/copilot-instructions.md`) → **Folder/file instructions** (`.github/instructions/*.md` with glob patterns) → **User settings** (VS Code `github.copilot.chat.codeGeneration.instructions`) → **Prompt-level context** (current message). Each layer can add guidance but typically shouldn't contradict higher-priority layers. This composable architecture means teams can establish baseline standards at the org level, add project-specific conventions at the repo level, and layer in file-type-specific rules (e.g., different conventions for `*.test.ts` vs `*.ts`) — all without any single instruction file becoming unwieldy.

> **AI Safety Moment**: Use layered instructions to codify policy at org and repo levels so local prompt variance cannot bypass required safeguards.

### Optimization Controls — Best Practices for Safe and Efficient AI Workflows

Optimization controls are the guardrails and efficiency patterns that ensure AI-assisted workflows remain safe, cost-effective, and high-quality. Key practices include: **Token budgeting** (scope context to only what's needed, avoid sending entire files when a function suffices), **model selection** (use fast/cheap models for simple tasks, reserve reasoning models for complex logic), **permission boundaries** (restrict file access, limit terminal commands, require approval for destructive actions), **validation gates** (always run tests after agent edits, use linting as a safety net), and **session hygiene** (start fresh conversations for new tasks to avoid context rot). The goal is to maximize AI value while minimizing risk — every optimization control answers the question: "How do I get better output while spending fewer tokens and maintaining safety?"

> **Usage Optimization**: Make this the capstone optimization segment with concrete controls for model routing, context budgeting, and validation cadence.

---

## Advanced

### Multiagents (What Are They and When You Should Use Them) / Brady Gaster's Squad

Multiagent systems involve multiple AI agents collaborating on a task, each with specialized roles, instructions, and tool access — analogous to a team of specialists rather than a single generalist. Brady Gaster's "Squad" pattern demonstrates this: a coordinator agent breaks down a complex task and delegates subtasks to specialized agents (a frontend agent, a backend agent, a testing agent), each operating in its own context with tailored instructions. Use multiagents when a task spans multiple domains that benefit from specialization, when you need parallel execution across independent workstreams, or when the total context required exceeds what a single agent can effectively manage. The tradeoff is coordination overhead — multiagent systems require clear interfaces between agents, shared state management, and conflict resolution when agents produce contradictory changes.

> **AI Safety Moment**: Multiagent orchestration needs explicit ownership, boundaries, and merge controls to prevent conflicting or unsafe parallel edits.

### Awesome Copilot List

The "Awesome Copilot" list is a community-curated collection of resources, extensions, tools, patterns, and examples for getting the most out of GitHub Copilot. Similar to other "awesome-*" lists on GitHub, it aggregates blog posts, video tutorials, custom instruction templates, MCP server implementations, agent configurations, and real-world case studies from the developer community. It serves as a discovery mechanism for developers who want to go beyond default Copilot usage — finding specialized MCP servers for their stack, learning advanced prompt patterns, or discovering VS Code extensions that enhance the Copilot experience. Pointing developers to this resource gives them a self-service path to continuous learning after the workshop.

> **AI Safety Moment**: Curated resources should be vetted for source credibility and enterprise compatibility before adoption into team workflows.

### Subagents

Subagents are agents spawned by a parent agent to handle specific subtasks within a larger workflow — they operate in their own context window with scoped instructions and tools, then return results to the parent. This hierarchical pattern solves the context window limitation: instead of one agent trying to hold everything in memory, the parent agent decomposes work and delegates to specialized subagents (an "explore" agent for research, a "task" agent for execution, a "code-review" agent for validation). Each subagent is stateless and purpose-built, receiving complete context in its prompt and returning focused results. The parent orchestrates the workflow, deciding when to spawn subagents, how to combine their outputs, and when the overall task is complete.

> **AI Safety Moment**: Require scoped prompts and minimal permissions per subagent to reduce unintended side effects and preserve auditability.

### Fleet

Fleet refers to the pattern of running multiple agent instances in parallel to tackle a batch of similar tasks simultaneously — scaling AI assistance horizontally rather than sequentially. Instead of processing 10 issues one at a time, you launch 10 cloud agents in parallel, each working on a separate issue and opening its own pull request. Fleet patterns are particularly effective for large-scale migrations (updating 50 packages, converting 100 files to a new format), batch bug fixes, and parallelized code review. The key considerations are: ensuring agents don't conflict with each other (non-overlapping file scopes), managing the review burden of many simultaneous PRs, and having merge strategies for when parallel changes create conflicts.

> **Usage Optimization**: Fleet execution should be reserved for high-volume independent tasks where parallelism produces net AIC and time savings versus sequential work.

### Hooks

Hooks are lifecycle event handlers that execute custom logic at specific points in Copilot's workflow — before or after the agent takes an action. Examples include: a pre-save hook that runs the formatter before any file edit is committed, a post-command hook that checks for secrets in terminal output, or a pre-commit hook that validates all changes pass linting. Hooks extend agent behavior without modifying instructions — they're imperative guardrails that execute deterministically regardless of what the AI decides to do. This makes them ideal for enforcing non-negotiable policies (security scanning, format compliance, test requirements) that should never be skipped, even if the AI's reasoning suggests otherwise.

> **AI Safety Moment**: Present hooks as enforceable guardrails for policy checks, secret scanning, and mandatory validation before changes are accepted.

### Extension Marketplace

The VS Code Extension Marketplace is where developers discover and install extensions that enhance Copilot's capabilities — from specialized chat participants to MCP server connectors to custom agent skills. Extensions can add new `@` participants (e.g., `@database` for SQL assistance), provide additional tools that agent mode can invoke, or offer UI enhancements for the Copilot experience. The marketplace ecosystem means Copilot's capabilities grow beyond what GitHub ships natively — community and third-party developers can extend it for specific frameworks, languages, or workflows. When evaluating extensions, consider: publisher trust, permissions requested, update frequency, and whether the extension's tools are compatible with your organization's security policies.

> **AI Safety Moment**: Reinforce extension due diligence around publisher trust, permissions, and data access before enabling in enterprise environments.

### MCP (Model Context Protocol)

MCP (Model Context Protocol) is an open standard that defines how AI agents communicate with external tools and data sources through a unified interface. Instead of building custom integrations for every tool, MCP provides a standardized protocol where "servers" expose capabilities (tools, resources, prompts) and "clients" (like Copilot) discover and invoke them dynamically. This means you can connect Copilot to your database, CI/CD pipeline, monitoring systems, internal APIs, or any custom tooling through a single protocol. MCP servers can be local (running on your machine) or remote (hosted services), and VS Code manages their lifecycle. The power of MCP is composability — you can mix and match servers to give your agent exactly the capabilities it needs for your specific workflow.

> **AI Safety Moment**: Treat MCP server onboarding as a security review event with authentication, authorization, and data-scope controls.

### API/CLI

The Copilot API and CLI interfaces enable programmatic and terminal-based access to AI capabilities outside of the IDE — critical for automation, scripting, and CI/CD integration. The CLI (`gh copilot`) provides command-line chat, suggestion, and explanation features directly in the terminal, while APIs enable building custom applications that leverage Copilot's models. These interfaces are essential for: automating repetitive tasks via scripts, integrating AI into existing toolchains (build systems, deployment pipelines), creating custom developer tools that leverage LLM capabilities, and enabling headless/server-side AI workflows that don't require a human sitting in front of an IDE. The API/CLI layer is where Copilot transitions from "interactive assistant" to "programmable AI infrastructure."

> **AI Safety Moment**: Programmatic interfaces can scale mistakes quickly, so require least-privilege tokens, audit trails, and environment segregation.

### Plugins

Plugins extend Copilot's functionality through modular, installable components that add new capabilities, tools, or behaviors without modifying core configuration. Unlike instructions (which guide behavior through text) or MCP servers (which expose external tools), plugins can modify the agent's internal behavior, add new slash commands, provide specialized processing pipelines, or integrate with proprietary systems. The plugin architecture enables organizations to package their custom AI workflows as distributable, versioned components that can be shared across teams or published for broader use. Plugins represent the highest level of Copilot extensibility — they're code that runs as part of the agent's execution rather than text that influences its reasoning.

> **AI Safety Moment**: Plugin power should be balanced with signing, version governance, and controlled rollout to limit supply-chain and behavior risk.

### Debugging Chat and Agents

Debugging AI-assisted workflows requires different techniques than traditional code debugging because you're diagnosing reasoning and context problems, not just execution errors. Key debugging approaches include: examining the context window (what files and instructions did the agent actually see?), reviewing tool call sequences (did the agent use the right tools in the right order?), checking for context rot (did the conversation get too long?), analyzing token usage (is the model hitting limits and truncating?), and testing with explicit prompts (can you reproduce the issue with a minimal prompt?). VS Code's developer tools, chat history exports, and verbose logging modes help surface what's happening inside the agent loop. The most common issues are: missing context (agent doesn't know about a file), conflicting instructions, and exceeded context windows causing compaction artifacts.

> **Usage Optimization**: Teach lightweight diagnostic workflows (minimal repro prompts, narrowed context) to resolve failures without expensive trial-and-error loops.

### Deploying Your Agents (GitHub Repo, Marketplace, Agent Package Manager)

Once you've built a custom agent, deployment determines who can use it and how it's distributed. **GitHub repository** deployment is the simplest — your agent configuration lives in a repo and anyone who clones it gets the agent. **Marketplace** deployment (VS Code Extension Marketplace or GitHub Marketplace) makes your agent discoverable to the broader community with proper versioning, reviews, and installation flows. The **Agent Package Manager** (APM at microsoft.github.io/apm/) is an emerging registry specifically for AI agents — it provides a standardized way to discover, install, and manage agents with dependency resolution and version compatibility. Choosing a deployment strategy depends on your audience (team-internal vs. public), update cadence, and whether the agent requires supporting infrastructure (MCP servers, APIs) beyond the configuration files themselves.

> **AI Safety Moment**: Deployment should include policy compliance, permission review, and provenance checks before wider distribution.

### Preparing for Day 2 Hack

The Day 2 Hack session is a hands-on, time-boxed exercise where participants apply everything learned in Days 1's curriculum to build something real — either solving an actual problem from their work or tackling a provided challenge. Preparation involves: selecting a challenge scope that's achievable in the allotted time (60-90 minutes), ensuring all tooling is configured (VS Code, extensions, MCP servers, CLI), identifying which techniques from the curriculum to apply (instructions, custom agents, multiagent patterns), and establishing success criteria before starting. The hack is not about writing perfect code — it's about demonstrating fluency with the AI-assisted workflow: effective prompting, appropriate mode selection, tool composition, and knowing when to guide versus when to delegate. Teams should prepare their repo, seed their instructions, and have a clear "definition of done" before the timer starts.

> **Usage Optimization**: Encourage teams to predefine scope, model strategy, and success criteria so hack time is spent building rather than burning tokens on setup churn.
