/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    RPC: 'https://ssc-dao.genesysgo.net/',
    STORE: '4BDFZHQLNKvtpkqu2ZCCfS9P5DSRu4jAVjG14dBxZG1Q',
    OWNER: 'rgbxqdf7E3WJEwPHBnuwtDkgQ9AEghMYMC2pYdDxnkt',
    MINT: '3ro6x561VB8k58DUaaQT5mVuDULcMAtEjsgDTVsunCLR',
    TOKEN: '3nJr1RLjEAVTE7rdA8CDryZftW79LLFRiTSBWkQ9cEGA',
    CURRENCY: 'PXLSmSBWHU8yAqNof9Ry2LPsZxHSYB4xXsBaQWUmEzV',
  },
};

module.exports = nextConfig;
