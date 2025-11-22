'use server'
import { toMerged } from 'es-toolkit'
import { catchError, concatMap, firstValueFrom, from, map, of } from 'rxjs'

import { formatSuccess, formatError } from '@/lib/utils'

const RPC_URL = process.env.RPC_URL!

const baseBody = {
  id: 1,
  jsonrpc: '2.0',
}

// 1.查看钱包余额
export async function getBalance(address: string) {
  return await firstValueFrom(
    from(
      fetch(RPC_URL, {
        method: 'POST',
        body: JSON.stringify(
          toMerged(baseBody, {
            method: 'eth_getBalance',
            params: [address, 'latest'],
          }),
        ),
      }),
    ).pipe(
      concatMap((res) => res.json()),
      map((res) => {
        return formatSuccess(BigInt(res.result).toString())
      }),
      catchError((err) => {
        return of(formatError(err.message, ''))
      }),
    ),
  )
}

// 2.查询区块
export async function getBlock(blockNum: number) {
  return await firstValueFrom(
    from(
      fetch(RPC_URL, {
        method: 'POST',
        body: JSON.stringify(
          toMerged(baseBody, {
            method: 'eth_getBlockByNumber',
            params: ['0x' + blockNum.toString(16), false],
          }),
        ),
      }),
    ).pipe(
      concatMap((res) => res.json()),
      map((res) => {
        return formatSuccess(res.result)
      }),
      catchError((err) => {
        return of(formatError(err.message))
      }),
    ),
  )
}
