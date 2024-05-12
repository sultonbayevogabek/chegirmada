import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgForOf, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GeneralService } from '../../../core/services/general.service';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  private _generalService = inject(GeneralService);
  private _destroyRef = inject(DestroyRef);

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
    autoplay: false
  };

  carouselImages = [
    '/assets/banner/banner.jpg',
    '/assets/banner/banner.jpg',
    '/assets/banner/banner.jpg',
    '/assets/banner/banner.jpg',
    '/assets/banner/banner.jpg',
    '/assets/banner/banner.jpg'
  ]

  navigateCarousel(direction: 'next' | 'prev'): void {
      this.carouselComponent[direction]();
  }

  ngOnInit(): void {
    this._generalService.getBanners()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {

        }
      })
  }
}
