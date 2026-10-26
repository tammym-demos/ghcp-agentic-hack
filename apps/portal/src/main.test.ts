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

  it("places ghcp-agentic-hack at the very top of the landing page and renders archived workshops at the bottom", () => {
    const newHack: CatalogWorkshop = {
      ...workshop,
      id: "ghcp-agentic-hack",
      title: "GitHub Copilot Agentic Hack",
      route: "workshops/ghcp-agentic-hack/",
      format: "one-day",
      duration: "7 hours 4 minutes",
      totalMinutes: 424,
      deliveryVariants: [{
        id: "two-day",
        title: "GitHub Copilot Agentic Hack (2 Day)",
        description: "Updated 2-day hack",
        route: "workshops/ghcp-agentic-hack/variants/two-day/",
        totalMinutes: 844,
        days: [],
        modulePhases: []
      }]
    };
    const legacyArchived: CatalogWorkshop = {
      ...workshop,
      id: "ghcp-dev-hack",
      title: "GitHub Copilot Developer Hack (Legacy)",
      archived: true,
      deliveryVariants: [{
        id: "two-day",
        title: "GHCP Hack (2 Day)",
        description: "Archived 2-day hack",
        route: "workshops/ghcp-dev-hack/variants/two-day/",
        archived: true,
        totalMinutes: 844,
        days: [],
        modulePhases: []
      }]
    };
    const html = renderLandingPage([legacyArchived, missionControl, newHack]);
    expect(html.indexOf("GitHub Copilot Agentic Hack (2 Day)")).toBeLessThan(html.indexOf(missionControl.title));
    expect(html.indexOf(missionControl.title)).toBeLessThan(html.indexOf("GHCP Hack (2 Day)"));
    expect(html).toContain('id="catalog-featured-heading">Featured workshop</h2>');
    expect(html).toContain('id="catalog-archived-heading">Archived workshops</h2>');
    expect(html).toContain("workshop-card--archived");
    expect(html).toContain("<span>Archived</span>");
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

describe("landing page duration groups", () => {
  const tokenOptimization: CatalogWorkshop = {
    ...workshop,
    id: "token-optimization",
    title: "Token Optimization: Get More Verified Progress from Every AI Credit",
    route: "workshops/token-optimization/",
    format: "one-hour",
    duration: "60 minutes",
    totalMinutes: 60
  };
  const executive: CatalogWorkshop = {
    ...workshop,
    id: "mission-control-executive",
    title: "Executive AI Value Decision Briefing",
    route: "workshops/mission-control-executive/",
    format: "custom",
    duration: "45 minutes",
    totalMinutes: 45
  };
  const fullDay: CatalogWorkshop = {
    ...workshop,
    id: "mission-control",
    title: "Mission Control full-day workshop",
    format: "one-day",
    duration: "Full-day agenda",
    totalMinutes: 483
  };

  it("groups the 60-minute token workshop and 45-minute briefing before full-day workshops", () => {
    const source = [fullDay, tokenOptimization, executive];
    const html = renderLandingPage(source);
    const shortSection = html.split('aria-labelledby="catalog-short-heading"')[1]!.split("</section>")[0]!;
    const daySection = html.split('aria-labelledby="catalog-full-day-heading"')[1]!.split("</section>")[0]!;

    expect(html).toContain("<span>3 available</span>");
    expect(shortSection).toContain("One hour or less");
    expect(shortSection).toContain("<span>2 available</span>");
    expect(shortSection).toContain(tokenOptimization.title);
    expect(shortSection).toContain(executive.title);
    expect(shortSection).toContain(`href="${import.meta.env.BASE_URL}${tokenOptimization.route}"`);
    expect(shortSection).not.toContain(fullDay.title);
    expect(daySection).toContain("Full-day workshops");
    expect(daySection).toContain("<span>1 available</span>");
    expect(daySection).toContain(fullDay.title);
    expect(daySection).not.toContain(executive.title);
    expect(html.indexOf("catalog-short-heading")).toBeLessThan(html.indexOf("catalog-full-day-heading"));
    expect(html).not.toContain("Other workshop formats");
    expect(source).toEqual([fullDay, tokenOptimization, executive]);
  });

  it("groups delivery options individually and preserves their routes without a parent card", () => {
    const withVariants: CatalogWorkshop = {
      ...fullDay,
      id: "delivery-workshop",
      title: "Parent workshop",
      readinessGuide: {
        title: "Two-day hackathon readiness guide",
        route: "workshops/delivery-workshop/resources/readiness/",
        deliveryVariant: "option-2"
      },
      deliveryVariants: [60, 424, 900].map((totalMinutes, index) => ({
        id: `option-${index}`,
        title: `Option ${index}`,
        description: "Delivery option",
        route: `workshops/delivery-workshop/variants/option-${index}/`,
        totalMinutes,
        days: Array.from({ length: index === 2 ? 2 : 1 }, (_, day) => ({
          id: `day-${day}`,
          title: `Day ${day + 1}`,
          start: "09:00",
          end: "17:00",
          totalMinutes: 480,
          agenda: []
        })),
        modulePhases: []
      }))
    };
    const html = renderLandingPage([withVariants]);
    const shortSection = html.split('aria-labelledby="catalog-short-heading"')[1]!.split("</section>")[0]!;
    const daySection = html.split('aria-labelledby="catalog-full-day-heading"')[1]!.split("</section>")[0]!;

    expect(shortSection).toContain("Option 0");
    expect(shortSection).not.toContain("Option 1");
    expect(daySection).toContain("Option 1");
    expect(daySection).toContain("Option 2");
    expect(daySection).toContain("2 days");
    expect(daySection).toContain("<span>2 available</span>");
    expect(daySection).toContain("Two-day hackathon readiness guide (opens in new tab)");
    expect(daySection).toContain(`href="${import.meta.env.BASE_URL}workshops/delivery-workshop/resources/readiness/"`);
    expect(daySection).toContain('target="_blank" rel="noopener noreferrer"');
    expect(daySection.match(/Two-day hackathon readiness guide/g)).toHaveLength(1);
    const variantCards = renderWorkshopCards([withVariants]);
    expect(variantCards[0]).not.toContain("catalog-readiness");
    expect(variantCards[1]).not.toContain("catalog-readiness");
    expect(variantCards[2]).toContain("Two-day hackathon readiness guide");
    expect(variantCards[2]!.indexOf("catalog-readiness")).toBeGreaterThan(variantCards[2]!.indexOf("View workshop"));
    expect(shortSection).not.toContain("catalog-readiness");
    expect(html).toContain("<span>3 available</span>");
    expect(html).not.toContain("Parent workshop");
    for (const variant of withVariants.deliveryVariants) {
      expect(html).toContain(`href="${import.meta.env.BASE_URL}${variant.route}"`);
    }
  });

  it("keeps custom and untimed workshops visible without parsing duration text", () => {
    const other: CatalogWorkshop = {
      ...executive,
      title: "Longer custom session",
      totalMinutes: 90,
      duration: "One hour or less"
    };
    const untimed = { ...workshop, title: "Untimed workshop", duration: "45 minutes" };
    const html = renderLandingPage([other, untimed]);

    expect(html).toContain('id="catalog-other-heading">Other workshop formats</h2>');
    expect(html).toContain(other.title);
    expect(html).toContain(untimed.title);
    expect(html).not.toContain('id="catalog-short-heading"');
    expect(html).not.toContain('id="catalog-full-day-heading"');
  });

  it("uses declared formats when timing is absent and hides empty sections", () => {
    const html = renderLandingPage([
      { ...tokenOptimization, totalMinutes: undefined },
      { ...fullDay, format: "two-day", totalMinutes: undefined }
    ]);
    expect(html).toContain('id="catalog-short-heading"');
    expect(html).toContain('id="catalog-full-day-heading"');
    expect(html).not.toContain('id="catalog-other-heading"');

    const empty = renderLandingPage([]);
    expect(empty).toContain("<span>0 available</span>");
    expect(empty).not.toContain('class="catalog-group"');
    expect(empty).not.toContain("catalog-readiness");
  });

  it("only shows guides for selected full-day workshops and escapes their titles", () => {
    const html = renderLandingPage([{
      ...fullDay,
      readinessGuide: { title: "<Readiness>", route: "workshops/test/resources/readiness/" }
    }]);
    expect(html).toContain("&lt;Readiness&gt; (opens in new tab)");
    expect(renderLandingPage([fullDay])).not.toContain("catalog-readiness");
    expect(renderLandingPage([{
      ...tokenOptimization,
      readinessGuide: { title: "Short guide", route: "workshops/test/resources/readiness/" }
    }])).not.toContain("Short guide");
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
