import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  mediaActionRequestSchema, workEnvelopeSchema,
  type MediaActionRequest, type ProductionDecision
} from "@ghcp/content-schema";
import { loadProductionState } from "./lifecycle.js";
import { activeDecision, canonical, localFile, readDecisions, section, sha256, workBaselineHash } from "./production-records.js";
import { candidatesRoot, repositoryRoot, workshopsRoot } from "./paths.js";

export type AuthorizationRoots = { repositoryRoot: string; workshopsRoot: string; candidatesRoot: string };
const defaults: AuthorizationRoots = { repositoryRoot, workshopsRoot, candidatesRoot };
export type ActionAuthorizationEvidence = {
  initiative: string; envelopeId: string; envelopeHash: string; decisionId: string; requestHash: string;
};

export function isPaid(request: MediaActionRequest): boolean {
  return request.kind === "generate-image" || request.kind === "submit-video";
}

export async function describeEnvelope(workshopId: string, envelopePath?: string, roots: AuthorizationRoots = defaults) {
  const { state } = await loadProductionState(workshopId, roots);
  const reference = envelopePath?.replace(/\\+/g, "/") ?? state.workEnvelope;
  if (!reference) throw new Error("No workEnvelope reference; inspection cannot invent authorization");
  const root = path.join(roots.workshopsRoot, workshopId);
  const envelope = workEnvelopeSchema.parse(JSON.parse(await readFile(await localFile(root, reference), "utf8")));
  return {
    inspectionOnly: true,
    path: reference,
    envelope,
    envelopeHash: sha256(canonical(envelope)),
    baselineHash: workBaselineHash(envelope),
    baseline: await Promise.all(envelope.baseline.map(async file => ({
      ...file, actualHash: sha256(await readFile(await localFile(root, file.path)))
    }))),
    actions: envelope.actions.map(action => ({
      id: action.id, decisionId: action.decisionId, requestHash: sha256(canonical(action.request))
    })),
    consent: "Not inferred; inspect does not authorize execution"
  };
}

