import { describe, expect, it } from "vitest";
import {
  buildCaseFileText,
  calculateMissionScore,
  getMissionStorageKey,
  buildSubmissionUrl,
  getAliasStorageKey,
  isScoredMission,
  loadMissionProgress,
  normalizeMission,
  parseMissionProgress,
  renderModule,
  renderLandingPage,
  renderWorkshopCards,
  renderWorkshopPage,
  renderLeaderboardPointer,
  renderMissionBackLink,
  renderMissionSubmission,
  richText,
  summarizeWorkshopScores,
  type CatalogMission,
  type CatalogModule,
  type CatalogWorkshop,
  type MissionProgress,
  type StorageLike
} from "./main.js";

function createStorage(seed: Record<string, string> = {}): StorageLike {
  const entries = new Map(Object.entries(seed));
  return {
    getItem(key) {
      return entries.has(key) ? entries.get(key) ?? null : null;
    },
    setItem(key, value) {
      entries.set(key, value);
    },
    removeItem(key) {
      entries.delete(key);
    }
  };
}

function createMission(id: string, title: string): CatalogMission {
  return {
    id,
    title,
    durationMinutes: 45,
    route: `workshops/test/${id}/`,
    objectiveRefs: ["Use bounded context"],
    prerequisites: [],
    startingState: "Ready",
    goal: `Complete ${title}`,
    task: "Find the clues",
    constraints: [],
    evidence: ["Case file"],
    safetyCheckpoints: [],
    corePath: ["Complete the core clues"],
    stretchPath: [],
    debrief: ["What changed?"],
    validation: ["Explain the evidence."],
    casePacket: ["Create the repository."],
    harnesses: [{
      id: "copilot-cli",
      title: "Copilot CLI",
      description: "Use Copilot in the terminal.",
      instructions: ["Stay in scope."]
    }],
    coreClues: [
      {
        id: `${id}-core-1`,
        title: "Core 1",
        points: 10,
        objectiveRef: "Use bounded context",
        scene: "Scene 1",
        outcome: "Outcome 1",
        actions: ["Act 1"],
        routes: [{ harness: "copilot-cli", instructions: ["Start in the repo root."] }],
        verify: "Verify 1",
        evidence: "Evidence 1",
        hints: ["Hint 1"],
        safetyCheckpoint: "Check 1"
      },
      {
        id: `${id}-core-2`,
        title: "Core 2",
        points: 10,
        objectiveRef: "Use bounded context",
        scene: "Scene 2",
        outcome: "Outcome 2",
        actions: ["Act 2"],
        routes: [{ harness: "copilot-cli", instructions: ["Keep the context narrow."] }],
        verify: "Verify 2",
        evidence: "Evidence 2",
        hints: ["Hint 2"],
        safetyCheckpoint: "Check 2"
      },
      {
        id: `${id}-core-3`,
        title: "Core 3",
        points: 10,
        objectiveRef: "Use bounded context",
        scene: "Scene 3",
        outcome: "Outcome 3",
        actions: ["Act 3"],
        routes: [{ harness: "copilot-cli", instructions: ["Verify before accepting."] }],
        verify: "Verify 3",
        evidence: "Evidence 3",
        hints: ["Hint 3"],
        safetyCheckpoint: "Check 3"
      },
      {
        id: `${id}-core-4`,
        title: "Core 4",
        points: 10,
        objectiveRef: "Use bounded context",
        scene: "Scene 4",
        outcome: "Outcome 4",
        actions: ["Act 4"],
        routes: [{ harness: "copilot-cli", instructions: ["Record the evidence."] }],
        verify: "Verify 4",
        evidence: "Evidence 4",
        hints: ["Hint 4"],
        safetyCheckpoint: "Check 4"
      }
    ],
    bonusClues: [
      {
        id: `${id}-bonus-1`,
        title: "Bonus 1",
        points: 10,
        objectiveRef: "Use bounded context",
        scene: "Bonus scene 1",
        outcome: "Bonus outcome 1",
        actions: ["Bonus act 1"],
        routes: [{ harness: "copilot-cli", instructions: ["Record the bonus evidence."] }],
        verify: "Bonus verify 1",
        evidence: "Bonus evidence 1",
        hints: ["Bonus hint 1"],
        safetyCheckpoint: "Bonus check 1"
      },
      {
        id: `${id}-bonus-2`,
        title: "Bonus 2",
        points: 10,
        objectiveRef: "Use bounded context",
        scene: "Bonus scene 2",
        outcome: "Bonus outcome 2",
        actions: ["Bonus act 2"],
        routes: [{ harness: "copilot-cli", instructions: ["Export the bonus total."] }],
        verify: "Bonus verify 2",
        evidence: "Bonus evidence 2",
        hints: ["Bonus hint 2"],
        safetyCheckpoint: "Bonus check 2"
      }
    ],
    completionPoints: 40,
    bonusPointCap: 10,
    carryForward: {
      artifact: "Case file",
      produces: ["Verified evidence"],
      consumes: []
    }
  };
}

