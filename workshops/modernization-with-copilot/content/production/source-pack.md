# Modernization decision and SDLC readiness source pack

Sources retain per-entry review dates and are versioned authoring evidence,
not live build dependencies. Added requirement-language, harness, architecture,
security, and evaluation sources were reviewed 2026-10-30. Recheck
client-specific commands, availability, and policies before delivery. Container
sources were reviewed 2026-10-31. The
narrative and decision/evidence templates are authored workshop methods, not
promises made by the products below.

| Id | Source and public URL | Type | Reviewed | Supported use and material caveat |
| --- | --- | --- | --- | --- |
| MOD-01 | [Modernization preparation](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/modernize/prepare-organization-cloud-modernization) | Microsoft guidance | 2026-10-29 | Business value, cost/risk, ownership and least sufficient change. Azure examples do not prescribe Azure or prove customer economics. |
| COP-01 | [Asking Copilot questions in your IDE](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/chat-with-copilot/chat-in-ide) | GitHub documentation | 2026-10-29 | Repository questions, planning and response references; client/policy availability varies. |
| COP-02 | [Repository custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions) | GitHub documentation | 2026-10-29 | Project context and build/test guidance. A file's presence does not prove a response used it or that policy is enforced. |
| COP-03 | [Refactor code](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/refactor-code) | GitHub documentation | 2026-10-29 | Bounded refactoring examples, not proof of preserved behavior or worthwhile investment. |
| COP-04 | [Use agent mode](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-agent-mode) | GitHub documentation | 2026-10-29 | Agent-assisted changes and human review. Command permissions depend on settings and policy; do not generalize one surface's controls. |
| COP-05 | [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) | GitHub documentation | 2026-10-29 | Cloud-agent progress and traceability, not released-application health or business outcomes. |
| COP-06 | [Responsible use: Copilot Agents](https://docs.github.com/en/copilot/responsible-use/agents) | GitHub application card | 2026-10-29 | Agent capabilities and limitations, supplementary review, human oversight. No claim that agent agreement provides independent assurance. |
| SDD-01 | [GitHub Spec Kit](https://github.com/github/spec-kit) | Official project documentation | 2026-10-29 | Spec-driven artifacts and reviewable workflow. Tool capabilities and invocation syntax evolve; use conceptual steps here. |
| SDD-02 | [Adopting Spec Kit in an existing project](https://github.github.io/spec-kit/guides/existing-projects.html) | Official project guide | 2026-10-29 | Start with a bounded change and compatibility rules, not retroactive specification of all legacy behavior. Initialization changes managed files; no installation is performed in this workshop. |
| SDD-03 | [Agentic SDD reference](https://github.github.io/spec-kit/reference/agentic-sdd.html) | Official project reference | 2026-10-29 | Constitution/specify/clarify/plan/checklist/tasks/analyze workflow; quality steps are configurable, not universally mandatory or runtime security controls. |
| ARC-01 | [Strangler Fig](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig) | Microsoft architecture pattern | 2026-10-29 | Incremental routing and replacement; assess shared data, cross-system dependencies, facade reliability and coexistence costs. |
| ARC-02 | [Branch by Abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html) | Practitioner pattern description | 2026-10-29 | Coexisting implementations behind an abstraction enable gradual replacement; abstraction and testing have costs. Summarize, do not reproduce illustrations. |
| ARC-03 | [Parallel Change](https://martinfowler.com/bliki/ParallelChange.html) | Practitioner pattern description | 2026-10-29 | Expand, migrate, contract interfaces and database consumers. Compatibility still needs verification; dual writes are not automatically safe. |
| OPS-01 | [Safe deployment practices](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/safe-deployments) | Microsoft architecture guidance | 2026-10-29 | Staging, layered checks, health-based progressive exposure and recovery. Stateful rollback is complex; do not promise reversing a binary reverses data. Azure examples are not a platform mandate. |
| CNT-01 | [What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/) | Docker documentation | 2026-10-31 | A container image packages an application and dependencies; containers can isolate processes. Portability depends on compatible platforms and external configuration; process-based containers share a host kernel. |
| CNT-02 | [Container images](https://kubernetes.io/docs/concepts/containers/images/) | Kubernetes documentation | 2026-10-31 | An image digest identifies immutable image content, unlike a movable tag. It does not pin external configuration or data and does not guarantee security; Kubernetes is illustrative, not required. |
| CNT-03 | [Application Container Security Guide](https://csrc.nist.gov/pubs/sp/800/190/final) | NIST guidance | 2026-10-31 | Container packaging introduces security concerns that need explicit controls. This 2017 guidance is not a guarantee of security or a substitute for current workload-specific assessment. |
| CNT-04 | [Docker Engine security](https://docs.docker.com/engine/security/) | Docker documentation | 2026-10-31 | Namespaces and runtime controls can isolate processes, while kernel, daemon, configuration, and privilege choices remain security concerns. Details are Docker-specific. |
| SEC-01 | [Secure Software Development Framework](https://csrc.nist.gov/projects/ssdf) | NIST guidance | 2026-10-29 | Risk-based secure SDLC, component protection, provenance and vulnerability response; not a universal checklist or compliance certificate. |
| SEC-02 | [Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) | OWASP guidance | 2026-10-29 | Scope, data/trust boundaries, threats, mitigations and validation. Apply with workload owners; a model is not proof of secure implementation. |
| ACC-01 | [WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/) | W3C overview | 2026-10-29 | Testable accessibility criteria and explicit conformance requirements. Applicable obligations and target levels need qualified review; automated tests alone do not establish conformance. |
| REQ-01 | [Key words for use in RFCs to Indicate Requirement Levels (RFC 2119)](https://www.rfc-editor.org/rfc/rfc2119) | IETF Best Current Practice | 2026-10-30 | Defines MUST/SHALL, SHOULD, and MAY semantics when a specification explicitly adopts them; not legal advice or technical enforcement. |
| AGT-01 | [Understand agent harnesses](https://code.visualstudio.com/docs/agents/concepts/agent-harnesses) | VS Code documentation | 2026-10-30 | Distinguishes harness, model access, model, role, and execution environment. Harness features, models, and controls vary; it is not every underlying security boundary. |
| AGT-02 | [Use Agent Skills](https://code.visualstudio.com/docs/agent-customization/agent-skills) | VS Code documentation | 2026-10-30 | Skills package reusable task methods, instructions, and resources; locations, discovery, and feature support vary by harness. |
| AGT-03 | [Custom agents in VS Code](https://code.visualstudio.com/docs/agent-customization/custom-agents) | VS Code documentation | 2026-10-30 | Custom agents configure roles, tools, and optional models; availability and behavior depend on the selected harness. |
| AGT-04 | [Use subagents](https://code.visualstudio.com/docs/agents/run/subagents) | VS Code documentation | 2026-10-30 | Delegation suits scoped work with clear outputs; coordination adds cost and workers may not inherit context or have independent security boundaries. |
| SEC-03 | [Secure AI-assisted development in VS Code](https://code.visualstudio.com/docs/agents/run/security) | VS Code documentation | 2026-10-30 | Workspace trust, sandboxing, approvals, and review examples. Controls are surface/platform-specific and do not replace underlying identity, network, or repository controls. |
| ARC-04 | [N-tier Architecture Style](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier) | Microsoft Architecture Center | 2026-10-30 | Separates logical layers from physical tiers and describes dependency trade-offs; the example does not prescribe Azure or one agent per tier. |
| EVAL-01 | [Evaluation in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-overview) | Microsoft documentation | 2026-10-30 | Describes dataset-, response-, and production-trace evaluation, repeatable comparison, and continuous evaluation. Methods are taught independently of platform choice; they do not guarantee quality. |
| EVAL-02 | [Observability in Generative AI](https://learn.microsoft.com/en-us/azure/foundry/concepts/observability) | Microsoft documentation | 2026-10-30 | Separates evaluation, monitoring, and tracing across development and production. Product features and availability change; a judge score or trace is not proof of correctness. |

## Reused internal source

The four planning proofs from *Purrmission to Proceed*, PLAN-01 through PLAN-05,
reviewed 2026-10-23, remain useful prompts: scope, usable instructions, behavioral
and negative checks, stop conditions. This workshop now explicitly teaches
first-slice SDLC controls and release readiness within its own requirements;
it does not import the other workshop wholesale.

## Authored methods and claim limits

- Business-case questions, cost ranges, options matrices, architecture decision
  records, risk registers, evidence traceability and readiness checklists are
  facilitation methods. They do not prove a particular customer's value or
  compliance. Record estimates, assumptions, owners and validation needs.
- The COBOL order-status application is fiction. Daytime status, unchanged
  totals, adapter options, authorization checks and data recovery examples are
  proposed discussion points. No baseline, target, cost, measured benefit,
  inspected repository, chosen stack or executed check is asserted.
- Current behavior is evidence, not automatically a requirement. Stakeholders
  identify invariants and deliberate corrections. Missing documentation is
  not permission to fabricate institutional intent.
- Proposer-challenger-verifier is a workshop-authored agent review pattern.
  Roles or different models do not guarantee independence. Use separate
  evidence, fixed criteria, bounded permissions, human adjudication and
  review-cycle/cost limits. A passing test covers only what it tests.
- Agent task contracts, autonomy choices, delegation checklists, and readiness
  prompts are workshop-authored planning methods, not product capabilities or
  security controls. People define the goal, verified context, task boundary,
  permissions, acceptance evidence, escalation, and review before delegation.
  Agent outputs do not establish business truth or authorize release.
- Agent harnesses, agent roles, skills, models, and execution environments are
  distinct concepts. Product documentation illustrates one implementation;
  supported capabilities, model access, session state, and controls vary.
  Verify the chosen combination instead of generalizing one harness's behavior.
- SHALL/SHALL NOT, SHOULD/SHOULD NOT, and MAY describe requirement force only
  when the governing document defines their meaning. Wording helps people and
  evaluators interpret intent; configured permissions and independent checks
  provide separate evidence and enforcement.
- Layer-to-tier mappings and agent-work decomposition are workload-specific.
  N-tier examples describe application responsibility and deployment, not an
  instruction to allocate one agent per tier or add runtime AI.
- Public model benchmarks are candidate-screening evidence, not an acceptance
  test for the order-status workflow. Versioned representative cases,
  domain-owned expectations, repeated runs, human calibration, and monitored
  failures are workshop methods. No universal score threshold or drift-free
  model substitution is asserted.
- Spec Kit artifacts need review against real sources. They do not select a
  correct architecture, enforce access, or authorize deployment. Keep human
  decisions and actual platform/CI controls distinct from written principles.
- Plans evolve for bounded slices. Authorized discovery/test/spike code may
  precede implementation; exhaustive up-front design is not required.
- Domain validation, obligation mapping, user adoption and delivery-capacity
  questions are authored planning methods. Qualified business/legal/security/
  accessibility owners determine applicability; do not present this workshop
  as certification, legal advice, or a complete regulated delivery process.
- Release and operational choices are workload-specific. Application artifact
  reversal, data restoration, roll-forward and business reconciliation are
  separate concerns. Define feasible recovery limits before implementation.
- Application health, business value and agent-session progress are different
  signals. Do not claim Copilot supplies the customer's production observability.
- Customer answers remain outside shared content in the separate volatile
  editor. No identity fields, autosave, submission or storage; confidentiality
  still depends on device access and approved print/PDF handling.
- Character art and role boundaries follow `visual-bible.md`. The team is a
  teaching metaphor, not product architecture or a control system.
