import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CatalogBtnComponent } from './catalog-btn/catalog-btn.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WishListButtonComponent } from './wish-list-button/wish-list-button.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'header-middle',
  templateUrl: 'header-middle.component.html',
  styleUrl: 'header-middle.component.scss',
  imports: [
    RouterLink,
    MatIconModule,
    CatalogBtnComponent,
    GlobalSearchComponent,
    NotificationsComponent,
    WishListButtonComponent,
    LoginButtonComponent,
    NgOptimizedImage
  ],
  standalone: true
})

export class HeaderMiddleComponent {

}
