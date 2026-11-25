/* Preserve decisions only across the exact requested UI migration, never changed tasks/art. */
const test=require('node:test'),assert=require('node:assert/strict');
const proof=require('../tools/puzzle-layout-compatibility.json'),baselines=require('../tools/puzzle-review-baselines.json');
const {sameReviewPresentation}=require('../tools/puzzle-layout-compatibility.cjs'),{setup}=require('../tools/puzzle-catalogue.cjs');
const {environment}=require('../tools/puzzle-environment.cjs'),{snapshotReader}=require('../tools/puzzle-review-build.cjs');
// Aufgaben changed or added on 23 November (9.4.33) reopen on purpose; all others keep every earlier decision.
// Aufgaben whose question changed with the unified layout (9.4.41) reopen too.
const R25=require('./review-changes-2026-11-24-reading.cjs'),R26=require('./review-changes-2026-11-25.cjs'),R27=require('./review-changes-2026-11-25-second.cjs'),R28=require('./review-changes-2026-11-25-third.cjs'),R29=require('./review-changes-2026-11-25-fourth.cjs');
const R24=require('./review-changes-2026-11-24.cjs'),release40=baselines.releases.find(r=>r.commit===R24.commit);
// 9.4.42: one success look, neighbour card shape and narrow-phone grids (presentation only, every Aufgabe kept).
const release42=baselines.releases.find(r=>r.commit===R25.commit);
// 9.4.44: the release-review presentation fixes keep every Aufgabe of 9.4.43 whose content is unchanged.
const release43=baselines.releases.find(r=>r.commit===R26.commit);
// 9.4.45: rows of five for the fish keep every unchanged Aufgabe of 9.4.44.
const release44=baselines.releases.find(r=>r.commit===R27.commit);
// 9.4.46: three rhyme cards change; every other 9.4.45 Aufgabe is identical.
const release45=baselines.releases.find(r=>r.commit===R28.commit);
// 9.4.47: the round selection avoids repeated reading pictures; Mengen zählen is retired, Dachs and Zahlennachbarn reopen.
const release46=baselines.releases.find(r=>r.commit===R29.commit);
const release41=baselines.releases.find(r=>r.commit==='a05b3a838ae654f1a3b8b18cce37397bb3eb8988');
const R23=require('./review-changes-2026-11-23.cjs'),release32=baselines.releases.find(r=>r.commit==='9efa9ddd0b5ce64a0c625433ba483b3e5442248c'),release35=baselines.releases.find(r=>r.commit==='e4f4e7e566435cad7c26619466a712087a40e664'),release36=baselines.releases.find(r=>r.commit==='d369e95fb46421103b77ca71a96c3ccce378b757'),release37=baselines.releases.find(r=>r.commit==='18684545406bb5eb7932c0bce134bc99af069dbc'),release38=baselines.releases.find(r=>r.commit==='9a4009f94b7be863517fefb8e13510ad4332c078'),release39=baselines.releases.find(r=>r.commit==='01791c164c1f86ecc64599350577bc6467a57cc3');
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
 const affected=(id,it)=>(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id))||R23.changed(it.id)||reassigned.has(id)||revised.has(id)||['robot','treasure','neighbours','read-puzzle','friends-ibex'].includes(id)||id==='picnic'&&it.question.friends===4||capitalVowels.has(it.id);
 for(const [id,p]of Object.entries(baseline.puzzles)){
  if(!C.puzzle(R25.owner(id)))continue;
  for(const it of R25.items(C,id)){
   const old=baseline.iterations[it.id];if(!old)continue;
   assert.equal(C.acceptsRevision(R25.owner(id),it.id,old.revision),!affected(id,it),it.id);
  }
 }
});
test('restoring picture proportions preserves reviews for every unchanged task',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit==='02b7c53f329805709adc2440e4f4b7abd23e00a7');
 assert.ok(migration,'exact picture-proportion correction is recorded');
 const baseline=baselines.releases.find(r=>r.commit===migration.baselineCommit),C=setup().FK.puzzleCatalogue;
 for(const [id,p]of Object.entries(baseline.puzzles)){
  assert.equal(C.acceptsRevision(id,null,p.revision),!reassigned.has(id)&&!revised.has(id)&&id!=='friends-ibex'&&id!=='vowels'&&!R23.puzzles.has(id)&&!R24.has(id)&&!(R25.puzzleChanged(id)||R26.puzzleChanged(id)||R27.puzzleChanged(id)||R28.puzzleChanged(id)||R29.puzzleChanged(id)),id);
  for(const it of R25.items(C,id))if(baseline.iterations[it.id])assert.equal(C.acceptsRevision(R25.owner(id),it.id,baseline.iterations[it.id].revision),!reassigned.has(id)&&!revised.has(id)&&!capitalVowels.has(it.id)&&!R23.changed(it.id)&&!R24.changed(it.id)&&!(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id)),it.id);
 }
});
test('balanced iPad layout preserves all existing task decisions',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit==='301e506b5061af35eeba8825992795827d5802ed');
 assert.ok(migration,'exact iPad balance correction is recorded');
 const baseline=baselines.releases.find(r=>r.commit===migration.baselineCommit),C=setup().FK.puzzleCatalogue;
 for(const [id,p]of Object.entries(baseline.puzzles)){
  assert.equal(C.acceptsRevision(id,null,p.revision),!revised.has(id)&&id!=='friends-ibex'&&id!=='vowels'&&!R23.puzzles.has(id)&&!R24.has(id)&&!(R25.puzzleChanged(id)||R26.puzzleChanged(id)||R27.puzzleChanged(id)||R28.puzzleChanged(id)||R29.puzzleChanged(id)),id);
  for(const it of R25.items(C,id))if(baseline.iterations[it.id])assert.equal(C.acceptsRevision(R25.owner(id),it.id,baseline.iterations[it.id].revision),!revised.has(id)&&!capitalVowels.has(it.id)&&!R23.changed(it.id)&&!R24.changed(it.id)&&!(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id)),it.id);
 }
});
test('every layout bridge rejects subsequent changes and unrelated keys',()=>{
 for(const migration of [proof,...proof.migrations])for(const kind of ['puzzles','iterations'])for(const [key,p]of Object.entries(migration[kind])){
  const before={definition:p.fromDefinition||p.definition,reviewPresentation:p.before},after={definition:p.definition,reviewPresentation:p.after};
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
  assert.equal(C.acceptsRevision(id,null,p.revision),!revised.has(id)&&id!=='friends-ibex'&&id!=='vowels'&&!R23.puzzles.has(id)&&!R24.has(id)&&!(R25.puzzleChanged(id)||R26.puzzleChanged(id)||R27.puzzleChanged(id)||R28.puzzleChanged(id)||R29.puzzleChanged(id)),id);
  for(const it of R25.items(C,id))if(baseline.iterations[it.id])assert.equal(C.acceptsRevision(R25.owner(id),it.id,baseline.iterations[it.id].revision),!revised.has(id)&&!capitalVowels.has(it.id)&&!R23.changed(it.id)&&!R24.changed(it.id)&&!(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id)),it.id);
 }
});
test('the comparison blueprint retains reviews for unchanged tasks after the November 20 revisions',()=>{
 const previous=baselines.releases.find(release=>release.commit==='ddc66a42827d648e1936aa8962f91284b3398584');
 const catalogue=setup().FK.puzzleCatalogue;
 for(const [id,puzzle] of Object.entries(previous.puzzles)){
  assert.equal(catalogue.acceptsRevision(id,null,puzzle.revision),!revised.has(id)&&id!=='friends-ibex'&&id!=='vowels'&&!R23.puzzles.has(id)&&!R24.has(id)&&!(R25.puzzleChanged(id)||R26.puzzleChanged(id)||R27.puzzleChanged(id)||R28.puzzleChanged(id)||R29.puzzleChanged(id)),id);
  for(const task of catalogue.iterations(id)){
   if(previous.iterations[task.id])assert.equal(catalogue.acceptsRevision(id,task.id,previous.iterations[task.id].revision),!revised.has(id)&&!capitalVowels.has(task.id)&&!R23.changed(task.id)&&!R24.changed(task.id)&&!(R25.changed(task.id)||R26.changed(task.id)||R27.changed(task.id)||R28.changed(task.id)||R29.changed(task.id)),task.id);
  }
 }
});
// The 22 November review (9.4.27) changed these puzzles and tasks on purpose.
const reviewed22=new Set(['friends-hedgehog','treasure','neighbours']);
const changedTasks22=new Set(['riddle-3','riddle-12','nature-question-11','nature-question-15','nature-question-16','nature-question-17','nature-question-19','nature-question-21','nature-question-22'].map(k=>'friends-hedgehog/'+k));
test('background-only habitat changes preserve every existing puzzle and task review',()=>{
 const catalogue=setup().FK.puzzleCatalogue;
 for(const game of setup().FK.friendsLibrary.catalogue()){
  if(R24.has(game.id)||(R25.puzzleChanged(game.id)||R26.puzzleChanged(game.id)||R27.puzzleChanged(game.id)||R28.puzzleChanged(game.id)||R29.puzzleChanged(game.id))){assert.equal(catalogue.acceptsRevision(game.id,null,historicalCatalogue.puzzleRevision(game.id)),false,game.id+' reopens after the 24 November change');}
  else if(!reviewed22.has(game.id)&&!R23.puzzles.has(game.id)){
   assert.equal(catalogue.acceptsRevision(game.id,null,historicalCatalogue.puzzleRevision(game.id)),true,game.id);
   // The 9.4.33 bridge adds exactly the 9.4.32 release to the previously compatible ones.
   assert.deepEqual(new Set(catalogue.formerPuzzleRevisions(game.id)),new Set([...historicalCatalogue.puzzleRevisions(game.id),release32.puzzles[game.id].revision,release35.puzzles[game.id].revision,release36.puzzles[game.id].revision,release37.puzzles[game.id].revision,release38.puzzles[game.id].revision,release39.puzzles[game.id].revision,release40.puzzles[game.id].revision,release41.puzzles[game.id].revision,release42.puzzles[game.id].revision,release43.puzzles[game.id].revision,release44.puzzles[game.id].revision,release45.puzzles[game.id].revision,release46.puzzles[game.id].revision]),game.id+' retains exactly the previously compatible releases');
  }else if(!reviewed22.has(game.id))assert.equal(catalogue.acceptsRevision(game.id,null,historicalCatalogue.puzzleRevision(game.id)),false,game.id+' reopens after the 23 November change');
  for(const it of catalogue.iterations(game.id).filter(it=>!R27.added.has(it.id))){
   const home=R25.home(it.id),before=historicalCatalogue.iterations(home).find(old=>old.id===it.id);
   if(!before){assert.ok(R23.added(it.id),it.id+' is a recorded addition');continue;}
   if(changedTasks22.has(it.id)||game.id==='treasure'||game.id==='neighbours'||R23.changed(it.id)||R24.changed(it.id)||(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id))){
    assert.equal(catalogue.acceptsRevision(game.id,it.id,historicalCatalogue.iterationRevision(home,before)),false,it.id+' reopens after the 22 November change');continue;
   }
   assert.deepEqual(JSON.parse(JSON.stringify(it.question)),JSON.parse(JSON.stringify(before.question)),'backgrounds preserve the task '+it.id);
   assert.equal(catalogue.acceptsRevision(game.id,it.id,historicalCatalogue.iterationRevision(home,before)),true,it.id);
   assert.deepEqual(new Set(catalogue.formerIterationRevisions(game.id,it)),new Set([...historicalCatalogue.iterationRevisions(home,before),release32.iterations[it.id].revision,release35.iterations[it.id].revision,release36.iterations[it.id].revision,release37.iterations[it.id].revision,release38.iterations[it.id].revision,release39.iterations[it.id].revision,release40.iterations[it.id].revision,release41.iterations[it.id].revision,release42.iterations[it.id].revision,release43.iterations[it.id].revision,release44.iterations[it.id].revision,release45.iterations[it.id].revision,release46.iterations[it.id].revision]),it.id+' does not revive incompatible task decisions');
  }
 }
});

