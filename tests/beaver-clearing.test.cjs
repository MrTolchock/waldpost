/* Biber's felled wood must not wall off his place: every gap that looks open is open on the path grid. */
const test=require('node:test'),assert=require('node:assert/strict');
globalThis.performance??={now:()=>Date.now()};
const load=async()=>{const L=await import('../js/friends/world/big/layout.js'),{createBigWorld}=await import('../js/friends/world/big/index.js');return {L,W:createBigWorld()};};
const length=(route,start)=>{let l=0,p=start;for(const q of route){l+=Math.hypot(q[0]-p[0],q[1]-p[1]);p=q;}return l;};
test('Fuchs walks straight through the felling clearing to Biber',async()=>{
 const {W}=await load(),B=W.places.beaver;let checked=0;
 for(let x=8;x<=24;x+=2)for(let z=-32;z<=-12;z+=2){
  const sx=x+.5,sz=z+.5,direct=Math.hypot(B.x-sx,B.z-sz);if(!W.nav.free(sx,sz)||direct<4)continue;
  const route=W.nav.plan(sx,sz,B.x,B.z);assert.ok(route,'route from '+sx+','+sz);checked++;
  assert.ok(length(route,[sx,sz])/direct<1.6,'detour from '+sx+','+sz+': '+(length(route,[sx,sz])/direct).toFixed(2));
 }
 assert.ok(checked>60,'enough starts '+checked);
 for(const [x,z] of [[0,-8],[8,-24],[6,-16],[12,-30]]){const route=W.nav.plan(x,z,B.x,B.z);assert.ok(length(route,[x,z])<Math.hypot(B.x-x,B.z-z)*1.25,'approach from '+x+','+z);}
});
test('felled wood lies on dry ground off the trails, each tree well apart from the others',async()=>{
 const {L,W}=await load(),T=W.terrain;
 const pieces=[...L.STUMPS.map(([x,z])=>[[x,z]]),...L.FELLED.map(([x,z,,yaw,l])=>[-.5,0,.5].map(t=>[x+Math.sin(yaw)*l*t,z+Math.cos(yaw)*l*t])),[[L.POLES[0],L.POLES[1]]]];
 for(const piece of pieces)for(const [x,z] of piece){const pa=T.pathAt(x,z);assert.ok(!T.wet(x,z)&&T.stillDepth(x,z)<-.3&&pa.d>pa.w/2+.6&&T.slope(x,z)<.5,'placement '+x+','+z);}
 // a trunk belongs to the stump at its butt; every other pair of pieces keeps a gap Fuchs can visibly use
 const butt=([x,z,,yaw,l])=>[x-Math.sin(yaw)*l/2,z-Math.cos(yaw)*l/2];
 for(const f of L.FELLED){const [bx,bz]=butt(f);assert.ok(L.STUMPS.some(([x,z])=>Math.hypot(x-bx,z-bz)<.9),'trunk '+f+' lies against its stump');}
 const groups=L.STUMPS.map(([x,z])=>[[x,z],...L.FELLED.filter(f=>{const [bx,bz]=butt(f);return Math.hypot(x-bx,z-bz)<.9;}).flatMap(([fx,fz,,yaw,l])=>[-.5,-.25,0,.25,.5].map(t=>[fx+Math.sin(yaw)*l*t,fz+Math.cos(yaw)*l*t]))]);
 groups.push([[L.POLES[0],L.POLES[1]]]);
 for(let i=0;i<groups.length;i++)for(let j=i+1;j<groups.length;j++){const d=Math.min(...groups[i].flatMap(a=>groups[j].map(b=>Math.hypot(a[0]-b[0],a[1]-b[1]))));assert.ok(d>=3.6,'gap '+i+'/'+j+' '+d.toFixed(2));}
});
