# Mengen zählen

[Alle Rätsel](../PUZZLE-CATALOGUE.md) · [Shared blueprint](../PUZZLE-BLUEPRINT.md)

- Stabile Rätsel-ID: `friends-squirrel`
- Host: squirrel
- Related competence: **MA.1.A.2.a** — Mengen zählen
- Difficulty: 0–20 Eicheln; Vierer- und Fünferstruktur
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
| `friends-squirrel/count-0` | Menge 0 — Wie viele Eicheln sind hier? | 0 |
| `friends-squirrel/count-1` | Menge 1 — Wie viele Eicheln sind hier? | 1 |
| `friends-squirrel/count-2` | Menge 2 — Wie viele Eicheln sind hier? | 2 |
| `friends-squirrel/count-3` | Menge 3 — Wie viele Eicheln sind hier? | 3 |
| `friends-squirrel/count-4` | Menge 4 — Wie viele Eicheln sind hier? | 4 |
| `friends-squirrel/count-5` | Menge 5 — Wie viele Eicheln sind hier? | 5 |
| `friends-squirrel/count-6` | Menge 6 — Wie viele Eicheln sind hier? | 6 |
| `friends-squirrel/count-7` | Menge 7 — Wie viele Eicheln sind hier? | 7 |
| `friends-squirrel/count-8` | Menge 8 — Wie viele Eicheln sind hier? | 8 |
| `friends-squirrel/count-9` | Menge 9 — Wie viele Eicheln sind hier? | 9 |
| `friends-squirrel/count-10` | Menge 10 — Wie viele Eicheln sind hier? | 10 |
| `friends-squirrel/count-11` | Menge 11 — Wie viele Eicheln sind hier? | 11 |
| `friends-squirrel/count-12` | Menge 12 — Wie viele Eicheln sind hier? | 12 |
| `friends-squirrel/count-13` | Menge 13 — Wie viele Eicheln sind hier? | 13 |
| `friends-squirrel/count-14` | Menge 14 — Wie viele Eicheln sind hier? | 14 |
| `friends-squirrel/count-15` | Menge 15 — Wie viele Eicheln sind hier? | 15 |
| `friends-squirrel/count-16` | Menge 16 — Wie viele Eicheln sind hier? | 16 |
| `friends-squirrel/count-17` | Menge 17 — Wie viele Eicheln sind hier? | 17 |
| `friends-squirrel/count-18` | Menge 18 — Wie viele Eicheln sind hier? | 18 |
| `friends-squirrel/count-19` | Menge 19 — Wie viele Eicheln sind hier? | 19 |
| `friends-squirrel/count-20` | Menge 20 — Wie viele Eicheln sind hier? | 20 |
| `friends-squirrel/four-4` | Menge 4 in Viererreihen — Wie viele Eicheln sind hier? | 4 |
| `friends-squirrel/four-8` | Menge 8 in Viererreihen — Wie viele Eicheln sind hier? | 8 |
| `friends-squirrel/four-12` | Menge 12 in Viererreihen — Wie viele Eicheln sind hier? | 12 |
| `friends-squirrel/four-16` | Menge 16 in Viererreihen — Wie viele Eicheln sind hier? | 16 |

## Exact definitions

These definitions are the same finite data used by the game and review previews. Answer order may be shuffled during play. Coordinates/cells are zero based. Construction parts are `[shape, x, y, width, height, rotation]`; holes identify the two parts to insert.

