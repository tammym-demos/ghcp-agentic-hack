<script setup lang="ts">
// Illustrative shapes only: indexed levels chosen to show relative direction,
// not measured data or a forecast.
const stages = ["Human only", "AI assistance", "Interactive agents", "Autonomous agents"].map((label) => label.split(" "));
const plot = { left: 58, right: 470, top: 22, bottom: 262, max: 6 };
const xAt = (t: number) => plot.left + t * (plot.right - plot.left);
const yAt = (level: number) => plot.bottom - (level / plot.max) * (plot.bottom - plot.top);

const curve = (end: number, bend = 2.6) => {
  const points = Array.from({ length: 25 }, (_, index) => {
    const t = index / 24;
    const level = 1 + (end - 1) * (Math.exp(bend * t) - 1) / (Math.exp(bend) - 1);
    return `${xAt(t).toFixed(1)},${yAt(level).toFixed(1)}`;
  });
  return `M${points.join(" L")}`;
};

const series = [
  { key: "hours", label: "Dev hours", note: "relatively fixed", d: `M${xAt(0)},${yAt(0.65)} L${xAt(1)},${yAt(0.65)}`, end: 0.65 },
  { key: "capacity", label: "AI capacity", note: "usage / tokens / work attempted", d: curve(5.5), end: 5.5 },
  { key: "leverage", label: "Dev leverage", note: "completed work per developer hour", d: curve(2.6, 2), end: 2.6 },
  { key: "loc", label: "LOC-level", note: "scope-level leverage", d: curve(1.7, 1.8), end: 1.7 },
  { key: "pr", label: "PR-level", note: "scope-level leverage", d: curve(1.35, 1.6), end: 1.35 },
  { key: "story", label: "Story-level", note: "scope-level leverage", d: curve(1.08, 1.4), end: 1.08 },
];
</script>

<template>
  <div class="mc-curves" role="img" aria-label="Illustrative chart, not measured data. Across human only, AI assistance, interactive agents, and autonomous agents, developer hours stay relatively fixed, AI capacity rises steeply, developer leverage rises more slowly, and scope-level leverage rises least at larger completion scopes: lines of code, then pull request, then story.">
    <div class="mc-curves__plot">
    <svg class="mc-curves__chart" viewBox="0 0 490 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g class="mc-curves__grid">
        <line v-for="level in [0, 1, 2, 3, 4, 5, 6]" :key="level" :x1="plot.left" :x2="plot.right" :y1="yAt(level)" :y2="yAt(level)" />
      </g>
      <g class="mc-curves__ticks">
        <text v-for="level in [0, 1, 2, 3, 4, 5, 6]" :key="level" :x="plot.left - 8" :y="yAt(level) + 4" text-anchor="end">{{ level }}</text>
      </g>
      <text class="mc-curves__axis-label" :transform="`translate(20 ${(plot.top + plot.bottom) / 2}) rotate(-90)`" text-anchor="middle">Indexed relative level</text>
      <line class="mc-curves__axis" :x1="plot.left" :x2="plot.right" :y1="plot.bottom" :y2="plot.bottom" />
      <text
        v-for="(stage, index) in stages"
        :key="stage[0]"
        class="mc-curves__stage"
        :x="xAt((index + 0.5) / 4)"
        :y="plot.bottom + 16"
        text-anchor="middle"
      ><tspan :x="xAt((index + 0.5) / 4)">{{ stage[0] }}</tspan><tspan :x="xAt((index + 0.5) / 4)" dy="13">{{ stage[1] }}</tspan></text>
      <text class="mc-curves__axis-label" :x="(plot.left + plot.right) / 2" :y="plot.bottom + 50" text-anchor="middle">Time / AI maturity</text>

      <path v-for="line in series" :key="line.key" :d="line.d" :class="`mc-curves__line mc-curves__line--${line.key}`" />
      <circle v-for="line in series.slice(1)" :key="`${line.key}-end`" :cx="xAt(1)" :cy="yAt(line.end)" r="3.5" :class="`mc-curves__dot mc-curves__dot--${line.key}`" />

      <g class="mc-curves__legend">
        <g v-for="(line, index) in series" :key="`${line.key}-legend`" :transform="`translate(${plot.left + 12} ${plot.top + 10 + index * 17})`">
          <line x1="0" x2="20" y1="0" y2="0" :class="`mc-curves__line mc-curves__line--${line.key}`" />
          <text x="27" y="4"><tspan class="mc-curves__legend-name">{{ line.label }}</tspan> ({{ line.note }})</text>
        </g>
      </g>

    </svg>
      <div class="mc-curves__caption"><b>Illustrative shape, not measured data.</b> Larger completion scope reflects more review, coordination, and SDLC overhead.</div>
    </div>

    <aside class="mc-curves__panel">
      <b class="mc-curves__panel-title">Reading the curves</b>
      <div><b class="mc-curves__term mc-curves__term--capacity">AI capacity</b><span>Work that can be attempted or delegated.</span></div>
      <div><b class="mc-curves__term mc-curves__term--leverage">Dev leverage</b><span>Rises only when AI capacity converts into more completed work per developer hour.</span></div>
      <div><b class="mc-curves__term mc-curves__term--scope">Scope matters</b><span>As scope increases from LOC to PR to story, realized leverage is increasingly affected by structure, efficiency, rework, risk, coordination, dependencies, and other SDLC overhead.</span></div>
      <div class="mc-curves__formula"><b>Developer leverage = completed work ÷ developer hours</b><span>AI usage and output are not the same as leverage.</span></div>
    </aside>
  </div>
