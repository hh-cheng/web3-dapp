'use client'
import { WagmiProvider } from 'wagmi'
import type { ReactNode } from 'react'
import { mainnet, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'

import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

export const wagmiConfig = getDefaultConfig({
  ssr: true,
  appName: 'Hello Dapp',
  chains: [mainnet, sepolia],
  projectId: process.env.WALLETCONNECT_PROJECT_ID!,
})

export default function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
