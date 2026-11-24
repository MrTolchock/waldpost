/* Finite editorial content. No question is invented at play time.
   Stable IDs name content; choice shuffling is presentation, not an iteration. */
(function () {
  'use strict';
  const FK=window.FK,R=FK.puzzleRounds,C=window.FriendsContent;
  const meta={
    'friends-squirrel':['MA.1.A.2.a','Mengen zählen','0–20 Eicheln; Vierer- und Fünferstruktur'],
    'friends-bird':['D.2.A.1.b; D.1.A.1.b','Reime erkennen','25 verschiedene Reimpaare ohne vertauschte Doppelungen; eingeführte Buchstaben'],
    'friends-beaver':['MA.2.A.1.a','Reihen mit Waldgegenständen ergänzen','Zwei gleiche und ein anderer Gegenstand je Reihe; das Muster der ersten zwei Reihen ergänzen','Zwei oder drei verschiedene Waldgegenstände je Reihe; jede Reihe enthält dieselben Dinge wie die erste'],
    'friends-badger':['D.2.A.1.b; D.2.B.1.b; NMG.2.1.a; NMG.2.3.a; NMG.2.4.a','Lesen und verstehen','Vertraute Wörter, kurze Sätze und Naturfragen lesen; zwei oder drei Bildantworten'],
    'friends-ibex':['MA.2.A.2.a','Wiederholungsmuster fortsetzen und ergänzen','AAB, ABB, ABC, ABAC, AABC mit Stein, Tanne und Blume; Lücke am Ende oder in der zweiten Gruppe'],
    count:['MA.1.A.2.a','Mengen gezielt zählen','6–15 Marienkäfer zwischen Bienen und Schnecken'],
    add:['MA.1.A.3.a','Sichtbare Gruppen addieren','Zwei positive Summanden; Summe höchstens 10'],
    rocket:['MA.1.A.4.b','Mengen ergänzen','Gesamtmenge 5–10; besetzte und freie Plätze'],
    picnic:['MA.1.A.4.a (Übung)','Eins zu eins gerecht verteilen','2–4 Freunde; 1–10 Beeren je Freund; insgesamt höchstens 20'],
    syllable:['D.1.A.1.b','Wörter in Silben zerlegen','1–5 Silben; vertraute Bildwörter'],
    robot:['MA.2.A.1.c (Unterstützung)','Benachbarte Schritte im Raum planen','4 × 4; sichtbares Waldziel und gesperrte Felsen','4 × 4; sichtbares Waldziel; Felsen erzwingen immer einen Umweg'],
    treasure:['Optionale Gedächtnisübung','Gegenstände wiedererkennen','Vier Dinge, eines fehlt; kein Zeitlimit'],
    neighbours:['MA.1.A.2.a/b','Zahlennachbarn bestimmen','Mitte 1–18; Mengenrahmen bis 20; ein Nachbar kann vorgegeben sein'],
    compare:['MA.1.A.1.a (Übung)','Mengen vergleichen','1–10 Fische; mehr oder gleich viele'],
    mirror:['MA.2.A.2.c','Ein Muster spiegeln','3 × 3; drei bis fünf Blätter; senkrechte Spiegelachse'],
    vowels:['D.4.A.1.c (Unterstützung)','Einen Vokal ergänzen','Bildwörter; keine Lücke innerhalb von au/ei/ie/eu/äu'],
    'read-puzzle':['D.2.A.1.b','Silben zu Wörtern verbinden','28 Bildwörter; zwei bis drei Silben; ein Ablenker'],
  };
  const pools={},clone=v=>JSON.parse(JSON.stringify(v));
  function add(id,key,label,q){(pools[id]||=[]).push({id:id+'/'+key,label,question:clone(q)});}
  const numeric=(n,max=20)=>[n,Math.max(0,n-1),Math.min(max,n+1)].filter((v,i,a)=>a.indexOf(v)===i).concat(n===0?[2]:n===max?[max-2]:[]);
  // The counted picture is an acorn: name it «Eicheln» (23 Nov review).
  const numberQ=(count,item,columns=5)=>({kind:'nuts',prompt:'Wie viele '+(item==='fish'?'Fische':item==='forest-nut'?'Eicheln':'Dinge')+' sind hier?',count,item,columns,answer:count,choices:numeric(count)});
  for(const [id,item]of [['friends-squirrel','forest-nut']]){
    for(let n=0;n<=20;n++)add(id,'count-'+n,'Menge '+n,numberQ(n,item));
    for(const n of [4,8,12,16])add(id,'four-'+n,'Menge '+n+' in Viererreihen',numberQ(n,item,4));
  }
  // Steinbock: mountain patterns of stone, fir and flower (content.js mountainPatterns), 30 tasks.
  for(const p of C.mountainPatterns())add('friends-ibex','pattern-'+p.key,p.label,{kind:'pattern',prompt:'Welches Bild fehlt im Muster?',sequence:p.sequence,gap:p.gap,answer:p.answer,choices:p.choices});
  // «Nuss» shows the drawn Baumnuss; the acorn is called «Eichel» (23 Nov review).
  const wordArt={...R.wordArt,Bus:'bus',Hose:'trousers',Stern:'star',Topf:'vocab-pot',Nuss:'walnut'};
  const reading=['Maus','Haus','Hut','Rose','Nase','Fisch','Tisch','Ball','Baum','Boot','Kuh','Schuh','Bein','Stein','Buch','Hase','Dose','Nuss','Hose','Bus','Stern','Turm','Wurm','Tuch','Topf'];
  reading.forEach((text,i)=>add('friends-mouse','word-'+i,text,{kind:'reading',prompt:'Welches Bild passt zum Wort?',text,answer:wordArt[text],choices:[wordArt[text],wordArt[reading[(i+3)%reading.length]],wordArt[reading[(i+7)%reading.length]]]}));
  // A rhyme pair is unordered: Tisch/Fisch and Fisch/Tisch are the same task.
  // Keep the original distinct pairs and replace the nine reversed duplicates with new pictured words.
  const rhymes=C.pools.bird.map(t=>[t.target,t.answer,t.choices.find(c=>c!==t.answer)]).concat([
    ['Maus','Haus','Hut'],['Nuss','Bus','Baum'],['Boot','Brot','Maus'],['Biene','Schiene','Rose'],
    ['Schnecke','Decke','Ball'],['Sonne','Tonne','Kuh'],['Kanne','Tanne','Hut'],
    ['Mund','Hund','Stern'],['Dach','Bach','Schuh'],['Ziege','Fliege','Nase']
  ]);
  rhymes.forEach(([text,answer,wrong],i)=>add('friends-bird','rhyme-'+i,text+' – '+answer,{kind:'rhyme',prompt:'Welches Wort reimt sich?',text,picture:wordArt[text],answer,choices:[answer,wrong]}));
  C.pools.owl.forEach((t,i)=>{
    // Like the other short sentences, compare actions of the same animal.
    // The fish has no alternative action drawing; use the sleeping mouse instead.
    const q=i===4?{target:'Die Maus schläft.',answer:'mouse-sleep',choices:['mouse-sleep','mouse-run']}:t;
    add('friends-owl','sentence-'+i,q.target,{kind:'reading',prompt:'Welches Bild passt zum Satz?',text:q.target,answer:q.answer,choices:q.choices});
  });
  // Retain the saved IDs while replacing the two-sentence tasks with newly drawn action pairs.
  // Every task has the same one-sentence / two-picture format and compares actions of one animal.
  const animalActions=[
    ['Das Eichhörnchen sitzt.','squirrel-sit','squirrel-run'],
    ['Das Eichhörnchen rennt.','squirrel-run','squirrel-sit'],
    ['Der Igel läuft.','hedgehog-walk','hedgehog-sleep'],
    ['Der Igel schläft.','hedgehog-sleep','hedgehog-walk'],
    ['Der Dachs läuft.','badger-walk','badger-sleep'],
    ['Der Dachs schläft.','badger-sleep','badger-walk'],
    ['Das Reh steht.','roe-stand','roe-run'],
    ['Das Reh rennt.','roe-run','roe-stand'],
    ['Der Frosch sitzt.','frog-sit','frog-jump'],
    ['Der Frosch springt.','frog-jump','frog-sit']
  ];
  animalActions.forEach(([text,answer,wrong],i)=>add('friends-owl','pair-'+i,text,{kind:'reading',prompt:'Welches Bild passt zum Satz?',text,answer,choices:[answer,wrong]}));
  // The first two rows establish a repeated quantity pattern (two of A, one of B).
  // The incomplete last row alone cannot tell whether A or B needs repeating.
  const shapes=['forest-leaf','forest-nut','forest-feather'],shapeOrders=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
  for(let n=0;n<25;n++){
    const order=shapeOrders[n%6],line=[shapes[order[0]],shapes[order[0]],shapes[order[1]]],shift=1+Math.floor(n/6)%2,phase=Math.floor(n/12),hole=6+Math.floor(n/6)%3;
    const matrix=Array.from({length:9},(_,i)=>line[(i%3+Math.floor(i/3)*shift+phase)%3]);
    add('friends-beaver','matrix-'+n,'Waldreihe '+(n+1),{kind:'matrix',prompt:'Welcher Gegenstand fehlt?',matrix,gap:hole,answer:matrix[hole],choices:shapes});
  }
  // Additional rows with all three kinds, keeping the original 25 tasks verbatim.
  shapeOrders.forEach((order,n)=>[6,7,8].forEach(hole=>{
    const matrix=Array.from({length:9},(_,i)=>shapes[order[(i%3+Math.floor(i/3))%3]]);
    add('friends-beaver','matrix-three-'+n+'-'+hole,'Drei Gegenstände / Reihe '+(n+1)+' / Lücke '+(hole-5),{kind:'matrix',prompt:'Welcher Gegenstand fehlt?',matrix,gap:hole,answer:matrix[hole],choices:shapes});
  }));
  const extra={
    deer:[['Wo sammelt der Schmetterling Nektar?','flower','water','egg'],['Was knabbert der Biber ab?','tree','fish','egg'],['Was pickt der Vogel aus der Erde?','vocab-worm','boat','moon'],['Was frisst die Schnecke?','leaf','fish','egg'],['Wo sucht der Igel kleine Tiere?','leaf','cloud','moon'],['Was stellt die Biene aus Nektar her?','honey','cheese','egg'],['Wo kann der Frosch schwimmen?','water','cloud','tree'],['Was knabbert der Hase auf der Wiese?','leaf','moon','nest'],['Was hängt an einer Weinrebe?','grapes','egg','fish']],
    badger:[['Was braucht eine Pflanze zum Wachsen?','sun','moon','cheese'],['Was wird aus einer Apfelblüte?','apple','egg','snowman'],['Was wächst aus einem Samen in der Erde?','plant','fish','moon'],['Was sammelt das Eichhörnchen im Herbst?','forest-nut','egg','snowman'],['Was sehen wir bei klarem Himmel in der Nacht?','moon','sun','sunflower'],['Was wächst auf der Erdbeerpflanze?','strawberry','carrot','egg'],['Womit giessen wir die Pflanzen?','watering-can','fork','hat'],['Was wächst aus einer Eichel?','tree','cloud','snowman'],['Was ernten wir vom Birnbaum?','pear','fish','egg']]
  };
  // 23 November review: replace questions repeated in another Rätsel, off-topic questions and weak answer pictures.
  // Stable IDs keep their positions; only these Aufgaben change.
  const revised={
    deer:{
      11:['Wo wohnt der Biber?','beaver-lodge','ant-hill','nest'],
      13:['Wo wohnt der Dachs?','badger-sett','habitat-pond','nest'],
      14:['Wo wohnen viele Ameisen?','ant-hill','nest','habitat-pond'],
      16:['Wo wohnt der Fuchs?','fox-den-entrance','nest','habitat-pond'],
      20:['Wo wohnt der Waldkauz?','hollow-tree','habitat-pond','ant-hill'],
      21:['Was frisst das Reh gern?','red-clover','fish','cheese'],
      23:['Was knabbert der Hase auf der Wiese?','dandelion-flower','moon','nest'],
      24:['Was fressen die Vögel im Herbst?','rowan-sprig','cheese','fish']
    },
    badger:{
      1:['Was wird aus einer Kaulquappe?','frog-sit','fish-swim','bird'],
      7:['Was hängt im Winter vom Dach?','icicle','apple','flower'],
      9:['Was legt der Schmetterling auf ein Blatt?','butterfly-eggs','snowman','fish'],
      10:['Was siehst du, wenn am Abend die Sonne untergeht?','sunset','chick','bucket'],
      11:['Was fällt im Winter vom Himmel?','snowflake','sunflower','butterfly'],
      15:['Was wächst an der Eiche?','forest-nut','banana','fish'],
      18:['Welche Blume blüht im Frühling zuerst?','snowdrop','sunflower','forest-rose']
    }
  };
  const forestRiddles=[
    ["Wer hat Stacheln?","hedgehog","mouse-sit","fish-swim"],
    ["Wer hat einen blauen Kopf?","bird-sit","forest-robin","hare-sit"],
    ["Wer hat Flossen?","fish-swim","snail","hedgehog"],
    ["Wer ist gelb und schwarz?","bee","mouse-sit","frog-sit"],
    ["Wer trägt ein Haus?","snail","caterpillar","forest-owl"],
    ["Wer hat acht Beine?","spider","bird-sit","mouse-sit"],
    ["Wer hat bunte Flügel?","butterfly","vocab-worm","badger-walk"],
    ["Wer hat viele Beine?","caterpillar","snail","fish-swim"],
    ["Wer hat schwarze Punkte?","ladybird","bee","snail"],
    ["Wer hat lange Ohren?","hare-sit","hedgehog","bee"],
    ["Wer hält eine Eichel?","squirrel-nut","frog-sit","fish-swim"],
    ["Wer hat Streifen im Gesicht?","badger-walk","forest-fox","snail"],
    ["Wer hat einen breiten Schwanz?","beaver","hare-sit","snail"],
    ["Wer ist grün?","frog-sit","mouse-sit","badger-walk"],
    ["Wer hat Fühler?","ant","spider","hare-sit"],
    ["Wer hat einen dünnen Schwanz?","mouse-sit","squirrel-sit","forest-owl"],
    ["Wer hat eine weisse Schwanzspitze?","forest-fox","mouse-sit","snail"],
    ["Wer hat ein Geweih?","roe-stand","hare-sit","fish-swim"],
    ["Wessen Kopf ist oben rot?","forest-woodpecker","frog-sit","mouse-sit"],
    ["Wer hängt am Ast?","forest-bat","squirrel-sit","frog-sit"],
    ["Wer hat grosse Augen?","forest-owl","vocab-worm","ant"],
    ["Wer hat eine rote Brust?","forest-robin","bird-sit","snail"],
    ["Wer hat Flecken im Fell?","forest-lynx","forest-fox","bird-sit"],
    ["Wer hat einen hellen Hals?","forest-marten","vocab-worm","fish-swim"],
    ["Wer hat keine Beine?","vocab-worm","ant","hare-sit"]
  ];
  forestRiddles.forEach(([text,answer,wrong,other],i)=>add('friends-hedgehog','riddle-'+i,text,{kind:'reading',prompt:'Welches Tier passt?',text,answer,choices:[answer,wrong,other]}));
  for(const host of ['deer','badger']){
    const list=C.pools[host].map(t=>[t.target,t.answer,...t.choices.filter(c=>c!==t.answer)]).concat(extra[host]);
    for(const [index,question]of Object.entries(revised[host]))list[index]=question;
    list.forEach(([text,answer,...wrong],i)=>add('friends-'+host,'riddle-'+i,text,{kind:'reading',prompt:'Welches Bild passt zur Frage?',text,answer,choices:[answer,...wrong]}));
  }
  // Habitat questions need a visible place to swim, rather than a water droplet.
  for(const it of pools['friends-deer']){it.question.choices=it.question.choices.map(pic=>pic==='water'?'habitat-pond':pic);if(it.question.answer==='water')it.question.answer='habitat-pond';}
  const mouseWords=new Set(pools['friends-mouse'].map(it=>it.question.text));
  function addMouseWord(key,text,answer,choices){
    if(mouseWords.has(text))return;
    mouseWords.add(text);
    add('friends-mouse',key,text,{kind:'reading',prompt:'Welches Bild passt zum Wort?',text,answer,choices});
  }
  const animals=C.pools.frog.map(t=>t.answer==='nest'?['Ente','duck-swim']:t.answer==='egg'?['Fuchs','forest-fox']:['mushroom','forest-mushroom'].includes(t.answer)?['Eichhörnchen','squirrel-sit']:[t.target,t.answer]).concat([['Steinbock','alpine-ibex'],['Murmeltier','alpine-marmot'],['Storch','stork'],['Reiher','heron'],['Wildschwein','wild-boar'],['Maulwurf','mole'],['Libelle','dragonfly'],['Dachs','badger']]); // local animals instead of zoo animals (23 Nov)
  animals.forEach(([text,answer],i)=>addMouseWord('friends-frog-animal-'+i,text,answer,[answer,animals[(i+4)%animals.length][1],animals[(i+9)%animals.length][1]]));
  for(let n=6;n<=15;n++)for(let b=2;b<=4;b++)add('count',n+'-'+b,n+' Käfer, '+b+' Bienen',{kind:'count',prompt:'Wie viele Marienkäfer sind hier?',count:n,answer:n,choices:numeric(n),bugs:[...Array(n).fill('ladybird'),...Array(b).fill('bee'),...Array(2).fill('snail')]});
  // Sums 2–10; the ten-partners (sum 10) were added on 23 Nov.
  for(let a=1;a<=9;a++)for(let b=1;b<=10-a;b++)add('add',a+'-'+b,a+' + '+b,{kind:'add',item:'fish-swim',prompt:'Wie viele Fische sind es zusammen?',a,b,answer:a+b,choices:numeric(a+b)});
  const animalQuestions=[
    // Retired after the 22 November review; null keeps later stable IDs.
    null,
    null,
    ["Wer quakt am Teich?","frog","cat","dog"],
    ["Wer macht Honig aus Nektar?","bee","cow","fish"],
    ["Wer bellt?","dog-run","frog","snail"],
    ["Wer miaut?","cat","fish","pig"],
    ["Wer gibt uns Milch?","cow","bee","ant"],
    ["Wer baut ein Netz?","spider","bird","cow"],
    null,
    ["Wen schützt ein Panzer?","tortoise","rabbit","bee"],
    null,
    ["Wer entsteht aus einer Raupe?","butterfly","pig","fish"],
    ["Wer baut ein Nest im Baum?","bird","cow","pig"],
    null,
    ["Wer hat weiche Wolle?","sheep","fish","bee"],
    ["Wer hat einen buschigen Schwanz?","squirrel","spider","cow"],
    // 23 November: local animals of the Alps, woods and waters replace the savannah, zoo and polar animals.
    ["Wer klettert auf steile Felsen?","alpine-ibex","snail","fish"],
    ["Wer pfeift in den Bergen?","alpine-marmot","sheep","fish"],
    ["Wer wühlt mit der Schnauze im Waldboden?","wild-boar","bird","fish"],
    ["Welcher Vogel steht lange still im Wasser?","heron","forest-robin","forest-owl"],
    ["Wer schwimmt im Bach und fängt Fische?","otter","cow","sheep"],
    ["Wer hat durchsichtige Flügel?","dragonfly","snail","frog-sit"],
    ["Welcher Vogel hat lange rote Beine?","stork","forest-robin","forest-owl"],
    null,
    ["Wer baut einen Damm aus Ästen?","beaver","cat","bee"]
  ];
  animalQuestions.forEach((q,i)=>{if(!q)return;const [text,answer,wrong,other]=q;add('friends-hedgehog','nature-question-'+i,text,{kind:'reading',prompt:'Welches Tier passt?',text,answer,choices:[answer,wrong,other]});});
  for(let total=5;total<=10;total++)for(let filled=1;filled<total;filled++)add('rocket',total+'-'+filled,total+' insgesamt, '+filled+' besetzt',{kind:'fireflies',prompt:'Wie viele Fliegen fehlen noch?',total,filled,answer:total-filled,choices:numeric(total-filled,10)});
  for(let friends=2;friends<=4;friends++)for(let each=1;each<=Math.floor(20/friends);each++){
    add('picnic',friends+'-'+each,friends+' Freunde, '+(friends*each)+' Beeren',{kind:'picnic',prompt:'Teile alle Beeren gerecht auf.',friends,each,total:friends*each,answer:each});
  }
  // Twenty-one different distributions plus four partially filled, editable plates.
  for(const [friends,each,plates]of [[2,3,[1,0]],[2,4,[0,2]],[3,2,[1,0,0]],[4,2,[0,1,0,1]]])add('picnic','started-'+friends+'-'+each,'Begonnenes Picknick: '+friends+' × '+each,{kind:'picnic',prompt:'Teile alle Beeren gerecht auf.',friends,each,total:friends*each,plates,answer:each});
  const words=R.words.concat([['Ba-na-ne','banana'],['To-ma-te','tomato'],['Ka-me-ra','camera'],['Na-del','needle'],['Ga-bel','fork'],['Glo-cke','bell'],['Ka-rot-te','carrot'],['Wol-ke','cloud'],['Schau-fel','spade'],['Ku-chen','cake'],['Re-gen','rain'],['Vo-gel','bird-sit'],['Schne-cke','snail']]);
  // «Lokomotive» names the drawn engine (23 Nov review); later words widen the three- to five-syllable range.
  const syllableWords=words.concat([['Scho-ko-la-de','chocolate'],['Lo-ko-mo-ti-ve','steam-train'],['Was-ser-me-lo-ne','watermelon'],['Feu-er-wehr-au-to','fire-engine'],
    ['Son-nen-blu-me','sunflower'],['Ma-ri-en-kä-fer','ladybird'],['Eich-hörn-chen','squirrel-sit'],['Mur-mel-tier','alpine-marmot'],['Schild-krö-te','tortoise'],['Erd-bee-re','strawberry'],['Re-gen-bo-gen','rainbow-arch'],['Gän-se-blüm-chen','daisy']]);
  syllableWords.forEach(([w,picture],i)=>{
    const word=w.replaceAll('-',''),parts=w.split('-');
    add('syllable','word-'+i,word,{kind:'syllable',prompt:'Wie viele Silben hat das Wort?',word,picture,parts,answer:parts.length,choices:[0,1,2].map(i=>Math.max(1,Math.min(3,parts.length-1))+i)});
  });
  // Every eligible vowel position is a different spelling task. Distractors share the answer's case, so a capital never gives it away.
  // The wrong vowels rotate, so no vowel is offered only when it is the answer (23 Nov review).
  const vowelSet=['a','e','i','o','u'];let vowelTurn=0;
  // «e» is the most frequent gap, so it is also offered as a wrong choice for every other vowel.
  const vowelChoices=answer=>{const lower=answer.toLowerCase(),others=vowelSet.filter(v=>v!==lower&&v!=='e'),k=vowelTurn++%others.length,wrong=lower==='e'?[others[k],others[(k+1)%others.length]]:['e',others[k]];return [answer,...wrong.map(v=>answer===lower?v:v.toUpperCase())];};
  function vowelTasks(key,word,picture,keep=()=>true){
    Array.from(word).forEach((answer,index)=>{if(!/[aeiou]/i.test(answer)||/(au|ei|ie|eu|äu)/i.test(word.slice(Math.max(0,index-1),index+2))||!keep(answer))return;add('vowels',key+'-'+index,word+' / Lücke '+(index+1),{kind:'vowels',prompt:'Welcher Buchstabe fehlt?',word,picture,index,answer,choices:vowelChoices(answer)});});
  }
  words.forEach(([w,picture],i)=>{
    const word=w.replaceAll('-',''),parts=w.split('-'),choices=[picture,words[(i+4)%words.length][1],words[(i+9)%words.length][1]];
    addMouseWord('read-word-word-'+i,word,picture,choices);
    if(parts.length>1){const distractor=['ma','lo','su','ta','fe'].find(s=>!parts.some(p=>p.toLowerCase()===s)),chips=parts.concat(distractor);add('read-puzzle','word-'+i,word,{kind:'syllables',prompt:'Setze das Wort aus Silben zusammen.',word,picture,parts,chips,order:chips.map((_,n)=>n),answer:word});}
    vowelTasks('word-'+i,word,picture);
  });
  // More pictured words whose gap is a, i, o or u, so «e» is no longer the answer of most vowel tasks.
  for(const [word,picture]of [['Hut','hat'],['Wurm','vocab-worm'],['Turm','vocab-tower'],['Hund','dog-run'],['Mund','rhyme-mouth'],['Buch','book'],['Topf','vocab-pot'],['Hose','trousers'],['Dose','tin'],['Kopf','vocab-head'],['Ball','ball'],['Nase','nose'],['Tisch','vocab-table'],['Birne','pear'],['Kirsche','cherry'],['Zitrone','lemon']])
    vowelTasks('bild-'+word.toLowerCase(),word,picture,answer=>answer.toLowerCase()!=='e');
  // Fully authored routes (23 Nov review): in every Aufgabe the rocks block the straight way, so the Reh needs a detour of
  // at least two steps. Every free field stays reachable. The former opposite-corner routes never needed a detour.
  const routes=[
    [0,3,[1,6]],[0,3,[2,5]],[0,3,[1,5]],[0,3,[1,5,10]],[0,3,[2,6,10]],
    [15,12,[9,14]],[15,12,[10,13]],[15,12,[9,13]],[15,12,[5,9,14]],[15,12,[6,10,14]],
    [0,12,[4,9]],[0,12,[5,8]],[0,12,[4,5]],[0,12,[4,5,10]],[0,12,[8,9,10]],
    [15,3,[6,11]],[15,3,[7,10]],[15,3,[6,7]],[15,3,[5,6,11]],[15,3,[9,10,11]],
    [4,7,[0,5,10]],[4,7,[1,6,10]],[4,7,[0,5,9]],[4,7,[1,6,9]],
    [14,2,[5,6,11]],[14,2,[9,10,11]],[14,2,[3,5,6]],[14,2,[6,7,9]],
    [4,11,[5,10]],[13,2,[1,6]]
  ];
  // Keep the stable IDs «set-pair»; the five × six grid of IDs now names 30 individually authored routes.
  routes.forEach(([start,goal,obstacles],n)=>{const i=Math.floor(n/6),j=n%6;add('robot',i+'-'+j,'Weg '+(i+1)+' / '+(j+1),{kind:'robot',mode:'route',prompt:'Führe das Reh zum Wald.',size:4,start,goal,obstacles});});
  // «Zeitliche Abfolgen ordnen» (sequence) was retired after the 22 November review.
  const treasures=['forest-leaf','forest-feather','forest-mushroom','forest-stone','forest-berry','forest-nut','forest-apple','forest-flower'];
  for(let i=0;i<treasures.length;i++){
    const objects=Array.from({length:4},(_,n)=>treasures[(i+n)%treasures.length]),decoys=treasures.filter(id=>!objects.includes(id));
    for(let missing=0;missing<objects.length;missing++){
      const answer=objects[missing],choices=[answer,decoys[missing],decoys[(missing+1)%decoys.length]];
      add('treasure',i+'-'+missing,'Korb '+(i+1)+', fehlt: '+answer,{kind:'treasure',prompt:'Merke dir die vier Gegenstände.',objects,missing,answer,choices});
    }
  }
  // A given left neighbour is already on the card row, so it is never offered again (22 Nov review); three choices remain.
  const neighbourChoices=(n,given)=>{const c=Array.from(new Set([Math.max(0,n-2),n-1,n+1,n+2])).filter(v=>!(given==='left'&&v===n-1));if(c.length<3)c.push(n+3);return c;};
  for(let n=1;n<=18;n++)for(const given of [null,'left'])add('neighbours',n+'-'+(given||'both'),'Mitte '+n+(given?' / Vorgänger gegeben':''),{kind:'neighbours',prompt:given==='left'?'Welche Zahl kommt danach?':'Welche Zahlen kommen davor und danach?',n,given,answer:[n-1,n+1],choices:neighbourChoices(n,given)});
  for(let a=1;a<=10;a++)for(const b of [a,Math.max(1,a-1),Math.min(10,a+2)])if(!pools.compare?.some(t=>t.question.a===a&&t.question.b===b))add('compare',a+'-'+b,a+' und '+b,{kind:'compare',item:'fish-swim',prompt:'Wo sind mehr Fische?',a,b,answer:a===b?'equal':a>b?'left':'right',choices:['left','equal','right']});
  const mirrorMasks=[7,56,448,73,146,292,273,84,15,30,60,120,240,480,31,62,124,248,496,91,182,364,341,170,85,340,325,387,457,199];
  mirrorMasks.forEach((mask,n)=>{const left=Array.from({length:9},(_,i)=>i).filter(i=>mask&(1<<i));add('mirror','grid-'+mask,'Blattmuster '+(n+1),{kind:'mirror',prompt:'Ergänze rechts das Spiegelbild.',width:3,rows:3,left,answer:left.map(i=>Math.floor(i/3)*3+2-i%3).sort((a,b)=>a-b)});});
  // 23 November review: number cards stand in ascending order, so each Aufgabe gets its own window of numbers.
  // Across every pool the answer stands left, in the middle and right about equally often; its position never gives it away.
  const spread=key=>{let a=2166136261;for(let i=0;i<key.length;i++)a=Math.imul(a^key.charCodeAt(i),16777619);return a>>>0;};
  // Each Aufgabe's slot depends only on its own stable ID and a fixed per-pool salt, so adding or editing another Aufgabe never moves it
  // (and never reopens its review). The salts were chosen once so that every pool spreads its answers evenly (syllable words with one
  // or five syllables can only stand left or right).
  const slotSalts={'friends-squirrel':'5:',count:'39:',add:'24:',rocket:'39:',syllable:'2207:','neighbours-both':'25:','neighbours-left':'13:'};
  function balanceSlots(pool,items,slots,apply){for(const it of items){const allowed=slots(it);apply(it,allowed[spread(slotSalts[pool]+it.id)%allowed.length]);}}
  const numberWindows={'friends-squirrel':[0,20],count:[0,20],add:[0,20],rocket:[0,10],syllable:[1,5]};
  for(const [id,[min,max]]of Object.entries(numberWindows))balanceSlots(id,pools[id],it=>[0,1,2].filter(slot=>it.question.answer-slot>=min&&it.question.answer-slot+2<=max),(it,slot)=>{const start=it.question.answer-slot;it.question.choices=[start,start+1,start+2];});
  // Zahlennachbarn: the right neighbours appear at the start, in the middle or at the end of the card row; the shown numbers never repeat.
  const neighbourRows={null:[n=>[n-1,n+1,n+2,n+3],n=>[n-2,n-1,n+1,n+2],n=>[n-3,n-2,n-1,n+1]],left:[n=>[n+1,n+2,n+3],n=>[n-2,n+1,n+2],n=>[n-3,n-2,n+1]]};
  for(const given of [null,'left']){
   const rows=neighbourRows[given],items=pools.neighbours.filter(it=>it.question.given===given);
   balanceSlots('neighbours-'+(given||'both'),items,it=>[0,1,2].filter(slot=>rows[slot](it.question.n).every(v=>v>=0&&v<=20)),(it,slot)=>{it.question.choices=rows[slot](it.question.n);});
  }
  // Strip legacy generator bookkeeping: question identity belongs to the editorial item.
  for(const pool of Object.values(pools))for(const item of pool){delete item.question.id;delete item.question.round;}
  // The colour of the target stays the same within each set; the competing colours change.
  const flowerColours=[['rot','#bf5143'],['gelb','#deb845'],['blau','#5d91b4'],['rosa','#ce8a9b'],['weiss','#f8f4df'],['lila','#9874b1']];
  for(const colour of flowerColours){
    const others=flowerColours.filter(other=>other[0]!==colour[0]);
    for(let i=0;i<others.length;i++){
      const choices=[colour,others[i],others[(i+1)%others.length]];
      add('colour-words',choices.map(choice=>choice[0]).join('-'),'Farbe '+colour[0]+' zwischen '+choices.slice(1).map(choice=>choice[0]).join(' und '),{kind:'colours',prompt:'Welche Blume passt zum Satz?',text:'Die Blume ist '+colour[0]+'.',answer:colour[0],choices});
    }
  }
  // 24 Nov (owner): the six reading Rätsel are one Rätsel of Dachs. Every Aufgabe keeps its ID, so its
  // review follows it (tools/puzzle-layout-compatibility.cjs «merge» edges). Prompts are harmonised by text
  // type: word, sentence or question. Choice counts stay as authored (two-picture minimal pairs stay two).
  const readingParts=['friends-badger','friends-deer','friends-hedgehog','friends-owl','friends-mouse','colour-words'];
  const harmonised={'Welches Tier passt?':'Welches Bild passt zur Frage?','Welche Blume passt zum Satz?':'Welches Bild passt zum Satz?'};
  pools['friends-badger']=readingParts.flatMap(id=>pools[id]||[]).map(it=>{if(harmonised[it.question.prompt])it.question.prompt=harmonised[it.question.prompt];return it;});
  for(const id of readingParts.slice(1))delete pools[id];
  const canonical=v=>Array.isArray(v)?'['+v.map(canonical).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}':JSON.stringify(v);
  function hash(v){const s=canonical(v);let a=2166136261,b=5381;for(let i=0;i<s.length;i++){a=Math.imul(a^s.charCodeAt(i),16777619);b=Math.imul(b,33)^s.charCodeAt(i);}return (a>>>0).toString(16).padStart(8,'0')+(b>>>0).toString(16).padStart(8,'0');}
  function puzzle(id){const g=FK.friendsLibrary.catalogue().find(g=>g.id===id),m=meta[id];return g&&m?{...g,hostName:C.hosts[g.host].name,reference:m[0],competence:m[1],difficulty:m[2],displayDifficulty:m[3]||m[2],instruction:R.instructions[id]}:null;}
  const iterations=id=>clone(pools[id]||[]);
  const implementation=id=>(FK.puzzleImplementation||'unbuilt')+(FK.puzzleImplementations?':'+(FK.puzzleImplementations[id]||'unbuilt'):'');
  const reviewContract=id=>{const p=puzzle(id);return p?{id:p.id,host:p.host,screen:p.screen,instruction:p.instruction,difficulty:p.difficulty}:null;};
  const iterationRevision=(id,item)=>FK.puzzleIterationImplementations?hash({blueprint:2,implementation:(FK.puzzleImplementation||'unbuilt')+':'+(FK.puzzleIterationImplementations[item.id]||'unbuilt'),puzzle:reviewContract(id),item:{id:item.id,question:item.question}}):hash({blueprint:1,implementation:implementation(id),puzzle:puzzle(id),item});
  const puzzleRevision=id=>FK.puzzleIterationImplementations?hash({blueprint:2,puzzle:reviewContract(id),items:iterations(id).map(item=>[item.id,iterationRevision(id,item)])}):hash({blueprint:1,implementation:implementation(id),puzzle:puzzle(id),items:iterations(id)});
  // Build-time verification proves these older releases have identical puzzle definitions and presentation.
  const former=id=>FK.puzzleLegacyImplementations?.[id]||[];
  const formerIterationRevisions=(id,item)=>{if(FK.puzzleReviewCompatibility){const proof=FK.puzzleReviewCompatibility.iterations[item.id];return proof?.current===iterationRevision(id,item)?proof.former:[];}return former(id).map(impl=>hash({blueprint:1,implementation:impl,puzzle:puzzle(id),item}));};
  const formerPuzzleRevisions=id=>{if(FK.puzzleReviewCompatibility){const proof=FK.puzzleReviewCompatibility.puzzles[id];return proof?.current===puzzleRevision(id)?proof.former:[];}const p=puzzle(id),items=iterations(id);return former(id).map(impl=>hash({blueprint:1,implementation:impl,puzzle:p,items}));};
  const iterationRevisions=(id,item)=>[iterationRevision(id,item),...formerIterationRevisions(id,item)];
  const puzzleRevisions=id=>[puzzleRevision(id),...formerPuzzleRevisions(id)];
  function acceptsRevision(id,iteration,revision){const it=iteration?pools[id]?.find(it=>it.id===iteration):null;return !!revision&&(!iteration||!!it)&&(it?iterationRevisions(id,it):puzzleRevisions(id)).includes(revision);}
  function select(id,seed,previous=[]){const r=R.rng(seed);let pool=R.mix(iterations(id),r);
    if(id==='trace')pool=pool.filter(i=>seed%2?i.question.glyph===i.question.glyph.toLocaleUpperCase('de-CH'):i.question.glyph===i.question.glyph.toLocaleLowerCase('de-CH'));
    pool.sort((a,b)=>Number(previous.includes(a.id))-Number(previous.includes(b.id)));
    const chosen=[];for(const it of pool){if(it.question.glyph&&chosen.some(c=>c.question.glyph===it.question.glyph))continue;chosen.push(it);if(chosen.length===5)break;}return arrange(chosen,r);}
  // Number cards always read in ascending order, like the neighbours row; other choices are shuffled (23 Nov review).
  const numberKinds=new Set(['nuts','count','add','fireflies','syllable']);
  function arrange(items,r){return clone(items).map(item=>{const q=item.question;if(q.choices&&q.kind!=='neighbours'){q.choices=R.mix(q.choices,r);if(numberKinds.has(q.kind))q.choices.sort((a,b)=>a-b);}if(q.kind==='count')q.bugs=R.mix(q.bugs,r);if(q.kind==='syllables')q.order=R.mix(q.order,r);if(q.kind==='order')q.order=R.mix(q.order,r);return item;});}
  const prepare=(items,seed)=>arrange(items,R.rng(seed));
  function matchesSession(s){
    if(!Array.isArray(s.questions)||s.questions.length!==5||!Array.isArray(s.iterationIds)||s.iterationIds.length!==5||new Set(s.iterationIds).size!==5)return false;
    const normalize=q=>{const v=clone(q);if(v.choices)v.choices.sort((a,b)=>canonical(a).localeCompare(canonical(b)));if(v.bugs)v.bugs.sort();if(v.order)v.order.sort();return canonical(v);};
    return s.iterationIds.every((id,i)=>{const it=iterations(s.id).find(it=>it.id===id);return it&&normalize(it.question)===normalize(s.questions[i]);});
  }
  FK.puzzleCatalogue={matchesSession,meta,puzzle,iterations,canonical,hash,iterationRevision,puzzleRevision,iterationRevisions,puzzleRevisions,acceptsRevision,formerIterationRevisions,formerPuzzleRevisions,select,prepare};
})();
