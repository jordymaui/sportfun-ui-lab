import { getClubBadge } from './club-badges.js';

const performanceScores = [72, 64, 91, 38, 55, 84, 79, 66, 110, 95];
const priceSamples = ['0.0288', '0.0364', '0.0246', '0.0192', '0.0168'];
// Named examples for this UI study, not actual past or upcoming schedules.
const exampleOpponentsByTeam = {
  Barcelona: [['Real Madrid','RMA'], ['Atlético Madrid','ATM'], ['Villarreal','VIL'], ['Valencia','VAL']],
  'Real Madrid': [['Barcelona','BAR'], ['Athletic Club','ATH'], ['Real Betis','BET'], ['Villarreal','VIL']],
  Arsenal: [['Fulham','FUL'], ['Tottenham Hotspur','TOT'], ['Manchester City','MCI'], ['Chelsea','CHE']],
  PSG: [['Marseille','MAR'], ['Lyon','LYO'], ['AS Monaco','MON'], ['Benfica','BEN']],
  Liverpool: [['Arsenal','ARS'], ['Manchester United','MUN'], ['Newcastle United','NEW'], ['Brighton & Hove Albion','BHA']],
};

function exampleOpponentsFor(team) {
  const ownBadge = getClubBadge(team);
  const entry = Object.entries(exampleOpponentsByTeam).find(([name]) => getClubBadge(name) === ownBadge);
  return (entry?.[1] || []).map(([name, short]) => ({name, short, badge: getClubBadge(name)}))
    .filter(opponent => opponent.badge && opponent.badge !== ownBadge);
}

function performanceChart(index, opponents, escapeHtml, compact = false) {
  if (!opponents.length) return '<p class="pp-data-note">No example opponents selected for this club.</p>';
  const values = performanceScores.map((value, i) => Math.max(20, value - index * 3 + (i % 3) * index));
  const width = compact ? 340 : 620, height = compact ? 280 : 390;
  const base = height - 23, first = compact ? 111 : 123, step = compact ? 23 : 49;
  const barWidth = compact ? 14 : 31, radius = compact ? 6.5 : 13;
  const gradientPrefix = compact ? 'ppBarMobile' : 'ppBarDesktop';
  return `<svg class="pp-performance-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Illustrative performance scores across sample months. Opponents: ${escapeHtml(opponents.map(opponent => opponent.name).join(', '))}.">
    <defs>${[['Green','#22c55e'],['Amber','#ffb300'],['Red','#ed291e']].map(([key,color])=>`<linearGradient id="${gradientPrefix}${key}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${color}" stop-opacity=".52"/><stop offset="1" stop-color="${color}" stop-opacity=".045"/></linearGradient>`).join('')}</defs>
    ${[[first-step/2,'SEP'],[first+step/2,'OCT'],[first+step*8.5,'NOV']].map(([x,month])=>`<path d="M${x} 12V${height-4}" stroke="#484c4f" stroke-width=".7"/><text x="${x+3}" y="21" fill="#7a8085" font-size="${compact?7:9}">${month}</text>`).join('')}
    ${values.map((value, i) => {
      const x = first + i * step;
      const barHeight = value / 120 * (height - 52);
      const top = base - barHeight;
      const color = value >= 70 ? '#22c55e' : value >= 50 ? '#ffb300' : '#ed291e';
      const gradient = value >= 70 ? 'Green' : value >= 50 ? 'Amber' : 'Red';
      const opponent = opponents[i % opponents.length];
      const matchLabel = escapeHtml(`Example match vs ${opponent.name} (${i % 2 ? 'away' : 'home'}): ${value} points`);
      const badgeSize = compact ? 18 : 34;
      return `<g><title>${matchLabel}</title><rect x="${x-barWidth/2}" y="${top}" width="${barWidth}" height="${barHeight+13}" rx="${barWidth/2}" fill="url(#${gradientPrefix}${gradient})"/>
        <circle cx="${x}" cy="${top+radius+3}" r="${radius}" fill="${color}"/>
        <text x="${x}" y="${top+radius+(compact?5:6.5)}" text-anchor="middle" fill="${gradient==='Amber'?'#111118':'#eff1f2'}" font-size="${compact?5.8:8.8}" font-weight="600">${value}</text>
        <image href="${opponent.badge}" x="${x-badgeSize/2}" y="${height-badgeSize-2}" width="${badgeSize}" height="${badgeSize}" aria-label="${escapeHtml(opponent.name)} club badge"/>
      </g>`;
    }).join('')}
  </svg>`;
}

