import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginProfileComponent } from '../header/header-middle/login-button/login-profile.component';

@Component({
  selector: 'mobile-menu',
  templateUrl: 'mobile-menu.component.html',
  styleUrl: 'mobile-menu.component.scss',
  imports: [
    MatIcon,
    MatRipple,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true,
  providers: [ LoginProfileComponent ]
})

export class MobileMenuComponent implements OnInit {
  currentUser: UserModel;

  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);
  private _loginProfileComponent = inject(LoginProfileComponent);

  ngOnInit(): void {
    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  openLoginProfileModal(): void {
    this._loginProfileComponent.openLoginDialog();
  }
}
