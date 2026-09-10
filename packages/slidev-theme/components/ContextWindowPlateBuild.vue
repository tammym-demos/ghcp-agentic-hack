<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, useId } from "vue";

/*
  CONTEXT WINDOW — GENERATED PLATE + NATIVE $clicks BUILD

  This is a NEW concept-specific component for the slide 18 look-development
  experiment. `ContextWindowFunnelAnimation.vue` is untouched and remains the
  delivered slide 18 and the comparison baseline.

  The dividing line this component exists to prove:

    GENERATED PIXELS carry the WORLD ONLY — environment, light, depth,
    materials, set dressing, character presence. One pinned raster. It never
    moves and it never animates.

    NATIVE SVG/HTML carries EVERYTHING THAT CHANGES STATE — the category word,
    the accumulating example tiles, the vessel, the fill, the reserved headroom
    and the compaction. All of it driven by `$clicks`.

  PRESENTER-DRIVEN, NEVER CLOCK-DRIVEN. `ModelRoutingStaticPlate.vue` pins a
  generated raster the same way but reveals its layers on CSS delays, so the
  presenter cannot hold, pace, or step back. That timing model is deliberately
  NOT copied. Here `step` is the only source of truth: every visible element is
  a pure function of it, so holding a beat indefinitely, stepping backward, and
  entering the slide in reverse all land in exactly the right resting state.
*/
const TOTAL_STEPS = 7;
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value ?? TOTAL_STEPS, TOTAL_STEPS)));

