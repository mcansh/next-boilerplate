const withSourceMaps = require('@zeit/next-source-maps')();
const withOffline = require('next-offline');

const nextConfig = {
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: 'static/sw.js',
    runtimeCaching: [
      {
        handler: 'StaleWhileRevalidate',
        urlPattern: /[.](webp|png|jpg|woff|woff2)/,
      },
      {
        handler: 'NetworkFirst',
        urlPattern: /^https?.*/,
      },
    ],
  },
  crossOrigin: 'anonymous',
  target: 'serverless',
  experimental: {
    modern: true,
  },
  rewrites: () => [
    {
      source: '/sw.js',
      destination: '/_next/static/sw.js',
    },
  ],
  env: {
    VERSION: require('./package.json').version,
  },
  webpack: (config, { buildId, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.BUILD_ID': JSON.stringify(buildId),
      })
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                { removeViewBox: false },
                { removeDimensions: true },
                {
                  prefixIds: {
                    delim: '_',
                    prefixIds: true,
                    prefixClassNames: false,
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = withSourceMaps(withOffline(nextConfig));
