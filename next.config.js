/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    RPC: 'https://ssc-dao.genesysgo.net/',  
    STORE: '4BDFZHQLNKvtpkqu2ZCCfS9P5DSRu4jAVjG14dBxZG1Q',
    OWNER: 'rgbxqdf7E3WJEwPHBnuwtDkgQ9AEghMYMC2pYdDxnkt',
    CURRENCY: 'PXLSmSBWHU8yAqNof9Ry2LPsZxHSYB4xXsBaQWUmEzV',
    MINT: '6p1bVbJPT9RvZtGUy6ownxrARwLVGQ1gMmJgYrVqjydY',
    TOKEN: '3Wi32uwVkNtGP7GwzR8s9yCJ7vK9WfzyFxpp9VGV8srx',
    IMG: 'https://arweave.net/8nEi_fkLwK6AWc97vPT3Z9no1BzprLoplHclhhMvIvI',
    NAME: 'Argonath',
    START: 1667847600,
    PRICE: 240
  },
};

module.exports = nextConfig;
