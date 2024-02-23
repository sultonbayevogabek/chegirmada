import { Component } from '@angular/core';
import { TabsComponent } from '../../../shared/components/tabs/tabs.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'my-announcements',
  templateUrl: 'my-announcements.component.html',
  styleUrl: 'my-announcements.component.scss',
  imports: [
    TabsComponent,
    MatIcon

  ],
  standalone: true
})

export class MyAnnouncementsComponent {
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

