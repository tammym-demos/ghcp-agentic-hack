# Module 4: C++ for Hardware Developers — Hands-On Lab

## Overview

This lab gives hardware and embedded developers hands-on practice using GitHub Copilot on real C++. Exercises move from validating a C++ workspace, to setting up semantic code intelligence with the Microsoft C++ Language Server, to steering Copilot with embedded-specific instruction files. The result is a reusable, Copilot-ready C++ project setup you can carry into the Day 2 hack.

- **Total time**: ~15 minutes
- **Prerequisites**:
  - VS Code with GitHub Copilot enabled
  - GitHub Copilot CLI installed and authenticated
  - A C++ toolchain (MSVC or Clang) and CMake
  - A sample C++ project (a small CMake project or a library such as `{fmt}` works well)

## Exercise 1: Validate the C++ Workspace

**⏱️ Time**: 5 min  
**📋 Objective**: Confirm the toolchain and run a baseline Copilot query on a C++ codebase

1. Open your sample C++ project in VS Code and confirm it builds with your toolchain.
2. Verify the GitHub Copilot CLI is available:

```powershell
copilot --version
```

3. In VS Code chat, run a scoped understanding query against a real source file:

```text
Explain what this file does and list its public symbols. #file
```

4. Note where the answer is precise and where it is vague — vagueness usually signals missing build context (the next exercise fixes that).
5. Record one low-level construct in your code (a register access, macro, or template) that a text-only tool would likely misread.

**🛡️ Safety checkpoint**: Treat every suggestion as draft. For low-level code, define the human review gate (build, static analysis, on-target test) before accepting anything.

### ✅ Success Criteria

- ✅ Sample C++ project builds locally
- ✅ Confirmed the Copilot CLI is installed and authenticated
- ✅ Ran one `#file`-scoped understanding query
- ✅ Identified one construct that text search would likely misread
- ✅ Stated an explicit human review gate for low-level changes

## Exercise 2: Set Up and Query with the C++ Language Server

**⏱️ Time**: 5 min  
**📋 Objective**: Give Copilot semantic C++ understanding and compare it against grep-based search

1. Generate a compilation database for the project. For CMake:

```powershell
cmake -S . -B build -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

> **Note**: For MSBuild (`.vcxproj`) projects, use the MSBuild extractor sample to produce `compile_commands.json` until integrated support ships.

2. Install the Microsoft C++ Language Server for the Copilot CLI:

```powershell
npm install -g @microsoft/cpp-language-server
```

3. Ask a symbol-navigation question using grep-style search only and note the noise:

```text
Find all classes derived from the base formatter type in this project.
```

4. Re-run the same request with the LSP and compare precision:

```text
Find all classes derived from the base formatter type in this project. Use the C++ LSP.
```

5. Record the difference in result quality (precision, number of passes, false matches).

**🛡️ Safety checkpoint**: The LSP runs locally, but `compile_commands.json` exposes your build configuration. Confirm you are comfortable sharing that build context before proceeding.

### ✅ Success Criteria

- ✅ Generated a `compile_commands.json` for the project
- ✅ Installed `@microsoft/cpp-language-server`
- ✅ Ran the same query with and without the C++ LSP
- ✅ Documented the difference in result precision
- ✅ Confirmed awareness of what build context is shared

## Exercise 3: Author Embedded C++ Instructions

**⏱️ Time**: 5 min  
**📋 Objective**: Steer Copilot toward embedded conventions with an instruction file

1. Create `.github/copilot-instructions.md` in the project with embedded-specific rules, for example:

```markdown
# Copilot Instructions — Embedded C++

- Use fixed-width integer types from <cstdint> (uint32_t, not unsigned int).
- Do not use dynamic allocation after initialization; prefer std::array and fixed buffers.
- Use RAII for resource handles; avoid exceptions in ISR and real-time paths.
- Mark memory-mapped register accesses volatile and verify against the datasheet.
- Prefer constexpr for compile-time tables and std::span for buffer parameters.
```

2. Prompt Copilot to generate a register-write helper **before** relying on the file by scoping to a register map:

```text
Write a helper to set bits 3 and 5 of the GPIO mode register. #selection
```

3. Re-run the same prompt after saving the instruction file and compare the two suggestions.
4. Confirm the second suggestion respects fixed-width types and `volatile` access.
5. Save this project setup (compilation database + instruction file) to reuse during the Day 2 hack.

**🛡️ Safety checkpoint**: Instruction files reduce unsafe defaults but do not replace review. Verify generated register and ISR code against the datasheet and timing requirements.

### ✅ Success Criteria

- ✅ Created `.github/copilot-instructions.md` with embedded rules
- ✅ Generated a register/HAL helper before and after the instruction file
- ✅ Confirmed the post-instruction suggestion uses fixed-width types and `volatile`
- ✅ Scoped the prompt with `#selection` to keep context tight
- ✅ Saved a reusable Copilot-ready C++ project setup for the hack

*Hands-on lab for Module 4: C++ for Hardware Developers — GitHub Copilot Developer Training*
