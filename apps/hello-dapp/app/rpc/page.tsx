'use client'

import { useState } from 'react'
import { useConnection } from 'wagmi'
import { Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { getBalance, getBlock } from './actions'
import SimpleCard from '@/components/ui/SimpleCard'
import { truncateAddress, formatTimestamp } from '@/lib/utils'

function BalanceSection({ balance }: { balance: string }) {
  return (
    <SimpleCard>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Account Balance</h2>
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Balance
          </p>
          <p className="text-2xl font-mono font-bold">{balance}</p>
          <p className="text-xs text-gray-500 mt-1">Wei</p>
        </div>
      </div>
    </SimpleCard>
  )
}

function BlockInputSection({
  onFetch,
  isLoading,
}: {
  onFetch: (blockNum: number) => void
  isLoading: boolean
}) {
  const [blockNumber, setBlockNumber] = useState('')

  const handleFetch = () => {
    if (blockNumber && !isNaN(Number(blockNumber))) {
      onFetch(Number(blockNumber))
    }
  }

  return (
    <SimpleCard>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Query Block</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Block Number
            </label>
            <input
              type="number"
              value={blockNumber}
              onChange={(e) => setBlockNumber(e.target.value)}
              placeholder="Enter block number"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={handleFetch}
            disabled={!blockNumber || isLoading}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? 'Fetching...' : 'Fetch Block'}
          </button>
        </div>
      </div>
    </SimpleCard>
  )
}

interface BlockData {
  success: boolean
  data: {
    number: string
    hash: string
    timestamp: string
    miner: string
    gasUsed: string
    gasLimit: string
    transactions: string[]
  } | null
  msg: string
}

function BlockResultSection({
  blockData,
}: {
  blockData: BlockData | undefined
}) {
  if (!blockData) {
    return (
      <SimpleCard>
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Enter a block number to view details
          </p>
        </div>
      </SimpleCard>
    )
  }

  if (!blockData.success) {
    return (
      <SimpleCard>
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400 font-semibold">
            Error: {blockData.msg}
          </p>
        </div>
      </SimpleCard>
    )
  }

  const data = blockData.data
  if (!data) {
    return (
      <SimpleCard>
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Block not found</p>
        </div>
      </SimpleCard>
    )
  }

  return (
    <SimpleCard>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Block Details</h2>
        <div className="space-y-3">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Block Number
            </p>
            <p className="text-lg font-mono font-bold">
              {data.number ? parseInt(data.number, 16) : '-'}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Block Hash
            </p>
            <p className="text-sm font-mono font-bold break-all">{data.hash}</p>
          </div>

          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Timestamp
            </p>
            <p className="text-sm font-mono font-bold">
              {data.timestamp
                ? formatTimestamp(parseInt(data.timestamp, 16))
                : '-'}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Miner
            </p>
            <p className="text-sm font-mono font-bold">
              {truncateAddress(data.miner)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Gas Used
              </p>
              <p className="text-sm font-mono font-bold">
                {data.gasUsed
                  ? parseInt(data.gasUsed, 16).toLocaleString()
                  : '-'}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Gas Limit
              </p>
              <p className="text-sm font-mono font-bold">
                {data.gasLimit
                  ? parseInt(data.gasLimit, 16).toLocaleString()
                  : '-'}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Transaction Count
            </p>
            <p className="text-lg font-mono font-bold">
              {data.transactions?.length ?? 0}
            </p>
          </div>
        </div>
      </div>
    </SimpleCard>
  )
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      <span className="ml-2">Loading RPC data...</span>
    </div>
  )
}

function NoWalletState() {
  return (
    <SimpleCard>
      <div className="text-center py-8">
        <p className="text-lg font-semibold">Please connect your wallet</p>
        <p className="text-sm text-gray-500">
          Connect a wallet to fetch balance information
        </p>
      </div>
    </SimpleCard>
  )
}

export default function RpcPage() {
  const { address } = useConnection()
  const [blockResult, setBlockResult] = useState<BlockData | undefined>()
  const [blockLoading, setBlockLoading] = useState(false)

  const { data: balanceData, isLoading: balanceLoading } = useQuery({
    queryKey: ['balance', address],
    queryFn: () => getBalance(address!),
    enabled: !!address,
    staleTime: 10 * 1000,
    refetchInterval: 12 * 1000,
  })

  const handleBlockFetch = async (blockNum: number) => {
    setBlockLoading(true)
    try {
      const result = await getBlock(blockNum)
      setBlockResult(result as BlockData)
    } catch (error) {
      console.error('Error fetching block:', error)
    } finally {
      setBlockLoading(false)
    }
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
