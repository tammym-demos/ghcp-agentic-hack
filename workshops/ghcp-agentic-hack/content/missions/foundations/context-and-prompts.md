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
startingState: A personal empty folder. You don't need a repository, package installs, or a local server.
goal: Fix one small JavaScript bug with Copilot, show which file it actually read, and check the result yourself.
task: Work through six short steps in one practice folder. You'll keep the same folder for the next module.
constraints:
  - Use made-up practice data only. Don't open a work or customer repository.
  - Don't install packages, turn on new integrations, or give Copilot more permissions.
  - Choosing a chat mode doesn't set what Copilot is allowed to do. Keep approvals on, and don't let Copilot run unattended.
evidence:
  - A fixed dispatch-lab.html and an untouched backup copy
  - case-notes.md with your notes on what Copilot read, usage, approvals, and check results
safetyCheckpoints:
  - Purrmission checks the folder, what you're allowed to edit, and your backup copy before anything changes.
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
  - How could you tell Copilot actually read a file, rather than the file just sitting in your folder?
  - What did you check before you accepted the change?
validation:
  - The Foundations checks show 3 PASS and 0 FAIL, or you've written down exactly which check is stuck.
  - Keep dispatch-lab.html, dispatch-lab.backup.html, team-rules.md, and case-notes.md.
  - Write down the points you actually earned. Reaching 40 means you finished the mission, not that every step worked.
casePacket:
  - '**Start here:** create a personal `copilot-case-file` folder. Choose your tool below and open the folder in it on your own machine, not in a cloud workspace.'
  - '**Practice files:** copy the starter below into a file called `dispatch-lab.html`. Save it, then make a copy called `dispatch-lab.backup.html`. Create `case-notes.md` for your short answers.'
  - '**Run it:** double-click `dispatch-lab.html` to open it in your browser, then click **Foundations**. After each save, reload the page and click again. Nothing is sent to a server.'
  - '**Where to type prompts:** when a step says "Type this into the Copilot chat", use the Chat box in VS Code, the prompt you get after running `copilot` in the CLI, or the prompt box in your Copilot app session.'
  - '**Stuck for two minutes?** Ask Copilot how to do that one step, or pair with someone using the same tool. If you still can''t finish it, write that down, or note that you paired. Don''t install anything.'
  - '**Did an earlier version of this mission?** Keep those notes separate, and untick any steps you completed before scoring this version. The step names haven''t changed.'
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
      - Open the case folder with File > Open Folder. Open Chat with Ctrl+Alt+I (Cmd+Alt+I on Mac). You type prompts into the box at the bottom of the Chat view.
      - Create files in Explorer and save with Ctrl+S (Cmd+S). Click the + button to start a new chat.
      - 'The mode picker under the chat box sets how Copilot works: Ask explains, Plan proposes, and Agent makes changes. Only switch to Agent after you''ve agreed to an edit. Leave approvals on, and don''t choose automatic approval.'
  - id: copilot-cli
    title: GitHub Copilot CLI
    description: Work in a local terminal session.
    instructions:
      - In your normal terminal, go to the case folder and run `copilot`. You type prompts at the prompt it shows you. Save the starter HTML with any text editor.
      - Commands that start with `/` go to Copilot. Normal terminal commands don't; type `/exit` to get back to your terminal first.
      - Type `/new` to start a fresh conversation. Keep the default settings, read every approval request, and don't turn on autopilot or allow-all options.
  - id: copilot-app
    title: GitHub Copilot app
    description: Work in a local-folder agent session.
    instructions:
      - Choose Open local folder, pick your case folder, and start a session there. Check that the session shows that folder before you create any files.
      - 'You type prompts into the box at the bottom of the session. The mode control next to it sets how Copilot works: Plan proposes, and Interactive works step by step with you. If you see tool permissions, choose Ask every time, not Approve all.'
      - Use exact file names when you ask for files, then open the saved file to check it. Seeing a file in the app's file list doesn't mean Copilot has read it.
