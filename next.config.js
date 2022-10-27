/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    RPC: 'https://ssc-dao.genesysgo.net/',
    STORE: '4BDFZHQLNKvtpkqu2ZCCfS9P5DSRu4jAVjG14dBxZG1Q',
    OWNER: 'rgbxqdf7E3WJEwPHBnuwtDkgQ9AEghMYMC2pYdDxnkt',
    MINT: 'EwHmyU51kqckhqcCZUa691sXT3VKDRS31to1jEWUNttM',
    TOKEN: 'DugNeL3nC2ursSGQu99wVpxQXSBTU3HfmHih2kfnF4V8',
    CURRENCY: 'PXLSmSBWHU8yAqNof9Ry2LPsZxHSYB4xXsBaQWUmEzV',
    START: 1667246400,
    PRICE: 240
  },
};

module.exports = nextConfig;
