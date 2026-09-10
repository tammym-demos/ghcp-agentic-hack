---
schemaVersion: 1
kind: character
id: agent-mergewell
title: Agent Mergewell
description: A humorous but credible human field agent and engineering detective who orchestrates software agents and deploys skill gadgets.
visualTraits:
  - Mid-length charcoal technical coat with subtle GitHub-green seam accents and a compact shoulder tool pod
  - Thick rectangular glasses, wild Einstein-inspired inventor hair silhouette with dark-to-silver tones, expressive eyebrows, short neat evenly distributed dark-to-silver stubble, and an endearing eccentric smile in a modern 2D editorial cartoon style
  - Light tan skin tone with stable short neat stubble appropriate to an adult field agent, rendered consistently across scenes
  - Concealed modular mechanisms in his coat, wrist, forearm, and shoulder rig that deploy a distinct mechanical gadget only when he invokes a skill
  - Software-agent conversation panels that remain visually separate from his deployed skill gadgets
  - Utility wrist console, repo-map cards, and evidence sticky notes rendered on a clean soft off-white background
  - Companion black cat named Purrmission with bright observant eyes and a minimal green collar tag
continuityRules:
  - Preserve coat silhouette, thick rectangular glasses shape, shoulder tool pod geometry, and short neat evenly distributed dark-to-silver stubble across all scenes
  - Keep palette restrained to white, neutral grays, GitHub green accents, and small Copilot-purple accents
  - Depict behavior as investigate -> delegate -> verify with one clear visual metaphor per scene
  - Keep Purrmission (the black cat companion) proportions and collar tag details consistent in every recurring appearance
  - Keep the coat/body-rig deployment points stable, but show only the task-specific gadget currently invoked
  - Treat deployed mechanical gadgets as callable skills and external software-agent presences as collaborators; never visually merge the two concepts
  - Keep Mergewell visibly human and accountable for delegation, decisions, and verification; he is a human investigative agent, not a software agent
  - Personify Ask, Plan, and Agent behavior as software-agent collaborators only as a teaching metaphor, not as literal product architecture
  - Do not use any Inspector Gadget names, likeness cues, catchphrases, or copied compositions
referenceImages:
  - content/characters/agent-mergewell/references/agent-mergewell-persona-goofy-nohat-candidate.png
status: draft
---

# Agent Mergewell

Agent Mergewell is the workshop's original character for explaining modern GHCP workflows with a light detective tone.

## Persona
- Optimistic and witty under pressure
- A human field agent who directs specialist software agents, delegates deliberately, and synthesizes their evidence
- Evidence-first engineer who verifies before claiming completion
- Delegates deliberately to specialist agents, then synthesizes outcomes
- Treats failed attempts as useful signal and adjusts quickly
- Lovable "professor-inventor" energy that feels protectable, humble, and earnest

## Voice and tone (for mission briefings, narration, and slides)

Agent Mergewell speaks like a veteran field detective who is also slightly distracted by his own gadgets. His voice is warm, dramatic, and self-aware — he knows he's a bit over the top and leans into it. Key patterns:

- **Opens with a scene**: sets up a relatable engineering problem before naming the mission
- **References Purrmission** as a straight-laced safety counterweight to his enthusiasm — she judges silently, but helps anyway
- **Uses deployable mechanical gadgets** for callable skill selection ("I once deployed the wrong skill gadget")
- **Earnest over clever**: jokes land because he means them, not because he's performing
- **Ends with a wink**: signs off with confidence laced with self-deprecation ("Good luck. Don't break anything I can't fix.")

**Sample voice lines:**
- *"Theory portion — complete. My gadget-body tells me your context windows are primed."*
- *"A good agent knows their own blast radius."*
- *"Purrmission has not let me forget it."*
- *"She will judge you silently but still help."*
- *"This is not hypothetical. This is Tuesday."*

**Mission naming convention for ghcp-dev-hack:**
- Format: `Case File Ω-[N]: Operation [Name]` where the operation name is 2-3 words, evocative, and tied to the topic
- Examples: *Know Your Terrain*, *The Right Gadget*, *Follow the Credits*, *Clear the Board*
- Operations should feel like real detective case files — serious name, absurd backstory

## What he looks like
- Average-height adult with a practical "field engineer" silhouette, never a parody costume
- Charcoal technical coat (mid-thigh), dark trousers, comfortable motion-friendly shoes
- Compact shoulder tool pod with modular attachments, plus a minimal utility belt
- Mostly concealed mechanical deployment points at wrist, forearm, shoulder, and coat; one task-specific gadget appears when a skill is invoked
- External software-agent presences remain visually separate and represent collaborators he can question, plan with, or delegate to
- Thick rectangular glasses, wild Einstein-inspired inventor hair silhouette with dark-to-silver tones, light tan skin tone, expressive face, short neat evenly distributed dark-to-silver stubble appropriate to an adult field agent, and a warm eccentric demeanor
- Often accompanied by Purrmission, a sleek black cat teammate who appears during clue review and verification beats

