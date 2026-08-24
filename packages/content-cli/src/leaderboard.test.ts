import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { ContentCatalog } from "@ghcp/content-schema";
import {
  DEFAULT_LEADERBOARD_KIT_PATH,
  ensureLeaderboardLabels,
  planLeaderboardPublish,
  resolveLeaderboardEnvironment
} from "./leaderboard.js";

const environments = {
  test: {
    repository: "mfm-se-dev-org/ghcp-dev-hack-leaderboard",
    submissionUrl: "https://github.com/mfm-se-dev-org/ghcp-dev-hack-leaderboard/issues/new?template=leaderboard-submission.yml",
    standingsUrl: "https://expert-adventure-386owy8.pages.github.io/"
  },
  production: {
    repository: "tammym-demos/ghcp-dev-hack-leaderboard",
    submissionUrl: "https://github.com/tammym-demos/ghcp-dev-hack-leaderboard/issues/new?template=leaderboard-submission.yml",
    standingsUrl: "https://tammym-demos.github.io/ghcp-dev-hack-leaderboard/"
  }
};

let root = "";
let workshopRoot = "";

function catalogFor(kitPath?: string): ContentCatalog {
  return {
    workshops: [
      {
        root: workshopRoot,
        workshop: {
          data: {
            id: "ghcp-dev-hack",
            leaderboard: { optional: true, aliasOnly: true, eventId: "ghcp-dev-hack", kitPath, environments }
          }
        }
      }
    ]
  } as unknown as ContentCatalog;
}

