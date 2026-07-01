---
name: Appian Developer Skill
description: Use this skill when working with Appian applications, SAIL interfaces, process models, records, data types, expression rules, integrations, deployments, or low-code modernization workflows that need traceable design and review.
icon: 🧩
audience: Appian developers, low-code platform teams, process analysts, and integration developers
order: 3
---

# Appian Developer Skill

Use this skill to help GitHub Copilot support Appian delivery work without confusing low-code design decisions with conventional source-only development. It focuses Copilot on Appian object relationships, SAIL expressions, process behavior, integration contracts, deployment discipline, and human review gates for changes that affect business workflows.

## When to Use This Skill

- You are documenting or reviewing Appian applications, interfaces, process models, records, data types, expression rules, decision rules, integrations, or deployments.
- You need Copilot to explain exported Appian artifacts, design notes, XML snippets, SAIL expressions, API contracts, or related repository documentation.
- You are planning a change to a business workflow and need to identify impacted interfaces, process models, records, integrations, groups, and security rules.
- You want Copilot to draft SAIL, expression-rule, integration, or test-case patterns for human review.
- You need to modernize or rationalize an Appian application while preserving process intent and auditability.

## Core Operating Principles

| Principle | Guidance |
|-----------|----------|
| Model the application, not just files | Reason across interfaces, process models, records, data types, rules, integrations, groups, and deployment packages. |
| Preserve process intent | Treat current workflows, approvals, escalations, SLAs, and audit trails as business behavior until owners confirm otherwise. |
| Separate design from implementation | Distinguish business process decisions, Appian object design, SAIL expression details, and external integration contracts. |
| Keep changes reviewable | Use small Appian object changes with clear impact, rollback, and deployment notes. |
| Validate security and data access | Check record-level access, groups, process permissions, integration credentials, and environment-specific configuration. |
| Human accountability | Treat generated SAIL, expressions, process recommendations, and integration mappings as draft until reviewed in Appian Designer and tested. |

## Recommended Setup

1. Open the Appian support repository or exported design package in VS Code.
2. Include approved design artifacts such as application object inventory, process documentation, SAIL snippets, expression rules, integration specs, deployment notes, and test evidence.
3. Confirm the Appian version, target environment, connected systems, deployment method, and application naming conventions.
4. Identify whether the task is analysis, documentation, impact assessment, SAIL drafting, integration review, test planning, or deployment support.
5. Provide Copilot with only approved, non-sensitive examples and sanitized data payloads.
6. Verify generated recommendations in Appian Designer before implementation or deployment.

> **Important**: Do not paste production data, credentials, API secrets, personally identifiable information, regulated records, or environment-specific secure values into Copilot. Use sanitized payloads and reference the secure configuration location instead.

## Appian Artifact Map

Use this map when asking Copilot to reason about Appian work:

| Artifact | What to Ask Copilot For | Review Risk |
|----------|--------------------------|-------------|
| SAIL interface | Inputs, local variables, validations, visibility rules, save behavior, refresh behavior, and accessibility concerns. | UI behavior may look correct but save invalid data or hide required fields. |
| Expression rule | Inputs, null handling, type assumptions, query behavior, reuse opportunities, and edge cases. | A rule can be reused in more places than the current change request mentions. |
| Process model | Start events, user tasks, gateways, timers, escalations, subprocesses, exceptions, and audit behavior. | Small workflow changes can alter approvals, SLAs, or compliance evidence. |
| Record type | Source, relationships, actions, security, sync behavior, filters, and related views. | Record access and sync settings can expose or hide business data. |
| Data type | Field definitions, relationships, required fields, versioning, and downstream mappings. | Type changes can break process variables, rules, integrations, and reports. |
| Integration | Endpoint, authentication, request/response mapping, error handling, retry behavior, and timeout assumptions. | Secrets, environment differences, and partial failures need explicit handling. |
| Deployment package | Object dependencies, environment constants, connected systems, feature flags, and rollback plan. | Missing dependencies or environment-specific values can break deployment. |

## Prompt Patterns

### Explain an Appian Artifact

```text
Analyze this Appian artifact or design note. Identify the artifact type, purpose, inputs, outputs, object dependencies, security considerations, integration points, and review questions. Separate observed details from assumptions. #file
```

### Review a SAIL Interface

```text
Review this SAIL interface for inputs, local variables, validation behavior, saveInto behavior, refresh variables, conditional visibility, accessibility, and data access assumptions. Do not rewrite it yet; list risks and suggested changes first. #selection
```

