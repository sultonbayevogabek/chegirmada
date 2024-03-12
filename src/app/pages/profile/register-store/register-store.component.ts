import { AfterViewInit, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfettiComponent } from '../confetti-alert/confetti-alert.component';
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
    ScrollbarDirective
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

  registerStoreForm = new FormGroup({
    owner_firstname: new FormControl(null, [ Validators.required, nameValidator ]),
    owner_lastname: new FormControl(null, [ Validators.required, nameValidator ]),
    owner_fathername: new FormControl(null, [ Validators.required, nameValidator ]),
    owner_phone_number: new FormControl('+998 ', [ Validators.required, Validators.minLength(9) ]),
    name_uz: new FormControl(null, [ Validators.required ]),
    shortname: new FormControl(null, [ Validators.required ]),
    is_shortname_free: new FormControl(true, [ Validators.required ])
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
  }

  ngAfterViewInit(): void {

  }

  checkShortname(): void {
    const shortname = this.registerStoreForm.get('shortname').value;

    if (shortname?.trim()?.length < 3) {
      return;
    }

    this._registerStoreService.checkShortName(shortname)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        if (res.shortname) {
          this.registerStoreForm.get('is_shortname_free').setValue(false);
        }
      });
  }

  openShortnameComplainingModal(): void {
    this._dialog.open(ComplaintModalComponent, {
      width: '25rem',
      data: {
        complaintType: 0
      }
    })
  }
}
