export interface BriefEditorConfig {
  title: string;
  description: string;
  workshopTitle: string;
  workshopRoute: string;
}

interface BriefField {
  id: string;
  label: string;
  rows?: number;
  hint?: string;
  choiceGroups?: BriefChoiceGroup[];
  selectOptions?: BriefSelectOption[];
}

interface BriefChoiceGroup {
  title: string;
  choices: Array<{ id: string; label: string }>;
}

interface BriefSelectOption {
  value: string;
  label: string;
}

interface BriefSection {
  id: string;
  title: string;
  responsibility: string;
  fields: BriefField[];
}

export interface BriefRecapState {
  values: Readonly<Record<string, string>>;
  selectedDrivers: Array<{ title: string; choices: string[] }>;
}

const planChecklist = [
  { id: "choose-work", label: "Choose work agents should do" },
  { id: "context", label: "Prepare verified context and authorize discovery" },
  { id: "alignment", label: "Align tasks to outcomes, rules, and data" },
  { id: "transition", label: "Choose a safe transition approach" },
  { id: "technology", label: "Make technology trade-offs explicit" },
  { id: "task-contracts", label: "Define bounded agent work packages" },
  { id: "permissions", label: "Set autonomy, permissions, and boundaries" },
  { id: "guardrails", label: "Plan safety, security, privacy, and supply-chain guardrails" },
  { id: "evidence", label: "Define acceptance and independent evidence" },
  { id: "challenge", label: "Bound challenge, handoffs, and escalation" },
  { id: "operations", label: "Plan integration, release, recovery, and operations" },
  { id: "people", label: "Prepare people and decide readiness" }
];

const checklistStatusOptions: BriefSelectOption[] = [
  { value: "", label: "Choose status" },
  { value: "evidence", label: "Evidence identified" },
  { value: "follow-up", label: "Needs follow-up" },
  { value: "not-applicable", label: "Not applicable (record why)" }
];

