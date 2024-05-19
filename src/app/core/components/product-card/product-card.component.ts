import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../models/wishlist.model';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconButton } from '@angular/material/button';
import { ProductDetailsService } from '../../services/product-details.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { LoginProfileComponent } from '../header/header-middle/login-button/login-profile.component';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.component.html',
  styleUrl: 'product-card.component.scss',
  imports: [
    NgOptimizedImage,
    MatIconModule,
    RouterLink,
    DecimalPipe,
    TranslateModule,
    DatePipe,
    MatIconButton
  ],
  standalone: true,
  providers: [
    ProductDetailsService,
    LoginProfileComponent
  ]
})

export class ProductCardComponent implements OnInit {
  @Input({ required: true }) product: ProductCard;

  activeIndex = 0;
  currentUser: UserModel;

  private _productDetailsService = inject(ProductDetailsService);
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);
  private _loginProfileComponent = inject(LoginProfileComponent);

  ngOnInit(): void {
    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: user => this.currentUser = user
      });
  }

  wishlist($event: MouseEvent): void {
    $event.stopPropagation();

    if (!this.currentUser) {
      this._loginProfileComponent.openLoginDialog();
      return;
    }

    this._productDetailsService.toggleWishlist(this.product.pk)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.product.user_wishlist = !this.product.user_wishlist;
        }
      });
  }
}
