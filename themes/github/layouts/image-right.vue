<template>
  <div class="slidev-layout gh-image-right">
    <div class="gh-ir-bg"></div>
    <div class="gh-ir-accent"></div>
    <div class="gh-ir-content">
      <slot />
    </div>
    <div class="gh-ir-image">
      <slot name="image" />
    </div>
  </div>
</template>

<style scoped>
.gh-image-right {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  background: linear-gradient(170deg, #0d1117 0%, #0f1419 35%, #111b27 65%, #0d1117 100%);
  color: #e6edf3;
}

.gh-ir-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(88, 166, 255, 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 0;
}

.gh-ir-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #58a6ff 0%, #a371f7 50%, transparent 100%);
  opacity: 0.5;
  z-index: 3;
}

.gh-ir-content {
  padding: 24px 32px 36px 56px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.gh-ir-image {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 32px;
}

/* Image gets a subtle glass frame */
.gh-ir-image :deep(img) {
  border-radius: 12px;
  border: 1px solid rgba(48, 54, 61, 0.6);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(88, 166, 255, 0.06);
  max-width: 100%;
  max-height: 460px;
  object-fit: contain;
}

/* Ambient glow behind image */
.gh-ir-image::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 70%;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(163, 113, 247, 0.08) 0%, transparent 70%);
  pointer-events: none;
}
</style>
