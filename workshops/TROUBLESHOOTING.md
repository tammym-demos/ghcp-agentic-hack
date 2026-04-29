# Troubleshooting Guide — Copilot Developer Training Workshop

**Last Updated**: [Date]  
**Quick Help**: Can't find your issue? Email [support@example.com] or ask an instructor.

---

## Table of Contents

1. [Setup & Prerequisites](#setup--prerequisites)
2. [Module 1: Foundations](#module-1-foundations)
3. [Module 2: Agentic Patterns](#module-2-agentic-patterns)
4. [Module 3: Advanced Topics](#module-3-advanced-topics)
5. [Module 4: ADO Integration](#module-4-ado-integration)
6. [Lab Exercises](#lab-exercises)
7. [General Copilot Issues](#general-copilot-issues)
8. [Getting Help](#getting-help)

---

## Setup & Prerequisites

### Problem: Node.js Not Found

**Error Message:**
```
'node' is not recognized as an internal or external command
```

**Solution:**
1. Download Node.js from [nodejs.org](https://nodejs.org) (LTS version, 18 or higher)
2. Run the installer and follow the wizard
3. Restart your terminal/VS Code
4. Verify: `node --version` (should show v18.x.x or higher)

**Verification Step:**
```bash
node --version  # Should print v18.x or higher
npm --version   # Should print 8.x or higher
```

---

### Problem: Git Not Found

**Error Message:**
```
'git' is not recognized as an internal or external command
```

**Solution:**
1. Download Git from [git-scm.com](https://git-scm.com/)
2. Run the installer (use default settings for Windows)
3. Restart terminal/VS Code
4. Verify: `git --version`

---

### Problem: VS Code Extension Not Loading

**Symptoms:**
- Copilot Chat icon doesn't appear in VS Code sidebar
- Copilot buttons greyed out
- "Copilot is not available" message

**Solution (Windows/Mac):**
1. Open VS Code
2. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
3. Type: `Developer: Reload Window` and press Enter
4. Wait 30 seconds for extensions to load
5. Check the bottom-right corner — you should see a loading spinner, then your GitHub avatar

**If Still Broken:**
1. Open Extensions view: `Ctrl+Shift+X`
2. Search for "GitHub Copilot" and "GitHub Copilot Chat"
3. Click the red "X" to uninstall both
4. Restart VS Code
5. Install them again from the Extensions Marketplace
6. Sign in with your GitHub account

---

### Problem: GitHub Copilot License Not Recognized

**Symptoms:**
- "GitHub Copilot license required" message
- Chat interface appears but all responses blocked
- Extension shows yellow warning icon

**Solution:**
1. Verify your GitHub account has Copilot access:
   - Go to [github.com/settings/copilot](https://github.com/settings/copilot)
   - Confirm "Copilot" shows as active
2. In VS Code, sign out and back in:
   - Click your avatar (bottom-left corner)
   - Select "Sign out"
   - Click avatar again → "Sign in with GitHub"
   - Authorize the VS Code extension
3. Reload VS Code: `Ctrl+Shift+P` → `Developer: Reload Window`

**Not a Copilot subscriber?**
- Start a free trial: [github.com/github-copilot/signup](https://github.com/github-copilot/signup)
- Or ask your organization admin for a Copilot Business license

---

### Problem: Repository Clone Failed

**Error Message:**
```
fatal: unable to access 'https://github.com/...': SSL certificate error
```

**Solution:**
1. Check your internet connection (try accessing github.com in a browser)
2. If GitHub is accessible:
   ```bash
   git config --global http.sslVerify false  # Temporary fix
   git clone https://github.com/microsoft/GitHubCopilot_Customized.git
   ```
3. If the error persists, use SSH instead:
   ```bash
   git clone git@github.com:microsoft/GitHubCopilot_Customized.git
   ```
   (Requires SSH key setup — [SSH key guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh))

---

## Module 1: Foundations

### Problem: Chat Panel Won't Open

**Symptoms:**
- `Ctrl+Shift+I` does nothing
- Chat icon in sidebar is greyed out or missing

**Solution:**
1. Verify Copilot Chat extension is installed:
   - Open Extensions: `Ctrl+Shift+X`
   - Search "GitHub Copilot Chat"
   - Should show as "Installed"
2. If missing, install it from the Marketplace
3. Reload VS Code: `Ctrl+Shift+P` → `Developer: Reload Window`
4. Try the shortcut again: `Ctrl+Shift+I`

**Still broken?**
Try the menu: View → Chat

---

### Problem: @workspace Context Not Working

**Symptoms:**
- `@workspace` doesn't autocomplete
- Error: "Could not analyze workspace"
- Copilot ignores workspace context

**Solution:**
1. Ensure you have a folder open in VS Code (File → Open Folder)
2. The folder must be a Git repository:
   ```bash
   cd your-folder
   git init
   ```
3. Open a chat message: `Ctrl+Shift+I`
4. Type: `@workspace [your question]`
5. Press Space after `@workspace` — it should autocomplete with a checkmark

**Note:** `@workspace` works best with 50–100 KB of codebase. Huge repos may fail.

---

### Problem: Inline Completions Not Appearing

**Symptoms:**
- Start typing code but no grey ghost text appears
- Tab key doesn't work

**Solution:**
1. Verify Copilot inline completions are enabled:
   - `Ctrl+Shift+P` → `Preferences: Open Settings (UI)`
   - Search: "Copilot"
   - Find "Copilot: Enable Inline Completions"
   - Toggle to ON
2. Write a clear comment:
   ```typescript
   // Calculate the sum of two numbers
   function add(a, b) {
   ```
3. Pause for 2 seconds — Copilot should suggest the next line
4. If suggestion appears, press Tab to accept

**Note:** Inline completions work best with:
- Clear function signatures
- Descriptive variable names
- Comments explaining intent

---

## Module 2: Agentic Patterns

### Problem: Agent Not Found in CLI

**Error Message:**
```
copilot: command not found
```

**Solution:**
1. Install the Copilot CLI:
   ```bash
   npm install -g @github/copilot-cli
   ```
2. Verify installation:
   ```bash
   copilot --version
   ```
3. If still missing, ensure npm is in your PATH:
   ```bash
   which npm  # Mac/Linux
   where npm  # Windows
   ```

---

### Problem: Custom Agent Not Responding

**Symptoms:**
- Copilot chat responds with generic answers
- Custom instructions in `.github/copilot-instructions.md` are ignored
- Agent doesn't use specialized behaviors from `.github/agents/*.md`

**Solution:**
1. Verify file structure exists:
   ```
   your-repo/
   └── .github/
       ├── copilot-instructions.md
       └── agents/
           └── your-agent.md
   ```
2. Reload Copilot context:
   - Close the chat panel: `Ctrl+K` (in chat)
   - Open a new chat: `Ctrl+Shift+I`
3. Reference the agent explicitly in your prompt:
   ```
   @workspace I want to use the [agent-name] agent. [Your question]
   ```
4. If still not working:
   - Check file syntax (YAML/Markdown formatting)
   - Restart VS Code: `Ctrl+Shift+P` → `Developer: Reload Window`

---

### Problem: Plan-Act-Observe-Reflect Loop Seems Stuck

**Symptoms:**
- Agent keeps repeating the same attempt
- No progress after 5+ iterations
- Errors aren't being fixed

**Solution:**
1. **Check the agent's plan** — is it clear enough?
   - Update your prompt with more specific guidance:
     ```
     Your goal is to [specific outcome]. Follow these steps:
     1. Check for [X]
     2. Update [Y]
     3. Run [Z] to validate
     ```

2. **Provide better error context:**
   - Include error messages in your next message
   - Point out which line caused the failure
   - Agent can self-correct better with explicit feedback

3. **Simplify the task:**
   - Break large requests into smaller steps
   - Let agent complete step 1 before asking step 2
   - This prevents token overflow and improves focus

4. **Use rubber duck debugging** (Module 2 technique):
   - Ask a different model (in Agent vs. Chat mode) to review
   - Cross-model validation often catches issues self-reflection misses

---

## Module 3: Advanced Topics

### Problem: Agent Debug Logs Not Visible

**Symptoms:**
- Can't see what agent is thinking
- No "Plan" or "Observe" output shown
- Error messages don't appear

**Solution:**
1. Enable debug mode:
   - `Ctrl+Shift+P` → `Copilot: Debug`
   - Select "Enable" or "Verbose"
2. Open the Output panel: `Ctrl+Shift+U`
3. In the dropdown (bottom-right of Output panel), select "GitHub Copilot"
4. Run your agent again — you should see detailed logs

**Logs still not appearing?**
1. Check VS Code version: `Ctrl+Shift+P` → `About`
2. Ensure you're on latest version (Help → Check for Updates)
3. Reload window: `Ctrl+Shift+P` → `Developer: Reload Window`

---

### Problem: MCP Server Won't Start

**Error Message:**
```
MCP server failed to initialize
Error: command not found: [server-name]
```

**Solution:**
1. Verify the MCP server is installed:
   ```bash
   npm list @modelcontextprotocol/server-[name]
   ```
2. If missing, install it:
   ```bash
   npm install @modelcontextprotocol/server-[name]
   ```
3. Check your `~/.copilot/mcp-config.json`:
   ```json
   {
     "mcpServers": {
       "your-server": {
         "command": "node",
         "args": ["/path/to/server.js"]
       }
     }
   }
   ```
   - Verify the path is absolute and correct
   - Verify the server file exists
4. Restart VS Code and try again

**Still broken?**
- Check MCP protocol version compatibility (docs at [modelcontextprotocol.io](https://modelcontextprotocol.io))
- Enable MCP debug: see "Copilot Debug Logs" section above

---

### Problem: Evaluation Framework Not Running

**Symptoms:**
- Eval script doesn't execute
- "No test cases found"
- Evaluation metrics don't calculate

**Solution:**
1. Verify test case file exists:
   ```bash
   ls -la evaluation/test-cases.json  # or .yaml
   ```
2. Validate JSON/YAML syntax:
   ```bash
   npm install -g jsonlint  # Install JSON validator
   jsonlint evaluation/test-cases.json
   ```
3. Run evaluation script manually:
   ```bash
   npm run eval  # or check package.json for exact command
   ```
4. If no "eval" script, you need to add it to `package.json`:
   ```json
   {
     "scripts": {
       "eval": "node evaluation/run-eval.js"
     }
   }
   ```

---

## Module 4: ADO Integration

### Problem: AB# Linking Not Working

**Symptoms:**
- GitHub mentions ADO items but they don't link
- `AB#1234` appears in PR but no ADO connection
- ADO shows "unlinked" status

**Solution:**
1. Verify AB# linking is enabled:
   - Go to GitHub repo Settings → Integrations
   - Confirm "Azure Boards" is connected
   - Check connection status (should be green checkmark)

2. Verify ADO project is configured:
   - In ADO, go to Project Settings → GitHub Connections
   - Confirm this GitHub repo is listed and "Active"

3. Check syntax in PR body/comments:
   ```
   This PR fixes AB#1234
   ```
   (Not: `#1234` or `ADO#1234` — must be `AB#[number]`)

4. Verify the issue number exists:
   - Go to ADO Boards
   - Find the work item number (e.g., 1234)
   - Confirm it's not deleted/archived

**Still not linking?**
- Disconnect and reconnect:
  1. GitHub: Settings → Integrations → Azure Boards → Disconnect
  2. GitHub: Settings → Integrations → Azure Boards → Connect
  3. Re-authenticate when prompted

---

### Problem: ADO Boards Shows Unlinked PRs

**Symptoms:**
- PR exists in GitHub but ADO shows "no related PR"
- AB# in PR description, but link not appearing in ADO

**Solution:**
1. Verify the GitHub repo is connected in ADO:
   - ADO: Project Settings → GitHub Connections
   - Confirm this repo appears and status is "Active"

2. Refresh ADO:
   - Close the browser tab and reopen it
   - Connections can take 5–10 minutes to update

3. Check PR settings:
   - PR title/description must include `AB#[number]` in text
   - Not in just comments — must be in PR title or description body

4. Verify the work item exists:
   - Go to ADO Boards
   - Search for the issue number
   - If it's archived, links won't work

---

## Lab Exercises

### Problem: Lab Files Already Exist

**Symptoms:**
- Exercise says "Create `.github/copilot-instructions.md`" but file already exists
- Can't complete the "create" step

**Solution:**
- If you're rerunning the lab:
  1. Back up your existing file: `cp .github/copilot-instructions.md .github/copilot-instructions.md.bak`
  2. Delete the original: `rm .github/copilot-instructions.md`
  3. Complete the lab exercise to create a fresh version
  4. When done, compare with your backup: `diff copilot-instructions.md copilot-instructions.md.bak`

---

### Problem: npm install Fails in Lab

**Error Message:**
```
npm ERR! code E404
npm ERR! 404 Not Found
```

**Solution:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
2. Update npm itself:
   ```bash
   npm install -g npm@latest
   ```
3. Try again:
   ```bash
   npm install
   ```

**Still failing?**
- Check internet connection: `ping npm.js.org`
- Try npm registry mirror:
  ```bash
  npm config set registry https://registry.npmjs.org/
  npm install
  ```

---

### Problem: Tests Fail in Lab

**Symptoms:**
- `npm run test` fails
- Custom instructions not taking effect
- Agent doesn't behave as expected

**Solution:**
1. Check your custom instructions file:
   ```bash
   cat .github/copilot-instructions.md
   ```
   - Verify it's valid Markdown (no syntax errors)
   - Verify file is NOT empty

2. Restart VS Code:
   - Close all VS Code windows
   - Reopen VS Code
   - Open the lab folder
   - Wait 10 seconds for Copilot to reindex

3. Run tests again:
   ```bash
   npm run test
   ```

4. If tests still fail:
   - Read the error message carefully
   - Check if Copilot's response followed your instructions
   - Update instructions and try again

---

## General Copilot Issues

### Problem: Copilot Responses Are Hallucinating

**Symptoms:**
- Copilot invents function names that don't exist
- References files that aren't in the codebase
- Generates code that contradicts your instructions

**Solution (Module 2 AI Safety):**
1. **Improve context targeting**:
   - Use `@workspace` to give Copilot visibility into your codebase
   - Use `#file` to show relevant example code
   - Use `#selection` to highlight key code patterns

2. **Write better instructions**:
   - Be explicit: "Use function names from existing codebase, don't invent new ones"
   - Add examples: "Follow the pattern from `userService.ts` — name functions as `handle[Verb][Noun]`"
   - Reference documentation: "See `/docs/architecture.md` for patterns we follow"

3. **Use rubber duck debugging**:
   - Ask Chat mode to review an Agent's code
   - Cross-model verification catches hallucinations

4. **Check Agent logs**:
   - Enable debug mode (see "Agent Debug Logs" above)
   - Review the "Plan" step — if the plan is vague, output will be wrong

---

### Problem: "Context Window Full" Error

**Symptoms:**
- Chat becomes very slow
- Responses become shorter or cut off
- Error: "Context window exceeded"

**Solution:**
1. **Reduce context**:
   - Remove old messages: Open chat, scroll up, delete earlier messages
   - Use `Ctrl+K` to clear chat history (starts fresh conversation)

2. **Be more precise with `@` and `#`**:
   - Instead of `@workspace` (loads entire codebase), use `#file` to show one example
   - Don't attach 10 large files at once

3. **Split tasks**:
   - Break "Implement feature X, add tests, and document it" into 3 separate chats
   - Each task gets its own context window

---

### Problem: Copilot Is Slow or Unresponsive

**Symptoms:**
- Chat takes 30+ seconds to respond
- Agent loops forever without completing

**Solution:**
1. **Check network connection**:
   - Ping GitHub: `ping api.github.com`
   - If no response, check WiFi/internet

2. **Check VS Code performance**:
   - Open Activity Monitor (Mac) or Task Manager (Windows)
   - Check if VS Code is using high CPU
   - If yes, close other extensions and reload

3. **Reduce prompt complexity**:
   - Long, complex prompts take longer
   - Break into smaller, simpler questions
   - Let Copilot answer step 1 before asking step 2

4. **Use faster model if available**:
   - If using Claude 3 Opus, try Claude 3.5 Sonnet (faster)
   - Model selection may be available in chat interface

---

## Getting Help

### During the Workshop
- **Raise your hand** — instructors are circulating
- **Use chat** — TAs monitor the chat channel
- **Ask your neighbor** — everyone's learning together!

### After the Workshop

**Email Support**
- Subject: "[Copilot Training] [Your Issue]"
- Email: [instructor-email@example.com]
- Response time: Within 24 hours

**Slack**
- Channel: #copilot-training
- Post your error message + what you've tried
- Team monitors during business hours

**GitHub Issues**
- If it's a problem with the sample repo: [github.com/microsoft/GitHubCopilot_Customized/issues](https://github.com/microsoft/GitHubCopilot_Customized/issues)
- Include: error message, steps to reproduce, VS Code version

**Microsoft Support**
- For GitHub Copilot licensing/access: [github.com/support](https://github.com/support)
- For Azure DevOps integration: [developercommunity.visualstudio.com](https://developercommunity.visualstudio.com)

---

## Checklist: Before Asking for Help

Before you email, try this:
- [ ] Restarted VS Code: `Ctrl+Shift+P` → `Developer: Reload Window`
- [ ] Verified extensions are installed: `Ctrl+Shift+X` → Search "Copilot"
- [ ] Checked internet connection: `ping github.com`
- [ ] Ran `git --version` and `node --version` to confirm prerequisites
- [ ] Cleared chat history: `Ctrl+K` (in chat) to start fresh conversation
- [ ] Searched this guide for your exact error message
- [ ] Checked GitHub status: [status.github.com](https://status.github.com)

**If all above checks pass, email support with:**
1. Your error message (exact text)
2. What you were trying to do
3. Steps you've already taken to fix it
4. VS Code version: `Ctrl+Shift+P` → `About`
5. GitHub Copilot extension version: `Ctrl+Shift+X` → search "Copilot", click it, check version

---

## FAQ

### Q: Can I use Copilot offline?
**A:** No. Copilot requires internet connection to GitHub servers. (Local models coming soon as beta feature.)

### Q: Will my code be shared when I use Copilot?
**A:** GitHub Copilot uses your code to generate suggestions, but does not store it unless you choose to provide feedback.  See [GitHub Privacy](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement#copilot-and-codex-data-usage).

### Q: What's the difference between Chat and Agent modes?
**A:** Chat = read-only questions (answers your questions). Agent = edit mode (makes changes to files, runs commands).

### Q: How do I report a Copilot bug?
**A:** Use the feedback button in chat (smiley face icon) or file an issue at [github.com/community/community/discussions](https://github.com/community/community/discussions).

### Q: Can our team customize Copilot?
**A:** Yes! That's what custom instructions and agents are for. See Module 2 lab.

---

**Last updated:** [Date]  
**Questions or corrections?** Email [instructor-email@example.com]
