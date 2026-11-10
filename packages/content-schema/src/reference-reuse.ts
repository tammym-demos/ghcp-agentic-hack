import { z } from "zod";
import { mediaActionRequestSchema } from "./production.js";
import { generatedAssetSchema } from "./schemas.js";

const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const relativePath = z.string().min(1).refine(value =>
  !value.includes("\\") && !value.startsWith("/") && !value.includes(":") &&
  value.split("/").every(part => part !== "." && part !== ".." && part !== ""));
const coordinate = z.number().int().nonnegative();

export const referenceSheetReuseSchema = z.object({
  schemaVersion: z.literal(1),
  kind: z.literal("confirmed-reference-sheet-reuse"),
  workshop: id,
  module: id,
  excludedRoles: z.array(id).default([]),
  views: z.array(z.object({
    assetId: id,
    requestHash: hash,
    sourceRequirementsHash: hash,
    receiptSha256: hash,
    candidateSha256: hash,
    candidateManifestSha256: hash,
    isolationSha256: hash,
    evidenceSha256: hash,
    evidencePath: relativePath,
    sourcePath: relativePath,
    crop: z.tuple([coordinate, coordinate, coordinate, coordinate]),
    isolationNote: z.string().min(1).optional(),
    alphaRemovalPolygon: z.array(z.tuple([coordinate, coordinate])).min(3).optional()
  }).strict()).min(1),
  sheets: z.array(z.object({
    id,
    location: relativePath,
    svgSha256: hash,
    previewSha256: hash,
    views: z.array(id).min(1)
  }).strict()).min(1)
}).strict().superRefine((manifest, context) => {
  const views = new Set<string>();
  const paths = new Set<string>();
  const excluded = new Set(manifest.excludedRoles);
  if (excluded.size !== manifest.excludedRoles.length) {
    context.addIssue({ code: "custom", path: ["excludedRoles"], message: "Excluded roles must be unique" });
  }
  for (const [index, view] of manifest.views.entries()) {
    if (views.has(view.assetId) || excluded.has(view.assetId)) {
      context.addIssue({ code: "custom", path: ["views", index, "assetId"], message: "View ids must be unique and not excluded" });
    }
    views.add(view.assetId);
    if (view.crop[0] >= view.crop[2] || view.crop[1] >= view.crop[3]) {
      context.addIssue({ code: "custom", path: ["views", index, "crop"], message: "Crop must have positive area" });
    }
    for (const target of [view.sourcePath, view.evidencePath]) {
      if (paths.has(target.toLowerCase())) {
        context.addIssue({ code: "custom", path: ["views", index], message: "Output paths must be unique" });
      }
      paths.add(target.toLowerCase());
    }
  }
  const sheetIds = new Set<string>();
  const assigned = new Set<string>();
  for (const [index, sheet] of manifest.sheets.entries()) {
    if (sheetIds.has(sheet.id)) {
      context.addIssue({ code: "custom", path: ["sheets", index, "id"], message: "Sheet ids must be unique" });
    }
    sheetIds.add(sheet.id);
    if (paths.has(sheet.location.toLowerCase())) {
      context.addIssue({ code: "custom", path: ["sheets", index, "location"], message: "Output paths must be unique" });
    }
    paths.add(sheet.location.toLowerCase());
    for (const view of sheet.views) {
      if (!views.has(view) || assigned.has(view)) {
        context.addIssue({ code: "custom", path: ["sheets", index, "views"], message: "Each declared view must occur in exactly one sheet" });
      }
      assigned.add(view);
    }
  }
  if (assigned.size !== views.size) {
    context.addIssue({ code: "custom", path: ["sheets"], message: "Every declared view must occur in a sheet" });
  }
});

export const referenceSheetReusePlanSchema = z.object({
  schemaVersion: z.literal(1),
  kind: z.literal("local-reference-sheet-reuse-plan"),
  views: z.array(z.object({ assetId: id, manifestPath: relativePath, isolationPath: relativePath }).strict()).min(1),
  sheets: z.array(z.object({ id, svgPath: relativePath, previewPath: relativePath }).strict()).min(1)
}).strict();

const standingAuthorization = z.object({
  initiative: id,
  envelopeId: id,
  envelopeHash: hash,
  decisionId: z.literal("standing-image-policy"),
  requestHash: hash
}).strict();

export const reusableCandidateSchema = generatedAssetSchema.extend({
  kind: z.literal("image"),
  reviewStatus: z.literal("candidate"),
  prompt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  generationAuthorization: standingAuthorization
}).strict();

const receiptBase = z.object({
  schemaVersion: z.literal(1),
  authority: z.literal("lifecycle-v3-image-batch"),
  authorityHash: hash,
  requirementsHash: hash,
  request: mediaActionRequestSchema,
  requestHash: hash,
  status: z.literal("succeeded"),
  reservedAt: z.string().datetime(),
  completedAt: z.string().datetime()
});

export const succeededImageReceiptSchema = receiptBase.extend({
  output: z.object({
    manifestHash: hash,
    candidateHash: hash,
    manifestPath: z.string().min(1),
    candidatePath: z.string().min(1)
  }).strict()
}).strict();

export const portableImageEvidenceSchema = z.object({
  schemaVersion: z.literal(1),
  kind: z.literal("portable-confirmed-image-evidence"),
  originalReceiptSha256: hash,
  originalManifestSha256: hash,
  candidate: reusableCandidateSchema.omit({ location: true }),
  receipt: receiptBase.extend({
    output: z.object({ manifestHash: hash, candidateHash: hash }).strict()
  }).strict()
}).strict();

export const referenceSheetSidecarSchema = z.object({
  schemaVersion: z.literal(1),
  kind: z.literal("confirmed-reference-sheet"),
  id,
  source: relativePath,
  sourceSha256: hash,
  location: relativePath,
  sha256: hash,
  integratedUnder: z.object({
    authority: z.literal("lifecycle-v3-local-draft"),
    requirementsHash: hash
  }).strict()
}).strict();

export const referenceSheetReleaseSidecarSchema = z.object({
  schemaVersion: z.literal(1),
  kind: z.literal("confirmed-reference-sheet-release"),
  id,
  location: relativePath,
  sha256: hash,
  sourceManifestSha256: hash,
  views: z.array(z.object({
    assetId: id,
    isolationSha256: hash,
    crop: z.tuple([coordinate, coordinate, coordinate, coordinate])
  }).strict()).min(1),
  integratedUnder: z.object({
    authority: z.literal("lifecycle-v3-local-draft"),
    requirementsHash: hash
  }).strict(),
  evidence: z.literal("Source evidence is retained in the private source repository and is not included in the deployed site.")
}).strict().superRefine((sheet, context) => {
  const views = new Set<string>();
  for (const [index, view] of sheet.views.entries()) {
    if (views.has(view.assetId) || view.crop[0] >= view.crop[2] || view.crop[1] >= view.crop[3]) {
      context.addIssue({ code: "custom", path: ["views", index], message: "Release views need unique ids and positive crops" });
    }
    views.add(view.assetId);
  }
});

export type ReferenceSheetReuse = z.infer<typeof referenceSheetReuseSchema>;
export type ReferenceSheetReusePlan = z.infer<typeof referenceSheetReusePlanSchema>;
export type PortableImageEvidence = z.infer<typeof portableImageEvidenceSchema>;
