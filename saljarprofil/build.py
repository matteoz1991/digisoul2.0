#!/usr/bin/env python3
"""Bygger säljarprofiler: data/<id>.json -> dist/s/<slug>/index.html (+ vCard).
   python3 build.py               bygg alla säljare
   python3 build.py --ny-slug anna  skriv ut en ny slumpad slug (anna-xxxxxx)
"""
import json, os, sys, html, shutil, secrets, datetime, glob
D=os.path.dirname(os.path.abspath(__file__)); E=html.escape
ALFABET='abcdefghjkmnpqrstuvwxyz23456789'   # utan lättförväxlade tecken

if len(sys.argv)==3 and sys.argv[1]=='--ny-slug':
    print(sys.argv[2]+'-'+''.join(secrets.choice(ALFABET) for _ in range(6))); sys.exit()

cfg=json.load(open(os.path.join(D,'config.json'),encoding='utf-8'))
tpl=open(os.path.join(D,'src','profil.template.html'),encoding='utf-8').read()
symbol=open(os.path.join(D,'src','symbol.svg'),encoding='utf-8').read().replace('<svg ','<svg aria-hidden="true" ',1)
dist=os.path.join(D,'dist'); sdir=os.path.join(dist,'s')
shutil.rmtree(dist,ignore_errors=True); os.makedirs(os.path.join(sdir,'_assets'))
for f in ['profil.css','profil.js']: shutil.copy(os.path.join(D,'src',f),os.path.join(sdir,'_assets',f))

def placeholder(v): return (not v) or ('[' in v)
def tel_href(t): return 'tel:'+''.join(c for c in t if c.isdigit() or c=='+').replace('0','+46',1) if t.startswith('0') else 'tel:'+t

def form_cfg(p):
    f=cfg['omdome_formular']; t=f.get('typ','ingen'); c={'typ':t,'fallback_epost':p['epost']}
    if t=='formspree': c['endpoint']=f['formspree_endpoint']
    elif t=='post': c['endpoint']=f['post_endpoint']
    elif t=='supabase': c.update(url=f['supabase_url'],anon_key=f['supabase_anon_key'],tabell=f['supabase_tabell'])
    elif t=='google_forms': c.update(action=f['google_forms_action'],falt=f['google_forms_falt'])
    action=c.get('endpoint') or c.get('action') or '#'
    return t,action,json.dumps(c,ensure_ascii=False).replace('</','<\\/')

