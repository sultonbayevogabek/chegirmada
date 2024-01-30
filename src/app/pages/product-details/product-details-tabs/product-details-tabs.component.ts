import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { RatingStarsComponent } from '../../../shared/components/rating-stars/rating-stars.component';

type tabType = 'about' | 'characteristics' | 'comments'

@Component({
  selector: 'product-details-tabs',
  templateUrl: 'product-details-tabs.component.html',
  styleUrl: 'product-details-tabs.component.scss',
  imports: [
    MatIconModule,
    RatingStarsComponent,
    NgScrollbarModule,
    NgTemplateOutlet,
    NgOptimizedImage,
    MatRippleModule
  ],
  standalone: true
})

export class ProductDetailsTabsComponent {
  tabs: { id: tabType, title: string }[] = [
    {
      id: 'about',
      title: 'О товаре'
    },
    {
      id: 'characteristics',
      title: 'Характеристики'
    },
    {
      id: 'comments',
      title: 'Отзывы'
    }
  ];
  characteristics = [
    {
      name: 'ISBN',
      value: '9789943521087',
    },
    {
      name: 'Автор',
      value: 'Жюль Верн',
    },
    {
      name: 'Язык',
      value: 'На узбекском',
    },
    {
      name: 'Надпись',
      value: 'Латиница',
    },
    {
      name: 'Количество',
      value: '368',
    },
    {
      name: 'Издательство',
      value: 'Гафур Гулом',
    },
    {
      name: 'Тип обложки',
      value: 'Твердая',
    },
    {
      name: 'Формат бумаги',
      value: 'A5',
    },
    {
      name: 'Год издания',
      value: '2023',
    },
    {
      name: 'Издательство',
      value: 'Гафур Гулом',
    },
    {
      name: 'Тип обложки',
      value: 'Твердая',
    },
    {
      name: 'Формат бумаги',
      value: 'A5',
    },
  ]

  selectedTab: tabType = 'comments';

  changeTab(tab: tabType): void {
    this.selectedTab = tab;
  }
}
