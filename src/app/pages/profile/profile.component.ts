import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrl: 'profile.component.scss',
  imports: [
    SectionHeaderComponent,
    RouterLink,
    MatIcon,
    MatRipple,
    RouterOutlet,
    RouterLinkActive,
    NgTemplateOutlet
  ],
  standalone: true,
  providers: []
})

export class ProfileComponent {

  constructor() {
  }

  menu = [
    {
      icon: 'icon:my-information',
      link: 'my-information',
      name: 'Моя информация'
    },
    {
      icon: 'icon:my-information',
      link: 'my-announcements',
      name: 'Мои объявления'
    },
    {
      icon: 'icon:my-information',
      link: 'branches',
      name: 'Филиалы'
    },
    {
      icon: 'icon:favourite-companies',
      link: 'favourite-companies',
      name: 'Следующая компания'
    },
    {
      icon: 'icon:like-outline',
      link: 'favourite-products',
      name: 'Нравится'
    },
    {
      icon: 'icon:settings',
      link: 'settings',
      name: 'Настройки'
    }
  ];
}
