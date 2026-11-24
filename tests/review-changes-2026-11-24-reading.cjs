/* 9.4.43: six reading Rätsel became one Rätsel of Dachs («Lesen und verstehen»). Every Aufgabe kept its
   ID, so its home Rätsel is the part of the ID before «/». Moved Aufgaben keep their reviews through exact
   «merge» edges; only the harmonised prompts of Tiermerkmale and Farbwörter reopen those Aufgaben. */
'use strict';
const moved=new Set(['friends-owl','friends-deer','friends-hedgehog','friends-mouse','colour-words']);
const merged=new Set([...moved,'friends-badger']);
const home=key=>key.split('/')[0];
const owner=id=>merged.has(id)?'friends-badger':id;
module.exports={
 moved,merged,home,owner,commit:'a2b5d3c2948828eddeda843748cae846cafc9698',
 // the current Aufgaben of a (possibly former) Rätsel, found by their home
 items:(C,id)=>C.iterations(owner(id)).filter(it=>home(it.id)===id),
 changed:key=>['friends-hedgehog','colour-words'].includes(home(key)),
 puzzleChanged:id=>merged.has(id)
};
