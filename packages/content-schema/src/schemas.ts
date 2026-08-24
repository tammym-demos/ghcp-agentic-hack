import { z } from "zod";

const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase kebab-case id");
const relativePath = z.string().min(1).refine(
  (value) =>
    !value.includes("\\") &&
    !value.startsWith("/") &&
    !/^[a-zA-Z]:/.test(value) &&
    value.split("/").every((segment) => segment !== "." && segment !== ".."),
  {
    message: "Use a forward-slash path relative to the workshop root"
  }
);
const dateString = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.string().date()
);
const dateTimeString = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString() : value),
  z.string().datetime()
);
const researchSource = z.object({
  type: z.enum(["github-changelog", "github-roadmap", "workiq", "other"]),
  title: z.string().min(1),
  url: z.string().url().optional(),
  reviewedAt: dateString,
  notes: z.string().min(1).optional()
});

const baseContent = z.object({
  schemaVersion: z.literal(1),
  id,
  title: z.string().min(1),
  status: z.enum(["draft", "review", "published"]).default("draft")
});

const httpsUrl = z
  .string()
  .url()
  .refine((value) => value.startsWith("https://"), { message: "Use an https URL" });

const leaderboardEnvironment = z.object({
  repository: z
    .string()
    .regex(/^[A-Za-z0-9][A-Za-z0-9._-]*\/[A-Za-z0-9][A-Za-z0-9._-]*$/, "Use an owner/repository reference"),
  submissionUrl: httpsUrl,
  standingsUrl: httpsUrl
});

export const leaderboardEnvironmentSchema = leaderboardEnvironment;

export const workshopLeaderboardSchema = z.object({
  optional: z.literal(true),
  aliasOnly: z.literal(true),
  eventId: id,
  kitPath: relativePath.optional(),
  environments: z.object({
    test: leaderboardEnvironment,
    production: leaderboardEnvironment
  })
});

export const timingBudgetSchema = z.object({
  instructionMinutes: z.number().int().nonnegative(),
  missionMinutes: z.number().int().nonnegative(),
  discussionMinutes: z.number().int().nonnegative(),
  mediaPlaybackMinutes: z.number().int().nonnegative(),
  setupAndTransitionsMinutes: z.number().int().nonnegative(),
  breaksMinutes: z.number().int().nonnegative(),
  contingencyMinutes: z.number().int().nonnegative()
});

const clockTime = z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Use 24-hour HH:mm format");
const agendaBlockType = z.enum([
  "kickoff",
  "module-content",
  "mission",
  "break",
  "lunch",
  "hack",
  "readout-prep",
  "readout"
]);

function clockMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return (hours ?? 0) * 60 + (minutes ?? 0);
}

export const deliveryVariantSchema = z.object({
  id,
  title: z.string().min(1),
  description: z.string().min(1),
  days: z
    .array(
      z
        .object({
          id,
          title: z.string().min(1),
          start: clockTime,
          end: clockTime,
          agenda: z
            .array(
              z.object({
                id,
                type: agendaBlockType,
                title: z.string().min(1),
                start: clockTime,
                end: clockTime,
                module: id.optional()
              })
            )
            .min(1)
        })
        .superRefine((day, context) => {
          if (clockMinutes(day.end) <= clockMinutes(day.start)) {
            context.addIssue({ code: "custom", path: ["end"], message: "Day end must be after day start" });
          }
          const blockIds = new Set<string>();
          day.agenda.forEach((block, index) => {
            if (blockIds.has(block.id)) {
              context.addIssue({ code: "custom", path: ["agenda", index, "id"], message: "Agenda block ids must be unique within a day" });
            }
            blockIds.add(block.id);
            if (clockMinutes(block.end) <= clockMinutes(block.start)) {
              context.addIssue({ code: "custom", path: ["agenda", index, "end"], message: "Agenda block end must be after its start" });
            }
            const requiresModule = block.type === "module-content" || block.type === "mission";
            if (requiresModule && !block.module) {
              context.addIssue({
                code: "custom",
                path: ["agenda", index, "module"],
                message: `${block.type} blocks require a module`
              });
            }
            if (!requiresModule && block.module) {
              context.addIssue({
                code: "custom",
                path: ["agenda", index, "module"],
                message: `${block.type} blocks cannot declare a module`
              });
            }
          });
          if (day.agenda[0]?.start !== day.start) {
            context.addIssue({ code: "custom", path: ["agenda", 0, "start"], message: "The first agenda block must start at the day start" });
          }
          for (let index = 1; index < day.agenda.length; index += 1) {
            if (day.agenda[index]?.start !== day.agenda[index - 1]?.end) {
              context.addIssue({
                code: "custom",
                path: ["agenda", index, "start"],
                message: "Agenda blocks must be contiguous"
              });
            }
          }
          if (day.agenda.at(-1)?.end !== day.end) {
            context.addIssue({
              code: "custom",
              path: ["agenda", day.agenda.length - 1, "end"],
              message: "The last agenda block must end at the day end"
            });
          }
        })
    )
    .min(1)
}).superRefine((variant, context) => {
  const dayIds = new Set<string>();
  variant.days.forEach((day, index) => {
    if (dayIds.has(day.id)) {
      context.addIssue({ code: "custom", path: ["days", index, "id"], message: "Day ids must be unique within a delivery variant" });
    }
    dayIds.add(day.id);
  });
});

