import catalog from "./catalog.json";
import "./styles.css";

export interface MissionHarness {
  id: string;
  title: string;
  description: string;
  instructions: string[];
}

export interface MissionClue {
  id: string;
  title: string;
  points: number;
  objectiveRef: string;
  scene: string;
  outcome: string;
  actions: string[];
  routes: Array<{
    harness: string;
    instructions: string[];
  }>;
  verify: string;
  evidence: string;
  hints: string[];
  safetyCheckpoint: string;
}

export interface CatalogMission {
  id: string;
  title: string;
  durationMinutes: number;
  route: string;
  objectiveRefs: string[];
  prerequisites: string[];
  startingState: string;
  goal?: string;
  task: string;
  constraints: string[];
  evidence: string[];
  safetyCheckpoints: string[];
  corePath: string[];
  stretchPath: string[];
  debrief: string[];
  validation: string[];
  casePacket?: string[];
  starterFile?: {
    name: string;
    content: string;
  };
  harnesses?: MissionHarness[];
  coreClues?: MissionClue[];
  bonusClues?: MissionClue[];
  completionPoints?: number;
  bonusPointCap?: number;
  carryForward?: {
    artifact: string;
    produces: string[];
    consumes: string[];
    fallback?: string;
  };
  leaderboard?: {
    optional: true;
    aliasOnly: true;
    instructions: string[];
    submission?: {
      moduleOption: string;
      steps: string[];
    };
  };
}

export interface CatalogModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  totalMinutes?: number;
  route: string;
  status: string;
  missions: CatalogMission[];
}

interface AgendaBlock {
  id: string;
  type: string;
  title: string;
  start: string;
  end: string;
  minutes: number;
  module?: string;
  moduleRoute?: string;
}

interface DeliveryDay {
  id: string;
  title: string;
  start: string;
  end: string;
  totalMinutes: number;
  agenda: AgendaBlock[];
}

interface DeliveryVariant {
  id: string;
  title: string;
  description: string;
  route: string;
  totalMinutes: number;
  days: DeliveryDay[];
  modulePhases: Array<{
    module: string;
    title: string;
    contentMinutes: number;
    missionMinutes: number;
  }>;
}

export interface WorkshopLeaderboard {
  optional: true;
  aliasOnly: true;
  eventId: string;
  environment: "test" | "production";
  repository: string;
  submissionUrl: string;
  standingsUrl: string;
}

export interface CatalogWorkshop {
  id: string;
  title: string;
  description: string;
  duration: string;
  format: string;
  level: string;
  tags: string[];
  prerequisites: string[];
  route: string;
  leaderboard?: WorkshopLeaderboard;
  defaultDeliveryVariant?: string;
  deliveryVariants: DeliveryVariant[];
  modules: CatalogModule[];
}

interface NormalizedCatalogMission extends CatalogMission {
  casePacket: string[];
  harnesses: MissionHarness[];
  coreClues: MissionClue[];
  bonusClues: MissionClue[];
  bonusPointCap: number;
}

interface ScoredCatalogMission extends NormalizedCatalogMission {
  goal: string;
}

export interface MissionProgress {
  harness?: string;
  completed: string[];
  evidence: Record<string, string>;
  followUp: string;
}

export interface MissionScore {
  core: number;
  bonus: number;
  total: number;
}

export interface ModuleScoreSummary extends MissionScore {
  moduleId: string;
  moduleTitle: string;
  scoredMissionCount: number;
  completedMissionCount: number;
}

