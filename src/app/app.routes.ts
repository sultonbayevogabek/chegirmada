import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.routes').then(r => r.homeRoutes)
  },
  {
    path: 'product-details',
    pathMatch: 'full',
    loadChildren: () => import('./product-details/product-details.routes').then(r => r.productDetailsRoutes)
  },
  {
    path: 'category',
    pathMatch: 'full',
    loadChildren: () => import('./category/category.routes').then(r => r.categoryRoutes)
  }
];
