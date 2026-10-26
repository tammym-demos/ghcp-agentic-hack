import test from 'node:test';
import assert from 'node:assert/strict';
import {
  aggregateLeaderboard,
  buildEventId,
  buildEventsIndexHtml,
  buildHtml,
  createPublicReport,
  escapeHtml,
  evaluateIssueSubmission,
  formatDateInTimeZone,
  parseIssueFormBody,
  resolveEventDate,
  validateConfig
} from '../src/leaderboard.mjs';
import config from '../leaderboard.config.json' with { type: 'json' };

/**
 * Every fixture issue below is created on this day, so pinning it keeps the tests
 * deterministic no matter when they run.
 */
const PINNED_EVENT_DATE = '2026-08-01';

function makeIssue({
  number,
  login,
  userId,
  state = 'open',
  labels = ['leaderboard-submission'],
  updatedAt,
  createdAt = updatedAt,
  alias = 'Sample Alias',
  module = 'Foundations',
  core = '40',
  bonus = '10',
  includeSelfReport = true,
  includePrivacy = true,
  extraSections = ''
}) {
  const selfReportValue = includeSelfReport
    ? '- [x] I confirm this is my own self-reported score for the selected module and event.'
    : '- [ ] I confirm this is my own self-reported score for the selected module and event.';
  const privacyValue = includePrivacy
    ? '- [x] I understand the published leaderboard includes only my opt-in alias and sanitized score data, and facilitators may verify or withhold entries.'
    : '- [ ] I understand the published leaderboard includes only my opt-in alias and sanitized score data, and facilitators may verify or withhold entries.';

  return {
    number,
    state,
    updated_at: updatedAt,
    created_at: createdAt,
    labels: labels.map((name) => ({ name })),
    user: {
      login,
      id: userId
    },
    body: `### Opt-in Alias

${alias}

### Module

${module}

### Core Points

${core}

### Bonus Points

${bonus}

### Self-Report Acknowledgement

${selfReportValue}

### Privacy Acknowledgement

${privacyValue}
${extraSections}`
  };
}

function cloneConfig(overrides = {}) {
  const cloned = structuredClone({
    ...config,
    ...overrides
  });
  cloned.event = { ...cloned.event, date: cloned.event.date ?? PINNED_EVENT_DATE };
  return cloned;
}

test('rejects non-positive score increments', () => {
  for (const step of [0, -10]) {
    const invalidConfig = cloneConfig({
      modules: config.modules.map((module, index) => index === 0
        ? { ...module, core: { ...module.core, step } }
        : module)
    });

    assert.throws(
      () => validateConfig(invalidConfig),
      /foundations core band is invalid/
    );
  }
});

test('rejects missing or invalid alias patterns', () => {
  const missingPatternConfig = cloneConfig({
    aliasPolicy: {
      minLength: config.aliasPolicy.minLength,
      maxLength: config.aliasPolicy.maxLength
    }
  });
  const invalidPatternConfig = cloneConfig({
    aliasPolicy: {
      ...config.aliasPolicy,
      pattern: '['
    }
  });

  assert.throws(
    () => validateConfig(missingPatternConfig),
    /aliasPolicy\.pattern must be a non-empty regular expression/
  );
  assert.throws(
    () => validateConfig(invalidPatternConfig),
    /aliasPolicy\.pattern must be a valid regular expression/
  );
});

