import { AfterViewInit, Component, DestroyRef, ElementRef, inject, NgZone, OnInit, ViewChild } from '@angular/core';
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
import { shortname } from '../../../../core/validators/shortname.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ComplaintModalComponent } from '../../complaint-modal/complaint-modal.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MyInformationService } from '../../../../core/services/my-information.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgTemplateOutlet } from '@angular/common';
import { TrimDirective } from '../../../../core/directives/trim.directive';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { ConfirmationService } from '../../../../core/services/confirmation.service';
import { OverlayComponent } from '../../../../core/components/overlay-panel/overlay-panel.component';
import { UiButtonComponent } from '../../../../core/components/ui-button/ui-button.component';
import { IconButtonComponent } from '../../../../core/components/icon-button/icon-button.component';

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
    GeneralService,
    ConfirmationService
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
    MatRadioGroup,
    MatRadioButton,
    IconButtonComponent
  ]
})

export class EditStoreComponent implements OnInit, AfterViewInit {
  @ViewChild('logoFileInput') logoFileInput: ElementRef<HTMLInputElement>;

  private _dialog = inject(MatDialog);
  private _yandexMapService = inject(YandexMapsService);
  private _myStoreService = inject(MyStoreService);
  private _generalService = inject(GeneralService);
  private _toasterService = inject(ToasterService);
  private _destroyRef = inject(DestroyRef);
  private _zone = inject(NgZone);

  customPatterns = {
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
    owner_firstname: new FormControl('', [ Validators.required, Validators.maxLength(32) ]),
    owner_lastname: new FormControl('', [ Validators.required, Validators.maxLength(32) ]),
    owner_fathername: new FormControl('', [ Validators.required, Validators.maxLength(32) ]),
    name_uz: new FormControl('', [ Validators.required, Validators.maxLength(255) ]),
    shortname: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(20), shortname ]),
    is_shortname_free: new FormControl(true, [ Validators.required ]),
    working_day_start: new FormControl(0),
    working_day_end: new FormControl(4),
    working_time_start: new FormControl('09:00', [ Validators.required, Validators.minLength(4) ]),
    working_time_end: new FormControl('18:00', [ Validators.required, Validators.minLength(4) ]),
    categories: new FormControl([]),
    delivery: new FormControl(true),
    main_phone_number: new FormControl('+998 ', [ Validators.required, Validators.minLength(9) ]),
    slogan_uz: new FormControl('', [ Validators.maxLength(255) ]),
    slogan_ru: new FormControl('', [ Validators.maxLength(255) ]),
    region: new FormControl(null, [ Validators.required ]),
    address: new FormControl('', [ Validators.required, Validators.maxLength(255) ]),
    district: new FormControl(null, [ Validators.required ]),
    desc_uz: new FormControl('', [ Validators.required, Validators.maxLength(1500) ]),
    desc_ru: new FormControl('', [ Validators.required, Validators.maxLength(1500) ]),
    longitude: new FormControl(null, [ Validators.required ]),
    latitude: new FormControl(null, [ Validators.required ]),
    logo: new FormControl(null)
  });

  ngOnInit(): void {
    this._yandexMapService.coordinatesAndAddress$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: ({ coordinates, address }) => {
          this.editStoreForm.get('longitude').setValue(coordinates[0]);
          this.editStoreForm.get('latitude').setValue(coordinates[1]);
          this._zone.run(() => {
            this.updateAddress(address);
          })
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
      .pipe(takeUntilDestroyed(this._destroyRef))
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
        shortname: this.editStoreForm.get('shortname').value
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
    console.log(form.getRawValue());

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

      if (key === 'categories') {
        value.forEach((category: number) => {
          formData.append('categories', JSON.stringify(category));
        })
      }

      if (key !== 'categories') {
        formData.append(key, value);
      }

      if (key === 'logo' && !(value instanceof File)) {
        formData.delete('logo');
      }
    }

    this._myStoreService.editStore(formData)
      .pipe(takeUntilDestroyed(this._destroyRef))
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
      .pipe(takeUntilDestroyed(this._destroyRef))
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

  updateAddress(address: string): void {
    if (!address) {
      return;
    }
    this.editStoreForm.get('address').setValue(address);

    this._toasterService.open({
      type: 'info',
      title: 'attention',
      message: 'you.changed.location.in.address.field.address.given.by.map.is.written'
    })
  }
}
