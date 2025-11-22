'use client'

import { useConnection } from 'wagmi'
import { useState, useTransition } from 'react'
import { useQuery } from '@tanstack/react-query'

import type { BlockData } from './types'
import { getBalance, getBlock } from './actions'
import SimpleCard from '@/components/ui/SimpleCard'
import LoadingState from './components/LoadingState'
import NoWalletState from './components/NoWalletState'
import BalanceSection from './components/BalanceSection'
import BlockInputSection from './components/BlockInputSection'
import BlockResultSection from './components/BlockResultSection'

export default function RpcPage() {
  const { address } = useConnection()
  const [blockLoading, startBlockLoading] = useTransition()
  const [blockResult, setBlockResult] = useState<BlockData | null>(null)

  const { data: balanceData, isLoading: balanceLoading } = useQuery({
    queryKey: ['balance', address],
    enabled: !!address,
    staleTime: 10 * 1000,
    refetchInterval: 12 * 1000,
    queryFn: () => getBalance(address!),
  })

  const handleBlockFetch = (blockNum: number) => {
    startBlockLoading(async () => {
      try {
        const result = await getBlock(blockNum)
        setBlockResult(result as BlockData)
      } catch (error) {
        console.error('Error fetching block:', error)
      }
    })
  }

  if (balanceLoading) {
    return <LoadingState />
  }

  if (!address) {
    return <NoWalletState />
  }

  return (
    <section className="w-full space-y-6 p-6 pt-0">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">RPC Explorer</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Query blockchain data via RPC calls
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {balanceData?.success && balanceData.data ? (
            <BalanceSection balance={balanceData.data} />
          ) : balanceData?.msg ? (
            <SimpleCard>
              <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400">
                  {balanceData.msg}
                </p>
              </div>
            </SimpleCard>
          ) : null}
        </div>

        <div className="space-y-6">
          <BlockInputSection
            onFetch={handleBlockFetch}
            isLoading={blockLoading}
          />
          <BlockResultSection blockData={blockResult} />
        </div>
      </div>
    </section>
  )
}
