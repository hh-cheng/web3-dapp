# Subgraph (daydayup)

This package holds the source for the `daydayup` subgraph that indexes the `Logger` contract deployed at `0x9146E804C874b4651C44685C95804A48b3F935f4` on Sepolia.

## Commands

All commands can be run from the workspace root using pnpm:

- `pnpm --filter @daydayup/graphs codegen` – Generates AssemblyScript types in `generated/` from the GraphQL schema and ABIs.
- `pnpm --filter @daydayup/graphs build` – Builds the WASM mappings and validates `subgraph.yaml`.
- `pnpm --filter @daydayup/graphs deploy` – Deploys to https://thegraph.com/studio/subgraph/daydayup/ (requires `GRAPH_ACCESS_TOKEN`).

Before deploying in Graph Studio, run `graph auth --studio daydayup <DEPLOY_KEY>` once to store your deploy key locally.
