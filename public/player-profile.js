const performanceScores = [72, 64, 91, 38, 55, 84, 79, 66, 110, 95];
const opponents = ['RIV', 'UNI', 'ATH', 'CIT', 'RIV', 'UNI', 'CIT', 'ATH', 'UNI', 'RIV'];
const priceSamples = ['0.0288', '0.0364', '0.0246', '0.0192', '0.0168'];

function performanceChart(index = 0) {
  const values = performanceScores.map((value, i) => Math.max(20, value - index * 3 + (i % 3) * index));
  return `<svg class="pp-performance-svg" viewBox="0 0 620 242" role="img" aria-label="Illustrative last ten match performance scores">
    <defs>${[['Green','#00c62d'],['Amber','#fdb913'],['Red','#ff4400']].map(([key,color])=>`<linearGradient id="ppBar${key}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${color}" stop-opacity=".38"/><stop offset="1" stop-color="${color}" stop-opacity=".035"/></linearGradient>`).join('')}</defs>
    <path d="M12 184H610" stroke="#303335"/>
    ${values.map((value, i) => {
      const x = 33 + i * 61;
      const height = value * 1.23;
      const color = value >= 70 ? '#00c62d' : value >= 50 ? '#fdb913' : '#ff4400';
      const gradient = value >= 70 ? 'Green' : value >= 50 ? 'Amber' : 'Red';
      return `<rect x="${x - 15}" y="${182 - height}" width="30" height="${height}" rx="15" fill="url(#ppBar${gradient})"/>
        <circle cx="${x}" cy="${181 - height}" r="17" fill="${color}"/>
        <text x="${x}" y="${186 - height}" text-anchor="middle" fill="#111118" font-size="15" font-weight="700">${value}</text>
        <circle cx="${x}" cy="211" r="14" fill="#303335" stroke="#484c4f"/>
        <text x="${x}" y="214" text-anchor="middle" fill="#eff1f2" font-size="7" font-weight="600">${opponents[i]}</text>
        <text x="${x}" y="238" text-anchor="middle" fill="#7a8085" font-size="8">${i % 2 ? 'A' : 'H'}</text>`;
    }).join('')}
  </svg>`;
}

function historyChart() {
  const values = [108, 72, 126, 91, 83, 141, 105, 118, 94, 143, 128, 137];
  return `<svg class="pp-history-svg" viewBox="0 0 470 208" role="img" aria-label="Illustrative tournament performance history">
    <g stroke="#303335" stroke-width="1"><path d="M31 35H458M31 85H458M31 135H458M31 178H458"/></g>
    <g fill="#7a8085" font-size="8"><text x="3" y="38">150</text><text x="8" y="88">100</text><text x="12" y="138">50</text></g>
    ${values.map((v,i) => `<rect x="${43+i*35}" y="${178-v}" width="16" height="${v}" rx="8" fill="${i===values.length-1?'#eff1f2':'#00c62d'}"/><text x="${51+i*35}" y="198" fill="#7a8085" font-size="8" text-anchor="middle">${i+1}</text>`).join('')}
  </svg>`;
}

function priceChart() {
  return `<svg class="pp-price-svg" viewBox="0 0 470 213" role="img" aria-label="Illustrative share price over time">
    <defs><linearGradient id="ppPriceFill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#228bff" stop-opacity=".19"/><stop offset="1" stop-color="#228bff" stop-opacity="0"/></linearGradient></defs>
    <g stroke="#303335" stroke-width="1"><path d="M5 28H410M5 76H410M5 124H410M5 172H410"/></g>
    <path d="M6 157 22 159 38 146 54 151 70 132 86 140 102 119 118 125 134 111 150 120 166 93 182 104 198 91 214 100 230 77 246 82 262 64 278 70 294 53 310 62 326 42 342 53 358 40 374 47 390 29 407 34V173H6Z" fill="url(#ppPriceFill)"/>
    <path d="M6 157 22 159 38 146 54 151 70 132 86 140 102 119 118 125 134 111 150 120 166 93 182 104 198 91 214 100 230 77 246 82 262 64 278 70 294 53 310 62 326 42 342 53 358 40 374 47 390 29 407 34" fill="none" stroke="#228bff" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="407" cy="34" r="4" fill="#228bff"/>
    <g fill="#7a8085" font-size="8"><text x="422" y="31">0.030</text><text x="422" y="79">0.025</text><text x="422" y="127">0.020</text><text x="422" y="175">0.015</text><text x="5" y="200">01 OCT</text><text x="138" y="200">12 OCT</text><text x="269" y="200">24 OCT</text><text x="375" y="200">06 NOV</text></g>
  </svg>`;
}

