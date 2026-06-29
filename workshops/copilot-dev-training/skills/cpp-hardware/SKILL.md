---
name: C++ / Hardware Developer Skill
description: Use this skill when working with C, C++, firmware, embedded systems, hardware abstraction layers, memory-mapped I/O, CMake, compile_commands.json, C++ language-server setup, or safe modernization of legacy C++ projects.
icon: 🔧
audience: Hardware, firmware, and embedded C++ developers
order: 1
---

# C++ / Hardware Developer Skill

Use this skill to help GitHub Copilot work effectively on hardware-oriented C and C++ codebases. It focuses Copilot on semantic C++ understanding, embedded constraints, safe modernization, and human review gates for low-level code.

## When to Use This Skill

- You are working in a C or C++ codebase with complex includes, macros, templates, overloads, or build-system-specific configuration.
- You need Copilot to reason about firmware, drivers, hardware abstraction layers, register maps, or memory-mapped I/O.
- You need to set up or use `compile_commands.json` and a C++ language server so Copilot can answer symbol-aware questions.
- You are modernizing legacy C++ and need an assess, plan, execute, validate workflow with approval gates.
- You want Copilot suggestions to follow embedded rules such as fixed-width types, no dynamic allocation after initialization, and careful `volatile` usage.

## Core Operating Principles

| Principle | Guidance |
|-----------|----------|
| Semantic context first | Prefer language-server-backed symbol understanding over plain text search. |
| Build context matters | Keep `compile_commands.json` current so include paths, defines, standards, and target flags match the real build. |
| Encode durable rules | Put embedded constraints in `.github/copilot-instructions.md` instead of repeating them in every prompt. |
| Scope tightly | Use `#file`, `#selection`, and precise task boundaries before asking broad codebase questions. |
| Human accountability | Treat generated low-level code as draft until build, static analysis, peer review, and hardware validation pass. |

## Recommended Setup

1. Open the target C or C++ project in VS Code.
2. Confirm the project builds locally with the intended compiler and target configuration.
3. Generate a compilation database for CMake projects:

```powershell
cmake -S . -B build -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

4. Install the Microsoft C++ Language Server for Copilot CLI workflows:

```powershell
npm install -g @microsoft/cpp-language-server
```

5. Ask Copilot to use semantic C++ context when answering symbol, call hierarchy, inheritance, or type questions:

```text
Find all classes derived from the base formatter type in this project. Use the C++ LSP.
```

> **Note**: For MSBuild (`.vcxproj`) projects, use an MSBuild-to-`compile_commands.json` extractor until native compilation database support is available in your environment.

## Embedded C++ Instruction Template

Create `.github/copilot-instructions.md` in the target project and adapt this template:

```markdown
# Copilot Instructions — Embedded C++

- Use fixed-width integer types from <cstdint> (`uint32_t`, not `unsigned int`).
- Do not use dynamic allocation after initialization; prefer `std::array` and fixed buffers.
- Use RAII for resource handles.
- Avoid exceptions in ISR and real-time paths.
- Mark memory-mapped register accesses `volatile` and verify register behavior against the datasheet.
- Prefer `constexpr` for compile-time tables.
- Prefer `std::span` for buffer parameters when the target platform supports it.
- Keep prompts scoped to the relevant driver, HAL, register map, or selected code.
```

## Prompt Patterns

### Understand a C++ File

```text
Explain what this file does, list its public symbols, identify hardware-facing responsibilities, and call out any build-context assumptions. #file
```

### Compare Text Search and Semantic Search

```text
Find all classes derived from the base formatter type in this project. First explain what a grep-only search may miss, then answer using the C++ LSP.
```

### Review Register Access

```text
Review this register-write helper for fixed-width types, volatile correctness, masking behavior, and datasheet assumptions. Do not rewrite it yet; list risks and validation steps first. #selection
```

### Generate a Hardware-Safe Helper

```text
Write a helper to set bits 3 and 5 of the GPIO mode register. Use fixed-width types, preserve unrelated bits, avoid dynamic allocation, and explain what must be verified against the datasheet. #selection
```

### Plan Legacy Modernization

```text
Assess this legacy C++ component for safe modernization. Produce an assessment first, then a plan. Do not apply changes until I approve the plan. Focus on build compatibility, ownership semantics, fixed buffers, and test coverage.
```

## Safe Modernization Workflow

Use an explicit four-stage loop for legacy C++:

| Stage | Output | Approval Gate |
|-------|--------|---------------|
| Assess | Current build, risks, warnings, and modernization opportunities | Human reviews scope and exclusions |
| Plan | Ordered tasks, validation commands, rollback notes | Human approves before edits |
| Execute | Small changes with build verification after each step | Human reviews diffs and failures |
| Validate | Tests, static analysis, hardware or simulator checks, PR review | Human confirms release readiness |

For Visual Studio `@Modernize` workflows, keep the same approval model: review `assessment.md`, review and approve `plan.md`, let the agent execute only approved tasks, then validate with builds, tests, and pull request review.

## Safety Checklist

- Verify generated register code against the datasheet.
- Check ISR and real-time paths for blocking calls, allocation, exceptions, locks, and unbounded loops.
- Confirm generated code preserves unrelated register bits and handles masks correctly.
- Rebuild with the real target flags, not just a desktop approximation.
- Run static analysis and unit tests where available.
- Validate hardware-facing behavior on the target board, simulator, or hardware-in-the-loop environment before release.
- Keep the developer accountable for correctness, timing, memory behavior, and device safety.

## Usage Optimization Tips

- Generate and maintain `compile_commands.json` once so later questions avoid noisy multi-pass text search.
- Encode project conventions in instruction files instead of retyping them in prompts.
- Keep prompts scoped to the relevant file or selection before using whole-codebase context.
- Ask for assessment and planning before edits when the change affects build flags, hardware behavior, or legacy modernization.
- Tell modernization agents which warnings or deviations are pre-existing so they spend effort only on relevant work.

*Technology skill for C++ / Hardware Developers — GitHub Copilot Developer Training*
