# Model Distribution Matrix

Maps each agent and skill to the **specific model** best suited for its workload.
Use this guide when configuring `model:` overrides in agent YAML files or when
selecting models for skill invocations.

## Available Models (19 deployed)

### Premium Tier (Reasoning)

| Model | Context | Strengths | Best For |
|-------|---------|-----------|----------|
| Claude Opus 4.7 | standard | Deep analysis, multi-step plans | Architecture, security audits |
| Claude Opus 4.7 (1M) | 1M tokens | Entire-codebase reasoning | Legacy modernization, large repos |
| Claude Opus 4.7 High | standard | Extended chain-of-thought | Hard design problems, formal proofs |
| Claude Opus 4.7 XHigh | standard | Maximum reasoning depth | Most complex architectural decisions |
| Claude Opus 4.6 | standard | Stable predecessor, proven | Fallback for Opus 4.7 tasks |
| Claude Opus 4.6 (1M) | 1M tokens | Long-context predecessor | Fallback for large-context tasks |
| Claude Opus 4.5 | standard | Earlier generation, cost-effective | Secondary reasoning workloads |
| GPT-5.5 | standard | Broad knowledge, cross-domain | Strategy, regulatory, business logic |

### Standard Tier (Balanced)

| Model | Strengths | Best For |
|-------|-----------|----------|
| Claude Sonnet 4.6 | Latest balanced, improved code | Preferred for new balanced Claude tasks |
| Claude Sonnet 4.5 | Proven stable, good reviews | Reviews, prose, collaborative work |
| Claude Sonnet 4 | Earlier generation | Cost-effective fallback |
| GPT-5.4 | Structured output, IaC | Config, YAML, pipeline design |
| GPT-5.3-Codex | Newer code model | Preferred code generation |
| GPT-5.2-Codex | Proven code model | Stable code fallback |
| GPT-5.2 | General purpose | Secondary balanced tasks |

### Fast Tier (Speed/Cost)

| Model | Strengths | Best For |
|-------|-----------|----------|
| Claude Haiku 4.5 | Fast, good reasoning/cost | Triage, routing, classification |
| GPT-5.4 mini | Structured output, cheap | Boilerplate, scaffolding, templates |
| GPT-5 mini | Fast general purpose | Simple transforms, formatting |
| GPT-4.1 | Cheapest, fastest | Guardrails, binary checks, labeling |

## Agent → Model Assignment

### Reasoning Tier (Complex analysis, architecture, multi-file changes)

| Agent | Primary Model | Fallback | Rationale |
|-------|---------------|----------|-----------|
| api-designer | Opus 4.7 High | Opus 4.7 | API contracts benefit from extended reasoning |
| containerization-planner | GPT-5.5 | Opus 4.6 | Broad infra knowledge + long-context planning |
| incident-responder | Opus 4.7 | Opus 4.6 | Real-time multi-signal correlation under pressure |
| legacy-modernization | Opus 4.7 (1M) | Opus 4.6 (1M) | Needs entire-codebase context for migration |
| policy-as-code-compliance | GPT-5.5 | Opus 4.5 | Regulatory cross-referencing, policy reasoning |
| product-manager | GPT-5.5 | Opus 4.5 | Strategy synthesis, stakeholder trade-offs |
| security-analyst | Opus 4.7 XHigh | Opus 4.7 | Exploit chain analysis needs deepest reasoning |
| solution-architect | Opus 4.7 High | Opus 4.7 | Multi-system design, trade-off evaluation |
| strategy-to-automation | GPT-5.5 | Opus 4.5 | Business-to-technical translation, broad scope |

### Balanced Tier (Standard implementation, code generation, reviews)

