#!/usr/bin/env python3
"""Pick every Aufgabe whose screen looks different, from survey.cjs results.

usage: select.py <tablet-survey.json>... --phone <phone-survey.json>... --out <dir>
Writes plan-variants.json (for reps.cjs) and labels-variants.json (German view labels).
Per Rätsel: most and fewest pictures in the frame (difference >= 2), longest text (>= 10
characters), tallest screen on tablet and on phone (difference >= 20 px), every further
frame arrangement and every distinct number of answer buttons."""
import json, os, sys, collections
args = sys.argv[1:]
out = args[args.index('--out') + 1]; os.makedirs(out, exist_ok=True)
phone_files = args[args.index('--phone') + 1:args.index('--out')]
tablet_files = args[:args.index('--phone')]
T = [r for f in tablet_files for r in json.load(open(f))]
P = {r['it']: r for f in phone_files for r in json.load(open(f))}
by = collections.OrderedDict()
for r in T: by.setdefault(r['id'], []).append(r)
plan, labels = [], {}
for pid, rs in by.items():
    picked = collections.OrderedDict()
    def pick(r, why): picked.setdefault(r['it'], []).append(why)
    pics = [r['scenePics'] for r in rs]
    if max(pics) - min(pics) >= 2:
        pick(max(rs, key=lambda r: (r['scenePics'], r['paperH'])), f"Meiste Bilder ({max(pics)})")
        pick(min(rs, key=lambda r: (r['scenePics'], -r['paperH'])), f"Wenigste Bilder ({min(pics)})")
    if max(r['textLen'] for r in rs) >= 10:
        m = max(rs, key=lambda r: r['textLen']); pick(m, f"Längster Text ({m['textLen']} Zeichen)")
    for dev, get in [('Tablet', lambda r: r['paperH']), ('Handy', lambda r: P[r['it']]['paperH'])]:
        vals = [get(r) for r in rs]
        if max(vals) - min(vals) >= 20: pick(max(rs, key=get), f"Höchster Bildschirm ({dev})")
    structs = collections.OrderedDict()
    for r in rs: structs.setdefault(r['cls'], r)
    for r in list(structs.values())[1:]: pick(r, "Andere Anordnung")
    answers = collections.OrderedDict()
    for r in rs: answers.setdefault(r['nAns'], r)
    if len(answers) > 1:
        for n, r in answers.items(): pick(r, f"{n} Antworten")
    for it, whys in picked.items():
        key = it.replace('/', '__')
        plan.append({'id': pid, 'key': key, 'it': it, 'action': None})
        labels[key] = {'id': pid, 'label': ' · '.join(dict.fromkeys(whys))}
json.dump(plan, open(out + '/plan-variants.json', 'w'), indent=0)
json.dump(labels, open(out + '/labels-variants.json', 'w'), ensure_ascii=False, indent=0)
print(len(plan), 'views')
