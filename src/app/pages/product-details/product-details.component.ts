import { Component } from '@angular/core';
import { ProductDetailsSellerInfoComponent } from './product-details-seller-info/product-details-seller-info.component';
import { ProductDetailsTabsComponent } from './product-details-tabs/product-details-tabs.component';
import { ProductDetailsMapComponent } from './product-details-map/product-details-map.component';
import { ProductDetailsOtherShopsComponent } from './product-details-other-shops/product-details-other-shops.component';
import {
  ProductDetailsSimilarProductsComponent
} from './product-details-similar-products/product-details-similar-products.component';
import { RatingStarsComponent } from '../../shared/components/rating-stars/rating-stars.component';
import { BreadCrumbsComponent } from '../../shared/components/bread-crumbs/bread-crumbs.component';
import { ProductDetailsGalleryComponent } from './product-details-gallery/product-details-gallery.component';
import { ProductDetailsInfoBlockComponent } from './product-details-info-block/product-details-info-block.component';

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
    ProductDetailsInfoBlockComponent
  ],
  standalone: true
})

export class ProductDetailsComponent {
  breadCrumbs = [
    {
      text: 'Главная',
      url: '#',
    },
    {
      text: 'Смартфоны',
      url: '#',
    },
    {
      text: 'Apple',
      url: '#',
    },
    {
      text: 'Смартфон iPhone 15 Pro 256GB Синий Титан',
      url: ''
    }
  ]

}