export interface WorkshopScoreSummary {
  modules: ModuleScoreSummary[];
  cumulative: MissionScore;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const STORAGE_KEY_PREFIX = "ghcp-mission-v1";
const workshops = catalog.workshops as CatalogWorkshop[];
const app = typeof document === "undefined" ? null : document.querySelector<HTMLElement>("#app");
const base = import.meta.env.BASE_URL;

bootPortal();

function bootPortal(): void {
  if (!app || typeof window === "undefined") return;

  const route = window.location.pathname
    .slice(new URL(base, window.location.origin).pathname.length)
    .split("/")
    .filter(Boolean);

  if (route.length === 0) {
    renderCatalog();
  } else if (route[0] === "workshops" && route.length === 2) {
    renderWorkshopDetail(route[1] ?? "");
  } else if (route[0] === "workshops" && route[2] === "variants" && route.length === 4) {
    renderVariantDetail(route[1] ?? "", route[3] ?? "");
  } else if (route[0] === "workshops" && route[3] === "missions" && route.length === 5) {
    renderMissionDetail(route[1] ?? "", route[2] ?? "", route[4] ?? "");
  } else {
    renderNotFound();
  }
}

function renderCatalog(): void {
  app!.innerHTML = renderLandingPage(workshops);
}

export function renderLandingPage(catalogWorkshops: CatalogWorkshop[]): string {
  const cards = renderWorkshopCards(catalogWorkshops);
  return `
    ${hero("GitHub Copilot learning experiences", "Choose a workshop", "Hands-on modules for building practical, verifiable GitHub Copilot skills.", "", "hero--landing")}
    <section class="catalog" aria-labelledby="catalog-heading">
      <div class="catalog__heading">
        <h2 id="catalog-heading">Workshop catalog</h2>
        <span>${cards.length} available</span>
      </div>
      <div class="workshop-grid">${cards.join("")}</div>
      ${renderResources()}
      ${renderCharacterTeam(catalogWorkshops)}
    </section>
  `;
}

export function renderWorkshopCards(catalogWorkshops: CatalogWorkshop[]): string[] {
  return prioritizeMissionControl(catalogWorkshops).flatMap((workshop) =>
    workshop.deliveryVariants.length > 0
      ? workshop.deliveryVariants.map((variant) => renderWorkshopCard(
        { ...variant, tags: workshop.tags },
        [`${variant.days.length} day${variant.days.length === 1 ? "" : "s"}`, formatMinutes(variant.totalMinutes), workshop.level]
      ))
      : [renderWorkshopCard(workshop, [workshop.duration, workshop.level])]
  );
}

function prioritizeMissionControl(catalogWorkshops: CatalogWorkshop[]): CatalogWorkshop[] {
  return catalogWorkshops
    .map((workshop, index) => ({ workshop, index }))
    .sort((left, right) => {
      const leftPriority = left.workshop.id === "mission-control" ? 0 : 1;
      const rightPriority = right.workshop.id === "mission-control" ? 0 : 1;
      return leftPriority - rightPriority || left.index - right.index;
    })
    .map(({ workshop }) => workshop);
}

function renderCharacterTeam(catalogWorkshops: CatalogWorkshop[]): string {
  const missionControl = catalogWorkshops.find((workshop) => workshop.id === "mission-control");
  if (!missionControl) return "";

  const team = [
    ["Agent Mergewell", "Accountable human engineer"],
    ["Purrmission", "Boundary signal"],
    ["Chief Charter", "Organizational sponsor"],
    ["Riley Relay", "Bounded agent collaborator"]
  ];
  const image = url("workshops/mission-control/assets/images/copilot-value-lab/mission-control-opening-team-v7.png");

  return `<section class="team-spotlight" aria-labelledby="team-heading">
    <div class="team-spotlight__heading">
      <div>
        <p class="eyebrow">Meet the Mission Control team</p>
        <h2 id="team-heading">Part of the team. One accountable mission.</h2>
        <p>These team members help keep ownership, boundaries and organizational outcomes visible while you work with GitHub Copilot.</p>
      </div>
    </div>
    <img class="team-spotlight__image" src="${image}" width="1248" height="832" alt="Agent Mergewell, Purrmission the black cat, Chief Charter and Riley Relay standing together." />
    <dl class="team-spotlight__cast">
      ${team.map(([name, persona]) => `<div><dt>${name}</dt><dd>${persona}</dd></div>`).join("")}
    </dl>
  </section>`;
}

function renderWorkshopCard(
  entry: Pick<CatalogWorkshop, "title" | "description" | "route" | "tags">,
  details: string[]
): string {
  return `
    <article class="workshop-card">
      ${metadata(details)}
      <h3><a class="title-link" href="${url(entry.route)}">${escapeHtml(entry.title)}</a></h3>
      <p>${escapeHtml(entry.description)}</p>
      <div class="tags">${entry.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="module-list__actions">
        <a class="button-link" href="${url(entry.route)}">View workshop</a>
      </div>
    </article>
  `;
}

export function buildSubmissionUrl(
  baseUrl: string,
  fields: { eventId: string; moduleOption: string; core: number; bonus: number; alias?: string }
): string {
  const params = new URLSearchParams();
  params.set("event-id", fields.eventId);
  if (fields.alias?.trim()) params.set("opt-in-alias", fields.alias.trim());
  params.set("module", fields.moduleOption);
  params.set("core-points", String(fields.core));
  params.set("bonus-points", String(fields.bonus));
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}${params.toString()}`;
}

export function renderMissionSubmission(
  workshop: Pick<CatalogWorkshop, "leaderboard">,
  mission: Pick<CatalogMission, "leaderboard">
): string {
  const leaderboard = workshop.leaderboard;
  const submission = mission.leaderboard?.submission;
  if (!leaderboard || !submission) return "";
  return `
    <section class="detail-section mission-submission">
      <h2>Submit your score to the leaderboard</h2>
      <p>Submitting is optional and alias-only. Choose <strong>${escapeHtml(submission.moduleOption)}</strong> as the module and use event id <code>${escapeHtml(leaderboard.eventId)}</code>.</p>
      <p class="mission-submission__alias"><strong>Pick a made-up alias, not your real name.</strong> Your alias and score are published on the shared workshop board, and the issue you open is visible to everyone who can see the leaderboard repository. Choose something fun and non-identifying such as <code>mergewell-runner</code> or <code>night-shift-42</code>, and avoid your real name, work username, email, employer, or customer names. Use the same alias for all three modules so your scores add up into one standing.</p>
      <div class="mission-alias">
        <label for="mission-alias-input">Your leaderboard alias</label>
        <div class="mission-alias__row">
          <input id="mission-alias-input" type="text" maxlength="24" spellcheck="false" autocomplete="off" placeholder="mergewell-runner" aria-describedby="mission-alias-help">
          <button id="mission-alias-copy" type="button" class="button-secondary">Copy alias</button>
        </div>
        <p id="mission-alias-help">Saved in this browser only and never transmitted. It appears on every mission page in this workshop so you can reuse the same alias when you submit each module.</p>
        <p id="mission-alias-status" role="status"></p>
      </div>
      <ol>${submission.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      <div class="module-list__actions">
        <a id="mission-submit-link" class="button-link" href="${escapeHtml(leaderboard.submissionUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Open the leaderboard submission form (opens in new tab)">Submit your score <span aria-hidden="true">↗</span></a>
        <a class="button-link button-link--secondary" href="${escapeHtml(leaderboard.standingsUrl)}" target="_blank" rel="noopener noreferrer" aria-label="View the current standings (opens in new tab)">View standings <span aria-hidden="true">↗</span></a>
      </div>
      <p class="mission-submission__note">Your evidence, prompts, and repository content stay local. The board publishes only your alias and score.</p>
      <p class="mission-submission__note">The button carries your alias and current totals into the form. Check them, then tick the two acknowledgements yourself before you submit.</p>
    </section>`;
}

function renderWorkshopDetail(workshopId: string): void {
  const workshop = workshops.find((candidate) => candidate.id === workshopId);
  if (!workshop) return renderNotFound();
  app!.innerHTML = renderWorkshopPage(workshop);
}

export function renderWorkshopPage(workshop: CatalogWorkshop): string {
  const visibleModules = workshop.modules.some((module) => module.status === "published")
    ? workshop.modules.filter((module) => module.status === "published")
    : workshop.modules;
  const hasVariants = workshop.deliveryVariants.length > 0;
  return `<div class="workshop-detail">
    ${hero("Workshop", workshop.title, workshop.description, `<a class="back-link" href="${url("")}">← All workshops</a>`)}
    <section class="catalog detail-grid${hasVariants ? "" : " detail-grid--single"}">
      ${hasVariants ? `<div>
        <div class="catalog__heading"><h2>Delivery options</h2><span>${workshop.deliveryVariants.length}</span></div>
        <div class="variant-grid">
          ${workshop.deliveryVariants.map((variant) => `
              <article class="variant-card">
                <p class="eyebrow">${formatMinutes(variant.totalMinutes)}</p>
                <h3><a class="title-link" href="${url(variant.route)}">${escapeHtml(variant.title)}</a></h3>
                <p>${escapeHtml(variant.description)}</p>
                <a class="button-link" href="${url(variant.route)}">View agenda</a>
              </article>`).join("")}
        </div>
      </div>` : ""}
      <div>
        <div class="catalog__heading"><h2>Modules</h2><span>${visibleModules.length}</span></div>
        <ol class="module-list">${visibleModules.map(renderModule).join("")}</ol>
        ${renderLeaderboardPointer(workshop)}
      </div>
    </section>
  </div>`;
}

function renderVariantDetail(workshopId: string, variantId: string): void {
  const workshop = workshops.find((candidate) => candidate.id === workshopId);
  const variant = workshop?.deliveryVariants.find((candidate) => candidate.id === variantId);
  if (!workshop || !variant) return renderNotFound();
  app!.innerHTML = `
    ${hero("Delivery variant", variant.title, variant.description, `<a class="back-link" href="${url(workshop.route)}">← ${escapeHtml(workshop.title)}</a>`)}
    <section class="catalog">
      ${metadata([formatMinutes(variant.totalMinutes), `${variant.days.length} day${variant.days.length === 1 ? "" : "s"}`])}
      <section class="detail-section">
        <h2>Modules and missions</h2>
        <ol class="module-list">${workshop.modules.map(renderModule).join("")}</ol>
      </section>
      <section class="detail-section">
        <h2>Prerequisites</h2>
        ${listItems(workshop.prerequisites)}
      </section>
      <div class="agenda-days">
        ${variant.days.map((day) => `
          <article class="agenda-day">
            <div class="catalog__heading">
              <h2>${escapeHtml(day.title)}</h2>
              <span>${escapeHtml(day.start)}–${escapeHtml(day.end)}</span>
            </div>
            <ol class="agenda-list">
              ${day.agenda.map((block) => `
                <li>
                  <time>${escapeHtml(block.start)}–${escapeHtml(block.end)}</time>
                  <span class="agenda-list__type">${escapeHtml(block.type)}</span>
                  <span><strong>${escapeHtml(block.title)}</strong>${block.moduleRoute ? `<a href="${url(block.moduleRoute)}">${escapeHtml(block.module ?? "")}</a>` : ""}</span>
                  <span>${block.minutes} min</span>
                </li>`).join("")}
            </ol>
          </article>`).join("")}
      </div>
      ${variant.id === "two-day" ? `
        <section class="detail-section readout-contract">
          <p class="eyebrow">Final 90 minutes</p>
          <h2>Team project readout and demo</h2>
          <p>Each team presents the problem statement, project scope, estimated impact in dollars with assumptions, and next-step actions, followed by a short demo. Dollar impact is a team estimate, not a guaranteed financial result. Presentation time per team is set after the final team count is known.</p>
        </section>` : ""}
    </section>
  `;
}

function renderMissionDetail(workshopId: string, moduleId: string, missionId: string): void {
  const workshop = workshops.find((candidate) => candidate.id === workshopId);
  const module = workshop?.modules.find((candidate) => candidate.id === moduleId);
  const mission = module?.missions.find((candidate) => candidate.id === missionId);
  if (!workshop || !module || !mission) return renderNotFound();

  const normalizedMission = normalizeMission(mission);
  if (isScoredMission(normalizedMission)) {
    app!.innerHTML = renderScoredMission(workshop, module, normalizedMission);
    initializeMissionTracker(workshop, module, normalizedMission);
    return;
  }

  app!.innerHTML = `
    ${hero("Mission", normalizedMission.title, `${normalizedMission.durationMinutes} min · ${escapeHtml(module.title)}`, renderMissionBackLink(module))}
    <section class="catalog mission-detail">
      <section class="detail-section">
        <h2>🎯 Task</h2>
        <p>${escapeHtml(normalizedMission.task)}</p>
      </section>
      <section class="detail-section">
        <h2>Starting state</h2>
        <p>${escapeHtml(normalizedMission.startingState)}</p>
      </section>
      ${normalizedMission.prerequisites.length > 0 ? `<section class="detail-section"><h2>Prerequisites</h2>${listItems(normalizedMission.prerequisites)}</section>` : ""}
      <section class="detail-section">
        <h2>Core path</h2>
        <ol>${normalizedMission.corePath.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      </section>
      ${normalizedMission.stretchPath.length > 0 ? `<section class="detail-section"><h2>Stretch path</h2><ol>${normalizedMission.stretchPath.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></section>` : ""}
      <section class="detail-section">
        <h2>Evidence to produce</h2>
        ${listItems(normalizedMission.evidence)}
      </section>
      ${normalizedMission.safetyCheckpoints.length > 0 ? `<section class="detail-section"><h2>🔒 Safety checkpoints</h2>${listItems(normalizedMission.safetyCheckpoints)}</section>` : ""}
      ${normalizedMission.constraints.length > 0 ? `<section class="detail-section"><h2>Constraints</h2>${listItems(normalizedMission.constraints)}</section>` : ""}
      <section class="detail-section">
        <h2>Debrief</h2>
        ${listItems(normalizedMission.debrief)}
      </section>
      <section class="detail-section">
        <h2>Objectives</h2>
        ${listItems(normalizedMission.objectiveRefs)}
      </section>
    </section>
  `;
}

export function renderMissionBackLink(module: Pick<CatalogModule, "route" | "title">): string {
  return `<a class="back-link" href="${url(module.route)}">← Back to ${escapeHtml(module.title)}</a>`;
}

export function renderLeaderboardPointer(workshop: Pick<CatalogWorkshop, "leaderboard">): string {
  const leaderboard = workshop.leaderboard;
  if (!leaderboard) return "";

  return `
    <div class="leaderboard-pointer">
      <a class="button-link button-link--secondary" href="${escapeHtml(leaderboard.standingsUrl)}" target="_blank" rel="noopener noreferrer" aria-label="View the leaderboard standings (opens in new tab)">View leaderboard standings <span aria-hidden="true">↗</span></a>
      <p>The leaderboard is optional and alias-only. Open your module's mission page to submit a score.</p>
    </div>`;
}
function renderScoredMission(workshop: CatalogWorkshop, module: CatalogModule, mission: ScoredCatalogMission): string {
  const nextModuleTitle = getNextModuleTitle(workshop, module.id);
  const harnessTitles = new Map(mission.harnesses.map((harness) => [harness.id, harness.title]));
  const evidencePlaceholder = (evidence: string): string =>
    evidence.includes("___") ? evidence : `${evidence.replace(/\.$/, "")}: ___`;
  const clueCard = (clue: MissionClue, bonus: boolean): string => `
    <article class="mission-clue" data-clue-card="${escapeHtml(clue.id)}">
      <header class="mission-clue__header">
        <label>
          <input type="checkbox" data-mission-clue="${escapeHtml(clue.id)}" data-bonus="${bonus}">
          <span>
            <strong>${escapeHtml(clue.title)}</strong>
            <small>${clue.points} points</small>
          </span>
        </label>
      </header>
      <blockquote>${richText(clue.scene)}</blockquote>
      <p class="mission-outcome"><strong>What you'll make:</strong> ${richText(clue.outcome)}</p>
      <div class="mission-routes" data-clue-routes>
        <p class="mission-routes__empty" data-route-placeholder>Choose where you'll run Copilot above to see the first step for your tool.</p>
        ${clue.routes.map((route) => `
          <section class="mission-route" data-harness-route="${escapeHtml(route.harness)}" hidden>
            <h3>Start here — in ${escapeHtml(harnessTitles.get(route.harness) ?? route.harness)}</h3>
            <ul>${route.instructions.map((instruction) => `<li>${richText(instruction)}</li>`).join("")}</ul>
          </section>`).join("")}
      </div>
      <h3>Then work through these steps</h3>
      <ol>${clue.actions.map((action) => `<li>${richText(action)}</li>`).join("")}</ol>
      <p class="mission-verify"><strong>You're done when:</strong> ${richText(clue.verify)}</p>
      <details class="mission-hints">
        <summary>Need a hint?</summary>
        <ol>${clue.hints.map((hint) => `<li>${richText(hint)}</li>`).join("")}</ol>
        <p>Hints never reduce your score.</p>
      </details>
      <p class="mission-safety"><span class="purrmission-icon" aria-hidden="true">🐈‍⬛</span><strong>Purrmission check:</strong> ${richText(clue.safetyCheckpoint)}</p>
      <p class="mission-ask">Stuck? Select any step above and ask Copilot, or paste it into a fresh session and say which tool you're using.</p>
      <label class="mission-notes">
        <span>What to write down <small>Optional — jot it down to think it through. Stays in this browser.</small></span>
        <textarea rows="3" data-clue-evidence="${escapeHtml(clue.id)}" placeholder="${escapeHtml(evidencePlaceholder(clue.evidence))}"></textarea>
      </label>
    </article>`;

  return `
    ${hero("Mission", mission.title, `${mission.durationMinutes} min · ${escapeHtml(module.title)}`, renderMissionBackLink(module))}
    <main class="catalog mission-detail mission-hunt">
      <section class="detail-section mission-goal">
        <p class="eyebrow">Mission goal</p>
        <h2>${escapeHtml(mission.goal)}</h2>
        <p>Hints are always available and never reduce your score. Asking for help is part of safe, effective engineering.</p>
      </section>

      <section class="detail-section mission-start-here">
        <h2>Start here</h2>
        <ol>
          <li>Choose where you'll run Copilot below. Every exercise then shows the first step for that tool.</li>
          <li>Open a fresh session there, following the setup steps for your tool.</li>
          <li>Work through the exercises in order. Each one tells you what to make, how to start, and how to check it.</li>
          <li>If a step is unclear, ask Copilot. It costs you no points.</li>
        </ol>
        <div class="mission-ask-copilot">
          <h3>Ask Copilot when you're stuck</h3>
          <p>Two things people often miss. You can <strong>select any text on this page and ask Copilot about it</strong>. You can also <strong>paste a step into a fresh session</strong>. Either way, say which tool you're using, paste the step itself, and say what you are trying to make.</p>
          <div class="mission-ask-copilot__prompts">
            <div>
              <p><strong>When you don't understand a step</strong></p>
              <pre><code id="mission-ask-step">I'm using [your tool]. I'm doing the "[exercise title]" step of this workshop mission. Here's the step: [paste the step]. Explain in plain words what I'm being asked to make, and give me one thing to do first in [your tool].</code></pre>
              <button id="mission-copy-ask-step" type="button" class="button-secondary">Copy prompt</button>
            </div>
            <div>
              <p><strong>When you're stuck on the tool, not the task</strong></p>
              <pre><code id="mission-ask-setup">I'm using [your tool]. How do I create and save a file called [file name] here, and how do I see what it does?</code></pre>
              <button id="mission-copy-ask-setup" type="button" class="button-secondary">Copy prompt</button>
            </div>
          </div>
          <p id="mission-ask-status" role="status"></p>
        </div>
      </section>

      <section class="detail-section">
        <fieldset class="mission-harness-picker">
          <legend>Step 1 — choose where you'll run Copilot</legend>
          <div class="mission-harnesses">
            ${mission.harnesses.map((harness) => `
              <label class="mission-harness">
                <input type="radio" name="mission-harness" value="${escapeHtml(harness.id)}">
                <span><strong>${escapeHtml(harness.title)}</strong><small>${escapeHtml(harness.description)}</small></span>
              </label>`).join("")}
          </div>
        </fieldset>
        <div id="mission-harness-help" class="mission-harness-help" role="status" aria-live="polite">Choose a tool to see its setup steps and the first step of every exercise.</div>
        ${mission.harnesses.map((harness) => `
          <section class="mission-harness-setup" data-harness-setup="${escapeHtml(harness.id)}" hidden>
            <h3>Setting up in ${escapeHtml(harness.title)}</h3>
            <ul>${harness.instructions.map((instruction) => `<li>${richText(instruction)}</li>`).join("")}</ul>
          </section>`).join("")}
      </section>

      <section class="detail-section">
        <h2>Prepare your practice task</h2>
        ${mission.casePacket.length > 0 ? listItems(mission.casePacket) : "<p>Prepare the approved practice task for this mission.</p>"}
        ${mission.starterFile ? `
          <section class="mission-starter">
            <div>
              <h3>Starter file: <code>${escapeHtml(mission.starterFile.name)}</code></h3>
              <p>Save this file in your chosen practice location and paste the supplied content.</p>
            </div>
            <button id="mission-copy-starter" type="button">Copy starter content</button>
            <pre><code>${escapeHtml(mission.starterFile.content)}</code></pre>
            <p id="mission-starter-status" role="status"></p>
          </section>` : ""}
      </section>

      <aside class="mission-score" aria-live="polite" aria-describedby="mission-score-status">
        <div><span>${escapeHtml(module.title)} core</span><strong id="mission-module-core-score">0</strong></div>
        <div><span>${escapeHtml(module.title)} bonus</span><strong id="mission-module-bonus-score">0</strong></div>
        <div><span>${escapeHtml(module.title)} total</span><strong id="mission-module-total-score">0</strong></div>
        <div><span>${escapeHtml(workshop.title)} total</span><strong id="mission-workshop-total-score">0</strong></div>
        <p id="mission-score-status">Find ${mission.completionPoints ?? 0} core points to complete the mission.</p>
      </aside>

      <section class="detail-section mission-score-breakdown">
        <div class="catalog__heading">
          <h2>Workshop scorecard</h2>
          <span>Local totals only</span>
        </div>
        <div id="mission-score-breakdown"></div>
        <div class="mission-actions">
          <button id="mission-reset" type="button" class="button-secondary">Reset mission</button>
        </div>
      </section>

      <section class="mission-clues" aria-labelledby="core-clues-heading">
        <div class="catalog__heading">
          <h2 id="core-clues-heading">${mission.coreClues.length}-clue core hunt</h2>
          <span>${mission.completionPoints ?? 0} points to complete</span>
        </div>
        ${mission.coreClues.map((clue) => clueCard(clue, false)).join("")}
      </section>

      ${mission.bonusClues.length > 0 ? `
        <section class="mission-clues" aria-labelledby="bonus-clues-heading">
          <div class="catalog__heading"><h2 id="bonus-clues-heading">Optional bonus operations</h2><span>${mission.bonusPointCap} point cap</span></div>
          <p>Complete as many bonus operations as you want; only the capped bonus total counts toward the workshop score.</p>
          ${mission.bonusClues.map((clue) => clueCard(clue, true)).join("")}
        </section>` : ""}

      ${mission.carryForward ? (nextModuleTitle ? `
        <section class="detail-section">
          <h2>Carry the case forward to ${escapeHtml(nextModuleTitle)}</h2>
          <p>Keep your <strong>${escapeHtml(mission.carryForward.artifact)}</strong> open. ${escapeHtml(nextModuleTitle)} picks it up with:</p>
          <ul>${mission.carryForward.produces.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          <p>Starting the next module fresh is also fine. Each module is scored on its own.</p>
        </section>` : `
        <section class="detail-section">
          <h2>Close the case</h2>
          <p>This is the final module. Your completed <strong>${escapeHtml(mission.carryForward.artifact)}</strong> now holds:</p>
          <ul>${mission.carryForward.produces.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          <p>Nothing carries forward from here. Submit this module's score below to finish your standing.</p>
        </section>`) : ""}

      ${renderMissionSubmission(workshop, mission)}

      <details class="detail-section mission-export">
        <summary>Optional: export your notes</summary>
        <p>This is a local copy of your work for your own reference. It is not your leaderboard entry.</p>
        <label>
          <span>${escapeHtml(nextModuleTitle ? `One bounded follow-up task for ${nextModuleTitle}` : "One bounded follow-up task")}</span>
          <textarea id="mission-follow-up" rows="3"></textarea>
        </label>
        <label>
          <span>Plain-text case file</span>
          <textarea id="mission-case-file" rows="14" readonly spellcheck="false"></textarea>
        </label>
        <div class="mission-actions">
          <button id="mission-copy" type="button">Copy case file</button>
          <button id="mission-print" type="button" class="button-secondary">Print or save</button>
        </div>
        <p id="mission-action-status" role="status">Your progress, totals, and evidence stay in this browser.</p>
      </details>

      ${mission.leaderboard ? `
        <section class="detail-section">
          <h2>Optional alias board</h2>
          <ul>${mission.leaderboard.instructions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>` : ""}
    </main>`;
}

export function emptyMissionProgress(): MissionProgress {
  return { completed: [], evidence: {}, followUp: "" };
}

export function normalizeMission(mission: CatalogMission): NormalizedCatalogMission {
  return {
    ...mission,
    casePacket: mission.casePacket ?? [],
    harnesses: mission.harnesses ?? [],
    coreClues: mission.coreClues ?? [],
    bonusClues: mission.bonusClues ?? [],
    bonusPointCap: mission.bonusPointCap ?? 0
  };
}

export function isScoredMission(mission: NormalizedCatalogMission): mission is ScoredCatalogMission {
  return typeof mission.goal === "string" && mission.goal.length > 0 && mission.coreClues.length > 0;
}

export function getMissionStorageKey(workshopId: string, moduleId: string, missionId: string): string {
  return `${STORAGE_KEY_PREFIX}:${workshopId}:${moduleId}:${missionId}`;
}

export function getAliasStorageKey(workshopId: string): string {
  return `${STORAGE_KEY_PREFIX}:${workshopId}:alias`;
}

export function parseMissionProgress(serialized: string): MissionProgress {
  const parsed: unknown = JSON.parse(serialized);
  if (!parsed || typeof parsed !== "object") throw new Error("Saved mission progress is not an object");
  const record = parsed as Record<string, unknown>;
  if (!Array.isArray(record.completed) || !record.completed.every((item) => typeof item === "string")) {
    throw new Error("Saved mission clues are invalid");
  }
  if (!record.evidence || typeof record.evidence !== "object" || Array.isArray(record.evidence)) {
    throw new Error("Saved mission evidence is invalid");
  }

  return {
    harness: typeof record.harness === "string" ? record.harness : undefined,
    completed: Array.from(new Set(record.completed)),
    evidence: Object.fromEntries(
      Object.entries(record.evidence).filter((entry): entry is [string, string] => typeof entry[1] === "string")
    ),
    followUp: typeof record.followUp === "string" ? record.followUp : ""
  };
}

export function loadMissionProgress(storage: StorageLike, storageKey: string): { progress: MissionProgress; warning?: string } {
  try {
    const stored = storage.getItem(storageKey);
    if (!stored) return { progress: emptyMissionProgress() };
    return { progress: parseMissionProgress(stored) };
  } catch (error) {
    return {
      progress: emptyMissionProgress(),
      warning: `Local progress could not be loaded: ${error instanceof Error ? error.message : "unknown error"}`
    };
  }
}

export function calculateMissionScore(
  mission: Pick<NormalizedCatalogMission, "coreClues" | "bonusClues" | "bonusPointCap">,
  progress: Pick<MissionProgress, "completed">
): MissionScore {
  const selected = new Set(progress.completed);
  const core = mission.coreClues
    .filter((clue) => selected.has(clue.id))
    .reduce((total, clue) => total + clue.points, 0);
  const uncappedBonus = mission.bonusClues
    .filter((clue) => selected.has(clue.id))
    .reduce((total, clue) => total + clue.points, 0);
  const bonus = Math.min(uncappedBonus, mission.bonusPointCap);
  return { core, bonus, total: core + bonus };
}

export function summarizeWorkshopScores(
  workshop: CatalogWorkshop,
  storage: StorageLike,
  currentProgress?: { moduleId: string; missionId: string; progress: MissionProgress }
): WorkshopScoreSummary {
  const modules = workshop.modules
    .map((module) => {
      const scoredMissions = module.missions.map(normalizeMission).filter(isScoredMission);
      if (scoredMissions.length === 0) return null;

      let core = 0;
      let bonus = 0;
      let completedMissionCount = 0;

      for (const mission of scoredMissions) {
        const progress = currentProgress && currentProgress.moduleId === module.id && currentProgress.missionId === mission.id
          ? currentProgress.progress
          : loadMissionProgress(storage, getMissionStorageKey(workshop.id, module.id, mission.id)).progress;
        const score = calculateMissionScore(mission, progress);
        core += score.core;
        bonus += score.bonus;
        if (score.core >= (mission.completionPoints ?? 0)) {
          completedMissionCount += 1;
        }
      }

      return {
        moduleId: module.id,
        moduleTitle: module.title,
        core,
        bonus,
        total: core + bonus,
        scoredMissionCount: scoredMissions.length,
        completedMissionCount
      };
    })
    .filter((entry): entry is ModuleScoreSummary => entry !== null);

  return {
    modules,
    cumulative: modules.reduce<MissionScore>(
      (totals, module) => ({
        core: totals.core + module.core,
        bonus: totals.bonus + module.bonus,
        total: totals.total + module.total
      }),
      { core: 0, bonus: 0, total: 0 }
    )
  };
}

export function buildCaseFileText(
  workshop: CatalogWorkshop,
  module: CatalogModule,
  mission: ScoredCatalogMission,
  progress: MissionProgress,
  summary: WorkshopScoreSummary
): string {
  const selected = new Set(progress.completed);
  const missionScore = calculateMissionScore(mission, progress);
  const completedEvidence = [...mission.coreClues, ...mission.bonusClues]
    .filter((clue) => selected.has(clue.id))
    .map((clue) => `- ${clue.title}: ${progress.evidence[clue.id] || "[add evidence]"}`);
  const nextModuleTitle = getNextModuleTitle(workshop, module.id);

  return [
    "Agent Mergewell case file",
    `Workshop: ${workshop.title}`,
    `Module: ${module.title}`,
    `Mission: ${mission.title}`,
    `Gadget: ${mission.harnesses.find((harness) => harness.id === progress.harness)?.title ?? "not selected"}`,
    "",
    "Mission score",
    `- Core: ${missionScore.core}`,
    `- Bonus: ${missionScore.bonus}`,
    `- Total: ${missionScore.total}`,
    "",
    "Module totals",
    ...summary.modules.map((entry) => `- ${entry.moduleTitle}: core ${entry.core}, bonus ${entry.bonus}, total ${entry.total}`),
    `Workshop cumulative total: core ${summary.cumulative.core}, bonus ${summary.cumulative.bonus}, total ${summary.cumulative.total}`,
    "",
    `Carry-forward artifact: ${mission.carryForward?.artifact ?? "Case file"}`,
    mission.carryForward?.produces.length ? `Carry forward: ${mission.carryForward.produces.join("; ")}` : "",
    mission.carryForward?.consumes.length ? `Consumed inputs: ${mission.carryForward.consumes.join("; ")}` : "",
    "",
    `Completed clues: ${progress.completed.join(", ") || "none"}`,
    "Evidence",
    ...(completedEvidence.length > 0 ? completedEvidence : ["- none yet"]),
    "",
    `${nextModuleTitle ? `Bounded follow-up task for ${nextModuleTitle}` : "Bounded follow-up task"}: ${progress.followUp || "[add bounded task]"}`,
    "Local-only note: progress, evidence, and totals stay in this browser unless you copy or print this text."
  ].filter(Boolean).join("\n");
}

function initializeMissionTracker(workshop: CatalogWorkshop, module: CatalogModule, mission: ScoredCatalogMission): void {
  const storageKey = getMissionStorageKey(workshop.id, module.id, mission.id);
  const clueInputs = Array.from(document.querySelectorAll<HTMLInputElement>("[data-mission-clue]"));
  const evidenceInputs = Array.from(document.querySelectorAll<HTMLTextAreaElement>("[data-clue-evidence]"));
  const harnessInputs = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="mission-harness"]'));
  const followUpInput = document.querySelector<HTMLTextAreaElement>("#mission-follow-up");
  const caseFileOutput = document.querySelector<HTMLTextAreaElement>("#mission-case-file");
  const actionStatus = document.querySelector<HTMLElement>("#mission-action-status");
  const scoreBreakdown = document.querySelector<HTMLElement>("#mission-score-breakdown");
  if (!followUpInput || !caseFileOutput || !actionStatus || !scoreBreakdown) {
    throw new Error("Mission tracker controls are missing");
  }

  const loaded = loadMissionProgress(window.localStorage, storageKey);
  let progress = loaded.progress;
  if (loaded.warning) {
    actionStatus.textContent = loaded.warning;
  }

  const aliasInput = document.querySelector<HTMLInputElement>("#mission-alias-input");
  const aliasCopy = document.querySelector<HTMLButtonElement>("#mission-alias-copy");
  const aliasStatus = document.querySelector<HTMLElement>("#mission-alias-status");
  const submitLink = document.querySelector<HTMLAnchorElement>("#mission-submit-link");
  const submissionBase = workshop.leaderboard?.submissionUrl;
  const submissionModule = mission.leaderboard?.submission?.moduleOption;

  const updateSubmissionLink = (score: MissionScore): void => {
    if (!submitLink || !submissionBase || !submissionModule || !workshop.leaderboard) return;
    submitLink.href = buildSubmissionUrl(submissionBase, {
      eventId: workshop.leaderboard.eventId,
      moduleOption: submissionModule,
      core: score.core,
      bonus: score.bonus,
      alias: aliasInput?.value
    });
  };

  if (aliasInput) {
    const aliasKey = getAliasStorageKey(workshop.id);
    let aliasPersists = true;
    try {
      aliasInput.value = window.localStorage.getItem(aliasKey) ?? "";
    } catch {
      aliasPersists = false;
    }
    aliasInput.addEventListener("input", () => {
      const value = aliasInput.value.trim();
      try {
        if (value) {
          window.localStorage.setItem(aliasKey, value);
        } else {
          window.localStorage.removeItem(aliasKey);
        }
        aliasPersists = true;
      } catch {
        aliasPersists = false;
      }
      updateSubmissionLink(calculateMissionScore(mission, progress));
      if (aliasStatus) {
        aliasStatus.textContent = aliasPersists
          ? ""
          : "This alias cannot be saved in this browser, so retype it on each mission page.";
      }
    });
    aliasCopy?.addEventListener("click", () => {
      const value = aliasInput.value.trim();
      if (!value) {
        if (aliasStatus) aliasStatus.textContent = "Enter an alias first.";
        aliasInput.focus();
        return;
      }
      void navigator.clipboard
        .writeText(value)
        .then(() => {
          if (aliasStatus) aliasStatus.textContent = "Alias copied. Paste it into the submission form.";
        })
        .catch(() => {
          if (aliasStatus) aliasStatus.textContent = "Copy failed. Select the alias and copy it manually.";
        });
    });
  }

  const validHarnessIds = new Set(mission.harnesses.map((harness) => harness.id));
  if (progress.harness && !validHarnessIds.has(progress.harness)) {
    progress.harness = undefined;
  }

  const validClueIds = new Set([...mission.coreClues, ...mission.bonusClues].map((clue) => clue.id));
  progress.completed = progress.completed.filter((clueId) => validClueIds.has(clueId));
  progress.evidence = Object.fromEntries(
    Object.entries(progress.evidence).filter(([clueId]) => validClueIds.has(clueId))
  );

  const readProgressFromInputs = (): MissionProgress => ({
    harness: harnessInputs.find((input) => input.checked)?.value,
    completed: Array.from(new Set(
      clueInputs
        .filter((input) => input.checked)
        .map((input) => input.dataset.missionClue ?? "")
        .filter(Boolean)
    )),
    evidence: Object.fromEntries(
      evidenceInputs
        .map((input) => [input.dataset.clueEvidence ?? "", input.value] as const)
        .filter(([key]) => key.length > 0)
    ),
    followUp: followUpInput.value
  });

  const showHarnessRoute = (): void => {
    const selectedHarness = progress.harness;
    document.querySelectorAll<HTMLElement>("[data-harness-route]").forEach((route) => {
      route.hidden = route.dataset.harnessRoute !== selectedHarness;
    });
    document.querySelectorAll<HTMLElement>("[data-harness-setup]").forEach((setup) => {
      setup.hidden = setup.dataset.harnessSetup !== selectedHarness;
    });

    const harness = mission.harnesses.find((candidate) => candidate.id === selectedHarness);
    document.querySelectorAll<HTMLElement>("[data-route-placeholder]").forEach((placeholder) => {
      placeholder.hidden = Boolean(harness);
    });

    const help = document.querySelector<HTMLElement>("#mission-harness-help");
    if (!help) return;
    help.textContent = harness
      ? `You're working in ${harness.title}. Every exercise below now shows its first step for that tool.`
      : "Choose a tool to see its setup steps and the first step of every exercise.";
  };

  const updateRenderedState = (): void => {
    const missionScore = calculateMissionScore(mission, progress);
    updateSubmissionLink(missionScore);
    const workshopScore = summarizeWorkshopScores(workshop, window.localStorage, {
      moduleId: module.id,
      missionId: mission.id,
      progress
    });
    const moduleScore = workshopScore.modules.find((entry) => entry.moduleId === module.id) ?? {
      moduleId: module.id,
      moduleTitle: module.title,
      core: missionScore.core,
      bonus: missionScore.bonus,
      total: missionScore.total,
      scoredMissionCount: 1,
      completedMissionCount: missionScore.core >= (mission.completionPoints ?? 0) ? 1 : 0
    };

    const moduleCore = document.querySelector<HTMLElement>("#mission-module-core-score");
    const moduleBonus = document.querySelector<HTMLElement>("#mission-module-bonus-score");
    const moduleTotal = document.querySelector<HTMLElement>("#mission-module-total-score");
    const workshopTotal = document.querySelector<HTMLElement>("#mission-workshop-total-score");
    const scoreStatus = document.querySelector<HTMLElement>("#mission-score-status");
    if (!moduleCore || !moduleBonus || !moduleTotal || !workshopTotal || !scoreStatus) {
      throw new Error("Mission score display is missing");
    }

    moduleCore.textContent = String(moduleScore.core);
    moduleBonus.textContent = String(moduleScore.bonus);
    moduleTotal.textContent = String(moduleScore.total);
    workshopTotal.textContent = String(workshopScore.cumulative.total);
    const target = mission.completionPoints ?? 0;
    scoreStatus.textContent = missionScore.core >= target
      ? `Core mission complete. ${module.title} totals now carry forward in your case file.`
      : `${target - missionScore.core} more core points to complete the mission.`;
    scoreBreakdown.innerHTML = renderWorkshopScoreBreakdown(workshopScore, module.id);
    caseFileOutput.value = buildCaseFileText(workshop, module, mission, progress, workshopScore);
    showHarnessRoute();
  };

  const persist = (successMessage = "Progress saved only in this browser."): void => {
    progress = readProgressFromInputs();
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(progress));
      actionStatus.textContent = successMessage;
    } catch (error) {
      actionStatus.textContent = `Local progress could not be saved: ${error instanceof Error ? error.message : "unknown error"}`;
    }
  };

  followUpInput.value = progress.followUp;
  harnessInputs.forEach((input) => {
    input.checked = input.value === progress.harness;
    input.addEventListener("change", () => {
      progress = readProgressFromInputs();
      updateRenderedState();
      persist();
    });
  });
  clueInputs.forEach((input) => {
    const clueId = input.dataset.missionClue ?? "";
    input.checked = progress.completed.includes(clueId);
    input.addEventListener("change", () => {
      progress = readProgressFromInputs();
      updateRenderedState();
      persist();
    });
  });
  evidenceInputs.forEach((input) => {
    input.value = progress.evidence[input.dataset.clueEvidence ?? ""] ?? "";
    input.addEventListener("input", () => {
      progress = readProgressFromInputs();
      updateRenderedState();
      persist();
    });
  });
  followUpInput.addEventListener("input", () => {
    progress = readProgressFromInputs();
    updateRenderedState();
    persist();
  });

  document.querySelector<HTMLButtonElement>("#mission-reset")?.addEventListener("click", () => {
    progress = emptyMissionProgress();
    harnessInputs.forEach((input) => { input.checked = false; });
    clueInputs.forEach((input) => { input.checked = false; });
    evidenceInputs.forEach((input) => { input.value = ""; });
    followUpInput.value = "";
    caseFileOutput.value = "";
    try {
      window.localStorage.removeItem(storageKey);
      updateRenderedState();
      actionStatus.textContent = "Mission progress reset.";
    } catch (error) {
      actionStatus.textContent = `Mission progress could not be reset: ${error instanceof Error ? error.message : "unknown error"}`;
    }
  });

  document.querySelector<HTMLButtonElement>("#mission-copy")?.addEventListener("click", async () => {
    progress = readProgressFromInputs();
    updateRenderedState();
    persist();
    try {
      await navigator.clipboard.writeText(caseFileOutput.value);
      actionStatus.textContent = "Case file copied.";
    } catch (error) {
      caseFileOutput.focus();
      caseFileOutput.select();
      actionStatus.textContent = `Case file could not be copied: ${error instanceof Error ? error.message : "unknown error"}. The text is selected so you can copy or print it manually.`;
    }
  });

  document.querySelector<HTMLButtonElement>("#mission-print")?.addEventListener("click", () => {
    progress = readProgressFromInputs();
    updateRenderedState();
    persist();
    window.print();
    actionStatus.textContent = "Use the print dialog to print or save your case file.";
  });

  if (mission.starterFile) {
    const starterStatus = document.querySelector<HTMLElement>("#mission-starter-status");
    if (!starterStatus) throw new Error("Mission starter status is missing");
    document.querySelector<HTMLButtonElement>("#mission-copy-starter")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(mission.starterFile?.content ?? "");
        starterStatus.textContent = `${mission.starterFile?.name ?? "Starter file"} content copied.`;
      } catch (error) {
        starterStatus.textContent = `Starter content could not be copied: ${error instanceof Error ? error.message : "unknown error"}. Copy it manually from the text below.`;
      }
    });
  }

  const askStatus = document.querySelector<HTMLElement>("#mission-ask-status");
  const wireAskCopy = (buttonId: string, sourceId: string, label: string): void => {
    document.querySelector<HTMLButtonElement>(buttonId)?.addEventListener("click", async () => {
      const text = document.querySelector<HTMLElement>(sourceId)?.textContent ?? "";
      try {
        await navigator.clipboard.writeText(text);
        if (askStatus) askStatus.textContent = `${label} copied. Replace the bracketed parts before you send it.`;
      } catch (error) {
        if (askStatus) {
          askStatus.textContent = `${label} could not be copied: ${error instanceof Error ? error.message : "unknown error"}. Select the text above and copy it manually.`;
        }
      }
    });
  };
  wireAskCopy("#mission-copy-ask-step", "#mission-ask-step", "Unclear-step prompt");
  wireAskCopy("#mission-copy-ask-setup", "#mission-ask-setup", "Tool-setup prompt");

  updateRenderedState();
}

