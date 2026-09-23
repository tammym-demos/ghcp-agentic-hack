<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, useId } from "vue";

// Presenter-advanced build: every visible element is a pure function of
// `step`, so holding, stepping back, and reverse entry land in the right state.
const TOTAL_STEPS = 3;
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value ?? TOTAL_STEPS, TOTAL_STEPS)));

const uid = `mclev-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
const arrowId = (tone: string) => `arrow-${tone}-${uid}`;

const origin = { x: 56, y: 286 };
const existingTop = 166;
const existingWidth = computed(() => (step.value >= 3 ? 216 : 400));
// Keep the label clear of every diagonal and bar group present at each beat.
const existingLabel = computed(() =>
  step.value >= 3 ? { x: origin.x + existingWidth.value - 10, y: 259, anchor: "end" } : { x: 162, y: 188, anchor: "start" },
);

const basicBars = [
  { label: "Platform AI", x: 388 },
  { label: "IDE AI", x: 420 },
];
const processBars = [
  { label: "Coordination", x: 286 },
  { label: "Compliance", x: 318 },
  { label: "Automation", x: 350 },
];

const journey = [
  "Standardization and streamlining",
  "Efficient automation lifecycle",
  "Efficient policy compliance lifecycles",
  "Collaboration and reuse",
  "Low-cost improvement of codebases, apps, processes, and systems (AI, automation, modernization)",
];

const beats = [
  { kicker: "Existing SDLC capacity", text: "Today’s process sets the slope: outcomes delivered for the developer time spent." },
  { kicker: "Basic AI improvements", text: "Basic AI improvements free developer time inside the existing SDLC. On their own, the diagonal barely changes." },
  { kicker: "Process & decision-making improvements", text: "Process and decision-making improvements are what let freed time become more outcomes. That is where the slope can rise." },
];
</script>

<template>
  <NativeAnimationStage
    label="The Leverage Rectangle, a conceptual model built in four presenter-advanced beats. Business outcomes on the vertical axis, developer time spent on the horizontal axis. Beat 1: existing SDLC capacity is a rectangle whose diagonal slope is leverage. Beat 2: IDE AI and Platform AI appear as basic AI improvements inside the rectangle. Beat 3: Automation, Compliance, and Coordination appear as process and decision-making improvements, with a dashed improved-leverage rectangle and a steeper diagonal. Beat 4: the existing rectangle narrows, an achievable-leverage rectangle appears with the steepest diagonal, and the five-step journey of improvement is listed."
  >
    <div class="mc-lev" :data-step="step">
      <svg class="mc-lev__chart" viewBox="0 0 520 340" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <marker v-for="tone in ['ink', 'green', 'deep']" :id="arrowId(tone)" :key="tone" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" :class="`mc-lev__head mc-lev__head--${tone}`" />
          </marker>
        </defs>

        <line class="mc-lev__axis" :x1="origin.x" :y1="origin.y" :x2="origin.x" y2="12" :marker-end="`url(#${arrowId('ink')})`" />
        <line class="mc-lev__axis" :x1="origin.x" :y1="origin.y" x2="510" :y2="origin.y" :marker-end="`url(#${arrowId('ink')})`" />
        <text class="mc-lev__axis-label" transform="translate(30 150) rotate(-90)" text-anchor="middle">Business outcomes</text>
        <text class="mc-lev__axis-label" :x="origin.x" y="308">Developer time spent</text>

        <g v-if="step >= 3" class="mc-lev__in">
          <rect class="mc-lev__rect mc-lev__rect--achievable" :x="origin.x" y="22" width="130" height="64" rx="4" />
          <text class="mc-lev__rect-label mc-lev__rect-label--deep" x="66" y="42">Achievable</text>
          <text class="mc-lev__rect-label mc-lev__rect-label--deep" x="66" y="58">leverage</text>
          <line class="mc-lev__diagonal mc-lev__diagonal--deep" :x1="origin.x" :y1="origin.y" x2="186" y2="24" :marker-end="`url(#${arrowId('deep')})`" />
        </g>

        <g v-if="step >= 2" class="mc-lev__in">
          <rect class="mc-lev__rect mc-lev__rect--improved" :x="origin.x" y="86" width="170" height="80" rx="4" />
          <text class="mc-lev__rect-label mc-lev__rect-label--green" x="66" y="106">Improved</text>
          <text class="mc-lev__rect-label mc-lev__rect-label--green" x="66" y="122">leverage?</text>
          <line class="mc-lev__diagonal mc-lev__diagonal--green" :x1="origin.x" :y1="origin.y" x2="224" y2="88" :marker-end="`url(#${arrowId('green')})`" />
        </g>

        <rect
          class="mc-lev__rect mc-lev__rect--existing"
          :x="origin.x"
          :y="existingTop"
          :width="existingWidth"
          :height="origin.y - existingTop"
          :style="{ width: `${existingWidth}px` }"
          rx="4"
        />
        <text class="mc-lev__rect-label" :x="existingLabel.x" :y="existingLabel.y" :text-anchor="existingLabel.anchor">Existing SDLC</text>
        <text class="mc-lev__rect-label" :x="existingLabel.x" :y="existingLabel.y + 17" :text-anchor="existingLabel.anchor">capacity</text>
        <line
          :key="`existing-${step >= 3}`"
          class="mc-lev__diagonal mc-lev__diagonal--ink mc-lev__in"
          :x1="origin.x"
          :y1="origin.y"
          :x2="origin.x + existingWidth - 2"
          :y2="existingTop + 2"
          :marker-end="`url(#${arrowId('ink')})`"
        />

        <rect v-if="step >= 3" class="mc-lev__bar-group mc-lev__in" x="278" y="168" width="176" height="114" rx="8" />

        <g v-if="step >= 2" class="mc-lev__in">
          <g v-for="bar in processBars" :key="bar.label">
            <rect class="mc-lev__bar mc-lev__bar--process" :x="bar.x" y="174" width="26" height="104" rx="4" />
            <text class="mc-lev__bar-label" :transform="`translate(${bar.x + 17} 226) rotate(-90)`" text-anchor="middle">{{ bar.label }}</text>
          </g>
          <path class="mc-lev__brace" d="M288 292 v5 h86 v-5 M331 297 v5" />
          <text class="mc-lev__brace-label" x="380" y="316" text-anchor="end">Process &amp; decision-</text>
          <text class="mc-lev__brace-label" x="380" y="329" text-anchor="end">making improvements</text>
        </g>

        <g v-if="step >= 1" class="mc-lev__in">
          <g v-for="bar in basicBars" :key="bar.label">
            <rect class="mc-lev__bar mc-lev__bar--basic" :x="bar.x" y="174" width="26" height="104" rx="4" />
            <text class="mc-lev__bar-label" :transform="`translate(${bar.x + 17} 226) rotate(-90)`" text-anchor="middle">{{ bar.label }}</text>
          </g>
          <path class="mc-lev__brace mc-lev__brace--basic" d="M390 292 v5 h54 v-5 M417 297 v5" />
          <text class="mc-lev__brace-label mc-lev__brace-label--basic" x="392" y="316" text-anchor="start">Basic AI</text>
          <text class="mc-lev__brace-label mc-lev__brace-label--basic" x="392" y="329" text-anchor="start">improvements</text>
        </g>
      </svg>

      <aside class="mc-lev__panel">
        <div class="mc-lev__definition">
          <b>Leverage = slope of the diagonal.</b>
          <span>A steeper diagonal means more business outcomes per unit of developer time.</span>
        </div>

        <div v-if="step < 3" :key="`beat-${step}`" class="mc-lev__beat mc-lev__in">
          <b>{{ beats[step].kicker }}</b>
          <span>{{ beats[step].text }}</span>
        </div>
        <div v-else key="beat-journey" class="mc-lev__beat mc-lev__beat--journey mc-lev__in">
          <b>Journey of improvement</b>
          <ol>
            <li v-for="item in journey" :key="item">{{ item }}</li>
          </ol>
        </div>

        <div class="mc-lev__footer">
          <span class="mc-lev__dots" aria-hidden="true">
            <i v-for="index in TOTAL_STEPS + 1" :key="index" :class="{ 'is-on': index - 1 <= step }" />
          </span>
          <small>Conceptual model — not measured data or a promised result.</small>
        </div>
      </aside>
    </div>
  </NativeAnimationStage>
</template>

<style scoped>
.mc-lev {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 16px;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 10px 14px;
  color: #24211f;
  background: #fffdf7;
}

.mc-lev .mc-lev__chart {
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: visible;
}

.mc-lev .mc-lev__axis {
  stroke: #24211f;
  stroke-width: 2;
}

.mc-lev .mc-lev__head--ink { fill: #625b54; }
.mc-lev .mc-lev__head--green { fill: #287a45; }
.mc-lev .mc-lev__head--deep { fill: #1f6338; }

.mc-lev .mc-lev__axis-label {
  fill: #24211f;
  font-size: 13px;
  font-weight: 650;
}

.mc-lev .mc-lev__rect {
  stroke-width: 2;
  transition: width .6s ease;
}

.mc-lev .mc-lev__rect--existing {
  fill: rgb(118 80 183 / 7%);
  stroke: #7650b7;
}

.mc-lev .mc-lev__rect--improved {
  fill: rgb(40 122 69 / 6%);
  stroke: #287a45;
  stroke-dasharray: 6 5;
}

.mc-lev .mc-lev__rect--achievable {
  fill: rgb(31 99 56 / 11%);
  stroke: #1f6338;
  stroke-dasharray: 6 5;
}

.mc-lev .mc-lev__rect-label {
  fill: #5f3e98;
  font-size: 14px;
  font-weight: 700;
}

.mc-lev .mc-lev__rect-label--green { fill: #287a45; }
.mc-lev .mc-lev__rect-label--deep { fill: #1f6338; }

.mc-lev .mc-lev__diagonal {
  stroke-width: 2.5;
  stroke-dasharray: 2 5;
  stroke-linecap: round;
}

.mc-lev .mc-lev__diagonal--ink { stroke: #625b54; }
.mc-lev .mc-lev__diagonal--green { stroke: #287a45; }
.mc-lev .mc-lev__diagonal--deep { stroke: #1f6338; stroke-width: 3; }

.mc-lev .mc-lev__bar {
  stroke-width: 1.5;
}

.mc-lev .mc-lev__bar--basic {
  fill: #7650b7;
  stroke: #5f3e98;
}

.mc-lev .mc-lev__bar--process {
  fill: #287a45;
  stroke: #1f6338;
}

.mc-lev .mc-lev__bar-label {
  fill: #fff;
  font-size: 10.5px;
  font-weight: 750;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.mc-lev .mc-lev__bar-group {
  fill: none;
  stroke: #625b54;
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
}

.mc-lev .mc-lev__brace {
  fill: none;
  stroke: #287a45;
  stroke-width: 1.5;
}

.mc-lev .mc-lev__brace--basic { stroke: #7650b7; }

.mc-lev .mc-lev__brace-label {
  fill: #287a45;
  font-size: 11.5px;
  font-style: italic;
  font-weight: 650;
}

.mc-lev .mc-lev__brace-label--basic { fill: #5f3e98; }

.mc-lev .mc-lev__panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  min-height: 0;
}

.mc-lev .mc-lev__definition {
  display: grid;
  gap: 5px;
  padding: 11px 14px;
  border-left: 5px solid #7650b7;
  border-radius: 8px;
  background: #f3eefb;
}

.mc-lev .mc-lev__definition b {
  color: #24211f;
  font-size: 19px;
  line-height: 1.15;
}

.mc-lev .mc-lev__definition span {
  color: #3d3833;
  font-size: 14.5px;
  line-height: 1.3;
}

.mc-lev .mc-lev__beat {
  display: grid;
  align-content: start;
  gap: 6px;
  flex: 1 1 auto;
  min-height: 0;
  padding: 11px 14px;
  border: 1.5px solid #d8cfc2;
  border-radius: 10px;
  background: #fff;
}

.mc-lev .mc-lev__beat b {
  color: #287a45;
  font-size: 13px;
  letter-spacing: .06em;
  line-height: 1.2;
  text-transform: uppercase;
}

.mc-lev .mc-lev__beat span {
  color: #24211f;
  font-size: 16px;
  line-height: 1.35;
}

.mc-lev .mc-lev__beat ol {
  display: grid;
  gap: 2px;
  margin: 0;
  padding-left: 20px;
  color: #24211f;
  font-size: 13.5px;
  line-height: 1.25;
}

.mc-lev .mc-lev__beat li {
  margin: 0;
  font-size: 13px;
  line-height: 1.2;
}

.mc-lev .mc-lev__footer {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mc-lev .mc-lev__footer small {
  color: #625b54;
  font-size: 11.5px;
  line-height: 1.25;
}

.mc-lev .mc-lev__dots {
  display: inline-flex;
  gap: 5px;
}

.mc-lev .mc-lev__dots i {
  width: 9px;
  height: 9px;
  border: 1.5px solid #287a45;
  border-radius: 50%;
}

.mc-lev .mc-lev__dots i.is-on {
  background: #287a45;
}

.mc-lev .mc-lev__in {
  animation: leverage-in .45s ease forwards;
}

@keyframes leverage-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .mc-lev *,
  .mc-lev *::before,
  .mc-lev *::after {
    animation: none !important;
    transition: none !important;
  }

  .mc-lev .mc-lev__in {
    opacity: 1;
  }
}
</style>
