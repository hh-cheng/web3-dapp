import GlassSurface from '@/components/ui/GlassSurface'

export default function NoWalletState() {
  return (
    <GlassSurface
      width="100%"
      height={200}
      className="flex items-center justify-center"
    >
      <div className="text-center">
        <p className="text-lg font-semibold">Please connect your wallet</p>
        <p className="text-sm text-gray-500">
          Connect a wallet to view blockchain data
        </p>
      </div>
    </GlassSurface>
  )
}
