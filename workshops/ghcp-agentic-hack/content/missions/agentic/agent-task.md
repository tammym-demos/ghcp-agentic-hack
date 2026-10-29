---
schemaVersion: 1
kind: mission
id: agent-task
title: 'Your Mission: Hand Off Work with Confidence'
module: agentic
durationMinutes: 45
debriefMinutes: 5
objectiveRefs:
  - Apply instructions, memory boundaries, context hierarchy, and strong prompts to long-running agentic work
  - Explain the different jobs of the developer, a software agent, a reusable skill, a custom agent, and a tool
  - Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
  - Choose a supported product control before an agentic task and verify afterward whether the result justified the AI credits used
prerequisites:
  - One signed-in, approved Copilot tool, a browser, and a personal case folder
startingState: Continue with the Foundations lab, or copy this starter. It supplies the label fix, not earned Foundations points.
goal: Add a priority filter using a clear brief, loaded rules, a reusable check skill, and tests you do not rewrite.
task: Plan, equip, implement, verify, and hand off one bounded engineering change.
constraints:
  - Only selectAlerts may change in the lab. Keep the existing check code and other functions untouched.
  - No packages, network integrations, repository push, or deployment is needed.
  - Stop if implementation requires a new file, tool, or permission outside the approved brief.
evidence:
  - A before/after record of four filter checks and the Foundations regression checks
  - A short brief, instruction file, skill, and handoff in the local case folder
safetyCheckpoints:
  - Purrmission requires scope, loaded-rule evidence, negative checks, and stop conditions before implementation.
corePath:
  - 'Write the brief: 6 min, 10 points.'
  - 'Load one useful instruction: 7 min, 10 points.'
  - 'Make a reusable check skill: 7 min, 10 points.'
  - 'Implement and check the filter: 13 min, 10 points.'
  - 'Hand off evidence, not confidence: 7 min, 10 points.'
stretchPath: ['Bonus work uses spare time only. Reserve the final five minutes for the artifact check and debrief.']
debrief:
  - Which negative check stopped you accepting an incomplete implementation?
  - What evidence would still be needed before this local change could ship?
validation:
  - Agentic shows 4 PASS and Foundations shows 3 PASS, or the exact unresolved check is recorded.
  - Keep a pre-change backup, brief, instruction, check skill, and evidence-based handoff.
  - Carry only earned scores into Advanced. Forty core points does not turn a blocked test into a pass.
casePacket:
  - '**Continuing?** Reopen your actual local case folder. Keep the working lab and scores. Use the starter below only if the working file is missing or Foundations remains blocked.'
  - '**Starting here?** Save the starter as `dispatch-lab.html` in a personal `copilot-case-file` folder. Create `case-notes.md`; record Foundations as 0, supplied starter fix, not earned.'
  - '**Before editing:** duplicate the working HTML as `dispatch-lab.agentic-backup.html`. Double-click the working file in a browser. Save and reload between check runs.'
  - '**Scope:** teach a filter, not an entire release system. Cloud agents, hooks, live reviews, and deployment are not required here.'
  - '**Fallback:** after two stuck minutes, ask for one mechanical step or pair with someone. Manual implementation is valid when labeled; source inclusion and skill activation must not be invented.'
  - '**Replacing earlier draft work?** Keep earlier evidence separate and untick old completions before scoring this version.'
