# Module 4: C++ for Hardware Developers — Workshop Guide

> **NotebookLM generation instructions**:
> - Brand the deck with GitHub and Microsoft visual identity.
> - Use corporate minimal styling: clean layouts, restrained color use, and high readability.
> - Keep slides professional and uncluttered, with clear hierarchy and consistent typography with light background.
> - Use light backgrounds for all slide styling (cover, section, content, comparison, and summary slides).
> - Render **AI Safety Moment** and **Usage Optimization** callouts in distinct content boxes with a consistent badge icon per type so the tip category is instantly recognizable.
> - Generate dedicated slides for the workshop title (`# Module ...`), `## Workshop Overview`, and `### Learning Objectives`; do not skip or merge these sections.
> - Do not summarize away source meaning: treat workshop wording as authoritative and keep the exact messaging wherever possible. Minor connector-word edits are allowed only to improve flow and readability.
> - Control slide layout deliberately so content remains readable and properly structured on-slide.
> - Generate visual imagery that directly represents the slide wording and reinforces the intended meaning.

**Duration**: 1 hour 45 minutes (90 min content + 15 min lab)  
**Format**: Presentation + Hands-On  
**Audience**: Hardware, firmware, and embedded developers working in C and C++  
**Prerequisites**: VS Code, GitHub Copilot extension, GitHub Copilot CLI, a C++ toolchain (MSVC or Clang), CMake, and a `compile_commands.json` for a sample project

## Workshop Overview

This module adapts the GitHub Copilot Dev Hack curriculum for **hardware and embedded C++ developers**. It assumes the shared Foundations, Agentic Patterns, and Advanced Topics modules and adds a focused review of the C++ skills that matter most for firmware, drivers, and resource-constrained systems. The module shows how GitHub Copilot reasons about complex C++ — templates, macros, overloads, and build-system-dependent configuration — using the **Microsoft C++ Language Server** instead of plain text search. It then covers context and instruction discipline for embedded codebases (fixed-width types, RAII, no dynamic allocation, register and HAL access) and the agentic **`@Modernize`** workflow for upgrading legacy C++ safely. Hardware developers leave able to use Copilot as a precise, accountable acceleration layer on real low-level code.

### Learning Objectives

- Explain why semantic C++ understanding beats grep-based search for hardware and firmware codebases
- Set up the Microsoft C++ Language Server for the GitHub Copilot CLI with a `compile_commands.json`
- Author `.github/copilot-instructions.md` tuned for embedded C++ constraints and conventions
- Apply Copilot to hardware-flavored C++: memory-mapped I/O, HAL abstractions, bit manipulation, and fixed-width types
- Run the agentic `@Modernize` assess → plan → execute → validate loop with human approval at each stage
- Keep accountability with the developer for correctness, safety, and timing-critical behavior

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Framing: GitHub Copilot for hardware and embedded C++ | 12 min |
| 2 | C++ Code Intelligence: the Language Server vs. grep | 24 min |
| 3 | Context and instructions for embedded C++ | 24 min |
| 4 | Agentic modernization: the `@Modernize` workflow | 22 min |
| 5 | Wrap-up and hack handoff | 8 min |
| — | Hands-on lab across three exercises | 15 min |

## 1. Framing: GitHub Copilot for Hardware and Embedded C++ (12 min)

### Key Points

- **Slide topic (1 slide): Why C++ is hard for tools** — complex include hierarchies, macros, templates, overloads, and build-system-dependent configuration make plain text search noisy and misleading; hardware codebases add vendor SDKs, HAL layers, and conditional compilation on top. **AI Safety Moment**: low-level code controls real devices — treat every suggestion as draft and verify timing, memory, and safety behavior before accepting.
- **Slide topic (1 slide): Copilot as an acceleration layer, not an autopilot** — Copilot accelerates discovery, drafting, and modernization on firmware and drivers, but the developer remains accountable for correctness, real-time constraints, and hardware safety.
- **Slide topic (1 slide): What this module adds** — the shared modules cover the Copilot operating model; this module layers C++ code intelligence, embedded instruction discipline, and agentic modernization on top. **Usage Optimization**: invest setup effort once (compilation database + instruction files) so every later query is cheaper and more accurate.
- **Slide topic (1 slide): Lab transition — Exercise 1** — move from framing to validating a C++ workspace and baseline Copilot query.