| Agent | Primary Model | Fallback | Rationale |
|-------|---------------|----------|-----------|
| agent-designer | Sonnet 4.6 | Sonnet 4.5 | Structured YAML generation, prompt crafting |
| agentops | GPT-5.4 | GPT-5.2 | Metrics pipelines, structured observability |
| app-inventory | GPT-5.4 | GPT-5.2 | Catalog generation, structured scanning |
| backend-dev | GPT-5.3-Codex | GPT-5.2-Codex | Code-heavy implementation tasks |
| chaos-engineer | Sonnet 4.6 | Sonnet 4.5 | Creative failure scenario design |
| code-review | Sonnet 4.6 | Sonnet 4.5 | Nuanced code quality assessment |
| data-tier | GPT-5.3-Codex | GPT-5.2-Codex | Schema design, migration scripts |
| dataops | GPT-5.4 | GPT-5.2 | Pipeline configuration, ETL patterns |
| devops-engineer | GPT-5.4 | GPT-5.2 | YAML/IaC generation, workflow design |
| exploratory-charter | Sonnet 4.6 | Sonnet 4.5 | Test strategy requires creative reasoning |
| frontend-dev | GPT-5.3-Codex | GPT-5.2-Codex | Component implementation, styling |
| infrastructure-deploy | GPT-5.4 | GPT-5.2 | IaC templates, cloud resource config |
| llmops | Sonnet 4.6 | Sonnet 4.5 | Model serving patterns, prompt management |
| manual-test-strategy | Sonnet 4.6 | Sonnet 4.5 | Human-readable test plans, risk analysis |
| mcp-developer | GPT-5.3-Codex | GPT-5.2-Codex | Protocol implementation, SDK code |
| middleware-dev | GPT-5.3-Codex | GPT-5.2-Codex | Integration code, middleware patterns |
| mlops | GPT-5.4 | GPT-5.2 | Pipeline orchestration, model registry |
| performance-analyst | Sonnet 4.6 | Sonnet 4.5 | Profiling interpretation, bottleneck analysis |
| project-onboarding | GPT-5.4 | GPT-5.2 | Structured checklists, file scanning |
| prompt-coach | Sonnet 4.6 | Sonnet 4.5 | Prompt quality evaluation, suggestions |
| prompt-engineer | Sonnet 4.6 | Sonnet 4.5 | Prompt crafting, iteration patterns |
| release-impact-advisor | GPT-5.4 | GPT-5.2 | Change impact assessment, dependency scan |
| release-manager | GPT-5.4 | GPT-5.2 | Version management, changelog generation |
| retro-facilitator | Sonnet 4.6 | Sonnet 4.5 | Synthesis of team feedback, themes |
| rollout-basecoat | GPT-5.4 | GPT-5.2 | File sync operations, config management |
| sprint-planner | GPT-5.4 | GPT-5.2 | Capacity estimation, task decomposition |
| sre-engineer | Sonnet 4.6 | Sonnet 4.5 | Alert interpretation, runbook reasoning |
| tech-writer | Sonnet 4.6 | Sonnet 4.5 | Prose quality, documentation structure |
| ux-designer | Sonnet 4.6 | Sonnet 4.5 | Design reasoning, accessibility awareness |

### Fast Tier (High-volume, simple transforms, triage)

| Agent | Primary Model | Fallback | Rationale |
|-------|---------------|----------|-----------|
| config-auditor | GPT-4.1 | GPT-5.4 mini | Cheapest; pattern matching against known rules |
| dependency-lifecycle | Haiku 4.5 | GPT-5 mini | Version comparison, changelog scanning |
| feedback-loop | GPT-5.4 mini | GPT-4.1 | Signal routing, threshold checks |
| guardrail | GPT-4.1 | Haiku 4.5 | Binary pass/fail, fastest enforcement |
| issue-triage | Haiku 4.5 | GPT-5 mini | Label classification, routing |
| memory-curator | GPT-5.4 mini | GPT-5 mini | Deduplication, relevance scoring |
| merge-coordinator | Haiku 4.5 | GPT-5 mini | Status checks, merge sequencing |
| new-customization | GPT-5.4 mini | GPT-5 mini | Template expansion, scaffolding |
| self-healing-ci | Haiku 4.5 | GPT-4.1 | Error pattern matching, retry logic |

## Skill → Model Assignment

### Complex Skills (Reasoning tier)

| Skill | Primary Model | Fallback | Rationale |
|-------|---------------|----------|-----------|
| architecture | Opus 4.7 High | Opus 4.7 | System design decisions, trade-offs |
| azure-landing-zone | Opus 4.7 (1M) | Opus 4.7 | Enterprise-scale IaC, large template sets |
| azure-waf-review | GPT-5.5 | Opus 4.5 | WAF pillar cross-referencing, broad assessment |
| identity-migration | Opus 4.7 | Opus 4.6 | Auth flow mapping, security-sensitive migration |
| security | Opus 4.7 XHigh | Opus 4.7 | Threat modeling, vulnerability analysis |
| service-bus-migration | GPT-5.5 | Opus 4.5 | Messaging pattern translation, state handling |

### Standard Skills (Balanced tier)

