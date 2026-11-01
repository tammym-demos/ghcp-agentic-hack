// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { attachBriefEditor, bindBriefTextareaResizing, renderBriefEditor, renderBriefRecap } from "./brief-editor.js";

const config = {
  title: "Modernization Starting Brief",
  description: "A temporary editor.",
  workshopTitle: "Modernization Workshop",
  workshopRoute: "/workshops/modernization-with-copilot/"
};

describe("brief editor", () => {
  it("renders the six decisions as editable customer-facing fields", () => {
    const html = renderBriefEditor(config);
    for (const section of ["Goal", "Plan", "Build", "Evaluate", "Deploy", "Monitor"]) {
      expect(html).toContain(section);
    }
    expect(html).toContain('id="goal-service-context"');
    expect(html).toContain('id="plan-readiness"');
    expect(html).toContain('id="deploy-recovery"');
    expect(html).toContain('id="monitor-signals"');
  });

  it("provides explicit privacy, reset, and print guidance without a submission form", () => {
    const html = renderBriefEditor(config);
    expect(html).toContain("Answers stay in this open page.");
    expect(html).toContain("Refresh or close the page and they are gone.");
    expect(html).toContain('id="brief-print"');
    expect(html).toContain("Print / Save as PDF");
    expect(html).toContain('id="brief-clear"');
    expect(html).toContain("CUSTOMER-CONFIDENTIAL");
    expect(html).not.toContain("<form");
    expect(html).not.toContain('name="');
  });

  it("omits customer, application, and brief-handling fields", () => {
    const html = renderBriefEditor(config);
    expect(html).not.toContain('id="customer"');
    expect(html).not.toContain('id="application"');
    expect(html).not.toContain("Customer and application");
    expect(html).not.toContain("Brief handling");
    for (const id of ["brief-owner", "brief-date", "brief-audience", "brief-delivery", "brief-review-date"]) {
      expect(html).not.toContain(`id="${id}"`);
    }
  });

  it("provides navigation to each of the six decision sections", () => {
    const html = renderBriefEditor(config);
    expect(html).toContain('<nav class="brief-editor__steps" aria-label="Six decisions">');
    for (const id of ["goal", "plan", "build", "evaluate", "deploy", "monitor"]) {
      expect(html).toContain(`href="#${id}"`);
      expect(html).toContain(`<fieldset id="${id}"`);
    }
  });

  it("provides a separate recap surface for printing without changing the editable brief", () => {
    const html = renderBriefEditor(config);
    expect(html).toContain('<article class="brief-editor__print-report" id="brief-editor-print-report"');
    expect(html).toContain('<input id="evaluate-result" type="text"');
    expect(html).toContain('<textarea id="goal-statement"');
    expect(html).toContain('<select id="plan-status-choose-work"');
    expect(html).not.toContain("brief-editor__print-value");
  });

  it("provides an evidence-focused modernization driver checklist", () => {
    const html = renderBriefEditor(config);
    for (const id of [
      "goal-service-context",
      "goal-drivers",
      "goal-drivers-end-of-support",
      "goal-drivers-security-compliance",
      "goal-drivers-user-experience",
      "goal-drivers-enterprise-change",
      "goal-other",
      "goal-evidence",
      "goal-cost",
      "goal-risks",
      "goal-options"
    ]) {
      expect(html).toContain(`id="${id}"`);
    }
    expect(html).toContain("Common modernization drivers - select all that apply");
    expect(html).toContain("prioritized driver");
    expect(html).toContain("whole-life cost");
    expect(html).not.toMatch(/<input[^>]*\schecked(?:\s|>)/);
  });

  it("provides a human-owned agent-planning checklist and work package fields", () => {
    const html = renderBriefEditor(config);
    for (const id of [
      "plan-agent-card",
      "plan-discovery",
      "plan-behavior-data",
      "plan-transition-technology",
      "plan-slice-spec",
      "plan-controls",
      "plan-verification",
      "plan-delivery-operations",
      "plan-people-readiness",
      "plan-readiness",
      "plan-stop",
      "plan-status-choose-work",
      "plan-status-context",
      "plan-status-alignment",
      "plan-status-guardrails",
      "plan-status-evidence",
      "plan-status-operations",
      "plan-status-people"
    ]) {
      expect(html).toContain(`id="${id}"`);
    }
    expect(html.match(/<select id="plan-status-/g)).toHaveLength(12);
    expect(html).toContain('aria-describedby="plan-agent-card-hint"');
    expect(html).toContain("actual identity/tool/environment/network/CI/release controls");
    expect(html).toContain("Agent agreement is not proof");
    expect(html).not.toContain("COBOL");
    expect(html).toContain('<option value="">Choose status</option>');
    expect(html).not.toMatch(/<input[^>]*\svalue="[^"]+"/);
    expect(html).not.toMatch(/<textarea[^>]*\svalue=/);
    expect(html).not.toMatch(/<input[^>]*\schecked(?:\s|>)/);
  });

  it("provides six blank lifecycle statements with fill-in guidance", () => {
    const html = renderBriefEditor(config);
    for (const phase of ["goal", "plan", "build", "evaluate", "deploy", "monitor"]) {
      expect(html).toMatch(new RegExp(`<textarea id="${phase}-statement"[^>]*></textarea>`));
      expect(html).toContain(`aria-describedby="${phase}-statement-hint"`);
      expect(html).toContain(`id="${phase}-statement-hint"`);
    }
    expect(html).toContain("goal-cost");
    expect(html).toContain("goal-risks");
    expect(html).toContain("goal-options");
    expect(html).toContain("deploy-artifact");
    expect(html).toContain("monitor-retirement");
    expect(html).toContain("Agent agreement is not proof");
    expect(html).toContain("reverting a binary does not undo data");
    expect(html).not.toContain("one-hour");
  });

  it("shows character responsibilities without confusing the software agent and human owners", () => {
    const html = renderBriefEditor(config);
    expect(html).toContain("Chief Morgan Charter");
    expect(html).toContain("Agent Mergewell");
    expect(html).toContain("Riley Relay");
    expect(html).toContain("Purrmission");
    expect(html).toContain("Riley Relay handles only bounded tasks and returns evidence");
    expect(html).toContain("Purrmission signals, but does not enforce, those boundaries");
  });
});

describe("brief editor behavior", () => {
  it("collects live answers before printing, cleans up afterward, and forgets cleared answers", () => {
    const root = document.createElement("div");
    root.innerHTML = renderBriefEditor(config);
    const goal = root.querySelector<HTMLTextAreaElement>("#goal-statement");
    const result = root.querySelector<HTMLInputElement>("#evaluate-result");
    const status = root.querySelector<HTMLSelectElement>("#plan-status-choose-work");
    const driver = root.querySelector<HTMLInputElement>("#goal-drivers-end-of-support");
    const report = root.querySelector<HTMLElement>("#brief-editor-print-report");
    const printButton = root.querySelector<HTMLButtonElement>("#brief-print");
    const clearButton = root.querySelector<HTMLButtonElement>("#brief-clear");
    if (!goal || !result || !status || !driver || !report || !printButton || !clearButton) {
      throw new Error("Missing brief editor test fixture");
    }
    const print = vi.fn();
    attachBriefEditor(root, config.workshopTitle, { confirmClear: () => true, print });

    goal.value = "Preserve <records> & history.";
    result.value = "Approved cases reconcile.";
    status.value = "evidence";
    driver.checked = true;
    printButton.click();
    expect(print).toHaveBeenCalledOnce();
    window.dispatchEvent(new Event("beforeprint"));
    expect(report.textContent).toContain(goal.value);
    expect(report.textContent).toContain(result.value);
    expect(report.textContent).toContain("Evidence identified");
    expect(report.textContent).toContain("Technology is reaching end of support");
    expect(report.querySelectorAll(".brief-editor__recap-drivers li")).toHaveLength(1);

    window.dispatchEvent(new Event("afterprint"));
    expect(report.innerHTML).toBe("");
    expect(goal.value).toBe("Preserve <records> & history.");
    expect(driver.checked).toBe(true);

    clearButton.click();
    expect(goal.value).toBe("");
    expect(result.value).toBe("");
    expect(status.value).toBe("");
    expect(driver.checked).toBe(false);
    window.dispatchEvent(new Event("beforeprint"));
    for (const answer of [
      "Preserve <records> & history.",
      "Approved cases reconcile.",
      "Evidence identified",
      "Technology is reaching end of support"
    ]) {
      expect(report.textContent).not.toContain(answer);
    }
    window.dispatchEvent(new Event("afterprint"));
    expect(report.innerHTML).toBe("");
  });

  it("organizes captured answers as a recap and excludes instructions and unanswered details", () => {
    const html = renderBriefRecap(config, {
      values: {
        "goal-statement": "Modernize to restore supportability while preserving critical behavior.",
        "goal-cost": "Discovery and migration costs are still being estimated.",
        "goal-other": "This reason was not prioritized.",
        "plan-statement": "Agents may draft bounded tests with verified context.",
        "plan-status-choose-work": "Evidence identified",
        "plan-status-guardrails": "Needs follow-up",
        "plan-agent-card": "Scope: add characterization tests.\nStop if behavior is uncertain.",
        "build-statement": "Build traceable tests and stop if behavior is uncertain.",
        "build-change": "<confirm against reviewed evidence>",
        "evaluate-statement": "Compare the test results with the agreed baseline.",
        "evaluate-result": "No result recorded yet.",
        "deploy-statement": "The release owner authorizes a staged rollout.",
        "deploy-recovery": "Halt rollout if reconciliation fails.",
        "monitor-statement": "The operator reviews service and business signals.",
        "monitor-signals": "Watch error rates and completed business transactions.",
        "evidence-log": "Service baseline | dashboard | verified | operator | rollout",
        "next-actions": "Confirm migration estimate | Finance lead | 2026-11-15 | investment decision"
      },
      selectedDrivers: [{
        title: "Reduce risk and keep the business running",
        choices: ["Technology is reaching end of support"]
      }]
    });

    expect(html).toContain("<h1>Modernization decision recap</h1>");
    expect(html).toContain("CUSTOMER-CONFIDENTIAL");
    expect(html).toContain("Discussion recap—not approval of investment, implementation, or release.");
    expect(html).toContain("Decisions at a glance");
    expect(html).toContain("Selected modernization drivers");
    expect(html).toContain("Technology is reaching end of support");
    expect(html).toContain("Evidence identified");
    expect(html).toContain("Needs follow-up");
    expect(html).toContain("Stop if behavior is uncertain.");
    expect(html).toContain("&lt;confirm against reviewed evidence&gt;");
    expect(html).toContain("Evidence and next actions");
    expect(html).toContain("<h3>Evidence log</h3>");
    expect(html).toContain("<h3>Next actions</h3>");
    expect(html).toContain("This reason was not prioritized.");
    expect(html).not.toContain("Optional. Add a reason");
    expect(html.match(/Technology is reaching end of support/g)).toHaveLength(1);
    expect(html).not.toContain("Chief Morgan Charter");
    expect(html).not.toContain("Choose status");
    expect(html).not.toContain("Not captured");

    const headings = [
      "Decisions at a glance",
      "Why modernize",
      "Plan for agent-led work",
      'class="brief-editor__recap-section"><h2>Build</h2>',
      'class="brief-editor__recap-section"><h2>Evaluate</h2>',
      'class="brief-editor__recap-section"><h2>Deploy</h2>',
      'class="brief-editor__recap-section"><h2>Monitor</h2>',
      "Evidence and next actions"
    ];
    const positions = headings.map((heading) => html.indexOf(heading));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("marks uncaptured lifecycle decisions while omitting empty detail sections", () => {
    const html = renderBriefRecap(config, { values: {}, selectedDrivers: [] });
    expect(html.match(/Not captured/g)).toHaveLength(6);
    for (const section of [
      "Why modernize",
      "Plan for agent-led work",
      "Build",
      "Evaluate",
      "Deploy",
      "Monitor",
      "Evidence and next actions"
    ]) {
      expect(html).not.toContain(`<h2>${section}</h2>`);
    }
  });

  it("escapes recap text and preserves captured line breaks", () => {
    const answer = "<script>alert('no')</script>\nSecond line & detail";
    const html = renderBriefRecap(config, {
      values: { "goal-service-context": answer },
      selectedDrivers: []
    });
    expect(html).toContain("&lt;script&gt;alert(&#39;no&#39;)&lt;/script&gt;\nSecond line &amp; detail");
    expect(html).not.toContain("<script>");
  });

  it("resizes all textareas when the viewport changes and after printing", () => {
    class Textarea extends EventTarget {
      style = { height: "" };
      scrollHeight = 100;
      offsetHeight = 82;
      clientHeight = 80;
    }
    const first = new Textarea();
    const second = new Textarea();
    const resizeEvents = new EventTarget();
    bindBriefTextareaResizing([first, second], resizeEvents);
    expect(first.style.height).toBe("102px");
    expect(second.style.height).toBe("102px");

    first.scrollHeight = 160;
    first.dispatchEvent(new Event("input"));
    expect(first.style.height).toBe("162px");
    expect(second.style.height).toBe("102px");

    first.scrollHeight = 240;
    second.scrollHeight = 180;
    resizeEvents.dispatchEvent(new Event("resize"));
    expect(first.style.height).toBe("242px");
    expect(second.style.height).toBe("182px");

    first.scrollHeight = 160;
    resizeEvents.dispatchEvent(new Event("afterprint"));
    expect(first.style.height).toBe("162px");
  });
});
