import { Routes } from '@angular/router';
import { AnnouncementsListComponent } from './announcements-list/announcements-list.component';

export const myAnnouncementsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./my-announcements.component').then(c => c.MyAnnouncementsComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        loadComponent: () => import('./announcements-list/announcements-list.component').then(c => c.AnnouncementsListComponent),
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
          },
        ]
      },
      {
        path: 'create',
        loadComponent: () => import('./create-announcement/create-announcement.component').then(c => c.CreateAnnouncementComponent)
      }
    ]
  }
];
