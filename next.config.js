/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    RPC: 'https://ssc-dao.genesysgo.net/',
    STORE: '4BDFZHQLNKvtpkqu2ZCCfS9P5DSRu4jAVjG14dBxZG1Q',
    OWNER: 'rgbxqdf7E3WJEwPHBnuwtDkgQ9AEghMYMC2pYdDxnkt',
    MINT: 'CWagE6tmLgq9Fujqp6oLBGm2P9WdZ3Anzi436Q7k1dsj',
    TOKEN: 'EUogvG6QfbFvhgPp9jQ6qyiFds6kxvgchaXb67kqFFu3',
    CURRENCY: 'PXLSmSBWHU8yAqNof9Ry2LPsZxHSYB4xXsBaQWUmEzV',
    START: 1667246400,
    PRICE: 240
  },
};

module.exports = nextConfig;
