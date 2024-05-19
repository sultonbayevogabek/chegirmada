export interface Banners {
  banners: Banner[];
  large_banners: Banner[];
}

export interface Banner {
  pk: number;
  image: string;
  url: string;
  title: string;
  desc: string;
}
