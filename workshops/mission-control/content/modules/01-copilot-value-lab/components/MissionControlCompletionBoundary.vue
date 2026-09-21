<template>
  <NativeAnimationStage
    label="Reference completion points appear in order: code, pull request, story, release, and business outcome. A workflow may use only the points that apply. Boundary and Evidence questions then appear without selecting a participant boundary."
  >
    <div class="mc-boundary-animation">
      <div class="mc-boundary-animation__chain" aria-label="Completion chain">
        <template v-for="(step, index) in steps" :key="step">
          <b :style="{ '--step': index }">{{ step }}</b>
          <i v-if="index < steps.length - 1" :style="{ '--step': index }" aria-hidden="true">→</i>
        </template>
      </div>
      <div class="mc-boundary-animation__questions">
        <div><b>Boundary</b><span>Where does work count as finished for this pilot?</span></div>
        <div><b>Evidence</b><span>What proves it crossed that point?</span></div>
      </div>
    </div>
  </NativeAnimationStage>
</template>

<script setup>
const steps = ["code", "pull request", "story", "release", "business outcome"];
</script>

<style scoped>
.mc-boundary-animation {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 22px;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 24px;
  color: #24211f;
  background:
    radial-gradient(circle at 88% 20%, rgb(118 80 183 / 12%), transparent 28%),
    #fffdf7;
}

.mc-boundary-animation__chain {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr) 28px) minmax(0, 1.2fr);
  align-items: center;
  min-height: 0;
}

.mc-boundary-animation__chain b {
  display: grid;
  place-items: center;
  min-height: 82px;
  padding: 10px;
  border: 2px solid #7650b7;
  border-radius: 12px;
  color: #5f3e98;
  background: #fff;
  box-shadow: 0 8px 20px rgb(36 33 31 / 8%);
  font-size: 19px;
  line-height: 1.15;
  text-align: center;
  opacity: 0;
  transform: scale(.97);
  animation: boundary-step-in .45s calc(.25s + var(--step) * .75s) forwards;
}

.mc-boundary-animation__chain i {
  color: #7650b7;
  font-size: 25px;
  font-style: normal;
  font-weight: 800;
  text-align: center;
  opacity: 0;
  animation: boundary-link-in .25s calc(.78s + var(--step) * .75s) forwards;
}

.mc-boundary-animation__questions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.mc-boundary-animation__questions div {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 15px 17px;
  border-left: 5px solid #287a45;
  background: #e8f3eb;
  opacity: 0;
  transform: scale(.98);
  animation: boundary-question-in .48s 4s forwards;
}

.mc-boundary-animation__questions div + div {
  border-left-color: #7650b7;
  background: #f0eaf7;
  animation-delay: 4.2s;
}

.mc-boundary-animation__questions b {
  font-size: 18px;
}

.mc-boundary-animation__questions span {
  color: #625b54;
  font-size: 15px;
  line-height: 1.25;
}

@keyframes boundary-step-in {
  to { opacity: 1; transform: none; }
}

@keyframes boundary-link-in {
  to { opacity: 1; }
}

@keyframes boundary-question-in {
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .mc-boundary-animation *,
  .mc-boundary-animation *::before,
  .mc-boundary-animation *::after {
    animation: none !important;
    transition: none !important;
  }

  .mc-boundary-animation__chain b,
  .mc-boundary-animation__chain i,
  .mc-boundary-animation__questions div {
    opacity: 1;
    transform: none;
  }
}
</style>
