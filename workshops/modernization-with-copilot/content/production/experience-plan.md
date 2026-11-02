# Modernization decision-loop experience

## Delivery posture

Content completeness takes priority over a clock. This is a flexible,
facilitator-led customer discussion, not a one-hour session or live coding lab.
Pause, extend, or split delivery when evidence or understanding requires it.
The 180-minute estimate exists for the repository's numeric timing contract;
it is not a maximum, a promise, or a reason to rush a decision.

Use 31 slides: an untimed agenda reference, zero-estimate cover, two-minute route, five six-minute Goal
slides, seventeen seven-minute Plan slides, four five-minute execution slides,
one five-minute return-to-Goal slide, and a four-minute read-back. The estimate
allocates 57 minutes to framing and 123 to discussion. No mission, media, live
agent, or code change is required. Longer delivery may need breaks agreed with
the audience.

| Phase | Slides | Estimate: teach / discuss | Participant action and output |
| --- | --- | --- | --- |
| Route | 1-3 | 2 / 0 | Use the agenda as an untimed reference; follow the repeating loop and distinguish investment from readiness. The brief records, not proves, decisions. |
| Goal | 4-8 | 10 / 20 | Select applicable modernization drivers, prioritize up to three, capture today's evidence/consequence/success signal, and decide the next investment after comparing cost, risks, and alternatives. |
| Plan | 9-25 | 34 / 85 | Choose a harness and appropriate agent/skill composition; make requirements explicit; map application boundaries; plan model portability and task-specific evaluations; coordinate bounded work, permissions, independent evidence, recovery, and human ownership. |
| Build, Evaluate, Deploy, Monitor | 26-29 | 8 / 12 | Apply the authorized plan; compare evidence with criteria; consider optional container packaging and its controls; identify release authority and data-safe response; name operational/business signals. |
| Return to Goal | 30 | 2 / 3 | Use observed results and unresolved uncertainty to continue, change, defer, retire, or stop the next investment. |
| Read-back | 31 | 1 / 3 | Read six lifecycle statements, identify missing evidence/owners, and explain confidential print/PDF handling. |
| **Provisional total** | **31** | **57 / 123** | **180 minutes, adjustable without removing required decisions.** |

## Facilitation

Use the fictional COBOL order-status example throughout. Keep returning to the
same question: what does support staff need, what evidence could show the
change helps without changing totals or access, and what work could an agent
perform safely to help? Use the agenda's short, labeled story beats in the
right-hand example panels and retain key topics in the left-hand panels.
The selected circular character portraits provide native name, role, and action
cues at the bottom of each story panel; the example text starts at the top.
They never replace the real human owners. For each candidate task, let people define the outcome,
trusted inputs, permitted actions, expected output, acceptance evidence,
reviewer, and stop/escalation path. Ask which decisions must remain human.
Do not fill a blank with a plausible agent answer merely to make the brief look
complete.

Each lifecycle section produces one statement, supported by focused evidence
and decisions. Plan turns agent delegation into explicit work packages:
outcome, authorized context, autonomy/permissions, output, acceptance,
independent evidence, stop/escalation, owner, and reviewer. For each task,
ask how its output will stay aligned with verified business intent and
technical constraints. Capture claim/source/status/validation/owner/decision,
not raw confidential repository content. A named owner, an agent's agreement,
or a passing test alone does not prove readiness or authorize release.
Detailed practices are options to apply when risk, evidence, or policy makes
them relevant—not extra gates for every workload.

Discuss the harness before agent configuration; separate the model, harness,
role, skill, and execution environment. Use the same fictional order-status
request to show task contracts across presentation, service, and data
responsibilities. Compare model candidates using the same domain-approved
evaluation cases and criteria. Public benchmarks screen candidates; they do
not replace task-specific checks or human review. Keep development-agent
quality signals distinct from production service health when the application
does not run an AI model.

An engineering readiness decision in the teaching example does not add a
repository lifecycle approval. Production still has only local and exact-commit
test approval under canonical governance.

## Accessibility, privacy, and recovery

- Read questions aloud and allow reflection; use written labels, not color
  alone, for verified facts, hypotheses, and unknowns.
- Keep published slides, reviews, and catalog data blank or synthetic.
- Actual customer responses belong only in the separate authorized brief
  session, with no identity fields, autosave, submission, telemetry, browser
  persistence, or URL encoding.
- Refresh/close loses responses. Never refresh an existing customer tab during
  review. Print/PDF destination, device access, extensions, and screen exposure
  remain outside the editor's control.
- Do not send confidential content to an AI service without customer policy
  permission. Verify actual tool/data/environment controls before use.
- If an answer requires evidence unavailable in the room, record an owner and
  follow-up action. Pause the affected decision rather than inventing proof.
- Revisit plans when discoveries change assumptions. A bounded spike may be
  authorized separately; production implementation is not the first permitted
  way to learn.
