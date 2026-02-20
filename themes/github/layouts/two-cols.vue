<template>
  <div class="slidev-layout gh-two-cols">
    <div class="gh-two-cols-grid"></div>
    <div class="gh-two-cols-accent"></div>
    <div class="gh-two-cols-inner">
      <div class="gh-two-cols-header">
        <slot name="default" />
      </div>
      <div class="gh-two-cols-container">
        <div class="gh-two-cols-left">
          <slot name="left" />
        </div>
        <div class="gh-two-cols-divider"></div>
        <div class="gh-two-cols-right">
          <slot name="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gh-two-cols {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(170deg, #0d1117 0%, #0f1419 35%, #111b27 65%, #0d1117 100%);
  color: #e6edf3;
}

/* Subtle dot grid */
.gh-two-cols-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(88, 166, 255, 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 0;
}

.gh-two-cols-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #58a6ff 0%, #a371f7 50%, transparent 100%);
  opacity: 0.5;
  z-index: 1;
}

.gh-two-cols-inner {
  padding: 72px 64px 48px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 2;
}

.gh-two-cols-header {
  flex-shrink: 0;
  margin-bottom: 0.5em;
}

.gh-two-cols-container {
  flex: 1;
  display: flex;
  gap: 0;
  align-items: flex-start;
  overflow: hidden;
}

.gh-two-cols-left,
.gh-two-cols-right {
  flex: 1;
  min-width: 0;
  padding: 0 1em;
}

.gh-two-cols-left {
  padding-left: 0;
}

.gh-two-cols-right {
  padding-right: 0;
}

.gh-two-cols-divider {
  width: 1px;
  align-self: stretch;
  background: linear-gradient(180deg, transparent, var(--gh-border-default), transparent);
  flex-shrink: 0;
  position: relative;
}

/* Glow dot at divider midpoint */
.gh-two-cols-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gh-accent-fg);
  box-shadow: 0 0 12px rgba(88, 166, 255, 0.4);
  opacity: 0.6;
}
</style>
