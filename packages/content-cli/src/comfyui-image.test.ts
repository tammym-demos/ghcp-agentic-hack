import { afterEach, describe, expect, it, vi } from "vitest";
import { comfyImageWorkflowSchema } from "@ghcp/content-schema";
import type { ImageGenerationRequest } from "@ghcp/foundry-providers";
import { PNG } from "pngjs";
import { ComfyImageProvider } from "./comfyui-image.js";

const config = comfyImageWorkflowSchema.parse({
  schemaVersion: 1,
  kind: "comfyui-qwen21-reference",
  models: { diffusion: "qwen.safetensors", textEncoder: "encoder.safetensors", vae: "vae.safetensors" },
  sampling: { seed: 42, steps: 40, cfg: 1, sampler: "euler", scheduler: "simple", denoise: 1, referenceResolution: 0 },
  negativePrompt: "No text."
});

const pngCache = new Map<string, Buffer>();

function png(width = 1536, height = 1024): Uint8Array {
  const key = `${width}x${height}`;
  let bytes = pngCache.get(key);
  if (!bytes) {
    bytes = PNG.sync.write(new PNG({ width, height }));
    pngCache.set(key, bytes);
  }
  return Uint8Array.from(bytes);
}

function corruptPng(): Uint8Array {
  const bytes = Buffer.from(png());
  const offset = bytes.indexOf("IDAT");
  if (offset < 0) throw new Error("PNG fixture has no image data");
  bytes.writeUInt8(bytes.readUInt8(offset + 4) ^ 1, offset + 4);
  return bytes;
}

const invalidPngs: Array<[string, () => Uint8Array]> = [
  ["header-only", () => png().slice(0, 24)],
  ["missing IEND", () => png().slice(0, -12)],
  ["corrupt image data", corruptPng]
];

function request(): ImageGenerationRequest {
  return {
    prompt: "A single original character.",
    width: 1536,
    height: 1024,
    outputFormat: "png",
    inputReference: { bytes: png(), filename: "reference.png", contentType: "image/png" }
  };
}

function jsonResponse(value: unknown, status = 200): Response {
  return new Response(JSON.stringify(value), { status, headers: { "content-type": "application/json" } });
}

function fakeComfy(options: {
  promptResponse?: unknown;
  historyStatus?: Record<string, unknown>;
  outputBytes?: Uint8Array;
  uploadResponse?: unknown;
  failurePath?: string;
} = {}) {
  let submitted: Record<string, unknown> | undefined;
  const fetchMock = vi.fn(async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
    const url = new URL(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
    if (url.pathname === options.failurePath) return jsonResponse({ error: "unavailable" }, 503);
    if (url.pathname === "/system_stats") return jsonResponse({ system: { comfyui_version: "test-version" } });
    if (url.pathname === "/upload/image") {
      expect(init?.body).toBeInstanceOf(FormData);
      return jsonResponse(options.uploadResponse ?? {
        name: "reference.png", subfolder: "ghcp-intro-character-references", type: "input"
      });
    }
    if (url.pathname === "/prompt") {
      submitted = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return jsonResponse(options.promptResponse ?? { prompt_id: "job-1", node_errors: {} });
    }
    if (url.pathname === "/history/job-1") {
      const clientId = submitted?.client_id;
      return jsonResponse({
        "job-1": {
          status: options.historyStatus ?? { status_str: "success", completed: true },
          outputs: {
            "10": { images: [{
              filename: `character-reference-${clientId}_00001_.png`,
              subfolder: "ghcp-intro-character-references",
              type: "output"
            }] }
          }
        }
      });
    }
    if (url.pathname === "/view") {
      const output = options.outputBytes ?? png();
      const buffer = new ArrayBuffer(output.byteLength);
      new Uint8Array(buffer).set(output);
      return new Response(buffer, { headers: { "content-type": "image/png" } });
    }
    throw new Error(`Unexpected request: ${url.href}`);
  });
  vi.stubGlobal("fetch", fetchMock);
  return { fetchMock, submitted: () => submitted };
}

afterEach(() => vi.unstubAllGlobals());

