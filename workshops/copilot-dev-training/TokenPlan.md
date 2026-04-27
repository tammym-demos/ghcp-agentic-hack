# Plan: Token Usage & Cost Management Content

## TL;DR

Enhance Session 3 of Module 1 (Foundations) with accurate, up-to-date billing content reflecting the June 2026 transition from premium-request-based to usage-based (AI Credits) billing. Add practical cost-saving strategies developers and admins can act on immediately.

## The Billing Transition

There is a major billing transition happening **June 1, 2026**:

| Aspect | Current (pre-June) | New (June 1, 2026) |
|--------|-------------------|-------------------|
| **Billing unit** | Premium requests (per-prompt) | AI Credits (per-token) |
| **What counts** | 1 request × model multiplier | Input tokens + output tokens + cached tokens |
| **Included free** | GPT-4.1, GPT-4o, GPT-5 mini (0x multiplier) | Code completions + next edit suggestions unlimited; 1,900–3,900 AI credits/mo |
| **Pooling** | Per-user monthly allowance | Pooled at billing entity level |
| **Cost unit** | Premium request count | 1 AI credit = $0.01 USD |

### Key Details — Usage-Based Billing (AI Credits)

- **GitHub AI Credits** are the new billing unit: 1 AI credit = $0.01 USD
- Billing based on actual token consumption: input tokens + output tokens + cached tokens
- Cost = tokens × model pricing → converted to AI credits
- **Code completions and next edit suggestions remain UNLIMITED** (not billed in AI credits)
- Included AI credits per license per month:
  - Copilot Business: 1,900
  - Copilot Enterprise: 3,900
- Credits are **pooled at billing entity level** — power users offset by light users
- Promotional amounts for first 3 months (June–September 2026): 3,000 (Business) / 7,000 (Enterprise)
- Unused credits do not roll over

### Model Multipliers (Current Premium Request Model)

| Model | Paid Plan Multiplier | Free Plan |
|-------|---------------------|-----------|
| GPT-4.1, GPT-4o, GPT-5 mini | **0x (free)** | 1x |
| Raptor mini | **0x (free)** | 1x |
| GPT-5.4 nano | 0.25x | N/A |
| Grok Code Fast 1 | 0.25x | 1x |
| Claude Haiku 4.5, Gemini 3 Flash, GPT-5.4 mini | 0.33x | N/A |
| Claude Sonnet 4/4.5/4.6, Gemini 2.5 Pro, GPT-5.2/5.4 | 1x | N/A |
| Claude Opus 4.5/4.6 | 3x | N/A |
| Claude Opus 4.7, GPT-5.5 | 7.5x | N/A |
| Claude Opus 4.6 (fast mode) | 30x | N/A |

### Budget Controls (4 Levels)

1. **Enterprise-level** — tracks all orgs, repos, cost centers
2. **Organization-level** — tracks all repos in the org
3. **Cost-center-level** — tracks a single cost center
4. **User-level** — tracks individual users ($0 budget = no access)

Budgets can trigger alerts or enforce hard stops. No automatic fallback to cheaper models when exhausted.

## 10 Developer-Level Cost Strategies

1. **Use included models** — GPT-4.1, GPT-4o, GPT-5 mini are 0x multiplier (free on paid plans)
2. **Auto model selection** — 10% discount on multipliers in Copilot Chat (VS Code, JetBrains)
3. **Low-multiplier models for routine work** — Haiku (0.33x), GPT-5.4 nano (0.25x), Grok Code Fast (0.25x)
4. **Reserve premium models for hard problems** — Opus 4.7 is 7.5x, GPT-5.5 is 7.5x, Opus 4.6 fast is 30x
5. **Lean `copilot-instructions.md`** — every token there is sent with every interaction
6. **Targeted context** (`#file` not `#codebase`) — reduces input tokens dramatically
7. **Fresh sessions** — prevents conversation history bloat eating the token budget
8. **File-targeted instructions** — only load when matching files are active (vs always-on repo instructions)
9. **Per-user budgets** — prevent runaway spending at the individual level
10. **Monitor usage reports** — identify high-consumption patterns before they become bills

## Where to Put This Content

### Recommended: Enhance existing Session 3.5 (Token Management & Budgeting) in Module 1

The content already covers token management strategies and premium request tracking. Updating it with AI Credits, model multipliers, and the billing transition is a natural fit.

### Files to Modify

| File | Section | Changes |
|------|---------|---------|
| `copilot-dev-foundations-workshop.md` | Section 3.5 | Rewrite with AI Credits model, transition timeline, multiplier table, 10 cost strategies, admin budget controls |
| `copilot-dev-foundations.slidev.md` | Token Management slides | Replace with AI Credits overview + model multiplier table + cost strategies |
| `copilot-dev-foundations-LAB.md` | Exercise 3.4 | Update to include a cost-per-task calculation exercise using actual multipliers |

### Content Outline for Session 3.5

**Workshop Section 3.5 — Token Management, Billing & Cost Strategies (15 min)**

1. The billing transition: premium requests → AI Credits (June 1, 2026)
2. What are AI Credits? (1 credit = $0.01, token-based pricing)
3. What's free? (completions, next edit suggestions, included models)
4. Model multiplier table — know the cost of what you're using
5. The 10 cost strategies (developer actions)
6. Admin controls: budgets at 4 levels, policies, usage reports
7. Auto model selection — the easy win (10% discount)

**Slidev (2 slides)**

- Slide 1: AI Credits overview + transition + what's free
- Slide 2: Model multiplier table + top cost strategies

**LAB Exercise**

- Calculate cost for 3 scenarios: quick chat (GPT-4o = free), code review (Sonnet = 1x), complex architecture (Opus = 7.5x)
- Set up auto model selection and observe the discount
- Review your token usage in debug mode

## Sources

- <https://docs.github.com/en/copilot/concepts/billing/copilot-requests>
- <https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises>
- <https://docs.github.com/en/copilot/concepts/auto-model-selection>
- <https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-request-allowances>
