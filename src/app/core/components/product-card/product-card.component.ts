import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.component.html',
  styleUrl: 'product-card.component.scss',
  imports: [
    NgOptimizedImage,
    MatIconModule,
    RouterLink
  ],
  standalone: true
})

export class ProductCardComponent {
  @Input({ required: true }) product: {
    productCardImageUrls: string[];
    productCardBrandLogo: string;
    productCardBrandName: string;
    productCardBrandViews: number;
    productCardTitle: string;
    productCardOldPrice: string;
    productCardNewPrice: string;
    productCardLocation: string;
    productCardDate: string;
  }

  activeIndex = 0;

  // productImages = [
  //   'https://picsum.photos/id/1/500/500',
  //   'https://picsum.photos/id/2/500/500',
  //   'https://picsum.photos/id/3/500/500',
  //   'https://picsum.photos/id/4/500/500',
  //   'https://picsum.photos/id/5/500/500',
  //   'https://picsum.photos/id/6/500/500',
  //   'https://picsum.photos/id/7/500/500',
  //   'https://picsum.photos/id/8/500/500',
  // ]
}
