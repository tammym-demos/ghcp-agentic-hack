---
schemaVersion: 1
kind: mission
id: agent-task
title: 'Your Mission: Hand Off Work with Confidence'
module: agentic
durationMinutes: 45
objectiveRefs:
  - Apply instructions, memory boundaries, context hierarchy, and strong prompts to long-running agentic work
  - Explain the different jobs of the developer, a software agent, a reusable skill, a custom agent, and a tool
  - Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
  - Choose a supported product control before an agentic task and verify afterward whether the result justified the AI credits used
prerequisites: []
startingState: You have picked a Copilot tool, and you have either your Foundations case folder open or the starter case copied from this page.
goal: Build four things in your case folder — a repository instruction, a custom agent, a skill, and a rule scoped to one file type — then watch an agent loop run.
task: Using the tool you chose, build the four customisation files in your case folder, then give your agent a multi-step job and decide when to step in.
constraints:
  - Build only inside your own `copilot-case-file` folder. Nothing here needs a work repository.
  - Use one Copilot tool for the main run. Looking at the result in a second tool is optional bonus work.
  - Read every instruction, agent, and skill file before you save it. You are writing the rules Copilot will follow.
  - Hints never reduce points, and there is no speed scoring.
evidence:
  - An updated Agent Mergewell case file with separate Foundations, Agentic, and cumulative totals
  - The four files you built — repository instruction, custom agent, skill, and file-type instruction
  - The visible proof for each one, such as a changed answer, a name in the picker, or a rule that applied to only one file type
  - Your loop notes, showing what the agent planned, what it did, and where you would step in
safetyCheckpoints:
  - Purrmission verifies the case folder is personal, and that no work repository or customer data is in scope.
  - Purrmission checks every agent and skill file for a narrow job and a written boundary before it is saved.
  - Purrmission pauses any request for unrelated files, package installs, network access, or destructive commands until the human narrows or stops the work.
corePath:
  - 'Operation Open the Case (10 pts): write `.github/copilot-instructions.md` and see an answer change.'
  - 'Operation Write the Brief (10 pts): create a custom agent at `.github/agents/case-writer.agent.md` and run it.'
  - 'Operation Verify the Evidence (10 pts): give that agent a skill at `.github/skills/case-summary/SKILL.md`.'
  - 'Operation Close the Handoff (10 pts): write an `applyTo` instruction that reaches Markdown files only.'
  - 'Operation Watch the Loop (10 pts): give the agent a multi-step job, read the plan, and decide when to step in.'
stretchPath:
  - Earn up to one capped bonus by tightening a brief after a drift signal, looking at the same evidence in a second tool, or capturing a better usage or control observation without widening scope.
debrief:
  - Which of the four files changed Copilot's behaviour the most, and how could you tell?
  - What is the difference between your agent and your skill, in your own words?
  - What did your `applyTo` pattern deliberately leave out?
  - What made you decide to step in, or to let the loop finish?
  - What should the Advanced mission inherit from this case besides the score total?
validation:
  - You earn at least 40 core points, or write down the exact thing that blocked you.
  - The four customisation files exist in the case folder and each has visible proof that it worked.
  - Every completed clue includes evidence, a Purrmission checkpoint, and an explicit human decision or stop note.
  - The exported case file preserves separate Foundations, Agentic, and cumulative totals for Advanced.
casePacket:
  - '**Coming from Foundations?** Open your `copilot-case-file` folder in your tool. You already have `case-notes.md` and `team-rules.md` in it. You can skip the rest of this section.'
  - '**Starting here?** Make a folder called `copilot-case-file` somewhere personal. Save the file below inside it as `case-notes.md`. Nothing to install and no repository needed.'
  - '**What you are building.** Five things, in order, that turn a plain folder into one Copilot runs the way your team wants.'
  - 'A repository instruction, so you stop repeating yourself.'
  - 'A custom agent, so one specialist does one job.'
  - 'A skill, so that job is done the same way every time.'
  - 'An instruction for one file type, so a rule stays where it belongs.'
  - 'One agent run with several steps, so you can watch the loop and decide when to step in.'
  - '**How to check:** every exercise ends with something you can see for yourself — a changed answer, a name in a picker, a heading in the output, or a rule that applies to one file and not another.'