### 🛡️ Safety Moment

- Firmware defects can damage hardware or create safety hazards — the human review gate is non-negotiable for low-level changes.
- Confirm organization policy and content-exclusion boundaries before sharing proprietary HAL or vendor SDK code as context.
- Frame all generated C++ as draft material that must pass build, static analysis, and on-target testing.

### 🔬 LAB: Exercise 1 — Validate the C++ Workspace

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (5 min) opening a sample C++ project, confirming the toolchain, and running a baseline Copilot query before continuing to the next section.

## 2. C++ Code Intelligence: the Language Server vs. grep (24 min)

### Key Points

- **Slide topic (1 slide): Semantic vs. text search** — the Microsoft C++ Language Server gives Copilot precise symbol definitions, references, call hierarchies, and type information using the same IntelliSense engine that powers Visual Studio and VS Code. **AI Safety Moment**: precise results still require human verification — a correct symbol match is not a correct design decision.
- **Slide topic (1 slide): The compilation database** — `compile_commands.json` tells Copilot how your code is actually built (include paths, defines, standard, target), which is the single most important context enabler for C++.
- **Slide topic (1 slide): Setup paths** — CMake projects generate `compile_commands.json` automatically (or via the setup skill); MSBuild (`.vcxproj`) projects use the MSBuild extractor sample until integrated support ships. **Usage Optimization**: keep `compile_commands.json` current after build-config changes so the LSP never reasons about stale flags.
- **Slide topic (1 slide): Using it in the CLI** — install `@microsoft/cpp-language-server`, then append "Use the C++ LSP" to queries or add a custom instruction telling Copilot to prefer the LSP.

### 🛡️ Safety Moment

- The LSP runs locally, but `compile_commands.json` exposes your build configuration — understand what you are sharing as context.
- Semantic precision reduces noise; it does not remove the need to review correctness and safety of suggested changes.

### 🖥️ Demo: LSP vs. grep on a real codebase

1. Open a C++ project (for example, the `{fmt}` library or a sample HAL) in the GitHub Copilot CLI.
2. Ask Copilot to "find all formatter classes and their base classes" using grep-style search only — note the noisy, multi-pass results.
3. Re-run the same request with "Use the C++ LSP" appended — note the precise, single-pass symbol and base-class results.
4. Use go-to-definition style queries to jump to exact declarations rather than every textual mention.

### 💡 Optimization Tip: Front-load context once

Generate `compile_commands.json` and install the C++ Language Server before a working session. A correct compilation database means fewer clarifying round-trips, fewer wasted tokens on grep noise, and higher-quality first answers — the setup cost is recovered after just a few queries.

### 🔬 LAB: Exercise 2 — Set Up and Query with the C++ Language Server

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (5 min) generating `compile_commands.json`, installing `@microsoft/cpp-language-server`, and comparing an LSP-backed query against a grep-backed query on the same code.

## 3. Context and Instructions for Embedded C++ (24 min)

### Key Points

- **Slide topic (1 slide): Instruction files for firmware** — a `.github/copilot-instructions.md` that encodes embedded constraints (no dynamic allocation after init, fixed-width `<cstdint>` types, RAII for resource handles, avoid exceptions in ISRs) steers every suggestion toward house style. **AI Safety Moment**: instruction files reduce unsafe defaults but never replace review of timing-critical or memory-mapped code.
- **Slide topic (1 slide): Hardware-flavored examples** — memory-mapped I/O, register/HAL access, bit manipulation, and `volatile` correctness are exactly where generic suggestions go wrong; scoped prompts plus instructions keep Copilot aligned with the platform.
- **Slide topic (1 slide): Modern C++ idioms with intent** — prefer `std::array` over raw arrays, `std::span` for buffers, `constexpr` for compile-time tables, and `std::format` over `printf` where the platform allows. **Usage Optimization**: encode idiom preferences once in instructions instead of repeating them in every prompt.
- **Slide topic (1 slide): Scoping context** — use `#file` and `#selection` to bound prompts to the driver or register map at hand rather than the whole firmware tree.

### 🛡️ Safety Moment

- Memory-mapped and `volatile` accesses have semantics Copilot can miss — verify generated register code against the datasheet.
- Real-time and ISR code must be reviewed for blocking calls, allocation, and exception use regardless of instruction files.

