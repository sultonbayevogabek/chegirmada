import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';
import { RatingStarsComponent } from '../../../shared/components/rating-stars/rating-stars.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

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

  products = [
    {
      productCardImageUrl: '/assets/products/1.jpg',
      productCardBrandLogo: '/assets/logos/mac-bro.svg',
      productCardBrandName: 'MacBro',
      productCardBrandViews: 124,
      productCardTitle: 'Фотоаппарат Canon EOS 2000D Kit EF-S 18-55mm III IS Wi-Fi',
      productCardOldPrice: '4 700 000 сум',
      productCardNewPrice: '3 900 000 сум',
      productCardLocation: 'Ташкент',
      productCardDate: '14 но. – 21 дек.',
    },
    {
      productCardImageUrl: '/assets/products/2.jpg',
      productCardBrandLogo: '/assets/logos/mac-bro.svg',
      productCardBrandName: 'MacBro',
      productCardBrandViews: 214,
      productCardTitle: 'Смартфон Apple iPhone 13 pro 256 ГБ, Dual: nano SIM + eSIM',
      productCardOldPrice: '18 500 000 сум',
      productCardNewPrice: '17 000 000 сум',
      productCardLocation: 'Ташкент',
      productCardDate: '14 но. – 21 дек.',
    },
    {
      productCardImageUrl: '/assets/products/3.jpg',
      productCardBrandLogo: '/assets/logos/mac-bro.svg',
      productCardBrandName: 'MacBro',
      productCardBrandViews: 356,
      productCardTitle: 'Наушники Apple AirPods Pro (2-го поколения, 2022), белый',
      productCardOldPrice: '2 200 000 сум',
      productCardNewPrice: '1 900 000 сум',
      productCardLocation: 'Ташкент',
      productCardDate: '14 но. – 21 дек.',
    },
    {
      productCardImageUrl: '/assets/products/4.jpg',
      productCardBrandLogo: '/assets/logos/mac-bro.svg',
      productCardBrandName: 'MacBro',
      productCardBrandViews: 433,
      productCardTitle: 'Смартфон Apple iPhone 13 pro 256 ГБ, Dual: nano SIM + eSIM',
      productCardOldPrice: '1 050 $',
      productCardNewPrice: '950 $',
      productCardLocation: 'Ташкент',
      productCardDate: '14 но. – 21 дек.',
    }
  ]

  navigateCarousel(carousel: CarouselComponent, direction: 'next' | 'prev'): void {
    carousel[direction]();
  }
}
