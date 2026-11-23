/* Every picture a Rätsel offers as an answer or shows as its subject has a German name for screen readers (23 Nov review). */
const test=require('node:test'),assert=require('node:assert/strict');
const {environment}=require('../tools/puzzle-environment.cjs');
test('every pictured answer and subject has a German accessible name',()=>{
 const env=environment({review:false}),{FK,ctx}=env;FK.STICKERS=[];FK.screen=()=>{};ctx.MutationObserver=class{observe(){}};ctx.document={body:{}};
 env.execute('js/ui/waldatelier.js');env.execute('js/screens/puzzle.js',s=>s.replace(/\}\)\(\);\s*$/,'FK.__pictureNames={labels,aliases};})();'));
 const {labels,aliases}=FK.__pictureNames,missing=new Set();
 const named=id=>Boolean(labels[id]||labels[aliases[id]]);
 for(const game of FK.friendsLibrary.catalogue())for(const it of FK.puzzleCatalogue.iterations(game.id)){
  const q=it.question,pictures=[];
  if(q.kind==='reading')pictures.push(...q.choices);
  if(q.picture)pictures.push(q.picture);
  if(['matrix','pattern','treasure'].includes(q.kind))pictures.push(...q.choices);
  for(const id of pictures)if(typeof id==='string'&&!named(id))missing.add(id);
 }
 assert.deepEqual([...missing],[],'pictures without a German name');
 for(const [id,name]of Object.entries(labels))assert.ok(!/^[a-z]+(?:-[a-z]+)*$/.test(name),id+' is named «'+name+'»');
});
