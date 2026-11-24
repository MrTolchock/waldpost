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

## Nachtrag: zweite Runde (9.4.34)

Die Prüfung am Nachmittag ergab zu «Mengen zählen» und «Wörter in Silben zerlegen» je den Hinweis «fast immer mittlere Antwort». Die Ursache lag in 9.4.33: Die aufsteigend sortierten Karten waren immer `n-1, n, n+1`, die Lösung stand also immer in der Mitte. Dasselbe galt bei Gezielt Mengen zählen, Mengen addieren und Mengen ergänzen. Auch bei den Zahlennachbarn standen die Lösungen immer in der Mitte der Reihe.

| Rätsel | Umsetzung |
| --- | --- |
| Mengen zählen, Gezielt Mengen zählen, Mengen addieren, Mengen ergänzen, Wörter in Silben zerlegen | Die Karten bleiben aufsteigend. Jede Aufgabe bietet aber ein eigenes Fenster aus drei Zahlen an, darum steht die Lösung links, in der Mitte oder rechts, je etwa ein Drittel. Die Lösung ist damit auch nicht mehr immer der mittlere Zahlenwert. Ausnahme bei den Silben: Einsilbige Wörter stehen zwangsläufig links, fünfsilbige rechts. |
| Zahlennachbarn | Die beiden Nachbarn stehen am Anfang, in der Mitte oder am Ende der Kartenreihe. Ist der Vorgänger vorgegeben, steht der Nachfolger links, in der Mitte oder rechts. Die gezeigten Zahlen erscheinen weiterhin nie als Auswahl. |
| Tiermerkmale | Das gezeichnete Eichhörnchen hält eine Eichel. Die Frage lautet darum «Wer hält eine Eichel?», auch die Bildnamen in der Bildbibliothek sagen jetzt «Eichel». |

Welche Stelle eine Aufgabe erhält, hängt nur von ihrer festen Kennung ab. Neue Aufgaben verschieben deshalb nie die Karten bestehender Aufgaben und öffnen deren Prüfung nicht erneut. Die neue Prüfung `tests/answer-positions.test.cjs` verlangt, dass in tausenden echten Runden jedes Rätsels keine Antwortposition über 45 % liegt, bei zwei Karten über 60 %. Ausserdem darf bei Zahlenkarten der mittlere Wert nicht überwiegen. Alle anderen Rätsel mischen ihre Bild-, Wort- und Buchstabenkarten bereits gleichmässig.

Freigaben: 180 Aufgaben haben neue Zahlenkarten oder eine neue Frage und sind wieder offen. Betroffen sind 24 bei Mengen zählen, 30 bei Gezielt Mengen zählen, 45 bei Mengen addieren, 39 bei Mengen ergänzen, 18 bei den Silben, 23 bei den Zahlennachbarn und 1 Tierfrage. Alle übrigen Freigaben bleiben unverändert. Offen aus allen Prüfungen sind jetzt nur Aufgaben, die neu geprüft werden müssen. Es gibt keinen ungelösten Kommentar mehr.

## Nachtrag: Tiere aus der Umgebung (9.4.35)

Auf Wunsch des Eigentümers ersetzen Tiere aus Alpen, Wald und Gewässern die Savannen-, Zoo- und Polartiere (Befund C-7).

| Rätsel | Vorher | Jetzt |
| --- | --- | --- |
| Tiermerkmale (Igel) | Rüssel, langer Hals, Mähne, gestreiftes Fell, Höcker, schwarze Streifen, schwimmender Vogel | «Wer klettert auf steile Felsen?» Steinbock · «Wer pfeift in den Bergen?» Murmeltier · «Wer wühlt mit der Schnauze im Waldboden?» Wildschwein · «Welcher Vogel steht lange still im Wasser?» Reiher · «Wer schwimmt im Bach und fängt Fische?» Fischotter · «Wer hat durchsichtige Flügel?» Libelle · «Welcher Vogel hat lange rote Beine?» Storch |
| Wörter mit Bildern verbinden (Maus) | Zebra, Löwe, Pinguin, Kamel, Tiger, Elefant, Giraffe | Steinbock, Murmeltier, Storch, Reiher, Wildschwein, Maulwurf, Libelle |
| Wörter in Silben zerlegen | Elefant, Giraffe | Eichhörnchen, Murmeltier |

