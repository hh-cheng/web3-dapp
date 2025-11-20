import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient(
  'https://api.studio.thegraph.com/query/1715771/daydayup/version/latest',
)
