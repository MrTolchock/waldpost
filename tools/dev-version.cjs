#!/usr/bin/env node
/* Development build number (FK.DEV_VERSION) of the development version (…/dev/).
   Every change pushed to dev bumps it, so the ENTWICKLUNG marker tells which build is open and installed
   development copies pick up the new offline cache.

   node tools/dev-version.cjs            prints FK.VERSION and FK.DEV_VERSION
   node tools/dev-version.cjs patch      1.0.1 → 1.0.2 (default for a change on dev)
   node tools/dev-version.cjs minor      1.0.1 → 1.1.0
   node tools/dev-version.cjs major      1.0.1 → 2.0.0
   node tools/dev-version.cjs --check    fails when sw.js's cache name does not match both versions */
'use strict';
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),utilFile=path.join(root,'js/core/util.js'),swFile=path.join(root,'sw.js');
const read=f=>fs.readFileSync(f,'utf8');
function versions(){
  const util=read(utilFile);
  const app=util.match(/FK\.VERSION = '([^']+)';/),dev=util.match(/FK\.DEV_VERSION = '(\d+)\.(\d+)\.(\d+)';/);
  if(!app||!dev)throw new Error('js/core/util.js: FK.VERSION or FK.DEV_VERSION not found');
  return {app:app[1],dev:dev.slice(1).map(Number)};
}
const cacheName=(app,dev)=>`farbtupf-v${app}-d${dev}-waldpost`;
function check(){
  const {app,dev}=versions(),expected=cacheName(app,dev.join('.')),sw=read(swFile);
  const actual=sw.match(/const CACHE = '([^']+)'/);
  if(!actual||actual[1]!==expected){
    console.error(`sw.js cache is ${actual?actual[1]:'missing'}, expected ${expected}. Run node tools/dev-version.cjs patch (or bump by hand).`);
    return false;
  }
  return true;
}
module.exports={versions,cacheName,check};
if(require.main===module){
  const arg=process.argv[2];
  if(arg==='--check'){if(!check())process.exit(1);console.log('Versions consistent.');return;}
  const {app,dev}=versions();
  if(!arg){console.log(`Waldpost ${app} · Entwicklung ${dev.join('.')}`);return;}
  const index={major:0,minor:1,patch:2}[arg];
  if(index===undefined){console.error('Usage: node tools/dev-version.cjs [patch|minor|major|--check]');process.exit(2);}
  const next=dev.map((n,i)=>i<index?n:i===index?n+1:0).join('.');
  fs.writeFileSync(utilFile,read(utilFile).replace(/FK\.DEV_VERSION = '[^']+';/,`FK.DEV_VERSION = '${next}';`));
  fs.writeFileSync(swFile,read(swFile).replace(/const CACHE = 'farbtupf-v[^']+'/,`const CACHE = '${cacheName(app,next)}'`));
  console.log(`Entwicklung ${dev.join('.')} → ${next}`);
}
