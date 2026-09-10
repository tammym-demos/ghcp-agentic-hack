<script setup lang="ts">
import { useSlideContext, onSlideEnter } from "@slidev/client";
import { computed, ref, useId, watch } from "vue";

// Every `defs` id is scoped to this component instance so multiple renders
// (live slide, presenter view, print/export) cannot clip or shade each other.
const uid = `ctxfunnel-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
const ids = {
  clip: `clip-${uid}`,
  hatch: `hatch-${uid}`,
  wallShade: `wallShade-${uid}`,
  wallLight: `wallLight-${uid}`,
  mouthShade: `mouthShade-${uid}`,
  throat: `throat-${uid}`,
  ground: `ground-${uid}`,
  cast: `cast-${uid}`
};

/*
  PRESENTER-DRIVEN STATE MACHINE

  The slide is advanced by the presenter, not by a clock. `$clicks` is Slidev's
  click index for this slide; the slide frontmatter declares `clicks: 7` so
  Slidev knows how many stops the slide owns.

  `step` is the ONLY source of truth. Every visible element derives its resting
  state from a pure function of `step`, so there is no separately maintained
  "final state" that could drift from the animated states — the final state is
  simply `step === TOTAL_STEPS`, rendered by the same expressions.

  Stops:
    0  empty bounded funnel, capacity rail, empty slots  (resting entry state)
    1  Instructions
    2  Conversation history (three turns, played automatically within the stop)
    3  References & files
    4  Tool definitions & results
    5  Prior model output  -> the fill now halts beneath the dashed line
    6  Reserved output headroom lights up, and the caution lands
    7  compact: the accumulated contents are visibly compacted

  The ordering this slide depends on is guaranteed structurally rather than by
  timing: the headroom cannot light before the fill halts, because the halt
  completes at stop 5 and the headroom belongs to stop 6.
*/
const TOTAL_STEPS = 7;
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value ?? TOTAL_STEPS, TOTAL_STEPS)));

/*
  Direction tracking. Moving FORWARD into a stop plays that stop's transient
  staging (the large category word, its example artifact, and the drop). Moving
  BACKWARD lands directly in the destination stop's resting state instead of
  replaying it, so clicking back is a clean correction rather than a re-perform.

  Entering the slide — including entering it in reverse from the next slide — is
  neutral, so reverse entry lands in the complete final state with no motion.
*/
const advancing = ref(false);

watch(step, (next, prev) => {
  advancing.value = next > prev;
});

onSlideEnter(() => {
  advancing.value = false;
});

// The five context categories, in the order the talk track names them.
const categories = [
  { key: "instructions", label: "Instructions", tint: "#ddf4ff", accent: "#0969da" },
  { key: "history", label: "Conversation history", tint: "#f3e8ff", accent: "#8250df" },
  { key: "references", label: "References & files", tint: "#dafbe1", accent: "#1a7f37" },
  { key: "tools", label: "Tool definitions & results", tint: "#fff1cf", accent: "#9a6700" },
  { key: "output", label: "Prior model output", tint: "#e6eaef", accent: "#57606a" }
];

/*
  Concrete examples. Deliberately generic engineering language: no product
  surface is named, no command, file path, repository, customer or workplace is
  implied, and no capability is claimed.

  `step` is the click stop the item belongs to and `ord` is its position within
  that stop. Conversation history owns three ordinals, so that one stop visibly
  accumulates more volume than the others — which is what makes the compaction
  stop land, because conversation is what compaction acts on.

  `fate` drives the compaction stop:
    keep   - survives untouched
    merge* - the three conversation turns condense into one summary tile
    lift   - survives and slides down to close the freed gap
    lost   - greys out and disappears (compaction can lose fine detail)
*/
const items = [
  { key: "instr", cat: 0, step: 1, ord: 0, l1: "Always add tests before", l2: "changing shared code", fate: "keep" },
  { key: "conv1", cat: 1, step: 2, ord: 0, l1: "Why is the checkout total", l2: "off by one cent?", fate: "merge0" },
  { key: "conv2", cat: 1, step: 2, ord: 1, l1: "Show me where that", l2: "rounding happens", fate: "merge1" },
  { key: "conv3", cat: 1, step: 2, ord: 2, l1: "Now fix it without", l2: "changing the API", fate: "merge2" },
  { key: "refs", cat: 2, step: 3, ord: 0, l1: "The pricing module and", l2: "its unit tests", fate: "lift" },
  { key: "tools", cat: 3, step: 4, ord: 0, l1: "Test run: three failures", l2: "in pricing tests", fate: "lost" },
  { key: "output", cat: 4, step: 5, ord: 0, l1: "Earlier answer: a patch", l2: "you did not apply", fate: "lost" }
];

type Item = (typeof items)[number];

/*
  Staging pace. Total runtime is not a constraint: the slide holds indefinitely
  at every stop, so each beat is timed for a first-time reader in an audience
  rather than for a budget.

    0.0 - 0.5   category word rises in
    0.5 - 2.6   word holds, fully readable
    2.6 - 3.0   word clears
    2.7 - 3.2   example artifact rises into the vacated position
    3.2 - 5.3   example holds, fully readable
    5.3 - 6.7   example travels down through the mouth and is absorbed

  ORD_PITCH is longer than the example's whole life, so within the three-turn
  conversation stop no example ever overlaps the next and the third turn gets
  exactly the same reading time as the first.
*/
const ORD_PITCH = 3.9;
const tileDelay = (ord: number) => 2.7 + ord * ORD_PITCH;
const layerDelay = (ord: number) => tileDelay(ord) + 3;
const slotDelay = (ord: number) => tileDelay(ord) + 3.3;

// The transient staging area exists only while advancing into its own stop.
const stagingItems = computed<Item[]>(() =>
  advancing.value ? items.filter((item) => item.step === step.value) : []
);
const stagingCategory = computed(() =>
  stagingItems.value.length ? categories[stagingItems.value[0].cat] : null
);

const shown = (item: Item) => step.value >= item.step;

/*
  A delay applies only while the stop that owns the element is being entered
  forwards. In every other case the element resolves immediately, so backward
  navigation snaps to the correct resting state rather than unwinding a
  choreography in reverse.
*/
const paced = (item: Item, delay: (ord: number) => number) =>
  advancing.value && step.value === item.step ? `${delay(item.ord)}s` : "0s";

const tint = (index: number) => categories[items[index].cat].tint;
const accent = (index: number) => categories[items[index].cat].accent;

// Persistent tile column down the left edge: seven slots of 34 at a pitch of 40.
// Slots fill BOTTOM-UP so the column accumulates in the same direction as the
// funnel fill and the colours line up rather than mirroring.
const slotTop = (index: number) => 316 - index * 40;

/*
  ===== VESSEL GEOMETRY =====

  The vessel is drawn in one-point perspective: the mouth is an ellipse rather
  than a straight line, and every horizontal section through the cone is a
  smaller ellipse of the same eccentricity. `halfAt` gives the cone half-width at
  a height and `ryAt` gives the matching ellipse depth, so bands, the reserved
  line and the compacted mass all share one perspective rule and cannot disagree.
*/
const CX = 680;
const MOUTH_Y = 108;
const MOUTH_RX = 380;
const MOUTH_RY = 34;
const THROAT_Y = 306;
const THROAT_HALF = 32;
const FLOOR_Y = 362;
const SLOPE = (MOUTH_RX - THROAT_HALF) / (THROAT_Y - MOUTH_Y);

const n = (value: number) => Math.round(value * 100) / 100;
const halfAt = (y: number) => (y <= THROAT_Y ? MOUTH_RX - SLOPE * (y - MOUTH_Y) : THROAT_HALF);
const ryAt = (y: number) => (MOUTH_RY * halfAt(y)) / MOUTH_RX;

// Closed ellipse as a path, so rings can be built with even-odd fill.
const ellipsePath = (cy: number, rx: number, ry: number) =>
  `M${n(CX - rx)},${n(cy)} A${n(rx)},${n(ry)} 0 0 1 ${n(CX + rx)},${n(cy)} A${n(rx)},${n(ry)} 0 0 1 ${n(CX - rx)},${n(cy)} Z`;

// sweep 1 left->right traces the BACK of an ellipse; sweep 0 traces the FRONT.
const arcTo = (x: number, y: number, rx: number, ry: number, sweep: 0 | 1) =>
  `A${n(rx)},${n(ry)} 0 0 ${sweep} ${n(x)},${n(y)}`;

// Side walls insert the throat corner when a band spans the taper break.
const wallDown = (yTop: number, yBot: number, side: 1 | -1) =>
  yTop < THROAT_Y && yBot > THROAT_Y
    ? `L${n(CX + side * THROAT_HALF)},${THROAT_Y} L${n(CX + side * halfAt(yBot))},${n(yBot)}`
    : `L${n(CX + side * halfAt(yBot))},${n(yBot)}`;

/*
  A band is the frustum slice between two heights: bounded above by the FRONT arc
  of its own surface and below by the FRONT arc of the surface beneath it. Each
  band also carries a full surface ellipse at its top, whose back half is covered
  by the band above once that band exists — so whichever band is currently
  topmost shows a complete elliptical liquid surface, automatically.
*/
const bandPath = (yTop: number, yBot: number) => {
  const hTop = halfAt(yTop);
  const hBot = halfAt(yBot);
  return [
    `M${n(CX - hTop)},${n(yTop)}`,
    arcTo(CX + hTop, yTop, hTop, ryAt(yTop), 0),
    wallDown(yTop, yBot, 1),
    arcTo(CX - hBot, yBot, hBot, ryAt(yBot), 1),
    yTop < THROAT_Y && yBot > THROAT_Y ? `L${n(CX - THROAT_HALF)},${THROAT_Y}` : "",
    "Z"
  ]
    .filter(Boolean)
    .join(" ");
};

// Outer silhouette: back arc of the mouth, then both walls down to the stand.
const INTERIOR_PATH = `M${CX - MOUTH_RX},${MOUTH_Y} ${arcTo(CX + MOUTH_RX, MOUTH_Y, MOUTH_RX, MOUTH_RY, 1)} L${CX + THROAT_HALF},${THROAT_Y} L${CX + THROAT_HALF},${FLOOR_Y} L${CX - THROAT_HALF},${FLOOR_Y} L${CX - THROAT_HALF},${THROAT_Y} Z`;

// The stroked cone outline. Open at the top, because the mouth is the rim ring.
const CONE_OUTLINE = `M${CX - MOUTH_RX},${MOUTH_Y} L${CX - THROAT_HALF},${THROAT_Y} L${CX - THROAT_HALF},${FLOOR_Y} L${CX + THROAT_HALF},${FLOOR_Y} L${CX + THROAT_HALF},${THROAT_Y} L${CX + MOUTH_RX},${MOUTH_Y}`;

// Reserved output headroom: from the back of the mouth down to the back of the
// reserved line, so the fill's own elliptical surface is never tinted by it.
const RESERVED_Y = 182;
const RESERVED_HALF = halfAt(RESERVED_Y);
const RESERVED_RY = ryAt(RESERVED_Y);
const HEADROOM_PATH = `M${CX - MOUTH_RX},${MOUTH_Y} ${arcTo(CX + MOUTH_RX, MOUTH_Y, MOUTH_RX, MOUTH_RY, 1)} L${n(CX + RESERVED_HALF)},${RESERVED_Y} ${arcTo(CX - RESERVED_HALF, RESERVED_Y, RESERVED_HALF, RESERVED_RY, 0)} Z`;

// Fill: floor 362, hard ceiling at the reserved line. Seven equal layers, one per
// example, so the top layer's own surface IS the reserved line and the halt is
// exact by construction rather than by tuning.
const LAYER = (FLOOR_Y - RESERVED_Y) / 7;
const segTop = (index: number) => FLOOR_Y - (index + 1) * LAYER;
const segBottom = (index: number) => FLOOR_Y - index * LAYER;

const COMPACTED_Y = 278;

const fateShift = (fate: string) => {
  if (fate === "merge1") return "translateY(40px)";
  if (fate === "merge2" || fate === "lift") return "translateY(80px)";
  return "translateY(0)";
};

/*
  Capacity rail. FND-12 supports two claims and no more: context window size
  varies by model, and selected supported models offer an OPTIONAL 1M-token
  context in VS Code and Copilot CLI. It does not establish token counts for
  named models, so this indicator is deliberately comparative — three vessels of
  different size, the middle one marked as the one currently depicted — and
  carries no per-model figures. The only concrete number on the rail is the
  1M-token optional context, with its qualifiers intact.
*/
const RAIL_BASE = 336;
const capacityGlyphs = [
  { key: "smaller", cx: 880, w: 40, top: 302, label: "smaller", active: false },
  { key: "current", cx: 946, w: 64, top: 286, label: "this model", active: true },
  { key: "larger", cx: 1032, w: 92, top: 268, label: "larger", active: false }
];

const glyphPath = (g: (typeof capacityGlyphs)[number]) =>
  `M${g.cx - g.w / 2},${g.top} L${g.cx + g.w / 2},${g.top} L${g.cx + 4},${RAIL_BASE - 8} L${g.cx + 4},${RAIL_BASE} L${g.cx - 4},${RAIL_BASE} L${g.cx - 4},${RAIL_BASE - 8} Z`;

// The rim reads the state of the vessel: filling, at the caution, then resolved.
const rimColor = computed(() => (step.value >= 7 ? "#1f883d" : step.value >= 6 ? "#bf8700" : "#0969da"));
const rimLight = computed(() => (step.value >= 7 ? "#4ac26b" : step.value >= 6 ? "#e0ad2e" : "#54aeff"));
</script>

<template>
  <NativeAnimationStage
    label="A large bounded funnel labelled context window, drawn in perspective with an elliptical mouth, advanced by the presenter one category at a time. For each category a name appears in large type above the funnel — instructions, conversation history, references and files, tool definitions and results, prior model output — then is replaced by a short concrete example that drops into the funnel mouth. Each example adds one distinct coloured band to the fill and stays visible as a tile in a column beside the funnel. Conversation history contributes three turns, so it takes the most room. The fill stops exactly at the dashed reserved output headroom line, which then lights up. At the compact stop the three conversation tiles condense into one structured summary tile, two tiles grey out and disappear because fine detail can be lost, the remaining tile slides down, and the fill drops to free headroom. Purrmission, the workshop safety guardian, watches the reserved headroom. A small capacity rail beside the funnel shows three vessels of different size — smaller, this model, and larger — marking the depicted funnel as the model currently selected, because context window size varies by model. Selected supported models offer an optional one-million-token context in VS Code and Copilot CLI. Compaction is available in VS Code and Copilot CLI."
  >
    <div class="funnel-stage">
      <svg viewBox="0 0 1120 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <defs>
          <clipPath :id="ids.clip">
            <path :d="INTERIOR_PATH" />
          </clipPath>
          <pattern :id="ids.hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#0969da" stroke-width="2.6" opacity=".24" />
          </pattern>
          <!--
            Contour and shading. Every alpha stays low so the vessel gains wall
            depth and a lit side without building the kind of heavy gradient that
            dies on a projector.
          -->
          <linearGradient :id="ids.wallShade" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stop-color="#1f2328" stop-opacity=".16" />
            <stop offset=".45" stop-color="#1f2328" stop-opacity="0" />
          </linearGradient>
          <linearGradient :id="ids.wallLight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#ffffff" stop-opacity=".34" />
            <stop offset=".26" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
          <linearGradient :id="ids.mouthShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#1f2328" stop-opacity=".2" />
            <stop offset=".62" stop-color="#1f2328" stop-opacity="0" />
          </linearGradient>
          <radialGradient :id="ids.throat" cx=".5" cy=".5" r=".5">
            <stop offset="0" stop-color="#1f2328" stop-opacity=".18" />
            <stop offset="1" stop-color="#1f2328" stop-opacity="0" />
          </radialGradient>
          <radialGradient :id="ids.ground" cx=".5" cy=".5" r=".5">
            <stop offset="0" stop-color="#1f2328" stop-opacity=".22" />
            <stop offset=".7" stop-color="#1f2328" stop-opacity=".05" />
            <stop offset="1" stop-color="#1f2328" stop-opacity="0" />
          </radialGradient>
          <filter :id="ids.cast" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#1f2328" flood-opacity=".16" />
          </filter>
        </defs>

        <rect x="0" y="0" width="1120" height="400" fill="#fbfaf8" />

        <text class="t-title" x="24" y="26" fill="#1f2328">Context window</text>
        <text class="t-sub" x="24" y="42" fill="#57606a">Fixed capacity — varies by model</text>

        <!--
          Capacity rail — reference apparatus, not a teaching stop. Present from
          slide entry and never animated. Comparative by design: no per-model
          token figures appear on it. It absorbs the FND-12 1M-token note, which
          is therefore stated exactly once on the slide.
        -->
        <g class="capacity-rail">
          <text class="t-rail-head" x="1090" y="256" text-anchor="end" fill="#57606a">Vessel size = the model you selected</text>

          <path
            v-for="glyph in capacityGlyphs"
            :key="glyph.key"
            :d="glyphPath(glyph)"
            :fill="glyph.active ? '#eaeef2' : 'none'"
            :stroke="glyph.active ? '#57606a' : '#afb8c1'"
            :stroke-width="glyph.active ? 2.4 : 1.6"
            stroke-linejoin="round"
          />

          <rect x="930" y="338" width="32" height="2.5" rx="1.25" fill="#1f2328" />

          <text
            v-for="glyph in capacityGlyphs"
            :key="`gl-${glyph.key}`"
            :class="glyph.active ? 't-rail-active' : 't-rail-lbl'"
            :x="glyph.cx"
            y="350"
            text-anchor="middle"
            :fill="glyph.active ? '#1f2328' : '#8c959f'"
          >{{ glyph.label }}</text>

          <text class="t-ref" x="1090" y="366" text-anchor="end" fill="#8c959f">Selected supported models offer optional</text>
          <text class="t-ref" x="1090" y="379" text-anchor="end" fill="#8c959f">1M-token context in VS Code and Copilot CLI</text>
        </g>

        <!-- ===== the vessel ===== -->
        <g class="vessel">
          <ellipse cx="680" cy="384" rx="200" ry="15" :fill="`url(#${ids.ground})`" />
          <rect x="638" y="362" width="84" height="12" rx="5" fill="#e6eaef" stroke="#cfd7de" stroke-width="1.5" />
          <rect x="618" y="371" width="124" height="7" rx="3.5" fill="#dde3e9" stroke="#cfd7de" stroke-width="1.2" />

          <path :d="INTERIOR_PATH" fill="#ffffff" :filter="`url(#${ids.cast})`" />

          <g :clip-path="`url(#${ids.clip})`">
            <path :d="HEADROOM_PATH" :fill="`url(#${ids.hatch})`" opacity=".3" />
            <path class="tr headroom-hi" :d="HEADROOM_PATH" fill="#ddf4ff" :style="{ opacity: step >= 6 ? 0.85 : 0 }" />
            <path class="tr" :d="HEADROOM_PATH" :fill="`url(#${ids.hatch})`" :style="{ opacity: step >= 6 ? 1 : 0 }" />

            <!-- looking into an open vessel: the far interior falls away -->
            <path :d="ellipsePath(MOUTH_Y, MOUTH_RX, MOUTH_RY)" :fill="`url(#${ids.mouthShade})`" />

            <!--
              Seven banded layers, one per dropped example. Each band carries its
              own elliptical surface, so whichever band is currently topmost reads
              as a liquid surface in the same perspective as the mouth.
            -->
            <g
              class="tr fill-stack"
              :style="{
                transformBox: 'view-box',
                transformOrigin: '680px 362px',
                opacity: step >= 7 ? 0 : 1,
                transform: step >= 7 ? 'scaleY(.34)' : 'scaleY(1)',
                transitionDelay: step >= 7 ? '1s' : '0s'
              }"
            >
              <g
                v-for="(item, index) in items"
                :key="item.key"
                class="tr"
                :class="`seg-${index + 1}`"
                :style="{
                  transformBox: 'view-box',
                  transformOrigin: `680px ${segBottom(index)}px`,
                  transform: shown(item) ? 'scaleY(1)' : 'scaleY(0)',
                  transitionDelay: paced(item, layerDelay)
                }"
              >
                <path :d="bandPath(segTop(index), segBottom(index))" :fill="tint(index)" />
                <path :d="bandPath(segTop(index), segBottom(index))" :fill="accent(index)" opacity=".28" />
                <path :d="ellipsePath(segTop(index), halfAt(segTop(index)), ryAt(segTop(index)))" :fill="tint(index)" />
                <!-- the meniscus ring separates every band by shape, not by hue
                     alone, so the stack survives colour-vision deficiency -->
                <path
                  :d="ellipsePath(segTop(index), halfAt(segTop(index)), ryAt(segTop(index)))"
                  fill="none"
                  :stroke="accent(index)"
                  stroke-width="2"
                  opacity=".7"
                />
              </g>
            </g>

            <!-- what compaction leaves behind -->
            <g
              class="tr"
              :style="{
                transformBox: 'view-box',
                transformOrigin: '680px 362px',
                transform: step >= 7 ? 'scaleY(1)' : 'scaleY(0)',
                transitionDelay: step >= 7 ? '1.2s' : '0s'
              }"
            >
              <path :d="bandPath(COMPACTED_Y, FLOOR_Y)" fill="#dafbe1" />
              <path :d="bandPath(COMPACTED_Y, FLOOR_Y)" fill="#1a7f37" opacity=".18" />
              <path :d="ellipsePath(COMPACTED_Y, halfAt(COMPACTED_Y), ryAt(COMPACTED_Y))" fill="#dafbe1" />
              <path
                :d="ellipsePath(COMPACTED_Y, halfAt(COMPACTED_Y), ryAt(COMPACTED_Y))"
                fill="none"
                stroke="#1a7f37"
                stroke-width="1.8"
                opacity=".62"
              />
            </g>

            <!-- interior contour: light from the left, shadow down the right wall,
                 occlusion where the cone narrows into the throat -->
            <rect x="290" y="70" width="780" height="310" :fill="`url(#${ids.wallLight})`" />
            <rect x="290" y="70" width="780" height="310" :fill="`url(#${ids.wallShade})`" />
            <rect x="580" y="228" width="200" height="160" :fill="`url(#${ids.throat})`" />

            <!-- wall thickness read from inside, so the vessel has a wall rather
                 than an outline. Neutral so it survives the rim colour change. -->
            <path :d="INTERIOR_PATH" fill="none" stroke="#1f2328" stroke-width="26" opacity=".075" />
            <path :d="INTERIOR_PATH" fill="none" stroke="#1f2328" stroke-width="10" opacity=".1" />
          </g>

          <!-- The reserved line shares the fill's perspective exactly, so the halt
               is legible as a level rather than as an arbitrary rule. -->
          <path
            class="reserved-line"
            :d="ellipsePath(RESERVED_Y, RESERVED_HALF, RESERVED_RY)"
            fill="none"
            stroke="#0550ae"
            stroke-width="2.6"
            stroke-dasharray="9 7"
            opacity=".9"
          />

          <path class="funnel-rim tr" :d="CONE_OUTLINE" fill="none" :stroke="rimColor" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" />

          <!-- Elliptical mouth: a lighter outer lip with a darker inner wall
               beneath it, so the vessel reads as open and three-dimensional
               rather than as a flat line across the top of a triangle. -->
          <path
            class="funnel-lip tr"
            :d="ellipsePath(MOUTH_Y, 387, 34.6)"
            fill="none"
            :stroke="rimLight"
            stroke-width="10"
          />
          <path
            class="tr"
            :d="ellipsePath(MOUTH_Y, MOUTH_RX, MOUTH_RY)"
            fill="none"
            :stroke="rimColor"
            stroke-width="5.5"
          />
          <!-- inner wall thickness, read across the near lip only -->
          <path
            :d="`M${CX - 372},${MOUTH_Y} ${arcTo(CX + 372, MOUTH_Y, 372, 33.3, 0)}`"
            fill="none"
            stroke="#1f2328"
            stroke-width="6"
            stroke-linecap="round"
            opacity=".13"
          />
          <!-- specular highlight on the far lip -->
          <path
            :d="`M${CX - 300},${n(MOUTH_Y - 20.9)} ${arcTo(CX + 60, MOUTH_Y - 33.6, 380, 34, 1)}`"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            opacity=".4"
          />
        </g>

        <text
          class="tr t-headroom"
          x="680"
          y="140"
          text-anchor="middle"
          fill="#0550ae"
          :style="{ opacity: step >= 6 ? 1 : 0, transitionDelay: step >= 6 ? '.55s' : '0s' }"
        >Reserved output headroom</text>
        <text
          class="tr t-headroom-sub"
          x="680"
          y="159"
          text-anchor="middle"
          fill="#0550ae"
          :style="{ opacity: step >= 6 ? 1 : 0, transitionDelay: step >= 6 ? '.55s' : '0s' }"
        >the model still needs room to answer</text>

        <text
          class="tr t-freed"
          x="680"
          y="226"
          text-anchor="middle"
          fill="#57606a"
          :style="{ opacity: step >= 7 ? 1 : 0, transitionDelay: step >= 7 ? '2.4s' : '0s' }"
        >Room freed for what matters now</text>

        <!--
          ===== transient staging area =====
          Mounted only while the presenter is advancing into a stop, so it leaves
          no residue in any resting state and cannot drift from it.
        -->
        <g v-if="stagingCategory" :key="`stage-${step}`" class="stage-transient">
          <text class="cat-label t-cat" x="680" y="62" text-anchor="middle" :fill="stagingCategory.accent">{{ stagingCategory.label }}</text>

          <g
            v-for="item in stagingItems"
            :key="`drop-${item.key}`"
            class="drop-tile"
            :style="{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: `${tileDelay(item.ord)}s` }"
          >
            <rect x="580" y="36" width="200" height="34" rx="6" :fill="categories[item.cat].tint" :stroke="categories[item.cat].accent" stroke-width="1.5" />
            <rect x="580" y="36" width="5" height="34" :fill="categories[item.cat].accent" />
            <text class="t-tile" x="593" y="50" :fill="categories[item.cat].accent">{{ item.l1 }}</text>
            <text class="t-tile" x="593" y="63" :fill="categories[item.cat].accent">{{ item.l2 }}</text>
          </g>
        </g>

        <!-- ===== persistent column: everything already inside the window ===== -->
        <rect
          v-for="(item, index) in items"
          :key="`ph-${item.key}`"
          x="24"
          :y="slotTop(index)"
          width="200"
          height="34"
          rx="6"
          fill="none"
          stroke="#d8dee4"
          stroke-width="1.4"
          stroke-dasharray="5 5"
        />
        <g
          v-for="(item, index) in items"
          :key="`slot-${item.key}`"
          class="tr slot-enter"
          :style="{
            opacity: shown(item) ? 1 : 0,
            transform: shown(item) ? 'translateX(0)' : 'translateX(14px)',
            transitionDelay: paced(item, slotDelay)
          }"
        >
          <g
            class="tr slot-fate"
            :style="{
              transformBox: 'view-box',
              opacity: step >= 7 && (item.fate === 'merge0' || item.fate === 'merge1' || item.fate === 'merge2' || item.fate === 'lost') ? 0 : 1,
              transform: step >= 7 ? fateShift(item.fate) : 'translateY(0)',
              filter: step >= 7 && item.fate === 'lost' ? 'grayscale(1)' : 'grayscale(0)',
              transitionDelay: step >= 7 && item.fate === 'lift' ? '1.2s' : '0s'
            }"
          >
            <rect x="24" :y="slotTop(index)" width="200" height="34" rx="6" :fill="tint(index)" :stroke="accent(index)" stroke-width="1.5" />
            <rect x="24" :y="slotTop(index)" width="5" height="34" :fill="accent(index)" />
            <text class="t-tile" x="37" :y="slotTop(index) + 14" :fill="accent(index)">{{ item.l1 }}</text>
            <text class="t-tile" x="37" :y="slotTop(index) + 27" :fill="accent(index)">{{ item.l2 }}</text>
          </g>
        </g>

        <!-- three conversation turns become one structured summary, in the slot
             the first turn occupied. Deliberately heavier than a category tile so
             it reads as a consolidated artifact, not as another category. -->
        <g class="tr summary-tile" :style="{ opacity: step >= 7 ? 1 : 0, transitionDelay: step >= 7 ? '.8s' : '0s' }">
          <rect x="24" y="276" width="200" height="34" rx="6" fill="#1a7f37" stroke="#116329" stroke-width="1.6" />
          <rect x="24" y="276" width="5" height="34" fill="#0d4429" />
          <text class="t-tile-strong" x="37" y="290" fill="#ffffff">Summary of earlier turns</text>
          <text class="t-tile" x="37" y="303" fill="#d2fadb">structured summary kept</text>
        </g>

        <text
          class="tr t-caption"
          x="124"
          y="100"
          text-anchor="middle"
          fill="#8c959f"
          :style="{ opacity: step >= 7 ? 1 : 0, transitionDelay: step >= 7 ? '1.8s' : '0s' }"
        >some fine detail is dropped</text>

        <!--
          Purrmission, safety guardian: small original silhouette only, seated at
          the base of the stand and mirrored so her gaze runs back up toward the
          reserved output headroom. Deliberately subordinate to the funnel and
          placed clear of every label box.
        -->
        <g class="tr purrmission" :style="{ opacity: step >= 6 ? 1 : 0, transitionDelay: step >= 6 ? '.9s' : '0s' }">
          <g transform="translate(818,306) scale(-1.2,1.2)">
            <ellipse cx="17" cy="52" rx="16" ry="3.6" fill="#1f2328" opacity=".1" />
            <polygon points="10,7 12.5,0 16.8,5.5" fill="#1f2328" />
            <polygon points="19,5.5 23.5,0.5 25.8,8" fill="#1f2328" />
            <path d="M8.5,50 C7.5,35 10.5,22.5 17.8,20.5 C25,22.5 27.5,35 26.5,50 Z" fill="#1f2328" />
            <ellipse cx="17.5" cy="48.5" rx="11.5" ry="4" fill="#1f2328" />
            <ellipse cx="17.8" cy="12.5" rx="9" ry="8" fill="#1f2328" />
            <path d="M26,49 C34,50 37,42.5 33,36.5" fill="none" stroke="#1f2328" stroke-width="3.6" stroke-linecap="round" />
            <path d="M12,21 Q17.8,23.8 23.6,20.8" fill="none" stroke="#3fb950" stroke-width="1.3" stroke-linecap="round" />
            <polygon points="20.1,24.6 18.9,26.6 16.6,26.6 15.4,24.6 16.6,22.6 18.9,22.6" fill="#3fb950" />
            <ellipse cx="16.6" cy="10.6" rx="1.75" ry="2.15" fill="#3fb950" />
            <ellipse cx="22.1" cy="10.2" rx="1.5" ry="1.95" fill="#3fb950" />
          </g>
        </g>

        <!-- The caution owns the headroom stop and clears when compact arrives, so
             it can never share the baseline with the scope caveat. -->
        <text
          class="tr t-nearcap near-cap"
          x="680"
          y="392"
          text-anchor="middle"
          fill="#9a6700"
          :style="{ opacity: step === 6 ? 1 : 0, transitionDelay: step === 6 ? '1.4s' : '0s' }"
        >Near capacity — a big window is not an invitation to fill it</text>

        <g
          class="tr compact-chip"
          :style="{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            opacity: step >= 7 ? 1 : 0,
            transform: step >= 7 ? 'scale(1)' : 'scale(.8)'
          }"
        >
          <rect x="622" y="242" width="116" height="34" rx="9" fill="#1f2328" />
          <text class="t-compact" x="680" y="265" text-anchor="middle" fill="#ffffff">compact</text>
        </g>

        <!--
          Scope caveat, owner-attested 2026-09-05 (foundations-content-verification.md
          FND-12): compaction is available in VS Code and Copilot CLI. The ~80%/95%
          automatic-compaction thresholds remain Copilot CLI-only and are deliberately
          not shown on this slide.
        -->
        <text
          class="tr t-caveat cli-caveat"
          x="680"
          y="392"
          text-anchor="middle"
          fill="#57606a"
          :style="{ opacity: step >= 7 ? 1 : 0, transitionDelay: step >= 7 ? '.4s' : '0s' }"
        >Compaction is available in VS Code and Copilot CLI</text>
      </svg>
    </div>
  </NativeAnimationStage>
