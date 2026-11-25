/* 9.4.45 (25 Nov 2026, the owner's second request of the day, release review C-5 and C-6).
   Reime erkennen offers a third card that sounds close but does not rhyme (all 25 Aufgaben change). Mengen
   vergleichen lets either group be bigger by 1, 2 or 3 fish: 12 comparisons are retired and 12 new ones added, the
   other 16 keep their IDs. «Lesen und verstehen» keeps only sentences and questions: its 35 single-word Aufgaben are
   retired. The fish of Mengen addieren and Mengen vergleichen stand in rows of five; that layout keeps the reviews of
   unchanged Aufgaben (bridge from 9.4.44, tools/puzzle-layout-compatibility.json). */
'use strict';
const retired=new Set([
 'compare/2-2','compare/3-5','compare/4-4','compare/4-6','compare/5-4','compare/5-7','compare/6-5','compare/7-7',
 'compare/8-10','compare/8-7','compare/9-8','compare/9-9','friends-mouse/friends-frog-animal-10',
 'friends-mouse/friends-frog-animal-13','friends-mouse/friends-frog-animal-22','friends-mouse/friends-frog-animal-8',
 'friends-mouse/read-word-word-10','friends-mouse/read-word-word-22','friends-mouse/read-word-word-23',
 'friends-mouse/read-word-word-24','friends-mouse/read-word-word-25','friends-mouse/read-word-word-26',
 'friends-mouse/read-word-word-27','friends-mouse/read-word-word-29','friends-mouse/read-word-word-3',
 'friends-mouse/read-word-word-30','friends-mouse/read-word-word-31','friends-mouse/read-word-word-5',
 'friends-mouse/word-1','friends-mouse/word-11','friends-mouse/word-12','friends-mouse/word-13',
 'friends-mouse/word-14','friends-mouse/word-16','friends-mouse/word-17','friends-mouse/word-18',
 'friends-mouse/word-19','friends-mouse/word-2','friends-mouse/word-20','friends-mouse/word-21',
 'friends-mouse/word-23','friends-mouse/word-24','friends-mouse/word-3','friends-mouse/word-4','friends-mouse/word-6',
 'friends-mouse/word-7','friends-mouse/word-9'
]);
const changedItems=new Set([
 'friends-bird/rhyme-0','friends-bird/rhyme-1','friends-bird/rhyme-10','friends-bird/rhyme-11',
 'friends-bird/rhyme-12','friends-bird/rhyme-13','friends-bird/rhyme-14','friends-bird/rhyme-15',
 'friends-bird/rhyme-16','friends-bird/rhyme-17','friends-bird/rhyme-18','friends-bird/rhyme-19',
 'friends-bird/rhyme-2','friends-bird/rhyme-20','friends-bird/rhyme-21','friends-bird/rhyme-22',
 'friends-bird/rhyme-23','friends-bird/rhyme-24','friends-bird/rhyme-3','friends-bird/rhyme-4','friends-bird/rhyme-5',
 'friends-bird/rhyme-6','friends-bird/rhyme-7','friends-bird/rhyme-8','friends-bird/rhyme-9'
]);
const added=new Set([
 'compare/10-7','compare/3-4','compare/4-7','compare/5-3','compare/5-6','compare/5-8','compare/6-3','compare/7-10',
 'compare/8-5','compare/8-6','compare/8-9','compare/9-7'
]);
module.exports={commit:'1f11bb31cbe01886111664429986da48d10523a1',retired,changedItems,added,
 changed:key=>changedItems.has(key)||retired.has(key)||added.has(key),
 puzzles:new Set(['friends-bird','compare','friends-badger']),
 puzzleChanged:id=>['friends-bird','compare','friends-badger','friends-mouse'].includes(id)};