export const workshopSchema = baseContent
  .extend({
    kind: z.literal("workshop"),
    lifecycleVersion: z.literal(2).optional(),
    description: z.string().min(1),
    format: z.enum(["one-hour", "one-day", "two-day", "custom"]),
    duration: z.string().min(1),
    totalMinutes: z.number().int().positive().optional(),
    schedule: timingBudgetSchema.optional(),
    defaultDeliveryVariant: id.optional(),
    deliveryVariants: z.array(deliveryVariantSchema).min(1).optional(),
    runOfShow: z
      .array(
        z.object({
          id,
          type: z.enum(["module", "break", "setup", "transition", "contingency"]),
          title: z.string().min(1),
          minutes: z.number().int().positive(),
          module: id.optional()
        })
      )
      .optional(),
    level: z.enum(["basic", "intermediate", "advanced", "mixed"]),
    audience: z.array(z.string().min(1)).min(1),
    prerequisites: z.array(z.string().min(1)).default([]),
    modules: z.array(id).min(1),
    tags: z.array(z.string().min(1)).default([]),
    researchSources: z.array(researchSource).default([]),
    leaderboard: workshopLeaderboardSchema.optional(),
    lastReviewed: dateString
  })
  .superRefine((workshop, context) => {
    if (workshop.deliveryVariants) {
      const variantIds = new Set<string>();
      workshop.deliveryVariants.forEach((variant, index) => {
        if (variantIds.has(variant.id)) {
          context.addIssue({ code: "custom", path: ["deliveryVariants", index, "id"], message: "Delivery variant ids must be unique" });
        }
        variantIds.add(variant.id);
      });
      if (workshop.defaultDeliveryVariant && !variantIds.has(workshop.defaultDeliveryVariant)) {
        context.addIssue({
          code: "custom",
          path: ["defaultDeliveryVariant"],
          message: "defaultDeliveryVariant must reference a declared delivery variant"
        });
      }
    } else if (workshop.defaultDeliveryVariant) {
      context.addIssue({
        code: "custom",
        path: ["defaultDeliveryVariant"],
        message: "defaultDeliveryVariant requires deliveryVariants"
      });
    }

    if (workshop.lifecycleVersion !== 2) return;
    const hasLegacySchedule = workshop.totalMinutes !== undefined && workshop.schedule && workshop.runOfShow;
    if (!hasLegacySchedule && !workshop.deliveryVariants) {
      context.addIssue({
        code: "custom",
        path: ["deliveryVariants"],
        message: "Lifecycle v2 requires either legacy totalMinutes, schedule, and runOfShow or deliveryVariants"
      });
      return;
    }
    if (workshop.schedule && workshop.totalMinutes === undefined) {
      context.addIssue({ code: "custom", path: ["totalMinutes"], message: "A legacy schedule requires totalMinutes" });
    } else if (workshop.schedule && workshop.totalMinutes !== undefined) {
      const scheduledMinutes = Object.values(workshop.schedule).reduce((total, minutes) => total + minutes, 0);
      if (scheduledMinutes !== workshop.totalMinutes) {
        context.addIssue({
          code: "custom",
          path: ["schedule"],
          message: `Scheduled minutes (${scheduledMinutes}) must equal totalMinutes (${workshop.totalMinutes})`
        });
      }
    }
    if (workshop.runOfShow && workshop.totalMinutes === undefined) {
      context.addIssue({ code: "custom", path: ["totalMinutes"], message: "A legacy runOfShow requires totalMinutes" });
    } else if (
      workshop.runOfShow &&
      workshop.totalMinutes !== undefined &&
      workshop.runOfShow.reduce((total, block) => total + block.minutes, 0) !== workshop.totalMinutes
    ) {
      context.addIssue({
        code: "custom",
        path: ["runOfShow"],
        message: "Run-of-show minutes must equal totalMinutes"
      });
    }
    if ((workshop.schedule && !workshop.runOfShow) || (!workshop.schedule && workshop.runOfShow)) {
      context.addIssue({
        code: "custom",
        path: ["schedule"],
        message: "Legacy schedule and runOfShow must be declared together"
      });
    }
  });

