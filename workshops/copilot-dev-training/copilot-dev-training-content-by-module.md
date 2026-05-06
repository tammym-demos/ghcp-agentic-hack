# Copilot Developer Training — Content by Module

Full content breakdown extracted from the workshop `.slidev.md`, `-workshop.md`, and `-LAB.md` files.

---

## Module 1: Foundations (3h 15m) 🎓

**3 sessions · 15 exercises · 3 labs**

| Session | Topic | Time | Key Content |
|---------|-------|------|-------------|
| S1 | Copilot Chat Tour | 60m | Inline completions, chat modes (panel/inline/quick), slash commands (`/explain`, `/fix`, `/tests`, `/refactor`), `@` participants (`@workspace`, `@selection`, `@vscode`), multi-session management |
| S2 | Memory & Context | 60m | Context window fundamentals (token budget, priority, truncation), `.github/copilot-instructions.md`, file-scoped instructions with `applyTo`, instruction layering (global → file → session), prompt crafting |
| S3 | Models, Agents & Tokens | 75m | Model landscape (GPT-4, Claude, etc.), token mechanics (input vs output), built-in vs custom agents (`.github/agents/*.md`), token budgeting & cost tracking, `copilot-setup-steps.yml` |

### Labs

- **Lab 1: Copilot Chat Tour** (28 min, 5 exercises)
  - 1.1: Inline Completions — ghost text, tab accept, partial accept, pattern continuation
  - 1.2: Chat Interface Navigation — panels, inline chat, quick chat modes
  - 1.3: Slash Commands — `/explain`, `/fix`, `/tests`, `/refactor` in action
  - 1.4: Context Participants — `@workspace`, `@selection`, `@vscode` with demos
  - 1.5: Multi-Session Workflows — fresh starts, session isolation

- **Lab 2: Memory & Context** (31 min, 5 exercises)
  - 2.1: Context Window Exploration — inspect token counts
  - 2.2: Repository Instructions — create `.github/copilot-instructions.md`
  - 2.3: File-Scoped Instructions — use `applyTo` for targeted guidance
  - 2.4: Instruction Layering — test layered instructions behavior
  - 2.5: Prompt Crafting — refine prompts for better completions

- **Lab 3: Models, Agents & Tokens** (33 min, 5 exercises)
  - 3.1: Model Comparison — try different models on same task
  - 3.2: Token Counting — monitor token usage in chat
  - 3.3: Custom Agents — create `.github/agents/*.md` with specialized persona
  - 3.4: Token Budgeting — observe and manage truncation
  - 3.5: Usage Monitoring — check Copilot usage dashboard

### AI Safety Topics

- S1: "AI as Partner, Not Replacement" — human-in-loop, trust calibration
- S2: "What Gets Shared?" — data privacy, context scoping
- S3: "Model Selection — Capability vs. Risk" — autonomy vs. safety, cost vs. quality

---

## Module 2: Agentic Patterns (2h 15m) 🤖

**2 sessions · 10 exercises · 2 labs + Feedback Agent LAB**

| Session | Topic | Time | Key Content |
|---------|-------|------|-------------|
| S4 | Agentic Loops & Rubber Duck | 75m | Autonomy spectrum (completions → chat → agent → coding agent), agentic loop definition, Plan-Act-Observe-Reflect (PAOR) cycle, Ralph loop deep dive (Coding Agent validation), rubber duck cross-model review |
| S5 | Agent Patterns & Antipatterns | 60m | Single-agent multi-skill vs multi-agent specialist teams, orchestration topologies (sequential, parallel, hierarchical), 8 antipatterns (unbounded loops, context bloat, poor error handling, inadequate validation, missing safeguards, unclear success criteria, agent thrashing, inefficient tool use) |

### Labs

- **Lab 1: Agentic Loops & Rubber Duck** (39 min, 5 exercises)
  - 1.1: Agent Mode Loop Observation — multi-step task, identify plan → act → observe → reflect
  - 1.2: The Ralph Loop in Action — watch validation, error handling, retry
  - 1.3: Rubber Duck Debugging — ask two different models for review
  - 1.4: Error Injection — deliberately introduce error, watch agent self-correct
  - 1.5: Success Criteria Definition — define what "done" means for your agent

