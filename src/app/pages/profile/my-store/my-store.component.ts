import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { YandexMapsService } from '../../../core/services/yandex-maps.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { OverlayComponent } from '../../../shared/components/overlay-panel/overlay-panel.component';
import { ScrollbarDirective } from '../../../shared/directives/scrollbar/scrollbar.directive';
import { ComplaintModalComponent } from '../complaint-modal/complaint-modal.component';
import { RegisterStoreService } from '../../../core/services/register-store.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { shortnameValidator } from '../../../core/validators/shortname.validator';
import { TrimDirective } from '../../../core/directives/trim.directive';
import { WEEKDAYS } from '../../../core/constants/weekdays';
import { BaseComponent } from '../../../core/components/base/base.component';
import { CATEGORIES } from '../../../core/constants/categories';
import { ShowByLangPipe } from '../../../core/pipes/show-by-lang.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { REGIONS } from '../../../core/constants/regions';
import { DistrictModel } from '../../../core/models/district.model';
import { MyInformationService } from '../../../core/services/my-information.service';
import { ConfettiComponent } from '../confetti-alert/confetti-alert.component';
import { GeneralService } from '../../../core/services/general.service';
import { ProfileEmptyListComponent } from '../profile-empty-list/profile-empty-list.component';

@Component({
  selector: 'my-store',
  templateUrl: 'my-store.component.html',
  styleUrl: 'my-store.component.scss',
  imports: [
    MatSelect,
    MatOption,
    NgxMaskDirective,
    MatRadioGroup,
    MatRadioButton,
    MatRipple,
    MatIcon,
    TranslateModule,
    UiButtonComponent,
    ReactiveFormsModule,
    NgTemplateOutlet,
    OverlayComponent,
    ScrollbarDirective,
    TrimDirective,
    ShowByLangPipe,
    ProfileEmptyListComponent
  ],
  providers: [
    provideNgxMask(),
    YandexMapsService,
    RegisterStoreService,
    MyInformationService,
    GeneralService
  ],
  standalone: true
})

export class MyStoreComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('logoFileInput') logoFileInput: ElementRef<HTMLInputElement>;

  private _dialog = inject(MatDialog);
  private _yandexMapService = inject(YandexMapsService);
  private _registerStoreService = inject(RegisterStoreService);
  private _generalService = inject(GeneralService);
  private _authService = inject(AuthService);
  private _toasterService = inject(ToasterService);

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
    owner_phone_number: new FormControl('+998 ', [ Validators.required, Validators.minLength(9) ]),
    name_uz: new FormControl('Brand Clothes LLC', [ Validators.required, Validators.maxLength(255) ]),
    shortname: new FormControl('brand_clothes', [ Validators.required, Validators.minLength(3), Validators.maxLength(20), shortnameValidator ]),
    is_shortname_free: new FormControl(true, [ Validators.required ]),
    working_day_start: new FormControl(0),
    working_day_end: new FormControl(4),
    working_time_start: new FormControl('09:00', [ Validators.required, Validators.minLength(4) ]),
    working_time_end: new FormControl('18:00', [ Validators.required, Validators.minLength(4) ]),
    category: new FormControl(2, [ Validators.required ]),
    delivery: new FormControl(true),
    main_phone_number: new FormControl('+998 ', [ Validators.required, Validators.minLength(9) ]),
    slogan_uz: new FormControl(null, [ Validators.maxLength(255) ]),
    slogan_ru: new FormControl(null, [ Validators.maxLength(255) ]),
    region: new FormControl(null, [ Validators.required ]),
    address: new FormControl('Tashkent City, str. Ali Nava', [ Validators.required, Validators.maxLength(255) ]),
    district: new FormControl(null, [ Validators.required ]),
    desc_uz: new FormControl('Our company works for users and we want to help to humanity', [ Validators.required, Validators.maxLength(1500) ]),
    desc_ru: new FormControl(null, [ Validators.maxLength(1500) ]),
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
        this.registerStoreForm.get('owner_phone_number').setValue(user.phone_number);
        this.registerStoreForm.get('main_phone_number').setValue(user.phone_number);
      });

    this._yandexMapService.setSingleLocationPoint('map');

    this._yandexMapService.coordinates$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: coordinates => {
          this.registerStoreForm.get('longitude').setValue(coordinates[0]);
          this.registerStoreForm.get('latitude').setValue(coordinates[1]);
        }
      });
  }

  ngAfterViewInit(): void {

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

  registerStore(): void {
    const form = this.registerStoreForm;
    form.markAllAsTouched();

    if (form.invalid || form.disabled) {
      return;
    }

    form.disable();

    const formData = new FormData();
    const formValue = form.getRawValue();

    for (const key in formValue) {
      if (key === 'working_time_start' || key === 'working_time_end') {
        formData.append(key, formValue[key].replace(/:/g, ''));
      } else {
        formData.append(key, formValue[key]);
      }
    }

    this._registerStoreService.registerStore(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: _ => {
          this._dialog.open(ConfettiComponent, {
            data: {
              text: 'Ваш запрос принят. Ответ будет дан в ближайшее время. Спасибо, что вы с нами!'
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
}
