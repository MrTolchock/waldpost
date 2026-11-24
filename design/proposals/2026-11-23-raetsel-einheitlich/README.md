# Vorschlag: einheitliche Rätsel (23. November 2026)

Status: **Entwurf, wartet auf Freigabe.** Nichts davon ist im Spiel. `proposal.css` wird nur bei der Aufnahme in den Browser eingespielt; keine Laufzeitdatei lädt es.

Vergleich Heute / Vorschlag für alle 22 Rätsel auf Tablet und Handy: Artifact «Waldpost Rätselbilder» (privat, im claude.ai-Konto des Besitzers).

## Wunsch des Besitzers

- Immer dieselbe Schriftart.
- Die Frage oder Einleitung oben ist in allen Rätseln gleich gross.
- Höchstens zwei Schriftgrössen pro Rätsel; die Waldfreund-Zeile oben zählt nicht.
- Das Rätselpapier ist kleiner, damit mehr vom Hintergrund sichtbar ist. Das gilt für alle Rätsel.
- Der graue Rahmen im Rätsel (zum Beispiel um die Eicheln) sieht in allen Rätseln gleich aus.
- Bilder sind im Rahmen und bei den Antworten gleich gross.

## Regeln des Vorschlags

| | Tablet | Handy (≤ 600 px) |
|---|---|---|
| Papierbreite | 760 px, Höhe nach Inhalt | volle Breite mit 12 px Rand |
| Schriftgrösse 1: Frage, Bedienknöpfe, Hinweise | 26 px | 22 px |
| Schriftgrösse 2: Gelesenes, Gezähltes, Gewähltes | 34 px | 29 px |
| Schrift | Andika 700 | Andika 700 |
| Bildgrösse, im Rahmen und bei den Antworten | 76 px | 52 px |
| Kästchen mit Bild | Bild + 10 px | Bild + 10 px (Spiegelbild: 46 px) |
| Mindesthöhe des Rahmens | 208 px | 160 px |
| Mengen verteilen: Bildgrösse | 60 px | 52 px |

Bilder stehen immer über ihrem Wort, im Rahmen wie bei den Antworten (zum Beispiel bei «Reime erkennen»).

### Leere Felder

Ein leeres Feld ist überall gleich gestaltet: Hintergrund `#fffaf0`, 2 px gestrichelte Linie `#b39a70`, Rundung 14 px und ein «?» in Schriftgrösse 2. Es hat keinen Unterstrich und keinen Bogen. Das gilt für fehlende Muster- und Reihenteile, leere Fliegenplätze, Silbenfelder, Zahlennachbarn und die leeren Felder im Spiegelbild. Ist ein Feld gefüllt, bekommt es die normale Kästchenlinie. Ausnahme: Die Buchstabenlücke bei «Einen Vokal ergänzen» bleibt ein Teil des Wortes, so wie sie heute ist.

### Einzelne Rätsel

- **Schritte im Raum planen:** Der Wald bleibt das gemalte Bild mit drei Bäumen in einem Feld. Start und Ziel bleiben markiert.
- **Zahlennachbarn:** «Das passt!» erscheint unten im Rahmen und reserviert vorher keinen Platz. So steht die Zahlenreihe senkrecht in der Mitte. Gelöst wird nur die Zahlenreihe grün hinterlegt, nicht die ganze Rahmenbreite.
- **Spiegelbild:** Zwischen den beiden Rastern steht ein angedeuteter Spiegel, eine schmale, silbrig glänzende Leiste.
- **Mengen verteilen:** Auf dem Tablet sind die Bilder 60 px gross, damit die vollsten Verteilungen (2 × 10, 3 × 6, 4 × 5) aufs Papier passen. Am knappsten ist 3 × 6 auf dem Tablet. Beeren und Freunde sind innerhalb des Rätsels gleich gross.
- **Gegenstände merken:** Die Auswahlleiste nach dem Merken ist im Artifact mit aufgeführt.
- **Silben zu Wörtern:** Im Spiel muss der Platzhalter `'___'` in `js/screens/puzzle.js` durch «?» ersetzt werden. Der Vorschlag blendet ihn nur per CSS aus.

Rahmen: Hintergrund `#f4f0e1`, Linie 1 px `#d6c5a4`, Rundung 22 px, ohne Schatten. Kästchen im Rahmen: Hintergrund `#fffaf0`, gleiche Linie, Rundung 14 px. Leere Felder: 2 px gestrichelt `#b39a70`.