```json
[
  {
    "id": "friends-squirrel/count-0",
    "label": "Menge 0",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 0,
      "item": "forest-nut",
      "columns": 5,
      "answer": 0,
      "choices": [
        0,
        1,
        2
      ]
    }
  },
  {
    "id": "friends-squirrel/count-1",
    "label": "Menge 1",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 1,
      "item": "forest-nut",
      "columns": 5,
      "answer": 1,
      "choices": [
        0,
        1,
        2
      ]
    }
  },
  {
    "id": "friends-squirrel/count-2",
    "label": "Menge 2",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 2,
      "item": "forest-nut",
      "columns": 5,
      "answer": 2,
      "choices": [
        0,
        1,
        2
      ]
    }
  },
  {
    "id": "friends-squirrel/count-3",
    "label": "Menge 3",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 3,
      "item": "forest-nut",
      "columns": 5,
      "answer": 3,
      "choices": [
        2,
        3,
        4
      ]
    }
  },
  {
    "id": "friends-squirrel/count-4",
    "label": "Menge 4",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 4,
      "item": "forest-nut",
      "columns": 5,
      "answer": 4,
      "choices": [
        4,
        5,
        6
      ]
    }
  },
  {
    "id": "friends-squirrel/count-5",
    "label": "Menge 5",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 5,
      "item": "forest-nut",
      "columns": 5,
      "answer": 5,
      "choices": [
        3,
        4,
        5
      ]
    }
  },
  {
    "id": "friends-squirrel/count-6",
    "label": "Menge 6",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 6,
      "item": "forest-nut",
      "columns": 5,
      "answer": 6,
      "choices": [
        5,
        6,
        7
      ]
    }
  },
  {
    "id": "friends-squirrel/count-7",
    "label": "Menge 7",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 7,
      "item": "forest-nut",
      "columns": 5,
      "answer": 7,
      "choices": [
        7,
        8,
        9
      ]
    }
  },
  {
    "id": "friends-squirrel/count-8",
    "label": "Menge 8",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 8,
      "item": "forest-nut",
      "columns": 5,
      "answer": 8,
      "choices": [
        6,
        7,
        8
      ]
    }
  },
  {
    "id": "friends-squirrel/count-9",
    "label": "Menge 9",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 9,
      "item": "forest-nut",
      "columns": 5,
      "answer": 9,
      "choices": [
        8,
        9,
        10
      ]
    }
  },
  {
    "id": "friends-squirrel/count-10",
    "label": "Menge 10",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 10,
      "item": "forest-nut",
      "columns": 5,
      "answer": 10,
      "choices": [
        9,
        10,
        11
      ]
    }
  },
  {
    "id": "friends-squirrel/count-11",
    "label": "Menge 11",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 11,
      "item": "forest-nut",
      "columns": 5,
      "answer": 11,
      "choices": [
        9,
        10,
        11
      ]
    }
  },
  {
    "id": "friends-squirrel/count-12",
    "label": "Menge 12",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 12,
      "item": "forest-nut",
      "columns": 5,
      "answer": 12,
      "choices": [
        12,
        13,
        14
      ]
    }
  },
  {
    "id": "friends-squirrel/count-13",
    "label": "Menge 13",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 13,
      "item": "forest-nut",
      "columns": 5,
      "answer": 13,
      "choices": [
        12,
        13,
        14
      ]
    }
  },
  {
    "id": "friends-squirrel/count-14",
    "label": "Menge 14",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 14,
      "item": "forest-nut",
      "columns": 5,
      "answer": 14,
      "choices": [
        14,
        15,
        16
      ]
    }
  },
  {
    "id": "friends-squirrel/count-15",
    "label": "Menge 15",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 15,
      "item": "forest-nut",
      "columns": 5,
      "answer": 15,
      "choices": [
        14,
        15,
        16
      ]
    }
  },
  {
    "id": "friends-squirrel/count-16",
    "label": "Menge 16",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 16,
      "item": "forest-nut",
      "columns": 5,
      "answer": 16,
      "choices": [
        14,
        15,
        16
      ]
    }
  },
  {
    "id": "friends-squirrel/count-17",
    "label": "Menge 17",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 17,
      "item": "forest-nut",
      "columns": 5,
      "answer": 17,
      "choices": [
        17,
        18,
        19
      ]
    }
  },
  {
    "id": "friends-squirrel/count-18",
    "label": "Menge 18",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 18,
      "item": "forest-nut",
      "columns": 5,
      "answer": 18,
      "choices": [
        16,
        17,
        18
      ]
    }
  },
  {
    "id": "friends-squirrel/count-19",
    "label": "Menge 19",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 19,
      "item": "forest-nut",
      "columns": 5,
      "answer": 19,
      "choices": [
        18,
        19,
        20
      ]
    }
  },
  {
    "id": "friends-squirrel/count-20",
    "label": "Menge 20",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 20,
      "item": "forest-nut",
      "columns": 5,
      "answer": 20,
      "choices": [
        18,
        19,
        20
      ]
    }
  },
  {
    "id": "friends-squirrel/four-4",
    "label": "Menge 4 in Viererreihen",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 4,
      "item": "forest-nut",
      "columns": 4,
      "answer": 4,
      "choices": [
        4,
        5,
        6
      ]
    }
  },
  {
    "id": "friends-squirrel/four-8",
    "label": "Menge 8 in Viererreihen",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 8,
      "item": "forest-nut",
      "columns": 4,
      "answer": 8,
      "choices": [
        6,
        7,
        8
      ]
    }
  },
  {
    "id": "friends-squirrel/four-12",
    "label": "Menge 12 in Viererreihen",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 12,
      "item": "forest-nut",
      "columns": 4,
      "answer": 12,
      "choices": [
        11,
        12,
        13
      ]
    }
  },
  {
    "id": "friends-squirrel/four-16",
    "label": "Menge 16 in Viererreihen",
    "question": {
      "kind": "nuts",
      "prompt": "Wie viele Eicheln sind hier?",
      "count": 16,
      "item": "forest-nut",
      "columns": 4,
      "answer": 16,
      "choices": [
        16,
        17,
        18
      ]
    }
  }
]
```