beforeEach(async () => {
  root = await mkdtemp(path.join(os.tmpdir(), "ghcp-leaderboard-test-"));
  workshopRoot = path.join(root, "workshops", "ghcp-dev-hack");
  const kit = path.join(workshopRoot, DEFAULT_LEADERBOARD_KIT_PATH);
  await mkdir(path.join(kit, "src"), { recursive: true });
  await mkdir(path.join(kit, "node_modules"), { recursive: true });
  await mkdir(path.join(kit, "sample-site"), { recursive: true });
  await writeFile(path.join(kit, "leaderboard.config.json"), "{}", "utf8");
  await writeFile(path.join(kit, "src", "leaderboard.mjs"), "export {};", "utf8");
  await writeFile(path.join(kit, "node_modules", "ignored.js"), "", "utf8");
  await writeFile(path.join(kit, "sample-site", "index.html"), "", "utf8");
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("leaderboard environment selection", () => {
  it("defaults to test and rejects unknown environments", () => {
    expect(resolveLeaderboardEnvironment(undefined)).toBe("test");
    expect(resolveLeaderboardEnvironment("test")).toBe("test");
    expect(resolveLeaderboardEnvironment("production")).toBe("production");
    expect(() => resolveLeaderboardEnvironment("staging")).toThrow(/test or production/);
  });
});

describe("leaderboard publish plan", () => {
  it("targets the declared repository for each environment", async () => {
    const production = await planLeaderboardPublish("ghcp-dev-hack", "production", catalogFor(), root);
    expect(production.repository).toBe(environments.production.repository);
    expect(production.standingsUrl).toBe(environments.production.standingsUrl);

    const test = await planLeaderboardPublish("ghcp-dev-hack", "test", catalogFor(), root);
    expect(test.repository).toBe(environments.test.repository);
  });

  it("publishes kit sources but never build output or dependencies", async () => {
    const plan = await planLeaderboardPublish("ghcp-dev-hack", "test", catalogFor(), root);

    expect(plan.files).toContain("leaderboard.config.json");
    expect(plan.files).toContain("src/leaderboard.mjs");
    expect(plan.files.some((file) => file.startsWith("node_modules/"))).toBe(false);
    expect(plan.files.some((file) => file.startsWith("sample-site/"))).toBe(false);
    expect(plan.kitDirectory).toBe(`workshops/ghcp-dev-hack/${DEFAULT_LEADERBOARD_KIT_PATH}`);
  });

  it("refuses a kit path that escapes the workshop root", async () => {
    await expect(planLeaderboardPublish("ghcp-dev-hack", "test", catalogFor("../../secrets"), root)).rejects.toThrow(
      /escapes the workshop root/
    );
  });

  it("reports a missing kit instead of publishing an empty repository", async () => {
    await expect(planLeaderboardPublish("ghcp-dev-hack", "test", catalogFor("artifacts/absent"), root)).rejects.toThrow(
      /does not exist/
    );
  });

  it("rejects an unknown workshop", async () => {
    await expect(planLeaderboardPublish("absent", "test", catalogFor(), root)).rejects.toThrow(/Unknown workshop/);
  });
});

describe("leaderboard label reconciliation", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  async function planWithLabels() {
    const kit = path.join(workshopRoot, DEFAULT_LEADERBOARD_KIT_PATH);
    await writeFile(
      path.join(kit, "leaderboard.config.json"),
      JSON.stringify({ labels: { submission: "leaderboard-submission", verified: "verified-score" } }),
      "utf8"
    );
    return planLeaderboardPublish("ghcp-dev-hack", "production", catalogFor(), root);
  }

  function respond(handler: (url: string, init: { method?: string }) => { status: number; body: unknown }) {
    const calls: { url: string; method: string }[] = [];
    globalThis.fetch = (async (input: unknown, init: { method?: string } = {}) => {
      const url = String(input);
      calls.push({ url, method: init.method ?? "GET" });
      const result = handler(url, init);
      return new Response(JSON.stringify(result.body), {
        status: result.status,
        headers: { "content-type": "application/json" }
      });
    }) as unknown as typeof fetch;
    return calls;
  }

  it("creates only the submission and verification labels the board is missing", async () => {
    const plan = await planWithLabels();
    const calls = respond((url, init) =>
      init.method === "POST" ? { status: 201, body: {} } : { status: 200, body: [{ name: "verified-score" }] }
    );

    const result = await ensureLeaderboardLabels(plan, "token", root);

    expect(result.created).toEqual(["leaderboard-submission"]);
    expect(result.warning).toBeUndefined();
    expect(calls.filter((call) => call.method === "POST")).toHaveLength(1);
  });

  it("continues when a missing label was already created", async () => {
    const plan = await planWithLabels();
    let postCount = 0;
    const calls = respond((_url, init) => {
      if (init.method !== "POST") return { status: 200, body: [] };
      postCount += 1;
      return postCount === 1
        ? {
            status: 422,
            body: { errors: [{ resource: "Label", field: "name", code: "already_exists" }] }
          }
        : { status: 201, body: {} };
    });

    const result = await ensureLeaderboardLabels(plan, "token", root);

    expect(result.created).toEqual(["verified-score"]);
    expect(result.warning).toBeUndefined();
    expect(calls.filter((call) => call.method === "POST")).toHaveLength(2);
  });

  it("still warns for unrelated validation failures", async () => {
    const plan = await planWithLabels();
    respond((_url, init) =>
      init.method === "POST"
        ? { status: 422, body: { errors: [{ resource: "Label", field: "color", code: "invalid" }] } }
        : { status: 200, body: [] }
    );

    const result = await ensureLeaderboardLabels(plan, "token", root);

    expect(result.created).toEqual([]);
    expect(result.warning).toMatch(/HTTP 422/);
  });

  it("warns instead of throwing when the token cannot manage labels", async () => {
    const plan = await planWithLabels();
    respond(() => ({ status: 403, body: { message: "Resource not accessible" } }));

    const result = await ensureLeaderboardLabels(plan, "token", root);

    expect(result.created).toEqual([]);
    expect(result.warning).toMatch(/Issues read and write/);
  });

  it("warns when no token is available rather than silently skipping", async () => {
    const plan = await planWithLabels();

    const result = await ensureLeaderboardLabels(plan, undefined, root);

    expect(result.warning).toMatch(/leaderboard-submission and verified-score/);
  });
});
