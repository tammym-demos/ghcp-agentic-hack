import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { type ContentCatalog } from "@ghcp/content-schema";
import { workshopRunOfShow } from "./lifecycle.js";
import { createPortalCatalog, resolveWorkshopEnvironment } from "./catalog.js";

describe("reference content", () => {
  it("includes scored mission catalog fields when authored content provides them", () => {
    const catalog = {
      workshops: [
        {
          root: "workshops/test",
          workshop: {
            filePath: "workshop.md",
            body: "",
            data: {
              schemaVersion: 1,
              kind: "workshop",
              id: "test",
              title: "Test",
              description: "Test workshop",
              format: "custom",
              duration: "1 hour",
              level: "basic",
              audience: ["Developers"],
              prerequisites: [],
              modules: ["foundations"],
              tags: [],
              researchSources: [],
              status: "draft",
              lastReviewed: "2026-08-11"
            }
          },
          modules: [{
            filePath: "module.md",
            body: "",
            data: {
              schemaVersion: 1,
              kind: "module",
              id: "foundations",
              title: "Foundations",
              description: "Intro module",
              duration: "45 minutes",
              objectives: ["Use bounded context"],
              prerequisites: [],
              sourceDocuments: [],
              slides: "slides.md",
              labs: [],
              missions: ["content/missions/foundations/scored.md"],
              assets: [],
              status: "draft"
            }
          }],
          labs: [],
          missions: [{
            filePath: "C:/repo/workshops/test/content/missions/foundations/scored.md",
            body: "",
            data: {
              schemaVersion: 1,
              kind: "mission",
              id: "scored",
              title: "Scored mission",
              module: "foundations",
              durationMinutes: 45,
              objectiveRefs: ["Use bounded context"],
              prerequisites: [],
              startingState: "Ready",
              goal: "Build a verified case file",
              task: "Find the clues",
              constraints: [],
              evidence: ["Case file"],
              safetyCheckpoints: [],
              corePath: ["Complete the core clues"],
              stretchPath: [],
              debrief: ["What changed?"],
              validation: ["Explain the evidence."],
              casePacket: ["Create the repository."],
              starterFile: {
                name: "case-file.md",
                content: "# Case file"
              },
              harnesses: [{
                id: "copilot-cli",
                title: "Copilot CLI",
                description: "Use Copilot in the terminal.",
                instructions: ["Stay in scope."]
              }],
              coreClues: [{
                id: "clue-1",
                title: "First clue",
                points: 10,
                objectiveRef: "Use bounded context",
                scene: "A prompt appears.",
                outcome: "A reviewed diff.",
                actions: ["Inspect the diff."],
                routes: [{ harness: "copilot-cli", instructions: ["Start in the repo root."] }],
                verify: "The diff touches only the named file.",
                evidence: "Recorded evidence",
                hints: ["Start narrow."],
                safetyCheckpoint: "Do not guess policy."
              }],
              bonusClues: [{
                id: "bonus-1",
                title: "Bonus clue",
                points: 10,
                objectiveRef: "Use bounded context",
                scene: "An extra path appears.",
                outcome: "An optional observation.",
                actions: ["Try the optional path."],
                routes: [{ harness: "copilot-cli", instructions: ["Start in the repo root."] }],
                verify: "The observation names the surface you used.",
                evidence: "Optional evidence",
                hints: ["Keep the scope bounded."],
                safetyCheckpoint: "Verify before accepting."
              }],
              completionPoints: 10,
              bonusPointCap: 10,
              carryForward: {
                artifact: "Case file",
                produces: ["Selected gadget"],
                consumes: []
              },
              leaderboard: {
                optional: true,
                aliasOnly: true,
                instructions: ["Share only an alias and score."]
              },
              status: "draft"
            }
          }],
          storyboards: [],
          scenes: [],
          characters: [],
          locations: [],
          complexTopicPlans: []
        }
      ]
    } as ContentCatalog;

    const generated = createPortalCatalog(catalog);
    expect(generated.workshops[0]?.modules[0]?.missions[0]).toMatchObject({
      goal: "Build a verified case file",
      completionPoints: 10,
      bonusPointCap: 10,
      starterFile: {
        name: "case-file.md"
      },
      carryForward: {
        artifact: "Case file"
      }
    });
    expect(generated.workshops[0]?.modules[0]?.missions[0]?.coreClues).toHaveLength(1);
    expect(generated.workshops[0]?.modules[0]?.missions[0]?.harnesses.map((harness) => harness.id)).toEqual(["copilot-cli"]);
  });

  it("expands delivery variants with routes and phase minutes", () => {
    const catalog = {
      workshops: [
        {
          root: "workshops/test",
          workshop: {
            filePath: "workshop.md",
            body: "",
            data: {
              schemaVersion: 1,
              kind: "workshop",
              id: "test",
              title: "Test",
              description: "Test workshop",
              format: "custom",
              duration: "1 hour",
              level: "basic",
              audience: ["Developers"],
              prerequisites: [],
              modules: ["intro"],
              tags: [],
              researchSources: [],
              deliveryVariants: [{
                id: "compact",
                title: "Compact",
                description: "Compact delivery",
                days: [{
                  id: "day-one",
                  title: "Day one",
                  start: "09:00",
                  end: "10:00",
                  agenda: [
                    { id: "content", type: "module-content", title: "Content", start: "09:00", end: "09:30", module: "intro" },
                    { id: "mission", type: "mission", title: "Mission", start: "09:30", end: "10:00", module: "intro" }
                  ]
                }]
              }],
              status: "draft",
              lastReviewed: "2026-08-05"
            }
          },
          modules: [{
            filePath: "module.md",
            body: "",
            data: {
              schemaVersion: 1,
              kind: "module",
              id: "intro",
              title: "Introduction",
              description: "Intro module",
              duration: "1 hour",
              totalMinutes: 60,
              objectives: ["Learn"],
              prerequisites: [],
              sourceDocuments: [],
              slides: "slides.md",
              labs: [],
              missions: [],
              assets: [],
              status: "draft"
            }
          }],
          labs: [],
          missions: [],
          storyboards: [],
          scenes: [],
          characters: [],
          locations: [],
          complexTopicPlans: []
        }
      ]
    } as ContentCatalog;

    const generated = createPortalCatalog(catalog);

    expect(generated.workshops[0]?.route).toBe("workshops/test/");
    expect(generated.workshops[0]?.deliveryVariants[0]).toMatchObject({
      route: "workshops/test/variants/compact/",
      totalMinutes: 60,
      modulePhases: [{ module: "intro", contentMinutes: 30, missionMinutes: 30 }]
    });
  });

  describe("workshop timing", () => {
    it("renders the loop-intro 424-minute run of show with other allocations preserved", async () => {
      const runOfShow = await workshopRunOfShow("ghcp-dev-hack", "09:00");
      expect(runOfShow).toContain("Total: 424 minutes");
      expect(runOfShow).toContain(
        "| GitHub Workshop | 09:15 | 10:32 | 77 | module-content | Foundations: Copilot surfaces, safety, interaction modes, cost, and context | foundations |"
      );
      expect(runOfShow).toContain(
        "| GitHub Workshop | 15:34 | 16:04 | 30 | mission | Mission: Orchestrate, integrate, and debug with evidence | advanced |"
      );
    });
  });
});

