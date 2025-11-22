import { gql } from 'graphql-request'

import { client } from '@/lib/theGraph'
import type { GraphData } from './types'
import WriteLog from './components/WriteLog'
import GraphTable from './components/GraphTable'

const query = gql`
  query GetDataWrittens {
    dataWrittens(first: 10, orderBy: blockTimestamp, orderDirection: desc) {
      id
      sender
      value
      note
      blockTimestamp
    }
  }
`

export default async function GraphPage() {
  const data = await client.request<GraphData>(query)

  return (
    <section className="sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">The Graph Data</h1>
          <p className="text-muted-foreground">
            Displaying the top 10 blockchain events from The Graph protocol
          </p>
        </div>

        <WriteLog />

        <GraphTable data={data.dataWrittens} />
      </div>
    </section>
  )
}
