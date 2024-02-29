import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WishListButtonComponent } from './wish-list-button/wish-list-button.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { NgOptimizedImage } from '@angular/common';
import { CategoriesPanelComponent } from './catalog-panel/categories-panel.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'header-middle',
  templateUrl: 'header-middle.component.html',
  styleUrl: 'header-middle.component.scss',
  imports: [
    RouterLink,
    MatIconModule,
    GlobalSearchComponent,
    NotificationsComponent,
    WishListButtonComponent,
    LoginButtonComponent,
    NgOptimizedImage,
    CategoriesPanelComponent,
    TranslateModule
  ],
  standalone: true
})

export class HeaderMiddleComponent {
  isCatalogPanelOpen = false;

  toggleCatalogPanel() {
    this.isCatalogPanelOpen = !this.isCatalogPanelOpen
  }
}
