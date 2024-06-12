import { Component, DestroyRef, Inject, inject, NgZone, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { YandexMapsService } from '../../../core/services/yandex-maps.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgTemplateOutlet } from '@angular/common';
import { TrimDirective } from '../../../core/directives/trim.directive';
import { WEEKDAYS } from '../../../core/constants/weekdays';
import { REGIONS } from '../../../core/constants/regions';
import { GeneralService } from '../../../core/services/general.service';
import { DistrictModel } from '../../../core/models/district.model';
import { ToasterService } from '../../../core/services/toaster.service';
import { IconButtonComponent } from '../../../core/components/icon-button/icon-button.component';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { ScrollbarDirective } from '../../../core/directives/scrollbar.directive';
import { MyStoreService } from '../../../core/services/my-store.service';
import { ConfirmationService } from '../../../core/services/confirmation.service';
import { Observable } from 'rxjs';
import { BranchModel } from '../../../core/models/branch.model';

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
    TrimDirective
  ],
  providers: [
    provideNgxMask(),
    YandexMapsService,
    GeneralService,
    MyStoreService,
    ConfirmationService
  ],
  standalone: true
})

export class BranchActionComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) data: {
    branchId?: number
  } = inject(MAT_DIALOG_DATA);
  private _yandexMapsService: YandexMapsService = inject(YandexMapsService);
  private _generalService = inject(GeneralService);
  private _toasterService = inject(ToasterService);
  private _myStoreService = inject(MyStoreService);
  private _dialog = inject(MatDialogRef);
  private _zone = inject(NgZone);
  private _destroyRef = inject(DestroyRef);

  weekdays = WEEKDAYS;
  regions = REGIONS;
  districts: DistrictModel[];
  manageBranchForm = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.maxLength(255) ]),
    working_day_start: new FormControl(0),
    working_day_end: new FormControl(4),
    working_time_start: new FormControl('09:00', [ Validators.required, Validators.minLength(4) ]),
    working_time_end: new FormControl('18:00', [ Validators.required, Validators.minLength(4) ]),
    delivery: new FormControl(true),
    main_phone_number: new FormControl('+998 ', [ Validators.required, Validators.minLength(9) ]),
    region: new FormControl<number>(null, [ Validators.required ]),
    address: new FormControl('', [ Validators.required, Validators.maxLength(255) ]),
    district: new FormControl<number>(null, [ Validators.required ]),
    longitude: new FormControl<number>(null, [ Validators.required ]),
    latitude: new FormControl<number>(null, [ Validators.required ])
  });

  ngOnInit(): void {
    this._yandexMapsService.coordinatesAndAddress$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: ({ coordinates, address }) => {
          this.manageBranchForm.get('latitude').setValue(coordinates[0]);
          this.manageBranchForm.get('longitude').setValue(coordinates[1]);
          this._zone.run(() => {
            this.updateAddress(address);
          });
        }
      });

    this.getBranchById();
  }

  onRegionSelected(): void {
    this.manageBranchForm.get('district').setValue(null);
    this.getDistrictsList();
  }

  getDistrictsList(): void {
    const regionId = this.manageBranchForm.get('region').value;

    this._generalService.getDistrictsByRegionId(regionId)
      .pipe(takeUntilDestroyed(this._destroyRef))
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
    if (this.manageBranchForm.get('region').value) {
      return;
    }

    this._toasterService.open({
      type: 'info',
      title: 'dear.user',
      message: 'please.specify.region.first'
    });
  }

  updateAddress(address: string): void {
    if (!address) {
      return;
    }

    this.manageBranchForm.get('address').setValue(address);

    this._toasterService.open({
      type: 'info',
      title: 'attention',
      message: 'you.changed.location.in.address.field.address.given.by.map.is.written'
    });
  }

  getBranchById(): void {
    if (!this.data.branchId) {
      this._yandexMapsService.setSingleLocationPoint('map');
      return;
    }
    this._myStoreService.getBranchById(this.data.branchId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: branch => {
          this._yandexMapsService
            .setSingleLocationPoint('map', [ branch.latitude, branch.longitude ]);
          this.manageBranchForm.patchValue(branch);
          this.manageBranchForm.get('name').setValue(branch.name);
          this.getDistrictsList();
        }
      });
  }

  manageBranch(): void {
    const form = this.manageBranchForm;
    form.markAllAsTouched();

    if (form.invalid || form.disabled) {
      return;
    }

    form.disable();

    let {
      working_time_start,
      working_time_end,
      main_phone_number
    } = form.getRawValue();

    if (working_time_start.length === 4) {
      working_time_start = working_time_start.slice(0, 2) + ':' + working_time_start.slice(2);
    }

    if (working_time_end.length === 4) {
      working_time_end = working_time_end.slice(0, 2) + ':' + working_time_end.slice(2);
    }

    if (main_phone_number.length === 9) {
      main_phone_number = '+998' + main_phone_number;
    }

    const payload = {
      ...form.getRawValue(),
      working_time_start,
      working_time_end,
      main_phone_number
    };

    let subscription: Observable<BranchModel>;

    if (this.data.branchId) {
      subscription = this._myStoreService.updateBranch({
        ...payload,
        pk: this.data.branchId
      });
    } else {
      subscription = this._myStoreService.createBranch(payload);
    }

    subscription
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: _ => {
          if (this.data.branchId) {
            this._toasterService.open({
              message: 'changes.successfully.changed'
            });
          }
          this._dialog.close('success');
        },
        error: _ => {
          this._toasterService.open({
            message: 'error.occurred',
            type: 'error',
            title: 'attention'
          });
          this.manageBranchForm.enable();
        }
      });
  }
}
