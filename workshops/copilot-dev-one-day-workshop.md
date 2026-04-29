# GitHub Copilot Developer Training — One-Day Intensive

**Duration**: 6 hours (9:30 AM - 3:30 PM with 1-hour lunch)  
**Format**: Presentation + Live Demo + Hands-On Labs  
**Audience**: Developers and engineering teams adopting GitHub Copilot  
**Focus**: From fundamentals through agentic patterns to advanced debugging and enterprise integration  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized) (OctoCAT Supply)

---

## Workshop Overview

This intensive one-day program takes developers from Copilot fundamentals through advanced agentic patterns, debugging techniques, and enterprise integration with Azure DevOps. Participants will understand how Copilot works, build custom agents, troubleshoot issues, and integrate Copilot into their team's workflow.

By day's end, attendees will have hands-on experience configuring Copilot for their projects, understanding the mechanics of agentic loops, and knowing how to extend Copilot with MCP integrations.

### Learning Objectives

By the end of this one-day intensive, you will be able to:

1. **Navigate and use** Copilot's chat interface, inline completions, slash commands, and context targeting (`@` participants, `#` variables)
2. **Manage context effectively** by understanding context window composition, priority, and truncation
3. **Configure team standards** using `.github/copilot-instructions.md` and custom agents
4. **Understand agentic workflows** including the Ralph loop, Rubber Duck debugging, and validation gates
5. **Build and deploy** custom agents with focused instructions and proper scoping
6. **Debug Copilot interactions** using chat logs, agent traces, and diagnostics tools
7. **Extend Copilot** with MCP (Model Context Protocol) servers for external tool integration
8. **Integrate GitHub Copilot** with Azure DevOps workflows using AB# linking and strategic coexistence

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | With Copilot Pro, Business, or Enterprise license |
| **VS Code** | Latest stable (or Insiders for preview features) |
| **Copilot Extension** | GitHub Copilot + GitHub Copilot Chat extensions installed |
| **Node.js** | Version 18 or higher (for demo projects) |
| **Git** | For cloning the demo repository |
| **Azure DevOps (optional)** | If you work with ADO integration scenarios |

---

## Full Schedule

| Time | Duration | Activity |
|------|----------|----------|
| **9:30 - 10:30** | 60 min | **Module 1: Foundations** — Chat interface, context window, instructions |
| **10:30 - 10:35** | 5 min | ☕ Break |
| **10:35 - 11:20** | 45 min | **Module 2 (Part A): Agentic Patterns** — Context window, Copilot Init setup |
| **11:20 - 12:05** | 45 min | **Module 2 (Part B): Agentic Patterns** — Agentic loops, Rubber Duck, building your first agent |
| **12:05 - 1:05** | 60 min | 🍽️ **Lunch** |
| **1:05 - 1:35** | 30 min | **Module 3: Advanced** — Debugging, diagnostics, and troubleshooting (Part A) |
| **1:35 - 2:00** | 25 min | **Module 3 (Part B): Advanced** — Patterns, MCP overview |
| **2:00 - 2:05** | 5 min | ☕ Break |
| **2:05 - 2:35** | 30 min | **Module 4: ADO Integration** — Layering ADO on GitHub for Copilot |
| **2:35 - 3:30** | 55 min | **Hands-On Lab & Q&A** — Teams configure Copilot for their projects |

**Total Instructional Time**: 5 hours | **Total Duration**: 6 hours

---

## Detailed Module Breakdown

### Module 1: Foundations (60 min) — 9:30–10:30

**Session 1: Copilot Chat Tour (30 min)**
- Opening: AI as partner, not replacement (5 min)
- Inline completions and ghost text (5 min)
- Chat interface, modes, and slash commands (10 min)
- Context targeting with `@` participants and `#` variables (10 min)

**Session 2: Context Window & Instructions (15 min)**
- Context window fundamentals (5 min)
- Repository-level instructions with `.github/copilot-instructions.md` (10 min)

**Session 3: Models & Tokens (15 min)**
- Model landscape and selection (5 min)
- Token mechanics and budgeting (5 min)
- Built-in vs. custom agents (5 min)

**Key outcomes**: Understanding Copilot's core UI, context management, and how to encode team standards.

---

### Module 2: Agentic Patterns (90 min) — 10:35–12:05

**Session 1: Context Window Fundamentals (10 min)**
- How context window fills and prioritizes information
- Impact on prompt structure and session management

