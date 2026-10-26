<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const step = ref(4);
const running = ref(false);
const reduced = ref(false);
let timer = 0;

const lenses = [
  {
    id: 1,
    name: "Lens 1 · /security-review",
    when: "Pre-PR (CLI / App)",
    catches: "Active-diff logic flaws & exploitable paths",
    limit: "Probabilistic LLM review; not a full-repo SAST guarantee"
  },
  {
    id: 2,
    name: "Lens 2 · Push Protection",
    when: "At git push boundary",
    catches: "Supported secret tokens before they enter remote history",
    limit: "Covers supported patterns; bypasses create audit alerts"
  },
  {
    id: 3,
    name: "Lens 3 · GHAS + Autofix",
    when: "CI / Pull Request",
    catches: "CodeQL source-to-sink data flow + Dependency Review CVEs",
    limit: "Requires configured languages, build/extraction, and CI run"
  },
  {
    id: 4,
    name: "Lens 4 · Copilot Code Review",
    when: "Pull Request (Balanced / Lite)",
    catches: "Read-only MCP/skill checks + structured comment disposition",
    limit: "Never replaces CODEOWNERS human acceptance & merge"
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
  }, 1400);
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
  <section class="lenses-pipeline" :data-step="step" aria-label="Purrmission's Four Security Evidence Lenses pipeline">
    <div class="lenses-pipeline__top">
      <strong>Purrmission's 4 Security Evidence Lenses (No Self-Certification)</strong>
      <button type="button" class="lenses-btn" @click="play">{{ running ? "Scanning..." : "Play 4-Lens Scan" }}</button>
    </div>

    <div class="lenses-row">
      <button
        v-for="lens in lenses"
        :key="lens.id"
        type="button"
        class="lens-card"
        :class="{ 'is-active': step >= lens.id }"
        @click="clearTimer(); step = lens.id"
      >
        <div class="lens-card__name">{{ lens.name }}</div>
        <div class="lens-card__when">{{ lens.when }}</div>
        <div class="lens-card__catches"><strong>Finds:</strong> {{ lens.catches }}</div>
        <div class="lens-card__limit"><strong>Boundary:</strong> {{ lens.limit }}</div>
      </button>
    </div>

    <div class="lenses-verdict" :class="{ 'is-ready': step >= 4 }">
      <strong>Final Gate:</strong> All 4 evidence streams feed <strong>Agent Mergewell's Human Review &amp; CODEOWNERS Sign-off</strong>.
    </div>
  </section>
</template>

<style scoped>
.lenses-pipeline {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid #d0d7de;
  border-radius: 0.75rem;
  background: #ffffff;
  font-size: 10px;
}
.lenses-pipeline__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lenses-btn {
  padding: 0.18rem 0.5rem;
  border: 1px solid #8250df;
  border-radius: 999px;
  background: #f6f0ff;
  color: #6639ba;
  font-size: 9.5px;
  font-weight: 700;
  cursor: pointer;
}
.lenses-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.35rem;
}
.lens-card {
  padding: 0.35rem 0.45rem;
  border: 1px solid #d0d7de;
  border-top: 4px solid #8250df;
  border-radius: 0.45rem;
  background: #f6f8fa;
  opacity: 0.4;
  cursor: pointer;
  text-align: left;
  font: inherit;
  transition: opacity 200ms ease, background 200ms ease;
}
.lens-card.is-active {
  background: #ffffff;
  opacity: 1;
}
.lens-card__name {
  font-weight: 800;
  color: #24292f;
}
.lens-card__when {
  color: #6639ba;
  font-weight: 700;
  font-size: 9px;
  margin-bottom: 0.15rem;
}
.lens-card__catches,
.lens-card__limit {
  color: #57606a;
  font-size: 9px;
  line-height: 1.25;
  margin-top: 0.1rem;
}
.lenses-verdict {
  padding: 0.3rem 0.5rem;
  border-left: 4px solid #1a7f37;
  border-radius: 0.35rem;
  background: #dafbe1;
  color: #1a7f37;
}
</style>
