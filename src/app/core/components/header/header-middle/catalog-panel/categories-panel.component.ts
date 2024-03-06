import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';

export interface ICategory {
  parentCategoryName: string
  parentCategoryIcon: string
  active: boolean
  categoryGroupsFirstColumn: CategoryGroupsColumn[]
  categoryGroupsSecondColumn: CategoryGroupsColumn[]
  categoryGroupsThirdColumn: CategoryGroupsColumn[]
}

export interface CategoryGroupsColumn {
  categoryGroupName: string
  categories: Category[]
}

export interface Category {
  name: string
  url: string
}


@Component({
  selector: 'categories-panel',
  templateUrl: 'categories-panel.component.html',
  styleUrl: 'categories-panel.component.scss',
  imports: [
    NgTemplateOutlet,
    MatIcon,
    MatRipple
  ],
  standalone: true
})

export class CategoriesPanelComponent {
  categories: ICategory[] = [
    {
      parentCategoryName: 'Электроника',
      parentCategoryIcon: 'electronics',
      active: true,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Мужская одежда',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Женская одежда',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Бытовая техника',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Услуги',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Аксессуары',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Красота и уход',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Здоровье',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Товары для дома',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Строительство и ремонт',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Автотовары',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Детские товары',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Хобби и творчество',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Спорт и отдых',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Продукты питания',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
    {
      parentCategoryName: 'Бытовая химия',
      parentCategoryIcon: 'electronics',
      active: false,
      categoryGroupsFirstColumn: [
        {
          categoryGroupName: 'Спорт товары',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Велотренажеры',
              url: ''
            },
            {
              name: 'Беговые дорожки',
              url: ''
            },
            {
              name: 'Комплексные тренажёры',
              url: ''
            },
            {
              name: 'Эллиптические тренажеры',
              url: ''
            },
            {
              name: 'Фитнес аксессуары',
              url: ''
            },
          ]
        },
        {
          categoryGroupName: 'Бассейны',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Каркасные бассейны',
              url: ''
            },
            {
              name: 'Надувные бассейны',
              url: ''
            },
            {
              name: 'Детские бассейны',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Настольные игры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsSecondColumn: [
        {
          categoryGroupName: 'Теннис, бадминтон',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Теннисные столы',
              url: ''
            },
            {
              name: 'Мячи и ракетки для большого тенниса',
              url: ''
            },
            {
              name: 'Мячи и ракетки для настольного тенниса',
              url: ''
            },
            {
              name: 'Сетки для настольного тенниса',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Баскетбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Баскетбольные мячи',
              url: ''
            },
            {
              name: 'Щиты и стойки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Товары для футбола',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Футбольные мячи',
              url: ''
            },
            {
              name: 'Футбольная форма',
              url: ''
            },
            {
              name: 'Футбольные манишки',
              url: ''
            },
            {
              name: 'Футбольные щитки',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивная обувь',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ],
      categoryGroupsThirdColumn: [
        {
          categoryGroupName: 'Спортивная одежда',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Кимоно',
              url: ''
            },
            {
              name: 'Спортивные шорты',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Гироскутеры',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Волейбол',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Волейбольные мячи',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Йога',
          categories: [
            {
              name: 'Все товары',
              url: ''
            },
            {
              name: 'Коврики для йоги',
              url: ''
            },
            {
              name: 'Ролики для йоги',
              url: ''
            }
          ]
        },
        {
          categoryGroupName: 'Спортивные сумки и рюкзаки',
          categories: [
            {
              name: 'Все товары',
              url: ''
            }
          ]
        },
      ]
    },
  ];
  selectedCategory: ICategory = this.categories[0];

  selectParentCategory(
    category: ICategory
  ): void {
    this.categories.forEach(category => {
      category.active = false;
    });
    category.active = true;
    this.selectedCategory = category;
  }
}
