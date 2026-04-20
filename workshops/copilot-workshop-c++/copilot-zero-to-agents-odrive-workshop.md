# GitHub Copilot: Zero to Agents Workshop — ODrive Embedded C++ Edition

**Duration**: ~4 hours
**Format**: Presentation + Live Demo + Hands-On
**Audience**: Embedded C++ developers with basic Copilot exposure (completions/chat)
**Focus**: Copilot customization, agentic workflows, and cloud agents for embedded firmware
**Repo**: [thomasiverson/ODrive-Custom](https://github.com/thomasiverson/ODrive-Custom) (ODrive motor controller firmware)

---

## Workshop Overview

This session takes embedded C++ developers from casual Copilot usage to full agentic development. Starting with chat modes and progressing through customization layers — instructions, prompts, agents, skills, and MCP servers — attendees build a complete understanding of how to tailor Copilot to embedded firmware workflows. The session extends to the standalone GitHub Copilot CLI for a full agentic terminal experience and closes with fully autonomous cloud agents (Coding Agent + PR Review Agent).

The ODrive firmware is the perfect subject: a real-world STM32 motor controller with FreeRTOS, Field-Oriented Control (FOC), CAN/USB/UART communications, and strict embedded constraints (no heap, no exceptions, ISR safety). Every exercise uses production firmware code.

### Learning Objectives

- Master Copilot's three chat modes: Ask, Agent, and Plan
- Create custom instructions that encode embedded C++ coding standards and safety rules
- Build reusable prompt files and custom agents for firmware workflows
- Author Agent Skills that Copilot auto-selects for motor control, debugging, and toolchain tasks
- Extend Copilot with MCP servers for GitHub integration
- Use the standalone GitHub Copilot CLI as an agentic terminal — interactive TUI, plan mode, file context, /review, and /delegate to Coding Agent
- Leverage cloud agents: Coding Agent for autonomous PR creation and Copilot Code Review for AI-powered PR reviews

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | With Copilot Pro, Business, or Enterprise license |
| **VS Code** | Latest stable (or Insiders for preview features) |
| **Copilot Extension** | GitHub Copilot + GitHub Copilot Chat extensions installed |
| **C/C++ Extension Pack** | For IntelliSense, syntax highlighting, and debugging |
| **Git** | For cloning the demo repository |
| **GitHub Copilot CLI** | Install from <https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli> — required for Section 8 |

> **Note**: You do NOT need the ARM cross-compiler or hardware to complete the exercises. All exercises focus on code analysis, generation, and review — not compilation or flashing.

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | [Welcome, Objectives & Environment Setup](#1-welcome-objectives--environment-setup-20-min) | 20 min |
| 2 | [Copilot Chat Modes: Ask, Agent, Plan](#2-copilot-chat-modes-ask-agent-plan-25-min) | 25 min |
| 3 | [Custom Instructions](#3-custom-instructions-25-min) | 25 min |
| 4 | [Custom Prompt Files](#4-custom-prompt-files-25-min) | 25 min |
| 5 | [Agent Skills](#5-agent-skills-25-min) | 25 min |
| 6 | [Custom Agents (Chat Modes)](#6-custom-agents-chat-modes-25-min) | 25 min |
| 7 | [MCP Servers](#7-mcp-servers-30-min) | 30 min |
| 8 | [GitHub Copilot CLI: The Agentic Terminal](#8-github-copilot-cli-the-agentic-terminal-30-min) | 30 min |
| 9 | [Cloud Agents: Coding Agent + PR Review Agent](#9-cloud-agents-coding-agent--pr-review-agent-20-min) | 20 min |
| 10 | [Wrap-Up, Customization Hierarchy Recap & Q&A](#10-wrap-up-customization-hierarchy-recap--qa-10-min) | 10 min |

**Total: ~235 min core (~3h 55min)**

---

## The "Zero to Agents" Narrative Arc

This workshop follows a deliberate progression:

```
Chat Modes → Custom Instructions → Prompt Files → Agent Skills → Custom Agents → MCP → CLI → Cloud Agents
 (explore)    (encode standards)   (reusable tasks) (auto-selected) (personas)   (tools) (terminal) (autonomous)
```

Each section builds on the previous one, showing how Copilot can be progressively customized from a general assistant to a specialized, autonomous embedded development partner.

---

## 1. Welcome, Objectives & Environment Setup (20 min)

### Key Points

- Workshop narrative: "Zero → Customize → Extend → Agents"
- This is NOT a Copilot basics session — we assume you've used completions and chat
- By the end, you'll have built a fully customized Copilot environment with instructions, prompts, agents, skills, and MCP integration
- Everything we build today uses real files in the `.github/` directory — portable across your own repos

### The Customization Hierarchy

| Layer | File Location | When Loaded | Purpose |
|-------|---------------|-------------|---------|
| **Custom Instructions** | `.github/copilot-instructions.md` | Always (every interaction) | Simple rules, coding standards |
| **Scoped Instructions** | `.github/instructions/*.instructions.md` | When matching files are active | File/language-specific guidance |
| **Prompt Files** | `.github/prompts/*.prompt.md` | On-demand (user invokes) | Reusable task templates |
| **Agents / Chat Modes** | `.github/agents/*.agent.md` | User selects in chat mode picker | Persistent personas with tool chains |
| **Agent Skills** | `.github/skills/*/SKILL.md` | Auto-selected by relevance | Specialized task instructions |
| **MCP Servers** | `.vscode/mcp.json` | When server is running | External tool integration |

---

### 🖥️ DEMO: The ODrive Firmware Project

1. Show the [GitHub repo](https://github.com/thomasiverson/ODrive-Custom) in the browser
2. Walk through the architecture:
   - **MCU**: STM32F405 (ARM Cortex-M4F) with FreeRTOS
   - **Core firmware**: `Firmware/MotorControl/` — FOC, PID, encoder, trajectory planning
   - **HAL layer**: `Firmware/Drivers/STM32/` — GPIO, timers, SPI, DMA
   - **Communication**: `Firmware/communication/` — USB CDC, CAN, UART protocols
   - **Python tools**: `tools/odrive/` — CLI, DFU flashing, integration tests
3. Show the key source files: `motor.cpp`, `axis.cpp`, `encoder.cpp`, `foc.cpp`, `controller.cpp`
4. Point out the `.github/` directory structure — we'll explore and build customization files throughout the workshop

<details>
<summary><h3>🧪 Hands-On: Environment Setup (10 min)</h3></summary>

**Step 1: Fork & Clone**

```bash
# Fork the repo via GitHub UI, then:
git clone https://github.com/<YOUR-USERNAME>/ODrive-Custom.git
cd ODrive-Custom
```

**Step 2: Open in VS Code**

```bash
code .
```

**Step 3: Verify Copilot**

- VS Code: Open Command Palette → type "Copilot" → verify extension is active
- Open `src-ODrive/Firmware/MotorControl/motor.cpp` → verify syntax highlighting works

**Step 4: Explore the Project**

- Browse `src-ODrive/Firmware/MotorControl/` — this is where motor control logic lives
- Browse `src-ODrive/Firmware/Drivers/STM32/` — hardware abstraction layer
- Browse `src-ODrive/docs/` — Sphinx documentation in RST format

> **Note**: No ARM toolchain or hardware required. All exercises focus on code analysis, generation, and review.

</details>

### Discussion Points

- Who has used Copilot Chat before? What modes have you tried?
- What's your biggest frustration with Copilot for C++ or embedded work? (Common answer: "It doesn't understand our hardware constraints" — tease Section 3)

---

## 2. Copilot Chat Modes: Ask, Agent, Plan (25 min)

### Key Points

- Copilot has three chat modes — each optimized for different tasks
- Most developers only use one or two — understanding all three unlocks the full value
- Modes are selected from the Copilot Chat mode picker (dropdown at the top)
- Agent mode also offers sub-types: Local, Background, and Cloud — controlling where and how the agent runs

### Mode Comparison

| Mode | Best For | Context | Output |
|------|----------|---------|--------|
| **Ask** | Exploring, learning, understanding code | Reads codebase, open files, `@workspace` | Text explanations, code snippets in chat |
| **Agent** | Building features, editing code, running commands | Full codebase, terminal, tools | Creates/edits files (single or multi-file), runs commands |
| **Plan** | Analyzing, planning, proposing changes | Reads codebase, images, context | Implementation plans and proposals (no file changes) |

### When to Use Each Mode — Decision Framework

```
"I need to understand this FOC algorithm"        → Ask
"I need to add a new CAN message handler"        → Agent
"I need to plan a motor diagnostics module"       → Plan
```

---

### 🖥️ DEMO: Ask Mode

1. Open Copilot Chat → select **Ask** mode
2. Enter:

```
Explain the motor control architecture in this project. How does the control loop work from the main task through FOC?
```

3. Show how Copilot references `axis.cpp`, `motor.cpp`, `foc.cpp`, `controller.cpp` and traces the control flow
4. Enter:

```
What communication protocols does this firmware support? How are they organized?
```

5. Show Copilot analyzing USB, CAN, and UART handlers in `Firmware/communication/`

**Talking point**: "Ask mode is your read-only expert. It understands the entire codebase — from high-level architecture down to individual register configurations. Perfect for onboarding to unfamiliar firmware."

### Agent Sub-Types

When you select Agent mode, a second picker lets you choose the agent type — controlling where and how the agent runs:

| Type | Where It Runs | Best For |
|------|---------------|----------|
| **Local** | Your IDE, interactive | Day-to-day coding, exploring, building features |
| **Background** | Your IDE, non-blocking | Longer tasks you want to run while continuing other work |
| **Cloud** | GitHub servers | Autonomous coding from GitHub Issues (see Section 9) |

> **Note**: Throughout this workshop, we primarily use the **Local** agent type. Section 9 covers the **Cloud** agent type (Coding Agent) in detail.

---

### 🖥️ DEMO: Plan Mode

1. Open Copilot Chat → select **Plan** mode
2. Enter:

```
I want to add a motor diagnostics module that tracks runtime statistics — total run time, fault counts, max temperature reached, and max current drawn. What's the best approach given the embedded constraints?
```

3. Show Copilot analyzing the codebase and proposing a detailed implementation plan:
   - Which files need to change (`motor.hpp`, `motor.cpp`, `axis.cpp`)
   - How to store diagnostics (static allocation, no heap)
   - How to integrate with the existing control loop
   - ISR safety considerations
4. Show that Plan mode does NOT create or modify any files — it only proposes

**Talking point**: "Plan mode is your architect. It reads your codebase, analyzes embedded constraints, and proposes a plan — without touching any code. Essential before modifying safety-critical firmware."

---

### 🖥️ DEMO: Agent Mode

1. Switch to **Agent** mode
2. Enter:

```
Add Doxygen documentation comments to the Motor class in motor.hpp. Include @brief, @param, and @return for each public method.
```

3. Show Copilot:
   - Reading `motor.hpp` to understand the class interface
   - Generating Doxygen comments that match the actual function signatures
   - Editing the file directly
4. Show the documentation appearing inline

**Talking point**: "Agent mode is your pair programmer. It can read files, write files, run terminal commands, and iterate until things work. It's the mode you'll use most in this workshop."

<details>
<summary><h3>🧪 Hands-On: Try All Three Modes (8 min)</h3></summary>

**Exercise 1 — Ask Mode**:

1. Open Copilot Chat → select **Ask** mode from the dropdown
2. Open `src-ODrive/Firmware/MotorControl/foc.cpp` and enter:

```
Explain the Field-Oriented Control algorithm implemented in this file. What are the key mathematical transformations?
```

3. Note how Copilot explains the Clarke and Park transforms, current sensing, and PWM generation

**Exercise 2 — Plan Mode**:

1. Switch to **Plan** mode from the mode dropdown
2. Enter:

```
How should I add comprehensive error handling to the encoder calibration sequence in encoder.cpp? Consider the embedded constraints: no exceptions, no heap allocation, ISR-safe data access.
```

3. Review the plan Copilot proposes — note it doesn't change any files

**Exercise 3 — Agent Mode**:

1. Switch to **Agent** mode and enter:

```
Add a brief comment block at the top of src-ODrive/Firmware/MotorControl/encoder.cpp explaining what the file does, the encoder types it supports, and the calibration sequence.
```

2. Watch Copilot read the file, understand its purpose, and add documentation

</details>

### Success Criteria

- ✅ You can switch between Ask, Agent, and Plan modes
- ✅ You've received a codebase-aware answer from Ask mode about motor control architecture
- ✅ You've seen Plan mode propose changes without modifying files
- ✅ Agent mode has edited a file directly

---

## 3. Custom Instructions (25 min)

### Key Points

- Custom instructions are the simplest way to personalize Copilot for your team
- They're loaded into EVERY Copilot interaction — invisible, always-on context
- Two types:
  - **Project-wide**: `.github/copilot-instructions.md` — applies to all interactions in the repo
  - **Scoped**: `.github/instructions/*.instructions.md` — applies only when matching files are active (uses glob patterns in YAML frontmatter)

### What Goes in Custom Instructions?

| Good Candidates | Bad Candidates |
|-----------------|----------------|
| Naming conventions (camelCase for vars, PascalCase for types) | Entire API documentation |
| Embedded constraints (no heap, no exceptions) | Step-by-step tutorials |
| ISR safety rules (volatile, atomics, critical sections) | Complete code examples |
| Hardware register patterns | Business logic rules |
| Build system references | Long prose explanations |

**Rule of thumb**: Keep it concise. Instructions are loaded on every interaction — they consume context window.

---

### 🖥️ DEMO: Generate Custom Instructions

1. Open Copilot Chat → click the **Gear** icon (⚙️) in the chat window
2. Select **"Generate Agent Instructions"**
3. Show Copilot analyzing the repo and generating a `copilot-instructions.md` file
4. Review the generated content — it should reference:
   - ODrive firmware, STM32, FreeRTOS
   - C++ coding standards (naming, no heap, no exceptions)
   - Build system (Tup/Make, ARM GCC)
   - Communication protocols (CAN, USB, UART)
5. Save the file to `.github/copilot-instructions.md`

**Talking point**: "Copilot just analyzed an entire embedded firmware project and wrote its own instruction manual. This file will now be loaded into every interaction — ensuring Copilot always respects your embedded constraints."

---

### 🖥️ DEMO: Create Scoped Instructions

1. Create `.github/instructions/cpp_coding_standards.instructions.md`:

```markdown
---
applyTo: "**/*.cpp,**/*.c,**/*.h,**/*.hpp"
---
# C++ Coding Standards for ODrive Firmware

## Naming Conventions
- Variables and functions: `camelCase`
- Types and classes: `PascalCase`
- Constants and macros: `UPPER_SNAKE_CASE`
- Member variables: `trailing_underscore_`

## Embedded Constraints
- No dynamic memory allocation (no `new`, `malloc`, `std::vector`)
- No exceptions (`noexcept` on all functions, use error codes)
- Use `static` allocation and fixed-size arrays (`std::array`)
- All ISR-shared variables must be `volatile` or use atomics
- No blocking calls in ISR context
- Bounded execution time in all control loop functions

## Safety Rules
- NEVER auto-execute: `make flash`, `odrivetool`, or any hardware operation
- ALWAYS provide explicit warnings before hardware operations
- Check array bounds before access
- Validate all inputs at system boundaries
```

2. Open `src-ODrive/Firmware/MotorControl/motor.cpp`, then ask Copilot in **Ask** mode:

```
How should I add a new method to the Motor class?
```

3. Show how the scoped instructions influence the response — Copilot should now reference naming conventions, no-heap constraints, and error code patterns

**Talking point**: "Scoped instructions activate only when you're editing C++ files. Python tools get different rules. Same repo, different standards per file type."

---

### 🖥️ DEMO: The Internal Framework Example

This is the power demo — teaching Copilot about a pattern it has NEVER seen.

1. Add to `.github/copilot-instructions.md`:

```markdown
## Telemetry Requirements
- All motor control methods must use the ODrive telemetry macros
- Use ODRIVE_TRACE_BEGIN(name) at function entry
- Use ODRIVE_TRACE_END() at function exit
- Use ODRIVE_METRIC(name, value) for runtime measurements
- These macros are defined in telemetry.h — assume it exists, never create it
```

2. Switch to Agent mode and enter:

```
Add telemetry instrumentation to the Motor::update() method following our internal standards
```

3. Show Copilot generating telemetry code (`#include "telemetry.h"`, `ODRIVE_TRACE_BEGIN("Motor::update")`) — code that references macros that don't exist publicly

**Talking point**: "These telemetry macros don't exist anywhere on the internet. But because we told Copilot about them in our custom instructions, it generates code using our internal patterns. Imagine this for YOUR company's internal libraries."

> **Note**: The generated code won't compile because these macros are fictional. That's intentional — it demonstrates that custom instructions override Copilot's training data.

#### Cleanup: Revert Telemetry Changes

1. Stay in **Agent** mode and enter:

```
Revert the telemetry changes you just made, and remove the "Telemetry Requirements" section from .github/copilot-instructions.md. The telemetry macros are fictional.
```

2. Verify Copilot removes the changes and the codebase is clean

<details>
<summary><h3>🧪 Hands-On: Create Your Instructions (12 min)</h3></summary>

**Step 1: Establish a Baseline (Before Instructions)**

1. Open Copilot Chat in **Ask** mode
2. Open `src-ODrive/Firmware/MotorControl/motor.cpp` and ask:

```
How should I add a new method to the Motor class?
```

3. Pay attention to: Does Copilot mention naming conventions? Does it know about no-heap constraints? Does it reference error codes vs exceptions?

**Step 2: Generate Project-Wide Instructions**

1. Open Copilot Chat → click the **Gear** icon (⚙️) in the chat window
2. Select **"Generate Agent Instructions"**
3. Review the generated content — it should reference the ODrive tech stack and constraints
4. Save to `.github/copilot-instructions.md`

**Step 3: Create Scoped C++ Instructions**

1. Create `.github/instructions/cpp_coding_standards.instructions.md` with the following content:

```markdown
---
applyTo: "**/*.cpp,**/*.c,**/*.h,**/*.hpp"
---
# C++ Coding Standards for ODrive Firmware

## Naming Conventions
- Variables and functions: `camelCase`
- Types and classes: `PascalCase`
- Constants and macros: `UPPER_SNAKE_CASE`
- Member variables: `trailing_underscore_`

## Embedded Constraints
- No dynamic memory allocation (no `new`, `malloc`, `std::vector`)
- No exceptions — use `enum class ErrorCode` with `[[nodiscard]]`
- Use `static` allocation and `std::array` for fixed-size collections
- All ISR-shared variables must be `volatile` or use atomics
- No blocking calls in ISR context
- Bounded execution time in control loop functions

## Header Rules
- Use `#pragma once` (not include guards)
- System headers before project headers
- Forward-declare when possible to reduce compile times
```

> **Note**: The `applyTo` field uses glob patterns. `**/*.cpp,**/*.c,**/*.h,**/*.hpp` means these instructions load whenever you have any C/C++ file open.

**Step 4: Test the Difference (After Instructions)**

1. Open `src-ODrive/Firmware/MotorControl/motor.cpp`
2. In Copilot Chat (**Ask** mode), ask the same question from Step 1:

```
How should I add a new method to the Motor class?
```

3. Compare the response to your baseline. You should notice:
   - References to `camelCase` naming
   - Mentions of no-heap constraints
   - Error code patterns instead of exceptions
   - `[[nodiscard]]` and `noexcept` usage

**Step 5: Create a Python Scoped Instruction** (Bonus)

1. Create `.github/instructions/python_coding_standards.instructions.md`:

```markdown
---
applyTo: "**/*.py"
---
# Python Coding Standards for ODrive Tools

- Follow PEP 8 style guidelines
- Use type hints on all function signatures
- Use `logging` module instead of `print()` for diagnostic output
- Use `pytest` for all test files
- Prefix test functions with `test_`
- Use `odrive` package conventions for CLI tool development
```

2. Open a file in `src-ODrive/tools/` and ask Copilot about writing a utility function — observe the Python-specific guidance

</details>

### Success Criteria

- ✅ `.github/copilot-instructions.md` exists in your repo
- ✅ `.github/instructions/cpp_coding_standards.instructions.md` exists with `applyTo` for C/C++ files
- ✅ You've compared Copilot's responses before and after adding instructions and noticed the difference
- ✅ You understand that instructions are always-on background context

---

## 4. Custom Prompt Files (25 min)

### Key Points

- Prompt files are reusable task templates stored in `.github/prompts/`
- They have YAML frontmatter that configures mode, tools, and description
- Invoked via: Run button in the file, Command Palette → "Prompts: Run Prompt", or typing `/prompt-name` in chat
- Unlike instructions (always loaded), prompts are on-demand — you choose when to run them

### Anatomy of a Prompt File

```yaml
---
mode: 'agent'                    # Which mode to use (ask, agent, plan)
description: 'Description here'  # Shows in the prompt picker
tools: ['changes', 'codebase',   # Which tools the agent can use
  'editFiles', 'runCommands',
  'search', 'terminalLastCommand']
---

# Prompt Title

## Context
Describe what the prompt does and what context it needs.

## Requirements
List specific requirements, patterns, and constraints.

## Success Criteria
Define what "done" looks like.
```

---

### 🖥️ DEMO: Walk Through Embedded-Specific Prompts

**Prompt 1: `review-code.prompt.md`** (Code review for embedded)

1. Open `.github/prompts/review-code.prompt.md` (if it exists in your `src-ODrive/.github/prompts/`)
2. Walk through the structure:
   - YAML frontmatter: `mode: 'agent'`
   - Embedded-specific review criteria (ISR safety, volatile correctness, no heap)
   - Structured output format (severity levels, file references, fix suggestions)
3. **Run the prompt**: Click the Run button at the top of the file
4. Show Agent mode activating, reading code, generating a structured review

**Talking point**: "This prompt encapsulates everything a senior embedded engineer checks during code review. Junior devs run this prompt and get senior-quality feedback."

**Prompt 2: `debug-firmware.prompt.md`** (Firmware debugging workflow)

1. Open `.github/prompts/debug-firmware.prompt.md`
2. Highlight key design decisions:
   - References OpenOCD/GDB debugging patterns
   - Checks fault registers, hard fault analysis
   - Follows a systematic debugging strategy: reproduce → isolate → examine → fix → verify

**Talking point**: "Not every prompt should generate code. This one structures a debugging session — it forces Copilot to think systematically about firmware issues."

<details>
<summary><h3>🧪 Hands-On: Create and Run Prompt Files (12 min)</h3></summary>

**Exercise 1 — Explore the Existing Prompts**

1. Open `src-ODrive/.github/prompts/` in the file explorer
2. Browse the available prompts — `review-code`, `debug-firmware`, `check-safety`, `add-doxygen`, `toolchain`
3. Open one and read through its structure — note the YAML frontmatter, context, and requirements

**Exercise 2 — Create a Safety Audit Prompt**

1. Create a new file: `.github/prompts/safety-audit.prompt.md`
2. Add the following content:

```yaml
---
mode: 'agent'
description: 'Audit firmware code for embedded safety violations'
tools: ['codebase', 'search', 'editFiles', 'changes']
---

# Embedded Safety Audit

## Objective
Analyze the ODrive firmware for common embedded safety violations.

## Check For
- Dynamic memory allocation in real-time paths (malloc, new, std::vector)
- Missing volatile on ISR-shared variables
- Blocking calls in interrupt handlers
- Unbounded loops in control loop functions
- Missing null pointer checks before dereference
- Integer overflow in fixed-point math or timer calculations
- Race conditions between ISR and main loop access to shared state
- Missing critical sections around multi-word variable access

## Output Format
For each violation found:
1. **Location**: File and line number
2. **Severity**: Critical / High / Medium / Low
3. **Description**: What the safety violation is
4. **Fix**: Suggested remediation with code changes

## Constraints
- Follow the project's coding standards from copilot-instructions.md
- Do not modify test files
- Respect ISR timing constraints — fixes must not increase ISR execution time
- Create a summary report at the end
```

3. Run the prompt and review the findings

**Exercise 3 — Create a Doxygen Documentation Prompt**

1. Create `.github/prompts/add-doxygen.prompt.md`:

```yaml
---
mode: 'agent'
description: 'Add Doxygen documentation to undocumented C++ classes and functions'
tools: ['codebase', 'search', 'editFiles']
---

# Add Doxygen Documentation

## Objective
Add comprehensive Doxygen documentation comments to undocumented public APIs.

## Requirements
- Use `/** ... */` style comments
- Include @brief, @param, @return, @note as appropriate
- Document units for physical quantities (amps, radians, RPM, etc.)
- Document thread safety (ISR-safe, requires critical section, etc.)
- Follow existing documentation style in the codebase

## Scope
Focus on the file(s) currently open in the editor. Do not modify files outside the current context.
```

2. Open `src-ODrive/Firmware/MotorControl/motor.hpp` and run the prompt

**Exercise 4 — Design Your Own Prompt** (Bonus)

Think about a repetitive task in embedded work. Create a prompt for it. Ideas:

- **`optimize-critical.prompt.md`** — analyze control loop code for performance improvements
- **`generate-tests.prompt.md`** — generate doctest unit tests for a module
- **`check-volatile.prompt.md`** — audit ISR-shared variables for missing volatile qualifiers

</details>

### Success Criteria

- ✅ You've explored the existing prompt files and understand their structure
- ✅ You've created `safety-audit.prompt.md` and run it successfully
- ✅ You understand the three ways to invoke a prompt file
- ✅ You understand that prompts are on-demand — unlike instructions which are always loaded

---

## 5. Agent Skills (25 min)

### Key Points

- Agent Skills are specialized instruction sets that Copilot auto-selects based on task relevance
- Stored in `.github/skills/<skill-name>/SKILL.md` (project) or `~/.copilot/skills/<skill-name>/SKILL.md` (personal)
- Unlike instructions (always loaded) and prompts (manually invoked), skills are **automatically loaded when Copilot determines they're relevant**
- Skills are an [open standard](https://github.com/agentskills/agentskills) — used by Copilot Coding Agent and Agent mode in VS Code

### Skills vs Instructions

| Aspect | Custom Instructions | Agent Skills |
|--------|-------------------|--------------|
| **Location** | `.github/copilot-instructions.md` | `.github/skills/*/SKILL.md` |
| **When loaded** | Always, every interaction | Only when relevant to the task |
| **Best for** | Simple, universal rules | Detailed, specialized procedures |
| **Can include** | Markdown text only | Markdown + scripts + resources |
| **Scope** | Project-wide or file-scoped | Project or personal |

**Rule of thumb**: Use instructions for "always true" rules (naming, no heap). Use skills for "when doing X, follow these steps" (when building firmware, when debugging CAN).

### ODrive Skills Architecture

The repo includes 9 specialized skills:

| Skill | Purpose |
|-------|---------|
| `odrive-toolchain` | Build firmware, run tests, search code, inspect errors |
| `can-protocol` | CAN bus communication — message formatting, DBC generation |
| `firmware-debugging` | STM32 debugging — OpenOCD/GDB, hard fault analysis, FreeRTOS inspection |
| `stm32-peripherals` | Timer/PWM, ADC, DMA, GPIO, CubeMX interpretation |
| `python-odrivetool` | odrivetool CLI, DFU firmware updates, test orchestration |
| `cpp-testing` | Test-driven development with doctest framework |
| `ada-cpp-migration` | Ada to Modern C++ migration patterns |
| `odrive-ops` | CI/CD, releases, and deployment operations |
| `foc-tuning` | Field-Oriented Control tuning and optimization |

---

### 🖥️ DEMO: Explore an Existing Skill

1. Open `.github/skills/can-protocol/SKILL.md`
2. Walk through the structure:
   - YAML frontmatter with `name` and `description`
   - Detailed step-by-step CAN message formatting rules
   - References to ODrive CAN protocol documentation
   - DBC file generation patterns
3. Show how Copilot auto-selects the skill — Open a new chat in Agent mode and enter:

```
I need to add a new CAN message for reporting motor temperature. The message ID should be 0x009 and include temperature in centi-degrees.
```

4. Show the skill being loaded — Copilot follows the CAN protocol patterns

**Talking point**: "You didn't invoke the skill — Copilot chose it because your prompt matched the skill's description. This is the key difference from prompt files."

---

### 🖥️ DEMO: Create a Skill from Scratch

1. Create the directory structure:

```bash
mkdir -p .github/skills/code-review-checklist
```

2. Create `.github/skills/code-review-checklist/SKILL.md`:

```yaml
---
name: code-review-checklist
description: Checklist for reviewing embedded C++ code.
  Use this when asked to review code, audit code quality, or check for
  safety and performance issues in firmware.
---

When reviewing embedded C++ code, follow this checklist:

1. **ISR Safety**
   - Verify all ISR-shared variables are `volatile` or use atomics
   - Check that ISR handlers have bounded execution time
   - Ensure no blocking calls (mutex locks, sleep, allocation) in ISR context
   - Verify critical sections protect multi-word shared data

2. **Memory Safety**
   - No dynamic allocation in real-time paths (no `new`, `malloc`, `std::vector`)
   - Check array bounds before access
   - Verify no use-after-free or dangling pointer scenarios
   - Confirm `std::array` or fixed-size buffers are used

3. **Error Handling**
   - Verify error codes (not exceptions) are used throughout
   - Check `[[nodiscard]]` on functions returning error codes
   - Ensure errors are logged but sensitive details are not leaked

4. **Performance**
   - Identify unnecessary copies (use `const&` for read-only parameters)
   - Check for blocking operations in the control loop
   - Look for unbounded loops or recursive calls

5. **Style**
   - Verify consistent naming conventions (camelCase, PascalCase, UPPER_SNAKE_CASE)
   - Check Doxygen documentation on public APIs
   - Confirm `#pragma once` in headers
```

3. Test auto-selection:

```
Review the encoder.cpp file for safety and performance issues
```

<details>
<summary><h3>🧪 Hands-On: Create an Agent Skill (12 min)</h3></summary>

**Exercise 1 — Create a Firmware Debugging Skill**

1. Create the directory structure:

```bash
mkdir -p .github/skills/firmware-debug-guide
```

2. Create `.github/skills/firmware-debug-guide/SKILL.md`:

```yaml
---
name: firmware-debug-guide
description: Guide for debugging ODrive firmware issues.
  Use this when asked to debug motor control problems, hard faults,
  encoder errors, or communication failures.
---

Follow this process when debugging firmware issues:

1. **Identify the symptom**
   - Motor not spinning: check axis state machine in `axis.cpp`
   - Hard fault: examine `CFSR`, `HFSR`, `BFAR` registers
   - Encoder errors: check calibration state in `encoder.cpp`
   - CAN timeout: verify baud rate and message IDs in communication layer

2. **Trace the control path**
   - Entry point: `Axis::run_control_loop()` in `axis.cpp`
   - Controller: `Controller::update()` in `controller.cpp`
   - Motor output: `Motor::update()` in `motor.cpp`
   - FOC: `FOCAlgorithm()` in `foc.cpp`

3. **Check common failure modes**
   - Uninitialized calibration values
   - Encoder rollover at 32-bit boundary
   - PWM timing conflicts between axes
   - Stack overflow in FreeRTOS tasks

4. **Verify the fix**
   - Check ISR safety of any changes
   - Ensure fix doesn't increase control loop execution time
   - Verify fix on both axis0 and axis1
```

**Exercise 2 — Test the Skill Auto-Selection**

1. Switch to **Agent** mode in Copilot Chat
2. Enter a prompt that should trigger the skill:

```
The motor on axis0 stutters during acceleration. Where should I look to debug this?
```

3. Watch Copilot work — it should follow the debugging steps from your skill

**Exercise 3 — Explore Existing Skills** (Bonus)

Browse the skills in `src-ODrive/.github/skills/` — open `odrive-toolchain/SKILL.md` and `stm32-peripherals/SKILL.md` to see how production skills are structured

</details>

### Success Criteria

- ✅ You've explored at least one existing skill and understand its structure
- ✅ You've created a skill and tested its auto-selection
- ✅ You understand the difference: instructions = always-on, skills = auto-selected, prompts = manually invoked

---

## 6. Custom Agents (Chat Modes) (25 min)

### Key Points

- Agents are persistent chat personas stored in `.github/agents/*.agent.md`
- They appear in the Copilot Chat mode picker alongside Ask, Agent, and Plan
- Each agent can specify its own model, tool set, and behavior
- Agents vs Prompts:

| Feature | Prompt Files | Custom Agents |
|---------|-------------|---------------|
| **Location** | `.github/prompts/` | `.github/agents/` |
| **Extension** | `.prompt.md` | `.agent.md` |
| **Invocation** | On-demand (Run button, `/name`) | Selected as active chat mode |
| **Persistence** | Single execution | Active for entire chat session |
| **Best for** | Specific tasks | Ongoing personas/workflows |

### ODrive Agent Architecture

The repo includes 6 specialized agents:

| Agent | Role | Tools |
|-------|------|-------|
| **ODrive Engineer** | Primary orchestrator — firmware, motor control, hardware | Read/write, terminal, search, skills |
| **ODrive Toolchain** | Build, compile, test, code navigation | Read/write, terminal |
| **ODrive Code Reviewer** | Code review — style, safety, embedded best practices | Read-only, search |
| **ODrive QA** | Quality assurance and testing | Read/write, terminal |
| **ODrive Ops** | CI/CD workflows, releases, deployments | Read/write, terminal |
| **Ada to C++ Migrator** | Specialized Ada → Modern C++ migration | Read/write, search |

---

### 🖥️ DEMO: Part A — Meet the ODrive Engineer Agent

1. Open `src-ODrive/.github/agents/ODrive-Engineer.agent.md`
2. Walk through the structure:
   - **Tools**: `vscode`, `execute`, `read`, `edit`, `search`, `web`, `agent`, `todo`
   - **Skills hierarchy**: Routes tasks to specialized skills based on domain
   - **Persona**: Primary development orchestrator for embedded firmware
3. Show the agent appearing in the Copilot Chat mode picker
4. Select **ODrive Engineer** and give it a task:

```
Add a method to the Motor class that returns the current motor temperature in degrees Celsius. Include proper Doxygen documentation and error handling.
```

5. Show the agent:
   - Reading existing code patterns in `motor.hpp` and `motor.cpp`
   - Following naming conventions from the instructions
   - Using error codes instead of exceptions
   - Adding Doxygen documentation

**Talking point**: "This agent knows it's working on embedded firmware. It follows naming conventions, avoids heap allocation, and uses error codes — all because of the persona and skills we've built."

---

### 🖥️ DEMO: Part B — Create a Code Reviewer Agent

Create `.github/agents/ODrive-Reviewer.agent.md`:

```yaml
---
tools: ['codebase', 'search', 'usages', 'problems']
description: Review ODrive firmware code for safety, performance, and embedded best practices
model: Claude Sonnet 4
---

You are a senior embedded systems code reviewer for the ODrive motor controller project.

When reviewing code:

1. **ISR Safety**: Check volatile correctness, atomics, critical sections, bounded ISR execution
2. **Memory Safety**: No dynamic allocation, bounds checking, no use-after-free
3. **Performance**: No blocking in control loop, minimize copies, bounded execution time
4. **Best Practices**: Error codes (not exceptions), Doxygen docs, naming conventions

Always provide:
- Severity level (Critical / Warning / Suggestion)
- Specific file and line references
- Concrete fix recommendations with code examples

Be direct and opinionated. Don't say "consider" — say "change this to..."
Focus on embedded-specific issues that static analyzers might miss.
```

1. Show the new agent appearing in the mode picker
2. Point out the differences from ODrive Engineer:
   - **Read-only tools** — `codebase`, `search`, `usages`, `problems` (no `editFiles`, no `runCommands`)
   - **Custom model** — explicitly sets `Claude Sonnet 4`
   - **Different persona** — reviewer, not builder

**Talking point**: "Same file format, completely different behavior. ODrive Engineer builds features. ODrive Reviewer only reads and reports. The tool list controls what an agent can do."

### Agent Progression Summary

| Agent | Tools | Model | Pattern |
|-------|-------|-------|---------|
| **ODrive Engineer** | Local read/write + skills | Default | Worker — builds features, orchestrates skills |
| **ODrive Reviewer** | Local read-only | Claude Sonnet 4 | Reviewer — analyzes, doesn't edit |
| **ODrive QA** | Local read/write | Default | Tester — generates tests, runs validation |

<details>
<summary><h3>🧪 Hands-On: Explore and Create Custom Agents (10 min)</h3></summary>

**Exercise 1 — Use the ODrive Engineer Agent**

1. Open the Copilot Chat mode picker (dropdown at the top)
2. Select **ODrive Engineer** from the list
3. Give it a task:

```
Add a watchdog timeout counter to the Axis class that increments when the control loop exceeds its deadline. Store the count in a uint32_t member variable.
```

4. Watch the agent work — it should follow embedded constraints and naming conventions

**Exercise 2 — Build a Code Reviewer Agent**

1. Create `.github/agents/ODrive-Reviewer.agent.md` with the content from the demo above
2. Check the mode picker — "ODrive Reviewer" should appear immediately

**Exercise 3 — Test Your Reviewer Agent**

1. Select **ODrive Reviewer** from the mode picker
2. Ask it to review specific firmware code:

```
Review the motor control loop in motor.cpp for safety and performance issues
```

3. Notice how the agent stays in character — every response follows the embedded review format
4. Ask a follow-up:

```
Now review the ISR safety of the encoder.cpp calibration sequence
```

**Exercise 4 — Create Your Own Agent** (Bonus)

**Option A: `ODrive-DocWriter.agent.md`**

```yaml
---
tools: ['codebase', 'search', 'editFiles']
description: Generate and maintain firmware documentation
model: Claude Sonnet 4
---

You are a technical writer specializing in embedded systems documentation.
Focus on Doxygen comments, architecture docs, and register descriptions.
Document units (amps, radians, RPM) and thread safety for all public APIs.
```

**Option B: `ODrive-TestEngineer.agent.md`**

```yaml
---
tools: ['codebase', 'search', 'editFiles', 'runCommands', 'problems']
description: Design and write embedded C++ tests using doctest
model: Claude Sonnet 4
---

You are a test engineer for embedded C++ firmware.
Use doctest framework. Test boundary conditions, error paths, and ISR interactions.
All test code must be statically allocated — no heap in test fixtures.
```

</details>

### Success Criteria

- ✅ You've used the ODrive Engineer agent to complete a task
- ✅ You've created the ODrive Reviewer agent and tested it with a review request
- ✅ You understand the progression: simple local agent → read-only agent → specialized agent
- ✅ You understand that agents persist for the entire chat session, unlike prompts

---

## 7. MCP Servers (30 min)

### Key Points

- MCP (Model Context Protocol) extends Copilot with external tools
- Configured in `.vscode/mcp.json` — part of the repo, shared with the team
- Two server types: **HTTP** (remote, OAuth-authenticated) and **stdio** (local, runs a process)
- For embedded projects, the **GitHub MCP** server is the most immediately useful — interact with issues, PRs, and repo data from chat

### MCP Configuration

Create or update `.vscode/mcp.json`:

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

| Server | Type | Auth | Requires |
|--------|------|------|----------|
| **GitHub** | HTTP (remote) | OAuth (automatic) | Nothing extra |

---

### 🖥️ DEMO: Verify MCP Servers

MCP servers auto-start when Copilot needs them — no manual launch required.

1. Open the Command Palette → `MCP: List servers`
2. Show the GitHub server listed
3. For **GitHub**: The first time Copilot calls a GitHub MCP tool, an OAuth authentication flow will open in your browser. Approve it once and it's cached.

> **Note**: If MCP servers don't appear or Copilot doesn't use them, verify the VS Code setting `chat.mcp.discovery.enabled` is set to `true` (Settings → search "MCP").

> **Important**: When Copilot calls an MCP tool for the first time, VS Code displays a **tool approval dialog**. Click the **dropdown arrow (▼)** next to "Allow" to see session-wide and workspace-wide approval options. **Recommended for this workshop**: Select **"Allow Tools from GitHub Without Review in this Session"**.

---

### 🖥️ DEMO: GitHub MCP — Managing Firmware Issues from Chat

1. Switch to Agent mode
2. Enter:

```
Check which issues are currently open in this repo
```

3. Show Copilot fetching issues via the GitHub API
4. Enter:

```
Create a GitHub Issue titled "Add motor temperature monitoring to CAN protocol" with a description that includes acceptance criteria: temperature reported in centi-degrees, message ID 0x009, update rate 10Hz
```

5. Show the issue being created with meaningful content

**Talking point**: "You just managed your firmware project's issues without leaving VS Code. For embedded teams that track hardware bugs, protocol changes, and calibration tasks in GitHub Issues, this keeps you in flow."

---

### 🖥️ DEMO: Using GitHub MCP for Code Context

1. Enter:

```
Look at the recent pull requests in this repo and summarize what firmware changes have been made recently
```

2. Show Copilot fetching PR data and providing a summary
3. Enter:

```
Create an issue for each of the top 3 TODO comments found in the MotorControl directory, with appropriate labels
```

4. Show Copilot scanning code and creating actionable issues

<details>
<summary><h3>🧪 Hands-On: MCP Servers — GitHub Integration (15 min)</h3></summary>

**Exercise 1 — Verify MCP Server Configuration**

1. Open or create `.vscode/mcp.json` and confirm the `github` server is defined
2. Verify the VS Code setting: Open Settings (`Ctrl+,`) → search for `chat.mcp.discovery.enabled` → ensure it's checked (true)

**Exercise 2 — Explore Issues from Chat**

1. Switch to **Agent** mode in Copilot Chat
2. Ask Copilot to explore your repo:

```
Check which issues are currently open in this repo
```

3. Watch Copilot fetch issues via the GitHub API

**Exercise 3 — Create Issues from Chat**

1. Create an issue directly from chat:

```
Create a GitHub Issue titled "Add Doxygen documentation to Motor class" with a description that lists all undocumented public methods in motor.hpp
```

2. Verify the issue was created by checking in your browser or asking: `Show me the issue you just created`

**Exercise 4 — Combine Code Analysis with GitHub** (Bonus)

```
Scan the MotorControl directory for any TODO or FIXME comments. For each one found, create a GitHub Issue with the comment text, file location, and a suggested priority label.
```

</details>

### Success Criteria

- ✅ GitHub MCP server is configured in `.vscode/mcp.json` and auto-starts when needed
- ✅ You've used GitHub MCP to list or create issues from Copilot Chat
- ✅ You understand that MCP connects Copilot to the real world beyond just code files

---

## 8. GitHub Copilot CLI: The Agentic Terminal (30 min)

### Key Points

- The standalone **`copilot` CLI** is a full AI agent in your terminal — interactive sessions with tool approvals, file editing, command execution, and plan mode
- It supports the **same customization files** from Sections 3–6: instructions, agents, skills, and MCP servers — everything transfers from VS Code
- `/delegate` bridges the CLI to the Coding Agent (Section 9) — start work locally, hand it off to the cloud mid-session
- Session persistence with `--resume`/`--continue` means you can pick up right where you left off

### What the GitHub Copilot CLI Can Do

| Capability | How It Works |
|------------|-------------|
| Interactive agentic sessions | `copilot` — full TUI with tool approval, file editing, command execution |
| Plan mode | Shift+Tab — structured implementation plans before code |
| File context | `@path/to/file` — include specific files directly in prompts |
| Delegate to Coding Agent | `/delegate` or `&` prefix — hand off current work to GitHub cloud |
| Session resume | `--resume` / `--continue` — pick up where you left off |
| Custom agents | `/agent` — use agents from `.github/agents/` (same files from Section 6) |
| MCP servers | `/mcp add` — GitHub MCP built-in, add more on the fly |
| Code review | `/review` — analyze changes before committing |
| Programmatic mode | `copilot -p "prompt" --allow-tool 'shell(git)'` — scriptable, headless |

### GitHub Copilot CLI vs VS Code Agent Mode

| Feature | VS Code Agent Mode | GitHub Copilot CLI |
|---------|-------------------|-------------|
| **Where** | IDE sidebar/editor | Terminal (any terminal) |
| **Plan mode** | Chat mode picker | Shift+Tab toggle |
| **Tool approval** | Accept/Reject in chat | Interactive TUI (Yes / Yes for session / No) |
| **Custom instructions** | `.github/copilot-instructions.md` | Same file — shared |
| **Custom agents** | `.github/agents/*.agent.md` | Same files — shared |
| **MCP servers** | `.vscode/mcp.json` | `/mcp add` + `~/.copilot/mcp-config.json` |
| **Delegate to cloud** | Not available | `/delegate` or `&` — hands off to Coding Agent |
| **Best for** | Visual coding, multi-file edits | Terminal-native devs, CI scripting, quick tasks |

---

### 🖥️ DEMO: The Agentic Terminal

#### Part A: Launch and Explore (3 min)

1. Open a **standalone terminal** (not VS Code's integrated terminal):
   - **Windows**: Open **Windows Terminal** (`Win+X` → Terminal) or **PowerShell**
   - **macOS**: Open **Terminal.app** or **iTerm2**
2. Navigate to the project root:

```bash
cd path/to/ODrive-Custom/src-ODrive
```

3. Launch the interactive session:

```bash
copilot
```

4. Show the **trusted directory TUI prompt** — approve the project directory
5. Enter a natural language question:

```
Explain the motor control architecture — trace the path from the main FreeRTOS task through the control loop to PWM output
```

6. Show Copilot reading files, understanding the embedded architecture
7. Toggle into **plan mode** with Shift+Tab and enter:

```
Plan how to add a motor temperature safety shutdown feature that disables the motor if temperature exceeds a configurable threshold
```

8. Show the structured plan output

**Talking point**: "This is the same Copilot agent you used in VS Code — but in your terminal. Plan mode, file editing, tool approval, custom agents. If you live in the terminal, you don't have to leave."

#### Part B: Build a Feature Live (4 min)

1. Switch back to ask/execute mode (Shift+Tab)
2. Enter:

```
Add a getUptime() method to the Axis class that returns the total time in seconds since the axis was last armed. Use a uint32_t counter incremented in the control loop. Follow the patterns in @Firmware/MotorControl/axis.hpp
```

3. Show the **tool approval TUI** — approve "Yes for session"
4. Show it creating the method, following existing patterns

#### Part C: /delegate — Hand Off to the Cloud (3 min)

1. Enter:

```
/delegate Add unit tests for the new getUptime method and create a PR
```

2. Show Copilot committing changes and creating a Coding Agent session
3. Show the URL to the PR and agent session on GitHub

**Talking point**: "We started work locally in the terminal and handed it off to the cloud. Perfect bridge to Section 9."

#### Part D: Bonus Capabilities Quick-Fire (2 min)

1. `/review` — inline code review of recent changes
2. `/context` — token usage breakdown
3. `/agent` — available agents (including ODrive Engineer, ODrive Reviewer, etc.)
4. `!git status` — shell escape without a model call
5. `/usage` — session statistics

<details>
<summary><h3>🧪 Hands-On: Try the GitHub Copilot CLI (15 min)</h3></summary>

**Exercise 1 — Launch and Explore**:

1. Open a standalone terminal and navigate to the project:

```bash
cd path/to/ODrive-Custom/src-ODrive
```

2. Launch:

```bash
copilot
```

3. Approve the trusted directory
4. Ask a question:

```
What communication protocols does this firmware support? List the handler files for each.
```

**Exercise 2 — File Context with `@`**:

```
Explain what @Firmware/MotorControl/foc.cpp does and describe the FOC algorithm steps
```

**Exercise 3 — Plan Mode**:

1. Press Shift+Tab to enter plan mode
2. Enter:

```
Plan how to add a new CAN message for reporting motor diagnostics — fault count, total runtime, and max temperature
```

3. Review the plan, then press Shift+Tab to return to execute mode

**Exercise 4 — Build Something**:

```
Add a static method Motor::getInstanceCount() that returns the number of Motor instances created. Use a static uint8_t counter. Follow patterns in @Firmware/MotorControl/motor.hpp
```

**Exercise 5 — Explore Slash Commands** (Bonus):

```
/agent
```

View available agents

```
/review
```

Review recent changes

```
!git log --oneline -5
```

Shell escape

</details>

### Success Criteria

- ✅ You've launched `copilot` and approved the trusted directory prompt
- ✅ You've asked a codebase-aware question about the firmware architecture
- ✅ You've used `@path/to/file` to include file context in a prompt
- ✅ You've toggled into plan mode with Shift+Tab
- ✅ You've used at least one slash command (`/review`, `/context`, `/agent`, or `/usage`)
- ✅ You understand how `/delegate` bridges local CLI work to the cloud Coding Agent

### Discussion Points

- How does the `copilot` CLI compare to Agent mode in VS Code for embedded work?
- The CLI reads the same custom instructions, agents, and skills. How does one config across IDE + terminal benefit your team?
- What security policies would your org need around `--allow-all-tools` vs. per-tool approval?

---

## 9. Cloud Agents: Coding Agent + PR Review Agent (20 min)

### Key Points

- Cloud agents operate at the platform level — they run on GitHub, not in your IDE
- Two key cloud agents:
  - **Coding Agent**: Assign a GitHub Issue to Copilot → it codes autonomously and creates a PR
  - **PR Review Agent (Copilot Code Review)**: Request Copilot as a reviewer on a PR → it provides AI-powered code review comments

### Part A: Copilot Coding Agent (10 min)

**Concept**:

- Assign any GitHub Issue to Copilot — it creates a branch, implements the solution, and opens a PR
- Works asynchronously — takes ~5-30 minutes depending on complexity
- Requires: Branch protection rule on `main` (PR required, at least 1 reviewer)

### Your Customization Files Work in the Cloud Too

Coding Agent reads ALL of your customization files — everything you've built throughout this workshop:

| File | Purpose | Used By |
|------|---------|---------|
| `.github/copilot-instructions.md` | Embedded coding standards, safety rules | IDE Agent + Coding Agent |
| `.github/skills/*/SKILL.md` | Specialized procedures (auto-selected) | IDE Agent + Coding Agent |

**Key insight**: Everything you built today — instructions, skills, agents — Coding Agent uses all of it. Your team's embedded safety standards apply even when AI codes autonomously.

---

### 🖥️ DEMO: Assign an Issue to Coding Agent

1. Open the GitHub repo in the browser
2. Create a new issue:
   - Title: `Add motor temperature reporting to CAN protocol`
   - Description: `Add a CAN message (ID 0x009) that reports motor temperature in centi-degrees Celsius. Update the CAN protocol handler in Firmware/communication/ to send this message at 10Hz. Follow existing CAN message patterns.`
3. Click **Assignees** → type and select **Copilot**
4. Show the Coding Agent session starting
5. Explain what happens next:
   - Copilot creates a feature branch
   - Reads the codebase — instructions, skills, existing CAN patterns
   - Implements the solution following embedded constraints
   - Opens a PR with a description of changes

**Talking point**: "Copilot will read your instructions, your skills — everything we've set up today — and write firmware code that follows your embedded constraints. No heap allocation, proper volatile usage, CAN protocol patterns."

### Part B: Copilot Code Review / PR Review Agent (10 min)

**Concept**:

- Add Copilot as a reviewer on any PR — it provides AI-powered code review
- Especially valuable for embedded code: catches ISR safety issues, volatile misuse, memory leaks
- Complementary to human review, not a replacement

---

### 🖥️ DEMO: Request Copilot Review on a PR

1. Open a PR in the repo
2. Click **Reviewers** → Add **Copilot** as a reviewer
3. Wait for the review to appear (typically 1-3 minutes)
4. Walk through the review comments:
   - Show inline code suggestions with diffs
   - Show severity indicators
   - Show embedded-specific catches (volatile, ISR safety, bounds checking)
5. Compare with human review — Copilot catches pattern-based issues; humans catch intent and domain logic

**Talking point**: "For embedded code, Copilot is especially good at catching volatile misuse, unbounded loops in ISR context, and missing null checks. These are exactly the bugs that are hardest to find in production firmware."

### Key Differences: Agent Mode vs Coding Agent

| Aspect | Agent Mode (IDE) | Coding Agent (Cloud) |
|--------|-----------------|---------------------|
| **Where** | Your IDE | GitHub servers |
| **How** | Interactive chat | Assign a GitHub Issue |
| **Sync** | Real-time, interactive | Async, autonomous |
| **Duration** | Minutes (you're watching) | 5-30 min (you're doing other work) |
| **Output** | File changes in your workspace | A Pull Request |
| **Best for** | Iterative work, exploration | Well-defined tasks, delegation |

### Discussion Points

- When would you use Coding Agent vs Agent Mode for firmware tasks?
- How does this change your team's issue workflow?
- What guardrails would you put in place? (Branch protection, required human review, hardware testing before merge)

---

## 10. Wrap-Up, Customization Hierarchy Recap & Q&A (10 min)

### The Full Customization Stack

You've now built every layer:

```
┌────────────────────────────────────────────────────────────┐
│                    CLOUD AGENTS                            │
│  Coding Agent (async PRs) + PR Review Agent (code review) │
└────────────────────────────────┬───────────────────────────┘
                                 │
┌────────────────────────────────▼───────────────────────────┐
│                    MCP SERVERS                              │
│  GitHub (issues, PRs, repo data)                           │
└────────────────────────────────┬───────────────────────────┘
                                 │
┌────────────────────────────────▼───────────────────────────┐
│                    AGENT SKILLS                             │
│  .github/skills/*/SKILL.md — auto-selected by relevance    │
│  (toolchain, CAN, debugging, STM32, testing, FOC tuning)   │
└────────────────────────────────┬───────────────────────────┘
                                 │
┌────────────────────────────────▼───────────────────────────┐
│                CUSTOM AGENTS (CHAT MODES)                   │
│  .github/agents/*.agent.md — persistent personas           │
│  (Engineer, Reviewer, QA, Toolchain, Ops, Migrator)        │
└────────────────────────────────┬───────────────────────────┘
                                 │
┌────────────────────────────────▼───────────────────────────┐
│                  CUSTOM PROMPT FILES                        │
│  .github/prompts/*.prompt.md — reusable task templates     │
│  (safety-audit, debug-firmware, review-code, add-doxygen)  │
└────────────────────────────────┬───────────────────────────┘
                                 │
┌────────────────────────────────▼───────────────────────────┐
│                  CUSTOM INSTRUCTIONS                        │
│  .github/copilot-instructions.md — always-on context       │
│  .github/instructions/*.instructions.md — scoped rules     │
│  (C++ standards, Python standards, embedded constraints)    │
└────────────────────────────────┬───────────────────────────┘
                                 │
┌────────────────────────────────▼───────────────────────────┐
│                      CHAT MODES                              │
│  Ask (explore) → Plan (design) → Agent (build)             │
└────────────────────────────────────────────────────────────┘

  GitHub Copilot CLI (§8) — Agentic terminal: TUI, plan mode, /delegate
```

### Key Takeaways

1. **Modes are your foundation** — Ask for understanding firmware, Plan for designing features, Agent for building
2. **Custom Instructions encode embedded constraints** — no heap, no exceptions, volatile correctness, ISR safety
3. **Prompt Files create consistency** — reusable templates for safety audits, debugging, documentation
4. **Agents are persistent personas** — ODrive Engineer builds, ODrive Reviewer catches bugs, ODrive QA tests
5. **Skills are auto-selected** — CAN protocol, firmware debugging, STM32 peripherals — loaded when relevant
6. **MCP extends Copilot's reach** — manage GitHub issues and PRs without leaving your editor
7. **Cloud agents close the loop** — from issue to PR to code review, all AI-assisted

### What You Built Today

| File | Section |
|------|---------|
| `.github/copilot-instructions.md` | §3 — Custom Instructions |
| `.github/instructions/cpp_coding_standards.instructions.md` | §3 — Scoped Instructions |
| `.github/prompts/safety-audit.prompt.md` | §4 — Custom Prompt Files |
| `.github/skills/code-review-checklist/SKILL.md` or `firmware-debug-guide/SKILL.md` | §5 — Agent Skills |
| `.github/agents/ODrive-Reviewer.agent.md` | §6 — Custom Agents |
| `.vscode/mcp.json` (GitHub MCP) | §7 — MCP Servers |
| GitHub Copilot CLI agentic terminal session | §8 — GitHub Copilot CLI |

### Resources

| Resource | URL |
|----------|-----|
| GitHub Copilot Docs | <https://docs.github.com/en/copilot> |
| Copilot in the CLI | <https://docs.github.com/en/copilot/github-copilot-in-the-cli> |
| Custom Instructions | <https://docs.github.com/en/copilot/how-tos/configure-custom-instructions> |
| Prompt Files | <https://docs.github.com/en/copilot/how-tos/copilot-prompts> |
| Agent Skills | <https://docs.github.com/en/copilot/concepts/agents/about-agent-skills> |
| MCP Servers | <https://docs.github.com/en/copilot/how-tos/using-extensions/using-mcp-in-copilot> |
| Copilot Coding Agent | <https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent> |
| Copilot Code Review | <https://docs.github.com/en/copilot/using-github-copilot/code-review> |
| Copilot Trust Center | <https://resources.github.com/copilot-trust-center/> |
| ODrive Documentation | <https://docs.odriverobotics.com/> |
| Workshop Repo | <https://github.com/thomasiverson/ODrive-Custom> |
| Community Skills | <https://github.com/github/awesome-copilot> |

### Q&A Topics to Prepare For

- How do instructions/prompts/skills propagate across forks?
- Can we restrict which MCP servers developers use?
- How do we measure ROI on Copilot customization for embedded projects?
- Does Coding Agent respect branch protection rules?
- How do skills interact with custom instructions? (Both loaded? Priority?)
- Is Copilot safe for safety-critical code? (Answer: AI-assisted, human-verified — same review standards apply)

---

## Post-Workshop Actions

- [ ] Commit and push all customization files you created today (instructions, prompts, agents, skills)
- [ ] Review the Coding Agent PR when it completes
- [ ] Share the `.github/` customization files with your team
- [ ] Identify 3-5 internal frameworks, HAL patterns, or hardware constraints to encode as custom instructions
- [ ] Create 2-3 prompt files for your most common repetitive firmware tasks
- [ ] Build an Agent Skill for your team's most specialized workflow (protocol, debugging, testing)
- [ ] Enable Copilot Code Review on your repositories
- [ ] Schedule a follow-up session to share learnings and iterate on customizations

---

## Appendix: Quick Reference

### Customization File Locations

| Type | Path | Extension | Auto-loaded? |
|------|------|-----------|--------------|
| Project instructions | `.github/copilot-instructions.md` | `.md` | Yes — always |
| Scoped instructions | `.github/instructions/` | `.instructions.md` | Yes — when matching files active |
| Prompt files | `.github/prompts/` | `.prompt.md` | No — invoked manually |
| Agents / Chat modes | `.github/agents/` | `.agent.md` | No — selected in mode picker |
| Project skills | `.github/skills/*/` | `SKILL.md` | Yes — auto-selected by relevance |
| Personal skills | `~/.copilot/skills/*/` | `SKILL.md` | Yes — auto-selected by relevance |
| MCP config | `.vscode/mcp.json` | `.json` | Auto-started when needed |

### Prompt File Frontmatter Reference

```yaml
---
mode: 'agent'              # 'ask', 'agent', or 'plan'
description: 'Text'        # Shown in the prompt picker
tools: ['tool1', 'tool2']  # Available tools for agent mode
---
```

**Common tools**: `changes`, `codebase`, `editFiles`, `fetch`, `findTestFiles`, `githubRepo`, `problems`, `runCommands`, `runTasks`, `search`, `terminalLastCommand`, `testFailure`, `usages`

### Agent File Frontmatter Reference

```yaml
---
tools: ['tool1', 'tool2']     # Available tools
description: 'Text'           # Shown in mode picker
model: 'Claude Sonnet 4.5'    # Model to use (optional)
---
```

### Skill File Frontmatter Reference

```yaml
---
name: skill-name              # Lowercase, hyphens for spaces
description: 'When to use'    # Copilot matches this to prompts
license: 'MIT'                # Optional
---
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Copilot not active | Check extension is installed and signed in |
| MCP server won't start | Check `MCP: List servers` for status, verify `chat.mcp.discovery.enabled` is `true` |
| GitHub MCP auth error | Re-authenticate via OAuth, or use PAT with correct scopes |
| Agent mode not available | Update VS Code and Copilot extension to latest |
| Skills not loading | Verify `SKILL.md` filename (case-sensitive), check description matches prompt |
| Custom instructions ignored | Verify file is in `.github/` root, check for syntax errors |
| `copilot` CLI not available | Install the standalone GitHub Copilot CLI — see <https://docs.github.com/en/copilot/github-copilot-in-the-cli> |
| C++ IntelliSense not working | Install the C/C++ Extension Pack, configure `c_cpp_properties.json` |

### Relationship to Existing Lessons

This workshop synthesizes the lesson modules available in the `lessons/` directory. For deeper dives on individual topics:

| Workshop Section | Related Lesson |
|-----------------|----------------|
| §2 Chat Modes | [Lesson 02 — Basic Features](../lessons/02-basic%20features/readme.md) |
| §3 Custom Instructions | [Lesson 03 — Planning & Steering](../lessons/03-planning/readme.md) |
| §4 Prompt Files | [Lesson 03 — Planning & Steering](../lessons/03-planning/readme.md) |
| §5 Agent Skills | [Lesson 04 — Agentic Patterns](../lessons/04-agentic-patterns/readme.md) |
| §6 Custom Agents | [Lesson 04 — Agentic Patterns](../lessons/04-agentic-patterns/readme.md) |
| §7 MCP Servers | [Lesson 03 — Planning & Steering](../lessons/03-planning/readme.md) |
| §8 Copilot CLI | [Lesson 07 — Copilot CLI](../lessons/07-copilot-cli/readme.md) |
| §9 Cloud Agents | [Lesson 08 — Parallel Agents](../lessons/08-parallel-agents/readme.md) |
| — (C++ patterns) | [Lesson 05 — Best Practices](../lessons/05-best-practices/readme.md) |
| — (Debugging) | [Lesson 06 — Debugging](../lessons/06-debugging/readme.md) |

---

*Workshop guide for GitHub Copilot: Zero to Agents — ODrive Embedded C++ Edition*
*Workshop repo: [thomasiverson/ODrive-Custom](https://github.com/thomasiverson/ODrive-Custom)*