export const moduleSchema = baseContent
  .extend({
    kind: z.literal("module"),
    description: z.string().min(1),
    duration: z.string().min(1),
    totalMinutes: z.number().int().positive().optional(),
    timing: timingBudgetSchema.optional(),
    objectives: z.array(z.string().min(1)).min(1),
    prerequisites: z.array(z.string().min(1)).default([]),
    sourceDocuments: z.array(relativePath).default([]),
    slides: relativePath,
    generation: z
      .object({
        expectedSlides: z.number().int().positive(),
        manifest: relativePath,
        imageProvider: z.enum(["gpt-image-2", "flux-2-pro", "mai-image-2.5"]),
        visualStyle: z.string().min(1)
      })
      .optional(),
    labs: z.array(relativePath).default([]),
    missions: z.array(relativePath).default([]),
    assets: z.array(relativePath).default([])
  })
  .superRefine((module, context) => {
    if (!module.timing) return;
    const scheduledMinutes = Object.values(module.timing).reduce((total, minutes) => total + minutes, 0);
    if (module.totalMinutes === undefined) {
      context.addIssue({ code: "custom", path: ["totalMinutes"], message: "A timed module requires totalMinutes" });
    } else if (scheduledMinutes !== module.totalMinutes) {
      context.addIssue({
        code: "custom",
        path: ["timing"],
        message: `Module timing (${scheduledMinutes}) must equal totalMinutes (${module.totalMinutes})`
      });
    }
  });

export const labSchema = baseContent.extend({
  kind: z.literal("lab"),
  duration: z.string().min(1),
  prerequisites: z.array(z.string().min(1)).default([]),
  validation: z.array(z.string().min(1)).min(1),
  external: z
    .object({
      url: z.string().url(),
      owner: z.string().min(1),
      revision: z.string().min(1),
      lastReviewed: dateString
    })
    .optional()
});

const missionHarnessSchema = z.object({
  id,
  title: z.string().min(1),
  description: z.string().min(1),
  instructions: z.array(z.string().min(1)).min(1)
});

const missionRouteSchema = z.object({
  harness: id,
  instructions: z.array(z.string().min(1)).min(1)
});

const missionClueSchema = z.object({
  id,
  title: z.string().min(1),
  points: z.number().int().positive(),
  objectiveRef: z.string().min(1),
  scene: z.string().min(1),
  outcome: z.string().min(1),
  actions: z.array(z.string().min(1)).min(1),
  routes: z.array(missionRouteSchema).default([]),
  verify: z.string().min(1),
  evidence: z.string().min(1),
  hints: z.array(z.string().min(1)).min(1),
  safetyCheckpoint: z.string().min(1)
});