const sections: BriefSection[] = [
  {
    id: "goal",
    title: "1. Goal",
    responsibility: "Chief Morgan Charter asks why modernization is being considered and what evidence supports the investment. The real sponsor decides whether to fund learning, delivery, defer, or stop.",
    fields: [
      {
        id: "goal-statement",
        label: "Goal decision statement",
        rows: 4,
        hint: "We are modernizing primarily because [top drivers]. We need to improve [outcome] while preserving [critical behavior]. We will know we succeeded when [observable result]. Considering [whole-life cost, risks, and alternatives], [decision owner] authorizes [next step]."
      },
      {
        id: "goal-service-context",
        label: "People, workflow, and service context",
        rows: 4,
        hint: "Describe the user need, affected workflow, outcome, dependencies, and decision owners. Do not include an organization, customer, application, or workload name."
      },
      {
        id: "goal-drivers",
        label: "Common modernization drivers - select all that apply",
        hint: "This non-exhaustive list is a prompt, not a score, proof of value, or commitment to a specific solution.",
        choiceGroups: [
          {
            title: "Reduce risk and keep the business running",
            choices: [
              { id: "end-of-support", label: "Technology is reaching end of support" },
              { id: "security-compliance", label: "Security or compliance needs have changed" },
              { id: "service-failures", label: "Failures disrupt the business, or recovery is difficult" },
              { id: "critical-knowledge", label: "Critical knowledge is becoming harder to retain or find" }
            ]
          },
          {
            title: "Make the application easier and less expensive to run",
            choices: [
              { id: "operating-cost", label: "Operating, licensing, support, or manual costs are too high" },
              { id: "performance-capacity", label: "Performance or capacity limits growth or service needs" },
              { id: "change-friction", label: "Changes take too long or cause too many defects" },
              { id: "operational-difficulty", label: "The application is difficult to diagnose, deploy safely, or operate" }
            ]
          },
          {
            title: "Support what the business needs next",
            choices: [
              { id: "user-experience", label: "Users need a better experience or rely on workarounds" },
              { id: "business-capability", label: "New business capabilities are difficult to deliver" },
              { id: "integration-data", label: "Integrations or data access hold teams back" },
              { id: "enterprise-change", label: "The enterprise landscape is changing (merger, consolidation, data-center exit, or platform strategy)" }
            ]
          }
        ]
      },
      {
        id: "goal-other",
        label: "Other modernization reason",
        hint: "Optional. Add a reason not covered by the checklist."
      },
      {
        id: "goal-evidence",
        label: "Top three drivers: today, consequence, and success",
        rows: 4,
        hint: "For each prioritized driver, record what is true today and its evidence, what may happen if nothing changes, and an observable improvement that would count as success."
      },
      {
        id: "goal-cost",
        label: "Whole-life costs and consequences",
        rows: 4,
        hint: "Include discovery, delivery, migration, coexistence, infrastructure, licenses, support, training, workflow/ownership changes, and retirement. Use ranges, assumptions, and estimate validators."
      },
      {
        id: "goal-risks",
        label: "Risks of changing and doing nothing",
        rows: 4,
        hint: "For each material risk, record impact, evidence, mitigation, owner, and residual uncertainty. Include what could reverse the investment decision."
      },
      {
        id: "goal-options",
        label: "Alternatives and next investment decision",
        rows: 4,
        hint: "Compare retain/improve, replatform, refactor, rearchitect, replace, retire, and bounded discovery where relevant. Record rationale, decision owner, and conditions; no option is preselected."
      }
    ]
  },
  {
    id: "plan",
    title: "2. Plan",
    responsibility: "People decide what work agents may do and prepare the context, alignment, permissions, safety, and evidence first. Agent Mergewell owns the human engineering plan; Riley Relay works only within verified boundaries; Purrmission signals, but does not enforce, those boundaries.",
    fields: [
      {
        id: "plan-statement",
        label: "Plan readiness statement",
        rows: 4,
        hint: "For [slice], agents may do [bounded tasks] using [verified context] under [actual permissions/guardrails]. [acceptance and independent evidence] support readiness; [human owner] resolves [blockers] and retains [human decisions]."
      },
      ...planChecklist.map((item) => ({
        id: `plan-status-${item.id}`,
        label: item.label,
        selectOptions: checklistStatusOptions
      })),
      {
        id: "plan-agent-card",
        label: "Agent work package card",
        rows: 7,
        hint: "For each task, record: outcome/scope/non-goals; authorized inputs/context and dependencies; autonomy and permitted tools/data; expected output and acceptance; verification/reviewer; stop/escalation; human owner; and time/cost/attempt limits. Include work that remains human-only."
      },
      {
        id: "plan-discovery",
        label: "Authorized discovery, service map, and unknowns",
        rows: 4,
        hint: "List authorized sources, relevant workflows/dependencies/owners, evidence, hypotheses, and unknowns. Verify actual access controls; separate read-only discovery from edits and implementation."
      },
      {
        id: "plan-behavior-data",
        label: "Observed behavior, business rules, and data",
        rows: 4,
        hint: "Align tasks to the user outcome, verified requirements, invariants, constraints, and non-goals. Separate observed behavior from required behavior; domain owners confirm authoritative records, calculations, exceptions, quality, and reconciliation."
      },
      {
        id: "plan-transition-technology",
        label: "Transition strategy and technology trade-offs",
        rows: 4,
        hint: "Compare the current stack and realistic alternatives on compatibility, support, security, skills, operations, data, whole-life cost, recovery, and exit effort. Record current/transition/target design, evidence, assumptions, and material decisions."
      },
      {
        id: "plan-slice-spec",
        label: "Bounded slice, specification, acceptance, and tasks",
        rows: 4,
        hint: "State the user outcome, in/out of scope, interfaces, failure cases, invariants, acceptance examples, traceable tasks, dependencies, and uncertainty. Use Spec Kit only if useful; generated output needs review and does not enforce permissions."
      },
      {
        id: "plan-controls",
        label: "Safety, security, and applicable obligations",
        rows: 4,
        hint: "Map trust/data boundaries, threat and untrusted-content risks, and actual identity/tool/environment/network/CI/release controls. Ask qualified owners about applicable privacy, residency, retention, audit, licensing, accessibility, secret, and supply-chain concerns. A checklist is not compliance proof."
      },
      {
        id: "plan-verification",
        label: "Independent evidence and bounded challenge",
        rows: 4,
        hint: "Fix criteria before delegation; define relevant tests/oracles, evidence, coverage limits, and proceed/adjust/stop conditions. Bound reviewer access and cycles. Agent agreement is not proof; humans resolve disagreement and accept risk."
      },
      {
        id: "plan-delivery-operations",
        label: "Build, release, data recovery, and operations design",
        rows: 4,
        hint: "Record traceable build/check steps, artifact identity, environments, rollout, human release authority, halt conditions, data compatibility/reconciliation, recovery, service/business signals, runbooks, and operational owners. Agent permission to build does not authorize release; reverting a binary does not undo data."
      },
      {
        id: "plan-people-readiness",
        label: "People, adoption, dependencies, and capacity",
        rows: 4,
        hint: "Identify decision/review/support owners, skills and capacity, funding, user workflow changes, accessibility validation, training, handover, vendors, and competing work when relevant."
      },
      {
        id: "plan-readiness",
        label: "Readiness decision, blockers, and residual risk",
        rows: 4,
        hint: "Record whether tasks are bounded/aligned, context and controls are verified, acceptance/evidence and owners are ready, and what remains uncertain. Name blockers and the human who can authorize the next bounded task. A completed brief is not authorization."
      },
      {
        id: "plan-stop",
        label: "Stop, return-to-plan, and escalation conditions",
        rows: 3,
        hint: "Name observable triggers that make an agent stop, the person who pauses or revokes access, who resolves the question, and the evidence required before resuming."
      }
    ]
  },
  {
    id: "build",
    title: "3. Build",
    responsibility: "Riley Relay handles only bounded tasks and returns evidence. Agent Mergewell reviews the actual changes and owns the decision.",
    fields: [
      {
        id: "build-statement",
        label: "Build statement",
        rows: 3,
        hint: "Implement [traceable tasks] in [increments] within [boundaries]. [reviewer] checks [diff, tests, and provenance]; stop or return to Plan if [condition]."
      },
      { id: "build-change", label: "Authorized change and boundaries" },
      { id: "build-increments", label: "Traceable increments and checks", rows: 3 },
      { id: "build-agent-boundaries", label: "Agent context, permissions, and evidence returned", rows: 3 },
      { id: "build-reviewer", label: "Accountable human reviewer" }
    ]
  },
  {
    id: "evaluate",
    title: "4. Evaluate",
    responsibility: "Agent Mergewell compares results with the agreed baseline and criteria. The accountable owner decides whether evidence supports the next step.",
    fields: [
      {
        id: "evaluate-statement",
        label: "Evaluation statement",
        rows: 3,
        hint: "Compare [observations] with [baseline/criteria] using [independent evidence]. [owner] decides [proceed / adjust / stop] with [residual uncertainty]. Leave unobserved results blank."
      },
      { id: "evaluate-result", label: "Observed result against the baseline" },
      { id: "evaluate-evidence", label: "Independent evidence, coverage limits, and uncertainty", rows: 3 },
      { id: "evaluate-decision", label: "Decision: proceed, adjust, stop, or return to Plan" }
    ]
  },
  {
    id: "deploy",
    title: "5. Deploy",
    responsibility: "The named release owner authorizes the evaluated artifact. Purrmission reminds the team of halt and data-safe recovery conditions; he cannot approve a release.",
    fields: [
      {
        id: "deploy-statement",
        label: "Deployment statement",
        rows: 3,
        hint: "[release owner] authorizes [exact artifact] through [rollout] after [release checks]. On [trigger], [response owner] performs [data-safe recovery]."
      },
      { id: "deploy-artifact", label: "Exact evaluated artifact, configuration, and data changes" },
      { id: "deploy-owner", label: "Accountable release owner" },
      { id: "deploy-rollout", label: "Rollout, exposure, and health observations", rows: 3 },
      { id: "deploy-recovery", label: "Halt trigger, recovery rehearsal, and response owner", rows: 3 }
    ]
  },
  {
    id: "monitor",
    title: "6. Monitor",
    responsibility: "A named operator watches service and business outcomes after release. What the team learns informs the next Goal decision; agent-session updates do not show application health.",
    fields: [
      {
        id: "monitor-statement",
        label: "Monitoring statement",
        rows: 3,
        hint: "[operator] watches [service and business signals] against [thresholds], responds through [runbook], and revisits [investment / next slice / retirement] with [review owner]."
      },
      { id: "monitor-owner", label: "Operational and outcome review owners" },
      { id: "monitor-signals", label: "Service/business outcomes, baseline, and thresholds", rows: 3 },
      { id: "monitor-response", label: "Response if a threshold is crossed", rows: 3 },
      { id: "monitor-next-goal", label: "Review cadence, operating economics, and next investment" },
      { id: "monitor-retirement", label: "Old-path retirement evidence and remaining obligations", rows: 3 }
    ]
  }
];

