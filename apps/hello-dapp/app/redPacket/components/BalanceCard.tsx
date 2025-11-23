import { isNil } from 'es-toolkit'
import { useContext } from 'react'
import { Wallet } from 'lucide-react'

import { RedPacketContext } from '../service'
import SimpleCard from '@/components/ui/SimpleCard'

export default function BalanceCard() {
  const { userBalance } = useContext(RedPacketContext)

  if (isNil(userBalance)) return null

  return (
    <SimpleCard electric>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <Wallet className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your Balance
            </p>
            <p className="text-2xl font-bold font-mono">{userBalance} ETH</p>
          </div>
        </div>
      </div>
    </SimpleCard>
  )
}