export const missionSchema = baseContent
  .extend({
    kind: z.literal("mission"),
    module: id,
    durationMinutes: z.number().int().positive(),
    objectiveRefs: z.array(z.string().min(1)).min(1),
    prerequisites: z.array(z.string().min(1)).default([]),
    startingState: z.string().min(1),
    goal: z.string().min(1).optional(),
    task: z.string().min(1),
    constraints: z.array(z.string().min(1)).default([]),
    evidence: z.array(z.string().min(1)).min(1),
    safetyCheckpoints: z.array(z.string().min(1)).default([]),
    corePath: z.array(z.string().min(1)).min(1),
    stretchPath: z.array(z.string().min(1)).default([]),
    debrief: z.array(z.string().min(1)).min(1),
    validation: z.array(z.string().min(1)).min(1),
    casePacket: z.array(z.string().min(1)).default([]),
    starterFile: z.object({
      name: z.string().min(1),
      content: z.string().min(1)
    }).optional(),
    harnesses: z.array(missionHarnessSchema).default([]),
    coreClues: z.array(missionClueSchema).default([]),
    bonusClues: z.array(missionClueSchema).default([]),
    completionPoints: z.number().int().positive().optional(),
    bonusPointCap: z.number().int().nonnegative().default(0),
    carryForward: z.object({
      artifact: z.string().min(1),
      produces: z.array(z.string().min(1)).min(1),
      consumes: z.array(z.string().min(1)).default([]),
      fallback: z.string().min(1).optional()
    }).optional(),
    leaderboard: z.object({
      optional: z.literal(true),
      aliasOnly: z.literal(true),
      instructions: z.array(z.string().min(1)).min(1),
      submission: z
        .object({
          moduleOption: z.string().min(1),
          steps: z.array(z.string().min(1)).min(1)
        })
        .optional()
    }).optional()
  })
  .superRefine((mission, context) => {
    const harnessIds = mission.harnesses.map((harness) => harness.id);
    if (new Set(harnessIds).size !== harnessIds.length) {
      context.addIssue({ code: "custom", path: ["harnesses"], message: "Mission harness ids must be unique" });
    }

    const clues = [...mission.coreClues, ...mission.bonusClues];
    const clueIds = clues.map((clue) => clue.id);
    if (new Set(clueIds).size !== clueIds.length) {
      const coreIds = mission.coreClues.map((clue) => clue.id);
      const bonusIds = mission.bonusClues.map((clue) => clue.id);
      const duplicateInCore = new Set(coreIds).size !== coreIds.length;
      const duplicateInBonus = new Set(bonusIds).size !== bonusIds.length;
      const path = duplicateInBonus && !duplicateInCore ? ["bonusClues"] : ["coreClues"];
      context.addIssue({
        code: "custom",
        path,
        message: "Mission clue ids must be unique across coreClues and bonusClues"
      });
    }

    for (const [index, clue] of clues.entries()) {
      const clueSection = index < mission.coreClues.length ? "coreClues" : "bonusClues";
      const clueIndex = index < mission.coreClues.length ? index : index - mission.coreClues.length;

      if (!mission.objectiveRefs.includes(clue.objectiveRef)) {
        context.addIssue({
          code: "custom",
          path: [clueSection, clueIndex, "objectiveRef"],
          message: "Mission clue objectiveRef must match a mission objectiveRef"
        });
      }

      for (const route of clue.routes) {
        if (!harnessIds.includes(route.harness)) {
          context.addIssue({
            code: "custom",
            path: [clueSection, clueIndex, "routes"],
            message: `Mission clue references unknown harness "${route.harness}"`
          });
        }
      }

      const routedHarnessIds = new Set(clue.routes.map((route) => route.harness));
      const missingHarnessIds = harnessIds.filter((harnessId) => !routedHarnessIds.has(harnessId));
      if (missingHarnessIds.length > 0) {
        context.addIssue({
          code: "custom",
          path: [clueSection, clueIndex, "routes"],
          message: `Mission clue must provide a route for every declared harness; missing ${missingHarnessIds
            .map((harnessId) => `"${harnessId}"`)
            .join(", ")}`
        });
      }
    }

    if (mission.coreClues.length > 0) {
      if (!mission.goal) {
        context.addIssue({ code: "custom", path: ["goal"], message: "A scored mission requires a goal" });
      }
      if (mission.harnesses.length === 0) {
        context.addIssue({ code: "custom", path: ["harnesses"], message: "A scored mission requires a harness" });
      }
      if (mission.completionPoints === undefined) {
        context.addIssue({
          code: "custom",
          path: ["completionPoints"],
          message: "A scored mission requires completionPoints"
        });
      }
      if (!mission.carryForward) {
        context.addIssue({
          code: "custom",
          path: ["carryForward"],
          message: "A scored mission requires a carry-forward artifact"
        });
      }
    }

    const corePoints = mission.coreClues.reduce((total, clue) => total + clue.points, 0);
    if (mission.completionPoints !== undefined && mission.completionPoints > corePoints) {
      context.addIssue({
        code: "custom",
        path: ["completionPoints"],
        message: "Mission completionPoints cannot exceed available core clue points"
      });
    }

    const bonusPoints = mission.bonusClues.reduce((total, clue) => total + clue.points, 0);
    if (mission.bonusPointCap > bonusPoints) {
      context.addIssue({
        code: "custom",
        path: ["bonusPointCap"],
        message: "Mission bonusPointCap cannot exceed available bonus clue points"
      });
    }
  });

