# Sport.Fun UI Lab

A separate design playground for exploring Sport.Fun interface improvements. Version 0.3 calibrates the prototype against seventeen current Sport.Fun screenshots, while keeping the profile and sharing layouts as proposals. The `fdf-platform` game repository was not available during setup; no current game frontend source has been duplicated.

## Run locally

From this directory:

```sh
node server.mjs
```

Open <http://127.0.0.1:4186>. The preview uses the user's actual in-game display name, **ENDGAME**, and supplied avatar, alongside illustrative stats and local interactions. It does not sign into Sport.Fun or connect to live account, wallet, trading, rewards, or game services.

## GitHub and Vercel

Source repository: [jordymaui/sportfun-ui-lab](https://github.com/jordymaui/sportfun-ui-lab) (private).

Hosted preview: [sportfun-ui-lab.vercel.app](https://sportfun-ui-lab.vercel.app). Vercel is connected to the GitHub repository; pushes to `main` deploy the production preview.

Vercel serves the static `public/` folder. `vercel.json` runs `npm run check` before deployment and requires no dependencies or environment secrets. The local Node server is for development only. Hosted preview links use the deployed hostname. The screenshot comparison is available only on localhost, and `references/` is excluded from both Git and Vercel uploads.

## Asset provenance

The prototype reuses assets from the local `sdf-site` checkout, plus the user's supplied ENDGAME avatar and sport logos. Original supplied files remain unchanged.

| Lab asset | Source relative to this project |
| --- | --- |
| `inter.ttf` | `../sdf-site/public/nfl-offer-assets/fonts/Inter-Variable.ttf` |
| `dm-mono.ttf` | `../sdf-site/public/nfl-offer-assets/fonts/DMMono-Medium.ttf` |
| `logo.svg` | `../sdf-site/public/images/sdf-logo.svg` |
| `wordmark.png` | `../sdf-site/public/images/prototype/sportfun-logo-white.png` |
| `football-mark.png` | User-supplied `codex-clipboard-35175d50-8e47-4eae-8cae-8a5124b8e151.png`, copied unchanged |
| `nfl-mark.png` | User-supplied `codex-clipboard-9ef20e2a-c1d7-4654-b453-6690e18acb1d.png`, copied unchanged |
| `shirt-1.webp` | `../sdf-site/public/images/public-home-v8/shirts-football/Barcelona.webp` |
| `shirt-2.webp` | `../sdf-site/public/images/public-home-v8/shirts-football/RealMadrid.webp` |
| `shirt-3.webp` | `../sdf-site/public/images/public-home-v8/shirts-football/arsenal.webp` |
| `shirt-4.webp` | `../sdf-site/public/images/public-home-v8/shirts-football/ParisSaintGermain.webp` |
| `shirt-5.webp` | `../sdf-site/public/images/public-home-v8/shirts-football/Goalkeeper1.webp` |
| `division.webp` | `../sdf-site/public/images/public-home-v8/divisions/rankDiamond.webp` |
| `endgame-avatar.png` | User-supplied `codex-clipboard-0d2bc6b0-e3a7-4e3c-a2b7-db12ea6867bf.png`, a 200×200 blue anime stadium avatar, copied unchanged |
| `reference-game.png` | `../sdf-site/public/images/marketing/football-mobiles-live-v2-20260730.png` |

ENDGAME and its avatar are the user's supplied in-game identity, used across the profile, Calls and share cards. Rankings, scores, holdings, rewards and Call activity remain illustrative. The supplied football and NFL logos are rendered as CSS luminance masks to match the sport selector's active and inactive colours.

`reference-game.png` is the earlier July 2026 marketing composite. The seventeen current screenshot references used for v0.3 are instead stored in ignored `references/`, outside `public/`, and served locally through `/reference`. These comprise the ten earlier references plus seven player-profile references: three desktop and four iOS. They are review material and should remain outside any public asset package.

## Design reference and limits

The current Sport.Fun screenshots are the primary reference for palette, component shapes, spacing and screen structure. The v0.3 working palette uses backgrounds and surfaces `#080a0f`, `#111118` and `#18181f`; borders `#232b34`; text `#eff1f2` and `#7a8085`; green `#00c62d`; gold `#fdb913`; and teal `#05b4a4`. Inter and DM Mono provide the typography baseline.

The initial prototype used the older `dark-2` token subset in `sdf-site/packages/sdf-ui`. That package documents a limited distribution from `fdf-platform/common/packages/ui` at commit `2bf25a3a3048c7f976e11944d880a5bef9b3a994`; it remains provenance for the original foundations, not proof of current-game styling.

Screenshot calibration supports visual continuity but does not establish source-level, behavioural or pixel-perfect parity. Proposed profile layouts, Calls and sharing flows still require product review. No live-game configuration or credentials are included.

The additional player-profile references guide a wide desktop summary with performance, fixtures and charts, and mobile Selection, Market and Statistics tabs. Calls remains a proposed section after news within Selection. This pass changes layout; player, performance and market values remain illustrative.

## Figma inspiration

All nine reference images in the user's [Figma board](https://www.figma.com/design/CSt51FH6pSOuhjCznUGQIm/Untitled) were inspected read-only. The board was not modified. These are general composition references only; Sport.Fun screenshots remain the authority for the prototype's palette and components.

| Reference images | General ideas considered |
| --- | --- |
| 1–2 | Compact identity cards with cover, avatar, three stats and a primary action |
| 3 | Gaming profile with cover, bio and achievement badges |
| 4 | Compact phone layout with avatar, three stats, streak and progress |
| 5 | Aura profile: cover, avatar, bio, interests, edit/share actions and activity grid |
| 6–7 | MFL dashboard/profile: cover, rank with period, career stats and showcases |
| 8 | Personal profile with cover, avatar, bio, top trades and chart |
| 9 | Reward tiers, progress and cards |

These observations do not add streaks, reward tiers, trade histories or other features to the product scope.

## Research direction

The feature direction introduced in v0.2 remains based on the user-provided [Sport.fun Profiles Research Notes](https://docs.google.com/document/d/1H59i9hv-FzCmE2YS00ch19FcORgoKCNOiVYaAutF-Ag/edit), read on 6 November 2026. The source document was not edited. It informs identity, supported club, current division/mini leagues, distinct career highlights, Calls and contextual sharing. The notes are exploratory ideas, not validation of outcomes or current game features.

## Available interactions

- Manager profile Overview/Squad/Calls tabs and footballer pages with the same sample Call. Like state is shared between those views for the session.
- Player-profile layout study: a wide desktop summary and mobile Selection/Market/Statistics tabs, with the Calls proposal placed after news in Selection.
- Edit the prototype's display name, bio and supported club; the default identity is ENDGAME, and changes stay in this browser's local storage.
- Switch mobile/desktop layout and compare against the saved game screenshot references.
- Compose Picks-result, pack-pull, Call, manager or player cards in square (1080×1080) or story (1080×1920) format. Preview and PNG download use the same Canvas renderer, retaining identity and a sample-data label.
- Copy a preview URL on the current hostname. Hosted URLs can be shared; localhost URLs work only on the computer running the development server.

## Validation history — 6 November 2026

For the initial prototype, JavaScript syntax checks passed. Browser review covered manager/player navigation, profile editing, a 390px mobile viewport (no page overflow or missing images), and a successful square PNG download. No live-game actions were performed.

After the v0.2 research update, browser review verified the overview/career sections, Call author and timestamp on both surfaces, shared like state (24 to 25), contextual Call sharing, and a successful Picks-result PNG export. Cover/avatar upload and new Call composition are not implemented in this visual sample.

For v0.3, JavaScript syntax checks passed. Browser review covered the desktop profile, the 390px preview, and actual 390×844 and 320×740 browser viewports. Neither phone viewport had horizontal page overflow; at 320px the content width and scroll width both measured 310px, and the bottom navigation ended at the viewport bottom. Roster and Trades show active navigation states, and switching from a scrolled roster to a player resets the content to the top. The mobile reference image loaded correctly, and a revised 1080×1080 Picks-result PNG was downloaded and visually inspected. The five card types and two export formats were not exhaustively re-tested in this styling pass.

The subsequent identity and player-layout update passed JavaScript syntax checks. Browser review verified ENDGAME and the supplied avatar/logos, migration of the previous demo name, the desktop player structure and the mobile Selection/Market/Statistics tabs. At 390×844, page and player content had no horizontal overflow; Market used stacked transaction cards, Statistics showed the radar and detail placeholders, and the mobile Share player action opened the composer. A 1080×1080 ENDGAME manager card was successfully exported. These are visual mockups; no trade or game-account action was performed.

The saved Cloudflare session exposes the campaign/tool account's four applications. The local GitHub login can read `sportdotfun/sdf-site`; `fdf-platform` was not in its accessible repositories. The current screenshots improve visual calibration; actual frontend duplication still requires access to the game source.
