<template>
  <div class="slidev-layout gh-cover">
    <div class="gh-cover-bg"></div>
    <div class="gh-cover-content">
      <div class="gh-cover-logo">
        <svg viewBox="0 0 98 96" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
        </svg>
      </div>
      <slot />
    </div>
    <div class="gh-cover-bar"></div>
  </div>
</template>

<style scoped>
.gh-cover {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  color: #ffffff;
}

.gh-cover-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #0d1117 0%, #0f1419 30%, #111b27 60%, #0d1117 100%);
  z-index: 0;
}

/* Primer Brand-style ambient glow — blue/purple spectrum */
.gh-cover-bg::before {
  content: '';
  position: absolute;
  top: 25%;
  left: 35%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(88,166,255,0.07) 0%, transparent 70%);
  z-index: 1;
}

.gh-cover-bg::after {
  content: '';
  position: absolute;
  top: 60%;
  left: 65%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(163,113,247,0.06) 0%, transparent 70%);
  z-index: 1;
}

.gh-cover-content {
  position: relative;
  z-index: 2;
  max-width: 80%;
}

.gh-cover-logo svg {
  width: 52px;
  height: 52px;
  color: #8b949e;
  margin-bottom: 1.8em;
  opacity: 0.5;
  filter: drop-shadow(0 0 20px rgba(88,166,255,0.15));
}

.gh-cover :deep(h1) {
  font-size: 3.4em;
  font-weight: 800;
  letter-spacing: -0.05em;
  border-bottom: none;
  margin-bottom: 0.1em;
  background: linear-gradient(135deg, #ffffff 0%, #a5d6ff 50%, #a371f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  display: block;
  animation: none;
}

.gh-cover :deep(h2) {
  font-size: 1.4em;
  font-weight: 400;
  color: #8b949e;
  letter-spacing: 0;
  margin-bottom: 0.6em;
}

.gh-cover :deep(p) {
  color: #656d76;
  font-size: 0.95em;
}

.gh-cover :deep(em) {
  color: #656d76;
}

.gh-cover :deep(code) {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 6px;
  padding: 0.15em 0.45em;
  color: #a5d6ff;
  font-size: 0.9em;
}

.gh-cover-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #58a6ff, #a371f7, #8b5cf6);
}
</style>
