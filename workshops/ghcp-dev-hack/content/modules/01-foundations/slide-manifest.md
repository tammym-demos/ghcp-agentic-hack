# Foundations 24-slide generation manifest

**Status:** Human-approved contract implemented on 2026-08-05; integrated visual/content readiness approved on 2026-08-06. The workshop owner approved the post-release mission refresh on 2026-08-07 and the slide 22 chained-video replacement on 2026-08-09 while preserving the 24-slide count and title order.

| # | Minutes | Source | Topic | Type | Exact source title | Visual |
|---:|---:|---|---|---|---|---|
| 1 | 1 | Part 1 H1; character contract | Foundations opening | Cover | GitHub Copilot Foundations | Approved still + native Microsoft overlay |
| 2 | 1 | Parts 1-2 agendas; module timing | Timed route | Agenda | Session Agenda | Approved still |
| 3 | 1 | Part 1 section 1; FND-01 | Copilot surfaces | Content | Where Copilot Lives | Approved still |
| 4 | 1 | FND-01; verified App treatment | Cross-context synthesis | Content | Copilot App: An Agent-native desktop | Approved still |
| 5 | 2 | Module operating model | Harness boundaries | Content | What is a Harness? | Approved still |
| 6 | 2 | Part 1 section 1; FND-02 | Editor grounding | Content | VS Code Chat | Approved still + official native overlay |
| 7 | 2 | Part 1 section 1; FND-03-FND-05 | Terminal assistance | Content | Copilot CLI in your terminal | Approved still |
| 8 | 3 | Part 1 section 1; FND-14 | Enterprise boundaries | Safety | Enterprise Data and Policy Boundaries | Approved still |
| 9 | 2 | Part 1 safety; FND-13-FND-14 | Human review | Safety | Human Accountability for AI-Assisted Code | Approved still |
| 10 | 20 | Part 1 section 2; FND-06-FND-07 | Interaction modes | Content | Built in Agents | Approved still |
| 11 | 3 | Part 2 section 3; FND-08 | Input usage | Content | Tokens: What Enters the Model | Approved still |
| 12 | 3 | Part 2 section 3; FND-08 | Output usage | Content | Tokens: What Comes Back | Approved still |
| 13 | 3 | Part 2 section 3; FND-08-FND-09 | AI-credit accounting | Content | GitHub AI Credits | Approved still |
| 14 | 3 | Part 2 section 3; FND-10; accepted Scene 09 | Routing evidence | Content | Model Routing: Match the Task | Approved static plate + deterministic native 12-second replay |
| 15 | 2 | Model Guide contract; supported models; model comparison | Workload guide | Table | Model Guide: Match the Workload | Native two-column table |
| 16 | 3 | FND-04-FND-05; FND-11 | IDE and CLI evidence | Content | Usage by Harness: IDE and CLI | Native diagram |
| 17 | 3 | FND-01; FND-07; FND-11 | GitHub, cloud, and App evidence | Content | Usage by Harness: GitHub, Cloud, and App | Approved still |
| 18 | 3 | Part 2 section 4; FND-12 | Bounded context | Content | Context Window: What Competes for Space | Approved still |
| 19 | 3 | FND-04; FND-12 | Selective packing | Content | Context Packing: Keep the Signal | Approved still |
| 20 | 3 | Part 2 section 4; FND-12 | Observable drift | Content | Context Rot: Recognize the Signals | Approved still |
| 21 | 3 | Part 2 section 4; FND-12 | Host recovery | Content | Context Recovery: Reset and Re-anchor | Approved still |
| 22 | 5 | Accepted Scene 10; FND-12; video provenance | Verified context lifecycle | Summary | Context Lifecycle: Pack, Detect Drift, Recover | Approved poster + `context-window-lifecycle` click-to-play video with audio |
| 23 | 3 | Part 2 section 4; FND-13 | Delegation boundary | Safety | Least-Privilege Delegation | Approved still |
| 24 | 45 | Part 2 mission marker; mission artifact | Mission launch | Mission | Your Mission Starts Now | Approved still |

## Timing arithmetic

- Opening and agenda: slides 1-2 = `1 + 1 = 2` instruction minutes.
- Surfaces and trust: slides 3-9 =
  `1 + 1 + 2 + 2 + 2 + 3 + 2 = 13` instruction minutes.
- The opening, agenda, surfaces, and trust route remains
  `2 + 13 = 15` minutes, preserving Part 1 section 1 coverage.
- Interaction modes: slide 10 = `20` minutes.
- Economics and routing: slides 11-17 =
  `3 + 3 + 3 + 3 + 2 + 3 + 3 = 20` minutes.
- Context and delegation: slides 18-23 =
  `3 + 3 + 3 + 3 + 5 + 3 = 20` minutes. Slide 22 contains four
  instruction minutes plus the module's one declared media-playback minute.
- Teaching path: `2 + 13 + 20 + 20 + 20 = 75` minutes, reconciling to
  `74` instruction minutes plus `1` media-playback minute in `module.md`.
- Mission: slide 24 = the separate `45`-minute mission.
- Module: `75 + 45 = 120` minutes.

## Contract notes

- Preserve this exact count and title order.
- Slide 14 uses the approved promoted static plate with deterministic native overlays. Its raster pixels and camera remain locked; the replay runs for exactly 12 seconds on deliberate slide entry and renders its final teaching state immediately under reduced motion.
- Slide 22 reuses the approved Context static plate as its poster and requires presenter-controlled playback of `context-window-lifecycle`. It plays with audio, does not autoplay or loop, and stops on the final frame.
- Slide 10 is one runnable 20-minute instruction block, not 20 minutes of
  uninterrupted narration. Follow the exact bounded `field-notes.js`
  Ask/Plan/Agent requests and host/configuration caveats in Part 1's
  `Current slide 10 delivery handoff`. Protect this sequence:
  `2 setup + 3 Ask + 4 Plan + 2 human plan decision + 4 bounded Agent +
  3 diff/check review + 2 debrief/restore = 20` minutes. The producer must
  script the human checkpoints and fallback without changing visible slide
  text or expanding product claims.
- Every visible slide requires exactly one immediately following
  source-mapped speaker-notes HTML comment with these sections in order:
  `Timebox:`, `Talk track:`, `Transition:`, `Audience question:`,
  `Response guidance:`, `Payoff:`, and `Sources:`.
- Each `Timebox:` must equal that row's authoritative `Minutes` value,
  including zero-minute slides. Every slide requires a natural,
  slide-specific audience question, response guidance, and payoff.
- All labels, commands, numbers, rates, model names, caveats, and decisions remain native HTML.
