/* Some review tests compare the catalogue with earlier releases read from Git history. In a shallow clone those
   commits are missing; say how to fix it instead of failing with «Cannot read baseline …» (release review T-1). */
'use strict';
const {spawnSync}=require('node:child_process'),path=require('node:path');
module.exports=(...refs)=>{
 const root=path.resolve(__dirname,'..'),missing=refs.filter(ref=>spawnSync('git',['cat-file','-e',ref+'^{commit}'],{cwd:root}).status!==0);
 if(missing.length)throw Error('Earlier releases '+missing.map(r=>r.slice(0,7)).join(', ')+' are not in this clone. Run git fetch --unshallow (CI uses fetch-depth: 0).');
};
