/* Omdömesformulär. Mottagare väljs i config.json (omdome_formular.typ) och byggs in som window.OMDOME_CONFIG. */
(function(){
  var form=document.getElementById('omdome-form'); if(!form) return;
  var cfg=window.OMDOME_CONFIG||{typ:'ingen'};
  var status=form.querySelector('.form-status');
  var fallback=form.querySelector('.form-fallback');
  function say(msg,cls){status.textContent=msg;status.className='form-status '+(cls||'');}
  function offerEmail(d){
    var body='Omdöme för '+d.saljare+'\n\nBetyg: '+d.betyg+' av 5\nNamn: '+d.namn+'\nFöretag: '+(d.foretag||'Ej angivet')+'\n\n'+d.text+'\n\nJag godkänner att mitt omdöme, namn och företag får visas på profilsidan.';
    fallback.href='mailto:'+(cfg.fallback_epost||'info@digisoul.se')+'?subject='+encodeURIComponent('Omdöme för '+d.saljare)+'&body='+encodeURIComponent(body);
    fallback.hidden=false;
  }
  function data(){var f=new FormData(form);return{
    betyg:f.get('betyg'),namn:(f.get('namn')||'').trim(),foretag:(f.get('foretag')||'').trim(),
    text:(f.get('text')||'').trim(),samtycke:f.get('samtycke')==='ja',saljare:f.get('saljare'),profil:f.get('profil'),gotcha:f.get('_gotcha')}}
  function send(d){
    switch(cfg.typ){
      case 'digisoul':
        return fetch(cfg.endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
          body:JSON.stringify({...d,betyg:Number(d.betyg)})})
          .then(function(r){return r.json().then(function(result){if(!r.ok||!result.ok) throw new Error(result.message||'Kunde inte skicka omdömet.');});});
      case 'formspree': case 'post':
        var fd=new FormData(form);
        return fetch(cfg.endpoint,{method:'POST',body:fd,headers:{'Accept':'application/json'}})
          .then(function(r){if(!r.ok) throw new Error('HTTP '+r.status);});
      case 'supabase':
        return fetch(cfg.url.replace(/\/$/,'')+'/rest/v1/'+cfg.tabell,{method:'POST',
          headers:{'apikey':cfg.anon_key,'Authorization':'Bearer '+cfg.anon_key,'Content-Type':'application/json','Prefer':'return=minimal'},
          body:JSON.stringify({saljare:d.saljare,profil:d.profil,betyg:parseInt(d.betyg,10),namn:d.namn,foretag:d.foretag||null,text:d.text,samtycke:d.samtycke})})
          .then(function(r){if(!r.ok) throw new Error('HTTP '+r.status);});
      case 'google_forms':
        var g=new URLSearchParams(), m=cfg.falt||{};
        ['betyg','namn','foretag','text','saljare'].forEach(function(k){if(m[k]) g.append(m[k],d[k]||'');});
        return fetch(cfg.action,{method:'POST',mode:'no-cors',body:g}); /* svaret går inte att läsa (no-cors) */
      default:
        return Promise.reject(new Error('ingen-mottagare'));
    }
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();
    fallback.hidden=true;
    var d=data();
    if(d.gotcha){say('Tack!','ok');return;}
    if(!d.betyg){say('Välj ett betyg mellan 1 och 5.','err');return;}
    if(!d.namn||!d.text){say('Fyll i namn och omdöme.','err');return;}
    if(!d.samtycke){say('Kryssa i att omdömet får visas.','err');return;}
    var btn=form.querySelector('button[type=submit]'); btn.disabled=true; say('Skickar …');
    send(d).then(function(){form.reset();say('Tack för ditt omdöme! Det visas här när det har godkänts.','ok');})
      .catch(function(err){
        if(err.message==='ingen-mottagare'){say('Formuläret är inte kopplat ännu. Mejla gärna ditt omdöme till '+(cfg.fallback_epost||'oss')+'.','err');}
        else{say('Omdömet kunde inte skickas automatiskt. Du kan öppna det i ditt e-postprogram i stället.','err');}
        offerEmail(d);
      }).then(function(){btn.disabled=false;});
  });
})();