function renderWorkshopScoreBreakdown(summary: WorkshopScoreSummary, currentModuleId: string): string {
  if (summary.modules.length === 0) {
    return "<p>No scored modules are configured for this workshop yet.</p>";
  }

  return `
    <ol class="mission-module-score-list">
      ${summary.modules.map((module) => `
        <li class="mission-module-score${module.moduleId === currentModuleId ? " mission-module-score--current" : ""}">
          <div>
            <strong>${escapeHtml(module.moduleTitle)}</strong>
            <small>${module.completedMissionCount}/${module.scoredMissionCount} scored mission${module.scoredMissionCount === 1 ? "" : "s"} complete</small>
          </div>
          <div class="mission-module-score__totals">
            <span>Core ${module.core}</span>
            <span>Bonus ${module.bonus}</span>
            <span>Total ${module.total}</span>
          </div>
        </li>`).join("")}
    </ol>
  `;
}

function getNextModuleTitle(workshop: CatalogWorkshop, currentModuleId: string): string | undefined {
  const currentIndex = workshop.modules.findIndex((candidate) => candidate.id === currentModuleId);
  return currentIndex >= 0 ? workshop.modules[currentIndex + 1]?.title : undefined;
}

export function renderModule(module: CatalogModule): string {
  const missionButtons = module.missions.map(
    (mission) =>
      `<a class="button-link button-link--secondary" href="${url(mission.route)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${mission.title}, ${mission.durationMinutes} minutes (opens in new tab)`)}">Missions · ${mission.durationMinutes} min <span aria-hidden="true">↗</span></a>`
  ).join("");
  return `<li class="module-list__item">
    <div class="module-list__content">
      <strong>${escapeHtml(module.title)}</strong>
      <small>${escapeHtml(module.description)}</small>
      <span class="module-list__duration">${escapeHtml(module.duration)}</span>
    </div>
    <div class="module-list__actions">
      <a class="button-link" href="${url(module.route)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${module.title} slides (opens in new tab)`)}">Slides <span aria-hidden="true">↗</span></a>
      ${missionButtons}
    </div>
  </li>`;
}

function renderResources(): string {
  return `<section class="resource-section" aria-labelledby="resources-heading">
    <div class="catalog__heading">
      <div>
        <p class="eyebrow">Keep exploring</p>
        <h2 id="resources-heading">Build with GitHub Copilot</h2>
      </div>
    </div>
    <div class="resource-grid">
      <article class="resource-card resource-card--app">
        <p class="eyebrow">Desktop experience</p>
        <h3>GitHub Copilot app</h3>
        <p>The desktop home for agent-driven development. Start from an issue, pull request or prompt, run parallel sessions, and review changes with integrated terminal and browser canvases.</p>
        <a class="button-link" href="https://github.com/github/app" target="_blank" rel="noopener noreferrer">Download GitHub Copilot app <span aria-hidden="true">↗</span></a>
      </article>
      <article class="resource-card">
        <p class="eyebrow">Community collection</p>
        <h3>Awesome Copilot</h3>
        <p>Explore community-created agents, instructions, skills, hooks, workflows and plugins. Review each resource and its documentation before installing it.</p>
        <a class="button-link button-link--secondary" href="https://awesome-copilot.github.com/" target="_blank" rel="noopener noreferrer">Explore Awesome Copilot <span aria-hidden="true">↗</span></a>
      </article>
    </div>
  </section>`;
}

function hero(eyebrow: string, title: string, lede: string, before = "", modifier = ""): string {
  const classes = modifier ? `hero ${modifier}` : "hero";
  return `<header class="${classes}"><div class="hero__content">${before}<p class="eyebrow">${escapeHtml(eyebrow)}</p><h1>${escapeHtml(title)}</h1><p class="hero__lede">${escapeHtml(lede)}</p></div></header>`;
}

function metadata(values: string[]): string {
  return `<div class="workshop-card__meta">${values.map((value) => `<span>${escapeHtml(value)}</span>`).join("")}</div>`;
}

function listItems(items: string[]): string {
  return items.length > 0 ? `<ul>${items.map((item) => `<li>${richText(item)}</li>`).join("")}</ul>` : "";
}

function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return hours > 0 ? `${hours} hr${hours === 1 ? "" : "s"}${remainder ? ` ${remainder} min` : ""}` : `${minutes} min`;
}

function url(route: string): string {
  return `${base}${route}`;
}

function renderNotFound(): void {
  app!.innerHTML = `${hero("404", "Page not found", "The requested workshop delivery page does not exist.")}<section class="catalog"><a class="button-link" href="${url("")}">Return to workshops</a></section>`;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character] ?? character);
}

// Authored mission text uses `code`, ``code containing a backtick``, and
// **bold**. Escape first, then promote those markers so participants read
// formatting instead of punctuation. Double-backtick spans are resolved first
// so an inner backtick is not mistaken for a closing delimiter.
export function richText(value: string): string {
  return escapeHtml(value)
    .replace(/``(.+?)``/g, (_match, code: string) => `<code>${stripCodeSpanPadding(code)}</code>`)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

// CommonMark drops one leading and trailing space from a padded code span so
// `` `x` `` renders as the delimiter-adjacent content rather than with gaps.
function stripCodeSpanPadding(code: string): string {
  if (code.length > 2 && code.startsWith(" ") && code.endsWith(" ") && code.trim() !== "") {
    return code.slice(1, -1);
  }
  return code;
}
