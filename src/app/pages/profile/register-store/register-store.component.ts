import { AfterViewInit, Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import { nameValidator } from '../../../core/validators/name.validator';
import { NgTemplateOutlet } from '@angular/common';
import { OverlayComponent } from '../../../shared/components/overlay-panel/overlay-panel.component';
import { ScrollbarDirective } from '../../../shared/directives/scrollbar/scrollbar.directive';
import { ComplaintModalComponent } from '../complaint-modal/complaint-modal.component';
import { RegisterStoreService } from '../../../core/services/register-store.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { shortnameValidator } from '../../../core/validators/shortname.validator';
import { TrimDirective } from '../../../core/directives/trim.directive';
import { WEEKDAYS } from '../../../core/constants/weekdays';

@Component({
  selector: 'register-store',
  templateUrl: 'register-store.component.html',
  styleUrl: 'register-store.component.scss',
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
    TrimDirective
  ],
  providers: [
    provideNgxMask(),
    YandexMapsService,
    RegisterStoreService
  ],
  standalone: true
})

export class RegisterStoreComponent implements OnInit, AfterViewInit {
  private _dialog = inject(MatDialog);
  private _yandexMapService = inject(YandexMapsService);
  private _registerStoreService = inject(RegisterStoreService);
  private _destroyRef = inject(DestroyRef);

  customPatterns = {
    'X': { pattern: new RegExp("[a-zA-Z']") },
    'Y': { pattern: new RegExp("[a-zA-Z0-9_]") },
  }
  weekdays = WEEKDAYS;
  registerStoreForm = new FormGroup({
    owner_firstname: new FormControl(null, [ Validators.required ]),
    owner_lastname: new FormControl(null, [ Validators.required ]),
    owner_fathername: new FormControl(null, [ Validators.required ]),
    owner_phone_number: new FormControl('+998 ', [ Validators.required, Validators.minLength(9) ]),
    name_uz: new FormControl(null, [ Validators.required, Validators.maxLength(255) ]),
    shortname: new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(20), shortnameValidator ]),
    is_shortname_free: new FormControl(true, [ Validators.required ]),
    working_day_start: new FormControl(0),
    working_day_end: new FormControl(4),
    working_time_start: new FormControl('09:00', [ Validators.required, Validators.minLength(4)]),
    working_time_end: new FormControl('18:00', [ Validators.required, Validators.minLength(4)]),
    delivery: new FormControl(false),
    main_phone_number: new FormControl('+998 ', [ Validators.required, Validators.minLength(9) ]),
    slogan_uz: new FormControl(null, [ Validators.maxLength(255) ]),
    slogan_ru: new FormControl(null, [ Validators.maxLength(255) ]),
    desc_uz: new FormControl(null, [ Validators.required, Validators.maxLength(1500) ]),
    desc_ru: new FormControl(null, [ Validators.maxLength(1500) ]),
    longitude: new FormControl(null, [ Validators.required ]),
    latitude: new FormControl(null, [ Validators.required ]),
  });

  constructor() {
    /*this._dialog.open(ConfettiComponent, {
      data: {
        text: 'Ваш запрос принят. Ответ будет дан в ближайшее время. Спасибо, что вы с нами!'
      },
      maxWidth: '35rem'
    })*/
  }

  ngOnInit(): void {
    this._yandexMapService.setSingleLocationPoint('map');

    this._yandexMapService.coordinates$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: coordinates => {
          this.registerStoreForm.get('longitude').setValue(coordinates[0]);
          this.registerStoreForm.get('latitude').setValue(coordinates[1]);
        }
      })
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
        storeShortname: this.registerStoreForm.get('shortname').value
      }
    });
  }

  submit(): void {
    console.log(this.registerStoreForm.getRawValue());
  }
}
