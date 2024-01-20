import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: [ 'product-card.component.scss' ],
  imports: [
    NgOptimizedImage,
    MatIconModule
  ],
  standalone: true
})

export class ProductCardComponent {
  @Input({ required: true }) product: {
    productCardImageUrl: string;
    productCardBrandLogo: string;
    productCardBrandName: string;
    productCardBrandViews: number;
    productCardTitle: string;
    productCardOldPrice: string;
    productCardNewPrice: string;
    productCardLocation: string;
    productCardDate: string;
  }
}
