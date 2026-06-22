# Presenter Notes — Module 4: C++ for Hardware Developers — Workshop Guide

## Discussion Prompts by Section

### 1. Framing: GitHub Copilot for Hardware and Embedded C++ (12 min)

- Where does text-based code search most often mislead your team on your firmware or driver code?
- Which review gate is most at risk of being skipped under release pressure on low-level changes?
- What hardware-safety boundary must always stay human-owned, regardless of tooling maturity?

### 2. C++ Code Intelligence: the Language Server vs. grep (24 min)

- Which of your codebases would benefit most from semantic symbol navigation versus grep?
- What build configuration details in `compile_commands.json` are you comfortable sharing as context, and which are sensitive?
- Where in your workflow does a missing or stale compilation database currently cost you time?

### 3. Context and Instructions for Embedded C++ (24 min)

- Which embedded conventions does your team repeat in prompts today that belong in an instruction file?
- Where do generic C++ suggestions most often violate your platform rules (allocation, `volatile`, types)?
- How should scoping with `#file` and `#selection` change for a large firmware tree versus a single driver?

### 4. Agentic Modernization: the `@Modernize` Workflow (22 min)

- Which legacy C++ upgrade has been deferred because the manual effort was too high?
- What would your team require in the `plan.md` before approving an automated modernization run?
- For cloud agents on C++ projects, what build tooling must `copilot-setup-steps.yml` install to make the environment buildable?

### 5. Wrap-up and Hack Handoff (8 min)

- Which real codebase will your team bring to the Day 2 hack to apply these techniques?
- What is the first instruction-file rule you will standardize across your embedded projects?

*Presenter notes for Module 4: C++ for Hardware Developers — GitHub Copilot Developer Training*
