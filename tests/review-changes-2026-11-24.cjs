/* The Aufgaben whose question text changed with the unified Rätsel layout (9.4.41).
   Every other Aufgabe kept its question, answers, rule, difficulty, interaction and pictures;
   only the shared layout (design/RAETSEL-LAYOUT.md) changed around it. */
'use strict';
const puzzles=new Set([
 'friends-beaver', // «Welcher Gegenstand fehlt?» instead of «Welcher Waldgegenstand fehlt?»
 'friends-ibex',   // «Welches Bild fehlt im Muster?» instead of «… im Bergmuster?»
 'count',          // «Wie viele Marienkäfer sind hier?» without «rote»
 'treasure'        // «Merke dir die vier Gegenstände.» instead of «… Waldschätze.»
]);
module.exports={puzzles,has:id=>puzzles.has(id),changed:key=>puzzles.has(key.split('/')[0]),commit:'a9e361ccd37715be3c95ec21fdfd0476332e4f3d'};
