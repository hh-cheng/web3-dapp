'use server'
import { gql } from 'graphql-request'

import { client } from '@/lib/theGraph'
import type { GraphData } from './types'

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

export async function getGraphData() {
  return await client.request<GraphData>(query)
}
