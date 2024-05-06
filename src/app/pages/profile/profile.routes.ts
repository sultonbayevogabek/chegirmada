import { Routes } from '@angular/router';
import { hasStoreGuard } from '../../core/guards/has-store.guard';

export const profileRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./profile.component').then(c => c.ProfileComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-information'
      },
      {
        path: 'my-information',
        loadComponent: () => import('./my-information/my-information.component').then(c => c.MyInformationComponent)
      },
      {
        path: 'favourite-companies',
        loadComponent: () => import('./favourite-companies/favourite-companies.component').then(c => c.FavouriteCompaniesComponent)
      },
      {
        path: 'favourite-products',
        loadComponent: () => import('./favourite-products/favourite-products.component').then(c => c.FavouriteProductsComponent)
      },
      {
        path: 'my-store',
        loadComponent: () => import('./my-store/my-store.component').then(c => c.MyStoreComponent),
      },
      {
        path: 'my-branches',
        loadComponent: () => import('./branches/branches.component').then(c => c.BranchesComponent),
        canActivate: [hasStoreGuard]
      },
      {
        path: 'my-announcements',
        loadChildren: () => import('./my-announcements/my-announcements.routes').then(r => r.myAnnouncementsRoutes),
        canActivate: [hasStoreGuard]
      },
      {
        path: 'balance',
        loadComponent: () => import('./balance/balance.component').then(c => c.BalanceComponent),
        canActivate: [hasStoreGuard]
      }
    ]
  }
];
