import { ethers } from 'ethers'

import { truncateAddress } from '@/lib/utils'
import type { PacketDetail } from '@/app/redPacket/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface PacketDetailDialogProps {
  open: boolean
  detail: PacketDetail | null
  onOpenChange: (open: boolean) => void
}

export default function PacketDetailDialog(props: PacketDetailDialogProps) {
  const { detail, open, onOpenChange } = props
  if (!detail) return null

  const totalAmountEth = ethers.formatEther(detail.totalAmount)
  const remainingAmountEth = ethers.formatEther(detail.remainingAmount)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Packet Details</DialogTitle>
          <DialogDescription>
            View detailed information about this red packet
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Sender</p>
            <p className="font-mono text-sm">
              {truncateAddress(detail.sender)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Total Amount
              </p>
              <p className="font-mono font-bold">{totalAmountEth} ETH</p>
            </div>
            <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Remaining
              </p>
              <p className="font-mono font-bold">{remainingAmountEth} ETH</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Total Shares
              </p>
              <p className="font-mono font-bold">{detail.totalShares}</p>
            </div>
            <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Remaining Shares
              </p>
              <p className="font-mono font-bold">{detail.remainingShares}</p>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Distribution Type
            </p>
            <p className="font-semibold">
              {detail.isEqual ? 'Equal Distribution' : 'Random Distribution'}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
