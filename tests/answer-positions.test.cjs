/* No answer position or value pattern: the correct card must not be guessable by where it stands (23 Nov owner review). */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {setup}=require('../tools/puzzle-catalogue.cjs');
const slotOf=q=>{
 if(q.kind==='neighbours')return q.answer.map(a=>q.choices.indexOf(a)).join('+');
 if(q.kind==='colours')return q.choices.findIndex(c=>c[0]===q.answer);
 return q.choices.findIndex(c=>JSON.stringify(c)===JSON.stringify(q.answer));
};
test('across real rounds no answer position dominates in any Rätsel',()=>{
 const {FK}=setup(),C=FK.puzzleCatalogue;
 for(const game of FK.friendsLibrary.catalogue()){
  const counts=new Map();let total=0,size=0;
  for(let seed=1;seed<=400;seed++)for(const it of C.select(game.id,seed*7919)){
   const q=it.question;if(!q.choices||q.kind==='compare')continue; // compare cards are the two fish groups themselves
   const slot=slotOf(q);counts.set(slot,(counts.get(slot)||0)+1);total++;size=Math.max(size,q.kind==='neighbours'?3:q.choices.length);
  }
  if(!total)continue;
  const limit=size===2?0.6:game.id==='neighbours'?0.25:0.45;
  for(const [slot,n]of counts)assert.ok(n/total<=limit,game.id+': answer slot '+slot+' in '+Math.round(100*n/total)+'% of tasks');
 }
});
test('number choices are ascending windows whose answer is not always the middle value',()=>{
 const {FK}=setup(),C=FK.puzzleCatalogue;
 for(const id of ['count','add','rocket','syllable']){
  const items=C.iterations(id),middle=items.filter(it=>it.question.choices[1]===it.question.answer).length;
  for(const it of items){const c=it.question.choices;assert.deepEqual([...c],[c[0],c[0]+1,c[0]+2],it.id);assert.ok(c.includes(it.question.answer),it.id);}
  assert.ok(middle/items.length<0.45,id+': middle value correct in '+middle+' of '+items.length);
 }
});
test('adding an Aufgabe never moves the number windows of existing ones',()=>{
 const {FK,ctx}=setup(),before=JSON.stringify(FK.puzzleCatalogue.iterations('add'));
 vm.runInContext(fs.readFileSync('js/friends/puzzle-catalogue.js','utf8').replace('b<=10-a','b<=11-a'),ctx);
 const after=FK.puzzleCatalogue.iterations('add'),old=JSON.parse(before);
 assert.ok(after.length>old.length);
 for(const it of old)assert.equal(JSON.stringify(after.find(x=>x.id===it.id).question),JSON.stringify(it.question),it.id);
});
