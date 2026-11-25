# Rätselkatalog und Kompetenzübersicht

Die aktive Sammlung enthält **16 Rätsel und 627 einzeln prüfbare Aufgaben**. Each play is five randomly selected, distinct iterations. Children start puzzles only at the friend on their current letter; the full gallery is in adult Settings. [Parent letter limits](LETTER-SESSIONS.md) end the journey at the den after sleeping.

Generated from the runtime catalogue with `node tools/puzzle-catalogue.cjs`. Every linked puzzle page lists all iteration IDs, content and expected solutions. No generated item is automatically approved.

All rows implement the [shared blueprint](PUZZLE-BLUEPRINT.md): drawn subjects, the shared painted character cast, Waldbuch paper/progress, no hint button, no read-aloud, button clicks and mute, 900 ms auto-advance and a five-task celebration, editable retries, responsive controls. Exact per-iteration revisions enforce review of these shared rules; a puzzle is released when all its current iterations are approved. Each puzzle overview shows the rule in writing; reviewer names, required notes and checklists are absent. Geometry and handwriting use drawn paths; other pictures use the existing illustration sheets. Human look/feel approval remains pending until the owner signs off.

Competences below are bounded practice references to [Zürich Zyklus 1](CURRICULUM.md), not claims of mastery. Reading-based nature questions also require sentence understanding. Temporal picture sequencing and memory do not establish decoding.

| Rätsel / alle Aufgaben | Host | Related competence | Schwierigkeit | Aufgaben |
| --- | --- | --- | --- | ---: |
| [Reime erkennen](puzzles/friends-bird.md) | Blaumeise | D.2.A.1.b; D.1.A.1.b — Reime erkennen | 25 verschiedene Reimpaare ohne vertauschte Doppelungen; eingeführte Buchstaben | 25 |
| [Reihen ergänzen](puzzles/friends-beaver.md) | Biber | MA.2.A.1.a — Reihen mit Waldgegenständen ergänzen | Zwei oder drei verschiedene Waldgegenstände je Reihe; jede Reihe enthält dieselben Dinge wie die erste | 43 |
| [Lesen und verstehen](puzzles/friends-badger.md) | Dachs | D.2.A.1.b; D.2.B.1.b; NMG.2.1.a; NMG.2.3.a; NMG.2.4.a — Lesen und verstehen | Kurze Sätze und Naturfragen lesen; zwei oder drei Bildantworten | 78 |
| [Muster fortsetzen](puzzles/friends-ibex.md) | Steinbock | MA.2.A.2.a — Wiederholungsmuster fortsetzen und ergänzen | AAB, ABB, ABC, ABAC, AABC mit Stein, Tanne und Blume; Lücke am Ende oder in der zweiten Gruppe | 30 |
| [Mengen gezielt zählen](puzzles/count.md) | Igel | MA.1.A.2.a — Mengen gezielt zählen | 6–15 Marienkäfer zwischen Bienen und Schnecken | 30 |
| [Mengen addieren](puzzles/add.md) | Fisch | MA.1.A.3.a — Sichtbare Gruppen addieren | Zwei positive Summanden; Summe höchstens 10 | 45 |
| [Mengen ergänzen](puzzles/rocket.md) | Frosch | MA.1.A.4.b — Mengen ergänzen | Gesamtmenge 5–10; besetzte und freie Plätze | 39 |
| [Mengen verteilen](puzzles/picnic.md) | Frosch | MA.1.A.4.a (Übung) — Eins zu eins gerecht verteilen | 2–4 Freunde; 1–10 Beeren je Freund; insgesamt höchstens 20 | 25 |
| [Wörter in Silben zerlegen](puzzles/syllable.md) | Blaumeise | D.1.A.1.b — Wörter in Silben zerlegen | 1–5 Silben; vertraute Bildwörter | 47 |
| [Schritte im Raum planen](puzzles/robot.md) | Reh | MA.2.A.1.c (Unterstützung) — Benachbarte Schritte im Raum planen | 4 × 4; sichtbares Waldziel; Felsen erzwingen immer einen Umweg | 30 |
| [Gegenstände merken](puzzles/treasure.md) | Eichhörnchen | Optionale Gedächtnisübung — Gegenstände wiedererkennen | Vier Dinge, eines fehlt; kein Zeitlimit | 32 |
| [Zahlennachbarn bestimmen](puzzles/neighbours.md) | Eisvogel | MA.1.A.2.a/b — Zahlennachbarn bestimmen | Mitte 1–18; Mengenrahmen bis 20; ein Nachbar kann vorgegeben sein | 36 |
| [Mengen vergleichen](puzzles/compare.md) | Fisch | MA.1.A.1.a (Übung) — Mengen vergleichen | 1–10 Fische; mehr oder gleich viele | 28 |
| [Muster spiegeln](puzzles/mirror.md) | Biber | MA.2.A.2.c — Ein Muster spiegeln | 3 × 3; drei bis fünf Blätter; senkrechte Spiegelachse | 30 |
| [Einen Vokal ergänzen](puzzles/vowels.md) | Maus | D.4.A.1.c (Unterstützung) — Einen Vokal ergänzen | Bildwörter; keine Lücke innerhalb von au/ei/ie/eu/äu | 81 |
| [Silben zu Wörtern verbinden](puzzles/read-puzzle.md) | Waldkauz | D.2.A.1.b — Silben zu Wörtern verbinden | 28 Bildwörter; zwei bis drei Silben; ein Ablenker | 28 |

Existing historical Heart Tree activities remain archived/compatible and are not additional active Waldpost puzzles. Original FriendsState task snapshots remain untouched; newly started active puzzles use the shared finite catalogue. Older seeded sessions are retained in the puzzle save’s `legacy` field when the new catalogue starts a fresh round.

Review decisions are shared through the repository’s `puzzle-review-data` branch, keyed by exact revision. Devices keep an offline cache and unsaved outbox in `farbtupf.puzzle-review.v1`; developer reviews with `?dev=1` stay local. Only confirmed GitHub approvals release puzzles. No approvals are shipped by default. See [review instructions](PUZZLE-REVIEW.md).
