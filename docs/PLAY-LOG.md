# Local gameplay log for AI analysis

Open **Einstellungen → Spielprotokoll und Entwicklermodus → Protokoll für KI exportieren**. This downloads a JSON file for analysis in an AI tool of your choice. The game does not send gameplay records to GitHub or an AI service. The separate [editorial review ledger](REVIEW-STORAGE.md) still uses GitHub.

There is no manual **Spielstand sichern** control. The small automatic journey state retains the current letter, remaining parent allowance, shuffled order, unfinished questions and settings. It prevents a refresh from granting extra letters or discarding an interrupted task. Historical storage keys/data remain intact. This operational state is separate from the analysis log.

## What the log records

- Real child play: puzzle/run/visit IDs, exact iteration IDs and revisions, actual selected answers, explicit correct/retry outcomes and foreground task times.
- Berry/story placements also record origin, destination and resulting counts/order, for dragging and keyboard placement. Pointer paths are not recorded. Adult review and gallery previews remain excluded.
- Rules requested, resets, reinspection and task-button actions, including input method and button size. Cancelled touch gestures are recorded separately from wrong answers.
- Handwriting: authored target strokes, stroke starts/completions, missed starts, off-path pauses and early releases. No child's finger/stylus path, drawing, image or audio is recorded.
- Flow: letters, friend visits, unavailable/wrong friends, map use, virtual-forest movement destinations (older walks summarized), route failures, courier distance, home/sleep, app pauses and interrupted/resumed tasks.
- App/content versions, current journey and coarse viewport/text-case context help separate content changes and input/layout problems.

Owner review previews never produce child puzzle observations. Developer mode adds no usage events or task definitions. Old log records remain readable but records without an attributable run/task do not enter new puzzle statistics; historical development records remain excluded from summaries. No child name, age, account, physical location, image or sound recording is collected.

## Developer mode