const closingFields: BriefField[] = [
  {
    id: "evidence-log",
    label: "Evidence log",
    rows: 5,
    hint: "For each item, record: claim | source | verified / hypothesis / unknown | validator | decision affected."
  },
  {
    id: "next-actions",
    label: "Next actions",
    rows: 4,
    hint: "Record each action, owner, due date, and decision it unlocks."
  }
];

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]!);
}

function renderField(field: BriefField): string {
  const hint = field.hint ? `<small id="${field.id}-hint">${escapeHtml(field.hint)}</small>` : "";
  const describedBy = field.hint ? ` aria-describedby="${field.id}-hint"` : "";
  if (field.choiceGroups) {
    const groups = field.choiceGroups.map((group) => `<section class="brief-editor__choice-group">
      <h3>${escapeHtml(group.title)}</h3>
      ${group.choices.map((choice) => {
        const id = `${field.id}-${choice.id}`;
        return `<label class="brief-editor__choice" for="${id}"><input id="${id}" type="checkbox" autocomplete="off"><span>${escapeHtml(choice.label)}</span></label>`;
      }).join("")}
    </section>`).join("");
    return `<div class="brief-editor__field brief-editor__checklist">
      <span class="brief-editor__label" id="${field.id}-label">${escapeHtml(field.label)}</span>
      <div id="${field.id}" class="brief-editor__choice-groups" role="group" aria-labelledby="${field.id}-label"${describedBy}>${groups}</div>
      ${hint}
    </div>`;
  }
  const control = field.selectOptions
    ? `<select id="${field.id}" autocomplete="off"${describedBy}>${field.selectOptions.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("")}</select>`
    : field.rows
      ? `<textarea id="${field.id}" autocomplete="off" rows="${field.rows}"${describedBy}></textarea>`
      : `<input id="${field.id}" type="text" autocomplete="off"${describedBy}>`;
  return `<div class="brief-editor__field"><label for="${field.id}">${escapeHtml(field.label)}</label>${control}${hint}</div>`;
}

