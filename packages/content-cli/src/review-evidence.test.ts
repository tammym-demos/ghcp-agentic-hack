import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { effortEvidenceSchema, reviewPacketSchema } from "@ghcp/content-schema";
import { renderReviewPacket, writeReviewPacket } from "./review-evidence.js";
import { recordProductionDecision, parseDecisions, sha256 } from "./production-records.js";

const roots: string[] = [];
afterEach(async () => { await Promise.all(roots.splice(0).map(root => rm(root, { recursive: true, force: true }))); });
async function fixture() {
  const root = path.resolve("node_modules", `review-${crypto.randomUUID()}`);
  roots.push(root);
  const workshopRoot = path.join(root, "workshops", "demo");
  await mkdir(path.join(workshopRoot, "content", "production"), { recursive: true });
  await writeFile(path.join(workshopRoot, "content", "production", "decision-log.md"), "# Decisions");
  await writeFile(path.join(root, "proof.txt"), "Exact <script>private proof</script>");
  const packet = {
    schemaVersion: 1, workshopId: "demo", initiative: "test", baselineHash: "a".repeat(64),
    explanation: "Teaching proof", risks: ["Motion not shown"], stopState: "Awaiting human",
    decisions: [{ id: "visual", question: "Does the picture teach the concept?", prerequisiteDecisionIds: [] }],
    artifacts: [{ path: "proof.txt", sha256: sha256("Exact <script>private proof</script>"), kind: "document", caption: "Actual proof" }],
    effort: { schemaVersion: 1, initiative: "test", baselineHash: "a".repeat(64), phase: "review", coverage: "No host telemetry available" },
    channel: { access: "unverified", notification: "unknown" }
  };
  return { root, workshopRoot, packet };
}

describe("honest effort and private review evidence", () => {
  it("defaults missing measurements to unknown, not zero, without converting units", async () => {
    const f = await fixture();
    const effort = effortEvidenceSchema.parse({ ...f.packet.effort, copilotUnits: 12.5, cacheReadTokens: 100 });
    expect(effort.model).toBeNull();
    expect(effort.providerCharge).toBeNull();
    expect(effort.activeExecutionSeconds).toBeNull();
    expect(effort.copilotUnits).toBe(12.5);
    expect(effort.cacheReadTokens).toBe(100);
    const html = await renderReviewPacket(f.packet, f.root);
    expect(html).toContain("unknown");
    expect(html).toContain("Private access: unverified");
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
    expect(html.indexOf("Decisions requested")).toBeLessThan(html.indexOf("<figure>"));
  });
  it("rejects changed artifact bytes, mismatched effort scope and unproved access", async () => {
    const f = await fixture();
    expect(() => reviewPacketSchema.parse({ ...f.packet, effort: { ...f.packet.effort, initiative: "other" } })).toThrow();
    expect(() => reviewPacketSchema.parse({ ...f.packet, channel: { access: "owner-verified" } })).toThrow();
    await writeFile(path.join(f.root, "proof.txt"), "changed");
    await expect(renderReviewPacket(f.packet, f.root)).rejects.toThrow("artifact changed");
  });
  it("requires decided prerequisites and exact viewed evidence for accepted outcomes", async () => {
    const f = await fixture();
    const packet = { ...f.packet, decisions: [{ ...f.packet.decisions[0], prerequisiteDecisionIds: ["prior"] }] };
    await expect(renderReviewPacket(packet, f.root)).rejects.toThrow("prerequisite");
    await recordProductionDecision(f.workshopRoot, {
      id: "prior", initiative: "test", gate: "integration", decision: "approved", baselineHash: f.packet.baselineHash,
      recordedBy: "Test human", recordedAt: "2026-01-01T00:00:00.000Z", rationale: "Fixture decision only",
      viewedArtifactHashes: [f.packet.artifacts[0]!.sha256]
    });
    await expect(renderReviewPacket({ ...packet, effort: { ...packet.effort, acceptedOutcome: "accepted", outcomeDecisionId: "prior" } }, f.root)).resolves.toContain("accepted");
    await expect(renderReviewPacket({ ...packet, effort: { ...packet.effort, acceptedOutcome: "accepted", outcomeDecisionId: "unknown" } }, f.root)).rejects.toThrow("Outcome");
  });
  it("records each decision once and writes local packets exclusively without uploading", async () => {
    const f = await fixture();
    const decision = { id: "one", initiative: "test", gate: "scope", decision: "approved",
      baselineHash: f.packet.baselineHash, recordedBy: "Human", recordedAt: "2026-01-01T00:00:00.000Z", rationale: "Actual decision supplied" };
    await recordProductionDecision(f.workshopRoot, decision);
    await expect(recordProductionDecision(f.workshopRoot, decision)).rejects.toThrow("already exists");
    const records = parseDecisions(await readFile(path.join(f.workshopRoot, "content", "production", "decision-log.md"), "utf8"));
    expect(records).toHaveLength(1);
    await writeFile(path.join(f.root, "evidence.json"), JSON.stringify(f.packet));
    await writeReviewPacket("evidence.json", "packet.html", f.root);
    await mkdir(path.join(f.root, "nested"));
    await writeFile(path.join(f.root, "nested", "evidence.json"), JSON.stringify(f.packet));
    await expect(writeReviewPacket("nested\\\\evidence.json", "nested-packet.html", f.root)).resolves.toContain("nested-packet.html");
    await expect(writeReviewPacket("evidence.json", "packet.html", f.root)).rejects.toThrow();
    await expect(writeReviewPacket("evidence.json", "..\\outside.html", f.root)).rejects.toThrow("inside the repository");
  });
});