coreClues:
  - id: set-up-the-case
    title: Open the lab
    durationMinutes: 5
    points: 5
    objectiveRef: Explain where GitHub Copilot lives across IDE, terminal, GitHub.com, cloud, and app surfaces and identify enterprise safety responsibilities
    scene: Mergewell opens a practice case; Purrmission checks where it lives.
    outcome: A working copy of the practice lab in your browser, plus a backup you can go back to if a change goes wrong.
    routes:
      - harness: ide-extension
        instructions: ['Create the three files in Explorer, then double-click `dispatch-lab.html` in your file manager to open it in your browser.']
      - harness: copilot-cli
        instructions: ['Save the three files with a text editor before you start `copilot` in this folder.']
      - harness: copilot-app
        instructions: ['Paste the starter into the chat and ask Copilot to save it as `dispatch-lab.html` in your case folder. Open the saved file to check it before you open it in your browser.']
    actions:
      - Save the starter as `dispatch-lab.html` and make a copy called `dispatch-lab.backup.html`.
      - Open `dispatch-lab.html` in your browser and click **Foundations**. One check fails on purpose. That's the bug you'll fix in this mission.
      - In `case-notes.md`, write down which tool you're using, where your folder is, and the name of the failing check. Ignore the other buttons for now; they're for later modules.
    verify: Foundations shows 2 PASS and 1 FAIL (blank label), and your backup copy shows the same thing when you open it.
    evidence: 'Tool: ___. Folder: ___. Failing check: ___. Backup file: ___.'
    hints:
      - Copy the whole starter, including the first and last lines.
      - Save the file as .html, not .html.txt. Reload the page after saving.
      - A failing blank label check is where you're meant to start.
    safetyCheckpoint: Keep this practice folder away from real work. You don't need to install anything or go online.
  - id: first-prompts
    title: Ask, then plan
    durationMinutes: 7
    points: 10
    objectiveRef: Apply VS Code chat references, inline completions, inline chat, and Ask/Plan/Agent modes to real engineering tasks
    scene: Mergewell wants to understand the bug before he lets anyone change the code.
    outcome: An explanation of the bug and a plan to fix it, with no files changed yet. Seeing the plan first lets you catch a bad fix before it happens.
    routes:
      - harness: ide-extension
        instructions: ['Set the mode picker to **Ask** and attach `dispatch-lab.html` by typing `#` and picking the file. For the second prompt, switch to **Plan** if you have it.']
      - harness: copilot-cli
        instructions: ['Type both prompts at the `copilot` prompt. They name the file, so you don''t need to attach it. For the second prompt, switch to Plan mode if your version has it.']
      - harness: copilot-app
        instructions: ['Attach `dispatch-lab.html` with `@` or the attach button, and set the mode to **Plan**. Don''t let it start making changes.']
    actions:
      - 'Type this into the Copilot chat: "Look at dispatch-lab.html and explain why the blank label check fails. Don''t change or run anything yet. I just want to understand the problem."'
      - 'Then type: "What''s the smallest change to the labelFor function that would fix this? If a label is only spaces, it should return (untitled). Any other label should still have its extra spaces trimmed. Tell me what you''d change and which checks should pass afterward, but don''t make the change yet."'
      - Read the plan. Would all three Foundations checks pass with it? If it suggests changing the checks themselves, say no. The checks are how you'll know the fix works.
    verify: Copilot has explained the bug, its plan changes only labelFor and expects all three checks to pass, and none of your files have changed.
    evidence: 'Why it fails: ___. What the plan changes: ___. Checks I expect to pass: ___.'
    hints:
      - Trimming the spaces from a blank label leaves an empty string, and nothing turns that into (untitled).
      - Ask mode explains. A plan is a proposal, not permission to change a file.
      - No Plan option? Ask for a written plan in the chat instead, and note that Plan mode wasn't available.
    safetyCheckpoint: If Copilot changes a file when you only asked for an explanation or a plan, stop. Copy your backup over the working file before you carry on.
  - id: see-the-context
    title: Prove the file was read
    durationMinutes: 6
    points: 10
    objectiveRef: Detect context rot and apply context window hygiene practices
    scene: Purrmission wants to see that Copilot actually read the file, not just that the file is in the folder.
    outcome: A rules file that Copilot quotes back to you, and a note on what showed you it really read that file. This matters because Copilot can sound right while working from something else.
    routes:
      - harness: ide-extension
        instructions: ['Attach `team-rules.md` with **Add Context** or by typing `#`. After Copilot answers, expand **References** under its reply to see which files it used.']
      - harness: copilot-cli
        instructions: ['Your prompt asks Copilot to open the file, so watch for the step where it reads `team-rules.md`. (`/context` shows how full the conversation is; it doesn''t list every file.)']
      - harness: copilot-app
        instructions: ['Attach `team-rules.md` with `@` or the attach button. Look for the read step in the session activity, not just the file list.']
    actions:
      - 'Create `team-rules.md` with this one line: "Practice marker: LANTERN-47. Edit only labelFor until the Foundations checks pass."'
      - 'Type this into the Copilot chat: "Open team-rules.md and tell me, word for word, the practice marker and which function I''m allowed to edit. Don''t change anything."'
      - Look for what shows Copilot read the file, such as the file listed under References or a "read file" step. Write it down. If your tool doesn't show this, write that down too. A correct answer on its own doesn't prove where the answer came from.
    verify: Copilot quotes LANTERN-47 and labelFor, and your note says what you actually saw that shows it read the file, or that your tool didn't show it.
    evidence: 'Marker: ___. What showed me it read the file: ___. What my tool didn''t show: ___.'
    hints:
      - Attach just this one file, not your whole folder.
      - A file being in your folder doesn't mean Copilot has read it for this question.
      - Not sure where to look? Ask Copilot how it read the file, then find that step on screen yourself.
    safetyCheckpoint: Use only made-up practice text here. Don't use a private file to test what Copilot can see.
  - id: add-to-context
    title: Start fresh with a useful handoff
    durationMinutes: 5
    points: 5
    objectiveRef: Detect context rot and apply context window hygiene practices
    scene: Mergewell starts a clean conversation and brings a short summary with him, not the whole old chat.
    outcome: A fresh chat that knows the task, the limits, and the checks because you gave it a three-line summary. Long chats get cluttered, and this is how you start over without losing what matters.
    routes:
      - harness: ide-extension
        instructions: ['Click **+** to start a new chat, then attach `dispatch-lab.html` and `team-rules.md` again.']
      - harness: copilot-cli
        instructions: ['Type `/new`, check you''re still in the case folder, then name both files in your message.']
      - harness: copilot-app
        instructions: ['Start a new session in the same folder, check it shows the right folder, then attach both files again.']
    actions:
      - 'In `case-notes.md`, write three short lines: the goal (fix the blank label), what you''re allowed to edit (labelFor only), and the three Foundations checks.'
      - 'Start the new chat and paste in those three lines. Then type: "Before you do anything, tell me what you''re allowed to change and what the practice marker is."'
      - If anything in its answer is missing or wrong, correct it.
    verify: The new chat names labelFor, says a blank label should become (untitled), quotes LANTERN-47, and lists the checks, all without the old conversation.
    evidence: 'What I carried over: ___. What I had to add again: ___.'
    hints:
      - A new chat doesn't remember the details of your old one.
      - Bring the decisions and limits, not the whole conversation.
      - Copilot didn't know the marker? Check that `team-rules.md` is attached in the new chat.
    safetyCheckpoint: Starting a new chat only clears the conversation. It doesn't clear any cache or reset permissions.
  - id: credits-and-model
    title: Read a usage signal
    durationMinutes: 5
    points: 10
    objectiveRef: Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for cost-aware daily execution
    scene: Purrmission checks how much has been used so far, without spending more to find out.
    outcome: One note on what your tool shows about usage, a sensible model choice for this small fix, and practice reading a token receipt.
    routes:
      - harness: ide-extension
        instructions: ['Look for any usage or context indicator near the chat box, and open the model picker. These numbers may not be your account''s full bill.']
      - harness: copilot-cli
        instructions: ['Type `/usage` to see usage for this session, and `/model` to see the model choices. You don''t need to run the task again.']
      - harness: copilot-app
        instructions: ['Check the model control below the prompt box and any usage view. Use `/usage` only if the app offers it.']
    actions:
      - Write down any usage number your tool shows, and what it covers (this chat, this session, or your account). If it doesn't show one, write "not shown".
      - Pick a lightweight approved model, or Auto, for the fix in the next step. You don't need to compare models.
      - 'Read this **made-up receipt**: 1,200 input tokens in total, 800 of them cached; 200 output tokens; reasoning tokens not reported. How many input tokens were not cached?'
      - Write one line on why these numbers can't tell you how many AI Credits you were charged, or whether the answer was right.
    verify: Your note says 400 uncached input tokens, labels the receipt as made up, and explains that token counts don't tell you the cost or whether the answer was correct.
    evidence: 'What my tool showed, and what it covers: ___. Model I picked: ___. Uncached input tokens: ___. These numbers don''t tell me: ___.'
    hints:
      - The 800 cached tokens are already part of the 1,200. Don't add them again.
      - Take 800 away from 1,200. Don't guess at the reasoning tokens.
      - No usage numbers or model choice in your tool? Write that down and still work out the receipt.
    safetyCheckpoint: Don't upgrade, buy credits, or turn on a new model for this exercise.
  - id: autopilot-or-not
    title: Make and verify one change
    durationMinutes: 12
    points: 10
    objectiveRef: Apply the autonomy spectrum and least-privilege delegation before escalating to agentic patterns
    scene: Mergewell approves one small edit. Purrmission watches what changes and makes sure he can undo it.
    outcome: A working fix for the blank label, three passing checks, and proof that your backup really can undo the change.
    routes:
      - harness: ide-extension
        instructions: ['Switch to **Agent** mode now that you''ve agreed the plan. Approve each request only if it matches the plan, and review the changes before you keep them.']
      - harness: copilot-cli
        instructions: ['Stay in the same conversation and don''t turn on autopilot. Read each approval request before you say yes.']
      - harness: copilot-app
        instructions: ['Use **Interactive** mode, with Ask every time if you see it. The mode on its own doesn''t set what Copilot is allowed to do.']
    actions:
      - 'Type this into the Copilot chat: "Go ahead and make the change we planned to labelFor in dispatch-lab.html. Only change that one function. Leave the checks, the other functions, and the other files alone. Don''t run commands, install anything, or go online. If that isn''t enough to fix it, stop and tell me."'
      - Save, reload the page in your browser, and click **Foundations**. Compare the file with your backup. labelFor should be the only difference.
      - Now test that you can undo it. Save the fixed file as `dispatch-lab.fixed.html`, copy the backup over `dispatch-lab.html`, reload, and run Foundations again. The blank label check should fail again.
      - Copy the fixed version back, run Foundations once more, and write down whether you accept the change, want it revised, or are stopping, and why.
    verify: You've seen the original failure, 3 PASS after the fix, the failure come back after you restored the backup, and 3 PASS again. The checks themselves never changed.
    evidence: 'Before: ___. After the fix: ___. After restoring the backup: ___. My decision and why: ___.'
    hints:
      - Trim the label once. If the result is empty, return "(untitled)"; otherwise return the trimmed label.
      - Save and reload before every check. An old browser tab still shows the old file.
      - Copilot can't edit in your tool? Make the planned change yourself, note that it was a manual fix, and run the same checks.
    safetyCheckpoint: Turn down any change you didn't ask for. Copilot saying the checks pass isn't the same as seeing them pass in your browser.
