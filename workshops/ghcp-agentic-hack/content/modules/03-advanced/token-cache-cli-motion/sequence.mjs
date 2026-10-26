export const duration = 60000;
// Integer tenths of a microdollar per token; also the exact USD / 1M display rates.
const rateTenths = Object.freeze({ uncached: 20, cached: 2, output: 80 });
export const rates = Object.freeze(Object.fromEntries(Object.entries(rateTenths).map(([key, value]) => [key, value / 10])));
export function costs({ uncached, cached, output }) {
  const result = {};
  for (const [key, tokens] of Object.entries({ uncached, cached, output })) {
    const tenths = tokens * rateTenths[key];
    if (!Number.isSafeInteger(tenths) || tenths < 0 || tenths % 10)
      throw new RangeError('Scenario costs must be exact non-negative integer microdollars');
    result[`${key}Cost`] = tenths / 10;
  }
  return { ...result, cost: result.uncachedCost + result.cachedCost + result.outputCost };
}
export const turns = [
  { name: 'Cold request', model: 'Model A', input: 4000, cached: 0, output: 300,
    parts: [600, 800, 2400, 0, 200],
    prompt: 'Explain workshop validation before build.',
    response: 'Validate the content contract first. Then build the deck and review its rendered routes.',
    before: 'No eligible prefix in this simulation.',
    after: 'A: 4,000-token prefix established for the follow-up.' },
  { name: 'Follow-up', model: 'Model A', input: 4400, cached: 4000, output: 150,
    parts: [600, 800, 2400, 500, 100],
    prompt: 'Which checks catch a missing slide file?',
    response: 'Check the declared slide path and file existence. Run content validation before the build.',
    before: 'A: same eligible 4,000-token beginning + 400 fresh.',
    after: 'A: reuse 4,000; process the 400-token fresh tail.' },
  { name: 'Model switch', model: 'Model B', input: 4700, cached: 0, output: 200,
    parts: [600, 800, 2400, 800, 100],
    prompt: 'Summarize this as a checklist.',
    response: '• Confirm slide paths. • Validate content. • Build. • Inspect rendered routes and assets.',
    before: 'A → B: conversation text retained; no A-state reuse.',
    after: 'B: 4,700 processed; text retained; A cache not deleted.' },
].map(t => ({ ...t, uncached: t.input - t.cached }));
// Integer microdollars: no floating-point accumulation or cached-input duplication.
export function ledger(count) {
  const total = turns.slice(0, count).reduce((a, t) => {
    for (const k of ['input', 'cached', 'uncached', 'output']) a[k] += t[k];
    return a;
  }, { input: 0, cached: 0, uncached: 0, output: 0 });
  return { ...total, ...costs(total) };
}
export const usd = micro => (micro / 1e6).toFixed(5);
export function frame(ms, reduced = false) {
  const elapsed = reduced ? duration : Math.max(0, Math.min(duration, ms));
  const index = Math.min(2, Math.floor(elapsed / 20000));
  const local = elapsed - index * 20000;
  return { elapsed, index, local, completed: Math.min(3, Math.floor((elapsed + 4000) / 20000)),
    promptFraction: Math.min(1, local / 4000),
    responseFraction: Math.max(0, Math.min(1, (local - 7000) / 7000)), done: elapsed === duration };
}
export function reset(reduced = false) { return frame(0, reduced); }
export function causeCount(ms, reduced = false) { return reduced ? 6 : Math.min(6, Math.max(0, Math.floor(ms / 3500))); }
