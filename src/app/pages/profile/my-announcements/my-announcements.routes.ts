import { Routes } from '@angular/router';

export const myAnnouncementsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./my-announcements.component').then(c => c.MyAnnouncementsComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'active'
      },
      {
        path: 'active',
        loadComponent: () => import('./active-announcements/active-announcements.component').then(c => c.ActiveAnnouncementsComponent)
      },
      {
        path: 'pending',
        loadComponent: () => import('./active-announcements/active-announcements.component').then(c => c.ActiveAnnouncementsComponent)
      },
      {
        path: 'not-payed',
        loadComponent: () => import('./active-announcements/active-announcements.component').then(c => c.ActiveAnnouncementsComponent)
      },
      {
        path: 'not-active',
        loadComponent: () => import('./active-announcements/active-announcements.component').then(c => c.ActiveAnnouncementsComponent)
      },
      {
        path: 'rejected',
        loadComponent: () => import('./active-announcements/active-announcements.component').then(c => c.ActiveAnnouncementsComponent)
      }
    ]
  }
];
