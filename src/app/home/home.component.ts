import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BannerComponent } from './banner/banner.component';
import { CategoriesCarouselComponent } from '../shared/components/categories-carousel/categories-carousel.component';
import { ProductsSectionComponent } from '../shared/components/products-section/products-section.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [ HeaderComponent, BannerComponent, CategoriesCarouselComponent, ProductsSectionComponent ]
})

export class HomeComponent {

}
