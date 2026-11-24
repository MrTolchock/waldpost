# Final release review — Waldpost 9.4.41

| | |
| --- | --- |
| Reviewed build | `main` @ `ff8c738` — Waldpost **9.4.41** (`FK.VERSION`, service-worker cache `farbtupf-v9.4.41-waldpost`) |
| Review date | 24 November 2026 |
| Review ledger | `puzzle-review-data` @ `2f34218` (24 Nov, 07:53 +01:00). It was read only, and no decisions were written. |
| Role | Independent final reviewer. **Nothing in the game was changed.** This report and its screenshots are the only additions. |
| Scope | Consistency, design, bugs, Rätsel content and difficulty, the child journey, adult review and gallery, offline and release behaviour, documentation, tests. It also follows up the [9.4.32 review](../2026-11-23-release-review/README.md). |

## Verdict

**Release with conditions.** The engine is solid. All repository checks, all 196 unit tests and all 30 browser suites pass in their default form. One documented variant of the review-recovery check fails because of a stale test expectation ([T-3](#t-3)). CI and the Pages deployment for `ff8c738` are green. No Aufgabe has a wrong answer. Every Aufgabe fits a 1080 × 810 tablet and a 390 × 844 phone without scrolling. A whole child round runs without console errors: den → letter → friend → five Aufgaben → celebration → courier. Almost every finding from the 9.4.32 review is fixed.

Three things need attention before you call 9.4.41 finished:

1. **Four Rätsel are offline for children, and Steinbock has nothing at all** ([R-1](#r-1)). The 9.4.41 wording changes correctly reopened 135 Aufgaben. Until they are reviewed again, Steinbock gets no letters, and Biber, Igel and Eichhörnchen each offer only one Rätsel.
2. **A child can get stuck on an invitation that can't be played** ([R-2](#r-2)). This is reproduced: a saved letter to a friend with no released Rätsel stays in place, and tapping the friend only shows an adult text toast. Right now this hits any device that has an open Steinbock letter. The same dead end happens on a first start without access to the review ledger.
3. **Two Rätsel break on phones** ([B-1](#b-1)). Mengen ergänzen and Muster spiegeln overflow their frame at 390 px. At 360 px the last column is cut off. In Mengen ergänzen that hides empty places the child has to count, so the visible count leads to a wrong answer. The tablet, the main device, is not affected.

## What was tested

| Area | How | Result |
| --- | --- | --- |
| Repository checks | `style.cjs --check`, `map/layout.cjs --check`, `puzzle-catalogue.cjs --check`, `library.cjs --check`, `handoff.cjs --check`, `check-design.cjs`, visual baseline script | ✅ all pass |
| Unit/model tests | `node --test tests/*.test.cjs` with full Git history | ✅ 196 / 196. In a shallow clone, 4 fail with «Cannot read baseline …» ([T-1](#t-1)). |
| Browser suites | All 30 `tests/*-browser.cjs`, plus the documented `WALDPOST_REVIEW_REF=61ef045…` variant, Chromium (SwiftShader), disposable storage, intercepted GitHub | ✅ 30 / 30 pass, including the update path from the legacy release. ❌ The `WALDPOST_REVIEW_REF` variant fails ([T-3](#t-3)). |
| Release status | The real app against the real published ledger, read only | 18 / 22 Rätsel released, 662 / 797 Aufgaben ([R-1](#r-1)) |
| Layout | `tools/raetsel-ansichten/survey.cjs` for **all 797 Aufgaben** at tablet and phone. `measure.cjs` for type and picture sizes. My own frame-overflow check of every Rätsel at 390, 360 and 320 px. | ✅ tablet and phone fit. ✅ two type sizes, one weight. ❌ Frame overflow on phones ([B-1](#b-1)). |
| Content | All 797 Aufgaben dumped from the runtime catalogue, with every answer, choice and picture. Scripted checks: robot BFS, mirror answers, treasure distractors, picnic totals, answer distributions. The pictures behind the factual questions were inspected. | No wrong answers. Didactic findings below. |
| Child journey | Real taps on tablet 1080 × 810, iPad portrait 810 × 1080 and phone 390 × 844: den → letter → «Zum Freund gehen» → friend → a wrong and a right answer → five Aufgaben → celebration → courier phase | ✅ works, no console errors |
| Edge cases | An invitation to a friend with no released Rätsel. A first start with GitHub unreachable. | ❌ dead end ([R-2](#r-2)) |
| Accessibility | ARIA snapshots of Mengen vergleichen, Gegenstände merken, Mengen verteilen and Muster fortsetzen | Minor findings ([A-1](#a-1)) |
| Security | Where the GitHub review token is kept | ✅ session storage only, never exported |
| CI / Pages | GitHub Actions on `main` | ✅ «Puzzle contract» and «pages build and deployment» are green for `ff8c738` |

Screenshots: [all Rätsel on the tablet](tablet-raetsel.webp) · [Rätsel on the phone](phone-raetsel.webp) · [phone clipping](phone-clipping.webp) · [stuck invitation](stuck-invitation.webp) · [answer feedback and celebration](answer-feedback.webp) · [pattern line break](pattern-wrap.webp) · [den on the phone](phone-den.webp) · [letter focus ring](letter-focus.webp)

## Findings

Severity: **High** — fix before or right after release · **Medium** — next revision · **Low** — polish.

### Release status

<a id="r-1"></a>**R-1 · High · Four Rätsel (135 Aufgaben) are not released, and Steinbock has no Rätsel left.** In 9.4.41 the owner shortened four questions: «Welcher Gegenstand fehlt?», «Welches Bild fehlt im Muster?», «Wie viele Marienkäfer sind hier?» and «Merke dir die vier Gegenstände.». Under the review rules a changed question reopens its Aufgaben, so this is correct. [`tests/review-changes-2026-11-24.cjs`](../../../tests/review-changes-2026-11-24.cjs) and [PUZZLE-REVIEW](../../PUZZLE-REVIEW.md) document it. Against the published ledger:

| Rätsel | Host | Current approvals | Effect for children |
| --- | --- | --- | --- |
| Reihen ergänzen (`friends-beaver`) | Biber | 0 / 43 | Biber offers only Muster spiegeln |
| Muster fortsetzen (`friends-ibex`) | Steinbock | 0 / 30 | **Steinbock gets no letters at all**. It is his only Rätsel. |
| Mengen gezielt zählen (`count`) | Igel | 0 / 30 | Igel offers only Tiermerkmale |
| Gegenstände merken (`treasure`) | Eichhörnchen | 0 / 32 | Eichhörnchen offers only Mengen zählen |

The other 18 Rätsel are fully approved, with no flags and no general comments. **Action:** play the 135 open Aufgaben in Rätsel-Prüfung, or knowingly ship with 18 Rätsel. Until then, also note [R-2](#r-2).

<a id="r-2"></a>**R-2 · High · A child can be stranded by an invitation that can't be played.** `FriendsState` only uses `eligible` when it picks the *next* recipient. An invitation that already exists keeps its friend, even after that friend's last Rätsel loses its approval. In `game.js` `meet()`, `FK.friendsLibrary.pick()` then returns `null`, and the child only sees the toast «Dieses Rätsel wartet noch auf die Freigabe von Erwachsenen.» ([screenshot](stuck-invitation.webp)). The child can't do anything else: other friends just point back to the invited one, and no new letter arrives. Only an adult can fix it, with «Neue Briefreise starten» or a review.

- *Reproduced:* the saved journey was changed to an open Steinbock invitation, as a device from before 9.4.41 could have. After a reload the letter is still Steinbock's, `FK.puzzleReview.ready('friends-ibex')` is `false`, and the toast appears at Steinbock.
- *Same dead end on a first start without the ledger:* this happens offline, or when `raw.githubusercontent.com` is blocked, for example by a school network filter. No Rätsel is «ready», so `FriendsState` falls back to the plain bag order «as before». The first letter goes to a friend who can't open a puzzle. Reproduced with Igel.

Suggestion: when an invitation becomes undeliverable, quietly re-address it to the next eligible friend. If no friend is eligible, don't send a letter. Show the den state and tell the adult in Settings that the review data is missing. The toast is written for adults, but a non-reading first grader is the one who sees it.

### Bugs and layout

<a id="b-1"></a>**B-1 · High (phone) · Mengen ergänzen and Muster spiegeln overflow their frame and are cut off on narrower phones.** Measured in the real renderer ([screenshot](phone-clipping.webp)):

| Width | Mengen ergänzen (`rocket`) | Muster spiegeln (`mirror`) |
| --- | --- | --- |
| 390 px | 15 px outside the frame. Still on screen. | 17 px outside the frame. Still on screen. |
| 360 px (common Android size) | 45 px outside the frame, **10 px off screen**. The 5th column of places is cut. | 47 px outside the frame, **12 px off screen**. The 3rd target column is cut. |
| 320 px | 50 px off screen | 52 px off screen. Only 1½ target columns are visible. |

The sizes are fixed (5 × (52 + 10) px for places, 2 × 3 × 46 px plus the mirror). They don't shrink to the paper. In Mengen ergänzen, a child who counts the visible «?» places gets the wrong answer. At 320 px Mengen zählen, Mengen gezielt zählen, Schritte im Raum planen and Gegenstände merken also go 14–40 px past their frame. `survey.cjs` and `ipad-puzzle-layout-browser.cjs` miss this. They compare `paper.scrollWidth`, but the overflow is clipped, and they only test 390 px. See [T-2](#t-2).

**B-2 · Medium · Muster fortsetzen breaks the pattern across lines.** On the tablet, a nine-element pattern (ABAC, AABC) wraps after 7 pictures. On the phone, sequences wrap after 4 ([screenshot](pattern-wrap.webp)). The line break cuts through the repeating unit. That is exactly what the child has to see, and on the phone the gap «?» sits alone on its own line. The other number rows keep their grid on purpose («Volle Reihen bleiben im Fünferraster»). The pattern needs one line, or a break only at the end of a unit.

**B-3 · Low · Success is bigger than the layout spec says.** [RAETSEL-LAYOUT](../../../design/RAETSEL-LAYOUT.md) says: «Das Gelöste (Antwort, Reihe, Plätze) wird grün … nicht die ganze Rahmenbreite». In practice, `FK.waldbuch.celebrate` also gives the **whole paper** a green halo (`.wb-won`). It makes the host portrait jump out of its row (`.wb-hop`) and scales the current leaf to 130 % (`.wb-pop`) ([screenshot](answer-feedback.webp)). This is pleasant, but undocumented. Either add it to the spec or limit it to the solved element.

**B-4 · Low · Mengen gezielt zählen has its own background inside the frame.** `.puzzle-meadow` adds a radial green/beige gradient, and every 3rd/4th insect is rotated by ±10–12°. The spec asks for one frame `#f4f0e1` «ohne Verlauf». The rotation also produces a third measured picture size (88/90 px bounding boxes).

**B-5 · Low · The letter shows a blue rectangular focus ring after a tap.** When the envelope is opened by touch, the dialog gets a 1 px blue rounded rectangle that does not follow the deckled paper ([screenshot](letter-focus.webp)). This is probably `:focus-visible` on the programmatically focused dialog. Keyboard focus should stay visible, but in the sepia/ochre palette and not after touch.

**B-6 · Low · The den looks doubled on phones.** At 390 × 844 and 844 × 390, the den painting is letterboxed with an enlarged, *sharp* copy of the same painting (`.ff-painted-fill`, `cover`, darkened by only 32 %). Shelf, bed, pencils and picture cards appear twice ([screenshot](phone-den.webp)). A blurred or plain fill would read as a frame and not as a glitch. In landscape, the exit sign also touches the «0/3» counter.

**B-7 · Low · The courier pin hides under the toolbar.** After a Rätsel, the courier's off-screen pin sat at the top edge under the «1/3» counter, half cut off. The glowing trail still leads the child there.

### Content and level of the Rätsel

Verified correct: all 797 answers are in their choices; all 30 Wege are solvable and the rocks always force a detour; all 30 mirror answers; the treasure distractors are never items that were shown; the picnic totals; the syllable counts; and the vowel gaps (none inside au/ei/ie/eu/äu). The pictures behind the factual questions match: the Reh has antlers, the fox's tail tip is white, the Blaumeise's head is blue, the caterpillar has legs. Swiss spelling (weiss, grosse, Giesskanne) is consistent, and no «ß» appears.

<a id="c-1"></a>**C-1 · Medium · Silben zu Wörtern verbinden always uses «MA» as the distractor.** 27 of 28 Aufgaben add the chip «ma». Tomate adds «lo» instead, because «ma» belongs to the word. After one or two rounds a child learns to ignore «MA», so the stated difficulty «ein Ablenker» disappears. Use a distractor that sounds similar or is a plausible syllable for each word (e.g. Ha-se + «Ho», Wol-ke + «Wal»).

**C-2 · Medium · Reime erkennen has only two answers.** It is the only choice Rätsel with two cards, so guessing is right 50 % of the time. «Hut» is the distractor in 7 of 25 Aufgaben, and «Rose» is both a target and an answer (Rose–Dose, Hose–Rose). Add a third card with a near-miss distractor (e.g. Tisch → Fisch / Tasche / Hut).

**C-3 · Medium · Mengen vergleichen and Mengen addieren don't use the five structure.** The fish stand in 3 columns on the tablet and 2 on the phone. In «9 und 10» the child has to compare 3 + 3 + 3 with 3 + 3 + 3 + 1 ([tablet sheet](tablet-raetsel.webp)). Counting and filling places use rows of five «damit man in Fünfern zählen kann», so the fish Rätsel should too. In Mengen vergleichen the left group is always bigger by exactly 1 and the right group by exactly 2. 10 of 28 answers are «Gleich viele», which is shown only as «=» under the question «Wo sind mehr Fische?».

**C-4 · Medium (owner decision) · The reading load without read-aloud.** Since 9.4.40 nothing is read aloud. Tiermerkmale, Lebensräume and Wachstum now depend on reading sentences such as «Wer wühlt mit der Schnauze im Waldboden?», «Welcher Vogel steht lange still im Wasser?» and «Was siehst du, wenn am Abend die Sonne untergeht?» with no help. That fits the stated D.2.B.1.b, but in November of first grade many children can't decode these yet. The adult should confirm with real children. The alternative is shorter sentences for the open Rätsel.

**C-5 · Low · Small content points.**

- *Vowels:* «e» is still the answer in 35 of 81 Aufgaben (43 %), and «e» is offered in all 81 Aufgaben.
- *Zahlennachbarn:* only the left neighbour is ever given («Welche Zahl kommt danach?»). The «davor»-only case never comes up.
- *Muster spiegeln:* 7 of 30 patterns are symmetric in themselves, so the answer is a straight copy.
- *Prompts:* Igel asks «Welches Tier passt?», while Reh and Dachs ask «Welches Bild passt zur Frage?» for the same kind of question.
- *Dachs:* «Was siehst du, wenn am Abend die Sonne untergeht?» → Sonnenuntergang names the answer.

<a id="a-1"></a>**A-1 · Low · Some Rätsel can't be solved with a screen reader.** In Mengen vergleichen the groups are buttons «Links/Rechts sind mehr Fische», but the number of fish isn't exposed. In Gegenstände merken the four objects have no names. In Muster fortsetzen the sequence is not exposed, only «?». In Mengen verteilen the friends are «Freund 1–3» and not Fuchs, Maus and Blaumeise. The previous review fixed this for Muster spiegeln.

### Documentation

**K-1 · Medium · Read-aloud is gone from the game but not from the rules.** 9.4.40 removed all speech and the «Spiel erklären» button, and the runtime and tests agree. These documents still prescribe it:

- [PUZZLE-BLUEPRINT](../../../design/PUZZLE-BLUEPRINT.md):
  - the anatomy diagram «Back · Host portrait · context · Explain»
  - «The back and rule-speaker controls share a quiet 48 px circular frame»
  - «Speech only when requested»
  - «a small rejection × in the usual speech-control slot»
  - «children keep the shared “Spiel erklären” control during normal play»
- [VISUAL-STYLE](../../../design/VISUAL-STYLE.md): «The rule speaker matches the back button's 48 px circle»
- [STYLE-AUDIT](../../../design/STYLE-AUDIT.md): «The rule-speaker button matches that»
- **All 33** pages under `docs/puzzles/`: «Guidance | One optional rule explanation». These pages are generated, so fix the text in `tools/puzzle-catalogue.cjs` and regenerate.

The blueprint is the contract for new Rätsel, so a new Rätsel built from it today would bring the speaker back.

### Tests and tools

<a id="t-1"></a>**T-1 · Low · Four unit tests need full Git history.** `puzzle-review.test.cjs` (2 tests) and `puzzle-revisions.test.cjs` (2 tests) fail in a shallow clone with «Cannot read baseline 073657f…/12511e4…/b7c77ec…». CI uses `fetch-depth: 0`, so CI is fine. A local or cloud clone fails confusingly until `git fetch --unshallow`. A clear hint, like the one `updates-browser.cjs` got in 9.4.33, would help.

<a id="t-2"></a>**T-2 · Medium · The layout tools can't see clipped content.** `tools/raetsel-ansichten/survey.cjs` reports `hscroll` from `scrollWidth`, and `ipad-puzzle-layout-browser.cjs` checks phones only at 390 px. Both passed while B-1 was present. Add a check that every button and picture lies inside `.puzzle-scene` and the viewport, and add a 360 px phone.

<a id="t-3"></a>**T-3 · Medium · A documented required check fails.** [Development](../../DEVELOPMENT.md) lists `WALDPOST_REVIEW_REF=61ef045… node tests/review-recovery-browser.cjs` («every Rätsel unchanged since the habitat release keeps its pre-background approvals»). It fails with `AssertionError: every unchanged pre-background Rätsel remains compatible`, because it still expects `friends-ibex` among the compatible Rätsel. Line 21 lists the intentional changes from `review-changes-2026-11-23.cjs`, but not from the new `review-changes-2026-11-24.cjs`, which reworded Muster fortsetzen. The default run of the same suite passes. CI doesn't run this variant, so it went unnoticed. This is the same pattern as the «missed in the review» note of 9.4.33.

## Follow-up of the 9.4.32 review

| Finding then | Now |
| --- | --- |
| R-1 Zahlennachbarn not released | ✅ 36 / 36 approved |
| C-1 Guessable vowels | ✅ improved (o/u are now offered as wrong choices). See the residual note in C-5. |
| C-2 Acorn called «Nuss» | ✅ «Eicheln» |
| C-3 Biber title | ✅ «Reihen ergänzen» |
| C-4 Duplicate/weak questions | ✅ replaced (e.g. «Was knabbert der Hase auf der Wiese?» → Löwenzahn) |
| C-5 Wege without detour | ✅ every route forces a detour (BFS) |
| C-6 Sums to 10 | ✅ nine ten-partners |
| C-9 / C-10 Neighbour prompt, number order | ✅ |
| D-1 / D-2 Reading layout | ✅ one reading layout |
| D-3 Phone map centring | ✅ the map opens on the letter's friend |
| B-1 / B-2 Accessible names | ✅ (other Rätsel: A-1) |
| T-1 / T-2 / T-3 Tests, CI | ✅ a CI browser job exists and is green |
| K-1 / K-2 Doc counts, retired pages | ✅ counts consistent (22 / 797). Retired pages are marked. |

## Recommended order of work

1. Review the 135 open Aufgaben of the four reworded Rätsel (R-1), especially Muster fortsetzen, so Steinbock is back.
2. Re-address undeliverable invitations, and send no letter without review data (R-2).
3. Make the place and mirror grids fit narrow phones, and extend the layout checks (B-1, T-2). Add the 24 November changes to the historical recovery check (T-3).
4. Next content revision, which needs review again: syllable distractors (C-1), a third rhyme card (C-2), fives for the fish (C-3), one line for patterns (B-2), and the reading-load decision (C-4).
5. Update the blueprint, visual style and catalogue generator for «no read-aloud» (K-1). Then polish B-3 to B-7 and A-1.

Still open for the owner and outside automation: the feel on a physical iPad/Safari, sound comfort, and whether the content suits real first graders.
