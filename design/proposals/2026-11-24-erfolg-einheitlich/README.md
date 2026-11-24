# Vorschlag: ein Erfolgsbild für alle Rätsel (24. November 2026)

Status: **Entwurf, wartet auf Freigabe.** Das Spiel lädt `proposal.css` nicht. Nur die Aufnahmen spielen es ein (`RAETSEL_CSS=…/proposal.css`, Werkzeuge in [tools/raetsel-ansichten](../../../tools/raetsel-ansichten/README.md)).

## Anlass

Der Besitzer bemerkte, dass der grüne Rahmen um die richtige Lösung bei «Silben zu Wörtern verbinden» anders aussieht als in den anderen Rätseln. Die Aufnahme von «Richtig gelöst» in allen 22 Rätseln (Handlung `right`) ergab:

| Rätsel | Im Spiel 9.4.41 |
|---|---|
| 15 Rätsel mit Antwortkacheln | Die gewählte Kachel wird grün (Hintergrund `#e8efd6`, Linie `#7f9a48`, weicher Ring). Das ist das Vorbild. |
| Silben zu Wörtern verbinden | Ein grünes Band läuft über die ganze Rahmenbreite. |
| Mengen verteilen | Ein grünes Band liegt hinter allen Plätzen. |
| Muster spiegeln | Das rechte Raster wird grün hinterlegt, die Felder selbst bleiben hell. |
| Schritte im Raum planen | Das ganze Wegraster wird grün hinterlegt. |
| Zahlennachbarn bestimmen, Mengen vergleichen | Nichts wird grün. Das ist ein Fehler aus 9.4.41: Der einheitliche Kästchenstil überschreibt die Erfolgsfarbe. |

## Regel

Grün werden immer die einzelnen gelösten Teile, genau wie eine richtige Antwortkachel. Ein grünes Band hinter einer Gruppe gibt es nicht.

| Rätsel | Was grün wird |
|---|---|
| Silben zu Wörtern verbinden | jede gelegte Silbe |
| Mengen verteilen | jeder Platz mit seinen Beeren |
| Muster spiegeln | jedes gefüllte Spiegelfeld |
| Zahlennachbarn bestimmen | jede gelegte Zahlenkarte |
| Mengen vergleichen | der gewählte Teller |
| Schritte im Raum planen | das Zielfeld mit dem Reh |
| alle anderen | die gewählte Antwortkachel (unverändert) |

Nach der Freigabe kommt die Regel in den Abschnitt «Erfolg» von [design/RAETSEL-LAYOUT.md](../../RAETSEL-LAYOUT.md) und in `css/puzzle-rounds.css`.
