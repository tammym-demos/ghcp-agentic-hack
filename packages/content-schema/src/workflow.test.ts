import { describe, expect, it } from "vitest";
import {
  environmentApprovalSchema,
  workflowPolicySchema,
  workshopRequirementsSchema
} from "./workflow.js";

const requirements = {
  schemaVersion: 1,
  kind: "workshop-requirements",
  id: "rapid-workshop",
  title: "Rapid Workshop",
  description: "Build and ship a workshop.",
  audience: ["Developers"],
  durationMinutes: 60,
  outcomes: ["Ship a tested workshop"],
  modules: [
    { id: "foundations", title: "Foundations", minutes: 30, outcomes: ["Explain the workflow"] },
    { id: "practice", title: "Practice", minutes: 30, outcomes: ["Apply the workflow"] }
  ],
  acceptanceCriteria: ["The production routes respond successfully"]
};

const scheduledRequirements = {
  ...requirements,
  durationMinutes: 424,
  modules: [
    { ...requirements.modules[0], minutes: 122 },
    { ...requirements.modules[1], minutes: 122 },
    { id: "advanced", title: "Advanced", minutes: 90, outcomes: ["Integrate verified work"] }
  ],
  runOfShow: [
    { id: "kickoff", type: "setup", title: "Kickoff", minutes: 15 },
    { id: "foundations", type: "module", title: "Foundations", minutes: 122, module: "foundations" },
    { id: "morning-break", type: "break", title: "Break", minutes: 15 },
    { id: "practice", type: "module", title: "Practice", minutes: 122, module: "practice" },
    { id: "lunch", type: "break", title: "Lunch", minutes: 45 },
    { id: "afternoon-break", type: "break", title: "Break", minutes: 15 },
    { id: "advanced", type: "module", title: "Advanced", minutes: 90, module: "advanced" }
  ]
};

