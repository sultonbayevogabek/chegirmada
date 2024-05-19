export interface PackagesResponse {
  count: number;
  next: string;
  previous: any;
  results: PackageModel[];
}

export interface PackageModel {
  category: Category;
  tariff_price: number;
  quantity: number;
  remainder: number;
  created_at: string;
}

export interface Category {
  pk: number;
  name: string;
}

export interface PackageTypesResponse {
  tariffs: PackageType[];
  discounts: Discount[];
}

export interface PackageType {
  id: number;
  category: number;
  price: number;
}

export interface Discount {
  id: number;
  min_quantity: number;
  discount_price: number;
}
