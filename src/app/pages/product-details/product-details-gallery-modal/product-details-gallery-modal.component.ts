import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';
import { CarouselComponent, CarouselModule, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { MatIcon } from '@angular/material/icon';
import { ChangeDetection } from '@angular/cli/lib/config/workspace-schema';

@Component({
  selector: 'product-details-gallery-modal',
  templateUrl: 'product-details-gallery-modal.component.html',
  styleUrl: 'product-details-gallery-modal.component.scss',
  imports: [
    MatDialogContent,
    IconButtonComponent,
    MatDialogClose,
    CarouselModule,
    NgOptimizedImage,
    NgTemplateOutlet,
    UiButtonComponent,
    MatIcon
  ],
  standalone: true
})

export class ProductDetailsGalleryModalComponent implements OnInit {
  @ViewChild('carouselComponent') carousel: CarouselComponent;
  @Inject(MAT_DIALOG_DATA) data: {
    selectedImgUrl: string;
    selectedImgIndex: number;
    productImages: string[];
  } = inject(MAT_DIALOG_DATA);

  carouselOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 1,
    margin: 0,
    nav: false,
    navText: [ '', '' ]
  };
  selectedImageUrl = '';
  selectedImageIndex = 0;
  productImagesCount = 0;

  ngOnInit() {
    this.selectedImageIndex = this.data.selectedImgIndex;
    this.selectedImageUrl = this.data.selectedImgUrl;
    this.productImagesCount = this.data.productImages.length;
  }

  carouselChanged($event: SlidesOutputData): void {
    this.selectedImageIndex = $event.startPosition;
  }

  navigateCarousel(direction: 'next' | 'prev'): void {
    this.carousel[direction]();
  }
}