**Einstellungen → Spielprotokoll und Entwicklermodus → Entwicklermodus** opens the separate development version ([children's and development version](CHANNELS.md)). It has its own save and records nothing, so the children's play log and journey stay exactly as they were. The switch is never remembered: the app always starts in the children's version, which records normally. A setting `developerMode` left by an earlier version is cleared.

The older `?dev=1` route still uses its isolated save/review namespaces and records no new events. Switching its checkbox off removes the URL flag and reloads the normal profile. No saved journey or editorial decision is deleted by changing modes.

## Export format

The download is named `waldpost-spielprotokoll-YYYY-MM-DD.json` and identifies `appName: "Waldpost"`. Its existing `format: "farbtupf-play-log"`, `schema: 2` identifier stays compatible with older exports. It contains:

| Field | Purpose |
| --- | --- |
| `events` | Ordered observations with timestamps, sequence IDs and page/journey/run/visit correlation |
| `definitions` | Exact observed question definitions keyed by iteration ID and revision; includes competence, difficulty, rule and expected answer/configuration |
| `summary.puzzles` | Runs, visits, completed runs, explicit wrong-answer checks, rule requests, resets and input/trace issues, separated by puzzle revision; for calibration also observed/completed Aufgaben, first-try rate over eligible choice Aufgaben, median and quartile active times |
| `summary.iterations` | Observed/completed runs, explicit wrong checks, median active time and eligible choice-question first-try rates |
| `summary.flow` | Journey/letter, map, wrong-friend, route and storage counts |
| `retention` / `storage` | Data coverage, what was summarized, dropped or expired by tier, and whether observations reached local storage |
| `recording.enabled` | Whether new observations are currently enabled; false in developer mode |
| `analysisGuide` | Scope, timing definitions, questions and interpretation limits for an AI reader |

The canonical question is stored once. An `iteration_presented` event includes its actual shuffled choices/order and any restored partial work. `puzzle_attempt.selected` is the selected value for choice tasks, or the current configuration/control for a multi-action task. World coordinates describe the fictional forest, not a real location.

Active milliseconds use the monotonic foreground clock within a visit, excluding hidden-tab time, open dialogs, the 900 ms correct-feedback interval and celebration. Thinking or unattended time while the task remains visibly open is included. Partial visits are combined for an observed completed run/iteration; background wall-clock gaps are not response times. A paused visit is not proof that a child abandoned the game.

First-try rates are offered only for choice questions whose beginning was observed. Construction/tracing completion does not imply a flawless first attempt; examine its actions and stroke issues. Use sample counts, exact revisions and input context before recommending changes. Logs support improvements to flow/content and fixed difficulty; they do not diagnose a child or automatically change difficulty. Any proposed puzzle/content/difficulty changes still follow the [adult review process](PUZZLE-REVIEW.md).

## Using the export

Attach the downloaded JSON to an AI conversation. For example:

> Analyze this Waldpost play log. First calibrate difficulty: which Rätsel and iterations look too easy or too hard? Then look for unclear iterations, input problems and friction in the journey. Cite puzzle/iteration IDs and revisions for each finding, with sample counts and event evidence. Separate observed facts from hypotheses, account for truncated or unfinished visits, and prioritize concrete changes for adult review. Do not infer a child's ability from one run or automatically approve content.

The export includes the question definitions and interpretation guide, so the AI can read it without access to this browser's storage. Sharing the file is a manual action under the parent's control.

## Persistence and limits

The existing device-local key `farbtupf.friends.v1.log` is upgraded compatibly. Development/alternate-world namespaces remain separate. The log survives refresh/offline use in that browser. A different browser or deleting site data starts with a different local log; only an exported file remains after deleting local data.

The log is sized for **about six weeks of five letters a day without losing any Rätsel observation**. Its main purpose is calibrating fixed Rätsel difficulty; world/flow detail is secondary and is given up first.

- **Window and budget.** Records are kept for **45 days** (inclusive, also after refresh or idle export) within **1,400,000 stored characters** (at most about 2.8 MB in UTF-16 localStorage) and 200,000 events.
- **Compact storage (version 3).** The stored envelope writes the repeated page/journey/visit context (session, versions, letter, screen, viewport, puzzle, run, visit, iteration, input method, area) only when it changes, uses a short key table, relative timestamps and derivable sequence/event IDs, and stores Rätsel-level definition fields (title, competence, reference, difficulty, instruction) once per Rätsel revision. Forest coordinates are rounded to 0.1. The export restores the complete schema-2 events, so readers see the same fields as before. An existing version 2 log is converted losslessly on its next save; the real exports from 25 Nov 2026 shrink to 15–17 %.
- **Priority when space runs out.** (1) The oldest raw `movement_destination`/`movement_sample` events are collapsed into one `movement_summary` per uninterrupted walk (counts, duration, sampled path distance, start/end, regions); recent walks stay in full detail. (2) The oldest other world events (place taps, area changes, map use, courier, unavailable friends, settings and drawing actions) are removed. (3) Only then are the oldest Rätsel observations removed. Rätsel observations are all events with a run/task ID plus the letter/session flow needed to read task times in context (session start/end, pause/resume, letters, friend visits, letter limits, storage errors).
- **Quota failures** shrink the budget for that page and apply the same priority, so a full device also sheds world detail first.
- **Reporting.** `retention` reports `droppedPuzzleEvents`, `droppedWorldEvents`, `expiredEvents`, `summarizedMovementEvents`, `storedCharacters`, `quotaLimited` and `puzzleDataComplete`; the export also gives `puzzleDataFrom`. Settings says whether old forest walks were summarized or Rätsel data was shortened.

A simulated 45 days × 5 letters (one berry-sharing Rätsel with 24 actions per Aufgabe in every five letters, 600 distinct questions, 200 movement events per letter) stores all 1,125 Aufgaben with no Rätsel event lost in about 1.38 M characters; a save after an answer then costs about 8 ms in Node because stored rows are cached and only new rows are encoded. Key puzzle outcomes persist immediately; routine actions are batched briefly and flushed on page hide/export. Storage failures never roll back gameplay; memory observations remain exportable and Settings reports the storage issue.

Each observed task retains its original question and exact iteration revision, so later puzzle edits cannot relabel historical answers. Iteration revisions follow the actual question/rendering rather than changes elsewhere in the puzzle. Current text-case context uses the active text mode, not a dormant historical setting. Retiring or reassigning a puzzle does not rewrite existing log definitions or outcomes.

**Protokoll löschen** clears only observations, after confirmation. It does not restart the journey, alter parent limits, clear unfinished questions or change GitHub puzzle approvals.

## Validation

`tests/play-log.test.cjs` covers durable exports, version/definition fidelity, active-time exclusions, interrupted visits, retention/size, exact compact-storage round trips (also after trimming), version 2 upgrade, movement summaries before any removal, world-before-puzzle removal on budget and quota limits, a six-week five-letters-a-day fixture, legacy migration, meaningful summary rates, disabled recording and storage failure isolation. Browser checks cover real answers, writing, review exclusion, local refresh/offline retention, the actual Settings download and developer mode's durable on/off, zero test events/definitions, separate resumed runs and legacy URL exit.
