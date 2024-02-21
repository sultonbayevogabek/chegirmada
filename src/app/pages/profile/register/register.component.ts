import { Component, inject } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfettiComponent } from '../confetti-alert/confetti-alert.component';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.scss',
  imports: [
    MatSelect,
    MatOption,
    NgxMaskDirective,
    MatRadioGroup,
    MatRadioButton,
    MatRipple,
    MatIcon
  ],
  providers: [
    provideNgxMask()
  ],
  standalone: true
})

export class RegisterComponent {
  private _dialog = inject(MatDialog);

  constructor() {
    this._dialog.open(ConfettiComponent, {
      data: {
        text: 'Ваш запрос принят. Ответ будет дан в ближайшее время. Спасибо, что вы с нами!'
      },
      maxWidth: '35rem'
    })
  }
}
