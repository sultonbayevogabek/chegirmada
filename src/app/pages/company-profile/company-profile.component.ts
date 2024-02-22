import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { YoutubePlayer } from '../../shared/components/youtube-player/youtube-player.component';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';

@Component({
  selector: 'company-profile',
  templateUrl: 'company-profile.component.html',
  styleUrl: 'company-profile.component.scss',
  imports: [
    NgOptimizedImage,
    MatIcon,
    UiButtonComponent,
    YoutubePlayer,
    TabsComponent
  ],
  standalone: true
})

export class CompanyProfileComponent {
  tabs = [
    {
      routerLink: ['discounts'],
      text: 'Скидки'
    },
    {
      routerLink: ['products'],
      text: 'Продукты'
    },
    {
      routerLink: ['branches'],
      text: 'Филиали'
    },
    {
      routerLink: ['expired-discounts'],
      text: 'Законченный скидки'
    }
  ]
}
