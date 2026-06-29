---
name: IBM i / AS400 Developer Skill
description: Use this skill when working with IBM i, AS/400, RPGLE, CLLE, COBOL, DDS, Db2 for i, 5250 screens, spool files, or legacy modernization discovery where source-backed evidence and SME review are required.
icon: 🖥️
audience: IBM i, RPGLE, CLLE, COBOL, and legacy modernization developers
order: 2
---

# IBM i / AS400 Developer Skill

Use this skill to help GitHub Copilot work safely and effectively with IBM i applications, especially legacy RPGLE, CLLE, COBOL, DDS, Db2 for i, 5250 screen, and batch-processing codebases. It focuses Copilot on understanding existing behavior, preserving evidence, asking domain questions, and supporting modernization without pretending that generated output replaces IBM i expertise.

## When to Use This Skill

- You are analyzing RPGLE, CLLE, COBOL, DDS, SQL, 5250 screen, printer file, or batch-processing artifacts from an IBM i system.
- You need Copilot to explain unfamiliar legacy behavior before proposing changes.
- You are documenting business rules, file I/O, program calls, data movement, error handling, or batch dependencies.
- You are planning modernization and need source-backed findings, SME questions, and safe refactoring boundaries.
- You need Copilot to avoid inventing business meaning from program names, field names, comments, or partial source extracts.

## Core Operating Principles

| Principle | Guidance |
|-----------|----------|
| Use IBM i terminology | Prefer IBM i, RPGLE, CLLE, DDS, Db2 for i, 5250, source physical files, members, libraries, job logs, spool files, and activation groups. |
| Explain before changing | Start with behavior summaries, dependencies, and evidence before edits or modernization recommendations. |
| Evidence over inference | Mark observed facts separately from assumptions, inferred business rules, and SME questions. |
| Preserve legacy intent | Treat the current system as the source of business behavior until an SME confirms otherwise. |
| Scope narrowly | Analyze one program, screen, file, report, or transaction flow at a time before connecting findings. |
| Human accountability | Require IBM i developer, SME, and reviewer approval before changing production-relevant behavior. |

## Recommended Setup

1. Open the IBM i project or extracted source repository in VS Code.
2. Install and configure IBM i development extensions such as Code for IBM i and RPGLE language support.
3. Confirm the source layout, including libraries, source physical files, members, copybooks or copy members, DDS objects, and SQL artifacts.
4. Identify whether the task is exploratory analysis, production bug fixing, refactoring, documentation, or modernization planning.
5. Provide Copilot with only approved, non-sensitive source and runtime evidence.
6. Keep generated findings reviewable with file names, member names, line references, and uncertainty markers.

> **Important**: Do not paste production data, credentials, customer records, regulated data, job logs with secrets, or sensitive spool content into Copilot. Redact or synthesize examples before analysis.

## Evidence Classification

Use these labels when asking Copilot to analyze IBM i artifacts:

| Label | Meaning | Example |
|-------|---------|---------|
| Observed | Directly supported by source, DDS, SQL, job logs, spool files, or screen/report evidence. | Program `ORDVALR` reads `CUSMAS` and writes validation errors to `ORDERR`. |
| Inferred | Likely but not proven; needs confirmation. | Field `CRDLMT` appears to represent a credit limit. |
| SME question | Business meaning, exception handling, or operational behavior that needs a domain expert. | Should orders over the credit limit always be held, or only for certain customer classes? |
| Modernization candidate | A safe candidate for redesign, wrapping, testing, or refactoring after review. | Isolate date conversion logic behind a tested service boundary. |
| Stop condition | A finding that should pause automation. | Missing copy member, unresolved external call, undocumented file update, or ambiguous financial calculation. |

## Prompt Patterns

### Explain One Program

```text
Analyze this IBM i program before suggesting changes. Identify the language and program type, summarize control flow, list file I/O, external calls, indicators or error paths, business-rule candidates, and SME questions. Separate observed evidence from inferred meaning. #file
```

### Trace File I/O and Data Movement

```text
Review this RPGLE or COBOL source and trace how records move through input files, work fields, validation checks, and output files. List each observed read, write, update, delete, chain, SQL operation, or display/write operation with source evidence. Do not infer business meaning without marking it as inferred. #file
```

### Review DDS or Db2 for i Artifacts

```text
Explain this DDS, DDL, or Db2 for i table definition. Identify keys, field meanings that are directly documented, likely relationships, logical-file or index behavior, constraints, and questions for an IBM i SME. Do not treat field names alone as confirmed business rules. #file
```

