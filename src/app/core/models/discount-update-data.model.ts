export interface DiscountUpdateData {
  pk: number;
  _id: number;
  categories: Category[];
  tags: Tag[];
  store_branches: StoreBranch[];
  product_counts: number;
  remainder: number;
  likes: number;
  dislikes: number;
  comments: number;
  views: number;
  title_uz: string;
  title_ru: string;
  desc_uz: string;
  desc_ru: string;
  start_date: string;
  end_date: string;
  created_at: string;
  is_active: boolean;
  is_spam: boolean;
  status: number;
  reason_message: string;
  video_link: string;
  discount_type: number;
  price: string;
  currency: 1|2;
  is_advertised: boolean;
  features_read_only: FeaturesReadOnly[];
  images: string[];
  discount_amount: string;
  discount_amount_is_percent: boolean;
}

export interface Category {
  pk: number;
  name: string;
}

export interface Tag {
  pk: number;
  name: string;
}

export interface StoreBranch {
  pk: number;
  name: string;
}

export interface FeaturesReadOnly {
  pk: number;
  name: string;
  is_custom: boolean;
  type: string;
  values: Value[];
}

export interface Value {
  pk?: number;
  value: any;
  price: number;
}
