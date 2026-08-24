import { describe, expect, it } from "vitest";
import {
  missionSchema,
  moduleSchema,
  productionStateSchema,
  releaseManifestSchema,
  workshopSchema
} from "./schemas.js";

describe("workshopSchema", () => {
  it("accepts a valid workshop", () => {
    const result = workshopSchema.safeParse({
      schemaVersion: 1,
      kind: "workshop",
      id: "ghcp-dev-hack",
      title: "GitHub Copilot Developer Hack",
      description: "A hands-on GitHub Copilot workshop.",
      format: "one-day",
      duration: "7 hours",
      level: "mixed",
      audience: ["Software developers"],
      prerequisites: [],
      modules: ["foundations"],
      tags: ["copilot"],
      status: "draft",
      lastReviewed: "2026-07-28"
    });

    expect(result.success).toBe(true);
  });

  it("rejects non-kebab-case ids", () => {
    const result = workshopSchema.safeParse({
      schemaVersion: 1,
      kind: "workshop",
      id: "Invalid ID",
      title: "Workshop",
      description: "Description",
      format: "custom",
      duration: "1 hour",
      level: "basic",
      audience: ["Developers"],
      modules: ["module-one"],
      lastReviewed: "2026-07-28"
    });

    expect(result.success).toBe(false);
  });

  it("requires lifecycle v2 schedule minutes to match the workshop total", () => {
    const result = workshopSchema.safeParse({
      schemaVersion: 1,
      kind: "workshop",
      id: "timed-workshop",
      title: "Timed Workshop",
      lifecycleVersion: 2,
      description: "A timed workshop.",
      format: "custom",
      duration: "1 hour",
      totalMinutes: 60,
      schedule: {
        instructionMinutes: 30,
        missionMinutes: 20,
        discussionMinutes: 0,
        mediaPlaybackMinutes: 0,
        setupAndTransitionsMinutes: 5,
        breaksMinutes: 0,
        contingencyMinutes: 0
      },
      level: "basic",
      audience: ["Developers"],
      modules: ["intro"],
      lastReviewed: "2026-08-04"
    });

    expect(result.success).toBe(false);
  });

  it("accepts contiguous delivery variant days", () => {
    const result = workshopSchema.safeParse({
      schemaVersion: 1,
      kind: "workshop",
      id: "variant-workshop",
      title: "Variant Workshop",
      lifecycleVersion: 2,
      description: "A workshop with selectable delivery.",
      format: "custom",
      duration: "1 day",
      level: "basic",
      audience: ["Developers"],
      modules: ["intro"],
      defaultDeliveryVariant: "one-day",
      deliveryVariants: [
        {
          id: "one-day",
          title: "One day",
          description: "A compact delivery.",
          days: [
            {
              id: "day-one",
              title: "Day one",
              start: "09:00",
              end: "10:30",
              agenda: [
                { id: "kickoff", type: "kickoff", title: "Kickoff", start: "09:00", end: "09:15" },
                {
                  id: "content",
                  type: "module-content",
                  title: "Introduction",
                  start: "09:15",
                  end: "10:00",
                  module: "intro"
                },
                {
                  id: "mission",
                  type: "mission",
                  title: "Practice",
                  start: "10:00",
                  end: "10:30",
                  module: "intro"
                }
              ]
            }
          ]
        }
      ],
      lastReviewed: "2026-08-05"
    });

    expect(result.success).toBe(true);
  });

  it("rejects gaps in delivery variant agendas", () => {
    const result = workshopSchema.safeParse({
      schemaVersion: 1,
      kind: "workshop",
      id: "variant-workshop",
      title: "Variant Workshop",
      description: "A workshop with a schedule gap.",
      format: "custom",
      duration: "1 day",
      level: "basic",
      audience: ["Developers"],
      modules: ["intro"],
      deliveryVariants: [
        {
          id: "one-day",
          title: "One day",
          description: "A compact delivery.",
          days: [
            {
              id: "day-one",
              title: "Day one",
              start: "09:00",
              end: "10:00",
              agenda: [
                { id: "kickoff", type: "kickoff", title: "Kickoff", start: "09:00", end: "09:15" },
                { id: "break", type: "break", title: "Break", start: "09:30", end: "10:00" }
              ]
            }
          ]
        }
      ],
      lastReviewed: "2026-08-05"
    });

    expect(result.success).toBe(false);
  });
});

