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
    'the.best.announcements',
    'the.cheapest',
    'the.most.expensive',
    'coming.soon',
    'expired.announcements'
  ]
}
