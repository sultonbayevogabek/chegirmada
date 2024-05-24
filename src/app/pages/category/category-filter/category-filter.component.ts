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
    FormsModule
  ],
  providers: [
    provideNgxMask()
  ],
  standalone: true
})

export class CategoryFilterComponent implements OnInit {
  @Input() withBorder = true;
  brands = [
    {
      name: 'Samsung',
      count: 13,
      selected: false
    },
    {
      name: 'Philips',
      count: 31,
      selected: true
    },
    {
      name: 'ZTE',
      count: 23,
      selected: false
    },
    {
      name: 'Nokia',
      count: 30,
      selected: true
    },
    {
      name: 'Fly',
      count: 35,
      selected: false
    },
    {
      name: 'Apple',
      count: 3,
      selected: false
    },
    {
      name: 'BQ',
      count: 333,
      selected: false
    },
    {
      name: 'Huawei',
      count: 37,
      selected: false
    }
  ];

  params = {
    from: 0,
    to: 0,
    price__range: ''
  }

  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  screenResolutions = [
    {
      name: '96x68',
      count: 23,
      selected: false
    },
    {
      name: '160x128',
      count: 1,
      selected: true
    },
    {
      name: '220x175',
      count: 18,
      selected: false
    },
    { name: '320x240', count: 18, selected: false },
    { name: '480x320', count: 18, selected: false },
    { name: '800x480', count: 18, selected: true },
    { name: '854x480', count: 18, selected: false },
    { name: '960x480', count: 18, selected: true },
    { name: '1280x720 (HD)', count: 18, selected: false },
    { name: '1440x720', count: 18, selected: false }
  ];

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
    const queryParams = {
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
}
