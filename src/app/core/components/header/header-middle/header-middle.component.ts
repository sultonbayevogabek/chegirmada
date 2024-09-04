import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WishListButtonComponent } from './wish-list-button/wish-list-button.component';
import { LoginProfileComponent } from './login-button/login-profile.component';
import { NgOptimizedImage } from '@angular/common';
import { CategoriesPanelComponent } from './catalog-panel/categories-panel.component';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ImgWrapperComponent } from '../../img-wrapper/img-wrapper.component';

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
    LoginProfileComponent,
    NgOptimizedImage,
    CategoriesPanelComponent,
    TranslateModule,
    ImgWrapperComponent
  ],
  standalone: true
})

export class HeaderMiddleComponent implements OnInit {
  isCatalogPanelOpen = false;

  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._router.events
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: event => {
          this.isCatalogPanelOpen = false;
        }
      });
  }

  toggleCatalogPanel() {
    this.isCatalogPanelOpen = !this.isCatalogPanelOpen
  }
}
