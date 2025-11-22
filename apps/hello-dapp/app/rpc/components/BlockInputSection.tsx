import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import SimpleCard from '@/components/ui/SimpleCard'

export default function BlockInputSection({
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
