#!/usr/bin/env node
import { existsSync } from "node:fs";
import path from "node:path";
import { loadEnvFile } from "node:process";
import { Command } from "commander";
import { loadCatalog } from "@ghcp/content-schema";
import { buildSite } from "./build.js";
import { generatePortalCatalog } from "./catalog.js";
import {
  generateImageCandidate,
  acceptCandidate,
  candidateRequest,
  promoteImage,
  publishVideo,
  downloadVideo,
  refreshVideoStatus,
  submitVideo,
  validateApprovedImageSidecars
} from "./assets.js";
import { repositoryRoot } from "./paths.js";
import {
  scaffoldCharacter,
  scaffoldLab,
  scaffoldLocation,
  scaffoldMission,
  scaffoldModule,
  scaffoldStoryboard,
  scaffoldWorkshop
} from "./scaffold.js";
import { compileStoryboardPrompt } from "./storyboard.js";
import { readFile } from "node:fs/promises";
import { recordProductionDecision, localFile } from "./production-records.js";
import { writeReviewPacket } from "./review-evidence.js";
import { describeEnvelope } from "./authorization.js";
import { publishLeaderboard } from "./leaderboard.js";
import {
  checkpointWorkshop,
  pauseWorkshop,
  resumeWorkshop,
  validateLifecycleState,
  workshopRunOfShow,
  workshopContext,
  workshopStatus
} from "./lifecycle.js";
import {
  FoundryRequestError,
  imageProviderNames,
  type ImageProviderName
} from "@ghcp/foundry-providers";
import {
  approveRelease,
  dispatchPublicPromotion,
  filterCatalogForRelease,
  exportPublicRelease,
  loadReleaseManifest,
  prepareRelease,
  recordReleaseDeployment,
  recordReleaseVerification,
  resolveLatestApprovedManifest,
  resolveLatestManifest,
  validateApprovedRelease,
  validateRollbackTarget,
  verifyReleaseRoutes
} from "./release.js";

const envFile = path.join(repositoryRoot, ".env");
if (existsSync(envFile)) loadEnvFile(envFile);

const program = new Command();
program.name("content").description("Author, validate, generate, and build workshop content");

program.command("record-decision")
  .argument("<workshop-id>").argument("<decision-json>")
  .description("Record an explicit human decision already made; never creates consent or verifies identity")
  .action(async (workshopId, input) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(workshopId)) throw new Error("Invalid workshop id");
    const value = JSON.parse(await readFile(await localFile(repositoryRoot, input.replace(/\\+/g, "/")), "utf8"));
    console.log(JSON.stringify(await recordProductionDecision(path.join(repositoryRoot, "workshops", workshopId), value), null, 2));
  });

program.command("review-packet")
  .argument("<evidence-json>").requiredOption("--out <path>")
  .description("Render a local self-contained private review packet; no upload or acceptance")
  .action(async (input, options) => console.log(await writeReviewPacket(input, options.out)));

program.command("inspect-envelope")
  .argument("<workshop-id>").option("--path <workshop-relative-path>")
  .description("Print envelope, baseline and request fingerprints without approving or executing")
  .action(async (workshopId, options) => console.log(JSON.stringify(await describeEnvelope(workshopId, options.path), null, 2)));

program
  .command("validate")
  .description("Validate all workshop content and references")
  .action(async () => {
    const catalog = await loadCatalog(repositoryRoot);
    const approvedImages = await validateApprovedImageSidecars();
    const lifecycleIssues = await validateLifecycleState(
      catalog.workshops.map((entry) => entry.workshop.data.id)
    );
    for (const issue of lifecycleIssues.filter((entry) => entry.severity === "warning")) {
      console.warn(`Lifecycle warning (${issue.workshopId}): ${issue.message}`);
    }
    const lifecycleErrors = lifecycleIssues.filter((entry) => entry.severity === "error");
    if (lifecycleErrors.length > 0) {
      const detail = lifecycleErrors.map((issue) => `- ${issue.workshopId}: ${issue.message}`).join("\n");
      throw new Error(`Lifecycle state validation failed:\n${detail}`);
    }
    console.log(`Validated ${catalog.workshops.length} workshop(s) and ${approvedImages} approved image(s).`);
  });

program
  .command("catalog")
  .description("Generate the landing-page catalog")
  .action(async () => {
    await generatePortalCatalog();
    console.log("Generated the portal catalog.");
  });

program
  .command("build")
  .description("Build the landing page and all workshop decks")
  .option("--release-manifest <path>", "Build only the approved portfolio release")
  .action(async (options) => {
    await buildSite(options.releaseManifest);
    console.log("Built the workshop site.");
  });