starterFile:
  name: dispatch-lab.html
  content: |-
    <!doctype html>
    <html lang="en">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dispatch lab</title>
    <h1>Dispatch lab</h1>
    <p>Edit the three functions only. Save, reload, then run a check group.</p>
    <button onclick="run('foundations')">Foundations</button>
    <button onclick="run('agentic')">Agentic</button>
    <button onclick="run('filter')">Lane A</button>
    <button onclick="run('summary')">Lane B</button>
    <button onclick="run('integrated')">Integrated</button>
    <pre id="results" role="status">Choose a check group.</pre>
    <script>
    // EDITABLE FUNCTIONS
    function labelFor(note) { return note.trim() || "(untitled)"; }
    function selectAlerts(alerts, minimum) { return alerts; }
    function summarizeAlerts(alerts) { return alerts.length + " alerts"; }
    // END EDITABLE FUNCTIONS. Do not change the checks below.
    const sample = [
      { title: " Router ", priority: "high" },
      { title: "Readme", priority: "low" },
      { title: "Queue", priority: "normal" }
    ];
    const critical = { title: "Outage", priority: "critical" };
    function equal(actual, expected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(JSON.stringify(actual) + " != " + JSON.stringify(expected));
      }
    }
    function rejectsUnknown() {
      let rejected = false;
      try { selectAlerts([], "urgent"); } catch (error) { rejected = error instanceof Error; }
      equal(rejected, true);
    }
    const checks = {
      foundations: [
        ["trim spaces", () => equal(labelFor(" Router "), "Router")],
        ["blank label", () => equal(labelFor("   "), "(untitled)")],
        ["keep a label", () => equal(labelFor("Queue"), "Queue")]
      ],
      agentic: [
        ["high only", () => {
          const input = sample.map(alert => ({ ...alert }));
          const before = JSON.stringify(input);
          equal(selectAlerts(input, "high"), [sample[0]]);
          equal(JSON.stringify(input), before);
        }],
        ["inclusive threshold", () => equal(selectAlerts(sample, "normal"), [sample[0], sample[2]])],
        ["empty input", () => equal(selectAlerts([], "low"), [])],
        ["reject unknown minimum", rejectsUnknown]
      ],
      filter: [
        ["critical minimum excludes high", () => equal(selectAlerts([sample[0], critical], "critical"), [critical])],
        ["critical outranks high", () => equal(selectAlerts([critical, sample[0], sample[1]], "high"), [critical, sample[0]])]
      ],
      summary: [
        ["names and count", () => equal(summarizeAlerts([sample[0], sample[2]]), "2 alerts: Router, Queue")],
        ["empty summary", () => equal(summarizeAlerts([]), "0 alerts: none")]
      ],
      integrated: [
        ["filter then summarize", () => equal(summarizeAlerts(selectAlerts([
          sample[0], {title:"Outage", priority:"critical"}, sample[1]
        ], "high")), "2 alerts: Router, Outage")]
      ]
    };
    function run(group) {
      const lines = checks[group].map(([name, check]) => {
        try { check(); return "PASS " + name; }
        catch (error) { return "FAIL " + name + ": " + error.message; }
      });
      document.getElementById("results").textContent = lines.join("\n");
    }
    </script>
    </html>
harnesses:
  - id: ide-extension
    title: VS Code
    description: Use local files, Chat, and visible references.
    instructions:
      - Open the case folder and Chat. Create folders/files in Explorer; save with Ctrl+S (Cmd+S on Mac).
      - Use a new chat for updated rules. Inspect References or customization diagnostics; a saved file is not proof it was included.
      - Use Plan before edits and Agent only after approval. Keep the active permission controls supervised.
  - id: copilot-cli
    title: GitHub Copilot CLI
    description: Use an interactive local session.
    instructions:
      - Start `copilot` inside the case folder. Use a text editor, or ask for exact files; normal shell commands go outside the Copilot prompt.
      - Inspect `/instructions` and `/env`. After changing instructions, start a new session and re-supply the brief.
      - For a new skill, use `/skills reload`, then `/skills info case-check`. Discovery is not proof of invocation.
  - id: copilot-app
    title: GitHub Copilot app
    description: Use the confirmed local folder and visible activity.
    instructions:
      - Reopen the local folder, verify the session's working location, and use Interactive with supervised tool permissions.
      - Ask for files by exact path. Repository instruction settings apply to repositories; for this plain folder, explicitly attach the instruction file and label that manual inclusion.
      - Use a fresh session after changing rules. Inspect skill/read activity where available rather than inferring activation from the reply.
