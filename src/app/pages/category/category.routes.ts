import { Routes } from '@angular/router';

export const categoryRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list-view'
  },
  {
    path: 'list-view',
    loadComponent: () => import('./category-list-view/category-list-view.component').then(c => c.CategoryListViewComponent)
  },
  {
    path: 'map-view',
    loadComponent: () => import('./category-map-view/category-map-view.component').then(c => c.CategoryMapViewComponent)
  }
];
