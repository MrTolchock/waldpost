# Einheitliches Rätsel-Layout

Dieser Blueprint bestimmt, wie **jedes** Rätsel aussieht: im Spiel, in der Rätsel-Galerie und in der Rätsel-Prüfung. Er entstand am 23. und 24. November 2026 aus der Durchsicht aller damals 22 Rätsel (heute 17) mit dem Besitzer und gilt seit Version 9.4.41 (Erfolgsbild, Zahlenkarten und schmale Handys seit 9.4.42). Ein neues Rätsel folgt ihm, ohne eigene Schriftgrössen, Farben, Rahmen oder Bildgrössen einzuführen.

Er ergänzt den [Rätsel-Blueprint](PUZZLE-BLUEPRINT.md) (Verhalten, Aufgaben, Prüfung) und den [visuellen Stil](VISUAL-STYLE.md) (Bilder und Farben). Umgesetzt ist er als letzter Abschnitt von [`css/puzzle-rounds.css`](../css/puzzle-rounds.css) mit den Variablen `--pv-*`. Geprüft wird er mit den [Rätsel-Ansichten](../tools/raetsel-ansichten/README.md).

## Masse

| | Tablet | Handy (bis 600 px) | Variable |
|---|---|---|---|
| Papierbreite | 760 px, Höhe nach Inhalt, senkrecht mittig | volle Breite, 12 px Rand seitlich, 20 px oben/unten | `--pv-paper` |
| Schriftgrösse 1: Frage, Bedienknöpfe, Hinweise | 26 px | 22 px | `--pv-prompt` |
| Schriftgrösse 2: alles, was gelesen, gezählt oder gewählt wird | 34 px | 29 px | `--pv-text` |
| Schrift | Andika 700 | Andika 700 | |
| Bildgrösse im Rahmen und bei den Antworten | 76 px | 52 px | `--pv-pic` |
| Kästchen mit Bild | Bild + 10 px | Bild + 10 px, auf schmalen Handys kleiner (siehe Regel «Schmale Bildschirme») | `--pv-cell` |
| Abstand in Kästchenrastern | 8 px | 4 px | `--pv-gap` |
| Mindesthöhe des Rahmens | 208 px | 160 px | `--pv-frame-h` |
| Platz für die Frage | eine Zeile | immer zwei Zeilen | |

Die Zeile mit dem Waldfreund oben (Zurück, Porträt, «… spielt mit dir») gehört nicht zu den zwei Schriftgrössen und behält ihre Gestaltung.

## Regeln

**Papier.** Es ist nur so gross wie die Aufgabe, damit rundherum möglichst viel vom gemalten Lebensraum des Freundes sichtbar bleibt. Es scrollt nie seitlich und ragt bei keiner Aufgabe über den Bildschirm.

**Schrift.** Es gibt eine Schrift (Andika) mit einer Stärke (700) und pro Rätsel höchstens zwei Grössen. Kleine Beschriftungen und Hinweise nehmen Grösse 1, nie eine dritte, kleinere Grösse.

**Frage.** Die Frage steht oben, ist in allen Rätseln gleich gross und so kurz wie möglich. Sie nennt nur, was die Bilder nicht schon zeigen. Ortsangaben wie «Wald-» oder «Berg-» und Farbangaben wie «rote» fallen weg, wenn sie nichts unterscheiden. Beispiele: «Welcher Gegenstand fehlt?», «Welches Bild fehlt im Muster?», «Wie viele Marienkäfer sind hier?», «Merke dir die vier Gegenstände.».

**Rahmen.** Unter der Frage steht in jedem Rätsel genau ein Rahmen: gleich breit wie das Papier innen, Hintergrund `#f4f0e1`, Linie 1 px `#d6c5a4`, Rundung 22 px, ohne Schatten, Inhalt waagrecht und senkrecht mittig. Er wird nie grösser als nötig, und grosse leere Flächen gibt es nicht.

