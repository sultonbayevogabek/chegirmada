import { Component, inject, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { ScrollbarDirective } from '../../../shared/directives/scrollbar/scrollbar.directive';
import { YandexMapsService } from '../../../core/services/yandex-maps.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgTemplateOutlet } from '@angular/common';
import { TrimDirective } from '../../../core/directives/trim.directive';
import { WEEKDAYS } from '../../../core/constants/weekdays';
import { REGIONS } from '../../../core/constants/regions';
import { ShowByLangPipe } from '../../../core/pipes/show-by-lang.pipe';
import { GeneralService } from '../../../core/services/general.service';
import { DistrictModel } from '../../../core/models/district.model';
import { ToasterService } from '../../../core/services/toaster.service';
import { BaseComponent } from '../../../core/components/base/base.component';

@Component({
  selector: 'branch-action',
  templateUrl: 'branch-action.component.html',
  styleUrl: 'branch-action.component.scss',
  imports: [
    MatIconButton,
    IconButtonComponent,
    MatDialogClose,
    MatDialogContent,
    MatOption,
    MatSelect,
    NgxMaskDirective,
    MatRadioButton,
    MatRadioGroup,
    UiButtonComponent,
    ScrollbarDirective,
    TranslateModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    TrimDirective,
    ShowByLangPipe
  ],
  providers: [
    provideNgxMask(),
    YandexMapsService,
    GeneralService
  ],
  standalone: true
})

export class BranchActionComponent extends BaseComponent implements OnInit {
  private _yandexMapsService: YandexMapsService = inject(YandexMapsService);
  private _generalService = inject(GeneralService);
  private _toasterService = inject(ToasterService);


  weekdays = WEEKDAYS;
  regions = REGIONS;
  districts: DistrictModel[];
  addBranchForm = new FormGroup({
    name: new FormControl('Samarkand branch', [ Validators.required, Validators.maxLength(255) ]),
    working_day_start: new FormControl(0),
    working_day_end: new FormControl(4),
    working_time_start: new FormControl('09:00', [ Validators.required, Validators.minLength(4) ]),
    working_time_end: new FormControl('18:00', [ Validators.required, Validators.minLength(4) ]),
    delivery: new FormControl(true),
    main_phone_number: new FormControl('+998 ', [ Validators.required, Validators.minLength(9) ]),
    region: new FormControl(null, [ Validators.required ]),
    address: new FormControl('Samarkand City, str. Felix Atob', [ Validators.required, Validators.maxLength(255) ]),
    district: new FormControl(null, [ Validators.required ]),
    longitude: new FormControl(null, [ Validators.required ]),
    latitude: new FormControl(null, [ Validators.required ])
  });

  ngOnInit(): void {
    this._yandexMapsService.setSingleLocationPoint('map');

    this._yandexMapsService.coordinatesAndAddress$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ coordinates }) => {
          this.addBranchForm.get('longitude').setValue(coordinates[0]);
          this.addBranchForm.get('latitude').setValue(coordinates[1]);
        }
      });
  }

  onRegionSelected(): void {
    this.addBranchForm.get('district').setValue(null);
    this.getDistrictsList();
  }

  getDistrictsList(): void {
    const regionId = this.addBranchForm.get('region').value;

    this._generalService.getDistrictsByRegionId(regionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: districts => {
          this.districts = districts;
        },
        error: () => {
          this.districts = [];
        }
      });
  }

  onClickDistrictsSelect(): void {
    if (this.addBranchForm.get('region').value) {
      return;
    }

    this._toasterService.open({
      type: 'info',
      title: 'dear.user',
      message: 'please.specify.region.first'
    });
  }

  addBranch(): void {
    const form = this.addBranchForm;
    form.markAllAsTouched();

    if (form.invalid || form.disabled) {
      return;
    }

    form.disable();

    console.log(form.getRawValue());
  }
}
