<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
const artwork = `${import.meta.env.BASE_URL}images/railway-message-comparison-v1.png`

const stages = [
  { title: 'Read the whole message', duration: 7.8 },
  { title: 'Calculate word scores', duration: 3 },
  { title: 'Add the highest scorer', duration: 3 },
  { title: 'Change just one word', duration: 7.8 },
  { title: 'The scores change', duration: 3 },
  { title: 'Add the highest scorer', duration: 3 },
  { title: 'Compare the replies', duration: 1 },
]
const cases = [
  { word: 'coffee', result: 'mug', scores: [75, 5, 20] },
  { word: 'concrete', result: 'mold', scores: [5, 80, 15] },
]
const names = ['mug', 'mold', 'other words']
const step = ref(0), time = ref(0), running = ref(false), reduced = ref(false)
const prefix = ref(), suffixX = ref(702)
const duration = computed(() => stages[step.value].duration)
const scenario = computed(() => cases[step.value < 3 ? 0 : 1])
const words = computed(() => ['Where', 'should', 'I', 'pour', 'the', `${scenario.value.word}?`])
const message = computed(() => words.value.join(' '))
const inputStage = computed(() => step.value === 0 || step.value === 3)
const scoreStage = computed(() => step.value === 1 || step.value === 4)
const flightStage = computed(() => step.value === 2 || step.value === 5)
const clamp = p => Math.max(0, Math.min(1, p))
const smooth = p => { p = clamp(p); return p*p*(3-2*p) }
const active = computed(() => Math.min(5, Math.floor(time.value / 1.3)))
const local = computed(() => time.value % 1.3)
const carriageX = computed(() => 430 + 300*smooth((local.value-.4)/.85))
const flight = computed(() => step.value === 6 ? 1 : flightStage.value ? smooth((time.value-.35)/2.2) : 0)
const arrived = computed(() => step.value === 6 || (flightStage.value && time.value >= 2.55))
const scores = computed(() => {
  const p = scoreStage.value ? smooth(time.value/2.2) : 1
  const from = step.value >= 3 ? cases[0].scores : [34, 33, 33]
  if (inputStage.value) return step.value === 3 ? cases[0].scores : [0, 0, 0]
  return scenario.value.scores.map((v,i) => from[i] + (v-from[i])*p)
})
const displayedScores = computed(() => {
  const first = Math.round(scores.value[0]), second = Math.round(scores.value[1])
  return [first, second, 100-first-second]
})
const actorX = computed(() => {
  const p = flight.value
  return 614 + (suffixX.value-614)*smooth(p*2)
})
const actorY = computed(() => (scenario.value.word === 'coffee' ? 275 : 319)*(1-flight.value) + 126*flight.value)
const reply = computed(() => `Pour it into a${arrived.value ? ` ${scenario.value.result}.` : '...'}`)
let frame = 0, previous = 0, media
function pause() { running.value = false; cancelAnimationFrame(frame) }
function tick(now) {
  if (!running.value) return
  time.value = Math.min(duration.value, time.value + (now-previous)/1000)
  previous = now
  if (time.value >= duration.value) running.value = false
  else frame = requestAnimationFrame(tick)
}
function play() {
  if (reduced.value) return
  if (running.value) return pause()
  if (time.value >= duration.value) time.value = 0
  running.value = true; previous = performance.now(); frame = requestAnimationFrame(tick)
}
function next() {
  if (time.value < duration.value) { pause(); time.value = duration.value; return }
  if (step.value === 6) return
  pause(); step.value++; time.value = reduced.value ? duration.value : 0
  if (!reduced.value) play()
}
function back() { pause(); step.value = Math.max(0, step.value-1); time.value = duration.value }
function restart() { pause(); step.value = 0; time.value = reduced.value ? duration.value : 0 }
function seek(value) { pause(); time.value = Number(value) }
function preference() {
  reduced.value = media.matches
  if (reduced.value) { pause(); step.value = 6; time.value = duration.value }
}
function key(event) {
  if (event.target instanceof HTMLInputElement) return
  if (event.key === 'ArrowRight' && !(step.value === 6 && time.value >= duration.value)) {
    event.preventDefault(); event.stopPropagation(); next()
  }
  if (event.key === 'ArrowLeft' && step.value > 0) {
    event.preventDefault(); event.stopPropagation(); back()
  }
  if (event.key === 'Home' && (step.value > 0 || time.value > 0)) {
    event.preventDefault(); event.stopPropagation(); restart()
  }
}
onMounted(async () => {
  media = matchMedia('(prefers-reduced-motion: reduce)')
  preference(); media.addEventListener('change', preference)
  await document.fonts.ready
  suffixX.value = 520 + prefix.value.getComputedTextLength() + 7
})
onUnmounted(() => { pause(); media?.removeEventListener('change', preference) })
</script>

