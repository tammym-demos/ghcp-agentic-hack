import { z } from "zod";

const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const localPath = z.string().min(1).refine(value =>
  !value.includes("\\") && !value.startsWith("/") && !value.includes(":") &&
  value.split("/").every(part => part !== "." && part !== ".." && part !== ""));

export const productionDecisionSchema = z.object({
  id,
  initiative: id,
  supersedes: id.optional(),
  gate: z.enum(["scope", "contract", "content", "concept", "story", "look", "paid-action", "candidate", "publication", "mission", "integration", "local-release-candidate", "release", "deployment-verification", "feedback-outcome"]),
  decision: z.enum(["approved", "not-applicable", "declined", "revoked"]),
  baselineHash: hash,
  requestHash: hash.optional(),
  envelopeHash: hash.optional(),
  viewedArtifactHashes: z.array(hash).optional(),
  recordedBy: z.string().min(1),
  recordedAt: z.string().datetime(),
  rationale: z.string().min(1)
}).strict();

// This is the exact request identity, not a free-form permission description.
export const mediaActionRequestSchema = z.object({
  kind: z.enum(["generate-image", "submit-video", "accept-image", "accept-video", "publish-image", "publish-video"]),
  workshopId: id,
  moduleId: id,
  cycleId: id,
  assetId: id,
  provider: z.string().min(1),
  deployment: z.string().min(1),
  endpoint: z.string().min(1).optional(),
  source: localPath,
  sourceHash: hash,
  promptHash: hash,
  referencePath: localPath.optional(),
  referenceHash: hash.optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  durationSeconds: z.union([z.literal(4), z.literal(8), z.literal(12)]).optional(),
  aspectRatio: z.enum(["16:9", "9:16", "1:1"]).optional(),
  outputFormat: z.enum(["png", "jpeg"]).optional(),
  candidateHash: hash.optional(),
  manifestHash: hash.optional(),
  target: z.string().min(1).optional(),
  candidates: z.literal(1),
  variants: z.literal(1)
}).strict().superRefine((request, ctx) => {
  const required = request.kind === "generate-image"
    ? ["width", "height", "outputFormat", "endpoint"]
    : request.kind === "submit-video"
      ? ["durationSeconds", "aspectRatio", "endpoint"]
      : ["candidateHash", "manifestHash"];
  if (request.kind.startsWith("publish-")) required.push("target");
  for (const key of required) {
    if (request[key as keyof typeof request] === undefined) {
      ctx.addIssue({ code: "custom", path: [key], message: `Required for ${request.kind}` });
    }
  }
  if (Boolean(request.referencePath) !== Boolean(request.referenceHash)) {
    ctx.addIssue({ code: "custom", path: ["referenceHash"], message: "Reference path and hash must be paired" });
  }
});

export const workEnvelopeSchema = z.object({
  schemaVersion: z.literal(1),
  id,
  initiative: id,
  moduleId: id,
  cycleId: id,
  status: z.enum(["active", "revoked", "stopped"]),
  baseline: z.array(z.object({ path: localPath, sha256: hash }).strict()).min(1),
  ownedPaths: z.array(localPath).min(1),
  gateDecisions: z.array(id).min(1),
  actions: z.array(z.object({
    id,
    decisionId: id,
    request: mediaActionRequestSchema
  }).strict()).min(1),
  limits: z.object({
    maxActions: z.number().int().positive(),
    maxProviderCalls: z.number().int().nonnegative(),
    maxCandidates: z.number().int().nonnegative()
  }).strict(),
  stopConditions: z.array(z.string().min(1)).min(1),
  sampleStatus: z.enum(["pending", "passed", "failed"]),
  expiresAt: z.string().datetime()
}).strict().superRefine((envelope, ctx) => {
  for (const [field, values] of [
    ["actions", envelope.actions.map(action => action.id)],
    ["baseline", envelope.baseline.map(file => file.path)],
    ["gateDecisions", envelope.gateDecisions]
  ] as const) {
    if (new Set(values).size !== values.length) {
      ctx.addIssue({ code: "custom", path: [field], message: "Duplicate identifiers are ambiguous" });
    }
  }
});

export type ProductionDecision = z.infer<typeof productionDecisionSchema>;
export type MediaActionRequest = z.infer<typeof mediaActionRequestSchema>;
export type WorkEnvelope = z.infer<typeof workEnvelopeSchema>;

const measurement = z.number().nonnegative().nullable().default(null);
export const effortEvidenceSchema = z.object({
  schemaVersion: z.literal(1),
  initiative: id,
  baselineHash: hash,
  phase: z.string().min(1),
  actionId: id.optional(),
  model: z.string().min(1).nullable().default(null),
  usageSource: z.string().min(1).nullable().default(null),
  copilotUnits: measurement,
  inputTokens: measurement,
  outputTokens: measurement,
  cacheReadTokens: measurement,
  cacheWriteTokens: measurement,
  providerCharge: z.object({ amount: z.number().nonnegative(), currency: z.string().min(1) }).strict().nullable().default(null),
  handoffs: measurement,
  revisions: measurement,
  providerCalls: measurement,
  failedAttempts: measurement,
  activeExecutionSeconds: measurement,
  humanWaitSeconds: measurement,
  firstReviewableArtifactSeconds: measurement,
  reusedArtifacts: z.array(localPath).nullable().default(null),
  acceptedOutcome: z.enum(["pending", "accepted", "rejected"]).default("pending"),
  outcomeDecisionId: id.optional(),
  coverage: z.string().min(1)
}).strict().superRefine((evidence, ctx) => {
  if (evidence.acceptedOutcome !== "pending" && !evidence.outcomeDecisionId) {
    ctx.addIssue({ code: "custom", path: ["outcomeDecisionId"], message: "A decided outcome needs the actual human decision reference" });
  }
});

export const reviewPacketSchema = z.object({
  schemaVersion: z.literal(1),
  workshopId: id,
  initiative: id,
  baselineHash: hash,
  explanation: z.string().min(1),
  risks: z.array(z.string().min(1)),
  stopState: z.string().min(1),
  decisions: z.array(z.object({
    id, question: z.string().min(1), prerequisiteDecisionIds: z.array(id)
  }).strict()).min(1),
  artifacts: z.array(z.object({
    path: localPath, sha256: hash,
    kind: z.enum(["image", "video", "document"]),
    caption: z.string().min(1)
  }).strict()).min(1),
  effort: effortEvidenceSchema,
  channel: z.object({
    intendedPrivateUrl: z.string().url().optional(),
    access: z.enum(["unverified", "owner-verified"]).default("unverified"),
    verifiedBy: z.string().min(1).optional(),
    verifiedAt: z.string().datetime().optional(),
    viewedArtifactHashes: z.array(hash).optional(),
    notification: z.enum(["unknown", "owner-confirmed"]).default("unknown")
  }).strict()
}).strict().superRefine((packet, ctx) => {
  if (packet.effort.initiative !== packet.initiative || packet.effort.baselineHash !== packet.baselineHash) {
    ctx.addIssue({ code: "custom", path: ["effort"], message: "Effort scope must match the reviewed initiative/baseline" });
  }
  if (packet.channel.access === "owner-verified" && (!packet.channel.verifiedBy || !packet.channel.verifiedAt ||
      !packet.channel.intendedPrivateUrl || !packet.artifacts.every(artifact => packet.channel.viewedArtifactHashes?.includes(artifact.sha256)))) {
    ctx.addIssue({ code: "custom", path: ["channel"], message: "Private access needs explicit owner confirmation of the exact viewed artifacts" });
  }
});
