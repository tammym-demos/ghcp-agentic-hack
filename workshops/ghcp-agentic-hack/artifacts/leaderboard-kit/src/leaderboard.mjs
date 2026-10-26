import path from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

export const ISSUE_HEADINGS = Object.freeze({
  alias: 'Opt-in Alias',
  module: 'Module',
  core: 'Core Points',
  bonus: 'Bonus Points',
  selfReport: 'Self-Report Acknowledgement',
  privacy: 'Privacy Acknowledgement'
});

const EVENT_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Renders an instant as a calendar date in the event timezone. `en-CA` is used because it
 * formats as YYYY-MM-DD natively, which avoids assembling the parts by hand.
 */
export function formatDateInTimeZone(timestampMs, timeZone) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(timestampMs));
}

/**
 * The calendar day in the event timezone is the event. An explicit `event.date` pins the
 * current event for a rehearsal or a hack that runs past local midnight; without it the
 * board rolls over on its own and no per-event edit is ever needed.
 */
export function resolveEventDate(config, now = Date.now()) {
  if (config.event.date) return config.event.date;
  return formatDateInTimeZone(now, config.event.timeZone);
}

/**
 * A board is closed only on the exact day the facilitator closed it. Tying the closed state
 * to a date rather than a boolean means a value left over from a previous hack is ignored
 * automatically, so the next hack can never open onto a board that announces itself closed.
 */
export function resolveEventState(config, eventDate) {
  return config.event.closedOn === eventDate ? 'closed' : 'open';
}

export function buildEventId(config, eventDate) {
  return `${config.event.slug}-${eventDate}`;
}

const REQUIRED_MODULE_IDS = ['foundations', 'agentic', 'advanced'];

export async function readJsonFile(filePath) {
  const text = await readFile(filePath, 'utf8');
  return JSON.parse(text);
}

export async function loadConfig(configPath) {
  const config = await readJsonFile(configPath);
  validateConfig(config, configPath);
  return config;
}

export function validateConfig(config, sourceLabel = 'config') {
  if (!config || typeof config !== 'object') {
    throw new Error(`${sourceLabel}: expected JSON object.`);
  }

  const modules = Array.isArray(config.modules) ? config.modules : [];
  const moduleIds = modules.map((module) => module?.id);

  if (REQUIRED_MODULE_IDS.length !== modules.length || REQUIRED_MODULE_IDS.some((id, index) => moduleIds[index] !== id)) {
    throw new Error(`${sourceLabel}: modules must be Foundations, Agentic, and Advanced in order.`);
  }

  if (!config.event?.slug || !/^[a-z0-9-]+$/.test(config.event.slug)) {
    throw new Error(`${sourceLabel}: event.slug must be lowercase kebab-case.`);
  }

  if (typeof config.event?.timeZone !== 'string' || config.event.timeZone === '') {
    throw new Error(`${sourceLabel}: event.timeZone is required, for example America/New_York.`);
  }

  try {
    new Intl.DateTimeFormat('en-CA', { timeZone: config.event.timeZone });
  } catch {
    throw new Error(`${sourceLabel}: event.timeZone must be a valid IANA time zone.`);
  }

  if (config.event.date !== undefined && !EVENT_DATE_PATTERN.test(config.event.date)) {
    throw new Error(`${sourceLabel}: event.date must be omitted or a YYYY-MM-DD calendar date.`);
  }

  if (config.event.closedOn !== undefined && config.event.closedOn !== null && !EVENT_DATE_PATTERN.test(config.event.closedOn)) {
    throw new Error(`${sourceLabel}: event.closedOn must be omitted or a YYYY-MM-DD calendar date.`);
  }

  if (!config.labels?.submission || !config.labels?.verified) {
    throw new Error(`${sourceLabel}: labels.submission and labels.verified are required.`);
  }

  if (!Number.isInteger(config.aliasPolicy?.minLength) || !Number.isInteger(config.aliasPolicy?.maxLength)) {
    throw new Error(`${sourceLabel}: aliasPolicy minLength and maxLength are required integers.`);
  }

  if (typeof config.aliasPolicy?.pattern !== 'string' || config.aliasPolicy.pattern.length === 0) {
    throw new Error(`${sourceLabel}: aliasPolicy.pattern must be a non-empty regular expression.`);
  }

  try {
    new RegExp(config.aliasPolicy.pattern);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`${sourceLabel}: aliasPolicy.pattern must be a valid regular expression.`);
    }
    throw error;
  }

  const maxCumulative = Number(config.scoreboard?.maxCumulative);
  const computedMax = modules.reduce((sum, module) => sum + module.core.max + module.bonus.max, 0);
  if (maxCumulative !== computedMax || maxCumulative !== 180) {
    throw new Error(`${sourceLabel}: scoreboard.maxCumulative must equal 180.`);
  }

  if (config.pages?.refreshSeconds !== undefined) {
    const refreshSeconds = config.pages.refreshSeconds;
    if (!Number.isInteger(refreshSeconds) || refreshSeconds < 15 || refreshSeconds > 600) {
      throw new Error(`${sourceLabel}: pages.refreshSeconds must be an integer between 15 and 600.`);
    }
  }

  for (const module of modules) {
    validateModule(module, sourceLabel);
  }
}

