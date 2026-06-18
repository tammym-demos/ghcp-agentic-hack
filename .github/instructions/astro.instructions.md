# Astro Configuration Instructions

This repository uses Astro for the static site that displays workshops and modules. When adding or modifying workshops and modules, you must update Astro configuration in **TWO places**.

## Overview

The site has two key Astro pages:

1. **`site/pages/index.astro`** — Main landing page showing all available workshops
2. **`site/pages/[workshop]/index.astro`** — Dynamic workshop pages showing all modules for that workshop

Both files maintain a `workshopMeta` object that defines the workshop structure, descriptions, and module lists.

---

## Current Workshops

The repo currently has two workshop entries in `workshopMeta`:

- **`copilot-dev-training`** — Multi-module curriculum with 3 modules (foundations, agentic, advanced)

---

## How to Add a New Module to an Existing Workshop

### Step 1: Create Module Files

Create the module in `workshops/` with:

- `[module-name].slidev.md` (presentation deck)
- `[module-name]-LAB.md` (hands-on exercises, optional)

### Step 2: Update `site/pages/index.astro`

In the `workshopMeta` object, find your workshop and add the module to its `modules` array.

### Step 3: Update `site/pages/[workshop]/index.astro`

In the `workshopMeta` object (it's defined again in this file), add the **same module entry** to the `modules` array for that workshop.

This ensures:

- The main page shows the correct module count
- The workshop detail page shows all modules with correct links and descriptions

### Step 4: Rebuild and Test

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

## Common Mistakes

❌ **Registering a module in ONLY ONE place** — Update BOTH `index.astro` files

❌ **Using wrong folder name** — Ensure `folder` field matches exact folder name in `workshops/`

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
- ✅ Workshop cards show correct module count
- ✅ Workshop detail page displays all modules in correct order
- ✅ Module links are clickable and work
- ✅ No 404 errors in browser console
