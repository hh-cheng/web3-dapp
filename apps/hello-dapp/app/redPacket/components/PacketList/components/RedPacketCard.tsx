import { ethers } from 'ethers'
import { useConnection } from 'wagmi'
import { Loader2, Users } from 'lucide-react'
import { useTransition, useContext } from 'react'

import { truncateAddress } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import SimpleCard from '@/components/ui/SimpleCard'
import { RedPacketContext } from '../../../service'

export interface RedPacketItem {
  id: number
  sender: string
  isEqual: boolean
  totalShares: string
  totalAmount: string
  remainingAmount: string
  remainingShares: string
}

interface RedPacketCardProps {
  packet: RedPacketItem
}

export default function RedPacketCard({ packet }: RedPacketCardProps) {
  const { address } = useConnection()
  const [isGrabbing, startGrabbing] = useTransition()
  const { checkPacket, grabPacket } = useContext(RedPacketContext)

  const totalAmountEth = ethers.formatEther(packet.totalAmount)
  const remainingAmountEth = ethers.formatEther(packet.remainingAmount)
  const progress =
    Number(packet.totalShares) > 0
      ? ((Number(packet.totalShares) - Number(packet.remainingShares)) /
          Number(packet.totalShares)) *
        100
      : 0

  const canGrab = address && packet.remainingShares !== '0'

  const handleCheck = async () => {
    await checkPacket(packet.id)
  }

  const handleGrab = () => {
    startGrabbing(async () => {
      await grabPacket(packet.id)
    })
  }

  return (
    <SimpleCard>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Packet #{packet.id}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              From {truncateAddress(packet.sender)}
            </p>
          </div>
          <div className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
            {packet.isEqual ? 'Equal' : 'Random'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Total Amount
            </p>
            <p className="text-lg font-mono font-bold">{totalAmountEth} ETH</p>
          </div>
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Remaining
            </p>
            <p className="text-lg font-mono font-bold">
              {remainingAmountEth} ETH
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4 inline mr-1" />
              Shares: {packet.remainingShares} / {packet.totalShares}
            </span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={handleCheck}>
            View Details
          </Button>
          {canGrab && (
            <Button
              className="flex-1"
              disabled={isGrabbing}
              onClick={handleGrab}
            >
              {isGrabbing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Grabbing...
                </>
              ) : (
                'Grab Packet'
              )}
            </Button>
          )}
        </div>
      </div>
    </SimpleCard>
  )
}
