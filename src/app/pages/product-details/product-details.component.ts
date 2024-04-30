import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProductDetailsSellerInfoComponent } from './product-details-seller-info/product-details-seller-info.component';
import { ProductDetailsTabsComponent } from './product-details-tabs/product-details-tabs.component';
import { ProductDetailsMapComponent } from './product-details-map/product-details-map.component';
import { ProductDetailsOtherShopsComponent } from './product-details-other-shops/product-details-other-shops.component';
import {
  ProductDetailsSimilarProductsComponent
} from './product-details-similar-products/product-details-similar-products.component';
import { ProductDetailsGalleryComponent } from './product-details-gallery/product-details-gallery.component';
import { ProductDetailsInfoBlockComponent } from './product-details-info-block/product-details-info-block.component';
import { RatingStarsComponent } from '../../core/components/rating-stars/rating-stars.component';
import { BreadCrumbsComponent } from '../../core/components/bread-crumbs/bread-crumbs.component';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductDetails } from '../../core/models/product-details.model';
import { BreadcrumbModel } from '../../core/models/breadcrumb.model';
import { AuthService } from '../../core/services/auth.service';
import { UserModel } from '../../core/models/user.model';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { TabsComponent } from '../../core/components/tabs/tabs.component';

@Component({
  selector: 'product-details',
  templateUrl: 'product-details.component.html',
  styleUrl: 'product-details.component.scss',
    imports: [
        RatingStarsComponent,
        ProductDetailsSellerInfoComponent,
        ProductDetailsTabsComponent,
        ProductDetailsMapComponent,
        ProductDetailsOtherShopsComponent,
        ProductDetailsSimilarProductsComponent,
        BreadCrumbsComponent,
        ProductDetailsGalleryComponent,
        ProductDetailsInfoBlockComponent,
        TabsComponent
    ],
  standalone: true
})

export class ProductDetailsComponent implements OnInit {
  breadCrumbs: BreadcrumbModel[] = [];
  details: ProductDetails;
  currentUser: UserModel;
  count = 0;

  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private _productDetailsService = inject(ProductDetailsService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._productDetailsService.productDetails$
      .subscribe(productDetails => {
        this.details = productDetails;
        this.generateBreadCrumbs();
      });


    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (user): void => {
          this.currentUser = user;
          this.refreshDetails();
          this.count++;
        }
      });
  }

  generateBreadCrumbs(): void {
    this.details.categories.forEach(category => {
      this.breadCrumbs.push({
        text: category.name,
        url: '#'
      });
    });
  }

  refreshDetails(): void {
    if (this.count) {
      this._productDetailsService
        .getProductDetails(this.details.pk)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe();
    }
  }
}
