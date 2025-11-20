'use client'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Layers } from 'lucide-react'

import GlassSurface from '@/components/ui/GlassSurface'

export default function Home() {
  return (
    <section className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline */}
          <div className="text-center mb-16 space-y-6 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="text-foreground">Hello Dapp</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Build, deploy, and interact with Web3 smart contracts on the
              blockchain with modern developer experience
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Explore Features
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
            >
              View Documentation
            </Link>
          </div>

          {/* Featured Glass Card */}
          <div className="relative mb-32">
            <GlassSurface
              blur={12}
              width="100%"
              height="auto"
              displace={10}
              redOffset={3}
              opacity={0.8}
              blueOffset={18}
              brightness={75}
              greenOffset={10}
              borderRadius={20}
              mixBlendMode="normal"
              distortionScale={-100}
            >
              <div className="p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Fast Deployment</h3>
                      <p className="text-sm text-muted-foreground">
                        Deploy contracts instantly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Secure</h3>
                      <p className="text-sm text-muted-foreground">
                        Built on proven technology
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Layers className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Composable</h3>
                      <p className="text-sm text-muted-foreground">
                        Modular architecture
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassSurface>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="pt-20 px-4 sm:px-8 border-t border-border"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for Web3 development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Smart Contract Development',
                description:
                  'Write, test, and deploy Solidity smart contracts with ease',
              },
              {
                title: 'Wallet Integration',
                description: 'Seamless integration with popular Web3 wallets',
              },
              {
                title: 'RPC & GraphQL',
                description: 'Query blockchain data efficiently with GraphQL',
              },
              {
                title: 'Multi-Network Support',
                description: 'Deploy to Ethereum, Sepolia, and other networks',
              },
              {
                title: 'Real-time Updates',
                description:
                  'Monitor contract events and transactions in real-time',
              },
              {
                title: 'Developer Tools',
                description:
                  'Comprehensive CLI tools and utilities for developers',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors hover:border-primary/30 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                  <div className="w-5 h-5 rounded bg-primary/40 group-hover:bg-primary/60 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '100+', label: 'Active Developers' },
              { number: '5,000+', label: 'Contracts Deployed' },
              { number: '10M+', label: 'Transactions' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-lg bg-card/50 border border-border"
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4 sm:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect your wallet and start building decentralized applications
            today
          </p>
        </div>
      </section>

      {/* Decorative gradient elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
