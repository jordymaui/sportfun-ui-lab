# Sport.Fun profile requirements

Developer handoff for Rykz · 10 November 2026

The profile should give a manager an identity, show where they compete now, celebrate their best achievements and let them share those moments. This brief describes the current profile proposal and the interactions to reproduce from the mockup.

**Preview:** [Manager profile](https://sportfun-ui-lab.vercel.app/?view=manager) · [Profile sharing](https://sportfun-ui-lab.vercel.app/?view=share&card=manager) · [Picks sharing](https://sportfun-ui-lab.vercel.app/?view=share&card=picks)

**Source:** [sportfun-ui-lab](https://github.com/jordymaui/sportfun-ui-lab), public repository. Visual baseline: commit `f3f11f5`.

The mockup is a separate static frontend, with working local interactions and illustrative game data. It has no live account or game-service integration. ENDGAME, the supplied avatar and Fulham preference are the example identity; the statistics below are fixtures, not product rules or verified account results.

## Profile identity and navigation

**P01 — Display the manager identity.** Show a cover image, avatar, display name, handle, manager-since date, short bio, supported club name and its in-game badge. Give the earned division a prominent crest beside its name. The division artwork should feel like an achievement; the supported club remains a separate identity field.

**P02 — Provide profile editing and sharing actions.** Edit opens a form for display name, bio and supported club. Current form limits are 24, 100 and 30 characters respectively. Supported clubs use the supplied game badge library, with an initial emblem when no badge matches. Share profile opens the manager-card composer. In the prototype, edits persist in this browser only; avatar and cover images are fixed assets, without upload controls.

**P03 — Provide Overview, Squad and Calls tabs.** Overview contains standings and highlights. Squad shows the five sample players with their shirt, name, team, position, form and performance points; selecting one opens that player’s page. Calls displays the manager’s sample player opinion. The current Squad is a display, not a lineup editor.

## Competitive status

**P04 — Keep current season, career record and participation distinct.** Show three achievement panels above the tabs:

| Panel | Required content | Mock example |
| --- | --- | --- |
| Season rank | Rank, number of eligible managers, season, percentile, movement since a stated comparison and a small trend graphic | #128 of 6,400; 2026/27; top 2%; up 12 places |
| All-time best | Best worldwide position, date achieved, season, record medal and a route to the associated historic performance | #84 worldwide; 12 Oct 2025; 2025/26 |
| Tournaments played | Completed tournament count, milestone emblem and a participation percentile with its meaning stated | 24; top 5% of users for tournament participation |

Season rank should feel current through its status and movement treatment. The prototype’s LIVE dots and trend are illustrative. A production implementation needs a defined update cadence and comparison period; the static share image represents a snapshot.

Use the label **All-time best**, retaining the date and worldwide context. Its **See best picks** action currently switches to Overview, moves keyboard focus to Highlights and scrolls there. Production data must connect the record to the correct historic event rather than assuming it is always the highest-scoring lineup.

## Current division and mini leagues

**P05 — Start Overview directly with current competition.** Show the earned division crest and name, tournament identifier, current standing, field size and percentile. Beside it on desktop, show the manager’s mini leagues with a distinct icon, league name, standing, participant count and short standing context. Stack these sections on mobile. Do not add the earlier “Where I compete” heading.

The sample division standing is **#42 of 709, top 6%, Diamond**. This is separate from the season-wide **#128 of 6,400**. Sample mini leagues are **The Away End — 3/24, Podium position** and **Friday Five — 8/40, Top 20%**. Their new fictional crests are supplied assets. The rows currently display standings; joining, creating or opening a league is not implemented.

## Career highlights

**P06 — Show four different achievements with a clear visual hierarchy.** The best-picks performance is the featured piece. Most-picked player and biggest pack pull are smaller supporting pieces, followed by a full-width reward strip. Preserve this varied composition rather than making four identical tiles.

| Highlight | Required content and action |
| --- | --- |
| Best picks | Total score, same-division average, relative performance, event date/season and associated rank; all five shirts, player names, positions and individual scores; captain C and multiplier; select a player to open their page; Share result |
| Most-picked player | Player identity, number of tournaments selected, total tournaments and proportion; View player |
| Biggest pack pull | Player identity, estimated gold value **at the time of the pull**, tournament context; Share pull |
| Highest tournament reward | Reward amount with TP unit and tournament context |

For the historic picks fixture, use Yamal **37.2** (24.8 × 1.5), Mbappé **32.4**, Saka **28.6**, Vitinha **24.1** and Alisson **20.5**. They total **142.8**, versus a Diamond average of **96.4**, approximately 48% higher. Mark exactly one captain with the tilted teal C, teal score pill and 1.5× tag. State that the bonus is already included; do not apply it twice. These contributions are separate from the player-page performance summaries.

The other fixtures are Yamal selected in **18/24 tournaments (75%)**, a Mbappé pull valued at **1,250 gold at pull**, and a highest reward of **840 TP**. Values and artwork should come from their respective achievement records when integrated with real data.

## Calls

**P07 — Display and share a player-linked opinion.** A Call shows the manager identity, linked player, text, timestamp, tournament context, shareholder label, edit-status label, like count and Share Call action. The same Yamal sample appears on the manager’s Calls tab and Yamal’s player page. Its like button toggles the local count between 24 and 25 across those views for the session.

This is a display-and-share concept. Writing, publishing, editing or deleting Calls is not implemented. The shareholder and unedited labels are sample presentation, not verified ownership or an enforced audit trail. Likes indicate popularity, not prediction accuracy.

## Sharing

**P08 — Export achievements with the manager’s identity attached.** Contextual share actions should open the relevant card, with an option to switch between Manager profile, Picks result, Pack pull, My Call and Player spotlight.

| Card | Content to carry into the image |
| --- | --- |
| Manager profile | Cover/avatar, manager name and handle, supported club/badge, earned division crest, season rank/percentile/movement, dated all-time record and medal, tournament count and participation percentile |
| Picks result | Manager identity, date/tournament/division, total and average, all five players and individual scores, captain marker and multiplier |
| Pack pull | Player, manager attribution, tournament, pack type and estimated gold value at pull |
| My Call | Manager identity, linked player, opinion text, timestamp, status and like count |
| Player spotlight | Player shirt, identity and club badge, last-tournament performance, 24-hour share-price change and manager attribution |

Support **square 1080×1080** and **story 1080×1920**, an on-screen preview and Download PNG. Preview and download must use the same data and composition. Keep the game’s branding and readable typography; fit long names without colliding with badges. Prototype exports retain the concept/sample-data label.

Keep a visible **Back to profile/player** control. It returns to the originating view, tab and scroll position, including after changing the card type or format. Opening a share link directly should still provide a sensible route back.

Copy preview link currently carries only card type, manager name and player selection. It does not preserve story format, edited club/bio, likes or an immutable achievement snapshot. A real share URL’s identity, snapshot and persistence behaviour remains an integration decision. The prototype downloads images and copies links; it does not post to social accounts.

## Visual and responsive requirements

Use the current game’s component language: dark layered surfaces, compact rows, pill controls, Inter for primary text and DM Mono for small metadata. Reuse the supplied club badges and Football/NFL marks, preserving their proportions. Division and milestone assets have distinct colours and silhouettes; mini-league crests remain smaller than the main division badge.

Desktop has a left identity column and a wider content column. On mobile, identity and content stack, competition panels stack and the highlight composition adapts. The five historic picks keep visible scores and their captain marker. Verify at least 320px and 390px widths, with no horizontal page overflow or clipped controls. Respect reduced-motion preferences and retain accessible control names, selected-tab state and the focus destination for See best picks.

The design-lab sidebar, preview-size switch and screenshot comparison are review tools, not features to reproduce in the game. The Football/NFL switch and some shell navigation in the lab are visual placeholders, not implemented game flows.

## Data definitions to agree before production integration

These decisions can remain fixtures while reproducing the layout, but must be resolved before presenting real results:

1. **Ranking scope:** define the eligible population, sport and period for season rank, worldwide best, division rank and each percentile. Define tie handling and rounding. Confirm whether the identity crest represents the current division or the highest division ever earned; both are Diamond in the mock. Participation percentile measures tournament participation, not performance.
2. **Historical record:** decide whether all-time best means highest world position during a tournament, final tournament position or a season result. Best world rank and highest picks score may belong to different events. Keep a stable season/event reference for each; the mock repeats “Tournament 10” in current and historic examples.
3. **Achievement calculations:** agree the same-division average, captain scoring rule, most-picked counting rule, valuation time for pack pulls and what counts as a completed tournament. Preserve historical picks and rewards rather than deriving them from the current squad.
4. **Profile ownership and persistence:** define which fields an owner can edit and what a visitor sees. The mock shows one manager with local edits; its derived handle and fixed join date are placeholders, not account-identity rules.
5. **Availability and sharing:** define missing-data and empty achievement states, live-data loading behaviour, update timing, and the identity/snapshot represented by a shared link. These behaviours are not defined by the populated profile demo; the share composer already has basic preparing/error messages. Share only the profile/card fields described above; the surrounding mock wallet balances are not profile-share content.

## Source and asset handoff

| Area | Files |
| --- | --- |
| Identity, tabs, editing, navigation and share actions | `public/app.js`, `public/index.html` |
| Overview, leagues, highlights and Calls | `public/research.js` |
| Status and showcase layouts | `public/profile-status.css`, `public/profile-showcase.css` |
| Shared historic pick contributions | `public/picks-data.js` |
| Profile, picks and player image exports | `public/profile-share-card.js`, `public/picks-share-card.js`, `public/player-share-card.js` |
| Game styling and player-page reference | `public/game-theme.css`, `public/player-profile.js`, `public/player-profile.css` |
| Club mapping and supplied badges | `public/club-badges.js`, `public/assets/clubs/` |
| Generated achievement and league artwork provenance | `design/achievement-artwork.json`, `design/mini-league-artwork.json` |

Reusable images live in `public/assets/`: ENDGAME avatar/cover, Diamond crest, world-best medal, tournament milestone and the two league crests. Full asset provenance and local run instructions are in the [README](../README.md). The generated crests are concept artwork. The game screenshots in ignored `references/` are comparison material, not part of the shipped asset package.

## Replication acceptance checks

- The identity, three status panels, current competition and four highlights are present, with distinct season/division/career labels.
- Overview, Squad and Calls work; player links open the selected player; See best picks reveals and focuses Highlights.
- Local profile edits update the displayed identity and relevant share content. The current fixed avatar/cover behaviour is preserved unless upload work is separately scoped.
- Historic scores total 142.8, one captain is visible and the 1.5× contribution is included exactly once. Profile and picks exports agree.
- All five share types preview and download at both specified dimensions. Contextual share actions select the correct content; Back restores the source view and scroll.
- Names, badges and standings fit desktop and narrow phones. Images load, controls remain accessible and reduced-motion settings are respected.

Live backend integration, Call creation, league management, avatar/cover upload and additional social features are separate work from replicating this prototype.