function renderRecapField(field: BriefField, values: Readonly<Record<string, string>>): string {
  const value = values[field.id] ?? "";
  if (!value.trim()) return "";
  return `<article class="brief-editor__recap-field">
    <h3>${escapeHtml(field.label)}</h3>
    <p>${escapeHtml(value)}</p>
  </article>`;
}

function renderRecapSection(title: string, content: string): string {
  if (!content.trim()) return "";
  return `<section class="brief-editor__recap-section"><h2>${escapeHtml(title)}</h2>${content}</section>`;
}

function renderRecapFields(fields: BriefField[], values: Readonly<Record<string, string>>): string {
  return fields.map((field) => renderRecapField(field, values)).join("");
}

export function renderBriefRecap(
  config: Pick<BriefEditorConfig, "workshopTitle">,
  state: BriefRecapState
): string {
  const decisions = sections.map((section) => {
    const statement = section.fields.find((field) => field.id === `${section.id}-statement`);
    const value = statement ? state.values[statement.id]?.trim() : "";
    return `<li class="brief-editor__recap-decision">
      <h3>${escapeHtml(section.title.replace(/^\d+\.\s*/, ""))}</h3>
      <p>${escapeHtml(value || "Not captured")}</p>
    </li>`;
  }).join("");

  const driverGroups = state.selectedDrivers.map((group) => `<section class="brief-editor__recap-driver-group">
    <h3>${escapeHtml(group.title)}</h3>
    <ul>${group.choices.map((choice) => `<li>${escapeHtml(choice)}</li>`).join("")}</ul>
  </section>`).join("");
  const goalFields = sections[0]!.fields.filter((field) =>
    field.id !== "goal-statement" && field.id !== "goal-drivers"
  );
  const goalDetails = [
    driverGroups ? `<div class="brief-editor__recap-drivers"><h3>Selected modernization drivers</h3>${driverGroups}</div>` : "",
    renderRecapFields(goalFields, state.values)
  ].join("");

  const planFields = sections[1]!.fields.filter((field) =>
    field.id !== "plan-statement" && !field.selectOptions
  );
  const planStatuses = sections[1]!.fields
    .filter((field) => field.selectOptions && state.values[field.id]?.trim())
    .map((field) => `<li><strong>${escapeHtml(field.label)}:</strong> ${escapeHtml(state.values[field.id]!)}</li>`)
    .join("");
  const planDetails = [
    planStatuses
      ? `<div class="brief-editor__recap-checklist"><h3>Planning checklist</h3><ul>${planStatuses}</ul></div>`
      : "",
    renderRecapFields(planFields, state.values)
  ].join("");

  const lifecycleDetails = sections.slice(2).map((section) => {
    const fields = section.fields.filter((field) => field.id !== `${section.id}-statement`);
    return renderRecapSection(section.title.replace(/^\d+\.\s*/, ""), renderRecapFields(fields, state.values));
  }).join("");

  return `<header class="brief-editor__recap-header">
      <p class="brief-editor__classification">CUSTOMER-CONFIDENTIAL · Share only with the customer-authorized audience</p>
      <p class="eyebrow">${escapeHtml(config.workshopTitle)}</p>
      <h1>Modernization decision recap</h1>
      <p>Discussion recap—not approval of investment, implementation, or release.</p>
    </header>
    ${renderRecapSection("Decisions at a glance", `<ol class="brief-editor__recap-decisions">${decisions}</ol>`)}
    ${renderRecapSection("Why modernize", goalDetails)}
    ${renderRecapSection("Plan for agent-led work", planDetails)}
    ${lifecycleDetails}
    ${renderRecapSection(
      "Evidence and next actions",
      renderRecapFields(closingFields, state.values)
    )}
`;
}