built=[]
for jp in sorted(glob.glob(os.path.join(D,'data','*.json'))):
    if os.path.basename(jp).startswith('_'): continue
    p=json.load(open(jp,encoding='utf-8'))
    bas=p.get('bas_url') or cfg['bas_url']
    url=bas.rstrip('/')+cfg['profil_sokvag']+p['slug']
    # foto
    if p.get('foto'):
        foto=f'<img src="{E(p["foto"])}" alt="{E(p.get("foto_alt",p["namn"]))}" width="800" height="1000">'
    else:
        foto=f'<div class="ph" role="img" aria-label="Plats för foto av {E(p["namn"])}">{symbol}<span>FOTO KOMMER</span></div>'
    pres=''.join(f'<p>{E(s)}</p>' for s in p['presentation'])
    # knappar
    k=[]
    if placeholder(p.get('telefon')):
        k.append(f'<span class="button button-line is-placeholder" aria-disabled="true">Ring {E(p["namn"])} <small>{E(p.get("telefon") or "[TELEFON]")}</small></span>')
    else:
        k.append(f'<a class="button button-dark" href="{tel_href(p["telefon"])}">Ring {E(p["namn"])} <small>{E(p["telefon"])}</small></a>')
    k.append(f'<a class="button {"button-dark" if placeholder(p.get("telefon")) else "button-line"}" href="mailto:{E(p["epost"])}?subject={E("Hej "+p["namn"]+"!")}">Mejla <small>{E(p["epost"])}</small></a>')
    vcf_path=cfg['profil_sokvag'].rstrip('/')+'/'+p['slug']+'/'+p['id']+'.vcf'
    k.append(f'<a class="button button-line" href="{E(vcf_path)}" download>Spara kontakt <span class="button-dot" aria-hidden="true"></span></a>')
    k.append('<a class="button button-lime" href="#lamna">Lämna ett omdöme <span class="button-dot" aria-hidden="true"></span></a>')
    hj=''.join(f'<li><h3>{E(h["rubrik"])}</h3><p>{E(h["text"])}</p></li>' for h in p['hjalper_till_med'])
    up=''
    for u in p.get('uppdrag',[]):
        tags=''.join(f'<span>{E(t)}</span>' for t in u.get('taggar',[]))
        link=f'<a class="link" href="{E(u["url"])}" rel="noopener" target="_blank">Besök {E(u["url"].split("//")[-1].strip("/"))} <span aria-hidden="true">↗</span></a>' if u.get('url') else ''
        if not link and u.get('adress'):
            link=f'<span class="link">{E(u["adress"])}</span>'
        up+=f'<article class="case"><span class="tag">{E(u.get("typ","UPPDRAG").upper())}</span><h3>{E(u["namn"])}</h3><p>{E(u.get("beskrivning",""))}</p><div class="tags">{tags}</div>{link}</article>'
    for _ in range(int(p.get('uppdrag_platshallare',0))):
        up+='<article class="case empty" aria-label="Plats för kommande uppdrag"><span class="tag">KOMMANDE UPPDRAG</span><h3>Här visas nästa kund.</h3><p>Platsen fylls när uppdraget är klart och kunden har godkänt att synas.</p></article>'
    om=p.get('omdomen',[])
    if om:
        snitt=sum(int(o['betyg']) for o in om)/len(om)
        items=''.join(f'<article class="review"><div class="rstars" aria-label="{int(o["betyg"])} av 5">{"★"*int(o["betyg"])}{"☆"*(5-int(o["betyg"]))}</div><blockquote>{E(o["text"])}</blockquote><footer><b>{E(o["namn"])}</b>{", "+E(o["foretag"]) if o.get("foretag") else ""}{" · "+E(o["datum"]) if o.get("datum") else ""}</footer></article>' for o in om)
        omh=f'<div class="review-summary"><b>{snitt:.1f}</b><span>av 5 · {len(om)} omdöme{"n" if len(om)!=1 else ""}</span></div><div class="review-list">{items}</div>'
    else:
        omh=f'<div class="empty-reviews"><div class="rstars" aria-hidden="true">★★★★★</div><p>Inga omdömen ännu. Har du jobbat med {E(p["namn"])}? Bli först med att berätta hur det var.</p><a class="text-link" href="#lamna">Lämna ett omdöme</a></div>'
    t,action,fjson=form_cfg(p)
    v={'NAMN':E(p['namn']),'TITEL':E(p['titel']),'TITEL_LITEN':E(p['titel'].lower()),'BAS_URL':E(bas.rstrip('/')),'ASSET_BASE':E(cfg['profil_sokvag'].rstrip('/')+'/_assets/'),'SYMBOL':symbol,'FOTO':foto,
       'PRESENTATION':pres,'KNAPPAR':''.join(k),'HJALP':hj,'UPPDRAG':up,'OMDOMEN':omh,'FORM_ACTION':E(action),'FORM_TYP':E(t),
       'ID':E(p['id']),'SLUG':E(p['slug']),'AR':str(datetime.date.today().year),'FORM_CONFIG_JSON':fjson}
    h=tpl
    for kk,vv in v.items(): h=h.replace('{{'+kk+'}}',vv)
    assert '{{' not in h, 'oersatt platshållare i '+jp
    od=os.path.join(sdir,p['slug']); os.makedirs(od)
    open(os.path.join(od,'index.html'),'w',encoding='utf-8').write(h)
    vc=['BEGIN:VCARD','VERSION:3.0',f'N:;{p["namn"]};;;',f'FN:{p["namn"]}','ORG:Digisoul Media',f'TITLE:{p["titel"]}',f'EMAIL;TYPE=WORK:{p["epost"]}',f'URL:{bas.rstrip("/")}/']
    if not placeholder(p.get('telefon')): vc.append(f'TEL;TYPE=WORK,VOICE:{p["telefon"]}')
    vc.append('END:VCARD')
    open(os.path.join(od,p['id']+'.vcf'),'w',encoding='utf-8',newline='\r\n').write('\n'.join(vc)+'\n')
    built.append((p['id'],url,os.path.join(od,'index.html')))

for i,u,f in built: print(f'{i}: {u}\n   -> {f}')
print('Formulär:',cfg['omdome_formular']['typ'])
