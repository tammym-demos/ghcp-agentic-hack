import { describe, expect, it } from "vitest";
import { effortEvidenceSchema, mediaActionRequestSchema, productionDecisionSchema, workEnvelopeSchema } from "./production.js";

describe("production authority and evidence schemas", () => {
  const image = {
    kind: "generate-image", workshopId: "demo", moduleId: "module", cycleId: "cycle", assetId: "image",
    provider: "gpt-image-2", deployment: "test", endpoint: "https://example.invalid",
    source: "content/source.md", sourceHash: "a".repeat(64), promptHash: "b".repeat(64),
    width: 1024, height: 1024, outputFormat: "png", candidates: 1, variants: 1
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
