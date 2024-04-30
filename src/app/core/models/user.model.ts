export interface UserModel {
  pk?: number;
  phone_number: string;
  email: string;
  fullname: string;
  gender: number;
  region: number;
  district: number;
  birthday: string;
  store_id?: number;
  store_is_active?: boolean;
}
