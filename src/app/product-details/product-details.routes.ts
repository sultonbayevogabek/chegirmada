import { Routes } from '@angular/router';

export const productDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./product-details.component').then(c => c.ProductDetailsComponent)
  }
];
