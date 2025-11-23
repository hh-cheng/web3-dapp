import { createContext as createReactContext } from 'react'

export default function createContext<T>(_: () => T, initialValue?: T) {
  return createReactContext<T>(initialValue!)
}
