import { Component } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.scss',
  imports: [
    MatSelect,
    MatOption,
    NgxMaskDirective,
    MatRadioGroup,
    MatRadioButton
  ],
  providers: [
    provideNgxMask()
  ],
  standalone: true
})

export class RegisterComponent {}