test('aggregates provisional and verified standings', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 1, login: 'participant-001', userId: 1001, updatedAt: '2026-08-01T10:00:00Z', alias: 'Mergewell One', module: 'Foundations', core: '40', bonus: '10', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 2, login: 'participant-001', userId: 1001, updatedAt: '2026-08-01T11:00:00Z', alias: 'Mergewell One', module: 'Agentic', core: '50', bonus: '0', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 3, login: 'participant-001', userId: 1001, updatedAt: '2026-08-01T12:00:00Z', alias: 'Mergewell One', module: 'Advanced', core: '40', bonus: '10', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 4, login: 'participant-002', userId: 1002, updatedAt: '2026-08-01T13:00:00Z', alias: 'Relay Two', module: 'Foundations', core: '50', bonus: '10', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 5, login: 'participant-002', userId: 1002, updatedAt: '2026-08-01T14:00:00Z', alias: 'Relay Two', module: 'Agentic', core: '40', bonus: '10' }),
      makeIssue({ number: 6, login: 'participant-002', userId: 1002, updatedAt: '2026-08-01T15:00:00Z', alias: 'Relay Two', module: 'Advanced', core: '50', bonus: '0', labels: ['leaderboard-submission', 'verified-score'] })
    ]
  });

  assert.equal(report.provisionalStandings[0].alias, 'Relay Two');
  assert.equal(report.provisionalStandings[0].totalScore, 160);
  assert.equal(report.verifiedStandings[0].alias, 'Mergewell One');
  assert.equal(report.verifiedStandings[0].verifiedTotalScore, 150);
  assert.equal(report.verifiedStandings[0].eligibleForWinner, true);
  assert.equal(report.verifiedStandings[1].eligibleForWinner, false);
  assert.deepEqual(report.winners, []);
});

test('enforces caps, increments, headings, and acknowledgements', () => {
  const evaluated = evaluateIssueSubmission(
    makeIssue({
      number: 20,
      login: 'participant-003',
      userId: 1003,
      updatedAt: '2026-08-01T10:00:00Z',
      alias: 'bad<script>',
      module: 'Unknown',
      core: '35',
      bonus: '15',
      includePrivacy: false,
      extraSections: `

### Employer

Contoso`
    }),
    cloneConfig()
  );

  assert.equal(evaluated.valid, false);
  assert.ok(evaluated.reasons.some((reason) => reason.includes('Alias')));
  assert.ok(evaluated.reasons.some((reason) => reason.includes('Module')));
  assert.ok(evaluated.reasons.some((reason) => reason.includes('Core points')));
  assert.ok(evaluated.reasons.some((reason) => reason.includes('Bonus points')));
  assert.ok(evaluated.reasons.some((reason) => reason.includes('Privacy acknowledgement')));
});

test('deduplicates by latest updated valid submission and supports withdrawal by close', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 30, login: 'participant-004', userId: 1004, updatedAt: '2026-08-01T10:00:00Z', alias: 'Runner Four', module: 'Foundations', core: '30', bonus: '10' }),
      makeIssue({ number: 31, login: 'participant-004', userId: 1004, updatedAt: '2026-08-01T11:00:00Z', alias: 'Runner Four', module: 'Foundations', core: '35', bonus: '10' }),
      makeIssue({ number: 32, login: 'participant-004', userId: 1004, updatedAt: '2026-08-01T12:00:00Z', alias: 'Runner Four', module: 'Foundations', core: '40', bonus: '10' }),
      makeIssue({ number: 33, login: 'participant-004', userId: 1004, updatedAt: '2026-08-01T13:00:00Z', alias: 'Runner Four', module: 'Foundations', core: '40', bonus: '10', state: 'closed' })
    ]
  });

  assert.equal(report.summary.selectedModuleSubmissions, 1);
  assert.equal(report.summary.withdrawnModuleSubmissions, 1);
  assert.equal(report.provisionalStandings.length, 0);
});

test('withholds alias conflicts and excludes author identifiers and unknown body sections', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 40, login: 'participant-005', userId: 1005, updatedAt: '2026-08-01T10:00:00Z', alias: 'Shared Alias', module: 'Foundations', core: '40', bonus: '10', extraSections: `

### Evidence

Screenshot reference` }),
      makeIssue({ number: 41, login: 'participant-006', userId: 1006, updatedAt: '2026-08-01T10:05:00Z', alias: 'Shared Alias', module: 'Foundations', core: '50', bonus: '0' })
    ]
  });
  const html = buildHtml(report);
  const json = JSON.stringify(createPublicReport(report));

  assert.equal(report.summary.withheldParticipants, 2);
  assert.equal(report.provisionalStandings.length, 0);
  assert.equal(report.verifiedStandings.length, 0);
  assert.ok(!html.includes('participant-005'));
  assert.ok(!html.includes('participant-006'));
  assert.ok(!html.includes('Screenshot reference'));
  assert.ok(!html.includes('Shared Alias'));
  assert.ok(!json.includes('1005'));
  assert.ok(!json.includes('1006'));
});

