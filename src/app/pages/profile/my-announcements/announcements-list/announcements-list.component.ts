import { Component } from '@angular/core';
import { ProfileEmptyListComponent } from '../../profile-empty-list/profile-empty-list.component';
import { TabsComponent } from '../../../../core/components/tabs/tabs.component';
import { MatIcon } from '@angular/material/icon';
import { ProductHorizontalCardComponent } from '../../product-horizontal-card/product-horizontal-card.component';
import { UiButtonComponent } from '../../../../core/components/ui-button/ui-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS } from '../../../../core/constants/products';

@Component({
  selector: 'announcements-list',
  standalone: true,
  imports: [
    TabsComponent,
    ProfileEmptyListComponent,
    MatIcon,
    ProductHorizontalCardComponent,
    UiButtonComponent,
    TranslateModule,
    RouterLink
  ],
  templateUrl: 'announcements-list.component.html',
  styleUrl: 'announcements-list.component.scss'
})

export class AnnouncementsListComponent {
  tabs = [
    {
      routerLink: ['../active'],
      text: 'active'
    },
    {
      routerLink: ['../pending'],
      text: 'pending'
    },
    {
      routerLink: ['../not-active'],
      text: 'inactive'
    },
    {
      routerLink: ['../rejected'],
      text: 'rejected'
    }
  ]

  products = PRODUCTS;
}
