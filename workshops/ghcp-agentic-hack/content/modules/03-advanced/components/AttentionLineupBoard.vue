<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const step = ref(4);
const running = ref(false);
const reduced = ref(false);
let timer = 0;

const ungroundedLineup = [
  { token: "const body =", prob: 52, warn: true },
  { token: "return res", prob: 28, warn: false },
  { token: "if (!req)", prob: 12, warn: false },
  { token: "await verifyCaller(", prob: 3, warn: false }
];

const groundedLineup = [
  { token: "await verifyCaller(", prob: 84, highlight: true },
  { token: "const body =", prob: 6, highlight: false },
  { token: "if (!req)", prob: 5, highlight: false },
  { token: "return res", prob: 2, highlight: false }
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
  <section class="lineup-board" :data-step="step" aria-label="The Probability Suspect Lineup comparing un-grounded and grounded next-token predictions">
    <div class="lineup-board__header">
      <strong>The Probability Suspect Lineup: Self-Attention &amp; Next-Token Sampling</strong>
      <div class="lineup-board__controls">
        <button type="button" class="lineup-btn" @click="play">{{ running ? "Sampling..." : "Play Lineup" }}</button>
        <button
          v-for="s in [1, 2, 3, 4]"
          :key="s"
          type="button"
          class="lineup-step"
          :class="{ 'is-on': step >= s }"
          @click="clearTimer(); step = s"
        >
          Step {{ s }}
        </button>
      </div>
    </div>

    <div class="lineup-panels">
      <div class="lineup-panel lineup-panel--ungrounded">
        <div class="lineup-panel__tag">Request A · Un-grounded (No Security Rule Attached)</div>
        <div class="lineup-code">
          <span class="tok-pill">export <em>#201</em></span>
          <span class="tok-pill">async <em>#412</em></span>
          <span class="tok-pill">handleDispatch(req) {</span>
          <span class="tok-cursor">{{ step >= 4 ? "const body = await req.json();" : "|" }}</span>
        </div>
        <div v-if="step >= 2" class="lineup-attention lineup-attention--weak">
          Attention spotlight: only sees <code>handleDispatch</code> &amp; <code>req</code>
        </div>
        <div v-if="step >= 3" class="lineup-bars">
          <div v-for="item in ungroundedLineup" :key="item.token" class="lineup-bar-row">
            <code>{{ item.token }}</code>
            <div class="lineup-bar-track">
              <div class="lineup-bar-fill" :class="{ 'is-warn': item.warn }" :style="{ width: `${item.prob}%` }" />
            </div>
            <span>{{ item.prob }}%</span>
          </div>
        </div>
      </div>

      <div class="lineup-panel lineup-panel--grounded">
        <div class="lineup-panel__tag lineup-panel__tag--good">Request B · Grounded with <code>#file:dispatch-security.instructions.md</code></div>
        <div class="lineup-clue" :class="{ 'is-lit': step >= 2 }">
          Rule in context: <strong>"Always verifyCaller(req) before reading payload"</strong>
        </div>
        <div class="lineup-code">
          <span class="tok-pill">export <em>#201</em></span>
          <span class="tok-pill">async <em>#412</em></span>
          <span class="tok-pill">handleDispatch(req) {</span>
          <span class="tok-cursor tok-cursor--good">{{ step >= 4 ? "await verifyCaller(req);" : "|" }}</span>
        </div>
        <div v-if="step >= 2" class="lineup-attention lineup-attention--strong">
          Attention spotlight: strong weights lock onto <code>verifyCaller(req)</code>
        </div>
        <div v-if="step >= 3" class="lineup-bars">
          <div v-for="item in groundedLineup" :key="item.token" class="lineup-bar-row">
            <code>{{ item.token }}</code>
            <div class="lineup-bar-track">
              <div class="lineup-bar-fill" :class="{ 'is-good': item.highlight }" :style="{ width: `${item.prob}%` }" />
            </div>
            <span>{{ item.prob }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="lineup-footer">
      <strong>Why Fluency ≠ Truth:</strong> Riley samples from whatever probability lineup your context creates (<code>Select → Append → Repeat</code>). Even an 84% token is a statistical prediction until your deterministic tests verify it.
    </div>
  </section>
</template>

<style scoped>
.lineup-board {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.5rem 0.65rem;
  border: 1px solid #d0d7de;
  border-radius: 0.75rem;
  background: #ffffff;
  font-size: 10px;
}
.lineup-board__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.lineup-board__controls {
  display: flex;
  gap: 0.25rem;
}
.lineup-btn,
.lineup-step {
  padding: 0.16rem 0.45rem;
  border: 1px solid #8250df;
  border-radius: 999px;
  background: #f6f0ff;
  color: #6639ba;
  font-size: 9px;
  font-weight: 700;
  cursor: pointer;
}
.lineup-step {
  border-color: #d0d7de;
  background: #f6f8fa;
  color: #57606a;
}
.lineup-step.is-on {
  border-color: #1a7f37;
  background: #dafbe1;
  color: #1a7f37;
}
.lineup-panels {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.45rem;
}
.lineup-panel {
  padding: 0.38rem 0.48rem;
  border: 1px solid #d0d7de;
  border-radius: 0.45rem;
  background: #f6f8fa;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
}
.lineup-panel--grounded {
  border-color: #1a7f37;
  background: #ffffff;
}
.lineup-panel__tag {
  font-weight: 800;
  color: #cf222e;
  font-size: 9.5px;
}
.lineup-panel__tag--good {
  color: #1a7f37;
}
.lineup-clue {
  padding: 0.18rem 0.35rem;
  border: 1px dashed #8250df;
  border-radius: 0.3rem;
  background: #f6f0ff;
  color: #6639ba;
  font-size: 9px;
}
.lineup-clue.is-lit {
  border-style: solid;
  box-shadow: 0 0 0 2px rgb(130 80 223 / 20%);
}
.lineup-code {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  padding: 0.25rem 0.35rem;
  border-radius: 0.3rem;
  background: #24292f;
  color: #ffffff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 9px;
}
.tok-pill em {
  color: #d8b9ff;
  font-style: normal;
  font-size: 8px;
}
.tok-cursor {
  padding: 0 0.25rem;
  border-radius: 0.2rem;
  background: #cf222e;
  color: #ffffff;
  font-weight: 700;
}
.tok-cursor--good {
  background: #1a7f37;
}
.lineup-attention {
  font-size: 8.8px;
  font-weight: 700;
  padding: 0.14rem 0.3rem;
  border-radius: 0.25rem;
}
.lineup-attention--weak {
  background: #fff8c5;
  color: #7d4e00;
}
.lineup-attention--strong {
  background: #f6f0ff;
  color: #6639ba;
}
.lineup-bars {
  display: grid;
  gap: 0.18rem;
}
.lineup-bar-row {
  display: grid;
  grid-template-columns: 112px 1fr 28px;
  align-items: center;
  gap: 0.25rem;
  font-size: 8.8px;
}
.lineup-bar-track {
  height: 8px;
  border-radius: 999px;
  background: #eaeef2;
  overflow: hidden;
}
.lineup-bar-fill {
  height: 100%;
  background: #8c959f;
  transition: width 300ms ease;
}
.lineup-bar-fill.is-warn {
  background: #cf222e;
}
.lineup-bar-fill.is-good {
  background: #1a7f37;
}
.lineup-footer {
  padding: 0.28rem 0.45rem;
  border-left: 4px solid #8250df;
  background: #f6f8fa;
  color: #24292f;
  font-size: 9.2px;
}
</style>