Nachgemessen mit `capture/measure.cjs` in allen 22 Rätseln auf beiden Geräten: zwei Schriftgrössen, eine Schriftstärke, eine Bildgrösse. Die einzige Ausnahme sind die gedrehten Marienkäfer beim Zählen, deren Umriss grösser misst.

## Ansichten im Artifact

Das Artifact zeigt pro Rätsel jede Ansicht, in der der Bildschirm anders aussieht, jeweils im heutigen Stand und im Vorschlag:

- **Erste Aufgabe:** feste Aufgabe pro Rätsel, in beiden Ständen dieselbe.
- **Aus der Vermessung aller 797 Aufgaben** (`capture/survey.cjs`, Ergebnis in `capture/survey-summary.json`): die Aufgabe mit den meisten und den wenigsten Bildern im Rahmen (bei einem Unterschied ab 2 Bildern), mit dem längsten Text (ab 10 Zeichen) und mit dem höchsten Bildschirm auf Tablet bzw. Handy (ab 20 px Unterschied). Dazu jede weitere Anordnung im Rahmen und jede abweichende Anzahl Antwortknöpfe. Die Auswahl steht in `capture/plan-variants.json`.
- **Zustände nach einer Handlung** (`capture/plan-states.json`):
  - Merken: die Auswahl, nachdem die Gegenstände verschwunden sind
  - Picknick: die verteilten Beeren bei 2 × 10, 3 × 6 und 4 × 5
  - Zahlennachbarn: die gelegten Nachbarn, beide bzw. einer gegeben
  - Silben: die erste gelegte Silbe
  - Spiegelbild: halb gefüllt
  - Reh: unterwegs
  - Alle Rätsel mit Auswahlknöpfen: der Bildschirm nach einer falschen Antwort

Ergebnis der Vermessung im Vorschlag: In keiner der 797 Aufgaben ragt das Papier auf Tablet (1080 × 810) oder Handy (390 × 844) über den Bildschirm oder lässt sich seitlich scrollen. Am knappsten sind die vollsten Beeren-Verteilungen auf dem Tablet.

Neue Ansichten kommen dazu, wenn ein neues Rätsel oder eine neue Aufgabenart einen anders aussehenden Bildschirm erzeugt.

## Offene Punkte

- **Fliegen (Handy):** Das letzte Kästchen sitzt knapp am Rahmen.
- **Spiegelbild (Handy):** Die Kästchen sind kleiner, damit beide Raster und der Spiegel nebeneinander passen. Das Rätsel hat keine Bild-Antworten.
- **Addieren (Handy):** Die beiden Gruppen stehen untereinander statt nebeneinander.

## Umsetzung nach der Freigabe

`proposal.css` ist ein Überlagerungs-Stylesheet mit vielen `!important`. Für das Spiel sollen die Regeln in `css/puzzle-rounds.css` an der richtigen Stelle umgesetzt werden, statt sie darüberzulegen. Danach gilt:

- Die Bildgrösse und die Bedienung sichtbar zu ändern, öffnet die Prüfung der betroffenen Aufgaben neu. Eine reine Präsentations-Brücke passt dafür nicht.
- Prüfen gemäss [Development](../../../docs/DEVELOPMENT.md), einschliesslich `tests/ipad-puzzle-layout-browser.cjs` und `tests/design-system-browser.cjs`.
- Danach den Rätsel-Katalog und den Fingerabdruck neu erzeugen und das Konsistenz-Audit nachführen.

## Aufnahme

Das Spiel auf `http://127.0.0.1:8000` bereitstellen (`python3 -m http.server 8000` im Repo), dann in `capture/`:

```
node shoot2.cjs <ausgabeordner> tablet,phone heute,vorschlag       # erste Aufgabe je Rätsel
node survey.cjs tablet <ergebnis.json> <rätsel-id> …               # jede Aufgabe vermessen (bzw. phone)
node reps.cjs plan-variants.json <ausgabeordner> tablet,phone heute,vorschlag
node reps.cjs plan-states.json <ausgabeordner> tablet,phone heute,vorschlag
node measure.cjs tablet   # bzw. phone; Schriftgrössen und Bildgrössen mit proposal.css
python3 montage.py <ausgabeordner> tablet vorschlag uebersicht.jpg
```

Die Skripte geben alle Rätsel in einem Wegwerf-Browser nur lokal frei (Entwicklungsmodus `dev=1`, alle Anfragen nach aussen gesperrt). In die Prüfdaten wird nichts geschrieben. Jedes Rätsel zeigt in beiden Ständen dieselbe Aufgabe. Zusätzlich werden die drei vollsten Beeren-Verteilungen und die Auswahlleiste beim Merken aufgenommen.
