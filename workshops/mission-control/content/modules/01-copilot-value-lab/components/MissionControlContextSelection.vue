<template>
  <NativeAnimationStage
    label="Synthetic controlled comparison: Task plus acceptance rules remain fixed. First shows stale, repeated, or unrelated context. Then shows only context needed for the task. No result, cost, speed, or product behavior is claimed."
  >
    <div class="mc-context-selection-animation">
      <div class="mc-context-selection-animation__constant">
        <small>One changed factor</small>
        <b>Task + acceptance rules</b>
      </div>
      <div class="mc-context-selection-animation__runs">
        <section class="mc-context-selection-animation__run mc-context-selection-animation__run--first">
          <b>First</b>
          <span>Stale · repeated · unrelated</span>
        </section>
        <section class="mc-context-selection-animation__run mc-context-selection-animation__run--then">
          <b>Then</b>
          <span>Same task + acceptance rules</span>
          <span>Only needed context</span>
        </section>
      </div>
      <div class="mc-context-selection-animation__rules">
        <b>Compare the accepted result, not context size alone.</b>
        <span>Judge completion and quality before time or cost.</span>
      </div>
    </div>
  </NativeAnimationStage>
</template>

<style scoped>
.mc-context-selection-animation {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 11px;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 12px;
  color: #24211f;
  background:
    radial-gradient(circle at 84% 22%, rgb(118 80 183 / 12%), transparent 30%),
    #fffdf7;
}

.mc-context-selection-animation__constant {
  display: grid;
  gap: 2px;
  padding: 9px 11px;
  border-left: 5px solid #287a45;
  background: #e8f3eb;
}

.mc-context-selection-animation__constant small {
  color: #287a45;
  font-size: 10px;
  font-weight: 760;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.mc-context-selection-animation__constant b {
  font-size: 15px;
  line-height: 1.15;
}

.mc-context-selection-animation__runs {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 9px;
  min-height: 0;
}

.mc-context-selection-animation__run {
  display: grid;
  align-content: center;
  gap: 5px;
  min-height: 0;
  padding: 10px 12px;
  border: 2px solid #d8cfc2;
  border-radius: 9px;
  background: #fff;
  opacity: 0;
  transform: scale(.97);
  animation: context-selection-step-in .52s .55s forwards;
}

.mc-context-selection-animation__run--then {
  border-color: #7650b7;
  animation-delay: 2.25s;
}

.mc-context-selection-animation__run b {
  color: #7650b7;
  font-size: 17px;
}

.mc-context-selection-animation__run span {
  color: #625b54;
  font-size: 13px;
  line-height: 1.25;
}

.mc-context-selection-animation__rules {
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border-left: 5px solid #7650b7;
  background: #f0eaf7;
  opacity: 0;
  transform: scale(.98);
  animation: context-selection-rule-in .5s 4.65s forwards;
}

.mc-context-selection-animation__rules b {
  font-size: 14px;
  line-height: 1.2;
}

.mc-context-selection-animation__rules span {
  color: #625b54;
  font-size: 12px;
  line-height: 1.2;
}

@keyframes context-selection-step-in {
  to { opacity: 1; transform: none; }
}

@keyframes context-selection-rule-in {
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .mc-context-selection-animation *,
  .mc-context-selection-animation *::before,
  .mc-context-selection-animation *::after {
    animation: none !important;
    transition: none !important;
  }

  .mc-context-selection-animation__run,
  .mc-context-selection-animation__rules {
    opacity: 1;
    transform: none;
  }
}
</style>
