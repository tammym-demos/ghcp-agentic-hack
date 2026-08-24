---
schemaVersion: 1
kind: mission
id: context-and-prompts
title: 'Foundations Mission: Context, Cost & Control'
module: foundations
durationMinutes: 45
objectiveRefs:
  - Explain where GitHub Copilot lives across IDE, terminal, GitHub.com, cloud, and app surfaces and identify enterprise safety responsibilities
  - Apply VS Code chat references, inline completions, inline chat, and Ask/Plan/Agent modes to real engineering tasks
  - Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for cost-aware daily execution
  - Detect context rot and apply context window hygiene practices
  - Apply the autonomy spectrum and least-privilege delegation before escalating to agentic patterns
prerequisites: []
startingState: Participants have VS Code with GitHub Copilot, GitHub Copilot CLI, or the standalone GitHub Copilot app, and can create a folder on their own machine.
goal: Six short experiments. Pick a tool, build a small case folder, and practise the four things Foundations teaches — prompting, context, cost, and autonomy.
task: Complete the 6 experiments for up to 50 core points (40 completes the mission), attempt the bonus challenges for up to 10 more, then total your score and record your debrief.
constraints:
  - Do not use confidential, customer, or unrelated repository content.
  - Do not guess organization policy, product availability, or unsupported commands.
  - Do not grant repository-wide, network, destructive, or unrelated-file access to any Agent run.
  - Do not spend credits, install software, or broaden permissions merely to earn points.
evidence:
  - Answers to the 6 guided experiment questions (tool choice, vague versus specific prompts, what is and is not in context, the file you added, usage reading and model rule, autopilot versus interactive)
  - The `copilot-case-file` folder and your Foundations point total, carried into Agentic Development
safetyCheckpoints:
  - Purrmission checks the case folder location, context scoping, least-privilege permissions, credit awareness, and the undo path before any unattended run.
corePath:
  - 'Experiment 1 (5 pts): Pick one tool, then make the `copilot-case-file` folder and `case-notes.md`.'
  - 'Experiment 2 (10 pts): Send a vague prompt and a specific prompt, then compare the replies.'
  - 'Experiment 3 (10 pts): Find what is in the context right now, and what is not.'
  - 'Experiment 4 (5 pts): Add one file to the context on purpose and prove Copilot can see it.'
  - 'Experiment 5 (10 pts): Read your AI Credits, try a second model, and write one switching rule.'
  - 'Experiment 6 (10 pts): Run the same job step-by-step and unattended, then choose between them.'
stretchPath:
  - 'Bonus 1 (+10 pts) Model Showdown: compare a third model against the two you already ran.'
  - 'Bonus 2 (+10 pts) Try a Second Tool: run the same prompt in another tool, such as Copilot CLI or the Copilot app.'
  - 'Bonus points are capped at 10 even if you finish both bonus challenges.'
debrief:
  - Which tool did you pick, and what made the specific prompt work better than the vague one?
  - What was in the context that you did not expect, and what did you add on purpose?
  - What did the usage reading tell you, and what did it not prove?
  - When would you switch models, in your own words?
  - Which did you keep — step-by-step or unattended — and what would you never leave unattended?
  - What is your point total, and where is your case folder for Agentic Development?
validation:
  - You earn at least 40 core points, or write down the exact thing that blocked you.
  - You can explain your tool choice, your context decisions, your model rule, and your autonomy choice.
  - Every experiment stays inside the personal case folder, with least-privilege context and permissions.
  - You leave with a `copilot-case-file` folder and a point total to carry into Agentic Development.
casePacket:
  - '**What you need:** one Copilot tool — VS Code, Copilot CLI, or the Copilot app — and somewhere on your own machine to make a folder.'
  - 'No repository, no account setup, and nothing to install. You build a small case folder and keep it for the next two modules.'
  - '**Six experiments, in order.** They are worth 5, 10, 10, 5, 10, and 10 points — 50 in total. Every prompt is ready to copy and paste.'
