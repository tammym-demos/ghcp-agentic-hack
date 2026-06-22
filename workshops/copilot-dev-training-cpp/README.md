# GitHub Copilot Dev Hack — C++ / Hardware Edition

This folder is a **multi-module workshop parent**. It has no standalone content of its
own — it groups together the shared GitHub Copilot Dev Hack modules plus a C++/hardware
delta module, registered via `workshopMeta` in the Astro site.

## Modules

This workshop reuses the three shared core modules (single source of truth) and adds one
C++/hardware-focused module:

| Module | Folder | Notes |
|--------|--------|-------|
| Module 1: Foundations | `copilot-dev-foundations` | Shared with the general edition |
| Module 2: Agentic Patterns | `copilot-dev-agentic` | Shared with the general edition |
| Module 3: Advanced Topics | `copilot-dev-advanced` | Shared with the general edition |
| Module 4: C++ for Hardware Developers | `copilot-dev-cpp-hardware` | C++/hardware delta — this edition only |

Because the first three modules are shared, edits to them propagate to both the general
and C++ editions automatically. Only `copilot-dev-cpp-hardware` is specific to this
workshop.

## Registration

This workshop is registered in two Astro files (both must stay in sync):

- `site/pages/index.astro` — landing-page card
- `site/pages/[workshop]/index.astro` — workshop detail page

*Parent folder for the GitHub Copilot Dev Hack — C++ / Hardware Edition*
