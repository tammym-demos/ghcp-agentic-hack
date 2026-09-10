import { foundryRequest, requiredEnvironment } from "./http.js";
import type {
  GeneratedImage,
  ImageGenerationRequest,
  ImageProvider,
  ImageProviderName,
  MaiImageProviderName
} from "./types.js";

interface OpenAiImageResponse {
  data: Array<{ b64_json?: string; revised_prompt?: string; url?: string }>;
}

abstract class OpenAiCompatibleImageProvider implements ImageProvider {
  abstract readonly name: ImageProviderName;

  constructor(
    private readonly endpoint: string,
    private readonly deployment: string,
    private readonly scope: string
  ) {}

  async generate(request: ImageGenerationRequest): Promise<GeneratedImage> {
    if (request.inputReference) {
      throw new Error(`${this.name} does not support image editing`);
    }
    return this.generateAtPath(request, "images/generations");
  }

  protected async generateAtPath(request: ImageGenerationRequest, requestPath: string): Promise<GeneratedImage> {
    const response = await foundryRequest<OpenAiImageResponse>(this.endpoint, this.scope, requestPath, {
      method: "POST",
      body: JSON.stringify({
        model: this.deployment,
        prompt: request.prompt,
        size: `${request.width}x${request.height}`,
        output_format: request.outputFormat,
        n: 1
      })
    });
    const image = response.data[0];
    if (!image) throw new Error(`${this.name} returned no image`);

    if (image.b64_json) {
      return {
        bytes: Uint8Array.from(Buffer.from(image.b64_json, "base64")),
        contentType: request.outputFormat === "png" ? "image/png" : "image/jpeg",
        revisedPrompt: image.revised_prompt
      };
    }
    if (image.url) {
      const download = await fetch(image.url, { signal: AbortSignal.timeout(120_000) });
      if (!download.ok) throw new Error(`Generated image download failed with ${download.status}`);
      return {
        bytes: new Uint8Array(await download.arrayBuffer()),
        contentType: download.headers.get("content-type") ?? "application/octet-stream",
        revisedPrompt: image.revised_prompt
      };
    }

    throw new Error(`${this.name} returned neither image bytes nor a download URL`);
  }
}

export class GptImageProvider extends OpenAiCompatibleImageProvider {
  readonly name = "gpt-image-2" as const;

  constructor() {
    super(
      requiredEnvironment("FOUNDRY_GPT_IMAGE_ENDPOINT"),
      requiredEnvironment("FOUNDRY_GPT_IMAGE_DEPLOYMENT"),
      "https://ai.azure.com/.default"
    );
  }
}

export class FluxImageProvider extends OpenAiCompatibleImageProvider {
  readonly name = "flux-2-pro" as const;

  constructor() {
    super(
      requiredEnvironment("FOUNDRY_FLUX_ENDPOINT"),
      requiredEnvironment("FOUNDRY_FLUX_DEPLOYMENT"),
      "https://cognitiveservices.azure.com/.default"
    );
  }

  override async generate(request: ImageGenerationRequest): Promise<GeneratedImage> {
    return this.generateAtPath(request, "models/images/generations?api-version=2024-05-01-preview");
  }
}

export class MaiImageProvider implements ImageProvider {
  readonly name: MaiImageProviderName;
  private readonly endpoint = requiredEnvironment("FOUNDRY_MAI_IMAGE_ENDPOINT");
  private readonly deployment = requiredEnvironment("FOUNDRY_MAI_IMAGE_DEPLOYMENT");

  constructor(name: MaiImageProviderName = "mai-image-2.5") {
    this.name = name;
  }

  async generate(request: ImageGenerationRequest): Promise<GeneratedImage> {
    if (request.outputFormat !== "png") {
      throw new Error(`${this.name} currently supports PNG output only`);
    }

    const body = createMaiImageRequestBody(request, this.deployment);
    const response = await foundryRequest<OpenAiImageResponse>(
      this.endpoint,
      "https://cognitiveservices.azure.com/.default",
      request.inputReference ? "mai/v1/images/edits" : "mai/v1/images/generations",
      {
        method: "POST",
        body
      }
    );
    const image = response.data[0];
    if (!image?.b64_json) {
      throw new Error(`${this.name} returned no image bytes`);
    }

    return {
      bytes: Uint8Array.from(Buffer.from(image.b64_json, "base64")),
      contentType: "image/png",
      revisedPrompt: image.revised_prompt
    };
  }
}

export function createMaiImageRequestBody(
  request: ImageGenerationRequest,
  deployment: string
): string | FormData {
  if (!request.inputReference) {
    return JSON.stringify({
      model: deployment,
      prompt: request.prompt,
      width: request.width,
      height: request.height
    });
  }

  const form = new FormData();
  form.append("model", deployment);
  form.append("prompt", request.prompt);
  const referenceBuffer = new ArrayBuffer(request.inputReference.bytes.byteLength);
  new Uint8Array(referenceBuffer).set(request.inputReference.bytes);
  form.append(
    "image",
    new Blob([referenceBuffer], { type: request.inputReference.contentType }),
    request.inputReference.filename
  );
  return form;
}
