import { Component, inject, OnInit } from '@angular/core';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { YandexMapsService } from '../../../core/services/yandex-maps.service';
import { MatRipple } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common';
import { IconButtonComponent } from '../../../core/components/icon-button/icon-button.component';
import { ScrollbarDirective } from '../../../core/directives/scrollbar.directive';

@Component({
  selector: 'category-map-view',
  templateUrl: 'category-map-view.component.html',
  styleUrl: 'category-map-view.component.scss',
  imports: [
    CategoryFilterComponent,
    MatRipple,
    NgOptimizedImage,
    IconButtonComponent,
    ScrollbarDirective
  ],
  standalone: true,
  providers: [ YandexMapsService, ]
})

export class CategoryMapViewComponent implements OnInit {
  private _yandexMapService = inject(YandexMapsService)

  _points = [
    // top left
    [ 41.363552, 69.204531 ],
    [41.346436, 69.206249],
    [41.337703, 69.190714],

    // top right
    [41.359307, 69.386202],
    [41.348756, 69.389674],
    [41.341523, 69.359459],

    // center
    [41.301226, 69.263499],
    [41.295781, 69.256470],
    [41.295693, 69.275240],

    // bottom right
    [41.255460, 69.375396],
    [41.246340, 69.376238],
    [41.226179, 69.336591],

    // bottom left
    [41.229917, 69.172472],
    [41.210278, 69.170361],
    [41.199457, 69.211283],

    // bukhara
    //[39.772522, 64.440712],

    // karshi
    //[38.870991, 65.803919],

    // jizzakh
    //[40.127699, 67.827450]
  ];

  ngOnInit(): void {
    this._yandexMapService.setMultipleLocationPoints('map', this._points);
  }
}