test('the 23 November habitat paintings and layout corrections keep exactly the unchanged Aufgaben approved',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit===release32.commit),catalogue=setup().FK.puzzleCatalogue;
 assert.ok(migration&&/Owner request 2026-11-23/.test(migration.reason),'the owner-requested bridge is recorded');
 let kept=0,reopened=0;
 for(const game of setup().FK.friendsLibrary.catalogue())for(const it of catalogue.iterations(game.id).filter(it=>!R27.added.has(it.id))){
  const before=release32.iterations[it.id];
  if(!before){assert.ok(R23.added(it.id),it.id+' is new');assert.deepEqual([...catalogue.formerIterationRevisions(game.id,it)].filter(r=>r!==release35.iterations[it.id].revision&&r!==release36.iterations[it.id].revision&&r!==release37.iterations[it.id].revision&&r!==release38.iterations[it.id].revision&&r!==release39.iterations[it.id].revision&&r!==release40.iterations[it.id].revision&&r!==release41.iterations[it.id].revision&&r!==release42.iterations[it.id].revision&&r!==release43.iterations[it.id].revision&&r!==release44.iterations[it.id].revision&&r!==release45.iterations[it.id].revision&&r!==release46.iterations[it.id].revision),[],it.id+' inherits nothing from before its addition');continue;}
  const accepted=catalogue.acceptsRevision(game.id,it.id,before.revision);
  assert.equal(accepted,!R23.changed(it.id)&&!R24.changed(it.id)&&!(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id)),it.id);accepted?kept++:reopened++;
  if(R23.changedFirst(it.id))assert.equal(Boolean(migration.iterations[it.id]),false,it.id+' has no bridge edge');
 }
 // 568 kept after the first round; the second (balanced number windows) and third (local animals) rounds reopened 155 of them,
 // the changed questions of the unified layout (9.4.41) reopen 62 more, and the harmonised reading prompts (9.4.43) 65 more.
 // 9.4.44 retires 110 reading Aufgaben, changes 74 and reopens Zahlennachbarn; 9.4.45 retires the single words and 12 comparisons and changes the 25 rhymes (25 Nov).
 // 9.4.47 retires Mengen zählen and reopens «Lesen und verstehen» and Zahlennachbarn.
 assert.equal(kept,103);assert.equal(reopened,478);
});
test('the «Juhuii, geschafft!» celebration text keeps every 9.4.36 decision',()=>{
 const release36=baselines.releases.find(r=>r.commit==='d369e95fb46421103b77ca71a96c3ccce378b757'),{FK}=setup(),C=FK.puzzleCatalogue;
 for(const game of FK.friendsLibrary.catalogue()){
  assert.equal(C.acceptsRevision(game.id,null,release36.puzzles[game.id].revision),!R24.has(game.id)&&!(R25.puzzleChanged(game.id)||R26.puzzleChanged(game.id)||R27.puzzleChanged(game.id)||R28.puzzleChanged(game.id)||R29.puzzleChanged(game.id)),game.id);
  for(const it of C.iterations(game.id).filter(it=>!R27.added.has(it.id)))assert.equal(C.acceptsRevision(game.id,it.id,release36.iterations[it.id].revision),!R24.changed(it.id)&&!(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id)),it.id);
 }
});
test('leaves, flowers and acorns as correct-answer confetti keep every 9.4.37 decision',()=>{
 const {FK}=setup(),C=FK.puzzleCatalogue;
 for(const game of FK.friendsLibrary.catalogue()){
  assert.equal(C.acceptsRevision(game.id,null,release37.puzzles[game.id].revision),!R24.has(game.id)&&!(R25.puzzleChanged(game.id)||R26.puzzleChanged(game.id)||R27.puzzleChanged(game.id)||R28.puzzleChanged(game.id)||R29.puzzleChanged(game.id)),game.id);
  for(const it of C.iterations(game.id).filter(it=>!R27.added.has(it.id)))assert.equal(C.acceptsRevision(game.id,it.id,release37.iterations[it.id].revision),!R24.changed(it.id)&&!(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id)),it.id);
 }
});
test('the adult review ending like child play keeps every 9.4.38 decision',()=>{
 const {FK}=setup(),C=FK.puzzleCatalogue;
 for(const game of FK.friendsLibrary.catalogue()){
  assert.equal(C.acceptsRevision(game.id,null,release38.puzzles[game.id].revision),!R24.has(game.id)&&!(R25.puzzleChanged(game.id)||R26.puzzleChanged(game.id)||R27.puzzleChanged(game.id)||R28.puzzleChanged(game.id)||R29.puzzleChanged(game.id)),game.id);
  for(const it of C.iterations(game.id).filter(it=>!R27.added.has(it.id)))assert.equal(C.acceptsRevision(game.id,it.id,release38.iterations[it.id].revision),!R24.changed(it.id)&&!(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id)),it.id);
 }
});
test('removing read-aloud and the 23 November Rätsel corrections keep every 9.4.39 decision',()=>{
 const {FK}=setup(),C=FK.puzzleCatalogue;
 for(const game of FK.friendsLibrary.catalogue()){
  assert.equal(C.acceptsRevision(game.id,null,release39.puzzles[game.id].revision),!R24.has(game.id)&&!(R25.puzzleChanged(game.id)||R26.puzzleChanged(game.id)||R27.puzzleChanged(game.id)||R28.puzzleChanged(game.id)||R29.puzzleChanged(game.id)),game.id);
  for(const it of C.iterations(game.id).filter(it=>!R27.added.has(it.id)))assert.equal(C.acceptsRevision(game.id,it.id,release39.iterations[it.id].revision),!R24.changed(it.id)&&!(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id)),it.id);
 }
});
test('the unified Rätsel layout keeps every 9.4.40 decision except the four changed questions',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit===R24.commit),{FK}=setup(),C=FK.puzzleCatalogue;
 assert.ok(migration&&/Owner request 2026-11-24/.test(migration.reason),'the owner-requested layout bridge is recorded');
 let kept=0,reopened=0;
 for(const game of FK.friendsLibrary.catalogue()){
  assert.equal(C.acceptsRevision(game.id,null,release40.puzzles[game.id].revision),!R24.has(game.id)&&!(R25.puzzleChanged(game.id)||R26.puzzleChanged(game.id)||R27.puzzleChanged(game.id)||R28.puzzleChanged(game.id)||R29.puzzleChanged(game.id)),game.id);
  if(R24.has(game.id))assert.equal(Boolean(migration.puzzles[game.id]),false,game.id+' has no bridge edge');
  for(const it of C.iterations(game.id).filter(it=>!R27.added.has(it.id))){
   const accepted=C.acceptsRevision(game.id,it.id,release40.iterations[it.id].revision);
   assert.equal(accepted,!R24.changed(it.id)&&!(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id)),it.id);accepted?kept++:reopened++;
   if(R24.changed(it.id))assert.equal(Boolean(migration.iterations[it.id]),false,it.id+' has no bridge edge');
  }
 }
 // 9.4.43 harmonises the prompts of Tiermerkmale (44) and Farbwörter (30): those 74 reopen too.
 // 9.4.44/9.4.45 (25 Nov): retired reading words and comparisons, changed rhymes, distractors and syllables, Zahlennachbarn reopened.
 // 9.4.47 retires Mengen zählen and reopens «Lesen und verstehen» and Zahlennachbarn.
 assert.equal(kept,314);assert.equal(reopened,301);
});
test('one success look, the neighbour card shape and narrow-phone grids keep every 9.4.41 decision',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit===release41.commit),{FK}=setup(),C=FK.puzzleCatalogue;
 assert.ok(migration&&/second sign-off/.test(migration.reason),'the owner-approved presentation bridge is recorded');
 for(const game of FK.friendsLibrary.catalogue()){
  assert.equal(C.acceptsRevision(game.id,null,release41.puzzles[game.id].revision),!(R25.puzzleChanged(game.id)||R26.puzzleChanged(game.id)||R27.puzzleChanged(game.id)||R28.puzzleChanged(game.id)||R29.puzzleChanged(game.id)),game.id);
  for(const it of C.iterations(game.id).filter(it=>!R27.added.has(it.id)))assert.equal(C.acceptsRevision(game.id,it.id,release41.iterations[it.id].revision),!(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id)),it.id);
 }
});
test('the six reading Rätsel are one Rätsel of Dachs and keep every review whose Aufgabe is unchanged',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit===R25.commit),{FK}=setup(),C=FK.puzzleCatalogue;
 assert.ok(migration&&/third sign-off/.test(migration.reason),'the owner-approved merge is recorded');
 const games=FK.friendsLibrary.catalogue();assert.equal(games.length,16); // Mengen zählen retired in 9.4.47
 for(const id of R25.moved)assert.equal(games.some(g=>g.id===id),false,id+' is no longer a separate Rätsel');
 const reading=C.iterations('friends-badger');assert.equal(reading.length,78); // 223 in 9.4.43; one Aufgabe per answer subject since 9.4.44assert.equal(games.find(g=>g.id==='friends-badger').host,'badger');
 let kept=0,reopened=0,moved=0;
 for(const game of games){
  assert.equal(C.acceptsRevision(game.id,null,release42.puzzles[game.id].revision),!(R25.puzzleChanged(game.id)||R26.puzzleChanged(game.id)||R27.puzzleChanged(game.id)||R28.puzzleChanged(game.id)||R29.puzzleChanged(game.id)),game.id);
  for(const it of C.iterations(game.id).filter(it=>!R27.added.has(it.id))){
   const accepted=C.acceptsRevision(game.id,it.id,release42.iterations[it.id].revision);
   assert.equal(accepted,!(R25.changed(it.id)||R26.changed(it.id)||R27.changed(it.id)||R28.changed(it.id)||R29.changed(it.id)),it.id);accepted?kept++:reopened++;
   if(R25.changed(it.id))assert.equal(Boolean(migration.iterations[it.id]),false,it.id+' has no bridge edge');
   if(accepted&&R25.home(it.id)!==game.id){moved++;assert.ok(migration.iterations[it.id].fromDefinition,it.id+' moves on a merge edge');}
  }
 }
 // 124 Aufgaben move with their reviews; Tiermerkmale (44) and Farbwörter (30) reopen for their new prompts.
 // 9.4.44/9.4.45 retire most single words and change 74 + 25 more; 18 moved Aufgaben remain unchanged.
 // 9.4.47: the rule of «Lesen und verstehen» changes, so none of its Aufgaben keeps a merged review; Mengen zählen is retired.
 assert.equal(moved,0);assert.equal(kept,449);assert.equal(reopened,166);
});

