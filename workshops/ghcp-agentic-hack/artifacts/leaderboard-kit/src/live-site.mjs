import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildEventsIndexHtml, escapeHtml, writeSite } from './leaderboard.mjs';

export async function writeLiveSite(outputDir, apiUrl, legacyReport) {
  const url = new URL(apiUrl);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('LEADERBOARD_API_URL must be an HTTPS API base URL without credentials, query, or fragment.');
  }
  const base = url.href.replace(/\/$/, '');
  const response = await fetch(`${base}/standings`);
  if (!response.ok) throw new Error(`Live leaderboard is unavailable (HTTP ${response.status}); Pages output was not updated.`);
  const report = await response.json();
  if (!Array.isArray(report.provisionalStandings) || !report.event?.id) {
    throw new Error('Live leaderboard returned an invalid public report.');
  }
  if (legacyReport) {
    const pastEvents = [...legacyReport.pastEvents];
    if (legacyReport.summary.publishedParticipants > 0 || legacyReport.summary.withheldParticipants > 0) {
      pastEvents.unshift({ ...legacyReport, pastEvents: [] });
    }
    const archives = { ...legacyReport, pastEvents };
    await writeSite(outputDir, archives);
    await mkdir(path.join(outputDir, 'events'), { recursive: true });
    await writeFile(path.join(outputDir, 'events', 'index.html'), buildEventsIndexHtml(archives), 'utf8');
  }
  await mkdir(outputDir, { recursive: true });
  for (const [file, route] of [['index.html', 'board'], ['submit.html', 'submit']]) {
    const target = `${base}/${route}`;
    // Keep prefills, but never put the browser-held recovery key in this URL.
    const script = `const target = new URL(${JSON.stringify(target).replaceAll('<', '\\u003c')}); target.search = location.search; location.replace(target.href);`;
    await writeFile(path.join(outputDir, file), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="referrer" content="no-referrer">
<title>Workshop leaderboard</title></head><body>
<p>Opening the live leaderboard. <a href="${escapeHtml(target)}">Continue if it does not open</a>.</p>
${legacyReport ? '<p><a href="events/">Legacy GitHub issue archives</a></p>' : ''}
<script>${script}</script></body></html>`, 'utf8');
  }
  await writeFile(path.join(outputDir, 'leaderboard.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  await writeFile(path.join(outputDir, '.nojekyll'), '\n', 'utf8');
  return path.resolve(outputDir);
}
