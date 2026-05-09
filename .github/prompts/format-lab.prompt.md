# Format Lab Exercise Document

Reformat the given `*-LAB.md` file to follow the workshop lab conventions below. Preserve all existing content — reorganize and restructure only.

## Structure Rules

1. **H1 title** at the top with the module name and "— Hands-on Lab"
2. **Overview section** with timing, objectives, and prerequisites
3. **Each exercise** wrapped in `<details><summary>` for collapsibility:

```markdown
<details>
<summary><h2>Exercise N: Title (~X min)</h2></summary>

### Objective

One-sentence goal.

### Steps

1. Step instructions…

### Success Criteria

- ✅ First criterion
- ✅ Second criterion

</details>
```

4. **H2 for exercises**, **H3 for sub-sections** inside each exercise
5. **Fenced code blocks** with language tags for every command, prompt, YAML, or config snippet — never indented code blocks
6. **Timing badge** in each exercise summary: `(~X min)`
7. **Success Criteria** section at the end of every exercise with `✅` checkmarks

## Formatting Rules

- Add a blank line before and after every fenced code block
- Add a blank line before the first item of any list
- Use `> **Note**:` for callouts (not `[!NOTE]`)
- Wrap bare URLs in angle brackets: `<https://example.com>`
- Use `**bold**` for UI elements and key terms
- Keep each copyable unit (command, prompt, YAML snippet) in its own fenced block
- No GitHub-flavored admonition syntax

## Reference

See `workshops/copilot-workshop-c++/copilot-zero-to-agents-odrive-LAB.md` for the gold-standard format using `<details>/<summary>` structure.
