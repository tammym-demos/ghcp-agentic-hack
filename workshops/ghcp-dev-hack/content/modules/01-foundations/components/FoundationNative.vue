<script setup lang="ts">
import { nextTick, ref } from "vue";
import { onSlideEnter, useNav } from "@slidev/client";
import N3Comparison from "../n3-proof/components/N3Comparison.vue";
import { navigateFromControl as navigateControl } from "./control-navigation.mjs";

const props = defineProps<{ scene: "T1" | "E1" | "N1" | "T2" | "T3" | "E2" | "N2" | "N3" }>();
const page = ref(0);
const back = ref<HTMLButtonElement>();
const nav = useNav();
onSlideEnter(() => { page.value = 0; });
async function show(value: number) {
  page.value = value;
  await nextTick();
  back.value?.focus();
}
function navigateFromControl(event: KeyboardEvent) {
  navigateControl(event, nav);
}
const hasDetails = ["N1", "T3", "E2", "N2"].includes(props.scene);
const receipt = [
  ["New input", "2,000", "4,000", "6,000"],
  ["Reused input", "0", "8,000", "8,000"],
  ["Cache write, where reported", "8,000", "0", "8,000"],
  ["Total input", "10,000", "12,000", "22,000"],
  ["Generated output", "500", "600", "1,100"],
  ["Reported reasoning, already inside output", "100", "150", "250"],
];
</script>

