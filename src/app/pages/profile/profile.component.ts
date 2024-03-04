import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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
    NgTemplateOutlet,
    TranslateModule
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
      name: 'my.information'
    },
    {
      icon: 'icon:my-information',
      link: 'my-announcements',
      name: 'my.announcements'
    },
    {
      icon: 'icon:my-information',
      link: 'branches',
      name: 'branches'
    },
    {
      icon: 'icon:favourite-companies',
      link: 'favourite-companies',
      name: 'favourite.brands'
    },
    {
      icon: 'icon:like-outline',
      link: 'favourite-products',
      name: 'liked.announcements'
    },
    {
      icon: 'icon:settings',
      link: 'settings',
      name: 'settings'
    }
  ];
}
