/* Preserve decisions only across the exact requested UI migration, never changed tasks/art. */
const test=require('node:test'),assert=require('node:assert/strict');
const proof=require('../tools/puzzle-layout-compatibility.json'),baselines=require('../tools/puzzle-review-baselines.json');
const {sameReviewPresentation}=require('../tools/puzzle-layout-compatibility.cjs'),{setup}=require('../tools/puzzle-catalogue.cjs');
const reassigned=new Set(['count','add','compare','robot','rocket','picnic','sequence','treasure','neighbours','read-puzzle']);
const revised=new Set(['rocket','robot','sequence','treasure','neighbours','compare','friends-hedgehog','shape-match']);
test('terminology retains old decisions only for unchanged tasks',()=>{
 const baseline=baselines.releases.find(r=>r.commit===proof.migrations[0].baselineCommit),C=setup().FK.puzzleCatalogue;
 const affected=(id,it)=>reassigned.has(id)||revised.has(id)||['robot','treasure','neighbours','read-puzzle','friends-ibex'].includes(id)||id==='picnic'&&it.question.friends===4;
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
  assert.equal(C.acceptsRevision(id,null,p.revision),!reassigned.has(id)&&!revised.has(id)&&id!=='friends-ibex',id);
  for(const it of C.iterations(id))assert.equal(C.acceptsRevision(id,it.id,baseline.iterations[it.id].revision),!reassigned.has(id)&&!revised.has(id),it.id);
 }
});
test('balanced iPad layout preserves all existing task decisions',()=>{
 const migration=proof.migrations.find(m=>m.baselineCommit==='301e506b5061af35eeba8825992795827d5802ed');
 assert.ok(migration,'exact iPad balance correction is recorded');
 const baseline=baselines.releases.find(r=>r.commit===migration.baselineCommit),C=setup().FK.puzzleCatalogue;
 for(const [id,p]of Object.entries(baseline.puzzles)){
  assert.equal(C.acceptsRevision(id,null,p.revision),!revised.has(id)&&id!=='friends-ibex',id);
  for(const it of C.iterations(id))assert.equal(C.acceptsRevision(id,it.id,baseline.iterations[it.id].revision),!revised.has(id),it.id);
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
  assert.equal(C.acceptsRevision(id,null,p.revision),!revised.has(id)&&id!=='friends-ibex',id);
  for(const it of C.iterations(id))assert.equal(C.acceptsRevision(id,it.id,baseline.iterations[it.id].revision),!revised.has(id),it.id);
 }
});
test('the comparison blueprint retains reviews for unchanged tasks after the November 20 revisions',()=>{
 const previous=baselines.releases.find(release=>release.commit==='ddc66a42827d648e1936aa8962f91284b3398584');
 const catalogue=setup().FK.puzzleCatalogue;
 for(const [id,puzzle] of Object.entries(previous.puzzles)){
  assert.equal(catalogue.acceptsRevision(id,null,puzzle.revision),!revised.has(id)&&id!=='friends-ibex',id);
  for(const task of catalogue.iterations(id)){
   assert.equal(catalogue.acceptsRevision(id,task.id,previous.iterations[task.id].revision),!revised.has(id),task.id);
  }
 }
});
