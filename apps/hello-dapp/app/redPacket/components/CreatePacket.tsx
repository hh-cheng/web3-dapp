'use client'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { Gift, Loader2 } from 'lucide-react'
import { useContext, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { RedPacketContext } from '../service'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import SimpleCard from '@/components/ui/SimpleCard'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form'

const createPacketFormSchema = z.object({
  isEqual: z.boolean(),
  amount: z.string().min(1),
  totalShares: z.string().min(1),
})

export default function CreatePacketForm() {
  const { createPacket } = useContext(RedPacketContext)

  const [isLoading, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(createPacketFormSchema),
    defaultValues: { isEqual: false, amount: '', totalShares: '' },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      await createPacket(
        Number(values.totalShares),
        values.isEqual,
        values.amount,
      )
      form.reset()
    })
  })

  return (
    <SimpleCard>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Gift className="h-6 w-6" />
            Create Red Packet
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create a new red packet for others to grab
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (ETH)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.001" {...field} />
                  </FormControl>
                  <FormDescription>
                    Total amount to distribute in the red packet
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalShares"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Shares</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Number of people who can grab this packet
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isEqual"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Equal Distribution</FormLabel>
                    <FormDescription>
                      If checked, each share will be equal. Otherwise, random
                      amounts.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Gift className="h-4 w-4" />
                  Create Packet
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </SimpleCard>
  )
}
