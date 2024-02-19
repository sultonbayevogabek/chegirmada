import { Component } from '@angular/core';
import { BreadCrumbsComponent } from '../../../shared/components/bread-crumbs/bread-crumbs.component';
import { MatRippleModule } from '@angular/material/core';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { CategoryProductsListComponent } from '../category-products-list/category-products-list.component';

@Component({
  selector: 'category-list-view',
  templateUrl: 'category-list-view.component.html',
  styleUrl: 'category-list-view.component.scss',
  imports: [
    BreadCrumbsComponent,
    MatRippleModule,
    CategoryFilterComponent,
    CategoryProductsListComponent
  ],
  standalone: true
})

export class CategoryListViewComponent {
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
