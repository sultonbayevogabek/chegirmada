import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RatingStarsComponent } from '../../../shared/components/rating-stars/rating-stars.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { YandexMapsService } from '../../../core/services/yandex-maps.service';

@Component({
  selector: 'product-details-map',
  templateUrl: 'product-details-map.component.html',
  styleUrl: 'product-details-map.component.scss',
  imports: [
    MatIconModule,
    RatingStarsComponent,
    SectionHeaderComponent
  ],
  providers: [ YandexMapsService ],
  standalone: true
})

export class ProductDetailsMapComponent implements OnInit {
  private _yandexMapsService = inject(YandexMapsService);

  ngOnInit() {
    this._yandexMapsService.initMap('map');
  }
}
