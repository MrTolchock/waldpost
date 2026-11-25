/* Which version of Waldpost this is.

   FK.CHANNEL
     'main' – the children's version: only the Rätsel in js/friends/released.js, no review function.
     'dev'  – the development version: Rätsel review and approval live on GitHub.
   FK.DEV_SITE
     true only in the published development copy at …/dev/ (the site deploy, .github/workflows/pages.yml, puts
     `window.WALDPOST_DEV_SITE = true;` in front of this file there). It has its own save, records no play log and
     always returns to the children's version when the app is opened again.

   A plain copy of the code on any real host is the children's version, so the review function can never reach a
   child by accident. On a local test server the channel is 'dev' unless ?channel=main is given. */
(function () {
  'use strict';
  const FK = (window.FK = window.FK || {});
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const devSite = window.WALDPOST_DEV_SITE === true;
  FK.CHANNEL = devSite ? 'dev' : local ? (new URLSearchParams(location.search).get('channel') === 'main' ? 'main' : 'dev') : 'main';
  FK.DEV_SITE = devSite;

  // Entering the development copy is only possible from the children's version's Settings, which marks this app
  // session. Opening the app again (a fresh start, or coming back after a while in the background) leaves it.
  const MARK = 'waldpost.dev-entered', IDLE = 2 * 60 * 1000;
  FK.devSite = {
    MARK, IDLE,
    home(){ try { sessionStorage.removeItem(MARK); } catch { /* the address still leads home */ } location.replace(new URL('../', location.href).href); },
  };
  if (!devSite) return;
  let entered = null; try { entered = sessionStorage.getItem(MARK); } catch { /* no session storage: go home */ }
  if (!entered) { FK.devSite.home(); return; }
  let hiddenAt = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hiddenAt = Date.now();
    else if (hiddenAt && Date.now() - hiddenAt > IDLE) FK.devSite.home();
  });
})();