program
  .command("status")
  .argument("<workshop-id>")
  .option("--context", "Read-only scoped context as JSON; never infers approvals")
  .option("--initiative <id>", "Inspect an exact ledger initiative (implies --context)")
  .description("Show durable workshop lifecycle and resume state")
  .action(async (workshopId, options) => console.log(options.context || options.initiative
    ? JSON.stringify(await workshopContext(workshopId, options.initiative), null, 2)
    : await workshopStatus(workshopId)));

program
  .command("pause")
  .argument("<workshop-id>")
  .requiredOption("--reason <reason>")
  .description("Pause workshop work at its recorded resume task")
  .action(async (workshopId, options) => {
    await pauseWorkshop(workshopId, options.reason);
    console.log(await workshopStatus(workshopId));
  });

program
  .command("resume")
  .argument("<workshop-id>")
  .option("--check-only", "Verify recovery without clearing an existing pause")
  .description("Verify the durable workshop resume state and clear an existing pause")
  .action(async (workshopId, options) =>
    console.log(await resumeWorkshop(workshopId, undefined, { checkOnly: options.checkOnly === true }))
  );

program
  .command("checkpoint")
  .argument("<workshop-id>")
  .description("Record a clean repository checkpoint for later sessions")
  .action(async (workshopId) => {
    await checkpointWorkshop(workshopId);
    console.log(await workshopStatus(workshopId));
  });

program
  .command("schedule")
  .argument("<workshop-id>")
  .option("--start <HH:mm>", "24-hour start time", "09:00")
  .option("--variant <variant-id>", "Delivery variant to render")
  .description("Render a validated legacy run of show or delivery variant")
  .action(async (workshopId, options) =>
    console.log(await workshopRunOfShow(workshopId, options.start, undefined, options.variant))
  );

const create = program.command("new").description("Scaffold workshop content");
create
  .command("workshop")
  .argument("<id>")
  .argument("<title>")
  .action(async (id, title) => scaffoldWorkshop(id, title));
create
  .command("module")
  .argument("<workshop-id>")
  .argument("<folder>")
  .argument("<id>")
  .argument("<title>")
  .action(async (workshopId, folder, id, title) => scaffoldModule(workshopId, folder, id, title));
create
  .command("lab")
  .argument("<workshop-id>")
  .argument("<group>")
  .argument("<id>")
  .argument("<title>")
  .action(async (workshopId, group, id, title) => scaffoldLab(workshopId, group, id, title));
create
  .command("mission")
  .argument("<workshop-id>")
  .argument("<module-id>")
  .argument("<id>")
  .argument("<title>")
  .action(async (workshopId, moduleId, id, title) => scaffoldMission(workshopId, moduleId, id, title));
create
  .command("location")
  .argument("<workshop-id>")
  .argument("<id>")
  .argument("<title>")
  .action(async (workshopId, id, title) => scaffoldLocation(workshopId, id, title));
create
  .command("storyboard")
  .argument("<workshop-id>")
  .argument("<id>")
  .argument("<title>")
  .action(async (workshopId, id, title) => scaffoldStoryboard(workshopId, id, title));
create
  .command("character")
  .argument("<workshop-id>")
  .argument("<id>")
  .argument("<title>")
  .action(async (workshopId, id, title) => scaffoldCharacter(workshopId, id, title));

const release = program.command("release").description("Prepare and validate controlled portfolio releases");
release
  .command("prepare")
  .argument("<release-id>")
  .argument("<workshop-id>")
  .description("Create a draft release manifest from a clean reviewed commit")
  .action(async (releaseId, workshopId) => {
    const catalog = await loadCatalog(repositoryRoot);
    console.log(await prepareRelease(releaseId, workshopId, catalog));
  });
release
  .command("approve")
  .argument("<manifest>")
  .requiredOption("--approver <name>", "Person recording the human release approval")
  .description("Record human approval on a draft manifest so preparation and approval share one pull request")
  .action(async (manifestOption, options) => {
    const manifest = await approveRelease(manifestOption, options.approver);
    console.log(`Approved release ${manifest.id} as ${manifest.approvedBy} at ${manifest.approvedAt}.`);
  });
release
  .command("latest")
  .option("--status <status>", "Expected status of the newest manifest", "approved")
  .description("Print the newest release manifest path when it holds the expected status")
  .action(async (options: { status: string }) => {
    const allowed = ["draft", "approved", "deploying", "verified"] as const;
    if (!allowed.includes(options.status as (typeof allowed)[number])) {
      throw new Error(`Unknown release status "${options.status}"`);
    }
    console.log(
      await resolveLatestManifest(undefined, options.status as (typeof allowed)[number])
    );
  });
