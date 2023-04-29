/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NFT_STORAGE_API_KEY: process.env.NFT_STORAGE_API_KEY,
    UNDERDOG_PROTOCOL_API_KEY: process.env.UNDERDOG_PROTOCOL_API_KEY,
    SOLANA_PRIVATE_KEY: process.env.SOLANA_PRIVATE_KEY,
    HELIUS_KEY: process.env.HELIUS_KEY,
  },
}

module.exports = nextConfig
