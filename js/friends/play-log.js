/* Local, bounded observations for improving the game. No network or player identity. */
(function(root){
  'use strict';
  const copy=value=>JSON.parse(JSON.stringify(value));
  // Sized for about six weeks of five letters a day. Puzzle observations are stored compactly and are the last data removed.
  const DAY=86400000,RETENTION_DAYS=45,MAX_EVENTS=200000,MAX_CHARS=1400000,REFILL=0.9;
  const important=new Set(['session_start','session_end','letter_opened','letter_session_started','letter_session_finished','mail_puzzle_completed','puzzle_started','puzzle_resumed','iteration_presented','puzzle_attempt','iteration_interrupted','puzzle_completed','puzzle_visit_ended','pause','answer_submitted','development_skip']);
  // Repeated page/journey/visit context is stored only when it changes; the export restores it on every event.
  const CONTEXT=['sessionId','development','appVersion','saveVersion','contentVersion','journeyId','letterIndex','mailPhase','invitedHost','screen','viewport','textCase','puzzleId','puzzleRevision','host','runId','visitId','iterationId','taskKey','round','inputMethod','area'];
  const MOVEMENT=new Set(['movement_destination','movement_sample']);
  // Puzzle tier: everything needed to calibrate Rätsel difficulty and to read task times in context. Everything else is world/flow detail.
  const PUZZLE_FLOW=new Set(['session_start','session_end','pause','resume','save_created','storage_error','letter_opened','letter_session_started','letter_session_sleep','letter_session_finished','letter_limit','friend_visited','mail_puzzle_completed','round_start','answer_submitted','puzzle_completed','development_skip']);
  const isPuzzle=e=>!!(e.runId||e.taskKey||PUZZLE_FLOW.has(e.event)),isWorld=e=>!isPuzzle(e);
  const round1=v=>typeof v==='number'&&Number.isFinite(v)?Math.round(v*10)/10:v;
  const same=(a,b)=>a===b||(!!a&&!!b&&typeof a==='object'&&typeof b==='object'&&JSON.stringify(a)===JSON.stringify(b));
  const SHARED=['puzzleId','puzzleRevision','title','competence','reference','difficulty','instruction'];
  // A stored row depends only on its event and the previous event, so rows are cached and only new ones are encoded on each save.
  function createEncoder(initialKeys=[]){
    const keys=initialKeys.slice(),index=new Map(keys.map((name,i)=>[name,i])),rowCache=new WeakMap();
    const k=name=>{let i=index.get(name);if(i===undefined){i=keys.length;keys.push(name);index.set(name,i);}return i.toString(36);};
    const pack=v=>Array.isArray(v)?v.map(pack):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).filter(([,x])=>x!==undefined).map(([a,b])=>[k(a),pack(b)])):v;
    const lastSequence=e=>e?.seq??0;
    function row(e,prev){
      const set={},unset=[],payload={},before=prev?.event||{};
      for(const name of CONTEXT){const has=e[name]!==undefined;if(has&&!same(e[name],before[name]))set[name]=e[name];else if(!has&&before[name]!==undefined)unset.push(k(name));}
      const sequence=Number.isSafeInteger(e.sequence)?e.sequence:null,derived=e.sessionId&&sequence!==null?e.sessionId+':'+sequence:undefined,seq=sequence??lastSequence(prev);
      for(const [name,value]of Object.entries(e))if(value!==undefined&&!CONTEXT.includes(name)&&name!=='event'&&name!=='timestamp'&&name!=='sequence'&&name!=='eventId')payload[name]=value;
      if(e.eventId!==derived)payload.eventId=e.eventId??null;
      const cells=[e.timestamp-(prev?prev.event.timestamp:0),k(e.event),Object.keys(payload).length?pack(payload):0,Object.keys(set).length?pack(set):0,unset.length?unset:0];
      if(sequence!==lastSequence(prev)+1)cells.push(sequence);else while(cells.length>2&&cells.at(-1)===0)cells.pop();
      return {event:e,prev:prev?.event,prevSeq:lastSequence(prev),seq,json:JSON.stringify(cells)};
    }
    return function encode(rows,defs,counters){
      const out=new Array(rows.length);let prev=null;
      for(let i=0;i<rows.length;i++){const e=rows[i];let cached=rowCache.get(e);if(!cached||cached.prev!==prev?.event||cached.prevSeq!==lastSequence(prev)){cached=row(e,prev);rowCache.set(e,cached);}out[i]=cached.json;prev=cached;}
      // Fields shared by all iterations of a Rätsel revision are stored once.
      const groupOf=def=>def&&typeof def==='object'?def.puzzleId+'@'+def.puzzleRevision:null,groups=new Map();
      for(const def of Object.values(defs)){const id=groupOf(def);if(id===null)continue;const list=groups.get(id)||[];list.push(def);groups.set(id,list);}
      const puzzles=[],shared=new Map();
      for(const [id,list] of groups){const names=SHARED.filter(n=>list.every(d=>d[n]!==undefined&&same(d[n],list[0][n])));if(names.length){shared.set(id,{index:puzzles.length,names});puzzles.push(pack(Object.fromEntries(names.map(n=>[n,list[0][n]]))));}}
      const definitions=Object.fromEntries(Object.entries(defs).map(([taskKey,def])=>{const group=shared.get(groupOf(def));return [k(taskKey),group?[group.index,pack(Object.fromEntries(Object.entries(def).filter(([n])=>!group.names.includes(n))))]:pack(def)];}));
      const head=JSON.stringify({version:3,...counters,puzzles,definitions,keys});
      return head.slice(0,-1)+',"events":['+out.join(',')+']}';
    };
  }
  const encode=(rows,defs,counters)=>createEncoder()(rows,defs,counters);
  function decode(saved){
    const keys=saved.keys,name=i=>keys[parseInt(i,36)],unpack=v=>Array.isArray(v)?v.map(unpack):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([a,b])=>[name(a),unpack(b)])):v;
    let context={},time=0,seq=0;const events=[];
    for(const row of saved.events){
      const [dt,event,payload=0,set=0,unset=0]=row;time+=dt;
      for(const i of unset||[])delete context[name(i)];Object.assign(context,set?unpack(set):{});
      const e={...context,...(payload?unpack(payload):{}),event:name(event),timestamp:time},sequence=row.length>5?row[5]:seq+1;
      if(sequence!==null){e.sequence=sequence;seq=sequence;}
      if(!('eventId' in e)){if(context.sessionId&&sequence!==null)e.eventId=context.sessionId+':'+sequence;}else if(e.eventId===null)delete e.eventId;
      events.push(e);
    }
    const puzzles=(saved.puzzles||[]).map(unpack);
    const definitions=Object.fromEntries(Object.entries(saved.definitions||{}).map(([taskKey,def])=>[name(taskKey),Array.isArray(def)&&def.length===2&&Number.isInteger(def[0])&&puzzles[def[0]]?{...puzzles[def[0]],...unpack(def[1])}:unpack(def)]));
    return {events,definitions};
  }
  // Collapses the oldest raw forest movement into one short record per uninterrupted walk.
  function collapseMovement(rows,count){
    const out=[];let walk=null,left=count;
    const close=()=>{if(!walk)return;const {first,last,points,regions,destinations,samples}=walk;let distance=0;for(let i=1;i<points.length;i++)distance+=Math.hypot(points[i].x-points[i-1].x,points[i].z-points[i-1].z);
      const context=Object.fromEntries(CONTEXT.filter(n=>first[n]!==undefined).map(n=>[n,first[n]]));
      out.push({...context,event:'movement_summary',durationMs:last.timestamp-first.timestamp,destinations,samples,distance:round1(distance),...(points.length?{from:points[0],to:points.at(-1)}:{}),regions:[...regions],timestamp:first.timestamp,sequence:first.sequence,eventId:first.eventId});walk=null;};
    for(const e of rows){
      if(left>0&&MOVEMENT.has(e.event)){left--;walk=walk||{first:e,points:[],regions:new Set(),destinations:0,samples:0};walk.last=e;
        if(e.event==='movement_sample'){walk.samples++;if(Number.isFinite(e.x)&&Number.isFinite(e.z))walk.points.push({x:round1(e.x),z:round1(e.z)});if(e.region)walk.regions.add(e.region);}else walk.destinations++;continue;}
      close();out.push(e);
    }
    close();return out;
  }
  function dropOldest(rows,count,match){let left=count;return rows.filter(e=>!(left>0&&match(e)&&left--));}
  function createRecorder({storage,key,now=()=>Date.now(),metadata=()=>({}),enabled=()=>true,schedule=fn=>{const t=setTimeout(fn,800);t.unref?.();return t;},cancel=clearTimeout,maxCharacters=MAX_CHARS,immediate=important}){
    let events=[],definitions={},truncated=false,dropped=0,droppedPuzzle=0,droppedWorld=0,summarized=0,expired=0,sequence=0,timer=null,error='',dirty=false,limit=maxCharacters,quotaLimited=false,stored=0;
    const valid=e=>e&&typeof e.event==='string'&&Number.isFinite(e.timestamp);
    const count=v=>Number.isSafeInteger(v)?v:0;let encoder=createEncoder();
    try{const raw=storage.getItem(key),old=JSON.parse(raw),restored=old?.version===3&&Array.isArray(old.keys)?decode(old):{events:Array.isArray(old?.events)?old.events:[],definitions:old?.definitions};
      events=restored.events.filter(valid);definitions=restored.definitions&&typeof restored.definitions==='object'?restored.definitions:{};truncated=!!old?.truncated;dropped=count(old?.dropped);droppedPuzzle=count(old?.droppedPuzzle);droppedWorld=count(old?.droppedWorld);summarized=count(old?.summarized);expired=count(old?.expired);
      if(old?.version===3)encoder=createEncoder(old.keys);sequence=events.reduce((max,e)=>Number.isSafeInteger(e.sequence)&&e.sequence>max?e.sequence:max,0);stored=raw?.length||0;if(old&&old.version!==3)dirty=events.length>0;}catch{/* Recording can still work in memory. */}
    const tally=(removed,byAge=false)=>{if(byAge){expired+=removed.length;dropped+=removed.length;if(removed.length)truncated=true;return;}const puzzle=removed.filter(isPuzzle).length;droppedPuzzle+=puzzle;droppedWorld+=removed.length-puzzle;dropped+=removed.length;if(removed.length)truncated=true;};
    function trim(){
      const cutoff=now()-RETENTION_DAYS*DAY;if(events.length<=MAX_EVENTS&&!(events[0]?.timestamp<cutoff))return;
      let kept=events.filter(e=>e.timestamp>=cutoff);
      if(kept.length>MAX_EVENTS){const extra=kept.length-MAX_EVENTS,world=kept.filter(isWorld).length;kept=dropOldest(kept,Math.min(extra,world),isWorld);if(kept.length>MAX_EVENTS)kept=kept.slice(-MAX_EVENTS);}
      if(kept.length<events.length){const keptSet=new Set(kept),removed=events.filter(e=>!keptSet.has(e)),old=removed.filter(e=>e.timestamp<cutoff);tally(old,true);tally(removed.filter(e=>e.timestamp>=cutoff));events=kept;dirty=true;}
    }
    const referenced=rows=>{const keys=new Set(rows.map(e=>e.taskKey).filter(Boolean));return Object.fromEntries(Object.entries(definitions).filter(([key])=>keys.has(key)));};
    // Fits the log in the budget: summarize old movement, then drop old world events, and only then drop old puzzle observations.
    function fit(budget){
      let rows=events,removed=[],collapsed=0;
      const build=()=>encoder(rows,referenced(rows),{truncated:truncated||removed.length>0,dropped:dropped+removed.length,droppedPuzzle:droppedPuzzle+removed.filter(isPuzzle).length,droppedWorld:droppedWorld+removed.filter(isWorld).length,summarized:summarized+collapsed,expired});
      let raw=build();if(raw.length<=budget)return {rows,raw,removed,collapsed};
      const target=Math.floor(budget*REFILL),without=(n,match)=>{const before=new Set(rows);rows=dropOldest(rows,n,match);const after=new Set(rows);removed.push(...[...before].filter(e=>!after.has(e)));};
      for(let moving;raw.length>target&&(moving=rows.filter(e=>MOVEMENT.has(e.event)).length);raw=build()){const n=Math.max(1,Math.ceil(moving/2));rows=collapseMovement(rows,n);collapsed+=n;}
      for(let world;raw.length>target&&(world=rows.filter(isWorld).length);raw=build())without(Math.max(1,Math.ceil(world/4)),isWorld);
      while(raw.length>target&&rows.length){without(Math.max(1,Math.ceil(rows.length/10)),()=>true);raw=build();}
      return {rows,raw,removed,collapsed};
    }
    function flush(){
      if(timer!==null){cancel(timer);timer=null;}trim();if(!dirty)return !error;
      for(let attempt=0;attempt<8;attempt++){
        const {rows,raw,removed,collapsed}=fit(limit);
        try{storage.setItem(key,raw);}catch{if(!rows.length)break;quotaLimited=true;limit=Math.floor(Math.min(limit,raw.length)*0.75);continue;}
        events=rows;definitions=referenced(rows);tally(removed);summarized+=collapsed;stored=raw.length;dirty=false;error='';return true;
      }
      // Keep the in-memory observations available for an export if storage is unavailable.
      error='Das Protokoll konnte nicht dauerhaft auf diesem Gerät gespeichert werden.';return false;
    }
    function record(event,details={}){
      try{
        const meta=metadata();if(!enabled()||meta.development)return false;
        const data=copy(details);
        if(data.definition&&data.taskKey){definitions[data.taskKey]=data.definition;delete data.definition;}
        if(MOVEMENT.has(event)){data.x=round1(data.x);data.z=round1(data.z);}
        const timestamp=now();events.push({...data,...meta,event,timestamp,sequence:++sequence,eventId:meta.sessionId?meta.sessionId+':'+sequence:undefined});dirty=true;trim();
        if(immediate.has(event))flush();else if(timer===null)timer=schedule(()=>{timer=null;flush();});
        return true;
      }catch{error='Ein Ereignis konnte nicht protokolliert werden.';return false;}
    }
    const retention=()=>({days:RETENTION_DAYS,maxEvents:MAX_EVENTS,maxStorageCharacters:maxCharacters,storedCharacters:stored,quotaLimited,truncated,droppedEvents:dropped,droppedPuzzleEvents:droppedPuzzle,droppedWorldEvents:droppedWorld,expiredEvents:expired,summarizedMovementEvents:summarized,puzzleDataComplete:droppedPuzzle===0,
      priority:'When space runs out, the oldest forest movement is first summarized into movement_summary records, then the oldest other world events are removed; puzzle observations are removed last. Events older than '+RETENTION_DAYS+' days expire.'});
    function exportData(){flush();trim();const rows=copy(events),defs=copy(referenced(events)),firstPuzzle=rows.find(isPuzzle);return {
      format:'farbtupf-play-log',schema:2,appName:root.FK?.APP_NAME||'Waldpost',exportedAt:new Date(now()).toISOString(),...metadata(),
      recording:{enabled:enabled()&&!metadata().development},
      retention:retention(),
      storage:{localOnly:true,persisted:!dirty&&!error,error:error||null},
      retainedFrom:rows[0]?.timestamp??null,retainedTo:rows.at(-1)?.timestamp??null,puzzleDataFrom:firstPuzzle?.timestamp??null,
      analysisGuide:{purpose:'Calibrate fixed Rätsel difficulty first (neither too easy nor too hard); secondarily improve game flow, puzzle clarity, input usability and the forest world.',
        timing:'activeMs is foreground task time within this visit, excluding background, open dialogs and correct-feedback/celebration delays. It includes thinking and unattended visible time.',
        interpretation:['Compare the same puzzle/iteration revision and input method. Use sample counts; this is not a diagnosis of a child.','Separate wrong answers from cancelled taps, handwriting off-path events, route failures and storage errors.','First-try rates apply only to choice questions with an observed beginning. Construction and handwriting require action/trace analysis as well as completion.','A paused visit can be resumed; it is not proof of abandonment. A missing result is not a wrong answer.','Legacy events without run/iteration IDs are retained but excluded from puzzle outcome summaries.','movement_summary replaces older raw movement_destination/movement_sample events of one walk to save space: counts, duration, sampled path distance, start/end and regions. Check retention before reading gaps in world events.','Do not automatically change difficulty or approve content. Suggested changes still require adult review.'],
        questions:['Which Rätsel and iterations look too easy (always first-try correct and quick) or too hard (wrong answers, long times, interruptions, resets)?','Which exact iterations need clearer wording or pictures?','Where do retries, rule requests, input problems or long task times cluster?','Where do children visit the wrong friend, open the map repeatedly or struggle to reach a destination?']},
      definitions:defs,summary:summarize(rows,defs),events:rows
    };}
    function clear(){try{storage.removeItem(key);}catch{error='Das lokale Protokoll konnte nicht gelöscht werden.';return false;}if(timer!==null)cancel(timer);timer=null;events=[];definitions={};truncated=false;dropped=droppedPuzzle=droppedWorld=summarized=expired=stored=0;dirty=false;error='';return true;}
    return {record,flush,exportData,clear,status:()=>({enabled:enabled()&&!metadata().development,events:events.length,error,persisted:!dirty&&!error,truncated,droppedEvents:dropped,droppedPuzzleEvents:droppedPuzzle,droppedWorldEvents:droppedWorld,summarizedMovementEvents:summarized,storedCharacters:stored,maxStorageCharacters:maxCharacters})};
  }
  const median=values=>{if(!values.length)return null;const a=values.slice().sort((x,y)=>x-y),i=Math.floor(a.length/2);return Math.round(a.length%2?a[i]:(a[i-1]+a[i])/2);};
  const quantile=(values,q)=>{const a=values.slice().sort((x,y)=>x-y),i=(a.length-1)*q,lo=Math.floor(i);return Math.round(a[lo]+(a[Math.ceil(i)]-a[lo])*(i-lo));};
  function summarize(events,definitions){
    const rows=events.filter(e=>!e.development),groups=new Map(),puzzles=new Map();
    for(const e of rows){
      if(!e.runId||!e.puzzleId)continue;
      const puzzleKey=e.puzzleId+'@'+e.puzzleRevision,p=puzzles.get(puzzleKey)||{puzzleId:e.puzzleId,puzzleRevision:e.puzzleRevision,runs:new Set(),visits:new Set(),completed:new Set(),wrongAnswers:0,ruleRequests:0,resets:0,reinspections:0,inputIssues:0,strokeIssues:0,aufgaben:{observed:0,completed:0,wrong:0,known:0,firstTry:0,times:[]}};puzzles.set(puzzleKey,p);p.runs.add(e.runId);if(e.visitId)p.visits.add(e.visitId);
      if(e.event==='puzzle_completed')p.completed.add(e.runId);
      if(e.event==='instruction_requested')p.ruleRequests++;
      if(e.event==='puzzle_action'&&e.action==='reset')p.resets++;
      if(e.event==='puzzle_action'&&e.action==='reinspect')p.reinspections++;
      if(e.event==='input_issue')p.inputIssues++;
      if(e.event==='trace_issue')p.strokeIssues++;
      if(e.event==='puzzle_attempt'&&e.correct===false)p.wrongAnswers++;
      if(!e.taskKey)continue;
      const key=e.runId+'|'+e.taskKey,g=groups.get(key)||{taskKey:e.taskKey,puzzleId:e.puzzleId,puzzleKey,runId:e.runId,attempts:0,wrong:0,completed:false,fromStart:false,activeMs:0};groups.set(key,g);
      if(e.event==='iteration_presented'&&!e.resumed)g.fromStart=true;
      if(e.event==='puzzle_attempt'){g.attempts++;if(e.correct===false)g.wrong++;if(e.correct){g.completed=true;g.activeMs+=Number(e.activeMs)||0;}}
      if(e.event==='iteration_interrupted')g.activeMs+=Number(e.activeMs)||0;
    }
    const iterations=new Map();
    for(const g of groups.values()){
      const questionKind=definitions[g.taskKey]?.question.kind,responseModel=!questionKind?'unknown':['picnic','build','robot','order','mirror','neighbours','syllables','trace'].includes(questionKind)?'construction_or_tracing':'choice';
      const row=iterations.get(g.taskKey)||{taskKey:g.taskKey,puzzleId:g.puzzleId,iterationId:definitions[g.taskKey]?.iterationId||null,responseModel,runsObserved:0,completedRuns:0,wrongAnswers:0,knownFirstAttemptRuns:0,firstTryCorrectRuns:0,activeTimesMs:[]};iterations.set(g.taskKey,row);
      row.runsObserved++;row.wrongAnswers+=g.wrong;if(g.completed){row.completedRuns++;row.activeTimesMs.push(g.activeMs);if(g.fromStart&&responseModel==='choice'){row.knownFirstAttemptRuns++;if(g.attempts===1)row.firstTryCorrectRuns++;}}
      // Puzzle-level calibration across all of its iterations.
      const p=puzzles.get(g.puzzleKey);if(p){p.aufgaben.observed++;p.aufgaben.wrong+=g.wrong;if(g.completed){p.aufgaben.completed++;p.aufgaben.times.push(g.activeMs);if(g.fromStart&&responseModel==='choice'){p.aufgaben.known++;if(g.attempts===1)p.aufgaben.firstTry++;}}}
    }
    return {events:events.length,legacyEvents:events.filter(e=>!e.eventId).length,unattributedPuzzleEvents:events.filter(e=>e.event==='puzzle_attempt'&&(!e.runId||!e.taskKey)).length,developmentEvents:events.filter(e=>e.development).length,
      puzzles:[...puzzles.values()].map(({aufgaben:a,...p})=>({...p,runs:p.runs.size,visits:p.visits.size,completedRuns:p.completed.size,completed:undefined,iterationsObserved:a.observed,iterationsCompleted:a.completed,knownFirstAttemptIterations:a.known,firstTryCorrectIterations:a.firstTry,firstTryRate:a.known?a.firstTry/a.known:null,medianActiveMs:median(a.times),activeMsQuartiles:a.times.length?[quantile(a.times,0.25),median(a.times),quantile(a.times,0.75)]:null})),
      iterations:[...iterations.values()].map(r=>({...r,medianActiveMs:median(r.activeTimesMs),activeTimesMs:undefined,firstTryRate:r.knownFirstAttemptRuns?r.firstTryCorrectRuns/r.knownFirstAttemptRuns:null})),
      flow:{journeysStarted:rows.filter(e=>e.event==='letter_session_started').length,journeysFinished:rows.filter(e=>e.event==='letter_session_finished').length,lettersOpened:rows.filter(e=>e.event==='letter_opened').length,mapsOpened:rows.filter(e=>e.event==='map_opened').length,wrongFriendVisits:rows.filter(e=>e.event==='friend_unavailable'&&e.reason==='wrong_letter').length,routeFailures:rows.filter(e=>e.event==='route_failure').length,storageIssues:rows.filter(e=>e.event==='storage_error').length},
      unfinishedVisits:rows.filter(e=>e.event==='puzzle_visit_ended'&&!e.completed).length};
  }
  function createVisit({session,puzzle,record,definition,now=()=>performance.now(),id=()=>crypto.randomUUID(),paused=[]}){
    const resumed=!!session.logTested||!!session.logRunId||session.round>0||session.solved||Object.keys(session.work).length>0;
    session.logRunId=session.logRunId||id();const runId=session.logRunId,visitId=id(),firstRound=session.round,reasons=new Set(paused);
    let last=now(),elapsed=0,current=null,closed=false,completed=false;
    const clock=()=>{const t=now();if(!reasons.size)elapsed+=Math.max(0,t-last);last=t;return Math.round(elapsed);};
    const emit=(event,data={})=>record(event,{puzzleId:session.id,puzzleRevision:puzzle.revision,host:puzzle.host,runId,visitId,...(current?{iterationId:current.id,taskKey:current.key,round:current.round}:{}),...data});
    emit(resumed?'puzzle_resumed':'puzzle_started',{puzzleRevision:puzzle.revision,total:session.questions.length,round:session.round});
    function show(question){
      const iterationId=session.iterationIds[session.round];if(current?.id===iterationId)return;
      clock();reasons.delete('feedback');current={id:iterationId,key:'',round:session.round,start:clock(),correct:!!session.solved,attempts:0};
      const def=definition(iterationId),key=iterationId+'@'+def.revision;current.key=key;
      emit('iteration_presented',{definition:def,resumed:resumed&&session.round===firstRound,alreadySolved:!!session.solved,presentation:{choices:question.choices,order:question.order,bugs:question.bugs},partialWork:session.work});
      if(session.solved)reasons.add('feedback');
    }
    function answer(selected,correct,feedback,context={}){
      if(!current||current.correct||closed)return;
      const activeMs=clock()-current.start;current.attempts++;emit('puzzle_attempt',{...context,selected,correct,feedback,attemptInVisit:current.attempts,activeMs});
      if(correct){current.correct=true;reasons.add('feedback');}
    }
    function action(event,details={}){if(closed||!current||current.correct)return;emit(event,{...details,activeMs:clock()-current.start});}
    function pause(reason,on){if(closed)return;clock();const had=reasons.has(reason);if(on)reasons.add(reason);else reasons.delete(reason);if(had!==on)emit(on?'pause':'resume',{reason,visitActiveMs:clock()});}
    function finish(){if(closed||completed)return;completed=true;clock();reasons.add('complete');emit('puzzle_completed',{total:session.questions.length,visitActiveMs:clock()});}
    function stop(reason='navigation'){if(closed)return;const active=clock();if(current&&!current.correct)emit('iteration_interrupted',{activeMs:active-current.start});emit('puzzle_visit_ended',{reason,completed,visitActiveMs:active});closed=true;}
    return {show,answer,action,pause,finish,stop,celebration:()=>emit('celebration_finished')};
  }
  const api={createRecorder,createVisit,summarize,encode,createEncoder,decode,collapseMovement,isPuzzle};
  if(typeof module!=='undefined')module.exports=api;else{
    root.PlayLog=api;const FK=root.FK;let active=null,activeSession=null;
    const safe=fn=>{try{return fn();}catch{/* Diagnostics must not change game behaviour. */}};
    const record=(event,data)=>FK.friends?.record(event,data);
    const uuid=()=>root.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
    const development=()=>FK.settings.get('developerMode')===true||new URLSearchParams(location.search).get('dev')==='1';
    function markTested(session){delete session.logRunId;session.logTested=true;FK.puzzleRounds.save(session);}
    FK.playLog={
      development,
      setDevelopment(value){
        FK.friends?.flushLog();FK.settings.set('developerMode',!!value);
        if(!value&&new URLSearchParams(location.search).get('dev')==='1'){const url=new URL(location.href);url.searchParams.delete('dev');location.assign(url.href);}
      },
      begin(session){safe(()=>{
        active?.stop();active=null;activeSession=null;if(!session||session.review||session.gallery||session.blocked)return;   // reviews and adult gallery rounds are not observed
        if(development()){markTested(session);return;}
        if(session.logTested)delete session.logRunId;
        activeSession=session;
        const C=FK.puzzleCatalogue,puzzle=C.puzzle(session.id);
        active=createVisit({session,puzzle:{...puzzle,revision:C.puzzleRevision(session.id)},record,id:uuid,paused:[...(document.hidden?['background']:[]),...(document.querySelector('.modal')?['dialog']:[])],definition:iterationId=>{
          const it=C.iterations(session.id).find(i=>i.id===iterationId);
          return {puzzleId:session.id,iterationId,revision:C.iterationRevision(session.id,it),puzzleRevision:C.puzzleRevision(session.id),title:puzzle.title,competence:puzzle.competence,reference:puzzle.reference,difficulty:puzzle.difficulty,instruction:puzzle.instruction,question:it.question,...(it.question.kind==='trace'?{authoredStrokes:FK.glyphs.data[it.question.glyph].strokes}:{})};
        }});delete session.logTested;FK.puzzleRounds.save(session);
      });},
      show:question=>safe(()=>active?.show(question)),answer:(value,correct,feedback)=>safe(()=>active?.answer(value,correct,feedback,{inputMethod:FK.play?.inputMethod?.()||'unknown'})),
      place:(subject,details)=>safe(()=>active?.action('puzzle_action',{action:'place',subject,...details,inputMethod:FK.play?.inputMethod?.()||'unknown'})),
      button(label,node){safe(()=>{const r=node?.getBoundingClientRect();active?.action(label==='Spiel erklären'?'instruction_requested':'puzzle_action',{control:label,action:/zurücksetzen|neu ordnen/i.test(label)?'reset':/nochmals anschauen/i.test(label)?'reinspect':'button',selection:node?{answer:node.dataset.answer,shape:node.dataset.shape,rotation:node.dataset.rotation,cell:node.dataset.cell,part:node.dataset.part,pressedBefore:node.getAttribute('aria-pressed')}:undefined,inputMethod:FK.play?.inputMethod?.()||'unknown',targetSize:r?{width:Math.round(r.width),height:Math.round(r.height)}:undefined});});},
      issue:(reason,node,inputMethod)=>safe(()=>{if(node?.closest('.screen-puzzle,.screen-trace')&&!node.closest('.topbar'))active?.action('input_issue',{reason,control:node.getAttribute('aria-label')||null,inputMethod});}),
      trace:(event,data)=>safe(()=>active?.action(event,{inputMethod:FK.play?.inputMethod?.()||'unknown',...data})),
      finish:()=>safe(()=>active?.finish()),celebration:()=>safe(()=>active?.celebration()),
      stop(reason){safe(()=>active?.stop(reason));active=null;activeSession=null;},
      pause:(reason,on)=>safe(()=>active?.pause(reason,on))
    };
    FK.on('settings',event=>{if(event.key==='developerMode'&&development()){safe(()=>{if(activeSession)markTested(activeSession);});FK.playLog.stop('developer_mode');}});
    document.addEventListener('visibilitychange',()=>{FK.playLog.pause('background',document.hidden);if(document.hidden)FK.friends?.flushLog();});
    root.addEventListener('pagehide',event=>{if(event.persisted)FK.playLog.pause('page_cache',true);else FK.playLog.stop('pagehide');FK.friends?.flushLog();});
    root.addEventListener('pageshow',event=>{if(event.persisted)FK.playLog.pause('page_cache',false);});
    FK.on('modal-opened',()=>FK.playLog.pause('dialog',true));FK.on('modal-closed',()=>FK.playLog.pause('dialog',false));
  }
})(typeof window!=='undefined'?window:globalThis);
