export type Obj<Keys extends string | number> = {
  [key in Keys]: any
}

export interface ColumnObjectOptional {
  key: string,
  label?: string,
  transform?: (value: any) => string,
}

export type ColumnObject = Required<ColumnObjectOptional>

export type Column = string | ColumnObjectOptional

// get only strings in union type
type OnlyStrings<T> =  Extract<T, string>
// get only objects in union type
type OnlyObjects<T> = Extract<T, object>

// if key is a string, then key, otherwise key.key
export type ColumnKeys<T extends Column> = OnlyStrings<T> | OnlyObjects<T>['key']

type ColumnLabelsForObjects<T extends Column> = OnlyObjects<T>['label'] extends string
  ? OnlyObjects<T>['label']
  : OnlyObjects<T>['key']

// if key is a string, then key, otherwise key.label or key.key
export type ColumnLabels<T extends Column> = OnlyStrings<T> | ColumnLabelsForObjects<T>
