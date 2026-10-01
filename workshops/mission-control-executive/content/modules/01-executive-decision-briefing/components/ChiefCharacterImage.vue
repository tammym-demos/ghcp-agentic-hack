<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    src: string;
    role:
      | "decision"
      | "evidence challenge"
      | "human-owned controls"
      | "evidence-proportional gate";
    focalPoint?: string;
  }>(),
  {
    focalPoint: "86% center"
  }
);

const resolvedSrc = computed(() =>
  props.src.startsWith("/")
    ? `${import.meta.env.BASE_URL}${props.src.slice(1)}`
    : props.src
);
</script>

<template>
  <figure class="mce-chief-art" :aria-label="`Chief Morgan Charter, executive sponsor: ${role}`">
    <img :src="resolvedSrc" alt="" :style="{ objectPosition: focalPoint }" />
  </figure>
</template>
