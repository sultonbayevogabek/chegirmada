import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgForOf, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GeneralService } from '../../../core/services/general.service';
import { Banners } from '../../../core/models/banners.model';

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
  standalone: true,
  providers: [ GeneralService ]
})

export class IntroBannerComponent implements OnInit {
  @ViewChild('carouselComponent') carouselComponent: CarouselComponent;
  @Input() banners: Banners

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 1,
    nav: false,
    navText: [ '', '' ],
    autoplay: false
  };

  navigateCarousel(direction: 'next' | 'prev'): void {
    this.carouselComponent[direction]();
  }

  ngOnInit(): void {

  }
}