<template>
  <div class="foundation-native-frame" :class="`foundation-native-frame--${scene.toLowerCase()}`">
    <N3Comparison v-if="scene === 'N3'" />
    <div v-else class="context-sheet" :data-scene="scene" :data-view="page ? `details-${page}` : 'main'">
      <div :id="`context-body-${scene}`" class="context-body">
        <template v-if="scene === 'T1'">
          <div class="at t1-input">
            <div class="native-line strong" data-check>The host assembles what is<br>actually included.</div>
            <div class="native-line" data-check>System prompt / harness instructions</div>
            <div class="native-line" data-check>User prompt</div>
            <div class="native-line" data-check>Applicable repository instructions</div>
            <div class="native-line" data-check>Selected files / selection</div>
            <div class="native-line" data-check>Included conversation history</div>
            <div class="native-line" data-check>Included tool information / results</div>
          </div>
          <img class="t1-plate" src="/images/token-input-handoff.png"
            alt="Unchanged approved illustration of the harness input boundary; not hidden model internals">
          <div class="at t1-caption small">
            <div data-check>Harness / product context → Model boundary</div>
            <div data-check>Not visibility into hidden model internals</div>
          </div>
          <div class="at t1-example small">
            <div data-check>Community event · outdoor · rain · 100 guests</div>
            <div data-check>What supplies should we bring?</div>
            <div data-check>rain → ID 17 (illustrative tokenizer example)</div>
          </div>
        </template>

        <template v-else-if="scene === 'E1'">
          <div class="at full intro" data-check>rain expected</div>
          <table class="native-table e1-table">
            <thead><tr><th>Text piece</th><th>ID</th><th>Numeric representation</th></tr></thead>
            <tbody>
              <tr><td><span class="exact-space" data-check>rain</span></td><td data-check>17</td><td data-check>[0.2, -0.4, 0.7]</td></tr>
              <tr><td><span class="exact-space" data-check> expected</span></td><td data-check>904</td><td data-check>[-0.1, 0.6, 0.3]</td></tr>
            </tbody>
          </table>
          <div class="at e1-space" data-check>leading space shown</div>
          <div class="at full e1-definitions">
            <div data-check>ID = entry number</div>
            <div data-check>Numeric representation = learned list of numbers</div>
          </div>
          <div class="at full e1-conclusion strong" data-check>IDs do not rank meaning.</div>
        </template>

        <template v-else-if="scene === 'N1'">
          <template v-if="!page">
            <img class="n1-plate" src="/images/n1-context-caching-accountability.png"
              alt="Agent Mergewell reviews two leaves of an event folio while synthetic collaborator Riley returns separate evidence. The rain leaf shows a wet uncovered table; the sunny leaf shows unshaded seating. Native labels compare the two requests and show select, append, and repeat.">
            <div class="n1-node at" style="left:48px" data-check>Numeric<br>representations</div>
            <div class="n1-node at" style="left:268px" data-check>Context-dependent<br>layers</div>
            <div class="n1-node at" style="left:488px" data-check>Next-token<br>scores</div>
            <div class="n1-node at" style="left:708px" data-check>Select → append<br>→ repeat</div>
            <svg class="n1-mechanism" viewBox="24 120 912 52" aria-label="Static select, append and repeat path with earlier positions, one appended position and one waiting next position">
              <defs>
                <marker id="n1-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L6 3 L0 6 Z" />
                </marker>
              </defs>
              <path d="M146 124 H366" marker-end="url(#n1-arrow)" />
              <path d="M366 124 H586" marker-end="url(#n1-arrow)" />
              <path d="M586 124 H810" marker-end="url(#n1-arrow)" />
              <path d="M586 124 H810 H928 V150 H850" marker-end="url(#n1-arrow)" />
              <path class="n1-return" d="M850 150 V168 H32 V124 H366" marker-end="url(#n1-arrow)" />
              <path d="M770 150 H900" />
              <circle class="n1-earlier" cx="786" cy="150" r="3" />
              <circle class="n1-earlier" cx="806" cy="150" r="3" />
              <circle class="n1-earlier" cx="826" cy="150" r="3" />
              <rect class="n1-appended" x="846" y="146" width="8" height="8" />
              <circle class="n1-next" cx="882" cy="150" r="4" />
            </svg>
            <div class="at n1-shared strong" data-check>Two separate requests: only the forecast changes</div>
            <div class="at n1-facts" data-check>Community event · outdoor · 100 guests</div>
            <div class="at n1-question strong" data-check>What supplies should we bring?</div>
            <div class="at n1-weather strong n1-rain" data-check>Rain — separate request</div>
            <div class="at n1-weather strong n1-sunny" data-check>Sunny — separate request</div>
            <div class="at n1-output n1-rain" data-check>Illustrative response start</div>
            <div class="at n1-response strong n1-rain" data-check>Bring rain covers…</div>
            <div class="at n1-output n1-sunny" data-check>Illustrative response start</div>
            <div class="at n1-response strong n1-sunny" data-check>Bring sun shades…</div>
            <div class="at n1-legend" data-check>Schematic positions—not whole-word splits</div>
          </template>
          <div v-else class="at full reference">
            <div class="strong native-line" data-check>Details — inference, not training</div>
            <div class="reference-paragraph" data-check>This uses trained weights. It does not train a new model for each question.</div>
            <div class="reference-paragraph" data-check>A later token does not rewrite earlier states in the same causal pass.</div>
          </div>
        </template>

        <template v-else-if="scene === 'T2'">
          <div class="at left t2-copy">
            <div class="strong native-line" data-check>Illustrative visible replies</div>
            <div class="reference-paragraph" data-check>A: Bring covers.</div>
            <div class="reference-paragraph" data-check>B: Bring covers; confirm the quantities for 100 guests and list what is still unknown.</div>
            <div class="strong reference-paragraph" data-check>Check requirements and unknowns</div>
          </div>
          <div class="at right t2-copy">
            <div class="strong native-line" data-check>Separate synthetic report—not counts of A or B</div>
            <div class="reference-paragraph" data-check>Generated output: 500 tokens</div>
            <div class="within-output" data-check>Reported reasoning: 100 tokens within the 500</div>
            <div class="reference-paragraph" data-check>Other non-visible structure may count</div>
          </div>
          <div class="at full t2-conclusion strong" data-check>Enough evidence for review—not the shortest answer</div>
        </template>

        <template v-else-if="scene === 'T3'">
          <template v-if="!page">
            <div class="credit-category at left" style="top:116px" data-check>Ordinary input</div>
            <div class="credit-category at right" style="top:116px" data-check>Cache read</div>
            <div class="credit-category at left" style="top:176px" data-check>Cache write where applicable</div>
            <div class="credit-category at right" style="top:176px" data-check>Generated output</div>
            <div class="at full t3-units">
              <div data-check>1M tokens = 1,000,000 tokens</div>
              <div data-check>1 AI credit = $0.01 USD under documented applicable usage-based billing</div>
            </div>
            <div class="at full t3-guards">
              <div data-check>Different categories can have different rates.</div>
              <div data-check>Plan, organization, discounts, legacy billing and rounding affect interpretation.</div>
              <div data-check>Reasoning already inside output is not another additive charge.</div>
            </div>
          </template>
          <div v-else class="at full reference">
            <div class="strong native-line" data-check>Details — categories and matched rates</div>
            <div class="reference-paragraph" data-check>(U × pU + R × pR + W × pW + O × pO) / 1,000,000</div>
            <div class="reference-paragraph" data-check>Use matched rates in USD per million tokens.</div>
            <div class="reference-paragraph" data-check>A write rate is the whole category rate, not ordinary input plus write again.</div>
            <div class="reference-paragraph" data-check>CLI github.copilot.cost is a multiplier, not dollars.</div>
            <div class="reference-paragraph" data-check>nano_aiu has no established AI-credit conversion here.</div>
          </div>
        </template>

        <template v-else-if="scene === 'E2'">
          <template v-if="!page">
            <p class="receipt-kicker" data-check>Synthetic example — not performed calls</p>
            <table class="receipt" aria-describedby="receipt-explanation receipt-footer">
              <caption class="sr-only">Synthetic usage receipt for requests A and B</caption>
              <thead><tr><th scope="col">What was counted</th><th scope="col">Request A</th><th scope="col">Request B</th><th scope="col">A + B</th></tr></thead>
              <tbody><tr v-for="row in receipt" :key="row[0]">
                <th scope="row" data-check>{{ row[0] }}</th>
                <td v-for="(value, i) in row.slice(1)" :key="i" data-check>{{ value }}</td>
              </tr></tbody>
            </table>
            <aside id="receipt-explanation" class="receipt-review">
              <strong data-check>Read each category once.</strong>
              <span data-check>For B, <code>4,000 + 8,000 + 0 = 12,000</code> input. The 8,000 reused tokens are already part of that total. The 150 reasoning tokens are already part of the 600 output tokens.</span>
            </aside>
            <p id="receipt-footer" class="scene-footer" data-check><strong>A + B is accumulated request usage, not the current context-window size. Missing fields mean unknown, not zero.</strong></p>
          </template>
          <div v-else-if="page === 1" class="at full reference">
            <div class="strong native-line" data-check>Request details</div>
            <div class="reference-paragraph" data-check>A: Event brief + supplies question</div>
            <div class="reference-paragraph" data-check>B: Eligible retained beginning + new material</div>
            <div class="reference-paragraph" data-check>Synthetic counts represent larger host requests, not this short question.</div>
            <div class="reference-paragraph" data-check>One human turn may use several model requests.</div>
            <div class="reference-paragraph" data-check>An A write is not a hit. Count parent totals or child turns, not both.</div>
            <div class="reference-paragraph" data-check>Output minus reasoning does not prove visible-text usage. Never pad a request to manufacture the example.</div>
          </div>
          <div v-else class="at full reference">
            <div class="strong native-line" data-check>Provider-field details</div>
            <div class="reference-paragraph" data-check>OpenAI-style total input includes reported read/write subsets where present. Subtract them to find ordinary input.</div>
            <div class="reference-paragraph" data-check>Claude-style input_tokens is ordinary input. Add separate read/creation fields once to normalize total input.</div>
            <div class="reference-paragraph" data-check>Absent fields are unknown, not zero.</div>
            <div class="reference-paragraph" data-check>Provider fields are not proof of this host's exposed counters.</div>
          </div>
        </template>

        <template v-else-if="scene === 'N2'">
          <template v-if="!page">
            <div class="reuse-grid">
              <section class="reuse-card">
                <h2 data-check>Earlier request</h2>
                <ul>
                  <li data-check>Community event, outdoors, rain expected, 100 guests</li>
                  <li data-check>“What supplies should we bring?”</li>
                  <li data-check>Earlier illustrative reply retained in the conversation</li>
                </ul>
              </section>
              <section class="reuse-card">
                <h2 data-check>Continuing request</h2>
                <ul>
                  <li data-check>The same earlier material</li>
                  <li data-check>New question: “What should we tell the volunteers?”</li>
                  <li data-check>New illustrative reply: “Tell volunteers that the outdoor event is planned for 100 guests and rain is expected.”</li>
                </ul>
              </section>
            </div>
            <p class="human-takeaway" data-check><strong>Human takeaway:</strong> A service may reuse work already done for the identical beginning of a request. It still processes the new material and creates a new reply. Reuse is not retrieval of the old answer.</p>
            <p class="scene-footer" data-check><strong>Reuse is conditional. Reused context still takes context-window space. The new reply is illustrative, not verified.</strong></p>
          </template>
          <div v-else class="at full reference">
            <div class="strong native-line" data-check>Reuse details</div>
            <div class="reference-paragraph" data-check>Reuse needs compatible model and serving conditions plus an eligible identical beginning and boundary.</div>
            <div class="reference-paragraph" data-check>Retention and routing still affect eligibility. No hit is guaranteed.</div>
            <div class="reference-paragraph" data-check>This is processing-state reuse, not persistent memory, unlimited capacity, skipped meaning, or saved-answer retrieval.</div>
            <div class="reference-paragraph" data-check>No hosted retention period is claimed here.</div>
          </div>
        </template>
      </div>

      <div class="native-caveats">
        <template v-if="scene === 'T1'">
          <div data-check>event-budget.md — not selected or retrieved in this example</div>
          <div data-check>Cache reuse is a subset of included input—not an extra packet</div>
        </template>
        <div v-else-if="scene === 'E1'" data-check>Illustrative pieces, IDs and shortened numeric lists—not measured model data</div>
        <template v-else-if="scene === 'N1'">
          <div data-check>Causal-transformer teaching model. Not measured scores.</div>
          <div data-check>Sampling need not pick the highest score. Plausible does not mean verified.</div>
        </template>
        <div v-else-if="scene === 'T2'" data-check>Output minus reasoning does not establish visible-text tokens.</div>
        <div v-else-if="scene === 'T3'" data-check>Tokens, AI credits, AI units, wall time and Actions minutes are different units.</div>
        <template v-else-if="scene === 'E2'"></template>
        <template v-else-if="scene === 'N2'"></template>
      </div>
      <div v-if="hasDetails" class="native-controls">
        <button v-if="scene === 'E2' && page === 1" type="button" @click.stop="show(2)" @keydown.enter.prevent.stop="show(2)" @keydown="navigateFromControl">Provider details</button>
        <button v-if="scene === 'E2' && page === 2" type="button" @click.stop="show(1)" @keydown.enter.prevent.stop="show(1)" @keydown="navigateFromControl">Back to request details</button>
        <button ref="back" type="button" :aria-expanded="page > 0" :aria-controls="`context-body-${scene}`"
          @click.stop="show(page ? 0 : 1)" @keydown.enter.prevent.stop="show(page ? 0 : 1)" @keydown="navigateFromControl">{{ page ? 'Back to main' : 'Details' }}</button>
      </div>
    </div>
  </div>
