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
  /* Transparent — Slidev's background: frontmatter shows through */
}
</style>
