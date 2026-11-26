'use strict';
const test=require('node:test'),assert=require('node:assert');
const {versions,cacheName,check}=require('../tools/dev-version.cjs');
test('offline cache name carries the app version and the development build number',()=>{
  const {app,dev}=versions();
  assert.match(cacheName(app,dev.join('.')),/^farbtupf-v\d+\.\d+\.\d+-d\d+\.\d+\.\d+-waldpost$/);
  assert.equal(check(),true,'sw.js cache name is out of date: run node tools/dev-version.cjs patch');
});
