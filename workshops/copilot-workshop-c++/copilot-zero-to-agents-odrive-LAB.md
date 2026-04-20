# GitHub Copilot: Zero to Agents — ODrive Embedded C++ Edition — Hands-On Lab Guide

**Duration**: ~90 minutes of hands-on exercises (across a ~4-hour workshop)
**Format**: Step-by-step lab exercises
**Audience**: Embedded C++ developers with basic Copilot exposure (completions/chat)
**Repo**: [thomasiverson/ODrive-Custom](https://github.com/thomasiverson/ODrive-Custom) (ODrive motor controller firmware)

---

## Lab Overview

This lab guide contains all the hands-on exercises from the **GitHub Copilot: Zero to Agents — ODrive Embedded C++ Edition** workshop. Each lab maps to a workshop section and builds on the previous one. Complete them in order.

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | With Copilot Pro, Business, or Enterprise license |
| **VS Code** | Latest stable (or Insiders for preview features) |
| **Copilot Extension** | GitHub Copilot + GitHub Copilot Chat extensions installed |
| **C/C++ Extension Pack** | For IntelliSense, syntax highlighting, and debugging |
| **Git** | For cloning the demo repository |
| **GitHub Copilot CLI** | Install from <https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli> — required for Lab 8 |

> **Note**: You do NOT need the ARM cross-compiler or hardware to complete the exercises. All exercises focus on code analysis, generation, and review — not compilation or flashing.

---

<details>
<summary><h2>Lab 1: Environment Setup (10 min)</h2></summary>

> **Workshop Section**: 1 — Welcome, Objectives & Environment Setup

### Steps

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
- Browse `src-ODrive/.github/` — agents, skills, instructions, and prompts

> **Note**: No ARM toolchain or hardware required. All exercises focus on code analysis, generation, and review.

### Success Criteria

- ✅ Repository is forked and cloned locally
- ✅ Project is open in VS Code
- ✅ Copilot extension is active
- ✅ You can navigate to `src-ODrive/Firmware/MotorControl/motor.cpp`

</details>

---

<details>
<summary><h2>Lab 2: Try All Three Chat Modes (8 min)</h2></summary>

> **Workshop Section**: 2 — Copilot Chat Modes: Ask, Agent, Plan

### Mode Reference

| Mode | Best For | Output |
|------|----------|--------|
| **Ask** | Exploring, learning, understanding code | Text explanations, code snippets in chat |
| **Agent** | Building features, editing code, running commands | Creates/edits files (single or multi-file), runs commands |
| **Plan** | Analyzing, planning, proposing changes | Implementation plans and proposals (no file changes) |

### Steps

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

### Success Criteria

- ✅ You can switch between Ask, Agent, and Plan modes
- ✅ You've received a codebase-aware answer from Ask mode about motor control architecture
- ✅ You've seen Plan mode propose changes without modifying files
- ✅ Agent mode has edited a file directly

</details>

---

<details>
<summary><h2>Lab 3: Create Custom Instructions (12 min)</h2></summary>

> **Workshop Section**: 3 — Custom Instructions

### Why This Matters

Custom instructions are the **simplest and highest-impact** way to personalize Copilot. They're loaded into every Copilot interaction automatically — think of them as "tribal knowledge" that Copilot always has access to. Without them, Copilot uses generic best practices. With them, it follows YOUR team's embedded standards.

### Reference: Customization Hierarchy

| Layer | File Location | When Loaded |
|-------|---------------|-------------|
| **Custom Instructions** | `.github/copilot-instructions.md` | Always (every interaction) |
| **Scoped Instructions** | `.github/instructions/*.instructions.md` | When matching files are active |

### What Makes Good Instructions?

| ✅ Good Candidates | ✗ Bad Candidates |
|-----------------|----------------|
| Naming conventions (camelCase for vars, PascalCase for types) | Entire API documentation |
| Embedded constraints (no heap, no exceptions) | Step-by-step tutorials |
| ISR safety rules (volatile, atomics, critical sections) | Complete code examples |
| Hardware register patterns | Business logic rules |
| Build system references | Long prose explanations |

> **Note**: Keep instructions concise. They're loaded on every interaction and consume context window space. Think bullet points, not paragraphs.

### Steps

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
3. Watch Copilot analyze the entire repo — it will scan the architecture, dependencies, build config, and conventions
4. Review the generated content. It should reference:
   - ODrive firmware, STM32, FreeRTOS
   - C++ coding standards (naming, no heap, no exceptions)
   - Build system (Tup/Make, ARM GCC)
   - Communication protocols (CAN, USB, UART)
5. Save the file to `.github/copilot-instructions.md`

**Step 3: Create Scoped C++ Instructions**

Scoped instructions activate only when you're editing files that match a glob pattern. This lets you give Copilot different guidance for different parts of the codebase.

1. Create the directory: `.github/instructions/`
2. Create the file `.github/instructions/cpp_coding_standards.instructions.md` with the following content:

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

**Step 3b: Test Scoped Instructions**

1. Open `src-ODrive/Firmware/MotorControl/motor.cpp`
2. In Copilot Chat (**Ask** mode), enter:

```
How should I add a new method to the Motor class?
```

3. Notice how the scoped instructions influence the response — Copilot should now reference naming conventions, no-heap constraints, and error code patterns

**Step 4: Test the Difference (After Instructions)**

1. Compare the response to your baseline from Step 1. You should notice:
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

### Success Criteria

- ✅ `.github/copilot-instructions.md` exists in your repo
- ✅ `.github/instructions/cpp_coding_standards.instructions.md` exists with `applyTo` for C/C++ files
- ✅ You've compared Copilot's responses before and after adding instructions and noticed the difference
- ✅ You understand that instructions are always-on background context

</details>

---

<details>
<summary><h2>Lab 4: Create and Run Prompt Files (12 min)</h2></summary>

> **Workshop Section**: 4 — Custom Prompt Files

### Why This Matters

Prompt files are **reusable task templates** that encode complex workflows into a single file. Instead of explaining the same task to Copilot every time, you write it once and anyone on the team can run it. Think of them as "recipes" — a junior developer can run a senior developer's safety audit prompt and get senior-quality output.

### Reference: Prompt File Structure

```yaml
---
mode: 'agent'                    # Which mode to use (ask, agent, plan)
description: 'Description here'  # Shows in the prompt picker
tools: ['changes', 'codebase',   # Which tools the agent can use
  'editFiles', 'runCommands',
  'search', 'terminalLastCommand']
---

# Prompt content goes here (Markdown)
```

### How to Run a Prompt

There are three ways to run a prompt file:

1. **Run button**: Open the `.prompt.md` file → click the ▶️ **Run** button at the top
2. **Command Palette**: `Ctrl+Shift+P` → type "Prompts: Run Prompt" → select from the list
3. **Chat shortcut**: Type `/` in Copilot Chat and select the prompt name

### Steps

**Exercise 1 — Explore the Existing Prompts**

Before creating your own, look at what's already in the repo:

1. Open `src-ODrive/.github/prompts/` in the file explorer
2. Open `review-code.prompt.md` and read through it:
   - Notice the YAML frontmatter — `mode: 'agent'` with a tool list
   - Notice the embedded-specific review criteria (ISR safety, volatile correctness, no heap)
   - Notice the structured output format with severity levels
3. Open `debug-firmware.prompt.md` and compare:
   - This one structures a firmware debugging session
   - References OpenOCD/GDB debugging patterns and fault register analysis
4. Key takeaway: **Prompts can control not just what Copilot does, but how it thinks**

**Exercise 2 — Run an Existing Prompt**

1. Open `src-ODrive/.github/prompts/review-code.prompt.md`
2. Click the ▶️ **Run** button at the top of the file
3. Watch Agent mode activate and observe Copilot:
   - Reading firmware files to understand code patterns
   - Checking for embedded safety violations, style issues, and best practices
   - Generating a structured code review
4. Let it run for a couple minutes — you can stop it early if needed

**Exercise 3 — Create Your Own Prompt: Safety Audit**

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

**Exercise 4 — Design Your Own Prompt** (Bonus)

Think about a repetitive task in embedded work. Create a prompt for it. Ideas:

- **`optimize-critical.prompt.md`** — analyze control loop code for performance improvements
- **`generate-tests.prompt.md`** — generate doctest unit tests for a module
- **`check-volatile.prompt.md`** — audit ISR-shared variables for missing volatile qualifiers

Key tips for writing good prompts:

- Be specific about what "done" looks like (success criteria)
- Tell Copilot what NOT to do (constraints)
- Reference existing files as patterns to follow
- Choose the right `mode` — use `agent` for tasks that need to create/edit files, `ask` for analysis-only

### Success Criteria

- ✅ You've explored the existing prompt files and understand their structure
- ✅ You've run a prompt and watched Copilot execute a multi-step task
- ✅ You've created `safety-audit.prompt.md` and run it successfully
- ✅ You understand the three ways to invoke a prompt file

</details>

---

<details>
<summary><h2>Lab 5: Create an Agent Skill (12 min)</h2></summary>

> **Workshop Section**: 5 — Agent Skills

### Why This Matters

Agent Skills are the **smartest** customization layer — Copilot automatically loads them when it determines they're relevant to your prompt. You don't invoke them; Copilot chooses them. This makes skills ideal for detailed, specialized procedures that would be too verbose for always-on instructions.

Skills are also an [open standard](https://github.com/agentskills/agentskills) used by Copilot Coding Agent, GitHub Copilot CLI, and Agent mode in VS Code.

### Reference: Skills vs Instructions vs Prompts

| Aspect | Custom Instructions | Agent Skills | Prompt Files |
|--------|-------------------|--------------|-------------|
| **Location** | `.github/copilot-instructions.md` | `.github/skills/*/SKILL.md` | `.github/prompts/*.prompt.md` |
| **When loaded** | Always, every interaction | Auto-selected by relevance | Manually invoked |
| **Best for** | Simple, universal rules | Detailed, specialized procedures | Specific task templates |
| **Can include** | Markdown text only | Markdown + scripts + resource files | Markdown with YAML frontmatter |

**Rule of thumb**: Instructions = "always true" rules. Skills = "when doing X, follow these detailed steps." Prompts = "do this specific task now."

### Skill File Structure

```
.github/skills/
└── code-review-checklist/
    └── SKILL.md              # Required — instructions + frontmatter
```

### Steps

**Exercise 1 — Create a Code Review Checklist Skill**

1. Create the directory structure:

```bash
mkdir -p .github/skills/code-review-checklist
```

2. Create `.github/skills/code-review-checklist/SKILL.md` with the following content:

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

**Exercise 2 — Test the Skill Auto-Selection**

The key difference between skills and prompts is that **you don't invoke skills manually** — Copilot selects them based on your prompt matching the skill's `description` field.

1. Switch to **Agent** mode in Copilot Chat
2. Enter a prompt that should trigger the skill:

```
Review the encoder.cpp file for safety and performance issues
```

3. Watch Copilot work — it should follow the checklist steps from your skill

**Exercise 3 — Create a Firmware Debugging Skill**

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

**Exercise 4 — Test the Debugging Skill**

1. In **Agent** mode, enter a prompt that should trigger the skill:

```
The motor on axis0 stutters during acceleration. Where should I look to debug this?
```

2. Watch Copilot work — it should follow the debugging steps from your skill

**Exercise 5 — Explore Existing Skills** (Bonus)

Browse the skills in `src-ODrive/.github/skills/` — open `odrive-toolchain/SKILL.md` and `odrive-ops/SKILL.md` to see how production skills are structured.

### Personal Skills

You can also create **personal skills** that apply across all your repos:

- Location: `~/.copilot/skills/*/SKILL.md` (where `~` is your OS home directory — e.g., `C:\Users\<username>` on Windows, `/Users/<username>` on macOS)
- These are private to your machine — not shared via git
- Great for personal coding preferences or tools only you use

### Success Criteria

- ✅ You've created `.github/skills/code-review-checklist/SKILL.md` with a complete checklist
- ✅ You've tested the skill by asking Copilot to review firmware code and observed it following your checklist
- ✅ You understand the difference: instructions = always-on, skills = auto-selected, prompts = manually invoked

</details>

---

<details>
<summary><h2>Lab 6: Create a Custom Agent (10 min)</h2></summary>

> **Workshop Section**: 6 — Custom Agents (Chat Modes)

### Why This Matters

Custom agents are **persistent personas** that stay active for an entire chat session. While a prompt file runs once and gives you a result, an agent changes how Copilot behaves for every message you send. Think of agents as hiring a specialist — once selected, every interaction is filtered through that specialist's expertise and toolset.

In this lab you'll work with the existing ODrive agents and create a new one:

| Agent | Type | Tools | Purpose |
|-------|------|-------|---------|
| **ODrive Engineer** (existing) | Full worker | Read/write, terminal, search, skills | Firmware development orchestrator |
| **ODrive Reviewer** (you'll create) | Read-only | Codebase, search, usages, problems | Reviews code without editing |

### Reference: Agents vs Prompts

| Feature | Prompt Files | Custom Agents |
|---------|-------------|---------------|
| **Location** | `.github/prompts/` | `.github/agents/` |
| **Extension** | `.prompt.md` | `.agent.md` |
| **Invocation** | On-demand (Run button, `/name`) | Selected as active chat mode |
| **Persistence** | Single execution | Active for entire chat session |
| **Best for** | Specific tasks | Ongoing personas/workflows |

### Agent Frontmatter Reference

```yaml
---
tools: ['codebase', 'search']     # Which tools the agent can use
description: 'What this agent does' # Shows in the mode picker dropdown
model: Claude Sonnet 4              # Optional — specify the AI model
---
```

### Steps

**Exercise 1 — Use the ODrive Engineer Agent**

1. Open the Copilot Chat mode picker (dropdown at the top)
2. Select **ODrive Engineer** from the list
3. Give it a task:

```
Add a method to the Motor class that returns the current motor temperature in degrees Celsius. Include proper Doxygen documentation and error handling.
```

4. Watch the agent work — it should follow embedded constraints and naming conventions

**Exercise 2 — Build a Code Reviewer Agent**

Now create an agent with a **different tool set** — read-only tools that prevent it from editing files.

1. Create `.github/agents/ODrive-Reviewer.agent.md` with the following content:

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

2. Check the mode picker — "ODrive Reviewer" should appear immediately (no reload needed)
3. Notice the contrast with ODrive Engineer:
   - No `editFiles` or `runCommands` — this agent **can't** change your code
   - It has `usages` — it can trace how functions are called across the codebase
   - Same file format, completely different behavior — **the tool list controls what an agent can do**

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

5. The agent maintains its persona across the entire conversation

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

Fill in the behavior instructions with your own rules, then test the agent with a real task.

### Success Criteria

- ✅ You've used the ODrive Engineer agent to complete a task
- ✅ You've created the ODrive Reviewer agent with read-only tools and tested it
- ✅ You understand the progression: simple local agent → read-only reviewer → specialized agent
- ✅ You understand that agents persist for the entire chat session, unlike prompts

</details>

---

<details>
<summary><h2>Lab 7: MCP Servers — GitHub Integration (15 min)</h2></summary>

> **Workshop Section**: 7 — MCP Servers

### Why This Matters

MCP (Model Context Protocol) extends Copilot beyond code — connecting it to browsers, APIs, databases, and external tools. Without MCP, Copilot can only read and write files. With MCP, it can interact with GitHub's API, query databases, and more. For embedded projects, the **GitHub MCP** server is the most immediately useful — interact with issues, PRs, and repo data from chat.

### Reference: MCP Configuration

The `.vscode/mcp.json` configures the GitHub server:

| Server | Type | How It Works |
|--------|------|--------------|
| **GitHub** | HTTP (remote) | Connects to `api.githubcopilot.com`, OAuth authentication |

### Steps

**Exercise 1 — Configure the MCP Server**

1. Create or open `.vscode/mcp.json` and confirm the `github` server is defined:

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

2. Verify the VS Code setting: Open Settings (`Ctrl+,`) → search for `chat.mcp.discovery.enabled` → ensure it's checked (true)

3. Verify server status: Command Palette (`Ctrl+Shift+P`) → `MCP: List servers`

> **Important**: When Copilot calls an MCP tool for the first time, VS Code displays a **tool approval dialog**. Click the **dropdown arrow (▼)** next to "Allow" to see session-wide approval options. **For this workshop**: Select **"Allow Tools from GitHub Without Review in this Session"**.

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

### Success Criteria

- ✅ GitHub MCP server is configured in `.vscode/mcp.json` and auto-starts when needed
- ✅ You've used GitHub MCP to list or create issues from Copilot Chat
- ✅ You understand that MCP connects Copilot to the real world beyond just code files

</details>

---

<details>
<summary><h2>Lab 8: GitHub Copilot CLI — The Agentic Terminal (15 min)</h2></summary>

> **Workshop Section**: 8 — GitHub Copilot CLI: The Agentic Terminal

### Why This Matters

The standalone `copilot` CLI is a full agentic terminal — an interactive TUI where AI can read your files, build multi-step plans, execute changes with your approval, review code, and even delegate tasks to Coding Agent in the cloud. It's the same agentic experience as VS Code, but entirely in your terminal.

### Quick Reference

| Command / Key | What It Does |
|--------------|--------------|
| `copilot` | Launch the interactive agentic terminal |
| `@filename` | Attach a file as context in your prompt |
| `Shift+Tab` | Toggle plan mode — preview steps before execution |
| `/review` | AI reviews your staged or working-tree changes |
| `/delegate` | Hand a task to Coding Agent (creates branch + PR) |
| `/context` | Show what files are currently loaded as context |
| `/usage` | Check your token consumption for the session |
| `!command` | Run any shell command without leaving the session |
| `--resume` | Resume your most recent session |

### Steps

**Exercise 1 — Launch the CLI & Explore**:

1. Open a **standalone terminal** — not the VS Code integrated terminal:
   - **Windows**: Open **Windows Terminal** (`Win+X` → Terminal) or **PowerShell**
   - **macOS**: Open **Terminal.app** (`Cmd+Space` → "Terminal") or **iTerm2**
2. Navigate to the project directory:

```bash
cd path/to/ODrive-Custom/src-ODrive
```

3. Launch the GitHub Copilot CLI:

```bash
copilot
```

4. Approve the trusted directory prompt
5. Ask about your project:

```
What communication protocols does this firmware support? List the handler files for each.
```

6. Notice the **tool approval prompt**: `(Y)es` / `(N)o` / `Yes for this (S)ession` / `Yes (A)lways`

**Exercise 2 — File Context with `@`**:

1. Reference a specific file in your prompt using `@`:

```
Explain what @Firmware/MotorControl/foc.cpp does and describe the FOC algorithm steps
```

2. The agent reads the file and answers with specific references
3. Try referencing multiple files:

```
@Firmware/MotorControl/motor.hpp @Firmware/MotorControl/motor.cpp What are the key public methods on the Motor class?
```

**Exercise 3 — Plan Mode & Build a Feature**:

1. Press `Shift+Tab` to enable **plan mode**
2. Type a feature request:

```
Plan how to add a new CAN message for reporting motor diagnostics — fault count, total runtime, and max temperature
```

3. Review the plan — the agent shows numbered steps it will take
4. Press `Shift+Tab` to return to execute mode
5. Try building something:

```
Add a static method Motor::getInstanceCount() that returns the number of Motor instances created. Use a static uint8_t counter. Follow patterns in @Firmware/MotorControl/motor.hpp
```

6. Approve each tool call as it appears

**Exercise 4 — Review Your Changes**:

1. After building the feature, ask for a code review:

```
/review
```

2. Read the AI's feedback

**Exercise 5 — Explore Slash Commands**:

1. Check available agents:

```
/agent
```

2. Check session context and usage:

```
/context
```

```
/usage
```

3. Run shell commands without leaving:

```
!git status
```

**Exercise 6 — Delegate to Coding Agent** (Bonus):

1. If Coding Agent is enabled in your repo, try handing off a task:

```
/delegate Create an issue to add motor temperature monitoring to the CAN protocol, then implement it
```

2. The CLI confirms the handoff — Coding Agent will create a branch, write the code, and open a PR

> **Note**: `/delegate` requires Coding Agent to be enabled in the repository settings. If not available, skip this exercise — you'll see it demonstrated in the workshop's Section 9 demo.

### Stretch Goals

If you finish early, try these:

- **Resume a session**: Exit the CLI (`Ctrl+C` or type `exit`), then resume:

  ```bash
  copilot --resume
  ```

- **Ask the agent to refactor**: Pick a file and ask for improvements:

  ```
  @Firmware/MotorControl/motor.cpp Look for any performance improvements in the Motor::update method
  ```

### Success Criteria

- ✅ You've launched the `copilot` CLI and explored the interactive TUI
- ✅ You've used `@filename` to attach file context to a prompt
- ✅ You've used `Shift+Tab` to toggle plan mode and reviewed a plan
- ✅ You've built a feature and approved tool calls (read_file, edit_file)
- ✅ You've used `/review` to get an AI code review in the terminal
- ✅ You've run shell commands inline with `!` (e.g., `!git status`)

</details>

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Copilot not active | Check extension is installed and signed in |
| MCP server won't start | Check `MCP: List servers` for status, verify `chat.mcp.discovery.enabled` is `true` in VS Code settings |
| GitHub MCP auth error | Re-authenticate via OAuth, or use PAT with correct scopes |
| Agent mode not available | Update VS Code and Copilot extension to latest |
| Skills not loading | Verify `SKILL.md` filename (case-sensitive), check description matches prompt |
| Custom instructions ignored | Verify file is in `.github/` root, check for syntax errors |
| `copilot` CLI not available | Install the standalone GitHub Copilot CLI — see <https://docs.github.com/en/copilot/github-copilot-in-the-cli> |
| C++ IntelliSense not working | Install the C/C++ Extension Pack, configure `c_cpp_properties.json` |

---

## Resources

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
| ODrive Documentation | <https://docs.odriverobotics.com/> |
| Workshop Repo | <https://github.com/thomasiverson/ODrive-Custom> |
| Community Skills | <https://github.com/github/awesome-copilot> |

---

*Hands-on lab guide for GitHub Copilot: Zero to Agents — ODrive Embedded C++ Edition*
*Workshop repo: [thomasiverson/ODrive-Custom](https://github.com/thomasiverson/ODrive-Custom)*
