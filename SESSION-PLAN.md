# Plan: Fix Module 5 + Hide Workshop Badges + Fix Light Mode

## Issues Identified (Screenshot Evidence)

### 1. **"Copilot Dev Hack" showing as standalone card** ❌
- Should NOT appear on main page
- It's Module 5, not a separate workshop
- **Root cause**: copilot-dev-hack folder exists but is empty; Astro discovery treats it as standalone
- **Solution**: Create `.draft` marker file to hide it

### 2. **"Copilot Developer Training" shows "4 MODULES"** ❌
- Should show 5 MODULES (including Module 5: Hack)
- **Root cause**: Module 5 files don't exist + not registered in workshopMeta
- **Solution**: Create Module 5 files + register in Astro

### 3. **"WORKSHOP" badges already hidden** ✅
- User has already hidden the workshop pill
- Only LAB and SLIDES buttons should appear
- **Status**: Complete

### 4. **Light mode contrast is unreadable** ❌
- Dark mode shows fine in screenshot
- But light mode white background has poor contrast
- **Solution**: Make dark the default, keep light as toggle option

---

## Work Items (Priority Order)

### todo-1-create-module5-files
**CREATE** `workshops/copilot-dev-hack/copilot-dev-hack.slidev.md`
- 24-slide Slidev deck (15-20 min intro to hackathon)
- Content: Cover, agenda, 5 business scenarios, phase instructions, success criteria

**CREATE** `workshops/copilot-dev-hack/copilot-dev-hack-workshop.md`
- Facilitator guide (~738 lines)
- Content: Overview, hackathon plan, 5 scenario guides, troubleshooting

**5 Scenarios**:
1. Code Review Agent — review PRs for style/security/performance
2. Test Generation Agent — write unit tests for functions
3. Documentation Assistant — generate README/API docs
4. Bug Triage Agent — categorize GitHub issues
5. Bring Your Own Problem — facilitator helps scope it

### todo-2-hide-empty-folder
**CREATE** `workshops/copilot-dev-hack/.draft`
- Empty marker file (0 bytes)
- Hides folder from Astro discovery so it doesn't appear as standalone card

### todo-3-register-module5-in-astro
**EDIT** `site/pages/index.astro` lines 17-23
- Add Module 5 to `workshopMeta['copilot-dev-training'].modules` array
- Entry: `{ folder: 'copilot-dev-hack', label: 'Module 5: Hack', desc: '...', icon: '🚀' }`

### todo-4-verify-workshop-badge-hidden
**SKIP** — User has already hidden workshop badges
- Only LAB and SLIDES buttons visible (correct)

### todo-5-fix-light-mode-default
**EDIT** `site/layouts/Base.astro`
- Change default theme from `light` to `dark`
- Keep light as toggle option

### todo-6-rebuild-and-test
- Run `npm run build:all`
- Test local preview
- Verify: 3 workshops, 5 modules in CDT, no badges, dark default, good contrast

---

## Success Criteria

✅ Copilot Dev Hack hidden (using .draft)  
✅ Module 5 files created with 5 scenarios  
✅ Module 5 registered — shows "5 MODULES"  
✅ No "WORKSHOP" badges visible (already hidden)  
✅ Dark mode default, light toggle works  
✅ Good contrast in both themes  
✅ Site rebuilds successfully  

- ✍️ **Exercise 2** (10 min): Create `.github/agents/workshop-feedback.md` with specific instructions for kind feedback
- ✍️ **Exercise 3** (10 min): Test your feedback agent; ask it to review a workshop agenda (practice Init setup)
- ✍️ **Exercise 4** (10 min): Observe the Ralph Loop in action with your agent; map Plan→Act→Observe→Reflect steps

**Module 3 (Advanced Patterns)**:
- ✍️ **Exercise 5** (10 min): Run your feedback agent AND another model's on the same workshop; compare outputs (multi-model comparison)
- ✍️ **Exercise 6** (10 min): Debug a broken feedback agent (facilitator provides logs where it got too harsh); fix it to be kind again
- ✍️ **Exercise 7** (10 min): Examine chat logs where context got confused in feedback; find the exact confusion point
- ✍️ **Exercise 8** (10 min): Add an MCP integration to your feedback agent (e.g., fetch workshop data from an API, then provide feedback)

**Hands-on materials delivered**:
- Structured step-by-step instructions document (referenced via "Labs" button on site)
- Each exercise has: objective, steps, success criteria, sample output (showing kind, helpful feedback)
- Attendees leave with a fully functional, friendly feedback agent

**Demo refactor** (7 slides):
- Keep `layout: demo` for visual consistency
- Relabel `# 🖥️ LIVE DEMO` → `# 🔨 HANDS-ON PRACTICE — [step in Workshop Feedback Agent]`
- Include short instructions: "1. Create your instructions... 2. Test with this agenda... 3. Show your feedback..."
- Include presenter notes with timing & success criteria

