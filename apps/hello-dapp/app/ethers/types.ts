import type { ethers } from 'ethers'

export interface EthersData {
  // 1. Account related data
  accountBalance?: string
  accountNonce?: number

  // 2. Block information
  blockNumber?: number
  blockTimestamp?: number
  gasLimit?: string

  // 3. Smart contract data
  contractData?: string

  // 4. Logs/Events
  logs?: ethers.Log[]

  // 5. Gas price and fees
  gasPrice?: string
  baseFeePerGas?: string
  priorityFeePerGas?: string
}

export const LOGGER_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      { indexed: false, internalType: 'string', name: 'note', type: 'string' },
    ],
    name: 'DataWritten',
    type: 'event',
  },
]
