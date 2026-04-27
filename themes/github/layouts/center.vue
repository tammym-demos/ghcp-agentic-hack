<template>
  <div class="slidev-layout gh-center">
    <div class="gh-center-grid"></div>
    <div class="gh-center-glow"></div>
    <div class="gh-center-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.gh-center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 32px 48px 44px;
  background: linear-gradient(170deg, #0d1117 0%, #0f1419 35%, #111b27 65%, #0d1117 100%);
  color: #e6edf3;
  position: relative;
  overflow: hidden;
}

.gh-center-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(88, 166, 255, 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.gh-center-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(88, 166, 255, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.gh-center-content {
  max-width: 85%;
  position: relative;
  z-index: 1;
}

.gh-center :deep(h1) {
  color: var(--gh-accent-fg);
  font-size: 2.2em;
  border-bottom: none;
  display: block;
}

.gh-center :deep(h3) {
  text-transform: none;
  letter-spacing: normal;
  color: var(--gh-fg-muted);
  font-size: 1em;
}
</style>
