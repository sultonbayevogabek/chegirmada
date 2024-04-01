export interface MainCategory {
  id: number;
  name: string;
  active?: boolean;
  loading?: boolean;
  icon?: string;
  img?: string;
  children?: SecondLevelCategory[]
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
