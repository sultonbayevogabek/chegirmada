export interface BranchModel {
  pk?: number;
  name_ru?: string;
  name?: string;
  main_phone_number: string;
  delivery: boolean;
  region: number;
  region_label?: string;
  district: number;
  district_label?: string;
  address: string;
  longitude: number;
  latitude: number;
  working_time_start: string;
  working_time_end: string;
  working_day_start: number;
  working_day_end: number;
  created_at?: string;
}
