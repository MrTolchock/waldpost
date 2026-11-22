# Anpassungen nach den Reviews vom 22. November 2026

Ausgewertet wurde der gemeinsame [Review-Speicher](https://github.com/MrTolchock/waldpost/blob/puzzle-review-data/reviews.json), Branch-Stand `5ff2818e430c27fb45576716989d90e8099f332a`, mit allen nicht gelöschten Hinweisen nach Version 9.4.26. Kommentare, Entscheidungen, Zeitpunkte und Löschmarkierungen bleiben unverändert. Umgesetzt in **Waldpost 9.4.27**.

| Rätsel / Aufgabe | Hinweis | Umsetzung |
| --- | --- | --- |
| Zeitliche Abfolgen ordnen | Lösche dieses Rätsel | Aus dem aktiven Katalog entfernt; der Dachs hostet nun nur noch sein Wachstumsrätsel. Gespeicherte Reviews und die frühere Regelaufnahme bleiben als Archiv erhalten. |
| Zahlennachbarn | Falsch platzierte Zahl ohne gestrichelten Rand zurück; Zahlenreihe darf sich nicht verschieben | Eine abgelehnte Zahlenkarte fliegt zurück und sieht danach genau wie vorher aus. «Das passt!» hat seinen Platz von Anfang an reserviert, die Reihe bleibt beim Lösen an derselben Stelle. |
| Gegenstände merken | Box mit Sequenz, Häkchen und Antworten soll gleich gross bleiben | Häkchen und Antwortreihe teilen dieselbe Höhe; die gemerkte Reihe und ihr Feld bleiben nach dem Häkchen unverändert. |
| Tierrätsel `riddle-3` | Spinne sieht auch gelb-schwarz aus | Spinne durch Maus ersetzt. |
| Tierrätsel `riddle-12` | Vogel hat auch einen breiten Schwanz | Vogel durch Schnecke ersetzt. |
| `nature-question-0, -1, -8, -10, -13, -23` | Aufgabe löschen | Entfernt. Die übrigen Kennungen bleiben stabil; das Rätsel hat nun 44 Aufgaben. |
| `nature-question-11` | «Wer entsteht» statt «Wer wird» | «Wer entsteht aus einer Raupe?» |
| `nature-question-15` | «Wer hat einen buschigen Schwanz?» | Übernommen. |
| `nature-question-16` | «Wer hat einen Rüssel?»; Biene ersetzen | Übernommen; Biene durch Schaf ersetzt. |
| `nature-question-17` | Wort «sehr» löschen | «Wer hat einen langen Hals?» |
| `nature-question-19` | «schwarz-weiss» streichen | «Wessen Fell ist gestreift?» |
| `nature-question-21` | «Wessen Fell hat schwarze Streifen?»; Frosch durch Tier mit Fell ersetzen | Übernommen; Frosch durch Löwe ersetzt (nicht Katze oder Zebra, die ebenfalls Streifen zeigen). |
| `nature-question-22` | Kuh durch Vogel ersetzen | Kuh durch Eule ersetzt. Zusätzlich ist der Eisvogel einem Rotkehlchen gewichen, weil der Eisvogel selbst ins Wasser taucht und sonst eine zweite richtige Antwort wäre. |

Freigaben: Alle 35 unveränderten, bereits freigegebenen Tierrätsel-Aufgaben behalten ihre Freigabe; die angezeigte Aufgabenzahl ist eine reine Anzeigeangabe. Die neun geänderten Tierrätsel-Aufgaben sowie alle Aufgaben von «Gegenstände merken» und «Zahlennachbarn» (geänderte Darstellung) sind wieder offen. Alle anderen Rätsel sind unverändert. Es werden keine Freigaben erzeugt und keine Änderungen am Review-Datenbranch vorgenommen.

Prüfung: Katalog-, Design-, Bild- und Einheitstests; Browserprüfungen für Rücksprung und feste Zahlenreihe, gleich grosse Gedächtnisfelder auf Tablet und Telefon, Zuteilungen, Rätsel-Prüfung, Spielprotokoll und Briefreise mit abgefangenen Review-APIs.