describe("workshop requirements", () => {
  it("accepts a timed brief and defaults optional workflow fields", () => {
    const parsed = workshopRequirementsSchema.parse(requirements);
    expect(parsed.modules.map((module) => module.id)).toEqual(["foundations", "practice"]);
    expect(parsed.imageRoles).toEqual([]);
  });

  it("rejects duplicate modules, timing drift, and unknown image-role modules", () => {
    expect(() => workshopRequirementsSchema.parse({
      ...requirements,
      durationMinutes: 45,
      modules: [requirements.modules[0], requirements.modules[0]],
      imageRoles: [{ id: "hero", module: "missing", purpose: "Set the scene" }]
    })).toThrow();
  });

  it("accounts for 334 module minutes, 15 kickoff minutes, and 75 break minutes", () => {
    const parsed = workshopRequirementsSchema.parse(scheduledRequirements);
    expect(parsed.durationMinutes).toBe(424);
    expect(parsed.modules.reduce((total, module) => total + module.minutes, 0)).toBe(334);
    expect(parsed.runOfShow).toEqual(scheduledRequirements.runOfShow);
  });

  it("accepts split module blocks whose minutes sum to the module budget", () => {
    const parsed = workshopRequirementsSchema.parse({
      ...scheduledRequirements,
      runOfShow: scheduledRequirements.runOfShow.flatMap((block) =>
        block.id === "foundations" ? [
          { ...block, id: "foundations-content", minutes: 77 },
          { ...block, id: "foundations-mission", minutes: 45 }
        ] : [block])
    });
    expect(parsed.runOfShow?.filter((block) => block.module === "foundations")).toHaveLength(2);
  });

  it("rejects run-of-show timing drift and per-module reallocations", () => {
    expect(() => workshopRequirementsSchema.parse({
      ...scheduledRequirements,
      durationMinutes: 425
    })).toThrow("Run-of-show minutes");
    expect(() => workshopRequirementsSchema.parse({
      ...scheduledRequirements,
      runOfShow: scheduledRequirements.runOfShow.map((block) => ({
        ...block,
        minutes: block.id === "foundations" ? 121 : block.id === "practice" ? 123 : block.minutes
      }))
    })).toThrow("must equal its module budget");
  });

  it("rejects invalid run-of-show references, missing modules, and duplicate ids", () => {
    expect(() => workshopRequirementsSchema.parse({
      ...scheduledRequirements,
      runOfShow: scheduledRequirements.runOfShow.map((block) =>
        block.id === "foundations" ? { ...block, module: "missing" } : block)
    })).toThrow("must reference a declared module");
    expect(() => workshopRequirementsSchema.parse({
      ...scheduledRequirements,
      runOfShow: scheduledRequirements.runOfShow.map((block) =>
        block.id === "kickoff" ? { ...block, module: "foundations" } : block)
    })).toThrow("Non-module blocks cannot reference a module");
    expect(() => workshopRequirementsSchema.parse({
      ...scheduledRequirements,
      runOfShow: scheduledRequirements.runOfShow.map((block) =>
        block.id === "foundations" ? { ...block, type: "break", module: undefined } : block)
    })).toThrow("must equal its module budget");
    expect(() => workshopRequirementsSchema.parse({
      ...scheduledRequirements,
      runOfShow: scheduledRequirements.runOfShow.map((block) =>
        block.id === "afternoon-break" ? { ...block, id: "morning-break" } : block)
    })).toThrow("block ids must be unique");
  });

  it("requires image reference paths and hashes to be declared together", () => {
    const request = {
      provider: "gpt-image-2",
      deployment: "test",
      endpoint: "https://example.invalid",
      source: "content/source.md",
      sourceHash: "a".repeat(64),
      promptHashes: ["b".repeat(64)],
      width: 1024,
      height: 1024,
      outputFormat: "png"
    };
    const role = {
      id: "hero",
      module: "foundations",
      purpose: "Set the scene"
    };
    expect(workshopRequirementsSchema.safeParse({
      ...requirements,
      imageRoles: [{ ...role, request: { ...request, referencePath: "content/reference.png" } }]
    }).success).toBe(false);
    expect(workshopRequirementsSchema.safeParse({
      ...requirements,
      imageRoles: [{ ...role, request: { ...request, referenceHash: "c".repeat(64) } }]
    }).success).toBe(false);
    expect(workshopRequirementsSchema.safeParse({
      ...requirements,
      imageRoles: [{
        ...role,
        request: {
          ...request,
          referencePath: "content/reference.png",
          referenceHash: "c".repeat(64)
        }
      }]
    }).success).toBe(true);
  });
});

describe("workflow policy and approvals", () => {
  it("enforces a positive bounded image batch limit", () => {
    expect(workflowPolicySchema.parse({
      schemaVersion: 1,
      imageGeneration: { maxCandidatesPerBatch: 3 }
    }).imageGeneration.maxCandidatesPerBatch).toBe(3);
    expect(() => workflowPolicySchema.parse({
      schemaVersion: 1,
      imageGeneration: { maxCandidatesPerBatch: 0 }
    })).toThrow();
    expect(() => workflowPolicySchema.parse({
      schemaVersion: 1,
      imageGeneration: { maxCandidatesPerBatch: 4 }
    })).toThrow();
  });

  it("requires a URL only for test approval", () => {
    const base = {
      schemaVersion: 1,
      kind: "environment-approval",
      workshop: "rapid-workshop",
      requirementsHash: "a".repeat(64),
      commit: "b".repeat(40),
      approvedBy: "Owner",
      approvedAt: "2026-10-02T12:00:00.000Z",
      modules: ["foundations"]
    };
    expect(environmentApprovalSchema.safeParse({ ...base, environment: "local" }).success).toBe(true);
    expect(environmentApprovalSchema.safeParse({ ...base, environment: "test" }).success).toBe(false);
  });
});