export const storyboardSchema = baseContent.extend({
  kind: z.literal("storyboard"),
  purpose: z.string().min(1),
  targetDurationSeconds: z.number().int().positive(),
  aspectRatio: z.enum(["16:9", "9:16", "1:1"]),
  characters: z.array(relativePath).default([]),
  scenes: z.array(relativePath).min(1)
});

export const sceneSchema = baseContent.extend({
  kind: z.literal("scene"),
  durationSeconds: z.number().int().positive(),
  narration: z.string().default(""),
  visualDirection: z.string().min(1),
  continuityNotes: z.array(z.string().min(1)).default([])
});

export const characterSchema = baseContent.extend({
  kind: z.literal("character"),
  description: z.string().min(1),
  visualTraits: z.array(z.string().min(1)).min(1),
  continuityRules: z.array(z.string().min(1)).min(1),
  referenceImages: z.array(relativePath).min(1)
});

export const locationSchema = baseContent.extend({
  kind: z.literal("location"),
  description: z.string().min(1),
  visualTraits: z.array(z.string().min(1)).min(1),
  continuityRules: z.array(z.string().min(1)).min(1),
  referenceImages: z.array(relativePath).default([]),
  usedByModules: z.array(id).default([])
});

export const complexTopicPlanSchema = baseContent.extend({
  kind: z.literal("complex-topic-plan"),
  module: id,
  topics: z
    .array(
      z.object({
        id,
        status: z.enum(["candidate", "selected", "approved", "declined"]),
        objectiveRef: z.string().min(1),
        sourceTopic: z.string().min(1),
        slideTitles: z.array(z.string().min(1)).min(2),
        stillAssetIds: z.array(id).min(2),
        videoTeachingPurpose: z.string().min(1),
        estimatedMinutes: z.number().int().positive(),
        summaryDurationSeconds: z.union([z.literal(4), z.literal(8), z.literal(12)]).optional(),
        acceptedKeyframes: z.array(relativePath).default([]),
        acceptanceSignal: z.string().min(1)
      })
    )
    .default([])
});

export const releaseManifestSchema = z
  .object({
    schemaVersion: z.literal(1),
    kind: z.literal("release-manifest"),
    id,
    title: z.string().min(1),
    status: z.enum(["draft", "approved", "deploying", "verified", "rolled-back"]),
    commit: z.string().regex(/^[a-f0-9]{40}$/),
    createdAt: dateTimeString,
    approvedBy: z.string().min(1).optional(),
    approvedAt: dateTimeString.optional(),
    workshops: z
      .array(
        z.object({
          id,
          modules: z.array(id).min(1)
        })
      )
      .min(1),
    deployment: z
      .object({
        url: z.string().url(),
        deployedAt: dateTimeString,
        verifiedAt: dateTimeString.optional()
      })
      .optional()
  })
  .superRefine((release, context) => {
    if (release.status !== "draft" && (!release.approvedBy || !release.approvedAt)) {
      context.addIssue({
        code: "custom",
        path: ["approvedBy"],
        message: "Approved and deployed releases require approvedBy and approvedAt"
      });
    }
    if (release.status === "verified" && !release.deployment?.verifiedAt) {
      context.addIssue({
        code: "custom",
        path: ["deployment", "verifiedAt"],
        message: "Verified releases require deployment verification evidence"
      });
    }
  });

