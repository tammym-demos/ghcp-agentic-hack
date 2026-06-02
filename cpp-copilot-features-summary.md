# C++ Code Intelligence & Modernization for GitHub Copilot

> Summary of two Microsoft announcements covering C++ language intelligence in GitHub Copilot CLI and C++ app modernization in Visual Studio.

---

## Article 1: C++ Code Intelligence for GitHub Copilot CLI (Preview)

**Source:** <https://devblogs.microsoft.com/cppblog/c-code-intelligence-for-github-copilot-cli-preview/>
**Date:** April 22, 2026
**Author:** Erika Sweet, Principal Product Manager — C++ Team

### What It Is

The **Microsoft C++ Language Server for GitHub Copilot CLI** brings semantic C++ code understanding — previously available only in Visual Studio and VS Code — to the command-line GitHub Copilot experience. It is published as an npm package ([`@microsoft/cpp-language-server`](https://www.npmjs.com/package/@microsoft/cpp-language-server)) and runs on Windows, Linux, and macOS.

### Why It Matters

C++ is notoriously hard for tools to reason about due to:

- Complex include hierarchies
- Macros and templates
- Overloads
- Build-system-dependent configurations

Plain text / grep-based search often returns **incomplete or misleading results**. The C++ Language Server provides precise semantic data — symbol definitions, references, call hierarchies, and type information — using the same IntelliSense engine that powers code navigation in the IDE.

### LSP vs. Grep — Example ({fmt} Library)

| Step | With C++ Language Server | Without (grep only) |
|------|--------------------------|---------------------|
| **Find formatters** | Workspace symbol search — returns exact matches | Iterative grep — noisy, multiple passes |
| **Inspect base classes** | Go-to-definition — jumps to the exact declaration | Grep on class name — returns every mention across the codebase |
| **Result quality** | Precise, relevant results | May include irrelevant matches |

### Getting Started

**Prerequisites:**

- Active GitHub Copilot subscription
- GitHub Copilot CLI authenticated
- A `compile_commands.json` for the project
- Project configured for GitHub Copilot CLI

**Quick links:**

- npm package: <https://www.npmjs.com/package/@microsoft/cpp-language-server>
- GitHub repo (issues only): <https://github.com/microsoft/cpp-language-server/>
- Quick start guide: <https://github.com/microsoft/cpp-language-server/#-quick-start>

**Build system support:**

| Build System | Setup |
|-------------|-------|
| **CMake** | Automated via a [setup skill](https://github.com/microsoft/cpp-language-server/blob/main/skills/setup-cpp-language-server/SKILL.md) or [manual instructions](https://github.com/microsoft/cpp-language-server/#creating-compile_commandsjson-for-cmake-based-projects) |
| **MSBuild (vcxproj)** | Use the [sample extractor app](https://github.com/microsoft/msbuild-extractor-sample) to generate `compile_commands.json`. Integrated support is planned for a future release |

### Tips for Best Results

- Append **"Use the C++ LSP"** to the end of your queries
- Create a [custom instructions file](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions) that tells Copilot to prefer the C++ LSP

---

## Article 2: GitHub Copilot Modernization for C++ (Preview)

**Source:** <https://learn.microsoft.com/en-us/cpp/porting/copilot-app-modernization-cpp?view=msvc-170>

### What It Is

An **agentic workflow** inside Visual Studio that upgrades C++ projects to newer MSVC Build Tools versions, identifies build issues introduced by the upgrade, and iteratively fixes them with your approval.

### Requirements

- Visual Studio 2026 version 18.3 or later
- A GitHub Copilot account
- MSBuild-based (`.sln`, `.vcxproj`) **or** CMake-based codebase

### How to Enable

1. **Tools → Options → GitHub → Copilot → C/C++**
2. Check **Enable GitHub Copilot modernization for C++ (preview)**
3. Restart Visual Studio

### Agent Workflow

The Modernize agent (`@Modernize`) operates inside the GitHub Copilot Chat window. It can be started from:

- **Solution Explorer** — right-click → **Modernize**
- **Copilot Chat** — type `Use @Modernize to update MSVC Build Tools.`
- **Infobar prompt** — appears automatically when a project is retargeted to a new MSVC version

The agent proceeds through four stages:

#### Stage 1 — Assessment

- Upgrades project settings (if needed) to the latest MSVC
- Builds the codebase
- Analyzes warnings and errors
- Generates an **`assessment.md`** file describing problems, severity, and context
- You can tell the agent to skip certain issues (pre-existing warnings, strategic decisions)

#### Stage 2 — Planning

- Creates a **`plan.md`** with a detailed strategy for resolving each identified problem
- You can adjust the plan to match your organization's coding style and practices
- Approval is required before the agent proceeds

#### Stage 3 — Execution

- Breaks the plan into tasks (granularity is configurable)
- Tasks can include branching, committing, and grouping changes
- After making changes, the agent **rebuilds to verify** fixes
- Iterates until problems are resolved or you stop the conversation

#### Stage 4 — Post-Upgrade Validation

- Run changes through your testing infrastructure
- Have a colleague review via pull request
- Optionally complete a product survey (preview feedback)

### Key Takeaways

| Aspect | Detail |
|--------|--------|
| **Scope** | Upgrades MSVC Build Tools version and fixes resulting build issues |
| **Build systems** | MSBuild and CMake |
| **Human-in-the-loop** | Assessment and plan require approval before execution |
| **Iteration** | Agent rebuilds after each change to confirm fixes |
| **Preview status** | Available in Visual Studio 2026 18.3+; expect changes based on feedback |

---

## Combined Key Insights

1. **Semantic understanding beats text search for C++.** The C++ Language Server gives Copilot precise symbol definitions, references, and call hierarchies — a major improvement over grep for navigating complex C++ codebases.

2. **CLI and IDE parity.** The same IntelliSense engine that powers Visual Studio and VS Code now extends to the CLI, enabling agentic C++ workflows outside the editor.

3. **Agentic modernization is human-in-the-loop.** The Modernize agent in Visual Studio follows an assess → plan → execute → validate cycle where developers approve each stage before the agent proceeds.

4. **`compile_commands.json` is the key enabler.** Both features rely on a compilation database. CMake projects can generate one easily; MSBuild projects need the extractor tool today with integrated support coming.

5. **Both features are in Preview.** Feedback channels are open — use the GitHub issue tracker for the Language Server and the Visual Studio product survey for the Modernize agent.
