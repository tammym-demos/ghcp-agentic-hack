import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = process.cwd();
const baseUrl = process.env.MINIMAX_API_BASE_URL ?? "https://api.minimax.io";
const model = process.env.MINIMAX_VIDEO_MODEL ?? "MiniMax-H3";

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

function optionsFrom(args) {
  const options = {};
  for (let index = 0; index < args.length; index += 2) {
    const name = args[index];
    const value = args[index + 1];
    if (!name?.startsWith("--") || value === undefined) {
      throw new Error(`Expected --name value pairs, received: ${args.join(" ")}`);
    }
    options[name.slice(2)] = value;
  }
  return options;
}

function required(options, name) {
  const value = options[name];
  if (!value) throw new Error(`Missing required option --${name}`);
  return value;
}

function repositoryPath(value) {
  const resolved = path.resolve(repositoryRoot, value);
  const relative = path.relative(repositoryRoot, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Path must remain inside the repository: ${value}`);
  }
  return { resolved, relative: relative.split(path.sep).join("/") };
}

function pngDimensions(bytes, filename) {
  if (
    bytes.length < 24 ||
    !bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  ) {
    throw new Error(`MiniMax H3 POC input must be a PNG: ${filename}`);
  }
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

async function preparedRequest(options) {
  const promptPath = repositoryPath(required(options, "prompt"));
  const inputPath = repositoryPath(required(options, "input"));
  const prompt = (await readFile(promptPath.resolved, "utf8")).trim();
  if (!prompt) throw new Error("MiniMax prompt is empty");
  if (prompt.length > 7000) {
    throw new Error(`MiniMax prompt exceeds 7000 characters: ${prompt.length}`);
  }

  const inputBytes = await readFile(inputPath.resolved);
  const dimensions = pngDimensions(inputBytes, inputPath.relative);
  if (dimensions.width / dimensions.height !== 16 / 9) {
    throw new Error(
      `MiniMax first frame must be exact 16:9, received ${dimensions.width}x${dimensions.height}`
    );
  }
  if (inputBytes.byteLength > 30 * 1024 * 1024) {
    throw new Error("MiniMax first frame exceeds the 30 MB image limit");
  }

  const duration = Number.parseInt(options.duration ?? "15", 10);
  if (!Number.isInteger(duration) || duration < 4 || duration > 15) {
    throw new Error("MiniMax H3 duration must be an integer from 4 through 15");
  }
  const resolution = options.resolution ?? "768P";
  if (!["768P", "2K"].includes(resolution)) {
    throw new Error("MiniMax H3 resolution must be 768P or 2K");
  }

  const imageUrl =
    options["input-url"] ?? `data:image/png;base64,${inputBytes.toString("base64")}`;

  const request = {
    model,
    content: [
      { type: "text", text: prompt },
      {
        type: "image_url",
        image_url: { url: imageUrl },
        role: "first_frame"
      }
    ],
    resolution,
    duration,
    ratio: "adaptive"
  };

  return {
    request,
    promptPath,
    inputPath,
    promptHash: digest(prompt),
    inputHash: digest(inputBytes),
    requestHash: digest(JSON.stringify(request)),
    dimensions,
    duration,
    resolution
  };
}

function authorizationHeader() {
  const apiKey = process.env.MINI_MAX_API_KEY;
  if (!apiKey) {
    throw new Error("MINI_MAX_API_KEY is not configured in the root .env");
  }
  return `Bearer ${apiKey}`;
}

async function minimaxRequest(requestPath, init) {
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/${requestPath.replace(/^\//, "")}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: authorizationHeader()
    },
    signal: AbortSignal.timeout(120_000)
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`MiniMax request failed with ${response.status}: ${body}`);
  }
  return response;
}

async function prepare(options) {
  const prepared = await preparedRequest(options);
  console.log(
    JSON.stringify(
      {
        model,
        endpoint: `${baseUrl.replace(/\/$/, "")}/v2/video_generation`,
        prompt: prepared.promptPath.relative,
        promptHash: prepared.promptHash,
        promptCharacters: prepared.request.content[0].text.length,
        input: prepared.inputPath.relative,
        inputHash: prepared.inputHash,
        dimensions: prepared.dimensions,
        requestHash: prepared.requestHash,
        duration: prepared.duration,
        resolution: prepared.resolution,
        ratio: "adaptive"
      },
      null,
      2
    )
  );
}

async function submit() {
  throw new Error("Experimental paid submission is disabled: use the governed content CLI with an exact work envelope. Prepare, status and download remain inspection-only.");
}

async function query(options) {
  const manifestPath = repositoryPath(required(options, "manifest"));
  const manifest = JSON.parse(await readFile(manifestPath.resolved, "utf8"));
  if (!manifest.taskId) throw new Error("MiniMax manifest has no taskId");

  const response = await minimaxRequest(
    `v2/query/video_generation/${encodeURIComponent(manifest.taskId)}`,
    { method: "GET" }
  );
  const result = await response.json();
  const task = result.task;
  if (!task?.status) throw new Error("MiniMax query response did not include task status");

  const updated = {
    ...manifest,
    status: task.status,
    updatedAt: new Date().toISOString(),
    usage: task.usage,
    outputRatio: task.ratio,
    error: task.error
  };

  if (task.status === "succeeded" && task.content?.url) {
    const videoRepoPath = repositoryPath(
      path.join(path.dirname(manifestPath.relative), `${manifest.id}.mp4`)
    );
    const videoResponse = await fetch(task.content.url, { signal: AbortSignal.timeout(300_000) });
    if (!videoResponse.ok) {
      throw new Error(`MiniMax video download failed with ${videoResponse.status}`);
    }
    const bytes = Buffer.from(await videoResponse.arrayBuffer());
    await writeFile(videoRepoPath.resolved, bytes);
    updated.location = videoRepoPath.relative;
    updated.outputHash = digest(bytes);
  }

  await writeFile(manifestPath.resolved, JSON.stringify(updated, null, 2));
  console.log(JSON.stringify({ status: task.status, manifest: manifestPath.resolved }, null, 2));
}

const [command, ...args] = process.argv.slice(2);
const options = optionsFrom(args);
if (command === "prepare") await prepare(options);
else if (command === "submit") await submit(options);
else if (command === "query") await query(options);
else throw new Error("Usage: minimax-h3-poc.mjs prepare|submit|query --name value");
