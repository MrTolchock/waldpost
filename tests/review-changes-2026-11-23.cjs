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
function changedFirst(key){
 const id=key.split('/')[0];
 if(wholePuzzles.has(id)||tasks.has(key)||added(key))return true;
 if(id==='neighbours')return key.endsWith('-left'); // «Welche Zahl kommt danach?»
 return id==='vowels'&&!unchangedVowels.has(key);
}
/* Second round on 23 November (9.4.34), after the owner's notes «fast immer mittlere Antwort»: number cards stay
   ascending, but each Aufgabe offers its own window of numbers, so the answer stands left, in the middle or right.
   Zahlennachbarn rows move the right neighbours likewise. The squirrel now holds an «Eichel». */
const secondWhole=new Set(['count','add','rocket']);
const secondKept=new Set([
 'friends-squirrel/count-0',
 ...['1','3','5','7','9','10','12','13','14','15','16','17','18','20','23','25','27','29','30','32','34','35','36','37','38','39','40','43','46'].map(n=>'syllable/word-'+n),
 ...['1-left','2-both','4-left','6-left','7-both','8-left','9-both','10-both','12-left','13-both','13-left','15-left','18-both'].map(k=>'neighbours/'+k)
]);
function changedSecond(key){
 const id=key.split('/')[0];
 if(secondWhole.has(id)||key==='friends-hedgehog/riddle-10')return true;
 return ['friends-squirrel','syllable','neighbours'].includes(id)&&!secondKept.has(key);
}
const changed=key=>changedFirst(key)||changedSecond(key);
// A puzzle-level sign-off covers its whole pool, so any changed or added task reopens it.
const puzzles=new Set([...wholePuzzles,...secondWhole,'friends-bird','friends-mouse','friends-hedgehog','friends-deer','friends-badger','syllable','neighbours','vowels','add']);
module.exports={changed,changedFirst,changedSecond,added,puzzles};
