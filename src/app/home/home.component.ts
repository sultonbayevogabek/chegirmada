import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IntroBannerComponent } from './intro-banner/intro-banner.component';
import { CategoriesCarouselComponent } from '../shared/components/categories-carousel/categories-carousel.component';
import { ProductsSectionComponent } from '../shared/components/products-section/products-section.component';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { PartnersComponent } from './partners/partners.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [ HeaderComponent, IntroBannerComponent, CategoriesCarouselComponent, ProductsSectionComponent, BannerComponent, PartnersComponent ]
})

export class HomeComponent {

}
