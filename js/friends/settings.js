/* All settings entry points share this screen, including parent-controlled letter sessions. */
(function(){
  'use strict';
  const FK=window.FK,h=FK.h;
  let body,fallback,updateStatus,updateButton;
  function showUpdate(){
    if(!updateStatus)return;
    const s=FK.updates?.get()||{status:'idle',message:''};
    updateStatus.textContent=s.message;
    updateButton.disabled=['checking','downloading','reloading'].includes(s.status);
  }
  function state(){
    if(FK.friends)return FK.friends;if(fallback)return fallback;
    let storage;try{storage=window.localStorage;}catch{storage={getItem(){throw new Error('storage blocked');},setItem(){throw new Error('storage blocked');},removeItem(){}};}
    return fallback=window.FriendsState.create({storage,content:window.FriendsContent});
  }
  function download(name,data){const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));h('a',{href:url,download:name}).click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function toggle(label,checked,onChange){const input=h('input',{type:'checkbox','aria-label':label});input.checked=checked;input.addEventListener('change',()=>onChange(input));return h('label',{class:'ff-setting-toggle'},h('span',{text:label}),input);}
  const heading=(title,description)=>h('div',{class:'setting-head'},h('h2',{text:title}),description?h('p',{text:description}):null);
  FK.screen('audio-credits',{
    build(root){
      root.classList.add('ff-settings-screen');
      const cards=h('div',{class:'ff-settings-body'},document.getElementById('audio-credits-content').content.cloneNode(true));
      root.append(FK.ui.topbar({title:'Tonaufnahmen und Lizenzen',stars:false}),h('div',{class:'scroll'},cards));
    }
  });
  FK.screen('settings',{
    build(root){root.classList.add('ff-settings-screen');body=h('div',{class:'ff-settings-body'});root.append(FK.ui.topbar({title:'Einstellungen',stars:false}),h('div',{class:'scroll'},body));FK.on('updates',showUpdate);},
    enter(){
      const s=state();body.replaceChildren();
      const sounds=h('section',{class:'setting-card'},heading('Klänge im Wald','Vögel, Blätter und Bach begleiten das Spiel.'));
      for(const [name,label]of [['ambience','Waldgeräusche']])sounds.append(toggle(label,s.get().settings[name],input=>{if(!s.setting(name,input.checked))input.checked=s.get().settings[name];FK.emit('friends-audio');}));
      sounds.append(toggle('Spielklänge',FK.settings.get('sound')!==false,input=>FK.settings.set('sound',input.checked)));
      sounds.append(FK.ui.btn({label:'Tonaufnahmen und Lizenzen',onClick:()=>FK.go('audio-credits')}));
      // Letters per journey: a slider from 1 to 10 (a journey saved with more keeps its own limit until changed).
      const count=h('input',{type:'range',min:1,max:10,step:1,value:Math.min(10,s.get().settings.letterLimit),'aria-label':'Anzahl Briefe',class:'ff-letter-slider'}),countValue=h('output',{class:'ff-letter-count','aria-hidden':'true',text:String(count.value)});
      const sessionStatus=h('p',{class:'ff-letter-session-status',role:'status','aria-live':'polite'});
      const showSession=()=>{const m=s.mail();sessionStatus.textContent=s.error||('Diese Reise: '+m.session.completed+' von '+m.session.limit+' Briefen'+(m.phase==='finished'?' · beendet.':'.'));};
      // The painted fill follows the knob centre, whatever the browser draws natively.
      const fill=()=>count.style.setProperty('--fill',String((Number(count.value)-1)/9));fill();
      count.addEventListener('input',()=>{fill();countValue.textContent=count.value;count.setAttribute('aria-valuetext',count.value+(count.value==='1'?' Brief':' Briefe'));});
      count.addEventListener('change',()=>{fill();const value=Number(count.value);countValue.textContent=count.value;if(!s.setLetterLimit(value))sessionStatus.textContent=s.error||'Bitte 1 bis 10 Briefe wählen.';else showSession();});
      const begin=FK.ui.btn({label:'Neue Briefreise starten',onClick:async()=>{const value=Number(count.value);if(!Number.isInteger(value)||value<1||value>10)return;if(!FK.friendsStartSession)await import('./game.js');if(!FK.friendsStartSession(value))showSession();}});
      const letters=h('section',{class:'setting-card ff-letter-settings'},heading('Briefe pro Spielrunde',"Ein Brief ist ein Rätsel mit fünf Aufgaben. Danach geht der Fuchs in seinen Bau schlafen."),h('label',{class:'ff-letter-range'},h('span',{text:'Anzahl Briefe (1–10)'}),h('span',{class:'ff-letter-slider-row'},h('small',{text:'1'}),count,h('small',{text:'10'}),countValue)),h('p',{text:'Die Auswahl gilt für die nächste Briefreise. Eine begonnene Reise behält ihr Limit. Eine neue Reise beginnt immer im Bau; nach dem Schlafen können nur Erwachsene neu starten.'}),sessionStatus,begin);showSession();
      const logStatus=h('p',{class:'ff-log-status',role:'status','aria-live':'polite'}),devStatus=h('p',{class:'ff-dev-status',role:'status','aria-live':'polite'});
      const showLog=()=>{const log=s.logStatus;logStatus.textContent=(log.enabled?'':'Entwicklermodus aktiv: Spielprotokoll pausiert. ')+(log.error||(log.events+' Ereignisse auf diesem Gerät.'+(log.droppedPuzzleEvents?' Ältere Rätseldaten wurden gekürzt.':log.droppedWorldEvents||log.summarizedMovementEvents?' Ältere Wege im Wald wurden zusammengefasst.':log.truncated?' Einträge älter als 45 Tage wurden entfernt.':'')));};
      const records=h('section',{class:'setting-card ff-data-settings ff-developer-settings'},heading('Spielprotokoll und Entwicklermodus'),h('p',{text:'Aufgaben, Antworten, Versuche, aktive Bearbeitungszeiten und Wege helfen, Ablauf und Schwierigkeit zu verbessern. Das Protokoll bleibt auf diesem Gerät. Keine Namen, Bilder, Tonaufnahmen oder automatischen Uploads.'}),
        logStatus,h('p',{class:'ff-setting-note',text:'Der JSON-Export enthält Aufgabenbeschreibungen und Zusammenfassungen für eine KI-Auswertung. Aufbewahrung: bis zu 45 Tage. Wird der Speicher knapp, werden zuerst ältere Wege im Wald zusammengefasst und gekürzt; Rätseldaten werden zuletzt gekürzt.'}),h('div',{class:'setting-buttons'},
        FK.ui.btn({label:'Protokoll für KI exportieren',onClick:()=>{download('waldpost-spielprotokoll-'+new Date().toISOString().slice(0,10)+'.json',s.exportLog());showLog();}}),
        FK.ui.btn({label:'Protokoll löschen',onClick:async()=>{if(await FK.ui.confirm('Lokales Spielprotokoll löschen?','Protokoll löschen','Behalten',{danger:true})){s.clearLog();showLog();}}})),
        h('p',{class:'ff-setting-note',text:"Das Löschen betrifft nur das Protokoll. Briefreise, Aufgaben, Einstellungen und Rätsel-Freigaben bleiben erhalten."}),h('section',{class:'ff-developer-panel'},h('h3',{text:'Entwicklermodus'}),toggle('Entwicklermodus',FK.playLog.development(),async input=>{devStatus.textContent=input.checked?'Die Entwicklerversion wird geöffnet …':'';const message=await FK.playLog.setDevelopment(input.checked);if(message){input.checked=FK.playLog.development();devStatus.textContent=message;}showLog();}),devStatus,
          h('p',{class:'ff-setting-note',text:FK.DEV_SITE?'Dies ist die Entwicklerversion mit Rätsel-Prüfung und eigenem Spielstand. Ausschalten führt zur Kinderversion zurück. Nach zwei Minuten im Hintergrund oder beim nächsten Öffnen der App startet wieder die Kinderversion.':'Öffnet die Entwicklerversion mit Rätsel-Prüfung und eigenem Spielstand. Spielstand und Spielprotokoll dieser Kinderversion bleiben unverändert. Beim nächsten Öffnen der App startet wieder die Kinderversion.'})));showLog();
      updateButton=FK.ui.btn({label:'Nach Updates suchen',onClick:()=>FK.updates.check()});
      updateStatus=h('p',{class:'ff-update-status',role:'status','aria-live':'polite'});
      const updates=h('section',{class:'setting-card ff-update-settings'},heading('App-Version'),h('p',{class:'ff-settings-version',text:FK.APP_NAME+' '+FK.VERSION+(FK.CHANNEL==='main'?'':' · Entwicklung '+FK.DEV_VERSION)}),updateButton,updateStatus);
      // The children's version has no review function: it shows the Rätsel released with it (Rätsel-Galerie only).
      const reviewing=FK.CHANNEL!=='main';
      const review=h('section',{class:'setting-card ff-puzzle-review-settings'},heading(reviewing?"Rätsel-Galerie und Rätsel-Prüfung":"Rätsel-Galerie"),h('p',{text:reviewing?"Galerie: freigegebene Rätsel nach Freund ansehen und eine Runde mit fünf Aufgaben spielen. Prüfung: jede Aufgabe vor dem Spielen prüfen und freigeben. Kinder rätseln nur beim Freund auf ihrem Brief.":"Freigegebene Rätsel nach Freund ansehen und eine Runde mit fünf Aufgaben spielen. Kinder rätseln nur beim Freund auf ihrem Brief. Geprüft und freigegeben wird in der Entwicklerversion."}),h('div',{class:'setting-buttons'},FK.ui.btn({label:"Rätsel-Galerie",onClick:()=>FK.puzzleReview.openGallery()}),...(reviewing?[FK.ui.btn({label:"Rätsel-Prüfung",onClick:()=>FK.puzzleReview.open()})]:[])));
      // Release review R-1: without any released Rätsel (usually the review data could not be loaded) the den has no letter.
      if(FK.puzzleReview&&!FK.friendsLibrary?.catalogue().some(g=>FK.puzzleReview.ready(g.id)))review.append(h('p',{class:'ff-setting-note ff-review-missing',role:'status',text:reviewing?"Noch ist kein Rätsel freigegeben, deshalb liegt kein Brief im Fuchsbau. Meist fehlen die Prüfdaten: Bitte das Gerät mit dem Internet verbinden. Sobald die Freigaben geladen sind, kommt der Brief.":"Diese Version enthält kein freigegebenes Rätsel, deshalb liegt kein Brief im Fuchsbau."}));
      body.append(letters,sounds,review,records,updates);showUpdate();
    },
    leave(){}
  });
})();