</template>

<style scoped>
.mc-curves {
  display: grid;
  flex: 1 1 0;
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
  gap: 14px;
  width: 100%;
  min-height: 0;
  color: #24211f;
}

.mc-curves .mc-curves__plot {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  min-height: 0;
}

.mc-curves .mc-curves__chart {
  flex: 1 1 0;
  width: 100%;
  height: 100%;
  min-height: 0;
}

.mc-curves .mc-curves__caption {
  margin: 0;
  color: #5f3e98;
  font-size: 12px;
  font-style: italic;
  line-height: 1.3;
}

.mc-curves .mc-curves__caption b {
  color: #24211f;
  font-style: normal;
}

.mc-curves .mc-curves__grid line {
  stroke: #ece5da;
  stroke-width: 1;
}

.mc-curves .mc-curves__ticks text,
.mc-curves .mc-curves__stage {
  fill: #625b54;
  font-size: 11.5px;
}

.mc-curves .mc-curves__stage {
  fill: #24211f;
  font-weight: 600;
}

.mc-curves .mc-curves__axis {
  stroke: #24211f;
  stroke-width: 1.5;
}

.mc-curves .mc-curves__axis-label {
  fill: #24211f;
  font-size: 12.5px;
  font-weight: 700;
}

.mc-curves .mc-curves__line {
  fill: none;
  stroke-width: 2.6;
  stroke-linecap: round;
}

.mc-curves .mc-curves__line--hours { stroke: #8a8178; stroke-dasharray: 5 4; stroke-width: 2; }
.mc-curves .mc-curves__line--capacity { stroke: #7650b7; stroke-width: 3.2; }
.mc-curves .mc-curves__line--leverage { stroke: #287a45; stroke-width: 3.2; }
.mc-curves .mc-curves__line--loc { stroke: #b7791f; stroke-dasharray: 6 4; }
.mc-curves .mc-curves__line--pr { stroke: #c2562d; stroke-dasharray: 6 4; }
.mc-curves .mc-curves__line--story { stroke: #a8323e; stroke-dasharray: 6 4; }

.mc-curves .mc-curves__dot--capacity { fill: #7650b7; }
.mc-curves .mc-curves__dot--leverage { fill: #287a45; }
.mc-curves .mc-curves__dot--loc { fill: #b7791f; }
.mc-curves .mc-curves__dot--pr { fill: #c2562d; }
.mc-curves .mc-curves__dot--story { fill: #a8323e; }

.mc-curves .mc-curves__legend text {
  fill: #625b54;
  font-size: 11px;
}

.mc-curves .mc-curves__legend-name {
  fill: #24211f;
  font-weight: 700;
}

.mc-curves .mc-curves__panel {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
  padding: 10px 13px;
  border: 1.5px solid #d8cfc2;
  border-radius: 10px;
  background: #fff;
}

.mc-curves .mc-curves__panel > div {
  display: grid;
  gap: 2px;
}

.mc-curves .mc-curves__panel-title {
  color: #24211f;
  font-size: 16px;
  line-height: 1.2;
}

.mc-curves .mc-curves__term {
  font-size: 14px;
  line-height: 1.2;
}

.mc-curves .mc-curves__term--capacity { color: #7650b7; }
.mc-curves .mc-curves__term--leverage { color: #287a45; }
.mc-curves .mc-curves__term--scope { color: #a8323e; }

.mc-curves .mc-curves__panel span {
  color: #3d3833;
  font-size: 12.5px;
  line-height: 1.3;
}

.mc-curves .mc-curves__panel .mc-curves__formula {
  display: grid;
  gap: 3px;
  margin: auto 0 0;
  padding-top: 8px;
  border-top: 1px solid #d8cfc2;
}

.mc-curves .mc-curves__formula b {
  color: #1f6338;
  font-size: 13.5px;
  line-height: 1.25;
}

.mc-curves .mc-curves__formula span {
  font-style: italic;
}
</style>