const foundationsMission = createMission("foundations-mission", "Foundations mission");
const agenticMission = createMission("agentic-mission", "Agentic mission");

const workshop: CatalogWorkshop = {
  id: "ghcp-dev-hack",
  title: "GitHub Copilot Developer Hack",
  description: "Workshop",
  duration: "7 hours",
  format: "custom",
  level: "mixed",
  tags: [],
  prerequisites: [],
  route: "workshops/ghcp-dev-hack/",
  deliveryVariants: [],
  modules: [
    {
      id: "foundations",
      title: "Foundations",
      description: "Foundations module",
      duration: "45 minutes",
      route: "workshops/ghcp-dev-hack/foundations/",
      status: "draft",
      missions: [foundationsMission]
    },
    {
      id: "agentic",
      title: "Agentic Development",
      description: "Agentic module",
      duration: "45 minutes",
      route: "workshops/ghcp-dev-hack/agentic/",
      status: "draft",
      missions: [agenticMission]
    }
  ]
};

describe("mission rich text", () => {
  it("renders a double-backtick span containing a literal backtick", () => {
    expect(richText("Open the terminal with `` Ctrl+` `` and run it there.")).toBe(
      "Open the terminal with <code>Ctrl+`</code> and run it there."
    );
  });

  it("still renders single-backtick code and bold markers", () => {
    expect(richText("Run `gh api ...` and **stop** there.")).toBe(
      "Run <code>gh api ...</code> and <strong>stop</strong> there."
    );
  });

  it("escapes HTML before promoting markers", () => {
    expect(richText("Use `<script>` carefully.")).toBe(
      "Use <code>&lt;script&gt;</code> carefully."
    );
  });
});

describe("mission navigation", () => {  it("returns from a mission to its active module deck", () => {
    const agenticModule = workshop.modules.find((module) => module.id === "agentic");
    expect(agenticModule).toBeDefined();
    if (!agenticModule) throw new Error("Agentic test module is missing");

    expect(renderMissionBackLink(agenticModule)).toContain(
      `href="${import.meta.env.BASE_URL}workshops/ghcp-dev-hack/agentic/"`
    );
    expect(renderMissionBackLink(agenticModule)).toContain(
      "Back to Agentic Development"
    );
  });
});

describe("workshop module navigation", () => {
  it("opens slides and missions in new tabs while preserving the workshop page", () => {
    const foundationsModule = workshop.modules.find((module) => module.id === "foundations");
    expect(foundationsModule).toBeDefined();
    if (!foundationsModule) throw new Error("Foundations test module is missing");

    const html = renderModule(foundationsModule);
    expect(html).toContain(
      `href="${import.meta.env.BASE_URL}workshops/ghcp-dev-hack/foundations/"`
    );
    expect(html).toContain('target="_blank" rel="noopener noreferrer"');
    expect(html).toContain("Foundations slides (opens in new tab)");
    expect(html).toContain("Foundations mission, 45 minutes (opens in new tab)");
  });

  it("keeps long duration text with module content, not in the action toolbar", () => {
    const module: CatalogModule = {
      ...workshop.modules[0]!,
      duration: "Full-day deck, 09:00-17:00, including three break/lunch utilities"
    };
    const html = renderModule(module);
    const [content, actions] = html.split('<div class="module-list__actions">');
    expect(content).toContain(`<span class="module-list__duration">${module.duration}</span>`);
    expect(actions).not.toContain(module.duration);
    expect(actions).toContain("Slides");
  });
});

