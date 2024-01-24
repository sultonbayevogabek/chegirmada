import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgClass, NgForOf, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'product-details',
  templateUrl: 'product-details.component.html',
  styleUrls: [ 'product-details.component.scss' ],
  imports: [
    MatIconModule,
    CarouselModule,
    NgClass,
    NgForOf,
    NgOptimizedImage,
    MatButtonModule
  ],
  standalone: true
})

export class ProductDetailsComponent {
  @ViewChild('thumbsCarousel') thumbsCarousel: CarouselComponent;
  selectedImageIndex = 0;
  selectedImageUrl = 'https://picsum.photos/1000?id=1';

  thumbsCarouselOption: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 4,
    margin: 16,
    nav: false,
    navText: [ '', '' ]
  };

  productImages = [
    'https://picsum.photos/1000?id=1',
    'https://picsum.photos/1000?id=2',
    'https://picsum.photos/1000?id=3',
    'https://picsum.photos/1000?id=4',
    'https://picsum.photos/1000?id=5',
    'https://picsum.photos/1000?id=6'
  ];

  navigateCarousel(direction: 'next' | 'prev'): void {
    const productImages = this.productImages;
    const productImagesLength = productImages.length;

    if (direction === 'next') {
      if (productImagesLength - 1 > this.selectedImageIndex) {
        this.selectedImageIndex++;
        this.selectedImageUrl = productImages[this.selectedImageIndex];
      } else {
        this.selectedImageIndex = 0;
        this.selectedImageUrl = productImages[0];
      }
    }

    if (direction === 'prev') {
      if (this.selectedImageIndex > 0) {
        this.selectedImageIndex--;
        this.selectedImageUrl = productImages[this.selectedImageIndex];
      } else {
        this.selectedImageIndex = productImagesLength - 1;
        this.selectedImageUrl = productImages[this.selectedImageIndex];
      }
    }

    this.thumbsCarousel.to(this.selectedImageUrl);
  }

  selectThumb(i: number): void {
    const previousSelectedImageIndex = this.selectedImageIndex;
    this.selectedImageIndex = i;
    this.selectedImageUrl = this.productImages[i];

    if (this.selectedImageIndex > previousSelectedImageIndex) {
      this.thumbsCarousel.next()
    }

    if (this.selectedImageIndex < previousSelectedImageIndex) {
      this.thumbsCarousel.prev()
    }
  }
}
