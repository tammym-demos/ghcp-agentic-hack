<template>
  <NativeAnimationStage
    label="Context categories enter one limited working space, then the final selection rule appears"
  >
    <div class="mc-context-animation">
      <div class="mc-context-animation__inputs" aria-label="Context inputs">
        <span>Instructions</span>
        <span>Conversation</span>
        <span>Code</span>
        <span>Files</span>
        <span>Retrieved material</span>
        <span>Tool results</span>
        <span>Generated output</span>
      </div>

      <div class="mc-context-animation__arrow" aria-hidden="true">→</div>

      <section class="mc-context-animation__window">
        <strong>Limited working space</strong>
        <div class="mc-context-animation__slots" aria-hidden="true">
          <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
        </div>
        <p>Every included item competes for room.</p>
      </section>

      <div class="mc-context-animation__decision">
        <b>More context is not automatically better context.</b>
        <span>Keep what helps the task and acceptance rules. Remove what does not.</span>
      </div>
    </div>
  </NativeAnimationStage>
</template>

<style scoped>
.mc-context-animation {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) auto minmax(0, .85fr);
  align-items: center;
  gap: 18px;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 16px 18px 74px;
  color: #24211f;
  background:
    radial-gradient(circle at 78% 42%, rgb(118 80 183 / 12%), transparent 30%),
    #fffdf7;
}

.mc-context-animation__inputs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}

.mc-context-animation__inputs span {
  display: grid;
  place-items: center;
  min-height: 42px;
  padding: 7px 10px;
  border: 1px solid #d8cfc2;
  border-left: 4px solid #287a45;
  border-radius: 8px;
  background: #fff;
  font-size: 15px;
  font-weight: 680;
  line-height: 1.2;
  opacity: 0;
  transform: translateX(-28px);
  animation: context-input-in .48s forwards;
}

.mc-context-animation__inputs span:nth-child(1) { animation-delay: .35s; }
.mc-context-animation__inputs span:nth-child(2) { animation-delay: 1.05s; }
.mc-context-animation__inputs span:nth-child(3) { animation-delay: 1.75s; }
.mc-context-animation__inputs span:nth-child(4) { animation-delay: 2.45s; }
.mc-context-animation__inputs span:nth-child(5) { animation-delay: 3.15s; }
.mc-context-animation__inputs span:nth-child(6) { animation-delay: 3.85s; }
.mc-context-animation__inputs span:nth-child(7) { animation-delay: 4.55s; }

.mc-context-animation__arrow {
  color: #7650b7;
  font-size: 36px;
  font-weight: 800;
  opacity: 0;
  animation: context-reveal .4s 1.1s forwards;
}

.mc-context-animation__window {
  display: grid;
  gap: 14px;
  padding: 18px;
  border: 3px solid #7650b7;
  border-radius: 18px;
  background: rgb(255 255 255 / 92%);
  box-shadow: 0 12px 28px rgb(36 33 31 / 12%);
}

.mc-context-animation__window strong {
  color: #7650b7;
  font-size: 22px;
  line-height: 1.1;
}

.mc-context-animation__window p {
  margin: 0;
  color: #625b54;
  font-size: 15px;
  line-height: 1.3;
}

.mc-context-animation__slots {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  height: 86px;
  padding: 7px;
  border: 1px solid #d8cfc2;
  border-radius: 9px;
  background: #f8f1e7;
}

.mc-context-animation__slots i {
  align-self: end;
  height: 100%;
  border-radius: 4px;
  background: #287a45;
  opacity: 0;
  transform: scaleY(.1);
  transform-origin: bottom;
  animation: context-slot-fill .48s forwards;
}

.mc-context-animation__slots i:nth-child(1) { animation-delay: .7s; }
.mc-context-animation__slots i:nth-child(2) { animation-delay: 1.4s; }
.mc-context-animation__slots i:nth-child(3) { animation-delay: 2.1s; }
.mc-context-animation__slots i:nth-child(4) { animation-delay: 2.8s; }
.mc-context-animation__slots i:nth-child(5) { animation-delay: 3.5s; }
.mc-context-animation__slots i:nth-child(6) { animation-delay: 4.2s; }
.mc-context-animation__slots i:nth-child(7) {
  background: #7650b7;
  animation-delay: 4.9s;
}

.mc-context-animation__decision {
  position: absolute;
  right: 18px;
  bottom: 14px;
  left: 18px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 6px 18px;
  padding: 12px 16px;
  border-left: 5px solid #7650b7;
  background: #f0eaf7;
  opacity: 0;
  transform: translateY(18px);
  animation: context-decision-in .55s 5.6s forwards;
}

.mc-context-animation__decision b {
  font-size: 18px;
}

.mc-context-animation__decision span {
  color: #625b54;
  font-size: 15px;
  line-height: 1.3;
}

@keyframes context-input-in {
  to { opacity: 1; transform: none; }
}

@keyframes context-reveal {
  to { opacity: 1; }
}

@keyframes context-slot-fill {
  to { opacity: 1; transform: scaleY(1); }
}

@keyframes context-decision-in {
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .mc-context-animation *,
  .mc-context-animation *::before,
  .mc-context-animation *::after {
    animation: none !important;
    transition: none !important;
  }

  .mc-context-animation__inputs span,
  .mc-context-animation__arrow,
  .mc-context-animation__slots i,
  .mc-context-animation__decision {
    opacity: 1;
    transform: none;
  }
}
</style>