## Canon image set (for continuity)
1. **Hero Front** (`references/agent-mergewell-persona-goofy-nohat-candidate.png`): neutral standing pose, direct eye line, full outfit visible. Use it as review guidance for identity, face proportions, glasses, hair, coat silhouette, rig, and demeanor; it does not pixel-lock the character, and its moustache/goatee does not control facial-hair continuity. The written short-stubble trait is authoritative.
2. **Investigation Pose** (to be created): three-quarter angle, reviewing repo-map cards and evidence stickies.
3. **Delegation Pose** (to be created): hand gesture sending task cards to floating agent panels.
4. **Orchestration Conversation** (to be created): Mergewell directing distinct Ask-, Plan-, and Agent-behavior collaborators while one mechanical skill gadget deploys from his coat/body rig.
5. **Verification Pose** (to be created): checking checklist/results board with a confident confirmation expression.
6. **Companion Pose** (to be created): Agent Mergewell with Purrmission beside an evidence board to reinforce continuity.
7. **Motion Keyframe Pair** (to be created): first-frame investigate and final-frame verify for short continuity clips.

## Named skill gadgets

These are playful workshop display names for custom instruction/workflow skills that developers could build. They are not built-in GitHub product features, and generated artwork must keep their names as native Slidev labels.

- **Clue Wrangler (`clue-wrangler`):** Select supplied evidence against an explicit objective and return an include/exclude manifest. Visual gadget: compact forearm sorting carousel.
- **Case Condenser (`case-condenser`):** Turn supplied, verified evidence into a structured handoff containing objective, decisions, current files, open questions, and next steps. Visual gadget: folding coat-pocket case folio.
- **Fresh Lead (`fresh-lead`):** Prepare a clean-session kickoff packet containing current objective, references, constraints, and validation checklist. Visual gadget: shoulder-mounted evidence pointer that illuminates the next bounded trail.

None of these skills can inspect hidden model state, tokenize content, resize a context window, perform host-managed compaction, or create/reset a session without an authorized host tool.

## Prompt block for image/video generation
Use this style block in prompts:

> Human-centered 2D editorial cartoon on clean soft off-white background, original human field-agent character Agent Mergewell, an investigative human rather than a software agent, mid-length charcoal technical coat with green seam accents, compact concealed mechanical tool rig, thick rectangular glasses, wild Einstein-inspired inventor hair silhouette with dark-to-silver tones, light tan skin tone, short neat evenly distributed dark-to-silver stubble appropriate to an adult field agent, one task-specific mechanical skill gadget deploying from his coat, wrist, forearm, or shoulder while other mechanisms remain concealed, endearing eccentric professor-inventor demeanor, clean rounded outlines, flat color with minimal shadows, restrained palette (off-white, neutral gray, GitHub green accents, Copilot purple accents), clear negative space, no logos, no mascots.

When needed, append:

> Include Purrmission, Agent Mergewell's recurring black cat companion with bright observant eyes and a minimal green collar tag, rendered in the same clean editorial style.

## Negative constraints
- No Inspector Gadget likeness or signature costume cues
- No Inspector Gadget catchphrases, signature gadget designs, or copied reveal actions
- No direct Albert Einstein likeness or portrait recreation
- No moustache, goatee, shaped beard, long beard, heavy beard, patchy facial hair, full beard, or changing facial-hair style
- No mascot-style characters (Octocat, Copilot mascot, or similar)
- No copied frames/compositions from existing film/TV/cartoon properties
- No cluttered backgrounds or dense decorative props that reduce instructional clarity

## Style-lock techniques for consistent animated artifacts
1. **Linework lock:** Keep outlines in a narrow thickness band with rounded caps; avoid sketch/noise lines.
2. **Shape grammar:** Favor rounded geometric forms for character and props; reserve sharp angles for focal contrast only.
3. **Palette control:** Use restrained neutrals with small GitHub-green and Copilot-purple accents; reject off-palette drift.
4. **Lighting model:** Flat fills plus one soft shadow pass; avoid heavy gradients and glossy reflections.
5. **Background rule:** Soft off-white clean stage with minimal grounding shadow to preserve readability.
6. **Pose cadence:** Reuse canonical beats `investigate -> delegate -> verify` for narrative continuity.
7. **Camera framing:** Prefer medium and three-quarter shots with low distortion for instructional clarity.
8. **Motion profile:** Short clips, smooth ease-in/out timing, restrained secondary motion, no chaotic camera moves.
9. **Continuity tokens:** Always preserve thick rectangular glasses, wild inventor hair silhouette, short neat evenly distributed dark-to-silver stubble, coat seam accents, cat collar tag, and core prop kit.
10. **Prompt template discipline:** Keep fixed style and negative blocks; vary only pose, action, emotion, and prop focus.

## Quality-control checklist
- Character silhouette matches approved glasses, coat, and shoulder pod
- Hair remains wild dark-to-silver inventor style and skin tone remains light tan across all approved assets
- Facial hair remains short, neat, evenly distributed dark-to-silver stubble; reject moustaches, goatees, shaped, long, heavy, patchy, or full beards and any changing facial-hair style
- Purrmission appears consistent when included
- Keep skill names and software-agent role labels as native Slidev overlays; generated gadgets and agents remain text-free
- No extra limbs/fingers or malformed anatomy
- No logo misuse, mascots, or copyrighted character likeness
- Scene remains uncluttered with one primary instructional metaphor
