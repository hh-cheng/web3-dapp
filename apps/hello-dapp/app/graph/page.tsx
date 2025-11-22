'use client'
import { useQuery } from '@tanstack/react-query'

import { getGraphData } from './actions'
import WriteLog from './components/WriteLog'
import DataContent from './components/DataContent'
import StatusIndicator from './components/StatusIndicator'

export default function GraphPage() {
  const { data, isLoading, error } = useQuery({
    queryFn: getGraphData,
    queryKey: ['graphData'],
    retry: 2, // Retry twice on failure
    staleTime: 12 * 1000, // 12 seconds
    refetchInterval: 12 * 1000, // Refetch every 12 seconds
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  return (
    <section className="sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">The Graph Data</h1>
          <p className="text-muted-foreground">
            Displaying the top 10 blockchain events from The Graph protocol
          </p>
          <StatusIndicator isLoading={isLoading} />
        </div>

        <WriteLog />

        <DataContent isLoading={isLoading} error={error} data={data} />
      </div>
    </section>
  )
}
