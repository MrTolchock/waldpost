/* 9.4.46 (25 Nov 2026, review notes of the afternoon): in Reime erkennen the third card of three Aufgaben counted as
   a rhyme for children (Hase/Hose, Hose/Hase/Rose, Hand/Sand/Hund). It now shares only the first sound: Hase gets
   Hund, Hose gets Hand, Hand gets Haus. Only these three Aufgaben change; nothing else, so no bridge is needed. */
'use strict';
const changedItems=new Set(['friends-bird/rhyme-3','friends-bird/rhyme-6','friends-bird/rhyme-9']);
module.exports={commit:'7fea8b001c92f381711071c763550af7d4f67c90',changedItems,
 changed:key=>changedItems.has(key),puzzles:new Set(['friends-bird']),puzzleChanged:id=>id==='friends-bird'};