harnesses:
  - id: ide-extension
    title: VS Code
    description: Run Copilot inside VS Code. Good if you already work in an editor.
    instructions:
      - '**Start a session:** open VS Code, then open Chat with `Ctrl+Alt+I` (`Cmd+Alt+I` on Mac). The `+` button starts a fresh chat.'
      - '**Make a file:** press `Ctrl+N` (`Cmd+N` on Mac) for a blank file, then `Ctrl+S` (`Cmd+S`) and type the name you want. File > New File does the same thing.'
      - '**Run code:** open the terminal at the bottom with `` Ctrl+` `` and run it there. The output appears in that panel.'
      - '**Tell Copilot what to look at:** select some lines and press `Ctrl+I` (`Cmd+I`) to ask about just those, or type `#file` or `#selection` in the chat box.'
      - '**Change mode or model:** the Ask / Plan / Agent buttons are at the top of the Chat panel. The model dropdown is at the bottom of the chat box.'
  - id: copilot-cli
    title: GitHub Copilot CLI
    description: Run Copilot in the terminal. Good if you are comfortable with a command line.
    instructions:
      - '**Start a session:** run `copilot` in your terminal. Exit and run it again whenever you want a clean slate with no history.'
      - '**Make a file:** `cd` into a new empty folder first.'
      - 'Then run `New-Item name.md` in PowerShell, or `touch name.md` on Mac or Linux. Or ask Copilot to create it.'
      - '**Run code:** run it in the same terminal. The output appears just above your next prompt.'
      - '**Tell Copilot what to look at:** name the file in your prompt. It works from whatever folder you are in, so start in an empty folder with nothing private in it.'
      - '**Where things show up:** the model name appears as it answers. Run `/usage` for your token totals.'
  - id: copilot-app
    title: GitHub Copilot app
    description: Run Copilot in its own app, with separate areas for chat, plans, files, and the terminal.
    instructions:
      - '**Start a session:** open the Copilot app and start a new session. Starting another new session is how you get a clean slate.'
      - '**Make a file:** open or create an empty folder first — the app works inside one.'
      - 'Then ask Copilot to create the file in it. Check the files area before you move on.'
      - '**Run code:** use the terminal area. The output appears there, not in the chat.'
      - '**Tell Copilot what to look at:** keep the folder small. Whatever is in it is what the app can see.'
      - '**Where things show up:** plans, file changes, and terminal output each have their own area. Read them before you accept anything.'
