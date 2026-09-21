<template>
  <NativeAnimationStage
    label="Less-to-More enforcement orientation remains fixed while five possible enforcement points appear in order. The sequence is not a mandatory maturity ladder, and service support must be confirmed."
  >
    <div class="mc-enforcement-animation">
      <div class="mc-enforcement-animation__scale" aria-label="Less to More orientation">
        <b>Less</b><span aria-hidden="true"></span><b>More</b>
      </div>
      <div class="mc-enforcement-animation__steps">
        <template v-for="(step, index) in steps" :key="step">
          <b :style="{ '--step': index }">{{ step }}</b>
          <i v-if="index < steps.length - 1" :style="{ '--step': index }" aria-hidden="true">↓</i>
        </template>
      </div>
    </div>
  </NativeAnimationStage>
</template>

<script setup>
const steps = [
  "Requirement/Policy",
  "Proactive Enforcement",
  "Reactive Enforcement",
  "Validators-Monitoring",
  "Offenses | Penalties | Amendments",
];
</script>

<style scoped>
.mc-enforcement-animation {
  display: grid;
  grid-template-columns: 148px 1fr;
  gap: 24px;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 20px 26px;
  color: #24211f;
  background:
    linear-gradient(90deg, rgb(40 122 69 / 8%), transparent 35%),
    #fffdf7;
}

.mc-enforcement-animation__scale {
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  min-height: 0;
  padding: 8px 0;
}

.mc-enforcement-animation__scale b {
  color: #287a45;
  font-size: 19px;
}

.mc-enforcement-animation__scale b:last-child {
  color: #7650b7;
}

.mc-enforcement-animation__scale span {
  width: 7px;
  margin: 8px 0;
  border-radius: 99px;
  background: linear-gradient(#287a45, #7650b7);
}

.mc-enforcement-animation__steps {
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr) 17px) minmax(0, 1fr);
  min-height: 0;
}

.mc-enforcement-animation__steps b {
  display: grid;
  place-items: center;
  min-height: 0;
  padding: 6px 14px;
  border: 2px solid #d8cfc2;
  border-left: 6px solid #7650b7;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 5px 14px rgb(36 33 31 / 7%);
  font-size: 17px;
  line-height: 1.15;
  text-align: center;
  opacity: 0;
  transform: scale(.97);
  animation: enforcement-step-in .45s calc(.25s + var(--step) * .82s) forwards;
}

.mc-enforcement-animation__steps i {
  display: grid;
  place-items: center;
  color: #7650b7;
  font-size: 19px;
  font-style: normal;
  font-weight: 800;
  opacity: 0;
  animation: enforcement-link-in .25s calc(.75s + var(--step) * .82s) forwards;
}

@keyframes enforcement-step-in {
  to { opacity: 1; transform: none; }
}

@keyframes enforcement-link-in {
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .mc-enforcement-animation *,
  .mc-enforcement-animation *::before,
  .mc-enforcement-animation *::after {
    animation: none !important;
    transition: none !important;
  }

  .mc-enforcement-animation__steps b,
  .mc-enforcement-animation__steps i {
    opacity: 1;
    transform: none;
  }
}
</style>
