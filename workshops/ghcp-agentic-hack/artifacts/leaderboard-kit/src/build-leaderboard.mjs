import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { aggregateLeaderboard, loadConfig, readJsonFile, writeSite } from './leaderboard.mjs';

const DEFAULT_CONFIG = 'leaderboard.config.json';
const DEFAULT_OUTPUT = 'site';

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const configPath = options.config ?? DEFAULT_CONFIG;
  const config = await loadConfig(configPath);
  if (options.eventDate) {
    config.event.date = options.eventDate;
  }
  const issues = options.input
    ? await readJsonFile(options.input)
    : await fetchIssuesFromGitHub({
        apiBaseUrl: options.apiBaseUrl ?? process.env.GITHUB_API_URL ?? 'https://api.github.com',
        repository: options.repository ?? process.env.GITHUB_REPOSITORY,
        token: process.env.GITHUB_TOKEN,
        label: config.labels.submission
      });
  const report = aggregateLeaderboard({ issues, config });
  const outputDir = await writeSite(options.out ?? DEFAULT_OUTPUT, report);

  console.log(`Built sanitized leaderboard site in ${outputDir}`);
  console.log(`Current event: ${report.event.id}`);
  console.log(`Issues fetched: ${report.totalIssuesScanned}`);
  console.log(`Issues scanned for this event: ${report.summary.issuesScanned}`);
  console.log(`Published participants: ${report.summary.publishedParticipants}`);
  console.log(`Withheld participants: ${report.summary.withheldParticipants}`);
  console.log(`Past events published: ${report.pastEvents.length}`);
}

function parseArgs(argv) {
  const options = {};

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === '--config') {
      options.config = next;
      index += 1;
    } else if (current === '--input') {
      options.input = next;
      index += 1;
    } else if (current === '--out') {
      options.out = next;
      index += 1;
    } else if (current === '--repository') {
      options.repository = next;
      index += 1;
    } else if (current === '--api-base-url') {
      options.apiBaseUrl = next;
      index += 1;
    } else if (current === '--event-date') {
      options.eventDate = next;
      index += 1;
    } else if (current === '--help') {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${current}`);
    }
  }

  return options;
}

function printHelp() {
  const scriptPath = path.relative(process.cwd(), fileURLToPath(import.meta.url));
  console.log(`Usage: node ${scriptPath} [--config file] [--input file] [--out dir] [--repository owner/name] [--api-base-url url] [--event-date YYYY-MM-DD]`);
}

async function fetchIssuesFromGitHub({ apiBaseUrl, repository, token, label }) {
  if (!repository) {
    throw new Error('GitHub API mode requires GITHUB_REPOSITORY or --repository.');
  }

  if (!token) {
    throw new Error('GitHub API mode requires GITHUB_TOKEN.');
  }

  const issues = [];
  const trimmedBaseUrl = String(apiBaseUrl).replace(/\/$/, '');
  let page = 1;

  while (true) {
    const url = new URL(`${trimmedBaseUrl}/repos/${repository}/issues`);
    url.searchParams.set('state', 'all');
    url.searchParams.set('labels', label);
    url.searchParams.set('per_page', '100');
    url.searchParams.set('page', String(page));
    url.searchParams.set('sort', 'updated');
    url.searchParams.set('direction', 'desc');

    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'User-Agent': 'ghcp-leaderboard-kit'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
    }

    const pageItems = await response.json();
    issues.push(...pageItems.filter((item) => !item.pull_request));

    if (pageItems.length < 100) {
      break;
    }

    page += 1;
  }

  return issues;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
