# Astro Configuration Instructions

This repository uses Astro for the static site that displays workshops and modules. When adding or modifying workshops and modules, you must update Astro configuration in **TWO places**.

## Overview

The site has two key Astro pages:
1. **`site/pages/index.astro`** — Main landing page showing all available workshops
2. **`site/pages/[workshop]/index.astro`** — Dynamic workshop pages showing all modules for that workshop

Both files maintain a `workshopMeta` object that defines the workshop structure, descriptions, and module lists.

---

## How to Add a New Module to an Existing Workshop

### Step 1: Create Module Files
Create the module in `workshops/` with:
- `[module-name].slidev.md` (presentation deck)
- `[module-name]-workshop.md` (facilitator guide, optional)
- `[module-name]-LAB.md` (hands-on exercises, optional)

Example for Module 5 of Copilot Developer Training:
```
workshops/copilot-dev-hack/
  ├── copilot-dev-hack.slidev.md
  ├── copilot-dev-hack-workshop.md
  └── .draft (optional — hides folder from standalone discovery)
```

### Step 2: Update `site/pages/index.astro`
In the `workshopMeta` object, find your workshop and add the module to its `modules` array.

**Example: Adding Module 5 to Copilot Developer Training**

```javascript
'copilot-dev-training': {
  label: 'Copilot Developer Training',
  desc: '...',
  icon: '🎓',
  modules: [
    { folder: 'copilot-dev-foundations', label: 'Module 1: Foundations', desc: '...', icon: '🎓' },
    { folder: 'copilot-dev-agentic', label: 'Module 2: Agentic Patterns', desc: '...', icon: '🤖' },
    { folder: 'copilot-dev-advanced', label: 'Module 3: Advanced Topics', desc: '...', icon: '🔬' },
    { folder: 'copilot-dev-ado-integration', label: 'Module 4: GitHub + ADO Integration', desc: '...', icon: '🔗' },
    { folder: 'copilot-dev-hack', label: 'Module 5: Hack', desc: '60-minute hackathon...', icon: '🚀' }  // ← ADD THIS LINE
  ]
}
```

### Step 3: Update `site/pages/[workshop]/index.astro`
In the `workshopMeta` object (it's defined again in this file), add the **same module entry** to the `modules` array for that workshop.

This ensures:
- The main page shows the correct module count (e.g., "5 Modules")
- The workshop detail page shows all modules with correct links and descriptions

**Example: Same addition to the workshop detail page**

```javascript
'copilot-dev-training': {
  label: 'Copilot Developer Training',
  desc: '...',
  icon: '🎓',
  modules: [
    // ... Modules 1-4 ...
    { folder: 'copilot-dev-hack', label: 'Module 5: Hack', desc: '60-minute hackathon...', icon: '🚀' }  // ← ADD THIS LINE
  ]
}
```

### Step 4: Rebuild and Test
```bash
npm run build:all
```

Verify:
- Main page shows correct module count
- Workshop detail page displays all modules
- Module links work correctly
- All descriptions render properly

---

## Key Fields in Module Objects

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `folder` | ✅ Yes | Exact folder name in `workshops/` | `'copilot-dev-hack'` |
| `label` | ✅ Yes | Display label (shown on site) | `'Module 5: Hack'` |
| `desc` | ✅ Yes | Short description (1-2 sentences) | `'60-minute hackathon: build custom agents'` |
| `icon` | ✅ Yes | Emoji or SVG icon for visual distinction | `'🚀'` |

---

## Hiding a Folder from Main Discovery

If you create a module folder (e.g., `copilot-dev-hack`) but don't want it to appear as a standalone workshop card on the main page, create an empty `.draft` marker file:

```bash
touch workshops/copilot-dev-hack/.draft
```

The `.draft` file:
- Tells Astro to skip this folder during standalone discovery
- Does NOT affect module discovery (modules still appear when registered in `workshopMeta`)
- Must be 0 bytes (empty)

---

## Hiding Workshop Badges

To hide the "Workshop" badge from workshop cards (showing only "Lab" and "Slides"):

**File**: `site/pages/index.astro` (line ~162)

Change:
```javascript
{w.hasWorkshop && <span class="badge badge-workshop">Workshop</span>}
```

To:
```javascript
{/* w.hasWorkshop && <span class="badge badge-workshop">Workshop</span> */}
```

---

## Common Mistakes

❌ **Registering a module in ONLY ONE place**
- Main page won't show correct module count
- OR workshop detail page won't display all modules
- **Fix**: Update BOTH `index.astro` files

❌ **Using wrong folder name**
- Module links will 404
- **Fix**: Ensure `folder` field matches exact folder name in `workshops/`

❌ **Not creating `.draft` file**
- Folder appears as duplicate standalone card AND as module
- **Fix**: Add `.draft` marker if folder should only appear as a module

❌ **Forgetting to rebuild**
- Changes won't appear on site
- **Fix**: Run `npm run build:all` after any config changes

---

## File Locations Reference

```
site/
  pages/
    index.astro                    ← Main page workshopMeta
    [workshop]/
      index.astro                  ← Workshop detail page workshopMeta (MUST MATCH main page)
      lab.astro                    ← Lab page (auto-discovers LAB files)
workshops/
  copilot-dev-hack/               ← Module folder
    copilot-dev-hack.slidev.md    ← Slides (required for module)
    copilot-dev-hack-workshop.md  ← Facilitator guide (optional)
    [module]-LAB.md               ← Hands-on exercises (optional, shows Lab button)
    .draft                        ← Marker to hide from standalone discovery (optional)
```

---

## Testing the Build

After making changes, verify locally:

```bash
npm run build:all
npx http-server dist/local-preview -p 4202 -c-1 --cors -s
# Then open http://127.0.0.1:4202/GH-Hack/
```

Check:
- ✅ Main page shows correct number of workshops
- ✅ Workshop cards show correct module count
- ✅ Workshop detail page displays all modules in correct order
- ✅ Module links are clickable and work
- ✅ No 404 errors in browser console