Alle Bilder stammen aus der vorhandenen Bildbibliothek im kanonischen Stil und tragen deutsche Bildnamen. Kein aktives Rätsel verwendet noch ein Zoo-Tier. Wieder offen sind 25 Aufgaben: die 7 Tierfragen, die 7 neuen Lesewörter, 9 Lesekarten, deren falsche Bildantworten Zoo-Tiere waren, und die 2 Silbenwörter.

## Nachtrag: deutsche Bildnamen (9.4.36)

Viele Bildantworten hatten für Bildschirmleser nur ihre interne englische Kennung, zum Beispiel «Bild: frog» oder «Bild: beaver-lodge». Betroffen waren Tiermerkmale, Lebensräume, Wachstum und Wörter mit Bildern. Auch die Bildbibliothek zeigte bei älteren Bildern englische Namen. Jetzt haben 60 Bilder deutsche Namen, etwa Frosch, Biberburg, Sonnenuntergang und Schmetterlingspuppe. Spiel und Bildbibliothek verwenden dieselbe Namenstabelle.

Die neue Prüfung `tests/picture-names.test.cjs` verlangt für jedes Antwort- und Aufgabenbild eines Rätsels einen deutschen Namen.

Freigaben: Nur die Namen für Bildschirmleser ändern sich. Fragen, Antworten, Regeln, Schwierigkeit, Bedienung und Bilder sind gleich. Wie vom Eigentümer gewünscht, verbindet eine Brücke ab 9.4.35 (`e4f4e7e`) genau diese Darstellungspaare. Keine Aufgabe öffnet sich neu: Mit den veröffentlichten Prüfungen hat jedes Rätsel denselben Status wie vorher.

## Nachtrag: Abend-Prüfung, Vorlesen und Biber (9.4.40)

| Hinweis | Umsetzung |
| --- | --- |
| Zahlennachbarn: «Success screen passt nicht zu den restlichen Rätseln, grüner Rahmen um richtige Reihenfolge» | Wie bei allen anderen Rätseln werden nur die Karten grün, die das Kind gelegt hat. Das grüne Band über die ganze Reihe und das Schild «Das passt!» entfallen. Die vorgegebene Zahl bleibt unverändert. |
| Mengen zählen: «Eicheln in den ersten 20 Aufgaben nicht gleich gross wie bei den Viererreihen, wenn möglich grösser» | Alle Eicheln haben jetzt dieselbe Zellgrösse, ob in Fünfer- oder Viererreihen. Auf dem iPad (1080 × 810) misst eine Zelle 93 px statt bisher 64 px (Fünferreihen) bzw. 80 px (Viererreihen). Die Grösse richtet sich nach der Bildschirmhöhe, damit 20 Eicheln ohne Scrollen Platz haben. |
| Vorlesefunktion «funktioniert überhaupt nicht, Sprache ist Nonsens» | Im ganzen Spiel gibt es keine Sprachausgabe mehr. Die Lautsprecher-Knöpfe in den Rätseln, in der Schreibspur und in der Rätsel-Prüfung sind entfernt, ebenso die Aufnahmen und die Gerätestimme. Die Rätsel-Prüfung zeigt die Spielerklärung als Text. Die alten Dateien liegen nur noch als Referenz unter `legacy/retired-narration/`. |
| Weg beim Biber: «oft aussen herum statt hindurch, sieht begehbar aus, ist es aber nicht immer» | Die Baumstümpfe und gefällten Stämme standen so dicht, dass die Wegsuche sie als Wand behandelte. Vom Bau zum Biber waren es 48 m statt 25 m. Das Holz liegt jetzt südwestlich von Bibers Platz, jeder Stamm an seinem Stumpf und Richtung Teich, mindestens 4 m von den anderen entfernt. Jede Lücke, die offen aussieht, ist begehbar. Der Stapel Stangen ist jetzt fest und steht neben dem Biber. Die neue Prüfung `tests/beaver-clearing.test.cjs` misst die Umwege rund um die Lichtung. |

Freigaben: Wie bei den früheren Grössen- und Rückmeldungskorrekturen bleiben alle Aufgaben freigegeben, weil Fragen, Antworten, Regeln, Schwierigkeit, Bedienung und Bilder gleich sind. Die beiden Kommentare auf Rätselebene (Zahlennachbarn, Mengen zählen) bleiben offen, bis du die Korrektur in der Rätsel-Prüfung bestätigst.