export function renderBriefEditor(config: BriefEditorConfig): string {
  return `<main class="brief-editor">
    <header class="brief-editor__header">
      <a class="back-link" href="${escapeHtml(config.workshopRoute)}">← ${escapeHtml(config.workshopTitle)}</a>
      <p class="eyebrow">Companion artifact · customer-confidential</p>
      <h1>${escapeHtml(config.title)}</h1>
      <p class="brief-editor__lede">${escapeHtml(config.description)}</p>
    </header>
    <article class="brief-editor__print-report" id="brief-editor-print-report" aria-label="Modernization decision recap"></article>
    <section class="brief-editor__privacy" aria-labelledby="brief-privacy-heading">
      <h2 id="brief-privacy-heading">Keep this brief private</h2>
      <p>Answers stay in this open page. This editor does not send or save them. Refresh or close the page and they are gone. Use an approved device; anyone with access to this tab or screen can see the brief.</p>
      <p>When you are ready to keep a copy, use <strong>Print / Save as PDF</strong> and choose the customer's approved destination and sharing channel. Browser extensions, screen exposure, and the print/PDF destination are outside this editor's control.</p>
    </section>
    <p class="brief-editor__classification">CUSTOMER-CONFIDENTIAL · Share only with the customer-authorized audience</p>
    <section class="brief-editor__team" aria-labelledby="brief-team-heading">
      <h2 id="brief-team-heading">The decision team</h2>
      <dl>
        <div><dt>Chief Morgan Charter</dt><dd>Asks what outcome matters and what evidence supports the decision</dd></div>
        <div><dt>Agent Mergewell</dt><dd>Owns engineering scope, review, and human decisions</dd></div>
        <div><dt>Riley Relay</dt><dd>Handles bounded software-agent work and returns evidence</dd></div>
        <div><dt>Purrmission</dt><dd>Reminds the team to check privacy, permission, stop, and rollback boundaries</dd></div>
      </dl>
    </section>
    <nav class="brief-editor__steps" aria-label="Six decisions">
      ${sections.map((section, index) => `<a href="#${section.id}"><span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span> ${escapeHtml(section.title.replace(/^\d+\.\s*/, ""))}</a>`).join("")}
    </nav>
    ${sections.map((section) => `<fieldset id="${section.id}" class="brief-editor__section" aria-describedby="${section.id}-responsibility">
      <legend>${escapeHtml(section.title)}</legend>
      <p class="brief-editor__responsibility" id="${section.id}-responsibility">${escapeHtml(section.responsibility)}</p>
      <div class="brief-editor__fields">${section.fields.map(renderField).join("")}</div>
    </fieldset>`).join("")}
    <section class="brief-editor__section" aria-labelledby="brief-evidence-heading">
      <h2 id="brief-evidence-heading">Evidence and next actions</h2>
      <p>Keep customer statements, verified facts, hypotheses, and unknowns distinct. This draft does not approve a build or release.</p>
      <div class="brief-editor__fields">${closingFields.map(renderField).join("")}</div>
    </section>
    <div class="brief-editor__actions">
      <button id="brief-print" class="button-link" type="button">Print / Save as PDF</button>
      <button id="brief-clear" class="button-secondary" type="button">Clear brief</button>
    </div>
    <p id="brief-editor-status" role="status" aria-live="polite"></p>
    <footer class="brief-editor__footer">This browser editor is a temporary workspace, not a document vault. The customer owns the printed brief and its handling.</footer>
  </main>`;
}