**Kästchen.** Alle Kästchen im Rahmen sehen gleich aus: Hintergrund `#fffaf0`, Linie 1 px `#d6c5a4`, Rundung 14 px, ohne Schatten. Das gilt für Gruppen beim Addieren und Vergleichen, Reihen, Muster- und Zahlenkarten, Plätze, Wegfelder und Spiegelfelder. Hindernisse und Ziele dürfen eine fachliche Markierung haben, zum Beispiel grüne Steinfelder, den braunen Start des Rehs oder das grün umrandete Ziel. Karten, die das Kind aus den Antworten in den Rahmen legt, haben genau die Form der Antwortkacheln: Bei den Zahlennachbarn sind Reihe und Antworten 112 × 70 px (Handy 64 × 62 px), leer wie gefüllt.

**Leere Felder.** Ein Feld, das das Kind füllen soll, sieht überall gleich aus: Hintergrund `#fffaf0`, 2 px gestrichelte Linie `#b39a70`, Rundung 14 px und ein «?» in Schriftgrösse 2. Es hat keinen Unterstrich und keinen Bogen. Ist es gefüllt, bekommt es die normale Kästchenlinie. Leere und gefüllte Felder haben dieselbe Aussengrösse, damit beim Füllen nichts springt. Ausnahme: Die Buchstabenlücke im Wort («Banan_») bleibt ein Teil des Wortes.

**Bilder.** Jedes Bild hat dieselbe Grösse im Rahmen und bei den Antworten. Bild-Antworten sind so gross wie ihr Bild plus der gemeinsame Innenabstand. Ein Bild steht immer über seinem Wort, im Rahmen wie bei den Antworten. Bilder in Kästchen bekommen ausdrücklich die Kästchengrösse minus 10 px; 100 % ergibt in Raster-Knöpfen die Breite 0. Gemalte Zusammenstellungen bleiben in einem Feld, zum Beispiel der Wald aus drei Bäumen.

**Wenige Bilder.** Gibt es weniger Bilder als eine volle Reihe, zum Beispiel eine einzige Eichel oder den leeren Korb, stehen sie waagrecht und senkrecht in der Mitte. Volle Reihen bleiben im Fünferraster, damit man in Fünfern zählen kann.

**Antworten.** Die Antwortzeile steht unter dem Rahmen. Gleichartige Antworten sind gleich gross. Wechselt ein Rätsel die Phase (Merken → Auswählen), bleibt die Antwortzeile gleich hoch, damit nichts darüber springt.

**Falsche Eingabe.** Die gewählte Karte bekommt die warme, gestrichelte Innenkontur. Grösse und Platz bleiben gleich, und das Kind kann sofort weiter versuchen.

**Erfolg.** Eine gelöste Aufgabe sieht in allen Rätseln gleich aus: Grün werden immer die einzelnen gelösten Teile, genau wie eine richtige Antwortkachel (Hintergrund `#e8efd6`, Linie `#7f9a48`, weicher Ring): die gewählte Antwort, jede gelegte Silbe oder Zahlenkarte, jeder Platz mit seinen Beeren, jedes gefüllte Spiegelfeld, der gewählte Teller, das Zielfeld mit dem Reh. Ein grünes Band hinter einer Gruppe gibt es nicht. Dazu fliegt Konfetti aus Blättern, Blumen und Eicheln, und das aktuelle Fortschrittsblatt wächst kurz. Das Papier bekommt keinen grünen Schein, und das Porträt des Freundes bleibt in seiner Zeile. Ein sichtbarer Text wie «Das passt!» erscheint nicht. Hat die Aufgabe eine Lücke im Rahmen (Muster, Reihe, Merkreihe), steht nach der richtigen Antwort das gewählte Bild grün in der Lücke, damit das Kind die vollständige Folge sieht. Der Bildschirmleser bekommt die Statusmeldung weiterhin. ([Vorschlag vom 24. November](proposals/2026-11-24-erfolg-einheitlich/README.md))

