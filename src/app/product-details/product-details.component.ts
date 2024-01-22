import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'product-details',
  templateUrl: 'product-details.component.html',
  styleUrls: [ 'product-details.component.scss' ],
  imports: [
    MatIconModule,
    CarouselModule,
    NgClass,
    NgForOf
  ],
  standalone: true
})

export class ProductDetailsComponent {
  @ViewChild('owl') owl;

  multiImageSliderOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items: 4,
    margin: 16,
    nav: false,
    navText: [ '', '' ]
  };

  productImages = [
    'https://picsum.photos/480?id=1',
    'https://picsum.photos/480?id=2',
    'https://picsum.photos/480?id=3',
    'https://picsum.photos/480?id=4',
    'https://picsum.photos/480?id=5'
  ];
}
