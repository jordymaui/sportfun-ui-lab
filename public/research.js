export function profileOverview(state, {shirt, icon, escapeHtml, players}) {
  const favourite = players[0];
  const pull = players[1];
  return `
    <section class="research-section" aria-label="Competitive context">
      <div class="section-heading"><h3>Where I compete</h3><span class="mono">TOURNAMENT 10</span></div>
      <div class="competition-list">
        <div class="competition-row division-row">
          <img src="/assets/division.webp" alt="Diamond division">
          <div class="competition-detail"><strong>Diamond division</strong><small>Current division · Tournament 10</small></div>
          <span class="competition-tag">LIVE</span>
        </div>
        <div class="competition-row">
          <span class="league-icon" aria-hidden="true">${icon('users')}</span>
          <div class="competition-detail"><strong>The Away End</strong><small>Mini league · Tournament 10</small></div>
          <div class="league-position"><strong>3<span> / 24</span></strong><small>POSITION</small></div>
        </div>
        <div class="competition-row">
          <span class="league-icon" aria-hidden="true">${icon('users')}</span>
          <div class="competition-detail"><strong>Friday Five</strong><small>Mini league · Tournament 10</small></div>
          <div class="league-position"><strong>8<span> / 40</span></strong><small>POSITION</small></div>
        </div>
      </div>
    </section>
    <section class="research-section" aria-label="Career highlights">
      <div class="section-heading"><h3>Career highlights</h3><span class="mono">SAMPLE HISTORY</span></div>
      <div class="career-grid">
        <article class="career-highlight favourite-highlight">
          <span class="career-label">MOST-PICKED PLAYER</span>
          <div class="highlight-player">${shirt(favourite)}<strong>${escapeHtml(favourite.short)}</strong></div>
          <p><b>18</b> of 24 tournaments</p>
          <span class="highlight-context">A regular in my starting five.</span>
          <button class="highlight-action" data-player="0">View player ${icon('chevron')}</button>
        </article>
        <article class="career-highlight picks-highlight">
          <span class="career-label">BEST PICKS SCORE</span>
          <strong class="career-number">142.8 <span>PTS</span></strong>
          <p>Diamond average <b>96.4</b></p>
          <span class="highlight-context">Both from Tournament 10</span>
          <button class="highlight-action" data-share="picks">Share result ${icon('share')}</button>
        </article>
        <article class="career-highlight pull-highlight">
          <span class="career-label">BIGGEST PACK PULL</span>
          <div class="highlight-player">${shirt(pull)}<strong>${escapeHtml(pull.short)}</strong></div>
          <p class="gold-metric"><b>1,250</b> GOLD</p>
          <span class="highlight-context">Estimated value at pull time</span>
          <button class="highlight-action" data-share="pack">Share pull ${icon('share')}</button>
        </article>
        <article class="career-highlight tp-highlight">
          <span class="career-label">HIGHEST TOURNAMENT TP</span>
          <strong class="career-number">840 <span>TP</span></strong>
          <p>Best tournament reward</p>
          <span class="highlight-context">Tournament 08 · Career best</span>
          <span class="highlight-footnote">Performance reward</span>
        </article>
      </div>
    </section>`;
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
