import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatOption, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { MatSelect } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'category-products-list',
  templateUrl: 'category-products-list.component.html',
  styleUrl: 'category-products-list.component.scss',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule, MatNativeDateModule, FormsModule, ProductCardComponent, MatSelect, MatOption, RouterLink
  ],
  standalone: true
})

export class CategoryProductsListComponent implements OnInit {
  startDate = new Date();
  endDate = new Date();

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
    },
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
    },
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

  ngOnInit() {

  }
}
