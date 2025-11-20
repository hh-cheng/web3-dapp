import type { ColumnDef } from '@tanstack/react-table'

import { truncateAddress } from '@/lib/utils'
import type { DataWritten } from '../../types'

export const columns: ColumnDef<DataWritten>[] = [
  {
    accessorKey: 'id',
    header: 'Event ID',
    cell: ({ row }) => (
      <span className="font-mono text-xs">
        {truncateAddress(row.getValue('id'))}
      </span>
    ),
  },
  {
    accessorKey: 'sender',
    header: 'Sender',
    cell: ({ row }) => (
      <code className="bg-muted/50 px-2 py-1 rounded text-xs">
        {truncateAddress(row.getValue('sender'))}
      </code>
    ),
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <span className="font-semibold">{row.getValue('value')}</span>
    ),
  },
  {
    accessorKey: 'note',
    header: 'Note',
    cell: ({ row }) => (
      <span className="max-w-xs truncate">{row.getValue('note')}</span>
    ),
  },
  {
    accessorKey: 'blockTimestamp',
    header: 'Timestamp',
    cell: ({ row }) => {
      const timestamp = parseInt(row.getValue('blockTimestamp'))
      const date = new Date(timestamp * 1000)
      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      )
    },
  },
]
