'use client'

import PacketList from './components/PacketList'
import BalanceCard from './components/BalanceCard'
import CreatePacketForm from './components/CreatePacket'
import useRedPacketService, { RedPacketContext } from './service'

export default function RedPacketPage() {
  const service = useRedPacketService()

  return (
    <section className="w-full space-y-6 p-6 pt-0">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Red Packet</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Create and grab red packets on the blockchain
        </p>
      </div>

      <RedPacketContext.Provider value={service}>
        <BalanceCard />

        <CreatePacketForm />

        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Packets</h2>
          <PacketList />
        </div>
      </RedPacketContext.Provider>
    </section>
  )
}
