import { Component, ViewEncapsulation } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SectionHeaderComponent } from '../section-header/section-header.component';

@Component({
  selector: 'categories-carousel',
  templateUrl: 'categories-carousel.component.html',
  styleUrls: [ 'categories-carousel.component.scss' ],
  imports: [
    CarouselModule,
    SectionHeaderComponent
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})

export class CategoriesCarouselComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 7,
    nav: true,
    navText: ['', ''],
    autoplay: false,
    lazyLoad: true,
    margin: 16,
  };

  categories = [
    {
      id: 1,
      name: {
        uz: 'Elektronika',
        ru: 'Электроника',
      },
      img: '/assets/categories/electronics.png'
    },
    {
      id: 2,
      name: {
        uz: 'Kitoblar',
        ru: 'Книги',
      },
      img: '/assets/categories/books.png'
    },
    {
      id: 3,
      name: {
        uz: 'Maishiy texnika',
        ru: 'Бытовая техника',
      },
      img: '/assets/categories/appliances.png'
    },
    {
      id: 4,
      name: {
        uz: 'Mebel',
        ru: 'Мебель',
      },
      img: '/assets/categories/furniture.png'
    },
    {
      id: 5,
      name: {
        uz: 'Uy va bog´',
        ru: 'Дом и сад',
      },
      img: '/assets/categories/tools.png'
    },
    {
      id: 6,
      name: {
        uz: 'Bolalar buyumlari',
        ru: 'Детские товары',
      },
      img: '/assets/categories/kids-things.png'
    },
    {
      id: 7,
      name: {
        uz: 'Kiyim-kechak',
        ru: 'Одежда',
      },
      img: '/assets/categories/clothes.png'
    },
    {
      id: 3,
      name: {
        uz: 'Uy va bog´',
        ru: 'Дом и сад',
      },
      img: '/assets/categories/tools.png'
    },
  ]
}
