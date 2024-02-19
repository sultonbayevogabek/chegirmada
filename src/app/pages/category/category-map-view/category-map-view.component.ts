import { Component, inject, OnInit } from '@angular/core';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { YandexMapsService } from '../../../core/services/yandex-maps.service';
import { MatRipple } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';
import { ScrollbarDirective } from '../../../shared/directives/scrollbar/scrollbar.directive';

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

  ngOnInit(): void {
    this._yandexMapService.initMap('map');
  }
}