**Folgen und Muster.** Eine Folge, die das Kind fortsetzen oder ergänzen soll, steht immer in einer einzigen Zeile, damit kein Umbruch eine Wiederholungseinheit zerschneidet. Ist die Zeile zu schmal, werden alle Felder gemeinsam kleiner und das «?» der Lücke mit ihnen (Tablet 9 Felder zu 68 px, Handy 390 px zu 32 px, 320 px zu 24 px).

**Zählfelder.** Gezählte Dinge stehen aufrecht auf dem schlichten Rahmen, ohne eigenen Hintergrund, Verlauf oder Drehung.

**Barrierefreiheit.** Jedes Bild, das für die Lösung wichtig ist, hat einen Namen für den Bildschirmleser: Musterfelder und Lücken, die Gegenstände beim Merken, die Freunde beim Verteilen (Fuchs, Maus, Blaumeise, Reh) mit ihrer Beerenzahl und die Fischanzahl der Gruppen beim Vergleichen.

**Schmale Bildschirme.** Der Rahmen ist ein Grössen-Container. Jedes Kästchenraster nimmt die kleinere von Designgrösse und tatsächlich verfügbarer Spaltenbreite. So bleiben auf Handys von 320 bis 390 px alle Kästchen, Plätze und Bilder im Rahmen. Kein Kästchen darf je über den Rahmen oder den Bildschirm hinausragen, auch wenn nichts scrollt.

**Spiegel.** Beim Spiegelbild steht zwischen den Rastern ein angedeuteter, flacher Spiegel: eine schmale Fläche `#d3e1e3` mit Linie `#9fb4b8`, ohne Verlauf, Glanz oder Schatten.

## Ausnahmen

Jede Ausnahme braucht einen fachlichen Grund und steht hier.

| Rätsel | Ausnahme | Grund |
|---|---|---|
| Mengen verteilen | Bilder 60 px auf dem Tablet | Bis zu 20 Beeren (2 × 10, 3 × 6, 4 × 5) müssen aufs Papier passen. Beeren und Freunde sind untereinander gleich gross. |
| Muster spiegeln | Kästchen 46 px auf dem Handy | Zwei Raster und der Spiegel müssen nebeneinander passen. Das Rätsel hat keine Bild-Antworten. |
| Mengen addieren | Gruppen auf dem Handy untereinander | Nebeneinander stünden die Fische in einer einzigen Spalte. |
| Einen Vokal ergänzen | Lücke im Wort statt leerem Feld | Die Lücke gehört zum Wortbild. |
| Muster fortsetzen | Musterfelder und «?» schrumpfen gemeinsam (Tablet 9 Felder zu 68 px, Handy 390 px zu 32 px) | Die Folge steht in einer Zeile, damit kein Umbruch eine Wiederholungseinheit zerschneidet (siehe «Folgen und Muster»). |
| Mengen addieren, Mengen vergleichen | Fische in Fünferreihen; Tablet 56 px, auf Handys höchstens ein Fünftel der Rahmenbreite (bis 340 px: 34 px beim Addieren, 38 px beim Vergleichen); beim Vergleichen stehen die Gruppen auf Handys untereinander | Fünf Fische pro Reihe wie bei Eicheln, Marienkäfern und Fliegenplätzen: 7 ist auf einen Blick 5 + 2. Zwei Gruppen zu fünf Fischen passen so nebeneinander, und auf schmalen Handys bleiben die Antworten auf dem Bildschirm. |
| Mengen verteilen | Beeren 34 px auf Handys bis 340 px | Auf 320 px breiten Handys bleiben alle Freunde und die Antworten auf dem Bildschirm. |

## Ein neues Rätsel gestalten