type ResizableTextarea = EventTarget & {
  style: { height: string };
  readonly scrollHeight: number;
  readonly offsetHeight: number;
  readonly clientHeight: number;
};

export function bindBriefTextareaResizing(
  fields: readonly ResizableTextarea[],
  resizeEvents: EventTarget
): () => void {
  const resize = (field: ResizableTextarea) => {
    field.style.height = "auto";
    field.style.height = `${field.scrollHeight + field.offsetHeight - field.clientHeight}px`;
  };
  const resizeAll = () => fields.forEach(resize);
  for (const field of fields) {
    field.addEventListener("input", () => resize(field));
  }
  resizeEvents.addEventListener("resize", resizeAll);
  resizeEvents.addEventListener("afterprint", resizeAll);
  resizeAll();
  return resizeAll;
}

export function attachBriefEditor(
  root: HTMLElement,
  workshopTitle: string,
  actions: { confirmClear?: (message: string) => boolean; print?: () => void } = {}
): void {
  const confirmClear = actions.confirmClear ?? ((message: string) => window.confirm(message));
  const print = actions.print ?? (() => window.print());
  const clearButton = root.querySelector<HTMLButtonElement>("#brief-clear");
  const printButton = root.querySelector<HTMLButtonElement>("#brief-print");
  const status = root.querySelector<HTMLElement>("#brief-editor-status");
  const report = root.querySelector<HTMLElement>("#brief-editor-print-report");
  if (!report) throw new Error("Missing modernization recap print surface");
  const textareas = Array.from(root.querySelectorAll<HTMLTextAreaElement>("textarea"));
  const resizeTextareas = bindBriefTextareaResizing(textareas, window);

  window.addEventListener("beforeprint", () => {
    const values: Record<string, string> = {};
    root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      '.brief-editor__field > input:not([type="checkbox"]), .brief-editor__field > textarea, .brief-editor__field > select'
    ).forEach((field) => {
      values[field.id] = field instanceof HTMLSelectElement
        ? field.value ? field.selectedOptions[0]?.textContent ?? "" : ""
        : field.value;
    });
    const driverField = sections[0]!.fields.find((field) => field.id === "goal-drivers");
    const selectedDrivers = driverField
      ? (driverField.choiceGroups ?? []).map((group) => ({
        title: group.title,
        choices: group.choices.filter((choice) => {
          const checkbox = root.querySelector<HTMLInputElement>(`#${driverField.id}-${choice.id}`);
          if (!checkbox) throw new Error(`Missing modernization driver ${choice.id}`);
          return checkbox.checked;
        }).map((choice) => choice.label)
      })).filter((group) => group.choices.length > 0)
      : [];
    report.innerHTML = renderBriefRecap({ workshopTitle }, { values, selectedDrivers });
  });
  window.addEventListener("afterprint", () => { report.replaceChildren(); });
  printButton?.addEventListener("click", print);
  clearButton?.addEventListener("click", () => {
    if (!confirmClear("Clear this customer brief from the open page? This cannot be undone.")) return;
    root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((field) => { field.checked = false; });
    root.querySelectorAll<HTMLInputElement>('input:not([type="checkbox"])').forEach((field) => { field.value = ""; });
    textareas.forEach((field) => { field.value = ""; });
    root.querySelectorAll<HTMLSelectElement>("select").forEach((field) => { field.selectedIndex = 0; });
    resizeTextareas();
    if (status) status.textContent = "Brief cleared from this page. No responses were saved.";
    root.querySelector<HTMLTextAreaElement>("#goal-statement")?.focus();
  });
}
