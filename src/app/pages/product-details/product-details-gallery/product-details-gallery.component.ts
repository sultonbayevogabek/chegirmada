import { Component, inject, ViewChild } from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {
  ProductDetailsGalleryModalComponent
} from '../product-details-gallery-modal/product-details-gallery-modal.component';

@Component({
  selector: 'product-details-gallery',
  templateUrl: 'product-details-gallery.component.html',
  styleUrl: 'product-details-gallery.component.scss',
  imports: [
    CarouselModule,
    MatIcon,
    NgOptimizedImage
  ],
  standalone: true
})

export class ProductDetailsGalleryComponent {
  @ViewChild('thumbsCarousel') thumbsCarousel: CarouselComponent;
  selectedImageIndex = 0;
  selectedImageUrl = 'https://picsum.photos/id/1/1000/1000';

  private _dialog = inject(MatDialog);

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
    'https://picsum.photos/id/1/1000/1000',
    'https://picsum.photos/id/2/1000/1000',
    'https://picsum.photos/id/3/1000/1000',
    'https://picsum.photos/id/4/1000/1000',
    'https://picsum.photos/id/5/1000/1000',
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
    console.log(this.selectedImageUrl);

    if (this.selectedImageIndex > previousSelectedImageIndex) {
      this.thumbsCarousel.next()
    }

    if (this.selectedImageIndex < previousSelectedImageIndex) {
      this.thumbsCarousel.prev()
    }
  }

  openGalleryModal(): void {
    this._dialog.open(ProductDetailsGalleryModalComponent, {
      panelClass: 'product-details-gallery-modal',
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {
        selectedImageUrl: this.selectedImageUrl,
        selectedImageIndex: this.selectedImageIndex,
        productImages: this.productImages
      }
    })
  }
}