1. Nur die gemeinsamen Klassen und Variablen verwenden: `.puzzle-prompt`, `.puzzle-scene`, `.puzzle-answers`, `.puzzle-picture`, die Kästchenklassen und `--pv-*`. Eigene Grössen, Farben, Schatten oder Rundungen gibt es nur als begründete Ausnahme in der Tabelle oben.
2. Jede Aufgabe auf Tablet und auf Handys mit 390, 360 und 320 px vermessen (`tools/raetsel-ansichten/survey.cjs`). Keine darf über den Bildschirm ragen oder seitlich scrollen, und `clip` muss überall 0 sein: Kein Knopf, Kästchen oder Bild darf über den Rahmen oder den Bildschirm hinausragen.
3. Alle Ansichten aufnehmen, in denen der Bildschirm anders aussieht: die erste Aufgabe, die meisten und wenigsten Bilder, der längste Text, der höchste Bildschirm, jede andere Anordnung und Antwortanzahl. Dazu jeder Zustand nach einer Handlung: Etwas verschwindet, füllt sich, ist halb gelöst, bewegt sich, ist falsch beantwortet oder gelöst.
4. Die Ansichten dem Besitzer als Vergleich Heute/Vorschlag auf Tablet und Handy vorlegen. Gestaltungsänderungen werden zuerst nur dort und in diesem Blueprint festgehalten und erst nach der Freigabe umgesetzt.
5. Mit `tools/raetsel-ansichten/measure.cjs` prüfen: zwei Schriftgrössen, eine Schriftstärke und eine Bildgrösse pro Rätsel.
6. Prüfung: Ein reines Layout, das nur diesem Blueprint folgt, behält bestehende Freigaben. Neue oder geänderte Fragen, Antworten, Regeln, Bilder oder Bedienung öffnen die betroffenen Aufgaben neu.

## Herkunft

Den Vorschlag, alle Aufnahmen und die Vermessung aller 797 Aufgaben hält [design/proposals/2026-11-23-raetsel-einheitlich](proposals/2026-11-23-raetsel-einheitlich/README.md) fest. Die Wünsche des Besitzers in der Reihenfolge der Durchsicht:

- **Erste Runde:**
  - eine Schrift und die Frage immer gleich gross
  - höchstens zwei Schriftgrössen
  - kleineres Papier, damit mehr Hintergrund zu sehen ist
  - ein einheitlicher Rahmen
  - gleich grosse Bilder im Rahmen und bei den Antworten
- **Zweite Runde:**
  - das Wort unter dem Bild
  - Platz für die verteilten Beeren
  - der Wald als ein Bild
  - die Auswahlleiste beim Merken
  - die Zahlenreihe mittig
  - ein Spiegel
  - einheitliche leere Felder
- **Dritte Runde:**
  - alle Ansichten jedes Rätsels zeigen
- **Vierte Runde:**
  - wenige Bilder mittig
  - kürzere Titel und Fragen
  - einheitlicher Erfolg ohne «Das passt!»
  - ein flacher Spiegel
  - «Gegenstand» statt «Waldschatz»
- **Fünfte Runde:**
  - grün werden die gelösten Teile, nie ein Band dahinter
  - die Zahlenkarten in der Reihe haben die Form der Antwortkacheln
- **Release-Prüfung vom 24. November (B-1):**
  - auf schmalen Handys schrumpfen die Kästchen mit dem Papier
- **Sechste Runde und Release-Prüfung (B-2, B-3, B-4, A-1):**
  - die sechs Lese-Rätsel sind ein Rätsel des Dachses mit vereinheitlichten Fragen
  - Muster in einer Zeile, Erfolg ohne Papierschein und Porträtsprung, schlichte Zählwiese, Namen für den Bildschirmleser
- **Release-Prüfung vom 25. November (B-3, B-6, A-1):**
  - die gelöste Lücke zeigt das gewählte Bild
  - schmale 320-px-Handys: kleinere Bilder bei Fischen und Beeren
  - das Bild bei «Silben zu Wörtern verbinden» hat einen Namen für den Bildschirmleser
- **Zweiter Auftrag vom 25. November (C-6):**
  - Fische in Fünferreihen, verglichene Gruppen auf Handys untereinander
