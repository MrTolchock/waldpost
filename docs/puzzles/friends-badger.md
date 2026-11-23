# Wachstum und Naturveränderungen erkennen

[Alle Rätsel](../PUZZLE-CATALOGUE.md) · [Shared blueprint](../PUZZLE-BLUEPRINT.md)

- Stabile Rätsel-ID: `friends-badger`
- Host: badger
- Related competence: **NMG.2.3.a; D.2.B.1.b** — Wachstum und Naturveränderungen erkennen
- Difficulty: 25 kurze Fragen zu Wetter, Pflanzen und Entwicklung
- Pool: 25 Aufgaben; eine Runde enthält fünf.
- Review: solve every unconfirmed iteration to approve it; × rejects with an optional note. The puzzle is released when all current iterations passed. Exact per-iteration revisions gate release; only affected iterations require review after changes.

## Mapping to the blueprint

| Contract | Implementation |
| --- | --- |
| Picture roles | Drawn woodland subjects; painted host/companions; SVG geometry and tracing |
| Shared page | Waldbuch paper, host, Andika, five progress leaves |
| Child access | Only the character on the current letter; parent-controlled journey limit |
| Guidance | One optional rule explanation; no hints or next-task button |
| Sound | Enabled button clicks, success/retry, mute respected |
| Round | Five distinct sampled iterations; saved questions/partial work |
| Ending | 900 ms correct feedback, then 2.2 s celebration; reduced motion |
| Review | Production-sized open-item queue; solve to approve, × to reject, final celebration; written rule and revision gate |

## Alle Aufgaben

| Stabile Aufgaben-ID | Inhalt / Konfiguration | Expected answer or solution |
| --- | --- | --- |
| `friends-badger/riddle-0` | Was fällt aus der Wolke? — Was fällt aus der Wolke? | "rain" |
| `friends-badger/riddle-1` | Was wird aus einer Kaulquappe? — Was wird aus einer Kaulquappe? | "frog-sit" |
| `friends-badger/riddle-2` | Was wächst aus der Bohne? — Was wächst aus der Bohne? | "seedling" |
| `friends-badger/riddle-3` | Was baut man aus Schnee? — Was baut man aus Schnee? | "snowman" |
| `friends-badger/riddle-4` | Wer schlüpft aus dem Ei? — Wer schlüpft aus dem Ei? | "chick" |
| `friends-badger/riddle-5` | Was fällt im Herbst vom Baum? — Was fällt im Herbst vom Baum? | "leaf" |
| `friends-badger/riddle-6` | Was trinken die Pflanzen? — Was trinken die Pflanzen? | "water" |
| `friends-badger/riddle-7` | Was hängt im Winter vom Dach? — Was hängt im Winter vom Dach? | "icicle" |
| `friends-badger/riddle-8` | Woraus kommt der Schmetterling? — Woraus kommt der Schmetterling? | "cocoon" |
| `friends-badger/riddle-9` | Was legt der Schmetterling auf ein Blatt? — Was legt der Schmetterling auf ein Blatt? | "butterfly-eggs" |
| `friends-badger/riddle-10` | Was siehst du, wenn am Abend die Sonne untergeht? — Was siehst du, wenn am Abend die Sonne untergeht? | "sunset" |
| `friends-badger/riddle-11` | Was fällt im Winter vom Himmel? — Was fällt im Winter vom Himmel? | "snowflake" |
| `friends-badger/riddle-12` | Wer gräbt Gänge in der Erde? — Wer gräbt Gänge in der Erde? | "vocab-worm" |
| `friends-badger/riddle-13` | Welche Blume schaut zur Sonne? — Welche Blume schaut zur Sonne? | "sunflower" |
| `friends-badger/riddle-14` | Welche Pflanze hat Nadeln? — Welche Pflanze hat Nadeln? | "fir" |
| `friends-badger/riddle-15` | Was wächst an der Eiche? — Was wächst an der Eiche? | "forest-nut" |
| `friends-badger/riddle-16` | Was braucht eine Pflanze zum Wachsen? — Was braucht eine Pflanze zum Wachsen? | "sun" |
| `friends-badger/riddle-17` | Was wird aus einer Apfelblüte? — Was wird aus einer Apfelblüte? | "apple" |
| `friends-badger/riddle-18` | Welche Blume blüht im Frühling zuerst? — Welche Blume blüht im Frühling zuerst? | "snowdrop" |
| `friends-badger/riddle-19` | Was sammelt das Eichhörnchen im Herbst? — Was sammelt das Eichhörnchen im Herbst? | "forest-nut" |
| `friends-badger/riddle-20` | Was sehen wir bei klarem Himmel in der Nacht? — Was sehen wir bei klarem Himmel in der Nacht? | "moon" |
| `friends-badger/riddle-21` | Was wächst auf der Erdbeerpflanze? — Was wächst auf der Erdbeerpflanze? | "strawberry" |
| `friends-badger/riddle-22` | Womit giessen wir die Pflanzen? — Womit giessen wir die Pflanzen? | "watering-can" |
| `friends-badger/riddle-23` | Was wächst aus einer Eichel? — Was wächst aus einer Eichel? | "tree" |
| `friends-badger/riddle-24` | Was ernten wir vom Birnbaum? — Was ernten wir vom Birnbaum? | "pear" |

## Exact definitions

These definitions are the same finite data used by the game and review previews. Answer order may be shuffled during play. Coordinates/cells are zero based. Construction parts are `[shape, x, y, width, height, rotation]`; holes identify the two parts to insert.

