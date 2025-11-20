export interface DataWritten {
  id: string
  sender: string
  value: string
  note: string
  blockTimestamp: string
}

export interface GraphData {
  dataWrittens: DataWritten[]
}
