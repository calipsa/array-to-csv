import {
  ColumnObjectOptional,
  ColumnObject,
  Column,
  Obj,
  ColumnKeys,
  ColumnLabels,
} from './types'

const completeObject = (obj: ColumnObjectOptional): ColumnObject => ({
  key: obj.key,
  label: obj.label || obj.key,
  transform: obj.transform || String,
})

const simpleToObject = (key: string): ColumnObject => ({
  key,
  label: key,
  transform: String,
})

const normalizeColumns = (c: Column) =>
  typeof c === 'object'
    ? completeObject(c)
    : simpleToObject(c)

export default <C extends Column>(columns: readonly C[]) => {
  const cols = columns.map(normalizeColumns)
  return (item: Readonly<Obj<ColumnKeys<C>>>) => {
    // @ts-ignore
    const o: Record<ColumnLabels<C>, string> = {}
    for (const { key, label, transform } of cols) {
      // @ts-ignore
      const val = item[key]
      // @ts-ignore
      o[label] = transform ? transform(val) : val
    }
    return o
  }
}
