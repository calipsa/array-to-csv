export type Obj<Keys extends string | number> = {
  [key in Keys]: any
}

type Transform<O> = (value: O) => string

export interface ColumnObject<T> {
  prop: string | Transform<T>,
  label: string,
}

export interface ColumnObjectNormalized<T> {
  transform: Transform<T>,
  label: string,
}

export type Column<T> = string | ColumnObject<T>

// get only strings in union type
type OnlyStrings<T> = Extract<T, string>
// get only objects in union type
type OnlyObjects<T> = Extract<T, object>

type FilterFlags<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}

export type AllowedNames<T, U> = FilterFlags<T, U>[keyof T]

const a = { a: 5, b: 'hh'} as const

type U = AllowedNames<typeof a, string>

type SubType<T, U> = Pick<T, AllowedNames<T, U>>

// if key is a string, then key, otherwise key.key
export type ColumnKeys<O, T extends Column<O>> = OnlyStrings<T> | Extract<OnlyObjects<T>['prop'], string>

type ColumnLabelsForObjects<O, T extends Column<O>> = OnlyObjects<T>['label'] extends string
  ? OnlyObjects<T>['label']
  : OnlyObjects<T>['prop']

// if key is a string, then key, otherwise key.label or key.key
export type ColumnLabels<O, T extends Column<O>> = OnlyStrings<T> | ColumnLabelsForObjects<O, T>
