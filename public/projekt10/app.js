const content = {
 es: [
  {label:'Comida casera & tapas',title:'La mejor excusa para quedarse.',text:'Comida casera a buenos precios, para disfrutar sin prisas. Nuestra carta irá creciendo: pregunta por los platos y las tapas disponibles hoy.',tags:['Para compartir','Sabor mediterráneo','Pregunta en barra'],image:'bar-detail',alt:'La barra de El Marinero'},
  {label:'Desayunos sencillos',title:'Empieza el día junto al puerto.',text:'Un desayuno sencillo a buen precio antes de salir a navegar o descubrir Torrevieja. Pregunta en el bar por las opciones disponibles y empieza el día sin prisas.',tags:['Una pausa','Junto al puerto'],image:'terrace-front',alt:'La terraza de El Marinero'},
  {label:'Bebidas',title:'Brindemos por estar aquí.',text:'Una bebida fría en la terraza o un café en la barra. Elige tu momento y pregunta por nuestra selección de bebidas.',tags:['Café','Bebidas frías','En la terraza'],image:'bar',alt:'Bebidas en la barra de El Marinero'},
  {label:'Para llevar',title:'Buen sabor, donde tú quieras.',text:'Llévate algo para continuar tu día en el puerto. Consulta en el local las opciones disponibles para llevar y prepara tu próxima escapada.',tags:['Para el paseo','Para el barco','Pregunta en el local'],image:'facade',alt:'Entrada a El Marinero'}
 ],
 en: [
  {label:'Home-cooked food & tapas',title:'A good reason to stay a while.',text:'Home-cooked food at great prices, with time to enjoy it. Our menu will keep growing: ask about the dishes and tapas available today.',tags:['Made for sharing','Mediterranean flavours','Ask at the bar'],image:'bar-detail',alt:'The bar at El Marinero'},
  {label:'Simple breakfasts',title:'Start your day by the harbour.',text:'A simple breakfast at a great price before setting sail or discovering Torrevieja. Ask at the bar for the available options and ease into your day.',tags:['Take a break','By the harbour'],image:'terrace-front',alt:'El Marinero terrace'},
  {label:'Drinks',title:'Here’s to being here.',text:'A cold drink on the terrace or a coffee at the bar. Find your moment and ask about our selection of drinks.',tags:['Coffee','Cold drinks','On the terrace'],image:'bar',alt:'Drinks at the El Marinero bar'},
  {label:'Takeaway',title:'Good flavours, wherever you go.',text:'Pick up something for the rest of your day at the harbour. Ask in the bar about our available takeaway options before your next adventure.',tags:['For your walk','For the boat','Ask in the bar'],image:'facade',alt:'El Marinero entrance'}
 ]
};
const photos=[{file:'facade',es:'Bienvenidos a El Marinero',en:'Welcome to El Marinero'},{file:'bar',es:'Nuestra barra',en:'Our bar'},{file:'terrace',es:'Un ratito en la terraza',en:'A moment on the terrace'},{file:'marina',es:'La vida en el puerto',en:'Harbour life'},{file:'nautical',es:'Alma marinera',en:'A nautical soul'}];
for(const code of ['sv','fi']){content[code]=extraMenus[code].map((v,i)=>({label:v[0],title:v[1],text:v[2],tags:v[3],image:content.en[i].image,alt:languageUI[code].photos[i===1?2:i===3?0:1]}));}
for(const code of Object.keys(languageUI)){photos.forEach((p,i)=>p[code]=languageUI[code].photos[i]);}
let lang='en',activeTab=0,photoIndex=0;
const tabs=document.querySelector('.menu-tabs'),panel=document.querySelector('#menu-panel'),dialog=document.querySelector('#lightbox');
function renderMenu(){tabs.innerHTML=content[lang].map((v,i)=>`<button id="tab-${i}" role="tab" aria-selected="${i===activeTab}" aria-controls="menu-panel" tabindex="${i===activeTab?0:-1}" data-tab="${i}">${v.label}</button>`).join('');const v=content[lang][activeTab];panel.setAttribute('aria-labelledby',`tab-${activeTab}`);panel.innerHTML=`<div class="menu-content"><div class="menu-feature"><img src="assets/${v.image}.jpg" alt="${v.alt}" loading="lazy"></div><div class="menu-description"><h3>${v.title}</h3><p>${v.text}</p><ul>${v.tags.map(t=>`<li>${t}</li>`).join('')}</ul></div></div>`;}
function renderGallery(){document.querySelector('.gallery-grid').innerHTML=photos.map((v,i)=>`<button data-photo="${i}" aria-label="${languageUI[lang].open}: ${v[lang]}"><img src="assets/${v.file}.jpg" alt="${v[lang]}" loading="lazy"><span>${v[lang]}</span></button>`).join('')}
function setLanguage(){
 const ui=languageUI[lang];document.documentElement.lang=lang;
 document.querySelectorAll('[data-es]').forEach(el=>el.innerHTML=el.dataset[lang]||el.dataset.en);
 document.querySelector('#language').value=lang;
 document.querySelector('#language').setAttribute('aria-label',ui.language);
 document.title='El Marinero · '+ui.title;
 document.querySelector('.photo-label strong').textContent=ui.favourite;
 document.querySelector('.photo-label>span').textContent=ui.welcome;
 document.querySelector('.visit-copy>.eyebrow').textContent=ui.visit;
 document.querySelector('.hero-copy>.eyebrow').textContent=ui.tagline;
 document.querySelector('nav').setAttribute('aria-label',ui.nav);
 document.querySelector('#nav-toggle').setAttribute('aria-label',ui.menu);
 tabs.setAttribute('aria-label',ui.categories);
 document.querySelector('.skip').textContent=ui.skip;
 const frame=document.querySelector('.map-wrap iframe');if(frame)frame.title=ui.map;
 for(const [id,key] of [['close-lightbox','close'],['prev-photo','prev'],['next-photo','next']])document.getElementById(id).setAttribute('aria-label',ui[key]);
 document.querySelector('meta[name="description"]').content=document.querySelector('.intro').textContent;
 renderMenu();renderGallery();if(dialog.open)showPhoto();
}
document.querySelector('#language').addEventListener('change',e=>{lang=e.target.value;setLanguage()});
tabs.addEventListener('click',e=>{const button=e.target.closest('[data-tab]');if(!button)return;activeTab=Number(button.dataset.tab);renderMenu();document.querySelector(`#tab-${activeTab}`).focus()});
tabs.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();activeTab=e.key==='Home'?0:e.key==='End'?3:(activeTab+(e.key==='ArrowRight'?1:3))%4;renderMenu();document.querySelector(`#tab-${activeTab}`).focus()});
const navToggle=document.querySelector('#nav-toggle');function closeNav(){document.querySelector('nav').classList.remove('open');navToggle.setAttribute('aria-expanded','false')};navToggle.addEventListener('click',()=>{const open=document.querySelector('nav').classList.toggle('open');navToggle.setAttribute('aria-expanded',String(open))});document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',closeNav));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav()});
function showPhoto(){const p=photos[photoIndex];dialog.querySelector('img').src=`assets/${p.file}.jpg`;dialog.querySelector('img').alt=p[lang];dialog.querySelector('p').textContent=p[lang];document.querySelector('#photo-count').textContent=`${photoIndex+1} / ${photos.length}`}
document.querySelector('.gallery-grid').addEventListener('click',e=>{const b=e.target.closest('[data-photo]');if(!b)return;photoIndex=Number(b.dataset.photo);showPhoto();dialog.showModal();document.body.style.overflow='hidden'});document.querySelector('#close-lightbox').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.style.overflow='');dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});function movePhoto(n){photoIndex=(photoIndex+n+photos.length)%photos.length;showPhoto()}document.querySelector('#prev-photo').addEventListener('click',()=>movePhoto(-1));document.querySelector('#next-photo').addEventListener('click',()=>movePhoto(1));dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')movePhoto(-1);if(e.key==='ArrowRight')movePhoto(1)});
document.querySelectorAll('.maps-link').forEach(a=>a.href='https://www.google.com/maps/dir/?api=1&destination=el+Marinero+Torrevieja&destination_place_id=ChIJIbrm4r0HYw0RSgeAv3BXnUA');document.querySelectorAll('.listing-link').forEach(a=>a.href='https://www.google.com/maps/search/?api=1&query=el+Marinero+Torrevieja&query_place_id=ChIJIbrm4r0HYw0RSgeAv3BXnUA');document.querySelector('#year').textContent=new Date().getFullYear();window.addEventListener('scroll',()=>document.querySelector('header').classList.toggle('scrolled',scrollY>20),{passive:true});setLanguage();
