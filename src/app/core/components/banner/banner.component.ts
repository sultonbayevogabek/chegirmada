import { Component, DestroyRef, inject, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { GeneralService } from '../../services/general.service';
import { Banners } from '../../models/banners.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'banner',
  templateUrl: 'banner.component.html',
  styleUrl: 'banner.component.scss',
  imports: [
    NgOptimizedImage,
    CarouselModule,
    MatIcon,
    NgTemplateOutlet
  ],
  providers: [ GeneralService ],
  standalone: true,
})

export class BannerComponent {
  @ViewChild('carouselComponent') carouselComponent: CarouselComponent;
  @Input() banners: Banners;

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
