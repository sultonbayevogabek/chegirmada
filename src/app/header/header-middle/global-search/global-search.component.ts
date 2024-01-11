import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgOptimizedImage } from '@angular/common';
import { OverlayComponent } from '../../../shared/components/overlay-panel/overlay-panel.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'global-search',
  templateUrl: 'global-search.component.html',
  styleUrls: [ 'global-search.component.scss' ],
  imports: [
    MatIconModule,
    MatAutocompleteModule,
    NgOptimizedImage,
    OverlayComponent,
    MatTabsModule,
    MatRippleModule
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})

export class GlobalSearchComponent {
  streets: string[] = [ 'Champs-Élysées', 'Lombard Street', 'Abbey Road',
    'Fifth Avenue', 'Champs-Élysées', 'Lombard Street', 'Abbey Road',
    'Fifth Avenue' ];

  tabIndex = 0;
  selectedRegion = 'Вся страна';
  regions = [
    'Все регионы',
    'Қорақалпоғистон',
    'Андижон', 'Бухоро', 'Жиззах',
    'Қашқадарё', 'Навоий', 'Наманган', 'Самарқанд',
    'Сурхандарё', 'Сирдарё', 'Тошкент', 'Фарғона',
    'Хоразм', 'Тошкент шаҳри'
  ];

  districts = [
    'Тупроккалъа',
    'Шовот',
    'Хонка', 'Урганч', 'Гурлан',
    'Богот', 'Хазарасп', 'Янгибозор', 'Янгиарик',
    'Кушкупир', 'Хива',
  ];

  selectRegion(region: string): void {
    this.selectedRegion = region;
    this.tabIndex = 1;
  }

  backToRegions(): void {
    this.tabIndex = 0;
  }
}
