'use client'
import { Send, Loader2 } from 'lucide-react'

import useWriteLogService from './service'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import SimpleCard from '@/components/ui/SimpleCard'
import { FieldGroup, FieldLegend, FieldContent } from '@/components/ui/field'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'

export default function WriteLog() {
  const { writeLog, form, loading } = useWriteLogService()

  return (
    <SimpleCard>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Write Log to Contract</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Write data to the Logger smart contract on the blockchain
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={writeLog} className="space-y-4">
            {/* Value Input */}
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      placeholder="Enter value"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Numeric value to be recorded in the log
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Log Note Input */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Log Note</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={2}
                      {...field}
                      className="w-full"
                      placeholder="Enter your log message..."
                    />
                  </FormControl>
                  <div className="flex justify-between items-center mt-2">
                    <FormDescription>
                      Character count: {field.value.length}
                    </FormDescription>
                    {field.value.length > 0 && (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Ready to submit
                      </span>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !form.watch('note').trim()}
              size="lg"
              className="w-full"
              variant="default"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Write Log to Blockchain</span>
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Info Section */}
        <FieldGroup>
          <FieldLegend variant="label">Transaction Details</FieldLegend>
          <FieldContent className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-4">
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>
                • Function:{' '}
                <span className="font-mono">writeData(uint256, string)</span>
              </li>
              <li>
                • Contract: <span className="font-mono text-xs">Logger</span>
              </li>
              <li>
                • Network: <span className="font-mono">Sepolia Testnet</span>
              </li>
              <li>
                • Action:{' '}
                <span className="font-mono">Emit DataWritten event</span>
              </li>
            </ul>
          </FieldContent>
        </FieldGroup>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-sm">
          <div
            className={`h-3 w-3 rounded-full transition-colors ${
              loading
                ? 'bg-yellow-500 animate-pulse'
                : form.watch('note').trim()
                  ? 'bg-green-500'
                  : 'bg-gray-400'
            }`}
          />
          <span className="text-gray-600 dark:text-gray-400">
            {loading
              ? 'Submitting transaction...'
              : form.watch('note').trim()
                ? 'Ready to submit'
                : 'Enter log content'}
          </span>
        </div>
      </div>
    </SimpleCard>
  )
}
