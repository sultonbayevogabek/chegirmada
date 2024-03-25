import { BaseComponent } from '../../../../core/components/base/base.component';
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { YandexMapsService } from '../../../../core/services/yandex-maps.service';
import { MyStoreService } from '../../../../core/services/my-store.service';
import { GeneralService } from '../../../../core/services/general.service';
import { ToasterService } from '../../../../core/services/toaster.service';
import { WEEKDAYS } from '../../../../core/constants/weekdays';
import { CATEGORIES } from '../../../../core/constants/categories';
import { REGIONS } from '../../../../core/constants/regions';
import { DistrictModel } from '../../../../core/models/district.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { shortnameValidator } from '../../../../core/validators/shortname.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ComplaintModalComponent } from '../../complaint-modal/complaint-modal.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MyInformationService } from '../../../../core/services/my-information.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgTemplateOutlet } from '@angular/common';
import { TrimDirective } from '../../../../core/directives/trim.directive';
import { MatIcon } from '@angular/material/icon';
import { OverlayComponent } from '../../../../shared/components/overlay-panel/overlay-panel.component';
import { UiButtonComponent } from '../../../../shared/components/ui-button/ui-button.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { ShowByLangPipe } from '../../../../core/pipes/show-by-lang.pipe';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { concat, concatAll, forkJoin, merge, mergeAll } from 'rxjs';

@Component({
  selector: 'edit-store',
  templateUrl: 'edit-store.component.html',
  styleUrl: '../my-store.component.scss',
  standalone: true,
  providers: [
    provideNgxMask(),
    YandexMapsService,
    MyStoreService,
    MyInformationService,
    GeneralService
  ],
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    NgxMaskDirective,
    NgTemplateOutlet,
    TrimDirective,
    MatIcon,
    OverlayComponent,
    UiButtonComponent,
    MatSelect,
    MatOption,
    ShowByLangPipe,
    MatRadioGroup,
    MatRadioButton,
    IconButtonComponent
  ]
})