</template>

<style scoped>
/*
  There is no clock in this component. Presentation state is a pure function of
  the presenter's click index, and CSS transitions carry the eye between resting
  states. The frozen state, the printed state and the live state are therefore
  the same expressions evaluated at the same `step`, and cannot drift.
*/
.funnel-stage {
  position: absolute;
  inset: 0;
  background: #fbfaf8;
}

.funnel-stage svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* One shared transition for every state-driven element. */
.tr {
  transition:
    opacity .5s ease,
    transform .85s cubic-bezier(.3, .7, .3, 1),
    stroke .6s ease,
    fill .6s ease,
    filter .6s ease;
}

/*
  Type scale lives in CSS, not in SVG presentation attributes: deck-level styles
  override presentation attributes, which would blow the labels out of the frame.
  Values are user units in the 1120x400 view box. Only the transient staging
  label is large — the funnel is the art, everything else is support.
*/
.funnel-stage text {
  font-family: "Mona Sans", Inter, sans-serif;
}

.t-cat { font-size: 22px; font-weight: 800; letter-spacing: -.01em; }
.t-title { font-size: 14px; font-weight: 750; }
.t-sub { font-size: 10px; font-weight: 600; }
.t-ref { font-size: 9px; font-weight: 600; }
.t-rail-head { font-size: 10px; font-weight: 700; }
.t-rail-lbl { font-size: 9px; font-weight: 650; }
.t-rail-active { font-size: 9px; font-weight: 800; }
.t-headroom { font-size: 12px; font-weight: 750; }
.t-headroom-sub { font-size: 10px; font-weight: 600; }
.t-freed { font-size: 11.5px; font-weight: 750; }
.t-nearcap { font-size: 11.5px; font-weight: 750; }
.t-tile { font-size: 10px; font-weight: 620; }
.t-tile-strong { font-size: 10px; font-weight: 800; }
.t-caption { font-size: 9.5px; font-weight: 650; }
.t-compact { font-size: 15px; font-weight: 800; letter-spacing: .06em; }
.t-caveat { font-size: 10.5px; font-weight: 650; }

