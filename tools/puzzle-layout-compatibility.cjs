/* Exact owner-requested UI migrations. These hashes contain no editorial decisions.
   Changed definitions, pictures, rules and interactions cannot use an unrecorded edge.
   An edge maps one exact review presentation to another within one definition. A «merge» edge
   (fromDefinition) additionally carries an unchanged Aufgabe into another Rätsel: it applies only
   from that exact earlier definition to that exact new one (24 Nov 2026: six reading Rätsel became
   one Rätsel of Dachs; the Aufgabe, its question, answers and pictures are identical). */
'use strict';
const proof=require('./puzzle-layout-compatibility.json');
function sameReviewPresentation(kind,key,before,after){
 const edges=[proof,...(proof.migrations||[])].map(p=>p[kind]?.[key]).filter(Boolean);
 const state=(definition,presentation)=>definition+' '+presentation;
 const target=state(after.definition,after.reviewPresentation);
 if(before.definition===after.definition&&before.reviewPresentation===after.reviewPresentation)return true;
 const reached=new Set([state(before.definition,before.reviewPresentation)]);
 for(let changed=true;changed;){changed=false;for(const edge of edges){
  const from=state(edge.fromDefinition||edge.definition,edge.before),to=state(edge.definition,edge.after);
  if(reached.has(from)&&!reached.has(to)){reached.add(to);changed=true;}
 }}
 return reached.has(target);
}
module.exports={sameReviewPresentation};
