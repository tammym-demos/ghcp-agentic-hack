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
  - Explain the different jobs of the developer, a software agent, a reusable skill, a custom agent, and a tool, including how skill frontmatter descriptions support relevance-based discovery without guaranteeing selection or invocation
  - Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
  - Choose a supported product control before an agentic task and verify afterward whether the result justified the AI credits used
prerequisites:
  - One signed-in, approved Copilot tool, a browser, and a personal case folder
startingState: Continue with your Foundations lab, or copy the starter below. The starter includes the label fix, but not the Foundations points.
goal: Add a priority filter to the lab by giving Copilot a clear brief, a rules file, and a reusable review skill, without letting it rewrite the checks.
task: Plan the change, set Copilot up, make the change, check it, and hand it off with evidence.
constraints:
  - Only selectAlerts may change. Leave the checks and the other functions alone.
  - You don't need packages, network access, pushes, or deployment.
  - Stop if the change needs a new file, tool, or permission that your brief doesn't allow.
evidence:
  - Before-and-after results for the four Agentic checks and the three Foundations checks
  - A short brief, a rules file, a review skill, and a handoff note in your case folder
safetyCheckpoints:
  - Before any code changes, Purrmission checks that your brief says what can change, how you'll know the rules loaded, which cases to get right, and when to stop.
corePath:
  - 'Write the brief: 6 min, 10 points.'
  - 'Load one useful instruction: 7 min, 10 points.'
  - 'Make a reusable check skill: 7 min, 10 points.'
  - 'Implement and check the filter: 13 min, 10 points.'
  - 'Hand off evidence, not confidence: 7 min, 10 points.'
stretchPath: ['Use spare time for bonus steps only. Save the last five minutes for checking your files and the debrief.']
debrief:
  - Which check stopped you from accepting a change that wasn't finished?
  - What else would you need before this change could ship for real?
validation:
  - Agentic shows 4 PASS and Foundations shows 3 PASS, or you've written down exactly which check is still failing.
  - Keep your backup, brief, rules file, review skill, and handoff note.
  - Carry only the points you earned into Advanced. Reaching 40 points doesn't turn a failing check into a pass.
casePacket:
  - '**Continuing from Foundations?** Reopen your case folder and keep your working lab and scores. Only use the starter below if your lab file is missing or Foundations is still failing.'
  - '**Starting here?** Save the starter as `dispatch-lab.html` in a new `copilot-case-file` folder. Create `case-notes.md` and write: Foundations 0 points (used the supplied starter).'
  - '**Before you change anything:** copy the working file to `dispatch-lab.agentic-backup.html`. Open the working file in your browser. Save and reload each time before you run checks.'
  - '**Where to type prompts:** when a step says "Type this into the Copilot chat", use the Chat box in VS Code, the `copilot` prompt in the CLI, or the prompt box in your Copilot app session.'
  - '**Keep it small:** you''re adding one filter. You don''t need cloud agents, hooks, live reviews, or deployment.'
  - '**Stuck for two minutes?** Ask Copilot for help with just that step, or pair with someone. You can make the change by hand if you note that you did. Don''t claim Copilot read a file or used a skill unless you saw it happen.'
  - '**Did an earlier version of this mission?** Keep those notes separate, and untick any steps you completed before scoring this version.'
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
      - Open the case folder and the Chat view. Create folders and files in Explorer and save with Ctrl+S (Cmd+S on Mac). You type prompts into the box at the bottom of the Chat view.
      - Start a new chat after you change a rules file. Expand **References** under Copilot's reply to see which files it used. Saving a file doesn't mean Copilot read it.
      - Use **Plan** before any edits, and switch to **Agent** only after you've agreed to the change. Leave approvals on.
  - id: copilot-cli
    title: GitHub Copilot CLI
    description: Use an interactive local session.
    instructions:
      - Run `copilot` inside the case folder and type prompts at its prompt. Create files with a text editor, or ask Copilot to create them by exact name. Normal terminal commands go outside Copilot.
      - Type `/instructions` to see which instruction files are loaded, and `/env` to see how the session is set up. After you change a rules file, start a new session and attach your brief again.
      - After you add a skill, type `/skills reload`, then `/skills info case-check` to check its details. A skill showing up in the list doesn't mean Copilot will use it.
  - id: copilot-app
    title: GitHub Copilot app
    description: Use the confirmed local folder and visible activity.
    instructions:
      - Reopen your local folder, check that the session shows that folder, and use **Interactive** mode with approvals on.
      - Ask for files by their exact path. The app applies repository instruction settings to repositories, not to a plain folder like this one, so attach your instructions file yourself and note that you did.
      - Start a new session after you change a rules file. Check the session activity to see whether a skill or file was used, rather than guessing from the answer.
