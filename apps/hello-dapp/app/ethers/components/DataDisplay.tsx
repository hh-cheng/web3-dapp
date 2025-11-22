'use client'
import type { ethers } from 'ethers'

import type { EthersData } from '../types'
import SimpleCard from '@/components/ui/SimpleCard'
import {
  formatHash,
  weiToGwei,
  formatTimestamp,
  formatGasLimit,
} from '@/lib/utils'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table'

interface ContractStatusIndicatorProps {
  contractData?: string
}

function ContractStatusIndicator({
  contractData,
}: ContractStatusIndicatorProps) {
  const isContractActive = contractData && contractData !== '0x'
  const statusColor = isContractActive ? 'bg-green-500' : 'bg-red-500'
  const statusText = isContractActive ? 'Contract Active' : 'Contract Not Found'

  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${statusColor}`} />
      <span className="font-mono text-sm">{statusText}</span>
    </div>
  )
}

interface EventTableProps {
  logs?: ethers.Log[]
}

function EventTable({ logs }: EventTableProps) {
  const hasLogs = logs && logs.length > 0

  if (!hasLogs) {
    return (
      <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">No events found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Block</TableHead>
            <TableHead>Transaction Hash</TableHead>
            <TableHead>Index</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-mono text-sm">
                {log.blockNumber}
              </TableCell>
              <TableCell className="font-mono text-sm">
                {formatHash(log.transactionHash || '-')}
              </TableCell>
              <TableCell className="font-mono text-sm">{idx}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

interface DataCardProps {
  label: string
  unit?: string
  value: string | number
}

function DataCard({ label, value, unit }: DataCardProps) {
  return (
    <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-xl font-mono font-bold">{value}</p>
      {unit && <p className="text-xs text-gray-500">{unit}</p>}
    </div>
  )
}

interface AccountSectionProps {
  balance?: string
  nonce?: number
}

function AccountSection({ balance, nonce }: AccountSectionProps) {
  return (
    <SimpleCard electric>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Account Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataCard label="Account Balance" value={`${balance || '-'} ETH`} />
          <DataCard label="Transaction Nonce" value={nonce ?? '-'} />
        </div>
      </div>
    </SimpleCard>
  )
}

interface BlockSectionProps {
  blockNumber?: number
  blockTimestamp?: number
  gasLimit?: string
}

function BlockSection({
  blockNumber,
  blockTimestamp,
  gasLimit,
}: BlockSectionProps) {
  return (
    <SimpleCard>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Block Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DataCard label="Block Number" value={blockNumber ?? '-'} />
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Block Timestamp
            </p>
            <p className="text-lg font-mono font-bold">
              {formatTimestamp(blockTimestamp)}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gas Limit
            </p>
            <p className="text-xl font-mono font-bold">
              {formatGasLimit(gasLimit)}
            </p>
          </div>
        </div>
      </div>
    </SimpleCard>
  )
}

interface ContractSectionProps {
  contractData?: string
}

function ContractSection({ contractData }: ContractSectionProps) {
  return (
    <SimpleCard>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Contract Status</h2>
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Logger Contract Code
          </p>
          <ContractStatusIndicator contractData={contractData} />
          <p className="text-xs text-gray-500 mt-2 font-mono break-all">
            {contractData?.slice(0, 100) || '-'}...
          </p>
        </div>
      </div>
    </SimpleCard>
  )
}

interface EventsSectionProps {
  logs?: ethers.Log[]
}

function EventsSection({ logs }: EventsSectionProps) {
  return (
    <SimpleCard>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Events</h2>
        <EventTable logs={logs} />
      </div>
    </SimpleCard>
  )
}

interface GasSectionProps {
  gasPrice?: string
  baseFeePerGas?: string
  priorityFeePerGas?: string
}

function GasSection({
  gasPrice,
  baseFeePerGas,
  priorityFeePerGas,
}: GasSectionProps) {
  return (
    <SimpleCard>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Gas Prices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DataCard label="Gas Price" value={weiToGwei(gasPrice)} unit="Gwei" />
          <DataCard
            unit="Gwei"
            label="Base Fee Per Gas"
            value={weiToGwei(baseFeePerGas)}
          />
          <DataCard
            unit="Gwei"
            label="Priority Fee Per Gas"
            value={weiToGwei(priorityFeePerGas)}
          />
        </div>
      </div>
    </SimpleCard>
  )
}

interface DataDisplayProps {
  blockData: EthersData
}

export default function DataDisplay({ blockData }: DataDisplayProps) {
  return (
    <section className="grid grid-cols-1 gap-6">
      <AccountSection
        balance={blockData.accountBalance}
        nonce={blockData.accountNonce}
      />
      <BlockSection
        blockNumber={blockData.blockNumber}
        blockTimestamp={blockData.blockTimestamp}
        gasLimit={blockData.gasLimit}
      />
      <ContractSection contractData={blockData.contractData} />
      <EventsSection logs={blockData.logs} />
      <GasSection
        gasPrice={blockData.gasPrice}
        baseFeePerGas={blockData.baseFeePerGas}
        priorityFeePerGas={blockData.priorityFeePerGas}
      />
    </section>
  )
}
