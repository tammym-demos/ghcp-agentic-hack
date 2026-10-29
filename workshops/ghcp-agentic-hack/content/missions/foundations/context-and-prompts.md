---
schemaVersion: 1
kind: mission
id: context-and-prompts
title: 'Foundations Mission: Context, Cost & Control'
module: foundations
durationMinutes: 45
debriefMinutes: 5
objectiveRefs:
  - Explain where GitHub Copilot lives across IDE, terminal, GitHub.com, cloud, and app surfaces and identify enterprise safety responsibilities
  - Apply VS Code chat references, inline completions, inline chat, and Ask/Plan/Agent modes to real engineering tasks
  - Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for cost-aware daily execution
  - Detect context rot and apply context window hygiene practices
  - Apply the autonomy spectrum and least-privilege delegation before escalating to agentic patterns
prerequisites:
  - One installed, signed-in, organization-approved Copilot tool and a browser
startingState: A personal empty folder; no repository, package installation, or local server is needed.
goal: Fix one small JavaScript bug, prove which context you used, and check the result yourself.
task: Work through six short steps. Keep the same case folder for the next module.
constraints:
  - Use synthetic practice data only. Do not open a work or customer repository.
  - Do not install packages, enable new integrations, or broaden permissions.
  - Mode and tool permissions are separate. Do not enable unattended execution for this mission.
evidence:
  - A tested dispatch-lab.html and an unchanged starter backup
  - case-notes.md with context, usage, approval, and check observations
safetyCheckpoints:
  - Purrmission checks the folder, allowed edit, and restore copy before any change.
corePath:
  - 'Open the lab: 5 min, 5 points.'
  - 'Ask, then plan: 7 min, 10 points.'
  - 'Prove the file was read: 6 min, 10 points.'
  - 'Start fresh without losing the brief: 5 min, 5 points.'
  - 'Read a usage signal: 5 min, 10 points.'
  - 'Make and verify one change: 12 min, 10 points.'
stretchPath:
  - Only use spare time. Stop bonus work when the five-minute debrief starts.
debrief:
  - What evidence showed a file was read, rather than merely present on disk?
  - What did you check before accepting the change?
validation:
  - Foundations checks show 3 PASS and 0 FAIL, or the exact blocked check is recorded.
  - Keep dispatch-lab.html, dispatch-lab.backup.html, team-rules.md, and case-notes.md.
  - Record the actual point total; forty core points is participation completion, not proof every step worked.
casePacket:
  - '**Start here:** create a personal `copilot-case-file` folder. Choose your tool below. Use its local-folder session, not a cloud workspace.'
  - '**Practice files:** copy the starter below into `dispatch-lab.html`. Save it, then duplicate it as `dispatch-lab.backup.html`. Create `case-notes.md` for short answers.'
  - '**Run it:** double-click `dispatch-lab.html` to open it in your browser. Click **Foundations**. After each save, reload this local page and click again. Nothing is sent to a server.'
  - '**Stuck after two minutes?** Ask Copilot how to do that one step, or pair with someone using the same tool. Record a blocked or paired result honestly; do not install anything.'
  - '**Earlier draft progress?** Keep old notes separate. Untick earlier completions before scoring these replacement exercises; the exercise ids have not changed.'
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
    function labelFor(note) { return note.trim(); }
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
    description: Edit local files with Copilot Chat.
    instructions:
      - Open the case folder with File > Open Folder. Open Chat with Ctrl+Alt+I (Cmd+Alt+I on Mac).
      - Create files in Explorer. Save with Ctrl+S (Cmd+S). Use the plus button for a new chat.
      - Use Ask for explanation, Plan for a proposal, and Agent only after you approve an edit. Inspect the active permission controls; do not choose automatic approval.
  - id: copilot-cli
    title: GitHub Copilot CLI
    description: Work in a local terminal session.
    instructions:
      - In your normal shell, change into the case folder, then run `copilot`. Use a text editor to save the starter HTML.
      - Slash commands belong inside Copilot; shell commands belong outside it. Use `/exit` to return to the shell.
      - Use `/new` for fresh context. Keep default restrictions, inspect approval requests, and do not enable autopilot or allow-all flags.
  - id: copilot-app
    title: GitHub Copilot app
    description: Work in a local-folder agent session.
    instructions:
      - Choose Open local folder, then start a session in the case folder. Confirm the session's actual working location before creating files.
      - Use the prompt-box mode control. Plan proposes; Interactive works with you. Set tool permissions to Ask every time where available, not Approve all.
      - Ask for files by exact name and inspect the saved file. Open that local HTML file in your browser; the app's file list is not proof of active context.
