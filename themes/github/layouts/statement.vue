<template>
  <div class="slidev-layout gh-statement">
    <div class="gh-stmt-bg"></div>
    <div class="gh-stmt-glow"></div>
    <div class="gh-stmt-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.gh-statement {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #0d1117 0%, #0f1419 30%, #111b27 60%, #0d1117 100%);
  color: #e6edf3;
}

.gh-stmt-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(88, 166, 255, 0.03) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

.gh-stmt-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(88, 166, 255, 0.06) 0%, rgba(163, 113, 247, 0.03) 40%, transparent 70%);
  pointer-events: none;
}

.gh-stmt-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 780px;
  padding: 0 48px;
}

/* Statement h1 — large, gradient text */
.gh-stmt-content :deep(h1) {
  font-size: 2.4em;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.2;
  background: linear-gradient(135deg, #ffffff 0%, #e6edf3 40%, #58a6ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border: none !important;
  border-image: none !important;
  margin-bottom: 0.6em !important;
}

/* Subtitle paragraph — muted, larger */
.gh-stmt-content :deep(p) {
  font-size: 1.2em;
  color: #8b949e;
  line-height: 1.6;
}

/* Bold text gets accent color */
.gh-stmt-content :deep(strong) {
  color: #58a6ff;
  font-weight: 700;
}
</style>
