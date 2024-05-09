export interface PaymentHistoryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PaymentHistory[];
}

export interface PaymentHistory {
  pk: number;
  _id: string;
  payment_type: number;
  amount: number;
  created_at: string;
}
