<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '@slidev/client/layoutHelper.ts'

const props = defineProps({
  background: {
    type: String,
  },
  backgroundSize: {
    type: String,
    default: 'contain',
  },
})

const style = computed(() => handleBackground(props.background, false, props.backgroundSize))
</script>

<template>
  <div class="slidev-layout gh-image-full" :style="style">
    <slot />
  </div>
</template>

<style scoped>
.gh-image-full {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #000;
  padding: 0;
}
</style>
