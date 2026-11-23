const test=require('node:test');
const assert=require('node:assert/strict');
const {setup}=require('../tools/puzzle-catalogue.cjs');
const content=require('../js/friends/content.js');
const {create}=require('../js/friends/state.js');

const assignments={
 squirrel:['friends-squirrel','treasure'],
 bird:['friends-bird','syllable'],
 owl:['friends-owl','read-puzzle'],
 beaver:['friends-beaver','mirror'],
 mouse:['friends-mouse','vowels'],
 hedgehog:['friends-hedgehog','count'],
 fish:['add','compare'],
 deer:['friends-deer','robot'],
 kingfisher:['neighbours','colour-words'],
 frog:['rocket','picnic'],
 badger:['friends-badger'],
 ibex:['friends-ibex']
};

test('all twelve letter friends have their reviewed riddle assignments',()=>{
 const games=setup().FK.friendsLibrary.catalogue();
 assert.equal(games.length,22);
 assert.deepEqual(Object.keys(assignments).sort(),Object.keys(content.hosts).sort());
 for(const [host,ids]of Object.entries(assignments)){
  const actual=Array.from(games.filter(game=>game.host===host),game=>game.id);
  assert.deepEqual(actual.sort(),ids.slice().sort(),host);
 }
});

test('two complete invitation bags visit every friend and rotate both assigned riddles',()=>{
 const {FK,memory}=setup(),library=FK.friendsLibrary;
 const storage={getItem:key=>memory.get(key)??null,setItem:(key,value)=>memory.set(key,value),removeItem:key=>memory.delete(key)};
 const options={storage,content,puzzleHosts:()=>library.catalogue().map(game=>game.host)};
 const state=create(options),seen=new Map();
 FK.friends=state;FK.go=()=>{};
 // Only this disposable selection fixture releases its games.
 FK.puzzleReview.ready=()=>true;
 assert.ok(state.startLetterSession(24));
 for(let i=0;i<24;i++){
  assert.ok(state.openLetter());
  const host=state.mail().host,game=library.pick(host);
  assert.equal(game.host,host);
  assert.ok(library.visit(game));
  const ids=seen.get(host)||[];ids.push(game.id);seen.set(host,ids);
  library.complete(host,game.id);
  assert.ok(state.completeMail(host));
 }
 assert.equal(seen.size,12);
 for(const [host,ids]of seen)assert.deepEqual([...new Set(ids)].sort(),assignments[host].slice().sort());
 assert.equal(state.mail().phase,'return-home');
 assert.deepEqual(create(options).mail(),state.mail(),'the completed journey survives reload');
});

test('existing Fisch invitations stay assigned when Fisch has current riddles',()=>{
 const {FK,memory}=setup(),library=FK.friendsLibrary;
 const storage={getItem:key=>memory.get(key)??null,setItem:(key,value)=>memory.set(key,value),removeItem:key=>memory.delete(key)};
 const options={storage,content,puzzleHosts:()=>library.catalogue().map(game=>game.host),eligible:host=>host==='fish'};
 const state=create(options);assert.equal(state.mail().host,'fish');
 assert.ok(state.openLetter());
 const saved=state.mail();
 assert.deepEqual(create(options).mail(),saved);
 assert.equal(saved.phase,'to-friend');
});

test('old friend queues cannot launch reassigned riddles at their previous host',()=>{
 const {FK,memory}=setup(),library=FK.friendsLibrary;
 FK.puzzleReview.ready=()=>true;
 FK.friends={canPuzzle:host=>host==='squirrel',mail:()=>({index:0,session:{id:'saved-invitation'}})};
 FK.go=()=>{};
 FK.puzzleRounds.start('count');
 const saved=memory.get('farbtupf.puzzles.v1');
 FK.settings.set('friends.active.squirrel','count');
 FK.settings.set('friends.queue.squirrel',['add','count','friends-squirrel','treasure']);
 const selected=library.pick('squirrel');
 assert.equal(selected.host,'squirrel');
 assert.ok(assignments.squirrel.includes(selected.id));
 assert.equal(library.visit(library.catalogue().find(game=>game.id==='add')),false,'Fisch owns the reassigned addition');
 assert.equal(memory.get('farbtupf.puzzles.v1'),saved,'selecting a new assignment keeps the earlier round data');
});

