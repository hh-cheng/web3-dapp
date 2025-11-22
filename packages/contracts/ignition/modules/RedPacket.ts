import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const RedPacketModule = buildModule('RedPacket', (m) => {
  const redPacket = m.contract('RedPacket')

  return { redPacket }
})

export default RedPacketModule
