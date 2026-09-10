// Production-shaped slide18 review. No installs, downloads or candidate imports.
// --serve --port=4320 serves an EXISTING GITHUB_PAGES_BASE=/ full build.
// PLAYWRIGHT_MODULE may name an installed package entry or package directory.
// Otherwise resolve playwright-core/playwright through this repository's tooling.
import { createReadStream, existsSync, statSync } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { BEATS, layersFor } from "../packages/slidev-theme/lib/manufacturing-context-sequence.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const arg = (name, fallback) => process.argv.find(s => s.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const port = Number(arg("port", "4320"));
// The canonical full build explicitly uses --router-mode hash (build.ts).
const route = "/workshops/ghcp-dev-hack/foundations/#/18?clicks=0";
const url = arg("url", `http://127.0.0.1:${port}${route}`);
const folder = resolve(root, arg("output", "generated/candidates/ghcp-dev-hack/foundations/2026-09-07-production-adoption"));
const started = performance.now();
if (process.versions.node.split(".")[0] !== "22") throw new Error("Use installed Node22.");

function serve() {
  const dist = resolve(root, "dist");
  if (!existsSync(join(dist, "workshops/ghcp-dev-hack/foundations/index.html"))) throw new Error("Full build missing.");
  // Same static-file + deck-history-fallback model as preview-local.mjs, with
  // root base and loopback binding. Missing assets are real 404s, never HTML.
  const server = createServer((request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
      let path = resolve(dist, `.${pathname}`);
      if (path !== dist && !path.startsWith(`${dist}${sep}`)) {
        response.writeHead(403).end(); return;
      }
      if (!existsSync(path) && /^\/workshops\/[^/]+\/[^/]+\/(?:\d+|presenter\/\d+|notes\/\d+)\/?$/.test(pathname)) {
        path = join(dist, ...pathname.split("/").slice(1, 4), "index.html");
      }
      if (existsSync(path) && statSync(path).isDirectory()) path = join(path, "index.html");
      if (!existsSync(path)) { response.writeHead(404).end("Not found"); return; }
      const type = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".ico": "image/x-icon" }[extname(path)] ?? "application/octet-stream";
      response.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
      createReadStream(path).pipe(response);
    } catch (error) { response.writeHead(400).end(String(error)); }
  });
  server.listen(port, "127.0.0.1", () => console.log(`PRODUCTION_REVIEW_URL http://127.0.0.1:${server.address().port}${route}`));
}

async function playwright() {
  if (process.env.PLAYWRIGHT_MODULE) {
    const path = resolve(process.env.PLAYWRIGHT_MODULE);
    return import(pathToFileURL(statSync(path).isDirectory() ? join(path, "index.mjs") : path).href);
  }
  for (const base of ["package.json", "apps/decks/package.json"]) {
    const require = createRequire(join(root, base));
    for (const name of ["playwright-core", "playwright"]) {
      try { return await import(pathToFileURL(require.resolve(name)).href); } catch { /* try installed fallback */ }
    }
  }
  throw new Error("No installed Playwright found. Set PLAYWRIGHT_MODULE to an existing package entry; do not install/download.");
}

