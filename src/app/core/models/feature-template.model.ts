export interface FeatureTemplate {
  pk: number;
  name: string;
  value_extra_type: string;
  values: Value[];
  selected?: SelectedValue[];
}

export interface Value {
  pk: number;
  value: string;
}

export interface SelectedValue {
  feature_value: number;
  price: string;
  sign: string;
}
