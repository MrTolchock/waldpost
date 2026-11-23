# Anpassungen nach der Release-Prüfung vom 23. November 2026

Grundlage ist die [abschliessende Release-Prüfung von 9.4.32](reviews/2026-11-23-release-review/README.md). Dazu kommen die vom Eigentümer gelieferten Hintergrundbilder. Umgesetzt in **Waldpost 9.4.33**.

## Lebensräume hinter den Rätseln

Der Eigentümer hat zwölf fertige Bilder geliefert. Sie ersetzen die Aquarell-Lebensräume und behalten deren Bildaufbau. Die Bilder sind im weichen Bilderbuchstil von Bau und Wald gemalt. Die Lernbilder auf dem Papier bleiben im kanonischen Aquarell-/Buntstiftstil.

| Gastgeber | Ort | Datei |
| --- | --- | --- |
| Dachs | Erdbau unter der Eiche | `puzzle-badger-sett` |
| Fisch | Wasserfallbecken | `puzzle-waterfall-pool` |
| Eisvogel | Bach mit Sitzast | `puzzle-brook` |
| Waldkauz | Eiche mit Baumhöhle | `puzzle-old-forest` |
| Maus | Baumstrunk im Haselgebüsch | `puzzle-stump` |
| Igel | Birken, Beeren und Laub | `puzzle-undergrowth` |
| Blaumeise | Birkenhain mit Nest | `puzzle-birches` |
| Biber | Teich mit Damm und Biberburg | `puzzle-beaver-pond` |
| Frosch | Teich mit Steg | `puzzle-swamp` |
| Reh | Wiese am Waldrand | `puzzle-meadow` |
| Steinbock | Alpweide mit Enzian und Edelweiss | `puzzle-mountain` |
| Eichhörnchen | Nadelwald mit Zapfen | `puzzle-conifers` |

Die gelieferten PNGs sind die bearbeitbaren Quellen. Die Exportmanifeste wandeln sie unverändert in WebP um. Jede Bildakte ist ein `waldpost-supplied-image-record`: Sie nennt den Eigentümer und den ursprünglichen Dateinamen, enthält den Hash der Quelle und hält fest, dass kein Generatorauftrag bekannt ist. Die Aquarellbilder vom 22. November bleiben mit Quellen, Manifesten und tatsächlichen Aufträgen unter [legacy/design-history/2026-11-23-watercolour-habitats](../legacy/design-history/2026-11-23-watercolour-habitats/README.md) erhalten.

## Rätsel und Aufgaben

| Befund | Umsetzung |
| --- | --- |
| C-1 Einen Vokal ergänzen | Die falschen Vokale wechseln jetzt durch alle Vokale. Weil «e» die häufigste Lücke ist, wird es auch bei allen anderen Vokalen als falsche Wahl angeboten. Kein Vokal verrät die Lösung mehr: Ein angebotener Vokal ist in 22–43 % der Aufgaben richtig, vorher bei o und u immer. 17 neue Bildwörter mit Lücke bei a, i, o oder u (Hut, Wurm, Turm, Hund, Mund, Buch, Topf, Hose, Dose, Kopf, Ball, Nase, Tisch, Birne, Kirsche, Zitrone). «e» ist nur noch in 35 von 81 Aufgaben die Lösung. |
| C-2 Eichel und Nuss | Das gezählte Bild ist eine Eichel. Darum heisst es «Wie viele Eicheln sind hier?» und «Zähle die Eicheln». Das Bild bleibt die vom Eigentümer wiederhergestellte Eichel. Wo «Nuss» steht (Wörter mit Bildern, Reim Nuss–Bus, Silben, Vokal), zeigt das Spiel die gezeichnete Baumnuss. Die Biber-Regel nennt keine Nüsse mehr. |
| C-3 Biber | Titel «Reihen ergänzen». Neue Regel: «In jeder Reihe liegen die gleichen Dinge wie in der ersten Reihe. Welches Bild fehlt?» |
| C-4 Naturfragen | Reh: Wohnorte von Biber, Dachs, Ameisen, Fuchs und Waldkauz, Klee für das Reh, Löwenzahn für den Hasen, Vogelbeeren. Diese Fragen ersetzen Netz, Mond, Sonne, Nektar, Blatt, Honig und Trauben. Dachs: Kaulquappe, Eiszapfen, Schmetterlingseier, Sonnenuntergang mit klaren Ablenkern, Schneeflocke, Eichel an der Eiche und Schneeglöckchen. Sie ersetzen Regen/Wolke, Honig, Raupe, Schaufel, Streifen und Samen. Igel: Der bellende Hund rennt, statt zu schlafen. |
| C-5 Schritte im Raum planen | 30 neu geplante Wege. Die Felsen versperren immer den geraden Weg, das Reh braucht mindestens zwei zusätzliche Schritte. Jedes freie Feld bleibt erreichbar. |
| C-6 Mengen addieren | Neun neue Aufgaben mit der Summe 10 (Zehnerfreunde). |
| C-8 Silben | «Lokomotive» statt «Eisenbahnzug». Neu sind Sonnenblume, Marienkäfer, Elefant, Giraffe, Schildkröte, Erdbeere, Regenbogen und Gänseblümchen. |
| C-9 Zahlennachbarn | Ist der Vorgänger vorgegeben, fragt das Spiel «Welche Zahl kommt danach?» |
| C-10 Zahlenkarten | Zahlenantworten stehen immer aufsteigend. Bild- und Wortantworten bleiben gemischt. |

