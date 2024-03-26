import { Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { YandexMapsService } from '../../../../core/services/yandex-maps.service';
import { MyStoreService } from '../../../../core/services/my-store.service';
import { MyInformationService } from '../../../../core/services/my-information.service';
import { GeneralService } from '../../../../core/services/general.service';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { ToasterService } from '../../../../core/services/toaster.service';
import { UserModel } from '../../../../core/models/user.model';
import { WEEKDAYS } from '../../../../core/constants/weekdays';
import { CATEGORIES } from '../../../../core/constants/categories';
import { REGIONS } from '../../../../core/constants/regions';
import { DistrictModel } from '../../../../core/models/district.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { shortnameValidator } from '../../../../core/validators/shortname.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ComplaintModalComponent } from '../../complaint-modal/complaint-modal.component';
import { ConfettiComponent } from '../../confetti-alert/confetti-alert.component';
import { TranslateModule } from '@ngx-translate/core';
import { TrimDirective } from '../../../../core/directives/trim.directive';
import { MatIcon } from '@angular/material/icon';
import { OverlayComponent } from '../../../../shared/components/overlay-panel/overlay-panel.component';
import { UiButtonComponent } from '../../../../shared/components/ui-button/ui-button.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { ShowByLangPipe } from '../../../../core/pipes/show-by-lang.pipe';
import { NgTemplateOutlet } from '@angular/common';
import { ConfirmationService } from '../../../../core/services/confirmation.service';

@Component({
  selector: 'register-store',
  templateUrl: 'register-store.component.html',
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
    TranslateModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    TrimDirective,
    MatIcon,
    OverlayComponent,
    UiButtonComponent,
    MatSelect,
    MatOption,
    MatRadioGroup,
    MatRadioButton,
    ShowByLangPipe,
    NgTemplateOutlet
  ]
})

export class RegisterStoreComponent extends BaseComponent implements OnInit {
  @Output() onStoreRegistered = new EventEmitter<void>();
  @ViewChild('logoFileInput') logoFileInput: ElementRef<HTMLInputElement>;

  private _dialog = inject(MatDialog);
  private _yandexMapService = inject(YandexMapsService);
  private _registerStoreService = inject(MyStoreService);
  private _generalService = inject(GeneralService);
  private _authService = inject(AuthService);
  private _toasterService = inject(ToasterService);
  private _confirmationService = inject(ConfirmationService);

  currentUser: UserModel;
  customPatterns = {
    'X': { pattern: new RegExp('[a-zA-Z\']') },
    'Y': { pattern: new RegExp('[a-zA-Z0-9_]') }
  };
  weekdays = WEEKDAYS;
  categories = CATEGORIES;
  regions = REGIONS;
  logoBuffer: string | ArrayBuffer;
  districts: DistrictModel[] = [];
  registerStoreForm = new FormGroup({
    owner_firstname: new FormControl('Alexander', [ Validators.required ]),
    owner_lastname: new FormControl('Lucky', [ Validators.required ]),
    owner_fathername: new FormControl('Jonathan', [ Validators.required ]),
    name_uz: new FormControl('Brand Clothes LLC', [ Validators.required, Validators.maxLength(255) ]),
    shortname: new FormControl('brand_clothes', [ Validators.required, Validators.minLength(3), Validators.maxLength(20), shortnameValidator ]),
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
    address: new FormControl('Tashkent City, str. Ali Nava', [ Validators.required, Validators.maxLength(255) ]),
    district: new FormControl(null, [ Validators.required ]),
    desc_uz: new FormControl('Our company works for users and we want to help to humanity', [ Validators.required, Validators.maxLength(1500) ]),
    desc_ru: new FormControl('', [ Validators.maxLength(1500) ]),
    longitude: new FormControl(null, [ Validators.required ]),
    latitude: new FormControl(null, [ Validators.required ]),
    logo: new FormControl(null, [ Validators.required ])
  });

  constructor() {
    super();
  }

  ngOnInit(): void {
    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        this.registerStoreForm.get('main_phone_number').setValue(user.phone_number);
      });

    this._yandexMapService.setSingleLocationPoint('map');

    this._yandexMapService.coordinatesAndAddress$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ coordinates, address }) => {
          this.registerStoreForm.get('longitude').setValue(coordinates[0]);
          this.registerStoreForm.get('latitude').setValue(coordinates[1]);
          this.updateAddress(address);
        }
      });
  }

  checkShortname(): void {
    const shortnameControl = this.registerStoreForm.get('shortname');
    const isShortnameFreeControl = this.registerStoreForm.get('is_shortname_free');
    const shortname = shortnameControl.value;

    if (shortnameControl.invalid) {
      return;
    }

    this._registerStoreService.checkShortName(shortname)
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
        storeShortname: this.registerStoreForm.get('shortname').value
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
    this.registerStoreForm.get('logo').setValue(file);
    this.logoFileInput.nativeElement.value = null;
  }

  onRegionSelected(): void {
    this.registerStoreForm.get('district').setValue(null);
    this.getDistrictsList();
  }

  getDistrictsList(): void {
    const regionId = this.registerStoreForm.get('region').value;

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
    if (this.registerStoreForm.get('region').value) {
      return;
    }

    this._toasterService.open({
      type: 'info',
      title: 'dear.user',
      message: 'please.specify.region.first'
    });
  }

  registerStoreSubmit(): void {
    const form = this.registerStoreForm;
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

      if (key === 'categories') {
        value.forEach((category: number) => {
          formData.append('categories', JSON.stringify(category));
        })
      }

      if (key !== 'categories') {
        formData.append(key, value);
      }
    }

    this._registerStoreService.registerStore(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this._authService.getUserByToken(true)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
          this._dialog.open(ConfettiComponent, {
            data: {
              text: 'congratulations.on.your.store.registration'
            },
            maxWidth: '35rem'
          });
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

  updateAddress(address: string): void {
    if (!address) {
      return;
    }

    this._confirmationService.confirmation({
      message: 'location.point.changed.do.you.want.to.set.address.that.maps.gave',
      confirm: 'yes',
      cancel: 'no',
      confirmButtonType: 'blue'
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          if (!res) {
            return;
          }

          this.registerStoreForm.get('address').setValue(address);
        }
      });
  }
}