describe("workshop detail layout", () => {
  it("omits empty delivery options and gives modules the full grid width", () => {
    const html = renderWorkshopPage(workshop);
    expect(html).not.toContain("Delivery options");
    expect(html).not.toContain("No delivery variants");
    expect(html).toContain('class="catalog detail-grid detail-grid--single"');
    expect(html).toContain("<h2>Modules</h2><span>2</span>");
    expect(html).toContain(workshop.modules[0]!.title);
    expect(html).toContain(workshop.modules[1]!.title);
  });

  it("retains real delivery options and their generated agenda links", () => {
    const variant = {
      id: "one-day",
      title: "One-day workshop",
      description: "A full day",
      route: `${workshop.route}variants/one-day/`,
      totalMinutes: 480,
      days: [],
      modulePhases: []
    };
    const html = renderWorkshopPage({ ...workshop, deliveryVariants: [variant] });
    expect(html).toContain("<h2>Delivery options</h2><span>1</span>");
    expect(html).toContain(`href="${import.meta.env.BASE_URL}${variant.route}"`);
    expect(html).toContain("View agenda");
    expect(html).not.toContain("detail-grid--single");
  });

  it("preserves published-module filtering and supports empty module lists", () => {
    const html = renderWorkshopPage({
      ...workshop,
      modules: workshop.modules.map((module, index) => ({
        ...module, status: index === 0 ? "published" : "draft"
      }))
    });
    expect(html).toContain("<h2>Modules</h2><span>1</span>");
    expect(html).toContain("Foundations slides");
    expect(html).not.toContain("Agentic Development slides");
    expect(renderWorkshopPage({ ...workshop, modules: [] })).toContain("<h2>Modules</h2><span>0</span>");
  });
});

describe("workshop catalog cards", () => {
  const standalone: CatalogWorkshop = {
    ...workshop,
    id: "mission-control",
    title: "Mission Control: The Copilot Value Lab",
    route: "workshops/mission-control/",
    duration: "One day",
    deliveryVariants: []
  };

  it("includes workshops without delivery variants using their generated workshop route", () => {
    const cards = renderWorkshopCards([standalone]);
    expect(cards).toHaveLength(1);
    expect(cards[0]).toContain(standalone.title);
    expect(cards[0]).toContain(`href="${import.meta.env.BASE_URL}${standalone.route}"`);
    expect(cards[0]).toContain("View workshop");
    expect(cards[0]).toContain("One day");
  });

  it("preserves each delivery variant alongside standalone workshops without duplicate parent cards", () => {
    const withVariants: CatalogWorkshop = {
      ...workshop,
      deliveryVariants: ["one-day", "two-day"].map((id, index) => ({
        id,
        title: `Delivery ${id}`,
        description: `Agenda ${id}`,
        route: `${workshop.route}variants/${id}/`,
        totalMinutes: 480 * (index + 1),
        days: Array.from({ length: index + 1 }, (_, day) => ({
          id: `day-${day + 1}`,
          title: `Day ${day + 1}`,
          start: "09:00",
          end: "17:00",
          totalMinutes: 480,
          agenda: []
        })),
        modulePhases: []
      }))
    };
    const source = [withVariants, standalone];
    const cards = renderWorkshopCards(source);
    expect(cards).toHaveLength(3);
    expect(cards[0]).toContain(standalone.title);
    for (const [index, variant] of withVariants.deliveryVariants.entries()) {
      expect(cards[index + 1]).toContain(`href="${import.meta.env.BASE_URL}${variant.route}"`);
      expect(cards[index + 1]).toContain(variant.title);
      expect(cards[index + 1]).not.toContain(`href="${import.meta.env.BASE_URL}${workshop.route}"`);
    }
    expect(cards[1]).toContain("1 day");
    expect(cards[2]).toContain("2 days");
    expect(source).toEqual([withVariants, standalone]);
  });

  it("escapes authored standalone metadata and handles an empty catalog", () => {
    const cards = renderWorkshopCards([{ ...standalone, title: "<title>", duration: "<duration>" }]);
    expect(cards[0]).toContain("&lt;title&gt;");
    expect(cards[0]).toContain("&lt;duration&gt;");
    expect(renderWorkshopCards([])).toEqual([]);
  });
});