test('the 25 November content changes reopen exactly the changed Aufgaben; the presentation fixes keep all others',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit===R26.commit),{FK}=setup(),C=FK.puzzleCatalogue;
 assert.ok(migration&&/Owner request 2026-11-25/.test(migration.reason),'the owner-requested bridge is recorded');
 const games=FK.friendsLibrary.catalogue();assert.equal(games.length,16); // Mengen zählen retired in 9.4.47
 assert.equal(C.iterations('friends-badger').length,78);assert.equal(C.iterations('read-puzzle').length,28);
 for(const key of R26.retired)assert.equal(games.some(g=>C.iterations(g.id).some(it=>it.id===key)),false,key+' is retired');
 let kept=0,reopened=0;
 for(const game of games){
  assert.equal(C.acceptsRevision(game.id,null,release43.puzzles[game.id].revision),!R26.puzzles.has(game.id)&&!R27.puzzles.has(game.id)&&!R29.puzzleChanged(game.id),game.id);
  for(const it of C.iterations(game.id).filter(it=>!R27.added.has(it.id))){
   const accepted=C.acceptsRevision(game.id,it.id,release43.iterations[it.id].revision);
   assert.equal(accepted,!R26.changed(it.id)&&!R27.changed(it.id)&&!R29.changed(it.id),it.id);accepted?kept++:reopened++;
   if(R26.changed(it.id))assert.equal(Boolean(migration.iterations[it.id]),false,it.id+' has no bridge edge');
  }
 }
 // 47 Aufgaben of «Lesen und verstehen» get plausible wrong pictures, 27 of Silben zu Wörtern verbinden a new syllable,
 // and the 36 of Zahlennachbarn are tapped instead of dragged.
 assert.equal(R26.changedItems.size,74);assert.equal(R26.retired.size,110);assert.equal(kept,449);assert.equal(reopened,166); // 9.4.45 adds the 25 rhymes; 9.4.47 retires Mengen zählen and reopens Dachs (78) and Zahlennachbarn
});

