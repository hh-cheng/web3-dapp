import type { Metadata } from 'next'
import localFont from 'next/font/local'

import HeaderNav from '@/components/layout/HeaderNav'
import QueryProvider from '@/components/layout/QueryProvider'
import WalletProvider from '@/components/business/wallet/provider'

import './globals.css'

const firaCode = localFont({
  src: [
    {
      path: '../public/fonts/FiraCode-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/FiraCode-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/FiraCode-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-fira-code',
})

export const metadata: Metadata = {
  title: 'Hello Dapp',
  description: 'Hello Dapp',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${firaCode.variable} antialiased`}>
        <QueryProvider>
          <WalletProvider>
            <HeaderNav />
            <main className="pt-32 px-8">{children}</main>
          </WalletProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
