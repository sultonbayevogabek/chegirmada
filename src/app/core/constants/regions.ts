import { DistrictModel } from '../models/district.model';

export const REGIONS: {
  id: number;
  name: string;
  districts: DistrictModel[];
}[] = [
  {
    id: 1,
    name: 'karakalpakstan',
    districts: []
  },
  {
    id: 2,
    name: 'andijan',
    districts: []
  },
  {
    id: 3,
    name: 'bukhara',
    districts: []
  },
  {
    id: 4,
    name: 'jizzakh',
    districts: []
  },
  {
    id: 5,
    name: 'kashkadarya',
    districts: []
  },
  {
    id: 6,
    name: 'navoiy',
    districts: []
  },
  {
    id: 7,
    name: 'namangan',
    districts: []
  },
  {
    id: 8,
    name: 'samarkand',
    districts: []
  },
  {
    id: 9,
    name: 'surkhandarya',
    districts: []
  },
  {
    id: 10,
    name: 'sirdarya',
    districts: []
  },
  {
    id: 11,
    name: 'tashkent.region',
    districts: []
  },
  {
    id: 12,
    name: 'fergana',
    districts: []
  },
  {
    id: 13,
    name: 'khorezm',
    districts: []
  },
  {
    id: 14,
    name: 'tashkent',
    districts: []
  }
];

export const DISTRICTS = [
  {
    id: 187,
    region_id: 13,
    name_uz: 'Bog‘ot tumani',
    name_ru: 'Багатский район'
  },
  {
    id: 188,
    region_id: 13,
    name_uz: 'Gurlan tumani',
    name_ru: 'Гурленский район'
  },
  {
    id: 189,
    region_id: 13,
    name_uz: 'Qo‘shko‘pir tumani',
    name_ru: 'Кошкупырский район'
  },
  {
    id: 190,
    region_id: 13,
    name_uz: 'Urganch tumani',
    name_ru: 'Ургенчский район'
  },
  {
    id: 191,
    region_id: 13,
    name_uz: 'Urganch shahri',
    name_ru: 'город Ургенч'
  },
  {
    id: 192,
    region_id: 13,
    name_uz: 'Xiva tumani',
    name_ru: 'Хивинский район'
  },
  {
    id: 193,
    region_id: 13,
    name_uz: 'Xazarasp tumani',
    name_ru: 'Хазараспский район'
  },
  {
    id: 194,
    region_id: 13,
    name_uz: 'Xonqa tumani',
    name_ru: 'Ханкинский район'
  },
  {
    id: 195,
    region_id: 13,
    name_uz: 'Shavot tumani',
    name_ru: 'Шаватский район'
  },
  {
    id: 196,
    region_id: 13,
    name_uz: 'Yangiariq tumani',
    name_ru: 'Янгиарыкский район'
  },
  {
    id: 197,
    region_id: 13,
    name_uz: 'Yangibozor tumani',
    name_ru: 'Янгибазарский район'
  },
]
