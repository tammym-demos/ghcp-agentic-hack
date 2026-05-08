# GitHub Copilot — Agentic Journey Assessment Survey

## Purpose

This quick survey (10 questions, ~2 minutes) helps identify where each developer sits in their GitHub Copilot journey — from basic completions through to fully agentic workflows. Results help facilitators tailor the workshop to your team's actual skill level.

## How to Use This Survey

1. **Copy the questions below** into your preferred survey tool (Microsoft Forms, Google Forms, Typeform, etc.)
2. **Send to the team** using the email template at the bottom of this document
3. **Collect responses** and use the Scoring Guide to map participants to skill tiers
4. **Share results** with the workshop facilitator so they can adjust pacing and emphasis

> **Note**: Each question maps to a workshop module tier. The scoring guide at the bottom explains how to interpret results.

---

## Section 1: Foundations (Beginner)

*Maps to Module 1: Copilot Chat, GitHub CLI, custom instructions, models & tokens.*

| # | Question | Response |
|---|----------|----------|
| 1 | How often do you use GitHub Copilot (completions or chat) in your daily work? | Never / Occasionally / Daily |
| 2 | Which Copilot Chat modes have you used? | None / Ask mode only / Ask + Edit / Ask + Edit + Agent |
| 3 | Have you set up custom instructions for Copilot (e.g., `.github/copilot-instructions.md`)? | Yes / No / Didn't know that was possible |

---

## Section 2: Agentic Patterns (Intermediate)

*Maps to Module 2: context management, project bootstrapping, agents & skills, agentic loops.*

| # | Question | Response |
|---|----------|----------|
| 4 | Do you actively manage what context gets sent to Copilot (e.g., `#file`, `#codebase`, fresh sessions)? | Yes, regularly / Sometimes / No |
| 5 | Have you used Copilot Agent mode to complete multi-step tasks (file creation, running commands, iterating on errors)? | Yes, frequently / A few times / No |
| 6 | Have you used the Copilot coding agent (assigns an issue, generates a PR automatically)? | Yes / No / Didn't know that existed |

---

## Section 3: Advanced Topics (Advanced)

*Maps to Module 3: agent architecture, MCP, debugging, full-stack agent workflows.*

| # | Question | Response |
|---|----------|----------|
| 7 | Have you installed or configured an MCP (Model Context Protocol) server for use with Copilot? | Yes / No / What is MCP? |
| 8 | Have you created a custom agent (e.g., `.github/agents/*.md`) or reusable prompt for your team? | Yes / No |
| 9 | When an agent task goes wrong, do you know where to find diagnostic logs or debug output? | Yes / Somewhat / No |
| 10 | How confident are you in building a custom Copilot agent to solve a specific business problem? | Not at all / Low / Moderate / High / Could do it right now |

---

## Scoring Guide

### How to Score

For each question, assign points:

- **Strong affirmative** (Yes / Daily / Frequently / High–Could do it right now) = **2 points**
- **Partial** (Sometimes / A few times / Somewhat / Moderate) = **1 point**
- **No / Never / "Didn't know"** = **0 points**

### Tier Placement

| Tier | Questions | Score | Recommended Starting Point |
|------|-----------|-------|----------------------------|
| **Beginner** | Q1–Q3 | 0–2 | Start with Module 1: Foundations |
| **Beginner+** | Q1–Q3 | 3–6 | Module 1 will be quick review; focus on Module 2 |
| **Intermediate** | Q4–Q6 | 0–2 | Focus on Module 2: Agentic Patterns |
| **Intermediate+** | Q4–Q6 | 3–6 | Module 2 will be review; focus on Module 3 |
| **Advanced** | Q7–Q10 | 0–3 | Module 3: Advanced Topics is the priority |
| **Advanced+** | Q7–Q10 | 4–8 | Ready for Module 4: Hack — go build! |

### Team-Level Insights

- **Most score Beginner**: Allocate extra time for Module 1, slower pace
- **Mixed Beginner + Intermediate**: Quick Module 1 recap (45 min), expand Module 2
- **Most score Intermediate+**: Abbreviate Modules 1–2, expand Module 3 and Hack time
- **Most score Advanced**: Jump to Hack scenarios, use Modules 1–3 as reference only

---

## Email Template for Distribution

> **Subject**: Quick Survey — Where Are You on the GitHub Copilot Journey? (2 min)
>
> Hi team,
>
> We're preparing for an upcoming GitHub Copilot developer training session. To help tailor the content to our team's experience level, please take 2 minutes to complete this 10-question survey.
>
> **Survey link**: [INSERT YOUR FORM LINK HERE]
>
> There are no wrong answers — just be honest about what you've tried and what you haven't. This helps us focus on what will be most valuable for the group.
>
> **Deadline**: [INSERT DATE — ideally 1 week before workshop]
>
> Thanks!
> [Your name]

---

## Tips for the Facilitator

- **Review aggregate scores** before the workshop to adjust pacing
- **Identify outliers** — pair Advanced+ participants as "helpers" during labs if the group skews Beginner
- **Don't skip entirely** — even if scores suggest skipping a module, a 5-minute recap ensures shared vocabulary
- **Re-survey after** — running this survey 2–4 weeks post-workshop measures skill growth

---

*Pre-workshop assessment survey for GitHub Copilot Developer Training — Zero to Agentic*
