import { lstat, mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import { PNG } from "pngjs";
import { SaxesParser } from "saxes";
import {
  portableImageEvidenceSchema,
  referenceSheetReusePlanSchema,
  referenceSheetReuseSchema,
  referenceSheetReleaseSidecarSchema,
  referenceSheetSidecarSchema,
  reusableCandidateSchema,
  succeededImageReceiptSchema,
  workshopRequirementsSchema,
  type PortableImageEvidence,
  type ReferenceSheetReuse,
  type WorkshopRequirements
} from "@ghcp/content-schema";
import { candidateRequest } from "./assets.js";
import { assertDeclaredImageRequest } from "./authorization.js";
import { loadProductionState } from "./lifecycle.js";
import { candidatesRoot, repositoryRoot, workshopsRoot } from "./paths.js";
import { canonical, localFile, sha256, textSha256 } from "./production-records.js";

type Roots = { repositoryRoot: string; workshopsRoot: string; candidatesRoot: string };
const defaultRoots: Roots = { repositoryRoot, workshopsRoot, candidatesRoot };
type View = ReferenceSheetReuse["views"][number];
type Sheet = ReferenceSheetReuse["sheets"][number];
type VisibleView = Pick<View, "assetId" | "isolationSha256" | "crop">;
type VisibleSheet = Pick<Sheet, "id" | "svgSha256" | "views">;
type PendingFile = { relative: string; bytes: Buffer };
type EmbeddedImage = { bytes: Buffer; width: number; height: number };

function assertPortableMetadata(value: unknown): void {
  if (typeof value === "string") {
    if (/^(?:[a-z]:[\\/]|\\\\|\/)/i.test(value) ||
        /\b[a-z]:[\\/]/i.test(value) || /(?:^|[\s"'=])\/(?:users|home|tmp|var|etc)\//i.test(value)) {
      throw new Error("Image evidence contains a nonportable absolute path");
    }
    if (/^https?:\/\//i.test(value)) {
      const url = new URL(value);
      if (url.username || url.password || [...url.searchParams.keys()].some(key =>
        /^(?:token|access_token|api[_-]?key|password|secret|sig)$/i.test(key))) {
        throw new Error("Image evidence contains credentials in an endpoint");
      }
    }
  } else if (Array.isArray(value)) {
    for (const item of value) assertPortableMetadata(item);
  } else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (/^(?:authorization|password|secret|token|client[_-]?secret|api[_-]?key|access[_-]?token|refresh[_-]?token)$/i.test(key)) {
        throw new Error(`Image evidence contains a credential field: ${key}`);
      }
      assertPortableMetadata(item);
    }
  }
}

export function portableImageEvidenceBytes(
  candidateInput: unknown,
  receiptInput: unknown,
  originalReceiptSha256: string,
  originalManifestSha256: string
): Buffer {
  const candidate = reusableCandidateSchema.parse(candidateInput);
  const receipt = succeededImageReceiptSchema.parse(receiptInput);
  const { location: _location, ...portableCandidate } = candidate;
  const { manifestPath: _manifestPath, candidatePath: _candidatePath, ...output } = receipt.output;
  const evidence = portableImageEvidenceSchema.parse({
    schemaVersion: 1,
    kind: "portable-confirmed-image-evidence",
    originalReceiptSha256,
    originalManifestSha256,
    candidate: portableCandidate,
    receipt: { ...receipt, output }
  });
  assertPortableMetadata(evidence);
  return Buffer.from(`${JSON.stringify(evidence, null, 2)}\n`, "utf8");
}

export function isReferenceSheetAsset(asset: string): boolean {
  return /^content\/modules\/[^/]+\/media\/references\/reference-sheets\/[^/]+\.svg$/.test(asset);
}

export async function referenceSheetReleaseSidecar(workshopRoot: string, value: unknown) {
  if (value !== null && typeof value === "object" && "kind" in value &&
      value.kind === "confirmed-reference-sheet-release") {
    return referenceSheetReleaseSidecarSchema.parse(value);
  }
  const source = referenceSheetSidecarSchema.parse(value);
  const requirements = await loadRequirements(workshopRoot);
  const pointer = requirements.imageReuseManifests.find(entry =>
    entry.path === source.source && entry.sha256 === source.sourceSha256);
  if (!pointer) throw new Error("Reference sheet source is not authorized by requirements");
  const { manifest } = await loadReuseManifest(workshopRoot, requirements, pointer.module, source.source);
  const sheet = manifest.sheets.find(entry => entry.id === source.id);
  if (!sheet || sheet.location !== source.location || sheet.svgSha256 !== source.sha256) {
    throw new Error("Reference sheet source differs from its reuse manifest");
  }
  const views = new Map(manifest.views.map(view => [view.assetId, view]));
  return referenceSheetReleaseSidecarSchema.parse({
    schemaVersion: 1,
    kind: "confirmed-reference-sheet-release",
    id: source.id,
    location: source.location,
    sha256: source.sha256,
    sourceManifestSha256: source.sourceSha256,
    views: sheet.views.map(id => {
      const view = views.get(id)!;
      return { assetId: id, isolationSha256: view.isolationSha256, crop: view.crop };
    }),
    integratedUnder: source.integratedUnder,
    evidence: "Source evidence is retained in the private source repository and is not included in the deployed site."
  });
}

function samePath(left: string, right: string): boolean {
  const a = path.resolve(left);
  const b = path.resolve(right);
  return process.platform === "win32" ? a.toLowerCase() === b.toLowerCase() : a === b;
}

function within(parent: string, candidate: string): boolean {
  const relative = path.relative(parent, candidate);
  return relative !== "" && relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

async function exists(file: string): Promise<boolean> {
  try {
    await lstat(file);
    return true;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return false;
    throw error;
  }
}

async function outputPath(workshopRoot: string, relative: string): Promise<string> {
  const target = path.resolve(workshopRoot, ...relative.split("/"));
  if (!within(workshopRoot, target)) throw new Error(`Reuse output escapes the workshop: ${relative}`);
  const root = await realpath(workshopRoot);
  let ancestor = path.dirname(target);
  while (!(await exists(ancestor))) ancestor = path.dirname(ancestor);
  const actual = await realpath(ancestor);
  if (actual !== root && !within(root, actual)) throw new Error(`Reuse output escapes through a symlink: ${relative}`);
  return target;
}

async function moduleLocation(workshopRoot: string, moduleId: string): Promise<{ directory: string; assets: string[] }> {
  const files = await fg("content/modules/*/module.md", { cwd: workshopRoot, absolute: true, onlyFiles: true });
  const matches: { directory: string; assets: string[] }[] = [];
  for (const file of files) {
    const relative = path.relative(workshopRoot, file).split(path.sep).join("/");
    const data = matter(await readFile(await localFile(workshopRoot, relative), "utf8")).data;
    if (data.id !== moduleId) continue;
    if (!Array.isArray(data.assets) || !data.assets.every((asset: unknown) => typeof asset === "string")) {
      throw new Error(`Module "${moduleId}" has invalid asset declarations`);
    }
    matches.push({
      directory: path.relative(workshopRoot, path.dirname(file)).split(path.sep).join("/"),
      assets: data.assets
    });
  }
  if (matches.length !== 1) throw new Error(`Expected one module with id "${moduleId}"`);
  return matches[0]!;
}

function assertOutputScope(manifest: ReferenceSheetReuse, moduleDirectory: string): void {
  const sourcePrefix = `${moduleDirectory}/media/reference-reuse-evidence/sources/`;
  const evidencePrefix = `${moduleDirectory}/media/reference-reuse-evidence/receipts/`;
  const sheetPrefix = `${moduleDirectory}/media/references/reference-sheets/`;
  for (const view of manifest.views) {
    if (view.sourcePath !== `${sourcePrefix}${view.assetId}.png` ||
        view.evidencePath !== `${evidencePrefix}${view.assetId}.json`) {
      throw new Error(`Reuse evidence for "${view.assetId}" is outside its module's evidence directory`);
    }
  }
  for (const sheet of manifest.sheets) {
    if (sheet.location !== `${sheetPrefix}${sheet.id}.svg`) {
      throw new Error(`Reuse sheet "${sheet.id}" is outside its module's reference-sheet directory`);
    }
  }
}

async function loadRequirements(workshopRoot: string): Promise<WorkshopRequirements> {
  const requirements = await localFile(workshopRoot, "requirements.md");
  return workshopRequirementsSchema.parse(matter(await readFile(requirements, "utf8")).data);
}

async function loadReuseManifest(
  workshopRoot: string,
  requirements: WorkshopRequirements,
  moduleId: string,
  source: string
): Promise<{ manifest: ReferenceSheetReuse; hash: string }> {
  const pointer = requirements.imageReuseManifests.find(entry => entry.module === moduleId && entry.path === source);
  if (!pointer) throw new Error(`Requirements do not authorize reuse manifest "${source}" for module "${moduleId}"`);
  const bytes = await readFile(await localFile(workshopRoot, source));
  const hash = sha256(bytes);
  if (hash !== pointer.sha256) throw new Error(`Reuse manifest changed after requirements intake: ${source}`);
  const manifest = referenceSheetReuseSchema.parse(JSON.parse(bytes.toString("utf8")));
  if (manifest.workshop !== requirements.id || manifest.module !== moduleId) {
    throw new Error("Reuse manifest does not match the authorized workshop and module");
  }
  return { manifest, hash };
}

function verifySvg(svg: Buffer, sheet: VisibleSheet, views: Map<string, VisibleView>): Map<string, EmbeddedImage> {
  if (sha256(svg) !== sheet.svgSha256) throw new Error(`Reference sheet changed: ${sheet.id}`);
  const parser = new SaxesParser();
  const images: EmbeddedImage[] = [];
  const allowed: Record<string, Set<string>> = {
    svg: new Set(["xmlns", "width", "height", "viewBox", "preserveAspectRatio", "role", "aria-labelledby", "x", "y", "overflow"]),
    title: new Set(["id"]),
    desc: new Set(["id"]),
    rect: new Set(["x", "y", "width", "height", "rx", "fill", "stroke", "stroke-width"]),
    text: new Set(["x", "y", "fill", "font-family", "font-size", "font-weight"]),
    image: new Set(["width", "height", "href"])
  };
  const stack: { name: string; attributes: Record<string, string> }[] = [];
  let rootSeen = false;
  parser.on("doctype", () => { throw new Error("Reference sheets cannot contain a document type"); });
  parser.on("processinginstruction", () => { throw new Error("Reference sheets cannot contain processing instructions"); });
  parser.on("opentag", tag => {
    const attributes = allowed[tag.name];
    if (!attributes) throw new Error(`Unsupported reference sheet element: ${tag.name}`);
    if (!rootSeen) {
      if (tag.name !== "svg" || tag.attributes.xmlns !== "http://www.w3.org/2000/svg") {
        throw new Error("Reference sheet must have an SVG root and namespace");
      }
      rootSeen = true;
    }
    for (const [name, value] of Object.entries(tag.attributes)) {
      if (!attributes.has(name) || /^on/i.test(name) ||
          (name === "xmlns" && value !== "http://www.w3.org/2000/svg") ||
          (name !== "xmlns" && /(?:javascript:|https?:|url\s*\()/i.test(value))) {
        throw new Error(`Unsafe reference sheet attribute: ${name}`);
      }
      if ((name === "href" || name.endsWith(":href")) && (tag.name !== "image" || name !== "href")) {
        throw new Error("Reference sheets may only embed PNG image links");
      }
    }
    if (tag.name === "image") {
      const href = tag.attributes.href;
      const prefix = "data:image/png;base64,";
      if (typeof href !== "string" || !href.startsWith(prefix)) {
        throw new Error("Reference sheet images must be embedded PNGs");
      }
      const encoded = href.slice(prefix.length);
      if (!/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) throw new Error("Reference sheet contains invalid base64");
      const bytes = Buffer.from(encoded, "base64");
      if (bytes.toString("base64") !== encoded) throw new Error("Reference sheet contains noncanonical base64");
      const view = views.get(sheet.views[images.length] ?? "");
      const container = stack.at(-1);
      const crop = container?.attributes.viewBox?.trim().split(/[\s,]+/).map(Number);
      const width = Number(tag.attributes.width);
      const height = Number(tag.attributes.height);
      if (!view || stack.length !== 2 || container?.name !== "svg" || !crop || crop.length !== 4 ||
          crop.some((value, index) => value !== [
            view.crop[0], view.crop[1], view.crop[2] - view.crop[0], view.crop[3] - view.crop[1]
          ][index]) ||
          !Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0 ||
          !(Number(container.attributes.width) > 0) || !(Number(container.attributes.height) > 0)) {
        throw new Error(`Reference sheet crop or image geometry differs: ${sheet.id}`);
      }
      images.push({ bytes, width, height });
    }
    stack.push({ name: tag.name, attributes: tag.attributes });
  });
  parser.on("closetag", () => { stack.pop(); });
  parser.write(svg.toString("utf8")).close();
  if (!rootSeen || images.length !== sheet.views.length) throw new Error(`Unexpected embedded view count: ${sheet.id}`);
  const result = new Map<string, EmbeddedImage>();
  for (const [index, id] of sheet.views.entries()) {
    const view = views.get(id);
    const image = images[index];
    if (!view || !image || sha256(image.bytes) !== view.isolationSha256) {
      throw new Error(`Reference sheet embedded image differs from selected isolation: ${id}`);
    }
    result.set(id, image);
  }
  return result;
}

function verifyIsolation(image: EmbeddedImage, view: VisibleView): PNG {
  const isolation = PNG.sync.read(image.bytes);
  const [left, top, right, bottom] = view.crop;
  if (isolation.width !== image.width || isolation.height !== image.height ||
      right > isolation.width || bottom > isolation.height) {
    throw new Error(`Reference image dimensions or crop differ: ${view.assetId}`);
  }
  let visible = false;
  let transparent = false;
  for (let y = 0; y < isolation.height; y++) {
    for (let x = 0; x < isolation.width; x++) {
      const index = (y * isolation.width + x) * 4;
      if (isolation.data[index + 3] === 0) {
        transparent = true;
        continue;
      }
      visible = true;
      if (x < left || x >= right || y < top || y >= bottom) {
        throw new Error(`Reference crop clips visible pixels: ${view.assetId}`);
      }
    }
  }
  if (!visible || !transparent) throw new Error(`Reference isolation lacks visible or transparent pixels: ${view.assetId}`);
  return isolation;
}

function verifyPixels(sourceBytes: Buffer, image: EmbeddedImage, view: View): void {
  const source = PNG.sync.read(sourceBytes);
  const isolation = verifyIsolation(image, view);
  if (source.width !== isolation.width || source.height !== isolation.height) {
    throw new Error(`Reference image dimensions differ: ${view.assetId}`);
  }
  for (let index = 0; index < isolation.data.length; index += 4) {
    if (isolation.data[index + 3] !== 0) {
      if (source.data[index + 3] === 0) {
        throw new Error(`Reference isolation exposes transparent source pixels: ${view.assetId}`);
      }
      for (let channel = 0; channel < 3; channel++) {
        if (source.data[index + channel] !== isolation.data[index + channel]) {
          throw new Error(`Reference isolation changes visible source pixels: ${view.assetId}`);
        }
      }
    }
  }
}

async function verifyEvidence(
  evidence: PortableImageEvidence,
  view: View,
  source: Buffer,
  requirements: WorkshopRequirements,
  workshopRoot: string,
  root: string
): Promise<void> {
  const { candidate, receipt } = evidence;
  const request = receipt.request;
  if (evidence.originalReceiptSha256 !== view.receiptSha256 ||
      evidence.originalManifestSha256 !== view.candidateManifestSha256 ||
      receipt.requirementsHash !== view.sourceRequirementsHash ||
      receipt.requestHash !== view.requestHash || sha256(canonical(request)) !== view.requestHash ||
      receipt.output.candidateHash !== view.candidateSha256 || sha256(source) !== view.candidateSha256 ||
      receipt.output.manifestHash !== view.candidateManifestSha256 ||
      candidate.id !== view.assetId || request.assetId !== view.assetId ||
      request.kind !== "generate-image" || request.outputFormat !== "png" ||
      candidate.generationAuthorization.requestHash !== view.requestHash ||
      candidate.generationAuthorization.envelopeHash !== receipt.authorityHash ||
      candidate.provider !== request.provider || candidate.deployment !== request.deployment ||
      candidate.source !== request.source || candidate.promptHash !== request.promptHash ||
      sha256(candidate.prompt) !== request.promptHash ||
      candidate.width !== request.width || candidate.height !== request.height ||
      candidate.inputReference?.path !== request.referencePath ||
      candidate.inputReference?.hash !== request.referenceHash) {
    throw new Error(`Confirmed image provenance does not match: ${view.assetId}`);
  }
  await assertDeclaredImageRequest(request, requirements, workshopRoot, root);
  if (sha256(await readFile(await localFile(workshopRoot, request.source))) !== request.sourceHash) {
    throw new Error(`Image workflow source changed: ${view.assetId}`);
  }
  if (request.referencePath && request.referenceHash &&
      sha256(await readFile(await localFile(root, request.referencePath))) !== request.referenceHash) {
    throw new Error(`Image reference changed: ${view.assetId}`);
  }
  assertPortableMetadata(evidence);
}

async function writeNewFiles(workshopRoot: string, files: PendingFile[]): Promise<void> {
  const seen = new Set<string>();
  for (const file of files) {
    const key = file.relative.toLowerCase();
    if (seen.has(key)) throw new Error(`Duplicate reuse output: ${file.relative}`);
    seen.add(key);
    const target = await outputPath(workshopRoot, file.relative);
    if (await exists(target)) throw new Error(`Reuse output already exists: ${file.relative}`);
  }
  for (const file of files) {
    const target = await outputPath(workshopRoot, file.relative);
    await mkdir(path.dirname(target), { recursive: true });
    await outputPath(workshopRoot, file.relative);
    await writeFile(target, file.bytes, { flag: "wx" });
  }
}

export async function reuseReferenceSheets(
  workshopId: string,
  source: string,
  planPath: string,
  roots: Roots = defaultRoots
): Promise<{ sheets: string[]; views: number }> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(workshopId)) throw new Error("Invalid workshop id");
  const workshopRoot = path.join(roots.workshopsRoot, workshopId);
  if (!within(await realpath(roots.workshopsRoot), await realpath(workshopRoot))) {
    throw new Error("Reference reuse workshop escapes its root");
  }
  const { state } = await loadProductionState(workshopId, roots);
  if (state.lifecycleVersion !== 3 || state.sessionStatus !== "active" || state.blockers.length) {
    throw new Error("Reference reuse requires an active, unblocked lifecycle-v3 draft");
  }
  if (state.environment !== "local" || !["drafting", "local-review"].includes(state.phase) || !state.requirements) {
    throw new Error("Reference reuse ends when the complete local draft is approved");
  }
  const requirementsRaw = await readFile(await localFile(workshopRoot, state.requirements.path), "utf8");
  if (textSha256(requirementsRaw) !== state.requirements.sha256) {
    throw new Error("Workshop requirements changed; refresh intake before reference reuse");
  }
  const requirements = workshopRequirementsSchema.parse(matter(requirementsRaw).data);
  if (requirements.id !== workshopId) throw new Error("Requirements workshop id does not match reference reuse");
  const matching = requirements.imageReuseManifests.filter(pointer => pointer.path === source);
  if (matching.length !== 1) throw new Error("Reference reuse requires one requirements-declared manifest");
  const moduleId = matching[0]!.module;
  const { manifest, hash } = await loadReuseManifest(workshopRoot, requirements, moduleId, source);
  const module = await moduleLocation(workshopRoot, moduleId);
  assertOutputScope(manifest, module.directory);
  const candidatePrefix = `generated/candidates/${workshopId}/${moduleId}/`;
  const normalizedPlan = planPath.replace(/\\+/g, "/");
  if (!normalizedPlan.startsWith(candidatePrefix)) throw new Error("Local reuse plan must remain in the module's candidate directory");
  const plan = referenceSheetReusePlanSchema.parse(JSON.parse(
    await readFile(await localFile(roots.repositoryRoot, normalizedPlan), "utf8")
  ));
  const viewPlans = new Map(plan.views.map(view => [view.assetId, view]));
  const sheetPlans = new Map(plan.sheets.map(sheet => [sheet.id, sheet]));
  if (viewPlans.size !== plan.views.length || sheetPlans.size !== plan.sheets.length ||
      viewPlans.size !== manifest.views.length || sheetPlans.size !== manifest.sheets.length) {
    throw new Error("Local reference reuse plan does not match the authorized selection");
  }
  const inputs = new Map<string, { source: Buffer; isolation: Buffer; evidence: Buffer }>();
  const viewMap = new Map(manifest.views.map(view => [view.assetId, view]));
  for (const view of manifest.views) {
    const planned = viewPlans.get(view.assetId);
    if (!planned || !planned.manifestPath.startsWith(candidatePrefix) || !planned.isolationPath.startsWith(candidatePrefix)) {
      throw new Error(`Local candidate is outside the authorized module: ${view.assetId}`);
    }
    const manifestPath = await localFile(roots.repositoryRoot, planned.manifestPath);
    const manifestBytes = await readFile(manifestPath);
    const candidate = reusableCandidateSchema.parse(JSON.parse(manifestBytes.toString("utf8")));
    const accepted = await candidateRequest(manifestPath, undefined, "accept-image", undefined, roots);
    const sourcePath = path.resolve(roots.repositoryRoot, candidate.location);
    const sourceBytes = await readFile(sourcePath);
    const isolation = await readFile(await localFile(roots.repositoryRoot, planned.isolationPath));
    const receiptRelative = `${workshopId}/${moduleId}/${accepted.cycleId}/authorizations/standing-image--${view.requestHash}.json`;
    const receiptPath = await localFile(roots.candidatesRoot, receiptRelative);
    const receiptBytes = await readFile(receiptPath);
    const receipt = succeededImageReceiptSchema.parse(JSON.parse(receiptBytes.toString("utf8")));
    if (accepted.assetId !== view.assetId || accepted.candidateHash !== view.candidateSha256 ||
        accepted.manifestHash !== view.candidateManifestSha256 ||
        sha256(manifestBytes) !== view.candidateManifestSha256 || sha256(receiptBytes) !== view.receiptSha256 ||
        sha256(isolation) !== view.isolationSha256 ||
        !samePath(path.resolve(roots.repositoryRoot, receipt.output.manifestPath), manifestPath) ||
        !samePath(path.resolve(roots.repositoryRoot, receipt.output.candidatePath), sourcePath)) {
      throw new Error(`Local candidate or receipt differs from the authorized selection: ${view.assetId}`);
    }
    const evidenceBytes = portableImageEvidenceBytes(candidate, receipt, sha256(receiptBytes), sha256(manifestBytes));
    if (sha256(evidenceBytes) !== view.evidenceSha256) {
      throw new Error(`Portable image evidence differs from the authorized selection: ${view.assetId}`);
    }
    const evidence = portableImageEvidenceSchema.parse(JSON.parse(evidenceBytes.toString("utf8")));
    await verifyEvidence(evidence, view, sourceBytes, requirements, workshopRoot, roots.repositoryRoot);
    inputs.set(view.assetId, { source: sourceBytes, isolation, evidence: evidenceBytes });
  }

  const files: PendingFile[] = [];
  for (const sheet of manifest.sheets) {
    const planned = sheetPlans.get(sheet.id);
    if (!planned || !planned.svgPath.startsWith(candidatePrefix) || !planned.previewPath.startsWith(candidatePrefix)) {
      throw new Error(`Local sheet is outside the authorized module: ${sheet.id}`);
    }
    const svg = await readFile(await localFile(roots.repositoryRoot, planned.svgPath));
    const preview = await readFile(await localFile(roots.repositoryRoot, planned.previewPath));
    if (sha256(preview) !== sheet.previewSha256) throw new Error(`Reference review preview changed: ${sheet.id}`);
    const embedded = verifySvg(svg, sheet, viewMap);
    for (const id of sheet.views) {
      const view = viewMap.get(id)!;
      const input = inputs.get(id)!;
      const isolated = embedded.get(id)!;
      if (!input.isolation.equals(isolated.bytes)) throw new Error(`Sheet isolation differs from selected local image: ${id}`);
      verifyPixels(input.source, isolated, view);
    }
    const sidecar = referenceSheetSidecarSchema.parse({
      schemaVersion: 1,
      kind: "confirmed-reference-sheet",
      id: sheet.id,
      source,
      sourceSha256: hash,
      location: sheet.location,
      sha256: sheet.svgSha256,
      integratedUnder: { authority: "lifecycle-v3-local-draft", requirementsHash: state.requirements.sha256 }
    });
    files.push({ relative: sheet.location, bytes: svg });
    files.push({ relative: `${sheet.location}.json`, bytes: Buffer.from(`${JSON.stringify(sidecar, null, 2)}\n`) });
  }
  for (const view of manifest.views) {
    const input = inputs.get(view.assetId)!;
    files.push({ relative: view.sourcePath, bytes: input.source });
    files.push({ relative: view.evidencePath, bytes: input.evidence });
  }
  await writeNewFiles(workshopRoot, files);
  return { sheets: manifest.sheets.map(sheet => sheet.location), views: manifest.views.length };
}

export async function validateReferenceSheetSidecars(root = repositoryRoot): Promise<number> {
  const sheets = await fg("workshops/*/content/modules/*/media/references/reference-sheets/*.svg", {
    cwd: root, absolute: true, onlyFiles: true
  });
  const sidecars = await fg("workshops/*/content/modules/*/media/references/reference-sheets/*.svg.json", {
    cwd: root, absolute: true, onlyFiles: true
  });
  const images = new Set([...sheets, ...sidecars.map(sidecar => sidecar.slice(0, -".json".length))].map(file => path.resolve(file)));
  const requirementFiles = await fg("workshops/*/requirements.md", { cwd: root, absolute: true, onlyFiles: true });
  for (const file of requirementFiles) {
    const relative = path.relative(root, file).split(path.sep).join("/");
    const data = matter(await readFile(await localFile(root, relative), "utf8")).data;
    if (!Object.hasOwn(data, "imageReuseManifests")) continue;
    const requirements = workshopRequirementsSchema.parse(data);
    const workshopRoot = path.dirname(file);
    if (path.basename(workshopRoot) !== requirements.id) {
      throw new Error("Requirements workshop id does not match the reference reuse directory");
    }
    for (const pointer of requirements.imageReuseManifests) {
      const { manifest } = await loadReuseManifest(workshopRoot, requirements, pointer.module, pointer.path);
      for (const sheet of manifest.sheets) images.add(path.join(workshopRoot, ...sheet.location.split("/")));
    }
  }
  for (const imagePath of images) {
    const relative = path.relative(root, imagePath).split(path.sep).join("/");
    const workshopId = relative.split("/")[1];
    if (!workshopId) throw new Error(`Cannot determine workshop for reference sheet: ${relative}`);
    const workshopRoot = path.join(root, "workshops", workshopId);
    const location = path.relative(workshopRoot, imagePath).split(path.sep).join("/");
    const sidecarPath = await localFile(workshopRoot, `${location}.json`);
    const rawSidecar: unknown = JSON.parse(await readFile(sidecarPath, "utf8"));
    if (rawSidecar !== null && typeof rawSidecar === "object" && "kind" in rawSidecar &&
        rawSidecar.kind === "confirmed-reference-sheet-release") {
      const release = referenceSheetReleaseSidecarSchema.parse(rawSidecar);
      const provenance: unknown = JSON.parse(await readFile(await localFile(root, "release-provenance.json"), "utf8"));
      if (provenance === null || typeof provenance !== "object" ||
          !("releaseId" in provenance) || typeof provenance.releaseId !== "string" ||
          !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(provenance.releaseId) ||
          !("sourceCommit" in provenance) || typeof provenance.sourceCommit !== "string" ||
          !/^[a-f0-9]{40}$/.test(provenance.sourceCommit) ||
          !("workshops" in provenance) || !Array.isArray(provenance.workshops) ||
          !provenance.workshops.includes(workshopId)) {
        throw new Error("Public reference sheet requires exact-commit release provenance");
      }
      if (!isReferenceSheetAsset(location) || release.location !== location ||
          path.posix.basename(location) !== `${release.id}.svg`) {
        throw new Error(`Public reference sheet location differs: ${relative}`);
      }
      const moduleDirectory = location.split("/").slice(0, 3).join("/");
      const moduleFile = await localFile(workshopRoot, `${moduleDirectory}/module.md`);
      const moduleData = matter(await readFile(moduleFile, "utf8")).data;
      if (typeof moduleData.id !== "string") throw new Error(`Public reference sheet has no module id: ${relative}`);
      const module = await moduleLocation(workshopRoot, moduleData.id);
      if (module.directory !== moduleDirectory || !module.assets.includes(location)) {
        throw new Error(`Public reference sheet is not declared by its module: ${relative}`);
      }
      const views = new Map(release.views.map(view => [view.assetId, view]));
      const embedded = verifySvg(await readFile(await localFile(workshopRoot, location)), {
        id: release.id,
        svgSha256: release.sha256,
        views: release.views.map(view => view.assetId)
      }, views);
      for (const view of release.views) verifyIsolation(embedded.get(view.assetId)!, view);
      continue;
    }
    const sidecar = referenceSheetSidecarSchema.parse(rawSidecar);
    const requirements = await loadRequirements(workshopRoot);
    const pointer = requirements.imageReuseManifests.find(entry =>
      entry.path === sidecar.source && entry.sha256 === sidecar.sourceSha256);
    if (!pointer) throw new Error(`Reference sheet is not authorized by current requirements: ${relative}`);
    const { manifest } = await loadReuseManifest(workshopRoot, requirements, pointer.module, sidecar.source);
    const module = await moduleLocation(workshopRoot, pointer.module);
    assertOutputScope(manifest, module.directory);
    const sheet = manifest.sheets.find(entry => entry.id === sidecar.id);
    if (!sheet || sheet.location !== location || sidecar.location !== location ||
        sidecar.sha256 !== sheet.svgSha256 || !module.assets.includes(location)) {
      throw new Error(`Reference sheet differs from its manifest or module declaration: ${relative}`);
    }
    const viewMap = new Map(manifest.views.map(view => [view.assetId, view]));
    const embedded = verifySvg(await readFile(await localFile(workshopRoot, location)), sheet, viewMap);
    for (const id of sheet.views) {
      const view = viewMap.get(id)!;
      const source = await readFile(await localFile(workshopRoot, view.sourcePath));
      const evidenceBytes = await readFile(await localFile(workshopRoot, view.evidencePath));
      if (sha256(evidenceBytes) !== view.evidenceSha256) throw new Error(`Reference evidence changed: ${id}`);
      const evidence = portableImageEvidenceSchema.parse(JSON.parse(evidenceBytes.toString("utf8")));
      await verifyEvidence(evidence, view, source, requirements, workshopRoot, root);
      verifyPixels(source, embedded.get(id)!, view);
    }
    for (const expected of manifest.sheets) {
      if (!(await exists(path.join(workshopRoot, ...expected.location.split("/")))) ||
          !(await exists(path.join(workshopRoot, ...`${expected.location}.json`.split("/"))))) {
        throw new Error(`Reference reuse integration is incomplete: ${expected.id}`);
      }
    }
  }
  return images.size;
}
