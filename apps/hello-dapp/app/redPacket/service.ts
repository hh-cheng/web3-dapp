import { toast } from 'sonner'
import { ethers } from 'ethers'
import { useConnection } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState, useTransition } from 'react'
import redPacketArtifact from 'contracts/artifacts/contracts/RedPacket.sol/RedPacket.json'

import type { PacketDetail } from './types'

const RED_PACKET_CONTRACT = process.env.RED_PACKET_CONTRACT!

export default function useRedPacketService() {
  const { address } = useConnection()
  const [loading, startTransition] = useTransition()
  const contract = useRef<ethers.Contract | null>(null)
  const provider = useRef<ethers.BrowserProvider | null>(null)
  const [packetDetail, setPacketDetail] = useState<PacketDetail | null>(null)

  // 读取当前地址余额
  const { data: userBalance } = useQuery({
    queryKey: ['userBalance', address],
    enabled: !!address,
    queryFn: async () => {
      if (!address || !provider.current) return null

      try {
        const balance = await provider.current.getBalance(address)
        return ethers.formatEther(balance)
      } catch (err) {
        console.error('Error fetching balance:', err)
        toast.error('Failed to fetch balance')
        return null
      }
    },
    staleTime: 10 * 1000, // 10 seconds
    refetchInterval: 12 * 1000, // Refetch every 12 seconds
  })

  // 读取红包列表
  const { data: redPacketData } = useQuery({
    queryKey: ['redPacketList'],
    enabled: !!contract.current,
    queryFn: async () => {
      const nextID = await contract.current!.nextPacketId()
      const redPacketList = await Promise.all(
        Array.from({ length: Number(nextID) }, (_, i) => i + 1).map(
          async (id) => {
            const [
              sender,
              totalAmount,
              remainingAmount,
              totalShares,
              remainingShares,
              isEqual,
            ] = await contract.current!.checkPacket(id)
            return {
              id,
              sender,
              totalAmount,
              remainingAmount,
              totalShares,
              remainingShares,
              isEqual,
            }
          },
        ),
      )
      return redPacketList
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 10,
  })

  // 读取红包详情
  const checkPacket = async (packetID: number) => {
    if (!contract.current) return null

    try {
      const [
        sender,
        totalAmount,
        remainingAmount,
        totalShares,
        remainingShares,
        isEqual,
      ] = await contract.current!.checkPacket(packetID)

      setPacketDetail({
        sender,
        totalAmount,
        remainingAmount,
        totalShares,
        remainingShares,
        isEqual,
      })
    } catch (err) {
      setPacketDetail(null)
      toast.error('Failed to check packet')
      console.error('err in checking packet', err)
      return null
    }
  }

  const createPacket = async (
    totalShares: number,
    isEqual: boolean,
    amount: string,
  ) => {
    if (!contract.current || !address) return null
    try {
      const amountWei = ethers.parseEther(amount)

      const tx = await contract.current.createPacket(totalShares, isEqual, {
        value: amountWei,
      })
      await tx.wait()
      toast.success('Packet created successfully')
    } catch (err) {
      console.error('err in creating packet', err)
      toast.error('Failed to create packet')
    }
  }

  const grabPacket = async (packetID: number) => {
    if (!contract.current || !provider.current || !address) return null
    try {
      const tx = await contract.current.grab(packetID)
      await tx.wait()
      toast.success('Packet grabbed successfully')
    } catch (err) {
      console.error('err in grabbing packet', err)
      toast.error('Failed to grab packet')
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      startTransition(async () => {
        provider.current = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.current.getSigner()
        contract.current = new ethers.Contract(
          RED_PACKET_CONTRACT,
          redPacketArtifact.abi,
          signer,
        )
      })
    }
  }, [])

  return {
    loading,
    redPacketData,
    packetDetail,
    userBalance,
    checkPacket,
    createPacket,
    grabPacket,
  }
}
