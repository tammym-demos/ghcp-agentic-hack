# GitHub Copilot Admin, Licensing & Governance

## Slide Deck with Presenter Notes

**Duration**: 1 hour 20 minutes  
**Format**: Presentation + Live Demos (intermixed)  
**Audience**: Mixed engineering teams (Admins + Managers)

---

> **Presenter Note**: This deck is designed for present-then-demo flow. Each section has slides followed by a live demo. Look for 🖥️ **SWITCH TO DEMO** markers.

---

## Slide 1: Title

# GitHub Copilot
## Admin, Licensing & Governance Workshop

*Operationalizing AI-Assisted Development at Enterprise Scale*

---

> **Presenter Note**: Welcome attendees. Set expectations: "This is a practical session—we'll cover concepts briefly then I'll show you exactly where to configure these settings in the admin portal."

---

## Slide 2: Agenda

### What We'll Cover Today

| Time | Topic |
|------|-------|
| 5 min | [Opening & Context Setting](#slide-3-why-this-matters) |
| 10 min | [Licensing & Seat Management](#section-licensing--seat-management) |
| 15 min | [Security Controls & IP Protection](#section-security-controls) |
| 20 min | [Data Protection & Trust Architecture](#section-data-protection--trust) |
| 15 min | [Policy Configuration](#section-policy-configuration) |
| 10 min | [Operational Governance](#section-operational-governance) |
| 5 min | [Rollout Best Practices & Wrap-up](#section-rollout-best-practices) |

**Format**: Concepts → Live Demo → Discussion (repeat)

---

> **Presenter Note**: "We'll move between slides and the live GitHub admin portal. Feel free to stop me with questions—but I'll also leave time at the end."

---

## Slide 3: Why This Matters

### AI Coding Assistants Are Different

Traditional tools:
- Install → Configure → Done

AI Assistants require ongoing governance:
- **Data flows** through external services
- **Code context** is analyzed in real-time
- **Suggestions** may reflect training data patterns
- **Adoption** varies wildly without enablement

---

> **Presenter Note**: "Copilot isn't just another IDE plugin. It's processing your code context continuously. That's powerful—but it means we need intentional governance."

---

## Slide 4: The Governance Triangle

```
        ┌─────────────┐
        │   SECURITY  │
        │   IP, Data  │
        └──────┬──────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───┴───┐           ┌─────┴─────┐
│ COST  │           │  POLICY   │
│ Seats │           │  Control  │
└───────┘           └───────────┘
```

**Balance all three** for successful enterprise adoption

---

> **Presenter Note**: "Think of governance as balancing these three: Security (protecting IP), Cost (managing seats), and Policy (consistent controls). We'll touch all three today."

---

## Slide 5: Copilot Enterprise vs Business

### Why Enterprise for Governance?

| Capability | Business | Enterprise |
|------------|:--------:|:----------:|
| Code completions | ✓ | ✓ |
| Chat in IDE | ✓ | ✓ |
| Chat on github.com (PR summaries) | ✗ | ✓ |
| **Enterprise-level policies** | ✗ | ✓ |
| **Knowledge bases** | ✗ | ✓ |
| **Content exclusions** | Org only | Enterprise |
| **Centralized seat management** | ✗ | ✓ |

---

> **Presenter Note**: "You're on Enterprise, which gives you the full governance toolkit. The key differentiators are highlighted—enterprise-level policy enforcement and EMU integration for identity management."

---

## Slide 6: Policy Hierarchy

### How Policies Flow Down

```
┌─────────────────────────────────────┐
│         ENTERPRISE                  │
│   Sets baseline, can enforce        │
└──────────────────┬──────────────────┘
                   │ inherits
┌──────────────────▼──────────────────┐
│         ORGANIZATION                │
│   Can customize (if allowed)        │
└──────────────────┬──────────────────┘
                   │ inherits
┌──────────────────▼──────────────────┐
│         REPOSITORY                  │
│   Most specific settings            │
└─────────────────────────────────────┘
```

**Key principle**: Higher levels can **enforce** or **delegate**

---

> **Presenter Note**: "This hierarchy is critical. When you set something at enterprise level to 'Enabled' or 'Disabled', it's enforced everywhere. 'No Policy' lets lower levels decide. We'll see this live in a moment."

---

# SECTION: Licensing & Seat Management

---

## Slide 7: Licensing Model

### How Copilot Seats Work

- **Per-seat licensing**: Each user needs an assigned seat
- **Monthly billing**: Seats billed per calendar month
- **Assignment options**:
  - Enterprise-wide (all members)
  - Organization-level (per org)
  - Individual assignment (granular)

---

> **Presenter Note**: "Unlike some tools that are org-wide licenses, Copilot is per-seat. This gives you control but also means you need a strategy for who gets access."

---

## Slide 8: Seat Allocation Strategies

### Three Approaches

| Strategy | Best For | Trade-off |
|----------|----------|-----------|
| **All members** | Max adoption | Higher cost, less control |
| **Org-based** | Team alignment | Medium complexity |
| **Request-based** | Cost control | Slower adoption, admin overhead |

### Recommendation
Start with **org-based** for pilot teams, expand based on usage data

---

> **Presenter Note**: "Most enterprises start with org-based—enable specific teams first, measure adoption, then expand. Pure request-based creates too much friction."

---

## Slide 9: Cost Optimization

### Managing Seat Utilization

**Watch for**:
- Assigned but inactive seats (no usage in 30+ days)
- Duplicate assignments across orgs
- Seats for service accounts (not needed)

**Metrics to track**:
- Active users / Total seats = Utilization rate
- Target: >80% utilization

---

> **Presenter Note**: "The usage dashboard will show you who's actually using Copilot. If utilization is low, either reassign seats or invest in training—don't just pay for shelf-ware."

---

## Slide 10: Demo Time

# 🖥️ LIVE DEMO

### Seat Assignment & Policy Inheritance

- Enterprise Copilot settings
- Seat management interface
- Policy inheritance visualization

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 1** in your browser. Walk through seat assignment at enterprise level, then show how it appears at org level. ~3-4 minutes.

---

# SECTION: Security Controls

---

## Slide 11: Security Architecture

### How Data Flows

```
┌──────────┐    prompt     ┌──────────────┐
│   IDE    │ ───────────►  │   Copilot    │
│          │               │   Service    │
│          │  ◄─────────── │              │
└──────────┘   suggestion  └──────────────┘
```

**What's transmitted**:
- Current file context
- Open file snippets
- Prompt/chat messages

**What's NOT used for training**:
- Your code (Enterprise guarantee)
- Your prompts (Enterprise guarantee)

---

> **Presenter Note**: "The #1 question from security teams: 'Is our code being used to train AI?' With Enterprise, the answer is definitively no. Your code and prompts are processed but not retained for training."

---

## Slide 12: Content Exclusions

### Protecting Sensitive Code

**Use cases**:
- Proprietary algorithms
- Security implementations
- Compliance-restricted code
- Third-party licensed code

**How it works**:
- Define path patterns (glob syntax)
- Copilot ignores these files completely
- No suggestions from or about excluded code

---

> **Presenter Note**: "Content exclusions are your scalpel for protecting specific code. Think about what your security team would never want analyzed by an external service."

---

## Slide 13: Exclusion Patterns

### Common Patterns

```
**/secrets/**        → Any secrets folder
**/*.env             → All .env files
**/internal-api/**   → Internal API code
src/crypto/**        → Cryptography implementations
**/vendor/**         → Third-party code
```

**Scope**: Set at Organization or Repository level

---

> **Presenter Note**: "Patterns use glob syntax. Double asterisk means 'any depth'. These are additive—you can set org-wide patterns plus repo-specific ones."

---

## Slide 14: Public Code Filter

### IP Protection Layer

**When enabled (Blocked)**:
- Suggestions checked against public code index
- Matching suggestions filtered out
- Adds ~100ms latency

**Trade-off**:

| Setting | Pros | Cons |
|---------|------|------|
| Blocked | Reduces IP/license risk | Fewer suggestions |
| Allowed | More suggestions | Requires developer judgment |

---

> **Presenter Note**: "This is your insurance policy against accidentally including GPL or other licensed code. Most regulated industries require this to be blocked."

---

## Slide 15: Demo Time

# 🖥️ LIVE DEMO

### Security Controls

- Configure content exclusions
- Enable public code filter
- Show policy enforcement

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMOS 2 & 3**. Show content exclusion configuration first, then public code filter toggle. ~5-6 minutes total.

---

# SECTION: Data Protection & Trust

---

## Slide 16: Copilot Data Flow Architecture

### How Your Data Is Protected End-to-End

```
┌──────────────┐         TLS 1.2+          ┌─────────────────────┐
│              │ ────────────────────────►  │   Copilot Proxy     │
│   IDE /      │    Prompt + context        │   (GitHub-hosted)   │
│   Editor     │                            │                     │
│              │  ◄──────────────────────── │   ┌───────────────┐ │
│              │    Suggestion response     │   │ Azure OpenAI  │ │
└──────────────┘         TLS 1.2+          │   │ Service       │ │
                                            │   └───────────────┘ │
                                            └─────────────────────┘
                                                      │
                                            ┌─────────▼─────────┐
                                            │  NOT transmitted:  │
                                            │  • Training pipeline│
                                            │  • Other customers │
                                            │  • Long-term store │
                                            └────────────────────┘
```

**Enterprise Guarantees**:
- **Encrypted** in transit (TLS 1.2+) and at rest
- **NOT retained** beyond the request lifecycle
- **NOT used for training** — contractual guarantee
- **Isolated tenant boundaries** — no cross-customer sharing

---

> **Presenter Note**: *"This is the slide your CISO cares about most. Walk through the data flow left to right: prompt leaves the IDE encrypted, hits the Copilot proxy, processed by Azure OpenAI, response comes back encrypted. Nothing persists. Nothing trains. Nothing leaks to other customers."*

---

## Slide 17: Data Categories & Retention

### What Copilot Collects and How It's Handled

| Data Category | What It Includes | Retained? | Used for Training? |
|---------------|------------------|:---------:|:------------------:|
| **Prompts** | Code context, chat messages | ✗ | ✗ |
| **Suggestions** | Generated completions, chat responses | ✗ | ✗ |
| **Feedback** | Thumbs up/down, comments | Limited | ✗ |
| **Engagement** | Accepted/dismissed metrics, errors | Aggregated | ✗ |

> **Note**: Individual (Free/Pro) plans may retain prompts up to 28 days. Business & Enterprise have **zero retention**.

---

> **Presenter Note**: *"Four categories of data, zero training usage across all of them. The key differentiator for Business and Enterprise is zero retention on prompts and suggestions. This is the answer to 'what happens to my code?' — it's processed and discarded."*

---

## Slide 18: Trust Center & Compliance

### Your Security Review Toolkit

**Certifications**:

| Certification | Scope |
|---------------|-------|
| SOC 1/2/3 Type II | Financial controls, security, availability |
| ISO 27001:2013 | Information security management |
| CSA STAR Level 2 | Cloud security assurance |
| TISAX | Automotive industry security |

**Trust Center**: [copilot.github.trust.page](https://copilot.github.trust.page/)
- Downloadable SOC 1 & 2 Type II audit reports
- Bridge letters covering inter-audit periods
- Security, Privacy, IP & Commercial FAQs
- Ongoing updates feed for transparency

---

> **Presenter Note**: *"Bookmark the Trust Center URL — it's powered by Vanta and has everything your security team needs for vendor assessments. SOC 2 reports are downloadable, the FAQ covers the most common security questionnaire items, and the Updates feed shows GitHub's ongoing compliance posture."*

---

## Slide 19: Multi-Model Data Guarantees

### Third-Party Models Follow the Same Rules

When users select Claude (Anthropic) or Gemini (Google):

- Providers are **contractually bound** to not train on customer data
- **No code or prompt retention** beyond the request
- GitHub remains the **single data processor** — unified governance
- **IP indemnification** covers Business & Enterprise (with public code filter enabled)

### GitHub's Processing Role

| Aspect | Commitment |
|--------|------------|
| GDPR role | **Processor** (not controller) |
| DPA coverage | Includes Copilot processing |
| Subprocessors | Disclosed, contractually bound |
| Agentic features | Same protections (Coding Agent, MCP, extensions) |

---

> **Presenter Note**: *"Common concern: 'If I switch to Claude or Gemini, does my data go somewhere new with different rules?' No. GitHub is always the processor. Third-party providers have the same contractual obligations. And agentic features — Coding Agent, MCP servers — inherit identical protections."*

---

## Slide 20: Demo Time

# 🖥️ LIVE DEMO

### Trust Center Walkthrough

- Navigate [copilot.github.trust.page](https://copilot.github.trust.page/)
- Show compliance certifications and SOC reports
- Tour FAQ sections (Security, Privacy)
- Highlight the Updates feed

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO** — Open the Trust Center in your browser. Tour the main page, click into Resources to show downloadable reports, then open the FAQ and expand 2-3 questions from the Security and Privacy sections. ~3 minutes.

---

# SECTION: Policy Configuration

---

## Slide 21: Available Policy Controls

### What You Can Configure

| Policy | What It Controls |
|--------|------------------|
| **Copilot in IDE** | Code completions in editors |
| **Copilot Chat** | Conversational AI interface |
| **Copilot CLI** | Terminal/shell integration |
| **Public code filter** | Suggestion filtering |
| **Knowledge bases** | Internal doc references |

---

> **Presenter Note**: "These are your main levers. Each can be Enabled, Disabled, or delegated via 'No Policy'. Think about which you want to standardize vs. let teams decide."

---

## Slide 22: Policy Decision Framework

### When to Enforce vs Delegate

**Enforce at Enterprise** when:
- Security/compliance requirement
- Consistent experience needed
- Preventing shadow IT

**Delegate to Orgs** when:
- Teams have different needs
- Piloting new features
- Low-risk setting

---

> **Presenter Note**: "My rule of thumb: security settings enforced at enterprise, productivity features delegated to orgs. You don't want one team's experiment to become a compliance issue."

---

## Slide 23: Knowledge Bases

### Enterprise-Only Feature

**What it does**:
- Connect internal repos as reference sources
- Copilot Chat can search your documentation
- Grounded answers from your codebase

**Use cases**:
- Internal API documentation
- Coding standards and patterns
- Architecture decision records

---

> **Presenter Note**: "Knowledge bases turn Copilot Chat into an expert on YOUR systems. Instead of generic answers, it references your actual docs and code. Huge for onboarding."

---

## Slide 24: Custom Instructions

### Org-Wide Coding Standards

Create `.github/copilot-instructions.md`:

```markdown
# Coding Standards

- Use TypeScript strict mode
- All functions require JSDoc
- No console.log in production code
- Prefer async/await over .then()
```

Copilot incorporates these into every suggestion

---

> **Presenter Note**: "This is often overlooked but powerful. That markdown file becomes invisible context for all Copilot interactions in your org. Great for enforcing standards without nagging."

---

## Slide 25: Demo Time

# 🖥️ LIVE DEMO

### Policy Configuration

- Walk through all policy settings
- Show enforce vs delegate
- Knowledge base overview

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 4**. Tour all policy settings, toggle one live to show the flow, show knowledge base UI if time permits. ~5 minutes.

---

# SECTION: Operational Governance

---

## Slide 26: Roles & Responsibilities

### Who Manages What

| Role | Scope | Key Actions |
|------|-------|-------------|
| **Enterprise Owner** | All orgs | Policies, billing, audit |
| **Org Admin** | Single org | Seats, org policies |
| **Billing Manager** | Financial | Usage reports, cost |
| **Security Manager** | Compliance | Audit logs, exclusions |

---

> **Presenter Note**: "Governance is a team sport. Make sure you have the right people in the right roles. Enterprise Owners should be limited—they have significant power."

---

## Slide 27: Usage Analytics

### Metrics That Matter

**Adoption**:
- Active users / Assigned seats
- Daily/weekly/monthly trends

**Effectiveness**:
- Acceptance rate (% suggestions kept)
- Languages with highest usage

**ROI indicators**:
- Lines of code suggested
- Time in Copilot Chat

---

> **Presenter Note**: "The dashboard gives you data to justify the investment and identify training needs. Low acceptance rates? Maybe developers need coaching on better prompts."

---

## Slide 28: Compliance & Audit

### Audit Trail Coverage

| Event Type | Example |
|------------|---------|
| Seat changes | User added/removed |
| Policy updates | Setting toggled |
| Content exclusions | Pattern added |
| Access changes | Permissions modified |

**Export options**: JSON, CSV for SIEM integration

---

> **Presenter Note**: "For SOC 2, GDPR, or internal audits, you need evidence of controls. The audit log captures every governance-relevant action with who, what, and when."

---

## Slide 29: Demo Time

# 🖥️ LIVE DEMO

### Operational Governance

- Usage analytics dashboard
- Audit log filtering
- Export capabilities

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMOS 5 & 6**. Show usage dashboard metrics, then filter audit log for Copilot events. ~4 minutes.

---

# SECTION: Rollout Best Practices

---

## Slide 30: Phased Approach

### Don't Boil the Ocean

```
Phase 1: PILOT (2-4 weeks)
├── 2-3 teams, 50-100 developers
├── Establish baseline metrics
└── Refine policies based on feedback

Phase 2: EXPAND (4-8 weeks)  
├── Additional orgs/teams
├── Train team leads
└── Address edge cases

Phase 3: ENTERPRISE-WIDE
├── Default access enabled
├── Ongoing monitoring
└── Regular policy reviews
```

---

> **Presenter Note**: "Resist the urge to flip the switch for everyone on day one. Phased rollout lets you learn and adjust before scaling."

---

## Slide 31: Common Pitfalls

### What Goes Wrong

| Pitfall | Consequence | Prevention |
|---------|-------------|------------|
| No training | Low adoption | Enablement sessions |
| Too restrictive | Developer frustration | Start moderate, tighten if needed |
| No metrics | Can't prove ROI | Track from day one |
| No ownership | Drift, inconsistency | Assign governance owner |

---

> **Presenter Note**: "I've seen all of these. The most common is deploying without training—developers don't know how to use it effectively, adoption stalls, and leadership questions the investment."

---

## Slide 32: Success Factors

### What Works

✓ **Executive sponsorship** — Visible support from leadership

✓ **Clear policies** — Documented, communicated, enforced

✓ **Training investment** — Not just access, but enablement

✓ **Feedback loops** — Regular check-ins with pilot teams

✓ **Metrics discipline** — Track and report adoption/ROI

---

> **Presenter Note**: "If I had to pick one: training investment. The difference between a team that gets 2 hours of enablement vs. none is dramatic in adoption rates."

---

## Slide 33: Your Action Items

### What to Do Next

- [ ] Audit current Copilot configuration
- [ ] Define content exclusion requirements
- [ ] Identify pilot teams (if not deployed)
- [ ] Establish baseline metrics
- [ ] Create internal governance policy doc
- [ ] Schedule enablement sessions

---

> **Presenter Note**: "These are your homework items. I'm happy to do a follow-up session after you've done an initial configuration review."

---

## Slide 34: Resources

### Learn More

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Managing Copilot in Enterprise](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization)
- [Copilot Trust Center](https://resources.github.com/copilot-trust-center/)
- [GitHub Skills](https://skills.github.com/)

---

> **Presenter Note**: "The Trust Center is particularly useful for security reviews—it has all the compliance documentation, data handling details, and certifications."

---

## Slide 35: Q&A

# Questions?

### Common Topics

- Cost justification strategies
- Integration with existing security tools
- Handling developer resistance
- Industry-specific compliance

---

> **Presenter Note**: Leave 5 minutes for Q&A. Have the admin portal open in case questions require showing specific settings. If no questions, offer to do a deeper dive on any section.

---

## Slide 36: Thank You

# Thank You

**Contact**: [Your contact info]

**Follow-up**: Happy to schedule a deeper dive on any topic

---

> **Presenter Note**: Thank attendees, remind them of the action items, offer follow-up support.

---

# Appendix: Quick Reference for Presenter

## Demo Timing Guide

| After Slide | Demo | Duration |
|-------------|------|----------|
| 10 | Seat Assignment | 3-4 min |
| 15 | Content Exclusions + Public Code | 5-6 min |
| 20 | Trust Center Walkthrough | 3 min |
| 25 | Policy Configuration | 5 min |
| 29 | Usage + Audit | 4 min |

**Total demo time**: ~20-22 minutes  
**Total slide time**: ~45-50 minutes  
**Buffer/Q&A**: ~5 minutes

## Backup URLs

```
Enterprise AI Controls (Copilot):
https://github.com/enterprises/[NAME]/settings/copilot/policies

Org Settings:
https://github.com/orgs/[NAME]/settings/copilot/policies

Usage Dashboard:
https://github.com/enterprises/[NAME]/settings/copilot/usage

Audit Log:
https://github.com/enterprises/[NAME]/settings/audit-log
```

---

*Slide deck for GitHub Copilot Enterprise Governance Workshop*
