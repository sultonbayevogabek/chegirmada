export interface AnnouncementResponse {
  count: number;
  next: string;
  previous: string;
  results: Announcement[];
}

export interface Announcement {
  pk: number;
  _id: number;
  discount_type: number;
  categories: Category[];
  status: number;
  is_active: boolean;
  is_spam: boolean;
  title: string;
  price: string;
  likes: string;
  dislikes: string;
  comments: string;
  views: string;
  start_date: string;
  end_date: string;
  created_at: string;
  is_advertised: boolean;
  reason_message: string;
  currency: number;
  images: string[];
  discount_amount: string;
  discount_amount_is_percent: boolean;
}

export interface Category {
  pk: number;
  name: string;
}