### Draft a SAIL Pattern

```text
Draft a SAIL interface pattern for this requirement. Include inputs, validation, save behavior, empty states, error states, and accessibility notes. Keep the output reviewable and explain which parts must be verified in Appian Designer.
```

### Assess Process Model Impact

```text
Assess the impact of this workflow change on Appian process models. Identify affected user tasks, gateways, escalations, timers, subprocesses, process variables, groups, audit requirements, and test cases. Do not propose implementation until the impact is clear.
```

### Review an Integration Contract

```text
Review this Appian integration contract or sanitized payload. Identify authentication assumptions, request mapping, response mapping, timeout and retry behavior, error handling, data type dependencies, and environment-specific configuration. Flag anything that should not be hard-coded.
```

### Plan a Deployment

```text
Create an Appian deployment readiness checklist for this change. Include object dependencies, environment constants, connected systems, groups/security, feature flags, smoke tests, rollback notes, and post-deployment monitoring.
```

## Safe Delivery Workflow

Use this workflow for Appian changes:

| Stage | Output | Approval Gate |
|-------|--------|---------------|
| Intake | Requirement, affected application, artifacts, environments, data sensitivity, and owner | Confirm scope and approved evidence |
| Analyze | Object dependency map, process impact, security impact, and integration impact | Appian developer reviews technical findings |
| Design | Proposed Appian object changes, SAIL or rule patterns, and test strategy | Product owner and platform reviewer approve |
| Build | Small object changes in Appian Designer or supporting repository artifacts | Peer review before deployment packaging |
| Validate | Interface tests, process tests, record security checks, integration tests, and regression cases | Business owner confirms workflow behavior |
| Deploy | Package dependencies, environment configuration, smoke tests, rollback, and monitoring | Release owner approves promotion |

## Appian Review Checklist

- Confirm the change preserves approval paths, escalations, SLAs, and audit requirements.
- Check record type security, process model security, groups, role maps, and object permissions.
- Verify SAIL inputs, local variables, `saveInto`, validation messages, refresh behavior, and accessibility.
- Review expression rules for null handling, type safety, query performance, reuse impact, and edge cases.
- Confirm integrations use secure connected systems or environment configuration, not hard-coded credentials.
- Test happy paths, validation failures, authorization failures, integration failures, empty states, and timeout behavior.
- Check deployment packages for dependent objects, environment-specific constants, connected systems, and rollback notes.
- Validate behavior in Appian Designer and the target environment before release.

## Stop Conditions

Stop and ask for human guidance when any of these appear:

- The change affects approvals, regulatory workflows, audit trails, SLAs, case status transitions, or customer-facing processes.
- Object dependencies are missing, unclear, or only partially exported.
- Security groups, record-level access, process permissions, or connected-system credentials are unclear.
- SAIL or expression logic depends on undocumented business rules, magic values, or environment-specific constants.
- Integration behavior is unclear for timeouts, retries, partial failures, authentication failures, or schema changes.
- Copilot cannot explain which Appian objects are impacted by a proposed change.

## Appian Instruction Template

Create `.github/copilot-instructions.md` in the Appian support repository and adapt this template:

```markdown
# Copilot Instructions — Appian

- Treat Appian work as object-graph and process design work, not only source-code editing.
- Reason across SAIL interfaces, expression rules, process models, records, data types, decision rules, integrations, groups, and deployment packages.
- Explain existing behavior and object dependencies before proposing changes.
- Separate observed artifact evidence from inferred business process meaning and product-owner questions.
- Ask before changing approval paths, escalations, SLAs, audit behavior, record security, process security, connected systems, or deployment configuration.
- Do not hard-code credentials, environment URLs, secure constants, group IDs, or production values.
- Treat generated SAIL, expression rules, process recommendations, and integration mappings as draft until reviewed in Appian Designer.
- Prefer small, reviewable changes with test cases, rollback notes, and deployment readiness checks.
```

## Usage Optimization Tips

- Provide an Appian object inventory or dependency list before asking broad impact questions.
- Keep sanitized sample payloads and interface screenshots separate from production data.
- Ask Copilot for an impact map before requesting implementation details.
- Use reusable prompt patterns for SAIL review, process impact, integration review, and deployment readiness.
- Encode durable Appian delivery rules in repository instructions instead of repeating them in every prompt.

*Technology skill for Appian Developers — GitHub Copilot Developer Training*
