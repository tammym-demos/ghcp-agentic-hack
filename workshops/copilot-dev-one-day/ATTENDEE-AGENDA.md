# GitHub Copilot Developer Training: One-Day Intensive

**Date**: [Your Date]  
**Time**: 9:30 AM – 3:30 PM (6 hours)  
**Location**: [Your Location]  
**Instructor**: [Your Name]  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)

---

## ⏰ SCHEDULE AT A GLANCE

| Time | Duration | Module | Key Takeaway |
|------|----------|--------|--------------|
| **9:30–10:30** | 60 min | **Module 1: Foundations** | Master chat interface, context, and instructions |
| **10:30–12:00** | 90 min | **Module 2: Agentic Patterns** | Understand how agents think & self-correct |
| **12:00–12:30** | 30 min | 🍽️ **LUNCH BREAK** | Recharge! |
| **12:30–1:30** | 60 min | **Module 3: Advanced Topics** | Debug agents, integrate tools, evaluate output |
| **1:30–2:00** | 30 min | **Module 4: ADO Integration** | Layer Copilot onto your existing ADO workflows |
| **2:00–3:30** | 90 min | **🧪 HANDS-ON LAB** | Build custom instructions & agents (apply everything!) |

---

## 📚 DETAILED AGENDA

### 9:30 AM — Module 1: Copilot Foundations (60 min)

**What We'll Cover**
- The Copilot chat interface (inline completions, chat panel, quick questions)
- Context targeting: `@workspace`, `@vscode`, `@terminal`
- Custom instructions: how to teach Copilot your team's standards
- Managing token budgets and model selection

**AI Safety Moment**
*"AI is a partner, not a replacement. You remain the decision-maker."*

**Your Takeaway**
You'll leave knowing how to use Copilot intentionally — not just as autocomplete, but as a reasoning partner.

---

### 10:30 AM — Module 2: Agentic Patterns (90 min)

**What We'll Cover**
- How agents iterate: the Plan → Act → Observe → Reflect cycle
- The Ralph Loop: how agents self-validate and fix their own errors
- Rubber Duck debugging: leveraging cross-model review to catch mistakes
- 8 antipatterns to avoid when building agents
- Setting up agents in your repository (`.github/agents/`)

**AI Safety Moment**
*"Context Integrity Prevents Hallucinations. Better instructions = fewer errors."*

**Your Takeaway**
You'll understand exactly how agents reason and fail — so you can design workflows that work.

---

### 12:00 PM — 🍽️ LUNCH BREAK (30 min)

*Grab lunch, stretch, recharge.*

---

### 12:30 PM — Module 3: Advanced Topics (60 min)

**What We'll Cover**
- Debugging agent workflows (log channels, debug mode, traces)
- Extending Copilot with VS Code Chat Participants and GitHub Copilot Extensions
- MCP (Model Context Protocol): connecting external tools to Copilot
- Evaluation frameworks: how to measure if AI output is good
- Building cost-effective workflows (token management, model selection)

**AI Safety Moment**
*"Give Agents an Off-Ramp. Design for escalation and human oversight."*

**Your Takeaway**
You'll know how to troubleshoot when things go wrong, extend Copilot safely, and evaluate quality.

---

### 1:30 PM — Module 4: GitHub + Azure DevOps Integration (30 min)

**What We'll Cover**
- Why GitHub is your Copilot foundation (Copilot lives here)
- How ADO integration layers on top (without replacing your existing workflows)
- AB# linking: the glue between GitHub issues and ADO work items
- Real-world migration scenarios
- Decision framework: when to integrate vs. GitHub-only

**AI Safety Moment**
*"Tool Trust & Boundaries. Establish clear permissions and audit regularly."*

**Your Takeaway**
You'll understand how to unlock Copilot without abandoning your ADO investment.

---

### 2:00 PM — 🧪 HANDS-ON LAB: Build Custom Agents (90 min)

**What We'll Do**
1. **Set up your `.github` folder** (10 min) — Create the structure Copilot looks for
2. **Write custom instructions** (20 min) — Encode your team's standards into a file
3. **Build your first agent** (20 min) — Create a specialized agent with focus areas
4. **Test it with Copilot** (15 min) — See your instructions in action
5. **Plan your implementation** (20 min) — Leave with a concrete next-step checklist

