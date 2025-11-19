import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from 'matchstick-as/assembly/index'
import { Address, BigInt } from '@graphprotocol/graph-ts'
import { DataWritten } from '../generated/schema'
import { DataWritten as DataWrittenEvent } from '../generated/LoggerDemo/LoggerDemo'
import { handleDataWritten } from '../src/logger-demo'
import { createDataWrittenEvent } from './logger-demo-utils'

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let sender = Address.fromString(
      '0x0000000000000000000000000000000000000001',
    )
    let value = BigInt.fromI32(234)
    let note = 'Example string value'
    let newDataWrittenEvent = createDataWrittenEvent(sender, value, note)
    handleDataWritten(newDataWrittenEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test('DataWritten created and stored', () => {
    assert.entityCount('DataWritten', 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      'DataWritten',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'sender',
      '0x0000000000000000000000000000000000000001',
    )
    assert.fieldEquals(
      'DataWritten',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'value',
      '234',
    )
    assert.fieldEquals(
      'DataWritten',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'note',
      'Example string value',
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
