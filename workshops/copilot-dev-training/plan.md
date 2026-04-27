# GitHub Copilot Developer Training Curriculum

A structured onboarding curriculum for developers starting with GitHub Copilot and AI-assisted development.

## Structure

- 8 sessions totaling ~9 hours; every session opens with an AI safety / human-machine partnership discussion
- Each session: lecture content → focused demo → 5-exercise hands-on lab

## Sessions

### Session 1 — Copilot Chat Tour (~60 min)

Inline completions, slash commands, `@` participants, `#` context variables, multi-session management.

### Session 2 — Memory & Context (~60 min)

`.github/copilot-instructions.md`, user-level instructions, how context window composition affects output quality.

### Session 3 — Models, Agents & Token Management (~75 min)

Model comparison table, token mechanics, built-in vs. custom agents, prompt decision flowchart, `copilot-setup-steps.yml`. **Now includes: strategies for managing token usage and spend — budgeting techniques, context pruning, model selection trade-offs, and monitoring consumption.** *(Issue #3)*

### Session 4 — Agentic Loops & the Rubber Duck Pattern (~75 min)

How agentic loops work — the plan → act → observe → reflect cycle. **Deep dive into the Ralph loop**: how the agent iterates through code changes, runs validation, and self-corrects. **Rubber duck debugging with AI**: using Copilot as a structured reasoning partner, the rubber-duck agent pattern for plan critique and blind-spot detection. *(Issues #2, #5)*

### Session 5 — Agent Patterns & Antipatterns (~60 min)

Single-agent/multi-skill vs. multi-agent/multi-skill patterns, orchestration topologies, 8-entry antipattern reference table.

### Session 6 — Extensions & MCP (~60 min)

VS Code chat participants, GitHub Copilot Extensions (GitHub Apps), MCP host/client/server distinction, configuration.

### Session 7 — Evaluating Agentic Output (~70 min)

**Evaluation processes to measure agentic effectiveness**: defining success criteria, output quality rubrics, automated vs. human-in-the-loop evaluation, batch evaluation workflows, tracking improvement over time, and when to trust vs. verify AI-generated code. *(Issue #4)*

### Session 8 — Troubleshooting & Diagnostics (~60 min)

Output log channels, chat debug mode, agent debug logs, diagnostics collection.

## Timing Summary

| Session | Topic | Duration |
|---------|-------|----------|
| 1 | Copilot Chat Tour | 60 min |
| 2 | Memory & Context | 60 min |
| 3 | Models, Agents & Token Management | 75 min |
| 4 | Agentic Loops & Rubber Duck | 75 min |
| 5 | Agent Patterns & Antipatterns | 60 min |
| 6 | Extensions & MCP | 60 min |
| 7 | Evaluating Agentic Output | 70 min |
| 8 | Troubleshooting & Diagnostics | 60 min |
| **Total** | | **~8.5 hours** |

## Issue Integration

| Issue | Title | Integrated Into |
|-------|-------|-----------------|
| #2 | Add loops / how the Ralph loop works | Session 4 |
| #3 | Managing tokens | Session 3 |
| #4 | Evaluation of agentic effectiveness | Session 7 (new) |
| #5 | What is rubber duck | Session 4 |

## Gap Analysis

Recommended follow-on topics: prompt engineering, CI/CD automation, enterprise governance, large-codebase strategies.

## Deliverables

The curriculum is implemented as 3 standalone modules, each with a workshop guide, Slidev deck, and hands-on lab:

| Module | Folder | Workshop | Slidev | LAB |
|--------|--------|----------|--------|-----|
| **Foundations** (Sessions 1–3) | `copilot-dev-foundations/` | `copilot-dev-foundations-workshop.md` | `copilot-dev-foundations.slidev.md` | `copilot-dev-foundations-LAB.md` |
| **Agentic Patterns** (Sessions 4–5) | `copilot-dev-agentic/` | `copilot-dev-agentic-workshop.md` | `copilot-dev-agentic.slidev.md` | `copilot-dev-agentic-LAB.md` |
| **Advanced Topics** (Sessions 6–8) | `copilot-dev-advanced/` | `copilot-dev-advanced-workshop.md` | `copilot-dev-advanced.slidev.md` | `copilot-dev-advanced-LAB.md` |

**Demo/Lab Repository**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)

**Site Integration**: The Astro site (`site/pages/index.astro`) shows a single "Copilot Developer Training" card on the landing page that links to a module picker with all three modules. Each module has its own Workshop, Lab, and Slides pages.
