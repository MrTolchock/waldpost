/* The Aufgaben changed or added by the 23 November 2026 release review (9.4.33).
   Every other Aufgabe kept its question, answers, rule, difficulty and pictures; only the
   owner-supplied habitat paintings and layout-only corrections changed around it. */
'use strict';
const wholePuzzles=new Set([
 'friends-squirrel', // the acorns are counted as «Eicheln»: prompt, rule and difficulty text
 'friends-beaver',   // rule «die gleichen Dinge wie in der ersten Reihe»
 'robot'             // 30 newly authored routes in which the rocks force a detour
]);
const tasks=new Set([
 'friends-bird/rhyme-16','friends-mouse/word-10','friends-mouse/word-14','friends-mouse/word-17','friends-mouse/read-word-word-6', // «Nuss» shows the Baumnuss
 'friends-hedgehog/nature-question-4', // a barking dog runs instead of sleeping
 ...[11,13,14,16,20,21,23,24].map(n=>'friends-deer/riddle-'+n),
 ...[1,7,9,10,11,15,18].map(n=>'friends-badger/riddle-'+n),
 'syllable/word-15','syllable/word-36' // Nuss as Baumnuss; «Lokomotive»
]);
// Vowel choices now rotate through all vowels; these eight happen to keep their former choices.
const unchangedVowels=new Set(['word-0-1','word-10-2','word-18-2','word-21-0','word-22-3','word-23-3','word-23-5','word-28-6'].map(k=>'vowels/'+k));
function added(key){
 const [id,rest]=key.split('/');
 if(id==='add'){const [a,b]=rest.split('-').map(Number);return a+b===10;}
 if(id==='syllable')return Number(rest.slice(5))>=39;
 return id==='vowels'&&rest.startsWith('bild-');
}
function changed(key){
 const id=key.split('/')[0];
 if(wholePuzzles.has(id)||tasks.has(key)||added(key))return true;
 if(id==='neighbours')return key.endsWith('-left'); // «Welche Zahl kommt danach?»
 return id==='vowels'&&!unchangedVowels.has(key);
}
// A puzzle-level sign-off covers its whole pool, so any changed or added task reopens it.
const puzzles=new Set([...wholePuzzles,'friends-bird','friends-mouse','friends-hedgehog','friends-deer','friends-badger','syllable','neighbours','vowels','add']);
module.exports={changed,added,puzzles};