describe("landing page features", () => {
  const missionControl: CatalogWorkshop = {
    ...workshop,
    id: "mission-control",
    title: "Mission Control: The Copilot Value Lab",
    route: "workshops/mission-control/",
    duration: "One day",
    deliveryVariants: []
  };

  it("features the approved Mission Control team and their personas", () => {
    const html = renderLandingPage([workshop, missionControl]);
    expect(html).toContain('class="hero hero--landing"');
    expect(html).toContain("mission-control-opening-team-v7.png");
    expect(html).toContain("Agent Mergewell");
    expect(html).toContain("Accountable human engineer");
    expect(html).toContain("Purrmission");
    expect(html).toContain("Boundary signal");
    expect(html).toContain("Chief Charter");
    expect(html).toContain("Organizational sponsor");
    expect(html).toContain("Riley Relay");
    expect(html).toContain("Bounded agent collaborator");
    expect(html).toContain("Part of the team. One accountable mission.");
    expect(html).not.toContain("Four roles.");
    expect(html).not.toContain("Explore Mission Control");
    expect(html.indexOf("Meet the Mission Control team")).toBeGreaterThan(
      html.indexOf("Explore Awesome Copilot")
    );
  });

  it("puts Mission Control before existing workshop variants without mutating source order", () => {
    const existingWorkshop = {
      ...workshop,
      deliveryVariants: [{
        id: "one-day",
        title: "GitHub Workshop",
        description: "One-day delivery",
        route: `${workshop.route}variants/one-day/`,
        totalMinutes: 480,
        days: [],
        modulePhases: []
      }]
    };
    const source = [existingWorkshop, missionControl];
    const html = renderLandingPage(source);
    expect(html.indexOf(missionControl.title)).toBeLessThan(html.indexOf("GitHub Workshop"));
    expect(source[0]).toBe(existingWorkshop);
  });

  it("replaces role cards with official app and Awesome Copilot resources", () => {
    const html = renderLandingPage([missionControl]);
    expect(html).not.toContain("Skills by role persona");
    expect(html).not.toContain("Software developer");
    expect(html).toContain('href="https://github.com/github/app"');
    expect(html).toContain("Download GitHub Copilot app");
    expect(html).toContain('href="https://awesome-copilot.github.com/"');
    expect(html).toContain('target="_blank" rel="noopener noreferrer"');
  });

  it("omits the team feature when a filtered catalog does not include Mission Control", () => {
    const html = renderLandingPage([workshop]);
    expect(html).not.toContain("Meet the Mission Control team");
    expect(html).not.toContain("mission-control-opening-team-v7.png");
  });
});

describe("mission progress helpers", () => {
  it("parses saved mission progress and keeps only valid string evidence", () => {
    expect(parseMissionProgress(JSON.stringify({
      harness: "copilot-cli",
      completed: ["clue-1", "clue-1", "clue-2"],
      evidence: { "clue-1": "Saved evidence", bad: 1 },
      followUp: "Review the diff"
    }))).toEqual({
      harness: "copilot-cli",
      completed: ["clue-1", "clue-2"],
      evidence: { "clue-1": "Saved evidence" },
      followUp: "Review the diff"
    });
  });

  it("falls back safely when saved local progress is invalid", () => {
    const storage = createStorage({ broken: "{not-json" });
    expect(loadMissionProgress(storage, "broken")).toEqual({
      progress: {
        completed: [],
        evidence: {},
        followUp: ""
      },
      warning: expect.stringContaining("Local progress could not be loaded")
    });
  });
});

