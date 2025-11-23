import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    LOGGER_CONTRACT: process.env.LOGGER_CONTRACT!,
    RED_PACKET_CONTRACT: process.env.RED_PACKET_CONTRACT!,
    WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID!,
  },
  turbopack: {
    root: path.join(__dirname), // __dirname 即 apps/hello-dapp
  },
}

export default nextConfig