describe("workshop leaderboard environments", () => {
  const previousEnvironment = process.env.WORKSHOP_ENVIRONMENT;

  beforeEach(() => {
    delete process.env.WORKSHOP_ENVIRONMENT;
  });

  afterEach(() => {
    if (previousEnvironment === undefined) {
      delete process.env.WORKSHOP_ENVIRONMENT;
    } else {
      process.env.WORKSHOP_ENVIRONMENT = previousEnvironment;
    }
  });

  const environments = {
    test: {
      repository: "mfm-se-dev-org/ghcp-dev-hack-leaderboard",
      submissionUrl: "https://github.com/mfm-se-dev-org/ghcp-dev-hack-leaderboard/issues/new?template=leaderboard-submission.yml",
      standingsUrl: "https://mfm-se-dev-org.github.io/ghcp-dev-hack-leaderboard/"
    },
    production: {
      repository: "tammym-demos/ghcp-dev-hack-leaderboard",
      submissionUrl: "https://github.com/tammym-demos/ghcp-dev-hack-leaderboard/issues/new?template=leaderboard-submission.yml",
      standingsUrl: "https://tammym-demos.github.io/ghcp-dev-hack-leaderboard/"
    }
  };

  const catalog = {
    workshops: [
      {
        root: "workshops/test",
        workshop: {
          filePath: "workshop.md",
          body: "",
          data: {
            schemaVersion: 1,
            kind: "workshop",
            id: "test",
            title: "Test",
            description: "Test workshop",
            format: "custom",
            duration: "1 hour",
            level: "basic",
            audience: ["Developers"],
            prerequisites: [],
            modules: [],
            tags: [],
            researchSources: [],
            status: "draft",
            leaderboard: { optional: true, aliasOnly: true, eventId: "ghcp-dev-hack", environments },
            lastReviewed: "2026-08-11"
          }
        },
        modules: [],
        missions: [],
        labs: [],
        storyboards: [],
        scenes: [],
        characters: [],
        locations: [],
        complexTopicPlans: []
      }
    ]
  } as unknown as ContentCatalog;

  it("selects the test environment by default", () => {
    const generated = createPortalCatalog(catalog);
    expect(generated.environment).toBe("test");
    expect(generated.workshops[0]?.leaderboard).toMatchObject({
      environment: "test",
      repository: environments.test.repository,
      submissionUrl: environments.test.submissionUrl,
      standingsUrl: environments.test.standingsUrl
    });
  });

  it("selects the production environment when requested", () => {
    const generated = createPortalCatalog(catalog, resolveWorkshopEnvironment("production"));
    expect(generated.environment).toBe("production");
    expect(generated.workshops[0]?.leaderboard).toMatchObject({
      environment: "production",
      repository: environments.production.repository,
      standingsUrl: environments.production.standingsUrl
    });
  });

  it("falls back to the test environment for unknown values", () => {
    expect(resolveWorkshopEnvironment("staging")).toBe("test");
    expect(resolveWorkshopEnvironment(undefined)).toBe("test");
  });
});