describe("ComfyImageProvider", () => {
  it("rejects endpoints outside the uncredentialed loopback origin", () => {
    for (const endpoint of [
      "https://127.0.0.1:8188",
      "http://localhost:8188",
      "http://192.168.1.1:8188",
      "http://user@127.0.0.1:8188",
      "http://127.0.0.1:8188/path",
      "http://127.0.0.1:8188/?redirect=elsewhere"
    ]) {
      expect(() => new ComfyImageProvider(endpoint, config, "a".repeat(64))).toThrow("127.0.0.1 origin");
    }
  });

  it("submits one local reference workflow and records exact provenance", async () => {
    const fake = fakeComfy();
    const provider = new ComfyImageProvider("http://127.0.0.1:8188", config, "a".repeat(64));
    const image = await provider.generate(request());
    expect(fake.fetchMock).toHaveBeenCalledTimes(5);
    for (const call of fake.fetchMock.mock.calls) {
      expect(String(call[0])).toMatch(/^http:\/\/127\.0\.0\.1:8188\//);
      expect(call[1]?.redirect).toBe("error");
    }
    const graph = fake.submitted()?.prompt as Record<string, { inputs: Record<string, unknown> }>;
    expect(graph["5"]?.inputs["images.image_1"]).toEqual(["1", 0]);
    expect(graph["5"]?.inputs.prompt).toBe("A single original character.");
    expect(graph["8"]?.inputs.latent_image).toEqual(["5", 2]);
    expect(graph["8"]?.inputs.seed).toBe(42);
    expect(new Uint8Array(image.bytes)).toEqual(png());
    expect(image.provenance).toMatchObject({
      endpoint: "http://127.0.0.1:8188",
      comfyuiVersion: "test-version",
      workflowHash: "a".repeat(64),
      queueRequest: fake.submitted()
    });
  });

  it("rejects invalid input and mismatched dimensions before contacting ComfyUI", async () => {
    const fake = fakeComfy();
    const provider = new ComfyImageProvider("http://127.0.0.1:8188", config, "a".repeat(64));
    await expect(provider.generate({ ...request(), width: 1024 })).rejects.toThrow("matching PNG");
    await expect(provider.generate({ ...request(), inputReference: undefined })).rejects.toThrow("require an input");
    expect(fake.fetchMock).not.toHaveBeenCalled();
  });

  it.each(invalidPngs)("rejects %s input before contacting ComfyUI", async (_description, invalid) => {
    const fake = fakeComfy();
    const provider = new ComfyImageProvider("http://127.0.0.1:8188", config, "a".repeat(64));
    await expect(provider.generate({
      ...request(),
      inputReference: { bytes: invalid(), filename: "reference.png", contentType: "image/png" }
    })).rejects.toThrow("complete valid PNG");
    expect(fake.fetchMock).not.toHaveBeenCalled();
  });

  it("stops on an invalid upload response without submitting a workflow", async () => {
    const fake = fakeComfy({ uploadResponse: { name: "../outside.png", subfolder: "", type: "input" } });
    const provider = new ComfyImageProvider("http://127.0.0.1:8188", config, "a".repeat(64));
    await expect(provider.generate(request())).rejects.toThrow("invalid input filename");
    expect(fake.fetchMock).toHaveBeenCalledTimes(2);
  });

  it("does not retry or continue when submission is uncertain", async () => {
    const fake = fakeComfy({ promptResponse: { node_errors: {} } });
    const provider = new ComfyImageProvider("http://127.0.0.1:8188", config, "a".repeat(64));
    await expect(provider.generate(request())).rejects.toThrow("submission is uncertain");
    expect(fake.fetchMock).toHaveBeenCalledTimes(3);
  });

  it("does not retry a transport or provider failure", async () => {
    const fake = fakeComfy({ failurePath: "/prompt" });
    const provider = new ComfyImageProvider("http://127.0.0.1:8188", config, "a".repeat(64));
    await expect(provider.generate(request())).rejects.toThrow("HTTP 503");
    expect(fake.fetchMock).toHaveBeenCalledTimes(3);
  });

  it("stops when ComfyUI reports an execution error", async () => {
    const fake = fakeComfy({ historyStatus: { status_str: "error", completed: false, messages: ["failed"] } });
    const provider = new ComfyImageProvider("http://127.0.0.1:8188", config, "a".repeat(64));
    await expect(provider.generate(request())).rejects.toThrow("ComfyUI execution failed");
    expect(fake.fetchMock).toHaveBeenCalledTimes(4);
  });

  it("rejects returned image bytes with the wrong dimensions", async () => {
    fakeComfy({ outputBytes: png(1024, 1024) });
    const provider = new ComfyImageProvider("http://127.0.0.1:8188", config, "a".repeat(64));
    await expect(provider.generate(request())).rejects.toThrow("requested dimensions");
  });

  it.each(invalidPngs)("rejects %s output without retrying", async (_description, invalid) => {
    const fake = fakeComfy({ outputBytes: invalid() });
    const provider = new ComfyImageProvider("http://127.0.0.1:8188", config, "a".repeat(64));
    await expect(provider.generate(request())).rejects.toThrow("complete valid PNG");
    expect(fake.fetchMock).toHaveBeenCalledTimes(5);
  });
});
