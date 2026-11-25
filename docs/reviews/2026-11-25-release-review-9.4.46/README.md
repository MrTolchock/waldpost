# Final release review — Waldpost 9.4.46

| | |
| --- | --- |
| Reviewed build | `main` @ `81b0bcd` — Waldpost **9.4.46** (`FK.VERSION`, service-worker cache `farbtupf-v9.4.46-waldpost`) |
| Review date | 25 November 2026, afternoon |
| Review ledger | `puzzle-review-data` @ `f0d6d59` (25 Nov, 13:45 +01:00). Read only. No decisions were written: every non-GET request was aborted and counted (0). |
| Role | Independent final reviewer. **Nothing in the game was changed.** This report and its screenshots are the only additions. |
| Scope | Consistency, design, bugs, Rätsel content and difficulty, the child journey, adult review, offline and release behaviour, accessibility, documentation and tests. It builds on the [9.4.43 review of the same morning](../2026-11-25-release-review/README.md) and checks every finding from it. Since then, three releases shipped: 9.4.44, 9.4.45 and 9.4.46 ([change notes](../../RAETSEL-FEEDBACK-2026-11-25.md)). |

## Verdict

**Ready to release, with one known risk.** 9.4.46 is the strongest build so far:

- **All 17 Rätsel are released.** All 652 Aufgaben are approved against the published ledger. No Aufgabe is rejected, and there are no general comments. All twelve friends have a Rätsel again, including Dachs with «Lesen und verstehen».
- **All checks pass.** All 7 repository checks, all 204 unit tests and all 30 browser suites pass. So does the documented `WALDPOST_REVIEW_REF` variant, which failed in the last two reviews. CI («Puzzle contract») and the Pages deployment for `81b0bcd` are green.
- **The layout holds on every size.** No Aufgabe overflows, clips or scrolls sideways at 1080 × 810, 390 × 844 or 360 × 780. At 320 × 640, two berry Aufgaben reach 1 px below the screen. The last review counted 63 Aufgaben off screen there.
- **14 of the 9.4.43 findings are fixed.** They include Zahlennachbarn with tap and keyboard, the den on phones, the courier pin, the filled gap after a solved pattern, 320 px phones, syllable distractors, three rhyme cards, fish in rows of five, varied comparisons, the docs and the test variants.
- **No answer is wrong.** I checked all 652 answers by script, and read every Dachs and rhyme Aufgabe by hand.

**Should be fixed soon after the release:**

