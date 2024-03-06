import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'header-bottom',
  templateUrl: 'header-bottom.component.html',
  styleUrl: 'header-bottom.component.scss',
  imports: [
    RouterLink,
    TranslateModule
  ],
  standalone: true
})

export class HeaderBottomComponent {
  navs = [
    'categories',
    'the.best.announcements',
    'announcements.about.coming.discounts',
    'for.you',
    'announcements.near.you',
    'recently.viewed.announcements',
    'expired.announcements'
  ]
}
