import { Routes } from '@angular/router';
import { MyAnnouncementsService } from '../../../core/services/my-announcements.service';
import { discountUpdateDataResolver } from '../../../core/resolvers/discount-update-data.resolver';

export const myAnnouncementsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./my-announcements.component').then(c => c.MyAnnouncementsComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list/active'
      },
      {
        path: 'list/:status',
        loadComponent: () => import('./announcements-list/announcements-list.component').then(c => c.AnnouncementsListComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./create-announcement/create-announcement.component').then(c => c.CreateAnnouncementComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./edit-announcement/edit-announcement.component').then(c => c.EditAnnouncementComponent),
        providers: [
          MyAnnouncementsService
        ],
        resolve: {
          discountUpdateDataResolver
        }
      }
    ]
  }
];
