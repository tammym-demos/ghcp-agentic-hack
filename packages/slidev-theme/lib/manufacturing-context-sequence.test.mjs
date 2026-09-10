import { test } from "vitest";
import assert from "node:assert/strict";
import { BEATS, DURATION, layersFor, motionFor, promptStackFor } from "./manufacturing-context-sequence.mjs";

test("manufacturing sequence has nine bounded beats and stable final states", () => {
  assert.equal(BEATS.length, 10);
  assert.equal(DURATION, 4000);
  for (let step = 1; step <= 9; step++) {
    assert.equal(motionFor(step, 400, true).headlineVisible, step !== 3 && step !== 4);
    const rest = motionFor(step, DURATION, false);
    assert.equal(rest.headlineVisible, false);
    assert.equal(rest.oldExampleOpacity, 0);
    assert.equal(rest.newExampleOpacity, 1);
    assert.deepEqual(rest, motionFor(step, 60_000, false));
  }
  assert.equal(motionFor(0, DURATION, false).blur, 0);
});

test("prompt reveal, retained stack, fade and compact summary remain observable", () => {
  for (const t of [0, 600, 3000]) assert.equal(promptStackFor(2, 1, t, true).opacity, 0);
  const reveal = promptStackFor(2, 1, 3300, true);
  assert(reveal.opacity > 0 && reveal.opacity < 1);
  assert(reveal.cards[0].opacity > 0 && reveal.cards[0].opacity < 1);
  assert.deepEqual(promptStackFor(4, 3, DURATION, false).cards.map(c => c.opacity), [.78, .86, 1]);
  const fading = promptStackFor(5, 4, 600, true);
  assert(fading.opacity > 0 && fading.opacity < 1);
  assert.equal(fading.cards.length, 3);
  assert.equal(promptStackFor(5, 4, DURATION, false).opacity, 0);
  const summary = promptStackFor(9, 8, DURATION, false);
  assert.equal(summary.opacity * summary.summary.opacity, 1);
  assert.equal(summary.summary.example.join(" "), "Summary of earlier user prompts");
  assert.equal(summary.cards.length, 0);
  assert.equal(promptStackFor(9, 8, 3100, true).summary.opacity, 0);
  assert.equal(promptStackFor(9, 8, 3550, true).summary.opacity, 1);
});

test("compression retains instructions and references without depositing output headroom", () => {
  assert.deepEqual(layersFor(8), layersFor(7));
  assert.deepEqual(layersFor(9, 1, 0), layersFor(8));
  for (const progress of [.1, .5, .9, .998]) {
    const layers = layersFor(9, 1, progress);
    const prompts = layers.filter(l => l.id.startsWith("user-prompts")).sort((a, b) => a.top - b.top);
    assert.deepEqual(layers.find(l => l.id === "instructions"), layersFor(8).find(l => l.id === "instructions"));
    assert.equal(prompts.at(-1).bottom, 500);
    assert(prompts[0].top >= layers.find(l => l.id === "references").bottom);
    for (let i = 1; i < prompts.length; i++) assert.equal(prompts[i - 1].bottom, prompts[i].top);
    assert(prompts.every(p => p.opacity === 1));
  }
  const final = layersFor(9, 1, 1);
  assert.deepEqual(final.map(l => l.id).sort(), ["instructions", "prompt-summary", "references"]);
  assert.equal(final.find(l => l.id === "prompt-summary").top, 446);
  assert.equal(final.find(l => l.id === "prompt-summary").bottom, 500);
});
