<script setup lang="ts">
import { nextTick, ref } from "vue";
import { onSlideEnter } from "@slidev/client";

const details = ref(false);
const control = ref<HTMLButtonElement>();
onSlideEnter(() => { details.value = false; });
async function toggleDetails() {
  details.value = !details.value;
  await nextTick();
  control.value?.focus();
}
</script>

<template>
  <div class="n3-sheet" :data-view="details ? 'details' : 'main'">
    <div v-if="!details" id="n3-body" class="n3-main" aria-label="Two independent request comparisons">
      <div class="n3-line n3-definition" data-check>Prefix = identical beginning</div>

      <section class="n3-comparison n3-first" aria-labelledby="n3-first-title">
        <div id="n3-first-title" class="n3-line n3-heading" data-check>1 New final question only</div>
        <div class="n3-line" data-check><span class="n3-same">Community event · outdoor · rain · 100 guests</span></div>
        <div class="n3-line n3-question" data-check><span class="n3-label">Baseline: </span><span class="n3-exact"><span class="n3-same">What s</span><span class="n3-boundary">u</span>pplies should we bring?</span></div>
        <div class="n3-line n3-question" data-check><span class="n3-label">New question: </span><span class="n3-exact"><span class="n3-same">What s</span><span class="n3-boundary">h</span>ould we tell the volunteers?</span></div>
        <div class="n3-line" data-check>First textual difference: <strong>u</strong> in supplies / <strong>h</strong> in should</div>
      </section>

      <section class="n3-comparison n3-second" aria-labelledby="n3-second-title">
        <div id="n3-second-title" class="n3-line n3-heading" data-check>2 Venue only</div>
        <div class="n3-line" data-check><span class="n3-same">Community event · </span><span class="n3-venue">outdoor → indoor only</span> · <span class="n3-later">rain</span> · <span class="n3-later">100 guests</span></div>
        <div class="n3-line" data-check>Both questions: <span class="n3-later n3-exact">What supplies should we bring?</span></div>
        <div class="n3-line" data-check>The first difference is earlier: outdoor / indoor.</div>
        <div class="n3-line" data-check>Later matching text does not restart this prefix.</div>
      </section>

      <svg class="n3-brackets" viewBox="0 0 960 540" aria-hidden="true">
        <path d="M60 188 H48 V236 H206 M48 212 H206" />
        <path d="M60 328 H48 V306 H60" />
      </svg>
      <div class="n3-line n3-payoff" data-check>New question: later difference. Changed venue: earlier difference.</div>
    </div>

    <section v-else id="n3-body" class="n3-details" aria-label="Comparison details">
      <div class="n3-line n3-heading" data-check>Details — scope and retention</div>
      <div class="n3-line" data-check>Each comparison starts again from the original baseline.</div>
      <div class="n3-line" data-check>No earlier response or conversation history is carried over.</div>
      <div class="n3-line n3-detail-gap" data-check>Order: Event → Venue → Forecast → Guests → Current question.</div>
      <div class="n3-line" data-check>This order and the separators are illustrative, not a host packet format.</div>
      <div class="n3-line" data-check>Unshown host, model, settings and safety conditions stay the same</div>
      <div class="n3-line" data-check>only for this conceptual comparison, not as a claim about a real app.</div>
      <div class="n3-line n3-detail-gap" data-check>Reuse also needs compatible model/serving conditions, eligible length</div>
      <div class="n3-line" data-check>and a previously stored boundary, retention and routing.</div>
      <div class="n3-line n3-detail-gap" data-check>A miss does not prove that all older variants were deleted.</div>
      <div class="n3-line" data-check>A retained compatible earlier variant may still be reusable later.</div>
      <div class="n3-line" data-check>This diagram proves neither a cache hit nor a correct answer.</div>
    </section>

    <div class="n3-caveats" aria-label="Limits of this comparison">
      <div data-check>Text comparison—not a tokenizer boundary.</div>
      <div data-check>An earlier eligible boundary may be reusable. Neither comparison guarantees a hit.</div>
    </div>
    <button ref="control" class="n3-control" type="button" :aria-expanded="details"
      aria-controls="n3-body" @click.stop="toggleDetails" @keydown.stop
      @keyup.stop>
      {{ details ? 'Back to diagram' : 'Details' }}
    </button>
  </div>
</template>

<style scoped>
.n3-sheet {
  position: absolute;
  inset: 0;
  color: #1f2328;
  font-family: "Mona Sans", "Segoe UI", Arial, sans-serif;
  font-size: 20px;
  line-height: 24px;
}
.n3-line { height: 24px; white-space: nowrap; }
.n3-definition { position: absolute; left: 48px; top: 108px; }
.n3-heading { font-weight: 700; }
.n3-comparison { position: absolute; left: 60px; width: 852px; height: 120px; }
.n3-first { top: 144px; }
.n3-second { top: 284px; }
.n3-label { display: inline-block; width: 146px; }
.n3-same { text-decoration: underline solid #1a7f37 2px; text-underline-offset: 3px; }
.n3-boundary { border-left: 2px solid #6e40c9; font-weight: 700; color: #6e40c9; }
.n3-venue { border-left: 2px solid #6e40c9; font-weight: 700; color: #6e40c9; }
.n3-later { text-decoration: underline dashed #57606a 2px; text-underline-offset: 3px; }
.n3-brackets { position: absolute; inset: 0; width: 960px; height: 540px; pointer-events: none; }
.n3-brackets path { fill: none; stroke: #1a7f37; stroke-width: 2px; }
.n3-payoff { position: absolute; left: 48px; top: 412px; font-weight: 600; }
.n3-caveats { position: absolute; left: 48px; top: 450px; width: 864px; font-size: 18px; line-height: 22px; }
.n3-caveats > div { white-space: nowrap; height: 22px; }
.n3-details { position: absolute; left: 48px; top: 108px; width: 864px; }
.n3-detail-gap { margin-top: 8px; }
.n3-control {
  position: absolute; right: 48px; top: 502px; height: 26px;
  padding: 0 10px; border: 1px solid #57606a; border-radius: 4px;
  font: inherit; font-size: 18px; line-height: 24px; color: #1f2328; background: #fff;
  cursor: pointer;
}
.n3-control:focus-visible { outline: 3px solid #0969da; outline-offset: 2px; }
</style>