coreClues:
  - id: open-the-case
    title: Write the brief
    durationMinutes: 6
    points: 10
    objectiveRef: Apply instructions, memory boundaries, context hierarchy, and strong prompts to long-running agentic work
    scene: Mergewell defines success before Riley touches the implementation.
    outcome: A short brief with scope, rule evidence to collect, negative checks, and hard stops.
    routes:
      - harness: ide-extension
        instructions: ['Open the HTML and create `brief.md` in Explorer. Run the browser checks, not a chat-generated test summary.']
      - harness: copilot-cli
        instructions: ['Keep `copilot` in the local case folder; create `brief.md` with an editor or an explicitly approved file write.']
      - harness: copilot-app
        instructions: ['Ask for `brief.md` in the confirmed local folder; read it in the files area before approving anything else.']
    actions:
      - Run Agentic and record its current failures, including reject unknown minimum.
      - 'Write in `brief.md`: "Goal: select alerts at or above minimum, in original order. Levels: low < normal < high. Reject an unknown minimum, even for empty input."'
      - 'Add: "Allowed: selectAlerts only. No-touch: other functions and all checks. Loaded-rule proof: collect next. Negative checks: below-threshold alert and unknown minimum. Stop: new dependencies, files, network, or changed checks."'
    verify: The brief contains all four planning proofs; the pre-change check output is recorded before implementation.
    evidence: 'Initial failures: ___. Allowed/no-touch: ___. Negative cases: ___. Hard stop: ___.'
    hints:
      - The original function returns everything, so a filter check should fail.
      - Unknown minimum must be checked before processing an empty list.
      - Keep the brief to five lines; do not generate a long specification.
    safetyCheckpoint: Do not let the agent make its own test expectations easier.
  - id: write-the-brief
    title: Load one useful instruction
    durationMinutes: 7
    points: 10
    objectiveRef: Apply instructions, memory boundaries, context hierarchy, and strong prompts to long-running agentic work
    scene: Purrmission checks what reached the request, not just what was saved.
    outcome: One concise instruction and an honest inclusion check.
    routes:
      - harness: ide-extension
        instructions: ['Create `.github/copilot-instructions.md`, save, and start a new chat. Inspect References or diagnostics for inclusion.']
      - harness: copilot-cli
        instructions: ['Create `.github/copilot-instructions.md`, restart the session, then inspect `/instructions` and `/env`.']
      - harness: copilot-app
        instructions: ['Create the same file, then attach it explicitly in the fresh local session. Record manual attachment, not automatic discovery.']
    actions:
      - 'Save three rules: "Use the brief''s allowed and no-touch paths. Never alter checks to make them pass. Before editing, state the allowed function and one hard stop."'
      - Attach `brief.md` and the HTML. Ask for the boundary and next step only; do not approve implementation yet.
      - Inspect source evidence, then separately check whether the reply followed the rules. Add the observed inclusion method to `brief.md`.
    verify: The note distinguishes saved, discovered or manually attached, included where observable, and followed. The lab remains unchanged.
    evidence: 'Saved at: ___. Inclusion evidence/method: ___. Rule followed: ___. Unknown: ___.'
    hints:
      - One reply following a rule does not prove which file supplied it.
      - If automatic inclusion is not observable, attach explicitly and label that fallback.
      - You do not need /init, a Git repository, or global settings for this task.
    safetyCheckpoint: Do not change global instructions just to complete a local exercise.
  - id: verify-the-evidence
    title: Make a reusable check skill
    durationMinutes: 7
    points: 10
    objectiveRef: Explain the different jobs of the developer, a software agent, a reusable skill, a custom agent, and a tool
    scene: Mergewell packages the check procedure, not a new all-purpose worker.
    outcome: A small skill that reviews test evidence without claiming to have run a browser.
    routes:
      - harness: ide-extension
        instructions: ['Create `.github/skills/case-check/SKILL.md`, save, and request the case-check skill explicitly. Inspect invocation/read evidence if offered.']
      - harness: copilot-cli
        instructions: ['Save the skill, run `/skills reload` and `/skills info case-check`, then request `/case-check` explicitly.']
      - harness: copilot-app
        instructions: ['Create the project skill by exact path and start a fresh session if needed. If discovery is unavailable, attach the file and label manual procedure use.']
    actions:
      - 'Create `SKILL.md` with frontmatter `name: case-check` and `description: Review dispatch lab check output before accepting a change`, between lines of `---`.'
      - 'Use this body: "Read the supplied brief, diff, and actual browser check output. Report missing evidence and scope changes. Never edit, run code, or claim tests ran without output. End with accept, revise, or stop and a reason."'
      - Ask it to review your pre-change evidence. It should not accept a broken filter. Record invocation evidence or label manual procedure use.
    verify: The skill file exists and the review cites a real failing check. Your note distinguishes the procedure, the agent doing the review, and the tool that ran the checks.
    evidence: 'Skill source/invocation: ___. Procedure: ___. Worker: ___. Actual check tool: ___. Missing evidence: ___.'
    hints:
      - A skill supplies a procedure; it is not a separate worker or an enforced permission boundary.
      - The browser runs these checks. Copilot reviews the output you supply.
      - If no invocation trace is visible, do not claim automatic activation.
    safetyCheckpoint: Read the whole skill. It needs no scripts, packages, network, or automatic approvals.
  - id: close-the-handoff
    title: Implement and check the filter
    durationMinutes: 13
    points: 10
    objectiveRef: Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
    scene: Riley implements the approved brief; Mergewell checks the returned change.
    outcome: A narrow filter change with passing boundary and regression checks.
    routes:
      - harness: ide-extension
        instructions: ['Ask for a plan, approve only the brief, then use Agent for the bounded edit. Inspect the diff against the pre-change backup.']
      - harness: copilot-cli
        instructions: ['Keep the run interactive. Read actual permission requests; the CLI does not necessarily ask before every action.']
      - harness: copilot-app
        instructions: ['Review the plan, then allow the single function change in Interactive mode. Keep the working file and browser path matched.']
    actions:
      - 'Request: "Implement brief.md by changing selectAlerts only in dispatch-lab.html. Keep the input list unmodified and its order stable. Do not edit checks, install, use the network, or change another function. Stop if that is insufficient."'
      - Save, reload, and run Agentic, then Foundations. Read the actual PASS/FAIL lines.
      - If a check fails, predict one cause, change one thing, and rerun that check group. Stop unresolved work at the time limit.
      - Compare against `dispatch-lab.agentic-backup.html`. Verify that only selectAlerts changed and the checks did not.
    verify: Agentic has 4 PASS, Foundations has 3 PASS, and the diff is confined to selectAlerts; otherwise preserve the exact failure.
    evidence: 'Before: ___. After: ___. Regression: ___. Diff boundary: ___. One correction or stop: ___.'
    hints:
      - A rank map can compare low, normal, and high without sorting the input.
      - Validate the minimum before filtering, including when alerts is empty.
      - If Copilot cannot edit, implement its reviewed plan manually and label that route.
    safetyCheckpoint: Reject a changed test or a widened permission request, even if the remaining checks are green.
  - id: watch-the-loop
    title: Hand off evidence, not confidence
    durationMinutes: 7
    points: 10
    objectiveRef: Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
    scene: Purrmission refuses a handoff that says only "done".
    outcome: A reviewable local handoff with a real restore point and open release risks.
    routes:
      - harness: ide-extension
        instructions: ['Save `handoff.md`; provide the actual diff and browser results to the case-check procedure.']
      - harness: copilot-cli
        instructions: ['Ask the case-check skill to review the supplied results, then save your own decision in `handoff.md`.']
      - harness: copilot-app
        instructions: ['Attach the actual saved change and pasted browser output. Ask for evidence review only, not a new implementation.']
    actions:
      - 'Write `handoff.md` with: changed function, before/after results, loaded-rule evidence, restore file, and accept/revise/stop with a reason.'
      - Ask the skill to identify missing evidence. Read its answer; the final decision is yours.
      - 'Add: "Local checks only. CI, security scanning, independent code review, and deployment were not run." Keep module scores separate in case-notes.md.'
    verify: The handoff can be checked against real output, identifies the untouched backup, and does not claim release approval.
    evidence: 'Decision/reason: ___. Restore file: ___. Release evidence still missing: ___.'
    hints:
      - A backup is a local restore point, not a Git commit or a deployed rollback.
      - A generated review cannot supply missing CI or scanner evidence.
      - If implementation is still blocked, hand off the failure honestly rather than marking it green.
    safetyCheckpoint: Do not push or deploy practice files. A local accept decision is not permission to ship.