async function review() {
  assert(["127.0.0.1", "localhost"].includes(new URL(url).hostname), "Local review only");
  assert(new URL(url).pathname.endsWith("/workshops/ghcp-dev-hack/foundations/") && new URL(url).hash.startsWith("#/18"), "Review the real full module route");
  await mkdir(folder, { recursive: true });
  const { chromium } = await playwright();
  const browser = await chromium.launch({ channel: process.env.REVIEW_BROWSER_CHANNEL ?? "msedge", headless: true });
  const errors = [], badResponses = [], results = [];
  try {
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
    await context.route("**/*", request => ["127.0.0.1", "localhost"].includes(new URL(request.request().url()).hostname) ? request.continue() : request.abort());
    const page = await context.newPage();
    page.on("pageerror", e => errors.push(e.message));
    page.on("response", response => { if (response.status() >= 400) badResponses.push([response.status(), response.url()]); });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.load('700 34px "Proof World"');
      await document.fonts.load('400 19px "Proof Body"');
      await document.fonts.ready;
      const image = new Image();
      image.src = document.querySelector(".fixed-plate").getAttribute("href");
      await image.decode();
    });
    const state = async n => {
      await page.waitForFunction(n => document.querySelector(".proof")?.getAttribute("data-step") === String(n), n);
      assert.equal(await page.locator(".proof").count(), 1);
      assert(new URL(page.url()).hash.split("?")[0] === "#/18", "Controls stay on production slide18");
    };
    const progress = n => page.waitForFunction(n => Number(document.querySelector(".proof")?.getAttribute("data-elapsed")) >= n, n);
    const button = name => page.getByRole("button", { name, exact: true });
    const pause = () => button("Pause or resume motion").click();
    const rest = () => page.waitForFunction(() => document.querySelector(".proof")?.getAttribute("data-running") === "false");
    const capture = async name => {
      await page.mouse.move(8, 8);
      return page.screenshot({ path: join(folder, `${name}.png`) });
    };
    const pixels = async bytes => page.evaluate(async ({ data, art }) => {
      const image = new Image(); image.src = `data:image/png;base64,${data}`; await image.decode();
      const canvas = document.createElement("canvas"); canvas.width = image.width; canvas.height = image.height;
      const ctx = canvas.getContext("2d"); ctx.drawImage(image, 0, 0);
      const scale = image.width / 1920;
      const roi = ctx.getImageData(Math.round(470 * scale), Math.round(140 * scale), Math.round(470 * scale), Math.round(115 * scale));
      let ghostPixels = 0;
      for (let i = 0; i < roi.data.length; i += 4) if (roi.data[i] < 100 && roi.data[i + 1] < 120 && roi.data[i + 2] < 100) ghostPixels++;
      const structuralPixels = [[684,150],[447,211],[925,212],[610,690]].map(([x,y]) => {
        const xx = Math.round(art.x + art.width * x / 1376), yy = Math.round(art.y + art.height * y / 768);
        return [...ctx.getImageData(xx - 2, yy - 2, 5, 5).data];
      });
      return { ghostPixels, structuralPixels };
    }, { data: bytes.toString("base64"), art: await page.locator(".fixed-plate").boundingBox() });
    const snapshot = () => page.evaluate(() => {
      const q = selector => document.querySelector(selector);
      const opacity = selector => q(selector) ? Number(getComputedStyle(q(selector)).opacity) : 0;
      const effective = selector => {
        let value = 1;
        for (let el = q(selector); el; el = el.parentElement) {
          const css = getComputedStyle(el);
          if (css.display === "none" || css.visibility === "hidden") return 0;
          value *= Number(css.opacity);
        }
        return q(selector) ? value : 0;
      };
      const box = selector => q(selector)?.getBoundingClientRect().toJSON();
      const example = q(".current-example .example-words");
      const caption = box(".capacity-reference"), controls = box(".controls"), art = box(".fixed-plate"), result = box(".result");
      return {
        headline: q(".headline-word")?.getAttribute("data-headline"),
        headlineBox: box(".headline-word"), stage: box(".vessel"), title: box(".proof h1"),
        stackOpacity: opacity(".prompt-stack"),
        cards: [...document.querySelectorAll(".stack-card")].map(el => ({
          text: el.innerText.replace(/\s+/g, " ").trim(), opacity: Number(getComputedStyle(el).opacity),
          fits: el.scrollWidth <= el.clientWidth + 1, size: getComputedStyle(el.querySelector(".example-words")).fontSize,
        })),
        summaryEffective: effective(".summary-label"), summaryText: q(".summary-label")?.innerText.replace(/\s+/g, " ").trim(),
        currentOpacity: opacity(".current-example"), previousOpacity: opacity(".previous-example"),
        current: example?.innerText.replace(/\s+/g, " ").trim(),
        boundaryOpacity: opacity(".headroom-boundary"),
        material: [...document.querySelectorAll(".material")].map(el => ({ id: el.getAttribute("data-layer"), top: Number(el.getAttribute("data-top")), bottom: Number(el.getAttribute("data-bottom")) })),
        caption: q(".capacity-value").textContent, caveat: q(".capacity-caveat").textContent,
        captionClear: caption.top > art.y + art.height * 748 / 768 && (!result || caption.top > result.bottom) && caption.bottom < controls.top,
        captionCentered: Math.abs(caption.x + caption.width / 2 - innerWidth / 2) < 1,
        exampleFits: !example || (example.scrollWidth <= example.clientWidth + 1 && (!result || example.getBoundingClientRect().bottom < result.top)),
        result: q(".result.final")?.innerText.replace(/\s+/g, " ").trim(),
      };
    });
    const cdp = await context.newCDPSession(page);
    await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
    const font = async selector => {
      const { root } = await cdp.send("DOM.getDocument");
      const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector });
      return cdp.send("CSS.getPlatformFontsForNode", { nodeId });
    };
    await state(0);
    console.log("FONT_HEADLINE", JSON.stringify(await font(".headline-word text")));
    for (const width of [1920, 960]) {
      await page.setViewportSize({ width, height: width * 9 / 16 });
      await button("Replay from start").click(); await state(0);
      assert.equal(await page.locator(".material").count(), 0);
      assert.equal(await page.locator(".headline-word").evaluate(el => getComputedStyle(el).filter), "none");
      const baseline = await pixels(await capture(`00-ready-${width}`));
      const plateRect = await page.locator(".fixed-plate").boundingBox();
      const composition = await page.locator(".proof").boundingBox();
      const scale = composition.width / 960;
      for (const [key, nominal] of Object.entries({ x: 57.3, y: 130, width: 584.8, height: 326.4 })) {
        const origin = key === "x" ? composition.x : key === "y" ? composition.y : 0;
        assert(Math.abs(plateRect[key] - origin - nominal * scale) < .2, `Uniform nominal raster ${key}`);
      }
      console.log("RASTER_GEOMETRY", JSON.stringify({ width, composition, plateRect, nominalScale: scale }));
      for (let step = 1; step <= 9; step++) {
        await button("Next state").click(); await state(step); await progress(350); await pause();
        const early = await snapshot();
        assert.equal(Boolean(early.headline), step !== 3 && step !== 4);
        if (early.headline) {
          assert.equal(early.headline, BEATS[step].headline);
          assert(early.headlineBox.top >= early.stage.top && early.headlineBox.bottom <= early.stage.bottom);
          assert(early.headlineBox.top > early.title.bottom);
        }
        if (step >= 2 && step <= 4) assert.equal(early.cards.length, step - 1);
        if (step === 2) { assert.equal(early.stackOpacity, 0); assert(early.previousOpacity > 0); }
        if (step === 5) { assert.equal(early.cards.length, 3); assert(early.stackOpacity > 0 && early.stackOpacity < 1); assert.equal(early.currentOpacity, 0); }
        if (step >= 6) assert(early.previousOpacity > 0, "Accepted prior-category fade remains");
        if (step === 9) { assert.equal(early.stackOpacity, 1); assert.equal(early.summaryEffective, 0); }
        const held = await page.locator(".proof").getAttribute("data-elapsed");
        await page.waitForTimeout(180);
        assert.equal(await page.locator(".proof").getAttribute("data-elapsed"), held, "One playhead pauses");
        await capture(`${String(step).padStart(2, "0")}-headline-${width}`); await pause();
        if (width === 1920 && [2, 3, 4, 5, 9].includes(step)) {
          await progress(1630); await pause(); await capture(`${String(step).padStart(2, "0")}-entry-${width}`); await pause();
          await progress(2680); await pause();
          if (step !== 3 && step !== 4) {
            const opacity = await page.locator(".headline-word").evaluate(el => Number(getComputedStyle(el).opacity));
            assert(opacity > 0 && opacity < 1);
          }
          await capture(`${String(step).padStart(2, "0")}-dissolve-${width}`); await pause();
        }
        if (step === 9) {
          await progress(3250); await pause();
          const mid = await snapshot(), elapsed = Number(await page.locator(".proof").getAttribute("data-elapsed"));
          assert(mid.summaryEffective > 0 && mid.summaryEffective < 1);
          const prompts = mid.material.filter(l => l.id.startsWith("user-prompts"));
          assert.equal(Math.max(...prompts.map(l => l.bottom)), 500);
          assert(Math.min(...prompts.map(l => l.top)) > 376);
          await capture(`09-compression-${width}`);
          console.log("COMPRESSION", JSON.stringify({ width, elapsed, material: mid.material, summaryEffective: mid.summaryEffective }));
          await pause();
        }
        await rest(); await page.waitForTimeout(150);
        assert.equal(await page.locator(".headline-word").count(), 0);
        assert.equal(await page.locator(".previous-example").count(), 0);
        const check = await snapshot();
        assert.equal(check.boundaryOpacity, 1);
        assert(check.exampleFits && check.cards.every(c => c.fits));
        assert(check.captionClear && check.captionCentered);
        assert.equal(check.caption, "Example capacity: 400K tokens");
        assert.equal(check.caveat, "Actual capacity varies by model and surface.");
        if (step >= 2 && step <= 4) {
          assert.equal(check.cards.length, step - 1);
          assert.equal(check.cards.at(-1).text, BEATS[step].example.join(" "));
          assert.deepEqual(check.cards.map(c => c.opacity), step === 2 ? [1] : step === 3 ? [.86, 1] : [.78, .86, 1]);
        } else if (step === 9) {
          assert.equal(check.summaryEffective, 1, "All summary ancestors visible");
          assert.equal(check.summaryText, "Summary of earlier user prompts");
          assert.equal(check.result, "Instructions + references retained Some fine detail is dropped.");
          assert.equal(await page.locator(".summary-label").count(), 1);
        } else assert.equal(check.current, BEATS[step].example.join(" "));
        assert.deepEqual(check.material.map(l => l.id).sort(), layersFor(step, 1, step === 9 ? 1 : 0).map(l => l.id).sort());
        assert.deepEqual(await page.locator(".fixed-plate").boundingBox(), plateRect);
        const evidence = await pixels(await capture(`${String(step).padStart(2, "0")}-rest-${width}`));
        assert.equal(evidence.ghostPixels, 0, `No ghost pixels, beat ${step}, ${width}`);
        assert.deepEqual(evidence.structuralPixels, baseline.structuralPixels, "Fixed rim/bracket/support pixels");
        results.push({ width, step });
        console.log("REST_PASS", JSON.stringify({ width, step, ghostPixels: evidence.ghostPixels, ...check }));
      }
      assert(await button("Next state").isDisabled());
      // Back restores resting states; Replay is already exercised at each size.
      for (let n = 8; n >= 0; n--) {
        await button("Previous state").click(); await state(n);
        assert.equal(await page.locator(".proof").getAttribute("data-running"), "false");
      }
    }
    console.log("FONT_BODY", JSON.stringify(await font(".capacity-caveat")));
    // Rapid input cancels the old beat; Back settles immediately, without a second clock.
    await button("Next state").click(); await state(1);
    await button("Next state").click(); await state(2);
    await button("Previous state").click(); await state(1); await rest();
    await button("Replay from start").click(); await state(0);
    await page.evaluate(() => document.activeElement?.blur());
    await page.keyboard.press("ArrowRight"); await state(1);
    await page.keyboard.press("ArrowLeft"); await state(0);
    await page.emulateMedia({ reducedMotion: "reduce" }); await state(9); await rest();
    for (const width of [960, 1920]) {
      await page.setViewportSize({ width, height: width * 9 / 16 });
      const reduced = await snapshot();
      assert.equal(reduced.summaryEffective, 1);
      assert.equal(reduced.summaryText, "Summary of earlier user prompts");
      assert.equal(await page.locator(".headline-word").count(), 0);
      for (const name of ["Next state", "Previous state", "Pause or resume motion", "Replay from start"]) assert(await button(name).isDisabled());
      await capture(`10-reduced-motion-${width}`);
    }
    console.log("FONT_SUMMARY", JSON.stringify(await font(".summary-label")));
    const raster = await readFile(join(root, "workshops/ghcp-dev-hack/assets/images/foundations/foundations-context-funnel-wider-neck-v2.png"));
    assert.equal(createHash("sha256").update(raster).digest("hex"), "c592e171f2170b36f9138b9b75eae489548cd8dcf4673c75a2c07921b312617c");
    console.log("PAGE_ERRORS", errors, "HTTP_ERRORS", badResponses);
    assert.deepEqual(errors, []); assert.deepEqual(badResponses, []);
    console.log("PASS", JSON.stringify({ url, restingStates: results.length, reducedSizes: 2, seconds: (performance.now() - started) / 1000, folder }));
  } finally { await browser.close(); }
}