release
  .command("dispatch")
  .argument("[manifest]")
  .description("Dispatch the public promotion workflow for an approved manifest")
  .action(async (manifestOption?: string) => {
    const resolved = manifestOption ?? (await resolveLatestApprovedManifest());
    const manifest = await validateApprovedRelease(resolved);
    if (manifest.status !== "approved") {
      throw new Error(
        `Only an approved manifest can be dispatched, received ${manifest.status}. Use "release rollback --confirm" to redeploy a verified release.`
      );
    }
    await dispatchPublicPromotion(resolved);
    console.log(`Dispatched public promotion for ${resolved}.`);
  });
release
  .command("record-deployment")
  .argument("<manifest>")
  .requiredOption("--url <url>", "Deployed public Pages base URL")
  .description("Record deployment state on an approved manifest")
  .action(async (manifestOption, options) => {
    const manifest = await recordReleaseDeployment(manifestOption, options.url);
    console.log(`Recorded deployment of ${manifest.id} to ${manifest.deployment?.url}.`);
  });
release
  .command("validate")
  .argument("<manifest>")
  .description("Validate an approved release against the checked-out commit and catalog")
  .action(async (manifestOption) => {
    const manifest = await validateApprovedRelease(manifestOption);
    const catalog = await loadCatalog(repositoryRoot);
    filterCatalogForRelease(catalog, manifest);
    console.log(`Validated approved release ${manifest.id}.`);
  });
release
  .command("export")
  .argument("<manifest>")
  .requiredOption("--out <directory>", "Empty repository-relative output directory")
  .description("Export approved release content as a sanitized buildable public source tree")
  .action(async (manifestOption, options) => {
    console.log(await exportPublicRelease(manifestOption, options.out));
  });
release
  .command("show")
  .argument("<manifest>")
  .description("Show release state without authorizing deployment")
  .action(async (manifestOption) => {
    const { manifest } = await loadReleaseManifest(manifestOption);
    console.log(JSON.stringify(manifest, null, 2));
  });
release
  .command("verify")
  .argument("<manifest>")
  .requiredOption("--url <url>", "Deployed Pages base URL")
  .option("--record", "Record the verification on the manifest after every route passes")
  .description("Smoke-test the portal and every selected module route")
  .action(async (manifestOption, options) => {
    const routes = await verifyReleaseRoutes(manifestOption, options.url);
    console.log(`Verified ${routes.length} release route(s).`);
    if (options.record) {
      const manifest = await recordReleaseVerification(manifestOption);
      console.log(`Recorded verification of ${manifest.id} at ${manifest.deployment?.verifiedAt}.`);
    }
  });
release
  .command("rollback")
  .argument("<manifest>")
  .option("--confirm", "Dispatch the promotion workflow for the verified rollback target")
  .description("Validate a previously verified manifest as a rollback target")
  .action(async (manifestOption, options) => {
    const manifest = await validateRollbackTarget(manifestOption);
    if (!options.confirm) {
      console.log(
        `Rollback target ${manifest.id} is valid. Re-run with --confirm to dispatch the public promotion for ${manifestOption}.`
      );
      return;
    }
    await dispatchPublicPromotion(manifestOption);
    console.log(`Dispatched rollback promotion for ${manifest.id}.`);
  });

const generate = program.command("generate").description("Generate media candidates");
generate
  .command("storyboard")
  .argument("<workshop-id>")
  .argument("<storyboard-id>")
  .action(async (workshopId, storyboardId) => {
    console.log(await compileStoryboardPrompt(workshopId, storyboardId));
  });
generate
  .command("image")
  .argument("<workshop-id>")
  .argument("<asset-id>")
  .requiredOption("--prompt-file <path>")
  .requiredOption("--source <path>")
  .requiredOption("--module-id <id>")
  .requiredOption("--cycle-id <id>")
  .option("--inspect", "Print exact request identity without authorization or provider calls")
  .option(
    "--provider <provider>",
    "gpt-image-2, flux-2-pro, mai-image-2.5, or mai-image-2.6",
    "gpt-image-2"
  )
  .option("--width <pixels>", "image width", "1536")
  .option("--height <pixels>", "image height", "1024")
  .option("--format <format>", "png or jpeg", "png")
  .option("--input-reference <path>", "PNG or JPEG source image for a MAI image edit")
  .action(async (workshopId, assetId, options) => {
    try {
      const provider = options.provider as ImageProviderName;
      const outputFormat = options.format as "png" | "jpeg";
      if (!imageProviderNames.includes(provider)) {
        throw new Error(`Unsupported provider: ${provider}`);
      }
      if (!["png", "jpeg"].includes(outputFormat)) throw new Error(`Unsupported format: ${outputFormat}`);
      console.log(
        await generateImageCandidate({
          workshopId,
          moduleId: options.moduleId,
          cycleId: options.cycleId,
          assetId,
          promptFile: options.promptFile,
          source: options.source,
          provider,
          width: Number.parseInt(options.width, 10),
          height: Number.parseInt(options.height, 10),
          outputFormat,
          inputReference: options.inputReference,
          inspect: options.inspect
        })
      );
    } catch (error) {
      if (error instanceof FoundryRequestError) {
        console.error(`Foundry Error (${error.status}): ${error.message}`);
        console.error(`Response Body: ${error.responseBody}`);
      }
      throw error;
    }
  });
