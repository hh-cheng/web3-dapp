import { Loader2 } from 'lucide-react'

import GraphTable from './GraphTable'

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      <span className="ml-2">Loading The Graph data...</span>
    </div>
  )
}

function ErrorState({ error }: { error: Error | null }) {
  const errorMessage = error?.message || 'Failed to fetch data from The Graph'

  return (
    <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-6">
      <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">
        Error Loading Data
      </h3>
      <p className="text-sm text-red-800 dark:text-red-200">{errorMessage}</p>
    </div>
  )
}

function NoDataState() {
  return (
    <div className="text-center py-8">
      <p className="text-gray-500 dark:text-gray-400">No data available</p>
    </div>
  )
}

export default function DataContent({
  isLoading,
  error,
  data,
}: {
  isLoading: boolean
  error: Error | null
  data: any
}) {
  if (isLoading && !data) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  if (data?.dataWrittens) {
    return <GraphTable data={data.dataWrittens} />
  }

  return <NoDataState />
}
