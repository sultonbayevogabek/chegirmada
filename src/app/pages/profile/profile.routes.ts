import { Routes } from '@angular/router';

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
        path: 'register-store',
        loadComponent: () => import('./register-store/register-store.component').then(c => c.RegisterStoreComponent)
      },
      {
        path: 'branches',
        loadComponent: () => import('./branches/branches.component').then(c => c.BranchesComponent)
      },
      {
        path: 'my-announcements',
        loadChildren: () => import('./my-announcements/my-announcements.routes').then(r => r.myAnnouncementsRoutes)
      }
    ]
  }
];
