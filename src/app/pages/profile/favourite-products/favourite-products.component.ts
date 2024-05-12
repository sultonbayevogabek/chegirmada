import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common';
import { ProfileEmptyListComponent } from '../profile-empty-list/profile-empty-list.component';
import { ProductCardComponent } from '../../../core/components/product-card/product-card.component';
import { PRODUCTS } from '../../../core/constants/products';

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
  products = PRODUCTS;
}
