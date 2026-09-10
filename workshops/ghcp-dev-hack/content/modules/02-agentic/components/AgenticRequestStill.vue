<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { onSlideEnter } from "@slidev/client";

const props = defineProps<{ scene: "T6" | "N4" | "T7" | "E3" | "T8" }>();
const view = ref("");
const controls = ref<HTMLElement>();
onSlideEnter(() => { view.value = ""; });
const references: Record<string, { label: string; lines: string[] }[]> = {
  T6: [],
  N4: [
    { label: "CLI", lines: [
      "CLI instruction edits are not immediately available in active sessions.",
      "Preserve task state first.",
      "Exit/resume: copilot --continue",
      "Or start a new session: /new",
      "Inspect discovery: /instructions",
      "Inspect loaded environment: /env",
      "This is not /skills reload or proof of cache deletion."
    ] },
    { label: "VS Code", lines: [
      "Check host/version, settings and file location.",
      "Use explicit matching applyTo.",
      "Check response References and customization Diagnostics.",
      "Nested AGENTS.md discovery is experimental and setting-dependent.",
      "VS Code /instructions opens configuration; it is not CLI semantics.",
      "Save-to-active-turn timing remains unverified."
    ] }
  ],
  T7: [{ label: "Skill checks", lines: [
    "/skills reload",
    "/skills info NAME",
    "Availability/location check—not instruction-session refresh",
    "An old body may remain in history.",
    "Edited-skill activation needs a host/build check.",
    "Clue Wrangler is our reviewed-procedure metaphor, not a built-in feature."
  ] }],
  E3: [
    { label: "Instructions", lines: [
      "Saved output heading becomes Supplies to confirm",
      "Changes supplied guidance only when applicable, enabled and loaded."
    ] },
    { label: "Skill", lines: [
      "A reviewed supplies-check procedure is added",
      "Discovery metadata can change; selected body/resources load when used,",
      "not merely because the folder exists."
    ] },
    { label: "Tool / MCP connection", lines: [
      "An approved calendar-read capability becomes available",
      "Included tool definitions or results may change;",
      "a skill does not establish the MCP connection.",
      "Definitions and call permissions are not identical."
    ] },
    { label: "Custom-agent profile", lines: [
      "Select an event-review role with explicit read-only tools",
      "Loaded role instructions, tools and optional model may differ.",
      "A role label is not expertise or authority."
    ] },
    { label: "Model/settings", lines: [
      "Change reasoning effort while retaining the same event brief",
      "May affect usage or rendered request; not evidence of different",
      "weights/hardware or a complete cache miss."
    ] }
  ],
  T8: [
    { label: "Controls", lines: [
      "Auto where supported; no cheapest-result promise",
      "Auto discount depends on the documented paid plan and supported surface",
      "Regular context/reasoning first where appropriate",
      "Larger capacity does not prove it was filled",
      "Fresh for unrelated work; supported compaction for continuing work",
      "Check retained requirements after compaction",
      "Check result quality + available usage"
    ] },
    { label: "CLI limit", lines: [
      "CLI public preview: /limits set max-ai-credits NUMBER",
      "Soft session ceiling; in-progress response can exceed it",
      "It is not a hard cash cap or monthly budget",
      "Auto discount depends on the documented paid plan and supported surface",
      "Auto where supported; no cheapest-result promise"
    ] }
  ]
};
const choices = computed(() => references[props.scene]);
const detail = computed(() => choices.value.find(item => item.label === view.value));
const caveats: Record<string, string[]> = {
  T6: ["Support, discovery and combination vary by host.", "Neither Markdown convention makes the other obsolete."],
  N4: ["Included does not guarantee followed.", "Observed behavior alone does not prove which file was included."],
  T7: ["Discovery is not invocation. Metadata is not zero context.", "Review provenance, dependencies, scripts and data access before use."],
  E3: ["Where does the supplied request first differ? Reuse remains conditional.", "Saving a skill does not prove its full procedure was sent."],
  T8: ["Correct unsafe requirements/access regardless of reuse."]
};
async function select(label: string) {
  view.value = label;
  await nextTick();
  controls.value?.querySelector<HTMLButtonElement>("button")?.focus();
}
</script>

