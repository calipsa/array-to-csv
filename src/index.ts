import { unparse } from 'papaparse'

import getTransformer from './getTransformer'

import {
  Column,
  Obj,
  ColumnKeys,
} from './types'

const config = {
  // quotes: true,
}

export = <C extends Column>(columns: readonly C[]) => {
  const transformer = getTransformer(columns)
  return (list: readonly Readonly<Obj<ColumnKeys<C>>>[]) => {
    const mapped = list.map(transformer)
    return unparse(mapped, config)
  }
}