test('announces co-winners only after event close and requires all verified completed modules', () => {
  const closedConfig = cloneConfig({
    event: {
      ...config.event,
      date: PINNED_EVENT_DATE,
      closedOn: PINNED_EVENT_DATE
    }
  });
  const report = aggregateLeaderboard({
    config: closedConfig,
    issues: [
      makeIssue({ number: 50, login: 'participant-007', userId: 1007, updatedAt: '2026-08-01T10:00:00Z', alias: 'Tie Alpha', module: 'Foundations', core: '50', bonus: '10', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 51, login: 'participant-007', userId: 1007, updatedAt: '2026-08-01T11:00:00Z', alias: 'Tie Alpha', module: 'Agentic', core: '50', bonus: '0', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 52, login: 'participant-007', userId: 1007, updatedAt: '2026-08-01T12:00:00Z', alias: 'Tie Alpha', module: 'Advanced', core: '40', bonus: '10', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 53, login: 'participant-008', userId: 1008, updatedAt: '2026-08-01T10:00:00Z', alias: 'Tie Beta', module: 'Foundations', core: '40', bonus: '10', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 54, login: 'participant-008', userId: 1008, updatedAt: '2026-08-01T11:00:00Z', alias: 'Tie Beta', module: 'Agentic', core: '50', bonus: '10', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 55, login: 'participant-008', userId: 1008, updatedAt: '2026-08-01T12:00:00Z', alias: 'Tie Beta', module: 'Advanced', core: '50', bonus: '0', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 56, login: 'participant-009', userId: 1009, updatedAt: '2026-08-01T10:00:00Z', alias: 'Not Eligible', module: 'Foundations', core: '30', bonus: '10', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 57, login: 'participant-009', userId: 1009, updatedAt: '2026-08-01T11:00:00Z', alias: 'Not Eligible', module: 'Agentic', core: '50', bonus: '10', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 58, login: 'participant-009', userId: 1009, updatedAt: '2026-08-01T12:00:00Z', alias: 'Not Eligible', module: 'Advanced', core: '50', bonus: '10', labels: ['leaderboard-submission', 'verified-score'] })
    ]
  });

  assert.equal(report.winners.length, 2);
  assert.deepEqual(
    report.winners.map((winner) => winner.alias),
    ['Tie Alpha', 'Tie Beta']
  );
  assert.ok(report.verifiedStandings.find((row) => row.alias === 'Not Eligible' && !row.eligibleForWinner));
});

test('escapes HTML output', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig({
      pages: {
        title: 'Results <Open & Closed>',
        description: 'Safe & "sanitized" leaderboard'
      }
    }),
    issues: [makeIssue({ number: 60, login: 'participant-010', userId: 1010, updatedAt: '2026-08-01T10:00:00Z', alias: 'Safe Alias', module: 'Foundations', core: '40', bonus: '0' })]
  });
  const html = buildHtml(report);

  assert.ok(html.includes('Results &lt;Open &amp; Closed&gt;'));
  assert.ok(html.includes('Safe &amp; &quot;sanitized&quot; leaderboard'));
  assert.equal(escapeHtml(`<'">&`), '&lt;&#39;&quot;&gt;&amp;');
});

test('parses only known headings', () => {
  const sections = parseIssueFormBody(`### Event ID

ghcp-dev-hack

### Employer

Hidden

### Module

Foundations

### Core Points

40

### Bonus Points

10

### Opt-in Alias

Visible Alias

### Self-Report Acknowledgement

- [x] ok

### Privacy Acknowledgement

- [x] ok`);

  assert.equal(sections.get('Employer'), undefined);
  assert.equal(sections.get('Opt-in Alias'), 'Visible Alias');
});

