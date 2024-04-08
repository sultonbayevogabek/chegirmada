import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common';
import { ProfileEmptyListComponent } from '../profile-empty-list/profile-empty-list.component';
import { ProductCardComponent } from '../../../core/components/product-card/product-card.component';

@Component({
  selector: 'favourite-products',
  templateUrl: 'favourite-products.component.html',
  styleUrl: 'favourite-products.component.scss',
  imports: [
    MatIcon,
    MatRipple,
    NgOptimizedImage,
    ProfileEmptyListComponent,
    ProductCardComponent
  ],
  standalone: true
})

export class FavouriteProductsComponent {
  products = [
    {
      productCardImageUrls: [
        '/assets/products/1.jpg',
        '/assets/products/2.jpg',
        '/assets/products/3.jpg',
        '/assets/products/4.jpg',
      ],
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
      productCardImageUrls: [
        '/assets/products/2.jpg',
        '/assets/products/1.jpg',
        '/assets/products/2.jpg',
        '/assets/products/3.jpg',
      ],
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
      productCardImageUrls: [
        '/assets/products/3.jpg',
        '/assets/products/1.jpg',
        '/assets/products/2.jpg',
        '/assets/products/4.jpg',
      ],
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
      productCardImageUrls: [
        '/assets/products/4.jpg',
        '/assets/products/1.jpg',
        '/assets/products/2.jpg',
        '/assets/products/3.jpg',
      ],
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
}