coreClues:
  - id: set-up-the-case
    title: Open the lab
    durationMinutes: 5
    points: 5
    objectiveRef: Explain where GitHub Copilot lives across IDE, terminal, GitHub.com, cloud, and app surfaces and identify enterprise safety responsibilities
    scene: Mergewell opens a disposable case; Purrmission checks where it lives.
    outcome: The local lab runs and its original version is safe to restore.
    routes:
      - harness: ide-extension
        instructions: ['Create the three files in Explorer; open `dispatch-lab.html` in your browser.']
      - harness: copilot-cli
        instructions: ['Save the files in a text editor before starting `copilot` in this folder.']
      - harness: copilot-app
        instructions: ['Ask for the starter to be saved as `dispatch-lab.html` in the confirmed local folder; inspect the file before opening it.']
    actions:
      - Save the starter and its backup, then click Foundations in the browser.
      - 'In `case-notes.md`, record your tool, local folder, and the failing check. Other check groups belong to later modules.'
    verify: Foundations shows 2 PASS and 1 FAIL for blank label. The backup opens and shows the same result.
    evidence: 'Tool: ___. Folder: ___. Failing check: ___. Backup: ___.'
    hints:
      - Copy the whole starter, including the first and last lines.
      - Save as .html, not .html.txt. Reload after saving.
      - A failing blank-label check is the intended starting state.
    safetyCheckpoint: Keep the practice folder away from real work. No installs or network access are needed.
  - id: first-prompts
    title: Ask, then plan
    durationMinutes: 7
    points: 10
    objectiveRef: Apply VS Code chat references, inline completions, inline chat, and Ask/Plan/Agent modes to real engineering tasks
    scene: Mergewell asks for understanding before granting permission to edit.
    outcome: An explanation and a small plan, with no changed files.
    routes:
      - harness: ide-extension
        instructions: ['Use Ask with `dispatch-lab.html` attached; switch to Plan only if your installation offers it.']
      - harness: copilot-cli
        instructions: ['Name the HTML file in your prompt. Ask for explanation only, then use Plan mode if available.']
      - harness: copilot-app
        instructions: ['Attach the HTML with `@` or the file attachment control. Use Plan; do not authorize execution.']
    actions:
      - 'Ask: "Read dispatch-lab.html. Why does the blank-label check fail? Explain only. Do not edit or run anything."'
      - 'Then ask: "Plan the smallest labelFor change. Whitespace-only input must return (untitled); other labels stay trimmed. Name the allowed edit and checks. Do not act."'
      - Check the plan against all three Foundations cases. Reject any proposal to change the tests.
    verify: The plan names labelFor only, predicts three passing checks, and no file has changed.
    evidence: 'Cause: ___. Allowed edit: ___. Checks I expect: ___.'
    hints:
      - The blank input becomes an empty string after trimming.
      - Ask explains; a plan is not permission to change a file.
      - No Plan control? Request a written plan explicitly and record the control as unavailable.
    safetyCheckpoint: Stop if the tool edits while you asked for explanation or planning. Restore the backup before continuing.
  - id: see-the-context
    title: Prove the file was read
    durationMinutes: 6
    points: 10
    objectiveRef: Detect context rot and apply context window hygiene practices
    scene: Purrmission wants evidence of a read, not a guess about a folder.
    outcome: A file reference or tool-read trace plus a correctly quoted practice rule.
    routes:
      - harness: ide-extension
        instructions: ['Attach `team-rules.md` explicitly with Add Context or the file picker; inspect response References.']
      - harness: copilot-cli
        instructions: ['Ask to read `team-rules.md`; inspect the actual read/tool trace. Use `/context` for session composition, not a full file inventory.']
      - harness: copilot-app
        instructions: ['Attach `team-rules.md` with `@` or the attachment control; inspect the read activity, not just the files area.']
    actions:
      - 'Create `team-rules.md` containing: "Practice marker: LANTERN-47. Edit only labelFor until the Foundations checks pass."'
      - 'Ask: "Read team-rules.md. Quote the marker and the allowed edit. Do not change anything."'
      - Record what proves the read. If your tool hides it, record that limit; a matching answer alone is not proof of which source supplied it.
    verify: The answer quotes LANTERN-47 and labelFor; your note distinguishes observed source evidence from an unobservable claim.
    evidence: 'Marker: ___. Source evidence I saw: ___. Not observable here: ___.'
    hints:
      - Attach one file, not your whole home folder.
      - A file on disk may be accessible without having entered this request.
      - Ask which tool read it, then verify the visible trace yourself.
    safetyCheckpoint: Add synthetic context only. Do not use a private file to test exclusions.
  - id: add-to-context
    title: Start fresh with a useful handoff
    durationMinutes: 5
    points: 5
    objectiveRef: Detect context rot and apply context window hygiene practices
    scene: Mergewell carries a short brief into a clean conversation.
    outcome: A fresh session that still knows the task, boundary, and checks.
    routes:
      - harness: ide-extension
        instructions: ['Start a new chat with plus, then attach the HTML and `team-rules.md` again.']
      - harness: copilot-cli
        instructions: ['Use `/new`, confirm the same folder, then explicitly ask to read the two named files.']
      - harness: copilot-app
        instructions: ['Start another local session in the same folder; verify the working location and attach both files again.']
    actions:
      - 'Save three lines in `case-notes.md`: goal, allowed edit, and the three checks. Paste those lines into the new session.'
      - Ask it to repeat the boundary and marker before acting. Correct any missing context.
    verify: The fresh reply names labelFor, the blank-label behavior, LANTERN-47, and the checks without relying on the old chat.
    evidence: 'I carried forward: ___. I had to supply again: ___.'
    hints:
      - New sessions do not automatically inherit every detail from an old chat.
      - Carry decisions and constraints, not the whole transcript.
      - If a constraint is missing, reattach its source before approving work.
    safetyCheckpoint: A new chat is not proof of cache deletion or permission reset.
  - id: credits-and-model
    title: Read a usage signal
    durationMinutes: 5
    points: 10
    objectiveRef: Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for cost-aware daily execution
    scene: Purrmission checks the meter without buying another run.
    outcome: One honest usage observation and a sensible model choice for this small fix.
    routes:
      - harness: ide-extension
        instructions: ['Inspect available usage/context indicators and the model picker. Do not assume the numbers are account-wide billing.']
      - harness: copilot-cli
        instructions: ['Read `/usage` and the selected model. Use `/model` to inspect choices without rerunning the task.']
      - harness: copilot-app
        instructions: ['Inspect the model control below the prompt and any available usage view; use `/usage` only if offered.']
    actions:
      - Record a displayed reading and its scope, or write "not shown". Choose an approved lightweight model or Auto for the coming edit; no comparison run is required.
      - 'Read this **simulated receipt**: total input 1200 tokens, including 800 cached; output 200; reasoning not reported. How many input tokens were uncached?'
      - Write why these numbers do not establish the AI Credits charged or prove the answer correct.
    verify: Your note says 400 uncached input tokens, labels the receipt simulated, and separates token counts from cost and correctness.
    evidence: 'Actual reading/scope: ___. Model choice: ___. Simulated uncached input: ___. This does not prove: ___.'
    hints:
      - Cached input is included in the stated input total, not added again.
      - Subtract 800 from 1200. Do not invent a hidden reasoning count.
      - No counters or model choice? Record the limitation and still interpret the supplied receipt.
    safetyCheckpoint: Do not upgrade, buy credits, or enable a model just for this exercise.
  - id: autopilot-or-not
    title: Make and verify one change
    durationMinutes: 12
    points: 10
    objectiveRef: Apply the autonomy spectrum and least-privilege delegation before escalating to agentic patterns
    scene: Mergewell approves one edit; Purrmission watches the diff and the restore.
    outcome: A reviewed label fix, three passing checks, and a tested restore path.
    routes:
      - harness: ide-extension
        instructions: ['Select Agent only after approving the plan. Inspect permission requests and the diff; keep changes supervised.']
      - harness: copilot-cli
        instructions: ['Request the approved edit in the current interactive session. Do not enable autopilot; inspect each permission request that appears.']
      - harness: copilot-app
        instructions: ['Use Interactive with Ask every time where available. Mode does not by itself configure tool permissions.']
    actions:
      - 'Approve: "Change only labelFor in dispatch-lab.html as planned. Do not change tests, other functions, or files. No commands, installs, or network. Stop if that is insufficient."'
      - Save, reload the browser lab, and run Foundations. Inspect the diff against the backup; only labelFor should differ.
      - Save the fixed file as `dispatch-lab.fixed.html`. Restore the backup over the working file and rerun Foundations; confirm the original blank-label failure returns.
      - Put the fixed copy back, rerun Foundations, and record accept, revise, or stop with a reason.
    verify: You observed the original failure, 3 PASS after the fix, the same failure after restoration, and 3 PASS again. Tests stayed unchanged.
    evidence: 'Before: ___. After: ___. Restore result: ___. My decision/reason: ___.'
    hints:
      - Trim once, then return the trimmed value or "(untitled)" when it is empty.
      - Save and reload before every check. A stale browser page is not the saved file.
      - If the tool cannot edit, make the planned change yourself and label it a manual run. Keep the same checks.
    safetyCheckpoint: Reject unrelated edits. A passing message from Copilot is not a passing browser check.
