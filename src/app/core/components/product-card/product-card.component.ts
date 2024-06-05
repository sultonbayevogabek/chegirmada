import { Component, DestroyRef, ElementRef, inject, Input, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
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
import { DatePipe } from '../../pipes/date.pipe';

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
    MatIconButton,
    DatePipe,
    DatePipe,
    AsyncPipe
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

  private _startX: number = 0;
  private _startY: number = 0;
  private _productDetailsService = inject(ProductDetailsService);
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);
  private _loginProfileComponent = inject(LoginProfileComponent);
  private _el = inject(ElementRef);

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

  swipeStart(event: TouchEvent) {
    this._startX = event.changedTouches[0].clientX;
    this._startY = event.changedTouches[0].clientY;
  }

  swipeEnd(event: TouchEvent) {
    const deltaX = event.changedTouches[0].clientX - this._startX;
    const deltaY = event.changedTouches[0].clientY - this._startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        if (this.activeIndex > 0) {
          this.activeIndex--;
          return;
        }

        this.activeIndex = this.product.images?.length - 1;
        return;
      }

      if (this.activeIndex < this.product.images?.length - 1) {
        this.activeIndex++;
        return;
      }

      this.activeIndex = 0;
    }

    this._startX = 0;
    this._startY = 0;
  }
}