function historyChart() {
  const values = [0, 42, 105, 0, 0, 121, 0, 148, 0, 0];
  return `<svg class="pp-history-svg" viewBox="0 0 620 260" role="img" aria-label="Illustrative tournament history, sample points over ten tournaments">
    ${[0,50,100,150].map(value=>`<path d="M9 ${222-value*1.3}H554" stroke="#92969b" stroke-width=".7"/><text x="562" y="${226-value*1.3}" fill="#7a8085" font-size="10">${value}</text>`).join('')}
    ${values.map((value,i) => `<g><title>Example tournament ${i+1}: ${value} points</title>${value?`<rect x="${27+i*55}" y="${222-value*1.3}" width="10" height="${value*1.3}" rx="5" fill="#000"/>`:''}<text x="${32+i*55}" y="${value?215-value*1.3:214}" fill="#7a8085" font-size="9" text-anchor="middle">${value||'—'}</text><text x="${32+i*55}" y="246" fill="#7a8085" font-size="8" text-anchor="middle">T${String(i+1).padStart(2,'0')}</text></g>`).join('')}
  </svg>`;
}

function priceChart() {
  return `<svg class="pp-price-svg" viewBox="0 0 620 260" role="img" aria-label="Illustrative share price over time, not live market data">
    <g stroke="#484c4f" stroke-width=".7"><path d="M10 39H551M10 99H551M10 159H551M10 219H551"/></g>
    <path d="M10 166H36L58 109H219L242 183H357L380 139H515L538 80H560" fill="none" stroke="#68a7d1" stroke-width="2.1" stroke-linejoin="miter"/>
    <g fill="#7a8085" font-size="9"><text x="568" y="42">0.030</text><text x="568" y="102">0.025</text><text x="568" y="162">0.020</text><text x="568" y="222">0.015</text></g>
  </svg>`;
}

function radarChart() {
  const labels = ['APPEARANCE','ASSISTS','ATTACKING','CLEAN SHEET','DEFENDING','DUELS','ERRORS','GOALS','MATCH','PASSING','SHOOTING'];
  const values = [44,28,36,18,29,22,15,48,40,63,71];
  const point = (angle, radius) => [235+Math.cos(angle)*radius,150+Math.sin(angle)*radius];
  return `<svg class="pp-radar-svg" viewBox="0 0 470 300" role="img" aria-label="Illustrative circular player statistics. All sector values are sample data.">
    ${[23,46,69,92].map((radius,i)=>`<circle cx="235" cy="150" r="${radius}" fill="none" stroke="#c4cacf" stroke-width="${i===3?.8:1}" ${i%2?'':'stroke-dasharray="4 5"'}/>`).join('')}
    ${values.map((value,i)=>{const start=-Math.PI/2+i*Math.PI*2/values.length,end=start+Math.PI*2/values.length,mid=(start+end)/2,radius=18+value*.9,a=point(start,radius),b=point(end,radius),label=point(mid,116),number=point(mid,Math.max(30,radius-12));return `<g><title>${labels[i]}: illustrative value ${value}</title><path d="M235 150L${a.join(' ')}A${radius} ${radius} 0 0 1 ${b.join(' ')}Z" fill="#68a7d133" stroke="#68a7d1" stroke-width="1.2"/><text x="${number[0]}" y="${number[1]+3}" fill="#92999f" font-size="7" text-anchor="middle">${value}</text><text x="${label[0]}" y="${label[1]+3}" fill="#7a8085" font-size="7.5" text-anchor="${label[0]>245?'start':label[0]<225?'end':'middle'}">${labels[i]}</text></g>`;}).join('')}
    <circle cx="235" cy="150" r="3.5" fill="#eff1f2"/>
  </svg>`;
}

