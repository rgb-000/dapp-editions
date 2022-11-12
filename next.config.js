/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    RPC: 'https://bold-weathered-dew.solana-mainnet.quiknode.pro/22437e18929d3bc81fb32e42a2979872e5191b43/',  
    STORE: '4BDFZHQLNKvtpkqu2ZCCfS9P5DSRu4jAVjG14dBxZG1Q',
    OWNER: 'rgbxqdf7E3WJEwPHBnuwtDkgQ9AEghMYMC2pYdDxnkt',
    CURRENCY: 'PXLSmSBWHU8yAqNof9Ry2LPsZxHSYB4xXsBaQWUmEzV',
    MINT: '45QeXbJ3gL5WoAzUyVGXc7HZz5KoXD9K1RMnrJW9JVMQ',
    TOKEN: 'BuanzYyAkBAupuQVwaSGZeZnTpbEQqqkcbTjBzQyGuSR',
    IMG: 'https://arweave.net/5a3SrXuR84eMihLo6bOUhuDS0hy5OF_t3uzwbB_3vsQ',
    NAME: 'The Wanderer',
    START: 1668196800,
    PRICE: 44
  },
};

module.exports = nextConfig;
