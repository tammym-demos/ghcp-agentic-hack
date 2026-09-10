import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import { reviewPacketSchema } from "@ghcp/content-schema";
import { activeDecision, localFile, readDecisions, sha256 } from "./production-records.js";
import { repositoryRoot } from "./paths.js";

const escape = (text: unknown) => String(text).replace(/[&<>"']/g, char =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export async function renderReviewPacket(input: unknown, root = repositoryRoot): Promise<string> {
  const packet = reviewPacketSchema.parse(input);
  const decisions = await readDecisions(path.join(root, "workshops", packet.workshopId));
  for (const item of packet.decisions) {
    for (const id of item.prerequisiteDecisionIds) {
      const decision = activeDecision(decisions, id);
      if (!decision || decision.initiative !== packet.initiative || decision.baselineHash !== packet.baselineHash ||
          !["approved", "not-applicable"].includes(decision.decision)) {
        throw new Error(`Review decision prerequisite is missing, stale or undecided: ${id}`);
      }
    }
  }
  if (packet.effort.acceptedOutcome !== "pending") {
    const outcome = activeDecision(decisions, packet.effort.outcomeDecisionId!);
    if (!outcome || !["candidate", "integration", "feedback-outcome", "local-release-candidate"].includes(outcome.gate) ||
        outcome.initiative !== packet.initiative || outcome.baselineHash !== packet.baselineHash ||
        (packet.effort.acceptedOutcome === "accepted" ? outcome.decision !== "approved" : outcome.decision !== "declined") ||
        !packet.artifacts.every(artifact => outcome.viewedArtifactHashes?.includes(artifact.sha256))) {
      throw new Error("Outcome must reference the human decision against the exact artifacts viewed");
    }
  }
  const media = await Promise.all(packet.artifacts.map(async artifact => {
    const bytes = await readFile(await localFile(root, artifact.path));
    if (sha256(bytes) !== artifact.sha256) throw new Error(`Review artifact changed: ${artifact.path}`);
    const extension = path.extname(artifact.path).toLowerCase();
    const types: Record<string, string> = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".mp4": "video/mp4", ".webm": "video/webm" };
    const type = types[extension];
    let content: string;
    if (artifact.kind === "document") content = `<pre>${escape(bytes.toString("utf8"))}</pre>`;
    else {
      if (!type || !type.startsWith(`${artifact.kind}/`)) throw new Error(`Unsupported review media: ${artifact.path}`);
      const url = `data:${type};base64,${bytes.toString("base64")}`;
      content = artifact.kind === "image"
        ? `<img alt="${escape(artifact.caption)}" src="${url}">`
        : `<video controls muted playsinline preload="metadata" src="${url}"></video>`;
    }
    return `<figure>${content}<figcaption>${escape(artifact.caption)}<br>${escape(artifact.path)}<br>SHA-256: ${artifact.sha256}</figcaption></figure>`;
  }));
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; media-src data:; style-src 'unsafe-inline'">
<title>Private review: ${escape(packet.initiative)}</title>
<style>body{font:18px system-ui;margin:auto;padding:1rem;max-width:58rem;line-height:1.5}img,video{max-width:100%;height:auto}pre{white-space:pre-wrap;overflow-wrap:anywhere}figure{margin:1rem 0}figcaption{font-size:.8rem;overflow-wrap:anywhere}</style>
<h1>Decisions requested</h1><ul>${packet.decisions.map(item => `<li><strong>${escape(item.id)}</strong>: ${escape(item.question)} — approve / revise / decline / defer, independently. Pending until recorded.</li>`).join("")}</ul>
<p>Initiative: ${escape(packet.initiative)}<br>Baseline: ${packet.baselineHash}</p>
<p>${escape(packet.explanation)}</p>${media.join("")}
<h2>Risks and stop state</h2><ul>${packet.risks.map(risk => `<li>${escape(risk)}</li>`).join("")}</ul><p>${escape(packet.stopState)}</p>
<h2>Effort and coverage</h2><pre>${escape(JSON.stringify(packet.effort, (_key, value) => value === null ? "unknown" : value, 2))}</pre>
<h2>Review channel</h2><p>Private access: ${escape(packet.channel.access)}. Notification: ${escape(packet.channel.notification)}.</p>
<p>This is local evidence, not uploaded or published. Localhost is not remote access. An owner-verified field records a human report, not automatic authentication. Playback is required for motion review. Technical conformance is separate from human teaching-quality acceptance.</p></html>`;
}

export async function writeReviewPacket(inputPath: string, outputPath: string, root = repositoryRoot) {
  const input = await readFile(await localFile(root, inputPath.replace(/\\+/g, "/")), "utf8");
  const html = await renderReviewPacket(JSON.parse(input), root);
  const output = path.resolve(root, outputPath);
  const relative = path.relative(root, output);
  if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Review output must remain inside the repository");
  await mkdir(path.dirname(output), { recursive: true });
  const parent = await realpath(path.dirname(output));
  const base = await realpath(root);
  if (parent !== base && !parent.startsWith(`${base}${path.sep}`)) throw new Error("Review output escapes repository");
  await writeFile(output, html, { flag: "wx" });
  return output;
}
