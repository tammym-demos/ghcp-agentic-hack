import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { workEnvelopeSchema, type MediaActionRequest, type WorkEnvelope } from "@ghcp/content-schema";
import { canonical, sha256, workBaselineHash } from "./production-records.js";
import type { AuthorizationRoots } from "./authorization.js";

// Shared mocked-workshop setup; never points at an authored workshop.
export async function authorizationFixture(
  roots: AuthorizationRoots,
  requests: MediaActionRequest[],
  overrides: Partial<WorkEnvelope> = {}
) {
  const first = requests[0]!;
  const workshopRoot = path.join(roots.workshopsRoot, first.workshopId);
  const production = path.join(workshopRoot, "content", "production");
  await mkdir(production, { recursive: true });
  const baseline = await Promise.all([...new Set(requests.map(request => request.source))].map(async source => ({
    path: source, sha256: sha256(await readFile(path.join(workshopRoot, source)))
  })));
  const gates = ["scope", "contract", "content", "concept", "story", "look"] as const;
  const envelope = workEnvelopeSchema.parse({
    schemaVersion: 1, id: "test-envelope", initiative: "test-initiative",
    moduleId: first.moduleId, cycleId: first.cycleId, status: "active", baseline,
    ownedPaths: ["content", "assets"], gateDecisions: gates.map(gate => `${gate}-decision`),
    actions: requests.map((request, index) => ({ id: `action-${index}`, decisionId: `decision-${index}`, request })),
    limits: { maxActions: requests.length, maxProviderCalls: requests.length, maxCandidates: requests.length },
    stopConditions: ["Stop on failed sample"], sampleStatus: "passed", expiresAt: "2099-01-01T00:00:00.000Z",
    ...overrides
  });
  const envelopePath = path.join(production, "work-envelope.json");
  const statePath = path.join(production, "production-state.md");
  const logPath = path.join(production, "decision-log.md");
  const baselineHash = workBaselineHash(envelope);
  const common = { initiative: envelope.initiative, decision: "approved", baselineHash,
    envelopeHash: sha256(canonical(envelope)), recordedBy: "Test human", recordedAt: "2026-01-01T00:00:00.000Z", rationale: "Fixture approval only" };
  const decisions = [
    ...gates.map(gate => ({ ...common, id: `${gate}-decision`, gate })),
    ...envelope.actions.map(action => ({ ...common, id: action.decisionId,
      gate: action.request.kind.startsWith("accept-") ? "candidate" : action.request.kind.startsWith("publish-") ? "publication" : "paid-action",
      requestHash: sha256(canonical(action.request)) }))
  ];
  await writeFile(logPath, "# Decisions\n" + decisions.map(decision => `\n\`\`\`production-decision\n${JSON.stringify(decision)}\n\`\`\`\n`).join(""));
  await writeFile(envelopePath, JSON.stringify(envelope));
  await writeFile(path.join(production, "production-ledger.md"), `# Ledger\n\n### ${envelope.initiative}\n\n- Status: testing\n`);
  await writeFile(statePath, matter.stringify("# Current state\n", {
    schemaVersion: 1, kind: "production-state", workshop: first.workshopId, lifecycleVersion: 2,
    phase: "production", sessionStatus: "active", currentInitiative: envelope.initiative,
    currentOwner: "Test specialist", nextOwner: "Human", nextHumanGate: "Candidate",
    resumeTask: "test-task", approvedArtifacts: [], blockers: [],
    timing: { totalMinutes: 60, allocatedMinutes: 60, source: first.source },
    paidGeneration: "approved-for-listed-actions", releaseState: "not-ready",
    branch: "test", lastValidatedCommit: "a".repeat(40), checkpointId: "test-checkpoint",
    updatedAt: "2026-01-01T00:00:00.000Z", workEnvelope: "content/production/work-envelope.json"
  }));
  return { envelope, envelopePath, statePath, logPath, baselineHash };
}
