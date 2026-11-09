import { bestPicks } from './picks-data.js';

export function profileOverview(state, {shirt, icon, escapeHtml, players}) {
  const favourite = players[0];
  const pull = players[1];
  return `
    <div class="sh-overview">
      <section class="sh-competition" aria-label="Current division and league standings">
        <article class="sh-division">
          <div class="sh-division-top"><span class="sh-kicker">TOURNAMENT 10</span><span class="sh-live"><i></i> LIVE</span></div>
          <div class="sh-division-main">
            <div class="sh-badge-stage"><img src="/assets/diamond-achievement.png" alt="Diamond division achievement badge"></div>
            <div class="sh-division-copy"><span class="sh-kicker">YOUR DIVISION</span><h3>Diamond</h3><p>The top of your game.</p></div>
          </div>
          <div class="sh-standing"><div><span>Division standing</span><strong>#42 <small>/ 709</small></strong></div><span class="sh-percentile">TOP 6%</span></div>
          <div class="sh-standing-track" aria-hidden="true"><span></span></div>
        </article>
        <div class="sh-leagues">
          <div class="sh-league-heading"><h3>My leagues</h3><span>Current standings</span></div>
          <article class="sh-league-row"><span class="sh-league-crest sh-away" aria-hidden="true">AE</span><div><strong>The Away End</strong><small>Mini league</small></div><div class="sh-league-rank"><strong>3<span> / 24</span></strong><small>Podium position</small></div></article>
          <article class="sh-league-row"><span class="sh-league-crest sh-friday" aria-hidden="true">F5</span><div><strong>Friday Five</strong><small>Mini league</small></div><div class="sh-league-rank"><strong>8<span> / 40</span></strong><small>Top 20%</small></div></article>
        </div>
      </section>
      <section class="sh-showcase" id="career-highlights" aria-label="Career highlights" tabindex="-1">
        <div class="sh-section-title"><div><span class="sh-kicker">THE MOMENTS THAT MADE IT</span><h3>Highlights</h3></div><span>Personal bests</span></div>
        <article class="sh-picks-hero">
          <div class="sh-picks-top"><span class="sh-record-stamp">${icon('trophy')} PERSONAL BEST</span><span class="sh-kicker">TOURNAMENT 10</span></div>
          <div class="sh-picks-body">
            <div class="sh-score"><h4>Best picks score</h4><strong>${bestPicks.total.toFixed(1)}<span>PTS</span></strong><span class="sh-score-edge">↑ ${Math.round((bestPicks.total / bestPicks.average - 1) * 100)}% above Diamond average</span><p class="sh-record-date">#84 worldwide · 12 Oct 2025<br>2025/26 season</p></div>
            <div class="sh-picks-team"><span class="sh-kicker">THE FIVE THAT DID IT</span><div class="sh-lineup">${bestPicks.entries.map(pick=>{const p=players[pick.playerIndex];return `<button class="sh-pick${pick.captain?' is-captain':''}" data-player="${pick.playerIndex}" aria-label="View ${escapeHtml(p.name)} — ${pick.score.toFixed(1)} points${pick.captain?', captain, 1.5 times multiplier included':''}"><div class="sh-pick-art"><span class="sh-pick-score">${pick.score.toFixed(1)}${pick.captain?'<small>1.5×</small>':''}</span>${pick.captain?'<span class="sh-captain" aria-hidden="true">C</span>':''}${shirt(p)}</div><span class="sh-pick-name">${escapeHtml(p.short)}</span><span class="sh-pick-position">${escapeHtml(p.position)}</span></button>`;}).join('')}</div><p class="sh-captain-note">Captain’s 1.5× bonus included</p></div>
          </div>
          <div class="sh-picks-bottom"><div class="sh-score-compare"><div><span>Your picks</span><strong>${bestPicks.total.toFixed(1)}</strong></div><div class="sh-score-bar"><i></i></div><div><span>Diamond average</span><span>${bestPicks.average.toFixed(1)}</span></div><div class="sh-average-bar"><i></i></div></div><button class="sh-action sh-action-light" data-share="picks">${icon('share')} Share result</button></div>
        </article>
        <div class="sh-supporting">
          <article class="sh-favourite">
            <div class="sh-favourite-shirt">${shirt(favourite)}<span aria-hidden="true">18×</span></div>
            <div class="sh-favourite-copy"><span class="sh-kicker">MOST-PICKED PLAYER</span><h4>${escapeHtml(favourite.name)}</h4><p>Always in the conversation.<br><strong>18</strong> of your 24 tournaments.</p><div class="sh-loyalty" aria-label="Picked in 75 percent of tournaments">${Array.from({length:24},(_,i)=>`<i class="${i<18?'is-filled':''}"></i>`).join('')}</div><button class="sh-text-action" data-player="0">View player ${icon('chevron')}</button></div>
          </article>
          <article class="sh-pack">
            <span class="sh-kicker">BIGGEST PACK PULL</span><div class="sh-pack-art">${shirt(pull)}</div><div class="sh-pack-copy"><h4>${escapeHtml(pull.name)}</h4><strong><span class="sh-gold-coin" aria-label="Gold">★</span> 1,250</strong><p>Estimated gold value at pull<br>Tournament 08</p><button class="sh-text-action" data-share="pack">Share pull ${icon('share')}</button></div>
          </article>
        </div>
        <article class="sh-reward-ribbon"><span class="sh-reward-icon" aria-hidden="true">${icon('trophy')}</span><div class="sh-reward-copy"><span class="sh-kicker">HIGHEST TOURNAMENT REWARD</span><h4>A tournament to remember.</h4><p>Tournament 08 · Career best</p></div><strong><span>TP</span> 840</strong></article>
      </section>
    </div>`;
}

export function callsPanel(state, {shirt, icon, escapeHtml, players}) {
  const liked = Boolean(state.liked);
  return `
    <section class="research-section calls-section" aria-label="Manager Calls">
      <div class="section-heading"><h3>Calls</h3><span class="mono">EXAMPLE CALL</span></div>
      <p class="calls-intro">The thinking behind the picks.</p>
      <article class="call-card">
        <div class="call-author">
          <img src="/assets/endgame-avatar.png" alt="ENDGAME in-game avatar">
          <div><strong>${escapeHtml(state.name || 'ENDGAME')}</strong><span>5 Nov 2026 · 18:42 UTC</span></div>
          <span class="call-shareholder">SHAREHOLDER</span>
        </div>
        <button class="call-player" data-player="0">${shirt(players[0])}<span>On <strong>Lamine Yamal</strong></span>${icon('chevron')}</button>
        <blockquote>Backing Yamal for chance creation this week. His recent form makes him my first pick.</blockquote>
        <div class="call-meta"><span>Unedited · sample</span><span>TOURNAMENT 10</span></div>
        <div class="call-actions">
          <button class="call-like" data-action="like-call" aria-pressed="${liked}" aria-label="${liked ? 'Unlike' : 'Like'} this sample Call"><span aria-hidden="true">${liked ? '♥' : '♡'}</span> <strong>${24 + Number(liked)}</strong><span>likes</span></button>
          <button class="call-share" data-share="call">${icon('share')} Share Call</button>
        </div>
      </article>
      <p class="calls-context">Likes show popularity, not verified accuracy. All activity here is illustrative.</p>
    </section>`;
}
