import { Routes } from '@angular/router';

export const categoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./category.component').then(c => c.CategoryComponent)
  }
];
