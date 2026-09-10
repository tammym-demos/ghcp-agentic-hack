<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import { useNav, useSlideContext } from "@slidev/client";
import { BEATS, DURATION, layersFor, motionFor, promptStackFor, stratumPath } from "../lib/manufacturing-context-sequence.mjs";

const plate = `${import.meta.env.BASE_URL}images/foundations-context-funnel-wider-neck-v2.png`;
const { $clicks, $slidev } = useSlideContext();
// Fit the accepted 960x540 composition to this deck's canvas, not its panels.
// This is one uniform transform; all intrinsic art/text geometry stays locked.
const canvasScale = $slidev.configs.canvasWidth / 960;
const nav = useNav();
const reduced = ref(false);
const paused = ref(false);
const running = ref(false);
const elapsed = ref(DURATION);
const previous = ref(0);
const uid = `funnel-full-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
const id = (name: string) => `${uid}-${name}`;
const step = computed(() => reduced.value ? 9 : Math.max(0, Math.min(9, $clicks.value ?? 0)));
const beat = computed(() => BEATS[step.value]);
const oldBeat = computed(() => BEATS[previous.value]);
const motion = computed(() => motionFor(step.value, elapsed.value, running.value));
const layers = computed(() => layersFor(step.value, motion.value.deposit, motion.value.compact));
const promptStack = computed(() => promptStackFor(step.value, previous.value, elapsed.value, running.value));
let frame = 0, lastFrame = 0;
function tick(now: number) {
  if (lastFrame && !paused.value) elapsed.value = Math.min(DURATION, elapsed.value + now - lastFrame);
  lastFrame = now;
  if (elapsed.value < DURATION) frame = requestAnimationFrame(tick);
  else { running.value = false; frame = 0; }
}
watch(step, (next, prev) => {
  cancelAnimationFrame(frame);
  previous.value = prev;
  paused.value = false;
  running.value = !reduced.value && next > prev;
  elapsed.value = running.value ? 0 : DURATION;
  lastFrame = 0;
  if (running.value) frame = requestAnimationFrame(tick);
});
let media: MediaQueryList;
const updateMotion = () => { reduced.value = media.matches; };
onMounted(() => {
  media = matchMedia("(prefers-reduced-motion: reduce)");
  updateMotion();
  media.addEventListener("change", updateMotion);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  media?.removeEventListener("change", updateMotion);
});
const go = (n: number) => nav.go(nav.currentPage.value, Math.max(0, Math.min(9, n)));
const interior = "M396 132 Q684 190 972 132 L927 216 L778 397 C746 432 737 445 736 480 L728 604 Q729 627 685 630 Q643 628 642 606 L634 478 C633 446 625 430 596 398 L442 221 Z";
const entry = "M340 -180 H1035 V95 L972 132 L927 216 L778 397 C746 432 737 445 736 480 L728 604 Q729 627 685 630 Q643 628 642 606 L634 478 C633 446 625 430 596 398 L442 221 L396 132 L340 95 Z";
</script>

<template>
  <main class="proof" :style="{ transform: `scale(${canvasScale})`, transformOrigin: 'top left' }" :class="{ reduced }" :data-step="step" :data-running="running" :data-paused="paused" :data-elapsed="Math.round(elapsed)">
    <slot><h1>Context Window: What Competes for Space</h1></slot>

    <!-- Include the COMPLETE headline travel envelope in the SVG viewport.
         No overflow-visible text, textLength mutation, or compositor repaint hack. -->
    <svg class="vessel" viewBox="0 -180 1376 948" role="img" :aria-labelledby="id('title')">
      <title :id="id('title')">Illustrated fixed-capacity context vessel with native content</title>
      <defs>
        <clipPath :id="id('interior')"><path :d="interior" /></clipPath>
        <clipPath :id="id('entry')"><path :d="entry" /></clipPath>
        <clipPath :id="id('foreground')">
          <path d="M348 87 Q676 190 1017 92 L1018 124 Q968 179 686 176 Q409 175 350 120 Z" />
          <path d="M386 137 L483 158 Q511 163 518 188 L539 227 Q536 247 509 253 L418 247 L385 218 Z" />
          <path d="M984 137 L887 158 Q859 163 852 188 L831 227 Q834 247 861 253 L952 247 L985 218 Z" />
          <path d="M586 497 Q686 523 780 497 L791 549 Q682 570 582 545 Z" />
          <path d="M613 551 L643 550 L645 615 Q658 635 729 625 L731 550 L760 551 L817 748 L532 748 Z" />
        </clipPath>
        <clipPath :id="id('highlights')">
          <path d="M478 202 L501 210 L675 413 L665 424 Z M792 183 L810 180 L713 438 L704 445 Z" />
        </clipPath>
        <pattern :id="id('ink')" width="36" height="24" patternUnits="userSpaceOnUse">
          <path d="M1 7 Q10 3 19 7 M22 17 L32 15" fill="none" stroke="#365044" stroke-width="2" class="ink-lines" />
        </pattern>
      </defs>
      <image class="fixed-plate" :href="plate" width="1376" height="768" />
      <g :clip-path="`url(#${id('interior')})`">
        <g v-for="layer in layers" :key="layer.id" class="material" :data-layer="layer.id" :data-top="layer.top" :data-bottom="layer.bottom" :style="{ opacity: layer.opacity }">
          <path :d="stratumPath(layer.top, layer.bottom)" :fill="layer.color" stroke="#435a49" stroke-width="2.2" />
          <path :d="stratumPath(layer.top, layer.bottom)" :fill="`url(#${id('ink')})`" />
        </g>
        <!-- Headroom is a protected EMPTY region, never a deposited material layer. -->
        <path class="reserve-glow" d="M414 184 Q684 208 953 184 L913 258 Q684 270 456 258 Z" :style="{ opacity: motion.headroom * .15 }" fill="#e0c561" />
        <!-- Inline CSS deliberately avoids UnoCSS [opacity~='1'] -> opacity: .01. -->
        <path class="headroom-boundary" d="M456 260 Q684 269 914 260" fill="none" stroke="#365044" stroke-width="3" stroke-dasharray="13 10" :style="{ opacity: 1, strokeWidth: motion.headroom ? 4 : 3 }" />
      </g>
      <image class="glass-highlights" :href="plate" width="1376" height="768" :clip-path="`url(#${id('highlights')})`" />
      <g :clip-path="`url(#${id('entry')})`">
        <g v-if="motion.headlineVisible" class="headline-word" :data-headline="beat.headline"
          :transform="`translate(${motion.x} ${motion.y}) scale(${motion.scale})`"
          :style="{ opacity: motion.headlineOpacity, fontSize: `${beat.lines.length > 1 ? 84 : 104}px`, filter: motion.blur ? `blur(${motion.blur}px)` : 'none' }">
          <text v-for="(line, i) in beat.lines" :key="i" x="0" :y="beat.lines.length > 1 ? -50 + i * 90 : 0" text-anchor="middle">{{ line }}</text>
        </g>
      </g>
      <image class="foreground-plate" :href="plate" width="1376" height="768" :clip-path="`url(#${id('foreground')})`" />
      <text v-if="step === 9 && motion.compact > .9" class="room-freed" x="685" y="340" text-anchor="middle" :clip-path="`url(#${id('interior')})`">Room freed</text>
    </svg>

    <section class="right-panel" aria-label="Native context examples">
      <div v-if="promptStack.cards.length || promptStack.summary" class="prompt-stack" :style="{ opacity: promptStack.opacity }" aria-label="User prompts stack">
        <p class="category stack-label">{{ step === 9 ? 'Compact · retained summary' : 'User prompts' }}</p>
        <div v-for="card in promptStack.cards" :key="card.id" class="stack-card" :style="{ opacity: card.opacity }">
          <p class="example-words"><template v-for="(line, i) in card.example" :key="i">{{ line }}<br v-if="i < card.example.length - 1" /></template></p>
        </div>
        <div v-if="promptStack.summary" class="stack-card summary-card" :style="{ opacity: promptStack.summary.opacity }">
          <p class="example-words summary-label"><template v-for="(line, i) in promptStack.summary.example" :key="i">{{ line }}<br v-if="i < promptStack.summary.example.length - 1" /></template></p>
        </div>
      </div>
      <div v-if="step > 0 && step < 9 && (step < 2 || step >= 5)" class="example current-example" :style="{ opacity: motion.newExampleOpacity }" :aria-hidden="motion.newExampleOpacity === 0">
        <p class="category">{{ beat.category }}</p>
        <p class="example-words"><template v-for="(line, i) in beat.example" :key="i">{{ line }}<br v-if="i < beat.example.length - 1" /></template></p>
      </div>
      <div v-if="running && previous > 0 && motion.oldExampleOpacity > 0 && (step === 2 || (previous >= 5 && step >= 6))" class="example previous-example"
        :style="{ opacity: motion.oldExampleOpacity }" aria-hidden="true">
        <p class="category">{{ oldBeat.category }}</p>
        <p class="example-words"><template v-for="(line, i) in oldBeat.example" :key="i">{{ line }}<br v-if="i < oldBeat.example.length - 1" /></template></p>
      </div>
      <div v-if="step === 7 && motion.newExampleOpacity === 1" class="result">
        <p>A big window is not<br />an invitation to fill it.</p>
      </div>
      <div v-if="step === 8 && motion.newExampleOpacity === 1" class="result">
        <p>Protected space.<br />Not another input.</p>
      </div>
      <div v-if="step === 9 && motion.newExampleOpacity === 1" class="result final">
        <h2>Instructions + references retained</h2>
        <p>Some fine detail is dropped.</p>
      </div>
    </section>
    <section class="capacity-reference" aria-label="Illustrative context capacity">
      <p class="capacity-value">Example capacity: 400K tokens</p>
      <p class="capacity-caveat">Actual capacity varies by model and surface.</p>
    </section>
    <nav class="controls" aria-label="Context animation playback">
      <span class="state-label">{{ reduced ? 'Reduced motion · final summary' : `${step}/9 · ${step ? beat.headline : 'Ready'}` }}</span>
      <button aria-label="Previous state" :disabled="step === 0 || reduced" @click.stop="go(step - 1)">Back</button>
      <button aria-label="Pause or resume motion" :disabled="!running || reduced" @click.stop="paused = !paused">{{ paused ? 'Resume' : 'Pause' }}</button>
      <button aria-label="Replay from start" :disabled="reduced" @click.stop="go(0)">Replay</button>
      <button aria-label="Next state" :disabled="step === 9 || reduced" @click.stop="go(step + 1)">Next</button>
    </nav>
  </main>
</template>

<style scoped>
@font-face { font-family: "Proof World"; src: local("Franklin Gothic Demi Cond"); font-weight: 700; font-style: normal; font-display: block; }
@font-face { font-family: "Proof Body"; src: local("Bahnschrift"); font-weight: 100 900; font-style: normal; font-display: block; }
.proof { --context-surface: #fff; position: absolute; inset: 0; width: 960px; height: 540px; overflow: hidden; background: var(--context-surface); color: #25382c; font-family: "Proof Body", sans-serif; }
.proof :deep(h1), .proof h2, .proof p { margin: 0; padding: 0; }
.proof :deep(h1) { position: absolute; left: 36px; top: 22px; font: 700 34px/1.12 "Proof World", sans-serif; color: #25382c; }
.vessel { position: absolute; left: 57.3px; top: 53.5px; width: 584.8px; height: 402.9px; overflow: hidden; }
.headline-word { font-family: "Proof World", sans-serif; font-weight: 700; fill: #25382c; }
.ink-lines { opacity: .22; }
.material { fill-opacity: .9; }
.glass-highlights { opacity: .32; }
.room-freed { font: 700 44px "Proof World", sans-serif; fill: #25382c; }
.right-panel { position: absolute; left: 566px; top: 92px; width: 352px; height: 360px; background: var(--context-surface); box-shadow: 0 0 16px 18px var(--context-surface); }
.prompt-stack { position: absolute; top: 0; left: 0; width: 352px; display: flex; flex-direction: column; gap: 12px; }
.stack-label { font: 700 18px/1.1 "Proof World", sans-serif; }
.stack-card { width: 352px; }
.example { position: absolute; top: 0; width: 352px; }
.category { font-size: 17px; line-height: 1.5; letter-spacing: .2px; }
.example-words { margin-top: 7px !important; font: 700 34px/1.07 "Proof World", sans-serif; color: #25382c; }
.result { position: absolute; top: 232px; }
.result h2 { font: 700 23px/1.08 "Proof World", sans-serif; }
.result p { margin-top: 8px; font-size: 18px; line-height: 1.15; }
.capacity-reference { position: absolute; left: 36px; right: 36px; top: 460px; height: 40px; z-index: 2; text-align: center; color: #25382c; }
.capacity-value { font: 700 20px/22px "Proof World", sans-serif; }
.capacity-caveat { font: 400 16px/18px "Proof Body", sans-serif; }
.controls { position: absolute; bottom: 8px; left: 36px; right: 36px; display: flex; gap: 8px; align-items: center; height: 29px; border-top: 1px solid #b1ad9f; padding-top: 4px; }
.state-label { margin-right: auto; font-size: 14px; }
.controls button { font: 500 14px "Proof Body", sans-serif; color: #25382c; background: var(--context-surface); border: 1px solid #697564; border-radius: 4px; padding: 3px 12px; cursor: pointer; min-width: 58px; }
.controls button:focus-visible { outline: 3px solid #6e40a1; outline-offset: 2px; }
.controls button:disabled { opacity: .45; cursor: default; }
</style>