export function renderPlayerProfile(state, helpers) {
  const { players, shirt, icon, escapeHtml, callsPanel } = helpers;
  const playerIndex = Number.isInteger(state.player) && players[state.player] ? state.player : 0;
  const p = players[playerIndex];
  const clubBadge = getClubBadge(p.team);
  const opponents = exampleOpponentsFor(p.team);
  const tab = ['selection','market','statistics'].includes(state.playerTab) ? state.playerTab : 'selection';
  const price = priceSamples[playerIndex] || priceSamples[0];
  const heading = (title, detail = '') => `<div class="pp-panel-heading"><h2>${title}</h2>${detail ? `<span>${detail}</span>` : ''}</div>`;
  const news = [
    ['Match report', 'How the latest performance could shape the next selection.', 'Example article · 2h'],
    ['Team update', 'A preview of the team news and availability module.', 'Example article · 5h'],
    ['Looking ahead', 'The next match, player form and what to watch.', 'Example article · 1d'],
  ];
  const ownTeam = {name:p.team, short:({Barcelona:'BAR','Real Madrid':'RMA',Arsenal:'ARS',PSG:'PSG',Liverpool:'LIV'})[p.team] || p.team, badge:clubBadge};
  const fixtureSide = (team, probability) => `<div class="pp-fixture-side" aria-label="${escapeHtml(team.name)} · sample win chance ${probability}%"><div class="pp-fixture-team"><abbr title="${escapeHtml(team.name)}">${escapeHtml(team.short)}</abbr>${team.badge?`<img src="${team.badge}" alt="${escapeHtml(team.name)}">`:''}</div><span class="pp-probability ${probability>=50?'is-favoured':'is-outsider'}">${probability}%</span></div>`;
  return `<div class="player-detail-page" data-player-tab="${tab}">
    <div class="pp-toolbar"><button class="pp-back" data-section="squad"><span aria-hidden="true">←</span> Roster</button><span>PLAYER UI STUDY · ILLUSTRATIVE DATA</span><button class="pp-share" data-action="share-player">${icon('share')} Share player</button></div>
    <div class="pp-main-grid">
      <section class="pp-identity" aria-label="Player overview">
        <button class="pp-mobile-share" data-action="share-player" aria-label="Share player">${icon('share')}</button>
        <button class="pp-close" data-section="squad" aria-label="Close player and return to roster">×</button>
        <div class="pp-person"><div class="pp-shirt-circle">${shirt(p,true)}</div><div class="pp-name"><h1>${escapeHtml(p.name)}</h1><p class="pp-teamline">${clubBadge ? `<img class="pp-club-badge" src="${clubBadge}" alt="" aria-hidden="true">` : ''}<span class="pp-team-name">${escapeHtml(p.team)}</span><span aria-hidden="true">·</span><span>${escapeHtml(p.position)}</span></p></div></div>
        <div class="pp-price-row"><div class="pp-price"><span class="pp-coin" aria-label="Gold">★</span><strong>${price}</strong></div><div class="pp-change"><strong>↑${escapeHtml(p.change.replace(/^\+/,''))}</strong><span class="pp-sr-only">24h · sample price</span></div></div>
        <div class="pp-trade-actions"><button class="pp-sign" data-action="player-trade-preview">Sign more shares</button><button class="pp-release" data-action="player-trade-preview">Release</button><button class="pp-swap" data-action="player-trade-preview">Swap ${icon('arrows')}</button></div>
      </section>

      <section class="pp-facts" aria-label="Player details" data-player-group="statistics">
        <div class="pp-fact"><span>Age</span><strong>—</strong><small>Placeholder</small></div>
        <div class="pp-fact"><span>Nationality</span><strong>—</strong><small>Placeholder</small></div>
        <div class="pp-fact pp-fact-ownership"><span>Active / circulating supply</span><strong>1.24m <i>/ 2.00m</i></strong></div>
        <div class="pp-fact pp-fact-ownership"><span>Your shares</span><strong>128</strong><small>Sample holding</small></div>
      </section>

      <nav class="pp-mobile-tabs" aria-label="Player details view">${[['selection','Selection'],['market','Market'],['statistics','Statistics']].map(([value,label]) => `<button data-player-tab="${value}" aria-pressed="${value===tab}">${label}</button>`).join('')}</nav>

      <section class="pp-panel pp-performance" data-player-group="selection" aria-label="Player performance">
        ${heading('Performance','SAMPLE SCORES')}
        <div class="pp-plot pp-performance-scroll">${performanceChart(playerIndex, opponents, escapeHtml, state.size==='mobile')}</div>
      </section>

      <section class="pp-fixtures" data-player-group="selection" aria-label="Upcoming example matches">
        ${heading('Upcoming matches','EXAMPLE FIXTURES · SAMPLE PROBABILITIES')}
        <div class="pp-fixture-strip">${opponents.map((opponent,i)=>{const teams=i%2?[opponent,ownTeam]:[ownTeam,opponent],probabilities=[[68,18],[27,55],[61,22],[42,35]][i];return `<article class="pp-fixture"><div class="pp-fixture-meta"><span>MD ${11+i} · ${['SUN 15:00','WED 20:00','SAT 17:30','SUN 14:00'][i]}</span><small>EXAMPLE</small></div><div class="pp-fixture-versus">${fixtureSide(teams[0],probabilities[0])}<span class="pp-versus" aria-hidden="true">VS</span>${fixtureSide(teams[1],probabilities[1])}</div></article>`;}).join('')}</div>
      </section>

      <section class="pp-ownership" data-player-group="selection" aria-label="Illustrative supply and holdings"><div class="pp-ownership-card"><span>Active / circulating supply</span><strong>1.24m <i>/ 2.00m</i></strong></div><div class="pp-ownership-card"><span>Your shares</span><strong>128</strong><small>Sample holding</small></div></section>

      <section class="pp-panel pp-news" data-player-group="selection" aria-label="Latest news module">
        ${heading('Latest news','EXAMPLE ARTICLES')}
        <div class="pp-plot pp-news-list">${news.map(([title,description,time])=>`<article class="pp-news-item"><div class="pp-news-author"><div class="pp-news-portrait" aria-hidden="true">${shirt(p)}</div><strong>${escapeHtml(p.name)}</strong>${clubBadge?`<img src="${clubBadge}" alt="${escapeHtml(p.team)}">`:''}</div><h3>${title}</h3><p>${description}</p><small>${time}</small></article>`).join('')}</div>
      </section>

      <section class="pp-panel pp-history" data-player-group="market" aria-label="Tournament history">
        ${heading('Tournament history','SAMPLE HISTORY')}
        <div class="pp-plot">${historyChart()}<div class="pp-chart-summary"><span class="pp-tp">TP</span><strong>${escapeHtml(p.points)}</strong><span>Last tournament · sample</span></div></div>
      </section>

      <section class="pp-panel pp-market" data-player-group="market" aria-label="Price over time">
        ${heading('Price over time','SAMPLE MARKET')}
        <div class="pp-plot">${priceChart()}<div class="pp-chart-summary"><strong><span class="pp-positive">↑</span>${price}</strong><div class="pp-chart-ranges" aria-label="Illustrative daily range"><span class="is-selected">D</span><span>W</span><span>M</span><span>Y</span></div></div></div>
      </section>

      <section class="pp-panel pp-statistics" data-player-group="statistics" aria-label="Player statistics">
        ${heading('Player stats','ILLUSTRATIVE')}
        <div class="pp-plot">${radarChart()}</div>
      </section>

      <section class="pp-panel pp-transactions" data-player-group="market" aria-label="Example recent transactions">
        ${heading('Recent transactions','EXAMPLE ACTIVITY')}
        <div class="pp-table-scroll"><table><thead><tr><th>Type</th><th>Price</th><th>Quantity</th><th>Date</th><th>Total</th></tr></thead><tbody>${[['Sign','250','06 Nov · 14:32'],['Release','80','06 Nov · 14:28'],['Sign','120','06 Nov · 14:22'],['Sign','320','06 Nov · 14:16']].map(([action,quantity,date])=>`<tr><td data-label="Type" class="${action==='Sign'?'pp-positive':'pp-negative'}"><span aria-hidden="true">${action==='Sign'?'↙':'↗'}</span> ${action}</td><td data-label="Price"><span class="pp-mini-coin">●</span> ${price}</td><td data-label="Quantity">${quantity}</td><td data-label="Date">${date}</td><td data-label="Total"><span class="pp-mini-coin">●</span> ${(Number(price)*Number(quantity)).toFixed(4)}</td></tr>`).join('')}</tbody></table></div>
      </section>

      <section class="pp-calls" data-player-group="selection" aria-label="Proposed Calls feature"><div class="pp-proposal-heading"><span>PROPOSED FEATURE</span><p>A manager’s perspective, alongside the player.</p></div>${playerIndex===0 ? callsPanel(state,helpers) : `<div class="pp-calls-empty"><h2>Calls</h2><p>No sample Call for ${escapeHtml(p.short)} yet.</p><button data-player="0">See the Lamine Yamal example ${icon('chevron')}</button></div>`}</section>

      <section class="pp-picker" aria-label="Choose a sample player">${heading('Explore players','SAMPLE SQUAD')}<div class="pp-player-list">${players.map((item,i)=>`<button data-player="${i}" aria-pressed="${i===playerIndex}">${shirt(item)}<span>${escapeHtml(item.short)}</span></button>`).join('')}</div><p class="pp-data-note">UI reference study. Prices, performance, fixtures, holdings and activity are illustrative. Trade controls open a preview only.</p></section>
    </div>
  </div>`;
}
