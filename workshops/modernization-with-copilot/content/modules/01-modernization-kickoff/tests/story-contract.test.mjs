import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../../../../../../", import.meta.url));
const workshopRoot = fileURLToPath(new URL("../../../../", import.meta.url));
const moduleRoot = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(join(root, "packages/content-schema/package.json"));
const { parseSync } = await import(pathToFileURL(require.resolve("@slidev/parser")).href);
const readModule = name => readFile(join(moduleRoot, name), "utf8");
const [markdown, metadata, component, transformText, brandLayer, teamProvenance] = await Promise.all([
  readModule("slides.md"),
  readModule("module.md"),
  readModule("components/StoryPanel.vue"),
  readModule("media/avatar-artwork-transform.json"),
  readModule("global-bottom.vue"),
  readModule("media/workflow-team-shallow-depth-v7.provenance.md")
]);
const slides = parseSync(markdown, join(moduleRoot, "slides.md")).slides;
const transform = JSON.parse(transformText);
const sha256 = value => createHash("sha256").update(value).digest("hex");

function pngSize(data) {
  assert.equal(data.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  return [data.readUInt32BE(16), data.readUInt32BE(20)];
}

test("every slide uses the story and selected persona treatment", () => {
  assert.equal(slides.length, 31);
  assert.match(slides[0].raw, /# Modernizing the Unknown with GitHub Copilot/);
  assert.match(slides[0].raw, />Agenda</);
  const teamTitle = slides[1].raw.match(/::title::\s*([\s\S]*?)\s*::image::/);
  assert.ok(teamTitle, "slide 2 has a team title slot");
  assert.equal(teamTitle[1].trim(), "# Meet the Team");
  assert.match(slides[1].raw, /purrmission-team-cover\.png/);
  assert.match(slides[1].raw, /Purrmission stands in front of Agent Mergewell/);
  const people = new Set();
  for (const [index, slide] of slides.entries()) {
    if (index === 1) {
      assert.match(slide.raw, /purrmission-team-cover\.png/);
      assert.match(slide.raw, /Can support get fresher status/);
      continue;
    }

    assert.match(slide.raw, /::text::/, `slide ${index + 1} has key topics`);
    const example = slide.raw.match(/::visual::\s*([\s\S]*?)\s*<!--/);
    assert.ok(example, `slide ${index + 1} has an example panel`);
    const panels = [...example[1].matchAll(/<StoryPanel\b[^>]*\bperson="([^"]+)"/g)];
    assert.equal(panels.length, index === 0 ? 0 : 1, `slide ${index + 1} has the intended persona treatment`);
    if (index !== 0) people.add(panels[0][1]);
    assert.match(example[1], /<p><strong>[^<]+:<\/strong>/, `slide ${index + 1} has a labeled story beat`);
    assert.ok((example[1].match(/<p>/g) ?? []).length >= 3, `slide ${index + 1} develops the example`);
  }
  assert.deepEqual([...people].sort(), ["mergewell", "morgan", "purrmission", "riley"]);
  assert.match(slides[7].raw, /We are modernizing primarily because <strong>\[top drivers\]<\/strong>/);
  assert.match(slides[7].raw, /We need to improve <strong>\[outcome\]<\/strong> while preserving <strong>\[critical behavior\]<\/strong>/);
  assert.match(slides[7].raw, /We will know we succeeded when <strong>\[observable result\]<\/strong>/);
  assert.match(slides[7].raw, /Considering <strong>\[cost, risks, alternatives\]<\/strong>/);
});

test("agent coordination preserves distinct review responsibilities and fixed criteria", () => {
  const coordination = slides[21].raw;
  assert.match(coordination, /Proposer \/ Riley/);
  assert.match(coordination, /Challenger \/ second agent/);
  assert.match(coordination, /Verifier \/ Mergewell/);
  assert.match(coordination, /cannot silently change acceptance criteria/);
  assert.match(coordination, /reproducible external checks against those fixed criteria/);
  assert.match(coordination, /A human integrates and decides; agent agreement is not proof/);
});

test("the agenda addresses the enterprise application without a persona cue", () => {
  const agenda = slides[0].raw;
  assert.match(agenda, /<StoryPanel title="Through the loop" compact>/);
  assert.match(agenda, /Your enterprise application; no live code changes today/);
  assert.doesNotMatch(agenda, /One example through the loop|A fictional COBOL service/);
  assert.match(component, /<div v-if="persona" class="story-panel__persona">/);
  assert.match(component, /person\?: keyof typeof personas/);
});

test("the shared brand layer places the authorized Microsoft mark on every slide", async () => {
  assert.match(brandLayer, /useSlideContext/);
  assert.match(brandLayer, /:data-brand-page="\$page"/);
  assert.match(brandLayer, /images\/microsoft-logo\.png/);
  assert.match(teamProvenance, /38557dd55052a46fbb07bf31c9fe2d1d4fc70e4feaeda70edfa6c75375cc25fb/);
  assert.ok(metadata.includes("content/modules/01-modernization-kickoff/public/images/microsoft-logo.png"));
  assert.ok(metadata.includes("content/modules/01-modernization-kickoff/public/images/purrmission-team-cover.png"));
  assert.ok(metadata.includes("content/modules/01-modernization-kickoff/public/images/workflow-team-shallow-depth-v7.png"));
  const declarations = JSON.parse(await readFile(join(root, ".github/public-release/export-files.json"), "utf8"));
  const entry = declarations.modules["modernization-with-copilot/modernization-kickoff"];
  assert.ok(entry.files.includes("content/modules/01-modernization-kickoff/global-bottom.vue"));
  assert.ok(entry.files.includes("content/modules/01-modernization-kickoff/media/workflow-team-shallow-depth-v7.provenance.md"));
  assert.ok(entry.tests.includes("content/modules/01-modernization-kickoff/tests/story-contract.test.mjs"));
});

test("persona cues remain native and distinguish human, agent, and boundary roles", () => {
  assert.match(component, /role: "Human sponsor"/);
  assert.match(component, /role: "Human engineer"/);
  assert.match(component, /role: "Software agent"/);
  assert.match(component, /role: "Boundary reminder"/);
  assert.match(component, /import\.meta\.env\.BASE_URL/);
  assert.match(component, /border-radius: 50%/);
  assert.match(component, /alt=""/);
  assert.match(component, /\{\{ persona\.name \}\}/);
  assert.match(component, /\{\{ persona\.role \}\}/);
  assert.match(component, /\{\{ action \}\}/);
});

test("story text leads and the persona is anchored at the padded panel bottom", () => {
  const template = component.match(/<template>([\s\S]*?)<\/template>/)?.[1];
  assert.ok(template);
  const title = template.indexOf("<h2>{{ title }}</h2>");
  const beats = template.indexOf('class="story-panel__beats"');
  const persona = template.indexOf('class="story-panel__persona"');
  assert.ok(title >= 0 && title < beats && beats < persona);
  assert.match(component, /\.story-panel \{[^}]*justify-content: flex-start;/s);
  assert.match(component, /\.story-panel \{[^}]*padding: 1\.1rem;/s);
  assert.match(component, /\.story-panel__persona \{[^}]*margin-top: auto;/s);
  for (const number of [1, 5, 6, 7, 22, 28]) {
    assert.match(slides[number - 1].raw, /<StoryPanel\b[^>]*\bcompact(?=\s|>)/, `slide ${number} uses the compact treatment`);
  }
});

test("Deploy explains optional containers without treating them as automatic security", () => {
  const deploy = slides[27].raw;
  assert.match(deploy, /When suitable, containers package a slice and dependencies/);
  assert.match(deploy, /tested image by digest/);
  assert.match(deploy, /Containers can isolate processes; they do not guarantee security/);
  assert.match(deploy, /runtime access, secrets, and host controls/);
  assert.match(deploy, /Image rollback cannot undo data changes/);
  assert.match(deploy, /Timebox: 5 minutes/);
});

test("selected portraits retain their declared bytes and portable transform provenance", async () => {
  assert.ok(!transformText.includes("\r"), "transform manifest uses portable UTF-8/LF bytes");
  assert.equal(transform.providerCalls, 0);
  assert.equal(transform.portraits.length, 4);
  for (const portrait of transform.portraits) {
    const relativeAsset = `content/modules/01-modernization-kickoff/public/images/${portrait.id}.png`;
    const imagePath = join(workshopRoot, ...relativeAsset.split("/"));
    const [image, source, sidecarText] = await Promise.all([
      readFile(imagePath),
      readFile(join(workshopRoot, ...portrait.source.split("/"))),
      readFile(`${imagePath}.json`, "utf8")
    ]);
    const sidecar = JSON.parse(sidecarText);
    assert.ok(metadata.includes(relativeAsset), `${portrait.id} is declared`);
    assert.deepEqual(pngSize(image), [512, 512], `${portrait.id} dimensions`);
    assert.equal(sha256(image), portrait.outputSha256, `${portrait.id} output`);
    assert.equal(sha256(source), portrait.sourceSha256, `${portrait.id} source`);
    assert.equal(sidecar.sha256, portrait.outputSha256, `${portrait.id} sidecar`);
    assert.equal(sidecar.sourceCandidateSha256, portrait.outputSha256, `${portrait.id} selected bytes`);
    assert.equal(sidecar.transformManifestSha256, sha256(transformText), `${portrait.id} transform`);
    assert.equal(sidecar.location, relativeAsset, `${portrait.id} location`);
    const [width, height] = pngSize(source);
    const crop = portrait.sourceCrop;
    assert.ok(crop.x >= 0 && crop.y >= 0 && crop.x + crop.width <= width && crop.y + crop.height <= height);
  }
});

test("public export carries the story component and its provenance", async () => {
  const declarations = JSON.parse(await readFile(join(root, ".github/public-release/export-files.json"), "utf8"));
  const entry = declarations.modules["modernization-with-copilot/modernization-kickoff"];
  const prefix = "content/modules/01-modernization-kickoff/";
  for (const file of [
    "components/StoryPanel.vue",
    "global-bottom.vue",
    "media/avatar-artwork-provenance.md",
    "media/workflow-team-shallow-depth-v7.provenance.md",
    "media/avatar-artwork-transform.json",
    "media/avatar-artwork-purrmission-original.json",
    "media/references/purrmission-seated-source.png",
    "media/references/purrmission-seated-source.png.json",
    "tests/story-contract.test.mjs"
  ]) {
    assert.ok(entry.files.includes(`${prefix}${file}`), `${file} is exported`);
  }
  assert.ok(entry.tests.includes(`${prefix}tests/story-contract.test.mjs`));
});