async function authority(request: MediaActionRequest, roots: AuthorizationRoots) {
  const loaded = await loadProductionState(request.workshopId, roots);
  const { state } = loaded;
  if (state.workshop !== request.workshopId) throw new Error("Production state workshop mismatch");
  if (state.sessionStatus !== "active" || state.blockers.length) throw new Error("Production paused, blocked or awaiting human; inspect only");
  if (!state.workEnvelope) throw new Error("New action requires production-state workEnvelope and explicit decision references; historical assets remain readable");
  if (isPaid(request) && state.paidGeneration !== "approved-for-listed-actions") throw new Error("Paid generation is not approved or has been revoked/spent");
  const workshopRoot = path.join(roots.workshopsRoot, request.workshopId);
  section(await readFile(await localFile(workshopRoot, "content/production/production-ledger.md"), "utf8"), state.currentInitiative);
  const envelope = workEnvelopeSchema.parse(JSON.parse(await readFile(await localFile(workshopRoot, state.workEnvelope), "utf8")));
  if (envelope.status !== "active" || Date.parse(envelope.expiresAt) <= Date.now()) throw new Error("Work envelope revoked, stopped or expired");
  if (envelope.sampleStatus === "failed") throw new Error("Failed representative sample stops expansion");
  if (envelope.initiative !== state.currentInitiative || envelope.moduleId !== request.moduleId || envelope.cycleId !== request.cycleId) {
    throw new Error("Action initiative/module/cycle does not match active authority");
  }
  const matches = envelope.actions.filter(action => canonical(action.request) === canonical(request));
  if (matches.length !== 1) throw new Error(`Exact action inputs are missing or ambiguous. Inspect request: ${canonical(request)}`);
  const action = matches[0]!;
  for (const file of envelope.baseline) {
    if (sha256(await readFile(await localFile(workshopRoot, file.path))) !== file.sha256) {
      throw new Error(`Approved baseline changed: ${file.path}`);
    }
  }
  if (!envelope.baseline.some(file => file.path === request.source && file.sha256 === request.sourceHash)) {
    throw new Error("Action source must be included in the approved baseline");
  }
  const ownedSource = envelope.ownedPaths.some(owned => request.source === owned || request.source.startsWith(`${owned}/`));
  const ownedTarget = request.kind !== "publish-image" || envelope.ownedPaths.some(owned =>
    request.target === owned || request.target?.startsWith(`${owned}/`));
  if (!ownedSource || !ownedTarget) throw new Error("Action source/target is outside the owned scope");
  const baselineHash = workBaselineHash(envelope);
  const envelopeHash = sha256(canonical(envelope));
  const decisions = await readDecisions(workshopRoot);
  const resolve = (id: string, exactAction = false): ProductionDecision => {
    const decision = activeDecision(decisions, id);
    if (!decision || decision.initiative !== envelope.initiative ||
        decision.baselineHash !== baselineHash || (exactAction && decision.envelopeHash !== envelopeHash) ||
        !["approved", "not-applicable"].includes(decision.decision)) {
      throw new Error(`Missing, stale or revoked human decision: ${id}`);
    }
    return decision;
  };
  const gates = envelope.gateDecisions.map(id => resolve(id));
  const requiredGates = isPaid(request) ? ["scope", "contract", "content", "concept", "story", "look"] : ["scope"];
  for (const gate of requiredGates) {
    const records = gates.filter(decision => decision.gate === gate);
    if (records.length !== 1 || (records[0]!.decision === "not-applicable" && !["contract", "story", "look"].includes(gate))) {
      throw new Error(`Missing independent ${gate} decision (medium applicability must be human-recorded)`);
    }
  }
  const decision = resolve(action.decisionId, true);
  const requiredGate = isPaid(request) ? "paid-action" : request.kind.startsWith("accept-") ? "candidate" : "publication";
  if (decision.gate !== requiredGate || decision.decision !== "approved" || decision.requestHash !== sha256(canonical(request))) {
    throw new Error(`Exact independent ${requiredGate} approval required`);
  }
  return { envelope, envelopeHash, action, decision };
}

export async function inspectAuthorization(request: MediaActionRequest, roots = defaults) {
  return authority(mediaActionRequestSchema.parse(request), roots);
}

