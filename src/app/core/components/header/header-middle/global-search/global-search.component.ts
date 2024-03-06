import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayComponent } from '../../../../../shared/components/overlay-panel/overlay-panel.component';
import { ScrollbarDirective } from '../../../../../shared/directives/scrollbar/scrollbar.directive';

@Component({
  selector: 'global-search',
  templateUrl: 'global-search.component.html',
  styleUrl: 'global-search.component.scss',
  imports: [
    MatIconModule,
    MatAutocompleteModule,
    NgOptimizedImage,
    OverlayComponent,
    MatTabsModule,
    MatRippleModule,
    NgTemplateOutlet,
    ScrollbarDirective,
    TranslateModule
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})

export class GlobalSearchComponent {
  streets: string[] = [ 'Champs-Élysées', 'Lombard Street', 'Abbey Road',
    'Fifth Avenue', 'Champs-Élysées', 'Lombard Street', 'Abbey Road',
    'Fifth Avenue' ];

  tabIndex = 0;
  selectedRegion = 'whole.country';
  regions = [
    'all.regions',
    'karakalpakstan',
    'andijan', 'bukhara', 'jizzakh', 'kashkadarya', 'namangan', 'samarkand',
    'surkhandarya', 'sirdarya', 'tashkent.region', 'fergana',
    'khorezm', 'tashkent'
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