<template>
  <section class="railway" tabindex="0" aria-label="How your message shapes the reply"
    :data-step="step" :data-time="time.toFixed(3)" :data-running="running" :data-arrived="arrived"
    :data-message="message" :data-reply="reply" data-settings="fixed" data-rule="highest score"
    @keydown="key">
    <header class="title-row"><h1>How your message shapes the reply</h1></header>
    <div class="message-panel">
      <h2>Your message</h2>
      <p class="user-message">Where should I pour the <strong>{{ scenario.word }}</strong>?</p>
    </div>
    <div class="reply-panel"><h2>Reply so far</h2></div>
    <img class="railway-art" :src="artwork" width="1536" height="864"
      alt="Mergewell on the left and Purrmission on the right observe the same railway model." />
    <svg class="railway-motion" viewBox="0 0 960 540" role="img" :aria-label="`${message} Assistant reply: ${reply}`">
      <defs>
        <clipPath id="railway-housing">
          <path d="M592 506 L648 466 Q652 464 660 464 L821 464 Q826 464 826 471 L826 596 L791 636 L596 636 L595 515 L592 514 Z" />
        </clipPath>
        <clipPath id="railway-entry"><path d="M290 520 H821 V622 H290 Z" /></clipPath>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#687748" />
        </marker>
      </defs>
      <text ref="prefix" class="reply-prefix sentence" x="520" y="126">Pour it into a</text>
      <text v-if="!flightStage && step !== 6" class="sentence ellipsis" :x="suffixX" y="126">...</text>
      <!-- Full raster and all traced railway mechanics share exactly this transform. -->
      <g transform="translate(0 152) scale(0.3958333333333333)">
        <g v-if="inputStage && time < 7.8" clip-path="url(#railway-entry)">
          <g class="carriage" :transform="`translate(${carriageX} 0)`" :data-piece="words[active]" :data-x="carriageX">
            <g stroke="#463b2e" stroke-width="4" stroke-linejoin="round">
              <path d="M-139 584 H-121 M121 584 H139" fill="none" stroke-width="7" />
              <rect x="-124" y="528" width="248" height="65" rx="7" :fill="active === 5 ? '#e9cb84' : '#c8b28a'" />
              <path d="M-127 531 H127 M-121 584 H121" fill="none" />
              <circle cx="-84" cy="602" r="13" fill="#373a32" /><circle cx="84" cy="602" r="13" fill="#373a32" />
              <circle cx="-84" cy="602" r="4" fill="#b8aa8c" /><circle cx="84" cy="602" r="4" fill="#b8aa8c" />
            </g>
            <text class="carriage-word" x="0" y="575" text-anchor="middle">{{ words[active] }}</text>
          </g>
        </g>
        <image class="housing-foreground" :href="artwork" width="1536" height="864" clip-path="url(#railway-housing)" />
      </g>
      <g class="input-connection" v-if="step !== 6">
        <path d="M300 142 V177 H350 V212 M550 142 V177 H350 M350 244 V252 H218 V320 H237"
          fill="none" stroke="#687748" stroke-width="2" marker-end="url(#arrow)" />
        <rect x="230" y="213" width="240" height="31" rx="5" fill="#fff9ef" />
        <text x="242" y="236">Whole message + reply</text>
        <text class="settings" x="225" y="285">Same learned settings</text>
      </g>
      <text class="model-label" x="248" y="326">Model</text>
      <g v-if="scoreStage || flightStage" class="processing">
        <path d="M330 349 H390 V300 H470 V199 H603" fill="none" stroke="#687748" stroke-width="2" marker-end="url(#arrow)" />
        <rect x="378" y="294" width="89" height="32" rx="6" fill="#fff9ef" />
        <text class="processing-numbers" x="387" y="318">{{ scenario.word === 'coffee' ? '8, 2, 6' : '3, 9, 4' }}</text>
        <circle v-if="scoreStage" r="5" fill="#795395" :cx="470 + 126*smooth(time/2.2)" cy="199" />
      </g>
      <!-- The one selected text actor becomes the reply suffix; never a second appended copy. -->
      <g v-if="flightStage || step === 6" class="output-token" :data-x="actorX" :data-y="actorY"
        :transform="`translate(${actorX} ${actorY})`">
        <rect x="-5" y="-26" width="76" height="35" rx="5" fill="#e9cb84" :style="{ opacity: 1-flight }" />
        <text class="sentence selected-word" x="0" y="0">{{ scenario.result }}<tspan v-if="arrived">.</tspan></text>
      </g>
      <g v-if="step === 6" class="memory">
        <text x="224" y="224">coffee → mug</text>
        <text x="224" y="263">concrete → mold</text>
        <text class="settings" x="225" y="302">Same learned settings</text>
      </g>
    </svg>
    <aside class="score-panel" :class="{ 'flight-panel': flightStage }">
      <h2>{{ flightStage ? 'Add a word' : stages[step].title }}</h2>
      <template v-if="step !== 6">
        <p class="example-caption">Example numbers</p>
        <div v-for="(name,i) in names" :key="name" class="candidate" :data-word="name"
          :data-probability="scenario.scores[i]" :data-score="scores[i].toFixed(2)">
          <span class="candidate-name" :style="{ visibility: flightStage && scenario.result === name ? 'hidden' : 'visible' }">{{ name }}</span>
          <span class="bar-track"><span class="bar" :style="{ width: `${scores[i]}%`, background: scores[i] === Math.max(...scores) ? '#687748' : '#a99d85' }" /></span>
          <span class="percentage">{{ (inputStage && step === 0) ? '—' : `${displayedScores[i]}%` }}</span>
        </div>
        <p class="rule">Choose the highest score<br />in both examples.</p>
        <p class="case-hint">{{ inputStage ? (step === 0 ? 'Choosing the next word in a reply.' : 'Same reply start. New message.') : 'Message + reply → new scores' }}</p>
      </template>
      <template v-else>
        <p class="takeaway">Same model.<br />Different message.<br />Different prediction.</p>
        <p class="final-explanation">Changed input.<br />Changed calculation.<br />Changed highest score.</p>
      </template>
    </aside>
    <div class="railway-controls">
      <button @click.stop="back" :disabled="step === 0">Back</button>
      <button @click.stop="play" :disabled="reduced">{{ running ? 'Pause' : 'Play' }}</button>
      <button @click.stop="next" :disabled="step === 6 && time === duration">Next</button>
      <button @click.stop="restart">Restart</button>
      <label>Time <input type="range" min="0" :max="duration" step=".1" :value="time" :disabled="reduced"
        aria-label="Step time in seconds" @input="seek($event.target.value)" /></label>
      <output>{{ time.toFixed(1) }}/{{ duration }}s</output>
      <span class="status">{{ step+1 }}/7 · {{ running ? 'Playing' : time === duration ? 'Hold' : 'Ready / paused' }}</span>
    </div>
  </section>
