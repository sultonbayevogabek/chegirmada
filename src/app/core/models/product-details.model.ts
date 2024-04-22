export interface ProductDetails {
  pk: number
  features: Feature[]
  categories: Category[]
  discount_id: string
  store: Store
  store_branches: StoreBranch[]
  product_counts: number
  remainder: number
  likes: string
  views: string
  title: string
  desc: string
  start_date: string
  end_date: string
  created_at: string
  video_link: string
  images: string[]
  discount_type: number
  price: string
  currency: number
  discount_amount: string
  discount_amount_is_percent: boolean
}

export interface Feature {
  pk: number
  name: string
  is_custom: boolean
  type: string
  values: Value[]
}

export interface Value {
  pk?: number
  value: any
  price: number
}

export interface Category {
  pk: number
  name: string
}

export interface Store {
  pk: number
  term_payment: boolean
  delivery: boolean
  name: string
  shortname: string
  logo: string
  followers: string
  likes: string
  rating1: number
  rating2: number
  rating3: number
  rating4: number
  rating5: number
  address: string
  latitude: number
  longitude: number
  main_phone_number: string
  slogan: string
  user_follow: boolean
}

export interface StoreBranch {
  pk: number
  name: string
  main_phone_number: string
  delivery: boolean
  region: number
  district: number
  region_label: string
  district_label: string
  address: string
  longitude: number
  latitude: number
  working_time_start: string
  working_time_end: string
  working_day_start: number
  working_day_end: number
  created_at: string
}
