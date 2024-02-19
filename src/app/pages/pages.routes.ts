import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'category',
    loadComponent: () => import('./category/category-list-view/category-list-view.component').then(c => c.CategoryListViewComponent)
  },
  {
    path: 'product-details',
    loadComponent: () => import('./product-details/product-details.component').then(c => c.ProductDetailsComponent)
  },
  {
    path: 'wish-list',
    loadComponent: () => import('./wish-list/wish-list.component').then(c => c.WishListComponent)
  },
  {
    path: 'company-profile',
    loadComponent: () => import('./company-profile/company-profile.component').then(c => c.CompanyProfileComponent)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.routes').then(r => r.profileRoutes)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.routes').then(r => r.categoryRoutes)
  },
];
