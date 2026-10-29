import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { writeLiveSite } from '../src/live-site.mjs';
import { aggregateLeaderboard } from '../src/leaderboard.mjs';

const originalFetch = globalThis.fetch;
const directories = [];
afterEach(async () => {
  globalThis.fetch = originalFetch;
  for (const directory of directories.splice(0)) await rm(directory, { recursive: true, force: true });
});

test('builds Pages entry points for the live board and preserves prefilled query parameters', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'leaderboard-live-'));
  directories.push(directory);
  globalThis.fetch = async (url) => {
    assert.equal(url, 'https://scores.example/api/standings');
    return Response.json({ event: { id: 'test-2026-10-27' }, provisionalStandings: [] });
  };
  await writeLiveSite(directory, 'https://scores.example/api/');
  const form = await readFile(path.join(directory, 'submit.html'), 'utf8');
  assert.match(form, /https:\/\/scores\.example\/api\/submit/);
  assert.match(form, /target.search = location.search/);
  assert.match(await readFile(path.join(directory, 'index.html'), 'utf8'), /api\/board/);
  assert.equal(JSON.parse(await readFile(path.join(directory, 'leaderboard.json'), 'utf8')).event.id, 'test-2026-10-27');
});

test('rejects unsafe backend URLs', async () => {
  for (const url of ['http://scores.example/api', 'https://user:secret@scores.example/api', 'https://scores.example/api?key=secret', 'https://scores.example/api#secret']) {
    await assert.rejects(writeLiveSite('unused', url), /HTTPS API base URL/);
  }
});

test('preserves legacy archive URLs and the switch-day board beside live entry points', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'leaderboard-legacy-'));
  directories.push(directory);
  const config = JSON.parse(await readFile(new URL('../leaderboard.config.json', import.meta.url), 'utf8'));
  const issues = JSON.parse(await readFile(new URL('../fixtures/sample-issues.json', import.meta.url), 'utf8'));
  config.event.date = '2026-08-11';
  config.event.closedOn = config.event.date;
  const switchDayIssue = { ...issues[0], number: 100, created_at: '2026-08-11T15:00:00Z', updated_at: '2026-08-11T15:00:00Z' };
  const legacy = aggregateLeaderboard({ config, issues: [...issues, switchDayIssue] });
  globalThis.fetch = async () => Response.json({ event: { id: 'live-event' }, provisionalStandings: [] });
  await writeLiveSite(directory, 'https://scores.example/api', legacy);
  const index = await readFile(path.join(directory, 'events', 'index.html'), 'utf8');
  for (const date of ['2026-08-10', '2026-08-11']) {
    assert.ok(index.includes(`./${date}/`));
    const archive = await readFile(path.join(directory, 'events', date, 'index.html'), 'utf8');
    assert.match(archive, /This event is closed/);
    assert.match(archive, /href="\.\.\/\.\.\/"/);
    const report = JSON.parse(await readFile(path.join(directory, 'events', date, 'leaderboard.json'), 'utf8'));
    assert.equal(report.event.date, date);
    assert.equal(report.event.state, 'closed');
  }
  assert.match(await readFile(path.join(directory, 'index.html'), 'utf8'), /api\/board/);
  assert.equal(JSON.parse(await readFile(path.join(directory, 'leaderboard.json'), 'utf8')).event.id, 'live-event');
});

test('provides an empty legacy index when switching before the first issue submission', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'leaderboard-empty-legacy-'));
  directories.push(directory);
  const config = JSON.parse(await readFile(new URL('../leaderboard.config.json', import.meta.url), 'utf8'));
  const legacy = aggregateLeaderboard({ config, issues: [] });
  globalThis.fetch = async () => Response.json({ event: { id: 'live-event' }, provisionalStandings: [] });
  await writeLiveSite(directory, 'https://scores.example/api', legacy);
  assert.match(await readFile(path.join(directory, 'events', 'index.html'), 'utf8'), /No past events yet/);
});

test('fails explicitly instead of publishing an unavailable or malformed backend', async () => {
  globalThis.fetch = async () => new Response('', { status: 503 });
  await assert.rejects(writeLiveSite('unused', 'https://scores.example/api'), /unavailable/);
  globalThis.fetch = async () => Response.json({});
  await assert.rejects(writeLiveSite('unused', 'https://scores.example/api'), /invalid public report/);
});

test('keeps setup and facilitator documentation links within the published kit', async () => {
  const kit = new URL('../', import.meta.url);
  for (const name of ['README.md', 'RUNBOOK.md']) {
    const document = new URL(name, kit);
    const source = await readFile(document, 'utf8');
    for (const [, target] of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (/^(?:https?:|mailto:|#)/.test(target)) continue;
      const linked = new URL(target.split('#')[0], document);
      assert.ok(linked.href.startsWith(kit.href), `${name} links outside the published kit: ${target}`);
      await readFile(linked);
    }
  }
});
