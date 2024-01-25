import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgForOf, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'intro-banner',
  templateUrl: 'intro-banner.component.html',
  styleUrl: 'intro-banner.component.scss',
  imports: [
    CarouselModule,
    NgForOf,
    NgTemplateOutlet,
    NgOptimizedImage,
    MatIconModule
  ],
  standalone: true
})

export class IntroBannerComponent {
  @ViewChild('carouselComponent') carouselComponent: CarouselComponent;

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 1,
    nav: false,
    navText: ['', ''],
    autoplay: true
  };

  carouselImages = [
    '/assets/banner/banner.jpg',
    '/assets/banner/banner.jpg',
    '/assets/banner/banner.jpg',
    '/assets/banner/banner.jpg',
    '/assets/banner/banner.jpg',
    '/assets/banner/banner.jpg',
  ]

  navigateCarousel(direction: 'next' | 'prev'): void {
      this.carouselComponent[direction]();
  }
}
