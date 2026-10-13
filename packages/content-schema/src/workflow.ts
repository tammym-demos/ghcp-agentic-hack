import { z } from "zod";

const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const relativePath = z.string().min(1).refine((value) =>
  !value.includes("\\") &&
  !value.startsWith("/") &&
  !value.includes(":") &&
  value.split("/").every((part) => part !== "." && part !== ".." && part !== "")
);

export const workshopRequirementsSchema = z.object({
  schemaVersion: z.literal(1),
  kind: z.literal("workshop-requirements"),
  id,
  title: z.string().min(1),
  description: z.string().min(1),
  audience: z.array(z.string().min(1)).min(1),
  level: z.enum(["basic", "intermediate", "advanced", "mixed"]).default("mixed"),
  format: z.enum(["one-hour", "one-day", "two-day", "custom"]).default("custom"),
  durationMinutes: z.number().int().positive(),
  outcomes: z.array(z.string().min(1)).min(1),
  modules: z.array(z.object({
    id,
    title: z.string().min(1),
    minutes: z.number().int().positive(),
    outcomes: z.array(z.string().min(1)).min(1)
  }).strict()).min(1),
  sources: z.array(relativePath).default([]),
  characterWorld: relativePath.optional(),
  visualStyle: z.string().min(1).optional(),
  imageRoles: z.array(z.object({
    id,
    module: id,
    purpose: z.string().min(1),
    request: z.object({
      provider: z.string().min(1),
      deployment: z.string().min(1),
      endpoint: z.string().url(),
      source: relativePath,
      sourceHash: hash,
      promptHashes: z.array(hash).min(1),
      referencePath: relativePath.optional(),
      referenceHash: hash.optional(),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      outputFormat: z.enum(["png", "jpeg"])
    }).strict()
  }).strict()).default([]),
  exclusions: z.array(z.string().min(1)).default([]),
  acceptanceCriteria: z.array(z.string().min(1)).min(1)
}).strict().superRefine((requirements, context) => {
  const moduleIds = requirements.modules.map((module) => module.id);
  if (new Set(moduleIds).size !== moduleIds.length) {
    context.addIssue({
      code: "custom",
      path: ["modules"],
      message: "Module ids must be unique"
    });
  }
  const allocated = requirements.modules.reduce((total, module) => total + module.minutes, 0);
  if (allocated !== requirements.durationMinutes) {
    context.addIssue({
      code: "custom",
      path: ["durationMinutes"],
      message: `Module minutes (${allocated}) must equal durationMinutes (${requirements.durationMinutes})`
    });
  }
  for (const [index, role] of requirements.imageRoles.entries()) {
    if (Boolean(role.request.referencePath) !== Boolean(role.request.referenceHash)) {
      context.addIssue({
        code: "custom",
        path: ["imageRoles", index, "request", "referenceHash"],
        message: "Reference path and hash must be paired"
      });
    }
    if (!moduleIds.includes(role.module)) {
      context.addIssue({
        code: "custom",
        path: ["imageRoles", index, "module"],
        message: `Image role references unknown module "${role.module}"`
      });
    }
  }
});

export const workflowPolicySchema = z.object({
  schemaVersion: z.literal(1),
  imageGeneration: z.object({
    maxCandidatesPerBatch: z.number().int().min(1).max(3)
  }).strict()
}).strict();

export const environmentApprovalSchema = z.object({
  schemaVersion: z.literal(1),
  kind: z.literal("environment-approval"),
  workshop: id,
  environment: z.enum(["local", "test"]),
  requirementsHash: hash,
  commit: z.string().regex(/^[a-f0-9]{40}$/),
  approvedBy: z.string().min(1),
  approvedAt: z.string().datetime(),
  url: z.string().url().optional(),
  modules: z.array(id).min(1)
}).strict().superRefine((approval, context) => {
  if (approval.environment === "test" && !approval.url) {
    context.addIssue({
      code: "custom",
      path: ["url"],
      message: "Test approval requires the reviewed private test URL"
    });
  }
});

export type WorkshopRequirements = z.infer<typeof workshopRequirementsSchema>;
export type WorkflowPolicy = z.infer<typeof workflowPolicySchema>;
export type EnvironmentApproval = z.infer<typeof environmentApprovalSchema>;
