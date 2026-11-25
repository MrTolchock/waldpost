/* 9.4.44 (25 Nov 2026): owner request and the review notes of 25 Nov.
   «Lesen und verstehen» keeps one Aufgabe per answer subject and each colour sentence once; «Wer hat Flecken im
   Fell?» and the repeated colour sentences are gone (review notes on friends-hedgehog/riddle-22 and
   colour-words/gelb-blau-rosa). Kept Aufgaben with obviously wrong pictures get plausible ones, and every word of
   Silben zu Wörtern verbinden gets its own near-miss syllable instead of «ma» (Tomate keeps «lo»). Zahlennachbarn is
   tapped instead of dragged, with a new written rule, so all its Aufgaben reopen. These changed Aufgaben reopen. All other Aufgaben keep their reviews: the presentation bridge from the 9.4.43 release covers the
   filled pattern gap, the named syllable picture and the 320 px layout (tools/puzzle-layout-compatibility.json). */
'use strict';
const retired=new Set([
 'colour-words/blau-gelb-rosa','colour-words/blau-lila-rot','colour-words/blau-rosa-weiss',
 'colour-words/blau-weiss-lila','colour-words/gelb-blau-rosa','colour-words/gelb-lila-rot',
 'colour-words/gelb-rosa-weiss','colour-words/gelb-weiss-lila','colour-words/lila-blau-rosa',
 'colour-words/lila-gelb-blau','colour-words/lila-rosa-weiss','colour-words/lila-weiss-rot',
 'colour-words/rosa-blau-weiss','colour-words/rosa-gelb-blau','colour-words/rosa-lila-rot',
 'colour-words/rosa-weiss-lila','colour-words/rot-blau-rosa','colour-words/rot-lila-gelb',
 'colour-words/rot-rosa-weiss','colour-words/rot-weiss-lila','colour-words/weiss-blau-rosa',
 'colour-words/weiss-gelb-blau','colour-words/weiss-lila-rot','colour-words/weiss-rosa-lila',
 'friends-badger/riddle-1','friends-badger/riddle-19','friends-deer/riddle-15','friends-deer/riddle-17',
 'friends-deer/riddle-18','friends-deer/riddle-19','friends-deer/riddle-22','friends-deer/riddle-4',
 'friends-deer/riddle-5','friends-deer/riddle-7','friends-deer/riddle-8','friends-deer/riddle-9',
 'friends-hedgehog/nature-question-12','friends-hedgehog/nature-question-15','friends-hedgehog/nature-question-2',
 'friends-hedgehog/nature-question-4','friends-hedgehog/nature-question-5','friends-hedgehog/riddle-0',
 'friends-hedgehog/riddle-1','friends-hedgehog/riddle-10','friends-hedgehog/riddle-11','friends-hedgehog/riddle-12',
 'friends-hedgehog/riddle-13','friends-hedgehog/riddle-14','friends-hedgehog/riddle-15','friends-hedgehog/riddle-16',
 'friends-hedgehog/riddle-17','friends-hedgehog/riddle-22','friends-hedgehog/riddle-24','friends-hedgehog/riddle-3',
 'friends-hedgehog/riddle-5','friends-hedgehog/riddle-6','friends-hedgehog/riddle-7','friends-hedgehog/riddle-9',
 'friends-mouse/friends-frog-animal-0','friends-mouse/friends-frog-animal-1','friends-mouse/friends-frog-animal-11',
 'friends-mouse/friends-frog-animal-12','friends-mouse/friends-frog-animal-14','friends-mouse/friends-frog-animal-15',
 'friends-mouse/friends-frog-animal-16','friends-mouse/friends-frog-animal-17','friends-mouse/friends-frog-animal-18',
 'friends-mouse/friends-frog-animal-19','friends-mouse/friends-frog-animal-2','friends-mouse/friends-frog-animal-20',
 'friends-mouse/friends-frog-animal-21','friends-mouse/friends-frog-animal-23','friends-mouse/friends-frog-animal-24',
 'friends-mouse/friends-frog-animal-3','friends-mouse/friends-frog-animal-4','friends-mouse/friends-frog-animal-5',
 'friends-mouse/friends-frog-animal-6','friends-mouse/friends-frog-animal-7','friends-mouse/friends-frog-animal-9',
 'friends-mouse/read-word-word-1','friends-mouse/read-word-word-14','friends-mouse/read-word-word-17',
 'friends-mouse/read-word-word-18','friends-mouse/read-word-word-19','friends-mouse/read-word-word-20',
 'friends-mouse/read-word-word-28','friends-mouse/read-word-word-32','friends-mouse/read-word-word-33',
 'friends-mouse/read-word-word-6','friends-mouse/read-word-word-7','friends-mouse/read-word-word-8',
 'friends-mouse/word-0','friends-mouse/word-10','friends-mouse/word-15','friends-mouse/word-22',
 'friends-mouse/word-5','friends-mouse/word-8','friends-owl/pair-0','friends-owl/pair-3','friends-owl/pair-4',
 'friends-owl/pair-7','friends-owl/pair-8','friends-owl/sentence-0','friends-owl/sentence-1',
 'friends-owl/sentence-10','friends-owl/sentence-12','friends-owl/sentence-14','friends-owl/sentence-3',
 'friends-owl/sentence-5','friends-owl/sentence-7'
]);
const changedItems=new Set([
 'friends-badger/riddle-10','friends-badger/riddle-11','friends-badger/riddle-12','friends-badger/riddle-15',
 'friends-badger/riddle-16','friends-badger/riddle-17','friends-badger/riddle-2','friends-badger/riddle-20',
 'friends-badger/riddle-21','friends-badger/riddle-22','friends-badger/riddle-23','friends-badger/riddle-24',
 'friends-badger/riddle-4','friends-badger/riddle-5','friends-badger/riddle-6','friends-badger/riddle-7',
 'friends-badger/riddle-8','friends-badger/riddle-9','friends-deer/riddle-1','friends-deer/riddle-10',
 'friends-deer/riddle-12','friends-deer/riddle-2','friends-deer/riddle-21','friends-deer/riddle-23',
 'friends-deer/riddle-24','friends-deer/riddle-3','friends-deer/riddle-6','friends-hedgehog/nature-question-11',
 'friends-hedgehog/nature-question-14','friends-hedgehog/nature-question-16','friends-hedgehog/nature-question-17',
 'friends-hedgehog/nature-question-18','friends-hedgehog/nature-question-20','friends-hedgehog/nature-question-21',
 'friends-hedgehog/nature-question-24','friends-hedgehog/nature-question-3','friends-hedgehog/nature-question-6',
 'friends-hedgehog/nature-question-7','friends-hedgehog/nature-question-9','friends-hedgehog/riddle-18',
 'friends-hedgehog/riddle-19','friends-hedgehog/riddle-2','friends-hedgehog/riddle-20','friends-hedgehog/riddle-21',
 'friends-hedgehog/riddle-23','friends-hedgehog/riddle-4','friends-hedgehog/riddle-8','read-puzzle/word-0',
 'read-puzzle/word-1','read-puzzle/word-10','read-puzzle/word-11','read-puzzle/word-19','read-puzzle/word-2',
 'read-puzzle/word-20','read-puzzle/word-21','read-puzzle/word-22','read-puzzle/word-24','read-puzzle/word-25',
 'read-puzzle/word-26','read-puzzle/word-27','read-puzzle/word-28','read-puzzle/word-29','read-puzzle/word-3',
 'read-puzzle/word-30','read-puzzle/word-31','read-puzzle/word-32','read-puzzle/word-33','read-puzzle/word-34',
 'read-puzzle/word-4','read-puzzle/word-5','read-puzzle/word-6','read-puzzle/word-7','read-puzzle/word-8',
 'read-puzzle/word-9'
]);
// Rätsel whose every Aufgabe reopens: the interaction and rule changed (tap instead of drag and drop).
const reopened=new Set(['neighbours']);
module.exports={commit:'43089870659f0193920f580fad64f27a3319b23e',retired,changedItems,reopened,
 changed:key=>changedItems.has(key)||retired.has(key)||reopened.has(key.split('/')[0]),
 puzzles:new Set(['friends-badger','read-puzzle','neighbours']),
 puzzleChanged:id=>['friends-badger','read-puzzle','neighbours','friends-owl','friends-deer','friends-hedgehog','friends-mouse','colour-words'].includes(id)};