starterFile:
  name: case-notes.md
  content: |-
    # Case notes — starter case

    Date: fill in today's date

    ## Tool I am using

    Fill in one: VS Code, Copilot CLI, or the Copilot app.

    ## What I learned in Foundations

    - A vague prompt makes Copilot guess. A specific prompt names the file, the
      goal, and the shape of the answer I want back.
    - Copilot can only use what is in its context. I can see what is in there,
      and I can add to it on purpose.
    - Models differ in cost and strength. I switch to a stronger model when the
      job needs careful reasoning over a long file.
    - Step-by-step approval is right when I am unsure. Unattended is right only
      when I know how to undo it.

    ## Scores

    - Foundations: 0 (starter case — not earned)
    - Agentic: 0
    - Cumulative: 0

    ## Notes for this module

    Add your notes below as you work.
harnesses:
  - id: copilot-cli
    title: GitHub Copilot CLI
    description: Run Copilot in the terminal. Good if you are comfortable with a command line.
    instructions:
      - '**Start a session:** open PowerShell, `cd` into your `copilot-case-file` folder, and run `copilot`. To start over, press `Ctrl+C` (or type `/exit`) and run `copilot` again.'
      - '**Make folders and files:** run `New-Item -ItemType Directory .github`, then `New-Item -ItemType File .github/copilot-instructions.md`.'
      - 'Or just ask Copilot to create them for you in this folder.'
      - '**Pick up new customisation:** after saving a skill, run `/skills reload`. After saving a new agent or instruction file, exit and run `copilot` again.'
      - '**Choose an agent:** run `/agent` and pick the one you built.'
      - '**Where things show up:** commands and file changes appear in the terminal as it goes. It asks before it does anything, and files are saved once you say yes.'
  - id: ide-extension
    title: VS Code
    description: Run Copilot inside VS Code. Good if you already work in an editor.
    instructions:
      - '**Start a session:** open VS Code, choose File > Open Folder and pick your `copilot-case-file` folder, then open Chat with `Ctrl+Alt+I` (`Cmd+Alt+I` on Mac). Press `+` to start a fresh chat.'
      - '**Make folders and files:** right-click in the Explorer panel and choose New Folder or New File. Save with `Ctrl+S` (`Cmd+S` on Mac).'
      - '**Find hidden folders:** `.github` may be hidden. If you cannot see it, ask Copilot to create the file for you by full path.'
      - '**Choose an agent:** use the agent picker at the top of the Chat pane. Reload the window if a new agent does not appear.'
      - '**Where things show up:** changes appear as a diff you approve or reject. Command output appears in the terminal at the bottom.'
  - id: copilot-app
    title: GitHub Copilot app
    description: Run Copilot in its own app, with separate areas for chat, plans, files, and the terminal.
    instructions:
      - '**Start a session:** open the app, open your `copilot-case-file` folder, and start a new session. Start another new session whenever you want a clean slate.'
      - '**Make folders and files:** open your folder first — the app works inside one.'
      - 'Then ask Copilot to create each file by full path, such as `.github/agents/case-writer.agent.md`. Check the files area.'
      - '**Choose an agent:** use the agent picker, or type `/agent`, and select the one you built.'
      - '**Keep it tidy:** keep the folder small and name your files in your prompts, so the app does not guess.'
      - '**Where things show up:** plans, file changes, and terminal output each have their own area. Look at them before you carry on. Terminal output does not appear in the chat.'