- **Lab 2: Agent Patterns & Antipatterns** (34 min, 5 exercises)
  - 2.1: Single-Agent Multi-Skill — design a code review agent with multiple skills
  - 2.2: Orchestration Planning — design sequential/parallel agent flows
  - 2.3: Antipattern Detection — analyze past agent runs for antipatterns
  - 2.4: Safety Boundaries — define guardrails for your agent
  - 2.5: Iteration Limits — set max iterations to prevent thrashing

- **Bonus**: FEEDBACK-AGENT-LAB.md — feedback loop agent exercise

### AI Safety Topics

- S4: "Autonomy vs. Oversight" — human checkpoints at each autonomy level
- S5: "Designing Responsible Agents" — guardrails, safety boundaries, failure modes

---

## Module 3: Advanced Topics (3h 20m) 🔬

**3 sessions · 16 exercises · 3 labs + Feedback Agent LAB**

| Session | Topic | Time | Key Content |
|---------|-------|------|-------------|
| S6 | Extensions & MCP | 60m | VS Code chat participants (`@workspace`, `@vscode`, `@terminal`), GitHub Copilot extensions marketplace, MCP architecture (Model Context Protocol), MCP server configuration & debugging |
| S7 | Evaluating Agentic Output | 70m | SMART success criteria, output quality rubrics (correctness, readability, performance, security, test coverage), evaluation methods (automated checks, human review, A/B testing), metrics & feedback loops, usage/billing/cost strategies |
| S8 | Troubleshooting & Diagnostics | 60m | Output log channels (Copilot output panel), chat debug mode (prompt construction, context, token counts), agent debug logs (plan visibility, action tracing, file changes), diagnostics collection & export |

### Labs

- **Lab 1: Extensions & MCP** (36 min, 5 exercises)
  - 1.1: Participant Exploration — test `@workspace`, `@vscode`, `@terminal`
  - 1.2: Participant Capabilities Mapping — document what each participant can access
  - 1.3: GitHub Copilot Extensions — browse and understand extension manifest
  - 1.4: MCP Server Setup — configure MCP server in VS Code
  - 1.5: Tool Integration — call MCP tool from Copilot Chat

- **Lab 2: Evaluating Agentic Output** (42 min, 6 exercises)
  - 2.1: Success Criteria Definition — write SMART criteria for your agent
  - 2.2: Quality Rubric Design — create multi-dimension rubric
  - 2.3: Automated Evaluation — run linting, tests, type checks on AI output
  - 2.4: Human Review Workflow — review agent output against rubric
  - 2.5: Metrics Collection — log and track quality metrics
  - 2.6: Cost Analysis — monitor token usage and cost per interaction

- **Lab 3: Troubleshooting & Diagnostics** (36 min, 5 exercises)
  - 3.1: Output Log Navigation — find and read logs from chat sessions
  - 3.2: Debug Mode Inspection — enable debug mode, examine prompt construction and context
  - 3.3: Agent Trace Analysis — read agent plan, actions, and file changes
  - 3.4: Error Investigation — debug failed agent run using logs
  - 3.5: Diagnostics Export — collect and export logs for analysis

- **Bonus**: FEEDBACK-AGENT-LAB.md — feedback evaluation framework exercise

### AI Safety Topics

- S6: "Third-Party Trust" — extension vetting checklist, publisher verification, permission scoping
- S7: "When to Trust, When to Verify" — trust calibration by task type, verification strategies
- S8: "Debugging the Black Box" — transparency in AI systems, inspecting decision-making

---

## Module 4: GitHub + ADO Integration (30m) 🔗

**7 sections · 3 inline labs**

| Section | Topic | Time | Key Content |
|---------|-------|------|-------------|
| 1 | GitHub + ADO Architecture | 3m | ADO augments GitHub (not replaces); base patterns (EMU, Multi-Org, Mixed + GHES); capability split |
| 2 | AB# Linking Explained | 8m | `AB#NNNNN` syntax; one-directional flow (GitHub → ADO); state transitions; work item linking |
| 3 | AB# in Practice | 2m | Real scenario: branch → commit → PR → merge → auto-transition in ADO |
| 4 | Copilot from Azure Boards | 3m | Generate code from ADO work items; GitHub repos requirement; data governance |
| 5 | PR Insights & Features | 2m | PR status visibility in ADO; `!` mentions for PR references |
| 6 | Decision Framework | 5m | When to add ADO integration; when to skip; organizational fit checklist |
| 7 | Q&A | 4m | Open questions |

### Labs

