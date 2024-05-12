import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProductsSectionComponent } from '../../core/components/products-section/products-section.component';
import { UiButtonComponent } from '../../core/components/ui-button/ui-button.component';
import { SectionHeaderComponent } from '../../core/components/section-header/section-header.component';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerLoaderComponent } from '../../core/components/spinner-loader/spinner-loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProductCard } from '../../core/models/wishlist.model';
import { MatPaginator } from '@angular/material/paginator';
import { ProductCardComponent } from '../../core/components/product-card/product-card.component';

@Component({
  selector: 'wish-list',
  templateUrl: 'wish-list.component.html',
  styleUrl: 'wish-list.component.scss',
  imports: [
    ProductsSectionComponent,
    UiButtonComponent,
    NgOptimizedImage,
    SectionHeaderComponent,
    SpinnerLoaderComponent,
    TranslateModule,
    MatPaginator,
    ProductCardComponent
  ],
  standalone: true,
  providers: [
    ProductDetailsService
  ]
})

export class WishListComponent implements OnInit {
  params = {
    page: 0,
    page_size: 8
  }
  loading = true;
  wishlist: ProductCard[] = [];
  private _productDetailsService = inject(ProductDetailsService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist(): void {
    this._productDetailsService.getWishlist(this.params)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {
          this.loading = false;
          this.wishlist = res?.results;
        },
        error: () => {
          this.loading = false;
        }
      })
  }
}
