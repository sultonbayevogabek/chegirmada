export interface DiscountParamsModel {
  main_category?: string;
  second_category?: string;
  category?: string;
  is_active?: string;
  status?: string;
  discount_type?: string;
  store__in?: string;
  start_date__lte?: string;
  end_date__gte?: string;
  price__range?: string;
  search?: string;
  ordering?: number;
  page?: number;
  page_size?: number;
  total?: number;
}