export class EditStoreComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('logoFileInput') logoFileInput: ElementRef<HTMLInputElement>;

  private _dialog = inject(MatDialog);
  private _yandexMapService = inject(YandexMapsService);
  private _myStoreService = inject(MyStoreService);
  private _generalService = inject(GeneralService);
  private _toasterService = inject(ToasterService);

  customPatterns = {
    'X': { pattern: new RegExp('[a-zA-Z\']') },
    'Y': { pattern: new RegExp('[a-zA-Z0-9_]') }
  };
  weekdays = WEEKDAYS;
  categories = CATEGORIES;
  regions = REGIONS;
  logoBuffer: string | ArrayBuffer;
  currentLogo: string;
  currentShortName: string;
  districts: DistrictModel[] = [];
  editStoreForm = new FormGroup({
    owner_firstname: new FormControl('', [ Validators.required ]),
    owner_lastname: new FormControl('', [ Validators.required ]),
    owner_fathername: new FormControl('', [ Validators.required ]),
    name_uz: new FormControl('', [ Validators.required, Validators.maxLength(255) ]),
    shortname: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(20), shortnameValidator ]),
    is_shortname_free: new FormControl(true, [ Validators.required ]),
    working_day_start: new FormControl(0),
    working_day_end: new FormControl(4),
    working_time_start: new FormControl('09:00', [ Validators.required, Validators.minLength(4) ]),
    working_time_end: new FormControl('18:00', [ Validators.required, Validators.minLength(4) ]),
    category: new FormControl(2, [ Validators.required ]),
    delivery: new FormControl(true),
    main_phone_number: new FormControl('+998 ', [ Validators.required, Validators.minLength(9) ]),
    slogan_uz: new FormControl('', [ Validators.maxLength(255) ]),
    slogan_ru: new FormControl('', [ Validators.maxLength(255) ]),
    region: new FormControl(null, [ Validators.required ]),
    address: new FormControl('', [ Validators.required, Validators.maxLength(255) ]),
    district: new FormControl(null, [ Validators.required ]),
    desc_uz: new FormControl('', [ Validators.required, Validators.maxLength(1500) ]),
    desc_ru: new FormControl('', [ Validators.maxLength(1500) ]),
    longitude: new FormControl(null, [ Validators.required ]),
    latitude: new FormControl(null, [ Validators.required ]),
    logo: new FormControl(null)
  });

  constructor() {
    super();
  }

  ngOnInit(): void {
    merge([this._yandexMapService.coordinates$, this._yandexMapService.address$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ([coordinates, a]) => {
          this.editStoreForm.get('longitude').setValue(coordinates[0]);
          this.editStoreForm.get('latitude').setValue(coordinates[1]);
        }
      });

    this.getStoreData();
  }

  ngAfterViewInit(): void {

  }

  checkShortname(): void {
    const shortnameControl = this.editStoreForm.get('shortname');
    const isShortnameFreeControl = this.editStoreForm.get('is_shortname_free');
    const shortname = shortnameControl.value;

    if (shortnameControl.invalid) {
      return;
    }

    if (shortname === this.currentShortName) {
      isShortnameFreeControl.setValue(true);
      return;
    }

    this._myStoreService.checkShortName(shortname)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          isShortnameFreeControl.setValue(true);
        },
        error: () => {
          isShortnameFreeControl.setValue(false);
        }
      });
  }

  openShortnameComplainingModal(): void {
    this._dialog.open(ComplaintModalComponent, {
      width: '25rem',
      data: {
        complaintType: 0,
        storeShortname: this.editStoreForm.get('shortname').value
      }
    });
  }

  onLogoSelected($event: Event): void {
    const file = ($event.target as HTMLInputElement).files[0];

    if (!file) {
      return;
    }

    if (![ 'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml' ].includes(file.type)) {
      return;
    }

    if (file.size > 5242880) {
      this._toasterService.open({
        type: 'warning',
        message: 'file.size.should.not.exceed.5.mb',
        title: 'dear.user'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      this.logoBuffer = event.target.result;
    };
    reader.readAsDataURL(file);
    this.editStoreForm.get('logo').setValue(file);
    this.logoFileInput.nativeElement.value = null;
  }

  onRegionSelected(): void {
    this.editStoreForm.get('district').setValue(null);
    this.getDistrictsList();
  }

  getDistrictsList(): void {
    const regionId = this.editStoreForm.get('region').value;

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
    if (this.editStoreForm.get('region').value) {
      return;
    }

    this._toasterService.open({
      type: 'info',
      title: 'dear.user',
      message: 'please.specify.region.first'
    });
  }

  editStore(): void {
    const form = this.editStoreForm;
    form.markAllAsTouched();

    if (form.invalid || form.disabled) {
      return;
    }

    form.disable();

    const formData = new FormData();
    const formValue = form.getRawValue();

    for (const key in formValue) {
      let value = formValue[key];
      if ([ 'working_time_start', 'working_time_end' ].includes(key) && value.length === 4) {
        value = value.slice(0, 2) + ':' + value.slice(2);
      }
      if (key === 'main_phone_number' && value.length === 9) {
        value = '+998' + value;
      }

      formData.append(key, value);

      if (key === 'logo' && !(value instanceof File)) {
        formData.delete('logo');
      }
    }

    this._myStoreService.editStore(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this._toasterService.open({
            message: 'changes.successfully.changed'
          });
          this.logoBuffer = null;
          this.currentLogo = res.logo;
          this.editStoreForm.get('logo').setValue(null);
          this.editStoreForm.enable();
        },
        error: _ => {
          form.enable();
          this._toasterService.open({
            type: 'error',
            title: 'attention',
            message: 'error.occurred'
          });
        }
      });
  }

  getStoreData(): void {
    this._myStoreService.getMyStoreData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.editStoreForm.patchValue(res);
        this._yandexMapService.setSingleLocationPoint('map', [ res.longitude, res.latitude ]);
        this.currentLogo = res.logo;
        this.currentShortName = res.shortname;
        this.getDistrictsList();
      });
  }

  removeLogo(): void {
    this.editStoreForm.get('logo').setValue(null);
    this.logoBuffer = null;
  }
}
