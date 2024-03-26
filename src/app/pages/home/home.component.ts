import { Component } from '@angular/core';
import { IntroBannerComponent } from './intro-banner/intro-banner.component';
import { PartnersComponent } from './partners/partners.component';
import { CategoriesCarouselComponent } from '../../core/components/categories-carousel/categories-carousel.component';
import { ProductsSectionComponent } from '../../core/components/products-section/products-section.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { DownloadAppComponent } from '../../core/components/download-app/download-app.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    IntroBannerComponent,
    CategoriesCarouselComponent,
    ProductsSectionComponent,
    BannerComponent,
    PartnersComponent,
    DownloadAppComponent
  ]
})

export class HomeComponent {

}
