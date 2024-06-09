import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { UserModel } from '../../core/models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SectionHeaderComponent } from '../../core/components/section-header/section-header.component';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { UiButtonComponent } from '../../core/components/ui-button/ui-button.component';

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
    TranslateModule,
    MatDrawerContainer,
    MatDrawer,
    NgClass,
    UiButtonComponent
  ],
  standalone: true,
  providers: []
})

export class ProfileComponent implements OnInit {
  currentUser: UserModel;
  isProfileMenuOpened = false;

  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

  constructor() {
  }

  menu = [
    {
      icon: 'icon:my-information',
      link: 'my-information',
      name: 'my.information',
      isStoreRequired: false
    },
    {
      icon: 'icon:my-information',
      link: 'my-store',
      name: 'my.store',
      isStoreRequired: false
    },
    {
      icon: 'icon:my-information',
      link: 'my-branches',
      name: 'my.branches',
      isStoreRequired: true
    },
    {
      icon: 'icon:my-information',
      link: 'my-announcements',
      name: 'my.announcements',
      isStoreRequired: true
    },
    {
      icon: 'icon:my-information',
      link: 'balance',
      name: 'balance',
      isStoreRequired: true
    },
    {
      icon: 'icon:my-information',
      link: 'packages',
      name: 'packages',
      isStoreRequired: true
    },
    /*{
      icon: 'icon:like-outline',
      link: 'favourite-products',
      name: 'liked.announcements',
      isStoreRequired: false
    },*/
    // {
    //   icon: 'icon:settings',
    //   link: 'settings',
    //   name: 'settings',
    //   isStoreRequired: false
    // }
  ];

  ngOnInit(): void {
    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(user => {
        this.currentUser = user;
      })

    this._router.events
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: event => {
          this.isProfileMenuOpened = false;
        }
      });
  }

  signOut(): void {
    this._authService.signOut();
  }
}
