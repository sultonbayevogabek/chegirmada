export interface WishlistResponse {
  count: number;
  next: string;
  previous: string;
  results: ProductCard[];
}

export interface ProductCard {
  pk: number;
  title: string;
  user_wishlist: boolean;
  store: Store;
  currency: number;
  price: string;
  start_date: string;
  end_date: string;
  views: string;
  is_advertised: boolean;
  images: string[];
  discount_amount: string;
  discount_amount_is_percent: boolean;
}

export interface Store {
  pk: number;
  is_verified: boolean;
  name: string;
  shortname: string;
  logo: string;
  full_address: FullAddress;
}

export interface FullAddress {
  region: Region;
  district: District;
  address: string;
  longitude: number;
  latitude: number;
}

export interface Region {
  pk: number;
  label: string;
}

export interface District {
  pk: number;
  label: string;
}
