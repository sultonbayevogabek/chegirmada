import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CatalogBtnComponent } from './catalog-btn/catalog-btn.component';
import { SiteLogoComponent } from '../../shared/components/site-logo/site-logo.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { NotificationsButtonComponent } from './notifications-button/notifications-button.component';
import { WishListButtonComponent } from './wish-list-button/wish-list-button.component';
import { LoginButtonComponent } from './login-button/login-button.component';

@Component({
   selector: 'header-middle',
   templateUrl: 'header-middle.component.html',
   styleUrls: [ 'header-middle.component.scss' ],
   imports: [
      RouterLink,
      MatIconModule,
      CatalogBtnComponent,
      SiteLogoComponent,
      GlobalSearchComponent,
      NotificationsButtonComponent,
      WishListButtonComponent,
      LoginButtonComponent
   ],
   standalone: true
})

export class HeaderMiddleComponent {

}
