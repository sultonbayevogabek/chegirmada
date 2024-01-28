import { Component } from '@angular/core';
import { BreadCrumbsComponent } from '../shared/components/bread-crumbs/bread-crumbs.component';
import { MatRippleModule } from '@angular/material/core';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { CategoryProductsListComponent } from './category-products-list/category-products-list.component';

@Component({
  selector: 'category',
  templateUrl: 'category.component.html',
  styleUrl: 'category.component.scss',
  imports: [
    BreadCrumbsComponent,
    MatRippleModule,
    CategoryFilterComponent,
    CategoryProductsListComponent
  ],
  standalone: true
})

export class CategoryComponent {
  breadCrumbs = [
    {
      text: 'Главная',
      url: 'home'
    },
    {
      text: 'Смартфоны',
      url: 'smartphones'
    },
    {
      text: 'Мобильные телефоны',
      url: ''
    }
  ]
}
