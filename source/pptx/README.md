# PPTX Source Files

Drop NotebookLM-generated PPTX files here for conversion into Slidev decks.

## Usage

```bash
# Place your file
# source/pptx/copilot-dev-foundations.pptx

# Convert it
npm run convert:pptx -- copilot-dev-foundations

# Preview the result
npx slidev workshops/copilot-dev-foundations/copilot-dev-foundations.slidev.md
```

## Naming Convention

Name the PPTX file with the **exact workshop folder name**:

| Workshop Module | Expected Filename |
|----------------|-------------------|
| Module 1: Foundations | `copilot-dev-foundations.pptx` |
| Module 2: Agentic | `copilot-dev-agentic.pptx` |
| Module 3: Advanced | `copilot-dev-advanced.pptx` |
| Module 4: Hack | `copilot-dev-hack.pptx` |

## Notes

- PPTX files are **gitignored** (they're large binary files)
- Re-running the conversion overwrites previous output
- Review and adjust the generated Slidev deck after conversion
- Install dependencies: `pip install python-pptx Pillow`
