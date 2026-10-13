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