generate
  .command("video")
  .argument("<workshop-id>")
  .argument("<asset-id>")
  .requiredOption("--prompt-file <path>")
  .requiredOption("--source <path>")
  .requiredOption("--module-id <id>")
  .requiredOption("--cycle-id <id>")
  .option("--inspect", "Print exact request identity without authorization or provider calls")
  .option("--seconds <seconds>", "target duration: 4, 8, or 12", "8")
  .option("--aspect-ratio <ratio>", "16:9, 9:16, or 1:1", "16:9")
  .option("--input-reference <path>", "PNG, JPEG, or WebP image used as the first-frame reference")
  .action(async (workshopId, assetId, options) => {
    try {
      const aspectRatio = options.aspectRatio as "16:9" | "9:16" | "1:1";
      if (!["16:9", "9:16", "1:1"].includes(aspectRatio)) throw new Error(`Unsupported ratio: ${aspectRatio}`);
      console.log(
        await submitVideo({
          workshopId,
          moduleId: options.moduleId,
          cycleId: options.cycleId,
          assetId,
          promptFile: options.promptFile,
          source: options.source,
          durationSeconds: Number.parseInt(options.seconds, 10),
          aspectRatio,
          inputReference: options.inputReference,
          inspect: options.inspect
        })
      );
    } catch (error) {
      if (error instanceof FoundryRequestError) {
        console.error(`Foundry Error (${error.status}): ${error.message}`);
        console.error(`Response Body: ${error.responseBody}`);
      }
      throw error;
    }
  });

program
  .command("publish-leaderboard")
  .argument("<workshop-id>")
  .option("--environment <environment>", "test or production", "test")
  .option("--dry-run", "Show the target repository and files without publishing")
  .option("--message <message>", "Commit message used in the leaderboard repository")
  .description("Publish the workshop leaderboard kit to its environment repository")
  .action(async (workshopId, options) => {
    const result = await publishLeaderboard(workshopId, options.environment, {
      dryRun: options.dryRun,
      message: options.message
    });
    console.log(`Leaderboard kit: ${result.kitDirectory} (${result.files.length} file(s))`);
    console.log(`${result.environment} repository: ${result.repository}`);
    console.log(`Standings: ${result.standingsUrl}`);
    if (result.labelsCreated.length > 0) {
      console.log(`Created missing label(s): ${result.labelsCreated.join(", ")}.`);
    }
    if (result.labelWarning) {
      console.warn(`Warning: ${result.labelWarning}`);
    }
    if (result.published) {
      console.log(`Published commit ${result.commit}.`);
    } else {
      console.log(`Nothing published: ${result.reason}.`);
    }
  });

program
  .command("accept-candidate")
  .argument("<manifest>")
  .option("--media-file <path>", "Exact downloaded video or assembled candidate bytes")
  .option("--inspect", "Print exact request without recording acceptance")
  .description("Record previously human-decided candidate acceptance, separately from publication")
  .action(async (manifest, options) => console.log(await acceptCandidate(manifest, options.mediaFile, undefined, options.inspect)));

program
  .command("promote-image")
  .argument("<manifest>")
  .argument("<target>")
  .option("--inspect", "Print publication request without promoting")
  .description("Promote a reviewed image candidate into its workshop")
  .action(async (manifest, target, options) => {
    if (options.inspect) console.log(JSON.stringify(await candidateRequest(manifest, undefined, "publish-image", target.replaceAll("\\", "/")), null, 2));
    else await promoteImage(manifest, target);
  });

program
  .command("video-status")
  .argument("<manifest>")
  .description("Refresh a Sora job stored in a video manifest")
  .action(refreshVideoStatus);

program
  .command("publish-video")
  .argument("<manifest>")
  .argument("<video-file>")
  .option("--inspect", "Print exact publication request without uploading")
  .description("Upload an approved video to Azure Blob Storage")
  .action(async (manifest, video, options) => {
    const result = await publishVideo(manifest, video, options.inspect);
    if (result) console.log(result);
  });

program
  .command("download-video")
  .argument("<manifest>")
  .argument("<output-file>")
  .description("Download a completed Sora video to a local file")
  .action(downloadVideo);

program.parseAsync().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
