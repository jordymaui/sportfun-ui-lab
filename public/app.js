import { profileOverview, callsPanel } from './research.js';
import { renderPlayerProfile } from './player-profile.js';
const $ = (selector) => document.querySelector(selector);
const isLocalPreview = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons = {
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
  users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 5a5 5 0 0 1 3 4v2"/>',
  arrows:'<path d="M4 8h16m-5-5 5 5-5 5M20 16H4m5-5-5 5 5 5"/>',
  trophy:'<path d="M7 3h10v6a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4M12 14v7m-5 0h10"/>',
  tv:'<rect x="4" y="7" width="16" height="13" rx="3"/><path d="m8 3 4 4 4-4"/>',
  share:'<path d="M12 16V3m-5 5 5-5 5 5M5 12H3v9h18v-9h-2"/>',
  football:'<circle cx="12" cy="12" r="9"/><path d="m12 7 5 4-2 6H9l-2-6ZM12 7V3m5 8 4-2m-6 8 2 3m-8-3-2 3m0-9L3 9"/>',
  chevron:'<path d="m9 5 7 7-7 7"/>',
  star:'<path d="m12 3 3 6 6 1-4.5 4.5L18 21l-6-3-6 3 1.5-6.5L3 10l6-1Z"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  link:'<path d="m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(2 0) scale(.9)"/>',
  edit:'<path d="m14 5 5 5M4 20l5-1L21 7l-5-5L4 14Z"/>'
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name]||icons.star}</svg>`;
const clubEmblem = (club) => `<svg class="club-emblem" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><text x="12" y="12" dy=".36em" text-anchor="middle" fill="#111118" font-family="Inter, sans-serif" font-size="13" font-weight="700">${escapeHtml(Array.from(club)[0]?.toUpperCase()||'F')}</text></svg>`;
let saved = {};
try { saved = JSON.parse(localStorage.getItem('sportfun-ui-lab') || '{}') || {}; } catch {}
const savedClub = typeof saved.club==='string'?saved.club.trim():'';
const state = {view:'manager',size:window.innerWidth>=1000?'desktop':'mobile',tab:'overview',name:typeof saved.name==='string'?saved.name:'ENDGAME',bio:typeof saved.bio==='string'?saved.bio:'Building a squad. Backing my picks.',club:savedClub&&savedClub!=='Your club'?savedClub:'Fulham',liked:false,player:0,playerTab:'selection',shareType:'picks',format:'square'};
const params = new URLSearchParams(location.search);
if(['manager','player','share'].includes(params.get('view'))) state.view=params.get('view');
if(params.has('name')) state.name=params.get('name').slice(0,24)||'ENDGAME';
// Migrate the previous demo identity in saved profiles and older preview links.
if(state.name==='Jordy')state.name='ENDGAME';
if(['manager','player','picks','pack','call'].includes(params.get('card')))state.shareType=params.get('card');
if(['0','1','2','3','4'].includes(params.get('player')))state.player=Number(params.get('player'));
const players = [
  {name:'Lamine Yamal',short:'L. Yamal',team:'Barcelona',position:'FWD',number:19,shirt:1,value:'486.20',change:'+8.4%',points:'142.8',form:[40,62,52,84,95]},
  {name:'Kylian Mbappé',short:'K. Mbappé',team:'Real Madrid',position:'FWD',number:10,shirt:2,value:'622.50',change:'+6.2%',points:'128.4',form:[80,45,67,94,75]},
  {name:'Bukayo Saka',short:'B. Saka',team:'Arsenal',position:'FWD',number:7,shirt:3,value:'354.80',change:'+4.1%',points:'116.2',form:[43,64,88,50,91]},
  {name:'Vitinha',short:'Vitinha',team:'PSG',position:'MID',number:17,shirt:4,value:'218.40',change:'+3.6%',points:'104.6',form:[41,57,73,54,83]},
  {name:'Alisson Becker',short:'Alisson',team:'Liverpool',position:'GK',number:1,shirt:5,value:'165.20',change:'+2.8%',points:'92.4',form:[45,75,60,85,70]}
];
const descriptions={manager:'Your identity, where you compete, career highlights and Calls. Based on your profile research notes.',player:'Player pages matched to your desktop and iOS references, with proposed Calls alongside the existing game layout.',share:'Picks results, pack pulls and Calls — each shared with your identity attached. Sample data throughout.'};
const stat=(label,value,extra='')=>`<div class="stat"><span class="stat-label">${label}</span><strong class="stat-value">${value}</strong>${extra?`<small>${extra}</small>`:''}</div>`;
const form=(values)=>`<span class="form-bars" aria-label="Illustrative recent form">${values.map((n,i)=>`<i style="height:${n}%;background:${i===1?'#fdb913':'#00c62d'}"></i>`).join('')}</span>`;
const shirt=(p,large=false)=>`<div class="${large?'large-shirt':'player-shirt'}"><img src="/assets/shirt-${p.shirt}.webp" alt="${p.team} shirt"><span>${p.number}</span></div>`;
function topbar(){
  $('#game-topbar').innerHTML=`<div class="game-sports" aria-label="Football selected · sport selector visual"><span class="sport-option selected"><span class="sport-mark football-mark" role="img" aria-label="Football selected"></span></span><span class="sport-option"><span class="sport-mark nfl-mark" role="img" aria-label="NFL"></span></span></div><nav class="game-desktop-links" aria-label="Profile prototype sections"><button data-section="overview">Profile</button><button data-section="squad">Squad</button><button data-section="calls">Calls</button><button data-view="share">Share</button></nav><div class="balances"><span class="currency"><b class="gold-coin">★</b> 9.52k</span><span class="currency"><b class="tp-coin">TP</b> 420</span></div><div class="game-utilities"><button class="game-utility" data-section="overview" aria-label="View competitive profile">${icon('trophy')}</button><button class="game-utility" data-action="media-preview" aria-label="Media prototype placeholder">${icon('tv')}</button><button class="top-avatar" data-view="manager" aria-label="Manager profile"><img src="/assets/endgame-avatar.png" alt=""></button></div>`;
  $('#game-bottomnav').innerHTML=[['manager','home','Home'],['manager','users','Roster'],['player','arrows','Trades'],['player','football','Live'],['manager','trophy','Leaderboard']].map(([view,glyph,label])=>`<button data-nav="${label}" data-target="${view}" aria-label="Preview ${label}">${icon(glyph)}<span>${label}</span></button>`).join('');
}
function manager(){
  return `<div class="manager-layout"><aside class="manager-identity"><div class="profile-hero"><div class="cover-art"><img class="profile-cover" src="/assets/endgame-cover-v1.png" alt="Cyan stadium lights and ENDGAME's white-haired anime character"></div><div class="profile-identity"><div class="avatar-wrap"><img src="/assets/endgame-avatar.png" alt="ENDGAME in-game avatar"><img class="avatar-rank" src="/assets/division.webp" alt="Diamond division"></div><span class="chip">DIAMOND DIVISION</span></div><div class="profile-copy"><h2 class="profile-name">${escapeHtml(state.name)}</h2><span class="handle">@${escapeHtml(state.name.toLowerCase().replace(/\s/g,'')||'manager')} · Manager since 2025</span><p class="profile-bio">${escapeHtml(state.bio)}</p><div class="club-line">${clubEmblem(state.club)} ${escapeHtml(state.club)} <span>SUPPORTED CLUB</span></div><div class="profile-actions"><button class="button primary" data-action="share-manager">${icon('share')} Share profile</button><button class="button secondary" data-action="edit">${icon('edit')} Edit</button></div></div></div></aside><section class="manager-main">
    <div class="stats-grid">${stat('SEASON RANK','#128','of 6,400 · 2026/27')}${stat('BEST RANK','#84','of 5,200 · 2025/26')}${stat('TOURNAMENTS','24','Career to date')}</div>
    <div class="profile-tabs" role="tablist" aria-label="Profile sections"><button role="tab" data-profile-tab="overview" aria-selected="${state.tab==='overview'}">Overview</button><button role="tab" data-profile-tab="squad" aria-selected="${state.tab==='squad'}">Squad <span>5</span></button><button role="tab" data-profile-tab="calls" aria-selected="${state.tab==='calls'}">Calls <span>1</span></button></div>
    ${state.tab==='overview'?profileOverview(state,{shirt,icon,escapeHtml,players}):state.tab==='calls'?callsPanel(state,{shirt,icon,escapeHtml,players}):`<div class="section-heading"><h3>My starting five</h3><span class="muted mono">DEMO LINEUP</span></div><div class="squad-list">${players.map((p,i)=>`<button class="player-row" data-player="${i}">${shirt(p)}<span class="player-detail"><strong>${p.short}</strong><small><span class="available-dot"></span>${p.team} <span>${p.position}</span></small></span>${form(p.form)}<span class="player-value"><strong>${p.points}</strong><small>POINTS</small></span>${icon('chevron')}</button>`).join('')}</div>`}
    <p class="empty-note">Concept screen · illustrative stats and squad</p></section></div>`;
}
function player(){return renderPlayerProfile(state,{players,shirt,icon,escapeHtml,callsPanel});}
const shareLabels={picks:'Picks result',pack:'Pack pull',call:'My Call',manager:'Manager profile',player:'Player spotlight'};
function share(){return `<div class="section-heading share-heading"><div><span class="eyebrow">YOUR MOMENT. YOUR NAME.</span><h2>Share your game.</h2></div>${icon('share')}</div><div class="share-workspace"><div class="share-preview"></div><div class="share-controls"><label class="field">Card content<select id="share-type">${Object.entries(shareLabels).map(([value,label])=>`<option value="${value}" ${state.shareType===value?'selected':''}>${label}</option>`).join('')}</select></label><div class="control-group"><span class="control-label">Format</span><div class="segmented"><button data-format="square" aria-pressed="${state.format==='square'}">Square 1:1</button><button data-format="story" aria-pressed="${state.format==='story'}">Story 9:16</button></div></div><button class="button primary" data-action="download">${icon('download')} Download PNG</button><button class="button secondary" data-action="copy">${icon('link')} Copy preview link</button><p class="muted share-disclaimer">Preview only. Nothing is posted to a social account.</p></div></div>`;}
let renderedScreen;
function render(){
  const screenKey=`${state.view}:${state.view==='manager'?state.tab:state.view==='player'?`${state.player}:${state.playerTab}`:''}`;
  document.querySelectorAll('button[data-view]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.view===state.view)));
  document.querySelectorAll('button[data-size]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.size===state.size)));
  document.querySelectorAll('[data-section]').forEach(el=>el.setAttribute('aria-current',state.view==='manager'&&el.dataset.section===state.tab?'page':'false'));
  const activeNav=state.view==='manager'?(state.tab==='squad'?'Roster':'Home'):state.view==='player'?'Trades':null;
  document.querySelectorAll('[data-nav]').forEach(el=>el.setAttribute('aria-current',el.dataset.nav===activeNav?'page':'false'));
  $('.device').dataset.size=state.size;
  $('.device').dataset.view=state.view;
  $('#screen-description').textContent=descriptions[state.view];
  $('#stage-label').textContent={manager:'MANAGER PROFILE',player:'PLAYER PROFILE',share:'SHARE COMPOSER'}[state.view];
  $('#screen').innerHTML=state.view==='manager'?manager():state.view==='player'?player():share();
  if(renderedScreen!==screenKey){$('#screen').scrollTop=0;window.scrollTo(0,0);}
  renderedScreen=screenKey;
  $('.game-bottomnav').hidden=state.view!=='manager';
  if(state.view==='share'){
    const preview=$('.share-preview');
    preview.innerHTML='<p class="muted">Preparing card…</p>';
    buildCard().then(canvas=>{
      canvas.setAttribute('role','img');canvas.setAttribute('aria-label',`${shareLabels[state.shareType]} share card — ${state.name} — concept with sample data`);
      canvas.className='share-canvas';preview.replaceChildren(canvas);
    }).catch(()=>{preview.innerHTML='<p class="muted">Could not render the preview. Try switching the card content.</p>';});
  }
}
let toastTimer;
function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,3500);}
function showReference(show){if(!isLocalPreview)return;const image=$('#reference-image');if(show&&!image.getAttribute('src'))image.src='/reference/roster.png';$('#reference-panel').hidden=!show;$('#reference-toggle').setAttribute('aria-expanded',String(show));}
document.addEventListener('click', async e=>{
  const el=e.target.closest('button');if(!el)return;
  if(el.dataset.view){state.view=el.dataset.view;render();}
  if(el.dataset.section){state.view='manager';state.tab=el.dataset.section;render();}
  if(el.dataset.size){state.size=el.dataset.size;render();}
  if(el.dataset.profileTab){state.tab=el.dataset.profileTab;render();}
  if(el.dataset.playerTab){state.playerTab=el.dataset.playerTab;render();}
  if(el.dataset.player!==undefined){state.player=Number(el.dataset.player);state.playerTab='selection';state.view='player';render();}
  if(el.dataset.format){state.format=el.dataset.format;render();}
  if(el.dataset.share){state.shareType=el.dataset.share;state.view='share';render();}
  if(el.dataset.nav){if(el.dataset.nav==='Home'){state.view='manager';state.tab='overview';render();}else if(el.dataset.nav==='Roster'){state.view='manager';state.tab='squad';render();}else if(el.dataset.nav==='Trades'){state.view='player';render();}else toast(`${el.dataset.nav} is outside this profile study.`);}
  if(el.id==='reference-toggle')showReference($('#reference-panel').hidden);
  if(el.id==='reference-close')showReference(false);
  if(el.id==='edit-close')$('#edit-dialog').close();
  switch(el.dataset.action){
    case 'share-manager':state.shareType='manager';state.view='share';render();break;
    case 'share-player':state.shareType='player';state.view='share';render();break;
    case 'like-call':state.liked=!state.liked;render();break;
    case 'media-preview':toast('Media is outside this profile study.');break;
    case 'player-trade-preview':toast('Visual preview only — no trade is placed.');break;
    case 'edit':$('#edit-form [name=name]').value=state.name;$('#edit-form [name=bio]').value=state.bio;$('#edit-form [name=club]').value=state.club;$('#edit-dialog').showModal();break;
    case 'copy':try{const u=new URL(location.href);u.search=new URLSearchParams({view:'share',card:state.shareType,name:state.name,player:String(state.player)});await navigator.clipboard.writeText(u.href);toast(isLocalPreview?'Local preview link copied. Works on this computer.':'Preview link copied.');}catch{toast('Clipboard unavailable. Copy the address from your browser.');}break;
    case 'download':el.disabled=true;try{await downloadCard();toast('PNG ready — check your downloads.');}catch{toast('The PNG could not be generated. Please try again.');}finally{el.disabled=false;}break;
  }
});
document.addEventListener('change',e=>{if(e.target.id==='share-type'){state.shareType=e.target.value;render();}if(isLocalPreview&&e.target.id==='reference-select'){const allowed=['roster','live-scores','leaderboard','rewards','reputation','mobile-roster','mobile-rewards','mobile-leaderboard-sheet','mobile-leaderboard','mobile-trades','player-overview','player-details','player-transactions','mobile-player-selection','mobile-player-news','mobile-player-market','mobile-player-statistics'];if(allowed.includes(e.target.value)){$('#reference-image').src=`/reference/${e.target.value}.png`;$('#reference-image').alt=`User-provided new Sport.Fun ${e.target.selectedOptions[0].textContent} screenshot`;}}});
$('#edit-form').addEventListener('submit',e=>{e.preventDefault();state.name=$('#edit-form [name=name]').value.trim()||'ENDGAME';state.bio=$('#edit-form [name=bio]').value.trim();state.club=$('#edit-form [name=club]').value.trim()||'Fulham';try{localStorage.setItem('sportfun-ui-lab',JSON.stringify({name:state.name,bio:state.bio,club:state.club}));}catch{}$('#edit-dialog').close();render();toast('Mock profile updated.');});
async function loadImage(url){const img=new Image();img.src=url;await img.decode();return img;}
async function buildCard(){
  const s={...state},p=players[s.shareType==='pack'?1:s.player],type=s.shareType;
  await document.fonts.ready;
  const W=1080,H=s.format==='story'?1920:1080,person=['manager','picks','call'].includes(type);
  const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const ctx=canvas.getContext('2d');
  ctx.fillStyle='#080a0f';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#111118';ctx.beginPath();ctx.roundRect(44,44,W-88,H-88,28);ctx.fill();
  ctx.strokeStyle='#232b34';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(75,165);ctx.lineTo(1005,165);ctx.stroke();
  const logo=await loadImage('/assets/wordmark.png');ctx.drawImage(logo,75,75,215,215*logo.height/logo.width);
  ctx.fillStyle='#7a8085';ctx.font='500 20px "DM Mono"';ctx.textAlign='right';ctx.fillText(shareLabels[type].toUpperCase(),1005,110);
  const center=H===1920?650:365;const img=await loadImage(person?'/assets/endgame-avatar.png':`/assets/shirt-${p.shirt}.webp`);
  if(type==='manager'){
    const cover=await loadImage('/assets/endgame-cover-v1.png'),coverY=center-175;
    ctx.save();ctx.beginPath();ctx.roundRect(75,coverY,930,240,18);ctx.clip();
    ctx.drawImage(cover,0,0,cover.width,cover.width*240/930,75,coverY,930,240);ctx.restore();
    ctx.fillStyle='#111118';ctx.beginPath();ctx.arc(540,center-80,98,0,Math.PI*2);ctx.fill();
  }
  if(person){ctx.save();ctx.beginPath();ctx.arc(540,center-80,90,0,Math.PI*2);ctx.clip();ctx.drawImage(img,450,center-170,180,180);ctx.restore();}else{const ratio=img.width/img.height;ctx.drawImage(img,540-130*ratio,center-220,260*ratio,260);ctx.fillStyle='#fff';ctx.font='800 52px Inter';ctx.textAlign='center';ctx.fillText(String(p.number),540,center-115);}
  const heading={manager:'DIAMOND DIVISION',picks:'MY BEST PICKS RESULT',pack:'MY BIGGEST PACK PULL',call:'ON LAMINE YAMAL',player:p.team.toUpperCase()}[type];
  ctx.textAlign='center';ctx.fillStyle='#7a8085';ctx.font='500 22px "DM Mono"';ctx.fillText(heading,540,center+75);
  ctx.fillStyle='#eff1f2';let size=72;const title=person?s.name:p.name;ctx.font=`750 ${size}px Inter`;while(ctx.measureText(title).width>900&&size>30){size-=2;ctx.font=`750 ${size}px Inter`;}ctx.fillText(title,540,center+160);
  const context={manager:'2026/27 season · 6,400 managers',picks:'Tournament 10 · Diamond division',pack:`Pulled by ${s.name} · Tournament 08`,call:'5 Nov 2026 · 18:42 UTC · Unedited',player:`Shared by ${s.name} · Tournament 10`}[type];
  ctx.fillStyle='#7a8085';ctx.font='400 25px Inter';ctx.fillText(context,540,center+215);
  const y=H===1920?1175:740;
  ctx.fillStyle='#18181f';ctx.beginPath();ctx.roundRect(75,y-75,930,230,24);ctx.fill();
  if(type==='call'){
    ctx.fillStyle='#eff1f2';ctx.font='500 36px Inter';ctx.textAlign='left';
    const words='“Backing Yamal for chance creation this week. His recent form makes him my first pick.”'.split(' ');let line='',lineY=y-20;
    for(const word of words){if(ctx.measureText(line+word).width>820){ctx.fillText(line.trim(),120,lineY);lineY+=49;line='';}line+=word+' ';}ctx.fillText(line.trim(),120,lineY);
    ctx.fillStyle='#7a8085';ctx.font='500 18px "DM Mono"';ctx.fillText(`${24+(s.liked?1:0)} LIKES · POPULARITY, NOT VERIFIED ACCURACY`,120,y+190);
  }else{
    const metrics={manager:['#128','SEASON RANK · 2026/27','#84','BEST RANK · 2025/26'],picks:['142.8','PICKS SCORE','96.4','SAME-DIVISION AVERAGE'],pack:['1,250','EST. GOLD VALUE AT PULL','PRO','PACK TYPE'],player:[p.points,'PERFORMANCE POINTS',p.change,'THIS WEEK']}[type];
    ctx.textAlign='left';ctx.fillStyle='#eff1f2';ctx.font='600 90px Inter';ctx.fillText(metrics[0],120,y+30);ctx.font='500 18px "DM Mono"';ctx.fillStyle='#7a8085';ctx.fillText(metrics[1],120,y+95);
    ctx.fillStyle=type==='picks'?'#7a8085':'#eff1f2';ctx.font='600 68px Inter';ctx.fillText(metrics[2],650,y+20);ctx.fillStyle='#7a8085';ctx.font='500 17px "DM Mono"';ctx.fillText(metrics[3],650,y+95);
    if(type==='picks'){ctx.fillStyle='#00c62d';ctx.beginPath();ctx.roundRect(120,y+122,740,7,4);ctx.fill();ctx.fillStyle='#484c4f';ctx.beginPath();ctx.roundRect(120,y+137,500,7,4);ctx.fill();}
  }
  ctx.fillStyle='#eff1f2';ctx.textAlign='left';ctx.font='600 21px Inter';const identity=`@${s.name.toLowerCase().replace(/\s/g,'')} · SPORT.FUN`;ctx.fillText(identity,75,H-55);ctx.fillStyle='#7a8085';ctx.textAlign='right';ctx.font='500 17px "DM Mono"';ctx.fillText('CONCEPT · SAMPLE DATA',1005,H-55);
  return canvas;
}
async function downloadCard(){
  const canvas=await buildCard();
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('No image');const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`sportfun-${state.shareType}-${state.format}-concept.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$('#reference-toggle').hidden=!isLocalPreview;
$('#environment-label').textContent=isLocalPreview?'LOCAL PROTOTYPE':'DESIGN PROTOTYPE';
topbar();render();
