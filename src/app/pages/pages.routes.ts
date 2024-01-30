import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'category',
    loadComponent: () => import('./category/category.component').then(c => c.CategoryComponent)
  },
  {
    path: 'product-details',
    loadComponent: () => import('./product-details/product-details.component').then(c => c.ProductDetailsComponent)
  },
  {
    path: 'wish-list',
    loadComponent: () => import('./wish-list/wish-list.component').then(c => c.WishListComponent)
  }
];
