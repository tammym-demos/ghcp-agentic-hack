import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import matter from "gray-matter";
import { authorizationFixture } from "./authorization-fixture.js";

const mocks = vi.hoisted(() => ({ generate: vi.fn(), create: vi.fn(), upload: vi.fn(), get: vi.fn() }));
const roots = vi.hoisted(() => {
  const sep = process.platform === "win32" ? "\\" : "/";
  const root = [process.cwd(), "node_modules", "media-entrypoint-tests"].join(sep);
  return { repositoryRoot: root, workshopsRoot: [root, "workshops"].join(sep), candidatesRoot: [root, "generated", "candidates"].join(sep) };
});
vi.mock("./paths.js", () => roots);
vi.mock("@ghcp/foundry-providers", () => ({
  GptImageProvider: class { name = "gpt-image-2"; generate = mocks.generate; },
  FluxImageProvider: class { name = "flux-2-pro"; generate = mocks.generate; },
  MaiImageProvider: class { name = "mai-image-2.6"; generate = mocks.generate; },
  SoraVideoProvider: class { name = "sora-2"; create = mocks.create; get = mocks.get; },
  uploadVideo: mocks.upload
}));
import { acceptCandidate, candidateRequest, generateImageCandidate, publishVideo, refreshVideoStatus, submitVideo } from "./assets.js";

const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64");
const image = { workshopId: "demo", moduleId: "module", cycleId: "cycle", assetId: "image",
  promptFile: "prompt.txt", source: "content/module.md", provider: "gpt-image-2" as const, width: 1024, height: 1024, outputFormat: "png" as const };
const video = { workshopId: "demo", moduleId: "module", cycleId: "video-cycle", assetId: "video",
  promptFile: "prompt.txt", source: "content/module.md", durationSeconds: 4, aspectRatio: "16:9" as const };
beforeEach(async () => {
  vi.clearAllMocks();
  for (const name of ["FOUNDRY_GPT_IMAGE_ENDPOINT", "FOUNDRY_SORA_ENDPOINT"]) vi.stubEnv(name, "https://example.invalid");
  for (const name of ["FOUNDRY_GPT_IMAGE_DEPLOYMENT", "FOUNDRY_SORA_DEPLOYMENT"]) vi.stubEnv(name, "test");
  vi.stubEnv("AZURE_STORAGE_ACCOUNT_URL", "https://storage.invalid");
  vi.stubEnv("AZURE_STORAGE_VIDEO_CONTAINER", "private");
  await mkdir(path.join(roots.workshopsRoot, "demo", "content"), { recursive: true });
  await writeFile(path.join(roots.workshopsRoot, "demo", "content", "module.md"), "---\ngeneration:\n  visualStyle: approved style\n---\nSource");
  await writeFile(path.join(roots.repositoryRoot, "prompt.txt"), "approved prompt");
  mocks.generate.mockResolvedValue({ bytes: png, contentType: "image/png" });
  mocks.create.mockResolvedValue({ id: "job", status: "queued" });
  mocks.get.mockResolvedValue({ id: "job", status: "completed" });
  mocks.upload.mockResolvedValue({ url: "https://storage.invalid/private/video.mp4", blobName: "video.mp4" });
});
afterEach(async () => {
  vi.unstubAllEnvs();
  await rm(roots.repositoryRoot, { recursive: true, force: true });
});

