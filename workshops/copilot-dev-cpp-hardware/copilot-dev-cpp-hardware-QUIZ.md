# Module 4: C++ for Hardware Developers — Quiz

---

### 1. Why is plain text (grep-based) search often unreliable for C++ codebases?

- A) C++ files are always too large to search
- B) Complex include hierarchies, macros, templates, and overloads make textual matches noisy and misleading
- C) grep cannot read header files
- D) C++ does not support symbols

<!--answer: B-->
<!--explanation: C++ semantics — includes, macros, templates, and overloads — mean text matches are frequently incomplete or misleading, which is why semantic understanding via the C++ Language Server is preferred.-->

---

### 2. What is the single most important context enabler for the Microsoft C++ Language Server?

- A) A `.gitignore` file
- B) A `README.md` describing the project
- C) A `compile_commands.json` compilation database
- D) A list of open editor tabs

<!--answer: C-->
<!--explanation: `compile_commands.json` tells Copilot how the code is actually built — include paths, defines, standard, and target — which is what enables precise semantic results.-->

---

### 3. How do you generate `compile_commands.json` for a CMake project?

- A) Configure CMake with `-DCMAKE_EXPORT_COMPILE_COMMANDS=ON`
- B) Run `npm run build`
- C) Rename `CMakeLists.txt` to `compile_commands.json`
- D) It is created automatically by grep

<!--answer: A-->
<!--explanation: For CMake, enabling `CMAKE_EXPORT_COMPILE_COMMANDS` exports the compilation database. MSBuild projects use the MSBuild extractor sample until integrated support ships.-->

---

### 4. Which rule belongs in an embedded C++ `copilot-instructions.md` file?

- A) Prefer dynamic allocation everywhere for flexibility
- B) Use fixed-width types from `<cstdint>` and avoid dynamic allocation after initialization
- C) Always throw exceptions inside interrupt service routines
- D) Use `unsigned int` instead of `uint32_t` for portability

<!--answer: B-->
<!--explanation: Embedded conventions favor fixed-width `<cstdint>` types, RAII, and no dynamic allocation after init — exactly the durable rules to encode in an instruction file.-->

---

### 5. What are the four stages of the `@Modernize` agent workflow?

- A) Compile, Link, Test, Ship
- B) Assessment, Planning, Execution, Post-Upgrade Validation
- C) Plan, Code, Review, Merge
- D) Search, Replace, Build, Deploy

<!--answer: B-->
<!--explanation: The `@Modernize` agent follows Assessment (`assessment.md`), Planning (`plan.md`, approval required), Execution (tasks + rebuild to verify), and Post-Upgrade Validation (tests + PR review).-->

---

### 6. Why is `@Modernize` considered a good example of agent off-ramp design?

- A) It silently applies all fixes without telling the developer
- B) It generates an assessment for human review and stops for approval at each stage
- C) It never builds the project
- D) It removes the need for any human review

<!--answer: B-->
<!--explanation: `@Modernize` proposes an assessment and plan and requires approval before execution, keeping the human in the loop — a model worth copying in your own agent workflows.-->

---

*Quiz for Module 4: C++ for Hardware Developers — GitHub Copilot Developer Training*
