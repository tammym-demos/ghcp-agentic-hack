# GitHub + Azure DevOps Integration Workshop

This folder contains workshop content for the GitHub + ADO integration story.

## Versions

### 📊 30-Minute Edition (Recommended for Pilot Sessions)

**Files:**
- `gh-ado-integration-workshop-30min.md` — Condensed workshop guide
- `gh-ado-integration-30min.slidev.md` — 11-slide Slidev deck

**Focus:** Essential integration points
- GitHub + ADO architecture (how they layer)
- AB# linking (the primary integration)
- AB# in practice (real workflow example)
- Copilot from Azure Boards (and GitHub-repos caveat)
- PR Insights & additional features
- Decision framework (when to adopt, when to skip)

**Duration:** 30 minutes

**Start:** Run `npm run dev:ado-integration`

---

### 📚 Comprehensive Edition (Full Coverage)

**Files:**
- `gh-ado-integration-workshop.md` — Full workshop guide (60–75 min)
- `gh-ado-integration.slidev.md` — 18-slide Slidev deck

**Additional coverage:**
- Detailed security & governance section
- ADO Pipelines + GitHub repos setup
- Test Plans & Artifacts details
- Comprehensive troubleshooting
- Migration roadmap

**Duration:** 60–75 minutes

**Start:** Run `npm run dev:ado-integration:full`

---

## Hands-On Lab

**File:** `gh-ado-integration-LAB.md`

4 hands-on labs covering:
1. **Connection Setup** (instructor demo)
2. **AB# Linking** (hands-on, ~10 min)
3. **PR Insights** (hands-on, ~5 min)
4. **ADO Pipelines** (optional demo, ~5 min)

**Self-paced optional content** — not required for the 30-minute pilot session. Reference after the workshop for deeper learning.

---

## Quick Start

**For 30-minute pilot:**
```bash
npm run dev:ado-integration
```

**For comprehensive workshop:**
```bash
npm run dev:ado-integration:full
```

**For hands-on labs:**
See `gh-ado-integration-LAB.md` for self-paced exercises.

---

## Content Structure

| Topic | 30-min | Full |
|-------|--------|------|
| GitHub + ADO Architecture | ✅ | ✅ |
| AB# Linking | ✅ | ✅ |
| Copilot + ADO Boards | ✅ | ✅ |
| PR Insights | ✅ | ✅ |
| Decision Framework | ✅ | ✅ |
| Security & Governance | Appendix | ✅ Full Section |
| ADO Pipelines Setup | Appendix | ✅ |
| Test Plans & Artifacts | Appendix | ✅ |
| Troubleshooting | Appendix | ✅ |
| Migration Roadmap | Appendix | ✅ |

---

## References

- **AB# Linking Setup**: [Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/boards/github/connect-to-github)
- **Integration Overview**: [Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/cross-service/github-integration)
- **Copilot + Azure Boards**: [Copilot Work Item Integration](https://learn.microsoft.com/en-us/azure/devops/boards/github/work-item-integration-github-copilot)

---

## Notes

- Both versions include all essential information; the 30-min version is condensed for time-constrained pilot sessions
- The comprehensive version includes Appendices with deep-dive content moved out of the main 30-min flow
- Labs are optional self-paced content, not required for either workshop version
