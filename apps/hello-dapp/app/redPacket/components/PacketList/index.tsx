import { Gift } from 'lucide-react'
import { useState, useEffect, useContext } from 'react'

import { RedPacketContext } from '../../service'
import SimpleCard from '@/components/ui/SimpleCard'
import RedPacketCard from './components/RedPacketCard'
export type { RedPacketItem } from './components/RedPacketCard'
import PacketDetailDialog from './components/PacketDetailDialog'

export default function PacketList() {
  const { redPacketData, packetDetail } = useContext(RedPacketContext)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    if (packetDetail) setDialogOpen(true)
  }, [packetDetail])

  if (!redPacketData || redPacketData.length === 0) {
    return (
      <SimpleCard>
        <div className="text-center py-8">
          <Gift className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No red packets available yet
          </p>
        </div>
      </SimpleCard>
    )
  }

  return (
    <>
      <section className="grid grid-cols-1 gap-6">
        {redPacketData.map((packet) => (
          <RedPacketCard key={packet.id} packet={packet} />
        ))}
      </section>

      <PacketDetailDialog
        open={dialogOpen}
        detail={packetDetail}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
