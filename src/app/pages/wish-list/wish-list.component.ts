import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProductsSectionComponent } from '../../core/components/products-section/products-section.component';
import { UiButtonComponent } from '../../core/components/ui-button/ui-button.component';
import { SectionHeaderComponent } from '../../core/components/section-header/section-header.component';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerLoaderComponent } from '../../core/components/spinner-loader/spinner-loader.component';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule
  ],
  standalone: true,
  providers: [
    ProductDetailsService
  ]
})

export class WishListComponent implements OnInit {
  loading = true;
  wishlist = [];
  private _productDetailsService = inject(ProductDetailsService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._productDetailsService.getWishlist()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (data: any) => {
          this.loading = false;
        }
      })
  }
}
