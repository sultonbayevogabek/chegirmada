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
      }
    ]
  }
];
