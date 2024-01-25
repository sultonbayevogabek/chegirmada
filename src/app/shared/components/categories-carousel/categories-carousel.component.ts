import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'categories-carousel',
  templateUrl: 'categories-carousel.component.html',
  styleUrl: 'categories-carousel.component.scss',
  imports: [
    CarouselModule,
    SectionHeaderComponent,
    MatIconModule
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})

export class CategoriesCarouselComponent {
  @ViewChild('categoriesCarousel') categoriesCarousel: CarouselComponent;

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items: 7,
    nav: false,
    navText: [ '', '' ],
    autoplay: false,
    lazyLoad: true,
    margin: 16
  };

  categories = [
    {
      id: 1,
      name: {
        uz: 'Elektronika',
        ru: 'Электроника'
      },
      img: '/assets/categories/electronics.png'
    },
    {
      id: 2,
      name: {
        uz: 'Kitoblar',
        ru: 'Книги'
      },
      img: '/assets/categories/books.png'
    },
    {
      id: 3,
      name: {
        uz: 'Maishiy texnika',
        ru: 'Бытовая техника'
      },
      img: '/assets/categories/appliances.png'
    },
    {
      id: 4,
      name: {
        uz: 'Mebel',
        ru: 'Мебель'
      },
      img: '/assets/categories/furniture.png'
    },
    {
      id: 5,
      name: {
        uz: 'Uy va bog´',
        ru: 'Дом и сад'
      },
      img: '/assets/categories/tools.png'
    },
    {
      id: 6,
      name: {
        uz: 'Bolalar buyumlari',
        ru: 'Детские товары'
      },
      img: '/assets/categories/kids-things.png'
    },
    {
      id: 7,
      name: {
        uz: 'Kiyim-kechak',
        ru: 'Одежда'
      },
      img: '/assets/categories/clothes.png'
    },
    {
      id: 3,
      name: {
        uz: 'Uy va bog´',
        ru: 'Дом и сад'
      },
      img: '/assets/categories/tools.png'
    }
  ];

  navigateCarousel(direction: 'next' | 'prev'): void {
    this.categoriesCarousel[direction]();
  }
}
