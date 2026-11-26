# Children's version and development version

Since **10.0.0** Waldpost exists twice on the same site:

| | Children's version (`main`) | Development version (`dev`) |
| --- | --- | --- |
| Address | <https://mrtolchock.github.io/waldpost/> | <https://mrtolchock.github.io/waldpost/dev/> (opened from Settings) |
| Branch | `main` | `dev` |
| Rätsel | exactly those in [`js/friends/released.js`](../js/friends/released.js), each at its released revision | every Rätsel; release follows the live approvals on GitHub |
| Rätsel-Prüfung | none (Rätsel-Galerie only), no GitHub traffic | full review and GitHub sync ([review storage](REVIEW-STORAGE.md)) |
| Save | `farbtupf.friends.v1` … | own save (`farbtupf.friends.development.v1`, `farbtupf.puzzles.development.v1`) |
| Play log | records ([play log](PLAY-LOG.md)) | records nothing; never touches the children's log |
| Version | `FK.VERSION` (e.g. 10.0.0) | the same plus its own build number `FK.DEV_VERSION`, e.g. **ENTWICKLUNG 1.0.1** |
| Marker | — | **ENTWICKLUNG** *build number* in forest navigation; Settings → App-Version shows both |

`FK.CHANNEL` (`js/core/channel.js`) is `'main'` on every real host. The site deploy marks only the published development copy (`window.WALDPOST_DEV_SITE = true`, which sets `FK.DEV_SITE` and the `'dev'` channel). A local test server defaults to `'dev'`; use `?channel=main` to see the children's version locally.

## Entwicklermodus

**Einstellungen → Spielprotokoll und Entwicklermodus → Entwicklermodus** opens the development copy in the same app, after checking that it is published and reachable. Switching it off there returns to the children's version. It is never remembered: tapping the app icon always starts the children's version, and the development copy returns to the children's version by itself after **two minutes in the background** or in any fresh app session that did not enter it from Settings. Both copies share one origin, so they use separate storage keys and separate offline caches; the children's service worker neither answers nor deletes anything under `dev/`.

## Working on the development version

1. Make changes on `dev` (or a feature branch merged into `dev`), bump the development build number with `node tools/dev-version.cjs patch` (`minor`/`major` for larger steps) and push. The number is part of the offline cache name: without a bump, installed development copies keep the previous build. `tests/dev-version.test.cjs` checks that `sw.js` matches. When the checks (**Puzzle contract**) pass, the **Publish site** workflow republishes `…/dev/`; the children's version stays as it is. Its installed app picks up the new development copy through the normal update check while in development mode.
2. Review the changed Rätsel in the development version (Rätsel-Prüfung). Approvals go to the `puzzle-review-data` branch as before.

## Releasing to the children

Release only when every Rätsel is approved in the development version.

1. `git fetch origin puzzle-review-data dev main`, check out `dev`.
2. Bump `FK.VERSION` (`js/core/util.js`) to the children's next version (for example 10.0.0 → 10.1.0) and run `node tools/dev-version.cjs patch` so the cache identifier in `sw.js` changes. The development build number keeps counting on `dev`; the release notes can name the build it came from ("10.1.0 = Entwicklung 1.12.23").
3. `node tools/release-manifest.cjs` — asks the real app which Rätsel the published approvals release and writes `js/friends/released.js`. It stops when a Rätsel is not approved (`--allow-unapproved` releases without it).
4. Run the checks in [Development](DEVELOPMENT.md), including `tests/release-channel.test.cjs` (every released Rätsel matches its current revision) and `tests/release-channel-browser.cjs`.
5. Commit on `dev`, then fast-forward `main` to it and push both. The workflow publishes both copies; the children's app updates at its next idle update check, keeping save and play log.

A code change to a released Rätsel without a new release list fails `tests/release-channel.test.cjs`, and would otherwise hide that Rätsel in the children's version until it is reviewed and released again.

## One-time setup

**Settings → Pages → Build and deployment → Source: GitHub Actions.** Until then GitHub keeps publishing `main` from the branch: the children's version works, and Entwicklermodus reports that the development version is not published yet.
