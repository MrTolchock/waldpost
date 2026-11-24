const {chromium}=require('playwright'),fs=require('fs'),{open}=require('./harness.cjs');
const [,,out,devs,variants]=process.argv;const css=process.env.RAETSEL_CSS?require('fs').readFileSync(process.env.RAETSEL_CSS,'utf8'):null;
const DEV={tablet:{viewport:{width:1080,height:810},hasTouch:true},phone:{viewport:{width:390,height:844},hasTouch:true,isMobile:true}};
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
for(const dev of devs.split(','))for(const v of variants.split(',')){
 const {ctx,page,games,play}=await open(b,DEV[dev],v==='vorschlag'?css:null);
 for(const g of games){await play(g.id);await page.screenshot({path:`${out}/${g.id}-${dev}-${v}.jpg`,type:'jpeg',quality:82});
  const act=page.locator('.screen:not([hidden])');
  if(g.id==='treasure'){await act.getByRole('button',{name:'Ich habe sie mir gemerkt',exact:true}).click({force:true});
   await page.waitForTimeout(500);await page.screenshot({path:`${out}/treasure_auswahl-${dev}-${v}.jpg`,type:'jpeg',quality:82});}
 }
 const act=page.locator('.screen:not([hidden])');
 for(const combo of ['2x10','3x6','4x5']){
  await page.evaluate(c=>{const q=FK.puzzleCatalogue.iterations('picnic').map(i=>i.question).find(q=>q.friends+'x'+q.each===c);window.__force={picnic:q};},combo);
  await play('picnic');const q=await page.evaluate(()=>__s.questions[__s.round]);
  for(let i=0;i<q.friends;i++)for(let k=(q.plates?.[i]||0);k<q.each;k++)await act.locator('.puzzle-picnic-friend').nth(i).click({force:true});
  await page.waitForTimeout(150);await page.screenshot({path:`${out}/picnic_${combo}-${dev}-${v}.jpg`,type:'jpeg',quality:82});
  await page.evaluate(()=>{window.__force=null;});}
 fs.writeFileSync(out+'/games.json',JSON.stringify(games));await ctx.close();}
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
