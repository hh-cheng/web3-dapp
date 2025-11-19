import { DataWritten as DataWrittenEvent } from '../generated/LoggerDemo/LoggerDemo'
import { DataWritten } from '../generated/schema'

export function handleDataWritten(event: DataWrittenEvent): void {
  let entity = new DataWritten(
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