coreClues:
  - id: open-the-case
    title: Operation Open the Case
    points: 10
    objectiveRef: Apply instructions, memory boundaries, context hierarchy, and strong prompts to long-running agentic work
    scene: Agent Mergewell keeps repeating the same standing orders every morning. Purrmission suggests writing them down once.
    outcome: Repository instructions that visibly change how Copilot answers you — generated with `/init`, then sharpened by you.
    actions:
      - Open your `copilot-case-file` folder from Foundations, or make it now from the starter case below.
      - 'Run `/init`. Copilot reads your folder and writes the instructions file for you.'
      - Read what it wrote. This is a draft, not a rule book.
      - 'Add one rule of your own that you cannot miss, such as: "Always answer in a numbered list."'
      - Save it, start a fresh chat, and ask Copilot any question about your notes.
    routes:
      - harness: ide-extension
        instructions:
          - 'Type `/init` in Chat. It creates `.github/copilot-instructions.md`.'
          - 'Open that file, add your rule, save with `Ctrl+S` (`Cmd+S`), then press `+` in Chat for a fresh session.'
      - harness: copilot-cli
        instructions:
          - 'Run `copilot` inside your case folder, then type `/init`. You can also run `copilot init` from the shell.'
          - Open the file it wrote, add your rule, then exit and run `copilot` again.
      - harness: copilot-app
        instructions:
          - 'The app reads instructions from its settings, not from a file in your folder. Use settings for this step.'
          - 'Open Settings, find your folder under Projects, and write your rules there. Then start a new session.'
          - '`/init` needs a Git repository. If your folder is one, run it first and paste what it wrote into settings.'
    verify: Copilot's answer obeys the rule you added yourself.
    evidence: 'The rule I added was: ___. Copilot''s answer changed by: ___.'
    hints:
      - Make your rule impossible to miss, so you can tell instantly whether it was applied.
      - Start a fresh chat after saving. An old session may keep the old behaviour.
      - 'No `/init` in your tool? Write `.github/copilot-instructions.md` by hand. Three rules is plenty.'
    safetyCheckpoint: 'Purrmission: read every line `/init` wrote before you keep it. Generated rules are a draft. Never put a secret, key, or customer name in one.'
  - id: write-the-brief
    title: Operation Write the Brief
    points: 10
    objectiveRef: Explain the different jobs of the developer, a software agent, a reusable skill, a custom agent, and a tool
    scene: Mergewell wants a specialist who only writes case notes, and nothing else. Purrmission approves of the narrow job description.
    outcome: A custom agent at `.github/agents/case-writer.agent.md` that you can pick and run.
    actions:
      - Make a folder called `agents` inside `.github`.
      - Make a file in there called `case-writer.agent.md`.
      - 'Give it frontmatter at the top with a `name` and a `description`, between two lines of `---`.'
      - Below that, write its job in a few plain sentences — it writes tidy case notes and nothing else.
      - Save it, pick it in your tool, and give it one small job.
    routes:
      - harness: ide-extension
        instructions:
          - Create the file, then open the agent picker at the top of the Chat pane and select `case-writer`.
          - 'Faster route: type `/create-agent` in Chat and describe the job. Copilot writes the file for you.'
          - If it does not appear, save the file and reload the window.
      - harness: copilot-cli
        instructions:
          - Create the file, then run `/agent` and choose `case-writer`.
          - 'Faster route: run `/agent`, pick **Create new agent**, and choose Project so it lands in `.github/agents/`.'
          - Restart `copilot` if the new agent is not listed yet.
      - harness: copilot-app
        instructions:
          - Create the file in the working folder, then choose the agent from the agent picker or with `/agent`.
          - Check the picker shows the description you wrote.
    verify: Your agent appears in the picker, and its reply sounds like the job you wrote for it.
    evidence: 'My agent is called: ___. Its one job is: ___.'
    hints:
      - A custom agent is just a Markdown file with a small block of frontmatter at the top.
      - 'It needs at least `name` and `description`. The body underneath is the instructions it follows.'
      - Give it a narrow job. A broad agent is much harder to review later.
    safetyCheckpoint: 'Purrmission: write down what this agent may not do, as plainly as what it may do.'
  - id: verify-the-evidence
    title: Operation Verify the Evidence
    points: 10
    objectiveRef: Explain the different jobs of the developer, a software agent, a reusable skill, a custom agent, and a tool
    scene: Mergewell explains his summarising method for the fifth time. Purrmission tells him to write the recipe down and hand it over.
    outcome: A skill at `.github/skills/case-summary/SKILL.md` that your agent uses to do one repeatable thing the same way every time.
    actions:
      - 'Make the folders: `.github/skills/case-summary`.'
      - Make `SKILL.md` inside it.
      - 'Give it frontmatter with a `name` and a `description` saying exactly when to use it.'
      - 'Below that, write the numbered steps to follow. Include one distinctive heading, such as `## Case summary`, so you can spot it in the output.'
      - Ask your `case-writer` agent for a case summary and watch for those steps.
    routes:
      - harness: ide-extension
        instructions:
          - Create the folders and file in the Explorer, then save.
          - 'Select `case-writer` in the Chat pane and ask: "Summarise case-notes.md."'
      - harness: copilot-cli
        instructions:
          - Create the folders and file, then run `/skills reload` so the skill is picked up without restarting.
          - 'Run `/agent`, choose `case-writer`, and ask for a summary of `case-notes.md`.'
      - harness: copilot-app
        instructions:
          - Create the folders and file in the working folder.
          - Choose your agent and ask for a case summary, then read the reply for your distinctive heading.
    verify: The reply follows the steps in your skill and shows your distinctive heading, rather than giving generic advice.
    evidence: 'My skill does: ___. I knew it ran because: ___.'
    hints:
      - An agent is *who* does the work. A skill is *how* a particular job gets done.
      - 'The `description` is what tells Copilot when to reach for the skill, so make it specific about the situation.'
      - 'Skill not firing? Say the skill name directly in your request, then make the description more specific.'
    safetyCheckpoint: 'Purrmission: a skill is a recipe you are handing over. Read every step before you save it.'
  - id: close-the-handoff
    title: Operation Close the Handoff
    points: 10
    objectiveRef: Apply instructions, memory boundaries, context hierarchy, and strong prompts to long-running agentic work
    scene: Mergewell writes a rule for Markdown files and accidentally applies it to everything. Purrmission narrows the net.
    outcome: A file-type instruction you built at `.github/instructions/markdown.instructions.md`, tested on two different file types so you can see the edge.
    actions:
      - Make a folder called `instructions` inside `.github`.
      - Make a file in there called `markdown.instructions.md`.
      - 'In its frontmatter set `applyTo` so it matches Markdown files only. `applyTo: "**/*.md"` does this.'
      - 'Below that, write one clear rule for Markdown, such as: "Every heading must be sentence case."'
      - Ask Copilot to edit a Markdown file and watch the rule apply. Then make a `notes.txt` and ask for a similar edit, and watch that it does not.
    routes:
      - harness: ide-extension
        instructions:
          - Create the file and save it.
          - 'Or type `/create-instruction` in Chat and describe the rule. Copilot writes the file and picks the `applyTo` pattern.'
          - 'Open `case-notes.md`, ask for an edit, then open `notes.txt` and ask for the same kind of edit. Compare.'
      - harness: copilot-cli
        instructions:
          - Create the file, then exit and run `copilot` again so the instruction is picked up.
          - Ask for an edit naming `case-notes.md`, then ask again naming `notes.txt`.
      - harness: copilot-app
        instructions:
          - 'Create `.github/instructions/markdown.instructions.md` with the `applyTo` pattern, the same as everyone else. It is a real file your folder keeps.'
          - 'The app does not read `applyTo` files, so also write the scope in words. In Settings, under Projects, add: "Sentence-case headings. This rule is for Markdown files only."'
          - Ask for an edit on `case-notes.md`, then on `notes.txt`, and read both results in the files area.
          - Note whether your written scope held. A rule in words is weaker than a pattern.
    verify: You tried the same edit on both file types, and your notes say whether the rule held on each.
    evidence: 'My scope was: ___. It applied to ___ and not to ___.'
    hints:
      - '`applyTo` is a glob — a pattern for matching filenames, much like a search.'
      - '`**/*.md` means every Markdown file in every folder. `**/*` would match everything, which is not a scoped rule.'
      - Make the rule very visible, so you can see at a glance whether it was applied.
    safetyCheckpoint: 'Purrmission: check the scope really is narrow. A rule that reaches every file is not a scoped rule, it is a global one in disguise.'
  - id: watch-the-loop
    title: Operation Watch the Loop
    points: 10
    objectiveRef: Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
    scene: Mergewell hands over a multi-step job and looks away. Purrmission does not look away.
    outcome: A written record of your agent running a job with several steps — what it planned, what it actually did, and where you could have stepped in.
    actions:
      - 'Give `case-writer` a job with several steps. For example: "Read case-notes.md, summarise it using the case-summary skill, and add the summary at the bottom."'
      - Read the plan before you approve anything.
      - Watch each step as it happens. Note anything it reaches for that you did not name.
      - Let it finish, or stop it. Both are valid results.
      - Write down what it planned, what it actually did, and one place you could have stepped in.
    routes:
      - harness: ide-extension
        instructions:
          - Run the job with your agent selected. Read the proposed plan, then approve steps one at a time.
          - Each file edit arrives as a diff. Read it before you accept.
      - harness: copilot-cli
        instructions:
          - The CLI asks you to approve each action. Read every proposed command or file write before approving.
          - 'Press `Ctrl+C` to stop the run if it heads somewhere you did not intend.'
      - harness: copilot-app
        instructions:
          - Read the plan area before allowing any file changes.
          - Watch the files area as steps complete, and stop the session if it drifts.
    verify: Your notes show a plan, at least two completed steps, and your decision at the end.
    evidence: 'It planned: ___. It actually did: ___. I would step in at: ___.'
    hints:
      - A job with several steps forces it to plan. A one-step job will not show you a loop.
      - Watch for it opening files you never mentioned. That is the most common early drift signal.
      - 'Stopping is a result, not a failure. If you stop it, write down exactly what made you stop.'
    safetyCheckpoint: 'Purrmission: if it asks for access it does not need, stop it and write down what it asked for. Know how to undo the change before you approve it.'