// Exclusive mkdir serializes reservations across processes. A crash retains its lock
// or reserved action; neither is automatically cleared/refunded on restart.
export async function authorizedAction<T>(
  rawRequest: MediaActionRequest,
  perform: (evidence: ActionAuthorizationEvidence) => Promise<T>,
  roots: AuthorizationRoots = defaults
): Promise<T> {
  const request = mediaActionRequestSchema.parse(rawRequest);
  const initial = await authority(request, roots);
  const cycle = path.join(roots.candidatesRoot, request.workshopId, request.moduleId, request.cycleId);
  const journal = path.join(cycle, "authorizations");
  await mkdir(journal, { recursive: true });
  const lock = path.join(journal, ".reservation-lock");
  try { await mkdir(lock); } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "EEXIST") {
      throw new Error("Authorization reservation busy or uncertain after crash; inspect, do not retry");
    }
    throw error;
  }
  let recordPath = "";
  let record: Record<string, unknown> = {};
  try {
    const current = await authority(request, roots);
    if (current.envelopeHash !== initial.envelopeHash) throw new Error("Authorization changed during reservation");
    const records = await Promise.all((await readdir(journal)).filter(name => name.endsWith(".json"))
      .map(async name => JSON.parse(await readFile(path.join(journal, name), "utf8")) as Record<string, unknown>));
    if (records.some(entry => entry.status !== "succeeded")) throw new Error("Uncertain or failed prior action blocks this cycle; human reconciliation required");
    const used = records.filter(entry => entry.envelopeId === current.envelope.id);
    const paidCount = used.filter(entry => entry.paid === true).length;
    if (used.length >= current.envelope.limits.maxActions ||
        (isPaid(request) && (paidCount >= current.envelope.limits.maxProviderCalls ||
          paidCount >= current.envelope.limits.maxCandidates))) throw new Error("Work envelope exhausted");
    if (isPaid(request) && current.envelope.sampleStatus === "pending" && paidCount > 0) {
      throw new Error("Representative sample awaits human review; no batch expansion");
    }
    recordPath = path.join(journal, `${current.envelope.id}--${current.action.id}.json`);
    record = { schemaVersion: 1, envelopeId: current.envelope.id, envelopeHash: current.envelopeHash,
      initiative: current.envelope.initiative, actionId: current.action.id, decisionId: current.decision.id,
      request, requestHash: sha256(canonical(request)), paid: isPaid(request),
      status: "reserved", reservedAt: new Date().toISOString() };
    try { await writeFile(recordPath, JSON.stringify(record, null, 2), { flag: "wx" }); }
    catch (error) {
      if (error instanceof Error && "code" in error && error.code === "EEXIST") {
        throw new Error("Duplicate action or uncertain prior reservation; never silently retry");
      }
      throw error;
    }
  } finally {
    await rm(lock, { recursive: true });
  }
  try {
    // Recheck revocation/pause immediately before crossing the side-effect boundary.
    const current = await authority(request, roots);
    if (current.envelopeHash !== initial.envelopeHash) throw new Error("Authorization changed before execution");
    const result = await perform({
      initiative: current.envelope.initiative, envelopeId: current.envelope.id,
      envelopeHash: current.envelopeHash, decisionId: current.decision.id,
      requestHash: sha256(canonical(request))
    });
    await writeFile(recordPath, JSON.stringify({ ...record, status: "succeeded", completedAt: new Date().toISOString() }, null, 2));
    return result;
  } catch (error) {
    // Do not persist provider errors which can contain sensitive request/response data.
    await writeFile(recordPath, JSON.stringify({ ...record, status: "uncertain", completedAt: new Date().toISOString() }, null, 2));
    throw error;
  }
}

export async function assertCandidateAccepted(request: MediaActionRequest, roots: AuthorizationRoots = defaults) {
  const directory = path.join(roots.candidatesRoot, request.workshopId, request.moduleId, request.cycleId, "authorizations");
  let names: string[];
  try { names = await readdir(directory); } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new Error("Candidate acceptance is required before publication");
    }
    throw error;
  }
  const expected = request.kind === "publish-image" ? "accept-image" : "accept-video";
  const records = await Promise.all(names.filter(name => name.endsWith(".json"))
    .map(async name => JSON.parse(await readFile(path.join(directory, name), "utf8"))));
  const candidates = records.filter(record => record.status === "succeeded" && record.request?.kind === expected &&
    record.request.candidateHash === request.candidateHash && record.request.manifestHash === request.manifestHash &&
    record.request.assetId === request.assetId && record.request.workshopId === request.workshopId &&
    record.request.moduleId === request.moduleId && record.request.cycleId === request.cycleId);
  if (!candidates.length) throw new Error("Exact candidate bytes and manifest need separate human acceptance before publication");
  // Acceptance can be revoked after recording; a receipt alone is not current consent.
  const decisions = await readDecisions(path.join(roots.workshopsRoot, request.workshopId));
  for (const accepted of candidates) {
    const decision = activeDecision(decisions, accepted.decisionId);
    if (decision?.decision === "approved" && decision.gate === "candidate" &&
        decision.initiative === accepted.initiative && decision.envelopeHash === accepted.envelopeHash &&
        decision.requestHash === accepted.requestHash && accepted.requestHash === sha256(canonical(accepted.request)) &&
        accepted.request.source === request.source && accepted.request.sourceHash === request.sourceHash &&
        accepted.request.promptHash === request.promptHash) {
      return { decisionId: decision.id, requestHash: decision.requestHash,
        candidateHash: request.candidateHash!, manifestHash: request.manifestHash! };
    }
  }
  throw new Error("Candidate acceptance revoked or stale");
}
