---
project: ODrive Hackathon
languages: [C++, C, Ada]
editor: VS Code
audience: intermediate-advanced
last_updated: 2026-01-25
maintainers: [TM, TI, GB]
---

# Copilot Instructions for Hackathon Planning

## TL;DR

- **Audience**: 100 intermediate+ embedded C++/C/Ada developers
- **Focus**: Agentic workflows, not Copilot basics
- **Constraints**: VS Code only, static allocation, no exceptions, MISRA-friendly
- **Reference repos**: ODrive, Marlin
- **Lesson format**: Hands-on first, clear acceptance criteria

## Project Overview

This workspace contains planning materials for a **2-day GitHub Copilot hackathon**. The audience is 100 embedded C++ and or C# developers (intermediate to advanced) in Phoenix, Arizona.

**Overall Objective**: Migrate existing applications into an agentic pattern for developer acceleration.

## Instructors

| Initials | Name |
|----------|------|
| TM | Tammy McClellan |
| TI | Tom Iverson |
| GB | Gaurav Bhardwaj |

## Document Purpose & Structure

Working guide for instructors to design and deliver the planned lessons. Use this to align constraints, author lesson materials, and reference the agenda.

## How to Use This Doc
- Read the agenda for timing and owners: [lessons/01-welcome-agenda/agenda.md](lessons/01-welcome-agenda/agenda.md). Request agenda changes before editing.
- For each lesson, create/update README, examples, exercises, and solutions under the lesson folder (pattern below).
- Apply the Lesson Content Guidelines and Agent Focus Constraints to every prompt or exercise.
- Embed `#file:` context when asking Copilot to generate or refactor code; include acceptance criteria.
- Link one relevant Microsoft Learn page per lesson for deeper study (advanced-focused).

## Key Constraints (From Customer Requirements)

- **Language focus**: C++, C, Ada for embedded/RTOS development
- **Editor**: VS Code only (not Visual Studio)
- **Audience level**: Intermediate to advanced (skip basics)
- **Day 1**: Training on GitHub Copilot features, agentic development
- **Day 2**: Hands-on hack with their own projects
- **Reference repos**: [ODrive](https://github.com/odriverobotics/ODrive), [Marlin](https://github.com/MarlinFirmware/Marlin)
- **Recordable**: Day 1 sessions can be recorded for playback

### Exclusions (Don't Include)

- Azure web app development
- Basic Copilot intro content (audience is intermediate+)
- Git/GitHub fundamentals (assumed knowledge)
- Long prose explanations

## Lesson Authoring Guidelines

Each lesson should follow a **hands-on first** approach.

### Content Principles
- Focus on key concepts (bullet points, not prose)
- Prioritize examples from [ODrive](https://github.com/odriverobotics/ODrive) or [Marlin](https://github.com/MarlinFirmware/Marlin)
- Include participant practice time with clear success criteria
- Link one Microsoft Learn page per lesson

### Checklist (per lesson)
- [ ] 2-3 objectives, 3-5 key concepts
- [ ] Code sample (C++17/20, static allocation, no exceptions)
- [ ] Hands-on steps with copy-paste commands
- [ ] Success criteria with validation method
- [ ] At least one agent-friendly prompt with `#file:` context

> **Note**: Instructors are not C++ developers. Focus on Copilot techniques, not teaching C++.

## Agent Focus Constraints

When guiding participants to build agentic workflows, enforce these constraints to keep the agent productive:

1. **Scope to single responsibility** - Each agent task should do ONE thing well
2. **Provide explicit context** - Always include relevant files via `#file:` references
3. **Set language/framework boundaries** - Specify C++17/20, no exceptions, static allocation
4. **Define acceptance criteria** - Tell the agent what "done" looks like
5. **Use iterative refinement** - Small changes, frequent validation, not big-bang generation
6. **Constrain output format** - Request specific patterns (RAII wrappers, state machines, HAL interfaces) when possible.
7. **Include safety guardrails** - Require const correctness, bounds checking, volatile for hardware registers

**Example constraint prompt for embedded C++:**
```
Generate a RTOS task wrapper using:
- Static allocation only (no new/malloc)
- No exceptions (use error codes)
- MISRA C++ compliant naming
- Include volatile for hardware register access
```

## Day 2 Hack Success Criteria

Teams should demonstrate:
- **Before/After comparison** - Show original code vs. Copilot-assisted modernization
- **Agentic workflow used** - Which steering docs, prompts, or agent patterns applied
- **Quantifiable improvement** - Lines refactored, tests added, docs generated, bugs fixed
- **Lessons learned** - What worked, what didn't, tips for others

## Day 2 Evidence Capture
- Before/after: identify target files and capture git diff snippets or screenshots.
- Metrics: lines refactored, tests added, defects fixed, docs generated.
- Agent usage: note prompts/agents/skills invoked and context provided.
- Demo-ready summary: problem, approach, result, next steps (3-5 bullets).

## Content Conventions

When editing agenda documents:
- Use markdown tables for session breakdowns with `| Sub-Topic | Focus | Time |` format
- Include total time in section headers: `#### Topic Name (Start - End) — XX min`
- Add speaker initials (TM, TI, GB) after timing when assigned
- Mark action items with `- [ ]` checkbox format
- Use `**☕ Break**` and `**🍽️ Lunch**` markers for schedule breaks
- Identify any prerequisites for development setup in the agenda doc.
- Specify commands that can be copied directly to ease of use.

## Workshop Structure Pattern

Each lesson module in `lessons/` should follow:
```
lessons/XX-topic-name/
├── README.md          # Learning objectives (brief), key concepts, hands-on instructions
├── examples/          # C++ code samples to demonstrate concepts
├── exercises/         # Starter code for hands-on practice
└── solutions/         # Completed exercise solutions
```

**Lesson README.md template:**
```markdown
# Lesson Title

## Objectives (2-3 bullets max)
## Key Concepts (bullet points, not prose)
## Hands-On Activity
### Setup
### Steps
### Success Criteria
## Reference Links (optional)
```

## Prompt Pattern Template

Use this structure for all agent prompts:

```
// [Task description]
You are generating embedded C++17 code. Requirements:
- Static allocation only; no exceptions; return error codes.
- Mark hardware registers volatile; ensure const correctness.
Context: #file:[path/to/file]
Acceptance: [specific criteria for "done"]
```

**Additional prompt examples**: See `lessons/04-agentic-patterns/` for ISR-safe ring buffer, HAL state machine, and SPI driver patterns.

## Time Budget

- Each day: 8:00 AM - 3:00 PM (7 hours)
- Morning sessions: ~4 hours
- Afternoon sessions: ~2.5 hours
- Include 15-min breaks and 45-min lunch

## Ownership
Maintainers: TM, TI, GB. Submit updates via PR or tracked change with their approval.

## Quick Reference Links
- GitHub Copilot for VS Code: https://learn.microsoft.com/training/modules/get-started-github-copilot-visual-studio-code/
- GitHub Copilot Chat in VS Code: https://learn.microsoft.com/training/modules/use-github-copilot-chat-vs-code/
- C++ in VS Code: https://learn.microsoft.com/cpp/build/vscpp-step-0-installation
- GitHub Copilot CLI: https://learn.microsoft.com/training/modules/use-github-copilot-cli/