# Standalone source and provenance

Reviewed 2026-09-09. Baseline `bd3beae`, initiative base `f773ac4`.
Authority: `content/production/decision-log.md`,
`scope-content-story-token-cache-cli-motion-v1`, and the complete bounded
`content/production/token-cache-cli-motion/plan.md`. No live contract change.

## Two-slide contract

| # | Exact title | Notes minutes | Continuous motion |
|---|---|---:|---:|
| 1 | Same conversation. Different reuse. | 2 | 60 seconds |
| 2 | A miss is not always deletion. | 1 | 25 seconds |

Three minutes suggested narration; 85 seconds motion overlaps narration.
No allocation to the live Foundations schedule. Play/Replay is local to the
display window. Disabled during playback; no click stops, loops or pause.
Leaving either slide cancels and resets; reentry is Ready. Reduced motion
immediately shows the full final state, including after Replay.

Slide 1 presents a **simulated Copilot CLI**, not a recreated product UI or
an execution transcript. The selector is an illustrative native readout,
not an interactive model-selection control. Prompts are prose, not invented
exact real CLI commands. Responses are authored excerpts, never executed.
The explanatory token inventory is not a measured tokenizer output.

`sequence.mjs` is the exact accounting authority in this proof. Units are
tokens and integer microdollars. Rates: USD 2 uncached input, 0.20 cached
input, 8 output per million, identical for A and B. Input includes cached
tokens once. Per-turn costs: .01040, .00280, .01100. Intermediate totals:
.01040, .01320, .02420. Final category costs: .01820 uncached, .00080 cached,
.00520 output. Final tokens: input 13100 = cached 4000 + uncached 9100;
output 650.

Input categories (instructions, tool definitions, repo context, conversation,
new prompt): [600,800,2400,0,200], [600,800,2400,500,100],
[600,800,2400,800,100]. In turn 2 the conversation includes the prior prompt
(200) and answer (300); the fresh 400-token tail is that answer plus new
prompt. Turn 3 includes another 50 illustrative conversation/context tokens
beyond the preceding answer and prompt, not visible excerpt character counts.
These are explanatory categories, not a claim about the provider's serialized
ordering. The follow-up assumes an unchanged eligible 4000-token prefix.
Model B retains text but cannot reuse A state **in this simulation**;
the diagram makes no deletion or universal cross-model architecture claim.

Prompt typing: first 4 seconds of each 20-second turn. Streamed excerpt:
seconds 7–14. Ledger and after-prefix settle at second 16; 4-second reading
hold before the next turn. Last turn holds at 60 seconds indefinitely.
Six causes appear at 3.5-second intervals, all present at 21 seconds, and
hold at 25 seconds indefinitely. Native text is not embedded in imagery.

## External claim verification

- **Title:** Prompt caching
- **Publisher/type:** OpenAI, authoritative API documentation
- **URL:** https://platform.openai.com/docs/guides/prompt-caching
- **Access:** successful HTTPS retrieval with installed `curl.exe -L --fail
  --silent`, reviewed 2026-09-09. No build-time or runtime research dependency.
- **Paraphrase:** caching reuses intermediate processing state for an unchanged
  beginning, not the answer. Lookup needs an eligible matching prefix, a
  compatible model/serving context and a retained entry. Routing and scope can
  prevent hits. Current document distinguishes model generations and their
  eligibility boundaries and retention policies. Its cache-location discussion
  identifies machine-local state, routing, organization and regional boundaries.
- **Caveats:** not GitHub Copilot billing or telemetry documentation. Do not
  import its specific TTLs, minimum lengths, discounts, model names or API
  controls into this scenario. Those are model/provider-dependent and may
  change. No universal “new chat = cold,” “append = reset,” or “miss = deletion.”
  Earlier unchanged eligible portions or older retained variants may still
  match. Compaction/rebuilding can change the prefix, rather than necessarily
  deleting state. Retention/eviction can remove availability by a different
  mechanism. No live cache hit is demonstrated.

## Reuse declaration (standalone only)

`public/cli-controlled-action.png` and `.png.json` are byte-identical local
preview copies of `assets/images/foundations/cli-controlled-action.png`
and its approved provenance sidecar. Original 1792×1024; uniform full-image
display at 302×173, no crop, regeneration, compositing or promotion.
Sidecar: approved, created 2026-08-04, historical provider `gpt-image-2`;
source prompt `content/modules/01-foundations/media/prompts/images/cli-controlled-action-v3.txt`.
Existing live slide 7 uses this approved art. Human Mergewell and Purrmission
remain separate from the model and its processing state.

Read references: `../art-direction.md` Warm Editorial Anchor B;
`content/characters/agent-mergewell/character.md`; `../module.md`,
`../slide-manifest.md`, `../context-caching.md`; prior `../n3-proof` and
`../review` browser infrastructure; shared ghcp layout; the native-animation
recipe and both specified lessons. No production metadata edited.

Mona Sans is requested with the established Segoe UI/Arial fallback; no
licensed redistributable Mona Sans font is available locally. No font was
downloaded or bundled. CDP painted-font evidence must distinguish actual
Segoe UI from the requested Mona Sans. Prompt/excerpt uses installed Consolas.
Exact Mona Sans appearance remains an unresolved environment dependency,
not a silently approved substitution or portable visual acceptance.