test('rows of five for the fish keep every unchanged 9.4.44 Aufgabe; changed rhymes and comparisons reopen',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit===R27.commit),{FK}=setup(),C=FK.puzzleCatalogue;
 assert.ok(migration&&/second request, 9.4.45/.test(migration.reason),'the owner-requested bridge is recorded');
 const games=FK.friendsLibrary.catalogue();let kept=0,reopened=0,added=0;
 for(const key of R27.retired)assert.equal(games.some(g=>C.iterations(g.id).some(it=>it.id===key)),false,key+' is retired');
 for(const game of games){
  assert.equal(C.acceptsRevision(game.id,null,release44.puzzles[game.id].revision),!R27.puzzles.has(game.id)&&!R29.puzzleChanged(game.id),game.id);
  for(const it of C.iterations(game.id)){
   if(R27.added.has(it.id)){added++;assert.equal(release44.iterations[it.id],undefined);continue;}
   const accepted=C.acceptsRevision(game.id,it.id,release44.iterations[it.id].revision);
   assert.equal(accepted,!R27.changed(it.id)&&!R29.changed(it.id),it.id);accepted?kept++:reopened++;
  }
 }
 assert.ok(Object.keys(migration.iterations).every(key=>key.startsWith('add/')||key.startsWith('compare/')),'the bridge covers only the fish layout');
 // 25 rhymes get a third card; 12 comparisons are new; Mengen addieren and 16 comparisons keep their reviews.
 assert.equal(R27.retired.size,47);assert.equal(R27.changedItems.size,25);assert.equal(added,12);assert.equal(kept,476);assert.equal(reopened,139); // 9.4.47: Mengen zählen retired, Dachs and Zahlennachbarn reopen
});