describe("productionStateSchema", () => {
  const state = {
    schemaVersion: 1,
    kind: "production-state",
    workshop: "test-workshop",
    lifecycleVersion: 2,
    phase: "discovery",
    sessionStatus: "paused",
    activeTracks: [],
    currentInitiative: "workshop-design",
    currentOwner: "Workshop Production Coordinator",
    nextOwner: "Human",
    nextHumanGate: "Content approval",
    resumeTask: "content-review",
    approvedArtifacts: [],
    blockers: [],
    timing: {
      totalMinutes: 60,
      allocatedMinutes: 60,
      source: "content/production/experience-plan.md"
    },
    paidGeneration: "not-approved",
    releaseState: "not-ready",
    branch: "main",
    lastValidatedCommit: "0".repeat(40),
    checkpointId: "checkpoint-initial",
    updatedAt: "2026-08-04T18:00:00.000Z"
  };

  it("requires a reason and timestamp when paused", () => {
    expect(productionStateSchema.safeParse(state).success).toBe(false);
  });

  describe("missionSchema", () => {
    it("accepts an evidence-backed timed mission", () => {
      expect(
        missionSchema.safeParse({
          schemaVersion: 1,
          kind: "mission",
          id: "verify-change",
          title: "Verify the Change",
          module: "foundations",
          durationMinutes: 30,
          objectiveRefs: ["Verify generated changes"],
          startingState: "A repository with a proposed change.",
          task: "Review and verify the change.",
          evidence: ["Passing targeted test"],
          corePath: ["Inspect the diff", "Run the test"],
          debrief: ["What evidence changed your confidence?"],
          validation: ["The participant can explain the verification evidence."],
          status: "draft"
        }).success
      ).toBe(true);
    });

    it("accepts a scored mission with harness routes and progressive hints", () => {
      expect(
        missionSchema.safeParse({
          schemaVersion: 1,
          kind: "mission",
          id: "scavenger-hunt",
          title: "Scavenger Hunt",
          module: "foundations",
          durationMinutes: 45,
          objectiveRefs: ["Use bounded context"],
          startingState: "An approved Copilot harness is available.",
          goal: "Build a verified case file.",
          task: "Find the clues.",
          evidence: ["Completed case file"],
          corePath: ["Complete the core clues"],
          debrief: ["What changed your decision?"],
          validation: ["The participant explains the evidence."],
          casePacket: ["Normalize labels."],
          starterFile: {
            name: "case-file.md",
            content: "# Case file"
          },
          harnesses: [{
            id: "copilot-cli",
            title: "Copilot CLI",
            description: "Use Copilot in the terminal.",
            instructions: ["Start a focused session."]
          }],
          coreClues: [{
            id: "pick-gadget",
            title: "Pick your gadget",
            points: 10,
            objectiveRef: "Use bounded context",
            scene: "Mergewell reaches for a gadget.",
            outcome: "A recorded harness choice.",
            actions: ["Choose the CLI."],
            routes: [{ harness: "copilot-cli", instructions: ["Record the allowed folder."] }],
            verify: "The chosen harness is written down.",
            evidence: "The selected gadget.",
            hints: ["Start with the open tool."],
            safetyCheckpoint: "Do not guess policy."
          }],
          bonusClues: [],
          completionPoints: 10,
          bonusPointCap: 0,
          carryForward: {
            artifact: "Case file",
            produces: ["Selected gadget"]
          },
          leaderboard: {
            optional: true,
            aliasOnly: true,
            instructions: ["Submit only an alias and total."]
          },
          status: "draft"
        }).success
      ).toBe(true);
    });

    it("rejects unknown harness routes and impossible score thresholds", () => {
      const result = missionSchema.safeParse({
        schemaVersion: 1,
        kind: "mission",
        id: "invalid-hunt",
        title: "Invalid Hunt",
        module: "foundations",
        durationMinutes: 45,
        objectiveRefs: ["Use bounded context"],
        startingState: "Ready.",
        task: "Find clues.",
        evidence: ["Case file"],
        corePath: ["Complete clues"],
        debrief: ["What happened?"],
        validation: ["Explain the result."],
        coreClues: [{
          id: "clue",
          title: "Clue",
          points: 5,
          objectiveRef: "Use bounded context",
          scene: "A scene.",
          outcome: "An outcome.",
          actions: ["Act."],
          routes: [{ harness: "missing", instructions: ["Act."] }],
          verify: "A check.",
          evidence: "Evidence.",
          hints: ["Hint."],
          safetyCheckpoint: "Check."
        }],
        completionPoints: 10,
        status: "draft"
      });

      expect(result.success).toBe(false);
    });

    it("accepts an exercise contract with outcome and verify", () => {
      const result = missionSchema.safeParse({
        schemaVersion: 1,
        kind: "mission",
        id: "contract-hunt",
        title: "Contract Hunt",
        module: "foundations",
        durationMinutes: 45,
        objectiveRefs: ["Use bounded context"],
        startingState: "An approved Copilot harness is available.",
        goal: "Build a verified case file.",
        task: "Find the clues.",
        evidence: ["Completed case file"],
        corePath: ["Complete the core clues"],
        debrief: ["What changed your decision?"],
        validation: ["The participant explains the evidence."],
        harnesses: [{
          id: "copilot-cli",
          title: "Copilot CLI",
          description: "Use Copilot in the terminal.",
          instructions: ["Start a focused session."]
        }],
        coreClues: [{
          id: "pick-gadget",
          title: "Pick your gadget",
          points: 10,
          objectiveRef: "Use bounded context",
          scene: "Mergewell reaches for a gadget.",
          outcome: "One saved file naming your harness and allowed context.",
          actions: ["Choose the CLI."],
          routes: [{ harness: "copilot-cli", instructions: ["Record the allowed folder."] }],
          verify: "The file exists and names both the harness and the allowed folder.",
          evidence: "The selected gadget.",
          hints: ["Start with the open tool."],
          safetyCheckpoint: "Do not guess policy."
        }],
        completionPoints: 10,
        carryForward: {
          artifact: "Case file",
          produces: ["Selected gadget"]
        },
        status: "draft"
      });

      expect(result.success).toBe(true);
    });

    it("rejects a clue missing a route for a declared harness", () => {
      const result = missionSchema.safeParse({
        schemaVersion: 1,
        kind: "mission",
        id: "unrouted-hunt",
        title: "Unrouted Hunt",
        module: "foundations",
        durationMinutes: 45,
        objectiveRefs: ["Use bounded context"],
        startingState: "An approved Copilot harness is available.",
        goal: "Build a verified case file.",
        task: "Find the clues.",
        evidence: ["Completed case file"],
        corePath: ["Complete the core clues"],
        debrief: ["What changed your decision?"],
        validation: ["The participant explains the evidence."],
        harnesses: [
          {
            id: "copilot-cli",
            title: "Copilot CLI",
            description: "Use Copilot in the terminal.",
            instructions: ["Start a focused session."]
          },
          {
            id: "copilot-app",
            title: "Copilot app",
            description: "Use the standalone app.",
            instructions: ["Open a new session."]
          }
        ],
        coreClues: [{
          id: "pick-gadget",
          title: "Pick your gadget",
          points: 10,
          objectiveRef: "Use bounded context",
          scene: "Mergewell reaches for a gadget.",
          outcome: "One saved file naming your harness and allowed context.",
          actions: ["Choose the CLI."],
          routes: [{ harness: "copilot-cli", instructions: ["Record the allowed folder."] }],
          verify: "The file exists and names both the harness and the allowed folder.",
          evidence: "The selected gadget.",
          hints: ["Start with the open tool."],
          safetyCheckpoint: "Do not guess policy."
        }],
        completionPoints: 10,
        carryForward: {
          artifact: "Case file",
          produces: ["Selected gadget"]
        },
        status: "draft"
      });

      expect(result.success).toBe(false);
      expect(
        result.success ? [] : result.error.issues.map((issue) => issue.message)
      ).toContainEqual(
        'Mission clue must provide a route for every declared harness; missing "copilot-app"'
      );
    });
  });

  describe("releaseManifestSchema", () => {
    it("does not infer approval from a non-draft status", () => {
      expect(
        releaseManifestSchema.safeParse({
          schemaVersion: 1,
          kind: "release-manifest",
          id: "release-2026-08-04",
          title: "Workshop release",
          status: "approved",
          commit: "0".repeat(40),
          createdAt: "2026-08-04T18:00:00.000Z",
          workshops: [{ id: "test-workshop", modules: ["intro"] }]
        }).success
      ).toBe(false);
    });
  });

  it("accepts a durable paused state", () => {
    expect(
      productionStateSchema.safeParse({
        ...state,
        pausedAt: "2026-08-04T18:00:00.000Z",
        pauseReason: "Dinner break"
      }).success
    ).toBe(true);
  });
});

