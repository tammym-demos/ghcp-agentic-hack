<template>
  <NativeAnimationStage
    label="Non-interactive safety sequence: establish a bounded task; name tools, data, permissions, and time; reveal the Human check; then stop before an unapproved action. No action or control is simulated."
  >
    <div class="mc-tool-permission-animation">
      <div class="mc-tool-permission-animation__task">
        <b>Least-Privilege Delegation</b>
      </div>
      <div class="mc-tool-permission-animation__scope" aria-label="Needed scope">
        <span v-for="(item, index) in scope" :key="item" :style="{ '--step': index }">{{ item }}</span>
      </div>
      <div class="mc-tool-permission-animation__check">
        <b>Human check</b><span>Name it.</span>
      </div>
      <div class="mc-tool-permission-animation__stop">
        <b>Stop before an unapproved action.</b>
      </div>
      <p>Candidate teaching role only. No live action or current-control claim.</p>
    </div>
  </NativeAnimationStage>
</template>

<script setup>
const scope = ["tools", "data", "permissions", "time"];
</script>

<style scoped>
.mc-tool-permission-animation {
  display: grid;
  grid-template-rows: auto auto auto auto auto;
  align-content: center;
  gap: 9px;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 12px;
  color: #24211f;
  background:
    radial-gradient(circle at 82% 22%, rgb(40 122 69 / 11%), transparent 30%),
    #fffdf7;
}

.mc-tool-permission-animation__task {
  display: grid;
  gap: 2px;
  padding: 9px 11px;
  border-left: 5px solid #287a45;
  background: #e8f3eb;
  opacity: 0;
  transform: scale(.98);
  animation: tool-permission-step-in .45s .25s forwards;
}

.mc-tool-permission-animation__task b {
  font-size: 16px;
}

.mc-tool-permission-animation__scope {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px;
}

.mc-tool-permission-animation__scope span {
  padding: 7px 9px;
  border: 2px solid #7650b7;
  border-radius: 8px;
  color: #5f3e98;
  background: #fff;
  font-size: 14px;
  font-weight: 720;
  text-align: center;
  opacity: 0;
  transform: scale(.94);
  animation: tool-permission-step-in .4s calc(1s + var(--step) * .55s) forwards;
}

.mc-tool-permission-animation__check {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  padding: 9px 11px;
  border: 1px solid #d8cfc2;
  border-radius: 8px;
  background: #fff;
  opacity: 0;
  transform: scale(.98);
  animation: tool-permission-step-in .45s 3.35s forwards;
}

.mc-tool-permission-animation__check b {
  color: #7650b7;
}

.mc-tool-permission-animation__check span {
  color: #625b54;
}

.mc-tool-permission-animation__stop {
  padding: 10px 11px;
  border-left: 5px solid #7650b7;
  background: #f0eaf7;
  opacity: 0;
  transform: scale(.98);
  animation: tool-permission-step-in .5s 4.15s forwards;
}

.mc-tool-permission-animation__stop b {
  font-size: 15px;
}

.mc-tool-permission-animation p {
  margin: 0;
  color: #625b54;
  font-size: 10px;
  line-height: 1.2;
}

@keyframes tool-permission-step-in {
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .mc-tool-permission-animation *,
  .mc-tool-permission-animation *::before,
  .mc-tool-permission-animation *::after {
    animation: none !important;
    transition: none !important;
  }

  .mc-tool-permission-animation__task,
  .mc-tool-permission-animation__scope span,
  .mc-tool-permission-animation__check,
  .mc-tool-permission-animation__stop {
    opacity: 1;
    transform: none;
  }
}
</style>
