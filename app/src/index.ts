import type { Item } from '@repro/model'

export interface Wrapper<T> {
  readonly item: Item
  readonly value: T
}