async function reviewPresenter() {
  await mkdir(folder, { recursive: true });
  const { chromium } = await playwright();
  const browser = await chromium.launch({ channel: process.env.REVIEW_BROWSER_CHANNEL ?? "msedge", headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    await context.route("**/*", request => ["127.0.0.1", "localhost"].includes(new URL(request.request().url()).hostname) ? request.continue() : request.abort());
    const audience = await context.newPage(), presenter = await context.newPage();
    await audience.goto(url, { waitUntil: "networkidle" });
    await presenter.goto(url.replace("#/18", "#/presenter/18"), { waitUntil: "networkidle" });
    const sample = page => page.locator(".proof").first().evaluate(el => ({
      step: Number(el.dataset.step), elapsed: Number(el.dataset.elapsed),
      paused: el.dataset.paused, running: el.dataset.running,
    }));
    await presenter.locator(".proof").first().getByRole("button", { name: "Next state", exact: true }).click();
    await audience.waitForFunction(() => document.querySelector(".proof")?.getAttribute("data-step") === "1");
    await presenter.waitForFunction(() => Number(document.querySelector(".proof")?.getAttribute("data-elapsed")) > 500);
    await presenter.locator(".proof").first().getByRole("button", { name: "Pause or resume motion", exact: true }).click();
    // A background tab may suspend RAF, which is not synchronization.
    // Observe the audience in the foreground and also inspect its pause state.
    await audience.bringToFront();
    await audience.waitForTimeout(100);
    const before = { audience: await sample(audience), presenter: await sample(presenter) };
    await presenter.waitForTimeout(500);
    const after = { audience: await sample(audience), presenter: await sample(presenter) };
    assert.equal(after.presenter.elapsed, before.presenter.elapsed);
    const pauseSynchronized = after.audience.paused === "true" && after.audience.elapsed === before.audience.elapsed;
    console.log("PRESENTER_SYNC_OBSERVATION", JSON.stringify({ before, after, pauseSynchronized }));
    await presenter.screenshot({ path: join(folder, "11-presenter-pause.png") });
    await audience.screenshot({ path: join(folder, "11-audience-during-presenter-pause.png") });
    await presenter.locator(".proof").first().getByRole("button", { name: "Replay from start", exact: true }).click();
    await audience.waitForFunction(() => document.querySelector(".proof")?.getAttribute("data-step") === "0");
    // The current and next-slide view plus notes must be the actual module handoff.
    const notes = await presenter.locator("body").innerText();
    assert(notes.includes("Context Rot: Recognize the Signals"));
    for (const section of ["Timebox:", "Talk track:", "Transition:", "Audience question:", "Response guidance:", "Payoff:", "Sources:"]) assert(notes.includes(section), section);
    console.log("PRESENTER_PASS navigation/replay and seven-section production notes; local-pause synchronization reported separately.",
      JSON.stringify({ seconds: (performance.now() - started) / 1000, pauseSynchronized }));
  } finally { await browser.close(); }
}

if (process.argv.includes("--serve")) serve();
else if (process.argv.includes("--presenter-only")) await reviewPresenter();
else await review();
