export const DURATION = 4000;
export const BEATS = [
  { headline: "Instructions", lines: ["Instructions"], example: [], category: "Ready" },
  { headline: "Instructions", lines: ["Instructions"], example: ["Always add tests", "before changing", "shared code"], category: "Instructions" },
  { headline: "User prompts", lines: ["User prompts"], example: ["Why is the production", "count off by twelve units?"], category: "User prompts" },
  { headline: "User prompts", lines: ["User prompts"], example: ["Show me where that", "count is calculated."], category: "User prompts" },
  { headline: "User prompts", lines: ["User prompts"], example: ["Now fix reporting without", "changing the API."], category: "User prompts" },
  { headline: "References & files", lines: ["References &", "files"], example: ["The production-reporting", "module and its unit tests"], category: "References & files" },
  { headline: "Tool definitions & results", lines: ["Tool definitions", "& results"], example: ["Test run: three failures", "in production reporting tests"], category: "Tool definitions & results" },
  { headline: "Prior model output", lines: ["Prior model", "output"], example: ["Earlier answer: a patch", "for reporting you did not apply"], category: "Prior model output · already input" },
  { headline: "Reserved output headroom", lines: ["Reserved output", "headroom"], example: ["The model still needs", "room to answer."], category: "Reserved output headroom" },
  { headline: "Compact", lines: ["Compact"], example: ["Summary of earlier", "user prompts"], category: "Compact · retained summary" },
];

export const ramp = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
export const smooth = x => x * x * (3 - 2 * x);
const lerp = (a, b, t) => a + (b - a) * t;

export function motionFor(step, elapsed, running) {
  const t = running ? elapsed : DURATION;
  const travel = smooth(ramp(t, 1050, 2350));
  const dissolve = ramp(t, 2350, 3050);
  const long = BEATS[step].lines.length > 1;
  const startY = long ? -30 : -12;
  const endY = step === 8 ? 216 : (long ? 266 : 290);
  const endScale = step === 8 ? .54 : .72;
  return {
    headlineVisible: step === 0 || (running && step !== 3 && step !== 4 && t < 3050),
    headlineOpacity: step === 0 ? 1 : 1 - dissolve,
    x: 684,
    y: step === 0 ? startY : lerp(startY, endY, travel) + dissolve * 14,
    scale: step === 0 ? 1 : lerp(1, endScale, travel),
    blur: step === 0 ? 0 : dissolve * 3,
    oldExampleOpacity: running ? 1 - ramp(t, 0, 600) : 0,
    newExampleOpacity: step === 0 ? 0 : (running ? ramp(t, 3100, 3550) : 1),
    deposit: running ? smooth(ramp(t, 2800, 3550)) : 1,
    compact: step === 9 ? (running ? smooth(ramp(t, 2800, 3950)) : 1) : 0,
    headroom: step >= 8 ? (step === 8 && running ? smooth(ramp(t, 2350, 3550)) : 1) : 0,
  };
}

function promptOpacity(index, count) {
  if (count <= 1) return 1;
  if (index === count - 1) return 1;
  if (index === count - 2) return .86;
  return .78;
}

export function promptStackFor(step, previous, elapsed, running) {
  const appendCount = step >= 2 && step <= 4
    ? step - 1
    : (step === 5 && running && previous >= 2 && previous <= 4 ? previous - 1 : 0);
  const showStack = (step >= 2 && step <= 5) || step === 9;
  const isStep2 = step === 2;
  const isFadeOut = step === 5;
  const stackOpacity = isStep2
    ? (running ? smooth(ramp(elapsed, 3100, 3550)) : 1)
    : (isFadeOut ? (running ? 1 - ramp(elapsed, 0, 720) : 0) : 1);
  const cards = appendCount
    ? BEATS.slice(2, 2 + appendCount).map((beat, index) => ({
      ...beat,
      id: `user-prompt-${index + 1}`,
      opacity: isStep2
        ? (running ? smooth(ramp(elapsed, 3100, 3550)) : 1)
        : (index === appendCount - 1 ? (running && step !== 5 ? smooth(ramp(elapsed, 3100, 3550)) : 1) : promptOpacity(index, appendCount)),
    }))
    : [];
  const summary = step === 9 ? {
    id: "prompt-summary",
    example: BEATS[9].example,
    opacity: running ? smooth(ramp(elapsed, 3100, 3550)) : 1,
  } : null;
  return { opacity: showStack ? stackOpacity : 0, cards, summary };
}

const payloads = [
  { id: "instructions", at: 1, top: 500, bottom: 630, color: "#9abdc1" },
  { id: "user-prompts-1", at: 2, top: 460, bottom: 500, color: "#a4b994" },
  { id: "user-prompts-2", at: 3, top: 418, bottom: 460, color: "#afbf9d" },
  { id: "user-prompts-3", at: 4, top: 376, bottom: 418, color: "#bbcaad" },
  { id: "references", at: 5, top: 330, bottom: 372, color: "#b8a8c9" },
  { id: "tools", at: 6, top: 304, bottom: 330, color: "#d7bd83" },
  { id: "prior-output", at: 7, top: 286, bottom: 304, color: "#a9b6c2" },
];

export function layersFor(step, deposit = 1, compact = 0) {
  const layers = payloads.filter(p => p.at <= step).map(p => {
    let top = p.top, bottom = p.bottom, opacity = p.at === step ? deposit : 1;
    if (step === 9) {
      if (p.id.startsWith("user-prompts")) {
        const scale = lerp(1, (500 - 446) / (500 - 376), compact);
        top = 500 + (p.top - 500) * scale;
        bottom = 500 + (p.bottom - 500) * scale;
      } else if (p.id === "references") {
        top = lerp(p.top, 404, compact);
        bottom = lerp(p.bottom, 446, compact);
      } else if (p.id === "tools" || p.id === "prior-output") opacity = 1 - compact;
    } else if (p.at === step) {
      top = lerp(bottom, top, deposit);
    }
    return { ...p, top, bottom, opacity };
  }).filter(p => p.opacity > .001 && p.bottom - p.top > .01);
  if (step === 9 && compact >= .999) {
    return [
      ...layers.filter(p => !p.id.startsWith("user-prompts")),
      { id: "prompt-summary", at: 9, top: 446, bottom: 500, color: "#a4b994", opacity: 1 },
    ];
  }
  return layers;
}

export function stratumPath(top, bottom) {
  const wave = Math.min(5, (bottom - top) / 5);
  return `M440 ${top} Q483 ${top-wave} 526 ${top} T612 ${top} T698 ${top} T784 ${top} T870 ${top} Q914 ${top-wave} 954 ${top} L954 ${bottom} Q910 ${bottom-wave} 868 ${bottom} T782 ${bottom} T696 ${bottom} T610 ${bottom} T524 ${bottom} L440 ${bottom} Z`;
}
