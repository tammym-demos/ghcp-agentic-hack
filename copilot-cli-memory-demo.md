# GitHub Copilot CLI — How Memory Works

## Overview

GitHub Copilot CLI has a **cross-session memory system** that allows the AI agent to remember important facts about your codebase between conversations. This eliminates the need to rediscover conventions, build commands, and project structure every session.

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│                    Session Start                         │
│                                                         │
│  Repository memories are loaded into the agent context  │
│  ► Conventions, build commands, patterns, structure     │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  During a Session                        │
│                                                         │
│  The agent may:                                         │
│  ► store_memory — save a new fact                       │
│  ► vote_memory (upvote) — confirm an existing fact      │
│  ► vote_memory (downvote) — mark a fact as outdated     │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   Next Session                           │
│                                                         │
│  Updated memories appear automatically for all users    │
│  working in the same repository                         │
└─────────────────────────────────────────────────────────┘
```

## Memory Scope

| Scope | Description |
|-------|-------------|
| **Repository** | Memories are tied to a specific repo and shared across all contributors |
| **Not user-specific** | Individual preferences are not stored as memories |
| **Persistent** | Memories survive across sessions until downvoted or replaced |

## What Gets Stored

Memories are short facts (under 200 characters) with citations. Examples:

| Category | Example Memory |
|----------|----------------|
| **Build commands** | `Build the Astro site with npm run build:site; full build uses npm run build:all.` |
| **Conventions** | `Workshop Slidev decks use .slidev.md files with theme: ../../themes/github.` |
| **Testing** | `Run pytest with coverage: pytest --cov=src tests/` |
| **Structure** | `API routes are in src/routes/ and follow RESTful naming conventions.` |
| **Patterns** | `Use JWT for authentication. Tokens are validated in middleware/auth.ts.` |

## Memory Lifecycle

### 1. Discovery

The agent discovers facts while working — from code, configurations, successful command runs, or information you provide.

### 2. Storage

Each stored memory includes:

- **Fact** — A concise statement (< 200 characters)
- **Subject** — Topic category (1-2 words, e.g., "build command", "testing practices")
- **Citations** — Source reference (file path + line number, or quoted user input)
- **Reason** — Why this fact is worth remembering for future tasks

### 3. Recall

At session start, relevant repository memories are injected into the agent's context. The agent considers each memory's applicability before relying on it.

### 4. Validation (Voting)

| Action | When Used |
|--------|-----------|
| **Upvote** | Agent verifies a memory is still accurate |
| **Downvote** | Agent discovers a memory is outdated or incorrect |

## How You Interact With Memory

Memory is an **internal agent capability** — there's no slash command to directly manage it. Instead, you influence it through conversation:

### Tell the agent important facts

```
You: "We always use pnpm, never npm, in this repo."

→ Agent may store: "Use pnpm as the package manager; npm is not used in this repo."
```

### Correct the agent

```
You: "That's wrong — we switched from Jest to Vitest last month."

→ Agent may downvote the old Jest memory and store a new Vitest fact.
```

### Ask what's remembered

```
You: "What memories do you have for this repo?"

→ Agent shows all currently loaded repository memories.
```

## Criteria for Storing a Fact

The agent only stores facts that meet ALL of these criteria:

- ✅ Likely to have actionable implications for a future task
- ✅ Independent of the current change (remains relevant if current code isn't merged)
- ✅ Unlikely to change over time
- ✅ Can't always be inferred from a limited code sample
- ✅ Relevant to the entire codebase and all contributors
- ✅ Contains no secrets or sensitive data

## Viewing Environment Details

While you can't directly browse memories, these commands show related context:

| Command | What It Shows |
|---------|---------------|
| `/env` | Loaded instructions, MCP servers, skills, agents, plugins, LSPs |
| `/instructions` | Active custom instruction files |
| `/skills` | Available skills |

## Example: Memory in Action

**Session 1** — You ask the agent to build the project:

```
You: "Build this project"
Agent: runs `npm run build` → fails
Agent: tries `npm run build:all` → succeeds
Agent: stores memory → "Full build uses npm run build:all"
```

**Session 2** — Different day, same repo:

```
You: "Build the project"
Agent: (sees memory) runs `npm run build:all` → succeeds immediately
```

No rediscovery needed. The agent learned from the first session.

## Key Takeaways

1. **Memory is automatic** — the agent decides when to store/recall facts
2. **Memory is shared** — all contributors to a repo benefit from stored facts
3. **Memory is curated** — voting keeps facts accurate over time
4. **Memory is concise** — each fact is under 200 characters with citations
5. **You influence memory** — by providing information and corrections during conversation

---

*Reference document demonstrating the GitHub Copilot CLI memory system.*