bonusClues:
  - id: model-showdown
    title: Inspect a model choice
    durationMinutes: 3
    points: 10
    objectiveRef: Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for cost-aware daily execution
    scene: Mergewell checks whether a stronger model is actually needed.
    outcome: A task-based model switching rule, without spending a comparison run.
    actions:
      - Inspect available approved models. Name one task harder than this label fix and when you would escalate.
    routes:
      - harness: ide-extension
        instructions: ['Inspect the model picker; do not send another prompt just to compare.']
      - harness: copilot-cli
        instructions: ['Inspect `/model`, then keep or cancel the selection deliberately.']
      - harness: copilot-app
        instructions: ['Inspect the model control below the prompt; do not enable a new provider.']
    verify: Your rule names a task, a reason to escalate, and a check the stronger model still must pass.
    evidence: 'Escalate when: ___. Still verify: ___.'
    hints: ['Start with the smallest sufficient model.', 'A longer reply is not proof of quality.', 'Unavailable models are not a reason to change policy.']
    safetyCheckpoint: Use approved choices only.
  - id: cross-harness
    title: Inspect the same result in another tool
    durationMinutes: 3
    points: 10
    objectiveRef: Explain where GitHub Copilot lives across IDE, terminal, GitHub.com, cloud, and app surfaces and identify enterprise safety responsibilities
    scene: Purrmission checks whether another view makes the same evidence clearer.
    outcome: One comparison of the existing diff or checks, with no new edit.
    actions:
      - If another approved tool is already installed, open the same local folder and inspect the completed result. Otherwise skip this bonus.
    routes:
      - harness: ide-extension
        instructions: ['Inspect the file in another already-installed tool; keep it read-only.']
      - harness: copilot-cli
        instructions: ['Use an already-installed editor to inspect the file; no new Copilot run is needed.']
      - harness: copilot-app
        instructions: ['Open the saved file in an already-installed editor; verify it is the same working path.']
    verify: Your note names one difference in how the same saved result was inspected.
    evidence: 'Second tool: ___. Same file/path: ___. Easier to inspect: ___.'
    hints: ['Compare evidence, not a second implementation.', 'Check the path first.', 'Skip if setup would consume the debrief.']
    safetyCheckpoint: Do not install a tool or broaden its access for bonus points.
completionPoints: 40
bonusPointCap: 10
carryForward:
  artifact: Local developer case folder
  produces:
    - dispatch-lab.html with passing Foundations checks
    - dispatch-lab.backup.html, team-rules.md, and case-notes.md with actual scores
  consumes:
    - The copyable starter HTML on this page
  fallback: Keep blocked work labeled. Agentic has a fresh starter with the label fix supplied and earlier points unearned.
leaderboard:
  optional: true
  aliasOnly: true
  instructions: ['Share an alias and scores only; keep files, prompts, and evidence local.']
  submission:
    moduleOption: Foundations
    steps:
      - Check the scorecard and use a made-up alias, not your real name or work identity.
      - Submit this module only. Keep the same alias for the next modules.
      - Follow the form instructions to correct or withdraw a score. Submission is optional.
status: draft
---

# Foundations Mission

The structured fields above are the participant-page contract. Core steps total
40 minutes; verification and debrief reserve the remaining 5 minutes.
