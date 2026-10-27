<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{ width: number; height: number }>();
const host = ref<HTMLElement>();
const size = ref({ width: 0, height: 0 });
let observer: ResizeObserver | undefined;
const frameStyle = computed(() => {
  const scale = Math.min(size.value.width / props.width, size.value.height / props.height);
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
    transform: `translate(${(size.value.width - props.width * scale) / 2}px, ${(size.value.height - props.height * scale) / 2}px) scale(${scale})`
  };
});

onMounted(() => {
  observer = new ResizeObserver(() => {
    if (host.value) size.value = { width: host.value.clientWidth, height: host.value.clientHeight };
  });
  observer.observe(host.value!);
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div ref="host" class="ghcp-slide-canvas">
    <div class="ghcp-slide-canvas__frame" :style="frameStyle"><slot /></div>
  </div>
</template>

<style scoped>
.ghcp-slide-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
.ghcp-slide-canvas__frame {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
}
</style>
