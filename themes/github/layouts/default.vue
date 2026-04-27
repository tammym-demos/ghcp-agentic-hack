<template>
  <div class="slidev-layout gh-default">
    <div class="gh-default-grid"></div>
    <div class="gh-default-glow"></div>
    <div class="gh-default-accent"></div>
    <div class="gh-default-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.gh-default {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(170deg, #0d1117 0%, #0f1419 35%, #111b27 65%, #0d1117 100%);
  color: #e6edf3;
}

/* Subtle dot grid pattern */
.gh-default-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(88, 166, 255, 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 0;
}

/* Corner ambient glow */
.gh-default-glow {
  position: absolute;
  top: -120px;
  right: -120px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(88, 166, 255, 0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* Left accent stripe */
.gh-default-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #58a6ff 0%, #a371f7 50%, transparent 100%);
  opacity: 0.5;
  z-index: 1;
}

.gh-default-content {
  padding: 24px 56px 36px;
  height: 100%;
  position: relative;
  z-index: 2;
  overflow: hidden;
}
</style>