**Why this works**:
- ✅ ONE coherent story attendees can follow (builds ownership)
- ✅ Progressive complexity (start simple, enhance through modules)
- ✅ FUN + KIND (gives feedback in a supportive way, actual humor without meanness)
- ✅ PRACTICAL (agent actually works as a real feedback tool they can use with colleagues)
- ✅ EDUCATIONAL (learns all core agentic concepts through building this agent)

### Part 4: Create 5th Module — "Hack" (Hackathon/Business Problem Solving)
**Goal**: Structured 60-min session where attendees **build from scratch in their own project** solving a REAL business problem

**Philosophy**: 
- After learning through FUN exercises (Workshop Roast, Rubber Duck, etc.), now apply skills to REAL team problems
- No starter template—attendees bring their own project (or use a simple template)
- Focus on: custom instructions, custom agent, testing the agentic loop for THEIR use case
- High agency: they choose the problem; facilitator provides structure and checkpoints

**Content**:
- Clear objectives: "Leave with a working custom agent + instructions tailored to YOUR project's business need"
- **Business problem scenarios** (attendees pick one that matches their team):
  - **Scenario A**: Build a code-review agent for your PRs (feedback on code style, security, performance)
  - **Scenario B**: Build a test-generation agent (writes unit tests for your functions)
  - **Scenario C**: Build a documentation assistant (generates README sections for your APIs)
  - **Scenario D**: Build a bug triage agent (categorizes and prioritizes GitHub issues)
  - **Scenario E**: Bring your own business problem (facilitator helps scope it)
- Step-by-step instructions (planning 10 min → building 40 min → demo 10 min):
  - **Planning (10 min)**: Choose scenario, define success criteria, set up project folder
  - **Building (40 min)**: Create `.github/copilot-instructions.md` → Create `.github/agents/[name].md` → Test in VS Code
  - **Demo (10 min)**: Show your agent working; facilitator gives feedback
- Success criteria checkpoints:
  - ✅ Your project has `.github/copilot-instructions.md` with team context
  - ✅ You created a custom agent in `.github/agents/[name].md`
  - ✅ Your agent solves the chosen business problem (tested in Copilot Chat)
  - ✅ You can explain what your agent does in 1 minute
- Resource links (demo repo, docs, checklists, agent templates)

**Key difference from early labs**: NOT "here's a quirky scenario for learning" — rather "you have 40 min to create an agent that solves YOUR BUSINESS PROBLEM"

**Why this separation works**:
- ✅ Modules 2-3 (Agentic + Advanced): ONE consistent fun agent (Workshop Roast) they build and enhance → engagement + cohesion + ownership
- ✅ Module 5 Hack: BUSINESS-FOCUSED → applies skills to real team problems
- ✅ Attendees leave with: (1) deep understanding of agent mechanics via playful experimentation, (2) real agent for their team business need

**Deliverables**:
- New slide deck: `copilot-dev-hack.slidev.md` (15 min intro + instructions)
- New workshop guide: `copilot-dev-hack-workshop.md` (detailed facilitator notes + 5 scenario templates + success criteria)

### Part 5: Add Light/Dark Theme Toggle
**Goal**: Dark theme currently hard to read; allow user choice

**Scope**:
- Add toggle button to site header/footer (☀️/🌙 icon)
- Add CSS variable system for light/dark colors
- Store preference in localStorage
- Apply to: main site + Slidev decks (via theme CSS)

**Files to modify**:
- `site/layouts/Base.astro` — Add toggle UI + theme provider
- `site/styles/theme.css` (NEW) — CSS variables for both themes
- `themes/github/index.css` — Slidev colors for light/dark

**Design decision**: Default to light mode (more readable on projectors); user can switch to dark

### Part 6: Add Images/Illustrations
**Goal**: Liven up pages with visuals

**Suggested locations**:
- **Main landing page**: Hero image or decorative Octocat variant
- **Module intro slides**: 1-2 representative images per module (icons, workflow diagrams)
- **Lab/Hack headers**: Task-related illustrations or tech stack visuals
- **GitHub + ADO module**: Integration diagram with visual connectors
- **Sidebar/footer decorations**: Subtle tech-themed patterns or GitHub iconography

**Image sources**:
- GitHub Octicons (free, on-brand)
- Copilot brand assets (Microsoft)
- Open-source illustrations (Undraw, Icons8, etc.)
- Custom SVG diagrams (Mermaid already embedded)

---

## Implementation Todos

