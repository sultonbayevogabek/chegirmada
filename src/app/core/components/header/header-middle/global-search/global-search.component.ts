import { Component, DestroyRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { TrimDirective } from '../../../../directives/trim.directive';
import { FormsModule } from '@angular/forms';
import { AnnouncementsService } from '../../../../services/announcements.service';
import { take } from 'rxjs';

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
    IconButtonComponent,
    TrimDirective,
    FormsModule
  ],
  standalone: true,
  providers: [
    GeneralService,
    AnnouncementsService
  ],
  encapsulation: ViewEncapsulation.None
})

export class GlobalSearchComponent {
  @ViewChild('overlayPanel') overlayPanel: OverlayComponent;

  streets: string[] = [ 'Champs-Élysées', 'Lombard Street', 'Abbey Road',
    'Fifth Avenue', 'Champs-Élysées', 'Lombard Street', 'Abbey Road',
    'Fifth Avenue' ];

  tab: 'regions' | 'districts' = 'regions';
  regions = REGIONS;

  params: {
    search: string;
    region: number;
    district: number;
  } = {
    search: '',
    region: null,
    district: null
  }

  private _generalService = inject(GeneralService);
  private _announcementsService = inject(AnnouncementsService);
  private _destroyRef = inject(DestroyRef);

  selectRegion(index: number): void {
    this.params = {
      search: this.params.search,
      region: index,
      district: null
    };

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

  selectWholeCountry(): void {
    this.params = {
      search: this.params.search,
      region: null,
      district: null
    };
    this.overlayPanel._overlayRef.detach();
    this.search()
  }

  selectDistrict(i: number): void {
    this.params.district = i;
    this.overlayPanel._overlayRef.detach();

    this.search()
  }

  selectWholeRegion(): void {
    this.params.district = null;
    this.overlayPanel._overlayRef.detach();

    this.search()
  }

  search(): void {
    if (!this.params.search?.length) return;

    const params: {
      search?: string;
      region?: number;
      district?: number;
      page?: number;
      page_size?: number;
    } = {
      page: 1,
      page_size: 100
    }

    const { search, region, district} = this.params;

    params.search = search;

    if (region !== null) {
      params.region = +region + 1;
    }

    if (district !== null) {
      params.district = this.regions[region].districts[+district].pk;
    }

    this._announcementsService.getAnnouncementsList(params)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {

      })
  }
}