</template>

<style>
/* Module-only mechanical frame. The retained 980×552 deck is NOT resized.
   Contain the approved 960×540 coordinates uniformly; never touch F23. */
.slidev-layout.context-native-slide.ghcp-single-panel {
  position: relative; display: block; padding: 0; width: 980px; height: 552px;
  color: #1f2328; background: #fff;
  font-family: "Mona Sans", "Segoe UI", Arial, sans-serif;
}
.slidev-layout.context-native-slide .ghcp-single-panel__title {
  position: absolute; left: 49px; top: 24.875px; width: 864px; height: 68px;
  transform: scale(1.0208333333); transform-origin: top left; z-index: 1;
}
.slidev-layout.context-native-slide .ghcp-single-panel__title h1 {
  margin: 0; font-size: 32px; line-height: 36px; letter-spacing: 0;
  font-weight: 700; color: #1f2328;
  font-family: "Mona Sans", "Segoe UI", Arial, sans-serif;
}
.slidev-layout.context-native-slide.native-long-title .ghcp-single-panel__title h1 {
  max-width: 650px; font-size: 28px; line-height: 32px;
}
.slidev-layout.context-native-slide.native-n3 .ghcp-single-panel__title h1 { max-width: 520px; }
.slidev-layout.context-native-slide .ghcp-single-panel__content {
  position: absolute; inset: 0; padding: 0; border: 0; border-radius: 0;
  box-shadow: none; background: transparent; overflow: visible;
}
.foundation-native-frame {
  position: absolute; left: 0; top: .375px; width: 960px; height: 540px;
  transform: scale(1.0208333333); transform-origin: top left;
}
.foundation-native-frame--e2,
.foundation-native-frame--n2 {
  position: relative;
  inset: auto;
  width: 100%;
  height: 100%;
  transform: none;
}
</style>