describe("provider side-effect entrypoints", () => {
  it("inspects style-injected image identity without provider calls, then enforces exact consent", async () => {
    const request = JSON.parse(await generateImageCandidate({ ...image, inspect: true }));
    expect(mocks.generate).not.toHaveBeenCalled();
    await expect(generateImageCandidate(image)).rejects.toThrow();
    expect(mocks.generate).not.toHaveBeenCalled();
    await authorizationFixture(roots, [request]);
    const manifest = await generateImageCandidate(image);
    expect(mocks.generate).toHaveBeenCalledTimes(1);
    expect(mocks.generate.mock.calls[0]![0].prompt).toContain("STYLE GUIDE: approved style");
    expect(JSON.parse(await readFile(manifest, "utf8")).reviewStatus).toBe("candidate");
    expect(JSON.parse(await readFile(manifest, "utf8")).generationAuthorization.decisionId).toBe("decision-0");
    await expect(generateImageCandidate(image)).rejects.toThrow(/exhausted|Duplicate/);
    expect(mocks.generate).toHaveBeenCalledTimes(1);
  });
  it("blocks changed prompts and source style before generation", async () => {
    const request = JSON.parse(await generateImageCandidate({ ...image, inspect: true }));
    await authorizationFixture(roots, [request]);
    await writeFile(path.join(roots.repositoryRoot, "prompt.txt"), "changed prompt");
    await expect(generateImageCandidate(image)).rejects.toThrow("Exact action");
    expect(mocks.generate).not.toHaveBeenCalled();
  });
  it("submits only exact video actions and requires separate acceptance and publication", async () => {
    const request = JSON.parse(await submitVideo({ ...video, inspect: true }));
    await expect(submitVideo(video)).rejects.toThrow();
    expect(mocks.create).not.toHaveBeenCalled();
    await authorizationFixture(roots, [request]);
    const manifest = await submitVideo(video);
    expect(mocks.create).toHaveBeenCalledTimes(1);
    const binary = path.join(path.dirname(manifest), "video.mp4");
    await writeFile(binary, "mock video bytes");
    await expect(publishVideo(manifest, binary)).rejects.toThrow(/acceptance/);
    expect(mocks.upload).not.toHaveBeenCalled();
    const accept = await candidateRequest(manifest, binary, "accept-video");
    const raw = JSON.parse(await readFile(manifest, "utf8"));
    const publish = await candidateRequest(manifest, binary, "publish-video", `https://storage.invalid/private/${raw.id}/${raw.promptHash.slice(0, 12)}.mp4`);
    await authorizationFixture(roots, [accept, publish], { id: "review-envelope" });
    await acceptCandidate(manifest, binary);
    await publishVideo(manifest, binary);
    expect(mocks.upload).toHaveBeenCalledTimes(1);
    expect(JSON.parse(await readFile(manifest, "utf8")).reviewStatus).toBe("approved");
    expect(JSON.parse(await readFile(manifest, "utf8")).candidateAcceptance.decisionId).toBe("decision-0");
    expect(JSON.parse(await readFile(manifest, "utf8")).publicationAuthorization.decisionId).toBe("decision-1");
  });
  it("preserves paused read-only status recovery while blocking new submissions", async () => {
    const request = JSON.parse(await submitVideo({ ...video, inspect: true }));
    const fixture = await authorizationFixture(roots, [request]);
    const manifest = await submitVideo(video);
    const state = matter(await readFile(fixture.statePath, "utf8"), {});
    await writeFile(fixture.statePath, matter.stringify(state.content, { ...state.data, sessionStatus: "paused", pausedAt: "2026-01-01T00:00:00.000Z", pauseReason: "Human pause" }));
    await refreshVideoStatus(manifest);
    expect(mocks.get).toHaveBeenCalledTimes(1);
    await expect(submitVideo(video)).rejects.toThrow("paused");
    expect(mocks.create).toHaveBeenCalledTimes(1);
  });
  it("blocks changed candidate bytes after acceptance", async () => {
    const request = JSON.parse(await submitVideo({ ...video, inspect: true }));
    await authorizationFixture(roots, [request]);
    const manifest = await submitVideo(video);
    const binary = path.join(path.dirname(manifest), "video.mp4");
    await writeFile(binary, "reviewed bytes");
    const acceptance = await candidateRequest(manifest, binary, "accept-video");
    await authorizationFixture(roots, [acceptance], { id: "review-envelope" });
    await acceptCandidate(manifest, binary);
    await writeFile(binary, "unreviewed edit");
    await expect(publishVideo(manifest, binary)).rejects.toThrow(/acceptance/);
    expect(mocks.upload).not.toHaveBeenCalled();
  });
});
