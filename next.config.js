/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    RPC: 'https://solana-mainnet.g.alchemy.com/v2/fjViXH-lASh7tCrsn_67DTR5lCBs12xG',  
    STORE: '4BDFZHQLNKvtpkqu2ZCCfS9P5DSRu4jAVjG14dBxZG1Q',
    OWNER: 'rgbxqdf7E3WJEwPHBnuwtDkgQ9AEghMYMC2pYdDxnkt',
    CURRENCY: 'PXLSmSBWHU8yAqNof9Ry2LPsZxHSYB4xXsBaQWUmEzV',
    MINT: '4RUkkFeLxJ9zchnZHN5oLWHUkSP6BkN4NXftSiJxCpzE',
    TOKEN: 'FVCngRpHdQfVZ6SVfMsuFA69JCKL4m8ZmBFP7q9S8899',
    IMG: 'https://arweave.net/AEa4U2xhfTr9A7yeo8iwbWPOhVQxe2EiwaLBtH6fQbU',
    NAME: 'Kodama Forest',
    START: 1670252400,
    PRICE: 360
  },
};

module.exports = nextConfig;
