const {test}=require('node:test'),assert=require('node:assert/strict');
const {createRecorder,createVisit}=require('../js/friends/play-log.js');
function fixture(saved){let time=1000;const map=new Map(saved||[]),storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)};
 const options={storage,key:'log',now:()=>time,metadata:()=>({sessionId:'page-a',appVersion:'9.3.22',development:false}),schedule:()=>0,cancel:()=>{}};
 return {map,storage,options,sequence:0,log:createRecorder(options),time:n=>time=n,advance:n=>time+=n,now:()=>time};}
function visit(f,session={id:'add',round:0,work:{},solved:false,questions:[{kind:'add',answer:2}],iterationIds:['add/1-1']}){return {session,run:createVisit({session,puzzle:{host:'squirrel',revision:'puzzle-r1'},record:f.log.record,definition:id=>({puzzleId:'add',iterationId:id,revision:'task-r1',difficulty:'up to ten',question:{kind:'add',a:1,b:1,answer:2}}),now:f.now,id:()=>String(++f.sequence)})};}
test('precise outcomes, active task times and definitions survive a fresh recorder',()=>{
 const f=fixture(),{run}=visit(f);run.show({kind:'add',choices:[1,2,3]});f.advance(2000);run.pause('background',true);f.advance(10000);run.pause('background',false);f.advance(1000);run.answer(3,false,'retry');f.advance(1000);run.pause('dialog',true);f.advance(5000);run.pause('dialog',false);run.answer(2,true);f.advance(900);run.finish();run.stop();
 const data=f.log.exportData(),attempts=data.events.filter(e=>e.event==='puzzle_attempt');assert.deepEqual(attempts.map(e=>[e.selected,e.correct,e.activeMs]),[[3,false,3000],[2,true,4000]]);
 assert.equal(data.format,'farbtupf-play-log');assert.equal(data.schema,2);assert.equal(data.appVersion,'9.3.22');assert.equal(data.storage.localOnly,true);assert.equal(data.summary.iterations[0].medianActiveMs,4000);assert.equal(data.summary.iterations[0].firstTryRate,0);assert.equal(data.summary.puzzles[0].completedRuns,1);
 assert.equal(Object.keys(data.definitions).length,1);assert.equal(data.definitions['add/1-1@task-r1'].question.answer,2);assert.equal(data.events.some(e=>e.definition),false,'definitions are not repeated in the event stream');
 assert.deepEqual(createRecorder(f.options).exportData().events,data.events);
});
test('resume retains a run, totals partial time and does not mistake leaving for a wrong answer',()=>{
 const f=fixture(),first=visit(f);first.run.show({});f.advance(2000);first.run.stop();assert.equal(f.log.exportData().summary.iterations[0].completedRuns,0);assert.equal(f.log.exportData().summary.iterations[0].firstTryRate,null);
 const next=visit(f,first.session);next.run.show({});f.advance(3000);next.run.answer(2,true);next.run.finish();next.run.stop();const data=f.log.exportData();
 assert.equal(data.summary.puzzles[0].runs,1);assert.equal(data.summary.puzzles[0].visits,2);assert.equal(data.summary.iterations[0].medianActiveMs,5000);assert.equal(data.summary.iterations[0].wrongAnswers,0);assert.equal(data.summary.iterations[0].firstTryRate,1);assert.equal(data.events.filter(e=>e.event==='puzzle_resumed').length,1);
});
test('feedback is excluded and repeated redraws do not restart or duplicate an iteration',()=>{
 const f=fixture(),s={id:'add',round:0,work:{},solved:false,questions:[{},{}],iterationIds:['add/1-1','add/1-2']},{run}=visit(f,s);
 run.show({});f.advance(1000);run.show({});run.answer(2,true);f.advance(900);s.round=1;run.show({});f.advance(1500);run.answer(3,true);run.finish();run.stop();const data=f.log.exportData();
 assert.equal(data.events.filter(e=>e.event==='iteration_presented').length,2);assert.equal(data.events.find(e=>e.event==='puzzle_completed').visitActiveMs,2500);assert.deepEqual(data.summary.iterations.map(i=>i.medianActiveMs),[1000,1500]);
});
test('retention bounds time, event count and storage size and removes unused definitions',()=>{
 const f=fixture();f.log.record('iteration_presented',{taskKey:'old',definition:{question:'old'}});f.advance(46*86400000);f.log.flush();assert.equal(JSON.parse(f.map.get('log')).events.length,0,'idle records also expire durably without another event');
 const log=createRecorder({...f.options,maxCharacters:200000});log.record('puzzle_attempt',{puzzleId:'add',runId:'r',taskKey:'add/1@a',correct:true,activeMs:900});
 for(let i=0;i<6000;i++)log.record('sample',{value:'x'.repeat(80),i});const data=log.exportData();
 assert.ok(f.map.get('log').length<=200000);assert.equal(data.retention.truncated,true);assert.ok(data.retention.droppedWorldEvents>0);assert.equal(data.retention.droppedPuzzleEvents,0,'world events are removed before puzzle observations');assert.equal(data.retention.puzzleDataComplete,true);
 assert.equal(data.events.filter(e=>e.event==='puzzle_attempt').length,1);assert.equal(data.definitions.old,undefined);
});
test('the complete forty-five-day window survives refresh and expires only after its boundary',()=>{
 const f=fixture();f.log.record('iteration_presented',{taskKey:'retained',definition:{question:'Original definition'}});f.advance(44*86400000);f.log.flush();
 const restored=createRecorder(f.options);assert.equal(restored.exportData().retention.days,45);assert.equal(restored.exportData().events.length,1);assert.equal(restored.exportData().definitions.retained.question,'Original definition');
 f.advance(86400000);assert.equal(restored.exportData().events.length,1,'the exact forty-five-day boundary is retained');f.advance(1);restored.flush();assert.equal(JSON.parse(f.map.get('log')).events.length,0);assert.deepEqual(restored.exportData().definitions,{});
});
test('compact storage restores every event exactly and upgrades an existing version 2 log',()=>{
 const events=[{event:'session_start',timestamp:5000,sessionId:'s1',appVersion:'9.4.48',viewport:{width:390,height:797},screen:null,sequence:1,eventId:'s1:1',loaded:true},
  {event:'iteration_presented',timestamp:5100,sessionId:'s1',appVersion:'9.4.48',viewport:{width:390,height:797},screen:'puzzle',puzzleId:'add',runId:'r',taskKey:'add/1@a',round:0,sequence:2,eventId:'s1:2',presentation:{choices:[1,2,3]},partialWork:{}},
  {event:'puzzle_attempt',timestamp:5200,sessionId:'s1',appVersion:'9.4.48',viewport:{width:390,height:797},screen:'puzzle',puzzleId:'add',runId:'r',taskKey:'add/1@a',round:0,sequence:3,eventId:'s1:3',selected:2,correct:true,activeMs:100,inputMethod:'touch'},
  {event:'legacy',timestamp:4000},{event:'pause',timestamp:6000,sessionId:'s2',sequence:7,eventId:'custom',reason:'hidden'},{event:'resume',timestamp:6001,sessionId:'s2',sequence:8}];
 const {encode,decode}=require('../js/friends/play-log.js'),defs={'add/1@a':{iterationId:'add/1',question:{kind:'add',answer:2,choices:[1,2,3]}}};
 const raw=encode(events,defs,{}),back=decode(JSON.parse(raw));assert.deepEqual(back.events,events);
 const {createEncoder}=require('../js/friends/play-log.js'),cached=createEncoder();cached(events,defs,{});for(let n=0;n<events.length;n++)assert.deepEqual(decode(JSON.parse(cached(events.slice(n),defs,{}))).events,events.slice(n),'cached rows stay exact after trimming '+n);assert.deepEqual(back.definitions,defs);
 const many={'a/1@x':{puzzleId:'a',puzzleRevision:'p',title:'Titel',instruction:'Lies.',question:{answer:1}},'a/2@y':{puzzleId:'a',puzzleRevision:'p',title:'Titel',instruction:'Lies.',question:{answer:2}},'b/1@z':{puzzleId:'b',title:'Anders',question:{}}};
 const shared=JSON.parse(encode([],many,{}));assert.equal(shared.puzzles.length,2);assert.deepEqual(decode(shared).definitions,many);assert.ok(raw.length<JSON.stringify({events,definitions:defs}).length);
 const f=fixture([['log',JSON.stringify({version:2,events,definitions:defs,truncated:false,dropped:3})]]);assert.deepEqual(f.log.exportData().events,events);assert.equal(f.log.exportData().retention.droppedEvents,3);
 f.log.flush();assert.equal(JSON.parse(f.map.get('log')).version,3);assert.deepEqual(createRecorder(f.options).exportData().events,events);
});
test('old forest movement is summarized before any other event is removed',()=>{
 const f=fixture(),log=createRecorder({...f.options,maxCharacters:60000});
 log.record('puzzle_attempt',{puzzleId:'add',runId:'r',taskKey:'add/1@a',correct:true,activeMs:900});log.record('map_opened',{area:'forest'});
 for(let i=0;i<3000;i++){f.advance(500);log.record(i%3?'movement_destination':'movement_sample',{area:'forest',x:i/7,z:-i/11,...(i%3?{destination:null}:{region:'wonder-'+(i%4)})});}
 const data=log.exportData(),walks=data.events.filter(e=>e.event==='movement_summary');
 assert.ok(walks.length>0);assert.ok(data.retention.summarizedMovementEvents>0);assert.equal(data.retention.droppedEvents,0,'summaries are enough here');assert.ok(data.events.some(e=>e.event==='map_opened'));
 assert.ok(walks[0].samples+walks[0].destinations>1&&walks[0].durationMs>0&&walks[0].distance>0&&walks[0].regions.length);assert.equal(walks[0].area,'forest');
 assert.equal(data.events.at(-1).event,'movement_destination','the most recent walk stays in full detail');
});
test('storage quota failures shed world detail first and keep puzzle observations',()=>{
 const f=fixture(),set=f.storage.setItem;f.storage.setItem=(k,v)=>{if(v.length>40000)throw Error('quota');set(k,v);};
 const log=createRecorder({...f.options,immediate:new Set()});
 for(let n=0;n<20;n++){log.record('puzzle_attempt',{puzzleId:'add',runId:'r'+n,taskKey:'add/'+n+'@a',correct:true,activeMs:900});for(let i=0;i<200;i++)log.record('place_tapped',{placeId:'mouse',distance:i,note:'x'.repeat(30)});}
 assert.equal(log.flush(),true);const data=log.exportData();assert.equal(data.retention.quotaLimited,true);assert.equal(data.retention.droppedPuzzleEvents,0);assert.equal(data.events.filter(e=>e.event==='puzzle_attempt').length,20);
});
test('six weeks of five letters a day fit without losing puzzle observations',()=>{
 const f=fixture();let letter=0,phase='to-friend';const meta=()=>({sessionId:'page-'+Math.floor(letter/5),development:false,appVersion:'9.4.48',saveVersion:1,contentVersion:'friends-2',journeyId:'journey-'+Math.floor(letter/5),letterIndex:letter%15,mailPhase:phase,invitedHost:'badger',screen:'friends',viewport:{width:1180,height:788},textCase:'normal'});
 const log=createRecorder({...f.options,metadata:meta,immediate:new Set()}),days=45,perDay=5;let id=0;
 for(let day=0;day<days;day++){f.time(1000+day*86400000);
  for(let l=0;l<perDay;l++,letter++){phase='to-friend';log.record('letter_opened');log.record('map_opened',{area:'forest'});
   for(let i=0;i<200;i++){f.advance(400);log.record(i%3?'movement_destination':'movement_sample',{area:'forest',x:Math.sin(i)*40.123456,z:Math.cos(i)*30.98765,...(i%3?{destination:null}:{region:'wonder-'+(i%12)})});}
   log.record('place_tapped',{placeId:'badger',area:'forest',matchesLetter:true,distance:0.1});log.record('friend_visited',{host:'badger',puzzleId:'picnic'});
   const construction=l===0,iterationIds=Array.from({length:5},()=>'picnic/'+(id++%600)),session={id:'picnic',round:0,work:{},solved:false,questions:iterationIds.map(()=>({})),iterationIds};
   const run=createVisit({session,puzzle:{host:'badger',revision:'puzzle-r1'},record:log.record,now:f.now,id:()=>String(++f.sequence),definition:key=>({puzzleId:'picnic',iterationId:key,revision:'task-'+key,puzzleRevision:'puzzle-r1',title:'Mengen verteilen',competence:'Mengen gerecht verteilen',reference:'MA.1.A.2.a',difficulty:'2–4 Freunde; 1–10 Beeren je Freund; insgesamt höchstens 20',instruction:'Verteile die Beeren so, dass alle Freunde gleich viele bekommen.',question:{kind:'picnic',prompt:'Teile alle Beeren gerecht auf.',friends:2,each:6,total:12,answer:6,bugs:Array(14).fill('ladybird')}})});
   for(let r=0;r<5;r++){session.round=r;run.show({choices:[1,2,3]});
    for(let a=0;a<(construction?24:1);a++){f.advance(2000);run.action('puzzle_action',construction?{action:a%2?'place':'button',control:a%2?null:'Bild verschieben',subject:'berry',from:'bank',to:a%2,counts:[a,a+1],inputMethod:'touch',targetSize:{width:48,height:48}}:{action:'button',control:'rote Blume',selection:{answer:'rot',pressedBefore:null},inputMethod:'touch',targetSize:{width:112,height:82}});}
    run.answer(construction?6:'rot',true,undefined,{inputMethod:'touch'});}
   run.finish();run.celebration();run.stop();phase='return-home';log.record('mail_puzzle_completed',{host:'badger'});}
  log.flush();
 }
 const data=log.exportData(),attempts=data.events.filter(e=>e.event==='puzzle_attempt').length,stored=f.map.get('log').length;
 assert.equal(attempts,days*perDay*5);assert.equal(data.retention.droppedPuzzleEvents,0);assert.equal(data.retention.puzzleDataComplete,true);assert.equal(Object.keys(data.definitions).length,600);
 assert.ok(stored<=1400000,'stored '+stored);assert.ok(data.events.some(e=>e.event==='movement_destination'),'recent raw movement remains');
 process.stdout.write('# six-week fixture: '+stored+' stored characters, '+data.retention.summarizedMovementEvents+' movement events summarized, '+data.retention.droppedWorldEvents+' world events dropped\n');
});
test('every current iteration produces an attributable definition and outcome after content changes',()=>{
 const {FK}=require('../tools/puzzle-catalogue.cjs').setup(),C=FK.puzzleCatalogue,plain=v=>JSON.parse(JSON.stringify(v));
 let checked=0;
 for(const game of FK.friendsLibrary.catalogue()){
  const f=fixture(),p=C.puzzle(game.id),items=C.iterations(game.id),session={id:game.id,round:0,work:{},solved:false,questions:items.map(it=>plain(it.question)),iterationIds:items.map(it=>it.id)};
  const run=createVisit({session,puzzle:{host:p.host,revision:C.puzzleRevision(game.id)},record:f.log.record,now:f.now,id:()=>String(++f.sequence),definition:key=>{const it=items.find(it=>it.id===key);return {puzzleId:game.id,iterationId:key,revision:C.iterationRevision(game.id,it),question:plain(it.question),...(it.question.kind==='trace'?{authoredStrokes:plain(FK.glyphs.data[it.question.glyph].strokes)}:{})};}});
  for(const it of items){run.show(plain(it.question));f.advance(100);run.answer(it.question.answer??it.question.glyph??{completed:true},true);session.round++;}
  run.finish();run.stop();const data=f.log.exportData();
  for(const it of items){const key=it.id+'@'+C.iterationRevision(game.id,it),definition=data.definitions[key];assert.deepEqual(definition.question,plain(it.question),it.id);assert.equal(data.events.filter(e=>e.event==='puzzle_attempt'&&e.taskKey===key&&e.correct).length,1,it.id+' outcome');assert.ok(data.summary.iterations.some(row=>row.iterationId===it.id&&row.completedRuns===1));checked++;}
  assert.equal(data.storage.persisted,true);assert.equal(data.summary.unattributedPuzzleEvents,0);
 }
 assert.equal(checked,627); // Mengen zählen retired in 9.4.47
});
test('failed log storage retains an export and never blocks gameplay state transactions',()=>{
 const f=fixture();f.log.record('session_start');const prior=f.map.get('log');f.storage.setItem=()=>{throw Error('quota');};f.log.record('puzzle_attempt',{correct:false});const data=f.log.exportData();assert.equal(data.storage.persisted,false);assert.match(data.storage.error,/nicht/);assert.equal(data.events.length,2);assert.equal(f.map.get('log'),prior);
 const {create}=require('../js/friends/state.js'),content=require('../js/friends/content.js'),map=new Map(),storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>{if(k.endsWith('.log'))throw Error('quota');map.set(k,v);},removeItem:k=>map.delete(k)};
 const state=create({storage,content,appVersion:()=> '9.3.22'});assert.ok(state.openLetter());assert.equal(state.blocked,false);assert.ok(state.logStatus.error);assert.equal(state.exportLog().appVersion,'9.3.22');
});
test('legacy log events remain available but cannot inflate new puzzle statistics',()=>{
 const f=fixture([['log',JSON.stringify({events:[null,{event:'puzzle_attempt',timestamp:1000,correct:true}],truncated:false})]]);const data=f.log.exportData();assert.equal(data.events.length,1);assert.equal(data.summary.legacyEvents,1);assert.equal(data.summary.unattributedPuzzleEvents,1);assert.equal(data.summary.puzzles.length,0);
 f.log.record('note');assert.ok(f.log.clear());assert.equal(f.log.exportData().events.length,0);assert.equal(f.log.exportData().summary.iterations.length,0);
});
test('construction/tracing do not produce misleading first-try scores',()=>{
 const f=fixture();f.log.record('iteration_presented',{puzzleId:'trace',puzzleRevision:'p1',runId:'r',visitId:'v',taskKey:'trace/A@a',resumed:false,definition:{iterationId:'trace/A',question:{kind:'trace'}}});
 f.log.record('puzzle_attempt',{puzzleId:'trace',puzzleRevision:'p1',runId:'r',visitId:'v',taskKey:'trace/A@a',correct:true,activeMs:2300});
 assert.equal(f.log.exportData().summary.iterations[0].firstTryRate,null);assert.equal(f.log.exportData().summary.iterations[0].medianActiveMs,2300);
});
test('disabled recording adds no events or definitions and resumes without erasing usage history',()=>{
 const f=fixture();let enabled=true;f.log=createRecorder({...f.options,enabled:()=>enabled});f.log.record('session_start');const before=f.log.exportData();enabled=false;
 assert.equal(f.log.record('iteration_presented',{taskKey:'dev-task',definition:{question:'test'}}),false);assert.equal(f.log.record('puzzle_attempt',{correct:true}),false);assert.equal(f.log.record('movement_sample',{x:1,z:2}),false);
 const paused=f.log.exportData();assert.deepEqual(paused.events,before.events);assert.deepEqual(paused.definitions,before.definitions);assert.equal(paused.recording.enabled,false);assert.equal(f.log.status().enabled,false);
 enabled=true;f.log.record('session_start');assert.equal(f.log.exportData().events.length,before.events.length+1);assert.equal(f.log.status().enabled,true);
 const dev=createRecorder({...f.options,metadata:()=>({development:true})});assert.equal(dev.record('development_skip'),false);assert.equal(dev.exportData().events.length,before.events.length+1,'existing observations survive, but development never appends');
});
test('disabled state logging excludes startup, movement and outcomes while saves still work',()=>{
 const f=fixture(),{create}=require('../js/friends/state.js'),content=require('../js/friends/content.js');let enabled=false;
 const options={storage:f.storage,content,loggingEnabled:()=>enabled},state=create(options);assert.equal(state.exportLog().events.length,0);assert.ok(state.openLetter());assert.ok(state.position(3,4));assert.equal(state.record('puzzle_attempt',{correct:true}),false);assert.equal(state.exportLog().events.length,0);
 const restored=create(options);assert.equal(restored.mail().phase,'to-friend');assert.deepEqual(restored.get().world,{x:3,z:4});assert.equal(restored.exportLog().events.length,0);enabled=true;assert.ok(restored.position(4,5));assert.equal(restored.exportLog().events.length,1);
});
test('a task tested before normal recording has no invented first-try result',()=>{
 const f=fixture(),s={id:'add',round:0,work:{},solved:false,logTested:true,questions:[{}],iterationIds:['add/1-1']},{run}=visit(f,s);run.show({});run.answer(2,true);run.stop();assert.equal(f.log.exportData().summary.iterations[0].firstTryRate,null);assert.equal(f.log.exportData().events.find(e=>e.event==='iteration_presented').resumed,true);
});
