import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';
import { RatingStarsComponent } from '../../../core/components/rating-stars/rating-stars.component';
import { SectionHeaderComponent } from '../../../core/components/section-header/section-header.component';
import { ProductCardComponent } from '../../../core/components/product-card/product-card.component';
import { PRODUCTS } from '../../../core/constants/products';

@Component({
  selector: 'product-details-similar-products',
  templateUrl: 'product-details-similar-products.component.html',
  styleUrl: 'product-details-similar-products.component.scss',
  imports: [
    MatIconModule,
    RatingStarsComponent,
    SectionHeaderComponent,
    CarouselModule,
    ProductCardComponent
  ],
  standalone: true
})

export class ProductDetailsSimilarProductsComponent {
  similarProductsCarouselOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 2,
    nav: false,
    navText: ['', ''],
    autoplay: true,
    margin: 20
  }

  products = PRODUCTS

  navigateCarousel(carousel: CarouselComponent, direction: 'next' | 'prev'): void {
    carousel[direction]();
  }
}
