# Advanced Workshop 20-Slide Generation Manifest

Authority: `requirements.md` and `module.md`. Expected slide count: **20**.
Total module timing: **60 instruction minutes + 30 mission minutes = 90 minutes**.

| # | Minutes | Source marker | Slide type | Exact source title | Required contract |
|---:|---:|---|---|---|---|
| 1 | 1 | H1 | Cover | Module 3: Advanced — Under the Hood & At Scale | Frame LLM/cache internals, multi-agent orchestration, prompt-injection defense, and production readiness |
| 2 | 1 | Agenda | Agenda | Session Agenda | Show the 60-minute instruction route and separate 30-minute mission |
| 3 | 3 | LLM Internals 1 | Content | Under the Hood: From Text to Token IDs and Vector Embeddings | Subword tokenization (preserving leading spaces) -> vocabulary IDs -> learned vector embeddings |
| 4 | 3 | LLM Internals 2 | Content | Causal Transformers: Self-Attention and Next-Token Probabilities | Self-attention across preceding tokens, next-token logit scores, sampling, append, and repeat on frozen weights |
| 5 | 3 | LLM Internals 3 | Motion | The Probability Suspect Lineup: How One Clue Reshapes Prediction | `AttentionLineupBoard.vue` side-by-side attention spotlight & candidate probability bars (`Fluency != Truth`) |
| 6 | 3 | Cache Internals 1 | Motion | Inside Prefix Caching: Reusing KV State Across Turns | `FoundationCacheWalkthrough.vue` showing intermediate Key-Value (KV) attention state reuse |
| 7 | 3 | Cache Internals 2 | Content | What Breaks the KV Cache & Multi-Model Architectures (HydraFusion & Ollama) | Early prefix mutations invalidating KV state + `HydraFusion` (Single/Cascade/Critique preview) + CLI Ollama `/model` |
| 8 | 3 | Orchestration 1 | Content | Lowest-Sufficient Complexity and One Human Merge Owner | `Script -> 1 Prompt -> 1 Agent -> Subagents -> Parallel Fleet` converging on one human merge owner |
| 9 | 3 | Orchestration 2 | Motion | Subagents: Protecting the Parent Context Window and KV Cache | `SubagentWorktreeFleetMap.vue` showing subagent disposable windows on `Claude Haiku 5.5` keeping parent KV cache warm |
| 10 | 4 | Orchestration 3 | Content | Parallel Subagents with Copilot CLI /fleet and /tasks | Scope `/fleet` and `/tasks` to Copilot CLI; weigh wall-clock speedup against multiplied AI credit burn |
| 11 | 4 | Orchestration 4 | Content | Git Worktrees vs. Stacked PRs: Parallel Isolation vs. Dependent Layers | Contrast isolated Git worktrees (`/worktree` in CLI & App) with dependency-ordered Stacked PRs (`gh-stack`) |
| 12 | 3 | Enterprise MCP | Governance | Work IQ via Remote MCP: Governed Workplace Context | Permission-aware Microsoft 365 context in Copilot CLI via remote MCP + retrieve-vs-present boundary |
| 13 | 3 | AI Defense | Motion | AI Safety in the Wild: Defending Against Indirect Prompt Injection | `PromptInjectionShield.vue` showing poisoned issue tokens intercepted by Purrmission's 4 Harness Rings |
| 14 | 4 | Shared Governance | Governance | Governing Shared Skills and MCP Across Code Review and Cloud Agent | Contrast automatic read-only MCP/skill calls in Copilot Code Review with autonomous execution in Cloud Agent |
| 15 | 3 | Lead/Admin Lens | Governance | The Lead and Admin Lens: Budgets, Policy, and Review Defaults | Chief Charter's controls: model enablement policies, Balanced vs Lite review defaults, and AI credit governance |
| 16 | 3 | Telemetry | Content | VS Code Agents Window and Cross-Surface Telemetry | Inspect running subagent traces, tool durations, and per-model token footers in the VS Code Agents Window |
| 17 | 5 | Root-Cause Debug | Method | Systematic Debugging Across the Harness and Model | Isolate sampling/probability drift from KV-cache/compaction loss, `Saved != Loaded` misses, or permission blocks |
| 18 | 6 | Integration & Day 2 | Integration | Integrating Parallel Lanes and Day-2 Production Operations | Dependency-ordered integration, combined validation, exact-commit release, and Day 2 Hack readiness |
| 19 | 0 | Demo | Demo | Demo! | Zero-minute transition walkthrough before the mission |
| 20 | 2 | Mission launch | Mission | Your Advanced Mission Starts Now | Launch the separate 30-minute `cross-cutting-change` mission (`Case File Ω-3`) |

## Timing arithmetic

- Opening and agenda (Slides 1–2): `1 + 1 = 2` minutes
- Under the Hood: LLMs & Prefix Caches (Slides 3–7): `3 + 3 + 3 + 3 + 3 = 15` minutes
- Scaling the SDLC: Subagents, `/fleet` & Worktrees (Slides 8–11): `3 + 3 + 4 + 4 = 14` minutes
- Enterprise Governance, Defense, Debugging & Integration (Slides 12–18): `3 + 3 + 4 + 3 + 3 + 5 + 6 = 27` minutes
- Demo (Slide 19): `0` minutes
- Mission launch (Slide 20): `2` minutes
- Teaching deck total: `2 + 15 + 14 + 27 + 0 + 2 = 60` instruction minutes + `30` mission minutes = `90` minutes.
