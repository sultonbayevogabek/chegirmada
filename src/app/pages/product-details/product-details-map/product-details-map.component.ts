import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { YandexMapsService } from '../../../core/services/yandex-maps.service';
import { RatingStarsComponent } from '../../../core/components/rating-stars/rating-stars.component';
import { SectionHeaderComponent } from '../../../core/components/section-header/section-header.component';
import { StoreBranch } from '../../../core/models/product-details.model';
import { WEEKDAYS } from '../../../core/constants/weekdays';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  @Input({
    required: true
  }) branches: StoreBranch[];

  private _weekdays = [
    {
      uz: 'Dush',
      ru: 'Пон'
    },
    {
      uz: 'Sesh',
      ru: 'Вто'
    },
    {
      uz: 'Chor',
      ru: 'Сре'
    },
    {
      uz: 'Pay',
      ru: 'Чет'
    },
    {
      uz: 'Jum',
      ru: 'Пят'
    },
    {
      uz: 'Shan',
      ru: 'Суб'
    },
    {
      uz: 'Yak',
      ru: 'Вос'
    }
  ];
  private _yandexMapsService = inject(YandexMapsService);
  private _translateService = inject(TranslateService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    const points = this.branches.map(branch => {
      return {
        coordinates: [ branch.longitude, branch.latitude ],
        title: branch.name,
        workingDayStart: this._weekdays[branch.working_day_start][this._translateService.defaultLang],
        workingDayEnd: this._weekdays[branch.working_day_end][this._translateService.defaultLang],
        workingTimeStart: branch.working_time_start,
        workingTimeEnd: branch.working_time_end
      };
    });
    this._yandexMapsService.setMultipleLocationPoints('map', points);
  }
}
