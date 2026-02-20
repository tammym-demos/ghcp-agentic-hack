<template>
  <div class="slidev-layout gh-section">
    <div class="gh-section-bg"></div>
    <div class="gh-section-content">
      <slot />
      <div class="gh-section-accent"></div>
    </div>
    <div class="gh-section-bar"></div>
  </div>
</template>

<style scoped>
.gh-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.gh-section-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #0d1117 0%, #0f1419 30%, #111b27 60%, #0d1117 100%);
  z-index: 0;
}

.gh-section-bg::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(163,113,247,0.06) 0%, transparent 70%);
  z-index: 1;
}

.gh-section-content {
  position: relative;
  z-index: 2;
}

.gh-section :deep(h1) {
  color: #ffffff;
  font-size: 2.8em;
  font-weight: 800;
  letter-spacing: -0.04em;
  border-bottom: none;
  margin-bottom: 0;
  line-height: 1.2;
  animation: none;
}

.gh-section-accent {
  width: 72px;
  height: 3px;
  background: linear-gradient(90deg, #58a6ff, #a371f7);
  border-radius: 2px;
  margin: 0.8em auto 0;
}

.gh-section-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #58a6ff, #a371f7, #8b5cf6);
}
</style>
