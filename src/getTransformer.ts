import {
  ColumnObject,
  Column,
  Obj,
  ColumnKeys,
  ColumnLabels,
  ColumnObjectNormalized,
  AllowedNames,
} from './types'

const property = (key: string) =>
  <T extends Record<typeof key, any>>(item: T) => item[key]

const completeObject = <O>(obj: ColumnObject<O>): ColumnObjectNormalized<O> => ({
  transform: typeof obj.prop === 'string' ? property(obj.prop) : obj.prop,
  label: obj.label,
})

const simpleToObject = <O, K extends AllowedNames<O, string>>(key: K): ColumnObjectNormalized<O> => ({
  transform: item => item[key],
  label: key.toString(),
})

const normalizeColumns = <O>(c: Column<O>) =>
  typeof c === 'object'
    ? completeObject(c)
    : simpleToObject(c)

export default <C extends Column>(columns: readonly C[]) => {
  const cols = columns.map(normalizeColumns)
  return (item: Readonly<Obj<ColumnKeys<C>>>) => {
    // @ts-ignore
    const o: Record<ColumnLabels<C>, string> = {}
    for (const { transform, label } of cols) {
      // @ts-ignore
      o[label] = transform(val)
    }
    return o
  }
}
