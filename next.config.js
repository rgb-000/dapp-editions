/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    RPC: 'https://solana-mainnet.g.alchemy.com/v2/fjViXH-lASh7tCrsn_67DTR5lCBs12xG',  
    STORE: '4BDFZHQLNKvtpkqu2ZCCfS9P5DSRu4jAVjG14dBxZG1Q',
    OWNER: 'rgbxqdf7E3WJEwPHBnuwtDkgQ9AEghMYMC2pYdDxnkt',
    CURRENCY: 'PXLSmSBWHU8yAqNof9Ry2LPsZxHSYB4xXsBaQWUmEzV',
    MINT: '45QeXbJ3gL5WoAzUyVGXc7HZz5KoXD9K1RMnrJW9JVMQ',
    TOKEN: 'BuanzYyAkBAupuQVwaSGZeZnTpbEQqqkcbTjBzQyGuSR',
    IMG: 'https://arweave.net/5a3SrXuR84eMihLo6bOUhuDS0hy5OF_t3uzwbB_3vsQ',
    NAME: 'The Wanderer',
    START: 1668340800,
    PRICE: 44
  },
};

module.exports = nextConfig;
