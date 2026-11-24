# Einheitliches Rätsel-Layout

Dieser Blueprint bestimmt, wie **jedes** Rätsel aussieht: im Spiel, in der Rätsel-Galerie und in der Rätsel-Prüfung. Er entstand am 23. und 24. November 2026 aus der Durchsicht aller 22 Rätsel mit dem Besitzer und gilt seit Version 9.4.41. Ein neues Rätsel folgt ihm, ohne eigene Schriftgrössen, Farben, Rahmen oder Bildgrössen einzuführen.

Er ergänzt den [Rätsel-Blueprint](PUZZLE-BLUEPRINT.md) (Verhalten, Aufgaben, Prüfung) und den [visuellen Stil](VISUAL-STYLE.md) (Bilder und Farben). Umgesetzt ist er als letzter Abschnitt von [`css/puzzle-rounds.css`](../css/puzzle-rounds.css) mit den Variablen `--pv-*`. Geprüft wird er mit den [Rätsel-Ansichten](../tools/raetsel-ansichten/README.md).

## Masse

| | Tablet | Handy (bis 600 px) | Variable |
|---|---|---|---|
| Papierbreite | 760 px, Höhe nach Inhalt, senkrecht mittig | volle Breite, 12 px Rand seitlich, 20 px oben/unten | `--pv-paper` |
| Schriftgrösse 1: Frage, Bedienknöpfe, Hinweise | 26 px | 22 px | `--pv-prompt` |
| Schriftgrösse 2: alles, was gelesen, gezählt oder gewählt wird | 34 px | 29 px | `--pv-text` |
| Schrift | Andika 700 | Andika 700 | |
| Bildgrösse im Rahmen und bei den Antworten | 76 px | 52 px | `--pv-pic` |
| Kästchen mit Bild | Bild + 10 px | Bild + 10 px | `--pv-cell` |
| Mindesthöhe des Rahmens | 208 px | 160 px | `--pv-frame-h` |
| Platz für die Frage | eine Zeile | immer zwei Zeilen | |

Die Zeile mit dem Waldfreund oben (Zurück, Porträt, «… spielt mit dir») gehört nicht zu den zwei Schriftgrössen und behält ihre Gestaltung.

## Regeln

**Papier.** Es ist nur so gross wie die Aufgabe, damit rundherum möglichst viel vom gemalten Lebensraum des Freundes sichtbar bleibt. Es scrollt nie seitlich und ragt bei keiner Aufgabe über den Bildschirm.

**Schrift.** Es gibt eine Schrift (Andika) mit einer Stärke (700) und pro Rätsel höchstens zwei Grössen. Kleine Beschriftungen und Hinweise nehmen Grösse 1, nie eine dritte, kleinere Grösse.

**Frage.** Die Frage steht oben, ist in allen Rätseln gleich gross und so kurz wie möglich. Sie nennt nur, was die Bilder nicht schon zeigen. Ortsangaben wie «Wald-» oder «Berg-» und Farbangaben wie «rote» fallen weg, wenn sie nichts unterscheiden. Beispiele: «Welcher Gegenstand fehlt?», «Welches Bild fehlt im Muster?», «Wie viele Marienkäfer sind hier?», «Merke dir die vier Gegenstände.».

**Rahmen.** Unter der Frage steht in jedem Rätsel genau ein Rahmen: gleich breit wie das Papier innen, Hintergrund `#f4f0e1`, Linie 1 px `#d6c5a4`, Rundung 22 px, ohne Schatten, Inhalt waagrecht und senkrecht mittig. Er wird nie grösser als nötig, und grosse leere Flächen gibt es nicht.

**Kästchen.** Alle Kästchen im Rahmen sehen gleich aus: Hintergrund `#fffaf0`, Linie 1 px `#d6c5a4`, Rundung 14 px, ohne Schatten. Das gilt für Gruppen beim Addieren und Vergleichen, Reihen, Muster- und Zahlenkarten, Plätze, Wegfelder und Spiegelfelder. Hindernisse und Ziele dürfen eine fachliche Markierung haben, zum Beispiel grüne Steinfelder, den braunen Start des Rehs oder das grün umrandete Ziel.