bonusClues:
  - id: tighten-and-retry
    title: Operation Tighten and Retry
    points: 10
    objectiveRef: Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
    scene: 'Your situation: The first attempt went wrong somewhere. You can fix your instructions and try again — without pretending the first attempt never happened.'
    outcome: A second attempt with one line changed, and a note saying whether it came out better.
    actions:
      - Work out where it went wrong. Was your instruction unclear, or did Copilot drift off?
      - Change only the one part that caused it. Leave the rest alone.
      - Run it again.
      - 'Compare the two results and write: `First try: ___. Second try: ___.`'
    routes:
      - harness: copilot-cli
        instructions:
          - Tell Copilot exactly what went wrong, give it your one corrected line, and ask it to try again in the same file only.
          - Scroll up in the terminal to compare — the first attempt is still there.
      - harness: ide-extension
        instructions:
          - In the Chat pane, point at the same file and send your corrected instruction as the next message.
          - Use the editor diff or Source Control view to compare the second attempt with the first.
      - harness: copilot-app
        instructions:
          - In the same session, point at what went wrong in the plan or diff canvas and give it the corrected line.
          - Compare the new diff canvas with the first one before you decide if it improved.
    verify: You can still see both attempts, and you can name one real difference the changed line made.
    evidence: 'What went wrong: ___. The line I changed: ___. Did it improve? ___.'
    hints:
      - You only get the points for comparing the two attempts. One attempt on its own is not enough.
      - Keep the failed attempt. It is the evidence, not something to be embarrassed about.
      - 'Stuck on the tool, not the task? Ask Copilot: "I am using <your tool>. How do I try again without losing my first attempt?"'
    safetyCheckpoint: Do not delete or hide the first attempt. The comparison is the whole point.
  - id: cross-harness-check
    title: Operation Second Look
    points: 10
    objectiveRef: Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
    scene: 'Your situation: You are finished. The same work might look different in another tool — clearer, or more confusing.'
    outcome: A note comparing how the same finished work looks in a second tool.
    actions:
      - Open a different tool from the one you used — only if you already have it installed.
      - Point it at your finished work.
      - Look at the same result there. Do not start changing anything again.
      - 'Write: `In ___ I could see ___ more easily.` Or say it made no difference.'
    routes:
      - harness: copilot-cli
        instructions:
          - Used something else for the mission? `cd` into your finished folder and run `copilot`.
          - Ask it to look at the files and explain what changed. Say no to any offer to edit them.
      - harness: ide-extension
        instructions:
          - Used something else for the mission? Open your finished folder in VS Code.
          - Read the file and use Chat to ask about it. Stay out of Agent mode.
      - harness: copilot-app
        instructions:
          - Used something else for the mission? Open your finished folder in the app.
          - Look at the files and diff areas. Ask questions only — do not let it rewrite the files you built.
    verify: You looked at the same finished work in a second tool, and nothing got changed a second time.
    evidence: 'Second tool: ___. What I could see there: ___. Did it change my confidence? ___.'
    hints:
      - This is a look, not a redo. You are comparing how clearly each tool shows you what happened.
      - No second tool installed? Say so and take a different bonus instead — they are all worth 10.
      - 'Stuck on the tool, not the task? Ask Copilot: "I am using <your tool>. How do I look at files here without it editing them?"'
    safetyCheckpoint: Do not give the second tool more access than the first, and do not let it start the work over.
  - id: control-room-observation
    title: Operation Control-Room Observation
    points: 10
    objectiveRef: Choose a supported product control before an agentic task and verify afterward whether the result justified the AI credits used
    scene: 'Your situation: Your tool shows you things — which model is running, what it attached, what it asked permission for. Those readings are useful, but they only tell you so much.'
    outcome: One thing your tool showed you, what you did about it, and what it does not prove.
    actions:
      - Find one thing your tool actually displayed — the model name, the files it attached, a permission request, or a usage number.
      - Say how it changed what you did. If it changed nothing, say that.
      - 'Finish this sentence: `This tells me ___, but it does not prove ___.`'
      - Your tool shows none of these? Write `not available` and claim the points anyway.
    routes:
      - harness: copilot-cli
        instructions:
          - Look through the terminal for the model name, permission prompts, commands it asked to run, or files it mentioned.
          - Write down only what you can actually see. Write `not available` for anything the CLI does not show.
      - harness: ide-extension
        instructions:
          - Look at the model picker, the list of attached files above your message, the Source Control view, or the terminal.
          - Write down only what the screen shows. Do not guess at numbers you cannot see.
      - harness: copilot-app
        instructions:
          - Look at the session header, or the plan, diff, files, and terminal canvases.
          - Write down only what the app shows, and keep your conclusion small.
    verify: You can point at where on screen you saw it, and you have said what it does not prove.
    evidence: 'What I saw: ___. What I did about it: ___. It does not prove: ___.'
    hints:
      - '`not available` is a real answer and gets full points. Making up a number does not.'
      - Keep your conclusion small enough that someone else could check it on their own screen.
      - 'Stuck on the tool, not the task? Ask Copilot: "I am using <your tool>. Where do I see the model, attached files, and usage here?"'
    safetyCheckpoint: Do not rerun the task or switch models just to find something to write down. That costs credits for nothing.
  - id: platform-review-surfaces
    title: 'Operation Platform Review (needs GitHub Enterprise access)'
    points: 10
    objectiveRef: Choose a supported product control before an agentic task and verify afterward whether the result justified the AI credits used
    scene: 'Your situation: There is a second set of Copilot tools on GitHub.com — code review, Code Quality, and the cloud agent. Purrmission notes they only work if your repositories live in a GitHub Enterprise you can reach.'
    outcome: One thing you learned from a Copilot tool on GitHub.com that your own machine could not show you.
    actions:
      - 'Check first: do you have a repository you can push to, in a GitHub Enterprise with Copilot turned on? If not, skip this and take a different bonus. They are all worth 10 and the cap is 10 either way.'
      - 'Open one of these on a repository you own: Copilot code review on a pull request, Code Quality results, or hand a small issue to the cloud agent.'
      - Compare what it told you with what you found on your own machine.
      - 'Write: `It showed me ___, which I could not see locally. It still cannot decide ___.`'
    routes:
      - harness: copilot-cli
        instructions:
          - 'From the terminal, run `gh pr create` then `gh pr view --web` on a repository you own. That opens it in your browser.'
          - These tools are web pages. Write down what you see in the browser — nothing appears in the terminal.
      - harness: ide-extension
        instructions:
          - Push your branch from the Source Control view, then open the pull request in your browser.
          - Compare the comments it leaves with the change you already read in VS Code.
      - harness: copilot-app
        instructions:
          - Put your work in a repository you own, then open that repository on GitHub.com in a browser.
          - Compare what it reports with what you saw in the plan and diff canvases.
    verify: You can name which tool you opened and one thing it told you that you did not already know.
    evidence: 'Tool I opened: ___. What it showed me: ___. What it still cannot decide: ___.'
    hints:
      - No Enterprise access is not a failure. The other three bonus exercises are worth the same, and the cap is 10 whichever you pick.
      - 'They answer different questions: code review comments on one change, Code Quality looks at the whole repository, and the cloud agent does the work for you.'
      - It gives you more evidence. It still does not decide whether to accept the change. That stays with you.
      - 'Not sure what your account can use? Ask Copilot: "Which Copilot review and agent features can I use on GitHub.com, and what plan do they need?"'
    safetyCheckpoint: Use a repository you own. Never push workshop practice files into a customer or production repository.