test('colour discrimination tasks remain distinct and shape matching is retired',()=>{
 const {FK}=setup(),catalogue=FK.puzzleCatalogue;
 const colours=catalogue.iterations('colour-words');
 assert.equal(colours.length,30);
 assert.equal(new Set(colours.map(({question:q})=>q.answer+':'+q.choices.map(choice=>choice[0]).sort().join('/'))).size,30);
 assert.equal(new Set(colours.map(it=>it.question.answer)).size,6);
 assert.equal(catalogue.puzzle('shape-match'),null);
 assert.equal(catalogue.iterations('shape-match').length,0);
});

test('Fisch tasks count fish and the wayfinding prompt guides Reh to the forest',()=>{
 const {FK}=setup(),catalogue=FK.puzzleCatalogue;
 for(const id of ['add','compare'])for(const {question:q}of catalogue.iterations(id)){
  assert.equal(q.item,'fish-swim');
  assert.match(q.prompt,/Fische/);
 }
 for(const {question:q}of catalogue.iterations('robot'))assert.equal(q.prompt,'Führe das Reh zum Wald.');
 assert.equal(FK.puzzleRounds.question('robot',0,1).prompt,'Führe das Reh zum Wald.');
});

const R23=require('./review-changes-2026-11-23.cjs');
test('unchanged riddles retain approvals while reassigned and new riddles require current review',()=>{
 const catalogue=setup().FK.puzzleCatalogue;
 const baseline=require('../tools/puzzle-review-baselines.json').releases.find(release=>release.commit==='9bd41c8acd07db2eb7901ce0895f9a422cccd8e2');
 const reassigned=new Set(['count','add','compare','robot','rocket','picnic','sequence','treasure','neighbours','read-puzzle','friends-hedgehog']);
 // 9.4.24 gives capitalised first-letter gaps capital distractors; only these vowel tasks reopen.
 const capitalVowels=new Set(['vowels/word-2-0','vowels/word-8-0','vowels/word-21-0']);
 for(const [id,puzzle]of Object.entries(baseline.puzzles)){
  // Aufgaben changed or added on 23 November (9.4.33) reopen on purpose.
  assert.equal(catalogue.acceptsRevision(id,null,puzzle.revision),!reassigned.has(id)&&id!=='friends-ibex'&&id!=='vowels'&&!R23.puzzles.has(id),id);
  for(const item of catalogue.iterations(id))if(baseline.iterations[item.id])assert.equal(catalogue.acceptsRevision(id,item.id,baseline.iterations[item.id].revision),!reassigned.has(id)&&!capitalVowels.has(item.id)&&!R23.changed(item.id),item.id);
 }
 const introduction=require('../tools/puzzle-review-baselines.json').releases.find(release=>release.commit==='301e506b5061af35eeba8825992795827d5802ed');
 const feedbackBaseline=require('../tools/puzzle-review-baselines.json').releases.find(release=>release.commit==='1e48d04bdc65836e95ce9d9b7c3cc28b9b177a3a');
 const cardBaseline=require('../tools/puzzle-review-baselines.json').releases.find(release=>release.commit==='ddc66a42827d648e1936aa8962f91284b3398584');
 const clearingBaseline=require('../tools/puzzle-review-baselines.json').releases.find(release=>release.commit==='61ef04562d6ac863a6816f494e3844539cb60758');
 const release32=require('../tools/puzzle-review-baselines.json').releases.find(release=>release.commit==='9efa9ddd0b5ce64a0c625433ba483b3e5442248c');
 const release35=require('../tools/puzzle-review-baselines.json').releases.find(release=>release.commit==='e4f4e7e566435cad7c26619466a712087a40e664'); // German picture names bridge
 const release37=require('../tools/puzzle-review-baselines.json').releases.find(release=>release.commit==='18684545406bb5eb7932c0bce134bc99af069dbc'); // confetti bridge
 for(const id of ['colour-words'])assert.deepEqual(Array.from(catalogue.formerPuzzleRevisions(id)),[introduction.puzzles[id].revision,feedbackBaseline.puzzles[id].revision,cardBaseline.puzzles[id].revision,clearingBaseline.puzzles[id].revision,release32.puzzles[id].revision,release35.puzzles[id].revision,release37.puzzles[id].revision],id+' inherits only its own reviews before the presentation corrections');
});
