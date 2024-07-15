import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatOption, MatRippleModule } from '@angular/material/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DiscountParamsModel } from '../../../core/models/discount-params.model';
import { FormsModule } from '@angular/forms';
import { MatDateRangeInput, MatDateRangePicker, MatEndDate, MatStartDate } from '@angular/material/datepicker';
import { formatDate, NgClass } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { REGIONS } from '../../../core/constants/regions';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  selector: 'category-filter',
  templateUrl: 'category-filter.component.html',
  styleUrl: 'category-filter.component.scss',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    NgxMaskDirective,
    MatSliderModule,
    MatButtonModule,
    UiButtonComponent,
    TranslateModule,
    FormsModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatEndDate,
    MatStartDate,
    NgClass,
    MatSelect,
    MatOption
  ],
  providers: [
    provideNgxMask(),
    GeneralService
  ],
  standalone: true
})

export class CategoryFilterComponent implements OnInit {
  @Input() withBorder = true;
  @Input() isFilterOpened = false;
  regions = [
    {
      id: 0,
      name: 'whole.country',
      districts: []
    },
    ...REGIONS
  ];

  urlParams: DiscountParamsModel;

  params = {
    from: null,
    to: null,
    region: 0,
    district: null
  }

  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _generalService = inject(GeneralService);
  private _destroyRef = inject(DestroyRef);


  ngOnInit() {
    this.getParamsFromUrl();
  }

  getParamsFromUrl(): void {
    this._activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((params: DiscountParamsModel) => {
        this.urlParams = { ...params };

        if (this.urlParams?.price__range) {
          const [ from, to ] = this.urlParams?.price__range?.split(',');
          this.params.from = +from || null;
          this.params.to = +to || null;
        }

        if (this.urlParams?.region) {
          this.params.region = +this.urlParams?.region;

          this._generalService.getDistrictsByRegionId(this.params.region)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(res => {
              this.regions[this.params.region].districts = res;
            })
        }

        if (this.urlParams?.district) {
          this.params.district = +this.urlParams?.district;
        }
      })
  }

  setParamsToUrl(): void {
    if (![null, ''].includes(this.params.from) || ![null, ''].includes(this.params.to)) {
      this.urlParams.price__range = `${this.params.from || 0},${this.params.to || 0}`;
    } else {
      delete this.urlParams?.price__range;
    }

    if (+this.params.region > 0) {
      this.urlParams.region = +this.params?.region;
    } else {
      delete this.urlParams?.region;
      delete this.urlParams?.district;
    }

    if (this.params.district) {
      this.urlParams.district = +this.params.district;
    } else {
      delete this.urlParams?.district;
    }

    this.urlParams.page = 1;
    this.urlParams.page_size = 12;

    this._router.navigate(
      [],
      {
        relativeTo: this._activatedRoute,
        queryParams: this.urlParams
      }
    )
  }

  resetFilter(): void {
    this.params = {
      from: null,
      to: null,
      region: 0,
      district: null
    }
    this.setParamsToUrl();
  }

  onRegionSelected(): void {
    this.params.district = null;
    this.setParamsToUrl();

    if (!this.params.region || this.regions[this.params.region]?.districts?.length) return;

    this._generalService.getDistrictsByRegionId(this.params.region)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.regions[this.params.region].districts = res;
      })
  }
}
