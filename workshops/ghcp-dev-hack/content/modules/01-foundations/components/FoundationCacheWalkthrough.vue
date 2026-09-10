<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
import CacheWalkthrough from '../token-cache-cli-motion/components/CacheWalkthrough.vue'
const { $nav, $page, $renderContext } = useSlideContext()
let root
function updateNavigation() {
  if ($renderContext.value === 'slide')
    root?.classList.toggle('foundations-cache-active', $nav.value.currentPage === $page.value)
}
onMounted(() => { root = document.getElementById('page-root'); updateNavigation() })
watch(() => $nav.value.currentPage, updateNavigation)
onBeforeUnmount(() => {
  if ($renderContext.value === 'slide') root?.classList.remove('foundations-cache-active')
})
</script>

<template>
  <CacheWalkthrough />
</template>

<style>
/* Owner navigation repair remains everywhere else. In this full-canvas,
   landscape slide only, restore Slidev's native hover/focus visibility so the
   footer is readable at rest. Navigation remains clickable and keyboard-accessible. */
@media (min-aspect-ratio: 1/1) {
  #page-root.foundations-cache-active div:has(> nav button[title="Go to next slide"]) {
    opacity: 0 !important;
  }
  #page-root.foundations-cache-active div:has(> nav button[title="Go to next slide"]):is(:hover, :focus-within, :focus-visible) {
    opacity: 1 !important;
  }
}
</style>
