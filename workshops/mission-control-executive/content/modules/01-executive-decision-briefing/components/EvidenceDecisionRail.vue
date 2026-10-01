<script setup lang="ts">
const props = defineProps<{
  step: number;
  phase: "Decision first" | "Govern" | "Improve" | "Prove" | "Decide";
}>();

const phases = [
  { label: "Govern", start: 1, end: 3 },
  { label: "Improve", start: 4, end: 6 },
  { label: "Prove", start: 7, end: 10 },
  { label: "Decide", start: 11, end: 12 },
];
</script>

<template>
  <footer class="mce-rail" aria-label="Evidence-to-decision rail">
    <div class="mce-rail__lead">
      <b>Evidence → decision</b>
      <span>S{{ String(step).padStart(2, "0") }} · {{ phase }}</span>
    </div>
    <div class="mce-rail__track" aria-hidden="true">
      <i
        v-for="index in 12"
        :key="index"
        :class="{ 'is-current': index === step, 'is-past': index < step }"
      >{{ index }}</i>
    </div>
    <div class="mce-rail__phases">
      <span
        v-for="item in phases"
        :key="item.label"
        :class="{ 'is-active': item.label === phase || (phase === 'Decision first' && item.label === 'Govern') }"
      >{{ item.label }}</span>
    </div>
  </footer>
</template>
