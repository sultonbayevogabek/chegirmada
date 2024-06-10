import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
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
import { formatDate } from '@angular/common';

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
    MatStartDate
  ],
  providers: [
    provideNgxMask()
  ],
  standalone: true
})

export class CategoryFilterComponent implements OnInit {
  @Input() withBorder = true;

  params = {
    from: 0,
    to: 0,
    price__range: ''
  }

  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);


  ngOnInit() {
    this.getParamsFromUrl();
  }

  getParamsFromUrl(): void {
    this._activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((params: DiscountParamsModel) => {
        if (params?.price__range) {
          const [ from, to ] = params.price__range.split(',');
          this.params.from = +from || 0;
          this.params.to = +to || 0;
        }
      })
  }

  setParamsToUrl(): void {
    const queryParams: {
      page: number;
      price__range: string;
    } = {
      page: 1,
      price__range: (this.params.from || 0) + ',' + (this.params.to || 0)
    }

    this._router.navigate(
      [],
      {
        relativeTo: this._activatedRoute,
        queryParams,
        queryParamsHandling: 'merge'
      }
    )
  }

  resetFilter(): void {
    this.params = {
      from: 0,
      to: 0,
      price__range: '0,0'
    }
    this.setParamsToUrl();
  }
}
