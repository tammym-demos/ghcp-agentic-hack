<script setup lang="ts">
import { onSlideEnter } from "@slidev/client";
import { nextTick, onMounted } from "vue";

const props = defineProps<{ slideId: string }>();

async function replay() {
  await nextTick();
  const stage = document.querySelector(`[data-slide-id="${props.slideId}"] .mce-motion-stage`);
  if (!stage) return;
  stage.classList.remove("is-replaying");
  void (stage as HTMLElement).offsetWidth;
  stage.classList.add("is-replaying");
}

onMounted(replay);
onSlideEnter(replay);
</script>

<template>
  <span class="mce-motion-reset" aria-hidden="true"></span>
</template>