test('accepts every achievable Foundations core total', () => {
  for (const core of ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50']) {
    const evaluated = evaluateIssueSubmission(
      makeIssue({
        number: 70,
        login: 'participant-011',
        userId: 1011,
        updatedAt: '2026-08-01T10:00:00Z',
        alias: 'Clue Runner',
        module: 'Foundations',
        core,
        bonus: '0'
      }),
      cloneConfig()
    );

    assert.deepEqual(evaluated.reasons, [], `Foundations core ${core} must be accepted`);
    assert.equal(evaluated.valid, true);
    assert.equal(evaluated.completed, Number(core) >= 40);
  }
});

test('rejects 5-point core totals for 10-point increment modules', () => {
  for (const module of ['Agentic', 'Advanced']) {
    const evaluated = evaluateIssueSubmission(
      makeIssue({
        number: 71,
        login: 'participant-012',
        userId: 1012,
        updatedAt: '2026-08-01T10:00:00Z',
        alias: 'Clue Runner',
        module,
        core: '45',
        bonus: '0'
      }),
      cloneConfig()
    );

    assert.equal(evaluated.valid, false);
    assert.ok(evaluated.reasons.some((reason) => reason.includes('Core points must use 10-point increments')));
  }
});

test('ranks a 45-point Foundations submission above a 40-point submission', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 72, login: 'participant-013', userId: 1013, updatedAt: '2026-08-01T10:00:00Z', alias: 'Sharp Eye', module: 'Foundations', core: '45', bonus: '0' }),
      makeIssue({ number: 73, login: 'participant-014', userId: 1014, updatedAt: '2026-08-01T10:05:00Z', alias: 'Steady Hand', module: 'Foundations', core: '40', bonus: '0' })
    ]
  });

  assert.equal(report.summary.invalidIssues, 0);
  assert.deepEqual(
    report.provisionalStandings.map((row) => [row.alias, row.totalScore]),
    [['Sharp Eye', 45], ['Steady Hand', 40]]
  );
});

test('ranks tied scores by earliest creation time', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 74, login: 'participant-015', userId: 1015, updatedAt: '2026-08-01T10:30:00Z', alias: 'Early Bird', module: 'Foundations', core: '40', bonus: '10' }),
      makeIssue({ number: 75, login: 'participant-016', userId: 1016, updatedAt: '2026-08-01T10:00:00Z', alias: 'Quick Learner', module: 'Foundations', core: '40', bonus: '10' })
    ]
  });

  assert.equal(report.summary.invalidIssues, 0);
  assert.deepEqual(
    report.provisionalStandings.map((row) => [row.alias, row.totalScore, row.rank]),
    [['Quick Learner', 50, 1], ['Early Bird', 50, 2]]
  );
  assert.equal(report.provisionalStandings[0].alias, 'Quick Learner', 'Quick Learner created first and ranks first despite same score');
  assert.equal(report.provisionalStandings[1].alias, 'Early Bird', 'Early Bird created later and ranks second');
});

test('uses alias as a deterministic fallback for matching scores and creation times', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 76, login: 'participant-017', userId: 1017, updatedAt: '2026-08-01T10:00:00Z', alias: 'Zulu Tie', module: 'Foundations', core: '40', bonus: '10' }),
      makeIssue({ number: 77, login: 'participant-018', userId: 1018, updatedAt: '2026-08-01T10:00:00Z', alias: 'Alpha Tie', module: 'Foundations', core: '40', bonus: '10' })
    ]
  });

  assert.deepEqual(
    report.provisionalStandings.map((row) => [row.alias, row.totalScore, row.rank]),
    [['Alpha Tie', 50, 1], ['Zulu Tie', 50, 1]]
  );
});

