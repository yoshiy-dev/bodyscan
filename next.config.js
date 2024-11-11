// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development',
// });

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'javascript/auto',
      loader: 'file-loader',
      options: {
        publicPath: '/_next/static/wasm/',
        outputPath: 'static/wasm/',
        name: '[name]-[hash].[ext]',
      },
    });
    return config;
  },
  images: {
    domains: [
      'cloudflare-ipfs.com',
      'avatars.githubusercontent.com',
      'bone-scan.s3.ap-northeast-1.amazonaws.com',
      'sprofile.line-scdn.net',
      'profile.line-scdn.net',
    ],
  },
  reactStrictMode: true,
};
