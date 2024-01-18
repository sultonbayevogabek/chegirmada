import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BannerComponent } from './banner/banner.component';
import { CategoriesCarouselComponent } from '../shared/components/categories-carousel/categories-carousel.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [ HeaderComponent, BannerComponent, CategoriesCarouselComponent ]
})

export class HomeComponent {

}