**You'll Have**
- A `.github/copilot-instructions.md` file you can use Monday morning
- A sample agent in `.github/agents/` ready to customize
- A checklist for rolling out Copilot across your team

**Need Help?**
- Instructors and TAs are available throughout the lab
- Reference materials are in the lab guide (see below)
- Ask your neighbor — collaborative problem-solving is encouraged!

---

## 📖 RESOURCES & NEXT STEPS

### Hands-On Lab Guide
👉 **[copilot-dev-one-day-LAB.md](./copilot-dev-one-day-LAB.md)** — Full lab instructions, exercises, and troubleshooting

### Module Slides
- **Module 1: Foundations** — [Slides](./copilot-dev-foundations/copilot-dev-foundations.slidev.md)
- **Module 2: Agentic Patterns** — [Slides](./copilot-dev-agentic/copilot-dev-agentic.slidev.md)
- **Module 3: Advanced Topics** — [Slides](./copilot-dev-advanced/copilot-dev-advanced.slidev.md)
- **Module 4: ADO Integration** — [Slides](./copilot-dev-ado-integration/gh-ado-integration-30min.slidev.md)

### Sample Repository
- **GitHubCopilot_Customized** — [github.com/microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)
  - Example custom instructions
  - Sample agents (code-reviewer, feature-builder, debugger)
  - Real-world `.github` folder structure

### Documentation
- **Custom Instructions** — [GitHub Docs](https://docs.github.com/en/copilot/customizing-copilot/customize-copilot-settings)
- **Custom Agents** — [GitHub Docs](https://docs.github.com/en/copilot/building-copilot-extensions/using-custom-agents)
- **Model Context Protocol (MCP)** — [Protocol Specification](https://modelcontextprotocol.io)
- **ADO + GitHub Integration** — [Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/boards/github/)

### Post-Workshop Actions
1. **Share your instructions** with your team and iterate based on feedback
2. **Run a team Copilot safety review** — Discuss trust boundaries and risk tolerance
3. **Start with one custom agent** — Don't boil the ocean; pilot one specialized agent
4. **Set up Copilot debugging** — Enable agent logs for troubleshooting
5. **Schedule a follow-up** — Circle back in 2 weeks to share learnings and challenges

---

## ❓ QUICK REFERENCE

### Key Shortcuts
| Action | Shortcut |
|--------|----------|
| Open Copilot Chat | `Ctrl+Shift+I` (Windows) / `Cmd+Shift+I` (Mac) |
| Inline Completions | Type and press `Tab` |
| Quick Chat | `Ctrl+Shift+Alt+L` |

### AI Safety Checkpoints (The Four Moments)
1. **Module 1: "AI as Partner, Not Replacement"** — You own the decisions
2. **Module 2: "Context Integrity Prevents Hallucinations"** — Better instructions = fewer errors
3. **Module 3: "Give Agents an Off-Ramp"** — Design for human escalation
4. **Module 4: "Tool Trust & Boundaries"** — Control what each tool can see and do

### File Structure You'll Create Today
```
your-repo/
└── .github/
    ├── copilot-instructions.md         ← Your team's playbook
    └── agents/
        ├── code-reviewer.md            ← Specialized persona
        └── feature-builder.md          ← Another persona
```

---

## 📞 SUPPORT

**During the workshop:**
- Raise your hand or use chat
- TAs are circulating in the lab
- Ask your neighbor — everyone's learning together

**After the workshop:**
- Email: [instructor-email@example.com](mailto:instructor-email@example.com)
- Slack: #copilot-training
- Docs: [Link to internal Copilot wiki/guide]

---

## ✅ BEFORE YOU LEAVE

- [ ] Lab completed (`.github/copilot-instructions.md` created)
- [ ] Screenshots or notes from working agent demo
- [ ] Questions written down for follow-up
- [ ] Added instructor email to contacts
- [ ] Bookmarked reference docs for Monday

**Thank you for attending! You're now ready to unlock Copilot in your team.** 🚀
