import { Routes } from '@angular/router';

export const companyProfileRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./company-profile.component').then(c => c.CompanyProfileComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'discounts'
      },
      {
        path: 'discounts',
        loadComponent: () => import('./company-profile-discounts/company-profile-discounts.component').then(c => c.CompanyProfileDiscountsComponent),
      },
      {
        path: 'products',
        loadComponent: () => import('./company-profile-discounts/company-profile-discounts.component').then(c => c.CompanyProfileDiscountsComponent),
      },
      {
        path: 'branches',
        loadComponent: () => import('./company-profile-branches/company-profile-branches.component').then(c => c.CompanyProfileBranchesComponent),
      },
      {
        path: 'expired-discounts',
        loadComponent: () => import('./company-profile-discounts/company-profile-discounts.component').then(c => c.CompanyProfileDiscountsComponent),
      }
    ]
  },
];