completionPoints: 40
bonusPointCap: 10
carryForward:
  artifact: Agent Mergewell case file
  produces:
    - Separate Foundations, Agentic, and cumulative totals
    - The tool you chose and the path to your `copilot-case-file` folder
    - '`.github/copilot-instructions.md` and the answer it visibly changed'
    - '`.github/agents/case-writer.agent.md`, your custom agent'
    - '`.github/skills/case-summary/SKILL.md`, the skill that agent uses'
    - '`.github/instructions/markdown.instructions.md` and the `applyTo` pattern you chose'
    - Loop notes covering the plan, what actually happened, and where you would step in
  consumes:
    - Foundations `copilot-case-file` folder already open in your chosen tool, or the copyable Agentic starter case
  fallback: The copyable Agentic starter case supplies a ready-made `case-notes.md` so anyone can begin this module without Foundations.
leaderboard:
  optional: true
  aliasOnly: true
  instructions:
    - Keep any public or shared leaderboard alias-only; mission evidence and repository content stay local.
    - Export only the totals needed for the optional separately implemented event board.
    - Co-winners are based on the highest verified cumulative total; there is no speed scoring.
  submission:
    moduleOption: Agentic
    steps:
      - Finish the mission and read your Agentic core and bonus totals from the scorecard.
      - Open the leaderboard submission form and choose `Agentic` as the module.
      - 'Use a made-up alias rather than your real name. Your alias and score are published on the shared workshop board, so avoid your real name, work username, email, employer, or customer names.'
      - Copy the alias saved in the alias box on this page so it matches the one you used for Foundations.
      - Submit one issue for this module using the same alias you used for Foundations, so your module scores add up into one standing.
      - Agentic clues are worth 10 points each, so core totals use 10-point values.
      - To correct a score, edit that same issue; to withdraw, close it.
      - Submitting is optional and never required to complete the mission or carry the case file into Advanced.
