export interface StoreModel {
  id: number;
  name_uz: string;
  name_ru?: string;
  main_phone_number: string;
  delivery: boolean;
  region: number;
  district: number;
  address: string;
  longitude: number;
  latitude: number;
  working_time_start: string;
  working_time_end: string;
  working_day_start: number;
  working_day_end: number;
  created_at: string;
  categories: number[];
  username: string;
  shortname: string;
  balance: number;
  desc_uz: string;
  desc_ru: string;
  slogan_uz: string;
  slogan_ru: string;
  owner_firstname: string;
  owner_lastname: string;
  owner_fathername: string;
  phone_number2: string;
  phone_number3: string;
  is_verified: boolean;
  term_payment: boolean;
  video_link: string;
  logo: string;
  banner: string;
  verified_at: string;
  owner: number;
}
