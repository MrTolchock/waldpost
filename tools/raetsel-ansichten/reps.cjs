// Screenshot chosen Aufgaben and interaction states for both variants. plan.json: [{id,key,it,action}]
const {chromium}=require('playwright'),fs=require('fs'),{open}=require('./harness.cjs');
const [,,plan,out,devs,variants]=process.argv;const P=JSON.parse(fs.readFileSync(plan));const css=process.env.RAETSEL_CSS?require('fs').readFileSync(process.env.RAETSEL_CSS,'utf8'):null;
const DEV={tablet:{viewport:{width:1080,height:810},hasTouch:true},phone:{viewport:{width:390,height:844},hasTouch:true,isMobile:true}};
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});const fails=[];
for(const dev of devs.split(','))for(const v of variants.split(',')){
 const {ctx,page,play}=await open(b,DEV[dev],v==='vorschlag'?css:null);const act=page.locator('.screen:not([hidden])');
 for(const p of P){try{
  await page.evaluate(({id,it})=>{window.__force=it?{[id]:FK.puzzleCatalogue.iterations(id).find(i=>i.id===it).question}:null;},p);
  await play(p.id);const q=await page.evaluate(()=>__s.questions[__s.round]);const a=p.action||'';
  const click=l=>l.click({force:true});
  if(a==='treasure-choose'){await click(act.getByRole('button',{name:'Ich habe sie mir gemerkt',exact:true}));await page.waitForTimeout(500);}
  if(a==='picnic-fill'){for(let i=0;i<q.friends;i++)for(let k=(q.plates?.[i]||0);k<q.each;k++)await click(act.locator('.puzzle-picnic-friend').nth(i));await page.waitForTimeout(150);}
  if(a==='neighbours-fill'){for(const pos of q.given?[1]:[0,1])await act.locator('[data-answer="'+q.answer[pos]+'"]').dragTo(act.locator('[data-neighbour-slot="'+pos+'"]'));await page.waitForTimeout(150);}
  if(a==='syllables-partial'){await click(act.locator('.puzzle-syllable-chip:not(:disabled)[data-part="'+q.parts[0]+'"]').first());await page.waitForTimeout(200);}
  if(a==='mirror-partial'){for(const c of q.answer.slice(0,Math.ceil(q.answer.length/2)))await click(act.locator('.puzzle-mirror-grid button[data-cell="'+c+'"]'));await page.waitForTimeout(200);}
  if(a==='robot-partial'){const route=await page.evaluate(q=>{const queue=[[q.start]],seen=new Set([q.start]);for(const path of queue){const p=path.at(-1);if(p===q.goal)return path.slice(1);for(const [dx,dy]of [[0,-1],[-1,0],[0,1],[1,0]]){const x=p%q.size+dx,y=Math.floor(p/q.size)+dy,n=y*q.size+x;if(x<0||x>=q.size||y<0||y>=q.size||q.obstacles.includes(n)||seen.has(n))continue;seen.add(n);queue.push([...path,n]);}}},q);
   let prev=q.start;for(const cell of route.slice(0,Math.max(1,route.length-1))){const d=cell-prev;await click(act.getByRole('button',{name:d===1?'Nach rechts':d===-1?'Nach links':d>0?'Nach unten':'Nach oben',exact:true}));prev=cell;await page.waitForTimeout(150);}}
  if(a==='right'){if(q.kind==='treasure'){await click(act.getByRole('button',{name:'Ich habe sie mir gemerkt',exact:true}));await page.waitForTimeout(400);}
   if(q.kind==='syllables'){for(const part of q.parts)await click(act.locator('.puzzle-syllable-chip:not(:disabled)[data-part="'+part+'"]').first());}
   else if(q.kind==='neighbours'){for(const pos of q.given?[1]:[0,1])await act.locator('[data-answer="'+q.answer[pos]+'"]').dragTo(act.locator('[data-neighbour-slot="'+pos+'"]'));}
   else if(q.kind==='mirror'){for(const c of q.answer)await click(act.locator('.puzzle-mirror-grid button[data-cell="'+c+'"]'));}
   else if(q.kind==='picnic'){for(let i=0;i<q.friends;i++)for(let k=(q.plates?.[i]||0);k<q.each;k++)await click(act.locator('.puzzle-picnic-friend').nth(i));}
   else if(q.kind==='robot'){const route=await page.evaluate(q=>{const queue=[[q.start]],seen=new Set([q.start]);for(const path of queue){const p=path.at(-1);if(p===q.goal)return path.slice(1);for(const [dx,dy]of [[0,-1],[-1,0],[0,1],[1,0]]){const x=p%q.size+dx,y=Math.floor(p/q.size)+dy,n=y*q.size+x;if(x<0||x>=q.size||y<0||y>=q.size||q.obstacles.includes(n)||seen.has(n))continue;seen.add(n);queue.push([...path,n]);}}},q);
    let prev=q.start;for(const cell of route){const d=cell-prev;await click(act.getByRole('button',{name:d===1?'Nach rechts':d===-1?'Nach links':d>0?'Nach unten':'Nach oben',exact:true}));prev=cell;}}
   else await act.locator('.puzzle-paper [data-answer]').evaluateAll((n,ans)=>{const w=n.find(e=>e.dataset.answer===String(ans));if(!w)throw Error('no right answer');w.click();},q.answer);
   await page.waitForTimeout(250);}
  if(a==='wrong'){if(q.kind==='treasure'){await click(act.getByRole('button',{name:'Ich habe sie mir gemerkt',exact:true}));await page.waitForTimeout(400);}
   const ok=await act.locator('.puzzle-paper [data-answer]').evaluateAll((n,ans)=>{const w=n.find(e=>e.dataset.answer!==String(ans)&&!(Array.isArray(ans)&&ans.map(String).includes(e.dataset.answer)));if(!w)return false;w.click();return true;},q.answer);
   if(!ok)throw Error('no wrong answer');await page.waitForTimeout(300);}
  await page.screenshot({path:`${out}/${p.key}-${dev}-${v}.jpg`,type:'jpeg',quality:82});
 }catch(e){fails.push(p.key+' '+dev+' '+v+': '+e.message.split('\n')[0]);}}
 await ctx.close();}
console.log(fails.length?fails.join('\n'):'all shots ok');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
