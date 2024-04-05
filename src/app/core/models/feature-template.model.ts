export interface FeatureTemplate {
  pk: number;
  name: string;
  value_extra_type: string;
  values: Value[];
  selected?: SelectedValue[];
}

export interface Value {
  pk: number | string;
  value: string;
}

export interface SelectedValue {
  feature_value: number | string;
  price: string;
  sign?: string;
}

export interface CustomTemplate {
  name: string;
  items: CustomTemplateItem[];
}

export interface CustomTemplateItem {
  value: string;
  price: string;
  sign: string;
}