### 🖥️ Demo: Steering Copilot with embedded instructions

1. Show a register-write helper generated with no instruction file — note generic, possibly unsafe choices.
2. Add a `.github/copilot-instructions.md` with embedded rules (fixed-width types, `volatile` access, no dynamic allocation).
3. Re-generate the helper and compare — the suggestion now respects the platform conventions.
4. Scope a follow-up with `#selection` on a register map to keep the context tight.

### 💡 Optimization Tip: Encode conventions, don't repeat them

Every constraint you state inline in a prompt costs tokens on every request. Move durable rules (types, allocation policy, idioms, naming) into `copilot-instructions.md` once. Prompts then stay short and task-specific, lowering token usage while raising consistency across the team.

### 🔬 LAB: Exercise 3 — Author Embedded C++ Instructions

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (5 min) writing a `.github/copilot-instructions.md` for an embedded C++ project and re-running a register/HAL prompt to compare before-and-after suggestions.

## 4. Agentic Modernization: the `@Modernize` Workflow (22 min)

### Key Points

- **Slide topic (1 slide): What `@Modernize` does** — an agentic Visual Studio workflow that upgrades C++ projects to newer MSVC Build Tools, identifies upgrade-induced build issues, and iteratively fixes them with your approval. **AI Safety Moment**: the agent proposes; the developer approves — never let modernization land on firmware without review and on-target validation.
- **Slide topic (1 slide): The four-stage loop** — Assessment (`assessment.md`), Planning (`plan.md`, approval required), Execution (tasks, branch/commit, rebuild to verify), and Post-Upgrade Validation (tests + PR review). This is the agent loop made concrete for C++ developers.
- **Slide topic (1 slide): Good off-ramp design** — `@Modernize` generates an assessment for human review rather than silently applying fixes and stops for approval at each stage, a model worth copying in your own agent workflows. **Usage Optimization**: let the agent skip pre-existing warnings and strategic exceptions so it spends effort only on upgrade-relevant issues.
- **Slide topic (1 slide): Cloud and background variants** — for cloud agents on C++ projects, `copilot-setup-steps.yml` must install compilers and build tooling so the environment can build before the agent reasons about it.

### 🛡️ Safety Moment

- Modernization changes build flags and code — review the generated `plan.md` before approving execution.
- Always run upgraded firmware through your test infrastructure and a peer pull-request review before release.

### 🖥️ Demo: Modernize agent walkthrough

1. Retarget a sample C++ solution to a newer MSVC Build Tools version.
2. Launch `@Modernize` from Solution Explorer (or `Use @Modernize to update MSVC Build Tools.` in Copilot Chat).
3. Review the generated `assessment.md`, then the `plan.md`, and approve before execution.
4. Watch the agent execute tasks and rebuild to verify, then route the result to tests and PR review.

### 💡 Optimization Tip: Scope the agent's work

Tell `@Modernize` which issues to skip (pre-existing warnings, deliberate deviations) up front. A narrower scope means fewer assessment items, a shorter plan, and fewer execution iterations — less agent time and lower token cost for the same upgrade outcome.

### 🔬 LAB: Hack Handoff — Apply on Your Own Codebase

> **Instructor**: This section feeds the Day 2 hack. Encourage teams to bring a real C++ or firmware codebase and apply the LSP, instruction files, and modernization workflow during the hack rather than a separate timed exercise.

## 5. Wrap-up and Hack Handoff (8 min)

### Key Points

- **Slide topic (1 slide): What you can now do** — set up semantic C++ intelligence, steer Copilot with embedded instructions, and run agentic modernization with human approval gates.
- **Slide topic (1 slide): Carry it into the hack** — bring a real firmware, driver, or embedded C++ codebase to Day 2 and apply these techniques on production-shaped problems.
- **Slide topic (1 slide): Accountability stays with you** — Copilot is a precise acceleration layer; correctness, timing, and hardware safety remain the developer's responsibility.

### 🛡️ Safety Moment

- Precision tools (LSP, `@Modernize`) build trust, but build trust is not blind trust — verify on hardware.
- Keep the human review gate explicit for every low-level change that ships.

*Workshop guide for Module 4: C++ for Hardware Developers — GitHub Copilot Developer Training*
