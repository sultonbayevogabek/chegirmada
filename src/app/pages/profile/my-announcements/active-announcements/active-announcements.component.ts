import { Component } from '@angular/core';
import { ProductHorizontalCardComponent } from '../../product-horizontal-card/product-horizontal-card.component';
import { MatIcon } from '@angular/material/icon';
import { UiButtonComponent } from '../../../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'active-announcements',
  templateUrl: 'active-announcements.component.html',
  styleUrl: 'active-announcements.component.scss',
  imports: [
    ProductHorizontalCardComponent,
    MatIcon,
    UiButtonComponent
  ],
  standalone: true
})

export class ActiveAnnouncementsComponent {
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
      productCardDate: '14 но. – 21 дек.'
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
      productCardDate: '14 но. – 21 дек.'
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
      productCardDate: '14 но. – 21 дек.'
    }
  ];
}