<template>
  <div class="request-still" :data-scene="scene" :data-view="view || 'main'">
    <section v-if="detail" class="request-details" :id="`request-body-${scene}`" aria-label="Supplementary details">
      <div class="request-line request-heading" data-check>Details — {{ detail.label }}</div>
      <div v-for="line in detail.lines" :key="line" class="request-line" data-check>{{ line }}</div>
    </section>
    <div v-else :id="`request-body-${scene}`" class="request-main">
      <template v-if="scene === 'T6'">
        <section class="request-region request-scope" aria-label="Standing guidance by scope">
          <div data-check>Repository-wide: .github/copilot-instructions.md</div>
          <div data-check>Path-specific: .github/instructions/**/*.instructions.md</div>
          <div data-check>Explicit matching applyTo</div>
          <div data-check>AGENTS.md: where supported by this host</div>
          <div data-check>Recurring role instructions: separate role scope</div>
          <div data-check>Standing convention: Label unconfirmed supplies clearly</div>
          <div data-check>applyTo: "events/**/*.md"</div>
          <div data-check>Event Markdown checklists use agreed headings</div>
        </section>
        <section class="request-region request-task" aria-label="Current task, not standing guidance">
          <div class="request-heading" data-check>Current task</div>
          <div data-check>Outdoor community event · rain · 100 guests</div>
          <div data-check>What supplies should we bring?</div>
        </section>
      </template>
      <template v-if="scene === 'N4'">
        <section class="request-region request-observation" aria-label="Saved and observed mismatch">
          <div data-check>Saved convention: <strong>Supplies to confirm</strong></div>
          <div data-check>Observed response heading: <strong>Checklist</strong></div>
        </section>
        <section class="request-region request-checkpoints" aria-label="Four diagnostic checks, not automatic transitions">
          <div data-check>1 Saved</div>
          <div data-check>2 Discovered / applicable / enabled</div>
          <div data-check>3 Included in this request/session</div>
          <div data-check>4 Followed in the result</div>
        </section>
        <section class="request-region request-cli" aria-label="CLI checks">
          <div data-check>CLI: /instructions · /env</div>
          <div data-check>Instruction refresh differs from skill reload.</div>
        </section>
        <section class="request-region request-vscode" aria-label="VS Code checks">
          <div data-check>VS Code: settings · applyTo · References · Diagnostics</div>
          <div data-check>Save-to-active-turn timing remains unverified.</div>
        </section>
        <div class="request-region request-reviewer" data-check>Riley returns evidence. Mergewell checks it.</div>
      </template>
      <template v-if="scene === 'T7'">
        <div class="request-region request-observation request-heading" data-check>Reviewed supplies-check procedure</div>
        <section class="request-region request-stages" aria-label="Conditional loading, not confirmed request contents">
          <div><span data-check>Discover: metadata/description</span><span class="request-connector" data-check>↓ when selected</span></div>
          <div><span data-check>Use: selected SKILL.md body</span><span class="request-connector" data-check>↓ as needed</span></div>
          <div><span data-check>Access: needed resources</span></div>
        </section>
        <div class="request-region request-procedure" data-check>Identify requirements → compare draft list → flag unknown quantities</div>
        <section class="request-region request-roles" aria-label="Three different jobs">
          <div data-check>Riley: software collaborator follows the procedure</div>
          <div data-check>Skill: reusable procedure</div>
          <div data-check>Tool: performs an action</div>
        </section>
      </template>
      <template v-if="scene === 'E3'">
        <div class="request-region request-observation" data-check>Same event brief. Each row is a separate change.</div>
        <table class="request-mechanisms" aria-label="Five independent changes to the next request">
          <thead><tr><th scope="col" data-check>Mechanism</th><th scope="col" data-check>What may change in the next request</th></tr></thead>
          <tbody>
            <tr><th scope="row" data-check>Instructions</th><td data-check>Guidance, only if applicable, enabled and loaded</td></tr>
            <tr><th scope="row" data-check>Skill</th><td data-check>Metadata; selected body and needed resources when used</td></tr>
            <tr><th scope="row" data-check>Tool / MCP connection</th><td data-check>Definitions or results. A skill does not connect MCP. Definitions are not call permissions.</td></tr>
            <tr><th scope="row" data-check>Custom-agent profile</th><td data-check>Loaded instructions, tools or model. A role name is not expertise or authority.</td></tr>
            <tr><th scope="row" data-check>Model/settings</th><td data-check>Usage or supplied request. An effort change does not prove new weights, new hardware or a full miss.</td></tr>
          </tbody>
        </table>
      </template>
      <template v-if="scene === 'T8'">
        <section class="request-region request-choice" aria-label="Correct the venue before work">
          <div data-check>Wrong venue in the brief: outdoor</div>
          <div data-check>A: Keep it only to seek reuse</div>
          <div data-check>B: Correct to indoor; keep rain and 100 guests</div>
          <div class="request-heading" data-check>Choose B: correct the requirement, then check the result</div>
        </section>
        <section class="request-region request-guards" aria-label="Visible capacity and Auto limits">
          <div data-check>Larger capacity does not prove</div>
          <div data-check>it was filled</div>
          <div data-check>Auto discount depends on the</div>
          <div data-check>documented paid plan and</div>
          <div data-check>supported surface</div>
          <div data-check>Auto where supported;</div>
          <div data-check>no cheapest-result promise</div>
        </section>
        <section class="request-region request-decisions" aria-label="Human choice and evidence">
          <div data-check>Keep useful guidance stable—not wrong guidance</div>
          <div data-check>Choose needed tools and proportionate settings</div>
          <div data-check>Check result quality + available usage</div>
        </section>
      </template>
    </div>
    <footer class="request-caveats" aria-label="Essential qualifications">
      <div v-for="line in caveats[scene]" :key="line" data-check>{{ line }}</div>
    </footer>
    <nav v-if="choices.length" ref="controls" class="request-controls" aria-label="Optional details">
      <button v-if="detail" type="button" :aria-controls="`request-body-${scene}`" :aria-expanded="true"
        @click.stop="select('')" @keydown.stop @keyup.stop>Back to diagram</button>
      <template v-else>
        <span>Details:</span>
        <button v-for="item in choices" :key="item.label" type="button" :aria-expanded="false"
          :aria-controls="`request-body-${scene}`" @click.stop="select(item.label)" @keydown.stop @keyup.stop>{{ item.label }}</button>
      </template>
    </nav>
  </div>
