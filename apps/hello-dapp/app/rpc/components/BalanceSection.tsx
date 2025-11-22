import SimpleCard from '@/components/ui/SimpleCard'

export default function BalanceSection({ balance }: { balance: string }) {
  return (
    <SimpleCard electric>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Account Balance</h2>
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Balance
          </p>
          <p className="text-2xl font-mono font-bold">{balance}</p>
          <p className="text-xs text-gray-500 mt-1">Wei</p>
        </div>
      </div>
    </SimpleCard>
  )
}
