import { Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayComponent } from '../../../overlay-panel/overlay-panel.component';
import { ScrollbarDirective } from '../../../../directives/scrollbar.directive';
import { REGIONS } from '../../../../constants/regions';
import { GeneralService } from '../../../../services/general.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconButtonComponent } from '../../../icon-button/icon-button.component';

@Component({
  selector: 'global-search',
  templateUrl: 'global-search.component.html',
  styleUrl: 'global-search.component.scss',
  imports: [
    MatIconModule,
    MatAutocompleteModule,
    NgOptimizedImage,
    OverlayComponent,
    MatRippleModule,
    NgTemplateOutlet,
    ScrollbarDirective,
    TranslateModule,
    IconButtonComponent
  ],
  standalone: true,
  providers: [
    GeneralService
  ],
  encapsulation: ViewEncapsulation.None
})

export class GlobalSearchComponent {
  streets: string[] = [ 'Champs-Élysées', 'Lombard Street', 'Abbey Road',
    'Fifth Avenue', 'Champs-Élysées', 'Lombard Street', 'Abbey Road',
    'Fifth Avenue' ];

  tab: 'regions' | 'districts' = 'regions';
  selectedRegionIndex = 0;
  regions = REGIONS;

  private _generalService = inject(GeneralService);
  private _destroyRef = inject(DestroyRef);

  selectRegion(index: number): void {
    this.selectedRegionIndex = index;

    if (!this.regions[index].districts.length) {
      this._generalService.getDistrictsByRegionId(this.regions[index].id)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: districts => {
            this.regions[index].districts = districts;
            this.tab = 'districts';
          }
        })
      return
    }
    this.tab = 'districts';
  }

  backToRegions(): void {
    this.tab = 'regions';
  }
}
