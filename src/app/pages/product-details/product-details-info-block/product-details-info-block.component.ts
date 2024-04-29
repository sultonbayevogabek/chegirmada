import { Component, DestroyRef, inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ProductDetails } from '../../../core/models/product-details.model';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import {
  LoginProfileComponent
} from '../../../core/components/header/header-middle/login-button/login-profile.component';
import { UserModel } from '../../../core/models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductDetailsService } from '../../../core/services/product-details.service';
import { ScrollbarDirective } from '../../../core/directives/scrollbar.directive';

@Component({
  selector: 'product-details-info-block',
  templateUrl: 'product-details-info-block.component.html',
  styleUrl: 'product-details-info-block.component.scss',
  imports: [
    MatIcon,
    MatIconButton,
    TranslateModule,
    DatePipe,
    DecimalPipe,
    ScrollbarDirective
  ],
  standalone: true,
  providers: [ LoginProfileComponent, ProductDetailsService ]
})

export class ProductDetailsInfoBlockComponent implements OnInit, OnChanges {
  @Input({
    required: true
  }) details: ProductDetails;
  @Input({
    required: true
  }) currentUser: UserModel;
  loading = false;

  private _authService = inject(AuthService);
  private _loginProfileComponent = inject(LoginProfileComponent);
  private _productDetailsService = inject(ProductDetailsService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    console.log('Changes', this.details);
  }

  like(): void {
    if (!this.currentUser) {
      this._loginProfileComponent.openLoginDialog();
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;
    this._productDetailsService.likeProduct(this.details.pk)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.loading = false;

          if (this.details.user_like) {
            this.details.likes = (+this.details.likes - 1).toString();
            this.details.user_like = false;
            return
          }

          this.details.likes = (+this.details.likes + 1).toString();
          this.details.user_like = true;
          this.details.user_dislike = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  dislike(): void {
    if (!this.currentUser) {
      this._loginProfileComponent.openLoginDialog();
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;
    this._productDetailsService.dislikeProduct(this.details.pk)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.loading = false;

          if (this.details.user_dislike) {
            this.details.user_dislike = false;
            return
          }

          if (this.details.user_like) {
            this.details.likes = (+this.details.likes - 1).toString();
            this.details.user_like = false;
            this.details.user_dislike = true;
            return
          }

          this.details.user_dislike = true;
        },
        error: () => {
          this.loading = false;
        }
      });
  }
}
