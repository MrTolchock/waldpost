# Rätsel-Ansichten: aufnehmen, vermessen, vergleichen

Mit diesen Werkzeugen wird das [einheitliche Rätsel-Layout](../../design/RAETSEL-LAYOUT.md) geprüft. Sie zeigen jeden Bildschirm, der anders aussieht, und vergleichen den heutigen Stand mit einem Vorschlag. Sie laufen nur lokal. Alle Rätsel werden in einem Wegwerf-Browser im Entwicklungsmodus (`dev=1`) freigegeben, und alle Anfragen ausserhalb von `127.0.0.1:8000` werden gesperrt. In die Prüfdaten wird nichts geschrieben.

## Vorbereitung

```
python3 -m http.server 8000 --bind 127.0.0.1     # im Repository
```

Die Skripte brauchen Playwright mit Chromium. Für einen Vorschlag zeigt `RAETSEL_CSS=<datei.css>` auf ein Stylesheet. Es wird in den Durchläufen «vorschlag» geladen. «heute» ist immer das Spiel, wie es ist.

## Ablauf

| Schritt | Befehl | Ergebnis |
|---|---|---|
| 1. Jede Aufgabe vermessen | `node survey.cjs tablet <tablet.json> <rätsel-id> …` und dasselbe mit `phone` | Papier- und Rahmenhöhe, Bilder im Rahmen, längster Text, Antworten, Aufbau, ob etwas über den Bildschirm ragt oder seitlich scrollt |
| 2. Ansichten auswählen | `python3 select.py <tablet.json>… --phone <phone.json>… --out <ordner>` | `plan-variants.json`: die meisten und wenigsten Bilder, der längste Text, der höchste Bildschirm auf Tablet und Handy, jede andere Anordnung und Antwortanzahl |
| 3. Erste Aufgabe je Rätsel | `node shoot.cjs <bilder> tablet,phone heute,vorschlag` | `<rätsel>-<gerät>-<stand>.jpg` und `games.json` |
| 4. Ansichten und Zustände | `node reps.cjs plan-variants.json <bilder> tablet,phone heute,vorschlag` und dasselbe mit `plan-states.json` | `<schlüssel>-<gerät>-<stand>.jpg` |
| 5. Schrift und Bilder messen | `node measure.cjs tablet` bzw. `phone` | Schriftgrössen, Schriftstärke und Bildgrössen pro Rätsel |
| 6. Übersicht | `python3 montage.py <bilder> tablet vorschlag uebersicht.jpg` | ein Kontaktbogen aller Rätsel |

Tablet ist 1080 × 810, Handy 390 × 844 (CSS-Pixel). Für den Vergleich hält `harness.cjs` die erste Aufgabe pro Rätsel fest. `window.__force` setzt eine bestimmte Aufgabe.

## Zustände nach einer Handlung

`plan-states.json` legt sie fest. `reps.cjs` kennt diese Handlungen:

| Handlung | Bedeutung |
|---|---|
| `treasure-choose` | Gegenstände merken: Häkchen gedrückt, die Auswahl erscheint |
| `picnic-fill` | Beeren vollständig verteilt |
| `neighbours-fill` | Zahlennachbarn gelegt |
| `syllables-partial` | erste Silbe gelegt |
| `mirror-partial` | Spiegelbild halb gefüllt |
| `robot-partial` | Reh unterwegs, ein Schritt vor dem Ziel |
| `wrong` | eine falsche Antwort gewählt |
| `right` | richtig gelöst, kurz vor dem Weiterschalten (grüne Markierung) |

Ein neues Rätsel mit einer Handlung, die den Bildschirm verändert (etwas verschwindet, füllt sich oder bewegt sich), bekommt hier eine eigene Handlung und einen Eintrag in `plan-states.json`.

Die Vorlage für die Seite, auf der der Besitzer die Bilder vergleicht, ist das Artifact «Waldpost Rätselbilder». Jedes Rätsel hat dort einen Abschnitt mit allen Ansichten sowie Umschaltern für Heute/Vorschlag und Tablet/Handy.
