import { Component } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

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

export class RegisterComponent {}
