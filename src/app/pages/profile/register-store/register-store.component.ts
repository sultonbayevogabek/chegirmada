import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
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
    UiButtonComponent
  ],
  providers: [
    provideNgxMask(),
    YandexMapsService
  ],
  standalone: true
})

export class RegisterStoreComponent implements OnInit, AfterViewInit {
  private _dialog = inject(MatDialog);
  private _yandexMapService = inject(YandexMapsService);

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
    setTimeout(() => {
      console.log(document.querySelector('.ymaps-2-1-79-searchbox-button-text'));
    }, 1000)

  }
}