coreClues:
  - id: set-up-the-case
    title: 'Experiment 1: Pick Your Tool and Open the Case'
    points: 5
    objectiveRef: Explain where GitHub Copilot lives across IDE, terminal, GitHub.com, cloud, and app surfaces and identify enterprise safety responsibilities
    scene: Agent Mergewell opens a fresh case folder. Purrmission checks it sits somewhere harmless before a single note goes in.
    outcome: A folder called `copilot-case-file` with one file called `case-notes.md` inside it, open in the Copilot tool you picked.
    actions:
      - Pick one tool — VS Code, Copilot CLI, or the Copilot app. Stay with it for the whole mission.
      - Make a folder called `copilot-case-file` somewhere personal, such as your Documents or home folder.
      - Make a file inside it called `case-notes.md`.
      - 'Write two lines at the top: a name for your case, and today''s date. Save the file.'
    routes:
      - harness: ide-extension
        instructions:
          - 'Use File > Open Folder to open your new `copilot-case-file` folder.'
          - 'Press `Ctrl+N` (`Cmd+N` on Mac) for a blank file, then `Ctrl+S` (`Cmd+S`) and save it as `case-notes.md`.'
          - 'Open Chat with `Ctrl+Alt+I` (`Cmd+Alt+I`) so the folder is in view.'
      - harness: copilot-cli
        instructions:
          - '`cd` into your new `copilot-case-file` folder, then run `copilot`.'
          - 'Run `New-Item case-notes.md` in PowerShell, or `touch case-notes.md` on Mac or Linux.'
          - Or ask Copilot to create the file for you now that you are inside the folder.
      - harness: copilot-app
        instructions:
          - Open the app and open your new `copilot-case-file` folder as the working folder.
          - Start a new session, then ask Copilot to create `case-notes.md`.
          - Check the file appears in the files area before you move on.
    verify: You can see `case-notes.md` open in your tool, and it has two lines in it.
    evidence: 'Tool I chose: ___. My case folder is at: ___.'
    hints:
      - Any empty folder on your own machine works. It does not need to be a repository.
      - Two lines is enough. Something like `# Case notes` and today's date.
      - 'Not sure where your tool is looking? Ask Copilot: "I am using <your tool>. Which folder are you working in right now?"'
    safetyCheckpoint: 'Purrmission: build this folder somewhere personal. Not inside a work repository, and nowhere near customer data.'
  - id: first-prompts
    title: 'Experiment 2: Send Your First Two Prompts'
    points: 10
    objectiveRef: Apply VS Code chat references, inline completions, inline chat, and Ask/Plan/Agent modes to real engineering tasks
    scene: Mergewell asks a woolly question, gets a woolly answer, and then asks again properly. Purrmission keeps both prompts on practice material only.
    outcome: Two replies from Copilot saved into `case-notes.md` — one from a vague prompt, one from a specific prompt — plus a line saying which was more useful.
    actions:
      - 'Send a vague prompt, exactly as written: "help me with my notes."'
      - Copy the reply into `case-notes.md`.
      - Now send a specific prompt. Name the file, the goal, and the format you want back.
      - 'Copy this one: "In case-notes.md, add a three-item checklist for reviewing a pull request. Use a Markdown list."'
      - Copy that reply into `case-notes.md` too.
      - Write one line about which reply was more useful, and why.
    routes:
      - harness: ide-extension
        instructions:
          - Type the vague prompt into the Chat box and send it.
          - 'For the specific prompt, type `#` and pick `case-notes.md` so Copilot is looking at the right file.'
      - harness: copilot-cli
        instructions:
          - Type the vague prompt at the session prompt and send it.
          - For the specific prompt, name `case-notes.md` in the sentence so Copilot knows which file you mean.
      - harness: copilot-app
        instructions:
          - Send the vague prompt in the chat area.
          - For the specific prompt, name `case-notes.md` and check the files area afterwards to see what changed.
    verify: '`case-notes.md` holds both replies and your one-line comparison.'
    evidence: 'The specific prompt was better because: ___.'
    hints:
      - A vague prompt names no file and states no goal, so Copilot has to guess.
      - A specific prompt names three things — the file, the goal, and the format you want back.
      - 'Both replies look the same? Make the vague one even vaguer, and the specific one even more precise, then compare again.'
    safetyCheckpoint: 'Purrmission: keep both prompts about this practice file. Nothing from real work goes in here.'
  - id: see-the-context
    title: 'Experiment 3: Look at What Copilot Can See'
    points: 10
    objectiveRef: Detect context rot and apply context window hygiene practices
    scene: Mergewell assumes Copilot can see everything on his desk. Purrmission makes him check.
    outcome: A note in `case-notes.md` recording one thing that is in the context right now, and one thing that is not.
    actions:
      - Find where your tool shows what it is currently using — the references list, the context area, or the equivalent.
      - Write down what is in there right now.
      - Ask Copilot about something you have never mentioned, such as a file that does not exist in your folder.
      - Write down what it says when it does not have the information.
    routes:
      - harness: ide-extension
        instructions:
          - 'Look at the Add Context area just above the Chat box. It lists what is attached.'
          - Send a question about a file you never created and read how it responds.
      - harness: copilot-cli
        instructions:
          - Read the referenced files the CLI lists in its replies. That is what it used.
          - Ask about a file you never created and read how it responds.
      - harness: copilot-app
        instructions:
          - Check the files area. Whatever is in the working folder is what the app can see.
          - Ask about a file you never created and read how it responds.
    verify: Your note names at least one thing that is in context and one thing that is not.
    evidence: 'In context: ___. Not in context: ___.'
    hints:
      - The context indicator is usually right above or below where you type.
      - 'You can ask Copilot directly: "What files can you see right now?"'
      - A tool that guesses at a file it cannot see is telling you something useful. Write that down.
    safetyCheckpoint: 'Purrmission: if anything is in the context that you did not expect, take it out before you carry on.'
  - id: add-to-context
    title: 'Experiment 4: Add One Thing to the Context'
    points: 5
    objectiveRef: Detect context rot and apply context window hygiene practices
    scene: Mergewell hands Purrmission exactly one new file. Not the whole filing cabinet.
    outcome: A second file added to the context on purpose, and an answer that proves Copilot can now see it.
    actions:
      - Make a second small file in your folder called `team-rules.md`.
      - 'Put one unusual rule in it, such as: "All case notes must end with the word PURRMISSION."'
      - Add that file to the context yourself.
      - Ask Copilot a question that can only be answered from that new file.
    routes:
      - harness: ide-extension
        instructions:
          - 'Use the Add Context button, or type `#` and pick `team-rules.md`.'
          - 'Ask: "What is the team rule for case notes?"'
      - harness: copilot-cli
        instructions:
          - Name `team-rules.md` directly in your message.
          - 'Ask: "Read team-rules.md. What is the team rule for case notes?"'
      - harness: copilot-app
        instructions:
          - Confirm `team-rules.md` shows in the files area.
          - 'Ask: "What is the team rule for case notes?"'
    verify: Copilot's answer contains the unusual rule, which only exists in the new file.
    evidence: 'I added ___ to the context. Copilot then knew: ___.'
    hints:
      - Put a distinctive word in the file so a correct answer is unmistakable.
      - Add the one file, not the whole folder. Smallest thing that does the job.
      - 'Copilot still does not know it? Start a fresh chat and add the file again.'
    safetyCheckpoint: 'Purrmission: add one file at a time. Attaching a whole folder hands over far more than the task needs.'
  - id: credits-and-model
    title: 'Experiment 5: Check Your Credits and Pick a Model'
    points: 10
    objectiveRef: Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for cost-aware daily execution
    scene: Mergewell wants the most powerful model for everything. Purrmission points at the meter.
    outcome: Your current AI Credits (AIC) reading written down, two models tried on the same prompt, and one rule for when you would switch.
    actions:
      - Find where your usage shows — the gauge in your tool, or your GitHub account settings.
      - Write the reading into `case-notes.md`.
      - Switch models and resend the specific prompt from Experiment 2.
      - 'Write one sentence: when would you use the cheaper model, and when the stronger one?'
    routes:
      - harness: ide-extension
        instructions:
          - The model dropdown is at the bottom of the Chat box. Usage signals appear near it.
          - Change the model there and resend the prompt.
      - harness: copilot-cli
        instructions:
          - 'Run `/usage` to see your token totals, then `/model` to switch.'
          - The model name appears as it answers.
      - harness: copilot-app
        instructions:
          - Change the model in the session header dropdown.
          - Resend the prompt and compare the two answers side by side.
    verify: Your note has a usage reading, two model names, and one sentence beginning "I would use the stronger model when".
    evidence: 'Usage reading: ___. I would use the stronger model when: ___.'
    hints:
      - Usage is normally shown close to the model picker.
      - 'Account-level usage lives in your GitHub settings, under Copilot.'
      - Cheaper models suit quick edits and rewording. Stronger models suit tricky logic and long files.
      - 'No usage number visible anywhere? Record that as your finding and claim the points — not every plan shows one.'
    safetyCheckpoint: 'Purrmission: you are reading numbers here, not buying anything. Never upgrade a plan just to finish a step.'
  - id: autopilot-or-not
    title: 'Experiment 6: Choose Autopilot or Interactive'
    points: 10
    objectiveRef: Apply the autonomy spectrum and least-privilege delegation before escalating to agentic patterns
    scene: Mergewell reaches for full autopilot. Purrmission holds back one key and asks what he would do if it went wrong.
    outcome: The same small job run two ways — once approving each step, once letting Copilot act on its own — and your written choice between them.
    actions:
      - 'Pick one small job, such as: "Tidy the headings in case-notes.md so they are consistent."'
      - Run it in the mode where you approve each change. Note what you saw.
      - Undo the change.
      - Run the same job again in the mode that acts on its own. Note what you saw.
      - Write down which mode you would keep for this job, and one thing you would never leave unattended.
    routes:
      - harness: ide-extension
        instructions:
          - 'Use Ask or Plan for the step-by-step run, then Agent for the on-its-own run. The selector is at the top of the Chat pane.'
          - Agent edits arrive as a diff. Read it before you accept.
      - harness: copilot-cli
        instructions:
          - Press `Shift+Tab` to cycle modes. Use interactive for the step-by-step run and approve each action.
          - Press `Shift+Tab` again to reach autopilot for the second run, then watch what it does.
      - harness: copilot-app
        instructions:
          - Use the plan area to review steps before allowing edits on the first run.
          - On the second run, let it work and then read the files area to see everything that changed.
          - 'To undo between runs, reject the change in the files area, or ask Copilot to put the file back.'
    verify: You have notes from both runs and a written choice with a reason.
    evidence: 'I would use ___ mode for this because ___. I would never leave ___ unattended.'
    hints:
      - Use the same job both times, or there is nothing to compare.
      - 'Undo between runs so the second run starts from the same place. `Ctrl+Z` works, or ask Copilot to put it back.'
      - Anything that deletes files, force-pushes, or reaches outside your folder stays supervised.
    safetyCheckpoint: 'Purrmission: before the unattended run, check that only your case folder is open. Never run unattended anywhere near real work, and know how to undo it first.'
