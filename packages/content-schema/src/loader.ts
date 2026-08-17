import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { parseSync } from "@slidev/parser";
import fg from "fast-glob";
import matter from "gray-matter";
import type { output, ZodTypeAny } from "zod";
import {
  characterSchema,
  complexTopicPlanSchema,
  labSchema,
  locationSchema,
  missionSchema,
  moduleSchema,
  productionStateSchema,
  sceneSchema,
  storyboardSchema,
  workshopSchema,
  type Character,
  type ComplexTopicPlan,
  type Lab,
  type Location,
  type Mission,
  type Module,
  type ProductionState,
  type Scene,
  type Storyboard,
  type Workshop
} from "./schemas.js";

export interface MarkdownDocument<T> {
  filePath: string;
  data: T;
  body: string;
}

export interface WorkshopCatalogEntry {
  root: string;
  workshop: MarkdownDocument<Workshop>;
  modules: MarkdownDocument<Module>[];
  labs: MarkdownDocument<Lab>[];
  missions: MarkdownDocument<Mission>[];
  storyboards: MarkdownDocument<Storyboard>[];
  scenes: MarkdownDocument<Scene>[];
  characters: MarkdownDocument<Character>[];
  locations: MarkdownDocument<Location>[];
  complexTopicPlans: MarkdownDocument<ComplexTopicPlan>[];
  productionState?: MarkdownDocument<ProductionState>;
}

export interface ContentCatalog {
  workshops: WorkshopCatalogEntry[];
}

export class ContentValidationError extends Error {
  constructor(public readonly issues: string[]) {
    super(`Content validation failed:\n${issues.map((issue) => `- ${issue}`).join("\n")}`);
  }
}

