export default function StatusIndicator({ isLoading }: { isLoading: boolean }) {
  const statusColor = isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
  const statusText = isLoading
    ? 'Fetching...'
    : 'Auto-refreshing every 12 seconds'

  return (
    <div className="flex items-center gap-2 mt-3">
      <div
        className={`h-2 w-2 rounded-full transition-colors ${statusColor}`}
      />
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {statusText}
      </span>
    </div>
  )
}