bonusClues:
  - id: model-showdown
    title: 'Bonus 1: Model Showdown and Tradeoffs'
    points: 10
    objectiveRef: Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for cost-aware daily execution
    scene: Mergewell lines up a third contender against the two models he already ran.
    outcome: A three-way model comparison and a verdict on whether your Experiment 5 routing rule survived.
    actions:
      - Pick a third model from your picker — ideally a different provider or a different size class from the two you compared in Experiment 5.
      - Resend the specific prompt from Experiment 2.
      - 'Compare all three on four axes: speed, code quality, explanation depth, and any visible cost signal.'
      - Decide whether your Experiment 5 routing rule still holds, or revise it.
    routes:
      - harness: ide-extension
        instructions:
          - Change the model in the picker at the bottom of the chat box, then resend the prompt.
      - harness: copilot-cli
        instructions:
          - Switch models with `/model` or the command your session banner lists, then resend the prompt.
      - harness: copilot-app
        instructions:
          - Change the model in the session header dropdown, then resend the prompt.
    verify: Three named models answered the same prompt and you can point to a difference between them.
    evidence: 'Third model: ___. Notable difference: ___. Routing rule survived? ___.'
    hints:
      - Different model families have real personality differences — some are terse and idiomatic, others explain more and plan better. Judge by task fit, not by a universal ranking.
      - Try Auto as one of your contenders to see what it selects for this task.
      - 'Only one model in your picker? Ask Copilot: "I am using <your tool>. Which models can I select here?" and record what you find.'
    safetyCheckpoint: Stick to models approved for your organization tenant.
  - id: cross-harness
    title: 'Bonus 2: Try a Second Tool (CLI or app)'
    points: 10
    objectiveRef: Explain where GitHub Copilot lives across IDE, terminal, GitHub.com, cloud, and app surfaces and identify enterprise safety responsibilities
    scene: Mergewell steps out of the IDE and runs the same task from the terminal or the Copilot app.
    outcome: The same Experiment 2 prompt answered in a second tool, with one concrete difference you noticed.
    actions:
      - Open a second tool — one you did not use for the main experiments.
      - Run the specific prompt from Experiment 2 there.
      - Notice where context comes from, how actions are approved, and what that surface is best at.
    routes:
      - harness: ide-extension
        instructions:
          - If VS Code was your main tool, switch to the CLI or the app for this bonus.
          - Otherwise open VS Code, open the Chat pane with `Ctrl+Alt+I` / `Cmd+Alt+I`, and send the prompt.
      - harness: copilot-cli
        instructions:
          - If the CLI was your main tool, switch to VS Code or the app for this bonus.
          - 'Otherwise open a terminal, `cd` to a scratch folder, run `copilot`, and send the prompt.'
      - harness: copilot-app
        instructions:
          - If the app was your main tool, switch to VS Code or the CLI for this bonus.
          - Otherwise launch the app, start a new session, and send the prompt.
    verify: You ran the same prompt in a different tool from the one you used for the main experiments.
    evidence: 'Second tool: ___. One thing it did better: ___.'
    hints:
      - The CLI is fast for shell and scripting work; the app gives dedicated space for plans and diffs; the IDE has the richest file context.
      - 'Second tool not installed, and you cannot install it? Record that as your finding and claim the points — availability is a real enterprise constraint.'
    safetyCheckpoint: Do not download unapproved tools on managed corporate devices.