bonusClues:
  - id: tighten-and-retry
    title: Improve one failed check
    durationMinutes: 3
    points: 10
    objectiveRef: Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
    scene: Mergewell keeps the failed attempt instead of erasing it.
    outcome: One recorded hypothesis and a focused rerun.
    actions: ['Keep the original output, change one implementation detail, and rerun the failing group. Skip if no check is failing.']
    routes:
      - harness: ide-extension
        instructions: ['Use the diff to keep the correction within selectAlerts.']
      - harness: copilot-cli
        instructions: ['State the one hypothesis before approving a correction.']
      - harness: copilot-app
        instructions: ['Inspect the single proposed correction before accepting it.']
    verify: Both outputs are saved and the note explains whether the hypothesis held.
    evidence: 'Hypothesis: ___. Before/after: ___.'
    hints: ['Keep the input fixed.', 'Do not change a test expectation.', 'Stopping with an unresolved result is honest evidence.']
    safetyCheckpoint: Preserve the original failure.
  - id: cross-harness-check
    title: Try a read-only reviewer role
    durationMinutes: 3
    points: 10
    objectiveRef: Explain the different jobs of the developer, a software agent, a reusable skill, a custom agent, and a tool
    scene: Purrmission separates reviewing from editing.
    outcome: A narrow reviewer profile or an explicitly labeled read-only prompt.
    actions: ['Use an existing read-only agent, or write a narrow reviewer prompt. Review the handoff without changing files; do not spend this time learning a new agent-file format.']
    routes:
      - harness: ide-extension
        instructions: ['Use a read-only agent/tool selection if available; otherwise Ask mode and an explicit no-edit request.']
      - harness: copilot-cli
        instructions: ['Inspect available agents with `/agent`; choose only a known read-only role or use a no-edit review prompt.']
      - harness: copilot-app
        instructions: ['Use the agent picker only for a known read-only role; otherwise request a plan/review without execution.']
    verify: No file changed; the review names one actual piece of evidence or a missing check.
    evidence: 'Reviewer route: ___. Actual tool restriction or prompt-only limit: ___. Finding: ___.'
    hints: ['An agent is a recurring role.', 'A skill supplies its procedure.', 'Prose-only limits are not enforced tool permissions.']
    safetyCheckpoint: Do not grant write tools to make a review easier.
  - id: control-room-observation
    title: Check the chosen control
    durationMinutes: 3
    points: 10
    objectiveRef: Choose a supported product control before an agentic task and verify afterward whether the result justified the AI credits used
    scene: Mergewell compares the chosen scope and model with useful verified progress.
    outcome: An honest before/after control observation, not an invented cost saving.
    actions: ['Review the model or permission choice made before your run and its actual verified result. Use visible usage only; do not rerun to obtain a number.']
    routes:
      - harness: ide-extension
        instructions: ['Inspect the existing model selection and any recorded usage signal.']
      - harness: copilot-cli
        instructions: ['Read `/usage` for this session and the recorded pre-run choice.']
      - harness: copilot-app
        instructions: ['Inspect the session model and available usage; label missing history.']
    verify: The note connects a real control to the result and labels any unavailable cost evidence.
    evidence: 'Pre-run choice: ___. Verified progress: ___. Usage/scope or unavailable: ___.'
    hints: ['Useful progress is a verified result.', 'Token counts alone do not prove money saved.', 'No prior reading means no numerical saving claim.']
    safetyCheckpoint: Do not spend another run for this bonus.
  - id: platform-review-surfaces
    title: Choose the exact reviewed release
    durationMinutes: 3
    points: 10
    objectiveRef: Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
    scene: Purrmission spots main moving after a test approval.
    outcome: A correct decision on a supplied release scenario, with no deployment.
    actions:
      - 'For this **simulation**, tested commit is `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`; current main is `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`; verified rollback is `cccccccccccccccccccccccccccccccccccccccc`.'
      - Write which commit to promote, which not to substitute, and which rollback still needs automated verification after deployment.
    routes:
      - harness: ide-extension
        instructions: ['Write the decision in `handoff.md`; do not open a real deployment.']
      - harness: copilot-cli
        instructions: ['Use the supplied packet only; do not run git or release commands.']
      - harness: copilot-app
        instructions: ['Save the simulated decision locally; do not create a PR or automation.']
    verify: You choose the tested a-commit, reject substituting b, and identify c as the prior verified rollback target.
    evidence: 'Simulation promote: ___. Do not substitute: ___. Rollback and recheck: ___.'
    hints: ['Approval belongs to an exact commit.', 'Newest is not the same as reviewed.', 'A rollback also needs verification.']
    safetyCheckpoint: These are synthetic identifiers, not an actual release authorization.
completionPoints: 40
bonusPointCap: 10
carryForward:
  artifact: Local developer case folder
  produces:
    - dispatch-lab.html with passing Foundations and Agentic checks, or explicit blocked results
    - brief.md, handoff.md, instruction file, case-check skill, and pre-change backup
    - Separate Foundations, Agentic, and cumulative scores in case-notes.md
  consumes:
    - The continuing Foundations lab, or this labeled starter with prior points unearned
  fallback: Advanced supplies a filter-complete starter and the short review procedure when prior artifacts are missing.
leaderboard:
  optional: true
  aliasOnly: true
  instructions: ['Share an alias and module scores only. Evidence and source files stay local.']
  submission:
    moduleOption: Agentic
    steps:
      - Check your Agentic totals. Reuse the same made-up alias as Foundations.
      - Submit this module separately; do not upload the handoff or source.
      - Follow the form instructions to correct or withdraw a score. Submission is optional.
status: draft
---

# Agentic Mission

The structured fields above are authoritative for the participant page.
Core work is 40 minutes, followed by 5 minutes for the artifact check and debrief.
