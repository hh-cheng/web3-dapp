import SimpleCard from '@/components/ui/SimpleCard'

import type { BlockData } from '../types'
import { formatTimestamp, truncateAddress } from '@/lib/utils'

export default function BlockResultSection({
  blockData,
}: {
  blockData: BlockData | null
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