**C-7 (Savannentiere im Igel-Rätsel)** bleibt unverändert. Die Fragen zu Zebra, Löwe, Tiger und Co. hat der Eigentümer am 22. November selbst überarbeitet.

## Darstellung und Zugänglichkeit

- **D-1 und D-2:** Alle Leserätsel (Wort, Satz, Frage, Farbe) haben dasselbe kompakte Lesefeld. Die Bildantworten werden auf dem Tablet bis 184 px gross. Die gezählten Fische sind grösser.
- **D-3:** Die Karte öffnet so, dass Fuchs und das Ziel des Briefs sichtbar sind. Wenn beides auf dem Telefon nicht passt, hat das Ziel Vorrang.
- **D-5:** Der Hinweis in der Rätsel-Prüfung nennt keine Zeichnungen mehr.
- **B-1:** Der Bildname heisst «lila Blume». Dabei ist ein älterer Fehler aufgefallen und behoben: Bildnamen lauteten «-rote Blume».
- **B-2:** Die Vorlage beim Spiegeln ist für Bildschirmleser beschrieben.
- **B-3:** Bildantworten tragen weiterhin ihren Namen. Kinder mit Bildschirmleser brauchen ihn.
- **D-4 (Stilbruch):** Die neuen Hintergründe teilen jetzt den Stil von Bau und Wald.

## Sprache

Die geänderten Regeln für Eichhörnchen und Biber sind mit derselben Stimme neu aufgenommen: Piper MLS medium, Sprecherin 2037, MP3 mit 22 050 Hz mono und 80 kbit/s. Die Zuordnung der Texte steht in `clips.js`. Bitte die beiden Aufnahmen einmal anhören.

## Freigaben

Der Eigentümer hat am 23. November verlangt, dass Freigaben über die reinen Darstellungsänderungen erhalten bleiben: Hintergründe, Kartenlayout, Zahlenreihenfolge und Bildnamen. Das funktioniert wie die Brücke von 9.4.26. Neu aufgezeichnet ist die Ausgangsversion 9.4.32 (`9efa9dd`) samt genauen Darstellungspaaren. Eine Aufgabe behält ihre Freigabe nur, wenn Frage, Antworten, Regel, Schwierigkeit und Bilder byte-genau gleich sind.

- **Bleiben freigegeben:** 568 Aufgaben.
- **Wieder offen (geändert):** 195 Aufgaben. Das sind alle Aufgaben von Mengen zählen (25), Reihen ergänzen (43) und Schritte im Raum planen (30), dazu 56 Vokalaufgaben, die 18 Zahlennachbarn mit vorgegebenem Vorgänger, 8 Reh-, 7 Dachs- und 4 Maus-Aufgaben sowie je 1 Reim-, 1 Igel- und 2 Silbenaufgaben.
- **Neu:** 34 Aufgaben (9 Addition, 8 Silben, 17 Vokale).

Damit sind 12 Rätsel bis zur Prüfung in der Rätsel-Prüfung für Kinder gesperrt. Die genaue Liste steht in `tests/review-changes-2026-11-23.cjs`. Es werden keine Freigaben erzeugt, und der Review-Datenbranch bleibt unverändert.

## Prüfung

- Alle Repository-Prüfungen und 190 Modelltests bestanden.
- Alle 24 Browser-Suiten bestanden, dazu der Update-Pfad 9.4.32 → 9.4.33.
- Seitenvergleiche auf Tablet und Telefon.
- 975 echte Runden mit aufsteigenden Zahlenkarten.
- Die Karte zeigt das Briefziel auf dem Telefon.
- Neu prüft eine Browser-Stufe in der CI die Rätsel-Galerie, das iPad-Layout, die Lebensräume und die Briefreise.
- Dabei ist ein weiterer veralteter Test aufgefallen und korrigiert: Die dokumentierte historische Wiederherstellungsprüfung (`WALDPOST_REVIEW_REF=61ef045…`) schlug schon seit 9.4.27 fehl. Sie nennt jetzt genau die Rätsel, die seither absichtlich geändert wurden.
