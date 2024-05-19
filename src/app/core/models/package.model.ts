export interface PackagesResponse {
  count: number
  next: string
  previous: any
  results: PackageModel[]
}

export interface PackageModel {
  category: Category
  tariff_price: number
  quantity: number
  remainder: number
  created_at: string
}

export interface Category {
  pk: number
  name: string
}