export const productionStateSchema = z
  .object({
    schemaVersion: z.literal(1),
    kind: z.literal("production-state"),
    workshop: id,
    lifecycleVersion: z.literal(2),
    phase: z.enum([
      "idea",
      "discovery",
      "convergence-review",
      "production",
      "integration-review",
      "release-review",
      "deploying",
      "verification",
      "published",
      "cleanup"
    ]),
    sessionStatus: z.enum(["active", "paused", "awaiting-human", "blocked"]),
    activeTracks: z
      .array(
        z.object({
          id,
          type: z.enum(["content", "character-world", "mission-experience", "visual-format", "freshness", "feedback"]),
          status: z.enum(["idea", "exploring", "review-ready", "approved", "superseded", "deferred", "declined"]),
          version: id,
          artifact: relativePath.optional()
        })
      )
      .default([]),
    currentInitiative: id,
    currentOwner: z.string().min(1),
    nextOwner: z.string().min(1),
    nextHumanGate: z.string().min(1),
    resumeTask: id,
    approvedArtifacts: z.array(relativePath).default([]),
    blockers: z.array(z.string().min(1)).default([]),
    timing: z
      .object({
        totalMinutes: z.number().int().positive(),
        allocatedMinutes: z.number().int().nonnegative(),
        source: relativePath
      })
      .refine((timing) => timing.allocatedMinutes <= timing.totalMinutes, {
        message: "allocatedMinutes cannot exceed totalMinutes"
      }),
    paidGeneration: z.enum(["not-approved", "approved-for-listed-actions", "spent", "revoked"]),
    releaseState: z.enum(["not-ready", "local-review", "approved", "deploying", "verification", "published", "rollback"]),
    branch: z.string().min(1),
    lastValidatedCommit: z.string().regex(/^[a-f0-9]{40}$/),
    checkpointId: id,
    updatedAt: dateTimeString,
    pausedAt: dateTimeString.optional(),
    pauseReason: z.string().min(1).optional()
  })
  .superRefine((state, context) => {
    if (state.sessionStatus === "paused" && (!state.pausedAt || !state.pauseReason)) {
      context.addIssue({
        code: "custom",
        path: ["pausedAt"],
        message: "Paused production state requires pausedAt and pauseReason"
      });
    }
  });

export const generatedAssetSchema = z.object({
  schemaVersion: z.literal(1),
  id,
  kind: z.enum(["image", "video"]),
  provider: z.enum(["gpt-image-2", "flux-2-pro", "mai-image-2.5", "sora-2"]),
  deployment: z.string().min(1),
  promptHash: z.string().regex(/^[a-f0-9]{64}$/),
  source: relativePath,
  createdAt: z.string().datetime(),
  reviewStatus: z.enum(["candidate", "approved", "rejected"]),
  location: z.string().min(1),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  durationSeconds: z.number().positive().optional(),
  inputReference: z
    .object({
      path: relativePath,
      hash: z.string().regex(/^[a-f0-9]{64}$/),
      contentType: z.enum(["image/jpeg", "image/png", "image/webp"])
    })
    .optional()
});

export type Workshop = z.infer<typeof workshopSchema>;
export type DeliveryVariant = z.infer<typeof deliveryVariantSchema>;
export type Module = z.infer<typeof moduleSchema>;
export type Lab = z.infer<typeof labSchema>;
export type Mission = z.infer<typeof missionSchema>;
export type Storyboard = z.infer<typeof storyboardSchema>;
export type Scene = z.infer<typeof sceneSchema>;
export type Character = z.infer<typeof characterSchema>;
export type Location = z.infer<typeof locationSchema>;
export type ComplexTopicPlan = z.infer<typeof complexTopicPlanSchema>;
export type ReleaseManifest = z.infer<typeof releaseManifestSchema>;
export type ProductionState = z.infer<typeof productionStateSchema>;
export type GeneratedAsset = z.infer<typeof generatedAssetSchema>;
