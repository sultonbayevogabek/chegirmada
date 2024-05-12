import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { ProductCardComponent } from '../../../core/components/product-card/product-card.component';
import { PRODUCTS } from '../../../core/constants/products';

@Component({
  selector: 'company-profile-discounts',
  templateUrl: 'company-profile-discounts.component.html',
  styleUrl: 'company-profile-discounts.component.scss',
  imports: [
    NgOptimizedImage,
    UiButtonComponent,
    MatIcon,
    ProductCardComponent
  ],
  standalone: true
})

export class CompanyProfileDiscountsComponent {
  products = PRODUCTS
}
