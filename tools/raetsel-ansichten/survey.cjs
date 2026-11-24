// Render every Aufgabe of the given Rätsel (proposal CSS, tablet or phone) and record layout features.
const {chromium}=require('playwright'),fs=require('fs'),{open}=require('./harness.cjs');
const [,,dev,out,...ids]=process.argv;const css=process.env.RAETSEL_CSS?require('fs').readFileSync(process.env.RAETSEL_CSS,'utf8'):null;
const DEV={tablet:{viewport:{width:1080,height:810},hasTouch:true},phone:{viewport:{width:390,height:844},hasTouch:true,isMobile:true}};
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const {page}=await open(b,DEV[dev],css);const rows=[];
for(const id of ids){
 const its=await page.evaluate(id=>FK.puzzleCatalogue.iterations(id).map(i=>i.id),id);
 for(const it of its){
  await page.evaluate(({id,it})=>{window.__s=null;const q=FK.puzzleCatalogue.iterations(id).find(i=>i.id===it).question;window.__force={[id]:q};FK.go('puzzle-gallery');},{id,it});
  await page.waitForFunction(()=>FK.current()==='puzzle-gallery');
  await page.evaluate(id=>FK.puzzleReview.play(id),id);await page.waitForFunction(()=>FK.current()==='puzzle'&&window.__s);
  await page.locator('.screen:not([hidden]) .puzzle-paper .puzzle-scene').first().waitFor().catch(()=>{});await page.waitForTimeout(120);
  rows.push(await page.evaluate(({id,it})=>{const root=document.querySelector('.screen:not([hidden])'),paper=root.querySelector('.puzzle-paper'),scene=paper.querySelector('.puzzle-scene'),ans=paper.querySelector('.puzzle-answers');
   const pr=paper.getBoundingClientRect(),vis=e=>e&&e.getClientRects().length;
   const scenePics=scene?[...scene.querySelectorAll('.puzzle-picture')].filter(vis).filter(e=>!e.parentElement.closest('.puzzle-picture')).length:0;
   const answers=ans?[...ans.children].filter(vis):[];
   const text=scene?[...scene.querySelectorAll('.puzzle-read-text,b,span')].map(e=>e.childElementCount?'':e.textContent.trim()).sort((a,b)=>b.length-a.length)[0]||'':'';
   const cls=scene?[...new Set([...scene.querySelectorAll('*')].filter(vis).map(e=>[...e.classList].filter(c=>/^puzzle-|^gap$/.test(c)&&!/is-|picture|wa-/.test(c)).join('.')).filter(Boolean))].sort().join(' '):'';
   return {id,it,paperH:Math.round(pr.height),sceneH:scene?Math.round(scene.getBoundingClientRect().height):0,over:Math.round(Math.max(0,pr.bottom-innerHeight,-pr.top)),hscroll:paper.scrollWidth>paper.clientWidth+1||document.documentElement.scrollWidth>innerWidth+1,
    scenePics,nAns:answers.length,ansPic:answers.filter(a=>a.querySelector('.puzzle-picture')).length,ansTextLen:Math.max(0,...answers.map(a=>a.textContent.trim().length)),textLen:text.length,cls,prompt:paper.querySelector('.puzzle-prompt')?.textContent.trim()};},{id,it}));
 }
}
fs.writeFileSync(out,JSON.stringify(rows));await b.close();})().catch(e=>{console.error(e);process.exit(1)});