test('shows all participants including those with zero verified score', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 78, login: 'participant-019', userId: 1019, updatedAt: '2026-08-01T10:00:00Z', alias: 'Verified Participant', module: 'Foundations', core: '40', bonus: '10', labels: ['leaderboard-submission', 'verified-score'] }),
      makeIssue({ number: 79, login: 'participant-020', userId: 1020, updatedAt: '2026-08-01T10:05:00Z', alias: 'Unverified Participant', module: 'Foundations', core: '50', bonus: '10', labels: ['leaderboard-submission'] })
    ]
  });

  assert.equal(report.summary.invalidIssues, 0);
  assert.equal(report.provisionalStandings.length, 2, 'both participants appear in provisional standings');
  assert.equal(report.verifiedStandings.length, 2, 'both participants appear in verified standings (even with 0 verified score)');

  const verified = report.verifiedStandings.find((row) => row.alias === 'Unverified Participant');
  assert.ok(verified, 'unverified participant is in verified standings');
  assert.equal(verified.verifiedTotalScore, 0, 'unverified participant has 0 verified score');
});

test('renders a bounded projection refresh and rejects an out-of-range value', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [makeIssue({ number: 80, login: 'participant-015', userId: 1015, updatedAt: '2026-08-01T10:00:00Z', alias: 'Board Watcher', module: 'Foundations', core: '40', bonus: '0' })]
  });

  assert.ok(buildHtml(report).includes('<meta http-equiv="refresh" content="60">'));

  const withoutRefresh = aggregateLeaderboard({
    config: cloneConfig({ pages: { title: 'Board', description: 'Standings' } }),
    issues: []
  });
  assert.equal(withoutRefresh.pages.refreshSeconds, undefined);
  assert.ok(!buildHtml(withoutRefresh).includes('http-equiv="refresh"'));

  assert.throws(
    () => validateConfig(cloneConfig({ pages: { title: 'Board', description: 'Standings', refreshSeconds: 5 } }), 'config'),
    /refreshSeconds/
  );
});

test('renders one participant-facing board without operator telemetry', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 90, login: 'participant-020', userId: 1020, updatedAt: '2026-08-01T10:00:00Z', alias: 'Front Runner', module: 'Foundations', core: '50', bonus: '10' }),
      makeIssue({ number: 91, login: 'participant-021', userId: 1021, updatedAt: '2026-08-01T10:01:00Z', alias: 'Second Wind', module: 'Foundations', core: '40', bonus: '0' })
    ]
  });
  const html = buildHtml(report);

  assert.equal(html.match(/<table/g).length, 1, 'the page shows a single merged board');
  assert.ok(!html.includes('Build summary'), 'operator telemetry stays out of the page');
  assert.ok(!html.includes('Issues scanned'));
  assert.ok(!html.includes('Provisional standings'));
  assert.ok(!html.includes('Withheld'));
  assert.ok(html.includes('&#129351;'), 'first place earns a medal');
  assert.ok(html.includes('/ 180'), 'totals are shown against the maximum');
  assert.ok(html.includes('id="find-input"'), 'participants can find themselves');
  assert.ok(html.includes('2 players on the board'));
  assert.ok(html.includes('data-alias="front runner"'));
});

test('reports a generated timestamp and a welcoming empty board', () => {
  const empty = aggregateLeaderboard({ config: cloneConfig(), issues: [] });
  const html = buildHtml(empty);

  assert.ok(typeof empty.generatedAt === 'string' && !Number.isNaN(Date.parse(empty.generatedAt)));
  assert.equal(createPublicReport(empty).generatedAt, empty.generatedAt);
  assert.ok(html.includes(`datetime="${empty.generatedAt}"`), 'the page states when it was built');
  assert.ok(html.includes('Be the first'), 'an empty board invites a first submission');
  assert.ok(!html.includes('<table'));
});

