import { v4 as uuidv4 } from 'uuid'
import { Cell } from './Grid.types'

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export const RowFactory = (width: number) => ({
  id: uuidv4(),
  cells: Array(width).fill('').map(() => ({
    id: uuidv4(),
    isOn: true
  }))
})

export const CellFactory = (): Cell => ({
  id: uuidv4(),
  isOn: true
})