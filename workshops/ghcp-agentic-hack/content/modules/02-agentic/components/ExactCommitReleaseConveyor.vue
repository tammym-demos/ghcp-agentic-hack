<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const step = ref(4);
const running = ref(false);
const reduced = ref(false);
let timer = 0;

const stages = [
  {
    id: 1,
    title: "1 · Private Test Approval Pins Exact SHA",
    sha: "commit: a7f3c91",
    detail: "Reviewed on private test site; SHA locked in committed release-manifest.md."
  },
  {
    id: 2,
    title: "2 · Unrelated Commit Lands on main",
    sha: "main @ b99e004 (Ignored)",
    detail: "Later merge b99e004 does NOT enter the release; export uses pinned worktree a7f3c91."
  },
  {
    id: 3,
    title: "3 · Production Promotion & Route Verification",
    sha: "Deployed: a7f3c91",
    detail: "Automated route, asset, and provenance checks record verified deployment evidence."
  },
  {
    id: 4,
    title: "4 · Verified Rollback Target Preserved",
    sha: "Rollback ready: 94d1e02",
    detail: "Prior verified exact-commit release stays ready for instant deterministic rollback."
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
  <section class="release-conveyor" :data-step="step" aria-label="Exact-commit release promotion and rollback conveyor">
    <div class="release-conveyor__header">
      <strong>Exact-Commit Release Promotion Conveyor</strong>
      <button type="button" class="release-btn" @click="play">{{ running ? "Promoting..." : "Play Release Flow" }}</button>
    </div>

    <div class="release-stages">
      <button
        v-for="item in stages"
        :key="item.id"
        type="button"
        class="release-stage"
        :class="{ 'is-active': step >= item.id, 'is-blocked': item.id === 2 && step >= 2 }"
        @click="clearTimer(); step = item.id"
      >
        <div class="release-stage__head">
          <strong>{{ item.title }}</strong>
          <code>{{ item.sha }}</code>
        </div>
        <div class="release-stage__detail">{{ item.detail }}</div>
      </button>
    </div>
  </section>
</template>

<style scoped>
.release-conveyor {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid #d0d7de;
  border-radius: 0.75rem;
  background: #ffffff;
  font-size: 10px;
}
.release-conveyor__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.release-btn {
  padding: 0.18rem 0.5rem;
  border: 1px solid #1a7f37;
  border-radius: 999px;
  background: #dafbe1;
  color: #1a7f37;
  font-size: 9.5px;
  font-weight: 700;
  cursor: pointer;
}
.release-stages {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.35rem;
}
.release-stage {
  padding: 0.35rem 0.45rem;
  border: 1px solid #d0d7de;
  border-left: 4px solid #1a7f37;
  border-radius: 0.4rem;
  background: #f6f8fa;
  opacity: 0.4;
  cursor: pointer;
  text-align: left;
  font: inherit;
  transition: opacity 200ms ease;
}
.release-stage.is-active {
  background: #ffffff;
  opacity: 1;
}
.release-stage.is-blocked {
  border-left-color: #bf8700;
  background: #fff8c5;
}
.release-stage__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.3rem;
  margin-bottom: 0.12rem;
}
.release-stage__head code {
  padding: 0.06rem 0.3rem;
  border-radius: 0.25rem;
  background: #eaeef2;
  font-size: 8.5px;
}
.release-stage__detail {
  color: #57606a;
  font-size: 9px;
}
</style>
