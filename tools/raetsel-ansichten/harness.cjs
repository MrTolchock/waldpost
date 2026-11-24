/* Opens the Rätsel-Galerie in a disposable browser: every Rätsel is signed off only locally
   (development key, dev=1), every request outside 127.0.0.1:8000 is blocked, nothing reaches review data.
   play(id) starts a gallery round; window.__force={[id]:question} fixes its first Aufgabe. */
const {chromium}=require('playwright');
exports.open=async(b,opt,css)=>{
 const ctx=await b.newContext({...opt,deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1:8000\//.test(u.toString()),r=>r.abort());   // nothing leaves this machine
 const page=await ctx.newPage();page.setDefaultTimeout(30000);
 await page.goto('http://127.0.0.1:8000/?software=1&dev=1');await page.waitForFunction(()=>window.FK?.friendsView&&FK.current()==='friends',null,{timeout:120000});
 if(css)await page.addStyleTag({content:css});   // a proposal stylesheet, only for «vorschlag» captures
 await page.getByRole('button',{name:'Einstellungen für Erwachsene',exact:true}).first().click();
 const n=(await page.locator('.gate-task').innerText()).match(/\d+/g).map(Number);await page.locator('.gate-input').fill(String(n[0]*n[1]));await page.getByRole('button',{name:'Öffnen',exact:true}).click();
 await page.waitForFunction(()=>FK.current()==='settings');await page.getByRole('button',{name:'Rätsel-Galerie',exact:true}).click();await page.waitForFunction(()=>FK.current()==='puzzle-gallery');
 const games=await page.evaluate(()=>{const gs=FK.friendsLibrary.catalogue();for(const g of gs){for(const it of FK.puzzleCatalogue.iterations(g.id)){FK.puzzleReview.seen(g.id,it.id);FK.puzzleReview.decide(g.id,it.id,'approved');}FK.puzzleReview.decide(g.id,null,'approved');}
  // fixed first task per Rätsel so "Heute" and "Vorschlag" show the same Aufgabe
  const orig=FK.puzzleReview.gallerySession;FK.puzzleReview.gallerySession=id=>{const r=Math.random;Math.random=()=>0.37;try{const s=orig(id);const f=window.__force?.[id];if(s&&f){s.questions[0]=f;}window.__s=s;return s;}finally{Math.random=r;}};
  return gs.map(g=>({id:g.id,host:g.host,title:g.title}));});
 const play=async id=>{await page.evaluate(id=>{window.__s=null;FK.go('puzzle-gallery');},id);await page.waitForFunction(()=>FK.current()==='puzzle-gallery');
  await page.evaluate(id=>FK.puzzleReview.play(id),id);await page.waitForFunction(()=>FK.current()==='puzzle'&&window.__s);
  await page.locator('.screen:not([hidden]) .puzzle-paper').waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(700);};
 return {ctx,page,games,play};
};
