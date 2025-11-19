'use client'
import { formatUnits } from 'viem'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChevronDown, LogOut, Copy, ExternalLink } from 'lucide-react'
import { useAccount, useBalance, useDisconnect, useSwitchChain } from 'wagmi'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'

export default function Wallet() {
  const { address, isConnected, chain } = useAccount()
  const { disconnect } = useDisconnect()
  const { chains, switchChain } = useSwitchChain()
  const { data: balance } = useBalance({ address })

  // Format address to short form
  const shortAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`

  // Format balance
  const formattedBalance = balance
    ? parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(8)
    : '0.00000000'

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || '')
  }

  const handleViewOnExplorer = () => {
    if (chain?.blockExplorers?.default) {
      window.open(
        `${chain.blockExplorers.default.url}/address/${address}`,
        '_blank',
      )
    }
  }

  // If not connected, show the rainbow kit connect button
  if (!isConnected) {
    return (
      <div className="flex items-center gap-2">
        <ConnectButton />
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-br from-purple-400 to-blue-600 hover:opacity-90 transition-opacity font-semibold text-sm text-white">
          <span className="w-4 h-4 bg-white rounded-full" />
          <span className="max-w-[100px] truncate">{shortAddress}</span>
          <ChevronDown size={16} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        {/* Account Info Section */}
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-purple-400 to-blue-600 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-600 font-medium">
                Connected Account
              </p>
              <p className="text-sm font-semibold text-slate-900 truncate">
                {address}
              </p>
            </div>
          </div>

          {/* Balance Display */}
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-xs text-slate-300 font-medium mb-1">Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">
                {formattedBalance}
              </span>
              <span className="text-sm text-slate-200 font-medium">
                {balance?.symbol}
              </span>
            </div>
          </div>

          {/* Network Info */}
          {/* {chain && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-slate-800 font-semibold">{chain.name}</span>
            </div>
          )} */}
        </div>

        <DropdownMenuSeparator />

        {/* Network Switcher */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer text-slate-700">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="font-semibold">
              {chain?.name || 'Select Network'}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {chains.map((c) => (
              <DropdownMenuItem
                key={c.id}
                onClick={() => switchChain({ chainId: c.id })}
                className="cursor-pointer text-slate-700"
              >
                <div className="flex items-center gap-2 w-full">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      chain?.id === c.id ? 'bg-green-500' : 'bg-slate-300'
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      chain?.id === c.id ? 'font-semibold text-slate-900' : ''
                    }`}
                  >
                    {c.name}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Actions */}
        <DropdownMenuItem
          onClick={handleCopyAddress}
          className="cursor-pointer text-slate-700"
        >
          <Copy size={16} />
          <span className="font-semibold">Copy Address</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleViewOnExplorer}
          className="cursor-pointer text-slate-700"
        >
          <ExternalLink size={16} />
          <span className="font-semibold">View on Explorer</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={() => disconnect()}
          className="cursor-pointer font-semibold"
        >
          <LogOut size={16} />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
