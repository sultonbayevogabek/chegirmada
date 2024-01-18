import { Component, ViewEncapsulation } from '@angular/core';
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
  standalone: true,
  encapsulation: ViewEncapsulation.None
})

export class BannerComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 1,
    nav: true,
    navText: ['', ''],
    autoplay: true
  };

  carouselImages = [
    'https://picsum.photos/952/480?rand=1',
    'https://picsum.photos/952/480?rand=2',
    'https://picsum.photos/952/480?rand=3',
    'https://picsum.photos/952/480?rand=4',
    'https://picsum.photos/952/480?rand=5',
    'https://picsum.photos/952/480?rand=5',
  ]
}
