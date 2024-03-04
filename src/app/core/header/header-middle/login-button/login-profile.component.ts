import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../../../shared/components/login-dialog/login-dialog.component';
import { UiButtonComponent } from '../../../../shared/components/ui-button/ui-button.component';
import { AuthService } from '../../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { UserModel } from '../../../models/user.model';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'login-profile',
  templateUrl: 'login-profile.component.html',
  styleUrl: 'login-profile.component.scss',
  imports: [
    MatIconModule,
    UiButtonComponent,
    NgOptimizedImage,
    RouterLink
  ],
  standalone: true
})

export class LoginProfileComponent implements OnInit {
  private _dialog = inject(MatDialog);
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);
  currentUser: UserModel;

  ngOnInit(): void {
    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.currentUser = res;
      })
  }

  openLoginDialog(): void {
    const loginDialog = this._dialog.open(LoginDialogComponent, {
      closeOnNavigation: true,
      panelClass: 'login-dialog',
      width: '27rem',
      maxWidth: '100%'
    });

    loginDialog.afterClosed()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap(data => this.getUserByToken(data))
      )
      .subscribe()
  }

  getUserByToken(data: string | { authorized: boolean }): void {
    if (!data) return;

    this._authService.getUserByToken()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe()
  }
}