function radarChart() {
  return `<svg class="pp-radar-svg" viewBox="0 0 470 245" role="img" aria-label="Illustrative player statistics radar">
    <g fill="none" stroke="#303335"><path d="M235 42 317 83 317 165 235 206 153 165 153 83Z"/><path d="M235 62 296 93 296 155 235 185 174 155 174 93Z"/><path d="M235 83 276 104 276 144 235 165 194 144 194 104Z"/><path d="M235 104 256 114 256 134 235 144 215 134 215 114Z"/><path d="M235 42V206M153 83 317 165M153 165 317 83"/></g>
    <path d="M235 62 297 93 272 145 235 185 180 151 198 105Z" fill="#228bff30" stroke="#228bff" stroke-width="2"/>
    <g fill="#eff1f2" font-size="10" text-anchor="middle"><text x="235" y="24">Form</text><text x="350" y="80">Impact</text><text x="358" y="176">Minutes</text><text x="235" y="232">Consistency</text><text x="105" y="176">Involvement</text><text x="105" y="80">Performance</text></g>
  </svg>`;
}

export function renderPlayerProfile(state, helpers) {
  const { players, shirt, icon, escapeHtml, callsPanel } = helpers;
  const playerIndex = Number.isInteger(state.player) && players[state.player] ? state.player : 0;
  const p = players[playerIndex];
  const tab = ['selection','market','statistics'].includes(state.playerTab) ? state.playerTab : 'selection';
  const price = priceSamples[playerIndex] || priceSamples[0];
  const heading = (title, detail = '') => `<div class="pp-panel-heading"><h2>${title}</h2>${detail ? `<span>${detail}</span>` : ''}</div>`;
  const news = [
    ['Match report', 'How the latest performance could shape the next selection.', 'Example article · 2h'],
    ['Team update', 'A preview of the team news and availability module.', 'Example article · 5h'],
    ['Looking ahead', 'The next match, player form and what to watch.', 'Example article · 1d'],
  ];
  return `<div class="player-detail-page" data-player-tab="${tab}">
    <div class="pp-toolbar"><button class="pp-back" data-section="squad"><span aria-hidden="true">←</span> Roster</button><span>PLAYER UI STUDY · ILLUSTRATIVE DATA</span><button class="pp-share" data-action="share-player">${icon('share')} Share player</button></div>
    <div class="pp-main-grid">
      <section class="pp-identity" aria-label="Player overview">
        <button class="pp-mobile-share" data-action="share-player" aria-label="Share player">${icon('share')}</button>
        <button class="pp-close" data-section="squad" aria-label="Close player and return to roster">×</button>
        <div class="pp-person"><div class="pp-shirt-circle">${shirt(p,true)}</div><div class="pp-name"><h1>${escapeHtml(p.name)}</h1><p>${escapeHtml(p.team)} <span>·</span> ${escapeHtml(p.position)}</p></div></div>
        <div class="pp-price"><span class="pp-coin" aria-label="Gold">★</span><strong>${price}</strong></div>
        <div class="pp-change"><strong>↗ ${escapeHtml(p.change)}</strong><span>24h · sample price</span></div>
        <div class="pp-trade-actions"><button class="pp-sign" data-action="player-trade-preview">Sign more shares</button><button class="pp-release" data-action="player-trade-preview">Release</button><button class="pp-swap" data-action="player-trade-preview">Swap ${icon('arrows')}</button></div>
      </section>

      <section class="pp-facts" aria-label="Player details" data-player-group="statistics">
        <div class="pp-fact"><span>Age</span><strong>—</strong><small>Detail placeholder</small></div>
        <div class="pp-fact"><span>Nationality</span><strong>—</strong><small>Detail placeholder</small></div>
        <div class="pp-fact pp-fact-ownership"><span>Active / circulating supply</span><strong>1.24m <i>/ 2.00m</i></strong></div>
        <div class="pp-fact pp-fact-ownership"><span>Your shares</span><strong>128</strong><small>Sample holding</small></div>
      </section>

      <nav class="pp-mobile-tabs" aria-label="Player details view">${[['selection','Selection'],['market','Market'],['statistics','Statistics']].map(([value,label]) => `<button data-player-tab="${value}" aria-pressed="${value===tab}">${label}</button>`).join('')}</nav>

      <section class="pp-panel pp-performance" data-player-group="selection" aria-label="Player performance">
        ${heading('Performance','LAST 10 MATCHES')}
        <div class="pp-performance-key"><span><i></i>Performance points</span><span>Example opponents</span></div>
        <div class="pp-performance-scroll">${performanceChart(playerIndex)}</div>
      </section>

      <section class="pp-fixtures" data-player-group="selection" aria-label="Upcoming example matches">
        ${heading('Upcoming matches','EXAMPLE FIXTURES')}
        <div class="pp-fixture-strip">${['Riverside','United','Athletic','City'].map((team,i)=>`<article class="pp-fixture"><div><span>Matchday ${11+i}</span><small>${i%2?'AWAY':'HOME'}</small></div><div class="pp-fixture-teams"><span class="pp-opponent">${['RIV','UNI','ATH','CIT'][i]}</span><strong>${team}</strong><span class="pp-venue">${i%2?'A':'H'}</span></div><p>${['SUN · 15:00','WED · 20:00','SAT · 17:30','SUN · 14:00'][i]}</p></article>`).join('')}</div>
      </section>

      <section class="pp-ownership" data-player-group="selection" aria-label="Illustrative supply and holdings"><div class="pp-ownership-card"><span>Active / circulating supply</span><strong>1.24m <i>/ 2.00m</i></strong></div><div class="pp-ownership-card"><span>Your shares</span><strong>128</strong><small>Sample holding</small></div></section>

      <section class="pp-panel pp-news" data-player-group="selection" aria-label="Latest news module">
        ${heading('Latest news','SAMPLE CONTENT')}
        <div class="pp-news-list">${news.map(([title,description,time],i)=>`<article class="pp-news-item"><div class="pp-news-art" aria-hidden="true">${icon(i===0?'football':i===1?'users':'star')}</div><div><h3>${title}</h3><p>${description}</p><small>${time}</small></div></article>`).join('')}</div>
      </section>

      <section class="pp-calls" data-player-group="selection" aria-label="Proposed Calls feature"><div class="pp-proposal-heading"><span>PROPOSED FEATURE</span><p>A manager’s perspective, alongside the player.</p></div>${playerIndex===0 ? callsPanel(state,helpers) : `<div class="pp-calls-empty"><h2>Calls</h2><p>No sample Call for ${escapeHtml(p.short)} yet.</p><button data-player="0">See the Lamine Yamal example ${icon('chevron')}</button></div>`}</section>

      <section class="pp-panel pp-history" data-player-group="market" aria-label="Tournament history">
        ${heading('Tournament history','LAST 12 TOURNAMENTS')}
        <div class="pp-chart-summary"><strong>${escapeHtml(p.points)}</strong><span>Last tournament points</span></div>
        ${historyChart()}
      </section>

      <section class="pp-panel pp-market" data-player-group="market" aria-label="Price over time">
        ${heading('Price over time','1M')}
        <div class="pp-chart-summary"><strong>${price}</strong><span class="pp-positive">${escapeHtml(p.change)} this month · sample</span></div>
        ${priceChart()}
      </section>

      <section class="pp-panel pp-statistics" data-player-group="statistics" aria-label="Player statistics">
        ${heading('Player stats','ILLUSTRATIVE')}
        ${radarChart()}
      </section>

      <section class="pp-panel pp-transactions" data-player-group="market" aria-label="Example recent transactions">
        ${heading('Recent transactions','EXAMPLE ACTIVITY')}
        <div class="pp-table-scroll"><table><thead><tr><th>Type</th><th>Price</th><th>Quantity</th><th>Date</th><th>Total</th></tr></thead><tbody>${[['Sign','250','06 Nov · 14:32'],['Release','80','06 Nov · 14:28'],['Sign','120','06 Nov · 14:22'],['Sign','320','06 Nov · 14:16']].map(([action,quantity,date])=>`<tr><td data-label="Type" class="${action==='Sign'?'pp-positive':'pp-negative'}"><span aria-hidden="true">${action==='Sign'?'↙':'↗'}</span> ${action}</td><td data-label="Price"><span class="pp-mini-coin">●</span> ${price}</td><td data-label="Quantity">${quantity}</td><td data-label="Date">${date}</td><td data-label="Total"><span class="pp-mini-coin">●</span> ${(Number(price)*Number(quantity)).toFixed(4)}</td></tr>`).join('')}</tbody></table></div>
      </section>

      <section class="pp-picker" aria-label="Choose a sample player">${heading('Explore players','SAMPLE SQUAD')}<div class="pp-player-list">${players.map((item,i)=>`<button data-player="${i}" aria-pressed="${i===playerIndex}">${shirt(item)}<span>${escapeHtml(item.short)}</span></button>`).join('')}</div><p class="pp-data-note">UI reference study. Prices, performance, fixtures, holdings and activity are illustrative. Trade controls open a preview only.</p></section>
    </div>
  </div>`;
}
