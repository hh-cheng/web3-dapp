import SimpleCard from '@/components/ui/SimpleCard'

export default function NoWalletState() {
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
