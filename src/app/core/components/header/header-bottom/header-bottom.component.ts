import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabLink, MatTabNav } from '@angular/material/tabs';

@Component({
  selector: 'header-bottom',
  templateUrl: 'header-bottom.component.html',
  styleUrl: 'header-bottom.component.scss',
  imports: [
    RouterLink,
    TranslateModule,
    MatTabLink,
    MatTabNav
  ],
  standalone: true
})

export class HeaderBottomComponent {
  navs = [
    {
      text: 'the.best.announcements',
      query: {
        ordering: 3,
        page: 1,
        page_size: 12,
        expire: false
      }
    },
    {
      text: 'the.cheapest',
      query: {
        ordering: 1,
        page: 1,
        page_size: 12,
        expire: false
      }
    },
    {
      text: 'the.most.expensive',
      query: {
        ordering: 2,
        page: 1,
        page_size: 12,
        expire: false
      }
    },
    {
      text: 'coming.soon',
      query: {
        ordering: 0,
        page: 1,
        page_size: 12,
        expire: false
      }
    },
    {
      text: 'expired.announcements',
      query: {
        page: 1,
        page_size: 12,
        expire: true
      }
    }
  ];
}
