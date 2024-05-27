import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { IntroBannerComponent } from './intro-banner/intro-banner.component';
import { PartnersComponent } from './partners/partners.component';
import { CategoriesCarouselComponent } from '../../core/components/categories-carousel/categories-carousel.component';
import { ProductsSectionComponent } from '../../core/components/products-section/products-section.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { DownloadAppComponent } from '../../core/components/download-app/download-app.component';
import { SpinnerLoaderComponent } from '../../core/components/spinner-loader/spinner-loader.component';
import { Banners } from '../../core/models/banners.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GeneralService } from '../../core/services/general.service';

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
    DownloadAppComponent,
    SpinnerLoaderComponent
  ],
  providers: [
    GeneralService
  ]
})

export class HomeComponent implements OnInit {
  banners: Banners;

  private _generalService = inject(GeneralService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._generalService.getBanners()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: data => {
          this.banners = data;
        }
      });
  }
}