// Every `defs` id is scoped to this instance so live slide, presenter view and
// export cannot clip or shade each other.
const uid = `ctxplate-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
const pid = (key: string) => `${key}-${uid}`;

/*
  The five categories. Labels are VERBATIM from the shipped slide 18 — the words
  and the relatable examples were identified as the strongest part of that
  animation, so nothing here is paraphrased, re-ordered or "improved".

  `powLines` only chooses where the POW word breaks; it never changes a word.

  `form` is the substance's FORM, and it is the primary distinguisher: rules,
  bubbles, hatch, grid, wave. Colour is secondary, so the five materials survive
  a dim projector and colour-blind viewing.
*/
const categories = [
  { key: "instructions", label: "Instructions", powLines: ["Instructions"], form: "rules", tint: "#ddf4ff", accent: "#0969da" },
  { key: "history", label: "Conversation history", powLines: ["Conversation", "history"], form: "bubbles", tint: "#f3e8ff", accent: "#8250df" },
  { key: "references", label: "References & files", powLines: ["References", "& files"], form: "hatch", tint: "#dafbe1", accent: "#1a7f37" },
  { key: "tools", label: "Tool definitions & results", powLines: ["Tool definitions", "& results"], form: "grid", tint: "#fff1cf", accent: "#9a6700" },
  { key: "output", label: "Prior model output", powLines: ["Prior model", "output"], form: "wave", tint: "#e6eaef", accent: "#57606a" }
];

/*
  Concrete examples, VERBATIM from the shipped slide 18, in the same order.

  Conversation history owns three of the seven fill layers, so that one stop
  visibly accumulates more volume than any other — which is what makes the
  compaction stop land, because conversation is what compaction acts on.

  `fate` drives the compaction stop, matching the semantics of the shipped
  slide: keep survives untouched, the three conversation turns condense into one
  structured summary, lift survives and closes the freed gap, lost greys out and
  goes, because compaction can lose fine detail.
*/
const items = [
  { key: "instr", cat: 0, step: 1, l1: "Always add tests before", l2: "changing shared code", fate: "keep" },
  { key: "conv1", cat: 1, step: 2, l1: "Why is the checkout total", l2: "off by one cent?", fate: "merge" },
  { key: "conv2", cat: 1, step: 2, l1: "Show me where that", l2: "rounding happens", fate: "merge" },
  { key: "conv3", cat: 1, step: 2, l1: "Now fix it without", l2: "changing the API", fate: "merge" },
  { key: "refs", cat: 2, step: 3, l1: "The pricing module and", l2: "its unit tests", fate: "lift" },
  { key: "tools", cat: 3, step: 4, l1: "Test run: three failures", l2: "in pricing tests", fate: "lost" },
  { key: "output", cat: 4, step: 5, l1: "Earlier answer: a patch", l2: "you did not apply", fate: "lost" }
];

// The summary tile copy is also verbatim from the shipped slide 18.
const SUMMARY = { l1: "Summary of earlier turns", l2: "structured summary kept" };

const compacted = computed(() => step.value >= 7);

/*
  THE POW WORD.

  The named defect of the shipped slide 18 is that the words are too small to
  see. So the category word is the hero of the beat: it lands big, in the
  region measured clean on this exact plate (x 0.03-0.53, y 0.05-0.34), and it
  arrives with force on its own click.

  The size is derived, not hand-tuned per word, so the two constraints that
  actually matter are enforced rather than hoped for: the longest line must fit
  the measured clean WIDTH, and the block must fit the measured clean HEIGHT.
  0.60em is a conservative average advance for a 900-weight sans, and the height
  cap is what stops a short word from overflowing the quiet band.
*/
const POW_BOX_W = 49; // cqw of usable width inside the clean zone
const POW_BOX_H = 13.2; // cqw equivalent of the clean band height
const powFont = (lines: string[]) => {
  const longest = Math.max(...lines.map((line) => line.length));
  return Math.min(POW_BOX_W / (longest * 0.6), POW_BOX_H / (lines.length * 0.98));
};

// The category owning the current stop. Stops 6 and 7 are about the vessel, so
// no category word competes with them.
const powCategory = computed(() => {
  const owning = items.find((item) => item.step === step.value);
  return owning ? categories[owning.cat] : null;
});

/*
  THE EXAMPLE COLUMN.

  Tiles read top-down in the order the talk track names them, but the block is
  anchored to the BOTTOM of the column, so it grows upward as it accumulates —
  the same direction as the fill, rather than mirroring it. Deliberately a
  second, much smaller type scale — roughly one fifth of the POW word — so the
  contrast between "the word" and "the examples" is unmistakable.
*/
type Tile = { key: string; cat: number; l1: string; l2: string; ghost: boolean };

const tiles = computed<Tile[]>(() => {
  if (!compacted.value) {
    return items
      .filter((item) => step.value >= item.step)
      .map((item) => ({ key: item.key, cat: item.cat, l1: item.l1, l2: item.l2, ghost: false }));
  }
  return [
    { key: "instr", cat: 0, l1: items[0].l1, l2: items[0].l2, ghost: false },
    { key: "summary", cat: 1, l1: SUMMARY.l1, l2: SUMMARY.l2, ghost: false },
    { key: "refs", cat: 2, l1: items[4].l1, l2: items[4].l2, ghost: false }
  ];
});

/*
  ===== VESSEL GEOMETRY =====

  Authored fresh for this plate. The vessel is native SVG standing in the
  world, drawn in one-point perspective: the mouth is an ellipse and every
  horizontal section is a smaller ellipse of the same eccentricity, so the
  bands, the reserved line and the compacted mass all obey one perspective rule
  and cannot disagree with each other.
*/
const CX = 200;
const MOUTH_Y = 44;
const MOUTH_RX = 186;
const MOUTH_RY = 32;
const THROAT_Y = 356;
const THROAT_HALF = 24;
const FLOOR_Y = 414;
const SLOPE = (MOUTH_RX - THROAT_HALF) / (THROAT_Y - MOUTH_Y);

const n = (value: number) => Math.round(value * 100) / 100;
const halfAt = (y: number) => (y <= THROAT_Y ? MOUTH_RX - SLOPE * (y - MOUTH_Y) : THROAT_HALF);
const ryAt = (y: number) => (MOUTH_RY * halfAt(y)) / MOUTH_RX;

const arcTo = (x: number, y: number, rx: number, ry: number, sweep: 0 | 1) =>
  `A${n(rx)},${n(ry)} 0 0 ${sweep} ${n(x)},${n(y)}`;

const ellipsePath = (cy: number, rx: number, ry: number) =>
  `M${n(CX - rx)},${n(cy)} ${arcTo(CX + rx, cy, rx, ry, 1)} ${arcTo(CX - rx, cy, rx, ry, 1)} Z`;

// A band is the frustum slice between two heights, bounded above by the FRONT
// arc of its own surface and below by the FRONT arc of the surface beneath it.
const bandPath = (yTop: number, yBot: number) => {
  const hTop = halfAt(yTop);
  const hBot = halfAt(yBot);
  return [
    `M${n(CX - hTop)},${n(yTop)}`,
    arcTo(CX + hTop, yTop, hTop, ryAt(yTop), 0),
    `L${n(CX + hBot)},${n(yBot)}`,
    arcTo(CX - hBot, yBot, hBot, ryAt(yBot), 1),
    "Z"
  ].join(" ");
};

const CONE_OUTLINE = `M${CX - MOUTH_RX},${MOUTH_Y} L${CX - THROAT_HALF},${THROAT_Y} L${CX - THROAT_HALF},${FLOOR_Y} L${CX + THROAT_HALF},${FLOOR_Y} L${CX + THROAT_HALF},${THROAT_Y} L${CX + MOUTH_RX},${MOUTH_Y}`;

/*
  RESERVED OUTPUT HEADROOM.

  The fill has a hard ceiling at the reserved line, and there are exactly seven
  equal layers between that line and the fill base — one per example. So the
  seventh layer's own surface IS the reserved line, and the halt is exact by
  construction rather than by tuning. The headroom above it therefore stays
  visibly unfilled in every beat, including the fullest one.
*/
const RESERVED_Y = 128;
const RESERVED_HALF = halfAt(RESERVED_Y);
const RESERVED_RY = ryAt(RESERVED_Y);
const HEADROOM_PATH = `M${CX - MOUTH_RX},${MOUTH_Y} ${arcTo(CX + MOUTH_RX, MOUTH_Y, MOUTH_RX, MOUTH_RY, 1)} L${n(CX + RESERVED_HALF)},${RESERVED_Y} ${arcTo(CX - RESERVED_HALF, RESERVED_Y, RESERVED_HALF, RESERVED_RY, 0)} Z`;

const FILL_BASE = THROAT_Y;
const LAYER = (FILL_BASE - RESERVED_Y) / 7;

/*
  The fill layers. Before compaction there is one layer per revealed example, so
  conversation history occupies three of seven and visibly dominates. At the
  compaction stop the surviving material is instructions, the structured
  summary, and references — three layers — so the drop is large and unmistakable
  and it is the accumulated material itself that moves.
*/
const bands = computed(() => {
  const cats = compacted.value
    ? [0, 1, 2]
    : items.filter((item) => step.value >= item.step).map((item) => item.cat);
  return cats.map((cat, index) => ({
    cat,
    index,
    top: FILL_BASE - (index + 1) * LAYER,
    bottom: FILL_BASE - index * LAYER
  }));
});

const surfaceY = computed(() => (bands.value.length ? bands.value[bands.value.length - 1].top : FILL_BASE));

// The rim reads the state of the vessel: filling, then at the caution, then resolved.
const rimColor = computed(() => (step.value >= 7 ? "#1f883d" : step.value >= 6 ? "#bf8700" : "#0969da"));
</script>

<template>
  <div class="plate-stage">
    <!--
      The plate is decorative. It carries no teaching information that is not
      also present as real text, so it is hidden from assistive technology
      rather than described twice.
    -->
    <img
      class="plate"
      src="/images/context-window-plate-workshop-corner.png"
      alt=""
      aria-hidden="true"
    />

    <!-- Everything below is native, real text, and derived from `step`. -->
    <div class="eyebrow">Context window</div>
    <p class="subtitle">Fixed capacity — varies by model</p>

    <div class="pow" aria-live="polite">
      <div v-if="powCategory" :key="powCategory.key" class="pow-word" :style="{ color: powCategory.accent }">
        <span
          v-for="line in powCategory.powLines"
          :key="line"
          class="pow-line"
          :style="{ fontSize: `${powFont(powCategory.powLines)}cqw` }"
          >{{ line }}</span
        >
      </div>
    </div>

    <ul class="column">
      <li v-for="tile in tiles" :key="tile.key" class="tile" :style="{ borderLeftColor: categories[tile.cat].accent }">
        <svg class="tile-form" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <rect x="0" y="0" width="20" height="20" rx="3" :fill="categories[tile.cat].tint" />
          <rect x="0" y="0" width="20" height="20" rx="3" :fill="`url(#${pid(categories[tile.cat].form)})`" />
        </svg>
        <span class="tile-text">
          <span class="tile-line">{{ tile.l1 }}</span>
          <span class="tile-line">{{ tile.l2 }}</span>
        </span>
      </li>
    </ul>

    <div class="vessel">
      <svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
        <defs>
          <!--
            Five substances, five FORMS. Form is the primary distinguisher and
            colour is secondary, so the materials stay distinguishable on a dim
            projector and to a colour-blind viewer.
          -->
          <pattern :id="pid('rules')" width="10" height="7" patternUnits="userSpaceOnUse">
            <line x1="0" y1="3.5" x2="10" y2="3.5" stroke="#0969da" stroke-width="2.2" opacity=".55" />
          </pattern>
          <pattern :id="pid('bubbles')" width="11" height="11" patternUnits="userSpaceOnUse">
            <circle cx="5.5" cy="5.5" r="3.2" fill="#8250df" opacity=".5" />
          </pattern>
          <pattern :id="pid('hatch')" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#1a7f37" stroke-width="3" opacity=".5" />
          </pattern>
          <pattern :id="pid('grid')" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="1.6" y="1.6" width="6.8" height="6.8" fill="none" stroke="#9a6700" stroke-width="2.2" opacity=".62" />
          </pattern>
          <pattern :id="pid('wave')" width="16" height="10" patternUnits="userSpaceOnUse">
            <path d="M0,7 q4,-6 8,0 q4,6 8,0" fill="none" stroke="#57606a" stroke-width="2.2" opacity=".6" />
          </pattern>

          <clipPath :id="pid('interior')">
            <path
              :d="`M${CX - MOUTH_RX},${MOUTH_Y} ${arcTo(CX + MOUTH_RX, MOUTH_Y, MOUTH_RX, MOUTH_RY, 1)} L${CX + THROAT_HALF},${THROAT_Y} L${CX + THROAT_HALF},${FLOOR_Y} L${CX - THROAT_HALF},${FLOOR_Y} L${CX - THROAT_HALF},${THROAT_Y} Z`"
            />
          </clipPath>
          <linearGradient :id="pid('glass')" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#ffffff" stop-opacity=".5" />
            <stop offset=".3" stop-color="#ffffff" stop-opacity=".08" />
            <stop offset="1" stop-color="#1f2328" stop-opacity=".12" />
          </linearGradient>
        </defs>

        <!-- Contact shadow, so the vessel sits in the plate's light rather than floating on it. -->
        <ellipse :cx="CX" :cy="FLOOR_Y + 8" rx="86" ry="13" fill="#5a4632" opacity=".22" />

        <!-- Glass body, translucent so the world behind it stays visible. -->
        <path
          :d="`M${CX - MOUTH_RX},${MOUTH_Y} ${arcTo(CX + MOUTH_RX, MOUTH_Y, MOUTH_RX, MOUTH_RY, 1)} L${CX + THROAT_HALF},${THROAT_Y} L${CX + THROAT_HALF},${FLOOR_Y} L${CX - THROAT_HALF},${FLOOR_Y} L${CX - THROAT_HALF},${THROAT_Y} Z`"
          fill="#fffdf8"
          opacity=".72"
        />

        <g :clip-path="`url(#${pid('interior')})`">
          <!-- Reserved output headroom: never filled, in any beat. -->
          <path :d="HEADROOM_PATH" :fill="step >= 6 ? '#fff8c5' : '#ffffff'" :opacity="step >= 6 ? 0.85 : 0.3" class="tr" />

          <g v-for="band in bands" :key="`${band.cat}-${band.index}`" class="tr band">
            <path :d="bandPath(band.top, band.bottom)" :fill="categories[band.cat].tint" />
            <path :d="bandPath(band.top, band.bottom)" :fill="`url(#${pid(categories[band.cat].form)})`" />
          </g>

          <!-- The topmost surface, drawn as a full ellipse so the fill reads as a volume. -->
          <path
            v-if="bands.length"
            class="tr"
            :d="ellipsePath(surfaceY, halfAt(surfaceY), ryAt(surfaceY))"
            :fill="categories[bands[bands.length - 1].cat].tint"
            stroke="#ffffff"
            stroke-width="2"
          />
        </g>

        <!-- The reserved line itself. Dashed, and lit at the caution stop. -->
        <path
          class="tr"
          :d="ellipsePath(RESERVED_Y, RESERVED_HALF, RESERVED_RY)"
          fill="none"
          :stroke="step >= 6 ? '#bf8700' : '#8c959f'"
          :stroke-width="step >= 6 ? 4 : 2.4"
          stroke-dasharray="10 8"
        />

        <path :d="CONE_OUTLINE" fill="none" :stroke="rimColor" stroke-width="4.5" stroke-linejoin="round" class="tr" />
        <path :d="CONE_OUTLINE" :fill="`url(#${pid('glass')})`" opacity=".7" stroke="none" />
        <ellipse :cx="CX" :cy="MOUTH_Y" :rx="MOUTH_RX" :ry="MOUTH_RY" fill="none" :stroke="rimColor" stroke-width="5" class="tr" />
        <rect :x="CX - 96" :y="FLOOR_Y" width="192" height="12" rx="6" fill="#8c7a63" opacity=".55" />
      </svg>

      <div class="vessel-notes">
        <span class="note" :class="{ on: step >= 6 }">Reserved output headroom</span>
        <span class="note note-compact" :class="{ on: compacted }">compact</span>
      </div>
    </div>

    <p class="footnote footnote-compact" :class="{ on: compacted }">
      Compaction is available in VS Code and Copilot CLI
    </p>
  </div>
</template>

<style scoped>
.plate-stage {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  container-type: size;
  font-family: "Mona Sans", Inter, sans-serif;
  color: #1f2328;
  background: #f2ece3;
}

/* The plate is pinned. Fixed camera: it never moves and it never animates. */
.plate {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.eyebrow {
  position: absolute;
  left: 3%;
  top: 3.6%;
  font-size: 1.5cqw;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #6b5a45;
}

.subtitle {
  position: absolute;
  left: 3%;
  top: 6.8%;
  margin: 0;
  font-size: 1.25cqw;
  font-weight: 600;
  color: #7a684f;
}

/*
  The POW zone. These bounds are the region MEASURED clean on this exact plate —
  edge energy 0.00% and minimum luminance 165 to x 0.53 — which is why the word
  stops there rather than at the originally specified x 0.68, where Mergewell's
  hair drops minimum luminance to 4.
*/
.pow {
  position: absolute;
  left: 3%;
  top: 10.5%;
  width: 50%;
  height: 23.5%;
}

.pow-word {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.pow-line {
  display: block;
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: -0.02em;
  white-space: nowrap;
  /*
    The impact. This is a transition on a state change, not a keyframe on a
    clock — it fires because the presenter clicked, and it resolves and holds.
  */
  animation: pow-land 0.34s cubic-bezier(0.16, 1.02, 0.3, 1.32) both;
  text-shadow: 0 0.12cqw 0.5cqw rgba(255, 250, 242, 0.85);
}

@keyframes pow-land {
  from {
    opacity: 0;
    transform: translateY(0.9cqw) scale(0.93);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/*
  The example column, in the region measured clean full height on this plate —
  edge energy 0.00%, minimum luminance 165 across x 0.03-0.40.
*/
.column {
  position: absolute;
  left: 3%;
  top: 36%;
  width: 39%;
  height: 60%;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.35cqw;
}

.tile {
  display: flex;
  align-items: center;
  gap: 0.7cqw;
  padding: 0.5cqw 0.7cqw;
  border-left: 0.45cqw solid;
  border-radius: 0.35cqw;
  background: rgba(255, 253, 248, 0.9);
  box-shadow: 0 0.1cqw 0.4cqw rgba(90, 70, 50, 0.16);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.tile-form {
  flex: 0 0 auto;
  width: 2cqw;
  height: 2cqw;
}

.tile-text {
  display: flex;
  flex-direction: column;
}

.tile-line {
  font-size: 1.42cqw;
  line-height: 1.18;
  font-weight: 600;
  color: #24292f;
  white-space: nowrap;
}

/*
  The vessel stands in the world at lower right, clear of both type zones: its
  ink begins well right of the column at x 0.40 and well below the POW band at
  y 0.34.
*/
.vessel {
  position: absolute;
  left: 50%;
  top: 45%;
  width: 27%;
  height: 52%;
}

.vessel svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.tr {
  transition: d 0.4s ease, fill 0.35s ease, opacity 0.35s ease, stroke 0.35s ease, stroke-width 0.35s ease;
}

.vessel-notes {
  position: absolute;
  left: 0;
  top: 4%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4cqw;
  pointer-events: none;
}

.note {
  font-size: 1.15cqw;
  font-weight: 700;
  color: #7d5e00;
  background: rgba(255, 248, 197, 0.92);
  border-radius: 0.3cqw;
  padding: 0.15cqw 0.55cqw;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.note.on {
  opacity: 1;
}

.note-compact {
  color: #ffffff;
  background: #1f883d;
}

.footnote {
  position: absolute;
  left: 3%;
  bottom: 1.2%;
  margin: 0;
  font-size: 1.05cqw;
  font-weight: 600;
  color: #6b5a45;
}

.footnote-compact {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.footnote-compact.on {
  opacity: 1;
}

/*
  REDUCED MOTION.

  Motion is removed, but the PRESENTER'S STEPPING IS PRESERVED. Clicks still
  move through exactly the same seven states, transitions resolve instantly, and
  the complete final teaching state renders immediately — because both paths
  read from the same `step` value and no state is stored in an animation.
*/
@media (prefers-reduced-motion: reduce) {
  .plate-stage *,
  .plate-stage *::before,
  .plate-stage *::after {
    transition: none !important;
    animation: none !important;
    transition-delay: 0s !important;
    animation-delay: 0s !important;
  }

  .pow-line {
    opacity: 1;
    transform: none;
  }
}
</style>