| ID | Task | Scope | Files |
|---|---|---|---|
| 1 | **hide-one-day-from-nav** | Create `.draft` in copilot-dev-one-day/ | 1 marker file |
| 2 | **hide-workshop-files** | Modify index.astro discovery logic | site/pages/index.astro |
| 3 | **create-roast-agent-labs** | Step-by-step lab instructions for Workshop Feedback Agent (8 exercises across Modules 2-3) | workshops/copilot-dev-agentic/FEEDBACK-AGENT-LAB.md, workshops/copilot-dev-advanced/FEEDBACK-AGENT-LAB.md |
| 4 | **refactor-agentic-demos** | Transform 3 demos → hands-on Feedback Agent exercises | workshops/copilot-dev-agentic/*.slidev.md |
| 5 | **refactor-advanced-demos** | Transform 4 demos → hands-on Feedback Agent exercises | workshops/copilot-dev-advanced/*.slidev.md |
| 6 | **create-hack-module** | New slide deck + workshop guide for Module 5 | copilot-dev-hack.slidev.md, copilot-dev-hack-workshop.md |
| 7 | **register-hack-in-astro** | Add Module 5 to workshopMeta config | site/pages/index.astro (lines 12-23) |
| 8 | **add-labs-link** | Add "Labs" navigation link to Workshop Feedback Agent instructions | site/layouts/Base.astro or workshop card footer |
| 9 | **add-theme-toggle** | Light/dark mode toggle UI | site/layouts/Base.astro, site/styles/theme.css (NEW) |
| 10 | **add-images** | Visual assets to pages + slides | site/ + workshops/ (asset additions) |
| 11 | **verify-navigation** | Check main page: 3 items, all 5 modules + Labs link visible | Quick spot-check |
| 12 | **build-and-verify** | Full site rebuild; test theme toggle + images | Final validation |
| 13 | **build-locally** | Run full build and serve locally for user review | `npm run build` then `npx http-server` with proper path junction |

---

## Astro Registration Details (Task 6)

**File**: `site/pages/index.astro` (lines 12-23 in workshopMeta object)

**Current**: Registers 4 modules under `copilot-dev-training`
```javascript
modules: [
  { folder: 'copilot-dev-foundations', label: 'Module 1: Foundations', ... },
  { folder: 'copilot-dev-agentic', label: 'Module 2: Agentic Patterns', ... },
  { folder: 'copilot-dev-advanced', label: 'Module 3: Advanced Topics', ... },
  { folder: 'copilot-dev-ado-integration', label: 'Module 4: GitHub + ADO Integration', ... }
]
```

**Need to add**: 5th module entry
```javascript
{ folder: 'copilot-dev-hack', label: 'Module 5: Hack — Business Problem Solving', 
  desc: '60-min hackathon. Build from scratch in your project. Choose your business problem, create custom instructions & agent, validate solution.', 
  icon: '🚀' }
```

**Impact**: Once registered, "Copilot Developer Training" card will display all 5 modules in order

---

## Timing Recalculation

**Old structure** (3 original modules + separate 60-min lab):
- Module 1: 60 min
- Module 2: 90 min
- Module 3: 60 min
- Module 4 (ADO): 30 min
- Breaks/Lunch: 60 min
- Separate Lab: 60 min
- **Total**: 420 min (7 hours) — **TOO LONG FOR 9:30-3:30**

**New structure** (4 modules + integrated Module 5 Hack):
- Module 1 (Foundations): 60 min
- Module 2 (Agentic): 90 min
- Module 3 (Advanced): 60 min
- Module 4 (ADO): 30 min
- Lunch: 30 min
- Breaks: 10 min (2x 5 min)
- **Module 5 (Hack)**: 60 min — replaces separate lab, now integrated as module
- **Total**: 60 + 90 + 60 + 30 + 30 + 10 + 60 = **340 min** (under 360 min available)

✅ **Fits perfectly in 6-hour window** with 20 min buffer for Q&A

---

## Key Decisions

✅ **Module 5 is the capstone**: Structured hackathon with business problem focus (not free-form hacking)  
✅ **Themes default to light**: More readable on projectors; dark available as option  
✅ **Images are enhancement, not required**: Add where they improve clarity; don't overload  
✅ **No deletions**: All workshop.md files preserved for facilitator reference  
✅ **Single build**: All changes applied in one npm run build  

---

## Next Phase: Build & Local Preview

Once all agents complete:
1. Run `npm run build` to build all Slidev decks and Astro site
2. Set up local HTTP server with proper `/GH-Hack/` path routing
3. Provide preview URL to user for review before pushing to production
4. User approves → ready for git commit and push

## Success Criteria

- ✅ Main page shows exactly 3 top-level workshops
- ✅ Copilot Developer Training card shows **5 modules** (Foundations, Agentic, Advanced, ADO, **Hack**)
- ✅ "Labs" button/link accessible, references Workshop Feedback Agent step-by-step instructions
- ✅ All 8 Workshop Feedback Agent exercises have clear step-by-step instructions (Modules 2-3)
- ✅ All 7 demo slides transformed to Feedback Agent hands-on practice sections
- ✅ Light theme renders without readability issues
- ✅ Theme toggle works; preference persists across page reloads
- ✅ Images appear on landing page and key module intro slides
- ✅ Module 5 (Hack) registered in Astro workshopMeta config
- ✅ Module 5 (Hack) slide deck + workshop guide created with 5 business problem scenarios
- ✅ No "Workshop" badges appear on any card
- ✅ Build completes successfully
- ✅ Local preview accessible for user review at http://127.0.0.1:4201/GH-Hack/
