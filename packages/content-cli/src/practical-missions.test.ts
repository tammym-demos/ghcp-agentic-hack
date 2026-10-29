import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createContext, runInContext } from "node:vm";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { missionSchema } from "@ghcp/content-schema";
import { repositoryRoot } from "./paths.js";

const paths = [
  "foundations/context-and-prompts.md",
  "agentic/agent-task.md",
  "advanced/cross-cutting-change.md"
];
const missions = await Promise.all(paths.map(async (path) => missionSchema.parse(matter(
  await readFile(join(repositoryRoot, "workshops", "ghcp-agentic-hack", "content", "missions", path), "utf8")
).data)));
const boundary = "// END EDITABLE FUNCTIONS. Do not change the checks below.";
const functions = [
  'function labelFor(note) { return note.trim() || "(untitled)"; }',
  `function selectAlerts(alerts, minimum) {
    const ranks = { low: 1, normal: 2, high: 3, critical: 4 };
    if (!Object.hasOwn(ranks, minimum)) throw new Error("Unknown minimum");
    return alerts.filter(alert => ranks[alert.priority] >= ranks[minimum]);
  }`,
  'function summarizeAlerts(alerts) { return alerts.length + " alerts: " + (alerts.map(alert => labelFor(alert.title)).join(", ") || "none"); }'
].join("\n");

function script(html: string): string {
  const source = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  if (!source) throw new Error("Missing lab script");
  return source;
}

function run(source: string, group: string): string {
  const results = { textContent: "" };
  const context = createContext({ document: { getElementById: () => results } });
  runInContext(`${source}\nrun(${JSON.stringify(group)});`, context);
  return results.textContent;
}

