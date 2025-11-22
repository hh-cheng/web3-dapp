import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export function formatHash(hash: string) {
  if (!hash) return '-'
  if (hash.length <= 12) return hash
  return `${hash.slice(0, 6)}...${hash.slice(-6)}`
}

export function weiToGwei(wei: string | undefined) {
  if (!wei) return '-'
  try {
    return (+wei / 1e9).toFixed(2)
  } catch {
    return '-'
  }
}

export function formatTimestamp(timestamp?: number) {
  if (!timestamp) return '-'
  return new Date(timestamp * 1000).toLocaleString()
}

export function formatGasLimit(gasLimit?: string) {
  if (!gasLimit) return '-'
  return `${(+gasLimit / 1e6).toFixed(2)} M`
}

export function formatSuccess<T>(data: T) {
  return { success: true, data, msg: '' } as const
}

export function formatError<T>(msg: string, fallbackData?: T) {
  return { success: false, data: fallbackData ?? null, msg } as const
}
