'use client'
import { ethers } from 'ethers'
import { useState } from 'react'
import { useConnection } from 'wagmi'
import { useForm } from 'react-hook-form'
import { Loader2, Gift, Users, Wallet } from 'lucide-react'

import useRedPacketService from './service'
import { truncateAddress } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SimpleCard from '@/components/ui/SimpleCard'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form'

interface CreatePacketFormValues {
  totalShares: string
  isEqual: boolean
  amount: string
}

function BalanceCard({ balance }: { balance: string | null | undefined }) {
  if (balance === null || balance === undefined) return null

  return (
    <SimpleCard>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <Wallet className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your Balance
            </p>
            <p className="text-2xl font-bold font-mono">{balance} ETH</p>
          </div>
        </div>
      </div>
    </SimpleCard>
  )
}

function CreatePacketForm({
  onCreate,
  isLoading,
}: {
  onCreate: (totalShares: number, isEqual: boolean, amount: string) => void
  isLoading: boolean
}) {
  const form = useForm<CreatePacketFormValues>({
    defaultValues: {
      totalShares: '10',
      isEqual: false,
      amount: '0.01',
    },
  })

  const handleSubmit = (values: CreatePacketFormValues) => {
    onCreate(Number(values.totalShares), values.isEqual, values.amount)
  }

  return (
    <SimpleCard>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Gift className="h-6 w-6" />
            Create Red Packet
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create a new red packet for others to grab
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (ETH)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Total amount to distribute in the red packet
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalShares"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Shares</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10" {...field} />
                  </FormControl>
                  <FormDescription>
                    Number of people who can grab this packet
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isEqual"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Equal Distribution</FormLabel>
                    <FormDescription>
                      If checked, each share will be equal. Otherwise, random
                      amounts.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Gift className="h-4 w-4" />
                  Create Packet
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </SimpleCard>
  )
}

interface RedPacketItem {
  id: number
  sender: string
  totalAmount: string
  remainingAmount: string
  totalShares: string
  remainingShares: string
  isEqual: boolean
}

function RedPacketCard({
  packet,
  currentAddress,
  onCheck,
  onGrab,
  isGrabbing,
}: {
  packet: RedPacketItem
  currentAddress: string | undefined
  onCheck: (id: number) => void
  onGrab: (id: number) => void
  isGrabbing: boolean
}) {
  const totalAmountEth = ethers.formatEther(packet.totalAmount)
  const remainingAmountEth = ethers.formatEther(packet.remainingAmount)
  const progress =
    Number(packet.totalShares) > 0
      ? ((Number(packet.totalShares) - Number(packet.remainingShares)) /
          Number(packet.totalShares)) *
        100
      : 0

  const canGrab = currentAddress && packet.remainingShares !== '0'

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
          <Button
            variant="outline"
            onClick={() => onCheck(packet.id)}
            className="flex-1"
          >
            View Details
          </Button>
          {canGrab && (
            <Button
              onClick={() => onGrab(packet.id)}
              disabled={isGrabbing}
              className="flex-1"
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

function PacketList({
  packets,
  currentAddress,
  onCheck,
  onGrab,
  isGrabbing,
}: {
  packets: RedPacketItem[] | undefined
  currentAddress: string | undefined
  onCheck: (id: number) => void
  onGrab: (id: number) => void
  isGrabbing: boolean
}) {
  if (!packets || packets.length === 0) {
    return (
      <SimpleCard>
        <div className="text-center py-8">
          <Gift className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No red packets available yet
          </p>
        </div>
      </SimpleCard>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {packets.map((packet) => (
        <RedPacketCard
          key={packet.id}
          packet={packet}
          currentAddress={currentAddress}
          onCheck={onCheck}
          onGrab={onGrab}
          isGrabbing={isGrabbing}
        />
      ))}
    </div>
  )
}

function PacketDetailModal({
  detail,
  onClose,
}: {
  detail: any
  onClose: () => void
}) {
  if (!detail) return null

  const totalAmountEth = ethers.formatEther(detail.totalAmount)
  const remainingAmountEth = ethers.formatEther(detail.remainingAmount)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <SimpleCard className="max-w-md w-full">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Packet Details</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              ×
            </Button>
          </div>

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

          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </SimpleCard>
    </div>
  )
}

export default function RedPacketPage() {
  const { address } = useConnection()
  const {
    redPacketData,
    packetDetail,
    userBalance,
    checkPacket,
    createPacket,
    grabPacket,
  } = useRedPacketService()

  const [isCreating, setIsCreating] = useState(false)
  const [isGrabbing, setIsGrabbing] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  const handleCreate = async (
    totalShares: number,
    isEqual: boolean,
    amount: string,
  ) => {
    setIsCreating(true)
    try {
      await createPacket(totalShares, isEqual, amount)
    } finally {
      setIsCreating(false)
    }
  }

  const handleCheck = async (id: number) => {
    await checkPacket(id)
    setShowDetail(true)
  }

  const handleGrab = async (id: number) => {
    setIsGrabbing(true)
    try {
      await grabPacket(id)
    } finally {
      setIsGrabbing(false)
    }
  }

  return (
    <section className="w-full space-y-6 p-6 pt-0">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Red Packet</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Create and grab red packets on the blockchain
        </p>
      </div>

      <BalanceCard balance={userBalance} />

      <CreatePacketForm onCreate={handleCreate} isLoading={isCreating} />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Packets</h2>
        <PacketList
          packets={redPacketData}
          currentAddress={address}
          onCheck={handleCheck}
          onGrab={handleGrab}
          isGrabbing={isGrabbing}
        />
      </div>

      {showDetail && (
        <PacketDetailModal
          detail={packetDetail}
          onClose={() => setShowDetail(false)}
        />
      )}
    </section>
  )
}
