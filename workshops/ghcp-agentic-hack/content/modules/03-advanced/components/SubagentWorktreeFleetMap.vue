<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const step = ref(3);
const running = ref(false);
const reduced = ref(false);
let timer = 0;

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
    step.value = 3;
    return;
  }
  step.value = 1;
  running.value = true;
  timer = window.setInterval(() => {
    if (step.value < 3) {
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
    step.value = 3;
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
  <section class="fleet-map" :data-step="step" aria-label="Subagent context isolation and parallel worktree fleet map">
    <div class="fleet-map__header">
      <strong>Subagent KV-Cache Protection &amp; Parallel Worktree Fleet</strong>
      <button type="button" class="fleet-btn" @click="play">{{ running ? "Running..." : "Play 3 Beats" }}</button>
    </div>

    <div class="fleet-beats">
      <button type="button" class="fleet-beat" :class="{ 'is-active': step >= 1 }" @click="clearTimer(); step = 1">
        <div class="fleet-beat__title">Beat 1 · Without Subagents (Context Pollution)</div>
        <div class="fleet-bar fleet-bar--polluted">
          <span>Parent Prefix (8k)</span>
          <span class="is-noise">+38,000 Raw Search &amp; Test Log Tokens Flood Main Window!</span>
        </div>
        <p>Every subsequent turn pays to carry 38k lines of raw log noise.</p>
      </button>

      <button type="button" class="fleet-beat" :class="{ 'is-active': step >= 2 }" @click="clearTimer(); step = 2">
        <div class="fleet-beat__title">Beat 2 · With Subagent Isolation (Claude Haiku 5.5)</div>
        <div class="fleet-bar fleet-bar--clean">
          <span>Parent Prefix Preserved (8k eligible for cache reuse)</span>
          <span class="is-summary">+200-token Verified Summary</span>
        </div>
        <p>38k log noise stays inside the disposable subagent window and is discarded after return.</p>
      </button>

      <button type="button" class="fleet-beat" :class="{ 'is-active': step >= 3 }" @click="clearTimer(); step = 3">
        <div class="fleet-beat__title">Beat 3 · Parallel CLI <code>/fleet</code> + Isolated Git Worktrees → 1 Human Merge Gate</div>
        <div class="fleet-lanes">
          <span><code>worktree/api</code> (Subagent 1)</span>
          <span><code>worktree/ui</code> (Subagent 2)</span>
          <span><code>worktree/tests</code> (Subagent 3)</span>
          <span class="is-gate">→ Agent Mergewell (Human Merge Owner)</span>
        </div>
      </button>
    </div>
  </section>
</template>

<style scoped>
.fleet-map {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.5rem 0.65rem;
  border: 1px solid #d0d7de;
  border-radius: 0.75rem;
  background: #ffffff;
  font-size: 10px;
}
.fleet-map__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fleet-btn {
  padding: 0.16rem 0.5rem;
  border: 1px solid #8250df;
  border-radius: 999px;
  background: #f6f0ff;
  color: #6639ba;
  font-size: 9px;
  font-weight: 700;
  cursor: pointer;
}
.fleet-beats {
  display: grid;
  gap: 0.35rem;
}
.fleet-beat {
  padding: 0.35rem 0.45rem;
  border: 1px solid #d0d7de;
  border-radius: 0.4rem;
  background: #f6f8fa;
  opacity: 0.4;
  cursor: pointer;
  text-align: left;
  font: inherit;
  transition: opacity 200ms ease;
}
.fleet-beat.is-active {
  background: #ffffff;
  opacity: 1;
}
.fleet-beat__title {
  font-weight: 800;
  margin-bottom: 0.2rem;
}
.fleet-beat p {
  margin: 0.18rem 0 0;
  color: #57606a;
  font-size: 9px;
}
.fleet-bar {
  display: flex;
  height: 22px;
  border-radius: 0.3rem;
  overflow: hidden;
  font-size: 8.8px;
  font-weight: 700;
}
.fleet-bar > span {
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  background: #dafbe1;
  color: #1a7f37;
}
.fleet-bar .is-noise {
  flex: 1;
  background: #ffebe9;
  color: #cf222e;
}
.fleet-bar .is-summary {
  background: #ddf4ff;
  color: #0969da;
}
.fleet-lanes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;
}
.fleet-lanes > span {
  padding: 0.18rem 0.4rem;
  border: 1px solid #8250df;
  border-radius: 0.3rem;
  background: #f6f0ff;
  color: #6639ba;
  font-size: 8.8px;
  font-weight: 700;
}
.fleet-lanes .is-gate {
  border-color: #1a7f37;
  background: #dafbe1;
  color: #1a7f37;
}
</style>
