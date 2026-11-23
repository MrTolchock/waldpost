/* Preserve decisions only across the exact requested UI migration, never changed tasks/art. */
const test=require('node:test'),assert=require('node:assert/strict');
const proof=require('../tools/puzzle-layout-compatibility.json'),baselines=require('../tools/puzzle-review-baselines.json');
const {sameReviewPresentation}=require('../tools/puzzle-layout-compatibility.cjs'),{setup}=require('../tools/puzzle-catalogue.cjs');
const {environment}=require('../tools/puzzle-environment.cjs'),{snapshotReader}=require('../tools/puzzle-review-build.cjs');
// Aufgaben changed or added on 23 November (9.4.33) reopen on purpose; all others keep every earlier decision.
const R23=require('./review-changes-2026-11-23.cjs'),release32=baselines.releases.find(r=>r.commit==='9efa9ddd0b5ce64a0c625433ba483b3e5442248c'),release35=baselines.releases.find(r=>r.commit==='e4f4e7e566435cad7c26619466a712087a40e664');
// Compare against the last shared-clearing release and exercise every bridge
// against the current production catalogue.
const previous=environment({read:snapshotReader('61ef04562d6ac863a6816f494e3844539cb60758').read,review:false});
previous.execute('js/friends/puzzle-implementation.js');
const historicalCatalogue=previous.FK.puzzleCatalogue;
const reassigned=new Set(['count','add','compare','robot','rocket','picnic','sequence','treasure','neighbours','read-puzzle']);
const revised=new Set(['rocket','robot','sequence','treasure','neighbours','compare','friends-hedgehog','shape-match']);
// Capitalised first-letter gaps now offer capital distractors (9.4.24); only these three tasks and the vowels puzzle token reopen.
const capitalVowels=new Set(['vowels/word-2-0','vowels/word-8-0','vowels/word-21-0']);
test('terminology retains old decisions only for unchanged tasks',()=>{
 const baseline=baselines.releases.find(r=>r.commit===proof.migrations[0].baselineCommit),C=setup().FK.puzzleCatalogue;
 const affected=(id,it)=>R23.changed(it.id)||reassigned.has(id)||revised.has(id)||['robot','treasure','neighbours','read-puzzle','friends-ibex'].includes(id)||id==='picnic'&&it.question.friends===4||capitalVowels.has(it.id);
 for(const [id,p]of Object.entries(baseline.puzzles)){
  if(!C.puzzle(id))continue;
  for(const it of C.iterations(id)){
   const old=baseline.iterations[it.id];if(!old)continue;
   assert.equal(C.acceptsRevision(id,it.id,old.revision),!affected(id,it),it.id);
  }
 }
});
test('restoring picture proportions preserves reviews for every unchanged task',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit==='02b7c53f329805709adc2440e4f4b7abd23e00a7');
 assert.ok(migration,'exact picture-proportion correction is recorded');
 const baseline=baselines.releases.find(r=>r.commit===migration.baselineCommit),C=setup().FK.puzzleCatalogue;
 for(const [id,p]of Object.entries(baseline.puzzles)){
  assert.equal(C.acceptsRevision(id,null,p.revision),!reassigned.has(id)&&!revised.has(id)&&id!=='friends-ibex'&&id!=='vowels'&&!R23.puzzles.has(id),id);
  for(const it of C.iterations(id))if(baseline.iterations[it.id])assert.equal(C.acceptsRevision(id,it.id,baseline.iterations[it.id].revision),!reassigned.has(id)&&!revised.has(id)&&!capitalVowels.has(it.id)&&!R23.changed(it.id),it.id);
 }
});
test('balanced iPad layout preserves all existing task decisions',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit==='301e506b5061af35eeba8825992795827d5802ed');
 assert.ok(migration,'exact iPad balance correction is recorded');
 const baseline=baselines.releases.find(r=>r.commit===migration.baselineCommit),C=setup().FK.puzzleCatalogue;
 for(const [id,p]of Object.entries(baseline.puzzles)){
  assert.equal(C.acceptsRevision(id,null,p.revision),!revised.has(id)&&id!=='friends-ibex'&&id!=='vowels'&&!R23.puzzles.has(id),id);
  for(const it of C.iterations(id))if(baseline.iterations[it.id])assert.equal(C.acceptsRevision(id,it.id,baseline.iterations[it.id].revision),!revised.has(id)&&!capitalVowels.has(it.id)&&!R23.changed(it.id),it.id);
 }
});
test('every layout bridge rejects subsequent changes and unrelated keys',()=>{
 for(const migration of [proof,...proof.migrations])for(const kind of ['puzzles','iterations'])for(const [key,p]of Object.entries(migration[kind])){
  const before={definition:p.definition,reviewPresentation:p.before},after={definition:p.definition,reviewPresentation:p.after};
  assert.ok(sameReviewPresentation(kind,key,before,after));
  assert.equal(sameReviewPresentation(kind,key,before,{...after,definition:'changed task'}),false);
  assert.equal(sameReviewPresentation(kind,key,before,{...after,reviewPresentation:'changed picture/rule/layout'}),false);
  assert.equal(sameReviewPresentation(kind,key,{...before,reviewPresentation:'unrelated old version'},after),false);
 }
});
test('removing success check marks preserves existing task decisions',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit==='1e48d04bdc65836e95ce9d9b7c3cc28b9b177a3a');
 assert.ok(migration,'exact feedback-only correction is recorded');
 const baseline=baselines.releases.find(r=>r.commit===migration.baselineCommit),C=setup().FK.puzzleCatalogue;
 for(const [id,p]of Object.entries(baseline.puzzles)){
  assert.equal(C.acceptsRevision(id,null,p.revision),!revised.has(id)&&id!=='friends-ibex'&&id!=='vowels'&&!R23.puzzles.has(id),id);
  for(const it of C.iterations(id))if(baseline.iterations[it.id])assert.equal(C.acceptsRevision(id,it.id,baseline.iterations[it.id].revision),!revised.has(id)&&!capitalVowels.has(it.id)&&!R23.changed(it.id),it.id);
 }
});
test('the comparison blueprint retains reviews for unchanged tasks after the November 20 revisions',()=>{
 const previous=baselines.releases.find(release=>release.commit==='ddc66a42827d648e1936aa8962f91284b3398584');
 const catalogue=setup().FK.puzzleCatalogue;
 for(const [id,puzzle] of Object.entries(previous.puzzles)){
  assert.equal(catalogue.acceptsRevision(id,null,puzzle.revision),!revised.has(id)&&id!=='friends-ibex'&&id!=='vowels'&&!R23.puzzles.has(id),id);
  for(const task of catalogue.iterations(id)){
   if(previous.iterations[task.id])assert.equal(catalogue.acceptsRevision(id,task.id,previous.iterations[task.id].revision),!revised.has(id)&&!capitalVowels.has(task.id)&&!R23.changed(task.id),task.id);
  }
 }
});
// The 22 November review (9.4.27) changed these puzzles and tasks on purpose.
const reviewed22=new Set(['friends-hedgehog','treasure','neighbours']);
const changedTasks22=new Set(['riddle-3','riddle-12','nature-question-11','nature-question-15','nature-question-16','nature-question-17','nature-question-19','nature-question-21','nature-question-22'].map(k=>'friends-hedgehog/'+k));
test('background-only habitat changes preserve every existing puzzle and task review',()=>{
 const catalogue=setup().FK.puzzleCatalogue;
 for(const game of setup().FK.friendsLibrary.catalogue()){
  if(!reviewed22.has(game.id)&&!R23.puzzles.has(game.id)){
   assert.equal(catalogue.acceptsRevision(game.id,null,historicalCatalogue.puzzleRevision(game.id)),true,game.id);
   // The 9.4.33 bridge adds exactly the 9.4.32 release to the previously compatible ones.
   assert.deepEqual(new Set(catalogue.formerPuzzleRevisions(game.id)),new Set([...historicalCatalogue.puzzleRevisions(game.id),release32.puzzles[game.id].revision,release35.puzzles[game.id].revision]),game.id+' retains exactly the previously compatible releases');
  }else if(!reviewed22.has(game.id))assert.equal(catalogue.acceptsRevision(game.id,null,historicalCatalogue.puzzleRevision(game.id)),false,game.id+' reopens after the 23 November change');
  for(const it of catalogue.iterations(game.id)){
   const before=historicalCatalogue.iterations(game.id).find(old=>old.id===it.id);
   if(!before){assert.ok(R23.added(it.id),it.id+' is a recorded addition');continue;}
   if(changedTasks22.has(it.id)||game.id==='treasure'||game.id==='neighbours'||R23.changed(it.id)){
    assert.equal(catalogue.acceptsRevision(game.id,it.id,historicalCatalogue.iterationRevision(game.id,before)),false,it.id+' reopens after the 22 November change');continue;
   }
   assert.deepEqual(JSON.parse(JSON.stringify(it.question)),JSON.parse(JSON.stringify(before.question)),'backgrounds preserve the task '+it.id);
   assert.equal(catalogue.acceptsRevision(game.id,it.id,historicalCatalogue.iterationRevision(game.id,before)),true,it.id);
   assert.deepEqual(new Set(catalogue.formerIterationRevisions(game.id,it)),new Set([...historicalCatalogue.iterationRevisions(game.id,before),release32.iterations[it.id].revision,release35.iterations[it.id].revision]),it.id+' does not revive incompatible task decisions');
  }
 }
});

test('the 23 November habitat paintings and layout corrections keep exactly the unchanged Aufgaben approved',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit===release32.commit),catalogue=setup().FK.puzzleCatalogue;
 assert.ok(migration&&/Owner request 2026-11-23/.test(migration.reason),'the owner-requested bridge is recorded');
 let kept=0,reopened=0;
 for(const game of setup().FK.friendsLibrary.catalogue())for(const it of catalogue.iterations(game.id)){
  const before=release32.iterations[it.id];
  if(!before){assert.ok(R23.added(it.id),it.id+' is new');assert.deepEqual([...catalogue.formerIterationRevisions(game.id,it)].filter(r=>r!==release35.iterations[it.id].revision),[],it.id+' inherits nothing from before its addition');continue;}
  const accepted=catalogue.acceptsRevision(game.id,it.id,before.revision);
  assert.equal(accepted,!R23.changed(it.id),it.id);accepted?kept++:reopened++;
  if(R23.changedFirst(it.id))assert.equal(Boolean(migration.iterations[it.id]),false,it.id+' has no bridge edge');
 }
 // 568 kept after the first round; the second (balanced number windows) and third (local animals) rounds reopened 155 of them.
 assert.equal(kept,413);assert.equal(reopened,350);
});
