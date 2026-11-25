# Final release review — Waldpost 9.4.43

| | |
| --- | --- |
| Reviewed build | `main` @ `908f631` — Waldpost **9.4.43** (`FK.VERSION`, service-worker cache `farbtupf-v9.4.43-waldpost`) |
| Review date | 25 November 2026 |
| Review ledger | `puzzle-review-data` @ `f997e9e` (24 Nov, 20:08 +01:00). It was read only, and no decisions were written. |
| Role | Independent final reviewer. **Nothing in the game was changed.** This report and its screenshots are the only additions. |
| Scope | Consistency, design, bugs, Rätsel content and difficulty, the child journey, adult review and gallery, offline and release behaviour, accessibility, documentation, tests. It builds on the [9.4.41 review](../2026-11-24-release-review/README.md) and checks every finding from it. |

## Verdict

**Release with conditions.** 9.4.43 is a clear step forward. Most findings from the 9.4.41 review are fixed: the four reworded Rätsel are approved again, so Steinbock is back. A stranded invitation now moves to a friend who can play. No Rätsel overflows its frame on narrow phones any more. Patterns stay on one line, the success look matches the spec, and the screen reader gets names for patterns, memory objects, picnic friends and fish counts. All repository checks, all 199 unit tests and all 30 browser suites pass in their default form. As in the last review, the documented variant of the review-recovery check fails on a stale expectation ([T-3](#t-3)). CI and the Pages deployment for `908f631` are green. No Aufgabe has a wrong answer. A whole child round runs on tablet and phone without console errors.

Three things need attention before you call 9.4.43 finished:

1. **Dachs has no Rätsel for children** ([R-1](#r-1)). The new «Lesen und verstehen» merges six reading Rätsel (223 Aufgaben). 74 of them reopened because their prompt changed, so the whole Rätsel stays locked. Until they are reviewed, children get no sentence-reading or nature questions at all, and Dachs gets no letters. Only 16 of 17 Rätsel and 11 of 12 friends are playable.
2. **The first start without review data is still a dead end** ([R-2](#r-2)). The 9.4.43 fix works when another friend can play. It does nothing when *no* friend can play: offline on first start, or when a school filter blocks `raw.githubusercontent.com`. The first letter goes to a friend without a released Rätsel, and the child only sees the adult toast. The state survives a reload.
3. **Two new interaction and layout problems** ([B-1](#b-1), [B-2](#b-2)). On phones, Muster fortsetzen shrinks the pattern pictures to 28 px, about half the size of its answer pictures, inside a mostly empty frame. Zahlennachbarn can only be dragged: a tap on a number card does nothing, and keyboard and screen-reader users can't solve it.

## What was tested

| Area | How | Result |
| --- | --- | --- |
| Repository checks | `style.cjs --check`, `map/layout.cjs --check`, `puzzle-catalogue.cjs --check`, `library.cjs --check`, `handoff.cjs --check`, `check-design.cjs`, visual baseline script | ✅ all pass |
| Unit/model tests | `node --test tests/*.test.cjs` with full Git history | ✅ 199 / 199. In a shallow clone, the same 4 tests still fail with «Cannot read baseline …» ([T-1](#t-1)). |
| Browser suites | All 30 `tests/*-browser.cjs`, plus the documented `WALDPOST_REVIEW_REF=61ef045…` variant. Chromium 1243 (SwiftShader), disposable storage, intercepted GitHub. | ✅ 30 / 30 pass, including the update path from the legacy release. `audio-browser` timed out once while other suites ran at the same time, then passed twice on its own ([T-4](#t-4)). ❌ The `WALDPOST_REVIEW_REF` variant fails ([T-3](#t-3)). |
| Release status | The real app against the real published ledger, read only | 16 / 17 Rätsel released, 723 / 797 Aufgaben approved ([R-1](#r-1)) |
| Layout | `survey.cjs` for **all 797 Aufgaben** at tablet (1080 × 810), phone (390 × 844), 360 × 780 and 320 × 640. `measure.cjs` for type and picture sizes at tablet and phone. | ✅ tablet, 390 and 360: no overflow, no clipping. ✅ 320: no clipping. ❌ 320: 63 Aufgaben reach below the screen ([B-3](#b-3)). ❌ Pattern picture and type sizes ([B-1](#b-1)). |
| Content | All 797 Aufgaben dumped from the runtime catalogue, with every answer, choice and picture. Scripted checks: answers in choices, duplicate choices, robot BFS, mirror answers, treasure distractors, distributions. All 223 Dachs Aufgaben read by hand. A simulation of 100 000 Dachs rounds. | No wrong answers. Didactic findings below. |
| Child journey | Real taps on tablet and phone, against the real ledger: den → letter → «Zum Freund gehen» → friend → a wrong and a right answer → five Aufgaben → celebration → courier phase | ✅ works, no console errors |
| Edge cases | A saved invitation to Dachs (no released Rätsel). A first start with GitHub unreachable, then a reload. An old link to the removed `friends-mouse`. | ✅ Dachs letter moves to Biber. ✅ The removed Rätsel returns to the forest (letter-sessions suite). ❌ The first start offline is a dead end ([R-2](#r-2)). |
| Accessibility | ARIA snapshots of 14 Rätsel. Tap, keyboard and drag tried on Zahlennachbarn. | ✅ the 9.4.41 gaps are fixed. ❌ Zahlennachbarn ([B-2](#b-2)). Minor gap in Silben zu Wörtern verbinden ([A-1](#a-1)). |
| Review ledger | Decisions since the 9.4.41 review, read only | The 135 reopened Aufgaben were approved one by one on 24 Nov. No bulk approvals, flags or general comments ([R-3](#r-3)). |
| CI / Pages | GitHub Actions on `main` | ✅ «Puzzle contract» and «pages build and deployment» are green for `908f631` |

Screenshots: [all Rätsel on the tablet](tablet-raetsel.webp) · [all Rätsel on the phone](phone-raetsel.webp) · [Dachs: word, sentence, question, colour](dachs-reading.webp) · [pattern sizes on tablet, 390 and 320 px](pattern-size.webp) · [320 px phone](narrow-320.webp) · [wrong, right and courier pin on the phone](phone-round.webp) · [den and letter on the phone](phone-den.webp)

## Findings

Severity: **High** — fix before or right after release · **Medium** — next revision · **Low** — polish.

### Release status

<a id="r-1"></a>**R-1 · High · «Lesen und verstehen» is not released, so Dachs has no Rätsel.** In 9.4.43 the owner merged Kurze Sätze verstehen, Lebensräume und Nahrung, Tiermerkmale, Wachstum, Farbwörter and Wörter mit Bildern into one Dachs Rätsel. Under the review rules the 149 unchanged Aufgaben keep their approvals through the «merge» edges. The 74 Aufgaben with a harmonised prompt reopen. This is correct and documented in [`tests/review-changes-2026-11-24-reading.cjs`](../../../tests/review-changes-2026-11-24-reading.cjs). Against the published ledger:

| Part of «Lesen und verstehen» | Aufgaben | Approved now |
| --- | ---: | ---: |
| Wachstum (former Dachs) | 25 | 25 |
| Lebensräume und Nahrung (former Reh) | 25 | 25 |
| Kurze Sätze (former Waldkauz) | 25 | 25 |
| Wörter mit Bildern (former Maus) | 74 | 74 |
| Tiermerkmale (former Igel), «Welches Tier passt?» → «Welches Bild passt zur Frage?» | 44 | **0** |
| Farbwörter (former Eisvogel), «Welche Blume passt zum Satz?» → «Welches Bild passt zum Satz?» | 30 | **0** |
| **Total** | **223** | **149** |

A Rätsel is only released when all its Aufgaben are approved. So children currently can't reach *any* of the 223 reading Aufgaben, including the 149 that were already approved. In 9.4.41 all six of these Rätsel were released. The other 16 Rätsel are fully approved, with no flags and no general comments. The R-2 fix behaves correctly here: a saved Dachs letter moves to another friend (reproduced: Dachs → Biber after a reload).

**Action:** play the 74 open Aufgaben in Rätsel-Prüfung. It is a 10–15-minute job: only the prompt line changed. Until then, 9.4.43 offers less reading than 9.4.42 did.

<a id="r-2"></a>**R-2 · High · The first start without review data still strands the child** (follow-up of 9.4.41 R-2). The new `stranded()` check in `state.js` only re-addresses a letter «when its friend has no released Rätsel but another friend has one». With no review data at all, no friend is ready, so `nextHost` falls back to «any friend». The child gets a letter that can't be played:

- *Reproduced* with GitHub blocked on a fresh profile. The first letter went to Eichhörnchen, and in a second run to Waldkauz. At the friend: «Dieses Rätsel wartet noch auf die Freigabe von Erwachsenen.» After a reload the letter is unchanged.
- This happens on any first start offline, and permanently on networks that block `raw.githubusercontent.com` (school filters). Once the ledger has loaded once, the offline cache prevents it.

Suggestion, unchanged from the last review: send no letter while no Rätsel is released. Show the den, and tell the adult in Settings that the review data is missing. The toast is written for adults, but the child is the one who sees it.

<a id="r-3"></a>**R-3 · Low · Review pace of the reopened Rätsel.** The 135 Aufgaben reopened in 9.4.41 were approved one by one on 24 Nov between 19:51 and 20:08 (+01:00). There are no «Alle bestätigen» notes. Mengen gezielt zählen took 70 seconds for 30 Aufgaben, about 2.3 s each, including counting up to 15 ladybirds. That is legitimate when only the question line changed. Still, a slow play-through of a few Aufgaben per Rätsel would confirm that the counts, pictures and answers really were looked at.

### Bugs and layout

<a id="b-1"></a>**B-1 · Medium · Muster fortsetzen: the one-line fix makes the pattern tiny on phones.** The 9.4.43 rule «Folgen und Muster stehen immer in einer einzigen Zeile … werden alle Felder gemeinsam kleiner» fixed the bad line break (old B-2), but it creates a new problem ([screenshot](pattern-size.webp)). Measured with `measure.cjs`:

| | Pattern pictures | Answer pictures | Gap «?» |
| --- | --- | --- | --- |
| Tablet | 58 px | 76 px | 34 px |
| Phone 390 px | **28 px** | 52 px | **21 px**, a third type size |
| Phone 320 px | about 20 px | 52 px | smaller still |

This breaks three rules of the same [layout spec](../../../design/RAETSEL-LAYOUT.md): «Jedes Bild hat dieselbe Grösse im Rahmen und bei den Antworten», «pro Rätsel höchstens zwei Grössen», and «grosse leere Flächen gibt es nicht». The frame stays 160 px high around a 32 px strip. At 28 px, the stone and the flower are hard to tell apart, and telling them apart is the whole Aufgabe. The exception table doesn't list Muster fortsetzen. Suggestion: on phones, break into two rows only at the end of a repeating unit (AAB | AAB | A?), which keeps the 52 px pictures. Or use 7-element patterns on phones. This changes the rendering, so it needs review again.

<a id="b-2"></a>**B-2 · Medium · Zahlennachbarn can only be dragged.** The number cards are `span` elements with only a drag handler (`js/screens/puzzle.js`, `renderNeighbours`):

- *Tap:* tapping «6» in «4 5 ? …» does nothing. There is no selection, no sound and no hint (reproduced). Every other Rätsel is solved by tapping. Mengen verteilen and the old story cards accept tap *and* drag. A first grader who taps will think the game is broken.
- *Keyboard / screen reader:* the cards can't take focus and have no button role. The ARIA tree only reads «4 5 ? 6 7 8». The Rätsel can't be solved without a pointer.
- The rule text says «Ziehe die Zahl …», so dragging is intended. The missing tap fallback is the problem.

Suggestion: tap a card to select it, then tap a slot, as in Mengen verteilen. Or let a tapped card go straight to the first fitting slot. Make the cards buttons.

<a id="b-3"></a>**B-3 · Low · On 320 × 640 phones, three Rätsel reach below the screen.** `survey.cjs phone320` reports `over > 0` for 63 Aufgaben. There is no clipping, but the answers are below the fold ([screenshot](narrow-320.webp)):

- *Mengen vergleichen:* 16 Aufgaben, up to **135 px** below. At 10 against 9 the fish stand in a single column, and the «=» answer is off screen.
- *Mengen addieren:* all 45 Aufgaben, up to 60 px below.
- *Mengen verteilen:* 2 Aufgaben, up to 19 px below.

390 and 360 px are fine. The spec says the paper «ragt bei keiner Aufgabe über den Bildschirm». 320 px is rare (iPhone SE 1st generation, small Android phones, split view). It is low priority, but the 320 px automated check only covers the six grid Rätsel ([T-2](#t-2)).

**B-4 · Low · The den still looks doubled on phones** (9.4.41 B-6, unchanged). At 390 × 844 the letterboxed den is framed by a sharp, enlarged copy of itself, so shelf, plant and picture cards appear twice ([screenshot](phone-den.webp)). `.ff-painted-fill` in `css/friends.css` is unchanged. A blurred or plain fill would read as a frame.

**B-5 · Low · The courier pin collides with the letter counter** (9.4.41 B-7, unchanged). After a Rätsel on the phone, Hase's off-screen pin is clamped to the top edge at x ≈ 166–224 px and overlaps the «1/3» counter ([screenshot](phone-round.webp), right).

**B-6 · Low · The solved pattern keeps its «?».** In Muster fortsetzen the chosen answer turns green, but the gap in the row still shows «?» during the 900 ms before the next Aufgabe ([screenshot](phone-round.webp), middle). Placing the chosen picture in the gap would show the completed pattern, which is the learning moment. Zahlennachbarn, Silben and Spiegel already show the filled result.

*Not reproduced:* 9.4.41 B-5, the blue focus ring on the letter. After a touch tap on the envelope the letter has no outline (`outline: none`, `:focus-visible` false) at phone and tablet sizes.

### Content and level of the Rätsel

Verified correct: all 797 answers are in their choices (Zahlennachbarn «left» Aufgaben correctly leave out the given neighbour). There are no duplicate choices. All 30 Wege are solvable, and the rocks always force a detour (BFS: 7, 9 or 6 steps instead of 3–4). All 30 mirror answers are right. Treasure distractors are never items that were shown. The 43 Biber matrices and 30 patterns have balanced answers. In counting, the answer sits evenly in the left, middle and right position. The pictures behind the Dachs questions match (Blaumeise head, fox tail tip, Reh antlers, Specht red head). Swiss spelling is consistent, with no «ß».

<a id="c-1"></a>**C-1 · Medium · «Lesen und verstehen» mixes very different levels in one round.** The merged pool contains 74 single words (33 %), 25 sentence pairs with only **two** pictures, 30 colour sentences and 94 long nature questions. Five random Aufgaben make one round. A simulation of 100 000 rounds gives:

- 30 % of rounds mix at least three text types («Maus», «Die Ente schwimmt.», «Wer wühlt mit der Schnauze im Waldboden?», [screenshot](dachs-reading.webp)).
- 45 % contain a two-picture Aufgabe, where guessing is right half the time.
- 5 % show the same answer picture twice. 44 answer pictures occur 2–4 times in the pool: the worm 4 ×, acorn 3 ×, cow 3 ×, bee 3 ×, spider 3 ×, beaver 3 ×. In «Wer baut einen Damm aus Ästen?» after «Biber» the second Aufgabe is answered by recall, not reading.
- The wrong pictures are often trivially wrong. *Fisch* is a distractor 24 ×, *Schnecke* 15 ×, *Ei* 12 × (for example «Was wächst an der Eiche?» → Eichel / Banane / Fisch). The child can often eliminate without reading the question to the end.

Suggestion: draw each round from one text type, or from two neighbouring ones, in rising order (word → sentence → question). Avoid repeated answer pictures within a round, which `select()` already does for trace glyphs. Give the 25 sentence pairs a third picture.

<a id="c-2"></a>**C-2 · Medium · The harmonised prompt adds reading but no information.** Every Dachs Aufgabe now starts with «Welches Bild passt zum Wort?», «… zum Satz?» or «… zur Frage?». Below it stands the actual word, sentence or question. For a beginning reader that is a second text of 5 words that never changes the answer. On the phone it also wraps as «Welches Bild passt zum / Wort?». The layout spec says «Die Frage … nennt nur, was die Bilder nicht schon zeigen». Consider a single short fixed prompt («Lies und tippe.»), or none, so the reading effort goes to the text that matters. This changes the prompt, so the affected Aufgaben would need review again. Combining it with the 74 open ones (R-1) would avoid a second review round.

<a id="c-3"></a>**C-3 · Medium (owner decision) · The merge shifts the balance away from reading.** The child meets one friend per letter. Friends are drawn evenly, and a friend's Rätsel alternate. A rough share of visits by subject:

| | Before 9.4.43 (22 Rätsel) | 9.4.43, all released | 9.4.43 today (Dachs locked) |
| --- | ---: | ---: | ---: |
| Reading and language (rhyme, syllables, vowels, reading) | ≈ 46 % | ≈ 33 % | ≈ 27 % |
| Mathematics, patterns, space | ≈ 50 % | ≈ 63 % | ≈ 68 % |

Dachs now carries 223 of 797 Aufgaben (28 %) but gets 1 visit in 12. Seven of the twelve friends host only one Rätsel (Waldkauz, Maus, Igel, Reh, Eisvogel, Dachs, Steinbock). If reading should keep its weight, Dachs could get more letters, or a host could keep a reading part.

**C-4 · Medium · Silben zu Wörtern verbinden still always uses «MA» as the distractor** (9.4.41 C-1, unchanged): 27 of 28 Aufgaben, all except Tomate («LO»).

**C-5 · Medium · Reime erkennen still has only two answers** (9.4.41 C-2, unchanged): 25 of 25 Aufgaben have two cards. «Hut» is the distractor 7 times.

**C-6 · Medium · The fish Rätsel still don't use the five structure** (9.4.41 C-3, unchanged). On the tablet, groups stand in rows of 3: 10 fish = 3 + 3 + 3 + 1, 8 fish = 3 + 3 + 2. On the phone, rows of 2 or 4, and at 320 px a single column. In Mengen vergleichen the left group is still always bigger by exactly 1 and the right group by exactly 2 (except 9 against 10), and 10 of 28 answers are «=».

**C-7 · Low · Small content points.**

- *Mengen addieren:* every group is labelled with its number, and the sum «1 + 8 = ?» is written below it. The child can add the digits without looking at the fish. That is fine for symbolic practice. The competence, however, reads «Sichtbare Gruppen addieren».
- *Unchanged from 9.4.41:*
  - Vowels: «e» is the answer in 35 of 81 Aufgaben.
  - Zahlennachbarn: the «davor»-only case never comes up.
  - Muster spiegeln: 7 of 30 patterns are symmetric in themselves.
  - Dachs: «Was siehst du, wenn am Abend die Sonne untergeht?» → Sonnenuntergang names the answer.
- ✅ The Igel/Reh/Dachs prompt difference from the 9.4.41 review is gone.

<a id="a-1"></a>**A-1 · Low · Silben zu Wörtern verbinden doesn't name its picture.** The ARIA tree reads «? ?» and the syllable buttons. A screen-reader user doesn't know which word to build. The other 9.4.41 accessibility gaps are fixed. Zahlennachbarn: see [B-2](#b-2).

### Documentation

**K-1 · Medium · Read-aloud is still prescribed in the rules** (9.4.41 K-1, unchanged). The handoff and the catalogue say «no read-aloud», but these still describe it:

- [PUZZLE-BLUEPRINT](../../../design/PUZZLE-BLUEPRINT.md):
  - line 52: «Speech only when requested»
  - line 83: the anatomy diagram «Back · Host portrait · context · Explain»
- [VISUAL-STYLE](../../../design/VISUAL-STYLE.md) line 57: «The rule speaker matches the back button's 48 px circle»
- [STYLE-AUDIT](../../../design/STYLE-AUDIT.md) line 45: «The rule-speaker button matches that frame»
- All 33 generated pages under `docs/puzzles/`: «Guidance | One optional rule explanation». The source is `tools/puzzle-catalogue.cjs`.

**K-2 · Medium · The entry documents still describe 22 Rätsel.** After the merge the catalogue and [RIDDLE-FRIENDS](../../RIDDLE-FRIENDS.md) correctly say 17 Rätsel, but these are stale:

- [README](../../../README.md) line 11: «The 22 Rätsel have 797 Aufgaben»
- [PUZZLES](../../PUZZLES.md) line 3: «22 Rätsel mit 797 Aufgaben»
- [CLAUDE-HANDOFF](../../CLAUDE-HANDOFF.md) line 3: «Twelve letter friends host the 22 Rätsel: ten host two, while Dachs and Steinbock host one each». Now five host two and seven host one. This is the first document a new developer reads.
- [DEVELOPMENT](../../DEVELOPMENT.md) line 46: the design suite checks «all 22 Rätsel»

**K-3 · Low · The layout spec contradicts itself for patterns.** See [B-1](#b-1). Either the pattern exception goes into the exception table with its reason, or the rule changes to «break only at the end of a unit».

### Tests and tools

<a id="t-1"></a>**T-1 · Low · Four unit tests still need full Git history** (9.4.41 T-1, unchanged). Reproduced in a fresh `--depth 1` clone: `puzzle-review.test.cjs` and `puzzle-revisions.test.cjs` fail with «Cannot read baseline 073657f…/12511e4…/b7c77ec…». `updates-browser.cjs` has a helpful «git fetch --unshallow» hint, but these tests don't.

<a id="t-2"></a>**T-2 · Low · The narrow-phone check only looks sideways, and only at six Rätsel** (follow-up of 9.4.41 T-2, mostly fixed). `survey.cjs` now reports `clip`. `ipad-puzzle-layout-browser.cjs` now tests 360 and 320 px. Both passed in this review. But the 320 px assertion only covers rocket, mirror, friends-squirrel, count, robot and treasure, and only horizontal clipping. That is why [B-3](#b-3) passes. Extend it to all Rätsel and to `over`.

<a id="t-3"></a>**T-3 · Medium · The documented recovery variant still fails** (9.4.41 T-3, unchanged). `WALDPOST_REVIEW_REF=61ef045… node tests/review-recovery-browser.cjs` stops with «every unchanged pre-background Rätsel remains compatible». It expected `friends-ibex, picnic, compare, mirror, read-puzzle` but got `picnic, compare, mirror, read-puzzle`. Line 21 lists only the changes up to `review-changes-2026-11-23.cjs`. The rewording of 24 Nov (`review-changes-2026-11-24.cjs`), which changed Muster fortsetzen, is still missing. The reading merge (`review-changes-2026-11-24-reading.cjs`) is not considered either. [Development](../../DEVELOPMENT.md) lists this command as a required check, and CI doesn't run it.

<a id="t-4"></a>**T-4 · Low · `audio-browser.cjs` is timing-sensitive.** In the full sequential run it failed once at «a suspended context resumes on the next tap» (`waitForFunction` 15 s timeout). Run on its own, it passed twice. This doesn't point to a game bug. A longer timeout, or waiting for the `statechange` event, would make it reliable on loaded machines.

## Follow-up of the 9.4.41 review

| Finding then | Now |
| --- | --- |
| R-1 Four Rätsel not released, Steinbock without Rätsel | ✅ All four are approved again (135 Aufgaben, 24 Nov). New gap: [R-1](#r-1) Dachs. |
| R-2 Stranded invitation | ✅ fixed when another friend can play. ❌ First start without review data: [R-2](#r-2). |
| B-1 Phone overflow (Mengen ergänzen, Muster spiegeln) | ✅ fixed: 0 clipped Aufgaben at 390, 360 and 320 px |
| B-2 Patterns break across lines | ✅ one line. New side effect: [B-1](#b-1). |
| B-3 Success bigger than the spec | ✅ no paper halo, no portrait hop. The spec is updated. |
| B-4 Meadow background and rotation | ✅ plain, upright |
| B-5 Letter focus ring | ✅ not reproduced |
| B-6 Den doubled on phones | ❌ unchanged ([B-4](#b-4)) |
| B-7 Courier pin under the toolbar | ❌ unchanged ([B-5](#b-5)) |
| C-1 Syllable distractor «MA» | ❌ unchanged ([C-4](#c-4)) |
| C-2 Two rhyme answers | ❌ unchanged ([C-5](#c-5)) |
| C-3 Five structure for the fish | ❌ unchanged ([C-6](#c-6)) |
| C-4 Reading load without read-aloud | ⚠️ still open. It is now concentrated in Dachs ([C-1](#c-1), [C-2](#c-2)). |
| C-5 Small content points | ⚠️ the prompt difference is fixed. The rest is unchanged ([C-7](#c-7)). |
| A-1 Screen reader | ✅ fixed for patterns, memory, picnic and fish. New: [B-2](#b-2), [A-1](#a-1). |
| K-1 Read-aloud in the rules | ❌ unchanged |
| T-1 Shallow clone | ❌ unchanged |
| T-2 Layout tools blind to clipping | ✅ mostly fixed ([T-2](#t-2)) |
| T-3 Stale recovery expectation | ❌ unchanged ([T-3](#t-3)) |

## Recommended order of work

1. Review the 74 open Aufgaben of «Lesen und verstehen» (R-1), so that Dachs and all reading content come back. If the prompt is to change again (C-2), change it first, so it only needs one review.
2. Send no letter while no Rätsel is released, and tell the adult (R-2).
3. Add a tap fallback and button roles to the Zahlennachbarn cards (B-2).
4. Next design and content revision (needs review again): pattern size on phones (B-1, K-3), text-type rounds without repeated answers in Dachs (C-1), syllable distractors (C-4), a third rhyme card (C-5), fives for the fish (C-6).
5. Update the entry documents to 17 Rätsel and remove read-aloud from the rules (K-1, K-2). Add the 24 Nov changes to the recovery variant (T-3). Then polish B-3 to B-6, A-1, T-1 and T-2.

Still open for the owner and outside automation: the feel on a physical iPad/Safari, sound comfort, and whether the content suits real first graders, especially the reading Aufgaben without read-aloud.
