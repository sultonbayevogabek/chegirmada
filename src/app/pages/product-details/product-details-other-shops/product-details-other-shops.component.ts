import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { SectionHeaderComponent } from '../../../core/components/section-header/section-header.component';

@Component({
  selector: 'product-details-other-shops',
  templateUrl: 'product-details-other-shops.component.html',
  styleUrl: 'product-details-other-shops.component.scss',
  imports: [
    SectionHeaderComponent,
    NgOptimizedImage,
    MatIconModule,
    MatRippleModule
  ],
  standalone: true
})

export class ProductDetailsOtherShopsComponent {
  productsInOtherShops = [
    {
      productImg: 'https://picsum.photos/72/84?rand=1',
      productTitle: 'Apple iPhone 13  256 ГБ',
      productOldPrice: '15 000 000 сум',
      productNewPrice: '13 499 000 сум',
      productDiscount: '10',
      productShopBrandLogo: '/assets/logos/mac-bro.svg',
      productShopBrandName: 'MacBro',
      productRating: '4.8'
    },
    {
      productImg: 'https://picsum.photos/72/84?rand=2',
      productTitle: 'Apple iPhone 13  256 ГБ',
      productOldPrice: '15 000 000 сум',
      productNewPrice: '13 499 000 сум',
      productDiscount: '10',
      productShopBrandLogo: '/assets/logos/mac-bro.svg',
      productShopBrandName: 'MacBro',
      productRating: '3.8'
    },
    {
      productImg: 'https://picsum.photos/72/84?rand=3',
      productTitle: 'Apple iPhone 13  256 ГБ',
      productOldPrice: '15 000 000 сум',
      productNewPrice: '13 499 000 сум',
      productDiscount: '10',
      productShopBrandLogo: '/assets/logos/mac-bro.svg',
      productShopBrandName: 'MacBro',
      productRating: '3.2'
    },
    {
      productImg: 'https://picsum.photos/72/84?rand=4',
      productTitle: 'Apple iPhone 13  256 ГБ',
      productOldPrice: '15 000 000 сум',
      productNewPrice: '13 499 000 сум',
      productDiscount: '10',
      productShopBrandLogo: '/assets/logos/mac-bro.svg',
      productShopBrandName: 'MacBro',
      productRating: '3.2'
    },
    {
      productImg: 'https://picsum.photos/72/84?rand=5',
      productTitle: 'Apple iPhone 13  256 ГБ',
      productOldPrice: '15 000 000 сум',
      productNewPrice: '13 499 000 сум',
      productDiscount: '10',
      productShopBrandLogo: '/assets/logos/mac-bro.svg',
      productShopBrandName: 'MacBro',
      productRating: '3.2'
    },
    {
      productImg: 'https://picsum.photos/72/84?rand=7',
      productTitle: 'Apple iPhone 13  256 ГБ',
      productOldPrice: '15 000 000 сум',
      productNewPrice: '13 499 000 сум',
      productDiscount: '10',
      productShopBrandLogo: '/assets/logos/mac-bro.svg',
      productShopBrandName: 'MacBro',
      productRating: '3.2'
    }, {
      productImg: 'https://picsum.photos/72/84?rand=8',
      productTitle: 'Apple iPhone 13  256 ГБ',
      productOldPrice: '15 000 000 сум',
      productNewPrice: '13 499 000 сум',
      productDiscount: '10',
      productShopBrandLogo: '/assets/logos/mac-bro.svg',
      productShopBrandName: 'MacBro',
      productRating: '3.2'
    },
    {
      productImg: 'https://picsum.photos/72/84?rand=9',
      productTitle: 'Apple iPhone 13  256 ГБ',
      productOldPrice: '15 000 000 сум',
      productNewPrice: '13 499 000 сум',
      productDiscount: '10',
      productShopBrandLogo: '/assets/logos/mac-bro.svg',
      productShopBrandName: 'MacBro',
      productRating: '3.2'
    }
  ];
}
