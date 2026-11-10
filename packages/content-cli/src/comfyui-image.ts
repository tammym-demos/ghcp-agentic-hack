import { createHash, randomUUID } from "node:crypto";
import { setTimeout as sleep } from "node:timers/promises";
import type { ComfyImageWorkflow } from "@ghcp/content-schema";
import type { GeneratedImage, ImageGenerationRequest, ImageProvider } from "@ghcp/foundry-providers";
import { PNG } from "pngjs";

const imageDirectory = "ghcp-intro-character-references";
const requestTimeoutMs = 30_000;
const generationTimeoutMs = 20 * 60_000;
const pollIntervalMs = 2_000;
const maxImageBytes = 50 * 1024 * 1024;
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function assertCompletePng(bytes: Buffer, description: "input" | "output"): void {
  try {
    PNG.sync.read(bytes, { checkCRC: true });
  } catch (cause) {
    throw new Error(`ComfyUI ${description} is not a complete valid PNG`, { cause });
  }
}

function record(value: unknown, description: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`ComfyUI ${description} must be an object`);
  }
  return value as Record<string, unknown>;
}

function localEndpoint(endpoint: string): string {
  const url = new URL(endpoint);
  if (
    url.protocol !== "http:" ||
    url.hostname !== "127.0.0.1" ||
    url.username || url.password || url.pathname !== "/" || url.search || url.hash
  ) {
    throw new Error("ComfyUI image endpoint must be an uncredentialed HTTP 127.0.0.1 origin");
  }
  return url.origin;
}

function uploadName(value: unknown, description: string): string {
  if (typeof value !== "string" || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:png|jpe?g)$/i.test(value)) {
    throw new Error(`ComfyUI returned an invalid ${description} filename`);
  }
  return value;
}

function createWorkflow(
  config: ComfyImageWorkflow,
  request: ImageGenerationRequest,
  reference: string,
  outputPrefix: string
): Record<string, unknown> {
  return {
    "1": { class_type: "LoadImage", inputs: { image: reference } },
    "2": { class_type: "UNETLoader", inputs: { unet_name: config.models.diffusion, weight_dtype: "default" } },
    "3": { class_type: "CLIPLoader", inputs: { clip_name: config.models.textEncoder, type: "qwen_image", device: "default" } },
    "4": { class_type: "VAELoader", inputs: { vae_name: config.models.vae } },
    "5": {
      class_type: "TextEncodeQwenImage21",
      inputs: {
        clip: ["3", 0], vae: ["4", 0], "images.image_1": ["1", 0],
        prompt: request.prompt, negative_prompt: config.negativePrompt,
        resolution: config.sampling.referenceResolution
      }
    },
    "7": { class_type: "QwenImage21Cache", inputs: { model: ["2", 0], device: "auto", dtype: "default" } },
    "8": {
      class_type: "KSampler",
      inputs: {
        model: ["7", 0], positive: ["5", 0], negative: ["5", 1], latent_image: ["5", 2],
        seed: config.sampling.seed, steps: config.sampling.steps, cfg: config.sampling.cfg,
        sampler_name: config.sampling.sampler, scheduler: config.sampling.scheduler,
        denoise: config.sampling.denoise
      }
    },
    "9": { class_type: "VAEDecode", inputs: { samples: ["8", 0], vae: ["4", 0] } },
    "10": { class_type: "SaveImage", inputs: { images: ["9", 0], filename_prefix: outputPrefix } }
  };
}

export class ComfyImageProvider implements ImageProvider {
  readonly name = "comfyui-qwen21" as const;
  private readonly endpoint: string;

  constructor(
    endpoint: string,
    private readonly workflow: ComfyImageWorkflow,
    private readonly workflowHash: string
  ) {
    this.endpoint = localEndpoint(endpoint);
  }

  private async json(pathname: string, init: RequestInit = {}): Promise<Record<string, unknown>> {
    const response = await fetch(`${this.endpoint}${pathname}`, {
      ...init,
      redirect: "error",
      signal: AbortSignal.timeout(requestTimeoutMs)
    });
    if (!response.ok) throw new Error(`ComfyUI ${pathname} failed with HTTP ${response.status}`);
    return record(await response.json(), `${pathname} response`);
  }

  validateRequest(request: ImageGenerationRequest): void {
    if (!request.inputReference) throw new Error("ComfyUI character references require an input image");
    if (request.outputFormat !== "png") throw new Error("ComfyUI character references require PNG output");
    if (!request.prompt.trim()) throw new Error("ComfyUI character references require a prompt");
    if (request.inputReference.contentType !== "image/png") {
      throw new Error("ComfyUI character references require a PNG input image");
    }
    const referenceBytes = Buffer.from(request.inputReference.bytes);
    if (
      referenceBytes.length < 24 || referenceBytes.length > maxImageBytes ||
      !referenceBytes.subarray(0, 8).equals(pngSignature) ||
      referenceBytes.toString("ascii", 12, 16) !== "IHDR" ||
      referenceBytes.readUInt32BE(16) !== request.width ||
      referenceBytes.readUInt32BE(20) !== request.height ||
      !Number.isInteger(request.width) || !Number.isInteger(request.height) ||
      request.width < 32 || request.height < 32 ||
      request.width % 32 !== 0 || request.height % 32 !== 0 ||
      request.width * request.height > 2_097_152
    ) {
      throw new Error("ComfyUI requires matching PNG input/output dimensions, multiples of 32, at most 2,097,152 pixels");
    }
    assertCompletePng(referenceBytes, "input");
  }

