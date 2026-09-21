<template>
  <NativeAnimationStage
    label="Model-choice replay: establish one task boundary, compare two choices, then make a human decision using value and evidence"
  >
    <div class="mc-model-animation">
      <section class="mc-model-animation__task">
        <small>1 · Hold constant</small>
        <strong>Task + boundary + acceptance rules</strong>
      </section>

      <div class="mc-model-animation__choices">
        <section>
          <b>Choice A</b>
          <span>Lower use</span>
          <span>Requirement missed</span>
        </section>
        <section>
          <b>Choice B</b>
          <span>Higher use</span>
          <span>Accepted result</span>
        </section>
      </div>

      <div class="mc-model-animation__criteria">
        <span>complexity</span><span>context</span><span>risk</span>
        <span>validation</span><span>expected value</span>
      </div>

      <section class="mc-model-animation__decision">
        <small>3 · Human decision</small>
        <strong>Choose using accepted value and evidence</strong>
        <b>Lowest use is not automatically best value.</b>
      </section>
    </div>
  </NativeAnimationStage>
</template>

<style scoped>
.mc-model-animation {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 11px;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 12px 12px 76px;
  color: #24211f;
  background: #f8f1e7;
}

.mc-model-animation section {
  border: 1px solid #d8cfc2;
  border-radius: 9px;
  background: #fff;
}

.mc-model-animation__task {
  display: grid;
  gap: 3px;
  padding: 10px 12px;
  border-left: 4px solid #287a45 !important;
  opacity: 0;
  transform: translateY(-14px);
  animation: model-step-in .55s .35s forwards;
}

.mc-model-animation small {
  color: #287a45;
  font-size: 11px;
  font-weight: 760;
  letter-spacing: .05em;
  text-transform: uppercase;
}

.mc-model-animation strong {
  font-size: 15px;
  line-height: 1.2;
}

.mc-model-animation__choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.mc-model-animation__choices section {
  display: grid;
  align-content: center;
  gap: 6px;
  padding: 12px;
  opacity: 0;
  transform: translateX(-18px);
  animation: model-step-in .6s 3.1s forwards;
}

.mc-model-animation__choices section + section {
  border-color: #287a45;
  transform: translateX(18px);
  animation-delay: 4.2s;
}

.mc-model-animation__choices b {
  color: #7650b7;
  font-size: 16px;
}

.mc-model-animation__choices span {
  color: #625b54;
  font-size: 13px;
  line-height: 1.2;
}

.mc-model-animation__criteria {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  opacity: 0;
  animation: model-reveal .45s 6.3s forwards;
}

.mc-model-animation__criteria span {
  padding: 4px 7px;
  border-radius: 999px;
  color: #fff;
  background: #625b54;
  font-size: 10px;
  font-weight: 680;
}

.mc-model-animation__decision {
  position: absolute;
  right: 12px;
  bottom: 10px;
  left: 12px;
  display: grid;
  gap: 3px;
  padding: 9px 11px;
  border: 2px solid #7650b7 !important;
  opacity: 0;
  transform: translateY(16px);
  animation: model-step-in .65s 8.3s forwards;
}

.mc-model-animation__decision b {
  margin-top: 2px;
  color: #7650b7;
  font-size: 13px;
  line-height: 1.2;
}

@keyframes model-step-in {
  to { opacity: 1; transform: none; }
}

@keyframes model-reveal {
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .mc-model-animation *,
  .mc-model-animation *::before,
  .mc-model-animation *::after {
    animation: none !important;
    transition: none !important;
  }

  .mc-model-animation__task,
  .mc-model-animation__choices section,
  .mc-model-animation__criteria,
  .mc-model-animation__decision {
    opacity: 1;
    transform: none;
  }
}
</style>
