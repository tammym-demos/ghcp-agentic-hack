<template>
  <div class="slidev-layout gh-image-full">
    <slot />
  </div>
</template>

<style scoped>
.gh-image-full {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #000;
}

.gh-image-full :deep(img) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}
</style>
