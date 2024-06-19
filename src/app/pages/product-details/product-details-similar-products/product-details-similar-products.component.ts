import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';
import { RatingStarsComponent } from '../../../core/components/rating-stars/rating-stars.component';
import { SectionHeaderComponent } from '../../../core/components/section-header/section-header.component';
import { ProductCardComponent } from '../../../core/components/product-card/product-card.component';
import { PRODUCTS } from '../../../core/constants/products';
import { ProductDetailsService } from '../../../core/services/product-details.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductCard } from '../../../core/models/wishlist.model';
import { SpinnerLoaderComponent } from '../../../core/components/spinner-loader/spinner-loader.component';
import { ProfileEmptyListComponent } from '../../profile/profile-empty-list/profile-empty-list.component';

@Component({
  selector: 'product-details-similar-products',
  templateUrl: 'product-details-similar-products.component.html',
  styleUrl: 'product-details-similar-products.component.scss',
  imports: [
    MatIconModule,
    RatingStarsComponent,
    SectionHeaderComponent,
    CarouselModule,
    ProductCardComponent,
    MatPaginator,
    SpinnerLoaderComponent,
    ProfileEmptyListComponent
  ],
  providers: [
    ProductDetailsService
  ],
  standalone: true
})

export class ProductDetailsSimilarProductsComponent implements OnInit {
  @Input() discountId: number;
  params = {
    page: 0,
    page_size: 4,
    total: 0,
    loading: true
  };
  similarDiscounts: ProductCard[] = [];

  private _productDetailsService = inject(ProductDetailsService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getSimilarDiscounts();
  }

  getSimilarDiscounts(): void {
    this._productDetailsService.getSimilarDiscountsList({
      ...this.params,
      id: this.discountId
    })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.similarDiscounts = res?.results || [];
        this.params.total = +res?.count;
        this.params.loading = false;
      }, err => {
        this.params.loading = false;
      })
  }

  onPageChange($event: PageEvent): void {
    this.params.page = $event.pageIndex;
    this.getSimilarDiscounts();
  }
}
