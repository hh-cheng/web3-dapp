export interface BlockData {
  success: boolean
  data: {
    number: string
    hash: string
    timestamp: string
    miner: string
    gasUsed: string
    gasLimit: string
    transactions: string[]
  } | null
  msg: string
}