test('derives the current event from the calendar day in the event time zone', () => {
  const rolling = structuredClone(config);
  delete rolling.event.date;

  // 03:30 UTC on 2 August is still 1 August in America/New_York.
  const lateEvening = Date.parse('2026-08-02T03:30:00Z');
  assert.equal(resolveEventDate(rolling, lateEvening), '2026-08-01');
  assert.equal(formatDateInTimeZone(lateEvening, 'UTC'), '2026-08-02');

  const pinned = cloneConfig();
  assert.equal(resolveEventDate(pinned, Date.now()), PINNED_EVENT_DATE);
  assert.equal(buildEventId(pinned, '2026-08-01'), 'ghcp-dev-hack-2026-08-01');
});

test('rejects an invalid time zone, slug, or pinned date', () => {
  assert.throws(() => validateConfig(cloneConfig({ event: { ...config.event, timeZone: 'Mars/Olympus' } })), /valid IANA time zone/);
  assert.throws(() => validateConfig(cloneConfig({ event: { ...config.event, timeZone: '' } })), /event\.timeZone is required/);
  assert.throws(() => validateConfig(cloneConfig({ event: { ...config.event, slug: 'Not Kebab' } })), /event\.slug must be lowercase kebab-case/);
  assert.throws(() => validateConfig(cloneConfig({ event: { ...config.event, date: '08-01-2026' } })), /event\.date must be omitted or a YYYY-MM-DD/);
});

test('scores only the current day and archives earlier days', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 100, login: 'today-001', userId: 2001, updatedAt: '2026-08-01T10:00:00Z', alias: 'Today Runner', module: 'Foundations', core: '40', bonus: '10' }),
      makeIssue({ number: 101, login: 'past-001', userId: 2002, updatedAt: '2026-07-28T10:00:00Z', alias: 'Past Runner', module: 'Foundations', core: '50', bonus: '10' }),
      makeIssue({ number: 102, login: 'past-002', userId: 2003, updatedAt: '2026-07-28T11:00:00Z', alias: 'Past Rival', module: 'Foundations', core: '40', bonus: '0' })
    ]
  });

  assert.equal(report.event.id, 'ghcp-dev-hack-2026-08-01');
  assert.equal(report.event.date, '2026-08-01');
  assert.deepEqual(report.provisionalStandings.map((row) => row.alias), ['Today Runner']);
  assert.equal(report.summary.issuesScanned, 1, 'the current board only counts its own day');
  assert.equal(report.totalIssuesScanned, 3, 'the operator log still sees every fetched issue');

  assert.equal(report.pastEvents.length, 1);
  const [past] = report.pastEvents;
  assert.equal(past.event.date, '2026-07-28');
  assert.equal(past.event.id, 'ghcp-dev-hack-2026-07-28');
  assert.equal(past.event.state, 'closed', 'an archived board is always final');
  assert.deepEqual(past.provisionalStandings.map((row) => row.alias), ['Past Runner', 'Past Rival']);
});

test('keeps a future-dated submission off an archived board', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 110, login: 'ahead-001', userId: 2010, updatedAt: '2026-08-09T10:00:00Z', alias: 'Ahead Of Time', module: 'Foundations', core: '40', bonus: '10' })
    ]
  });

  assert.equal(report.provisionalStandings.length, 0);
  assert.equal(report.pastEvents.length, 0, 'only earlier days become archives');
});

test('does not archive a past day that has nobody left on the board', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 120, login: 'junk-001', userId: 2020, updatedAt: '2026-07-20T10:00:00Z', alias: 'x', module: 'Nonsense', core: '37', bonus: '3' }),
      // A valid submission that was later withdrawn leaves its day with nothing to show.
      makeIssue({ number: 121, login: 'gone-001', userId: 2021, updatedAt: '2026-07-21T10:00:00Z', alias: 'Withdrawn Runner', module: 'Foundations', core: '40', bonus: '10', state: 'closed' })
    ]
  });

  assert.equal(report.pastEvents.length, 0, 'neither a malformed nor a fully withdrawn day publishes an archive');
});

