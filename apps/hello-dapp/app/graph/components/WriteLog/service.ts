import z from 'zod'
import { toast } from 'sonner'
import { ethers } from 'ethers'
import { useConnection } from 'wagmi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useTransition } from 'react'

const LOGGER_CONTRACT = process.env.LOGGER_CONTRACT!

const LOGGER_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'string', name: 'note', type: 'string' },
    ],
    name: 'writeData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const formSchema = z.object({
  value: z.string().min(1),
  note: z.string().min(1),
})

export default function useWriteLogService() {
  const { address } = useConnection()
  const [loading, startTransition] = useTransition()
  const provider = useRef<ethers.BrowserProvider | null>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { value: '', note: '' },
  })

  const writeLog = form.handleSubmit((values) => {
    if (!address || !provider.current) return

    startTransition(async () => {
      try {
        const signer = await provider.current!.getSigner()
        const contract = new ethers.Contract(
          LOGGER_CONTRACT,
          LOGGER_ABI,
          signer,
        )
        const tx = await contract.writeData(values.value, values.note)
        await tx.wait()
        toast.success('Log written successfully')
      } catch (err) {
        console.error('err in writing log', err)
        toast.error('Failed to write log')
      }
    })
  })

  useEffect(() => {
    if (window.ethereum) {
      provider.current = new ethers.BrowserProvider(window.ethereum)
    }
  }, [])

  return { writeLog, form, loading }
}
