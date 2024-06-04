export interface MainCategory {
  id: number;
  name: string;
  active?: boolean;
  loading?: boolean;
  icon?: string;
  img?: string;
  children?: {
    1: SecondLevelCategory[],
    2: SecondLevelCategory[],
    3: SecondLevelCategory[]
  },
  subcategories?: SecondLevelCategory[]
}

export interface SecondLevelCategory {
  pk: number;
  name: string;
  children: ThirdLevelCategory[];
}

export interface ThirdLevelCategory {
  pk: number;
  name: string;
}