completionPoints: 40
bonusPointCap: 10
carryForward:
  artifact: Foundations Experiment Findings
  produces:
    - The Copilot tool you chose
    - The path to your `copilot-case-file` folder and `case-notes.md`
    - Vague versus specific prompt comparison
    - What was and was not in the context, and the one file you added on purpose
    - Usage reading, two models tried, and one switching rule
    - Your step-by-step versus unattended choice, and the one thing you would never leave unattended
    - Foundations point total (core and bonus) for cumulative scoring
  consumes: []
  fallback: A facilitator starter summary supplies a tool choice, a ready-made case folder layout, and a point total so anyone can enter Agentic Development directly.
leaderboard:
  optional: true
  aliasOnly: true
  instructions:
    - Scoring is tracked locally on your honor unless you choose to share your score on the event leaderboard.
    - Submit using a participant-selected alias and self-reported total only.
    - The leaderboard is completely optional and never required to complete the workshop.
    - No speed score or time-based tie-breakers apply.
  submission:
    moduleOption: Foundations
    steps:
      - Finish the experiments and calculate your core points (up to 50) and bonus points (up to 10). 40 core points completes the module.
      - Open the leaderboard submission form and select `Foundations`.
      - 'Choose a made-up alias rather than your real name. Your alias and score are published on the shared workshop board, so avoid your real name, work username, email, employer, or customer names.'
      - Save that alias in the alias box on this page so every module page shows the same one, then copy it.
      - 'Enter your event id, chosen alias, core points in 5-point steps from 0 to 50, and bonus points (0 or 10).'
      - Reuse this same alias for the Agentic and Advanced modules so your three scores add up into one standing.
      - Submit your issue to see your alias on the live board.
