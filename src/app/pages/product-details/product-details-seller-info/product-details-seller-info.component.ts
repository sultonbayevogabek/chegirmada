import { Component, DestroyRef, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RatingStarsComponent } from '../../../core/components/rating-stars/rating-stars.component';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { ProductDetails, Store } from '../../../core/models/product-details.model';
import { TitleCasePipe } from '@angular/common';
import { ImgWrapperComponent } from '../../../core/components/img-wrapper/img-wrapper.component';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AverageRatePipe } from '../../../core/pipes/average-rate.pipe';
import { PhoneNumberPipe } from '../../../core/pipes/phone-number.pipe';
import { UserModel } from '../../../core/models/user.model';
import {
  LoginProfileComponent
} from '../../../core/components/header/header-middle/login-button/login-profile.component';
import { ProductDetailsService } from '../../../core/services/product-details.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'product-details-seller-info',
  templateUrl: 'product-details-seller-info.component.html',
  styleUrl: 'product-details-seller-info.component.scss',
  imports: [
    MatIconModule,
    RatingStarsComponent,
    UiButtonComponent,
    TitleCasePipe,
    ImgWrapperComponent,
    MatTooltip,
    TranslateModule,
    AverageRatePipe,
    PhoneNumberPipe
  ],
  standalone: true,
  providers: [
    LoginProfileComponent,
    ProductDetailsService
  ]
})

export class ProductDetailsSellerInfoComponent {
  @Input({
    required: true
  }) details: ProductDetails;

  @Input({
    required: true
  }) currentUser: UserModel;

  private _loginProfileComponent = inject(LoginProfileComponent);
  private _productDetailsService = inject(ProductDetailsService);
  private _destroyRef = inject(DestroyRef);

  subscribeToStore() {
    if (!this.currentUser) {
      this._loginProfileComponent.openLoginDialog();
      return;
    }

    this._productDetailsService.subscribeStore(this.details.store.pk)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.details.store.user_follow = !this.details.store.user_follow;

          if (this.details.store.user_follow) {
            this.details.store.followers = (+this.details.store.followers + 1).toString();
          } else {
            this.details.store.followers = (+this.details.store.followers - 1).toString();
          }
        }
      });
  }
}