**Session 2: Copilot Init & Project Setup (15 min)**
- The `.github` folder structure as Copilot's configuration hub
- Creating `.github/copilot-instructions.md` (always-on team standards)
- Building custom agents with `.github/agents/*.md`
- Implementation workflow and best practices

**Session 3: Agentic Loops & Rubber Duck (40 min)**
- What are agentic loops: plan → act → observe → reflect
- The Ralph loop: Copilot's validation and self-correction pattern
- Rubber Duck: cross-model review using Copilot CLI
- Building your first agent: starting minimal, testing, iterating

**Session 4: Patterns & Antipatterns (25 min)**
- Single-agent vs. multi-agent patterns and tradeoffs
- Common antipatterns organized by category: scope, context, validation, maintenance
- Real-world case studies and fixes

**Key outcomes**: Setting up Copilot for a real project, understanding how agents iterate and self-correct, recognizing patterns to avoid.

---

### Module 3: Advanced (60 min) — 1:05–2:00

**Session 1: Patterns & Safety (25 min)**
- Advanced agent patterns: hierarchical, tool-specific, hybrid
- Pattern tradeoffs: flexibility vs. complexity, autonomy vs. safety
- Decision matrix for choosing patterns

**Session 2: Debugging & Diagnostics (25 min)**
- Chat debug logs with token composition visuals
- Agent debug traces showing actual iteration steps (PLAN, OBSERVE, ACT, REFLECT)
- Troubleshooting antipatterns: mapping debug symptoms to root causes

**Session 3: MCP Overview (10 min)**
- MCP (Model Context Protocol) architecture: host/client/server
- MCP configuration with one live example
- When to use MCP vs. Copilot Extensions

**Key outcomes**: Debugging Copilot interactions with real examples, extending Copilot with external tools via MCP.

---

### Module 4: ADO Integration (30 min) — 2:05–2:35

**Why This Matters**
- Copilot requires GitHub repos; ADO integration augments (not replaces) project management
- Strategic coexistence: use each tool for what it does best

**Core Topics**
- Architecture: ADO on top of GitHub + Copilot
- AB# linking workflow: syntax and integration flow
- Real-world scenario: 200-person org transition
- Capability matrix: what goes where
- Decision framework: when to integrate vs. GitHub-only

**Key outcomes**: Understanding how to layer ADO with GitHub for Copilot adoption without disrupting existing investments.

---

### Hands-On Lab & Wrap-Up (55 min) — 2:35–3:30

**Lab Activities** (teams work on their own projects):
1. Create `.github/copilot-instructions.md` with team standards (15 min)
2. Build a custom agent for your team's primary use case (15 min)
3. Debug a provided Copilot interaction using logs and traces (15 min)
4. Q&A and open discussion (10 min)

**Success Criteria**
- ✅ Instructions file is version-controlled and reflects your team's standards
- ✅ Custom agent has clear scope, focused instructions, and defined tools
- ✅ You can interpret debug logs and identify issues in agent behavior

---

## Facilitator Notes

### Pacing & Time Management

- **Foundations (60 min)**: High-speed overview of Copilot's capabilities. Demos are short (2-3 min each). Focus on key concepts, not deep dives.
- **Agentic Patterns (90 min)**: Core workshop content. Allow time for demo interactions — attendees will have questions. Balance demo time with instruction time.
- **Advanced (60 min)**: Show REAL debug output. Attendees need to see realistic traces, not sanitized examples. Have 2-3 pre-recorded debug sessions ready if live demos time out.
- **ADO Integration (30 min)**: Conversational pace. Tailor examples to your audience (if they use ADO, show their specific workflow).
- **Lab (55 min)**: Circulate and help teams. Some will finish early (give them advanced tasks); others will need support.

### Demo Repository

Clone the OctoCAT Supply repository ahead of time:
```bash
git clone https://github.com/microsoft/GitHubCopilot_Customized.git
cd GitHubCopilot_Customized
npm install
```

Have it open in VS Code before starting. Pre-open 2-3 chat sessions to avoid delays during module transitions.

### Handling Questions

**If a question is deep/off-topic**:
- "Great question! Let's capture that in the notes and circle back after lunch."

**If Copilot responses are slow**:
- Have a screenshot or recording of the expected output ready
- Say: "Network is a bit slow — here's what this typically looks like [show screenshot]"

