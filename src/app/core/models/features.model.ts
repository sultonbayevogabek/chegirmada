export interface Feature {
  pk: number
  name: string
  value_extra_type: string
  values: Value[]
}

export interface Value {
  pk: number
  value: string
}