- **Lab 1**: Connect Azure Boards to GitHub (10 min, instructor demo)
- **Lab 2**: AB# Linking Workflow (10 min) — create work item, branch, commit with `AB#`, PR, merge, verify auto-transition
- **Lab 3**: Copilot from Azure Boards (optional, 5 min) — "Generate with Copilot" from ADO work item

### Key Concepts

| Concept | Details |
|---------|---------|
| AB# Linking | `AB#NNNNN` in commits/PRs/issues links GitHub → ADO work items |
| Limitations | One-directional; default branch only for state transitions; Azure Boards app required |
| Data Governance | Work item context sent to Copilot; not used for model training in Enterprise |

---

## Module 5: Hack — Business Problem Solving (60m) 🚀

**3 phases · 5 business problem scenarios · Capstone project**

### Hackathon Structure

| Phase | Time | Activity | Output |
|-------|------|----------|--------|
| **Planning** | 10m | Problem selection, success criteria definition | Clear one-sentence success criteria |
| **Building** | 40m | Create agent instructions, test, iterate | Working agent in `.github/agents/` |
| **Demo** | 10m | Present working agent, get feedback | Confidence in agent-building capability |

### 5 Business Problem Scenarios

| Scenario | Problem | Agent Does | Success Criteria |
|----------|---------|------------|------------------|
| 🔍 **A: Code Review Agent** | Inconsistent, slow code reviews | Reviews PRs for style, security, performance; structured feedback | Agent reviews real PR with specific feedback |
| ✅ **B: Test Generation Agent** | Low test coverage; time constraints | Generates unit tests (happy path, edge cases, errors); runnable immediately | Generated test suite runs and passes |
| 📚 **C: Documentation Assistant** | Outdated/sync API docs | Generates README sections from code; parameter descriptions, examples | Generated docs match code accurately |
| 🐛 **D: Bug Triage Agent** | Overwhelming issue tracker | Categorizes bugs (critical/high/medium/low); prioritizes; estimates effort | Agent triages 3–5 issues with clear categorization |
| 🚀 **E: Bring Your Own Problem** | Your team's actual problem | Custom agent solving your specific need | Working agent solving your problem |

### Building Phase Breakdown

1. **Set Up Project** (5m) — Open VS Code, create `.github/` folder
2. **Create Custom Instructions** (10m) — Write `.github/copilot-instructions.md` with team context
3. **Build Your Agent** (20m) — Create `.github/agents/[name].md`, write persona/tools/instructions, test
4. **Iterate & Refine** (5m) — Run on real test case, adjust instructions based on results

### Learning Objectives

- ✅ Choose a real business problem that Copilot agents can solve
- ✅ Define success criteria in one clear sentence
- ✅ Create agent instructions in `.github/agents/` that solve the problem
- ✅ Test agents iteratively and adjust based on output
- ✅ Ship and share a working agent with your team

---

## Summary

| Module | Duration | Sessions | Labs | Exercises |
|--------|----------|----------|------|-----------|
| 1. Foundations 🎓 | 3h 15m | 3 | 3 | 15 |
| 2. Agentic Patterns 🤖 | 2h 15m | 2 | 2 + bonus | 10 |
| 3. Advanced Topics 🔬 | 3h 20m | 3 | 3 + bonus | 16 |
| 4. GitHub + ADO 🔗 | 30m | 7 sections | 3 | inline |
| 5. Hack 🚀 | 60m | 3 phases | hackathon | 1 capstone |

**Total**: ~12.5 hours · 8 sessions · 41+ exercises · 5 business problem scenarios

### Files per Module

| Module | Slides | Workshop Guide | Lab | Bonus |
|--------|--------|---------------|-----|-------|
| 1 | `copilot-dev-foundations.slidev.md` | `copilot-dev-foundations-workshop.md` | `copilot-dev-foundations-LAB.md` | — |
| 2 | `copilot-dev-agentic.slidev.md` | `copilot-dev-agentic-workshop.md` | `copilot-dev-agentic-LAB.md` | `FEEDBACK-AGENT-LAB.md` |
| 3 | `copilot-dev-advanced.slidev.md` | `copilot-dev-advanced-workshop.md` | `copilot-dev-advanced-LAB.md` | `FEEDBACK-AGENT-LAB.md` |
| 4 | `gh-ado-integration-30min.slidev.md` | `gh-ado-integration-30min-workshop.md` | `gh-ado-integration-LAB.md` | — |
| 5 | `copilot-dev-hack.slidev.md` | `copilot-dev-hack-workshop.md` | — | — |
