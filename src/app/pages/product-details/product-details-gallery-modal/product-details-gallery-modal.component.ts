import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
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

export class ProductDetailsGalleryModalComponent implements AfterViewInit, OnInit {
  @HostListener('keydown', ['$event'])
  navigateCarouselWithKeyboard(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      this.navigateCarousel('next');
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      this.navigateCarousel('prev');
    }
  }
  @ViewChild('carouselComponent') carousel: CarouselComponent;
  @Inject(MAT_DIALOG_DATA) data: {
    selectedImageUrl: string;
    selectedImageIndex: number;
    productImages: string[];
  } = inject(MAT_DIALOG_DATA);
  selectedImageUrl = '';
  selectedImageIndex = 0;
  productImages: string[] = [];
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

  private _changeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit() {
    this.carousel.to(this.selectedImageUrl);
  }

  ngOnInit() {
    this.selectedImageIndex = this.data.selectedImageIndex;
    this.selectedImageUrl = this.data.selectedImageUrl;
    this.productImages = this.data.productImages;
    this._changeDetectorRef.detectChanges();
  }

  carouselChanged($event: SlidesOutputData): void {
    this.selectedImageIndex = $event.startPosition;
  }

  navigateCarousel(direction: 'next' | 'prev'): void {
    this.carousel[direction]();
  }
}