/*
  The staging beat, paced for a first-time reader in an audience. The category
  word holds for roughly two seconds before it clears, and the example holds for
  roughly two seconds before it travels. Both are mounted only for the duration
  of their own stop.
*/
.cat-label {
  opacity: 0;
  animation: cat-cycle 3s 0s both;
}

.drop-tile {
  opacity: 0;
  animation: tile-drop 4s both;
}

@keyframes cat-cycle {
  0% { opacity: 0; transform: translateY(10px); }
  17% { opacity: 1; transform: translateY(0); }
  /* ~2.1s of still, fully readable hold */
  87% { opacity: 1; transform: translateY(0); }
  97% { opacity: 0; transform: translateY(-7px); }
  100% { opacity: 0; transform: translateY(-7px); }
}

@keyframes tile-drop {
  0% { opacity: 0; transform: translateY(-14px) scale(1.5); }
  13% { opacity: 1; transform: translateY(0) scale(1.5); }
  /* ~2.1s of still, fully readable hold before it travels */
  65% { opacity: 1; transform: translateY(0) scale(1.5); }
  84% { opacity: 1; transform: translateY(92px) scale(1.2); }
  96% { opacity: 0; transform: translateY(150px) scale(.9); }
  100% { opacity: 0; transform: translateY(150px) scale(.9); }
}

/*
  Reduced motion keeps the presenter's pacing control — clicks still step through
  exactly the same states — but removes all motion. Transitions resolve instantly
  and the transient flight is suppressed entirely, so nothing depends on
  perceiving movement. At the final stop the complete teaching state renders,
  identically to the animated build, because both read the same `step`.
*/
@media (prefers-reduced-motion: reduce) {
  .funnel-stage *,
  .funnel-stage *::before,
  .funnel-stage *::after {
    transition: none !important;
    animation: none !important;
    transition-delay: 0s !important;
  }

  .funnel-stage .stage-transient {
    display: none;
  }
}
</style>