  async generate(request: ImageGenerationRequest): Promise<GeneratedImage> {
    this.validateRequest(request);
    const inputReference = request.inputReference;
    if (!inputReference) throw new Error("ComfyUI character references require an input image");
    const referenceBytes = inputReference.bytes;
    const stats = await this.json("/system_stats");
    const system = record(stats.system, "system statistics");
    if (typeof system.comfyui_version !== "string") {
      throw new Error("ComfyUI did not report its version");
    }
    const referenceHash = createHash("sha256").update(referenceBytes).digest("hex");
    const uploadBuffer = new ArrayBuffer(referenceBytes.byteLength);
    new Uint8Array(uploadBuffer).set(referenceBytes);
    const form = new FormData();
    form.append("image", new Blob([uploadBuffer], { type: inputReference.contentType }),
      `reference-${referenceHash.slice(0, 16)}-${randomUUID()}.png`);
    form.append("type", "input");
    form.append("subfolder", imageDirectory);
    form.append("overwrite", "false");
    const uploaded = await this.json("/upload/image", { method: "POST", body: form });
    const inputName = uploadName(uploaded.name, "input");
    if (uploaded.type !== "input" || uploaded.subfolder !== imageDirectory) {
      throw new Error("ComfyUI returned an unexpected input image location");
    }

    const clientId = randomUUID();
    const graph = createWorkflow(this.workflow, request, `${imageDirectory}/${inputName}`,
      `${imageDirectory}/character-reference-${clientId}`);
    const queueRequest = { prompt: graph, client_id: clientId };
    const queued = await this.json("/prompt", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(queueRequest)
    });
    if (typeof queued.prompt_id !== "string" || !/^[a-zA-Z0-9-]+$/.test(queued.prompt_id)) {
      throw new Error("ComfyUI submission returned no valid prompt id; submission is uncertain");
    }
    const promptId = queued.prompt_id;
    const nodeErrors = record(queued.node_errors, "node errors");
    if (Object.keys(nodeErrors).length) throw new Error("ComfyUI reported workflow node errors");

    const deadline = Date.now() + generationTimeoutMs;
    let completed: Record<string, unknown> | undefined;
    while (Date.now() < deadline) {
      const history = await this.json(`/history/${encodeURIComponent(promptId)}`);
      if (history[promptId] !== undefined) {
        const entry = record(history[promptId], "history entry");
        const status = record(entry.status, "history status");
        if (status.status_str === "error") {
          throw new Error(`ComfyUI execution failed: ${JSON.stringify(status.messages)}`);
        }
        if (status.completed === true) {
          if (status.status_str !== "success") throw new Error("ComfyUI completed without a success status");
          completed = entry;
          break;
        }
      }
      await sleep(pollIntervalMs);
    }
    if (!completed) throw new Error("ComfyUI generation timed out; submission status is uncertain");
    const outputs = record(completed.outputs, "outputs");
    const saved = record(outputs["10"], "saved-image output");
    if (!Array.isArray(saved.images) || saved.images.length !== 1) {
      throw new Error("ComfyUI must return exactly one saved image");
    }
    const descriptor = record(saved.images[0], "saved-image descriptor");
    const outputName = uploadName(descriptor.filename, "output");
    if (descriptor.type !== "output" || descriptor.subfolder !== imageDirectory ||
        !outputName.startsWith(`character-reference-${clientId}_`) || !outputName.endsWith(".png")) {
      throw new Error("ComfyUI returned an unexpected output image location");
    }
    const query = new URLSearchParams({ filename: outputName, subfolder: imageDirectory, type: "output" });
    const response = await fetch(`${this.endpoint}/view?${query}`, {
      redirect: "error",
      signal: AbortSignal.timeout(requestTimeoutMs)
    });
    if (!response.ok) throw new Error(`ComfyUI image download failed with HTTP ${response.status}`);
    const declaredLength = Number(response.headers.get("content-length"));
    if (declaredLength > maxImageBytes) throw new Error("ComfyUI output exceeds the image size limit");
    const bytes = Buffer.from(await response.arrayBuffer());
    if (
      bytes.length < 24 || bytes.length > maxImageBytes ||
      !bytes.subarray(0, 8).equals(pngSignature) ||
      bytes.toString("ascii", 12, 16) !== "IHDR" ||
      bytes.readUInt32BE(16) !== request.width || bytes.readUInt32BE(20) !== request.height
    ) {
      throw new Error("ComfyUI output is not a PNG at the requested dimensions");
    }
    assertCompletePng(bytes, "output");
    return {
      bytes,
      contentType: "image/png",
      provenance: {
        endpoint: this.endpoint,
        comfyuiVersion: system.comfyui_version,
        workflowHash: this.workflowHash,
        referenceHash,
        queueRequest,
        queueResponse: queued,
        status: completed.status,
        output: descriptor
      }
    };
  }
}