**Leere Felder.** Ein Feld, das das Kind füllen soll, sieht überall gleich aus: Hintergrund `#fffaf0`, 2 px gestrichelte Linie `#b39a70`, Rundung 14 px und ein «?» in Schriftgrösse 2. Es hat keinen Unterstrich und keinen Bogen. Ist es gefüllt, bekommt es die normale Kästchenlinie. Leere und gefüllte Felder haben dieselbe Aussengrösse, damit beim Füllen nichts springt. Ausnahme: Die Buchstabenlücke im Wort («Banan_») bleibt ein Teil des Wortes.

**Bilder.** Jedes Bild hat dieselbe Grösse im Rahmen und bei den Antworten. Bild-Antworten sind so gross wie ihr Bild plus der gemeinsame Innenabstand. Ein Bild steht immer über seinem Wort, im Rahmen wie bei den Antworten. Bilder in Kästchen bekommen ausdrücklich die Kästchengrösse minus 10 px; 100 % ergibt in Raster-Knöpfen die Breite 0. Gemalte Zusammenstellungen bleiben in einem Feld, zum Beispiel der Wald aus drei Bäumen.

**Wenige Bilder.** Gibt es weniger Bilder als eine volle Reihe, zum Beispiel eine einzige Eichel oder den leeren Korb, stehen sie waagrecht und senkrecht in der Mitte. Volle Reihen bleiben im Fünferraster, damit man in Fünfern zählen kann.

**Antworten.** Die Antwortzeile steht unter dem Rahmen. Gleichartige Antworten sind gleich gross. Wechselt ein Rätsel die Phase (Merken → Auswählen), bleibt die Antwortzeile gleich hoch, damit nichts darüber springt.

**Falsche Eingabe.** Die gewählte Karte bekommt die warme, gestrichelte Innenkontur. Grösse und Platz bleiben gleich, und das Kind kann sofort weiter versuchen.

**Erfolg.** Eine gelöste Aufgabe sieht in allen Rätseln gleich aus: Das Gelöste (Antwort, Reihe, Plätze) wird grün, und Konfetti aus Blättern, Blumen und Eicheln fliegt. Ein sichtbarer Text wie «Das passt!» erscheint nicht. Der Bildschirmleser bekommt die Statusmeldung weiterhin. Bei einer gelösten Reihe wird nur die Reihe grün, nicht die ganze Rahmenbreite.

**Spiegel.** Beim Spiegelbild steht zwischen den Rastern ein angedeuteter, flacher Spiegel: eine schmale Fläche `#d3e1e3` mit Linie `#9fb4b8`, ohne Verlauf, Glanz oder Schatten.

## Ausnahmen

Jede Ausnahme braucht einen fachlichen Grund und steht hier.

| Rätsel | Ausnahme | Grund |
|---|---|---|
| Mengen verteilen | Bilder 60 px auf dem Tablet | Bis zu 20 Beeren (2 × 10, 3 × 6, 4 × 5) müssen aufs Papier passen. Beeren und Freunde sind untereinander gleich gross. |
| Muster spiegeln | Kästchen 46 px auf dem Handy | Zwei Raster und der Spiegel müssen nebeneinander passen. Das Rätsel hat keine Bild-Antworten. |
| Mengen addieren | Gruppen auf dem Handy untereinander | Nebeneinander stünden die Fische in einer einzigen Spalte. |
| Einen Vokal ergänzen | Lücke im Wort statt leerem Feld | Die Lücke gehört zum Wortbild. |

## Ein neues Rätsel gestalten

1. Nur die gemeinsamen Klassen und Variablen verwenden: `.puzzle-prompt`, `.puzzle-scene`, `.puzzle-answers`, `.puzzle-picture`, die Kästchenklassen und `--pv-*`. Eigene Grössen, Farben, Schatten oder Rundungen gibt es nur als begründete Ausnahme in der Tabelle oben.
2. Jede Aufgabe auf Tablet und Handy vermessen (`tools/raetsel-ansichten/survey.cjs`). Keine darf über den Bildschirm ragen oder seitlich scrollen.
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