**If debug logs don't show expected output**:
- This is REAL troubleshooting — show your thought process: "Here's what I'd check next..."

### Contingency Plans

| Issue | Plan B |
|-------|--------|
| Copilot Extension fails | Uninstall/reinstall during lunch; have backup machine ready |
| Network lag | Use screenshots of debug logs + pre-recorded demos |
| Attendee confusion on agentic loops | Use the visual: PLAN → OBSERVE → ACT → REFLECT with concrete example |
| Lab runs out of time | Focus on getting instructions.md created; save custom agents for follow-up |

### One-Day Intensive Tips

- **Start strong**: Open with a 3-minute live demo of Copilot in action — hook them immediately
- **Energy dips**: Around 1:30 PM (post-lunch), switch to more interactive content (Q&A, lab) rather than slides
- **Breaks matter**: Enforce the 5-minute breaks — people need them
- **Close tight**: End with actionable next steps, not just "thanks for attending"
- **Leave documents**: Slide decks, links, and code examples should be accessible after the day (share in a repo or wiki)

---

## Resources & Links

### Official Documentation
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Copilot Chat in VS Code](https://code.visualstudio.com/docs/copilot/copilot-chat)
- [Custom Instructions & Agents](https://github.com/features/copilot)
- [MCP (Model Context Protocol)](https://modelcontextprotocol.io/)

### Demo Repository
- **OctoCAT Supply** (Node.js API): [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)
  - Pre-configured with sample copilot-instructions.md
  - Includes example API routes, database schema, tests
  - Good for demonstrating context targeting and agent behavior

### GitHub + Azure DevOps Integration
- [GitHub + Azure DevOps Integration](https://github.com/github/gh-ado)
- [AB# Linking Guide](https://github.com/github/gh-ado/wiki/AB-Linking)
- [Migrating from Azure Repos to GitHub](https://docs.github.com/en/migrations/importing-your-projects-to-github/importing-source-code/importing-from-azure-devops)

### Copilot CLI & Advanced Tools
- [Copilot CLI](https://github.com/github/cli)
- [Copilot CLI Agents](https://docs.github.com/en/copilot/copilot-in-the-cli)
- [Rubber Duck Feature](https://docs.github.com/en/copilot/copilot-in-the-cli/using-github-copilot-in-the-cli#rubber-duck-debugging)

### Learning Resources
- [GitHub Skills: Copilot Courses](https://github.com/skills)
- [AI Policy & Safety](https://github.blog/2023-10-30-how-we-designed-gits-ai-features-responsibly/)
- [Prompt Engineering Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)

### Slack/Teams Channels (optional)
- Create a dedicated channel for post-workshop questions
- Example: `#copilot-help`, `#copilot-wins`
- Share weekly tips and antipattern catches

---

## Post-Workshop Actions

### For Attendees (Week 1)
1. Create `.github/copilot-instructions.md` in your primary repo — get team input
2. Create one custom agent for your most common use case
3. Enable debug mode and explore your own interactions
4. Test AB# linking if you use Azure DevOps

### For Facilitators (Within 1 week)
1. Collect feedback via survey or quick Slack poll
2. Identify "stuck" teams and reach out with office hours
3. Share follow-up materials: recorded demos, debug examples, code snippets
4. Highlight wins: "Team X built their first agent!"

### For Teams (Ongoing)
- **Monthly**: Review copilot-instructions.md; update if standards changed
- **Quarterly**: Audit agents for antipatterns; rotate who writes instructions
- **Quarterly**: Share debug stories: "Here's what went wrong and how we fixed it"

---

## Customization Notes

This one-day intensive is designed to be **modular and flexible**. You can:

- **Extend to 1.5 days**: Add more lab time, deepen MCP topic, add security workshop
- **Focus on one module**: Each module (Foundations, Agentic, Advanced, ADO) stands alone and is ~60–90 min
- **Shorten to 4 hours**: Cut ADO Integration and reduce labs; focus on Foundations + Agentic only
- **Target by role**: 
  - **For developers**: Emphasize Foundations, Agentic, Advanced, less ADO
  - **For architects**: Emphasize patterns, antipatterns, multi-agent design
  - **For ops/leads**: Emphasize ADO integration, cost management, governance

---

*Comprehensive curriculum guide for GitHub Copilot Developer Training — One-Day Intensive. All four modules are production-ready and can be delivered standalone or as an integrated full-day workshop.*