status: draft
---

# Your Mission: Hand Off Work with Confidence

### 🎯 MISSION

## Mission goal

Build four things in your case folder — a repository instruction, a custom
agent, a skill, and a rule scoped to one file type — then watch an agent loop
run.

## Choose your starting point

- **Continuing from Foundations:** reopen your `copilot-case-file` folder in the
  tool you chose.
- **Starting with Agentic:** copy the starter case below. You can begin here
  without doing Foundations first.
- **Your score:** starting fresh does not reduce your Agentic score. Unearned
  Foundations points stay at zero.

## Scoring

Each module is scored and submitted on its own. Missing Foundations never blocks
you here.

| Item | Points |
| --- | --- |
| Operation Open the Case | 10 |
| Operation Write the Brief | 10 |
| Operation Verify the Evidence | 10 |
| Operation Close the Handoff | 10 |
| Operation Watch the Loop | 10 |
| **Core total** | **50** |
| Bonus work (capped) | 10 |
| **Module maximum** | **60** |

Forty core points completes the mission. Hints are always free. There is no
speed or popularity scoring.

Submit this module's total on its own. The board adds your three module totals
together, so finishing at 40 is a pass, not a podium.

## Timing guide

- **0-5 minutes:** open your case folder and get a session running.
- **5-13 minutes:** Operation Open the Case — run `/init`, read it, add a rule.
- **13-21 minutes:** Operation Write the Brief — build your custom agent.
- **21-29 minutes:** Operation Verify the Evidence — give that agent a skill.
- **29-37 minutes:** Operation Close the Handoff — scope a rule to one file type.
- **37-43 minutes:** Operation Watch the Loop — run a multi-step job and watch it.
- **43-45 minutes:** total your score and export it for Advanced.

## Accessibility and fallback

Hints are always available and never reduce points.

Pair with a facilitator or partner if you need help copying the starter case,
creating files, or working around a device or accessibility limit.

If a surface is not available on your plan, record `not available`, use the
facilitator-approved alternative, and claim the points.

## Words used in this mission

- **Tool** (sometimes called a harness) — where you run Copilot: VS Code, the
  CLI, or the Copilot app.
- **Repository instruction** — a file of standing rules Copilot reads every
  time, so you stop repeating yourself.
- **Custom agent** — a named helper with one narrow job, written in a Markdown
  file ending `.agent.md`.
- **Skill** — a written recipe an agent follows, so a job is done the same way
  every time.
- **`applyTo`** — a pattern in an instruction file that limits which files the
  rule reaches.
- **Agent loop** — the plan, act, check cycle an agent repeats. Watching it is
  how you catch scope drift early.
- **Scope drift** — the agent quietly widening the job beyond what you asked
  for.

## Recovery-only completed reference

`workshops/ghcp-dev-hack/content/missions/agentic/fixtures/completed-reference/`
is recovery-only. It shows a finished case folder with all four files in it.

Open it only after you have attempted the mission, or when a facilitator moves
you into recovery mode.