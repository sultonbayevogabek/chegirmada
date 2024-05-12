import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ProductCardComponent } from '../../../core/components/product-card/product-card.component';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { PRODUCTS } from '../../../core/constants/products';

@Component({
  selector: 'company-profile-products',
  templateUrl: 'company-profile-products.component.html',
  styleUrl: 'company-profile-products.component.scss',
   imports: [
      NgOptimizedImage,
      MatIcon,
      ProductCardComponent,
      UiButtonComponent
   ],
  standalone: true
})

export class CompanyProfileProductsComponent {
  products = PRODUCTS
}
