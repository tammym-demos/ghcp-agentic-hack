<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const step = ref(4);
const running = ref(false);
const reduced = ref(false);
let timer = 0;

const rings = [
  {
    id: 1,
    name: "Ring 1 · Instructions",
    detail: ".github/copilot-instructions.md · applyTo · AGENTS.md",
    color: "#1a7f37",
    fill: "#dafbe1",
    r: 86
  },
  {
    id: 2,
    name: "Ring 2 · Tools & MCP",
    detail: "read_file · grep · terminal · governed MCP servers",
    color: "#8250df",
    fill: "#f6f0ff",
    r: 122
  },
  {
    id: 3,
    name: "Ring 3 · Execution Workspace",
    detail: "Local folder · Git branch · isolated worktree / sandbox",
    color: "#0969da",
    fill: "#ddf4ff",
    r: 158
  },
  {
    id: 4,
    name: "Ring 4 · Guardrails & Purrmission",
    detail: "Permission gates · Content Exclusions · /limits soft ceiling",
    color: "#bf8700",
    fill: "#fff8c5",
    r: 194
  }
];

function clearTimer() {
  if (timer) {
    window.clearInterval(timer);
    timer = 0;
  }
  running.value = false;
}

function play() {
  clearTimer();
  if (reduced.value) {
    step.value = 4;
    return;
  }
  step.value = 1;
  running.value = true;
  timer = window.setInterval(() => {
    if (step.value < 4) {
      step.value += 1;
    } else {
      clearTimer();
    }
  }, 1600);
}

let media: MediaQueryList | undefined;
function updateReduced() {
  reduced.value = Boolean(media?.matches);
  if (reduced.value) {
    clearTimer();
    step.value = 4;
  }
}

onMounted(() => {
  media = window.matchMedia("(prefers-reduced-motion: reduce)");
  updateReduced();
  media.addEventListener("change", updateReduced);
});

onBeforeUnmount(() => {
  clearTimer();
  media?.removeEventListener("change", updateReduced);
});
</script>

<template>
  <section class="harness-cockpit" :data-step="step" :data-running="running" aria-label="Four rings of the GitHub Copilot harness around the model">
    <div class="harness-cockpit__header">
      <strong>Purrmission's 4-Ring Harness Cockpit</strong>
      <div class="harness-cockpit__controls">
        <button type="button" class="harness-btn" @click="play">{{ running ? "Playing..." : "Play 4 Rings" }}</button>
        <button
          v-for="ring in rings"
          :key="ring.id"
          type="button"
          class="harness-step-btn"
          :class="{ 'is-active': step >= ring.id }"
          @click="clearTimer(); step = ring.id"
        >
          R{{ ring.id }}
        </button>
      </div>
    </div>

    <div class="harness-cockpit__body">
      <svg viewBox="0 0 440 420" class="harness-cockpit__svg" role="img" aria-label="Concentric harness rings surrounding the LLM prediction engine">
        <g v-for="ring in [...rings].reverse()" :key="ring.id">
          <circle
            cx="220"
            cy="210"
            :r="ring.r"
            :fill="step >= ring.id ? ring.fill : '#f6f8fa'"
            :stroke="step >= ring.id ? ring.color : '#d0d7de'"
            stroke-width="3"
            class="harness-ring-circle"
          />
        </g>
        <circle cx="220" cy="210" r="50" fill="#24292f" stroke="#8250df" stroke-width="3" />
        <text x="220" y="204" text-anchor="middle" fill="#ffffff" style="font-size: 18px" font-weight="800">LLM MODEL</text>
        <text x="220" y="221" text-anchor="middle" fill="#d8b9ff" style="font-size: 12px" font-weight="600">Tokens In → Out</text>

        <g v-if="step >= 4" class="BlockedImpulse">
          <path d="M 35 65 L 82 102" stroke="#cf222e" stroke-width="3" stroke-dasharray="4 3" />
          <circle cx="86" cy="105" r="11" fill="#cf222e" />
          <text x="86" y="109" text-anchor="middle" fill="#fff" style="font-size: 16px" font-weight="800">✕</text>
          <text x="22" y="54" fill="#cf222e" style="font-size: 16px" font-weight="700">Unapproved action blocked at Ring 4</text>
        </g>
      </svg>

      <div class="harness-cockpit__legend">
        <div
          v-for="ring in rings"
          :key="ring.id"
          class="harness-card"
          :class="{ 'is-visible': step >= ring.id }"
          :style="{ borderLeftColor: ring.color }"
        >
          <div class="harness-card__title" :style="{ color: ring.color }">{{ ring.name }}</div>
          <div class="harness-card__detail">{{ ring.detail }}</div>
        </div>
        <div class="harness-card harness-card--note">
          <strong>Key rule:</strong> The model only predicts tokens and proposes tool calls. The <strong>Harness</strong> assembles context, executes tools, and enforces permissions.
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.harness-cockpit {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid #d0d7de;
  border-radius: 0.75rem;
  background: #ffffff;
  font-size: 11px;
}
.harness-cockpit__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.harness-cockpit__controls {
  display: flex;
  gap: 0.25rem;
}
.harness-btn,
.harness-step-btn {
  padding: 0.18rem 0.45rem;
  border: 1px solid #8250df;
  border-radius: 999px;
  background: #f6f0ff;
  color: #6639ba;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
}
.harness-step-btn {
  border-color: #d0d7de;
  background: #f6f8fa;
  color: #57606a;
}
.harness-step-btn.is-active {
  border-color: #1a7f37;
  background: #dafbe1;
  color: #1a7f37;
}
.harness-cockpit__body {
  display: grid;
  grid-template-columns: 185px 1fr;
  gap: 0.6rem;
  align-items: center;
}
.harness-cockpit__svg {
  width: 100%;
  max-height: 210px;
}
.harness-ring-circle {
  transition: fill 250ms ease, stroke 250ms ease;
}
.harness-cockpit__legend {
  display: grid;
  gap: 0.3rem;
}
.harness-card {
  padding: 0.28rem 0.45rem;
  border: 1px solid #d0d7de;
  border-left-width: 4px;
  border-radius: 0.4rem;
  background: #f6f8fa;
  opacity: 0.35;
  transition: opacity 200ms ease, background 200ms ease;
}
.harness-card.is-visible {
  background: #ffffff;
  opacity: 1;
}
.harness-card__title {
  font-weight: 800;
  font-size: 10.5px;
}
.harness-card__detail {
  color: #57606a;
  font-size: 9.5px;
}
.harness-card--note {
  border-left-color: #24292f;
  background: #f6f8fa;
  opacity: 1;
  font-size: 9.5px;
}
</style>
