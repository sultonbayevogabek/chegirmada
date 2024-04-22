import { Component, inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {
  ProductDetailsGalleryModalComponent
} from '../product-details-gallery-modal/product-details-gallery-modal.component';
import { ProductDetails } from '../../../core/models/product-details.model';
import { YoutubePlayer } from '../../../core/components/youtube-player/youtube-player.component';

@Component({
  selector: 'product-details-gallery',
  templateUrl: 'product-details-gallery.component.html',
  styleUrl: 'product-details-gallery.component.scss',
  imports: [
    CarouselModule,
    MatIcon,
    NgOptimizedImage,
    YoutubePlayer
  ],
  standalone: true
})

export class ProductDetailsGalleryComponent implements OnChanges {
  @Input({
    required: true
  }) details: ProductDetails;

  @ViewChild('thumbsCarousel') thumbsCarousel: CarouselComponent;
  selectedImageIndex = 0;
  selectedItemUrl: string;

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
    navText: [ '', '' ],
    autoWidth: false
  };

  productImages = [];

  navigateCarousel(direction: 'next' | 'prev'): void {
    const productImages = this.productImages;
    const productImagesLength = productImages.length;

    if (direction === 'next') {
      if (productImagesLength - 1 > this.selectedImageIndex) {
        this.selectedImageIndex++;
        this.selectedItemUrl = productImages[this.selectedImageIndex];
      } else {
        this.selectedImageIndex = 0;
        this.selectedItemUrl = productImages[0];
      }
    }

    if (direction === 'prev') {
      if (this.selectedImageIndex > 0) {
        this.selectedImageIndex--;
        this.selectedItemUrl = productImages[this.selectedImageIndex];
      } else {
        this.selectedImageIndex = productImagesLength - 1;
        this.selectedItemUrl = productImages[this.selectedImageIndex];
      }
    }

    this.thumbsCarousel.to(this.selectedItemUrl);
  }

  selectThumb(i: number): void {
    const previousSelectedImageIndex = this.selectedImageIndex;
    this.selectedImageIndex = i;
    this.selectedItemUrl = this.productImages[i];

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
        selectedImageUrl: this.selectedItemUrl,
        selectedImageIndex: this.selectedImageIndex,
        productImages: this.productImages
      }
    })
  }

  ngOnChanges(): void {
    this.productImages = this.details.images;

    if (this.details.video_link) {
      this.productImages.unshift(this.details.video_link);
    }

    this.selectedItemUrl = this.productImages[0];
  }
}
