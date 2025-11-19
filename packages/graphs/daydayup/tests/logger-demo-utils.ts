import { newMockEvent } from 'matchstick-as'
import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts'
import { DataWritten } from '../generated/LoggerDemo/LoggerDemo'

export function createDataWrittenEvent(
  sender: Address,
  value: BigInt,
  note: string,
): DataWritten {
  let dataWrittenEvent = changetype<DataWritten>(newMockEvent())

  dataWrittenEvent.parameters = []

  dataWrittenEvent.parameters.push(
    new ethereum.EventParam('sender', ethereum.Value.fromAddress(sender)),
  )
  dataWrittenEvent.parameters.push(
    new ethereum.EventParam('value', ethereum.Value.fromUnsignedBigInt(value)),
  )
  dataWrittenEvent.parameters.push(
    new ethereum.EventParam('note', ethereum.Value.fromString(note)),
  )

  return dataWrittenEvent
}
