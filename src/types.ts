export type Obj<Keys extends string | number> = {
  readonly [key in Keys]: any
}

export interface ColumnObjectOptional {
  key: string,
  label?: string,
  transform?: (value: any) => string,
}

export type ColumnObject = Required<ColumnObjectOptional>

export type Column = string | ColumnObjectOptional

// get only strings in union type
type OnlyStrings<T> =  T extends string ? T : never
// get only objects in union type
type OnlyObjects<T> = T extends object ? T : never

// if key is a string, then key, otherwise key.key
export type ColumnKeys<T extends Column> = OnlyStrings<T> | OnlyObjects<T>['key']

// if key is a string, then key, otherwise key.label or key.key
export type ColumnLabels<T extends Column> = OnlyStrings<T> | (OnlyObjects<T>['label'] extends string
  ? OnlyObjects<T>['label']
  : OnlyObjects<T>['key'])