1. **The first start without review data is still a dead end** ([R-1](#r-1), unchanged since 9.4.41). Offline on the very first start, or behind a school filter that blocks `raw.githubusercontent.com`, the first letter goes to a friend whose Rätsel looks unreleased. The child gets stuck, even after a reload. This is now the only High finding.
2. **One approved rhyme breaks the owner's own rule** ([R-2](#r-2)). «Rose → Dose / Hut / **Nase**» was approved 31 seconds before the owner rejected «Hose → Rose / **Hase**» because «hose hase und rose reimen sich alle». Three more cards are borderline.

**Owner decisions** worth taking before the next content round:

- Tapping a neighbour number now chooses its slot automatically. The child never decides between «davor» and «danach» ([B-1](#b-1)).
- In «Lesen und verstehen», many wrong pictures are answers of other Aufgaben ([C-1](#c-1)).
- The Dachs rule and difficulty text still mention single words, and the sentences still have only two pictures ([C-2](#c-2)).

## What was tested

| Area | How | Result |
| --- | --- | --- |
| Repository checks | `style.cjs --check`, `map/layout.cjs --check`, `puzzle-catalogue.cjs --check`, `library.cjs --check`, `handoff.cjs --check`, `check-design.cjs`, `check-baseline.py` | ✅ all 7 pass |
| Unit/model tests | `node --test tests/*.test.cjs` with full Git history | ✅ 204 / 204 |
| Shallow clone | Fresh `--depth 1` clone, `puzzle-review.test.cjs` and `puzzle-revisions.test.cjs` | ✅ They still fail, as they must, but now with «Earlier releases … are not in this clone. Run git fetch --unshallow» (old T-1 fixed). |
| Browser suites | All 30 `tests/*-browser.cjs` in sequence, plus `WALDPOST_REVIEW_REF=61ef045… review-recovery-browser.cjs`. Chromium 1243 (SwiftShader), disposable storage, intercepted GitHub. | ✅ 30 / 30, including the update path from the legacy release, `audio-browser` (24 s, no timeout) and `puzzle-review-browser` (solves all 652 Aufgaben). ✅ The recovery variant passes. |
| Release status | The real app against the published ledger, read only | ✅ 17 / 17 Rätsel released, 652 / 652 Aufgaben approved, 0 open, 0 rejected |
| Layout | `survey.cjs` for **all 652 Aufgaben** at tablet (1080 × 810), phone (390 × 844), 360 × 780 and 320 × 640. `measure.cjs` for type and picture sizes at tablet and phone. | ✅ 0 overflow, 0 clipping and 0 sideways scrolling on tablet, 390 and 360. ✅ 320: 0 clipping, 2 Aufgaben 1 px below the screen ([B-3](#b-3)). ⚠️ Pattern pictures on phones ([B-2](#b-2)). |
| Content | All 652 Aufgaben dumped from the runtime catalogue. By script: answers in choices, duplicate choices, answer positions after shuffling (20 000 rhyme rounds: 33 / 33 / 33 %), uniqueness of Dachs answers, repeated pictures per round (100 000 Dachs rounds), comparison distribution, vowel alternatives. By hand: all 78 Dachs Aufgaben, all 25 rhymes, all 28 syllable distractors, all 36 neighbour sets. | No wrong answers. Didactic findings below. |
| Changed interactions | Zahlennachbarn by tap (wrong, right, then the last one by keyboard), the filled gap in Muster fortsetzen, the rhyme cards, Dachs sentences and colours, the fish rows on tablet and phone, the Silben picture name | ✅ They work as described. See [B-1](#b-1) for the didactic side of the auto-placing tap. |
| Child journey | Fresh profile, phone, real ledger: den → letter → «Zum Freund gehen» → forest. Full rounds and the courier phase are covered by `letter-sessions-browser` and `friends-mail-browser`, which both pass. | ✅ No console errors, 0 GitHub writes |
| Edge case | First start with GitHub unreachable, then a reload | ❌ Dead end ([R-1](#r-1)) |
| Review ledger | All decisions of 25 Nov, read only | 229 decisions, 5 rejections with notes, all resolved by 9.4.44 and 9.4.46 ([R-2](#r-2), [R-3](#r-3)) |
| CI / Pages | GitHub Actions on `main` | ✅ «Puzzle contract» #362 and «pages build and deployment» #243 are green for `81b0bcd`. The live site isn't reachable from this sandbox, so I couldn't compare the deployed files byte by byte. |

Screenshots: [Zahlennachbarn by tap on the phone](neighbours-tap.webp) · [pattern on the phone, open and solved](pattern-phone.webp) · [rhyme, sentence, colour and question on the phone](rhyme-and-reading.webp) · [fish, syllables and mirror on the phone](phone-fish-syllables.webp) · [six Rätsel on the tablet](tablet-raetsel.webp) · [den, letter and forest on the phone](phone-den-letter.webp)

## Findings

Severity: **High** — fix before or right after release · **Medium** — next revision · **Low** — polish. «Owner decision» marks a didactic choice that only the owner can make.

### Release status

✅ **The release gap of 9.4.43 is closed.** In the ledger, all 17 Rätsel have a puzzle approval and every current Aufgabe revision is approved:

| Rätsel | Aufgaben | | Rätsel | Aufgaben |
| --- | ---: | --- | --- | ---: |
| Mengen zählen | 25 | | Wörter in Silben zerlegen | 47 |
| Reime erkennen | 25 | | Schritte im Raum planen | 30 |
| Reihen ergänzen | 43 | | Gegenstände merken | 32 |
| Lesen und verstehen | 78 | | Zahlennachbarn bestimmen | 36 |
| Muster fortsetzen | 30 | | Mengen vergleichen | 28 |
| Mengen gezielt zählen | 30 | | Muster spiegeln | 30 |
| Mengen addieren | 45 | | Einen Vokal ergänzen | 81 |
| Mengen ergänzen | 39 | | Silben zu Wörtern verbinden | 28 |
| Mengen verteilen | 25 | | **Total** | **652** |

<a id="r-1"></a>**R-1 · High · The first start without review data still strands the child** (9.4.43 R-2 and 9.4.41 R-2, unchanged). `state.js` only re-addresses a letter when *another* friend can play. Without review data no friend can play, so the letter keeps its friend. Reproduced on a fresh phone profile with GitHub blocked:

- The first letter went to Biber, and 0 of 17 Rätsel were ready.
- After a reload the letter was unchanged.

At the friend the child sees «Dieses Rätsel wartet noch auf die Freigabe von Erwachsenen.» This happens on any first start offline, and every time on networks that block `raw.githubusercontent.com`. Once the ledger has loaded once, the offline cache prevents it, and a later successful load makes the letter playable again. The change notes list R-2 as «noch offen».

Suggestion, unchanged: send no letter while no Rätsel is released. Show the den, and tell the adult in Settings that the review data is missing.

<a id="r-2"></a>**R-2 · Medium · One approved rhyme contradicts the owner's own rule.** In the afternoon review the owner rejected three Aufgaben:

- «hase und hose beide reimen sich»
- «hose hase und rose reimen sich alle»
- «hand sand und hund reimen sich alle»

So, for this owner, words that share the ending and differ only in the vowel count as rhymes. But `friends-bird/rhyme-4` asks **Rose → Dose / Hut / Nase**. Nase and Rose stand in the same relation as Hase and Rose. This Aufgabe was approved at 12:17:27 UTC, 31 seconds *before* the «hose hase und rose» note (12:17:58). A child who hears Nase/Rose as a rhyme has two right answers.

Less obvious, but similar: these third cards have the same stressed vowel and the same ending as the prompt word. First graders often accept that as a rhyme.

| Aufgabe | Prompt → answer | Near-rhyme card |
| --- | --- | --- |
| `rhyme-12` | Tasse → Kasse | **Tanne** |
| `rhyme-21` | Kanne → Tanne | **Kasse** |
| `rhyme-24` | Ziege → Fliege | **Biene** |

Suggestion: give these four Aufgaben a card that shares only the first sound, as 9.4.46 did for Hase, Hose and Hand. For Rose, that would be an existing picture word that starts with R but has neither the vowel o nor the ending -se. This reopens only these four Aufgaben.

<a id="r-3"></a>**R-3 · Low · Review pace.** The reopened Aufgaben were approved quickly:

| Rätsel | Aufgaben | Time | Per Aufgabe |
| --- | ---: | --- | --- |
| Mengen vergleichen | 12 new | 21 s | 1.8 s, with up to 10 against 9 fish |
| Zahlennachbarn | 36 | 91 s | 2.5 s, with two taps each |
| Silben zu Wörtern verbinden | 27 | 73 s | 2.7 s |
| Lesen und verstehen | 47 | 2 min 35 s | 3.3 s |

The three rhyme rejections show that the owner really reads, and none of the approvals are bulk approvals. Still, 1.8 s is not enough to count 10 against 9 fish. The data is right (checked by script), but the *rendered* new comparisons were hardly looked at. A slow look at three or four of them on a phone would close that gap.

### Bugs, interaction and layout

<a id="b-1"></a>**B-1 · Medium (owner decision) · Zahlennachbarn by tap: the game, not the child, decides «davor» or «danach».** The owner asked for tap instead of drag, and the tap works well ([screenshot](neighbours-tap.webp)):

- A right number jumps into its slot, and a wrong one gets the dashed ring.
- The cards are buttons named «Zahl 5».
- The Aufgabe can be finished with Tab and Enter.
- A placed card is disabled and hidden from the screen reader.

But `tap()` in `js/screens/puzzle.js` looks for the slot itself: `[0,1].find(p=>values[p]===null&&q.answer[p]===value)`. In «4 ? 6 ? 8», tapping 7 fills the right-hand slot automatically. The competence is «Zahlennachbarn bestimmen» (MA.1.A.2.a/b). The child now only has to find the two numbers *next to* 6, never which one comes before and which after. The rule even says so: «Sie springt an ihren Platz». With drag and drop, the child had to choose the slot.

If the order should be practised, here are three options that keep tapping:

- Tap the «?» slot first, then the number.
- Ask one neighbour at a time («Welche Zahl kommt davor?»).
- Accept a number only for the slot that is highlighted next.

This changes the interaction, so all 36 Aufgaben would reopen.

<a id="b-2"></a>**B-2 · Low (owner decision) · Muster fortsetzen stays small on phones** (9.4.43 B-1). The spec now lists this as a justified exception (RAETSEL-LAYOUT, «Ausnahmen»), so the old K-3 contradiction is resolved. Measured again:

| | Pattern pictures | Answer pictures | «?» of the gap |
| --- | --- | --- | --- |
| Tablet | 58 px | 76 px | 34 px |
| Phone 390 px | **28 px** | 52 px | 21 px |

Stone and fir are still recognisable at 28 px ([screenshot](pattern-phone.webp)). The frame is 160 px high around a 32 px strip, so most of it is empty. The solved state now fills the gap with the green chosen picture (old B-6 ✅), which helps. Keep this in mind if the next design round touches patterns.

<a id="b-3"></a>**B-3 · Low · 320 px phones: almost fixed** (9.4.43 B-3). With 38 px fish and 34 px berries, Mengen addieren and Mengen vergleichen fit entirely. Only `picnic/3-6` and `picnic/4-5` reach 1 px below the 640 px screen. That's negligible.

✅ **Fixed and verified:**

| 9.4.43 finding | How verified |
| --- | --- |
| B-4 den doubled on phones | The spare edge is a blurred, darkened copy and reads as a frame ([screenshot](phone-den-letter.webp)). |
| B-5 courier pin under the counter | Code reading only: `clearOfMenu()` in `game.js` moves any pin whose 70 px circle would touch the menu below it. I didn't reproduce a clamped courier pin in a real round, but `friends-mail-browser` passes. |
| B-6 «?» stays after solving | The chosen picture fills the gap in green, with the screen-reader name «Stein». |
| A-1 Silben picture without a name | The picture is named («Bild: Hase»). |

### Content and level of the Rätsel

Verified correct:

- All 652 answers are in their choices, and no Aufgabe has duplicate choices.
- Each of the 78 Dachs answers is unique: no animal or thing is the answer twice, including action variants such as `fox-run` and `fox-sleep`.
- The rhyme answer lands evenly in all three positions.
- The 28 syllable distractors are word-specific. Every chip is shown in capitals, so the capital letter of the real first syllable doesn't give it away. «MA» is gone (old C-4 ✅).
- Mengen vergleichen is balanced: «left» 11 times, «right» 11 times and «=» 6 times, each with a difference of 1, 2 or 3 (old C-6 ✅).
- The fish stand in rows of five on tablet and phone.
- The colour sentences each appear once. The white flower stays visible on cream: grey petals with a sepia outline.

<a id="c-1"></a>**C-1 · Medium · «Lesen und verstehen»: the same pictures keep coming back.** 9.4.44 made every *answer* unique, but the *wrong* pictures are drawn from the same small set:

- **88 of the 156 wrong pictures are the answer of another Aufgabe.** The nest is offered 8 times, the pond 6 times, the owl 6 times, and the leaf, mushroom, ladybird and robin 5 times each.
- A simulation of 100 000 rounds with the real `select()`:
  - **45 %** of rounds show the same picture twice.
  - **22 %** show the answer of one Aufgabe as a wrong picture in another.
- Topic clusters let a child answer by elimination or recall:
  - Weather: «Was fällt aus der Wolke?» (Regen / Sonne / Blatt), «Was fällt im Winter vom Himmel?» (Schneeflocke / Blatt / Sonne) and «Was fällt im Herbst vom Baum?» (Blatt / Schneeflocke / Regen) use almost the same four pictures.
  - The butterfly's life cycle: «Woraus kommt der Schmetterling?», «Wer entsteht aus einer Raupe?», «Was legt der Schmetterling auf ein Blatt?» and «Wer frisst Blätter?». One answer prepares the next.

Suggestion: in `select()`, skip a candidate whose pictures already appear in the round. That is the same idea as the glyph rule for tracing, and it changes no Aufgabe, so no review is needed. Optionally tag the clusters and allow one per round.

<a id="c-2"></a>**C-2 · Medium · Dachs: rule, difficulty and the sentence Aufgaben are out of step.**

- The written rule (`puzzle-rounds.js`) is still «Lies **das Wort**, den Satz oder die Frage. Tippe auf das passende Bild.» No single-word Aufgaben remain since 9.4.45.
- The difficulty still promises «zwei oder drei Bildantworten». The 12 sentence Aufgaben («Der Fuchs rennt.») still have only **two** pictures, so a guess is right half the time. Because the pool shrank from 113 to 78, **58 %** of rounds now contain one (45 % in 9.4.43).
- The harmonised prompt («Welches Bild passt zum Satz? / zur Frage?») still adds a second sentence to read that never changes the answer (old C-2, unchanged).

All three change the rule, the answers or the prompt, so the affected Aufgaben reopen. Doing them together means one review round of the 78 Aufgaben instead of three.

**C-3 · Low · Dachs: a few distractors are still give-aways or debatable.** The 47 fixed questions are good. Some of the others remain:

- *Give-aways:*
  - «Was knabbert der Hase auf der Wiese?» → Löwenzahn / **Stein / Feder**
  - «Was frisst das Reh gern?» → Klee / Wurm / **Honig**
  - «Was trinken die Pflanzen?» → Wasser / **Honig / Schokolade**
  - «Was legt der Vogel?» → Ei / Eichel / **Stein**
- *Debatable:*
  - «Wer hängt am Ast?» → Fledermaus, but the squirrel among the wrong pictures also hangs from branches.
  - «Wessen Kopf ist oben rot?» → Specht, while the robin among the wrong pictures has an orange-red face.
- *Unchanged since 9.4.41:* «Was siehst du, wenn am Abend die Sonne untergeht?» → Sonnenuntergang names its answer.

**C-4 · Low (owner decision) · Subject balance** (9.4.43 C-3). With every Rätsel released, four of the twelve friends offer reading and language: Blaumeise, Maus, Waldkauz and Dachs. That's about 33 % of visits. Dachs carries 78 of 652 Aufgaben (12 %, was 28 %). This is a valid choice, but it should be a conscious one.

**C-5 · Low · Small content points.**

- *Zahlennachbarn:* only the left neighbour is ever given («Vorgänger gegeben»), never the right one (unchanged). The difficulty says «Mengenrahmen bis 20», but the Rätsel only shows digits and no quantity frame.
- *Einen Vokal ergänzen:*
  - «e» is the answer in 35 of 81 Aufgaben (unchanged).
  - Several wrong vowels form real words: Mund → *Mond*, Nadel → *Nudel*, Buch → *Bach*, Pilz → *Pelz*, Nuss → *Nass*, Kuchen → *kochen*, Igel → *Egel*. The picture decides, so this is fine and even good practice. But *Mond* and *Bach* are also pictures elsewhere in the game, so check that the mouth and book pictures can't be misread.
- *Mengen addieren:* every group is labelled with its number, and «8 + 2 = ?» stands below it. The child can add the digits without looking at the fish (unchanged). The competence reads «Sichtbare Gruppen addieren».
- *Gegenstände merken:* the rule says «die vier **Dinge**», the question «die vier **Gegenstände**».

### Documentation

**K-1 · Low · Three references to a rule speaker remain** (9.4.43 K-1, mostly fixed). Blueprint line 52, the catalogue pages and the generated `docs/puzzles/` now say «no read-aloud». Still left:

- [PUZZLE-BLUEPRINT](../../../design/PUZZLE-BLUEPRINT.md) line 26: «The back and rule-speaker controls share a quiet 48 px circular frame»
- [VISUAL-STYLE](../../../design/VISUAL-STYLE.md) line 14: «Puzzle utility controls: **explain**, reset and task directions»
- [STYLE-AUDIT](../../../design/STYLE-AUDIT.md) line 49: «back/speaker frames match»

✅ K-2: README, PUZZLES, CLAUDE-HANDOFF, DEVELOPMENT and the catalogue all say 17 Rätsel and 652 Aufgaben. ✅ K-3: the pattern exception is in the exception table.

### Tests and tools

✅ **T-1 fixed.** The historical-release tests explain the missing history and name `git fetch --unshallow`.

✅ **T-3 fixed.** `WALDPOST_REVIEW_REF=61ef045… review-recovery-browser.cjs` passes. As more Rätsel changed on purpose, the check now covers only 2 unchanged Rätsel (the default run covers 1). It still proves the mechanism, but each content release makes it weaker. The 9.4.46 change list (`review-changes-2026-11-25-third.cjs`) isn't imported. That's harmless now, because Reime erkennen is already excluded by the 9.4.45 list, but it should be added for consistency.

✅ **T-4 fixed.** `audio-browser` passed in the full sequential run (24 s). The new test for a context that never wakes passes too.

**T-2 · Low · The narrow-phone assertion still covers six Rätsel** (unchanged). `ipad-puzzle-layout-browser.cjs` checks 360 and 320 px only for rocket, mirror, friends-squirrel, count, robot and treasure, and only sideways. My `survey.cjs` run found nothing, but a future change to the fish or berry Rätsel wouldn't be caught. Extend the assertion to all 17 Rätsel and to `over`.

## Follow-up of the 9.4.43 review

| Finding then | Now |
| --- | --- |
| R-1 «Lesen und verstehen» not released, Dachs without a Rätsel | ✅ All 17 Rätsel and 652 Aufgaben approved |
| R-2 First start without review data | ❌ unchanged ([R-1](#r-1)) |
| R-3 Review pace | ⚠️ still fast ([R-3](#r-3)) |
| B-1 Pattern 28 px on phones | ⚠️ now a documented exception ([B-2](#b-2)) |
| B-2 Zahlennachbarn drag only | ✅ tap, keyboard and screen reader. New didactic point: [B-1](#b-1). |
| B-3 320 px phones | ✅ 2 Aufgaben 1 px over ([B-3](#b-3)) |
| B-4 Den doubled on phones | ✅ blurred frame |
| B-5 Courier pin under the counter | ✅ in code; the mail suites pass |
| B-6 «?» stays after solving | ✅ filled green |
| C-1 Mixed levels and repeated answers in Dachs | ✅ answers unique, single words removed. New: repeated *wrong* pictures ([C-1](#c-1)). |
| C-2 Harmonised Dachs prompt | ❌ unchanged ([C-2](#c-2)) |
| C-3 Subject balance | ⚠️ owner decision ([C-4](#c-4)) |
| C-4 Syllable distractor «MA» | ✅ word-specific |
| C-5 Two rhyme cards | ✅ three cards. New: four borderline cards ([R-2](#r-2)). |
| C-6 Fish without the five structure, fixed comparisons | ✅ rows of five, varied differences |
| C-7 Small content points | ⚠️ mostly unchanged ([C-5](#c-5)) |
| A-1 Silben picture without a name | ✅ |
| K-1 Read-aloud in the rules | ⚠️ three lines left |
| K-2 Entry docs say 22 Rätsel | ✅ |
| K-3 Spec contradicts itself for patterns | ✅ |
| T-1 Shallow clone | ✅ clear message |
| T-2 Narrow-phone check | ❌ unchanged |
| T-3 Recovery variant fails | ✅ passes |
| T-4 Audio timing | ✅ |

## Recommended order of work

1. **Release 9.4.46.** It is fully approved, all checks pass and no answer is wrong.
2. Send no letter while no Rätsel is released, and tell the adult ([R-1](#r-1)).
3. Replace the four borderline rhyme cards: Nase in Rose, Tanne, Kasse and Biene ([R-2](#r-2)). Four Aufgaben to review.
4. Have `select()` avoid repeated pictures in a Dachs round ([C-1](#c-1)). This is code only and needs no review.
5. One Dachs content round: rule without «das Wort», a third picture for the 12 sentences, a shorter or no fixed prompt, and the give-away distractors ([C-2](#c-2), C-3).
6. Owner decision on Zahlennachbarn: should the child choose «davor» or «danach» ([B-1](#b-1))?
7. Polish: the three speaker lines (K-1), T-2, the T-3 import, the small content points (C-5) and patterns on phones (B-2).

Still open for the owner and outside automation: the feel on a physical iPad and in Safari, sound comfort, and whether the reading Aufgaben suit real first graders without read-aloud.
