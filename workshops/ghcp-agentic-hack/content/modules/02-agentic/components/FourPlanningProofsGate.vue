<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const step = ref(4);
const running = ref(false);
const reduced = ref(false);
let timer = 0;

const latches = [
  {
    id: 1,
    title: "Proof 1 · Scope & Blast Radius",
    status: "src/dispatch/* ALLOWED · src/billing/* NO-TOUCH",
    verify: "Verify: git diff <base>...HEAD + untracked paths",
    color: "#1a7f37"
  },
  {
    id: 2,
    title: "Proof 2 · Saved ≠ Loaded",
    status: "1 Saved → 2 Discovered → 3 Included → 4 Followed",
    verify: "Verify: CLI /instructions & /context or VS Code References",
    color: "#0969da"
  },
  {
    id: 3,
    title: "Proof 3 · Negative Tests First",
    status: "Failing boundary test written BEFORE implementation",
    verify: "Verify: rejects expired token & malformed payload",
    color: "#bf8700"
  },
  {
    id: 4,
    title: "Proof 4 · Hard Stop Conditions",
    status: "Mandatory pause triggers armed for Riley Relay",
    verify: "Stop on: schema change, new dependency, or auth edit",
    color: "#8250df"
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
  <section class="proofs-gate" :data-step="step" aria-label="Purrmission's Four Planning Proofs pre-flight gate">
    <div class="proofs-gate__header">
      <strong>Purrmission's Pre-Flight Drawbridge: What Must Be True</strong>
      <div class="proofs-gate__controls">
        <button type="button" class="proofs-btn" @click="play">{{ running ? "Checking..." : "Run Pre-Flight Check" }}</button>
        <span class="proofs-status" :class="{ 'is-open': step >= 4 }">
          {{ step >= 4 ? "✓ All 4 Proofs Verified — Purrmission Lifts His Paw" : `Latch ${step}/4 Checked — Gate Locked` }}
        </span>
      </div>
    </div>

    <div class="proofs-grid">
      <button
        v-for="latch in latches"
        :key="latch.id"
        type="button"
        class="proof-latch"
        :class="{ 'is-locked': step >= latch.id }"
        :style="{ borderTopColor: latch.color }"
        @click="clearTimer(); step = latch.id"
      >
        <div class="proof-latch__head">
          <span class="proof-latch__title">{{ latch.title }}</span>
          <span class="proof-latch__badge">{{ step >= latch.id ? "VERIFIED" : "PENDING" }}</span>
        </div>
        <div class="proof-latch__status">{{ latch.status }}</div>
        <div class="proof-latch__verify">{{ latch.verify }}</div>
      </button>
    </div>
  </section>
</template>

<style scoped>
.proofs-gate {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid #d0d7de;
  border-radius: 0.75rem;
  background: #ffffff;
  font-size: 10.5px;
}
.proofs-gate__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.proofs-gate__controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.proofs-btn {
  padding: 0.2rem 0.55rem;
  border: 1px solid #8250df;
  border-radius: 999px;
  background: #f6f0ff;
  color: #6639ba;
  font-size: 9.5px;
  font-weight: 700;
  cursor: pointer;
}
.proofs-status {
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  background: #fff8c5;
  color: #7d4e00;
  font-size: 9.5px;
  font-weight: 700;
}
.proofs-status.is-open {
  background: #dafbe1;
  color: #1a7f37;
}
.proofs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.4rem;
}
.proof-latch {
  padding: 0.38rem 0.5rem;
  border: 1px solid #d0d7de;
  border-top-width: 4px;
  border-radius: 0.45rem;
  background: #f6f8fa;
  opacity: 0.45;
  cursor: pointer;
  text-align: left;
  font: inherit;
  transition: opacity 200ms ease, background 200ms ease;
}
.proof-latch.is-locked {
  background: #ffffff;
  opacity: 1;
}
.proof-latch__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.15rem;
}
.proof-latch__title {
  font-weight: 800;
  color: #24292f;
}
.proof-latch__badge {
  padding: 0.08rem 0.35rem;
  border-radius: 999px;
  background: #dafbe1;
  color: #1a7f37;
  font-size: 8.5px;
  font-weight: 800;
}
.proof-latch__status {
  font-weight: 600;
  color: #24292f;
  font-size: 9.5px;
}
.proof-latch__verify {
  color: #57606a;
  font-size: 9px;
  margin-top: 0.1rem;
}
</style>
