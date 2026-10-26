<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const bloatedTools = ref(false);
const step = ref(4);
const running = ref(false);
const reduced = ref(false);
let timer = 0;

const flowSteps = [
  { id: 1, label: "1. Tool Schemas Enter Window", detail: "Enabled tool JSON schemas occupy context before your prompt." },
  { id: 2, label: "2. Riley Proposes Call", detail: "Model outputs structured JSON: { tool: 'grep', pattern: 'formatTimestamp' }." },
  { id: 3, label: "3. Harness Checks & Executes", detail: "Purrmission verifies permission; Harness runs ripgrep on workspace." },
  { id: 4, label: "4. Output Appended", detail: "12-line match returns into the context window for the next turn." }
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
  }, 1500);
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
  <section class="tool-workbench" :data-step="step" aria-label="Tool execution flow and context window schema impact">
    <div class="tool-workbench__top">
      <div class="tool-workbench__title">
        <strong>Workbench Tool Flow &amp; Schema Cost</strong>
      </div>
      <div class="tool-workbench__actions">
        <button type="button" class="tool-toggle" :class="{ 'is-bloated': bloatedTools }" @click="bloatedTools = !bloatedTools">
          {{ bloatedTools ? "45 MCP Tools Enabled (32% Window!)" : "5 Core Tools Enabled (4% Window)" }}
        </button>
        <button type="button" class="tool-play" @click="play">{{ running ? "Running..." : "Play Flow" }}</button>
      </div>
    </div>

    <div class="tool-meter" aria-label="Context window occupancy bar">
      <span class="tool-meter__sys" style="flex: 8">System (8%)</span>
      <span class="tool-meter__schemas" :style="{ flex: bloatedTools ? 32 : 4 }">
        Tool Schemas ({{ bloatedTools ? "32% — Purrmission Alert!" : "4% Lean" }})
      </span>
      <span class="tool-meter__files" style="flex: 16">Files &amp; Prompt (16%)</span>
      <span class="tool-meter__results" :style="{ flex: step >= 4 ? 12 : 4 }">Tool Results ({{ step >= 4 ? "12%" : "4%" }})</span>
      <span class="tool-meter__free" :style="{ flex: (bloatedTools ? 44 : 72) - (step >= 4 ? 8 : 0) }">Headroom</span>
    </div>

    <div class="tool-lanes">
      <button
        v-for="item in flowSteps"
        :key="item.id"
        type="button"
        class="tool-step"
        :class="{ 'is-active': step >= item.id }"
        @click="clearTimer(); step = item.id"
      >
        <div class="tool-step__label">{{ item.label }}</div>
        <div class="tool-step__detail">{{ item.detail }}</div>
      </button>
    </div>
  </section>
</template>

<style scoped>
.tool-workbench {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid #d0d7de;
  border-radius: 0.75rem;
  background: #ffffff;
  font-size: 10.5px;
}
.tool-workbench__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.tool-workbench__actions {
  display: flex;
  gap: 0.35rem;
}
.tool-toggle,
.tool-play {
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 9.5px;
  font-weight: 700;
  cursor: pointer;
}
.tool-toggle {
  border: 1px solid #1a7f37;
  background: #dafbe1;
  color: #1a7f37;
}
.tool-toggle.is-bloated {
  border-color: #cf222e;
  background: #ffebe9;
  color: #cf222e;
}
.tool-play {
  border: 1px solid #8250df;
  background: #f6f0ff;
  color: #6639ba;
}
.tool-meter {
  display: flex;
  height: 26px;
  border: 1px solid #24292f;
  border-radius: 0.4rem;
  overflow: hidden;
  font-size: 9px;
  font-weight: 700;
}
.tool-meter > span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  transition: flex 300ms ease;
}
.tool-meter__sys { background: #eaeef2; color: #24292f; }
.tool-meter__schemas { background: #8250df; color: #ffffff; }
.tool-meter__files { background: #dafbe1; color: #1a7f37; }
.tool-meter__results { background: #ddf4ff; color: #0969da; }
.tool-meter__free { background: #ffffff; color: #57606a; border-left: 1px dashed #8c959f; }
.tool-lanes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.35rem;
}
.tool-step {
  padding: 0.35rem 0.45rem;
  border: 1px solid #d0d7de;
  border-left: 4px solid #8250df;
  border-radius: 0.4rem;
  background: #f6f8fa;
  opacity: 0.4;
  cursor: pointer;
  text-align: left;
  font: inherit;
  transition: opacity 200ms ease, background 200ms ease;
}
.tool-step.is-active {
  background: #ffffff;
  opacity: 1;
}
.tool-step__label {
  font-weight: 800;
  color: #24292f;
}
.tool-step__detail {
  color: #57606a;
  font-size: 9.5px;
}
</style>
