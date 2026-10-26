<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useSlideContext, useNav } from '@slidev/client'
import { turns, ledger, costs, rates, usd, frame, duration } from '../sequence.mjs'
import { navigateFromControl } from '../../components/control-navigation.mjs'
import artwork from '../public/cli-controlled-action.png'
const { $nav } = useSlideContext()
const nav = useNav()
const elapsed = ref(0), running = ref(false), reduced = ref(false)
let raf = 0, start = 0, media
const state = computed(() => frame(elapsed.value, reduced.value))
const turn = computed(() => turns[state.value.index])
const sum = computed(() => ledger(state.value.completed))
const text = (value, fraction) => value.slice(0, Math.floor(value.length * fraction))
function stop() { cancelAnimationFrame(raf); running.value = false }
function reset() { stop(); elapsed.value = reduced.value ? duration : 0 }
function tick(now) {
  elapsed.value = Math.min(duration, now - start)
  if (elapsed.value < duration) raf = requestAnimationFrame(tick)
  else running.value = false
}
function play() { reset(); if (reduced.value) return; running.value = true; start = performance.now(); raf = requestAnimationFrame(tick) }
function preference() { reduced.value = media.matches; reset() }
watch(() => $nav.value.currentPage, reset)
onMounted(() => { media = matchMedia('(prefers-reduced-motion: reduce)'); preference(); media.addEventListener('change', preference) })
onBeforeUnmount(() => { stop(); media?.removeEventListener('change', preference) })
</script>

<template>
  <section class="cache-scene" :data-elapsed="Math.floor(state.elapsed)" :data-completed="state.completed" :data-running="running">
    <header><div class="eyebrow">MERGEWELL’S EVIDENCE BENCH · SIMULATED COPILOT CLI</div><h1>Same conversation. Different reuse.</h1></header>
    <button class="transport" @click.stop="play" @keydown="navigateFromControl($event, nav)" :disabled="running">{{ state.elapsed ? 'Replay' : 'Play' }} · 60s</button>
    <div class="cli panel">
      <div class="cli-heading"><strong>{{ state.index + 1 }} / 3 · {{ turn.name }}</strong><span class="model">Simulated selector: {{ turn.model }} ▾</span></div>
      <div class="input-parts"><b>Input composition · {{ turn.input.toLocaleString('en-US') }} tokens</b><br>
        Instructions {{ turn.parts[0] }} · Tool definitions {{ turn.parts[1] }} · Repo context {{ turn.parts[2] }}<br>
        Conversation {{ turn.parts[3] }} · New prompt {{ turn.parts[4] }}
      </div>
      <div class="prompt"><span class="sigil">❯ </span>{{ text(turn.prompt, state.promptFraction) }}<span v-if="running && state.local < 4000">▏</span></div>
      <div class="excerpt-label">SIMULATED RESPONSE EXCERPT · NOT EXECUTED</div>
      <div class="response">{{ text(turn.response, state.responseFraction) || 'Response arrives after the prompt…' }}</div>
      <div class="prefix"><b>{{ state.local < 16000 ? 'Before' : 'After' }}</b> · {{ state.local < 16000 ? turn.before : turn.after }}</div>
    </div>
    <aside class="art"><img :src="artwork" alt="Human Agent Mergewell inspects a proposed action while Purrmission guards execution."><p>Mergewell verifies. The model does not approve.</p></aside>
    <div class="ledger panel">
      <h2>Completed turns <span>Input = cached + uncached</span></h2>
      <table><thead><tr><th>Turn</th><th>Input</th><th>Cached</th><th>Uncached</th><th>Output</th><th>USD</th></tr></thead>
        <tbody><tr v-for="(row, i) in turns" :key="row.name" :class="{ pending: state.completed <= i }">
          <th>{{ row.name }}</th><td>{{ state.completed > i ? row.input : '—' }}</td><td>{{ state.completed > i ? row.cached : '—' }}</td><td>{{ state.completed > i ? row.uncached : '—' }}</td><td>{{ state.completed > i ? row.output : '—' }}</td><td>{{ state.completed > i ? usd(costs(row).cost) : '—' }}</td>
        </tr><tr class="total"><th>Cumulative</th><td>{{ sum.input }}</td><td>{{ sum.cached }}</td><td>{{ sum.uncached }}</td><td>{{ sum.output }}</td><td>{{ usd(sum.cost) }}</td></tr></tbody></table>
    </div>
    <aside class="costs panel"><h2>Cumulative cost · USD</h2><div>Uncached input <b>{{ usd(sum.uncachedCost) }}</b></div><div>Cached input <b>{{ usd(sum.cachedCost) }}</b></div><div>Output <b>{{ usd(sum.outputCost) }}</b></div><div class="grand">Total <b>{{ usd(sum.cost) }}</b></div><p>Rates / 1M: ${{ rates.uncached }} uncached · ${{ rates.cached.toFixed(2) }} cached<br>${{ rates.output }} output · same for both example models</p></aside>
    <footer>Illustrative tokens/rates, not actual Copilot billing or measured CLI telemetry.<br>Rounded token scenario; responses are excerpts. Cache eligibility depends on provider. Cached tokens are already part of input.</footer>
    <div class="progress" :style="{ width: `${state.elapsed / duration * 100}%` }"></div>
  </section>
</template>

<style>
.slidev-layout.cache-slide { padding:0!important; background:#faf7ef!important; color:#24292f!important; }
</style>

<style scoped src="./cache-base.css"></style>
<style scoped>
.cache-scene .cli { position:absolute; left:32px; top:98px; width:574px; height:244px; padding:12px 15px; box-shadow:0 3px 0 #dfd8c8; }
.cli-heading { display:flex; justify-content:space-between; border-bottom:1px solid #d8d1c4; padding-bottom:6px; font-size:16px; }
.model { color:#6e40a6; font-size:14px; font-weight:600; }
.input-parts { font-size:13px; line-height:18px; margin-top:6px; color:#565047; }
.prompt { margin-top:8px; height:23px; font:15px/21px Consolas,monospace; font-weight:bold; }
.sigil { color:#287548; }
.excerpt-label { font-size:10px; letter-spacing:1px; color:#6e40a6; margin-top:5px; font-weight:bold; }
.response { font:15px/19px Consolas,monospace; height:43px; margin-top:3px; }
.prefix { border-top:1px solid #d8d1c4; padding-top:7px; margin-top:4px; font-size:13px; color:#285c42; }
.cache-scene .ledger { position:absolute; left:32px; top:350px; width:574px; height:142px; padding:10px 12px; }
.ledger h2 span { font-size:13px; font-weight:400; float:right; color:#565047; }
.ledger table { width:100%; font-size:13px; border-collapse:collapse; line-height:17px; font-variant-numeric:tabular-nums; margin:0!important; }
.ledger th,.ledger td { text-align:right; padding:1px 3px!important; border:0!important; }
.ledger th:first-child { text-align:left; }
.ledger thead { color:#60554c; font-size:12px; }
.ledger .total { border-top:1px solid #b5b0a7; font-weight:700; color:#285c42; }
.pending { color:#77716a; }
.cache-scene .costs { position:absolute; left:626px; top:302px; width:302px; height:183px; padding:12px 14px; font-size:15px; }
.costs div { margin-top:4px; }
.costs b { float:right; font-variant-numeric:tabular-nums; }
.costs .grand { border-top:1px solid #bbb3a4; padding-top:4px; color:#285c42; font-weight:700; }
.costs p { font-size:12px; line-height:17px; margin:7px 0 0!important; }
</style>
