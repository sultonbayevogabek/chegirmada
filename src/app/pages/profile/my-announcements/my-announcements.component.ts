import { Component } from '@angular/core';
import { TabsComponent } from '../../../shared/components/tabs/tabs.component';

@Component({
  selector: 'my-announcements',
  templateUrl: 'my-announcements.component.html',
  styleUrl: 'my-announcements.component.scss',
  imports: [
    TabsComponent

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

