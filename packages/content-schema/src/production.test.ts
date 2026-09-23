import { describe, expect, it } from "vitest";
import { effortEvidenceSchema, mediaActionRequestSchema, productionDecisionSchema, workEnvelopeSchema } from "./production.js";

describe("production authority and evidence schemas", () => {
  const image = {
    kind: "generate-image", workshopId: "demo", moduleId: "module", cycleId: "cycle", assetId: "image",
    provider: "gpt-image-2", deployment: "test", endpoint: "https://example.invalid",
    source: "content/source.md", sourceHash: "a".repeat(64), promptHash: "b".repeat(64),
    width: 1024, height: 1024, outputFormat: "png", candidates: 1, variants: 1
  };
  const envelope = {
    schemaVersion: 1,
    id: "test-envelope",
    initiative: "test",
    moduleId: "module",
    cycleId: "cycle",
    status: "active",
    baseline: [{ path: "content/source.md", sha256: "a".repeat(64) }],
    ownedPaths: ["content"],
    gateDecisions: ["scope-decision"],
    actions: [
      { id: "action-one", decisionId: "paid-one", request: { ...image, assetId: "image-one" } },
      { id: "action-two", decisionId: "paid-two", request: { ...image, assetId: "image-two" } }
    ],
    limits: { maxActions: 2, maxProviderCalls: 2, maxCandidates: 2 },
    stopConditions: ["Stop on uncertainty"],
    sampleStatus: "pending",
    expiresAt: "2099-01-01T00:00:00.000Z"
  };
  it("requires media-specific exact inputs and rejects path escapes or unbounded variants", () => {
    expect(mediaActionRequestSchema.parse(image).kind).toBe("generate-image");
    expect(() => mediaActionRequestSchema.parse({ ...image, width: undefined })).toThrow();
    expect(() => mediaActionRequestSchema.parse({ ...image, source: "../outside.md" })).toThrow();
    expect(() => mediaActionRequestSchema.parse({ ...image, variants: 0 })).toThrow();
    expect(() => mediaActionRequestSchema.parse({ ...image, kind: "submit-video", durationSeconds: 5 })).toThrow();
    expect(() => mediaActionRequestSchema.parse({ ...image, kind: "publish-image" })).toThrow();
  });
  it("requires explicit limits, expiration, decisions and stop conditions", () => {
    expect(() => workEnvelopeSchema.parse({ schemaVersion: 1, initiative: "test", actions: [] })).toThrow();
    expect(() => productionDecisionSchema.parse({ id: "approval", decision: "approved", recordedBy: "Human" })).toThrow();
  });
  it("supports an explicit bounded sample batch while preserving a one-sample default", () => {
    expect(workEnvelopeSchema.parse(envelope).limits.sampleBatchSize).toBeUndefined();
    expect(workEnvelopeSchema.parse({
      ...envelope,
      actions: envelope.actions.map(action => ({ ...action, sampleGroup: "image-role" })),
      limits: { ...envelope.limits, sampleBatchSize: 2 }
    }).limits.sampleBatchSize).toBe(2);
    expect(workEnvelopeSchema.parse({
      ...envelope,
      actions: [{ ...envelope.actions[0], sampleGroup: "image-role" }],
      limits: { maxActions: 1, maxProviderCalls: 1, maxCandidates: 1, sampleBatchSize: 1 }
    }).limits.sampleBatchSize).toBe(1);
    expect(() => workEnvelopeSchema.parse({
      ...envelope,
      actions: [envelope.actions[0]],
      limits: { maxActions: 1, maxProviderCalls: 1, maxCandidates: 1, sampleBatchSize: 1 }
    })).toThrow("identify exactly sampleBatchSize actions using sampleGroup");
    expect(() => workEnvelopeSchema.parse({
      ...envelope,
      actions: envelope.actions.map(action => ({ ...action, sampleGroup: "image-role" })),
      limits: { ...envelope.limits, maxProviderCalls: 1, sampleBatchSize: 2 }
    })).toThrow("sampleBatchSize cannot exceed maxProviderCalls");
    expect(() => workEnvelopeSchema.parse({
      ...envelope,
      limits: { ...envelope.limits, sampleBatchSize: 3 }
    })).toThrow("sampleBatchSize cannot exceed maxActions");
    expect(() => workEnvelopeSchema.parse({
      ...envelope,
      limits: { ...envelope.limits, sampleBatchSize: 2 }
    })).toThrow("identify exactly sampleBatchSize actions using sampleGroup");
    const fourActions = Array.from({ length: 4 }, (_, index) => ({
      id: `action-${index}`,
      decisionId: `paid-${index}`,
      sampleGroup: "image-role",
      request: { ...image, assetId: `image-${index}` }
    }));
    expect(() => workEnvelopeSchema.parse({
      ...envelope,
      actions: fourActions,
      limits: { maxActions: 4, maxProviderCalls: 4, maxCandidates: 4, sampleBatchSize: 4 }
    })).toThrow("exceeds three candidates");
    const video = {
      ...image,
      kind: "submit-video",
      assetId: "video-one",
      durationSeconds: 4,
      aspectRatio: "16:9",
      referencePath: "content/reference.png",
      referenceHash: "c".repeat(64)
    };
    expect(() => workEnvelopeSchema.parse({
      ...envelope,
      actions: [{ ...envelope.actions[0], sampleGroup: "video-role", request: video }],
      limits: { maxActions: 1, maxProviderCalls: 1, maxCandidates: 1, sampleBatchSize: 1 }
    })).toThrow("sampleGroup is supported only for generate-image actions");
  });
  it("keeps measurements separate and requires an actual outcome decision", () => {
    const input = { schemaVersion: 1, initiative: "test", baselineHash: "a".repeat(64), phase: "trial", coverage: "Partial" };
    const evidence = effortEvidenceSchema.parse({ ...input, copilotUnits: 1.5, providerCharge: { amount: 0.01, currency: "USD" }, humanWaitSeconds: 60 });
    expect(evidence.model).toBeNull();
    expect(evidence.activeExecutionSeconds).toBeNull();
    expect(evidence.providerCharge?.amount).toBe(0.01);
    expect(evidence.humanWaitSeconds).toBe(60);
    expect(() => effortEvidenceSchema.parse({ ...input, acceptedOutcome: "accepted" })).toThrow();
    expect(() => effortEvidenceSchema.parse({ ...input, inputTokens: -1 })).toThrow();
  });
});
