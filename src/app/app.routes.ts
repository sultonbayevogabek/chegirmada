import { Routes } from '@angular/router';
import { initialDataResolver } from './core/resolvers/initial-data.resolver';
import { authGuard } from './core/guards/auth.guard';
import { productDetailsResolver } from './core/resolvers/product-details.resolver';
import { ProductDetailsService } from './core/services/product-details.service';

export const routes: Routes = [
  {
    path: 'webview-player',
    loadComponent: () => import('./pages/webview-player/webview-player.component').then(c => c.WebviewPlayerComponent)
  },
  {
    path: 'categories-mobile',
    loadComponent: () => import('./core/components/categories-mobile/categories-mobile.component').then(c => c.CategoriesMobileComponent)
  },
  {
    path: '',
    loadComponent: () => import('./pages/pages.component').then(c => c.PagesComponent),
    resolve: { initialData: initialDataResolver },
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
      },
      {
        path: 'category',
        loadComponent: () => import('./pages/category/category-list-view/category-list-view.component').then(c => c.CategoryListViewComponent)
      },
      {
        path: 'product-details/:id',
        loadComponent: () => import('./pages/product-details/product-details.component').then(c => c.ProductDetailsComponent),
        providers: [
          ProductDetailsService
        ],
        resolve: {
          productDetails: productDetailsResolver
        }
      },
      {
        path: 'wish-list',
        loadComponent: () => import('./pages/wish-list/wish-list.component').then(c => c.WishListComponent)
      },
      {
        path: 'not-found-404',
        loadComponent: () => import('./pages/not-found-404/not-found-404.component').then(c => c.NotFound404Component)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.routes').then(r => r.profileRoutes),
        canActivate: [ authGuard ]
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.routes').then(r => r.categoryRoutes)
      },
      {
        path: 'store/:storeId',
        loadChildren: () => import('./pages/company-profile/company-profile.routes').then(r => r.companyProfileRoutes)
      },
      {
        path: 'stores',
        loadComponent: () => import('./pages/stores/stores.component').then(c => c.StoresComponent)
      },
      {
        path: '**',
        redirectTo: 'not-found-404'
      }
    ]
  }
];
