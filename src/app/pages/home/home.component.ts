import { Component } from '@angular/core';
import { IntroBannerComponent } from './intro-banner/intro-banner.component';
import { CategoriesCarouselComponent } from '../../shared/components/categories-carousel/categories-carousel.component';
import { ProductsSectionComponent } from '../../shared/components/products-section/products-section.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { PartnersComponent } from './partners/partners.component';
import { DownloadAppComponent } from '../../shared/components/download-app/download-app.component';

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
