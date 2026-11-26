# Final release review — Waldpost 9.4.48

| | |
| --- | --- |
| Reviewed build | `main` @ `bb56555` — Waldpost **9.4.48** (`FK.VERSION`, service-worker cache `farbtupf-v9.4.48-waldpost`) |
| Review date | 25 November 2026, evening |
| Review ledger | `puzzle-review-data` @ `8ed09f7` (25 Nov, 17:24 +01:00). Read only. No decisions were written: every non-GET request was aborted and counted (0). |
| Role | Independent final reviewer. **Nothing in the game was changed.** This report and its screenshots are the only additions. |
| Scope | Consistency, design, bugs, Rätsel content and difficulty, the child journey, adult review, offline and release behaviour, accessibility, documentation and tests. It builds on the [9.4.46 review of the same afternoon](../2026-11-25-release-review-9.4.46/README.md) and checks every finding from it. Since then, two releases shipped: 9.4.47 and 9.4.48 ([change notes](../../RAETSEL-FEEDBACK-2026-11-25.md#auftrag-nach-der-release-prüfung-von-946-947)). |

## Verdict

**Ready to release.** 9.4.48 closes the last High finding and has no wrong answers:

- **All 16 Rätsel are released.** All 627 Aufgaben are approved against the published ledger. No Aufgabe is rejected or open. Every one of the twelve friends has at least one Rätsel. Mengen zählen is retired as the owner asked, and Eichhörnchen keeps Gegenstände merken.
- **The first start without review data no longer strands the child** (old R-1, open since 9.4.41). I reproduced it on a fresh phone profile with GitHub blocked: no envelope and no letter button, and Settings explains the missing data. A reload keeps that state. As soon as the data arrives, the letter comes through the flap to a friend who can play ([screenshot](first-start.webp)).
- **A Dachs round never shows a picture twice** (old C-1). 0 repeats in 20 000 simulated rounds, down from 45 %.
- **Checks:**
  - All 7 repository checks and all 207 unit tests pass.
  - 29 of 30 browser suites pass on the first sequential run, and so does the `WALDPOST_REVIEW_REF` variant.
  - `artwork-browser` is flaky: it failed in 2 of 4 runs ([T-1](#t-1)).
  - CI («Puzzle contract» #368) and the Pages deployment (#246) are green for `bb56555`.
- **The layout holds.** No Aufgabe overflows, clips or scrolls sideways at 1080 × 810, 390 × 844 or 360 × 780. At 320 × 640, the same two berry Aufgaben as before reach 1 px below the screen.

**Should be fixed soon after the release:**

1. **Zahlennachbarn: the child can't see that «davor» comes first** ([N-1](#n-1)). Since 9.4.47 the fields fill in order. But both «?» look the same, and the rule that explains the order is only shown to adults. In «? 6 ?», a child who taps 7 first, a correct neighbour, gets the retry ring.
2. **The «no letter yet» message is never shown** ([N-2](#n-2)). Captions in the world are hidden outside Rätsel, so the child sees an empty den and nothing else. The docs say «Fuchs says that no letter has come yet».

Everything else is Low or an owner decision that was already taken.

## What was tested

| Area | How | Result |
| --- | --- | --- |
| Repository checks | `style.cjs --check`, `map/layout.cjs --check`, `puzzle-catalogue.cjs --check`, `library.cjs --check`, `handoff.cjs --check`, `check-design.cjs`, `check-baseline.py` | ✅ all 7 pass |
| Unit/model tests | `node --test tests/*.test.cjs` with full Git history | ✅ 207 / 207 |
| Browser suites | All 30 `tests/*-browser.cjs` in sequence, plus `WALDPOST_REVIEW_REF=61ef045… review-recovery-browser.cjs`. Chromium 1243 (SwiftShader), disposable storage, intercepted GitHub. | ✅ 29 / 30 on the first run, including `puzzle-review-browser` (solves all 627 Aufgaben), `letter-sessions-browser`, `friends-mail-browser`, `updates-browser` (update from the legacy release) and `audio-browser`. ⚠️ `artwork-browser` failed on the first run and in 1 of 3 reruns ([T-1](#t-1)). ✅ The recovery variant passes (2 historical releases). |
| Release status | The real app against the published ledger, read only | ✅ 16 / 16 Rätsel released, 627 / 627 Aufgaben approved, 0 open, 0 rejected, 0 GitHub writes, no console errors |
| Layout | `survey.cjs` for **all 627 Aufgaben** at tablet (1080 × 810), phone (390 × 844), 360 × 780 and 320 × 640 | ✅ 0 overflow, 0 clipping, 0 sideways scrolling on tablet, 390 and 360. ✅ 320: 0 clipping, `picnic/3-6` and `picnic/4-5` 1 px below the screen (unchanged, old B-3). No CSS changed since 9.4.46. |
| Content | All 627 Aufgaben dumped from the runtime catalogue. By script: answers in choices, duplicate choices, selection frequency of every Aufgabe (20 000 rounds per Rätsel), repeated pictures and answers reused as wrong pictures in Dachs rounds, share of two-picture rounds. By hand: all 78 Dachs Aufgaben, all 25 rhymes, all 47 syllable words, all 28 syllable distractors, all 81 vowel gaps, all 36 neighbour sets. | No wrong answers. Findings below. |
| Changed interactions | Zahlennachbarn by tap in order (wrong first, then right, then the ring clears), on the phone | ✅ works as described. ⚠️ No visible active field ([N-1](#n-1)). |
| First start without review data | Fresh phone profile, GitHub blocked → den, Settings, forest, reload → network back (`online` event) | ✅ letter held, adult note, letter arrives through the flap. ⚠️ Child-facing message invisible ([N-2](#n-2)). |
| Review ledger | All decisions after the 9.4.46 review, read only | 121 decisions, all approvals: 119 Aufgaben and 2 Rätsel; 0 rejections, 0 notes ([R-1](#r-1)) |
| Docs | Counts and rules in README, handoff, catalogue, letter sessions, design docs | ✅ mostly current, one stale line ([K-1](#k-1)) |
| CI / Pages | GitHub Actions on `main` | ✅ «Puzzle contract» #368 and «pages build and deployment» #246 are green for `bb56555`. The live site isn't reachable from this sandbox, so I couldn't compare the deployed files byte by byte. |

Screenshots: [first start without review data: den, Settings, letter arrives](first-start.webp) · [Zahlennachbarn on the phone: start, 7 tapped first, 5 placed, solved](neighbours-order.webp)

## Findings

Severity: **High**: fix before or right after release. **Medium**: next revision. **Low**: polish. «Owner decision» marks a didactic choice that only the owner can make.

### Release status

✅ **All 16 Rätsel are released.** In the ledger, every Rätsel has a puzzle approval and every current Aufgabe revision is approved:

| Rätsel | Host | Aufgaben | | Rätsel | Host | Aufgaben |
| --- | --- | ---: | --- | --- | --- | ---: |
| Reime erkennen | Blaumeise | 25 | | Wörter in Silben zerlegen | Blaumeise | 47 |
| Reihen ergänzen | Biber | 43 | | Muster spiegeln | Biber | 30 |
| Lesen und verstehen | Dachs | 78 | | Schritte im Raum planen | Reh | 30 |
| Muster fortsetzen | Steinbock | 30 | | Gegenstände merken | Eichhörnchen | 32 |
| Mengen gezielt zählen | Igel | 30 | | Zahlennachbarn bestimmen | Eisvogel | 36 |
| Mengen addieren | Fisch | 45 | | Mengen vergleichen | Fisch | 28 |
| Mengen ergänzen | Frosch | 39 | | Einen Vokal ergänzen | Maus | 81 |
| Mengen verteilen | Frosch | 25 | | Silben zu Wörtern verbinden | Waldkauz | 28 |
| | | | | **Total** | | **627** |

The change notes for 9.4.48 still say «15 von 16 Rätseln freigegeben». That was true when they were written. The owner approved the 36 Zahlennachbarn at 17:21–17:23 (+01:00), so all 16 are released now.

<a id="r-1"></a>**R-1 · Low · Review pace** (old R-3). After the 9.4.46 review:

| Rätsel | Aufgaben | Time | Per Aufgabe |
| --- | ---: | --- | --- |
| Lesen und verstehen | 78 | 3 min 54 s | 3.0 s |
| Zahlennachbarn (after 9.4.48) | 36 | 1 min 43 s | 2.9 s, with one or two taps each |

For Zahlennachbarn that is enough, because the Aufgaben are short. For Dachs, 3 s means reading a question and three pictures. The content didn't change, only the rule and the round selection, so that pace is plausible. Note that five Zahlennachbarn were approved at 16:53 under 9.4.47 and had to be approved again after 9.4.48. That is correct behaviour: the interaction changed.

### Bugs, interaction and layout

<a id="n-1"></a>**N-1 · Medium (owner decision) · Zahlennachbarn: the order is a hidden rule.** 9.4.47 implemented the old B-1 as «fields fill in order», and 9.4.48 clears earlier rings once a field is filled. The code does exactly that ([screenshot](neighbours-order.webp)). But:

- **The child is never told about the order.** The prompt says «Welche Zahlen kommen davor und danach?». The rule «Tippe zuerst auf die Zahl davor, dann auf die Zahl danach.» is only shown in the adult Rätsel-Prüfung (`puzzle-review.js`, «Spielerklärung»). The child screen never shows the rule, and nothing is read aloud since 9.4.40.
- **Both fields look identical.** Both «?» have the same dashed border. Nothing marks which one is asked now: no outline, no colour and no `aria-current` or similar for a screen reader.
- **A correct neighbour is marked wrong.** In «? 6 ?», 7 is a correct neighbour of 6. A child who taps 7 first hears the retry sound and sees the dashed ring. The child can't see why. The play log also records 7 as a wrong answer.

9.4.48 softens this: the ring disappears as soon as 5 is placed, and 7 can then be tapped. The didactic goal of B-1 (the child decides between «davor» and «danach») is met. But the child has to guess the rule from failures.

Suggestions, cheapest first:
1. Highlight the field that is asked now: a solid accent border or a gentle pulse on its «?». Also give it an accessible state, for example «Zahl davor, jetzt gefragt».
2. Ask per field: «Welche Zahl kommt davor?», then «…danach?». The «-left» Aufgaben already use «Welche Zahl kommt danach?».
3. Or let the child tap a field first, then the number (old B-1, option 1).

Option 1 changes only the presentation, but it still reopens the 36 Aufgaben, because the rendered interaction changes. So does option 2, which changes the prompt.

<a id="n-2"></a>**N-2 · Low · The «no letter yet» message is never shown.** `game.js` uses `say(noLetterYet)` («Heute ist noch kein Brief da. Du kannst draussen den Wald erkunden.»). But `say()` sets `caption.hidden=panel!=='puzzle'`, so world captions have been hidden outside Rätsel for a long time. The text is in the DOM but invisible. A screen reader doesn't get it either, because of `hidden`.

- **What the child sees:** an empty den with the door. That is calm and acceptable.
- **What the documentation says:** [LETTER-SESSIONS](../../LETTER-SESSIONS.md) and the change notes say «Fuchs says that no letter has come yet». That doesn't happen.
- **Minor, but in the same place:** in the forest, the hidden caption reads «Folge dem Pfeil zum Freund auf deinem Brief», though there is no letter and no arrow. It's invisible too, so it does no harm.
- **The map:** in this state the forest has no map button. Before 9.4.47 the den letter phase never reached the forest, so this is new. The «Nach Hause» button is there, so the child can't get lost.

Suggestion: either show a short painted or text cue in the den, such as an empty mail slot or a small speech bubble, or correct the two documents. If the cue is added, also make the forest caption match.

✅ **Fixed and verified:**

| 9.4.46 finding | How verified |
| --- | --- |
| R-1 first start without review data | Fresh profile, GitHub blocked: 0 / 16 ready, no envelope, no letter button, adult note in Settings. The state survives a reload. After the `online` event: 16 / 16 ready, envelope and letter button appear, and the letter goes to a friend who can play ([screenshot](first-start.webp)). `state.waiting()` only applies in the den letter phase, so letters in progress are unaffected. |
| B-1 Zahlennachbarn: the game chose the slot | Fields fill in order. See [N-1](#n-1) for what is still missing. |

**Unchanged from 9.4.46:** B-2 (pattern pictures 28 px on phones, now a documented exception) and B-3 (two berry Aufgaben 1 px below a 320 px screen). No CSS changed.

### Content and level of the Rätsel

Verified correct:

- All 627 answers are among their choices, and no Aufgabe has duplicate choices.
- Every Aufgabe of every Rätsel appears in rounds. None is starved.
- The 47 syllable counts and the 81 vowel gaps are correct.

<a id="c-1"></a>✅ **C-1 · «Lesen und verstehen» no longer repeats pictures.** The new rule in `select()` skips an Aufgabe whose pictures are already in the round. In 20 000 simulated rounds:

- **0** rounds show a picture twice (was 45 %).
- **0** rounds offer another Aufgabe's answer as a wrong picture (was 22 %).
- All five Aufgaben are always distinct, and every round has five.
- The weather cluster («Was fällt aus der Wolke?», «…im Herbst vom Baum?», «…im Winter vom Himmel?») and the butterfly cluster share pictures. So they can no longer appear in the same round, and one answer can't give away the next.

**Side effect (Low):** the rule favours Aufgaben with few or rare pictures.

- The two-picture sentences come up more often. **62 %** of rounds now contain at least one (58 % in 9.4.46). A child can solve such a sentence by guessing half of the time.
- Habitat questions with the frequent nest or pond come up about 20 % less often than average. «Wo schwimmt der Fisch?» appears in 1022 of 20 000 rounds, against 1282 expected.
- No Aufgabe is excluded.

<a id="c-2"></a>**C-2 · Low (owner decision) · Dachs: rule fixed, sentences unchanged.**

- ✅ The rule is now «Lies den Satz oder die Frage. Tippe auf das passende Bild.»
- ✅ The difficulty is now «Kurze Sätze und Naturfragen lesen; zwei oder drei Bildantworten». Both match the content.
- The twelve sentence Aufgaben keep two pictures, as the owner decided.
- The harmonised prompt («Welches Bild passt zum Satz? / zur Frage?») is unchanged.

**C-3 · Low · Dachs give-aways, unchanged since 9.4.46.**

- *Give-aways:*
  - «Was knabbert der Hase auf der Wiese?» → Löwenzahn / **Stein / Feder**
  - «Was frisst das Reh gern?» → Klee / Wurm / **Honig**
  - «Was trinken die Pflanzen?» → Wasser / **Honig / Schokolade**
  - «Was legt der Vogel?» → Ei / Eichel / **Stein**
- *Debatable:*
  - «Wer hängt am Ast?», with the squirrel among the wrong pictures.
  - «Wessen Kopf ist oben rot?», with the robin among the wrong pictures.
- *Names its answer:* «Was siehst du, wenn am Abend die Sonne untergeht?» → Sonnenuntergang.

**C-4 · Low (owner decision) · Rhymes** (old R-2). As the owner decided, the four borderline cards stay:

- «Rose → Dose / Hut / **Nase**»
- «Tasse → Kasse / **Tanne**»
- «Kanne → Tanne / **Kasse**»
- «Ziege → Fliege / **Biene**»

Recorded here only so that the decision stays visible. Rose → Nase is the same relation the owner rejected for Hose → Hase.

**C-5 · Low · Small content points** (unchanged):

- *Zahlennachbarn:* only the left neighbour is ever given. The difficulty says «Mengenrahmen bis 20», but the screen shows only digits. The rule asks «davor, dann danach» even in the 18 «-left» Aufgaben, where only «danach» is open. That's harmless, but the rule could say «Fülle die leeren Felder: zuerst davor, dann danach».
- *Einen Vokal ergänzen:* «e» is the answer in 35 of 81 Aufgaben. Several wrong vowels form real words (Mund → Mond, Igel → Egel); the picture decides.
- *Mengen addieren:* the groups are labelled with digits, so the fish needn't be counted.
- *Gegenstände merken:* the rule says «die vier Dinge», the question «die vier Gegenstände».

**C-6 · Low (owner decision) · Subject balance.** With Mengen zählen retired:

- Mathematics: 10 Rätsel at 7 friends.
- Reading and language: 5 Rätsel at 4 friends (Blaumeise, Maus, Waldkauz, Dachs).
- Memory: 1 Rätsel (Eichhörnchen).

Since letters go to friends, not Rätsel, about one visit in three is a reading visit (4 of 12 friends) and about 58 % are mathematics visits (7 of 12). Blaumeise, Biber, Fisch and Frosch split their visits between two Rätsel. This is a valid balance; it's noted so that it stays a conscious choice.

### Documentation

<a id="k-1"></a>**K-1 · Low · Small stale lines.**

- [DEVELOPMENT](../../DEVELOPMENT.md) line 46: the design suite «compares … for all **17** Rätsel». Now 16.
- [RAETSEL-LAYOUT](../../../design/RAETSEL-LAYOUT.md), exceptions table: «Fünf Fische pro Reihe wie bei **Eicheln**». The acorn counting is retired.
- [PUZZLE-CATALOGUE](../../PUZZLE-CATALOGUE.md): «Human look/feel approval remains pending until the owner signs off». All Rätsel are approved, so this reads as outdated. It is generated, so the template in `tools/puzzle-catalogue.cjs` would change.
- LETTER-SESSIONS and the change notes describe the invisible «no letter yet» message ([N-2](#n-2)).
- Only in code, not shown to anyone: `content.js` still describes Eichhörnchen as «Mathematik / NUM-01 / Wie viele Nüsse sind hier?», and `puzzle-rounds.js` keeps `squirrel:'Nüsse zählen'`. Both only serve old saves and titles. If old seeded rounds are ever logged, the category would be wrong for Gegenstände merken.

✅ The old K-1 is fixed: the blueprint, visual style and style audit no longer mention a rule speaker. ✅ README, handoff, catalogue, PUZZLES, LETTER-SESSIONS and RIDDLE-FRIENDS say 16 Rätsel and 627 Aufgaben.

### Tests and tools

<a id="t-1"></a>**T-1 · Low · `artwork-browser` is flaky since 9.4.47.**

- **The failure:** «status matches the map button frame». The map button's computed style comes back empty, which is what a detached element returns.
- **How often:** it failed in the full run and in 1 of 3 reruns. It passed in the other two.
- **Likely cause:** since 9.4.47, every `puzzle-review-change` re-renders the whole nav (`renderNav()` in the new handler in `game.js`). The test's `releaseAll()` makes the fixture approvals arrive asynchronously. So the nav can be rebuilt between finding the map button and reading its style.
- **In the real app:** I counted 0 nav rebuilds in steady state. It happens once, when the review data first arrives, so the effect there is negligible. At most, a tap or keyboard focus at that instant is lost.
- **Suggested fixes:**
  - In the test, wait until the review data has settled.
  - In the app, re-render the nav only when `waiting()` actually changes. The handler already has `held` and `letterHeld`.

**T-2 · Low · The narrow-phone assertion still covers five Rätsel** (unchanged). `ipad-puzzle-layout-browser.cjs` checks 360 and 320 px for rocket, mirror, count, robot and treasure, and only sideways. My survey found nothing, but this guard would miss a regression in the fish, berry or Dachs Rätsel.

✅ **The old T-3 is fixed.** The recovery variant imports the third and fourth change lists, and passes. The fifth list (9.4.48) is not imported, but it only reopens Zahlennachbarn, which is already excluded.

## Follow-up of the 9.4.46 review

| Finding then | Now |
| --- | --- |
| R-1 First start without review data | ✅ letter held, adult note, letter arrives. New: the child-facing text is invisible ([N-2](#n-2)) |
| R-2 Four borderline rhyme cards | ⚠️ kept by owner decision ([C-4](#c-4)) |
| R-3 Review pace | ℹ️ 3 s per Aufgabe ([R-1](#r-1)) |
| B-1 Zahlennachbarn: the game chose the slot | ✅ fields fill in order. New: the order isn't visible ([N-1](#n-1)) |
| B-2 Pattern 28 px on phones | ⚠️ documented exception, unchanged |
| B-3 320 px phones | ⚠️ same 2 Aufgaben 1 px over, negligible |
| C-1 Repeated pictures in Dachs rounds | ✅ 0 in 20 000 rounds; small bias towards two-picture sentences ([C-1](#c-1)) |
| C-2 Dachs rule, difficulty, two-picture sentences | ✅ rule and difficulty; sentences kept by owner decision ([C-2](#c-2)) |
| C-3 Dachs give-aways | ❌ unchanged |
| C-4 Subject balance | ⚠️ owner decision ([C-6](#c-6)) |
| C-5 Small content points | ❌ unchanged ([C-5](#c-5)) |
| K-1 Rule speaker in three design lines | ✅ |
| T-1 Shallow clone message | ✅ (unchanged, still good) |
| T-2 Narrow-phone assertion | ❌ unchanged |
| T-3 Recovery variant / third list | ✅ |

## Recommended order of work

1. **Release 9.4.48.** It is fully approved, the High finding of the last three reviews is fixed, and no answer is wrong.
2. Make the asked Zahlennachbarn field visible, and optionally ask per field ([N-1](#n-1)). One review round of 36 short Aufgaben.
3. Give the den a visible «no letter yet» cue, or correct the docs ([N-2](#n-2)).
4. Stabilise `artwork-browser`, and re-render the nav only when the letter state changes ([T-1](#t-1)).
5. When Dachs is next touched: the give-away distractors (C-3) and a third picture for the sentences (C-2), in one review round.
6. Polish: K-1 lines, T-2, C-5.

Still open for the owner and outside automation: the feel on a physical iPad and in Safari, sound comfort, whether first graders understand the Zahlennachbarn order without a spoken rule, and whether the reading Aufgaben suit real first graders without read-aloud.
