# Final release review — Waldpost 9.4.32

| | |
| --- | --- |
| Reviewed build | `main` @ `9efa9dd` — Waldpost **9.4.32** (`FK.VERSION`, service-worker cache `farbtupf-v9.4.32-waldpost`) |
| Review date | 23 November 2026 |
| Review ledger | `puzzle-review-data` @ `5a18c44`. It was read only, and no decisions were written. |
| Role | Independent final reviewer. **Nothing in the game was changed.** This report is the only addition. |
| Scope | Consistency, design, bugs, Rätsel content and difficulty, the child journey, adult review/gallery, offline/update behaviour, documentation and the test suite |

## Verdict

**Release with conditions.** There are no crashes, no console errors, no wrong answers and no ambiguous pattern Aufgaben in the 763 Aufgaben. The child journey, the review gate, offline mode and the update path all work. The release gate is working as designed: **21 of 22 Rätsel** are released on GitHub. **Zahlennachbarn** stays hidden from children until its 19 open Aufgaben have been reviewed again.

Before you call this release finished:

1. **Decide on Zahlennachbarn.** Review its 17 pending Aufgaben and the 1 marked «Verbessern» in Rätsel-Prüfung (this also clears the puzzle-level flag), or ship knowingly without it. Until then the Eisvogel offers only *Farbwörter verstehen*. See [R-1](#r-1).
2. **Fix the stale required browser test** (`tests/puzzle-gallery-browser.cjs` still expects 23 Rätsel). Consider running at least one browser suite in CI. See [T-1](#t-1).

Plan the content findings below for the next content revision. They change Aufgaben, so they need adult review again. The most important are the **guessable vowel choices** ([C-1](#c-1)) and the **acorn that is called «Nuss»** ([C-2](#c-2)).

## What was tested

| Area | How | Result |
| --- | --- | --- |
| Repository checks | `style.cjs --check`, `map/layout.cjs --check`, `puzzle-catalogue.cjs --check`, `library.cjs --check`, `handoff.cjs --check`, `check-design.cjs` | ✅ all pass |
| Unit/model tests | `node --test tests/*.test.cjs` | ✅ 189 / 189 |
| Browser suites from [Development](../../DEVELOPMENT.md) | All 24 listed suites, Chromium 153 (SwiftShader), disposable storage, intercepted GitHub | ✅ 22 pass · ⚠️ 1 flaky (passes on rerun) · ❌ 1 fails (stale expectation), see [Tests](#tests) |
| Update path | `updates-browser.cjs` from the previous release 9.4.31 (`d00f381`) to 9.4.32 | ✅ pass (the default legacy ref `95b27dc` is not reachable in a shallow clone) |
| Release status | The real app against the real published ledger, read only | 21 / 22 Rätsel released, see [R-1](#r-1) |
| Content | All 763 Aufgaben dumped from the runtime catalogue and read by hand. Scripted checks for duplicate choices, answers missing from the choices, ambiguity in Biber matrices and Steinbock patterns, BFS route lengths in Wege, and answer distributions | No wrong answers. Didactic findings below. |
| Visual | Every Rätsel rendered in the real renderer at 1080 × 810 (tablet) and 390 × 844 (phone). Contact sheet of all 155 answer pictures. Wrong/right feedback and celebration. | Consistent page system. Layout findings below. |
| Child journey | Den → letter → outside → map at tablet and phone sizes. `letter-sessions`, `swamp-navigation`, `world-streaming` and `drawn-map` suites. | ✅ works. One phone map finding. |
| Accessibility | ARIA snapshots of eight Rätsel types | Mostly good. Minor findings. |
| CI / Pages | GitHub Actions on `main` | ✅ «Puzzle contract» and Pages deployment are green for `9efa9dd` |

Screenshots: [tablet Rätsel](tablet-puzzles.webp) · [phone Rätsel](phone-puzzles.webp) · [answer feedback and celebration](answer-feedback.webp) · [tablet world/letter/map](tablet-world.webp) · [phone letter/world/map](phone-letter-world-map.webp)

## Findings

Severity: **High** — fix before or right after release · **Medium** — next content/design revision · **Low** — polish.

### Release status

<a id="r-1"></a>**R-1 · High · Zahlennachbarn is not released.** The published ledger gives `neighbours` 18 approved, 17 pending and 1 «Verbessern» (`11-left`). The puzzle-level comment «Wenn karte korrekt platziert wurde, entferne sie von auswahl unten» also still holds the Rätsel open. Both notes were addressed in 9.4.30 and 9.4.32, but nobody has confirmed the reopened Aufgaben yet. The gate behaves correctly: children never see the Rätsel. The consequences: the Eisvogel hosts only one Rätsel, and the review entry page reads «21 / 22 Rätsel freigegeben».

**R-2 · Low · Several Rätsel were released through «Alle bestätigen».** The current approvals of Mengen vergleichen (Fisch), Muster fortsetzen, Mengen zählen, Schritte im Raum planen, Mengen ergänzen and Gegenstände merken carry the note «Alle Aufgaben zusammen bestätigt». That is roughly 170 Aufgaben approved in bulk rather than played one by one. The blueprint allows this. Still, findings [C-5](#c-5) and [C-2](#c-2) are in exactly these pools, so a quick play-through of each is worth it.

### Content and level of the Rätsel

<a id="c-1"></a>**C-1 · High · Einen Vokal ergänzen: the choices give the answer away.** The distractors are always the first two of `a, e, i, o, u` that differ from the answer (`puzzle-catalogue.js`, vowel loop). So:

- **o** and **u** never appear as wrong choices. In 11 of 64 Aufgaben, whenever an o or u is offered, it is the answer.
- **e** is the answer in 35 of 64 Aufgaben (55 %), and every one of those shows exactly `e, a, i`. Always tapping «e» is right more than half the time.

Suggestion: draw the distractors from all five vowels, balanced per word, and add words whose gap is i, o or u.

<a id="c-2"></a>**C-2 · High · The acorn is called «Nuss».** `forest-nut` and `nut` are acorns. Several Rätsel call them «Nüsse»: Mengen zählen («Wie viele Nüsse sind hier?», 25 Aufgaben), the Biber matrices (instruction «Blätter, Nüsse und Federn»), and Wörter mit Bildern verbinden («Nuss» → acorn, [screenshot](acorn-called-nuss.webp)). Meanwhile the Dachs asks «Was wächst aus einer Eichel?». Children learn two names for the same picture, and one of them is wrong in everyday language. Suggestion: either draw a hazelnut (the den/habitat backgrounds already show hazelnuts) or say «Eicheln» consistently.

<a id="c-3"></a>**C-3 · Medium · The Biber Rätsel title doesn't match its task.** The title is «Mengen vergleichen» (competence «Mengen von Waldgegenständen vergleichen»), but the task is a 3 × 3 matrix: «Welcher Waldgegenstand fehlt?». The Fisch also has a Rätsel called **«Mengen vergleichen»**, so the gallery and review list two different Rätsel under the same name. The instruction «In jeder Reihe liegen gleich viele Blätter, Nüsse und Federn wie in der ersten Reihe» is also confusing for the 25 two-object Aufgaben, where a row contains no feathers at all. A suggested wording: «In jeder Reihe liegen die gleichen Dinge wie in der ersten Reihe». (Correctness was checked: all 43 matrices have exactly one valid answer.)

<a id="c-4"></a>**C-4 · Medium · Duplicate, off-topic and weak questions in the reading/nature Rätsel.**

- *Repeated across Rätsel:*
  - «Wer baut ein Netz?» appears in both Reh `riddle-11` and Igel `nature-question-7`.
  - Honey appears three times: Reh `riddle-21`, Dachs `riddle-7` and Igel `nature-question-3`.
  - Caterpillar → butterfly appears in Dachs `riddle-9` and Igel `nature-question-11`.
  - «Wer hat Streifen im Gesicht?» appears in Dachs `riddle-15` and Igel `riddle-11`.
- *Near duplicates within a Rätsel:*
  - Dachs: «Was fällt aus der Wolke?» / «Woraus fällt der Regen?» (`0`/`1`), and «Was wächst aus der Bohne?» / «Was wächst aus einem Samen?», whose `seedling` and `plant` pictures look almost the same (`2`/`18`).
  - Reh: «Wo holt die Biene Nektar?» / «Wo sammelt der Schmetterling Nektar?» (`6`/`16`).
- *Off-competence:* Reh («Lebensräume und Nahrung») asks about sun, moon and grapes. Dachs («Wachstum und Naturveränderungen») asks about a snowman, a spade, a watering can and badger stripes.
- *Weak answer pictures:*
  - «Wo sucht der Igel kleine Tiere?» → a single oak leaf.
  - «Was knabbert der Hase auf der Wiese?» → an oak leaf (hares eat grass).
  - «Was siehst du am Abend?» → sunset, while rain and a snowman can be seen in the evening too.
  - «Wer bellt?» → the `dog` drawing shows a lying, sleeping dog.

<a id="c-5"></a>**C-5 · Medium · Schritte im Raum planen: the rocks almost never matter.** A BFS over all 30 routes found the obstacles lengthen the shortest path in only **1 of 30** Aufgaben (`4-4`). Ten Aufgaben are three straight steps along an edge. The instruction says «Um die Felsen musst du herumgehen», and the difficulty field promises «gesperrte Felsen». In practice the Rätsel is easier than described and varies little.

**C-6 · Medium · Mengen addieren never reaches 10.** The difficulty says «Summe höchstens 10», but the generator uses `b ≤ 9 − a`, so sums run from 2 to 9 and the important ten-partners (e.g. 3 + 7) never appear.

**C-7 · Low · Theme drift in Tiermerkmale (Igel).** Zebra, lion, tiger, camel, giraffe, elephant and penguin sit next to Swiss woodland animals in a Rätsel hosted by the Igel. The Mouse word list has the same mix. This isn't wrong, but it is inconsistent with the woodland world.

**C-8 · Low · Silben.** 22 of 39 words have two syllables, so 4 and 5 appear only twice each. «Eisenbahnzug» is an unusual word for a steam locomotive (children say «Lok», «Zug» or «Eisenbahn»). It still works because the word is printed.

**C-9 · Low · The Zahlennachbarn prompt doesn't fit «Vorgänger gegeben».** When the left neighbour is given, the prompt still asks «Welche Zahlen kommen davor und danach?», although only «danach» is missing.

**C-10 · Low · Number choices are shuffled.** Counting, addition, filling up and syllable answers appear in random order (e.g. 13 · 12 · 14, 5 · 4 · 6). Zahlennachbarn shows its numbers in ascending order. For first graders, ascending order supports number-line thinking. It would also make the number Rätsel consistent with each other.

Verified correct: all 25 rhyme pairs, all 30 colour Aufgaben, all 30 Steinbock patterns (exactly one valid choice each), all 43 Biber matrices, all 30 mirror masks (3–5 leaves), and the picnic totals. No duplicate choices, and no answer is missing from its choices. Swiss spelling (weiss, Juhui, Grösse) is consistent, and no «ß» appears in the UI.

### Design and layout

**D-1 · Medium · Reading Rätsel use space unevenly.** In Kurze Sätze, Tiermerkmale, Lebensräume, Wachstum and Farbwörter, a single short sentence sits in a large, mostly empty task panel (≈ 400 px tall on a tablet). The answer pictures the child actually has to compare are only ≈ 90 px ([screenshot](reading-layout.webp)). The fish in Mengen addieren and Mengen vergleichen are ≈ 25 px inside a large empty panel ([screenshot](tablet-puzzles.webp)). Giving the answers and counted objects more of the height would help children more than the empty panel does.

**D-2 · Low · Two layouts for the same kind of reading task.** *Wörter mit Bildern verbinden* (Maus) shows the word in a floating card with no task panel and a large gap under the prompt ([screenshot](acorn-called-nuss.webp)). *Kurze Sätze verstehen*, *Tiermerkmale* and the others use the full task panel. The blueprint asks for one page system.

**D-3 · Medium · Phone map: the target can be off-screen.** At 390 × 844 the map opens centred on the den, and the 880 px board is wider than the screen. In the test journey the letter came from the Waldkauz, and the Waldkauz pin was **not visible** without panning. The badger, Blaumeise and fish pins were clipped at the edges ([screenshot](phone-letter-world-map.webp)). Suggestion: open the map centred on the active letter's friend (or between the fox and the friend), or show an edge arrow.

**D-4 · Low · Style break between the world and the pages.** The den, the forest and the fox are glossy 3D renders, while the Rätsel pages, letter and map are watercolour/pencil. The [visual style](../../../design/VISUAL-STYLE.md) documents this as intentional. It is still the most visible inconsistency for a first-time player, so the owner should confirm it on a real iPad.

**D-5 · Low · A retired feature is still mentioned.** The Rätsel-Prüfung GitHub panel says «Spielstände und Zeichnungen bleiben auf dem Gerät». Drawing has been retired.

What is consistent: the back/portrait/speaker header, the five leaves, the Andika and Baloo roles, the dashed warm outline for wrong answers, the soft-green «Das passt!» with no check mark, the 2.2-second celebration «Juhui, fünf geschafft!» ([screenshot](answer-feedback.webp)), painted host habitats, and painted portraits on letters, pins and contexts. No emoji or stock imagery appears anywhere. All task controls are at least 48 px.

### Bugs and accessibility

**B-1 · Low · Wrong accessible name «lilae Blume».** `renderColours` builds the label as `name + 'e'` and only treats «rosa» as invariable. The lila flower is therefore announced as «lilae Blume». It should be «lila Blume».

**B-2 · Low · The mirror pattern is invisible to assistive technology.** Only the right-hand target cells are exposed («Spiegelfeld Reihe 1 Spalte 1 …»). The given left pattern has no accessible description.

**B-3 · Low · Picture answers name their subject.** Buttons such as «Bild: Hase» in *Wörter mit Bildern verbinden* turn the reading task into text matching for screen-reader users. This is probably acceptable, but it should be a deliberate decision.

No JavaScript errors or console errors occurred in any manual session: review, gallery, all 22 renderers, the den, the outdoor world and the map, on tablet and phone.

### Tests

<a id="t-1"></a>**T-1 · High · A required browser suite fails.** `tests/puzzle-gallery-browser.cjs:42` asserts that Rätsel-Prüfung lists **23** puzzles. Since 9.4.27 retired «Zeitliche Abfolgen ordnen», the app correctly lists 22. With only that number corrected (in a scratch copy, not in the repo), the rest of the suite passes. The regression went unnoticed because the «Puzzle contract» CI workflow runs only the static checks and `node --test`. None of the browser suites listed as required in [Development](../../DEVELOPMENT.md) run in CI.

**T-2 · Medium · Flaky assertion in `puzzle-review-browser.cjs:147`.** After Space then Enter on a focused wrong answer, the test expects 12 clicks and once saw 11. A rerun passed all 763 solutions and the whole suite. A child won't notice, but the flake makes the required suite unreliable.

**T-3 · Low · `updates-browser.cjs` needs full history.** The default legacy ref `95b27dc` does not exist in a shallow clone (cloud sessions, CI). It passes with `FARBTUPF_LEGACY_REF=d00f381 FARBTUPF_LEGACY_VERSION=9.4.31`. A fallback or a clear error would help.

### Documentation consistency

**K-1 · Medium · The documents disagree about the size of the game.**

| Document | States | Actual |
| --- | --- | --- |
| [Puzzle catalogue](../../PUZZLE-CATALOGUE.md), [README](../../../README.md), [Rätsel bei den Waldfreunden](../../RIDDLE-FRIENDS.md), [Development](../../DEVELOPMENT.md) | 22 Rätsel, 763 Aufgaben | ✅ |
| [Letter sessions](../../LETTER-SESSIONS.md) | «alle 23 Rätsel und 794 Aufgaben» | ❌ |
| [Puzzle blueprint](../../../design/PUZZLE-BLUEPRINT.md) | «Vergleichsbogen mit allen 23 Rätseln», «All 23 current riddles» | ❌ |
| [Curriculum](../../CURRICULUM.md) | «23 current Rätsel» | ❌ |
| [Takeover guide](../../CLAUDE-HANDOFF.md) | «twelve friends each host two Rätsel» | ❌ Ten host two; Dachs and Steinbock host one |

**K-2 · Low · Retired Rätsel pages look active.** `docs/puzzles/` contains nine pages for retired puzzles without a retirement note: `friends-frog`, `friends-kingfisher`, `nature`, `pattern`, `read-colours`, `read-leaves`, `read-word`, `trace` and `trace-numbers`. Only `sequence` and `shape-match` say they were removed. The [blueprint](../../../design/PUZZLE-BLUEPRINT.md) also still mandates rules for retired content («Full upper/lower alphabet including ÄÖÜ; numeral practice includes the complete 0–9 set», «Handwriting requires all strokes»), and no active Rätsel uses them.

## Recommended order of work

1. Review the 19 open Zahlennachbarn Aufgaben, or accept the release without them (R-1).
2. Correct the test expectation to 22, and add at least `puzzle-gallery-browser` / `letter-sessions-browser` to CI (T-1, T-2).
3. Next content revision: vowel distractors (C-1), acorn naming (C-2), Biber title and instruction (C-3), Wege with rocks that block (C-5), sums up to 10 (C-6), and pruning duplicates and off-topic questions (C-4). Each changes Aufgaben and needs adult review again.
4. Design: phone map centring (D-3) and the reading-page proportions (D-1, D-2).
5. Documentation counts and retired pages (K-1, K-2), plus the small accessibility fixes (B-1, B-2).

Still open for the owner and outside automation: physical iPad/Safari feel, sound comfort, speech quality, and whether the content suits real first graders.

## Follow-up in 9.4.33

The owner asked for all findings to be fixed and the habitat backgrounds to be replaced. The full record is in the [23 November follow-up](../../RAETSEL-FEEDBACK-2026-11-23.md).

| Finding | Status in 9.4.33 |
| --- | --- |
| R-1 Zahlennachbarn | Still needs the owner's review in Rätsel-Prüfung. The «given left» prompt now reads «Welche Zahl kommt danach?» (C-9). |
| R-2 Bulk approvals | Process note. The changed Rätsel must now be reviewed again anyway (see below). |
| C-1 Guessable vowels | Fixed: wrong vowels rotate, «e» is also offered for every other vowel, and 17 new a/i/o/u words. A vowel that is offered is now correct 22–43 % of the time, where o/u used to be 100 %. |
| C-2 Acorn called «Nuss» | Fixed: counted acorns are «Eicheln»; «Nuss» shows the drawn Baumnuss. |
| C-3 Biber title/rule | Fixed: «Reihen ergänzen», with a clear rule. |
| C-4 Duplicate/weak questions | Fixed: 8 Reh and 7 Dachs questions replaced with habitat, growth and season questions; the barking dog runs. |
| C-5 Wege | Fixed: 30 authored routes; the rocks always force a detour of at least two steps. |
| C-6 Sums to 10 | Fixed: nine ten-partner Aufgaben. |
| C-7 Savannah animals | Kept: the owner curated these questions on 22 November. |
| C-8 Syllables | Fixed: «Lokomotive», plus eight more three- to five-syllable words. |
| C-9, C-10 | Fixed: neighbours prompt; number cards ascending. |
| D-1, D-2 | Fixed: one compact reading layout with larger picture answers; larger fish. |
| D-3 | Fixed: the map opens showing the letter's destination. |
| D-4 | Resolved: the habitat paintings now share the den/world style. |
| D-5, B-1, B-2 | Fixed. A latent «-rote Blume» picture name was also corrected. |
| B-3 | Kept on purpose: screen-reader users need the picture names. |
| T-1, T-2, T-3 | Fixed: counts, a race-free keyboard check, a clear shallow-clone message, and a CI browser job. |
| K-1, K-2 | Fixed: counts and statements aligned; retired Rätsel pages are marked. |
| Missed in the review | The documented historical recovery check (`WALDPOST_REVIEW_REF=61ef045…`) had failed since 9.4.27; it now names the Rätsel changed on purpose. |

Approvals: 568 unchanged Aufgaben keep them through the owner-requested presentation bridge. 195 changed and 34 new Aufgaben need review in Rätsel-Prüfung before their 12 Rätsel return to children.
