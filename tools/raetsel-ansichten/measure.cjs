const {chromium}=require('playwright'),{open}=require('./harness.cjs');
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const {page,games,play}=await open(b,{...(process.argv[2]==="phone"?{viewport:{width:390,height:844},hasTouch:true,isMobile:true}:{viewport:{width:1080,height:810},hasTouch:true})},(process.env.RAETSEL_CSS?require('fs').readFileSync(process.env.RAETSEL_CSS,'utf8'):null));const rows=[];
for(const g of games){await play(g.id);
 rows.push(await page.evaluate(id=>{const root=document.querySelector('.screen:not([hidden])'),paper=root.querySelector('.puzzle-paper');
  const r=e=>{const b=e.getBoundingClientRect();return Math.round(b.width)+'x'+Math.round(b.height)};
  const fonts=new Map();const walker=document.createTreeWalker(paper,NodeFilter.SHOW_TEXT);let t;
  while(t=walker.nextNode()){if(!t.textContent.trim())continue;const e=t.parentElement;if(e.closest('.puzzle-context,.topbar,.puzzle-progress')||!e.getClientRects().length)continue;const cs=getComputedStyle(e);const k=cs.fontFamily.split(',')[0].replace(/"/g,'')+' '+cs.fontSize+' '+cs.fontWeight;fonts.set(k,(fonts.get(k)||[]).concat(e.className.toString().split(' ')[0]||e.tagName));}
  const frames=[...paper.querySelectorAll('*')].filter(e=>{const cs=getComputedStyle(e);return cs.backgroundColor!=='rgba(0, 0, 0, 0)'&&!e.closest('button')&&e.getBoundingClientRect().width>120&&e!==paper;}).map(e=>e.className.toString().split(' ').slice(0,2).join('.')+' '+r(e)+' bg '+getComputedStyle(e).backgroundColor+' bd '+getComputedStyle(e).borderTopWidth+' rad '+getComputedStyle(e).borderTopLeftRadius);
  const pics=[...paper.querySelectorAll('.puzzle-picture,.wa-illustration,img')].filter(e=>e.getClientRects().length&&!e.closest('.puzzle-context,.puzzle-progress')&&!e.parentElement.closest('.puzzle-picture,.wa-illustration')).map(e=>(e.closest('[data-answer],button')?'A':'F')+r(e));
  const prompt=paper.querySelector('h1,h2,.puzzle-prompt,.puzzle-question');
  return {id,prompt:prompt?prompt.className+' '+getComputedStyle(prompt).fontSize:'-',paper:r(paper),fonts:[...fonts].map(([k,v])=>k+' ['+[...new Set(v)].join(',')+']'),frames,pics:[...new Set(pics)].join(' ')};},g.id));}
console.log(JSON.stringify(rows,null,1));await b.close();})().catch(e=>{console.error(e);process.exit(1)});