```json
[
  {
    "id": "friends-badger/riddle-0",
    "label": "Was fällt aus der Wolke?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was fällt aus der Wolke?",
      "answer": "rain",
      "choices": [
        "rain",
        "sun",
        "leaf"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-1",
    "label": "Was wird aus einer Kaulquappe?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was wird aus einer Kaulquappe?",
      "answer": "frog-sit",
      "choices": [
        "frog-sit",
        "fish-swim",
        "bird"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-2",
    "label": "Was wächst aus der Bohne?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was wächst aus der Bohne?",
      "answer": "seedling",
      "choices": [
        "seedling",
        "chick",
        "snowman"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-3",
    "label": "Was baut man aus Schnee?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was baut man aus Schnee?",
      "answer": "snowman",
      "choices": [
        "snowman",
        "boat",
        "nest"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-4",
    "label": "Wer schlüpft aus dem Ei?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Wer schlüpft aus dem Ei?",
      "answer": "chick",
      "choices": [
        "chick",
        "fish",
        "bee"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-5",
    "label": "Was fällt im Herbst vom Baum?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was fällt im Herbst vom Baum?",
      "answer": "leaf",
      "choices": [
        "leaf",
        "egg",
        "moon"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-6",
    "label": "Was trinken die Pflanzen?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was trinken die Pflanzen?",
      "answer": "water",
      "choices": [
        "water",
        "honey",
        "cheese"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-7",
    "label": "Was hängt im Winter vom Dach?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was hängt im Winter vom Dach?",
      "answer": "icicle",
      "choices": [
        "icicle",
        "apple",
        "flower"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-8",
    "label": "Woraus kommt der Schmetterling?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Woraus kommt der Schmetterling?",
      "answer": "cocoon",
      "choices": [
        "cocoon",
        "nest",
        "bucket"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-9",
    "label": "Was legt der Schmetterling auf ein Blatt?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was legt der Schmetterling auf ein Blatt?",
      "answer": "butterfly-eggs",
      "choices": [
        "butterfly-eggs",
        "snowman",
        "fish"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-10",
    "label": "Was siehst du, wenn am Abend die Sonne untergeht?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was siehst du, wenn am Abend die Sonne untergeht?",
      "answer": "sunset",
      "choices": [
        "sunset",
        "chick",
        "bucket"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-11",
    "label": "Was fällt im Winter vom Himmel?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was fällt im Winter vom Himmel?",
      "answer": "snowflake",
      "choices": [
        "snowflake",
        "sunflower",
        "butterfly"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-12",
    "label": "Wer gräbt Gänge in der Erde?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Wer gräbt Gänge in der Erde?",
      "answer": "vocab-worm",
      "choices": [
        "vocab-worm",
        "bird",
        "fish"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-13",
    "label": "Welche Blume schaut zur Sonne?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Welche Blume schaut zur Sonne?",
      "answer": "sunflower",
      "choices": [
        "sunflower",
        "forest-rose",
        "fir"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-14",
    "label": "Welche Pflanze hat Nadeln?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Welche Pflanze hat Nadeln?",
      "answer": "fir",
      "choices": [
        "fir",
        "tree",
        "sunflower"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-15",
    "label": "Was wächst an der Eiche?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was wächst an der Eiche?",
      "answer": "forest-nut",
      "choices": [
        "forest-nut",
        "banana",
        "fish"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-16",
    "label": "Was braucht eine Pflanze zum Wachsen?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was braucht eine Pflanze zum Wachsen?",
      "answer": "sun",
      "choices": [
        "sun",
        "moon",
        "cheese"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-17",
    "label": "Was wird aus einer Apfelblüte?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was wird aus einer Apfelblüte?",
      "answer": "apple",
      "choices": [
        "apple",
        "egg",
        "snowman"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-18",
    "label": "Welche Blume blüht im Frühling zuerst?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Welche Blume blüht im Frühling zuerst?",
      "answer": "snowdrop",
      "choices": [
        "snowdrop",
        "sunflower",
        "forest-rose"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-19",
    "label": "Was sammelt das Eichhörnchen im Herbst?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was sammelt das Eichhörnchen im Herbst?",
      "answer": "forest-nut",
      "choices": [
        "forest-nut",
        "egg",
        "snowman"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-20",
    "label": "Was sehen wir bei klarem Himmel in der Nacht?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was sehen wir bei klarem Himmel in der Nacht?",
      "answer": "moon",
      "choices": [
        "moon",
        "sun",
        "sunflower"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-21",
    "label": "Was wächst auf der Erdbeerpflanze?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was wächst auf der Erdbeerpflanze?",
      "answer": "strawberry",
      "choices": [
        "strawberry",
        "carrot",
        "egg"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-22",
    "label": "Womit giessen wir die Pflanzen?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Womit giessen wir die Pflanzen?",
      "answer": "watering-can",
      "choices": [
        "watering-can",
        "fork",
        "hat"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-23",
    "label": "Was wächst aus einer Eichel?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was wächst aus einer Eichel?",
      "answer": "tree",
      "choices": [
        "tree",
        "cloud",
        "snowman"
      ]
    }
  },
  {
    "id": "friends-badger/riddle-24",
    "label": "Was ernten wir vom Birnbaum?",
    "question": {
      "kind": "reading",
      "prompt": "Welches Bild passt zur Frage?",
      "text": "Was ernten wir vom Birnbaum?",
      "answer": "pear",
      "choices": [
        "pear",
        "fish",
        "egg"
      ]
    }
  }
]
```
