if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, i) => {
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => a(e, c),
      d = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(n.map((e) => d[e] || r(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-7c2a5a06'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/PoseIcon/front.svg', revision: '3acfa8a191b34f22f16bc1dd12026220' },
        { url: '/PoseIcon/left.svg', revision: '5c863d6ddf06fda1bba1bad341bb6476' },
        { url: '/PoseIcon/right.svg', revision: '23db1a8e2e3b0eaa6f149b737bb0b95b' },
        {
          url: '/_next/static/XKDhBNzFkzbe-J4KG5QnW/_buildManifest.js',
          revision: 'df585f4c78a3f98a4fbc68cfa2d368f2',
        },
        {
          url: '/_next/static/XKDhBNzFkzbe-J4KG5QnW/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/0dec84ff-367e0466ea14e33d.js', revision: '367e0466ea14e33d' },
        { url: '/_next/static/chunks/122.afb49cde14bc41f0.js', revision: 'afb49cde14bc41f0' },
        { url: '/_next/static/chunks/237.b2fe47d24e17d2d3.js', revision: 'b2fe47d24e17d2d3' },
        { url: '/_next/static/chunks/343-b78851a3193bad30.js', revision: 'b78851a3193bad30' },
        { url: '/_next/static/chunks/481e1aca-77108d12e1c2d0a2.js', revision: '77108d12e1c2d0a2' },
        { url: '/_next/static/chunks/51890d21-1e9f28038ee64919.js', revision: '1e9f28038ee64919' },
        { url: '/_next/static/chunks/51d0d4f3-8c841d6f74b6401c.js', revision: '8c841d6f74b6401c' },
        { url: '/_next/static/chunks/649-55d134e0bbd038f0.js', revision: '55d134e0bbd038f0' },
        { url: '/_next/static/chunks/971-e5bb9c1a70b6f965.js', revision: 'e5bb9c1a70b6f965' },
        { url: '/_next/static/chunks/999-6926017982e81b8d.js', revision: '6926017982e81b8d' },
        { url: '/_next/static/chunks/ad7f724d-d4b95899d7449235.js', revision: 'd4b95899d7449235' },
        { url: '/_next/static/chunks/dfc3abff-bd80852544a39892.js', revision: 'bd80852544a39892' },
        { url: '/_next/static/chunks/e0fc167a-f44f0246aabc265c.js', revision: 'f44f0246aabc265c' },
        { url: '/_next/static/chunks/f8818fd4-9adb2a9cd14991a2.js', revision: '9adb2a9cd14991a2' },
        { url: '/_next/static/chunks/framework-73b8966a3c579ab0.js', revision: '73b8966a3c579ab0' },
        { url: '/_next/static/chunks/main-9ed49d467d20223c.js', revision: '9ed49d467d20223c' },
        {
          url: '/_next/static/chunks/pages/_app-027ef0897d35b72a.js',
          revision: '027ef0897d35b72a',
        },
        {
          url: '/_next/static/chunks/pages/_error-3f6d1c55bb8051ab.js',
          revision: '3f6d1c55bb8051ab',
        },
        {
          url: '/_next/static/chunks/pages/analysis-d57528c835cc47b3.js',
          revision: 'd57528c835cc47b3',
        },
        {
          url: '/_next/static/chunks/pages/camera-bd5e8eee635b047d.js',
          revision: 'bd5e8eee635b047d',
        },
        {
          url: '/_next/static/chunks/pages/camera/data-59baba542a5ee164.js',
          revision: '59baba542a5ee164',
        },
        {
          url: '/_next/static/chunks/pages/camera/edit-cc8a58219596df9d.js',
          revision: 'cc8a58219596df9d',
        },
        {
          url: '/_next/static/chunks/pages/index-445fde38a326721c.js',
          revision: '445fde38a326721c',
        },
        {
          url: '/_next/static/chunks/pages/patients-007b76e7daa8696d.js',
          revision: '007b76e7daa8696d',
        },
        {
          url: '/_next/static/chunks/pages/patients/%5Bpatient%5D-364f7f21bdf314e9.js',
          revision: '364f7f21bdf314e9',
        },
        {
          url: '/_next/static/chunks/pages/patients/%5Bpatient%5D/posenet-29b22a1ef455d617.js',
          revision: '29b22a1ef455d617',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        { url: '/_next/static/chunks/webpack-101b304177ce7d63.js', revision: '101b304177ce7d63' },
        { url: '/_next/static/css/68100447fbcb2beb.css', revision: '68100447fbcb2beb' },
        { url: '/appicon.svg', revision: '45fee7520fd569e69943b35a7e8e471f' },
        { url: '/favicon.ico', revision: '7f98bbc43ba0d1dbf3564adf0821a304' },
        { url: '/images/noimage-capture.png', revision: '3bed360e3b1a4be53a83a17c61b99839' },
        { url: '/images/noimage.webp', revision: '2b6901da58d0119912b6719801cff7dd' },
        { url: '/images/repo.png', revision: 'b35897a2739df06bc9ff7c5f7f50fe27' },
        { url: '/images/repo2.png', revision: 'eee216fe34e19322828df8e47fcef801' },
        { url: '/images/report/report.png', revision: '894f647f2ace63b2935db4587c915bb4' },
        { url: '/images/report/report2.png', revision: '4aba8fb10ffe529427dfbab0d003b380' },
        { url: '/images/report/report3.png', revision: 'd74242402afe42b7416ca7db9a2d272c' },
        { url: '/images/report/report4.png', revision: '6c0a1bcf0954de21279e33ad26bcac45' },
        { url: '/images/report/レオタード学長.svg', revision: '112253d8bd38094cdea81c693de14364' },
        { url: '/images/report/骨盤.png', revision: '20c1288b429929b7ea878bfdcf37efbf' },
        { url: '/images/sample.jpg', revision: '37994902fc84eecaad7592d2bf6c78eb' },
        { url: '/images/sample/frontpose.png', revision: 'bda761ed15ddd06f5a6b92dfdbfc37e9' },
        { url: '/images/sample/sidepose.png', revision: 'f7cd2999b45483c6f357556ea14b6caa' },
        { url: '/images/sample2.jpg', revision: '94c84f3d2007edd44b6db607fd364f53' },
        { url: '/images/schema.png', revision: 'a511e3aa7db656bdef9d99051bb4e0c1' },
        { url: '/manifest/icon.svg', revision: 'fcee90099ae00f85374edd9541faabf5' },
        { url: '/manifest/manifest.json', revision: '2dc7524c94ab5d2be4884c131928173b' },
        { url: '/manifest/sense-192*192.png', revision: '9d66648cea53448946cfcc4e27da3fd4' },
        { url: '/manifest/sense-256*256.png', revision: 'ca4727ec1b43be8d10b4ab54550c4654' },
        { url: '/manifest/sense-384*384.png', revision: '9c8d79f60fbd01b99795d3e941a5b71e' },
        { url: '/manifest/sense-512*512.png', revision: '71370d25da71545cc756eb3f486aa3b0' },
        { url: '/sounds/Camera-Phone03-1.mp3', revision: '796303aba6e083b0669b6827f7693fa9' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: n }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    // e.registerRoute(
    //   /\.(?:mp4)$/i,
    //   new e.CacheFirst({
    //     cacheName: 'static-video-assets',
    //     plugins: [
    //       new e.RangeRequestsPlugin(),
    //       new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
    //     ],
    //   }),
    //   'GET',
    // ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET',
    );
  e.registerRoute(new RegExp('/camera'), new workbox.strategies.NetworkOnly());
});