describe("score summaries", () => {
  it("caps bonus totals and aggregates module and workshop scores", () => {
    const foundationsKey = getMissionStorageKey(workshop.id, "foundations", foundationsMission.id);
    const storage = createStorage({
      [foundationsKey]: JSON.stringify({
        harness: "copilot-cli",
        completed: [
          "foundations-mission-core-1",
          "foundations-mission-core-2",
          "foundations-mission-core-3",
          "foundations-mission-core-4",
          "foundations-mission-bonus-1",
          "foundations-mission-bonus-2"
        ],
        evidence: {},
        followUp: "Carry it forward"
      } satisfies MissionProgress)
    });

    const currentProgress: MissionProgress = {
      harness: "copilot-cli",
      completed: [
        "agentic-mission-core-1",
        "agentic-mission-core-2",
        "agentic-mission-core-3",
        "agentic-mission-bonus-1",
        "agentic-mission-bonus-2"
      ],
      evidence: {},
      followUp: "Prepare the next task"
    };

    const summary = summarizeWorkshopScores(workshop, storage, {
      moduleId: "agentic",
      missionId: agenticMission.id,
      progress: currentProgress
    });

    expect(summary.modules).toEqual([
      {
        moduleId: "foundations",
        moduleTitle: "Foundations",
        core: 40,
        bonus: 10,
        total: 50,
        scoredMissionCount: 1,
        completedMissionCount: 1
      },
      {
        moduleId: "agentic",
        moduleTitle: "Agentic Development",
        core: 30,
        bonus: 10,
        total: 40,
        scoredMissionCount: 1,
        completedMissionCount: 0
      }
    ]);
    expect(summary.cumulative).toEqual({ core: 70, bonus: 20, total: 90 });
    expect(calculateMissionScore(normalizeMission(agenticMission), currentProgress)).toEqual({
      core: 30,
      bonus: 10,
      total: 40
    });
  });

  it("carries per-module totals and cumulative totals into the case file export", () => {
    const summary = {
      modules: [
        {
          moduleId: "foundations",
          moduleTitle: "Foundations",
          core: 40,
          bonus: 10,
          total: 50,
          scoredMissionCount: 1,
          completedMissionCount: 1
        },
        {
          moduleId: "agentic",
          moduleTitle: "Agentic Development",
          core: 30,
          bonus: 10,
          total: 40,
          scoredMissionCount: 1,
          completedMissionCount: 0
        }
      ],
      cumulative: { core: 70, bonus: 20, total: 90 }
    };
    const currentProgress: MissionProgress = {
      harness: "copilot-cli",
      completed: ["agentic-mission-core-1", "agentic-mission-bonus-1"],
      evidence: { "agentic-mission-core-1": "Tracked the delegated change." },
      followUp: "Verify the next module handoff"
    };
    const scoredMission = normalizeMission(agenticMission);
    if (!isScoredMission(scoredMission)) {
      throw new Error("Expected a scored mission");
    }

    const caseFile = buildCaseFileText(
      workshop,
      workshop.modules[1] as CatalogModule,
      scoredMission,
      currentProgress,
      summary
    );

    expect(caseFile).toContain("Module totals");
    expect(caseFile).toContain("- Foundations: core 40, bonus 10, total 50");
    expect(caseFile).toContain("- Agentic Development: core 30, bonus 10, total 40");
    expect(caseFile).toContain("Workshop cumulative total: core 70, bonus 20, total 90");
    expect(caseFile).toContain("Bounded follow-up task: Verify the next module handoff");
  });
});

