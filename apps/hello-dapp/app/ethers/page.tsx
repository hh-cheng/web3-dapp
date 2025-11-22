'use client'
import useEthersService from './service'
import DataDisplay from './components/DataDisplay'
import LoadingState from './components/LoadingState'
import NoWalletState from './components/NoWalletState'

export default function EthersPage() {
  const { blockData, isLoadingBlock } = useEthersService()

  let content = null

  if (isLoadingBlock) {
    content = <LoadingState />
  } else if (!blockData) {
    content = <NoWalletState />
  } else {
    content = <DataDisplay blockData={blockData} />
  }

  return (
    <section className="w-full space-y-6 px-6 pb-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Ethers Query</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Real-time blockchain data from the network
        </p>
      </div>

      {content}
    </section>
  )
}