</template>

<style scoped>
.request-still { position: absolute; inset: 0; color: #1f2328; font: 20px/24px "Mona Sans", "Segoe UI", Arial, sans-serif; }
.request-region { position: absolute; left: 48px; width: 864px; }
.request-heading { font-weight: 700; }
.request-line { min-height: 24px; }
.request-scope { top: 108px; font-size: 18px; line-height: 24px; }
.request-task { top: 324px; }
.request-observation { top: 108px; }
.request-checkpoints { top: 172px; }
.request-cli { top: 284px; width: 420px; }
.request-vscode { top: 284px; left: 492px; width: 420px; }
.request-reviewer { top: 412px; }
.request-stages { top: 152px; }
.request-stages > div { height: 32px; display: grid; grid-template-columns: 1fr 1fr; }
.request-connector { color: #6e40c9; }
.request-procedure { top: 264px; }
.request-roles { top: 328px; }
.request-choice { top: 108px; }
.request-guards { top: 220px; width: 432px; }
.request-guards > div { height: 24px; white-space: nowrap; }
.request-decisions { left: 504px; top: 220px; width: 408px; }
.request-decisions > div { margin-bottom: 24px; }
.request-details { position: absolute; left: 48px; top: 108px; width: 864px; }
.request-details .request-heading { margin-bottom: 16px; }
.request-caveats { position: absolute; left: 48px; top: 450px; width: 864px; font-size: 18px; line-height: 22px; }
.request-caveats > div { height: 22px; white-space: nowrap; }
.request-controls { position: absolute; left: 48px; right: 48px; top: 502px; height: 26px; display: flex; align-items: center; gap: 8px; font-size: 18px; }
.request-controls button { height: 26px; padding: 0 8px; border: 1px solid #57606a; border-radius: 4px; color: #1f2328; background: #fff; font: inherit; line-height: 24px; cursor: pointer; }
.request-controls button:focus-visible { outline: 3px solid #0969da; outline-offset: 2px; }
.request-still table.request-mechanisms { position: absolute; left: 48px; top: 132px; width: 864px; margin: 0; padding: 0; border: 0; border-radius: 0; border-collapse: collapse; border-spacing: 0; font-size: 18px; line-height: 24px; }
.request-mechanisms tr { display: grid; grid-template-columns: 192px 648px; column-gap: 24px; height: 48px; }
.request-mechanisms thead tr { height: 24px; }
.request-mechanisms tbody tr:nth-child(3), .request-mechanisms tbody tr:nth-child(5) { height: 72px; }
.request-still .request-mechanisms th, .request-still .request-mechanisms td { margin: 0; padding: 0; border: 0; border-radius: 0; text-align: left; vertical-align: top; color: #1f2328; background: none; font-size: 18px; line-height: 24px; font-weight: 400; }
.request-still .request-mechanisms thead th { font-weight: 700; }
.request-mechanisms tbody tr:nth-child(odd) { background: #f6f8fa; }
</style>