</template>

<style scoped>
.railway { position: absolute; inset: 0; width: 960px; height: 540px; overflow: hidden; background: #fff5e6; color: #302c25; font-family: "Segoe UI", sans-serif; }
.title-row { position: absolute; left: 0; top: 0; width: 960px; height: 61px; border-bottom: 1px solid #c8bba6; }
.railway h1 { margin: 10px 24px; color: #302c25; font-size: 36px; font-weight: 700; line-height: 43px; }
.railway h2 { margin: 0; font-size: 22px; line-height: 29px; font-weight: 600; color: #4b563b; }
.message-panel, .reply-panel { position: absolute; top: 70px; height: 67px; }
.message-panel { left: 24px; width: 480px; }
.reply-panel { left: 520px; width: 416px; }
.user-message { font-size: 23px; line-height: 31px; margin: 3px 0 0; white-space: nowrap; }
.user-message strong { background: #f0d895; font-weight: 600; }
.railway-art { position: absolute; left: 0; top: 152px; width: 608px; height: 342px; max-width: none; object-fit: contain; }
.railway-motion { position: absolute; inset: 0; width: 960px; height: 540px; pointer-events: none; overflow: hidden; }
.railway text { font-family: "Segoe UI", sans-serif; font-size: 20px; fill: #302c25; }
.railway .sentence { font-size: 25px; font-weight: 600; }
.railway .carriage-word { font-size: 52px; font-weight: 600; }
.railway .model-label { font-size: 22px; font-weight: 700; }
.railway .memory text { font-size: 25px; }
.railway .memory .settings { font-size: 20px; }
.score-panel { position: absolute; left: 614px; top: 164px; width: 322px; }
.example-caption { font-size: 20px; line-height: 28px; margin: 12px 0 14px; }
.flight-panel h2 { text-align: right; }
.example-caption { text-align: right; }
.candidate { display: flex; gap: 8px; align-items: center; height: 44px; font-size: 20px; line-height: 28px; }
.candidate-name { width: 118px; flex-shrink: 0; white-space: nowrap; }
.bar-track { width: 122px; height: 24px; background: #e8ddc8; border-radius: 4px; overflow: hidden; }
.bar { display: block; height: 100%; }
.percentage { width: 54px; text-align: right; font-variant-numeric: tabular-nums; }
.rule, .case-hint { font-size: 20px; line-height: 27px; margin: 16px 0 0; }
.case-hint { margin-top: 12px; }
.takeaway { font-size: 28px; font-weight: 600; line-height: 39px; margin: 22px 0; }
.final-explanation { font-size: 22px; line-height: 32px; }
.railway-controls { position: absolute; left: 24px; top: 501px; display: flex; align-items: center; gap: 10px; font-size: 20px; line-height: 28px; }
.railway button { font-family: inherit; font-size: 20px; line-height: 28px; color: #302c25; background: #fff9ef; border: 1px solid #776c61; padding: 1px 10px; border-radius: 4px; cursor: pointer; }
.railway button:focus-visible, .railway input:focus-visible { outline: 3px solid #654096; outline-offset: 2px; }
.railway button:disabled { cursor: default; color: #655e55; }
.railway label { display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.railway input { width: 92px; accent-color: #526042; }
.railway output { min-width: 88px; font-variant-numeric: tabular-nums; }
.status { margin-left: 8px; }
</style>
