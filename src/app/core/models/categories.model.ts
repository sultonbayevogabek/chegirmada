export interface SecondLevelCategory {
  pk: number;
  name: string;
  children: ThirdLevelCategory[];
}

export interface ThirdLevelCategory {
  pk: number;
  name: string;
}