<style scoped>
.context-sheet { position: absolute; inset: 0; color: #1f2328; font: 20px/24px "Mona Sans", "Segoe UI", Arial, sans-serif; }
.foundation-native-frame--e2 .context-sheet,
.foundation-native-frame--n2 .context-sheet {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  color: #1f2328;
  font: 1rem/1.3 "Mona Sans", "Segoe UI", Arial, sans-serif;
}
.foundation-native-frame--e2 .context-body,
.foundation-native-frame--n2 .context-body { min-height: 0; flex: 1; }
.receipt-kicker { margin: 0 0 .45rem; font-size: .92rem; font-weight: 700; }
.foundation-native-frame--e2 .receipt {
  position: static;
  width: 100%;
  margin: 0;
  border: 1px solid #d0d7de;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  box-sizing: border-box;
  border-radius: .7rem;
  overflow: hidden;
  font-size: .82rem;
  line-height: 1.12;
}
.foundation-native-frame--e2 .receipt th,
.foundation-native-frame--e2 .receipt td {
  box-sizing: border-box;
  padding: .33rem .48rem;
  border: 0;
  border-right: 1px solid #d0d7de;
  border-bottom: 1px solid #d0d7de;
}
.foundation-native-frame--e2 .receipt th { text-align: left; }
.foundation-native-frame--e2 .receipt thead th { background: #f6f8fa; font-weight: 700; }
.foundation-native-frame--e2 .receipt tbody th { width: 43%; background: #fff; font-weight: 600; }
.foundation-native-frame--e2 .receipt td,
.foundation-native-frame--e2 .receipt thead th:not(:first-child) {
  width: 19%;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.foundation-native-frame--e2 .receipt tr:last-child th,
.foundation-native-frame--e2 .receipt tr:last-child td { border-bottom: 0; }
.foundation-native-frame--e2 .receipt th:last-child,
.foundation-native-frame--e2 .receipt td:last-child { border-right: 0; }
.receipt-review {
  display: grid;
  grid-template-columns: 12rem 1fr;
  gap: .75rem;
  margin-top: .55rem;
  padding: .55rem .7rem;
  border: 1px solid #2da44e;
  border-left: .35rem solid #2da44e;
  border-radius: .65rem;
  color: #fff;
  background: #24292f;
  font-size: .78rem;
  line-height: 1.25;
}
.receipt-review strong { color: #7ee787; font-size: .9rem; }
.receipt-review code { color: #fff; font: 700 1em/1.2 ui-monospace, monospace; }
.scene-footer {
  margin: .5rem 0 0;
  padding-top: .42rem;
  border-top: 1px solid #d0d7de;
  font-size: .76rem;
  line-height: 1.2;
}
.reuse-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.reuse-card {
  min-height: 9rem;
  padding: .7rem .9rem;
  border: 1px solid #d0d7de;
  border-radius: .8rem;
  background: #fff;
  box-shadow: 0 .5rem 1.2rem rgb(31 35 40 / 7%);
}
.reuse-card h2 { margin: 0 0 .4rem; font-size: 1.1rem; }
.reuse-card ul { margin: 0; padding-left: 1.15rem; }
.reuse-card li { margin: .28rem 0; font-size: .82rem; line-height: 1.24; }
.human-takeaway {
  margin: .5rem 0 0;
  padding: .5rem .7rem;
  border-left: .3rem solid #0969da;
  border-radius: .45rem;
  background: #f6f8fa;
  font-size: .8rem;
  line-height: 1.22;
}
.foundation-native-frame--e2 .context-sheet[data-view^="details"] .reference,
.foundation-native-frame--n2 .context-sheet[data-view^="details"] .reference {
  position: static;
  width: auto;
  margin: .3rem 0 0;
}
.foundation-native-frame--e2 .native-caveats,
.foundation-native-frame--n2 .native-caveats { display: none; }
.foundation-native-frame--e2 .native-controls,
.foundation-native-frame--n2 .native-controls {
  position: absolute;
  right: 0;
  bottom: 0;
  top: auto;
  display: flex;
  height: auto;
  margin-top: .35rem;
  justify-content: flex-end;
}
.foundation-native-frame--e2 .scene-footer,
.foundation-native-frame--n2 .scene-footer { padding-right: 7rem; }
.at { position: absolute; }
.full { left: 48px; width: 864px; }
.left { left: 48px; width: 420px; }
.right { left: 492px; width: 420px; }
.strong { font-weight: 700; }
.small { font-size: 18px; line-height: 24px; }
.intro, .reference { top: 108px; }
.native-line { min-height: 24px; }
.reference-paragraph { margin-top: 12px; }
.native-caveats { position: absolute; left: 48px; top: 450px; width: 864px; font-size: 18px; line-height: 22px; }
.native-caveats > div { min-height: 22px; }
.native-controls { position: absolute; right: 48px; top: 502px; display: flex; gap: 12px; height: 26px; }
.native-controls button { padding: 0 10px; height: 26px; border: 1px solid #57606a; border-radius: 4px; font: 18px/24px "Mona Sans", "Segoe UI", Arial, sans-serif; color: #1f2328; background: #fff; cursor: pointer; }
.native-controls button:focus-visible { outline: 3px solid #0969da; outline-offset: 2px; }
.t1-input { left: 48px; top: 108px; width: 420px; }
.t1-plate { position: absolute; left: 534px; top: 132px; width: 336px !important; height: 192px !important; object-fit: contain; }
.t1-caption { left: 492px; top: 356px; width: 420px; }
.t1-example { left: 48px; top: 308px; width: 420px; }
.context-sheet .native-table { position: absolute; margin: 0; border: 0; border-collapse: collapse; border-radius: 0; border-spacing: 0; table-layout: fixed; overflow: visible; font: inherit; }
.context-sheet .native-table th, .context-sheet .native-table td { padding: 0; border: 0; border-bottom: 1px solid #d0d7de; color: #1f2328; background: transparent; line-height: 24px; vertical-align: middle; text-align: left; }
.context-sheet .native-table thead th { font-weight: 700; }
.context-sheet .native-table tbody th { font-weight: 400; }
.context-sheet .e1-table { left: 48px; top: 156px; width: 864px; }
.context-sheet .e1-table th:nth-child(1) { width: 256px; }
.context-sheet .e1-table th:nth-child(2) { width: 168px; }
.context-sheet .e1-table thead { height: 48px; }
.context-sheet .e1-table tbody tr { height: 36px; }
.exact-space { white-space: pre; }
.e1-space { left: 48px; top: 276px; font-size: 18px; }
.e1-definitions { top: 300px; }
.e1-conclusion { top: 372px; }
.n1-node { top: 72px; width: 196px; line-height: 24px; font-weight: 700; }
.n1-mechanism { position: absolute; left: 24px; top: 120px; width: 912px; height: 52px; overflow: hidden; }
.n1-mechanism path { fill: none; stroke: #57606a; stroke-width: 2px; stroke-linecap: round; stroke-linejoin: round; }
.n1-mechanism marker path { fill: #57606a; stroke: none; }
.n1-mechanism .n1-earlier { fill: #8c959f; stroke: none; }
.n1-mechanism .n1-appended { fill: #1a7f37; stroke: none; }
.n1-mechanism .n1-next { fill: #fff; stroke: #1a7f37; stroke-width: 2px; }
.n1-plate { position: absolute; inset: 0; width: 960px !important; height: 540px !important; object-fit: fill; }
.n1-shared { left: 222px; top: 190px; width: 516px; text-align: center; }
.n1-facts { left: 222px; top: 214px; width: 516px; text-align: center; }
.n1-question { left: 222px; top: 238px; width: 516px; text-align: center; }
.n1-weather { top: 262px; width: 258px; text-align: center; }
.n1-rain { left: 216px; }
.n1-sunny { left: 486px; }
.n1-output { top: 388px; width: 258px; text-align: center; }
.n1-response { top: 412px; width: 258px; text-align: center; }
.n1-legend { left: 48px; top: 506px; width: 400px; }
.context-sheet[data-scene="N1"] .native-caveats { top: 454px; }
.context-sheet[data-scene="N1"] .native-controls { top: 506px; }
.t2-copy { top: 108px; }
.within-output { margin: 12px 0 0 14px; padding-left: 14px; border-left: 2px solid #6e40c9; border-bottom: 2px solid #6e40c9; }
.t2-conclusion { top: 396px; }
.credit-category { font-size: 22px; line-height: 28px; border-bottom: 2px solid #d0d7de; height: 48px; }
.t3-units { top: 248px; }
.t3-guards { top: 344px; }
.n2-earlier { left: 48px; top: 108px; width: 384px; }
.n2-prefix { left: 48px; top: 292px; width: 384px; }
.n2-prefix > div { min-height: 24px; }
.n2-continuing { left: 456px; top: 108px; width: 456px; }
.n2-processing { left: 456px; top: 212px; width: 456px; }
.n2-result { left: 456px; top: 292px; width: 456px; }
.n2-result-label { height: 48px; }
.n2-excerpt { height: 96px; }
.n2-bracket { position: absolute; inset: 0; width: 960px; height: 540px; pointer-events: none; }
.n2-bracket path { fill: none; stroke: #1a7f37; stroke-width: 2px; }
</style>
