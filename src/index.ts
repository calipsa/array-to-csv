import { unparse, UnparseConfig } from 'papaparse'

import getTransformer from './getTransformer'

import {
  Column,
  Obj,
  ColumnKeys,
} from './types'

type Config = Omit<UnparseConfig, 'columns'>

const defaultConfig: Config = {
  // quotes: true,
}

export = <C extends Column>(columns: readonly C[], options: Readonly<Config> = {}) => {
  const config: Config = {
    ...defaultConfig,
    ...options,
  }

  const transformer = getTransformer(columns)

  return (list: readonly Readonly<Obj<ColumnKeys<C>>>[]) => {
    const mapped = list.map(transformer)
    return unparse(mapped, config)
  }
}
