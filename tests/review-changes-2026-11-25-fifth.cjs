/* 9.4.48 (25 Nov 2026, owner): in Zahlennachbarn the retry rings of earlier wrong taps disappear once a field is
   filled, because such a number can be right for the next field (? 2 ?: 3 first is wrong, after 1 it is the number
   after). The interaction changes, so all 36 Aufgaben of Zahlennachbarn reopen; every other Aufgabe is identical. */
'use strict';
const home=key=>key.split('/')[0];
module.exports={commit:'7d5bb0cad4d44ae2ea32056aa4b797d993525758',
 changed:key=>home(key)==='neighbours',puzzles:new Set(['neighbours']),puzzleChanged:id=>id==='neighbours'};
