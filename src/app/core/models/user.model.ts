export interface UserModel {
  phone_number: string;
  email: string;
  full_name: string;
  gender: number;
  region: number;
  district: number;
  birthday: string;
  store_id?: number;
  store_is_active?: boolean;
}