test('the three rhyme cards of 25 November reopen only their Aufgaben; every other 9.4.45 review stays',()=>{
 const {FK}=setup(),C=FK.puzzleCatalogue;let kept=0,reopened=0;
 for(const game of FK.friendsLibrary.catalogue()){
  assert.equal(C.acceptsRevision(game.id,null,release45.puzzles[game.id].revision),!R28.puzzles.has(game.id)&&!R29.puzzleChanged(game.id),game.id);
  for(const it of C.iterations(game.id)){const accepted=C.acceptsRevision(game.id,it.id,release45.iterations[it.id].revision);assert.equal(accepted,!R28.changed(it.id)&&!R29.changed(it.id),it.id);accepted?kept++:reopened++;}
 }
 assert.equal(kept,510);assert.equal(reopened,117); // 9.4.47: + 78 Dachs and 36 Zahlennachbarn
});

test('9.4.47: no repeated reading pictures keeps every unchanged 9.4.46 review; Mengen zählen retired, Dachs and Zahlennachbarn reopen',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit===R29.commit),{FK}=setup(),C=FK.puzzleCatalogue,games=FK.friendsLibrary.catalogue();
 assert.ok(migration&&/9\.4\.47/.test(migration.reason),'the owner-requested selection bridge is recorded');
 assert.equal(games.some(g=>g.id==='friends-squirrel'),false,'Mengen zählen is retired');assert.equal(C.iterations('friends-squirrel').length,0);
 assert.deepEqual(JSON.parse(JSON.stringify(games.filter(g=>g.host==='squirrel').map(g=>g.id))),['treasure'],'Eichhörnchen keeps Gegenstände merken');
 assert.equal(Object.keys(migration.iterations).some(key=>R29.changed(key)),false,'the bridge never covers a changed Aufgabe');
 let kept=0,reopened=0;
 for(const game of games){
  assert.equal(C.acceptsRevision(game.id,null,release46.puzzles[game.id].revision),!R29.puzzleChanged(game.id),game.id);
  for(const it of C.iterations(game.id)){const accepted=C.acceptsRevision(game.id,it.id,release46.iterations[it.id].revision);assert.equal(accepted,!R29.changed(it.id),it.id);accepted?kept++:reopened++;}
 }
 assert.equal(kept,513);assert.equal(reopened,114);
 // A round of «Lesen und verstehen» never shows a picture twice.
 for(let seed=1;seed<=3000;seed++){const items=C.select('friends-badger',seed*7919+13),pics=items.flatMap(it=>it.question.choices.map(c=>Array.isArray(c)?'flower-'+c[0]:c));
  assert.equal(items.length,5);assert.equal(new Set(items.map(it=>it.id)).size,5);assert.equal(new Set(pics).size,pics.length,'seed '+seed);}
});
