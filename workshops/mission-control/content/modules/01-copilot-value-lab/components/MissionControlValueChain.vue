<template>
  <NativeAnimationStage
    label="Six ordered measurement categories progress as classification and evidence, not guaranteed conversion: Investment, Consumption, Activity, Completed work, Accepted outcome, and Value; then the ROI comparison appears"
  >
    <div class="mc-value-animation">
      <div class="mc-value-animation__chain" aria-label="Ordered value-measure classification">
        <section class="mc-value-animation__stage mc-value-animation__stage--context">
          <b>Investment</b>
          <span>money, time, and effort committed</span>
        </section>
        <i class="mc-value-animation__arrow mc-value-animation__arrow--1" aria-hidden="true">⇢</i>
        <section class="mc-value-animation__stage mc-value-animation__stage--context">
          <b>Consumption</b>
          <span>service or model use</span>
        </section>
        <i class="mc-value-animation__arrow mc-value-animation__arrow--2" aria-hidden="true">⇢</i>
        <section class="mc-value-animation__stage mc-value-animation__stage--context">
          <b>Activity</b>
          <span>attempts, generations, reviews, and other work</span>
        </section>

        <i class="mc-value-animation__turn" aria-hidden="true">⇣</i>

        <section class="mc-value-animation__stage mc-value-animation__stage--evidence">
          <b>Completed work</b>
          <span>work crossing the agreed boundary</span>
        </section>
        <i class="mc-value-animation__arrow mc-value-animation__arrow--3" aria-hidden="true">⇠</i>
        <section class="mc-value-animation__stage mc-value-animation__stage--evidence">
          <b>Accepted outcome</b>
          <span>completed work passing required checks</span>
        </section>
        <i class="mc-value-animation__arrow mc-value-animation__arrow--4" aria-hidden="true">⇠</i>
        <section class="mc-value-animation__stage mc-value-animation__stage--result">
          <b>Value</b>
          <span>a useful engineering or business result</span>
        </section>
      </div>

      <div class="mc-value-animation__roi">
        <b>ROI compares value gained with investment made.</b>
      </div>
    </div>
  </NativeAnimationStage>
</template>

<style scoped>
.mc-value-animation {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 14px;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 18px;
  color: #24211f;
  background:
    radial-gradient(circle at 86% 76%, rgb(40 122 69 / 10%), transparent 28%),
    #fffdf7;
}

.mc-value-animation__chain {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 34px minmax(0, 1fr) 34px minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) 30px minmax(0, 1fr);
  align-items: stretch;
  min-height: 0;
}

.mc-value-animation__stage {
  display: grid;
  align-content: center;
  gap: 7px;
  min-width: 0;
  min-height: 0;
  padding: 10px 15px;
  border: 2px solid #7650b7;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 20px rgb(36 33 31 / 9%);
  opacity: 0;
  transform: scale(.97);
  transform-origin: center;
  animation: value-stage-in .48s forwards;
}

.mc-value-animation__stage b {
  color: #7650b7;
  font-size: 21px;
  line-height: 1.1;
}

.mc-value-animation__stage span {
  color: #625b54;
  font-size: 15px;
  line-height: 1.24;
}

.mc-value-animation__stage--evidence {
  border-color: #287a45;
}

.mc-value-animation__stage--evidence b {
  color: #287a45;
}

.mc-value-animation__stage--result {
  border-color: #24211f;
  background: #eef6f0;
}

.mc-value-animation__stage--result b {
  color: #1f6338;
}

.mc-value-animation__stage:nth-of-type(1) { animation-delay: .2s; }
.mc-value-animation__stage:nth-of-type(2) { animation-delay: 1.05s; }
.mc-value-animation__stage:nth-of-type(3) { animation-delay: 1.9s; }
.mc-value-animation__stage:nth-of-type(4) { animation-delay: 2.75s; }
.mc-value-animation__stage:nth-of-type(5) { animation-delay: 3.6s; }
.mc-value-animation__stage:nth-of-type(6) { animation-delay: 4.45s; }

.mc-value-animation__arrow,
.mc-value-animation__turn {
  display: grid;
  place-items: center;
  align-self: center;
  color: #7650b7;
  font-size: 27px;
  font-style: normal;
  font-weight: 800;
  opacity: 0;
  animation: value-link-in .3s forwards;
}

.mc-value-animation__arrow--1 { animation-delay: .78s; }
.mc-value-animation__arrow--2 { animation-delay: 1.63s; }
.mc-value-animation__turn {
  grid-column: 5;
  grid-row: 2;
  animation-delay: 2.48s;
}
.mc-value-animation__arrow--3 { animation-delay: 3.33s; }
.mc-value-animation__arrow--4 { animation-delay: 4.18s; }

.mc-value-animation__chain > :nth-child(7) {
  grid-column: 5;
  grid-row: 3;
}

.mc-value-animation__chain > :nth-child(8) {
  grid-column: 4;
  grid-row: 3;
}

.mc-value-animation__chain > :nth-child(9) {
  grid-column: 3;
  grid-row: 3;
}

.mc-value-animation__chain > :nth-child(10) {
  grid-column: 2;
  grid-row: 3;
}

.mc-value-animation__chain > :nth-child(11) {
  grid-column: 1;
  grid-row: 3;
}

.mc-value-animation__roi {
  padding: 13px 18px;
  border-left: 5px solid #287a45;
  background: #e8f3eb;
  opacity: 0;
  transform: scale(.98);
  transform-origin: center;
  animation: value-stage-in .58s 5.05s forwards;
}

.mc-value-animation__roi b {
  color: #24211f;
  font-size: 21px;
  line-height: 1.2;
}

@keyframes value-stage-in {
  to { opacity: 1; transform: none; }
}

@keyframes value-link-in {
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .mc-value-animation *,
  .mc-value-animation *::before,
  .mc-value-animation *::after {
    animation: none !important;
    transition: none !important;
  }

  .mc-value-animation__stage,
  .mc-value-animation__arrow,
  .mc-value-animation__turn,
  .mc-value-animation__roi {
    opacity: 1;
    transform: none;
  }
}
</style>
