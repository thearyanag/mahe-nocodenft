/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NFT_STORAGE_API_KEY: process.env.NFT_STORAGE_API_KEY,
    UNDERDOG_PROTOCOL_API_KEY: process.env.UNDERDOG_PROTOCOL_API_KEY,
    IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID,
    IMGUR_CLIENT_SECRET: process.env.IMGUR_CLIENT_SECRET
  },
}

module.exports = nextConfig
