# Anpassungen nach der Release-Prüfung vom 25. November 2026

> Ergänzt durch den [zweiten Auftrag desselben Tages (9.4.45)](#zweiter-auftrag-945): Reime mit drei Karten, Fische in Fünferreihen, Vergleiche mit wechselndem Unterschied, keine einzelnen Wörter mehr bei «Lesen und verstehen». Die Zahlen weiter unten beschreiben den Stand von 9.4.44.

Grundlage sind die [Release-Prüfung von 9.4.43](reviews/2026-11-25-release-review/README.md), die Prüfnotizen des Eigentümers vom Morgen des 25. November und sein Auftrag vom selben Tag. Umgesetzt in **Waldpost 9.4.44**.

## Prüfnotizen vom 25. November

| Aufgabe | Notiz | Umsetzung |
| --- | --- | --- |
| `friends-hedgehog/riddle-22` «Wer hat Flecken im Fell?» | «aufgabe löschen» | gelöscht |
| `colour-words/gelb-blau-rosa` «Die Blume ist gelb.» | «satz nur einmal aufführen und restliche aufgaben löschen» | Jeder der sechs Farbsätze kommt genau einmal vor (`rot-gelb-blau`, `gelb-rot-blau`, `blau-rot-gelb`, `rosa-rot-gelb`, `weiss-rot-gelb`, `lila-rot-gelb`). Die anderen 24 Farbaufgaben sind gelöscht. |

## Lesen und verstehen

**Keine ähnlichen Aufgaben mehr.** Jedes Tier und jedes Ding ist in höchstens einer Aufgabe die Antwort. Vorher gab es zum Beispiel «Igel» (Wort), «Der Igel läuft.» (Satz) und «Wer hat Stacheln?» (Frage) oder viermal den Wurm. Wo ein Tier kurze Sätze hat, bleibt ein Satz, damit die Satzstufe erhalten bleibt. Dabei kommen verschiedene Verben vor: schläft, fliegt, sitzt, rennt, schwimmt, läuft, steht und springt. Sonst bleibt die Frage. Ausnahme ist die Ameise: «Wer hat Fühler?» ist mehrdeutig, deshalb bleibt das Wort «Ameise».

Das Rätsel hat jetzt **113 statt 223 Aufgaben**:

| | Aufgaben |
| --- | ---: |
| Wörter | 35 |
| Sätze | 12 |
| Farbsätze | 6 |
| Fragen | 60 |

Gelöscht sind 110 Aufgaben. Die Liste steht in `tests/review-changes-2026-11-25.cjs`. Alle anderen Aufgaben behalten ihre IDs.

**Plausible falsche Bilder.** 47 Fragen bekommen falsche Bilder aus demselben Feld wie die Antwort: Tier zu Tier, Pflanze zu Pflanze, Wetter zu Wetter, Ort zu Ort, Futter zu Futter. Ein Fisch, ein Ei, Käse oder ein Eimer verraten die Antwort nicht mehr. Dabei ist darauf geachtet, dass kein falsches Bild auch richtig wäre. Beispiele:

- «Wer schlüpft aus dem Ei?» bietet nicht mehr Fisch und Biene an (beide schlüpfen auch aus Eiern), sondern Hase und Maus.
- «Wer frisst Gras?» und «Wer hat Fühler?» sind gelöscht, weil Schaf und Schnecke auch passen würden.
- «Wer hat einen hellen Hals?» bietet Dachs und Maulwurf an, nicht den Fuchs mit seiner weissen Kehle.

| Frage | Vorher | Jetzt |
| --- | --- | --- |
| Was wächst an der Eiche? | Banane, Fisch | Apfel, Birne |
| Was frisst der Hase gern? | Fisch, Ei | Eichel, Wurm |
| Wer hat Flossen? | Schnecke, Igel | Ente, Frosch |
| Wer gibt uns Milch? | Biene, Ameise | Schwein, Hund |
| Wer pfeift in den Bergen? | Schaf, Fisch | Steinbock, Kuh |

## Silben zu Wörtern verbinden

Bisher war «MA» in 27 von 28 Aufgaben die falsche Silbe. Ein Kind lernt schnell, sie zu überspringen. Jetzt hat jedes Wort eine eigene, ähnlich klingende Silbe, die sich von einer echten Silbe des Worts nur durch einen Laut unterscheidet, zum Beispiel:

- HA-SE + HO
- WOL-KE + WAL
- BI-BER + BO
- KA-ROT-TE + RAT

Tomate behält «LO».

## Zahlennachbarn: Tippen statt Ziehen

Auf Wunsch des Eigentümers gibt es bei den Zahlennachbarn kein Ziehen mehr (Befund B-2). Das Kind tippt auf eine Zahl:

- Eine richtige Zahl springt an ihren Platz, davor oder danach.
- Eine falsche Zahl bekommt den gewohnten gestrichelten Ring und bleibt bei den Antworten.

Die Zahlenkarten sind jetzt Knöpfe. Sie lassen sich auch mit der Tastatur und dem Bildschirmleser bedienen («Zahl 6»). Die Spielregel lautet «Tippe auf die Zahl davor und auf die Zahl danach. Sie springt an ihren Platz.» Bedienung und Regel sind neu, deshalb sind alle 36 Aufgaben wieder offen.

## Kleine Befunde der Release-Prüfung

| Befund | Umsetzung |
| --- | --- |
| B-4 Bau doppelt auf dem Handy | Die Fläche neben dem gemalten Bau ist jetzt eine unscharfe, abgedunkelte Kopie. Sie wirkt als Rahmen und nicht als zweites Bild (`css/friends.css`). |
| B-5 Kurier-Stecknadel unter dem Zähler | Stecknadeln von Freunden und vom Briefträger rücken unter Zähler, Karte und Einstellungen, wenn sie oben am Rand darunter liegen würden (`js/friends/game.js`). |
| B-6 «?» bleibt nach der Lösung | Bei Muster fortsetzen, Reihen ergänzen und Gegenstände merken steht nach der richtigen Antwort das gewählte Bild grün in der Lücke. |
| B-3 320-px-Handys | Mengen addieren und Mengen vergleichen verwenden dort 38-px-Bilder, Mengen verteilen 34 px. Beim Addieren stehen die Gruppen nebeneinander. Alle Antworten bleiben auf dem Bildschirm. |
| A-1 Bild ohne Namen | Das Bild bei Silben zu Wörtern verbinden hat einen Namen für den Bildschirmleser. |
| T-4 Ton | Ein Tonkontext, der nach einer Unterbrechung nicht mehr aufwacht (iOS: suspendiert oder unterbrochen, `resume()` meldet sich nie), wird beim nächsten Tippen nach 1,5 Sekunden ersetzt. Der Test liest den kurzen Zustand «suspended» aus dem Ereignis des Kontexts und nicht mehr durch Abfragen, das unter Last zu spät kam. |
| T-1 Flacher Klon | Die Tests mit früheren Releases sagen jetzt, dass `git fetch --unshallow` fehlt. |
| T-3 Prüfvariante mit `WALDPOST_REVIEW_REF` | Die Variante kennt die Änderungen vom 24. und 25. November. |
| K-1, K-2 Dokumente | Vorlesen ist aus Blueprint, Stil, Stil-Audit und den Rätselseiten entfernt. Überall stehen 17 Rätsel und 687 Aufgaben. |

Noch offen sind B-1 (Mustergrösse auf dem Handy), R-2 (erster Start ohne Prüfdaten), C-1 (Runden nach Texttyp) und die übrigen Inhaltspunkte. Sie ändern Gestaltung, Bedienung oder Inhalt weiterer Rätsel und brauchen zuerst die Entscheidung des Eigentümers.

## Prüfung

110 geänderte Aufgaben sind wieder offen:

- 47 in Lesen und verstehen
- 27 in Silben zu Wörtern verbinden
- alle 36 der Zahlennachbarn

Alle anderen Aufgaben behalten ihre Freigaben über die Brücke vom Release `4308987`. Gegen die veröffentlichten Prüfdaten sind 14 von 17 Rätseln freigegeben. Offen sind noch:

- Lesen und verstehen: 66 von 113 Aufgaben freigegeben
- Silben zu Wörtern verbinden: 1 von 28
- Zahlennachbarn: 0 von 36

Diese drei Rätsel erscheinen für Kinder erst, wenn ihre offenen Aufgaben in der Rätsel-Prüfung geprüft sind. Bis dahin bekommen Dachs, Waldkauz und Eisvogel keine Briefe.

## Zweiter Auftrag (9.4.45)

Am selben Tag wünschte der Eigentümer drei weitere Änderungen.

**Reime erkennen: drei Karten.** Jede Aufgabe hat eine dritte Karte, die ähnlich klingt, sich aber nicht reimt (gleicher Anfang oder gleicher Vokal). Beispiele:

- Tisch → Fisch / Hut / Tasse
- Hase → Nase / Baum / Hose
- Hand → Sand / Kuh / Hund

Raten trifft nur noch jedes dritte Mal. Alle 25 Aufgaben sind wieder offen.

**Fische in Fünferreihen.** Bei Mengen addieren und Mengen vergleichen stehen die Fische in Reihen zu fünf, wie Eicheln, Marienkäfer und Fliegenplätze: 7 ist 5 + 2, 10 ist 5 + 5. Weniger als fünf Fische stehen mittig in einer Reihe.

- Auf dem Tablet sind die Fische 56 px gross.
- Auf dem Handy stehen die verglichenen Gruppen untereinander.
- Der Bildschirmleser nennt sie «Erste Gruppe» und «Zweite Gruppe» statt «Links» und «Rechts».

Das ist eine reine Darstellung: Die Aufgaben von Mengen addieren und die 16 unveränderten Vergleiche behalten ihre Freigaben.

**Mengen vergleichen ohne festes Muster.** Vorher war links immer genau 1 Fisch mehr, rechts immer 2 mehr, und «=» war in 10 von 28 Aufgaben richtig. Jetzt gewinnt links 11-mal und rechts 11-mal, je mit 1, 2 oder 3 Fischen Unterschied. «=» ist 6-mal richtig. 12 Vergleiche sind neu, 12 sind gelöscht.

**Lesen und verstehen ohne einzelne Wörter.** Die 35 Aufgaben mit nur einem Wort sind gelöscht. Das Rätsel hat jetzt 78 Aufgaben: 12 Sätze, 6 Farbsätze und 60 Fragen. Die Sammlung umfasst 17 Rätsel mit 652 Aufgaben. Die Schwierigkeitsangabe der Prüfung bleibt unverändert, damit die übrigen Freigaben gelten. Die Anzeige nennt «Kurze Sätze und Naturfragen».

Gegen die veröffentlichten Prüfdaten sind damit 12 von 17 Rätseln freigegeben. Offen sind:

| Rätsel | Freigegeben | Offen | Gastgeber |
| --- | ---: | ---: | --- |
| Reime erkennen | 0 von 25 | 25 | Blaumeise, die Silben zerlegen weiter anbietet |
| Mengen vergleichen | 16 von 28 | 12 | Fisch, der Mengen addieren weiter anbietet |
| Lesen und verstehen | 31 von 78 | 47 | Dachs |
| Silben zu Wörtern verbinden | 1 von 28 | 27 | Waldkauz |
| Zahlennachbarn | 0 von 36 | 36 | Eisvogel |

## Prüfung am Nachmittag (9.4.46)

Der Eigentümer hat alle offenen Aufgaben geprüft. Freigegeben sind:

- Lesen und verstehen: 47
- Mengen vergleichen: 12
- Silben zu Wörtern verbinden: 27
- Zahlennachbarn: 36
- Reime erkennen: 22

Drei Reime hat er zurückgewiesen, weil die dritte Karte für Kinder doch reimt:

| Aufgabe | Notiz | Neue dritte Karte |
| --- | --- | --- |
| `friends-bird/rhyme-3` Hase → Nase | «hase und hose beide reimen sich, anpassen» | Hund statt Hose |
| `friends-bird/rhyme-6` Hose → Rose | «hose hase und rose reimen sich alle, anpassen» | Hand statt Hase |
| `friends-bird/rhyme-9` Hand → Sand | «hand sand und hund reimen sich alle» | Haus statt Hund |

Die neue Karte teilt nur noch den Anfangslaut. Vokal und Ende sind anders. Die 22 freigegebenen Reime bleiben unverändert. Damit sind 16 von 17 Rätseln freigegeben. Offen sind nur noch diese drei Aufgaben von Reime erkennen.

## Auftrag nach der Release-Prüfung von 9.4.46 (9.4.47)

Grundlage ist die [Release-Prüfung von 9.4.46](reviews/2026-11-25-release-review-9.4.46/README.md). Der Eigentümer wünschte:

| Wunsch | Umsetzung |
| --- | --- |
| «Mengen zählen» vom Eichhörnchen löschen | Das Rätsel ist nicht mehr im Spiel. Das Eichhörnchen bietet weiter «Gegenstände merken». Die 25 Aufgaben sind zurückgezogen, die Seite [friends-squirrel](puzzles/friends-squirrel.md) bleibt als historische Seite. Ein gespeicherter Brief an das Eichhörnchen bleibt gültig. |
| Befund R-1: erster Start ohne Prüfdaten | Solange kein Rätsel freigegeben ist, liegt kein Brief im Fuchsbau: kein Umschlag, kein Briefknopf, der Fuchs sagt «Heute ist noch kein Brief da. Du kannst draussen den Wald erkunden.» In den Einstellungen steht bei der Rätsel-Prüfung, dass kein Rätsel freigegeben ist und meist die Prüfdaten fehlen. Sobald die Freigaben geladen sind, kommt der Brief durch die Briefklappe, an einen Freund, der spielen kann (`js/friends/state.js`, `game.js`, `settings.js`). |
| Befund B-1: Zahlennachbarn davor und danach | Sind beide Felder offen, füllt das erste Tippen das erste Feld (davor), das zweite Tippen das zweite (danach). Eine Zahl, die nicht in das nächste offene Feld gehört, bekommt den gestrichelten Ring. Regel: «Tippe zuerst auf die Zahl davor, dann auf die Zahl danach.» |
| Befund C-1: wiederholte Bilder bei «Lesen und verstehen» | Die Auswahl der fünf Aufgaben überspringt eine Aufgabe, deren Bilder schon in der Runde vorkommen. Kein Bild erscheint zweimal in einer Runde (geprüft mit 50 000 Runden). Die Aufgaben selbst ändern sich nicht. |
| Befund C-2: «Lies das Wort» | Regel «Lies den Satz oder die Frage. Tippe auf das passende Bild.», Schwierigkeit «Kurze Sätze und Naturfragen lesen; zwei oder drei Bildantworten». Die zwölf Satzaufgaben behalten ihre zwei Bilder. |
| Befund K-1: Vorlesen in drei Zeilen | Blueprint, Stil und Stil-Audit nennen keinen Regel-Lautsprecher mehr. |

Die Sammlung umfasst jetzt **16 Rätsel mit 627 Aufgaben**.

**Prüfung.** Regel und Bedienung haben sich geändert, deshalb sind wieder offen:

- Lesen und verstehen: alle 78 Aufgaben
- Zahlennachbarn: alle 36 Aufgaben

Die geänderte Rundenauswahl betrifft nur die Reihenfolge, in der Aufgaben gezogen werden. Eine Brücke vom Release `81b0bcd` (9.4.46) hält die übrigen 513 Aufgaben und 14 Rätsel freigegeben (`tests/review-changes-2026-11-25-fourth.cjs`). Gegen die veröffentlichten Prüfdaten sind 14 von 16 Rätseln freigegeben. Bis die 114 offenen Aufgaben in der Rätsel-Prüfung freigegeben sind, bekommen Dachs und Eisvogel keine Briefe. Der vierte Reim-Befund (R-2 der Prüfung) bleibt auf Wunsch des Eigentümers unverändert.

## Zahlennachbarn: Ring weg, wenn das Feld wechselt (9.4.48)

Wunsch des Eigentümers: Bei «? 2 ?» tippt das Kind zuerst auf 3. Die 3 bekommt den gestrichelten Ring, weil zuerst die Zahl davor gefragt ist. Dann tippt es auf 1, und die 1 kommt ins linke Feld. Jetzt ist die Zahl danach gefragt, und die 3 kann richtig sein. Deshalb verschwinden die Ringe aller früher falsch getippten Zahlen, sobald ein Feld gefüllt ist.

Das ändert die Bedienung, deshalb sind die 36 Aufgaben der Zahlennachbarn wieder offen (auch die fünf, die nach 9.4.47 schon freigegeben waren). Alle anderen Aufgaben behalten ihre Freigaben. Gegen die veröffentlichten Prüfdaten sind 15 von 16 Rätseln freigegeben; «Lesen und verstehen» ist nach der Prüfung vom Nachmittag wieder freigegeben.
