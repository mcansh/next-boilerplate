const withOffline = require('next-offline');
const withTypescript = require('@zeit/next-typescript');

const nextConfig = {
  target: 'serverless',
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: 'static/sw.js',
    runtimeCaching: [
      {
        handler: 'staleWhileRevalidate',
        urlPattern: /[.](webp|png|jpg|svg|css)/,
      },
      {
        handler: 'networkFirst',
        urlPattern: /^https?.*/,
      },
    ],
  },
};

module.exports = withOffline(withTypescript(nextConfig));