describe("practical mission contracts", () => {
  it("preserves budgets, scoring and complete data-driven harness routes", () => {
    expect(missions.map(mission => mission.coreClues.map(clue => clue.id))).toEqual([
      ["set-up-the-case", "first-prompts", "see-the-context", "add-to-context", "credits-and-model", "autopilot-or-not"],
      ["open-the-case", "write-the-brief", "verify-the-evidence", "close-the-handoff", "watch-the-loop"],
      ["split-the-squad", "vet-the-surface", "govern-the-review", "debug-the-failure", "ship-the-decision"]
    ]);
    expect(missions[2]!.bonusClues.map(clue => clue.id)).toEqual([
      "compare-one-narrower-route", "read-only-evidence-drill", "day-two-tightenup", "merge-the-findings"
    ]);
    for (const [index, mission] of missions.entries()) {
      expect(mission.durationMinutes).toBe([45, 45, 30][index]);
      expect(mission.coreClues.reduce((sum, clue) => sum + (clue.durationMinutes ?? 0), 0)
        + (mission.debriefMinutes ?? 0)).toBe(mission.durationMinutes);
      expect(mission.coreClues.reduce((sum, clue) => sum + clue.points, 0)).toBe(50);
      expect(mission.completionPoints).toBe(40);
      expect(mission.bonusPointCap).toBe(10);
      expect(mission.harnesses.map(harness => harness.id)).toEqual(["ide-extension", "copilot-cli", "copilot-app"]);
      for (const clue of [...mission.coreClues, ...mission.bonusClues]) {
        expect(clue.routes.map(route => route.harness).sort()).toEqual(mission.harnesses.map(harness => harness.id).sort());
        expect(clue.evidence).toContain("___");
      }
    }
  });

  it("requires complete exact timing but preserves untimed compatibility", () => {
    const mission = missions[0]!;
    expect(missionSchema.safeParse({ ...mission, durationMinutes: 44 }).success).toBe(false);
    const coreClues = mission.coreClues.map(clue => ({ ...clue, durationMinutes: undefined }));
    expect(missionSchema.safeParse({ ...mission, coreClues }).success).toBe(false);
    expect(missionSchema.safeParse({ ...mission, coreClues, debriefMinutes: undefined }).success).toBe(true);
    expect(missionSchema.safeParse({ ...mission, debriefMinutes: 0 }).success).toBe(false);
    expect(missionSchema.safeParse({ ...mission, coreClues: mission.coreClues.map(clue => ({ ...clue, durationMinutes: -1 })) }).success).toBe(false);
  });

  it("requires routes for future harnesses without a hardcoded harness enum", () => {
    const mission = missions[0]!;
    const extended = { ...mission, harnesses: [...mission.harnesses, { id: "future-harness", title: "Future", description: "Local", instructions: ["Open folder."] }] };
    expect(missionSchema.safeParse(extended).success).toBe(false);
    const addRoute = (clue: typeof mission.coreClues[number]) => ({
      ...clue, routes: [...clue.routes, { harness: "future-harness", instructions: ["Run the same local check."] }]
    });
    expect(missionSchema.safeParse({
      ...extended, coreClues: mission.coreClues.map(addRoute), bonusClues: mission.bonusClues.map(addRoute)
    }).success).toBe(true);
  });

  it("starts with honest failures and carries earlier passing checks forward", () => {
    const sources = missions.map(mission => script(mission.starterFile!.content));
    expect(run(sources[0]!, "foundations").split("\n").filter(line => line.startsWith("FAIL"))).toHaveLength(1);
    expect(run(sources[1]!, "foundations")).not.toContain("FAIL");
    expect(run(sources[1]!, "agentic").split("\n").filter(line => line.startsWith("FAIL"))).toHaveLength(3);
    expect(run(sources[2]!, "foundations")).not.toContain("FAIL");
    expect(run(sources[2]!, "agentic")).not.toContain("FAIL");
    for (const group of ["filter", "summary", "integrated"]) expect(run(sources[2]!, group)).toContain("FAIL");
    expect(sources.map(source => source.slice(source.indexOf(boundary)))).toEqual(Array(3).fill(sources[0]!.slice(sources[0]!.indexOf(boundary))));
  });

  it("passes all twelve unchanged checks after bounded edits and restores baseline", () => {
    for (const mission of missions) {
      const original = script(mission.starterFile!.content);
      const completed = functions + "\n" + original.slice(original.indexOf(boundary));
      let count = 0;
      for (const group of ["foundations", "agentic", "filter", "summary", "integrated"]) {
        const output = run(completed, group);
        expect(output).not.toContain("FAIL");
        count += output.split("\n").length;
      }
      expect(count).toBe(12);
      expect(run(original, "integrated")).toContain("FAIL");
      const context = createContext({});
      runInContext(completed.slice(0, completed.indexOf(boundary)), context);
      expect(runInContext(`JSON.stringify((() => {
        const input = [{title:" B ",priority:"high"},{title:"A",priority:"low"},{title:"C",priority:"critical"}];
        const before = JSON.stringify(input);
        const selected = selectAlerts(input, "high");
        return [selected.map(item => item.title), before === JSON.stringify(input)];
      })())`, context)).toBe('[[" B ","C"],true]');
    }
  });

  it("rejects treating high and critical as equal in every supplied starter", () => {
    const incorrectFunctions = functions.replace("high: 3, critical: 4", "high: 3, critical: 3");
    for (const mission of missions) {
      const original = script(mission.starterFile!.content);
      const incorrect = incorrectFunctions + "\n" + original.slice(original.indexOf(boundary));
      expect(run(incorrect, "filter")).toContain("FAIL critical minimum excludes high");
    }
  });

  it.each([
    ["in-place title trimming", "alerts.forEach(alert => { alert.title = alert.title.trim(); });"],
    ["input reordering", "alerts.reverse();"],
    ["discarded-alert mutation", 'alerts[1].title = "changed";']
  ])("rejects %s in every supplied starter", (_name, mutation) => {
    const incorrectFunctions = functions.replace(
      "return alerts.filter(alert => ranks[alert.priority] >= ranks[minimum]);",
      `${mutation} return alerts.filter(alert => ranks[alert.priority] >= ranks[minimum]);`
    );
    for (const mission of missions) {
      const original = script(mission.starterFile!.content);
      const incorrect = incorrectFunctions + "\n" + original.slice(original.indexOf(boundary));
      expect(run(incorrect, "agentic")).toContain("FAIL high only");
    }
  });

  it("replaces and re-supplies the continuing brief before the Advanced lanes", () => {
    const actions = missions[2]!.coreClues[0]!.actions.join("\n");
    expect(actions).toContain("`brief.md`, replace any earlier goal and boundaries");
    expect(actions).toContain("Allowed: selectAlerts and summarizeAlerts only.");
    expect(actions).toContain("No-touch: labelFor and all checks.");
    expect(actions).toContain("Re-supply the updated `brief.md` before requesting snippets.");
  });
});
