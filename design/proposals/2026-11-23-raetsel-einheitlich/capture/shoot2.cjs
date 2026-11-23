const {chromium}=require('playwright'),fs=require('fs'),{open}=require('./harness.cjs');
const [,,out,devs,variants]=process.argv;const css=fs.readFileSync(__dirname+'/../proposal.css','utf8');
const DEV={tablet:{viewport:{width:1080,height:810},hasTouch:true},phone:{viewport:{width:390,height:844},hasTouch:true,isMobile:true}};
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
for(const dev of devs.split(','))for(const v of variants.split(',')){
 const {ctx,page,games,play}=await open(b,DEV[dev],v==='vorschlag'?css:null);
 for(const g of games){await play(g.id);await page.screenshot({path:`${out}/${g.id}-${dev}-${v}.jpg`,type:'jpeg',quality:82});}
 fs.writeFileSync(out+'/games.json',JSON.stringify(games));await ctx.close();}
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
