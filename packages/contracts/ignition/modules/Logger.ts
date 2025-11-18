import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const LoggerModule = buildModule('Logger', (m) => {
  const logger = m.contract('Logger')

  return { logger }
})

export default LoggerModule