| Skill | Primary Model | Fallback | Rationale |
|-------|---------------|----------|-----------|
| agent-design | Sonnet 4.6 | Sonnet 4.5 | Structured agent spec creation |
| api-design | GPT-5.4 | GPT-5.2 | OpenAPI spec generation, contract design |
| app-inventory | GPT-5.4 | GPT-5.2 | Structured scanning and catalog generation |
| azure-container-apps | GPT-5.4 | GPT-5.2 | Container config, Bicep/ARM templates |
| azure-identity | Sonnet 4.6 | Sonnet 4.5 | Entra ID reasoning, auth patterns |
| azure-networking | GPT-5.4 | GPT-5.2 | VNet/NSG config, IP planning |
| azure-policy | GPT-5.4 | GPT-5.2 | Policy definition JSON, compliance rules |
| backend-dev | GPT-5.3-Codex | GPT-5.2-Codex | Implementation patterns, code scaffolds |
| basecoat | Sonnet 4.6 | Sonnet 4.5 | Meta-skill: understands our own conventions |
| code-review | Sonnet 4.6 | Sonnet 4.5 | Nuanced feedback on code quality |
| data-tier | GPT-5.3-Codex | GPT-5.2-Codex | Schema scripts, migration generation |
| devops | GPT-5.4 | GPT-5.2 | Pipeline YAML, workflow templates |
| documentation | Sonnet 4.6 | Sonnet 4.5 | Prose quality, clear explanations |
| environment-bootstrap | GPT-5.4 | GPT-5.2 | Setup scripts, dependency resolution |
| frontend-dev | GPT-5.3-Codex | GPT-5.2-Codex | Component code, CSS, frameworks |
| handoff | Sonnet 4.6 | Sonnet 4.5 | Context summarization between agents |
| human-in-the-loop | Sonnet 4.6 | Sonnet 4.5 | Decision framing, option presentation |
| manual-test-strategy | Sonnet 4.6 | Sonnet 4.5 | Test scenario reasoning |
| mcp-development | GPT-5.3-Codex | GPT-5.2-Codex | Protocol implementation code |
| performance-profiling | Sonnet 4.6 | Sonnet 4.5 | Bottleneck interpretation |
| refactoring | GPT-5.3-Codex | GPT-5.2-Codex | Code transformation, pattern application |
| sprint-management | GPT-5.4 | GPT-5.2 | Structured planning, velocity calc |
| ux | Sonnet 4.6 | Sonnet 4.5 | Design feedback, accessibility |

### Lightweight Skills (Fast tier)

| Skill | Primary Model | Fallback | Rationale |
|-------|---------------|----------|-----------|
| create-instruction | GPT-5.4 mini | GPT-4.1 | Template-based file generation |
| create-skill | GPT-5.4 mini | GPT-4.1 | Scaffold from templates |

## Distribution Summary

### By Primary Model

| Model | Agents | Skills | Total |
|-------|--------|--------|-------|
| Claude Opus 4.7 | 1 | 1 | 2 |
| Claude Opus 4.7 (1M) | 1 | 1 | 2 |
| Claude Opus 4.7 High | 2 | 1 | 3 |
| Claude Opus 4.7 XHigh | 1 | 1 | 2 |
| GPT-5.5 | 4 | 2 | 6 |
| Claude Sonnet 4.6 | 14 | 12 | 26 |
| GPT-5.4 | 10 | 8 | 18 |
| GPT-5.3-Codex | 5 | 5 | 10 |
| Claude Haiku 4.5 | 5 | 0 | 5 |
| GPT-5.4 mini | 3 | 2 | 5 |
| GPT-4.1 | 2 | 0 | 2 |
| GPT-5 mini | 0 | 0 | 0 |
| **Total** | **49** | **31** | **80** |

*Note: GPT-5 mini, Sonnet 4, GPT-5.2, Opus 4.5, and Opus 4.6 appear only as fallbacks.*

### Fallback Chain Strategy

```text
Premium:  Opus 4.7 XHigh → Opus 4.7 High → Opus 4.7 → Opus 4.6 → Opus 4.5
Standard: Sonnet 4.6 → Sonnet 4.5 → Sonnet 4
Codex:    GPT-5.3-Codex → GPT-5.2-Codex
Infra:    GPT-5.4 → GPT-5.2
Fast:     Haiku 4.5 → GPT-5 mini → GPT-4.1
```

## Selection Heuristics

When choosing a model for a new agent or skill:

1. **Needs deepest reasoning (security, exploit chains)?** → Opus 4.7 XHigh
2. **Complex architecture or design trade-offs?** → Opus 4.7 High
3. **Large codebase / huge context needed?** → Opus 4.7 (1M) or Opus 4.6 (1M)
4. **Cross-domain strategy or regulation?** → GPT-5.5
5. **Generates code as primary output?** → GPT-5.3-Codex (or 5.2-Codex fallback)
6. **Produces structured config/YAML/IaC?** → GPT-5.4
7. **Requires nuanced judgment (reviews, prose)?** → Sonnet 4.6
8. **High-volume classification/routing?** → Haiku 4.5
9. **Binary pass/fail, cheapest possible?** → GPT-4.1
10. **Simple transforms, templates?** → GPT-5.4 mini or GPT-5 mini

## Cost Optimization Notes

- **Batch non-urgent work** on fast-tier models where possible
- **Use reasoning models sparingly** — only when the task genuinely benefits
- **Fallback chains**: If Opus times out, retry on Sonnet (graceful degradation)
- **Cache model outputs** for repeated patterns (e.g., same triage rules)
- **Monitor token usage** per agent to spot over-provisioned model assignments
