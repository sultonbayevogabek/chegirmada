import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { YandexMapsService } from '../../../core/services/yandex-maps.service';
import { RatingStarsComponent } from '../../../core/components/rating-stars/rating-stars.component';
import { SectionHeaderComponent } from '../../../core/components/section-header/section-header.component';

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
  private _points = [
    // top left
    [ 41.363552, 69.204531 ],
    [ 41.346436, 69.206249 ],
    [ 41.337703, 69.190714 ],

    // top right
    [ 41.359307, 69.386202 ],
    [ 41.348756, 69.389674 ],
    [ 41.341523, 69.359459 ],

    // center
    [ 41.301226, 69.263499 ],
    [ 41.295781, 69.256470 ],
    [ 41.295693, 69.275240 ],

    // bottom right
    [ 41.255460, 69.375396 ],
    [ 41.246340, 69.376238 ],
    [ 41.226179, 69.336591 ],

    // bottom left
    [ 41.229917, 69.172472 ],
    [ 41.210278, 69.170361 ],
    [ 41.199457, 69.211283 ]
  ];
  private _yandexMapsService = inject(YandexMapsService);

  ngOnInit() {
    this._yandexMapsService.setMultipleLocationPoints('map', this._points);
  }
}
