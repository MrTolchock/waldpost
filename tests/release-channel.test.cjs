/* The children's version (main channel) shows exactly the Rätsel in js/friends/released.js, each at its released
   revision; the development version reviews live. */
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {setup}=require('../tools/puzzle-catalogue.cjs');
function released(){const ctx={};ctx.window=ctx;vm.runInNewContext(fs.readFileSync('js/friends/released.js','utf8'),ctx);return ctx.FK.RELEASED;}
test('every released Rätsel exists at exactly its released revision',()=>{
 const {FK}=setup(),C=FK.puzzleCatalogue,R=released(),ids=new Set(FK.friendsLibrary.catalogue().map(g=>g.id));
 assert.ok(Object.keys(R.puzzles).length>0,'a release ships at least one Rätsel');assert.match(R.source,/^puzzle-review-data@[0-9a-f]{12}$|\.json$/);
 for(const [id,revision] of Object.entries(R.puzzles)){assert.ok(ids.has(id),id+' is in the catalogue');assert.equal(revision,C.puzzleRevision(id),id+' changed since its release: review it in the dev version and run tools/release-manifest.cjs');}
});
test('the main channel releases exactly the listed revisions and nothing else',()=>{
 const {FK}=setup(),C=FK.puzzleCatalogue,V=FK.puzzleReview,R=released(),games=FK.friendsLibrary.catalogue();
 FK.RELEASED=R;FK.CHANNEL='main';
 for(const g of games)assert.equal(V.ready(g.id),R.puzzles[g.id]===C.puzzleRevision(g.id),g.id);
 const [first]=Object.keys(R.puzzles);FK.RELEASED={source:'x.json',puzzles:{...R.puzzles,[first]:'0000000000000000'}};assert.equal(V.ready(first),false,'a changed revision is not released');
 FK.RELEASED={source:'x.json',puzzles:{}};assert.equal(games.some(g=>V.ready(g.id)),false);
 FK.CHANNEL='dev';FK.RELEASED=R;assert.equal(V.ready(first),false,'the dev channel ignores the release list and needs live approvals');
});
test('the channel file keeps the children\'s version the default on real hosts',()=>{
 const run=(href,pre='')=>{const store=new Map(),ctx={location:new URL(href),URLSearchParams,URL,sessionStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},document:{addEventListener(){}},replaced:null};ctx.location.replace=u=>{ctx.replaced=u;};ctx.window=ctx;vm.runInNewContext(pre+fs.readFileSync('js/core/channel.js','utf8'),ctx);return ctx;};
 assert.equal(run('https://mrtolchock.github.io/waldpost/').FK.CHANNEL,'main');assert.equal(run('https://mrtolchock.github.io/waldpost/?channel=dev').FK.CHANNEL,'main','no URL switch on the real site');
 assert.equal(run('http://127.0.0.1:8000/').FK.CHANNEL,'dev');assert.equal(run('http://127.0.0.1:8000/?channel=main').FK.CHANNEL,'main');
 const dev=run('https://mrtolchock.github.io/waldpost/dev/','window.WALDPOST_DEV_SITE = true;');assert.equal(dev.FK.CHANNEL,'dev');assert.equal(dev.FK.DEV_SITE,true);assert.equal(dev.replaced,'https://mrtolchock.github.io/waldpost/','opening the development copy without entering it from Settings goes to the children\'s version');
 const pages=fs.readFileSync('.github/workflows/pages.yml','utf8');assert.match(pages,/sed -i '1i window\.WALDPOST_DEV_SITE = true;' site\/dev\/js\/core\/channel\.js/);
});
test('the children\'s service worker leaves the development copy alone, and each copy has its own cache',()=>{
 const load=scope=>{const listeners={},ctx={self:{registration:{scope},addEventListener:(t,f)=>listeners[t]=f,location:new URL(scope)},URL,caches:{},Response:class{}};vm.runInNewContext(fs.readFileSync('sw.js','utf8')+';this.own=own;this.CACHE=CACHE;',ctx);return {...ctx,listeners};};
 const kid=load('https://mrtolchock.github.io/waldpost/'),dev=load('https://mrtolchock.github.io/waldpost/dev/');
 assert.equal(kid.own('https://mrtolchock.github.io/waldpost/js/app.js'),true);assert.equal(kid.own('https://mrtolchock.github.io/waldpost/dev/js/app.js'),false);assert.equal(kid.own('https://mrtolchock.github.io/waldpost/dev/'),false);
 assert.equal(dev.own('https://mrtolchock.github.io/waldpost/dev/js/app.js'),true);assert.equal(dev.own('https://mrtolchock.github.io/waldpost/js/app.js'),false);
 assert.notEqual(kid.CACHE,dev.CACHE);assert.match(dev.CACHE,/-dev$/);
 let answered=false;kid.listeners.fetch({request:{method:'GET',url:'https://mrtolchock.github.io/waldpost/dev/index.html',headers:new Map()},respondWith:()=>{answered=true;}});assert.equal(answered,false,'requests for the development copy go past the children\'s worker');
});
