<template>
  <div class="slidev-layout gh-demo">
    <div class="gh-demo-bg"></div>
    <div class="gh-demo-content">
      <div class="gh-demo-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      </div>
      <slot />
    </div>
    <div class="gh-demo-bar"></div>
  </div>
</template>

<style scoped>
.gh-demo {
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

.gh-demo-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #0d1117 0%, #0f1419 30%, #111b27 60%, #0d1117 100%);
  z-index: 0;
}

.gh-demo-bg::after {
  content: '';
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(88,166,255,0.08) 0%, transparent 65%);
  z-index: 1;
}

.gh-demo-content {
  position: relative;
  z-index: 2;
  max-width: 80%;
}

.gh-demo-icon {
  margin-bottom: 1.2em;
}

.gh-demo-icon svg {
  width: 48px;
  height: 48px;
  color: #58a6ff;
  opacity: 0.7;
  filter: drop-shadow(0 0 16px rgba(88,166,255,0.2));
}

.gh-demo :deep(h1) {
  color: #ffffff;
  font-size: 2.4em;
  font-weight: 800;
  letter-spacing: -0.04em;
  border-bottom: none;
  margin-bottom: 0.2em;
  display: block;
  animation: none;
}

.gh-demo :deep(h3) {
  color: #8b949e;
  font-size: 1em;
  text-transform: none;
  letter-spacing: normal;
  font-weight: 400;
}

.gh-demo :deep(ul) {
  text-align: left;
  display: inline-block;
  color: #c9d1d9;
  font-size: 0.92em;
  line-height: 1.8;
}

.gh-demo :deep(li) {
  color: #c9d1d9;
}

.gh-demo :deep(em) {
  color: #656d76;
  font-size: 0.88em;
}

.gh-demo-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #58a6ff, #a371f7, #8b5cf6);
}
</style>