### Analyze a 5250 Screen or Report

```text
Analyze this display file, printer file, screen extract, or spool/report sample. Identify fields, prompts, validation cues, output-only values, operator actions, and unresolved business questions. Separate UI labels from confirmed business rules. #file
```

### Plan a Safe Modernization Slice

```text
Assess this IBM i component for modernization readiness. Produce only an assessment and plan: current behavior, evidence coverage, dependencies, test seams, SME questions, risks, and a proposed smallest safe slice. Do not rewrite code until I approve the plan.
```

### Generate SME Review Questions

```text
From this IBM i analysis, generate a concise SME review checklist. Group questions by business rule, data dependency, exception path, screen/report behavior, and operational process. Include why each question matters and the evidence that triggered it.
```

## Safe Analysis Workflow

Use this workflow for IBM i discovery and modernization tasks:

| Stage | Output | Approval Gate |
|-------|--------|---------------|
| Intake | Source scope, runtime evidence, redaction status, and missing artifacts | Confirm evidence is approved and non-sensitive |
| Explain | Program behavior, file I/O, calls, screens, reports, and exception paths | IBM i developer checks technical accuracy |
| Classify | Observed facts, inferred rules, SME questions, and stop conditions | SME confirms or rejects business meaning |
| Plan | Small modernization or documentation slice with tests and rollback notes | Human approves before edits |
| Execute | Narrow change, wrapper, documentation update, or test artifact | Reviewer inspects diff and evidence |
| Validate | Compile, unit or regression tests, job-log review, screen/report comparison, and SME sign-off | Human confirms release readiness |

## Common IBM i Review Targets

- RPGLE fixed-form and free-form logic, including indicators, subroutines, procedures, copy members, and embedded SQL.
- CLLE command orchestration, job submission, library list changes, overrides, and error monitors.
- COBOL program structure, file sections, working storage, paragraphs, calls, SQL, and transaction boundaries.
- DDS physical files, logical files, display files, printer files, join logical files, and key definitions.
- Db2 for i tables, views, indexes, constraints, stored procedures, and SQL naming differences.
- Batch jobs, job descriptions, job queues, scheduler dependencies, job logs, and spool files.
- 5250 screens, subfiles, function keys, menus, and operator workflows.
- External dependencies such as data queues, message queues, APIs, service programs, and stored procedures.

## Stop Conditions

Stop and ask for human guidance when any of these appear:

- The source references missing copy members, service programs, called programs, DDS, or database objects.
- Business meaning depends on undocumented field names, indicators, magic values, or historical conventions.
- Financial, regulatory, customer, inventory, payroll, tax, or safety-impacting logic is involved.
- A proposed change could alter file updates, commitment control, job scheduling, library lists, authority, or external interfaces.
- Runtime behavior differs from source assumptions, such as job-log errors, overrides, or environment-specific library resolution.
- Copilot cannot cite source evidence for a conclusion.

## IBM i Instruction Template

Create `.github/copilot-instructions.md` in the target IBM i project and adapt this template:

```markdown
# Copilot Instructions — IBM i

- Prefer IBM i terminology: RPGLE, CLLE, COBOL, DDS, Db2 for i, 5250, source members, libraries, job logs, and spool files.
- Explain existing behavior before proposing changes.
- Separate observed source evidence from inferred business meaning and SME questions.
- Do not invent business rules from program names, field names, indicators, or comments alone.
- Ask before changing file I/O, commitment control, job scheduling, library lists, authority checks, or external interfaces.
- Treat generated RPGLE, CLLE, COBOL, DDS, and SQL changes as draft until compiled and reviewed by an IBM i developer.
- Do not use production data, secrets, customer records, regulated data, or sensitive spool output in prompts.
- Prefer small, reviewable modernization slices with rollback notes and validation steps.
```

## Usage Optimization Tips

- Analyze one source member or transaction flow at a time before asking for whole-system conclusions.
- Reuse a standard evidence table so follow-up prompts do not need to restate classification rules.
- Keep approved inventory, call graphs, DDS summaries, and SME decisions in project documentation instead of re-prompting.
- Ask Copilot for questions and risks before asking for generated code.
- Use skills for repeatable IBM i analysis patterns, instructions for durable team rules, and memory only for stable, non-sensitive preferences or repository facts.

*Technology skill for IBM i / AS400 Developers — GitHub Copilot Developer Training*