status: draft
---

# Foundations Mission: Context, Cost & Control

### 🎯 MISSION

## Mission goal

Six short experiments. You pick a tool, build a small case folder, and practise
the four things Foundations teaches: prompting, context, cost, and autonomy.

No repository. No setup. Every prompt is copy-paste ready. Work in VS Code,
GitHub Copilot CLI, or the Copilot app.

## Scoring

| Experiment | Points |
|---|---:|
| 1 — Pick your tool and open the case | 5 |
| 2 — Send your first two prompts | 10 |
| 3 — Look at what Copilot can see | 10 |
| 4 — Add one thing to the context | 5 |
| 5 — Check your credits and pick a model | 10 |
| 6 — Choose autopilot or interactive | 10 |
| **Core total** | **50** |
| Bonus 1 or 2 (capped at 10) | 10 |

- **40 core points completes the module.** You do not need a perfect run.
- **Hints are always free.** Ask for help as often as you like.
- Scoring is on your honour. There is no speed bonus. The leaderboard is
  optional and uses an alias you choose.

## Timing guide

- **0-5 minutes:** Experiment 1 — pick your tool, make the folder and file.
- **5-13 minutes:** Experiment 2 — send a vague prompt, then a specific one.
- **13-21 minutes:** Experiment 3 — look at what is in the context.
- **21-26 minutes:** Experiment 4 — add one file on purpose.
- **26-35 minutes:** Experiment 5 — read your credits, try a second model.
- **35-43 minutes:** Experiment 6 — run the same job two ways.
- **43-45 minutes:** total your score and post it if you want to.

**Finished early?** Go straight to the bonus challenges — a third model in
Bonus 1, or a second tool in Bonus 2.

**Running short?** Experiments 1, 2, and 6 are the ones Agentic builds on.

## Five terms you will use

- **Tool** (sometimes called a harness) — where you run Copilot: VS Code, the
  CLI, or the Copilot app. Each shows context and controls differently.
- **Context window** — everything the model can see right now: your prompt, the
  conversation, and any attached files. It has a limit.
- **Context rot** — what happens when that window fills with stale or
  irrelevant material and answers start to drift.
- **Autonomy** — how much you let Copilot do before you check. Ask explains,
  Plan designs, Agent acts on your files. Go only as high as the task needs.
- **AI Credits (AIC)** — the usage currency behind premium model requests.
  Different models use them at different rates.

## Accessibility and fallback

Pair with a facilitator or a partner at any point.

If your tool shows no token or credit counters, record `no counters shown` in
Experiment 5 and claim the full 10 points. Not every plan exposes a gauge.

If you cannot create files, ask Copilot to create them for you and read the
result. Reading counts.

## What you carry into Agentic Development

Keep your `copilot-case-file` folder. The next module opens it again and builds
on it.

Before you finish, write down which tool you used, your AI Credits reading, your
autopilot-or-interactive choice, and your point total.
