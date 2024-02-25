import { Component } from '@angular/core';
import { TabsComponent } from '../../../../shared/components/tabs/tabs.component';
import { ProfileEmptyListComponent } from '../../profile-empty-list/profile-empty-list.component';

@Component({
  selector: 'announcements-list',
  standalone: true,
  imports: [
    TabsComponent,
    ProfileEmptyListComponent
  ],
  templateUrl: './announcements-list.component.html',
  styleUrl: './announcements-list.component.scss'
})

export class AnnouncementsListComponent {
  tabs = [
    {
      routerLink: ['active'],
      text: 'Активный'
    },
    {
      routerLink: ['pending'],
      text: 'Ожидающий'
    },
    {
      routerLink: ['not-payed'],
      text: 'Неоплачиваемый'
    },
    {
      routerLink: ['not-active'],
      text: 'Неактивный'
    },
    {
      routerLink: ['rejected'],
      text: 'Отклоненный'
    }
  ]
}