bonusClues:
  - id: model-showdown
    title: Inspect a model choice
    durationMinutes: 3
    points: 10
    objectiveRef: Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for cost-aware daily execution
    scene: Mergewell checks whether he actually needs a stronger model.
    outcome: A simple rule for when you'd switch to a stronger model, without spending a run to compare.
    actions:
      - Look at the models you're allowed to use. Name one task harder than this label fix, and say when you'd switch to a stronger model for it.
    routes:
      - harness: ide-extension
        instructions: ['Open the model picker. Don''t send another prompt just to compare.']
      - harness: copilot-cli
        instructions: ['Type `/model` to see the choices, then keep or cancel your selection on purpose.']
      - harness: copilot-app
        instructions: ['Open the model control below the prompt box. Don''t turn on a new provider.']
    verify: Your rule names a task, why you'd switch, and a check the stronger model's answer still has to pass.
    evidence: 'I''d switch when: ___. I''d still check: ___.'
    hints: ['Start with the smallest model that does the job.', 'A longer answer isn''t a better answer.', 'If a model isn''t available to you, that isn''t a reason to change the rules.']
    safetyCheckpoint: Use only models your organization has approved.
  - id: cross-harness
    title: Inspect the same result in another tool
    durationMinutes: 3
    points: 10
    objectiveRef: Explain where GitHub Copilot lives across IDE, terminal, GitHub.com, cloud, and app surfaces and identify enterprise safety responsibilities
    scene: Purrmission checks whether another tool makes the same result easier to check.
    outcome: One comparison of how your finished fix looks in a second tool, with no new changes.
    actions:
      - If you already have another approved Copilot tool installed, open the same folder in it and look at your finished fix. If you don't, skip this bonus.
    routes:
      - harness: ide-extension
        instructions: ['Open the file in another tool you already have installed. Look only; don''t change it.']
      - harness: copilot-cli
        instructions: ['Open the file in an editor you already have. You don''t need another Copilot run.']
      - harness: copilot-app
        instructions: ['Open the saved file in an editor you already have, and check it''s the same file path.']
    verify: Your note names one thing that was easier or harder to check in the second tool.
    evidence: 'Second tool: ___. Same file and path: ___. Easier to check there: ___.'
    hints: ['Compare how you check the result, not a second version of the fix.', 'Check the file path first.', 'Skip it if setting up would eat into the debrief.']
    safetyCheckpoint: Don't install a tool or give it more access just for bonus points.
completionPoints: 40
bonusPointCap: 10
carryForward:
  artifact: Local developer case folder
  produces:
    - dispatch-lab.html with passing Foundations checks
    - dispatch-lab.backup.html, team-rules.md, and case-notes.md with your actual scores
  consumes:
    - The copyable starter HTML on this page
  fallback: If something stayed stuck, keep it labeled. The Agentic mission has a fresh starter with the label fix already done, but using it doesn't earn the Foundations points.
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