coreClues:
  - id: open-the-case
    title: Write the brief
    durationMinutes: 6
    points: 10
    objectiveRef: Apply instructions, memory boundaries, context hierarchy, and strong prompts to long-running agentic work
    scene: Mergewell decides what success looks like before Riley writes any code.
    outcome: A short brief in `brief.md` that tells Copilot what to build, what it may change, what it must leave alone, which cases to get right, and when to stop. A clear brief is the difference between a focused change and a guess.
    routes:
      - harness: ide-extension
        instructions: ['Open `dispatch-lab.html` in your browser and create `brief.md` in Explorer. Use the check results in your browser, not a summary from chat.']
      - harness: copilot-cli
        instructions: ['Keep `copilot` running in your case folder. Create `brief.md` in a text editor, or ask Copilot to create it and approve only that file.']
      - harness: copilot-app
        instructions: ['Ask Copilot to create `brief.md` in your case folder, then open it and read it before you approve anything else.']
    actions:
      - Click **Agentic** in your browser and write down the three failing checks. You'll compare against these later.
      - 'Write this goal at the top of `brief.md`: "Goal: Return only the alerts at or above the minimum priority, in their original order. Priorities go low, then normal, then high. If the minimum isn''t one of those three, throw an error, even when the list is empty."'
      - 'Add these lines below it: "You may change: selectAlerts only. Don''t touch: the other functions or any of the checks. Proof the rules loaded: (fill this in during the next step). Cases to get right: an alert below the minimum is left out, and an unknown minimum throws an error. Stop if: you need a new dependency, a new file, network access, or a changed check."'
    verify: Your brief says what can change, what can't, which cases to get right, and when to stop, and you wrote down the failing checks before any code changed.
    evidence: 'Failing checks before: ___. May change / don''t touch: ___. Cases to get right: ___. Stop if: ___.'
    hints:
      - Right now selectAlerts returns every alert, so the filter checks fail.
      - The minimum has to be checked first, even when the list is empty.
      - Keep the brief short. You don't need a long specification.
    safetyCheckpoint: Don't let Copilot make the checks easier to pass.
  - id: write-the-brief
    title: Load one useful instruction
    durationMinutes: 7
    points: 10
    objectiveRef: Apply instructions, memory boundaries, context hierarchy, and strong prompts to long-running agentic work
    scene: Purrmission wants to know what Copilot actually received, not just what you saved.
    outcome: A short rules file for Copilot, and an honest note on whether it actually loaded and whether Copilot followed it. Those are two different questions, and you need the answer to both.
    routes:
      - harness: ide-extension
        instructions: ['Create `.github/copilot-instructions.md`, save it, and start a new chat. After Copilot replies, expand **References** to see whether the file was used.']
      - harness: copilot-cli
        instructions: ['Create `.github/copilot-instructions.md`, restart `copilot`, then type `/instructions` to see whether it loaded.']
      - harness: copilot-app
        instructions: ['Create the same file, start a new session, and attach the file yourself. Note that you attached it by hand, because the app won''t find it on its own in a plain folder.']
    actions:
      - 'Save these three rules in `.github/copilot-instructions.md`: "Only change what brief.md allows, and leave everything it protects alone. Never change a check to make it pass. Before editing, tell me which function you''ll change and one situation where you would stop."'
      - 'Attach `brief.md` and `dispatch-lab.html`, then type this into the Copilot chat: "Using brief.md, tell me which function you''re allowed to change and what you''d do first. Don''t make any changes yet."'
      - 'Check two things separately. First, is there proof the rules file was loaded, such as an entry under References? Second, did the answer follow the rules? Write what you found on the "Proof the rules loaded" line in `brief.md`.'
    verify: Your note says where you saved the rules, how you know they loaded (or that you attached them yourself, or that you couldn't tell), and whether Copilot followed them. The lab file hasn't changed.
    evidence: 'Saved at: ___. How I know it loaded: ___. Did Copilot follow it: ___. Couldn''t tell: ___.'
    hints:
      - Copilot following a rule once doesn't prove which file the rule came from.
      - If your tool doesn't show whether the file loaded, attach it yourself and say so.
      - You don't need `/init`, a Git repository, or global settings for this.
    safetyCheckpoint: Don't change your global instructions just for this practice exercise.
  - id: verify-the-evidence
    title: Make a reusable check skill
    durationMinutes: 7
    points: 10
    objectiveRef: Explain the different jobs of the developer, a software agent, a reusable skill, a custom agent, and a tool, including how skill frontmatter descriptions support relevance-based discovery without guaranteeing selection or invocation
    scene: Mergewell writes his review steps down once, so Copilot can follow them every time.
    outcome: A small review skill, plus a test of whether Copilot picks it up on its own when your request matches its description. A good description helps Copilot find a skill, but it doesn't guarantee Copilot will use it.
    routes:
      - harness: ide-extension
        instructions:
          - Create the folders and `SKILL.md` in Explorer and save.
          - To see whether the skill was used, expand the References or activity under Copilot's reply.
          - To call the skill yourself, pick `case-check` from the `/` menu in the chat box.
      - harness: copilot-cli
        instructions:
          - After saving, type `/skills reload`, then `/skills info case-check` to check that Copilot can see it.
          - Type the review request without `/` or the skill name, and watch the activity for the skill being used.
          - To call the skill yourself, type `/case-check`.
      - harness: copilot-app
        instructions:
          - Create the skill at the exact path, then start a new session.
          - Type the review request without naming the skill, and check the session activity for the skill being used.
          - If the app doesn't show this, call the skill with a slash command if one is offered, or attach `SKILL.md` and note that you did.
    actions:
      - 'Create `.github/skills/case-check/SKILL.md`. At the top, between two `---` lines, add `name: case-check` and `description: Review dispatch check output and diff. Use before accepting a filter change.`'
      - 'Below that, write the steps the skill follows: "Read the brief, the diff, and the browser check results you''re given. Point out any missing evidence or changes outside the brief. Never edit files, run code, or say tests ran unless you can see their output. Finish with accept, revise, or stop, and give a reason."'
      - 'Start a new chat and type this into the Copilot chat, without mentioning the skill: "Review the dispatch lab check output and diff before I accept this change. Tell me what evidence is missing. Don''t edit anything." The filter isn''t built yet, so a good review should say what''s missing rather than approve it.'
      - Look for signs that Copilot used `case-check`, using the steps for your tool above. Write yes, no, or can't tell. Don't decide it was used just because the answer was good.
      - If it wasn't used, call it yourself and run the request again. Note that you called it by hand.
    verify: The skill's name matches its folder, and its description says what it does and when to use it. The review points to a real failing check. Your note says whether Copilot picked the skill up on its own or you called it, and that your browser, not Copilot, ran the checks.
    evidence: 'Skill description: ___. Request I typed (no skill name): ___. Copilot used it on its own: yes / no / can''t tell. Called it myself: ___. Who ran the checks: ___.'
    hints:
      - A skill is a set of steps. It isn't a separate worker, and it can't enforce permissions.
      - Your browser runs the checks. Copilot only reviews the results you give it.
      - A clear description helps Copilot find the skill, but doesn't force it to use it. Write down only what you actually saw.
      - Typing `/case-check` shows the skill works when you call it. It doesn't show that Copilot would have picked it on its own.
      - You don't need the optional `allowed-tools` field. In Copilot CLI it pre-approves the tools you list; it doesn't block the others.
    safetyCheckpoint: Read the whole skill before you save it. It needs no scripts, packages, network access, or automatic approvals. Writing "never edit" in a skill doesn't stop edits; your tool's permission settings do.
  - id: close-the-handoff
    title: Implement and check the filter
    durationMinutes: 13
    points: 10
    objectiveRef: Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
    scene: Riley builds the filter from the brief. Mergewell checks what comes back.
    outcome: A working priority filter that passes the new checks and still passes the old ones, with only selectAlerts changed.
    routes:
      - harness: ide-extension
        instructions: ['Ask for a plan first. Once it matches the brief, switch to **Agent** to make the edit. Then compare the file with your backup.']
      - harness: copilot-cli
        instructions: ['Stay in the same conversation and read each approval request. The CLI won''t necessarily ask before every action.']
      - harness: copilot-app
        instructions: ['Review the plan, then allow the one function change in **Interactive** mode. Make sure the file you open in your browser is the one Copilot edited.']
    actions:
      - 'Type this into the Copilot chat: "Follow brief.md and update selectAlerts in dispatch-lab.html. Don''t change the list you''re given, and keep the alerts in their original order. Don''t edit the checks or any other function, install anything, or go online. If you can''t do it within those limits, stop and tell me."'
      - Save, reload your browser, and run **Agentic**, then **Foundations**. Read the actual PASS and FAIL lines.
      - If a check fails, guess one reason, change one thing, and run that group again. If time runs out, stop and leave it failing.
      - Compare the file with `dispatch-lab.agentic-backup.html`. Only selectAlerts should be different, and the checks should be exactly the same.
    verify: Agentic shows 4 PASS, Foundations shows 3 PASS, and only selectAlerts changed. If not, you've written down the exact failure.
    evidence: 'Before: ___. After: ___. Foundations still: ___. What changed in the file: ___. One fix I tried, or where I stopped: ___.'
    hints:
      - Give each priority a number (low 1, normal 2, high 3) and compare the numbers. You don't need to sort anything.
      - Check that the minimum is valid before filtering, even when the list is empty.
      - Copilot can't edit in your tool? Follow its plan, make the change yourself, and note that you did.
    safetyCheckpoint: Say no to any change to a check or any request for more permissions, even if everything else passes.
  - id: watch-the-loop
    title: Hand off evidence, not confidence
    durationMinutes: 7
    points: 10
    objectiveRef: Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
    scene: Purrmission won't accept a handoff that just says "done".
    outcome: A handoff note someone else could check, showing what changed, the proof it works, how to undo it, and what still hasn't been tested.
    routes:
      - harness: ide-extension
        instructions: ['Save `handoff.md`, then attach it and paste your browser results when you ask for the review.']
      - harness: copilot-cli
        instructions: ['Name `handoff.md` in your request, and paste in your browser results so the skill has real output to review.']
      - harness: copilot-app
        instructions: ['Attach `handoff.md` and paste in your browser results. Ask for a review only, not a new change.']
    actions:
      - Write `handoff.md` with the function you changed, the check results before and after, how you know the rules loaded, the name of your backup file, and your decision (accept, revise, or stop) with a reason.
      - 'Type this into the Copilot chat: "Use case-check to review handoff.md against the change and these browser results. What''s missing before someone could accept this?" Read the answer. The final decision is still yours.'
      - 'Add this line to `handoff.md`: "Checked locally only. CI, security scanning, a human code review, and deployment have not been done." Keep each module''s score on its own line in `case-notes.md`.'
    verify: Someone could check your handoff against the real results, it names your backup file, and it doesn't claim the change is approved for release.
    evidence: 'Decision and reason: ___. Backup file: ___. Still missing before release: ___.'
    hints:
      - Your backup is a local copy to go back to. It isn't a Git commit or a production rollback.
      - Copilot's review can't stand in for CI or security scan results you don't have.
      - Still stuck? Hand off the failure honestly instead of calling it done.
    safetyCheckpoint: Don't push or deploy practice files. Accepting the change here isn't permission to ship it.
bonusClues:
  - id: tighten-and-retry
    title: Improve one failed check
    durationMinutes: 3
    points: 10
    objectiveRef: Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
    scene: Mergewell keeps the failed attempt instead of erasing it.
    outcome: One guess about why a check failed, tested with a single small change.
    actions: ['Keep the failing output, change one thing in selectAlerts, and run that check group again. If nothing is failing, skip this bonus.']
    routes:
      - harness: ide-extension
        instructions: ['Use the diff to make sure your change stays inside selectAlerts.']
      - harness: copilot-cli
        instructions: ['Say what you think is wrong before you approve a fix.']
      - harness: copilot-app
        instructions: ['Look at the one proposed fix before you accept it.']
    verify: You saved the output from before and after, and your note says whether your guess was right.
    evidence: 'My guess: ___. Before and after: ___.'
    hints: ['Keep the test input the same.', 'Don''t change what a check expects.', 'Stopping with a check still failing is an honest result.']
    safetyCheckpoint: Keep the original failure. Don't overwrite it.
  - id: cross-harness-check
    title: Try a read-only reviewer role
    durationMinutes: 3
    points: 10
    objectiveRef: Explain the different jobs of the developer, a software agent, a reusable skill, a custom agent, and a tool, including how skill frontmatter descriptions support relevance-based discovery without guaranteeing selection or invocation
    scene: Purrmission keeps reviewing and editing as separate jobs.
    outcome: A review of your handoff by a reviewer that can't change files, or that you've told not to.
    actions: ['Use an existing read-only agent, or write a short review prompt that says not to change anything. Review your handoff with it. Don''t spend this time learning how to write a new agent file.']
    routes:
      - harness: ide-extension
        instructions: ['Pick a read-only agent if you have one. If not, use **Ask** mode and say "don''t edit anything".']
      - harness: copilot-cli
        instructions: ['Type `/agent` to see your agents. Use one only if you know it''s read-only; otherwise use a review prompt that says not to edit.']
      - harness: copilot-app
        instructions: ['Use the agent picker only if you know the agent is read-only. Otherwise ask for a review without any changes.']
    verify: No file changed, and the review points to one real piece of evidence or a missing check.
    evidence: 'Reviewer I used: ___. Blocked by a tool setting, or only told in the prompt: ___. What it found: ___.'
    hints: ['An agent is a role you reuse.', 'A skill gives it the steps to follow.', 'Telling a reviewer not to edit isn''t the same as taking away its ability to edit.']
    safetyCheckpoint: Don't give the reviewer write access to make the review easier.
  - id: control-room-observation
    title: Check the chosen control
    durationMinutes: 3
    points: 10
    objectiveRef: Choose a supported product control before an agentic task and verify afterward whether the result justified the AI credits used
    scene: Mergewell compares the model and settings he chose with what actually got done.
    outcome: An honest comparison of the model or permission setting you chose and what it actually got done. No made-up savings.
    actions: ['Look back at the model or permission setting you chose before the run, and at what actually got done and checked. Use only usage numbers you can already see. Don''t run anything again to get a number.']
    routes:
      - harness: ide-extension
        instructions: ['Check the model you used and any usage number you noted.']
      - harness: copilot-cli
        instructions: ['Type `/usage` for this session and compare it with what you chose before the run.']
      - harness: copilot-app
        instructions: ['Check the session''s model and any usage shown. Note anything you can''t see.']
    verify: Your note links a real setting to the result, and says clearly when cost information wasn't available.
    evidence: 'What I chose before the run: ___. What got done and checked: ___. Usage I could see, or not available: ___.'
    hints: ['Progress only counts once it''s been checked.', 'Token counts alone don''t prove you saved money.', 'With no earlier reading, you can''t claim a saving.']
    safetyCheckpoint: Don't run anything again just for this bonus.
  - id: platform-review-surfaces
    title: Choose the exact reviewed release
    durationMinutes: 3
    points: 10
    objectiveRef: Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
    scene: Purrmission notices that main has moved on since the test was approved.
    outcome: The right release decision for a made-up scenario. Nothing gets deployed.
    actions:
      - 'In this **made-up scenario**, the tested commit is `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`, main is now at `bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`, and the last rollback that was checked is `cccccccccccccccccccccccccccccccccccccccc`.'
      - Write which commit you'd release, which one you wouldn't swap in, and which rollback you'd still need to check automatically after deploying.
    routes:
      - harness: ide-extension
        instructions: ['Write the decision in `handoff.md`. Don''t open a real deployment.']
      - harness: copilot-cli
        instructions: ['Use only the scenario above. Don''t run git or release commands.']
      - harness: copilot-app
        instructions: ['Save the decision in your local folder. Don''t create a pull request or automation.']
    verify: You release the tested commit (a), don't swap in the newer main (b), and name c as the rollback to fall back to.
    evidence: 'Release: ___. Don''t swap in: ___. Rollback, and check it again: ___.'
    hints: ['Approval is for one exact commit.', 'Newest isn''t the same as reviewed.', 'A rollback needs checking too.']
    safetyCheckpoint: These commit IDs are made up. This isn't approval for a real release.
completionPoints: 40
bonusPointCap: 10
carryForward:
  artifact: Local developer case folder
  produces:
    - dispatch-lab.html with passing Foundations and Agentic checks, or the exact checks still failing
    - brief.md, handoff.md, your rules file, the case-check skill, and your backup
    - Separate Foundations, Agentic, and total scores in case-notes.md
  consumes:
    - Your Foundations lab, or this starter with the Foundations points not earned
  fallback: If anything is missing, the Advanced mission has a starter with the filter already done and a short review checklist.
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