describe("moduleSchema", () => {
  const module = {
    schemaVersion: 1,
    kind: "module",
    id: "intro",
    title: "Introduction",
    description: "Introductory module.",
    duration: "1 hour",
    objectives: ["Learn the basics"],
    slides: "content/modules/01-intro/slides.md",
    status: "draft"
  };

  it.each(["C:/outside/slides.md", "C:\\outside\\slides.md", "\\\\server\\share\\slides.md", "../slides.md"])(
    "rejects paths outside the workshop root: %s",
    (slides) => {
      expect(moduleSchema.safeParse({ ...module, slides }).success).toBe(false);
    }
  );
});

describe("leaderboard declarations", () => {
  const workshopBase = {
    schemaVersion: 1,
    kind: "workshop",
    id: "ghcp-dev-hack",
    title: "GitHub Copilot Developer Hack",
    description: "A hands-on GitHub Copilot workshop.",
    format: "one-day",
    duration: "7 hours",
    level: "mixed",
    audience: ["Software developers"],
    prerequisites: [],
    modules: ["foundations"],
    tags: ["copilot"],
    status: "draft",
    lastReviewed: "2026-07-28"
  } as const;

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
  } as const;

  it("accepts test and production leaderboard environments", () => {
    const result = workshopSchema.safeParse({
      ...workshopBase,
      leaderboard: { optional: true, aliasOnly: true, eventId: "ghcp-dev-hack", environments }
    });

    expect(result.success).toBe(true);
  });

  it("requires both environments and https URLs", () => {
    expect(workshopSchema.safeParse({
      ...workshopBase,
      leaderboard: { optional: true, aliasOnly: true, eventId: "ghcp-dev-hack", environments: { test: environments.test } }
    }).success).toBe(false);

    expect(workshopSchema.safeParse({
      ...workshopBase,
      leaderboard: {
        optional: true,
        aliasOnly: true,
        eventId: "ghcp-dev-hack",
        environments: {
          ...environments,
          test: { ...environments.test, standingsUrl: "http://example.com/board" }
        }
      }
    }).success).toBe(false);
  });

  it("accepts a mission submission block and rejects an empty step list", () => {
    const mission = {
      schemaVersion: 1,
      kind: "mission",
      id: "context-and-prompts",
      title: "Foundations mission",
      module: "foundations",
      durationMinutes: 45,
      objectiveRefs: ["Objective"],
      startingState: "Ready",
      task: "Complete the clues",
      evidence: ["Case file"],
      corePath: ["Complete the clues"],
      debrief: ["What changed?"],
      validation: ["At least 40 core points"],
      status: "draft",
      leaderboard: {
        optional: true,
        aliasOnly: true,
        instructions: ["Alias only."],
        submission: { moduleOption: "Foundations", steps: ["Choose Foundations"] }
      }
    };

    expect(missionSchema.safeParse(mission).success).toBe(true);
    expect(missionSchema.safeParse({
      ...mission,
      leaderboard: { optional: true, aliasOnly: true, instructions: ["Alias only."], submission: { moduleOption: "Foundations", steps: [] } }
    }).success).toBe(false);
  });
});
