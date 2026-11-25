/* 9.4.47 (25 Nov 2026, the owner's request after the release review of 9.4.46).
   Mengen zählen (Eichhörnchen, 25 Aufgaben) is retired; Eichhörnchen keeps Gegenstände merken.
   «Lesen und verstehen» gets a rule and difficulty without single words («Lies den Satz oder die Frage.»), so all its
   Aufgaben reopen. Zahlennachbarn fill their fields in order (the first tap answers «davor», the next «danach») with a
   new rule, so all its Aufgaben reopen. A round of «Lesen und verstehen» never shows a picture twice: that changes only
   the shared round selection, and the bridge from 9.4.46 keeps every other Aufgabe approved
   (tools/puzzle-layout-compatibility.json). */
'use strict';
const retiredPuzzles=new Set(['friends-squirrel']);
const reopenedPuzzles=new Set(['friends-badger','neighbours']);
const merged=new Set(['friends-badger','friends-deer','friends-hedgehog','friends-owl','friends-mouse','colour-words']);
const home=key=>key.split('/')[0];
module.exports={commit:'81b0bcdadc7a5faffc6c1a4487615a53c2ace81d',retiredPuzzles,reopenedPuzzles,
 retired:key=>retiredPuzzles.has(home(key)),
 changed:key=>retiredPuzzles.has(home(key))||home(key)==='neighbours'||merged.has(home(key)),
 puzzles:new Set([...retiredPuzzles,...reopenedPuzzles]),
 puzzleChanged:id=>retiredPuzzles.has(id)||reopenedPuzzles.has(id)||merged.has(id)};