test('scopes alias conflicts to one event so an alias can be reused later', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 130, login: 'clash-001', userId: 2030, updatedAt: '2026-08-01T10:00:00Z', alias: 'Shared Alias', module: 'Foundations', core: '40', bonus: '10' }),
      makeIssue({ number: 131, login: 'clash-002', userId: 2031, updatedAt: '2026-08-01T10:05:00Z', alias: 'Shared Alias', module: 'Foundations', core: '50', bonus: '0' }),
      makeIssue({ number: 132, login: 'earlier-001', userId: 2032, updatedAt: '2026-07-25T10:00:00Z', alias: 'Shared Alias', module: 'Foundations', core: '40', bonus: '10' })
    ]
  });

  assert.equal(report.summary.withheldParticipants, 2, 'a same-day alias clash is withheld');
  assert.equal(report.provisionalStandings.length, 0);

  const [past] = report.pastEvents;
  assert.deepEqual(past.provisionalStandings.map((row) => row.alias), ['Shared Alias'], 'the same alias stands on an earlier day');
});

test('links past events and renders an archived board as final', () => {
  const report = aggregateLeaderboard({
    config: cloneConfig(),
    issues: [
      makeIssue({ number: 140, login: 'now-001', userId: 2040, updatedAt: '2026-08-01T10:00:00Z', alias: 'Current Alias', module: 'Foundations', core: '40', bonus: '10' }),
      makeIssue({ number: 141, login: 'then-001', userId: 2041, updatedAt: '2026-07-30T10:00:00Z', alias: 'Archived Alias', module: 'Foundations', core: '40', bonus: '10' })
    ]
  });
  const currentHtml = buildHtml(report);
  const archiveHtml = buildHtml(report.pastEvents[0], { archive: true });
  const indexHtml = buildEventsIndexHtml(report);

  assert.ok(currentHtml.includes('href="events/"'), 'the live board links to its history');
  assert.ok(currentHtml.includes('Past events (1)'));
  assert.ok(currentHtml.includes('http-equiv="refresh"'), 'the live board keeps refreshing');

  assert.ok(archiveHtml.includes('2026-07-30'));
  assert.ok(!archiveHtml.includes('http-equiv="refresh"'), 'a final board does not poll');
  assert.ok(archiveHtml.includes('href="../../"'), 'an archive links back to the live board');
  assert.ok(archiveHtml.includes('This event is closed'));

  assert.ok(indexHtml.includes('href="./2026-07-30/"'));
  assert.ok(indexHtml.includes('1 player'));

  assert.deepEqual(createPublicReport(report).pastEvents, [{ id: 'ghcp-dev-hack-2026-07-30', date: '2026-07-30' }]);
});

test('tags each submission with the day it was created', () => {
  const evaluated = evaluateIssueSubmission(
    makeIssue({ number: 150, login: 'tagged-001', userId: 2050, updatedAt: '2026-08-05T12:00:00Z', createdAt: '2026-08-02T03:30:00Z', alias: 'Tagged Alias', module: 'Foundations', core: '40', bonus: '10' }),
    cloneConfig()
  );

  assert.equal(evaluated.valid, true);
  assert.equal(evaluated.eventDate, '2026-08-01', 'the creation day decides the event, and a later edit cannot move it');
});

test('ignores a closed marker left over from a previous hack', () => {
  const staleClose = cloneConfig({
    event: {
      ...config.event,
      date: PINNED_EVENT_DATE,
      closedOn: '2026-07-04'
    }
  });
  const report = aggregateLeaderboard({
    config: staleClose,
    issues: [makeIssue({ number: 160, login: 'fresh-001', userId: 2060, updatedAt: '2026-08-01T10:00:00Z', alias: 'Fresh Start', module: 'Foundations', core: '40', bonus: '10' })]
  });

  assert.equal(report.event.state, 'open', 'a new hack never opens onto a closed board');
  assert.ok(!buildHtml(report).includes('This event is closed'));

  assert.throws(
    () => validateConfig(cloneConfig({ event: { ...config.event, closedOn: 'yesterday' } })),
    /event\.closedOn must be omitted or a YYYY-MM-DD/
  );
});
