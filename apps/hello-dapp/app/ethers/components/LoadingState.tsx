import { Loader2 } from 'lucide-react'

export default function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading blockchain data...</span>
    </div>
  )
}