function validateModule(module, sourceLabel) {
  if (!module?.id || !module?.name) {
    throw new Error(`${sourceLabel}: each module needs id and name.`);
  }

  validateScoreBand(module.core, `${sourceLabel}: ${module.id} core`, true);
  validateScoreBand(module.bonus, `${sourceLabel}: ${module.id} bonus`, false);

  if (module.core.completion !== 40) {
    throw new Error(`${sourceLabel}: ${module.id} core completion must be 40.`);
  }
}

function validateScoreBand(band, label, hasCompletion) {
  if (
    !band ||
    !Number.isInteger(band.min) ||
    !Number.isInteger(band.max) ||
    !Number.isInteger(band.step) ||
    band.step <= 0
  ) {
    throw new Error(`${label} band is invalid.`);
  }

  if (hasCompletion && !Number.isInteger(band.completion)) {
    throw new Error(`${label} completion is invalid.`);
  }
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function normalizeAlias(alias) {
  return String(alias ?? '')
    .trim()
    .replace(/\s+/g, ' ');
}

export function parseIssueFormBody(body) {
  const normalized = String(body ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const sections = new Map();
  const knownHeadings = new Set(Object.values(ISSUE_HEADINGS));
  const lines = normalized.split('\n');
  let currentHeading = null;
  let buffer = [];

  for (const line of lines) {
    if (line.startsWith('### ')) {
      if (currentHeading && knownHeadings.has(currentHeading)) {
        sections.set(currentHeading, buffer.join('\n').trim());
      }

      currentHeading = line.slice(4).trim();
      buffer = [];
    } else if (currentHeading) {
      buffer.push(line);
    }
  }

  if (currentHeading && knownHeadings.has(currentHeading)) {
    sections.set(currentHeading, buffer.join('\n').trim());
  }

  return sections;
}

export function evaluateIssueSubmission(issue, config) {
  const sections = parseIssueFormBody(issue?.body);
  const labels = extractLabelNames(issue?.labels);
  const reasons = [];
  const modulesByKey = createModuleLookup(config.modules);
  const alias = normalizeAlias(sections.get(ISSUE_HEADINGS.alias));
  const moduleKey = normalizeLookupKey(sections.get(ISSUE_HEADINGS.module));
  const moduleConfig = modulesByKey.get(moduleKey);
  const moduleId = moduleConfig?.id ?? null;
  const core = parseIntegerField(sections.get(ISSUE_HEADINGS.core));
  const bonus = parseIntegerField(sections.get(ISSUE_HEADINGS.bonus));
  const authorKey = getAuthorKey(issue);
  const updatedAtMs = Date.parse(issue?.updated_at ?? issue?.created_at ?? '1970-01-01T00:00:00.000Z');
  const createdAtMs = Date.parse(issue?.created_at ?? '1970-01-01T00:00:00.000Z') || 0;
  const aliasPattern = new RegExp(config.aliasPolicy.pattern);

  for (const heading of Object.values(ISSUE_HEADINGS)) {
    if (!sections.has(heading)) {
      reasons.push(`Missing heading: ${heading}`);
    }
  }

  if (alias.length < config.aliasPolicy.minLength || alias.length > config.aliasPolicy.maxLength || !aliasPattern.test(alias)) {
    reasons.push('Alias does not match configured policy.');
  }

  if (!moduleConfig) {
    reasons.push('Module is not recognized.');
  }

  validateScore(core, moduleConfig?.core, 'Core points', reasons);
  validateScore(bonus, moduleConfig?.bonus, 'Bonus points', reasons);

  if (!isChecked(sections.get(ISSUE_HEADINGS.selfReport))) {
    reasons.push('Self-report acknowledgement is required.');
  }

  if (!isChecked(sections.get(ISSUE_HEADINGS.privacy))) {
    reasons.push('Privacy acknowledgement is required.');
  }

  const total = Number.isInteger(core) && Number.isInteger(bonus) ? core + bonus : null;

  return {
    issueNumber: issue?.number ?? 0,
    authorKey,
    updatedAtMs: Number.isFinite(updatedAtMs) ? updatedAtMs : 0,
    createdAtMs,
    eventDate: formatDateInTimeZone(createdAtMs, config.event.timeZone),
    state: issue?.state === 'closed' ? 'closed' : 'open',
    labels,
    verified: labels.includes(config.labels.verified),
    valid: reasons.length === 0,
    reasons,
    alias,
    moduleId,
    moduleName: moduleConfig?.name ?? null,
    core,
    bonus,
    total,
    completed: Boolean(moduleConfig && Number.isInteger(core) && core >= moduleConfig.core.completion)
  };
}

function createModuleLookup(modules) {
  const lookup = new Map();
  for (const module of modules) {
    lookup.set(normalizeLookupKey(module.id), module);
    lookup.set(normalizeLookupKey(module.name), module);
  }
  return lookup;
}

function normalizeLookupKey(value) {
  return String(value ?? '').trim().toLowerCase();
}

function getAuthorKey(issue) {
  if (issue?.user?.id !== undefined && issue?.user?.id !== null) {
    return `user:${issue.user.id}`;
  }

  if (issue?.user?.login) {
    return `login:${issue.user.login}`;
  }

  return 'unknown-user';
}

function extractLabelNames(labels) {
  if (!Array.isArray(labels)) {
    return [];
  }

  return labels
    .map((label) => (typeof label === 'string' ? label : label?.name))
    .filter((label) => typeof label === 'string');
}

function parseIntegerField(value) {
  const text = String(value ?? '').trim();
  if (!/^\d+$/.test(text)) {
    return null;
  }

  return Number.parseInt(text, 10);
}

function validateScore(value, band, label, reasons) {
  if (!band || !Number.isInteger(value)) {
    reasons.push(`${label} must be an integer.`);
    return;
  }

  if (value < band.min || value > band.max) {
    reasons.push(`${label} is out of range.`);
    return;
  }

  if ((value - band.min) % band.step !== 0) {
    reasons.push(`${label} must use ${band.step}-point increments.`);
  }
}

function isChecked(value) {
  return /\[[xX]\]/.test(String(value ?? ''));
}

export function aggregateLeaderboard({ issues, config, now = Date.now() }) {
  validateConfig(config, 'config');

  const currentEventDate = resolveEventDate(config, now);
  const evaluated = issues.map((issue) => evaluateIssueSubmission(issue, config));
  const byEventDate = new Map();

  for (const submission of evaluated) {
    const bucket = byEventDate.get(submission.eventDate) ?? [];
    bucket.push(submission);
    byEventDate.set(submission.eventDate, bucket);
  }

  const current = buildEventReport({
    config,
    eventDate: currentEventDate,
    state: resolveEventState(config, currentEventDate),
    submissions: byEventDate.get(currentEventDate) ?? []
  });

  /*
   * Every earlier day that still has someone on the board becomes a read-only archive.
   * The test is a published participant rather than merely a valid submission, because a day
   * whose only submissions were later withdrawn has nothing to show and would otherwise
   * publish an empty phantom event. Archives always render closed so their winners are
   * announced even if the facilitator never closed the board on the day.
   */
  const pastEvents = [...byEventDate.entries()]
    .filter(([eventDate]) => eventDate < currentEventDate)
    .sort(([left], [right]) => right.localeCompare(left))
    .map(([eventDate, submissions]) => buildEventReport({ config, eventDate, state: 'closed', submissions }))
    .filter((past) => past.summary.publishedParticipants > 0 || past.summary.withheldParticipants > 0);

  return { ...current, pastEvents, totalIssuesScanned: issues.length };
}

function buildEventReport({ config, eventDate, state, submissions }) {
  const valid = submissions.filter((submission) => submission.valid);
  const latestByAuthorEventModule = new Map();

  for (const submission of valid) {
    const dedupeKey = `${submission.authorKey}::${submission.eventDate}::${submission.moduleId}`;
    const previous = latestByAuthorEventModule.get(dedupeKey);
    if (!previous || compareSubmissionRecency(submission, previous) > 0) {
      latestByAuthorEventModule.set(dedupeKey, submission);
    }
  }

  const selected = [...latestByAuthorEventModule.values()];
  const active = selected.filter((submission) => submission.state !== 'closed');
  const participants = buildParticipants(active, config.modules);
  const conflictedAliases = findConflictedAliases(participants);
  const publishedParticipants = participants.filter((participant) => !conflictedAliases.has(participant.aliasKey));
  const provisionalRows = rankRows(
    publishedParticipants.map((participant) => buildStandingRow(participant, config.modules, false)),
    'totalScore'
  );
  const verifiedRows = rankRows(
    publishedParticipants
      .map((participant) => buildStandingRow(participant, config.modules, true)),
    'verifiedTotalScore'
  );
  const eligibleRows = verifiedRows.filter((row) => row.eligibleForWinner);
  const winners = state === 'closed' ? selectWinners(eligibleRows) : [];

  return {
    generatedAt: new Date().toISOString(),
    event: {
      id: buildEventId(config, eventDate),
      slug: config.event.slug,
      date: eventDate,
      name: config.event.name,
      timeZone: config.event.timeZone,
      state
    },
    pages: config.pages,
    labels: config.labels,
    modules: config.modules,
    scoreboard: config.scoreboard,
    provisionalStandings: provisionalRows,
    verifiedStandings: verifiedRows,
    winners,
    summary: {
      issuesScanned: submissions.length,
      validIssues: valid.length,
      invalidIssues: submissions.length - valid.length,
      selectedModuleSubmissions: selected.length,
      withdrawnModuleSubmissions: selected.filter((submission) => submission.state === 'closed').length,
      publishedParticipants: publishedParticipants.length,
      withheldParticipants: participants.length - publishedParticipants.length
    }
  };
}

function compareSubmissionRecency(left, right) {
  if (left.updatedAtMs !== right.updatedAtMs) {
    return left.updatedAtMs - right.updatedAtMs;
  }

  if (left.issueNumber !== right.issueNumber) {
    return left.issueNumber - right.issueNumber;
  }

  return left.createdAtMs - right.createdAtMs;
}

function buildParticipants(submissions, modules) {
  const byAuthor = new Map();

  for (const submission of submissions) {
    let participant = byAuthor.get(submission.authorKey);
    if (!participant) {
      participant = {
        modules: new Map(),
        latestAlias: '',
        latestAliasUpdatedAtMs: -1
      };
      byAuthor.set(submission.authorKey, participant);
    }

    participant.modules.set(submission.moduleId, submission);

    if (submission.updatedAtMs > participant.latestAliasUpdatedAtMs) {
      participant.latestAlias = submission.alias;
      participant.latestAliasUpdatedAtMs = submission.updatedAtMs;
    }
  }

  return [...byAuthor.values()]
    .filter((participant) => participant.modules.size > 0)
    .map((participant) => ({
      ...participant,
      alias: participant.latestAlias,
      aliasKey: normalizeLookupKey(participant.latestAlias),
      orderedModules: modules.map((module) => participant.modules.get(module.id) ?? null)
    }));
}

function findConflictedAliases(participants) {
  const counts = new Map();

  for (const participant of participants) {
    counts.set(participant.aliasKey, (counts.get(participant.aliasKey) ?? 0) + 1);
  }

  return new Set([...counts.entries()].filter(([, count]) => count > 1).map(([aliasKey]) => aliasKey));
}

function buildStandingRow(participant, modules, verifiedOnly) {
  const moduleScores = {};
  let total = 0;
  let completedModuleCount = 0;
  let allModulesCompleted = true;
  let allModulesPresent = true;
  let includedModuleCount = 0;
  let earliestCreatedAtMs = Infinity;

  for (const module of modules) {
    const submission = participant.modules.get(module.id);
    if (submission && submission.createdAtMs < earliestCreatedAtMs) {
      earliestCreatedAtMs = submission.createdAtMs;
    }

    const included = Boolean(submission && (!verifiedOnly || submission.verified));
    const cell = included
      ? {
          core: submission.core,
          bonus: submission.bonus,
          total: submission.total,
          verified: submission.verified,
          completed: submission.completed
        }
      : null;

    moduleScores[module.id] = cell;

    if (included) {
      includedModuleCount += 1;
      total += submission.total;
      if (submission.completed) {
        completedModuleCount += 1;
      } else {
        allModulesCompleted = false;
      }
    } else {
      allModulesCompleted = false;
      allModulesPresent = false;
    }
  }

  return {
    alias: participant.alias,
    aliasKey: participant.aliasKey,
    moduleScores,
    totalScore: verifiedOnly ? 0 : total,
    verifiedTotalScore: verifiedOnly ? total : 0,
    includedModuleCount,
    completedModuleCount,
    allModulesCompleted: !verifiedOnly && allModulesCompleted && allModulesPresent,
    eligibleForWinner: verifiedOnly && allModulesCompleted && allModulesPresent,
    earliestCreatedAtMs
  };
}

function rankRows(rows, totalKey) {
  const sorted = rows.sort((left, right) => {
    if (right[totalKey] !== left[totalKey]) {
      return right[totalKey] - left[totalKey];
    }

    if (left.earliestCreatedAtMs !== right.earliestCreatedAtMs) {
      return left.earliestCreatedAtMs - right.earliestCreatedAtMs;
    }

    return left.alias.localeCompare(right.alias, 'en', { sensitivity: 'base' });
  });

  let lastRankKey = null;
  let lastRank = 0;

  return sorted.map((row, index) => {
    const rankKey = `${row[totalKey]}::${row.earliestCreatedAtMs}`;
    const rank = rankKey === lastRankKey ? lastRank : index + 1;
    lastRankKey = rankKey;
    lastRank = rank;
    return { ...row, rank };
  });
}

function selectWinners(rows) {
  if (rows.length === 0) {
    return [];
  }

  const highestScore = Math.max(...rows.map((row) => row.verifiedTotalScore));
  return rows
    .filter((row) => row.verifiedTotalScore === highestScore)
    .map((row) => ({
      alias: row.alias,
      verifiedTotalScore: row.verifiedTotalScore
    }));
}

export function createPublicReport(report) {
  return {
    generatedAt: report.generatedAt,
    event: report.event,
    pages: report.pages,
    labels: {
      verified: report.labels.verified
    },
    scoring: {
      maxCumulative: report.scoreboard.maxCumulative,
      modules: report.modules.map((module) => ({
        id: module.id,
        name: module.name,
        core: module.core,
        bonus: module.bonus
      }))
    },
    summary: report.summary,
    pastEvents: (report.pastEvents ?? []).map((past) => ({ id: past.event.id, date: past.event.date })),
    provisionalStandings: report.provisionalStandings.map((row) => sanitizeStandingRow(row, false)),
    verifiedStandings: report.verifiedStandings.map((row) => sanitizeStandingRow(row, true)),
    winners: report.winners
  };
}

function sanitizeStandingRow(row, verifiedOnly) {
  return {
    rank: row.rank,
    alias: row.alias,
    total: verifiedOnly ? row.verifiedTotalScore : row.totalScore,
    completedModuleCount: row.completedModuleCount,
    allModulesCompleted: verifiedOnly ? row.eligibleForWinner : row.allModulesCompleted,
    moduleScores: row.moduleScores
  };
}

export function buildHtml(report, options = {}) {
  const archive = options.archive === true;
  const eventDate = escapeHtml(report.event?.date ?? '');
  const title = escapeHtml(archive && eventDate ? `${report.pages.title} — ${report.event.date}` : report.pages.title);
  const description = escapeHtml(report.pages.description);
  const state = escapeHtml(report.event.state);
  const verifiedLabel = escapeHtml(report.labels.verified);
  const modules = report.modules;
  const maxCumulative = report.scoreboard.maxCumulative;
  const rows = report.provisionalStandings;
  const verifiedByAlias = new Map(report.verifiedStandings.map((row) => [row.aliasKey, row]));
  const scoringRules = report.modules
    .map(
      (module) =>
        `<li><strong>${escapeHtml(module.name)}</strong>: core ${module.core.min}-${module.core.max}, bonus ${module.bonus.min}-${module.bonus.max}, ${module.core.step}-point increments, completion at ${module.core.completion} core.</li>`
    )
    .join('');
  const board = renderBoard(rows, modules, verifiedByAlias, maxCumulative);
  const winnerSection = renderWinnerSection(report);
  const refreshSeconds = report.pages.refreshSeconds;
  // An archived board is final, so it never needs to poll for updates.
  const refreshTag = !archive && Number.isInteger(refreshSeconds) && refreshSeconds >= 15 && refreshSeconds <= 600
    ? `\n  <meta http-equiv="refresh" content="${refreshSeconds}">`
    : '';
  const refreshNote = refreshTag
    ? `This page refreshes itself every ${refreshSeconds} seconds.`
    : 'Reload this page to pick up the latest scores.';
  const pastEventCount = (report.pastEvents ?? []).length;
  const nav = archive
    ? '<p class="nav"><a href="../../">&larr; Current leaderboard</a> &middot; <a href="../">All past events</a></p>'
    : pastEventCount > 0
      ? `<p class="nav"><a href="events/">Past events (${pastEventCount})</a></p>`
      : '';

  const playerCount = rows.length;
  const topScore = rows.length > 0 ? rows[0].totalScore : 0;
  const finishedCount = rows.filter((row) => row.allModulesCompleted).length;
  const headline = playerCount === 0
    ? 'Waiting for the first score.'
    : `${playerCount} ${playerCount === 1 ? 'player' : 'players'} on the board &middot; top score ${topScore} of ${maxCumulative} &middot; ${finishedCount} ${finishedCount === 1 ? 'has' : 'have'} finished all ${modules.length}`;
  const generatedAt = escapeHtml(report.generatedAt ?? '');
  const updatedMarkup = generatedAt
    ? `<time id="updated-at" datetime="${generatedAt}">${generatedAt.replace('T', ' ').replace(/\..*$/, '')} UTC</time>`
    : 'unknown';
  const closedNote = report.event.state === 'closed'
    ? '<p class="banner">This event is closed. Final results are below.</p>'
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">${refreshTag}
  <title>${title}</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; font-size: clamp(1rem, 0.6rem + 0.55vw, 1.5rem); line-height: 1.5; margin: 0; padding: 2rem 1.5rem 3rem; background: #ffffff; color: #1f2328; }
    main { max-width: 1600px; margin: 0 auto; }
    h1 { font-size: clamp(2rem, 1rem + 2.4vw, 3.6rem); margin: 0 0 0.25rem; letter-spacing: -0.02em; }
    h2 { font-size: clamp(1.3rem, 0.9rem + 1vw, 2rem); margin: 0 0 0.5rem; }
    .card { background: #ffffff; border: 1px solid #d0d7de; border-radius: 14px; padding: 1.25rem 1.5rem; margin-bottom: 1.25rem; }
    .headline { font-size: 1.05em; color: #1a7f37; font-weight: 600; margin: 0.5rem 0 0; }
    .banner { background: #dafbe1; border: 1px solid #1a7f37; border-radius: 10px; padding: 0.6rem 0.9rem; margin: 0.75rem 0 0; }
    .muted { color: #57606a; }
    .small { font-size: 0.8em; }
    table { width: 100%; border-collapse: collapse; margin-top: 0.75rem; }
    th, td { border-bottom: 1px solid #d0d7de; padding: 0.65rem 0.6rem; text-align: left; vertical-align: middle; }
    thead th { position: sticky; top: 0; background: #f6f8fa; border-bottom: 2px solid #d0d7de; font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.04em; color: #57606a; }
    tbody tr:hover { background: #f6f8fa; }
    .rank { font-size: 1.3em; text-align: center; width: 4.5rem; }
    .alias { font-size: 1.15em; font-weight: 600; }
    .total { font-variant-numeric: tabular-nums; white-space: nowrap; font-weight: 600; }
    .total .max { color: #57606a; font-weight: 400; }
    .bar { height: 6px; background: #eaeef2; border-radius: 999px; overflow: hidden; margin-top: 0.35rem; min-width: 6rem; }
    .bar span { display: block; height: 100%; background: linear-gradient(90deg, #1a7f37, #2da44e); }
    .mod { font-variant-numeric: tabular-nums; white-space: nowrap; }
    .mod-total { font-size: 1.05em; font-weight: 600; }
    .check { color: #1a7f37; margin-left: 0.3rem; }
    .parts { color: #57606a; font-size: 0.75em; }
    .status { white-space: nowrap; }
    .find { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; margin-top: 0.5rem; }
    .find input { flex: 1 1 16rem; font: inherit; font-size: 0.95em; padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid #d0d7de; background: #ffffff; color: #1f2328; }
    .find button { font: inherit; font-size: 0.9em; padding: 0.5rem 0.9rem; border-radius: 8px; border: 1px solid #d0d7de; background: #f6f8fa; color: #1f2328; cursor: pointer; }
    .find button:hover { background: #eaeef2; }
    tr.me { background: #dafbe1 !important; outline: 2px solid #1a7f37; }
    tr.hidden { display: none; }
    .empty { padding: 1.5rem 0; }
    .nav { margin: 0.75rem 0 0; }
    .nav a { color: #0969da; }
    details { margin-top: 0.5rem; }
    summary { cursor: pointer; color: #57606a; }
    @media (max-width: 700px) { body { padding: 1rem 0.75rem 2rem; } th, td { padding: 0.5rem 0.35rem; } .parts { display: none; } }
  </style>
</head>
<body>
  <main>
    <section class="card">
      <h1>${title}</h1>
      <p class="muted">${description}</p>
      <p class="headline">${headline}</p>
      ${nav}
      ${closedNote}
    </section>

    <section class="card">
      <h2>Scores</h2>
      <p class="muted small">Live scores update as people submit. A ${verifiedLabel} check mark means a facilitator has confirmed that score.</p>
      <div class="find">
        <input id="find-input" type="search" placeholder="Type your alias to find yourself" autocomplete="off" aria-label="Find your alias">
        <button id="find-only" type="button">Show only me</button>
        <button id="find-clear" type="button">Clear</button>
      </div>
      ${board}
    </section>

    <section class="card">
      <h2>Winner status</h2>
      ${winnerSection}
    </section>

    <section class="card small muted">
      <p>Last updated ${updatedMarkup}. ${refreshNote}</p>
      <p>Event state: ${state}. Event date: ${eventDate}. This page publishes only alias and score data. Evidence, prompts, author identities, and repository content are never included.</p>
      <details>
        <summary>How scoring works</summary>
        <ul>${scoringRules}</ul>
        <p>Maximum cumulative score is ${maxCumulative}.</p>
      </details>
    </section>
  </main>
  <script>
    (function () {
      var KEY = 'ghcp-leaderboard-alias';
      var input = document.getElementById('find-input');
      var onlyButton = document.getElementById('find-only');
      var clearButton = document.getElementById('find-clear');
      var rows = Array.prototype.slice.call(document.querySelectorAll('tbody tr[data-alias]'));
      var onlyMe = false;

      function apply() {
        var term = (input.value || '').trim().toLowerCase();
        rows.forEach(function (row) {
          var match = term !== '' && row.getAttribute('data-alias').indexOf(term) !== -1;
          row.classList.toggle('me', match);
          row.classList.toggle('hidden', onlyMe && term !== '' && !match);
        });
        onlyButton.textContent = onlyMe ? 'Show everyone' : 'Show only me';
        try { window.localStorage.setItem(KEY, input.value); } catch (error) { /* storage unavailable */ }
      }

      try {
        var saved = window.localStorage.getItem(KEY);
        if (saved) { input.value = saved; }
      } catch (error) { /* storage unavailable */ }

      input.addEventListener('input', apply);
      onlyButton.addEventListener('click', function () { onlyMe = !onlyMe; apply(); });
      clearButton.addEventListener('click', function () { input.value = ''; onlyMe = false; apply(); });
      apply();

      var updated = document.getElementById('updated-at');
      if (updated) {
        var parsed = new Date(updated.getAttribute('datetime'));
        if (!isNaN(parsed.getTime())) { updated.textContent = parsed.toLocaleString(); }
      }
    })();
  </script>
</body>
</html>`;
}

function renderBoard(rows, modules, verifiedByAlias, maxCumulative) {
  if (rows.length === 0) {
    return '<p class="empty">No scores yet. Be the first: finish a clue, then use the submit link on your mission page.</p>';
  }

  const body = rows
    .map((row) => {
      const cells = modules
        .map((module) => `<td class="mod">${renderModuleCell(row.moduleScores[module.id])}</td>`)
        .join('');
      const verifiedRow = verifiedByAlias.get(row.aliasKey);
      const confirmed = verifiedRow ? verifiedRow.verifiedTotalScore : 0;
      const status = row.allModulesCompleted
        ? `All ${modules.length} complete`
        : `${row.completedModuleCount} of ${modules.length} complete`;
      const percent = maxCumulative > 0 ? Math.round((row.totalScore / maxCumulative) * 100) : 0;
      const aliasKey = escapeHtml(String(row.aliasKey ?? row.alias).toLowerCase());

      return `<tr data-alias="${aliasKey}">
        <td class="rank">${renderRank(row.rank)}</td>
        <td class="alias">${escapeHtml(row.alias)}</td>
        <td class="total">${row.totalScore} <span class="max">/ ${maxCumulative}</span><div class="bar"><span style="width:${percent}%"></span></div></td>
        ${cells}
        <td class="total">${confirmed > 0 ? confirmed : '<span class="muted">&mdash;</span>'}</td>
        <td class="status">${status}</td>
      </tr>`;
    })
    .join('');
  const headers = modules.map((module) => `<th>${escapeHtml(module.name)}</th>`).join('');

  return `<table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Alias</th>
        <th>Score</th>
        ${headers}
        <th>Confirmed</th>
        <th>Progress</th>
      </tr>
    </thead>
    <tbody>${body}</tbody>
  </table>`;
}

function renderRank(rank) {
  if (rank === 1) return '<span title="First place">&#129351;</span>';
  if (rank === 2) return '<span title="Second place">&#129352;</span>';
  if (rank === 3) return '<span title="Third place">&#129353;</span>';
  return `<span class="muted">${rank}</span>`;
}

function renderModuleCell(cell) {
  if (!cell) {
    return '<span class="muted">&mdash;</span>';
  }

  const check = cell.verified ? '<span class="check" title="Confirmed by a facilitator">&#10003;</span>' : '';
  return `<span class="mod-total">${cell.total}</span>${check}<div class="parts">${cell.core} core &middot; ${cell.bonus} bonus</div>`;
}

function renderWinnerSection(report) {
  if (report.event.state !== 'closed') {
    return '<p class="muted">Winners are announced once the facilitator closes the event.</p>';
  }

  if (report.winners.length === 0) {
    return '<p class="muted">No confirmed winner yet. A winner needs all modules submitted, completed, and confirmed by a facilitator.</p>';
  }

  const highestScore = report.winners[0].verifiedTotalScore;
  const aliases = report.winners.map((winner) => `<li class="alias">${escapeHtml(winner.alias)}</li>`).join('');
  const heading = report.winners.length === 1 ? 'Winner' : 'Co-winners';
  return `<p><strong>${heading}</strong>, with a confirmed total of ${highestScore}:</p>
  <ul>${aliases}</ul>
  <p class="muted small">Ties are shared. There is no speed tie-break.</p>`;
}

export function buildEventsIndexHtml(report) {
  const title = escapeHtml(`${report.pages.title} — past events`);
  const pastEvents = report.pastEvents ?? [];
  const items = pastEvents
    .map((past) => {
      const date = escapeHtml(past.event.date);
      const players = past.provisionalStandings.length;
      const topScore = players > 0 ? past.provisionalStandings[0].totalScore : 0;
      const winners = past.winners.length > 0
        ? past.winners.map((winner) => escapeHtml(winner.alias)).join(', ')
        : 'no confirmed winner';
      return `<li><a href="./${date}/">${date}</a> &middot; ${players} ${players === 1 ? 'player' : 'players'} &middot; top score ${topScore} &middot; ${winners}</li>`;
    })
    .join('');
  const body = pastEvents.length > 0
    ? `<ul>${items}</ul>`
    : '<p class="muted">No past events yet.</p>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <style>
    :root { color-scheme: light; }
    body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; line-height: 1.5; margin: 0; padding: 2rem 1.5rem 3rem; background: #ffffff; color: #1f2328; }
    main { max-width: 900px; margin: 0 auto; }
    h1 { letter-spacing: -0.02em; }
    .card { background: #ffffff; border: 1px solid #d0d7de; border-radius: 14px; padding: 1.25rem 1.5rem; }
    .muted { color: #57606a; }
    ul { padding-left: 1.2rem; }
    li { margin-bottom: 0.5rem; }
    a { color: #0969da; }
  </style>
</head>
<body>
  <main>
    <section class="card">
      <h1>${title}</h1>
      <p class="nav"><a href="../">&larr; Current leaderboard</a></p>
      ${body}
      <p class="muted">Each past board is final. It publishes only alias and score data.</p>
    </section>
  </main>
</body>
</html>`;
}

export async function writeSite(outputDir, report) {
  const resolvedOutputDir = path.resolve(outputDir);
  await mkdir(resolvedOutputDir, { recursive: true });
  await writeFile(path.join(resolvedOutputDir, 'index.html'), buildHtml(report), 'utf8');
  await writeFile(path.join(resolvedOutputDir, 'leaderboard.json'), `${JSON.stringify(createPublicReport(report), null, 2)}\n`, 'utf8');
  await writeFile(path.join(resolvedOutputDir, '.nojekyll'), '\n', 'utf8');

  const pastEvents = report.pastEvents ?? [];
  if (pastEvents.length > 0) {
    const eventsDir = path.join(resolvedOutputDir, 'events');
    await mkdir(eventsDir, { recursive: true });
    await writeFile(path.join(eventsDir, 'index.html'), buildEventsIndexHtml(report), 'utf8');

    for (const past of pastEvents) {
      const eventDir = path.join(eventsDir, past.event.date);
      await mkdir(eventDir, { recursive: true });
      await writeFile(path.join(eventDir, 'index.html'), buildHtml(past, { archive: true }), 'utf8');
      await writeFile(path.join(eventDir, 'leaderboard.json'), `${JSON.stringify(createPublicReport(past), null, 2)}\n`, 'utf8');
    }
  }

  return resolvedOutputDir;
}
