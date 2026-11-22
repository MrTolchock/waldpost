/* Host scenery through the real gallery, review, child and completion screens. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/opt/codex/cua_node/lib/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const {installRemote,seedFromPage}=require('./review-repository-support.cjs');
const habitats={deer:'meadow',ibex:'mountain',frog:'swamp',squirrel:'conifers',bird:'birches',owl:'old-forest',beaver:'beaver-pond',mouse:'stump',hedgehog:'undergrowth',fish:'waterfall-pool',kingfisher:'brook',badger:'badger-sett'};
const out=process.env.FARBTUPF_SHOTS||'/tmp/waldpost-habitat-backgrounds';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try{
  fs.mkdirSync(out,{recursive:true});
  const context=await browser.newContext({viewport:{width:1080,height:810},hasTouch:true,reducedMotion:'reduce',serviceWorkers:'block'});
  const remote=await installRemote(context);
  await context.route('**/js/friends/game.js',r=>r.fulfill({contentType:'application/javascript',body:'// Isolated puzzle scenery fixture.'}));
  const page=await context.newPage(),errors=[],report=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto((process.env.FARBTUPF_BASE_URL||'http://127.0.0.1:8000')+'/?screen=puzzle-review');
  await page.locator('.gate-task').waitFor();
  const [a,b]=(await page.locator('.gate-task').textContent()).match(/\d+/g).map(Number);
  await page.getByLabel('Deine Antwort',{exact:true}).fill(String(a*b));await page.locator('.gate-submit').click();
  await page.waitForFunction(()=>FK.current()==='puzzle-review');await page.evaluate(()=>document.fonts.ready);
  const games=await page.evaluate(()=>FK.friendsLibrary.catalogue());
  await seedFromPage(page,remote,games.map(g=>g.id));
  const inspect=async(game,mode)=>{
   const state=await page.evaluate(async()=>{
    const root=document.querySelector('.screen:not([hidden])'),style=getComputedStyle(root);
    const image=new Image();image.src=style.backgroundImage.match(/url\("([^"]+)"\)/)[1];await image.decode();
    return {host:root.dataset.host,image:image.src,width:image.naturalWidth,height:image.naturalHeight,fit:style.backgroundSize,overflow:root.scrollWidth>root.clientWidth+1};
   });
   assert.equal(state.host,game.host,game.id+' '+mode);
   assert.ok(state.image.endsWith('/puzzle-'+habitats[game.host]+'.webp'),game.id+' '+mode+' '+state.image);
   assert.deepEqual([state.width,state.height,state.fit,state.overflow],[1536,1024,'cover',false]);
   report.push({game:game.id,mode,host:state.host,scene:habitats[game.host]});
  };
  for(const [width,height]of [[1080,810],[390,844],[844,390]]){
   await page.setViewportSize({width,height});
   const photographed=new Set();
   for(const game of games){
    await page.evaluate(g=>FK.go(g.screen,{game:g.id,gallery:true,returnTo:'puzzle-gallery'}),game);
    await inspect(game,'gallery '+width);
    if(!photographed.has(game.host)||game.screen==='trace'){
     await page.screenshot({path:out+'/'+game.id+'-'+width+'.png'});photographed.add(game.host);
    }
   }
  }
  await page.setViewportSize({width:1080,height:810});
  for(const game of games){
   await page.evaluate(g=>FK.go(g.screen,{game:g.id,reviewIteration:FK.puzzleCatalogue.iterations(g.id)[0].id,returnTo:'puzzle-review'}),game);
   await inspect(game,'review');
   await page.evaluate(g=>{
    const original=FK.puzzleReview.gallerySession;
    FK.puzzleReview.gallerySession=id=>{const session=original(id);session.round=session.questions.length;return session;};
    try{FK.go(g.screen,{game:g.id,gallery:true,returnTo:'puzzle-gallery'});}finally{FK.puzzleReview.gallerySession=original;}
   },game);
   await page.locator('.screen:not([hidden]) .puzzle-completion').waitFor();await inspect(game,'celebration');
  }
  await page.evaluate(()=>{FK.friendsLibrary.canPlay=()=>true;});
  for(const game of games){
   await page.evaluate(g=>FK.go(g.screen,{game:g.id}),game);await inspect(game,'child');
  }
  // A newly blocked host must never inherit the previous host's scenery.
  await page.evaluate(()=>{FK.puzzleReview.ready=()=>false;FK.go('puzzle',{game:'friends-deer'});});
  await page.locator('.screen:not([hidden]) .puzzle-review-blocked').waitFor();await inspect({id:'friends-deer',host:'deer'},'blocked');
  assert.deepEqual(errors,[]);assert.equal(remote.writes.length,0);
  fs.writeFileSync(out+'/report.json',JSON.stringify({checks:report.length,scenes:habitats,reviewWrites:remote.writes.length,report},null,2)+'\n');
  console.log('PASS '+report.length+' host backgrounds across gallery, review, child play, celebration and blocked screens; all 12 scenes decode at phone, tablet and landscape sizes.');
  await context.close();
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
