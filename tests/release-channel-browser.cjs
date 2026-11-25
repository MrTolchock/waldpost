/* The children's version (?channel=main locally, the site root when published): only the released Rätsel, no review
   function and no GitHub traffic at all. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/opt/codex/cua_node/lib/node_modules/playwright');
const assert=require('node:assert/strict');
const base=process.env.FARBTUPF_BASE_URL||'http://127.0.0.1:8000';
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});try{
 const context=await browser.newContext({viewport:{width:1080,height:810},hasTouch:true,reducedMotion:'reduce',serviceWorkers:'block'}),page=await context.newPage(),errors=[],github=[];page.setDefaultTimeout(60000);
 page.on('pageerror',e=>errors.push(e.message));await context.route(/github(usercontent)?\.com/,route=>{github.push(route.request().url());return route.abort();});
 await page.goto(base+'/?software=1&channel=main');await page.waitForFunction(()=>!!window.FK?.friendsView&&FK.current()==='friends');
 const state=await page.evaluate(()=>{const C=FK.puzzleCatalogue,games=FK.friendsLibrary.catalogue();return {channel:FK.CHANNEL,repository:!!FK.reviewRepository,released:FK.RELEASED.puzzles,games:games.map(g=>({id:g.id,revision:C.puzzleRevision(g.id),ready:FK.puzzleReview.ready(g.id)}))};});
 assert.equal(state.channel,'main');assert.equal(state.repository,false,'no review synchronisation in the children\'s version');
 for(const g of state.games)assert.equal(g.ready,state.released[g.id]===g.revision,g.id);assert.ok(state.games.some(g=>g.ready));
 assert.ok(await page.evaluate(()=>FK.friends.openLetter()||FK.friends.mail().phase!=='den-letter'),'a letter can be opened without any review data');
 await page.evaluate(()=>FK.go('settings'));const card=page.locator('.ff-puzzle-review-settings');
 assert.equal(await card.getByRole('button',{name:'Rätsel-Galerie',exact:true}).count(),1);assert.equal(await card.getByRole('button',{name:'Rätsel-Prüfung',exact:true}).count(),0,'no review function');
 assert.match(await card.innerText(),/Entwicklerversion/);assert.equal(await page.locator('.ff-review-connection, .ff-github').count(),0);
 await card.getByRole('button',{name:'Rätsel-Galerie',exact:true}).click();await page.waitForFunction(()=>FK.current()==='puzzle-gallery');assert.equal(await page.locator('.gallery-puzzle').count(),state.games.filter(g=>g.ready).length);
 await page.waitForTimeout(1500);assert.deepEqual(github,[],'the children\'s version never contacts GitHub');assert.deepEqual(errors,[]);
 console.log('PASS children\'s version: '+state.games.filter(g=>g.ready).length+' released Rätsel from the release list, gallery without review, no GitHub requests.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
