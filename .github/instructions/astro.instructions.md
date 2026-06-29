# Astro Configuration Instructions

This repository uses Astro for the static site that displays workshops, modules, and workshop-scoped technology skills. Workshop metadata is centralized in `site/data/workshops.ts`.

## Overview

The site has three key Astro surfaces:

1. **`site/pages/index.astro`** — Main landing page showing all available workshops
2. **`site/pages/[workshop]/index.astro`** — Dynamic workshop pages showing all modules and local technology skills for that workshop
3. **`site/pages/[workshop]/skills/[skill]/index.astro`** — Dynamic skill pages that render local `SKILL.md` files

`site/data/workshops.ts` maintains the shared `workshopMeta` object and skill discovery helpers. Do **not** duplicate workshop metadata in individual Astro pages.

---

## Current Workshops

The repo currently has two workshop entries in `workshopMeta`:

- **`copilot-dev-training`** — Multi-module curriculum with 3 modules (foundations, agentic, advanced) and local technology skills
- **`copilot-optimization`** — Single-session Copilot usage optimization workshop

---

## How to Add a New Module to an Existing Workshop

### Step 1: Create Module Files

Create the module in `workshops/` with:

- `[module-name].slidev.md` (presentation deck)
- `[module-name]-LAB.md` (hands-on exercises, optional)

### Step 2: Update `site/data/workshops.ts`

In the `workshopMeta` object, find your workshop and add the module to its `modules` array.

This ensures:

- The main page shows the correct module count
- The workshop detail page shows all modules with correct links and descriptions

### Step 3: Rebuild and Test

```bash
npm run build:all
```

---

## Key Fields in Module Objects

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `folder` | ✅ Yes | Exact folder name in `workshops/` | `'copilot-dev-hack'` |
| `label` | ✅ Yes | Display label (shown on site) | `'Module 5: Hack'` |
| `desc` | ✅ Yes | Short description (1-2 sentences) | `'60-minute hackathon: build custom agents'` |
| `icon` | ✅ Yes | Emoji or SVG icon for visual distinction | `'🚀'` |

---

## How to Add a Workshop Technology Skill

Technology skills are local downloadable Copilot-style markdown files scoped to a parent workshop.

The Technology Skills section also includes a discovery link to the broader Awesome Copilot skills catalog at <https://awesome-copilot.github.com/skills/>.

### Step 1: Create the Skill Folder

Create a nested skill folder under the parent workshop:

```text
workshops/[workshop-folder]/skills/[skill-slug]/SKILL.md
```

Example:

```text
workshops/copilot-dev-training/skills/cpp-hardware/SKILL.md
```

### Step 2: Add Frontmatter

Use frontmatter so the workshop page can render the skill card:

```markdown
---
name: C++ / Hardware Developer Skill
description: Use this skill when working with C, C++, firmware, embedded systems, hardware abstraction layers, or safe modernization of legacy C++ projects.
icon: 🔧
audience: Hardware, firmware, and embedded C++ developers
order: 1
---
```

### Step 3: Rebuild and Test

```bash
npm run build:all
```

Check:

- ✅ The workshop detail page shows the skill card below the module cards
- ✅ The skill detail page renders the markdown cleanly
- ✅ The Download button returns the local `SKILL.md`
- ✅ The main workshop card shows the combined module/skill count

---

## Common Mistakes

❌ **Duplicating metadata in Astro pages** — Update `site/data/workshops.ts` instead

❌ **Using wrong folder name** — Ensure module `folder` fields match exact folder names in `workshops/`

❌ **Adding skill placeholders without content** — Only create a skill card when a local `SKILL.md` exists

❌ **Forgetting to rebuild** — Run `npm run build:all` after any config changes

---

## Testing the Build

After making changes, verify locally:

```bash
npm run build:all
npx http-server dist/local-preview -p 4202 -c-1 --cors -s
# Then open http://127.0.0.1:4202/ghcp-agentic-hack/
```

Check:

- ✅ Main page shows correct number of workshops
- ✅ Workshop cards show correct module and skill counts
- ✅ Workshop detail page displays all modules in correct order
- ✅ Technology skill cards appear below modules when local skills exist
- ✅ Module and skill links are clickable and work
- ✅ No 404 errors in browser console