describe("leaderboard surfaces", () => {
  const leaderboard = {
    optional: true,
    aliasOnly: true,
    eventId: "ghcp-dev-hack",
    environment: "test",
    repository: "mfm-se-dev-org/ghcp-dev-hack-leaderboard",
    submissionUrl: "https://github.com/mfm-se-dev-org/ghcp-dev-hack-leaderboard/issues/new?template=leaderboard-submission.yml",
    standingsUrl: "https://mfm-se-dev-org.github.io/ghcp-dev-hack-leaderboard/"
  } as const;

  it("renders per-module submission guidance with the submission form link", () => {
    const mission = {
      leaderboard: {
        optional: true,
        aliasOnly: true,
        instructions: ["Alias only."],
        submission: {
          moduleOption: "Foundations",
          steps: ["Choose Foundations", "Submit one issue"]
        }
      }
    } as unknown as CatalogMission;

    const markup = renderMissionSubmission({ leaderboard }, mission);
    expect(markup).toContain(leaderboard.submissionUrl);
    expect(markup).toContain(leaderboard.standingsUrl);
    expect(markup).toContain("Foundations");
    expect(markup).toContain("ghcp-dev-hack");
    expect(markup).toContain("Submit one issue");
  });

  it("links to the standings from the workshop page without offering submission there", () => {
    const markup = renderLeaderboardPointer({ leaderboard });

    expect(markup).toContain(leaderboard.standingsUrl);
    expect(markup).toContain("View leaderboard standings");
    expect(markup).toContain("mission page to submit");
    expect(markup).not.toContain(leaderboard.submissionUrl);
    expect(renderLeaderboardPointer({ leaderboard: undefined })).toBe("");
  });

  it("prefills the submission form with the event, alias, module, and totals", () => {
    const url = buildSubmissionUrl(
      "https://github.com/org/repo/issues/new?template=leaderboard-submission.yml",
      { eventId: "ghcp-dev-hack", moduleOption: "Foundations", core: 45, bonus: 10, alias: "night-shift-42" }
    );

    expect(url).toContain("template=leaderboard-submission.yml");
    expect(url).toContain("event-id=ghcp-dev-hack");
    expect(url).toContain("opt-in-alias=night-shift-42");
    expect(url).toContain("module=Foundations");
    expect(url).toContain("core-points=45");
    expect(url).toContain("bonus-points=10");
    expect(url.indexOf("?")).toBe(url.lastIndexOf("?"));
  });

  it("omits an empty alias and encodes one containing spaces", () => {
    const base = "https://github.com/org/repo/issues/new?template=t.yml";
    const withoutAlias = buildSubmissionUrl(base, { eventId: "e", moduleOption: "Agentic", core: 40, bonus: 0, alias: "   " });
    expect(withoutAlias).not.toContain("opt-in-alias");
    expect(withoutAlias).toContain("core-points=40");

    const spaced = buildSubmissionUrl(base, { eventId: "e", moduleOption: "Agentic", core: 40, bonus: 0, alias: "night shift" });
    expect(spaced).toContain("opt-in-alias=night+shift");
  });

  it("offers a workshop-scoped alias field with privacy guidance", () => {
    const mission = {
      leaderboard: {
        optional: true,
        aliasOnly: true,
        instructions: ["Alias only."],
        submission: { moduleOption: "Advanced", steps: ["Choose Advanced"] }
      }
    } as unknown as CatalogMission;

    const markup = renderMissionSubmission({ leaderboard }, mission);
    expect(markup).toContain('id="mission-alias-input"');
    expect(markup).toContain("Your leaderboard alias");
    expect(markup).toContain("Pick a made-up alias, not your real name.");
    expect(markup).toContain("never transmitted");
  });

  it("keeps the alias key workshop-scoped so every module reuses one alias", () => {
    const aliasKey = getAliasStorageKey("ghcp-dev-hack");
    expect(aliasKey).toContain("ghcp-dev-hack");
    expect(aliasKey).not.toContain("foundations");
    expect(getAliasStorageKey("ghcp-dev-hack")).toBe(aliasKey);
    expect(getMissionStorageKey("ghcp-dev-hack", "foundations", "context-and-prompts")).not.toBe(aliasKey);
  });

  it("omits submission guidance when either the workshop or mission does not opt in", () => {
    const mission = { leaderboard: { optional: true, aliasOnly: true, instructions: ["Alias only."] } } as unknown as CatalogMission;
    expect(renderMissionSubmission({ leaderboard }, mission)).toBe("");
    expect(renderMissionSubmission({}, mission)).toBe("");
  });
});
