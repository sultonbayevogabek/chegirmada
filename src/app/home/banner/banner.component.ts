import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgForOf, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'banner',
  templateUrl: 'banner.component.html',
  styleUrls: [ 'banner.component.scss' ],
  imports: [
    CarouselModule,
    NgForOf,
    NgTemplateOutlet,
    NgOptimizedImage
  ],
  standalone: true
})

export class BannerComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [ 'Back', 'Forward' ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };
}
