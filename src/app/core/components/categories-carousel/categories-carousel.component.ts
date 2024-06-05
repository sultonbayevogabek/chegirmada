import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'categories-carousel',
  templateUrl: 'categories-carousel.component.html',
  styleUrl: 'categories-carousel.component.scss',
  imports: [
    CarouselModule,
    SectionHeaderComponent,
    MatIconModule,
    TranslateModule,
    RouterLink
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})

export class CategoriesCarouselComponent {
  @ViewChild('categoriesCarousel') categoriesCarousel: CarouselComponent;

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 7,
    nav: false,
    navText: [ '', '' ],
    autoplay: true,
    lazyLoad: true,
    margin: 20,
    responsive: {
      1536: {
        items: 7,
        margin: 20
      },
      1440: {
        items: 6,
        margin: 20
      },
      1366: {
        items: 5,
        margin: 16
      },
      992: {
        items: 4,
        margin: 15
      },
      576: {
        items: 3,
        margin: 7.5
      },
      0: {
        items: 2,
        margin: 7.5
      }
    }
  };

  categories = [
    {
      id: 0,
      name: 'electronics',
      img: '/assets/categories/electronics.png'
    },
    {
      id: 1,
      name: 'men.clothes',
      img: '/assets/categories/clothes.png'
    },
    {
      id: 6,
      name: 'furniture',
      img: '/assets/categories/furniture.png'
    },
    {
      id: 8,
      name: 'household.appliances',
      img: '/assets/categories/appliances.png'
    },
    {
      id: 9,
      name: 'for.kids',
      img: '/assets/categories/kids-things.png'
    },
    {
      id: 10,
      name: 'books',
      img: '/assets/categories/books.png'
    },
    {
      id: 12,
      name: 'construction.and.repair',
      img: '/assets/categories/tools.png'
    }
  ];

  navigateCarousel(direction: 'next' | 'prev'): void {
    this.categoriesCarousel[direction]();
  }
}
