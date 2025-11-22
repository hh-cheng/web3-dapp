import { ethers } from 'ethers'
import { useConnection } from 'wagmi'
import { useQuery } from '@tanstack/react-query'

import type { EthersData } from './types'

const LOGGER_CONTRACT = process.env.LOGGER_CONTRACT!

export default function useEthersService() {
  const { address } = useConnection()

  const { data: blockData, isLoading: isLoadingBlock } = useQuery({
    queryKey: ['readByEthers', address],
    queryFn: async (): Promise<EthersData | null> => {
      if (!address || !window.ethereum) return null

      try {
        const provider = new ethers.BrowserProvider(window.ethereum)

        // 1. Account related data
        const accountBalance = await provider.getBalance(address)
        const accountNonce = await provider.getTransactionCount(address)

        // 2. Block information
        const block = await provider.getBlock('latest')
        const blockNumber = block?.number
        const blockTimestamp = block?.timestamp
        const gasLimit = block?.gasLimit.toString()

        // 3. Smart contract data (Logger contract)
        // const contract = new ethers.Contract(
        //   LOGGER_CONTRACT,
        //   LOGGER_ABI,
        //   provider,
        // )
        // Get contract code to verify it exists
        const contractData = await provider.getCode(LOGGER_CONTRACT)

        // 4. Logs/Events (DataWritten events from Logger contract)
        const logs = await provider.getLogs({
          address: LOGGER_CONTRACT,
          topics: [
            ethers.id('DataWritten(address,uint256,string)'),
            ethers.AbiCoder.defaultAbiCoder().encode(['address'], [address]),
          ],
          fromBlock: Math.max(0, (blockNumber || 0) - 1000), // Last 1000 blocks
          toBlock: 'latest',
        })

        // 5. Gas price and fees
        const feeData = await provider.getFeeData()
        const gasPrice = feeData.gasPrice?.toString()
        const baseFeePerGas = feeData.maxFeePerGas?.toString()
        const priorityFeePerGas = feeData.maxPriorityFeePerGas?.toString()

        return {
          logs,
          gasPrice,
          gasLimit,
          blockNumber,
          accountNonce,
          contractData,
          baseFeePerGas,
          blockTimestamp,
          priorityFeePerGas,
          accountBalance: ethers.formatEther(accountBalance),
        }
      } catch (error) {
        console.error('Error fetching ethers data:', error)
        return null
      }
    },
    enabled: !!address && !!window.ethereum,
    staleTime: 10 * 1000, // 10 seconds
    refetchInterval: 12 * 1000, // Refetch every 12 seconds
  })

  return { blockData, isLoadingBlock }
}