async function parseMarkdown<S extends ZodTypeAny>(
  filePath: string,
  schema: S
): Promise<MarkdownDocument<output<S>>> {
  const source = await readFile(filePath, "utf8");
  const parsed = matter(source);
  const result = schema.safeParse(parsed.data);
  if (!result.success) {
    const details = result.error.issues.map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`);
    throw new ContentValidationError(details.map((detail) => `${filePath}: ${detail}`));
  }

  return { filePath, data: result.data, body: parsed.content.trim() };
}

async function existingPath(filePath: string): Promise<boolean> {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

function resolveWorkshopPath(root: string, relativePath: string): string | undefined {
  const resolved = path.resolve(root, relativePath);
  const relative = path.relative(root, resolved);
  if (relative === "" || relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    return undefined;
  }
  return resolved;
}

function normalizedPath(filePath: string): string {
  const resolved = path.resolve(filePath);
  return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}

function agendaMinutes(start: string, end: string): number {
  const toMinutes = (value: string): number => {
    const [hours, minutes] = value.split(":").map(Number);
    return (hours ?? 0) * 60 + (minutes ?? 0);
  };
  return toMinutes(end) - toMinutes(start);
}

interface ManifestSlideContract {
  number: number;
  title: string;
  minutes?: number;
  rawMinutes?: string;
}

const speakerNoteSections = [
  "Timebox",
  "Talk track",
  "Transition",
  "Audience question",
  "Response guidance",
  "Payoff",
  "Sources"
] as const;

type SpeakerNoteSection = (typeof speakerNoteSections)[number];

function manifestSlideContracts(source: string): ManifestSlideContract[] {
  const rows = source
    .split(/\r?\n/)
    .filter((line) => line.trim().startsWith("|"))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  const header = rows.find((cells) => cells.some((cell) => cell.toLowerCase() === "exact source title"));
  const numberIndex = header?.findIndex((cell) => cell === "#") ?? -1;
  const titleIndex = header?.findIndex((cell) => cell.toLowerCase() === "exact source title") ?? -1;
  const minutesIndex = header?.findIndex((cell) => cell.toLowerCase() === "minutes") ?? -1;
  if (numberIndex < 0 || titleIndex < 0) return [];

  return rows
    .filter((cells) => /^\d+$/.test(cells[numberIndex] ?? ""))
    .map((cells) => {
      const rawMinutes = minutesIndex >= 0 ? cells[minutesIndex] : undefined;
      const minutes =
        rawMinutes !== undefined && /^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(rawMinutes)
          ? Number(rawMinutes)
          : undefined;
      return {
        number: Number(cells[numberIndex]),
        title: cells[titleIndex] ?? "",
        minutes,
        rawMinutes
      };
    });
}

function slideTitles(source: string): Array<{ title: string; start: number }> {
  const visibleSource = source.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~|<!--[\s\S]*?-->/g, (block) =>
    block.replace(/[^\r\n]/g, " ")
  );
  return Array.from(visibleSource.matchAll(/^#\s+(.+?)\s*$/gm), (match) => ({
    title: match[1] ?? "",
    start: match.index ?? 0
  }));
}

function visibleSlideSources(source: string, filePath: string): string[] {
  return parseSync(source, filePath).slides
    .filter((slide) => !slide.frontmatter.hide && !slide.frontmatter.disabled)
    .map((slide) => slide.raw);
}

interface ParsedSpeakerNotes {
  headings: Array<{ name: string; line: string; lineIndex: number }>;
  values: Partial<Record<SpeakerNoteSection, string>>;
}

function parseSpeakerNotes(source: string): ParsedSpeakerNotes {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const headings: ParsedSpeakerNotes["headings"] = [];

  for (const [lineIndex, line] of lines.entries()) {
    const trimmed = line.trim();
    const match = /^([^:]+):(.*)$/.exec(trimmed);
    if (!match) continue;

    const name = (match[1] ?? "").trim();
    const isRequiredHeading = speakerNoteSections.some(
      (section) => section.toLowerCase() === name.toLowerCase()
    );
    if (!isRequiredHeading) continue;

    headings.push({
      name,
      line: trimmed,
      lineIndex
    });
  }

  const values: ParsedSpeakerNotes["values"] = {};
  for (const [headingIndex, heading] of headings.entries()) {
    if (!speakerNoteSections.includes(heading.name as SpeakerNoteSection)) continue;
    const separatorIndex = lines[heading.lineIndex]?.indexOf(":") ?? -1;
    const firstLine = separatorIndex >= 0 ? lines[heading.lineIndex]?.slice(separatorIndex + 1) ?? "" : "";
    const nextHeadingLine = headings[headingIndex + 1]?.lineIndex ?? lines.length;
    values[heading.name as SpeakerNoteSection] = [
      firstLine,
      ...lines.slice(heading.lineIndex + 1, nextHeadingLine)
    ]
      .join("\n")
      .trim();
  }

  return { headings, values };
}

function canonicalMinutes(minutes: number): string {
  return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
}

async function validateGeneratedModule(
  root: string,
  module: MarkdownDocument<Module>,
  issues: string[]
): Promise<void> {
  if (!module.data.generation) return;
  const slidesPath = resolveWorkshopPath(root, module.data.slides);
  const manifestPath = resolveWorkshopPath(root, module.data.generation.manifest);
  if (!slidesPath || !manifestPath || !(await existingPath(slidesPath)) || !(await existingPath(manifestPath))) return;

  const [slidesSource, manifestSource] = await Promise.all([
    readFile(slidesPath, "utf8"),
    readFile(manifestPath, "utf8")
  ]);
  const visibleSlides = visibleSlideSources(slidesSource, slidesPath);
  const slides = visibleSlides.flatMap((slide) => slideTitles(slide));
  const manifestSlides = manifestSlideContracts(manifestSource);
  const expectedTitles = manifestSlides.map(({ title }) => title).filter(Boolean);
  const expectedSlides = module.data.generation.expectedSlides;

  if (visibleSlides.length !== expectedSlides) {
    issues.push(`${module.filePath}: expected ${expectedSlides} visible slides but found ${visibleSlides.length}`);
  }
  if (slides.length !== expectedSlides) {
    issues.push(`${module.filePath}: expected ${expectedSlides} slides but found ${slides.length} H1 slide titles`);
  }
  if (expectedTitles.length !== expectedSlides) {
    issues.push(
      `${module.data.generation.manifest}: expected ${expectedSlides} numbered manifest rows but found ${expectedTitles.length}`
    );
  }

  for (let index = 0; index < Math.min(slides.length, expectedTitles.length); index += 1) {
    if (slides[index]?.title !== expectedTitles[index]) {
      issues.push(
        `${module.filePath}: slide ${index + 1} title "${slides[index]?.title}" does not match manifest title "${expectedTitles[index]}"`
      );
    }
  }

  for (const manifestSlide of manifestSlides) {
    if (manifestSlide.minutes === undefined) {
      issues.push(
        `${module.data.generation.manifest}: manifest slide ${manifestSlide.number} has invalid Minutes value "${manifestSlide.rawMinutes ?? ""}"`
      );
    }
  }

  for (let index = 0; index < visibleSlides.length; index += 1) {
    const comments = Array.from((visibleSlides[index] ?? "").matchAll(/<!--([\s\S]*?)-->/g));
    if (comments.length !== 1) {
      issues.push(`${module.filePath}: slide ${index + 1} must have exactly one speaker-notes comment`);
      continue;
    }

    const trailingSource = (visibleSlides[index] ?? "")
      .slice((comments[0]?.index ?? 0) + (comments[0]?.[0].length ?? 0))
      .replace(/<style(?:\s[^>]*)?>[\s\S]*?<\/style>/gi, "")
      .trim();
    if (trailingSource.length > 0) {
      issues.push(
        `${module.filePath}: slide ${index + 1} speaker-notes comment must appear directly after the slide content`
      );
    }

    const parsedNotes = parseSpeakerNotes(comments[0]?.[1] ?? "");
    const exactHeadings = parsedNotes.headings.filter((heading) =>
      speakerNoteSections.includes(heading.name as SpeakerNoteSection)
    );

    for (const heading of parsedNotes.headings) {
      if (!speakerNoteSections.includes(heading.name as SpeakerNoteSection)) {
        issues.push(
          `${module.filePath}: slide ${index + 1} speaker notes contain unexpected or malformed section heading "${heading.name}:"`
        );
      }
    }

    let hasExactSectionSet = true;
    for (const section of speakerNoteSections) {
      const count = exactHeadings.filter((heading) => heading.name === section).length;
      if (count === 0) {
        hasExactSectionSet = false;
        issues.push(`${module.filePath}: slide ${index + 1} speaker notes are missing "${section}:"`);
      } else if (count > 1) {
        hasExactSectionSet = false;
        issues.push(`${module.filePath}: slide ${index + 1} speaker notes contain duplicate "${section}:" sections`);
      }
    }

    if (
      hasExactSectionSet &&
      exactHeadings.map(({ name }) => name).join("|") !== speakerNoteSections.join("|")
    ) {
      issues.push(
        `${module.filePath}: slide ${index + 1} speaker-note sections must appear in order: ${speakerNoteSections.map((section) => `${section}:`).join(", ")}`
      );
    }

    for (const section of speakerNoteSections) {
      if ((parsedNotes.values[section] ?? "").trim().length === 0) {
        issues.push(`${module.filePath}: slide ${index + 1} speaker-note section "${section}:" must not be blank`);
      }
    }

    const manifestMinutes = manifestSlides[index]?.minutes;
    if (manifestMinutes !== undefined) {
      const expectedTimebox = `Timebox: ${canonicalMinutes(manifestMinutes)}`;
      const timeboxHeading = exactHeadings.find(({ name }) => name === "Timebox");
      if (
        timeboxHeading?.line !== expectedTimebox ||
        parsedNotes.values.Timebox !== canonicalMinutes(manifestMinutes)
      ) {
        issues.push(
          `${module.filePath}: slide ${index + 1} Timebox must be "${expectedTimebox}" to match manifest Minutes`
        );
      }
    }
  }
}

async function loadMany<S extends ZodTypeAny>(
  pattern: string | string[],
  root: string,
  schema: S
): Promise<MarkdownDocument<output<S>>[]> {
  const paths = await fg(pattern, { cwd: root, absolute: true, onlyFiles: true });
  return Promise.all(paths.sort().map((filePath) => parseMarkdown(filePath, schema)));
}

export async function loadCatalog(repositoryRoot: string): Promise<ContentCatalog> {
  const workshopFiles = await fg("workshops/*/workshop.md", {
    cwd: repositoryRoot,
    absolute: true,
    onlyFiles: true
  });
  const workshops: WorkshopCatalogEntry[] = [];
  const issues: string[] = [];

  for (const workshopFile of workshopFiles.sort()) {
    try {
      const root = path.dirname(workshopFile);
      const [
        workshop,
        modules,
        labs,
        missions,
        storyboards,
        scenes,
        characters,
        locations,
        complexTopicPlans,
        productionStates
      ] = await Promise.all([
        parseMarkdown(workshopFile, workshopSchema),
        loadMany("content/modules/*/module.md", root, moduleSchema),
        loadMany(["content/labs/**/*.md", "!content/labs/**/README.md"], root, labSchema),
        loadMany(["content/missions/**/*.md", "!content/missions/**/README.md"], root, missionSchema),
        loadMany("content/storyboards/*/storyboard.md", root, storyboardSchema),
        loadMany("content/storyboards/*/scenes/*.md", root, sceneSchema),
        loadMany("content/characters/*/character.md", root, characterSchema),
        loadMany("content/locations/*/location.md", root, locationSchema),
        loadMany("content/modules/*/complex-topics.md", root, complexTopicPlanSchema),
        loadMany("content/production/production-state.md", root, productionStateSchema)
      ]);
      if (productionStates.length > 1) {
        issues.push(`${root}: only one content/production/production-state.md is allowed`);
      }
      workshops.push({
        root,
        workshop,
        modules,
        labs,
        missions,
        storyboards,
        scenes,
        characters,
        locations,
        complexTopicPlans,
        productionState: productionStates[0]
      });
    } catch (error) {
      if (error instanceof ContentValidationError) issues.push(...error.issues);
      else throw error;
    }
  }

  if (workshopFiles.length === 0) issues.push("No workshop.md files were found under workshops/*/");

  for (const entry of workshops) {
    if (path.basename(entry.root) !== entry.workshop.data.id) {
      issues.push(
        `${entry.workshop.filePath}: workshop id "${entry.workshop.data.id}" must match folder "${path.basename(entry.root)}"`
      );
    }
    const moduleIds = new Set(entry.modules.map(({ data }) => data.id));
    const declaredIds = new Set(entry.workshop.data.modules);
    if (moduleIds.size !== entry.modules.length) {
      issues.push(`${entry.workshop.filePath}: module ids must be unique within a workshop`);
    }
    const labIds = new Set(entry.labs.map(({ data }) => data.id));
    if (labIds.size !== entry.labs.length) {
      issues.push(`${entry.workshop.filePath}: lab ids must be unique within a workshop`);
    }
    const missionIds = new Set(entry.missions.map(({ data }) => data.id));
    if (missionIds.size !== entry.missions.length) {
      issues.push(`${entry.workshop.filePath}: mission ids must be unique within a workshop`);
    }
    const storyboardIds = new Set(entry.storyboards.map(({ data }) => data.id));
    if (storyboardIds.size !== entry.storyboards.length) {
      issues.push(`${entry.workshop.filePath}: storyboard ids must be unique within a workshop`);
    }
    const characterIds = new Set(entry.characters.map(({ data }) => data.id));
    if (characterIds.size !== entry.characters.length) {
      issues.push(`${entry.workshop.filePath}: character ids must be unique within a workshop`);
    }
    const locationIds = new Set(entry.locations.map(({ data }) => data.id));
    if (locationIds.size !== entry.locations.length) {
      issues.push(`${entry.workshop.filePath}: location ids must be unique within a workshop`);
    }

    for (const [variantIndex, variant] of (entry.workshop.data.deliveryVariants ?? []).entries()) {
      const phaseMinutes = new Map<string, { content: number; mission: number }>();
      for (const [dayIndex, day] of variant.days.entries()) {
        for (const [blockIndex, block] of day.agenda.entries()) {
          if (!block.module) continue;
          if (!declaredIds.has(block.module)) {
            issues.push(
              `${entry.workshop.filePath}: deliveryVariants.${variantIndex}.days.${dayIndex}.agenda.${blockIndex}.module references undeclared module "${block.module}"`
            );
            continue;
          }
          const aggregate = phaseMinutes.get(block.module) ?? { content: 0, mission: 0 };
          const minutes = agendaMinutes(block.start, block.end);
          if (block.type === "module-content") aggregate.content += minutes;
          if (block.type === "mission") aggregate.mission += minutes;
          phaseMinutes.set(block.module, aggregate);
        }
      }
      for (const moduleId of entry.workshop.data.modules) {
        const module = entry.modules.find(({ data }) => data.id === moduleId);
        if (!module?.data.timing || module.data.totalMinutes === undefined) continue;
        const aggregate = phaseMinutes.get(moduleId) ?? { content: 0, mission: 0 };
        const expectedContent = module.data.totalMinutes - module.data.timing.missionMinutes;
        if (aggregate.content !== expectedContent) {
          issues.push(
            `${entry.workshop.filePath}: delivery variant "${variant.id}" module-content minutes for "${moduleId}" (${aggregate.content}) must equal ${expectedContent}`
          );
        }
        if (aggregate.mission !== module.data.timing.missionMinutes) {
          issues.push(
            `${entry.workshop.filePath}: delivery variant "${variant.id}" mission minutes for "${moduleId}" (${aggregate.mission}) must equal ${module.data.timing.missionMinutes}`
          );
        }
      }
    }

    if (entry.workshop.data.lifecycleVersion === 2) {
      if (!entry.productionState) {
        issues.push(`${entry.workshop.filePath}: lifecycle v2 requires content/production/production-state.md`);
      } else {
        if (entry.productionState.data.workshop !== entry.workshop.data.id) {
          issues.push(
            `${entry.productionState.filePath}: workshop "${entry.productionState.data.workshop}" must match "${entry.workshop.data.id}"`
          );
        }
        const lifecycleArtifacts = [
          ...entry.productionState.data.approvedArtifacts,
          ...entry.productionState.data.activeTracks.flatMap((track) => (track.artifact ? [track.artifact] : [])),
          entry.productionState.data.timing.source
        ];
        for (const referencedPath of lifecycleArtifacts) {
          const resolved = resolveWorkshopPath(entry.root, referencedPath);
          if (!resolved) {
            issues.push(`${entry.productionState.filePath}: referenced path escapes the workshop root: ${referencedPath}`);
          } else if (!(await existingPath(resolved))) {
            issues.push(`${entry.productionState.filePath}: lifecycle artifact does not exist: ${referencedPath}`);
          }
        }
      }

      for (const module of entry.modules) {
        if (module.data.totalMinutes === undefined || !module.data.timing) {
          issues.push(`${module.filePath}: lifecycle v2 requires totalMinutes and timing`);
        }
      }
      const moduleMinutes = entry.modules.reduce((total, module) => total + (module.data.totalMinutes ?? 0), 0);
      if (
        entry.workshop.data.totalMinutes !== undefined &&
        moduleMinutes > entry.workshop.data.totalMinutes
      ) {
        issues.push(
          `${entry.workshop.filePath}: module minutes (${moduleMinutes}) exceed workshop totalMinutes (${entry.workshop.data.totalMinutes})`
        );
      }
      if (entry.workshop.data.schedule) {
        const aggregateModuleTiming = entry.modules.reduce(
          (aggregate, module) => {
            if (!module.data.timing) return aggregate;
            for (const key of Object.keys(aggregate) as Array<keyof typeof aggregate>) {
              aggregate[key] += module.data.timing[key];
            }
            return aggregate;
          },
          {
            instructionMinutes: 0,
            missionMinutes: 0,
            discussionMinutes: 0,
            mediaPlaybackMinutes: 0,
            setupAndTransitionsMinutes: 0,
            breaksMinutes: 0,
            contingencyMinutes: 0
          }
        );
        for (const key of Object.keys(aggregateModuleTiming) as Array<keyof typeof aggregateModuleTiming>) {
          if (aggregateModuleTiming[key] > entry.workshop.data.schedule[key]) {
            issues.push(
              `${entry.workshop.filePath}: module ${key} (${aggregateModuleTiming[key]}) exceeds workshop schedule (${entry.workshop.data.schedule[key]})`
            );
          }
        }
        if (entry.workshop.data.runOfShow) {
          const moduleBlocks = entry.workshop.data.runOfShow.filter((block) => block.type === "module");
          for (const module of entry.modules) {
            const matchingBlocks = moduleBlocks.filter((block) => block.module === module.data.id);
            if (matchingBlocks.length !== 1) {
              issues.push(
                `${entry.workshop.filePath}: runOfShow must contain exactly one module block for "${module.data.id}"`
              );
            } else if (
              module.data.totalMinutes !== undefined &&
              matchingBlocks[0]?.minutes !== module.data.totalMinutes
            ) {
              issues.push(
                `${entry.workshop.filePath}: runOfShow block for "${module.data.id}" must equal ${module.data.totalMinutes} minutes`
              );
            }
          }
        }
      }
    }

    for (const moduleId of entry.workshop.data.modules) {
      if (!moduleIds.has(moduleId)) {
        issues.push(`${entry.workshop.filePath}: declared module "${moduleId}" has no content/modules/*/module.md`);
      }
    }
    for (const module of entry.modules) {
      if (!declaredIds.has(module.data.id)) {
        issues.push(`${module.filePath}: module "${module.data.id}" is not listed in workshop.md`);
      }
      const labPaths = new Set(entry.labs.map(({ filePath }) => normalizedPath(filePath)));
      const missionPaths = new Map(
        entry.missions.map((mission) => [normalizedPath(mission.filePath), mission] as const)
      );
      const generatedReferences = module.data.generation ? [module.data.generation.manifest] : [];
      for (const referencedPath of [
        module.data.slides,
        ...module.data.sourceDocuments,
        ...generatedReferences,
        ...module.data.labs,
        ...module.data.missions,
        ...module.data.assets
      ]) {
        const resolved = resolveWorkshopPath(entry.root, referencedPath);
        if (!resolved) {
          issues.push(`${module.filePath}: referenced path escapes the workshop root: ${referencedPath}`);
        } else if (!(await existingPath(resolved))) {
          issues.push(`${module.filePath}: referenced path does not exist: ${referencedPath}`);
        }
      }
      for (const referencedPath of module.data.labs) {
        const resolved = resolveWorkshopPath(entry.root, referencedPath);
        if (resolved && (await existingPath(resolved)) && !labPaths.has(normalizedPath(resolved))) {
          issues.push(`${module.filePath}: lab reference does not point to a validated lab: ${referencedPath}`);
        }
      }
      for (const referencedPath of module.data.missions) {
        const resolved = resolveWorkshopPath(entry.root, referencedPath);
        const mission = resolved ? missionPaths.get(normalizedPath(resolved)) : undefined;
        if (resolved && (await existingPath(resolved)) && !mission) {
          issues.push(`${module.filePath}: mission reference does not point to a validated mission: ${referencedPath}`);
        } else if (mission) {
          if (mission.data.module !== module.data.id) {
            issues.push(
              `${mission.filePath}: mission module "${mission.data.module}" must match "${module.data.id}"`
            );
          }
          for (const objectiveRef of mission.data.objectiveRefs) {
            if (!module.data.objectives.includes(objectiveRef)) {
              issues.push(`${mission.filePath}: objectiveRef does not match a module objective: ${objectiveRef}`);
            }
          }
        }
      }
      const moduleComplexTopicPlans = entry.complexTopicPlans.filter((plan) => plan.data.module === module.data.id);
      if (moduleComplexTopicPlans.length > 1) {
        issues.push(`${module.filePath}: only one complex-topics.md plan is allowed per module`);
      }
      for (const plan of moduleComplexTopicPlans) {
        for (const topic of plan.data.topics) {
          if (!module.data.objectives.includes(topic.objectiveRef)) {
            issues.push(`${plan.filePath}: complex topic objectiveRef does not match a module objective: ${topic.objectiveRef}`);
          }
        }
      }
      await validateGeneratedModule(entry.root, module, issues);
    }
    const characterPaths = new Set(entry.characters.map(({ filePath }) => normalizedPath(filePath)));
    const scenePaths = new Set(entry.scenes.map(({ filePath }) => normalizedPath(filePath)));
    for (const storyboard of entry.storyboards) {
      for (const referencedPath of storyboard.data.characters) {
        const resolved = resolveWorkshopPath(entry.root, referencedPath);
        if (!resolved) {
          issues.push(`${storyboard.filePath}: referenced path escapes the workshop root: ${referencedPath}`);
        } else if (!(await existingPath(resolved))) {
          issues.push(`${storyboard.filePath}: referenced path does not exist: ${referencedPath}`);
        } else if (!characterPaths.has(normalizedPath(resolved))) {
          issues.push(`${storyboard.filePath}: character reference does not point to a validated character: ${referencedPath}`);
        }
      }
      for (const referencedPath of storyboard.data.scenes) {
        const resolved = resolveWorkshopPath(entry.root, referencedPath);
        if (!resolved) {
          issues.push(`${storyboard.filePath}: referenced path escapes the workshop root: ${referencedPath}`);
        } else if (!(await existingPath(resolved))) {
          issues.push(`${storyboard.filePath}: referenced path does not exist: ${referencedPath}`);
        } else if (!scenePaths.has(normalizedPath(resolved))) {
          issues.push(`${storyboard.filePath}: scene reference does not point to a validated scene: ${referencedPath}`);
        }
      }
    }
    for (const character of entry.characters) {
      for (const referencedPath of character.data.referenceImages) {
        const resolved = resolveWorkshopPath(entry.root, referencedPath);
        if (!resolved) {
          issues.push(`${character.filePath}: referenced path escapes the workshop root: ${referencedPath}`);
        } else if (!(await existingPath(resolved))) {
          issues.push(`${character.filePath}: referenced path does not exist: ${referencedPath}`);
        }
      }
      for (const location of entry.locations) {
        for (const moduleId of location.data.usedByModules) {
          if (!moduleIds.has(moduleId)) {
            issues.push(`${location.filePath}: usedByModules references unknown module "${moduleId}"`);
          }
        }
        for (const referencedPath of location.data.referenceImages) {
          const resolved = resolveWorkshopPath(entry.root, referencedPath);
          if (!resolved) {
            issues.push(`${location.filePath}: referenced path escapes the workshop root: ${referencedPath}`);
          } else if (!(await existingPath(resolved))) {
            issues.push(`${location.filePath}: referenced file does not exist: ${referencedPath}`);
          }
        }
      }
    }
  }

  const ids = new Set<string>();
  for (const entry of workshops) {
    if (ids.has(entry.workshop.data.id)) issues.push(`Duplicate workshop id: ${entry.workshop.data.id}`);
    ids.add(entry.workshop.data.id);
  }

  if (issues.length > 0) throw new ContentValidationError(issues);
  return { workshops };
}
