import { DataWritten } from '../generated/Logger/Logger'
import { LogEntry } from '../generated/schema'

export function handleDataWritten(event: DataWritten): void {
  const entity = new LogEntry(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )

  entity.sender = event.params.sender
  entity.value = event.params.value
  entity.note = event.params.note
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
